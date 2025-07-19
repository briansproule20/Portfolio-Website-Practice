const fs = require('fs');
const path = require('path');

// Paths
const DATA_DIR = path.join(__dirname, '..', 'data');
const RANKINGS_FILE = path.join(DATA_DIR, 'elo-rankings.json');
const VOTES_FILE = path.join(DATA_DIR, 'elo-votes.json');

function clearEloData() {
  console.log('🗑️ Clearing all ELO data...');
  
  try {
    // Remove rankings file if it exists
    if (fs.existsSync(RANKINGS_FILE)) {
      fs.unlinkSync(RANKINGS_FILE);
      console.log('✅ Deleted rankings file');
    }
    
    // Remove votes file if it exists
    if (fs.existsSync(VOTES_FILE)) {
      fs.unlinkSync(VOTES_FILE);
      console.log('✅ Deleted votes file');
    }
    
    console.log('🎯 All ELO data cleared!');
    console.log('🔄 Next time you load the ELO page, it will reinitialize with fresh 1200 scores');
    
  } catch (error) {
    console.error('❌ Error clearing data:', error);
  }
}

clearEloData(); 