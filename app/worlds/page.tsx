'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Worldbuilding() {
  const [mounted, setMounted] = useState(false);
  const [selectedPlanet, setSelectedPlanet] = useState<number | string | null>(null);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePlanetClick = (planetId: number | string) => {
    setSelectedPlanet(selectedPlanet === planetId ? null : planetId);
  };

  const handleElementClick = (elementName: string) => {
    setSelectedElement(selectedElement === elementName ? null : elementName);
  };

  // Detailed element definitions with examples and quotes
  const elementDetails = {
    "Genre": {
      definition: "The fundamental category or style that defines the overall tone and conventions of a world. Genre establishes reader expectations and provides a framework for worldbuilding decisions.",
      examples: "Fantasy (Lord of the Rings), Science Fiction (Dune), Horror (The Shining), Western (True Grit), Historical Fiction (The Pillars of the Earth)",
      quote: "Genre is not a cage but a playground. It provides the rules that make the game worth playing.",
      category: "Cultural"
    },
    "Art": {
      definition: "The visual, musical, and performative expressions that reflect a world's culture, values, and aesthetic sensibilities. Art reveals what a society considers beautiful, meaningful, or worthy of preservation.",
      examples: "Renaissance paintings in Assassin's Creed, Elvish architecture in Lord of the Rings, Klingon opera in Star Trek, Mandalorian armor in Star Wars",
      quote: "Art is the lie that enables us to realize the truth. In worldbuilding, it's the truth that enables us to realize the lie.",
      category: "Cultural"
    },
    "Architecture": {
      definition: "The built environment that shapes how people live, work, and interact. Architecture reflects technological capabilities, cultural values, environmental adaptation, and social organization.",
      examples: "Gothic cathedrals in medieval fantasy, Brutalist structures in dystopian sci-fi, organic buildings in Avatar, floating cities in Final Fantasy",
      quote: "Architecture is the art of creating spaces that tell stories without words.",
      category: "Cultural"
    },
    "Etiquette": {
      definition: "The unwritten rules of social behavior that govern interactions between individuals and groups. Etiquette reveals power dynamics, cultural priorities, and social hierarchies.",
      examples: "Bowing in Japanese culture, hand gestures in Dune, formal address in Game of Thrones, greeting rituals in Avatar",
      quote: "Manners are the lubricating oil of society. In worldbuilding, they reveal the friction points.",
      category: "Cultural"
    },
    "Body Adornment": {
      definition: "The ways people modify their appearance through clothing, jewelry, tattoos, piercings, and other body modifications. These choices communicate identity, status, and cultural belonging.",
      examples: "Mandalorian armor in Star Wars, facial tattoos in Avatar, royal crowns in fantasy, cybernetic implants in cyberpunk",
      quote: "The body is the canvas of culture. Every mark tells a story of belonging or rebellion.",
      category: "Cultural"
    },
    "Tone": {
      definition: "The emotional atmosphere and mood that pervades a world. Tone influences how readers experience and interpret the world's events and characters.",
      examples: "Grimdark in Game of Thrones, whimsical in Alice in Wonderland, hopeful in Star Trek, melancholic in Blade Runner",
      quote: "Tone is the world's personality. It colors every interaction and shapes every story.",
      category: "Cultural"
    },
    "Music": {
      definition: "The sonic landscape that provides emotional context and cultural expression. Music can reveal history, celebrate traditions, or signal social change.",
      examples: "Elvish songs in Lord of the Rings, Klingon opera in Star Trek, cantina music in Star Wars, orchestral scores in fantasy films",
      quote: "Music is the universal language of emotion. In worldbuilding, it's the soundtrack of culture.",
      category: "Cultural"
    },
    "Fashion": {
      definition: "The clothing and style choices that reflect social status, cultural identity, and historical period. Fashion communicates wealth, profession, and personal expression.",
      examples: "Victorian dresses in steampunk, Jedi robes in Star Wars, armor in medieval fantasy, futuristic suits in sci-fi",
      quote: "Fashion is the armor we choose. It protects our identity and announces our tribe.",
      category: "Cultural"
    },
    "Taboos": {
      definition: "The forbidden actions, topics, or behaviors that define a culture's boundaries. Taboos reveal what a society fears, values, or considers sacred.",
      examples: "Magic use in some fantasy worlds, technology in Amish communities, certain foods in religious contexts, forbidden relationships in many cultures",
      quote: "Taboos are the walls that protect a culture's core values. Breaking them reveals what matters most.",
      category: "Cultural"
    },
    "Morals": {
      definition: "The ethical principles and value systems that guide behavior and decision-making. Morals shape laws, social norms, and individual character development.",
      examples: "Honor codes in samurai culture, chivalry in medieval fantasy, utilitarianism in some sci-fi, religious morality in many worlds",
      quote: "Morality is the compass that guides characters through the moral landscape of your world.",
      category: "Cultural"
    },
    "Poetry": {
      definition: "The literary art form that captures emotion, history, and cultural values through structured language. Poetry preserves traditions and expresses collective identity.",
      examples: "Elvish poetry in Lord of the Rings, Klingon poetry in Star Trek, epic poems in fantasy, haiku in Japanese-inspired worlds",
      quote: "Poetry is the distillation of culture into its most essential form.",
      category: "Cultural"
    },
    "Sports": {
      definition: "The competitive activities and games that provide entertainment, social bonding, and cultural expression. Sports reveal what a society values and how it handles competition.",
      examples: "Quidditch in Harry Potter, pod racing in Star Wars, gladiatorial combat in historical fiction, futuristic sports in sci-fi",
      quote: "Sports are the theater of human potential. They show us what we can become.",
      category: "Cultural"
    },
    "Flora": {
      definition: "The plant life that shapes ecosystems, provides resources, and influences culture. Flora determines agriculture, medicine, and environmental adaptation.",
      examples: "Ents in Lord of the Rings, bioluminescent plants in Avatar, spice plants in Dune, magical herbs in fantasy",
      quote: "Plants are the silent architects of civilization. They feed us, heal us, and inspire us.",
      category: "Ecological"
    },
    "Behavior": {
      definition: "The patterns of action and interaction that define how creatures and people function within their environment. Behavior reveals adaptation, intelligence, and social complexity.",
      examples: "Animal migration patterns, social hierarchies in wolf packs, mating rituals, territorial behavior, cooperative hunting",
      quote: "Behavior is the language of survival. Every action tells a story of adaptation.",
      category: "Ecological"
    },
    "Ecosystems": {
      definition: "The complex web of relationships between living organisms and their environment. Ecosystems determine resource availability, species interactions, and environmental stability.",
      examples: "Coral reefs, rainforests, desert oases, tundra, deep sea vents, urban ecosystems",
      quote: "Ecosystems are nature's cities. Every species has a role, every relationship matters.",
      category: "Ecological"
    },
    "Predation": {
      definition: "The hunting and feeding relationships that drive evolution and maintain ecological balance. Predation shapes behavior, physical adaptations, and population dynamics.",
      examples: "Lion and gazelle relationships, apex predators in fantasy worlds, alien hunting in sci-fi, magical creatures in fantasy",
      quote: "Predation is the engine of evolution. It drives adaptation and shapes survival strategies.",
      category: "Ecological"
    },
    "Agriculture": {
      definition: "The cultivation of plants and domestication of animals for food and resources. Agriculture enables population growth, social complexity, and technological advancement.",
      examples: "Rice farming in Asian cultures, wheat cultivation in medieval Europe, hydroponics in sci-fi, magical farming in fantasy",
      quote: "Agriculture is the foundation of civilization. It turns nomads into builders of cities.",
      category: "Ecological"
    },
    "Figures of Speech": {
      definition: "The linguistic devices and expressions that add color, meaning, and cultural flavor to language. Figures of speech reveal how people think and what they value.",
      examples: "Metaphors based on local wildlife, proverbs from historical events, idioms reflecting cultural values, similes using familiar objects",
      quote: "Language is the mirror of culture. Every figure of speech reflects a way of seeing the world.",
      category: "Linguistic"
    },
    "Alphabets": {
      definition: "The writing systems that preserve knowledge, facilitate communication, and express cultural identity. Alphabets enable record-keeping, literature, and education.",
      examples: "Elvish script in Lord of the Rings, Klingon writing in Star Trek, hieroglyphics in historical fiction, futuristic symbols in sci-fi",
      quote: "Writing is the technology that made civilization possible. It preserves the past and shapes the future.",
      category: "Linguistic"
    },
    "Slang": {
      definition: "The informal language and expressions that develop within specific groups or subcultures. Slang reveals social dynamics, generational differences, and cultural evolution.",
      examples: "Thieves' cant in fantasy, military jargon in war stories, youth language in contemporary fiction, technical slang in sci-fi",
      quote: "Slang is the language of belonging. It marks insiders and excludes outsiders.",
      category: "Linguistic"
    },
    "Propaganda": {
      definition: "The communication techniques used to influence public opinion and behavior. Propaganda reveals power structures, social control, and ideological conflicts.",
      examples: "Political posters in dystopian fiction, religious texts in fantasy, news media in contemporary stories, government announcements in sci-fi",
      quote: "Propaganda is the weapon of the mind. It shapes reality by controlling perception.",
      category: "Linguistic"
    },
    "Tools": {
      definition: "The implements and devices that extend human capabilities and enable technological advancement. Tools reflect available materials, technical knowledge, and cultural priorities.",
      examples: "Stone tools in prehistoric settings, magical implements in fantasy, advanced technology in sci-fi, specialized equipment in various professions",
      quote: "Tools are the extensions of human will. They turn dreams into reality.",
      category: "Technological"
    },
    "Comms": {
      definition: "The communication systems that connect people across distance and time. Communication technology shapes social organization, information flow, and cultural exchange.",
      examples: "Messenger birds in fantasy, radio in historical fiction, holograms in sci-fi, magical communication in fantasy",
      quote: "Communication is the nervous system of civilization. It connects every part to the whole.",
      category: "Technological"
    },
    "Arms & Armor": {
      definition: "The weapons and protective equipment that enable conflict and defense. Arms and armor reflect technological capabilities, cultural values, and historical context.",
      examples: "Swords and shields in medieval fantasy, laser weapons in sci-fi, magical armor in fantasy, historical weapons in period fiction",
      quote: "Arms and armor are the tools of survival. They protect life and take it.",
      category: "Technological"
    },
    "Guilds": {
      definition: "The professional organizations that regulate trades, maintain standards, and provide social structure. Guilds ensure quality, preserve knowledge, and create social networks.",
      examples: "Mage guilds in fantasy, merchant guilds in historical fiction, trade unions in contemporary stories, professional associations in any setting",
      quote: "Guilds are the guardians of craft. They preserve knowledge and maintain standards.",
      category: "Organizational"
    },
    "Timekeeping": {
      definition: "The systems for measuring and organizing time that structure daily life and social coordination. Timekeeping enables planning, scheduling, and historical record-keeping.",
      examples: "Sundials in ancient settings, mechanical clocks in medieval fantasy, digital time in contemporary fiction, alien time systems in sci-fi",
      quote: "Time is the currency of life. How we measure it shapes how we live it.",
      category: "Organizational"
    },
    "Hierarchies": {
      definition: "The social structures that organize people into ranks and establish power relationships. Hierarchies determine access to resources, decision-making authority, and social mobility.",
      examples: "Feudal systems in medieval fantasy, caste systems in some cultures, corporate hierarchies in contemporary fiction, alien social structures in sci-fi",
      quote: "Hierarchy is the architecture of society. It determines who leads and who follows.",
      category: "Organizational"
    },
    "Heraldry": {
      definition: "The system of symbols and colors used to identify individuals, families, and organizations. Heraldry communicates identity, status, and allegiance.",
      examples: "Family crests in medieval fantasy, corporate logos in contemporary fiction, military insignia in war stories, magical symbols in fantasy",
      quote: "Heraldry is the language of identity. Every symbol tells a story of belonging.",
      category: "Organizational"
    },
    "Schools": {
      definition: "The institutions that educate, socialize, and prepare individuals for their roles in society. Schools transmit knowledge, values, and cultural traditions.",
      examples: "Hogwarts in Harry Potter, military academies in war stories, trade schools in historical fiction, alien education in sci-fi",
      quote: "Education is the foundation of civilization. It turns children into citizens.",
      category: "Organizational"
    },
    "Medicine": {
      definition: "The practices and knowledge used to maintain health, treat illness, and prolong life. Medicine reflects technological capabilities, cultural beliefs, and social priorities.",
      examples: "Herbal medicine in fantasy, modern medicine in contemporary fiction, alien healing in sci-fi, magical healing in fantasy",
      quote: "Medicine is the art of preserving life. It reveals what we value most.",
      category: "Organizational"
    },
    "Fossils": {
      definition: "The preserved remains of ancient life that reveal evolutionary history and environmental change. Fossils provide evidence of past worlds and extinct species.",
      examples: "Dinosaur fossils in prehistoric settings, ancient ruins in fantasy, archaeological finds in historical fiction, alien artifacts in sci-fi",
      quote: "Fossils are the footprints of time. They tell stories of worlds that once were.",
      category: "Historical"
    },
    "Histories": {
      definition: "The recorded accounts of past events that shape cultural identity and inform present decisions. Histories preserve knowledge, justify actions, and guide future choices.",
      examples: "Chronicles in fantasy worlds, historical records in period fiction, oral traditions in many cultures, alien histories in sci-fi",
      quote: "History is the teacher of life. It shows us where we came from and where we might go.",
      category: "Historical"
    },
    "Artifacts": {
      definition: "The objects and items from the past that carry cultural, historical, or magical significance. Artifacts preserve knowledge, demonstrate craftsmanship, and connect present to past.",
      examples: "Ancient weapons in fantasy, historical documents in period fiction, magical items in fantasy, alien technology in sci-fi",
      quote: "Artifacts are the bridges between past and present. They carry stories across time.",
      category: "Historical"
    },
    "Legends": {
      definition: "The traditional stories and myths that explain origins, teach lessons, and preserve cultural values. Legends provide meaning, entertainment, and moral guidance.",
      examples: "Creation myths in fantasy worlds, hero stories in many cultures, cautionary tales, origin stories in sci-fi",
      quote: "Legends are the dreams of culture. They reveal what we hope and what we fear.",
      category: "Historical"
    },
    "Ruins": {
      definition: "The remains of past civilizations that provide evidence of historical events and cultural achievements. Ruins inspire wonder, preserve knowledge, and warn of decline.",
      examples: "Ancient temples in fantasy, abandoned cities in post-apocalyptic fiction, historical ruins in period stories, alien structures in sci-fi",
      quote: "Ruins are the monuments to human ambition. They remind us that even the greatest can fall.",
      category: "Historical"
    },
    "World Era": {
      definition: "The historical period or technological age that defines the world's context and capabilities. World era determines available technology, social structures, and cultural norms.",
      examples: "Medieval period in fantasy, Victorian era in steampunk, modern day in contemporary fiction, far future in sci-fi",
      quote: "Every era has its own rhythm. The world era sets the tempo for all that follows.",
      category: "Historical"
    },
    "Future Tech": {
      definition: "The advanced technologies that extend beyond current capabilities and enable new possibilities. Future tech shapes society, creates new problems, and opens new opportunities.",
      examples: "Artificial intelligence in sci-fi, magical technology in fantasy, advanced medicine in futuristic stories, alien technology in space fiction",
      quote: "Technology is the magic of the future. It turns impossible dreams into everyday reality.",
      category: "Technological"
    },
    "Political Events": {
      definition: "The significant occurrences that shape governance, power structures, and social organization. Political events create change, establish precedents, and influence future decisions.",
      examples: "Revolutions in historical fiction, elections in contemporary stories, coups in political thrillers, alien politics in sci-fi",
      quote: "Politics is the art of the possible. Political events show us what change looks like.",
      category: "Geopolitical"
    },
    "Governments": {
      definition: "The systems and institutions that exercise authority and maintain social order. Governments determine rights, responsibilities, and the distribution of power and resources.",
      examples: "Monarchies in fantasy, democracies in contemporary fiction, dictatorships in dystopian stories, alien governments in sci-fi",
      quote: "Government is the framework of society. It determines who rules and how.",
      category: "Geopolitical"
    },
    "War": {
      definition: "The organized conflict between groups that shapes borders, power dynamics, and cultural development. War drives technological innovation, social change, and historical evolution.",
      examples: "World War II in historical fiction, fantasy wars in epic stories, civil wars in political fiction, alien conflicts in sci-fi",
      quote: "War is the crucible of change. It destroys and creates in equal measure.",
      category: "Geopolitical"
    },
    "Law": {
      definition: "The formal rules and systems that regulate behavior and resolve conflicts. Law establishes order, protects rights, and reflects cultural values and power structures.",
      examples: "Common law in contemporary fiction, magical law in fantasy, alien legal systems in sci-fi, historical legal codes in period stories",
      quote: "Law is the foundation of civilization. It turns chaos into order.",
      category: "Geopolitical"
    },
    "Currencies": {
      definition: "The systems of exchange that facilitate trade and measure value. Currencies enable economic activity, reflect cultural values, and influence social relationships.",
      examples: "Gold coins in fantasy, paper money in contemporary fiction, digital currency in sci-fi, barter systems in some cultures",
      quote: "Money is the language of value. It speaks of what we treasure and what we trade.",
      category: "Economic"
    },
    "Businesses": {
      definition: "The organizations that produce goods and services to meet human needs and desires. Businesses drive economic activity, create employment, and shape social organization.",
      examples: "Merchant guilds in fantasy, corporations in contemporary fiction, alien enterprises in sci-fi, family businesses in many settings",
      quote: "Business is the engine of prosperity. It turns ideas into wealth.",
      category: "Economic"
    },
    "Resources": {
      definition: "The materials and substances that provide value and enable human activity. Resources determine economic power, technological capabilities, and social organization.",
      examples: "Precious metals in fantasy, oil in contemporary fiction, rare minerals in sci-fi, magical materials in fantasy",
      quote: "Resources are the building blocks of civilization. They determine what we can build and who can build it.",
      category: "Economic"
    },
    "Rare Goods": {
      definition: "The valuable items that are scarce, difficult to obtain, or highly prized. Rare goods create economic incentives, drive exploration, and establish social status.",
      examples: "Spices in historical fiction, magical items in fantasy, alien artifacts in sci-fi, luxury goods in contemporary stories",
      quote: "Rarity creates value. The scarcer something is, the more we desire it.",
      category: "Economic"
    },
    "Water Systems": {
      definition: "The infrastructure that provides clean water, manages waste, and supports human settlement. Water systems enable population growth, public health, and economic development.",
      examples: "Aqueducts in historical fiction, magical water systems in fantasy, advanced filtration in sci-fi, natural water sources in many settings",
      quote: "Water is the foundation of life. How we manage it determines how we live.",
      category: "Infrastructural"
    },
    "Power Systems": {
      definition: "The infrastructure that generates and distributes energy for human use. Power systems enable technological advancement, economic activity, and modern living standards.",
      examples: "Steam power in steampunk, magical energy in fantasy, nuclear power in sci-fi, renewable energy in contemporary fiction",
      quote: "Power is the lifeblood of civilization. It lights our cities and drives our machines.",
      category: "Infrastructural"
    },
    "Transport": {
      definition: "The systems that move people and goods from place to place. Transport enables trade, communication, and social interaction across distance.",
      examples: "Horses in fantasy, cars in contemporary fiction, spaceships in sci-fi, magical transportation in fantasy",
      quote: "Transportation is the bridge between places. It connects communities and cultures.",
      category: "Infrastructural"
    },
    "Waste Systems": {
      definition: "The infrastructure that manages and disposes of waste materials. Waste systems protect public health, preserve environmental quality, and enable sustainable development.",
      examples: "Sewer systems in urban settings, magical waste disposal in fantasy, advanced recycling in sci-fi, natural decomposition in rural areas",
      quote: "Waste management is the mirror of civilization. It shows how we value our environment.",
      category: "Infrastructural"
    },
    "Gods": {
      definition: "The divine beings or supernatural entities that influence the world and its inhabitants. Gods provide meaning, establish moral frameworks, and explain natural phenomena.",
      examples: "Greek gods in mythology, monotheistic God in religious fiction, pantheons in fantasy, alien deities in sci-fi",
      quote: "Gods are the architects of meaning. They give purpose to existence and order to chaos.",
      category: "Religious"
    },
    "Religions": {
      definition: "The organized systems of belief, worship, and moral guidance that provide meaning and community. Religions shape culture, influence politics, and guide individual behavior.",
      examples: "Christianity in historical fiction, fictional religions in fantasy, alien faiths in sci-fi, secular philosophies in contemporary stories",
      quote: "Religion is the poetry of the soul. It gives voice to our deepest questions and highest aspirations.",
      category: "Religious"
    },
    "Sacred Texts": {
      definition: "The written or oral traditions that preserve religious teachings, moral guidance, and cultural wisdom. Sacred texts provide authority, preserve knowledge, and guide behavior.",
      examples: "The Bible in religious fiction, magical texts in fantasy, alien scriptures in sci-fi, philosophical works in many settings",
      quote: "Sacred texts are the voice of the divine. They speak across time and space.",
      category: "Religious"
    },
    "Rituals": {
      definition: "The formal ceremonies and practices that mark important events, honor traditions, and strengthen community bonds. Rituals provide structure, meaning, and social cohesion.",
      examples: "Wedding ceremonies in many cultures, religious services, coming-of-age rituals, magical ceremonies in fantasy",
      quote: "Rituals are the poetry of action. They turn ordinary moments into sacred events.",
      category: "Religious"
    },
    "Magical Creatures": {
      definition: "The supernatural beings and fantastical animals that inhabit magical worlds. Magical creatures add wonder, danger, and complexity to fantasy settings.",
      examples: "Dragons in fantasy, unicorns in fairy tales, phoenixes in mythology, alien creatures in sci-fi",
      quote: "Magical creatures are the dreams of nature. They show us what life might become.",
      category: "Fantastic"
    },
    "Spells": {
      definition: "The magical formulas and incantations that manipulate reality and produce supernatural effects. Spells provide power, solve problems, and create wonder in fantasy worlds.",
      examples: "Wizard spells in fantasy, magical incantations, enchanted items, supernatural abilities",
      quote: "Magic is the art of the impossible. Spells turn dreams into reality.",
      category: "Fantastic"
    },
    "Unique Abilities": {
      definition: "The special powers and capabilities that distinguish individuals or groups from ordinary people. Unique abilities create conflict, enable heroism, and drive plot development.",
      examples: "Superpowers in superhero fiction, magical abilities in fantasy, psychic powers in sci-fi, enhanced skills in many genres",
      quote: "Unique abilities are the gifts of the extraordinary. They separate heroes from the ordinary.",
      category: "Fantastic"
    },
    "Alien Life": {
      definition: "The non-human intelligent beings that inhabit other worlds or dimensions. Alien life expands possibilities, creates conflict, and explores the nature of consciousness.",
      examples: "Vulcans in Star Trek, aliens in sci-fi, otherworldly beings in fantasy, sentient machines in many stories",
      quote: "Alien life is the mirror of humanity. It shows us who we are by showing us who we are not.",
      category: "Fantastic"
    },
    "AI": {
      definition: "The artificial intelligence systems that exhibit human-like cognition and behavior. AI raises questions about consciousness, identity, and the relationship between humans and machines.",
      examples: "HAL 9000 in 2001: A Space Odyssey, robots in sci-fi, magical constructs in fantasy, computer systems in contemporary fiction",
      quote: "Artificial intelligence is the child of human ingenuity. It asks us what it means to think.",
      category: "Fantastic"
    },
    "Mutations": {
      definition: "The genetic changes and variations that create new forms of life or alter existing ones. Mutations drive evolution, create diversity, and enable adaptation to changing environments.",
      examples: "X-Men mutations in superhero fiction, genetic modifications in sci-fi, magical transformations in fantasy, evolutionary changes in many settings",
      quote: "Mutations are nature's experiments. They test the boundaries of what life can become.",
      category: "Fantastic"
    },
    "Deserts": {
      definition: "The arid landscapes characterized by extreme temperatures, limited water, and specialized ecosystems. Deserts challenge survival, inspire wonder, and shape cultural adaptation.",
      examples: "Arrakis in Dune, Sahara Desert in historical fiction, magical deserts in fantasy, alien deserts in sci-fi",
      quote: "Deserts are the crucible of life. They test the limits of adaptation and endurance.",
      category: "Environmental"
    },
    "Badlands": {
      definition: "The harsh, inhospitable regions characterized by difficult terrain, extreme conditions, or dangerous environments. Badlands create barriers, hide secrets, and challenge exploration.",
      examples: "Wastelands in post-apocalyptic fiction, cursed lands in fantasy, toxic environments in sci-fi, dangerous territories in many stories",
      quote: "Badlands are the frontiers of civilization. They mark the boundaries of safety and order.",
      category: "Environmental"
    },
    "Forests": {
      definition: "The wooded areas characterized by dense vegetation, diverse ecosystems, and abundant life. Forests provide resources, shelter, and mystery in many world settings.",
      examples: "Mirkwood in Lord of the Rings, enchanted forests in fantasy, rainforests in adventure stories, alien forests in sci-fi",
      quote: "Forests are the lungs of the world. They breathe life into every ecosystem.",
      category: "Environmental"
    },
    "Rivers": {
      definition: "The flowing watercourses that provide transportation, resources, and natural boundaries. Rivers shape geography, enable trade, and influence settlement patterns.",
      examples: "The Mississippi in historical fiction, magical rivers in fantasy, alien waterways in sci-fi, great rivers in many cultures",
      quote: "Rivers are the arteries of the land. They carry life from mountain to sea.",
      category: "Environmental"
    },
    "Mountains": {
      definition: "The elevated landforms that create barriers, provide resources, and inspire awe. Mountains influence climate, create isolation, and offer strategic advantages.",
      examples: "The Misty Mountains in Lord of the Rings, the Alps in historical fiction, magical peaks in fantasy, alien mountains in sci-fi",
      quote: "Mountains are the bones of the earth. They rise above the ordinary and touch the sky.",
      category: "Environmental"
    },
    "Fields": {
      definition: "The open areas of cultivated land that provide food, resources, and economic value. Fields enable agriculture, support populations, and create cultural landscapes.",
      examples: "Wheat fields in historical fiction, magical crops in fantasy, alien agriculture in sci-fi, pastoral landscapes in many settings",
      quote: "Fields are the breadbasket of civilization. They feed the world and shape the landscape.",
      category: "Environmental"
    },
    "Oceans": {
      definition: "The vast bodies of saltwater that cover most of the world's surface. Oceans provide resources, enable trade, and create natural barriers and connections.",
      examples: "The Pacific in adventure stories, magical seas in fantasy, alien oceans in sci-fi, great oceans in many cultures",
      quote: "Oceans are the highways of the world. They connect continents and carry dreams.",
      category: "Environmental"
    },
    "Arctic": {
      definition: "The polar regions characterized by extreme cold, ice, and snow. Arctic environments challenge survival, create isolation, and inspire exploration.",
      examples: "The North Pole in adventure stories, frozen worlds in sci-fi, magical ice realms in fantasy, polar expeditions in historical fiction",
      quote: "The Arctic is the realm of extremes. It tests the limits of human endurance and ingenuity.",
      category: "Environmental"
    },
    "Jungles": {
      definition: "The dense, tropical forests characterized by high biodiversity, humidity, and complex ecosystems. Jungles provide resources, create challenges, and hide secrets.",
      examples: "Amazon rainforest in adventure stories, magical jungles in fantasy, alien jungles in sci-fi, tropical forests in many settings",
      quote: "Jungles are the cauldrons of life. They boil with diversity and complexity.",
      category: "Environmental"
    },
    "Islands": {
      definition: "The landmasses surrounded by water that create isolation, enable unique development, and provide strategic locations. Islands foster distinct cultures and create natural boundaries.",
      examples: "Hawaii in historical fiction, magical islands in fantasy, alien worlds in sci-fi, isolated communities in many stories",
      quote: "Islands are the laboratories of evolution. Isolation creates uniqueness.",
      category: "Environmental"
    },
    "Aquatic": {
      definition: "The water-based environments and ecosystems that support marine life and human activities. Aquatic environments provide resources, enable transportation, and create unique challenges.",
      examples: "Underwater cities in sci-fi, magical sea realms in fantasy, fishing communities in many settings, marine adventures in fiction",
      quote: "Water is the cradle of life. Aquatic environments hold the secrets of our origins.",
      category: "Environmental"
    },
    "Subterranean": {
      definition: "The underground environments and cave systems that provide shelter, resources, and mystery. Subterranean spaces create isolation, preserve secrets, and challenge exploration.",
      examples: "Moria in Lord of the Rings, underground cities in sci-fi, magical caves in fantasy, mining communities in many settings",
      quote: "The underground is the hidden world. It holds secrets that the surface has forgotten.",
      category: "Environmental"
    },
    "Volcanic": {
      definition: "The areas characterized by volcanic activity, geothermal features, and geological instability. Volcanic environments create danger, provide resources, and shape landscapes.",
      examples: "Mount Doom in Lord of the Rings, volcanic worlds in sci-fi, magical fire realms in fantasy, geological features in many settings",
      quote: "Volcanoes are the forge of the earth. They create and destroy in equal measure.",
      category: "Environmental"
    },
    "Swamps": {
      definition: "The wetland areas characterized by standing water, dense vegetation, and unique ecosystems. Swamps provide resources, create challenges, and hide secrets.",
      examples: "Dagobah in Star Wars, magical swamps in fantasy, alien wetlands in sci-fi, natural wetlands in many settings",
      quote: "Swamps are the crossroads of land and water. They are neither one nor the other, but something in between.",
      category: "Environmental"
    },
    "Galaxies": {
      definition: "The vast systems of stars, planets, and other celestial objects that provide the largest scale of cosmic organization. Galaxies create context, enable space travel, and inspire wonder.",
      examples: "The Milky Way in space fiction, alien galaxies in sci-fi, magical realms in fantasy, cosmic settings in many stories",
      quote: "Galaxies are the cities of stars. They contain countless worlds and infinite possibilities.",
      category: "Cosmic"
    },
    "Solar Systems": {
      definition: "The planetary systems orbiting around stars that provide habitable environments and enable space exploration. Solar systems create natural boundaries and enable interstellar travel.",
      examples: "Our solar system in space fiction, alien star systems in sci-fi, magical realms in fantasy, space settings in many stories",
      quote: "Solar systems are the neighborhoods of space. Each one is a world unto itself.",
      category: "Cosmic"
    },
    "Stars": {
      definition: "The massive celestial bodies that provide light, energy, and gravitational centers for planetary systems. Stars determine habitability, enable life, and inspire navigation.",
      examples: "The Sun in many settings, binary stars in sci-fi, magical stars in fantasy, stellar phenomena in space fiction",
      quote: "Stars are the beacons of the cosmos. They light the way through the darkness of space.",
      category: "Cosmic"
    },
    "Planets": {
      definition: "The celestial bodies that orbit stars and provide environments for life and civilization. Planets create diverse settings, enable exploration, and support different forms of life.",
      examples: "Earth in many stories, alien worlds in sci-fi, magical planets in fantasy, diverse worlds in space fiction",
      quote: "Planets are the homes of life. Each one is a world of infinite possibility.",
      category: "Cosmic"
    },
    "Moons": {
      definition: "The natural satellites that orbit planets and provide additional environments for exploration and settlement. Moons create tides, enable space travel, and offer unique perspectives.",
      examples: "Earth's moon in space fiction, alien moons in sci-fi, magical moons in fantasy, lunar settings in many stories",
      quote: "Moons are the companions of planets. They watch over their worlds and light their nights.",
      category: "Cosmic"
    },
    "Crime": {
      definition: "The illegal activities and criminal organizations that operate outside the law and create social problems. Crime provides conflict, drives plot, and reveals social issues.",
      examples: "Organized crime in contemporary fiction, thieves' guilds in fantasy, alien crime syndicates in sci-fi, criminal activities in many settings",
      quote: "Crime is the shadow of civilization. It shows us what happens when order breaks down.",
      category: "Nefarious"
    },
    "Cults": {
      definition: "The extremist groups and organizations that promote dangerous ideologies and practices. Cults create conflict, drive plot, and explore the darker aspects of human nature.",
      examples: "Religious cults in horror fiction, magical cults in fantasy, alien cults in sci-fi, extremist groups in many settings",
      quote: "Cults are the dark mirrors of religion. They show us how faith can be twisted.",
      category: "Nefarious"
    },
    "Forbidden Magic": {
      definition: "The dangerous and taboo magical practices that carry great risk and are often outlawed. Forbidden magic creates conflict, drives plot, and explores the consequences of power.",
      examples: "Dark magic in fantasy, necromancy in many settings, forbidden spells, dangerous magical practices",
      quote: "Forbidden magic is the path of power. It offers great rewards at terrible costs.",
      category: "Nefarious"
    },
    "Illicit Goods": {
      definition: "The illegal or restricted items that are traded in black markets and criminal networks. Illicit goods create economic incentives, drive conflict, and reveal social problems.",
      examples: "Drugs in contemporary fiction, magical contraband in fantasy, alien artifacts in sci-fi, illegal items in many settings",
      quote: "Illicit goods are the currency of the underworld. They trade in what society forbids.",
      category: "Nefarious"
    },
    "System Failures": {
      definition: "The breakdowns and malfunctions in technological, social, or magical systems that create chaos and danger. System failures drive plot, create conflict, and reveal vulnerabilities.",
      examples: "Computer failures in sci-fi, magical disasters in fantasy, infrastructure collapse in many settings, technological breakdowns",
      quote: "System failures are the cracks in civilization. They show us how fragile our order really is.",
      category: "Nefarious"
    },
    "Disease": {
      definition: "The illnesses and medical conditions that affect individuals and populations. Disease creates conflict, drives plot, and explores themes of mortality and survival.",
      examples: "Plagues in historical fiction, magical diseases in fantasy, alien pathogens in sci-fi, medical conditions in many settings",
      quote: "Disease is the great equalizer. It shows us that we are all mortal, regardless of status.",
      category: "Nefarious"
    },
    "Maps": {
      definition: "The visual representations of geographical features, political boundaries, and spatial relationships. Maps provide orientation, reveal information, and enable navigation and planning.",
      examples: "Treasure maps in adventure stories, magical maps in fantasy, star charts in sci-fi, geographical maps in many settings",
      quote: "Maps are the stories of places. They tell us where we are and where we might go.",
      category: "General"
    },
    "Timelines": {
      definition: "The chronological frameworks that organize events, establish history, and create narrative structure. Timelines provide context, enable planning, and reveal cause-and-effect relationships.",
      examples: "Historical timelines in period fiction, magical chronologies in fantasy, alien histories in sci-fi, event sequences in many stories",
      quote: "Time is the river of history. Timelines show us how events flow from past to future.",
      category: "General"
    },
    "Peoples": {
      definition: "The distinct groups and populations that inhabit the world and create cultural diversity. Peoples have unique characteristics, traditions, and ways of life that enrich the world.",
      examples: "Elves and dwarves in fantasy, alien species in sci-fi, ethnic groups in historical fiction, diverse populations in many settings",
      quote: "Peoples are the heart of the world. Their diversity creates the richness of human experience.",
      category: "General"
    },
    "Lineages": {
      definition: "The family trees and hereditary relationships that connect individuals across generations. Lineages preserve history, establish identity, and create dynastic power structures.",
      examples: "Royal families in fantasy, noble houses in historical fiction, alien dynasties in sci-fi, family histories in many settings",
      quote: "Lineages are the threads of history. They connect past to present through blood and memory.",
      category: "General"
    },
    "Creatures": {
      definition: "The animals and living beings that inhabit the world and create ecological complexity. Creatures provide resources, create challenges, and add life and diversity to the environment.",
      examples: "Dragons in fantasy, alien animals in sci-fi, magical beasts, ordinary animals in many settings",
      quote: "Creatures are the children of the world. They fill every niche and corner with life.",
      category: "General"
    }
  };

  const planets = [
    { id: 1, name: "Khelaris", size: 0.8, distance: 90, color: "#FF4500", orbitSpeed: 35 },
    { id: 2, name: "Oruneth", size: 1.2, distance: 130, color: "#D2691E", orbitSpeed: 39 },
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
          {/* Central Orange Star - Ilarion */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="absolute z-[9999] w-20 h-20 md:w-24 md:h-24 bg-gradient-to-r from-orange-400 to-amber-600 rounded-full shadow-2xl shadow-orange-400/50 cursor-pointer group hover:scale-125 hover:shadow-2xl hover:shadow-orange-400/80 transition-all duration-300"
            style={{
              boxShadow: '0 0 50px rgba(251, 146, 60, 0.6), 0 0 100px rgba(251, 146, 60, 0.3)'
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
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-400 to-amber-600" />
                <h3 className="text-xl font-bold text-[var(--foreground)]">Ilarion</h3>
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
                  <span className="text-[var(--foreground)]">K-class orange dwarf</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--accent)]">Age:</span>
                  <span className="text-[var(--foreground)]">5.3 billion years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--accent)]">Color:</span>
                  <span className="text-[var(--foreground)]">Golden-amber</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--accent)]">Light:</span>
                  <span className="text-[var(--foreground)]">Warm, fertile</span>
                </div>
                <p className="text-[var(--accent)] text-xs mt-3 italic">
                  Stable spectrum with slightly higher red/orange output — ideal for agriculture
                </p>
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
                {selectedPlanet === 1 && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-[var(--accent)]">Type:</span>
                      <span className="text-[var(--foreground)]">Volcanic inner planet</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--accent)]">Surface:</span>
                      <span className="text-[var(--foreground)]">Constant lava seas</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--accent)]">Crust:</span>
                      <span className="text-[var(--foreground)]">Rich in rare alloys</span>
                    </div>
                    <p className="text-[var(--accent)] text-xs mt-3 italic">
                      Small volcanic world with metallic crust containing valuable rare alloys beneath molten seas.
                    </p>
                  </>
                )}
                {selectedPlanet === 2 && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-[var(--accent)]">Type:</span>
                      <span className="text-[var(--foreground)]">Barren desert world</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--accent)]">Rotation:</span>
                      <span className="text-[var(--foreground)]">Tidally locked</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--accent)]">Surface:</span>
                      <span className="text-[var(--foreground)]">Shattered canyons</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--accent)]">Water:</span>
                      <span className="text-[var(--foreground)]">Ice pockets in shadow</span>
                    </div>
                    <p className="text-[var(--accent)] text-xs mt-3 italic">
                      Desert world locked in eternal day/night cycle, with deep canyon systems and occasional water-ice deposits hidden in permanent shadow.
                    </p>
                  </>
                )}
                {selectedPlanet !== 1 && selectedPlanet !== 2 && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-[var(--accent)]">Orbit Speed:</span>
                      <span className="text-[var(--foreground)]">{planets.find(p => p.id === selectedPlanet)?.orbitSpeed}s</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--accent)]">Color:</span>
                      <span className="text-[var(--foreground)]">{planets.find(p => p.id === selectedPlanet)?.color}</span>
                    </div>
                  </>
                )}
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
            <div 
              className="bg-green-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Genre")}
            >
              Genre
            </div>
            <div 
              className="bg-green-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Art")}
            >
              Art
            </div>
            <div 
              className="bg-green-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Architecture")}
            >
              Architecture
            </div>
            <div 
              className="bg-green-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Etiquette")}
            >
              Etiquette
            </div>
            <div 
              className="bg-green-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Body Adornment")}
            >
              Body Adornment
            </div>
            <div 
              className="bg-green-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Tone")}
            >
              Tone
            </div>
            <div 
              className="bg-green-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Music")}
            >
              Music
            </div>
            <div 
              className="bg-green-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Fashion")}
            >
              Fashion
            </div>
            <div 
              className="bg-green-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Taboos")}
            >
              Taboos
            </div>
            <div 
              className="bg-green-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Morals")}
            >
              Morals
            </div>
            <div 
              className="bg-green-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Poetry")}
            >
              Poetry
            </div>
            <div 
              className="bg-green-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Sports")}
            >
              Sports
            </div>

            {/* Row 2 - Ecological Elements (Blue) */}
            <div 
              className="bg-blue-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Flora")}
            >
              Flora
            </div>
            <div 
              className="bg-blue-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Behavior")}
            >
              Behavior
            </div>
            <div 
              className="bg-blue-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Ecosystems")}
            >
              Ecosystems
            </div>
            <div 
              className="bg-blue-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Predation")}
            >
              Predation
            </div>
            <div 
              className="bg-blue-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Agriculture")}
            >
              Agriculture
            </div>
            <div 
              className="bg-blue-400 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Figures of Speech")}
            >
              Figures of Speech
            </div>
            <div 
              className="bg-blue-400 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Alphabets")}
            >
              Alphabets
            </div>
            <div 
              className="bg-blue-400 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Slang")}
            >
              Slang
            </div>
            <div 
              className="bg-blue-400 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Propaganda")}
            >
              Propaganda
            </div>
            <div 
              className="bg-indigo-400 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Tools")}
            >
              Tools
            </div>
            <div 
              className="bg-indigo-400 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Comms")}
            >
              Comms
            </div>
            <div 
              className="bg-indigo-400 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Arms & Armor")}
            >
              Arms & Armor
            </div>
            <div 
              className="bg-indigo-400 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Future Tech")}
            >
              Future Tech
            </div>

            {/* Row 3 - Organizational Elements (Orange) */}
            <div 
              className="bg-orange-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Guilds")}
            >
              Guilds
            </div>
            <div 
              className="bg-orange-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Timekeeping")}
            >
              Timekeeping
            </div>
            <div 
              className="bg-orange-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Hierarchies")}
            >
              Hierarchies
            </div>
            <div 
              className="bg-orange-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Heraldry")}
            >
              Heraldry
            </div>
            <div 
              className="bg-orange-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Schools")}
            >
              Schools
            </div>
            <div 
              className="bg-orange-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Medicine")}
            >
              Medicine
            </div>
            <div 
              className="bg-cyan-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Fossils")}
            >
              Fossils
            </div>
            <div 
              className="bg-cyan-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Histories")}
            >
              Histories
            </div>
            <div 
              className="bg-cyan-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Artifacts")}
            >
              Artifacts
            </div>
            <div 
              className="bg-cyan-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Legends")}
            >
              Legends
            </div>
            <div 
              className="bg-cyan-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Ruins")}
            >
              Ruins
            </div>
            <div 
              className="bg-cyan-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("World Era")}
            >
              World Era
            </div>

            {/* Row 4 - Geopolitical Elements (Red) */}
            <div 
              className="bg-red-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Political Events")}
            >
              Political Events
            </div>
            <div 
              className="bg-red-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Governments")}
            >
              Governments
            </div>
            <div 
              className="bg-red-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("War")}
            >
              War
            </div>
            <div 
              className="bg-red-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Law")}
            >
              Law
            </div>
            <div 
              className="bg-yellow-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Currencies")}
            >
              Currencies
            </div>
            <div 
              className="bg-yellow-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Businesses")}
            >
              Businesses
            </div>
            <div 
              className="bg-yellow-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Resources")}
            >
              Resources
            </div>
            <div 
              className="bg-yellow-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Rare Goods")}
            >
              Rare Goods
            </div>
            <div 
              className="bg-purple-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Water Systems")}
            >
              Water Systems
            </div>
            <div 
              className="bg-purple-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Power Systems")}
            >
              Power Systems
            </div>
            <div 
              className="bg-purple-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Transport")}
            >
              Transport
            </div>
            <div 
              className="bg-purple-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Waste Systems")}
            >
              Waste Systems
            </div>

            {/* Row 5 - Religious Elements (Pink) */}
            <div 
              className="bg-pink-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Gods")}
            >
              Gods
            </div>
            <div 
              className="bg-pink-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Religions")}
            >
              Religions
            </div>
            <div 
              className="bg-pink-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Sacred Texts")}
            >
              Sacred Texts
            </div>
            <div 
              className="bg-pink-300 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Rituals")}
            >
              Rituals
            </div>
            <div 
              className="bg-purple-500 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Magical Creatures")}
            >
              Magical Creatures
            </div>
            <div 
              className="bg-purple-500 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Spells")}
            >
              Spells
            </div>
            <div 
              className="bg-purple-500 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Unique Abilities")}
            >
              Unique Abilities
            </div>
            <div 
              className="bg-purple-500 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Alien Life")}
            >
              Alien Life
            </div>
            <div 
              className="bg-purple-500 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("AI")}
            >
              AI
            </div>
            <div 
              className="bg-purple-500 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Mutations")}
            >
              Mutations
            </div>
            <div 
              className="bg-gray-400 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Deserts")}
            >
              Deserts
            </div>

            {/* Row 6 - Environmental Elements (Gray) */}
            <div 
              className="bg-gray-400 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Badlands")}
            >
              Badlands
            </div>
            <div 
              className="bg-gray-400 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Forests")}
            >
              Forests
            </div>
            <div 
              className="bg-gray-400 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Rivers")}
            >
              Rivers
            </div>
            <div 
              className="bg-gray-400 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Mountains")}
            >
              Mountains
            </div>
            <div 
              className="bg-gray-400 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Fields")}
            >
              Fields
            </div>
            <div 
              className="bg-gray-400 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Oceans")}
            >
              Oceans
            </div>
            <div 
              className="bg-gray-400 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Arctic")}
            >
              Arctic
            </div>
            <div 
              className="bg-gray-400 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Jungles")}
            >
              Jungles
            </div>
            <div 
              className="bg-gray-400 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Islands")}
            >
              Islands
            </div>
            <div 
              className="bg-gray-400 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Aquatic")}
            >
              Aquatic
            </div>
            <div 
              className="bg-gray-400 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Subterranean")}
            >
              Subterranean
            </div>
            <div 
              className="bg-gray-400 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Volcanic")}
            >
              Volcanic
            </div>

            {/* Row 7 - Cosmic & Nefarious Elements */}
            <div 
              className="bg-gray-400 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Swamps")}
            >
              Swamps
            </div>
            <div 
              className="bg-gray-600 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-white shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Galaxies")}
            >
              Galaxies
            </div>
            <div 
              className="bg-gray-600 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-white shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Solar Systems")}
            >
              Solar Systems
            </div>
            <div 
              className="bg-gray-600 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-white shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Stars")}
            >
              Stars
            </div>
            <div 
              className="bg-gray-600 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-white shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Planets")}
            >
              Planets
            </div>
            <div 
              className="bg-gray-600 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-white shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Moons")}
            >
              Moons
            </div>
            <div 
              className="bg-red-600 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-white shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Crime")}
            >
              Crime
            </div>
            <div 
              className="bg-red-600 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-white shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Cults")}
            >
              Cults
            </div>
            <div 
              className="bg-red-600 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-white shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Forbidden Magic")}
            >
              Forbidden Magic
            </div>
            <div 
              className="bg-red-600 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-white shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Illicit Goods")}
            >
              Illicit Goods
            </div>
            <div 
              className="bg-red-600 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-white shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("System Failures")}
            >
              System Failures
            </div>
            <div 
              className="bg-red-600 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-white shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
              onClick={() => handleElementClick("Disease")}
            >
              Disease
            </div>
          </div>

          {/* Core Elements - Bottom Row */}
          <div className="mt-8">
            <div className="grid grid-cols-5 gap-2">
              <div 
                className="bg-white border-2 border-gray-400 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
                onClick={() => handleElementClick("Maps")}
              >
                Maps
              </div>
              <div 
                className="bg-white border-2 border-gray-400 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
                onClick={() => handleElementClick("Timelines")}
              >
                Timelines
              </div>
              <div 
                className="bg-white border-2 border-gray-400 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
                onClick={() => handleElementClick("Peoples")}
              >
                Peoples
              </div>
              <div 
                className="bg-white border-2 border-gray-400 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
                onClick={() => handleElementClick("Lineages")}
              >
                Lineages
              </div>
              <div 
                className="bg-white border-2 border-gray-400 p-3 rounded-lg text-center text-xs md:text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer leading-tight min-h-[3rem] flex items-center justify-center"
                onClick={() => handleElementClick("Creatures")}
              >
                Creatures
              </div>
            </div>
          </div>

          {/* Element Detail Modal */}
          {selectedElement && elementDetails[selectedElement as keyof typeof elementDetails] && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedElement(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-[var(--card)] rounded-xl p-8 max-w-4xl w-full max-h-[80vh] overflow-y-auto border-2 border-[var(--accent)] shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[var(--accent)] to-[var(--highlight)] rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {selectedElement.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-[var(--foreground)]">{selectedElement}</h2>
                      <p className="text-sm text-[var(--accent)] font-medium">
                        {elementDetails[selectedElement as keyof typeof elementDetails].category} Element
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedElement(null)}
                    className="text-[var(--accent)] hover:text-[var(--foreground)] transition-colors text-2xl font-bold"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--foreground)] mb-3">Definition</h3>
                    <p className="text-[var(--foreground)] leading-relaxed">
                      {elementDetails[selectedElement as keyof typeof elementDetails].definition}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-[var(--foreground)] mb-3">Examples from Popular Media</h3>
                    <p className="text-[var(--foreground)] leading-relaxed">
                      {elementDetails[selectedElement as keyof typeof elementDetails].examples}
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-[var(--accent)]/10 to-[var(--highlight)]/10 p-6 rounded-lg border border-[var(--accent)]/20">
                    <h3 className="text-lg font-semibold text-[var(--foreground)] mb-3">Quote</h3>
                    <blockquote className="text-[var(--foreground)] leading-relaxed italic text-lg">
                      {elementDetails[selectedElement as keyof typeof elementDetails].quote}
                    </blockquote>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

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