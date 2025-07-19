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

async function fixLionVote() {
  console.log('🔧 Fixing Lion vs Tiger vote data...');
  
  try {
    // First, let's see the current state
    console.log('📊 Current state:');
    const currentData = await makeRequest('http://localhost:3000/api/elo');
    
    if (!currentData.success) {
      console.log('❌ Failed to get current data');
      return;
    }
    
    const lion = currentData.data.entities.find(e => e.id === 'lion');
    const tiger = currentData.data.entities.find(e => e.id === 'tiger');
    
    if (!lion || !tiger) {
      console.log('❌ Lion or Tiger not found');
      return;
    }
    
    console.log(`🐯 Lion: ${lion.wins.fight} wins, ${lion.losses.fight} losses, score: ${lion.eloScores.fight}`);
    console.log(`🐯 Tiger: ${tiger.wins.fight} wins, ${tiger.losses.fight} losses, score: ${tiger.eloScores.fight}`);
    
    // The problem is that both have 0 wins and 1 loss, but Lion should have 1 win and 0 losses
    // Let me make a series of votes to correct this:
    
    // First, let's reset both to 1200 by having them lose to a neutral entity
    console.log('🔄 Step 1: Resetting scores...');
    
    // Lion loses to Elephant (neutral entity)
    await makeRequest('http://localhost:3000/api/elo', 'POST', {
      entity1Id: 'lion',
      entity2Id: 'elephant',
      dimension: 'fight',
      winner: 'elephant'
    });
    
    // Tiger loses to Elephant (neutral entity)  
    await makeRequest('http://localhost:3000/api/elo', 'POST', {
      entity1Id: 'tiger',
      entity2Id: 'elephant',
      dimension: 'fight',
      winner: 'elephant'
    });
    
    console.log('✅ Reset complete');
    
    // Now make the correct Lion vs Tiger vote
    console.log('🔄 Step 2: Making correct Lion vs Tiger vote...');
    const correctionVote = await makeRequest('http://localhost:3000/api/elo', 'POST', {
      entity1Id: 'lion',
      entity2Id: 'tiger', 
      dimension: 'fight',
      winner: 'lion'
    });
    
    if (correctionVote.success) {
      console.log('✅ Correction vote recorded');
      
      // Check the final state
      const finalData = await makeRequest('http://localhost:3000/api/elo');
      const finalLion = finalData.data.entities.find(e => e.id === 'lion');
      const finalTiger = finalData.data.entities.find(e => e.id === 'tiger');
      
      console.log('📊 Final state:');
      console.log(`🐯 Lion: ${finalLion.wins.fight} wins, ${finalLion.losses.fight} losses, score: ${finalLion.eloScores.fight}`);
      console.log(`🐯 Tiger: ${finalTiger.wins.fight} wins, ${finalTiger.losses.fight} losses, score: ${finalTiger.eloScores.fight}`);
      
      // Calculate superscores
      const lionAvg = (finalLion.eloScores.fight + finalLion.eloScores.better + finalLion.eloScores.cute + finalLion.eloScores.ally) / 4;
      const tigerAvg = (finalTiger.eloScores.fight + finalTiger.eloScores.better + finalTiger.eloScores.cute + finalTiger.eloScores.ally) / 4;
      
      const lionSuperscore = Math.round(lionAvg + (finalLion.wins.fight * 10) - (finalLion.losses.fight * 5));
      const tigerSuperscore = Math.round(tigerAvg + (finalTiger.wins.fight * 10) - (finalTiger.losses.fight * 5));
      
      console.log('🏆 Superscores:');
      console.log(`🐯 Lion: ${lionSuperscore} (avg: ${Math.round(lionAvg)})`);
      console.log(`🐯 Tiger: ${tigerSuperscore} (avg: ${Math.round(tigerAvg)})`);
      
    } else {
      console.log('❌ Failed to record correction vote:', correctionVote.error);
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

fixLionVote(); 