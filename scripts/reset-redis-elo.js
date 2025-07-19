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

async function resetRedisElo() {
  console.log('🗑️ Clearing Redis ELO data...');
  
  try {
    // Make a request to clear the data by passing a special parameter
    const clearResponse = await makeRequest('http://localhost:3000/api/elo?clear=true');
    
    if (clearResponse.success) {
      console.log('✅ Redis ELO data cleared!');
    } else {
      console.log('❌ Failed to clear Redis data');
    }
    
    // Now get fresh data
    const freshData = await makeRequest('http://localhost:3000/api/elo');
    
    if (freshData.success) {
      console.log('📊 Fresh data loaded:');
      freshData.data.entities.forEach(entity => {
        const avg = (entity.eloScores.fight + entity.eloScores.better + entity.eloScores.cute + entity.eloScores.ally) / 4;
        console.log(`${entity.name}: ${Math.round(avg)} avg (all scores should be 1200)`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

resetRedisElo(); 