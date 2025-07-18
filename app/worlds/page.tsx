'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Worldbuilding() {
  const [mounted, setMounted] = useState(false);
  const [selectedPlanet, setSelectedPlanet] = useState<number | string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePlanetClick = (planetId: number | string) => {
    setSelectedPlanet(selectedPlanet === planetId ? null : planetId);
  };

  const planets = [
    { id: 1, name: "Meridian", size: 0.8, distance: 90, color: "#8B4513", orbitSpeed: 35 },
    { id: 2, name: "Aurora", size: 1.2, distance: 130, color: "#4169E1", orbitSpeed: 39 },
    { id: 3, name: "Terra Nova", size: 1.0, distance: 180, color: "#228B22", orbitSpeed: 32 },
    { id: 4, name: "Crimson", size: 0.9, distance: 230, color: "#DC143C", orbitSpeed: 45 },
    { id: 5, name: "Jupiter's Echo", size: 2.0, distance: 280, color: "#DAA520", orbitSpeed: 50 },
    { id: 6, name: "Crystalline", size: 1.1, distance: 330, color: "#87CEEB", orbitSpeed: 49 },
    { id: 7, name: "Shadow", size: 1.0, distance: 380, color: "#2F4F4F", orbitSpeed: 28 },
    { id: 8, name: "Frost", size: 0.7, distance: 430, color: "#F0F8FF", orbitSpeed: 40 }
  ];

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-[25vh] md:h-[30vh] flex items-center justify-center overflow-hidden pt-24"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--highlight)] to-[var(--background)] opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent opacity-70" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-7xl font-black mb-4 md:mb-6 text-[var(--foreground)] tracking-tight"
          >
            Worldbuilding
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-[var(--accent)] font-serif italic px-4"
          >
            Exploring the art of creating worlds and universes.
          </motion.p>
        </div>
      </motion.section>

      {/* Solar System Model */}
      <section className="max-w-6xl mx-auto px-4 -mt-0">
        <div className="relative w-full h-[800px] md:h-[900px] flex items-center justify-center overflow-hidden">
          {/* Central Red Star */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="absolute z-[9999] w-20 h-20 md:w-24 md:h-24 bg-gradient-to-r from-red-500 to-red-700 rounded-full shadow-2xl shadow-red-500/50 cursor-pointer group hover:scale-125 hover:shadow-2xl hover:shadow-red-500/80 transition-all duration-300"
            style={{
              boxShadow: '0 0 50px rgba(239, 68, 68, 0.6), 0 0 100px rgba(239, 68, 68, 0.3)'
            }}
            onClick={() => handlePlanetClick('sun')}
          />

          {/* Sun Information Card */}
          {selectedPlanet === 'sun' && (
            <motion.div
              initial={{ opacity: 0, x: 20, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 20, y: -20 }}
              className="fixed top-20 right-8 z-50 w-80 bg-[var(--card)] rounded-lg p-6 border-2 border-[var(--accent)] shadow-xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-red-500 to-red-700" />
                <h3 className="text-xl font-bold text-[var(--foreground)]">Sol Nova</h3>
                <button
                  onClick={() => setSelectedPlanet(null)}
                  className="ml-auto text-[var(--accent)] hover:text-[var(--foreground)] transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--accent)]">Type:</span>
                  <span className="text-[var(--foreground)]">Red Dwarf</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--accent)]">Age:</span>
                  <span className="text-[var(--foreground)]">~4.6 billion years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--accent)]">Temperature:</span>
                  <span className="text-[var(--foreground)]">3,500°K</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--accent)]">Planets:</span>
                  <span className="text-[var(--foreground)]">8</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Planet Information Card - Upper Right Corner */}
          {selectedPlanet && selectedPlanet !== 'sun' && typeof selectedPlanet === 'number' && (
            <motion.div
              initial={{ opacity: 0, x: 20, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 20, y: -20 }}
              className="fixed top-20 right-8 z-50 w-80 bg-[var(--card)] rounded-lg p-6 border-2 border-[var(--accent)] shadow-xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: planets.find(p => p.id === selectedPlanet)?.color }}
                />
                <h3 className="text-xl font-bold text-[var(--foreground)]">
                  {planets.find(p => p.id === selectedPlanet)?.name}
                </h3>
                <button
                  onClick={() => setSelectedPlanet(null)}
                  className="ml-auto text-[var(--accent)] hover:text-[var(--foreground)] transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--accent)]">Distance:</span>
                  <span className="text-[var(--foreground)]">{planets.find(p => p.id === selectedPlanet)?.distance} AU</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--accent)]">Size:</span>
                  <span className="text-[var(--foreground)]">{planets.find(p => p.id === selectedPlanet)?.size}x Earth</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--accent)]">Orbit Speed:</span>
                  <span className="text-[var(--foreground)]">{planets.find(p => p.id === selectedPlanet)?.orbitSpeed}s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--accent)]">Color:</span>
                  <span className="text-[var(--foreground)]">{planets.find(p => p.id === selectedPlanet)?.color}</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Planet Orbits and Planets */}
          {mounted && planets.map((planet, index) => (
            <motion.div
              key={planet.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + index * 0.1, duration: 0.8 }}
              className="absolute"
              style={{
                width: planet.distance * 2,
                height: planet.distance * 2,
                animation: `orbit ${planet.orbitSpeed}s linear infinite`,
                zIndex: 100 - index // Inner planets have higher z-index
              }}
            >
              {/* Orbit Ring */}
              <div 
                className="absolute inset-0 border border-[var(--accent)]/20 rounded-full cursor-pointer hover:border-[var(--highlight)] hover:border-2 transition-all duration-300"
                style={{ width: '100%', height: '100%' }}
                onClick={() => handlePlanetClick(planet.id)}
              />
              
              {/* Planet */}
              <motion.div
                className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={{
                  width: planet.size * 20,
                  height: planet.size * 20,
                  backgroundColor: planet.color,
                  borderRadius: '50%',
                  boxShadow: `0 0 20px ${planet.color}40, inset 0 0 20px rgba(0,0,0,0.3)`
                }}
                whileHover={{ 
                  scale: 1.2,
                  boxShadow: `0 0 30px ${planet.color}60, inset 0 0 20px rgba(0,0,0,0.3)`
                }}
                transition={{ duration: 0.3 }}
                onClick={() => handlePlanetClick(planet.id)}
              >
                {/* Planet Label */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <span className="text-xs md:text-sm text-[var(--foreground)] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    {planet.name}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Planet Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {planets.map((planet) => (
            <div
              key={planet.id}
              className="bg-[var(--card)] rounded-lg p-4 border-2 border-[var(--accent)] hover:border-[var(--highlight)] transition-colors"
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: planet.color }}
                />
                <h3 className="font-semibold text-[var(--foreground)]">{planet.name}</h3>
              </div>
              <p className="text-sm text-[var(--accent)]">
                Distance: {planet.distance} AU | Size: {planet.size}x Earth
              </p>
            </div>
          ))}
        </motion.div>

        {/* Worldbuilding Explanation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
          className="mt-16 max-w-6xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-8 text-[var(--foreground)] text-center">What is Worldbuilding?</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-[var(--accent)]">The Art of Creation</h3>
                <p className="text-[var(--foreground)] leading-relaxed mb-4">
                  Worldbuilding is the process of constructing an imaginary world or universe, complete with its own geography, 
                  history, cultures, languages, and systems. It's the foundation upon which compelling stories are built, 
                  whether in literature, film, games, or other creative mediums.
                </p>
                <p className="text-[var(--foreground)] leading-relaxed">
                  From the vast galaxies of science fiction to the intricate realms of fantasy, worldbuilding transforms 
                  simple narratives into immersive experiences that transport audiences to entirely new realities.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-[var(--accent)]">Beyond the Surface</h3>
                <p className="text-[var(--foreground)] leading-relaxed mb-4">
                  Great worldbuilding goes beyond mere aesthetics. It involves creating coherent ecosystems, 
                  believable societies, and logical systems that make the world feel lived-in and authentic. 
                  Every detail, from the climate to the economy, contributes to the overall believability.
                </p>
                <p className="text-[var(--foreground)] leading-relaxed">
                  The most compelling worlds are those where every element serves a purpose, where the environment 
                  shapes the culture, and where the history influences the present in meaningful ways.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-[var(--accent)]">Key Elements</h3>
                <ul className="space-y-2 text-[var(--foreground)]">
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--accent)] font-bold">•</span>
                    <span><strong>Geography & Environment:</strong> Landscapes, climate, natural resources, and how they shape civilization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--accent)] font-bold">•</span>
                    <span><strong>History & Lore:</strong> Past events, legends, and how they influence current society</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--accent)] font-bold">•</span>
                    <span><strong>Culture & Society:</strong> Social structures, customs, religions, and daily life</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--accent)] font-bold">•</span>
                    <span><strong>Technology & Magic:</strong> Systems that define what's possible in your world</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-[var(--accent)]">The Creative Process</h3>
                <p className="text-[var(--foreground)] leading-relaxed mb-4">
                  Worldbuilding is both an art and a science. It begins with a core concept—a "what if" question 
                  that sparks the imagination. From there, creators develop the world through research, 
                  experimentation, and iterative refinement.
                </p>
                <p className="text-[var(--foreground)] leading-relaxed">
                  The process often involves extensive research into real-world systems, cultures, and sciences 
                  to create believable foundations for fictional elements.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-[var(--accent)]">Applications & Impact</h3>
                <p className="text-[var(--foreground)] leading-relaxed mb-4">
                  Worldbuilding appears in countless forms: the detailed maps of Middle-earth, the complex 
                  political systems of Westeros, the technological wonders of Star Trek, and the magical 
                  systems of Harry Potter. Each demonstrates how thorough worldbuilding creates immersive, 
                  believable experiences.
                </p>
                <p className="text-[var(--foreground)] leading-relaxed">
                  Beyond entertainment, worldbuilding skills are valuable in game design, urban planning, 
                  education, and any field that requires creating coherent, complex systems.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-[var(--accent)]">The Challenge</h3>
                <p className="text-[var(--foreground)] leading-relaxed">
                  The greatest challenge in worldbuilding is maintaining consistency while allowing for 
                  wonder and surprise. A world must feel both familiar enough to be understood and 
                  different enough to be fascinating. It's a delicate balance between creativity and logic, 
                  imagination and believability.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* History of Worldbuilding Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4 text-[var(--foreground)]">A Brief History of Worldbuilding</h2>
          <p className="text-lg text-[var(--accent)] max-w-3xl mx-auto">
            From ancient myths to modern epics, worldbuilding has evolved through the work of visionary creators 
            who dared to imagine entire universes from scratch.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* J.R.R. Tolkien */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.2 }}
            className="bg-[var(--card)] rounded-lg p-6 border-2 border-[var(--accent)]"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-800 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[var(--foreground)]">J.R.R. Tolkien</h3>
                <p className="text-sm text-[var(--accent)]">The Father of Modern Fantasy</p>
              </div>
            </div>
            <p className="text-[var(--foreground)] leading-relaxed mb-4">
              Tolkien's Middle-earth set the gold standard for worldbuilding. He created complete languages (Elvish, Dwarvish), 
              detailed maps, extensive genealogies, and a mythology spanning thousands of years. His work demonstrated that 
              worldbuilding could be as complex and layered as real-world history.
            </p>
            <p className="text-[var(--foreground)] leading-relaxed">
              <strong>Legacy:</strong> The Lord of the Rings trilogy showed how deep worldbuilding could create 
              immersive experiences that felt authentic and lived-in.
            </p>
          </motion.div>

          {/* C.S. Lewis */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.4 }}
            className="bg-[var(--card)] rounded-lg p-6 border-2 border-[var(--accent)]"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[var(--foreground)]">C.S. Lewis</h3>
                <p className="text-sm text-[var(--accent)]">The Allegorical Worldbuilder</p>
              </div>
            </div>
            <p className="text-[var(--foreground)] leading-relaxed mb-4">
              Lewis's Narnia combined Christian allegory with rich fantasy elements. He created a world where 
              talking animals, mythical creatures, and magical portals coexisted with deeper philosophical themes. 
              His worldbuilding served both story and meaning.
            </p>
            <p className="text-[var(--foreground)] leading-relaxed">
              <strong>Legacy:</strong> The Chronicles of Narnia proved that worldbuilding could carry profound 
              themes while remaining accessible to all ages.
            </p>
          </motion.div>

          {/* Frank Herbert */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.6 }}
            className="bg-[var(--card)] rounded-lg p-6 border-2 border-[var(--accent)]"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-orange-800 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">H</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[var(--foreground)]">Frank Herbert</h3>
                <p className="text-sm text-[var(--accent)]">The Ecological Worldbuilder</p>
              </div>
            </div>
            <p className="text-[var(--foreground)] leading-relaxed mb-4">
              Herbert's Dune universe revolutionized science fiction worldbuilding by focusing on ecology, 
              politics, and religion. He created Arrakis as a fully realized desert planet with its own 
              ecosystem, culture, and complex political systems.
            </p>
            <p className="text-[var(--foreground)] leading-relaxed">
              <strong>Legacy:</strong> Dune showed how worldbuilding could explore real-world issues like 
              environmentalism, resource scarcity, and political power through fictional worlds.
            </p>
          </motion.div>

          {/* George Lucas */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.8 }}
            className="bg-[var(--card)] rounded-lg p-6 border-2 border-[var(--accent)]"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[var(--foreground)]">George Lucas</h3>
                <p className="text-sm text-[var(--accent)]">The Cinematic Worldbuilder</p>
              </div>
            </div>
            <p className="text-[var(--foreground)] leading-relaxed mb-4">
              Lucas's Star Wars universe brought worldbuilding to the masses through film. He created a 
              galaxy far, far away with diverse planets, species, cultures, and a rich mythology that 
              expanded far beyond the original films.
            </p>
            <p className="text-[var(--foreground)] leading-relaxed">
              <strong>Legacy:</strong> Star Wars demonstrated how worldbuilding could create cultural 
              phenomena and inspire generations of creators across multiple media.
            </p>
          </motion.div>

          {/* J.K. Rowling */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 3.0 }}
            className="bg-[var(--card)] rounded-lg p-6 border-2 border-[var(--accent)]"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[var(--foreground)]">J.K. Rowling</h3>
                <p className="text-sm text-[var(--accent)]">The Modern Fantasy Pioneer</p>
              </div>
            </div>
            <p className="text-[var(--foreground)] leading-relaxed mb-4">
              Rowling's Wizarding World created a magical society hidden within our own reality. She built 
              an intricate system of magic, education, government, and culture that felt both fantastical 
              and believably bureaucratic.
            </p>
            <p className="text-[var(--foreground)] leading-relaxed">
              <strong>Legacy:</strong> Harry Potter showed how worldbuilding could create a sense of wonder 
              while addressing real-world themes of prejudice, power, and coming of age.
            </p>
          </motion.div>

          {/* Ursula K. Le Guin */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 3.2 }}
            className="bg-[var(--card)] rounded-lg p-6 border-2 border-[var(--accent)]"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-600 to-teal-800 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[var(--foreground)]">Ursula K. Le Guin</h3>
                <p className="text-sm text-[var(--accent)]">The Anthropological Worldbuilder</p>
              </div>
            </div>
            <p className="text-[var(--foreground)] leading-relaxed mb-4">
              Le Guin's Earthsea and Hainish universes explored cultural anthropology through fiction. She 
              created societies that challenged gender norms, explored alternative social structures, and 
              examined how environment shapes culture.
            </p>
            <p className="text-[var(--foreground)] leading-relaxed">
              <strong>Legacy:</strong> Her work demonstrated how worldbuilding could be a tool for social 
              commentary and philosophical exploration of human nature.
            </p>
          </motion.div>

          {/* Octavia Butler */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 3.4 }}
            className="bg-[var(--card)] rounded-lg p-6 border-2 border-[var(--accent)]"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[var(--foreground)]">Octavia Butler</h3>
                <p className="text-sm text-[var(--accent)]">The Afrofuturist Visionary</p>
              </div>
            </div>
            <p className="text-[var(--foreground)] leading-relaxed mb-4">
              Butler's Parable and Patternist series created worlds that explored power dynamics, 
              biological evolution, and social change. Her short stories like "Bloodchild" and "Speech Sounds" 
              created intimate yet expansive worlds that examined human relationships and survival in alien environments. 
              Afrofuturism, which she pioneered, combines African diaspora culture with science fiction to imagine 
              alternative futures and realities.
            </p>
            <p className="text-[var(--foreground)] leading-relaxed">
              <strong>Legacy:</strong> Butler pioneered Afrofuturism and showed how worldbuilding could 
              address issues of race, gender, and power while imagining radically different futures.
            </p>
          </motion.div>

          {/* Todd Howard & Bethesda */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 3.6 }}
            className="bg-[var(--card)] rounded-lg p-6 border-2 border-[var(--accent)]"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[var(--foreground)]">Todd Howard & Bethesda</h3>
                <p className="text-sm text-[var(--accent)]">The Interactive Worldbuilders</p>
              </div>
            </div>
            <p className="text-[var(--foreground)] leading-relaxed mb-4">
              Howard and Bethesda revolutionized worldbuilding through interactive media. Their Elder Scrolls, 
              Fallout, and Starfield series created vast, explorable worlds where every location tells a story, every 
              object has history, and players become part of the world's ongoing narrative. Their environmental 
              storytelling approach—where every detail contributes to lore—has influenced countless developers.
            </p>
            <p className="text-[var(--foreground)] leading-relaxed">
              <strong>Legacy:</strong> They proved that worldbuilding could be participatory, allowing 
              players to discover and shape stories within meticulously crafted universes.
            </p>
          </motion.div>

          {/* Ubisoft */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 3.8 }}
            className="bg-[var(--card)] rounded-lg p-6 border-2 border-[var(--accent)]"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">U</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[var(--foreground)]">Ubisoft</h3>
                <p className="text-sm text-[var(--accent)]">The Historical Worldbuilders</p>
              </div>
            </div>
            <p className="text-[var(--foreground)] leading-relaxed mb-4">
              Ubisoft's Assassin's Creed series has redefined historical worldbuilding in gaming. Each 
              installment painstakingly recreates historical periods with architectural accuracy, cultural 
              authenticity, and immersive detail that makes players feel they're truly walking through 
              Renaissance Florence, Ancient Egypt, or Viking-era England.
            </p>
            <p className="text-[var(--foreground)] leading-relaxed">
              <strong>Legacy:</strong> They've shown how worldbuilding can serve as both entertainment 
              and education, bringing history to life through interactive experiences that respect 
              historical accuracy while maintaining engaging gameplay.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Worldbuilding Table of Elements */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4 text-[var(--foreground)]">Worldbuilding Table of Elements</h2>
          <p className="text-lg text-[var(--accent)] max-w-3xl mx-auto">
            A comprehensive guide to the fundamental elements that make up any fictional world, 
            organized like a periodic table of worldbuilding components.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 3.2 }}
          className="bg-[var(--card)] rounded-xl p-8 border-2 border-[var(--accent)] shadow-xl"
        >
          {/* Table Header */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-[var(--foreground)] mb-2">WORLDBUILDING TABLE OF ELEMENTS</h3>
            <p className="text-[var(--accent)]">Essential components for creating immersive fictional worlds</p>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-8 p-6 bg-[var(--background)] rounded-lg border border-[var(--accent)]">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-white border-2 border-gray-400 rounded shadow-sm"></div>
              <span className="text-sm font-medium text-[var(--foreground)]">General</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-blue-300 rounded shadow-sm"></div>
              <span className="text-sm font-medium text-[var(--foreground)]">Ecological</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-green-300 rounded shadow-sm"></div>
              <span className="text-sm font-medium text-[var(--foreground)]">Cultural</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-orange-300 rounded shadow-sm"></div>
              <span className="text-sm font-medium text-[var(--foreground)]">Organizational</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-cyan-300 rounded shadow-sm"></div>
              <span className="text-sm font-medium text-[var(--foreground)]">Historical</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-blue-400 rounded shadow-sm"></div>
              <span className="text-sm font-medium text-[var(--foreground)]">Linguistic</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-indigo-400 rounded shadow-sm"></div>
              <span className="text-sm font-medium text-[var(--foreground)]">Technological</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-red-300 rounded shadow-sm"></div>
              <span className="text-sm font-medium text-[var(--foreground)]">Geopolitical</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-yellow-300 rounded shadow-sm"></div>
              <span className="text-sm font-medium text-[var(--foreground)]">Economic</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-purple-300 rounded shadow-sm"></div>
              <span className="text-sm font-medium text-[var(--foreground)]">Infrastructural</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-pink-300 rounded shadow-sm"></div>
              <span className="text-sm font-medium text-[var(--foreground)]">Religious</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-purple-500 rounded shadow-sm"></div>
              <span className="text-sm font-medium text-[var(--foreground)]">Fantastic</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-red-600 rounded shadow-sm"></div>
              <span className="text-sm font-medium text-[var(--foreground)]">Nefarious</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-gray-400 rounded shadow-sm"></div>
              <span className="text-sm font-medium text-[var(--foreground)]">Environmental</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-gray-600 rounded shadow-sm"></div>
              <span className="text-sm font-medium text-[var(--foreground)]">Cosmic</span>
            </div>
          </div>

          {/* Main Grid - Organized by Category Like Periodic Table */}
          <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-2 mb-8">
            {/* Row 1 - Cultural Elements (Green) */}
            <div className="bg-green-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Genre</div>
            <div className="bg-green-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Art</div>
            <div className="bg-green-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Architecture</div>
            <div className="bg-green-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Etiquette</div>
            <div className="bg-green-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Body Adornment</div>
            <div className="bg-green-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Tone</div>
            <div className="bg-green-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Music</div>
            <div className="bg-green-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Fashion</div>
            <div className="bg-green-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Taboos</div>
            <div className="bg-green-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Morals</div>
            <div className="bg-green-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Poetry</div>
            <div className="bg-green-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Sports</div>

            {/* Row 2 - Ecological Elements (Blue) */}
            <div className="bg-blue-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Flora</div>
            <div className="bg-blue-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Behavior</div>
            <div className="bg-blue-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Ecosystems</div>
            <div className="bg-blue-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Predation</div>
            <div className="bg-blue-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Agriculture</div>
            <div className="bg-blue-400 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Figures of Speech</div>
            <div className="bg-blue-400 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Alphabets</div>
            <div className="bg-blue-400 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Slang</div>
            <div className="bg-blue-400 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Propaganda</div>
            <div className="bg-indigo-400 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Tools</div>
            <div className="bg-indigo-400 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Comms</div>
            <div className="bg-indigo-400 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Arms & Armor</div>

            {/* Row 3 - Organizational Elements (Orange) */}
            <div className="bg-orange-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Guilds</div>
            <div className="bg-orange-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Timekeeping</div>
            <div className="bg-orange-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Hierarchies</div>
            <div className="bg-orange-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Heraldry</div>
            <div className="bg-orange-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Schools</div>
            <div className="bg-orange-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Medicine</div>
            <div className="bg-cyan-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Fossils</div>
            <div className="bg-cyan-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Histories</div>
            <div className="bg-cyan-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Artifacts</div>
            <div className="bg-cyan-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Legends</div>
            <div className="bg-cyan-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Ruins</div>
            <div className="bg-cyan-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">World Era</div>
            <div className="bg-indigo-400 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Future Tech</div>

            {/* Row 4 - Geopolitical Elements (Red) */}
            <div className="bg-red-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Political Events</div>
            <div className="bg-red-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Governments</div>
            <div className="bg-red-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">War</div>
            <div className="bg-red-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Law</div>
            <div className="bg-yellow-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Currencies</div>
            <div className="bg-yellow-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Businesses</div>
            <div className="bg-yellow-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Resources</div>
            <div className="bg-yellow-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Rare Goods</div>
            <div className="bg-purple-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Water Systems</div>
            <div className="bg-purple-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Power Systems</div>
            <div className="bg-purple-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Transport</div>
            <div className="bg-purple-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Waste Systems</div>

            {/* Row 5 - Religious Elements (Pink) */}
            <div className="bg-pink-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Gods</div>
            <div className="bg-pink-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Religions</div>
            <div className="bg-pink-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Sacred Texts</div>
            <div className="bg-pink-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Rituals</div>
            <div className="bg-purple-500 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Magical Creatures</div>
            <div className="bg-purple-500 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Spells</div>
            <div className="bg-purple-500 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Unique Abilities</div>
            <div className="bg-purple-500 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Alien Life</div>
            <div className="bg-purple-500 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">AI</div>
            <div className="bg-purple-500 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Mutations</div>
            <div className="bg-gray-400 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Deserts</div>

            {/* Row 6 - Environmental Elements (Gray) */}
            <div className="bg-gray-400 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Badlands</div>
            <div className="bg-gray-400 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Forests</div>
            <div className="bg-gray-400 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Rivers</div>
            <div className="bg-gray-400 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Mountains</div>
            <div className="bg-gray-400 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Fields</div>
            <div className="bg-gray-400 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Oceans</div>
            <div className="bg-gray-400 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Arctic</div>
            <div className="bg-gray-400 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Jungles</div>
            <div className="bg-gray-400 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Islands</div>
            <div className="bg-gray-400 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Aquatic</div>
            <div className="bg-gray-400 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Subterranean</div>
            <div className="bg-gray-400 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Volcanic</div>

            {/* Row 7 - Cosmic & Nefarious Elements */}
            <div className="bg-gray-400 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Swamps</div>
            <div className="bg-gray-600 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-white shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Galaxies</div>
            <div className="bg-gray-600 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-white shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Solar Systems</div>
            <div className="bg-gray-600 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-white shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Stars</div>
            <div className="bg-gray-600 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-white shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Planets</div>
            <div className="bg-gray-600 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-white shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Moons</div>
            <div className="bg-red-600 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-white shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Crime</div>
            <div className="bg-red-600 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-white shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Cults</div>
            <div className="bg-red-600 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-white shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Forbidden Magic</div>
            <div className="bg-red-600 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-white shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Illicit Goods</div>
            <div className="bg-red-600 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-white shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">System Failures</div>
            <div className="bg-red-600 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-white shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Disease</div>
          </div>

          {/* Core Elements - Bottom Row */}
          <div className="mt-8">
            <div className="grid grid-cols-5 gap-2">
              <div className="bg-white border-2 border-gray-400 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Maps</div>
              <div className="bg-white border-2 border-gray-400 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Timelines</div>
              <div className="bg-white border-2 border-gray-400 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Peoples</div>
              <div className="bg-white border-2 border-gray-400 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Lineages</div>
              <div className="bg-white border-2 border-gray-400 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center">Creatures</div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-8 p-6 bg-gradient-to-r from-[var(--accent)]/10 to-[var(--highlight)]/10 rounded-xl border border-[var(--accent)]/20">
            <p className="text-[var(--foreground)] leading-relaxed text-center">
              This table represents the fundamental building blocks of worldbuilding. Each element can be 
              developed in detail to create rich, immersive fictional worlds. The color coding helps 
              organize elements by category, making it easier to ensure comprehensive world development.
              <br /><br />
              <span className="font-semibold text-[var(--accent)]">Inspired by the periodic table of Worldbuilding on Reddit!</span>
            </p>
          </div>
        </motion.div>
      </section>

      <style jsx>{`
        @keyframes orbit {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
} 