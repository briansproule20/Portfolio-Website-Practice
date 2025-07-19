// This script clears the in-memory cache variables
// Run this and then restart your dev server

console.log('🧠 CLEARING IN-MEMORY CACHE...');

// The memory cache variables are in lib/elo-server.ts
// They are: memoryRankings and memoryVotes
// These get cleared when the server restarts, but let's make sure

console.log('💡 To clear memory cache:');
console.log('1. Stop your dev server (Ctrl+C)');
console.log('2. Run: npm run dev');
console.log('3. The memory cache will be fresh');

console.log('🎯 Memory cache will be cleared on next server restart'); 