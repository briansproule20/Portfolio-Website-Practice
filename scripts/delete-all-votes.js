const Redis = require('redis');

async function deleteAllVotes() {
  console.log('🗑️ DELETING ALL VOTE HISTORY FROM REDIS...');
  
  try {
    const redisUrl = process.env.REDIS_URL;
    if (!redisUrl) {
      console.log('❌ REDIS_URL not found');
      return;
    }
    
    const redis = Redis.createClient({
      url: redisUrl
    });
    
    await redis.connect();
    console.log('✅ Connected to Redis');
    
    // Delete all ELO data
    const keys = ['elo-rankings', 'elo-votes'];
    
    for (const key of keys) {
      const deleted = await redis.del(key);
      console.log(`🗑️ Deleted key '${key}': ${deleted} records`);
    }
    
    await redis.disconnect();
    console.log('✅ Disconnected from Redis');
    
    console.log('🎯 ALL VOTE HISTORY DELETED!');
    console.log('🔄 Next time you load the ELO page, it will reinitialize with fresh 1200 scores');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

deleteAllVotes(); 