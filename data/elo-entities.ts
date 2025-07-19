import { EloEntity } from '@/types/elo';
import { createNewEntity } from '@/lib/elo-utils';

export const ELO_ENTITIES: EloEntity[] = [
  // Animals
  createNewEntity('lion', 'Lion', 'animal', '/elderscroll.png', 'King of the jungle'),
  createNewEntity('elephant', 'Elephant', 'animal', '/elderscroll.png', 'Gentle giant'),
  createNewEntity('tiger', 'Tiger', 'animal', '/elderscroll.png', 'Striped hunter'),
  createNewEntity('puppy', 'Puppy', 'animal', '/elderscroll.png', 'Adorable companion'),
  createNewEntity('dolphin', 'Dolphin', 'animal', '/elderscroll.png', 'Intelligent swimmer'),
  createNewEntity('eagle', 'Eagle', 'animal', '/elderscroll.png', 'Majestic bird of prey'),
  createNewEntity('emperor-penguin', 'Emperor Penguin', 'animal', '/elderscroll.png', 'Antarctic royalty'),
  createNewEntity('giraffe', 'Giraffe', 'animal', '/elderscroll.png', 'Tallest land animal'),
  
  // Dinosaurs
  createNewEntity('t-rex', 'T-Rex', 'dinosaur', '/elderscroll.png', 'Tyrant lizard king'),
  createNewEntity('velociraptor', 'Velociraptor', 'dinosaur', '/elderscroll.png', 'Swift hunter'),
  createNewEntity('triceratops', 'Triceratops', 'dinosaur', '/elderscroll.png', 'Three-horned face'),
  createNewEntity('brachiosaurus', 'Brachiosaurus', 'dinosaur', '/elderscroll.png', 'Long-necked giant'),
  createNewEntity('stegosaurus', 'Stegosaurus', 'dinosaur', '/elderscroll.png', 'Plated herbivore'),
  createNewEntity('pterodactyl', 'Pterodactyl', 'dinosaur', '/elderscroll.png', 'Flying reptile'),
  createNewEntity('ornithomimus', 'Ornithomimus', 'dinosaur', '/elderscroll.png', 'Speed, Sly Egg Thief'),
  createNewEntity('diplodocus', 'Diplodocus', 'dinosaur', '/elderscroll.png', 'Long-tailed giant'),
  createNewEntity('ankylosaurus', 'Ankylosaurus', 'dinosaur', '/elderscroll.png', 'Armored tank'),
  
  // Characters
  createNewEntity('superman', 'Superman', 'character', '/elderscroll.png', 'Man of Steel'),
  createNewEntity('batman', 'Batman', 'character', '/elderscroll.png', 'Dark Knight'),
  createNewEntity('spiderman', 'Spider-Man', 'character', '/elderscroll.png', 'Friendly neighborhood hero'),
  createNewEntity('iron-man', 'Iron Man', 'character', '/elderscroll.png', 'Genius billionaire'),
  createNewEntity('rock-lee', 'Rock Lee', 'character', '/images/elo/rock-lee.jpg', 'Youth of the Hidden Leaf'),
  createNewEntity('luke-skywalker', 'Luke Skywalker', 'character', '/elderscroll.png', 'Jedi Knight'),
  createNewEntity('han-solo', 'Han Solo', 'character', '/elderscroll.png', 'Scoundrel with a heart of gold'),
  createNewEntity('gandalf', 'Gandalf the Grey', 'character', '/elderscroll.png', 'Wizard of Middle-earth'),
];

export function getEntitiesByCategory(category: 'animal' | 'dinosaur' | 'character'): EloEntity[] {
  return ELO_ENTITIES.filter(entity => entity.category === category);
}

export function getEntityById(id: string): EloEntity | undefined {
  return ELO_ENTITIES.find(entity => entity.id === id);
} 