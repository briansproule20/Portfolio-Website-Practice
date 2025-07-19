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

async function resetAll() {
  console.log('🔄 Resetting all ELO scores to 1200...');
  
  try {
    // Get current entities
    const currentData = await makeRequest('http://localhost:3000/api/elo');
    
    if (!currentData.success) {
      console.log('❌ Failed to get current data');
      return;
    }
    
    console.log(`📊 Found ${currentData.data.entities.length} entities to reset`);
    
    // Reset each entity by making them lose to a neutral entity multiple times
    // until they get back to 1200 for all categories
    const categories = ['fight', 'better', 'cute', 'ally'];
    
    for (const entity of currentData.data.entities) {
      console.log(`🔄 Resetting ${entity.name}...`);
      
      for (const category of categories) {
        const currentScore = entity.eloScores[category];
        const scoreDiff = currentScore - 1200;
        
        if (scoreDiff !== 0) {
          console.log(`   ${category}: ${currentScore} → 1200 (diff: ${scoreDiff})`);
          
          // Make entity lose to a neutral entity to bring score down
          // Each loss is about 16 points, so we need multiple losses
          const lossesNeeded = Math.ceil(Math.abs(scoreDiff) / 16);
          
          for (let i = 0; i < lossesNeeded; i++) {
            await makeRequest('http://localhost:3000/api/elo', 'POST', {
              entity1Id: entity.id,
              entity2Id: 'eagle', // Use eagle as neutral entity
              dimension: category,
              winner: 'eagle'
            });
          }
        }
      }
    }
    
    console.log('✅ Reset complete!');
    
    // Show final state
    const finalData = await makeRequest('http://localhost:3000/api/elo');
    console.log('📊 Final state:');
    
    finalData.data.entities.forEach(entity => {
      const avg = (entity.eloScores.fight + entity.eloScores.better + entity.eloScores.cute + entity.eloScores.ally) / 4;
      console.log(`${entity.name}: ${Math.round(avg)} avg`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

resetAll(); 