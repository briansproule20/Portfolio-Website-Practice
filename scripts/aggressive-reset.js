const Redis = require('redis');
const fs = require('fs');
const path = require('path');

async function aggressiveReset() {
  console.log('💥 AGGRESSIVE RESET - DELETING EVERYTHING...');
  
  try {
    // 1. Delete from Redis
    const redisUrl = process.env.REDIS_URL;
    if (redisUrl) {
      const redis = Redis.createClient({
        url: redisUrl
      });
      
      await redis.connect();
      console.log('✅ Connected to Redis');
      
      const keys = ['elo-rankings', 'elo-votes'];
      for (const key of keys) {
        const deleted = await redis.del(key);
        console.log(`🗑️ Deleted Redis key '${key}': ${deleted} records`);
      }
      
      await redis.disconnect();
      console.log('✅ Disconnected from Redis');
    }
    
    // 2. Delete local files if they exist
    const dataDir = path.join(process.cwd(), 'data');
    const filesToDelete = [
      path.join(dataDir, 'elo-rankings.json'),
      path.join(dataDir, 'elo-votes.json')
    ];
    
    for (const file of filesToDelete) {
      if (fs.existsSync(file)) {
        fs.unlinkSync(file);
        console.log(`🗑️ Deleted file: ${file}`);
      }
    }
    
    // 3. Clear any potential cache files
    const cacheFiles = [
      path.join(process.cwd(), '.next', 'cache'),
      path.join(process.cwd(), 'node_modules', '.cache')
    ];
    
    for (const cacheDir of cacheFiles) {
      if (fs.existsSync(cacheDir)) {
        try {
          fs.rmSync(cacheDir, { recursive: true, force: true });
          console.log(`🗑️ Deleted cache directory: ${cacheDir}`);
        } catch (error) {
          console.log(`⚠️ Could not delete cache: ${cacheDir}`);
        }
      }
    }
    
    console.log('🎯 AGGRESSIVE RESET COMPLETE!');
    console.log('🔄 Next time you load the ELO page, it will be completely fresh');
    console.log('💡 You may need to restart your dev server: npm run dev');
    
  } catch (error) {
    console.error('❌ Error during aggressive reset:', error.message);
  }
}

aggressiveReset(); 