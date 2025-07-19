import { EloEntity } from '@/types/elo';
import { createNewEntity } from '@/lib/elo-utils';

export const ELO_ENTITIES: EloEntity[] = [
  // Animals
  createNewEntity('lion', 'Lion', 'animal', '/elderscroll.png', 'King of the jungle'),
  createNewEntity('african-elephant', 'African Elephant', 'animal', '/elderscroll.png', 'Gentle giant'),
  createNewEntity('bengal-tiger', 'Bengal Tiger', 'animal', '/elderscroll.png', 'Striped hunter'),
  createNewEntity('australian-shepherd', 'Australian Shepherd', 'animal', '/elderscroll.png', 'Intelligent herding dog'),
  createNewEntity('bottlenose-dolphin', 'Bottlenose Dolphin', 'animal', '/elderscroll.png', 'Intelligent swimmer'),
  createNewEntity('bald-eagle', 'Bald Eagle', 'animal', '/elderscroll.png', 'Majestic bird of prey'),
  createNewEntity('emperor-penguin', 'Emperor Penguin', 'animal', '/elderscroll.png', 'Antarctic royalty'),
  createNewEntity('giraffe', 'Giraffe', 'animal', '/elderscroll.png', 'Tallest land animal'),
  createNewEntity('humpback-whale', 'Humpback Whale', 'animal', '/elderscroll.png', 'Ocean singer'),
  createNewEntity('blue-whale', 'Blue Whale', 'animal', '/elderscroll.png', 'Largest animal ever'),
  createNewEntity('orca', 'Orca', 'animal', '/elderscroll.png', 'Ocean apex predator'),
  createNewEntity('timber-wolf', 'Timber Wolf', 'animal', '/elderscroll.png', 'Pack hunter of the north'),
  createNewEntity('grizzly-bear', 'Grizzly Bear', 'animal', '/elderscroll.png', 'Mountain terror'),
  createNewEntity('silverback-gorilla', 'Silverback Gorilla', 'animal', '/elderscroll.png', 'Jungle strongman'),
  createNewEntity('polar-bear', 'Polar Bear', 'animal', '/elderscroll.png', 'Arctic apex predator'),
  createNewEntity('great-white-shark', 'Great White Shark', 'animal', '/elderscroll.png', 'Ocean nightmare'),
  createNewEntity('honey-badger', 'Honey Badger', 'animal', '/elderscroll.png', 'Fearless fury'),
  createNewEntity('mantis-shrimp', 'Mantis Shrimp', 'animal', '/elderscroll.png', 'Rainbow puncher'),
  createNewEntity('octopus', 'Giant Pacific Octopus', 'animal', '/elderscroll.png', 'Eight-armed genius'),
  createNewEntity('komodo-dragon', 'Komodo Dragon', 'animal', '/elderscroll.png', 'Living dragon'),
  createNewEntity('peregrine-falcon', 'Peregrine Falcon', 'animal', '/elderscroll.png', 'Speed demon of the sky'),
  createNewEntity('hippo', 'Hippopotamus', 'animal', '/elderscroll.png', 'River tank'),
  createNewEntity('rhino', 'White Rhinoceros', 'animal', '/elderscroll.png', 'Horned bulldozer'),
  createNewEntity('snow-leopard', 'Snow Leopard', 'animal', '/elderscroll.png', 'Mountain ghost'),
  
  // Dinosaurs
  createNewEntity('t-rex', 'T-Rex', 'dinosaur', '/elderscroll.png', 'Tyrant lizard king'),
  createNewEntity('velociraptor', 'Velociraptor', 'dinosaur', '/elderscroll.png', 'Swift hunter'),
  createNewEntity('triceratops', 'Triceratops', 'dinosaur', '/elderscroll.png', 'Three-horned face'),
  createNewEntity('brachiosaurus', 'Brachiosaurus', 'dinosaur', '/elderscroll.png', 'Long-necked giant'),
  createNewEntity('stegosaurus', 'Stegosaurus', 'dinosaur', '/elderscroll.png', 'Plated herbivore'),
  createNewEntity('pterodactyl', 'Pterodactyl', 'dinosaur', '/elderscroll.png', 'Flying reptile'),
  createNewEntity('ornithomimus', 'Ornithomimus', 'dinosaur', '/elderscroll.png', 'Speedy, Sly Egg Thief'),
  createNewEntity('diplodocus', 'Diplodocus', 'dinosaur', '/elderscroll.png', 'Long-tailed giant'),
  createNewEntity('ankylosaurus', 'Ankylosaurus', 'dinosaur', '/elderscroll.png', 'Armored tank'),
  createNewEntity('brontosaurus', 'Brontosaurus', 'dinosaur', '/elderscroll.png', 'Thunder lizard'),
  createNewEntity('spinosaurus', 'Spinosaurus', 'dinosaur', '/elderscroll.png', 'River monster'),
  createNewEntity('pachycephalosaurus', 'Pachycephalosaurus', 'dinosaur', '/elderscroll.png', 'Dome-headed rammer'),
  
  // Characters
  createNewEntity('superman', 'Superman', 'character', '/elderscroll.png', 'Man of Steel'),
  createNewEntity('batman', 'Batman', 'character', '/elderscroll.png', 'Dark Knight'),
  createNewEntity('spiderman', 'Spider-Man', 'character', '/elderscroll.png', 'Friendly neighborhood hero'),
  createNewEntity('iron-man', 'Iron Man', 'character', '/elderscroll.png', 'Genius billionaire'),
  createNewEntity('rock-lee', 'Rock Lee', 'character', '/images/elo/rock-lee.jpg', 'Youth of the Hidden Leaf'),
  createNewEntity('luke-skywalker', 'Luke Skywalker', 'character', '/elderscroll.png', 'Jedi Knight'),
  createNewEntity('han-solo', 'Han Solo', 'character', '/elderscroll.png', 'Scoundrel with a heart of gold'),
  createNewEntity('gandalf', 'Gandalf the Grey', 'character', '/elderscroll.png', 'Wizard of Middle-earth'),
  createNewEntity('ebony-maw', 'Ebony Maw', 'character', '/elderscroll.png', 'Childof Thanos'),
  createNewEntity('jedi-youngling', 'Jedi Youngling', 'character', '/images/elo/jedi-youngling.jpg', 'Theres too many of them, what are we going to do?'),
  createNewEntity('shrek', 'Shrek', 'character', '/elderscroll.png', 'Ogre with layers'),
  createNewEntity('darth-vader', 'Darth Vader', 'character', '/elderscroll.png', 'Dark Lord of the Sith'),
  createNewEntity('steve-minecraft', 'Steve (Minecraft)', 'character', '/elderscroll.png', 'Block punching legend'),
];

export function getEntitiesByCategory(category: 'animal' | 'dinosaur' | 'character'): EloEntity[] {
  return ELO_ENTITIES.filter(entity => entity.category === category);
}

export function getEntityById(id: string): EloEntity | undefined {
  return ELO_ENTITIES.find(entity => entity.id === id);
} 