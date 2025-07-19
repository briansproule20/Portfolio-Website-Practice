const https = require('https');
const http = require('http');

function makeRequest(url, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    if (data) {
      const postData = JSON.stringify(data);
      options.headers['Content-Length'] = Buffer.byteLength(postData);
    }

    const client = urlObj.protocol === 'https:' ? https : http;
    const req = client.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        try {
          const result = JSON.parse(body);
          resolve(result);
        } catch (error) {
          resolve(body);
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

async function nukeAllVotes() {
  console.log('💥 NUKE ALL VOTES - Starting fresh...');
  
  try {
    // First, let's see what we're dealing with
    const currentData = await makeRequest('http://localhost:3000/api/elo');
    
    if (!currentData.success) {
      console.log('❌ Failed to get current data');
      return;
    }
    
    console.log(`📊 Current state: ${currentData.data.totalVotes} total votes`);
    console.log(`📊 Current state: ${currentData.data.matches.length} matches`);
    
    // Now let's reset everything by making a bunch of votes to bring all scores to exactly 1200
    console.log('🔄 Resetting all scores to exactly 1200...');
    
    const entities = currentData.data.entities;
    const categories = ['fight', 'better', 'cute', 'ally'];
    
    // Use a neutral entity that starts at 1200
    const neutralEntity = 'dolphin';
    
    for (const entity of entities) {
      if (entity.id === neutralEntity) continue; // Skip the neutral entity
      
      console.log(`🔄 Resetting ${entity.name}...`);
      
      for (const category of categories) {
        const currentScore = entity.eloScores[category];
        const scoreDiff = currentScore - 1200;
        
        if (scoreDiff !== 0) {
          console.log(`   ${category}: ${currentScore} → 1200 (diff: ${scoreDiff})`);
          
          // Calculate how many votes we need
          const votesNeeded = Math.ceil(Math.abs(scoreDiff) / 16);
          
          for (let i = 0; i < votesNeeded; i++) {
            if (scoreDiff > 0) {
              // Score is too high, make entity lose
              await makeRequest('http://localhost:3000/api/elo', 'POST', {
                entity1Id: entity.id,
                entity2Id: neutralEntity,
                dimension: category,
                winner: neutralEntity
              });
            } else {
              // Score is too low, make entity win
              await makeRequest('http://localhost:3000/api/elo', 'POST', {
                entity1Id: entity.id,
                entity2Id: neutralEntity,
                dimension: category,
                winner: entity.id
              });
            }
          }
        }
      }
    }
    
    console.log('✅ Reset complete!');
    
    // Show final state
    const finalData = await makeRequest('http://localhost:3000/api/elo');
    console.log('📊 Final state:');
    console.log(`Total votes: ${finalData.data.totalVotes}`);
    console.log(`Total matches: ${finalData.data.matches.length}`);
    
    finalData.data.entities.forEach(entity => {
      const avg = (entity.eloScores.fight + entity.eloScores.better + entity.eloScores.cute + entity.eloScores.ally) / 4;
      console.log(`${entity.name}: ${Math.round(avg)} avg (${entity.eloScores.fight}, ${entity.eloScores.better}, ${entity.eloScores.cute}, ${entity.eloScores.ally})`);
    });
    
    console.log('🎯 All entities should now have 1200 scores across all categories!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

nukeAllVotes(); 