#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Path to the ELO entities file
const ENTITIES_FILE = path.join(process.cwd(), 'data', 'elo-entities.ts');

// Read current entities
function readEntities() {
  const content = fs.readFileSync(ENTITIES_FILE, 'utf8');
  return content;
}

// Add a new entity
function addEntity(name, category, description, imageUrl = '/elderscroll.png') {
  const id = name.toLowerCase().replace(/[^a-z0-9]/g, '-');
  
  // Read current content
  const content = readEntities();
  
  // Find the right place to insert (after the last entity in the category)
  const lines = content.split('\n');
  let insertIndex = -1;
  
  // Find the last entity in the category
  for (let i = lines.length - 1; i >= 0; i--) {
    if (lines[i].includes(`'${category}'`) && lines[i].includes('createNewEntity')) {
      insertIndex = i + 1;
      break;
    }
  }
  
  // If category not found, insert at the end of the array
  if (insertIndex === -1) {
    for (let i = lines.length - 1; i >= 0; i--) {
      if (lines[i].includes('];')) {
        insertIndex = i;
        break;
      }
    }
  }
  
  // Create the new entity line
  const newEntityLine = `  createNewEntity('${id}', '${name}', '${category}', '${imageUrl}', '${description}'),`;
  
  // Insert the new entity
  lines.splice(insertIndex, 0, newEntityLine);
  
  // Write back to file
  fs.writeFileSync(ENTITIES_FILE, lines.join('\n'));
  
  console.log(`✅ Added ${name} (${category}) to ELO system!`);
  console.log(`   ID: ${id}`);
  console.log(`   Image: ${imageUrl}`);
  console.log(`   Description: ${description}`);
  console.log(`\n🔄 Restart your dev server to see the new item!`);
}

// Command line interface
function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 3) {
    console.log('Usage: node scripts/add-elo-item.js <name> <category> <description> [imageUrl]');
    console.log('');
    console.log('Categories: animal, dinosaur, character');
    console.log('Image URL: Optional, defaults to /elderscroll.png');
    console.log('');
    console.log('Examples:');
    console.log('  node scripts/add-elo-item.js "Giraffe" animal "Tallest land animal"');
    console.log('  node scripts/add-elo-item.js "Spinosaurus" dinosaur "River monster" "/images/elo/spino.jpg"');
    console.log('  node scripts/add-elo-item.js "Thor" character "God of Thunder"');
    return;
  }
  
  const [name, category, description, imageUrl] = args;
  
  if (!['animal', 'dinosaur', 'character'].includes(category)) {
    console.log('❌ Category must be: animal, dinosaur, or character');
    return;
  }
  
  addEntity(name, category, description, imageUrl);
}

main(); 