'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const dictionaryAC = [
  { term: 'Ad Hominem', def: 'Attacking the person rather than the argument' },
  { term: 'Adage', def: 'Traditional saying expressing a general truth' },
  { term: 'Allegory', def: 'Story with symbolic meaning beyond literal' },
  { term: 'Alliteration', def: 'Repetition of initial consonant sounds' },
  { term: 'Allusion', def: 'Reference to another work or event' },
  { term: 'Ambiguity', def: 'Uncertainty or multiple possible meanings' },
  { term: 'Anachronism', def: 'Chronological inconsistency' },
  { term: 'Analogy', def: 'Comparison between two things for explanation' },
  { term: 'Anaphora', def: 'Repetition of words at beginning of phrases' },
  { term: 'Anecdote', def: 'Short amusing or interesting story' },
  { term: 'Antagonist', def: 'Character who opposes the protagonist' },
  { term: 'Anthimeria', def: 'Using one part of speech as another' },
  { term: 'Anthropomorphism', def: 'Giving human characteristics to animals/objects' },
  { term: 'Antihero', def: 'Protagonist lacking conventional heroic qualities' },
  { term: 'Antithesis', def: 'Direct contrast of ideas' },
  { term: 'Aphorism', def: 'Concise statement of principle or truth' },
  { term: 'Apologia', def: 'Formal defense or justification' },
  { term: 'Aporia', def: 'Expression of doubt or uncertainty' },
  { term: 'Aposiopesis', def: 'Breaking off speech mid-sentence' },
  { term: 'Appositive', def: 'Noun or phrase that renames another noun' },
  { term: 'Apostrophe', def: 'Addressing absent person or abstract concept' },
  { term: 'Archaism', def: 'Outdated word or expression' },
  { term: 'Archetype', def: 'Universal character or situation pattern' },
  { term: 'Assonance', def: 'Repetition of vowel sounds' },
  { term: 'Asyndeton', def: 'Omission of conjunctions between words' },
  { term: 'Atmosphere', def: 'Mood or feeling created by setting' },
  { term: 'Ballad', def: 'Narrative poem meant to be sung' },
  { term: 'Bathos', def: 'Sudden shift from serious to trivial' },
  { term: 'Bildungsroman', def: 'Coming-of-age novel' },
  { term: 'Caesura', def: 'Pause or break in poetry' },
  { term: 'Catharsis', def: 'Emotional release through art' },
  { term: 'Characterization', def: 'How author reveals character traits' },
  { term: 'Chiasmus', def: 'Reversal of grammatical structures' },
  { term: 'Chronology', def: 'Order of events in time' },
  { term: 'Cliché', def: 'Overused expression or idea' },
  { term: 'Cliffhanger', def: 'Suspenseful ending leaving resolution uncertain' },
  { term: 'Climax', def: 'Turning point of highest tension' },
  { term: 'Consonance', def: 'Repetition of consonant sounds' },
  { term: 'Connotation', def: 'Emotional associations of words' },
  { term: 'Conundrum', def: 'Difficult problem or question' },
  { term: 'Cynicism', def: 'Distrustful attitude toward motives' },
  { term: 'Denotation', def: 'Literal dictionary meaning' },
  { term: 'Deus ex machina', def: 'Unexpected solution to resolve plot' },
  { term: 'Denouement', def: 'Resolution of plot conflicts' },
  { term: 'Deuteragonist', def: 'Secondary main character' },
  { term: 'Dialect', def: 'Regional variety of language' },
  { term: 'Dialogue', def: 'Conversation between characters' },
  { term: 'Diction', def: "Author's word choice" },
  { term: 'Double Entendre', def: 'Word or phrase with two meanings' },
  { term: 'Dystopia', def: 'Imagined oppressive society' },
];

const dictionaryDH = [
  { term: 'Elegy', def: 'Poem mourning the dead' },
  { term: 'Ellipsis', def: 'Omission of words or phrases' },
  { term: 'Enjambment', def: 'Continuation of sentence across line breaks' },
  { term: 'Epigram', def: 'Brief witty statement or poem' },
  { term: 'Epigraph', def: 'Quotation at beginning of work' },
  { term: 'Epilogue', def: 'Concluding section of work' },
  { term: 'Epiphany', def: 'Sudden realization or insight' },
  { term: 'Epitaph', def: 'Inscription on tombstone' },
  { term: 'Epithet', def: 'Descriptive word or phrase' },
  { term: 'Exposition', def: 'Background information provided' },
  { term: 'Extended Metaphor', def: 'Metaphor developed throughout work' },
  { term: 'Farce', def: 'Comedy with exaggerated situations' },
  { term: 'Flashback', def: 'Scene from the past' },
  { term: 'Flashforward', def: 'Scene from the future' },
  { term: 'Foreshadowing', def: 'Hints about future events' },
  { term: 'Genre', def: 'Category of literature' },
  { term: 'Haiku', def: 'Three-line Japanese poem' },
  { term: 'Hamartia', def: 'Tragic flaw in protagonist' },
  { term: 'Homage', def: 'Respectful tribute to another work' },
  { term: 'Hubris', def: 'Excessive pride or arrogance' },
  { term: 'Hyperbole', def: 'Deliberate exaggeration' },
  { term: 'Idiom', def: 'Expression with figurative meaning' },
  { term: 'Imagery', def: 'Vivid descriptive language' },
  { term: 'Inference', def: 'Logical conclusion from evidence' },
  { term: 'Innuendo', def: 'Indirect suggestion or hint' },
  { term: 'Intersectionality', def: 'Overlapping social identities' },
  { term: 'Intertextuality', def: 'Relationship between texts' },
  { term: 'Invective', def: 'Abusive or insulting language' },
  { term: 'Irony', def: 'Contrast between expectation and reality' },
];
const dictionaryIP = [
  { term: 'Jargon', def: 'Specialized vocabulary of a group' },
  { term: 'Juxtaposition', def: 'Placing contrasting elements side by side' },
  { term: 'Lingo', def: 'Informal language or slang' },
  { term: 'Literary Device', def: 'Technique used in writing' },
  { term: 'Melodrama', def: 'Drama with exaggerated emotions' },
  { term: 'Memoir', def: 'Personal account of experiences' },
  { term: 'Metaphor', def: 'Direct comparison without "like" or "as"' },
  { term: 'Meter', def: 'Rhythmic pattern in poetry' },
  { term: 'Metonymy', def: 'Substitution of related term' },
  { term: 'Mnemonic', def: 'Memory aid or device' },
  { term: 'Monologue', def: 'Long speech by one character' },
  { term: 'Montage', def: 'Series of images or scenes' },
  { term: 'Motif', def: 'Recurring theme or element' },
  { term: 'Narrative', def: 'Story or account of events' },
  { term: 'Narrator', def: 'Person telling the story' },
  { term: 'Nostalgia', def: 'Sentimental longing for the past' },
  { term: 'Onomatopoeia', def: 'Words that imitate sounds' },
  { term: 'Oxymoron', def: 'Contradictory terms combined' },
  { term: 'Palindrome', def: 'Word or phrase that reads the same backward' },
  { term: 'Parable', def: 'Simple story with a moral lesson' },
  { term: 'Paradox', def: 'Seemingly contradictory but true statement' },
  { term: 'Parallelism', def: 'Use of similar grammatical structures' },
  { term: 'Paraphrase', def: 'Restatement of text in different words' },
  { term: 'Parody', def: 'Humorous imitation of a work' },
  { term: 'Peripeteia', def: 'Sudden reversal of fortune or circumstances' },
  { term: 'Personification', def: 'Giving human traits to non-human things' },
  { term: 'Plagiarism', def: 'Using another\'s work without credit' },
  { term: 'Platitude', def: 'Overused statement lacking originality' },
  { term: 'Plot', def: 'Sequence of events in a story' },
  { term: 'Point of View (Focalization)', def: 'Perspective from which the story is told' },
  { term: 'Polemic', def: 'Controversial argument or debate' },
  { term: 'Polysyndeton', def: 'Repetition of conjunctions in close succession' },
  { term: 'Prologue', def: 'Introductory section of a literary work' },
  { term: 'Propaganda', def: 'Biased information to promote a cause' },
  { term: 'Prose', def: 'Written language without metrical structure' },
  { term: 'Protagonist', def: 'Main character of the story' },
  { term: 'Pseudonym', def: 'Fictitious name used by an author' },
  { term: 'Pun', def: 'Play on words with multiple meanings' },
];
const dictionaryRZ = [
  { term: 'Red Herring', def: 'Misleading clue or distraction' },
  { term: 'Rhetorical Device', def: 'Technique used to persuade or impact' },
  { term: 'Rhyme', def: 'Repetition of similar sounds' },
  { term: 'Romanticize', def: 'To make something seem better or more appealing than it is' },
  { term: 'Sardonic', def: 'Grimly mocking or cynical' },
  { term: 'Satire', def: 'Ridicule to expose flaws' },
  { term: 'Science Fiction', def: 'Fiction based on imagined future science or technology' },
  { term: 'Self-Fulfilling Prophecy', def: 'Prediction that causes itself to become true' },
  { term: 'Setting', def: 'Time and place of story' },
  { term: 'Simile', def: 'Comparison using "like" or "as"' },
  { term: 'Soliloquy', def: 'Speech by a character alone on stage' },
  { term: 'Sonnet', def: '14-line poem with specific rhyme scheme' },
  { term: 'Stanza', def: 'Grouped set of lines in a poem' },
  { term: 'Style', def: "Author's unique way of writing" },
  { term: 'Subtext', def: 'Underlying meaning not stated directly' },
  { term: 'Surrealism', def: 'Art or writing with dreamlike, illogical scenes' },
  { term: 'Symbol', def: 'Object representing abstract idea' },
  { term: 'Synecdoche', def: 'Part representing the whole' },
  { term: 'Synesthesia', def: 'Describing one sense in terms of another' },
  { term: 'Theme', def: 'Central message or meaning' },
  { term: 'Thesis', def: 'Main argument or claim' },
  { term: 'Tone', def: "Author's attitude toward subject" },
  { term: 'Trope', def: 'Common literary device or convention' },
  { term: 'Truism', def: 'Statement that is obviously true' },
  { term: 'Utopia', def: 'Imagined perfect society' },
  { term: 'Verisimilitude', def: 'Appearance of being true or real' },
  { term: 'Vernacular', def: 'Everyday language of ordinary people' },
  { term: 'Vignette', def: 'Short, descriptive literary sketch' },
  { term: 'Voice', def: "Author's distinctive style or perspective" },
  { term: 'Volta', def: 'Dramatic shift or turn in a poem' },
];

// Add type definitions
type DetailedTerm = {
  definition: string;
  examples: string[];
  resources: { title: string; url: string; }[];
};

type DetailedTerms = {
  [key: string]: DetailedTerm;
};

// Add detailed term data structure
const detailedTerms: DetailedTerms = {
  'Ad Hominem': {
    definition: 'A logical fallacy where an argument is rebutted by attacking the character, motive, or other attribute of the person making the argument, rather than addressing the substance of the argument itself.',
    examples: [
      'Instead of addressing the policy proposal, the politician said, "My opponent is a known liar and cannot be trusted."',
      '"You can\'t trust his opinion on climate change because he drives a gas-guzzling SUV."'
    ],
    resources: [
      { title: 'Logical Fallacies', url: 'https://www.logicalfallacies.org/ad-hominem.html' },
      { title: 'Critical Thinking', url: 'https://www.criticalthinking.org/' }
    ]
  },
  'Adage': {
    definition: 'A traditional saying expressing a general truth or piece of advice, often passed down through generations.',
    examples: [
      '"A penny saved is a penny earned."',
      '"Actions speak louder than words."',
      '"The early bird catches the worm."'
    ],
    resources: [
      { title: 'Famous Proverbs', url: 'https://www.phrases.org.uk/meanings/proverbs.html' },
      { title: 'English Proverbs', url: 'https://www.englishclub.com/vocabulary/proverbs.htm' }
    ]
  },
  'Allegory': {
    definition: 'A narrative technique in which characters, events, and settings represent abstract ideas or moral qualities, often used to convey complex political, religious, or philosophical concepts.',
    examples: [
      'George Orwell\'s "Animal Farm" is an allegory for the Russian Revolution, where farm animals represent political figures.',
      'John Bunyan\'s "The Pilgrim\'s Progress" is an allegory of the Christian journey toward salvation.'
    ],
    resources: [
      { title: 'Allegory in Literature', url: 'https://www.britannica.com/art/allegory-art-and-literature' },
      { title: 'Symbolism vs Allegory', url: 'https://www.litcharts.com/literary-devices-and-terms/allegory' }
    ]
  },
  'Alliteration': {
    definition: 'The repetition of initial consonant sounds in nearby words, used to create rhythm, emphasize certain words, or make phrases more memorable.',
    examples: [
      '"Peter Piper picked a peck of pickled peppers."',
      '"She sells seashells by the seashore."',
      'From Shakespeare: "Full fathom five thy father lies"'
    ],
    resources: [
      { title: 'Alliteration Examples', url: 'https://literarydevices.net/alliteration/' },
      { title: 'Sound Devices in Poetry', url: 'https://www.poetryfoundation.org/learn/glossary-terms/alliteration' }
    ]
  },
  'Allusion': {
    definition: 'An indirect reference to a person, place, event, or literary work that the author expects the reader to recognize and understand.',
    examples: [
      'Referring to someone as "a real Romeo" alludes to Shakespeare\'s romantic character.',
      'Calling a situation "Pandora\'s box" alludes to Greek mythology.',
      'Describing someone as having "the patience of Job" alludes to the biblical figure.'
    ],
    resources: [
      { title: 'Allusion Examples', url: 'https://literarydevices.net/allusion/' },
      { title: 'Biblical Allusions', url: 'https://www.biblegateway.com/' }
    ]
  },
  'Ambiguity': {
    definition: 'The quality of being open to more than one interpretation, often deliberately used by authors to create multiple layers of meaning.',
    examples: [
      'The word "bank" can mean a financial institution or the side of a river.',
      'In poetry: "Time flies like an arrow" - does time move quickly, or do insects called "time flies" prefer arrows?',
      'Shakespeare\'s "To be or not to be" - the ambiguity creates philosophical depth.'
    ],
    resources: [
      { title: 'Ambiguity in Literature', url: 'https://literarydevices.net/ambiguity/' },
      { title: 'Multiple Meanings', url: 'https://www.merriam-webster.com/' }
    ]
  },
  'Anachronism': {
    definition: 'An error in chronology where something is placed in the wrong time period, either accidentally or deliberately for artistic effect.',
    examples: [
      'A character in a medieval story using a smartphone.',
      'Shakespeare\'s characters in ancient Rome mentioning clocks (which didn\'t exist then).',
      'A painting of Jesus wearing a wristwatch.'
    ],
    resources: [
      { title: 'Historical Accuracy', url: 'https://www.history.com/' },
      { title: 'Anachronism in Film', url: 'https://www.imdb.com/' }
    ]
  },
  'Analogy': {
    definition: 'A comparison between two things for the purpose of explanation or clarification, often using familiar concepts to explain complex ideas.',
    examples: [
      '"Life is like a box of chocolates - you never know what you\'re gonna get."',
      'Comparing the human brain to a computer to explain how memory works.',
      'Describing the heart as a pump to explain its function.'
    ],
    resources: [
      { title: 'Analogy Examples', url: 'https://literarydevices.net/analogy/' },
      { title: 'Teaching with Analogies', url: 'https://www.edutopia.org/' }
    ]
  },
  'Anaphora': {
    definition: 'The repetition of words or phrases at the beginning of successive clauses or sentences for emphasis and rhythm.',
    examples: [
      '"I have a dream that... I have a dream that... I have a dream that..." - Martin Luther King Jr.',
      '"We shall fight on the beaches, we shall fight on the landing grounds, we shall fight in the fields." - Winston Churchill',
      '"It was the best of times, it was the worst of times..." - Charles Dickens'
    ],
    resources: [
      { title: 'Anaphora in Speeches', url: 'https://www.americanrhetoric.com/' },
      { title: 'Rhetorical Devices', url: 'https://literarydevices.net/anaphora/' }
    ]
  },
  'Anecdote': {
    definition: 'A short, amusing, or interesting story about a real incident or person, often used to illustrate a point or make a topic more relatable.',
    examples: [
      'A teacher sharing a personal story about learning to read to encourage struggling students.',
      'A speaker beginning with "When I was a child..." to introduce a topic.',
      'A writer including a brief story about meeting a famous person to illustrate a larger point.'
    ],
    resources: [
      { title: 'Writing Anecdotes', url: 'https://www.writersdigest.com/' },
      { title: 'Personal Narrative', url: 'https://owl.purdue.edu/owl/purdue_owl.html' }
    ]
  },
  'Antagonist': {
    definition: 'The character or force that opposes the protagonist (main character) in a story, creating conflict and driving the plot forward.',
    examples: [
      'Iago in Shakespeare\'s "Othello" - manipulates Othello to destroy his marriage.',
      'The White Witch in "The Lion, the Witch, and the Wardrobe" - opposes the Pevensie children.',
      'Captain Hook in "Peter Pan" - constantly battles against Peter Pan and the Lost Boys.'
    ],
    resources: [
      { title: 'Character Types', url: 'https://literarydevices.net/antagonist/' },
      { title: 'Conflict in Literature', url: 'https://www.litcharts.com/literary-devices-and-terms/conflict' }
    ]
  },
  'Antihero': {
    definition: 'A protagonist who lacks conventional heroic qualities such as idealism, courage, or morality, but is still the central character of the story.',
    examples: [
      'Holden Caulfield in "The Catcher in the Rye" - cynical and alienated teenager.',
      'Jay Gatsby in "The Great Gatsby" - morally ambiguous and obsessed with wealth.',
      'Walter White in "Breaking Bad" - transforms from teacher to drug dealer.'
    ],
    resources: [
      { title: 'Antihero Examples', url: 'https://literarydevices.net/antihero/' },
      { title: 'Modern Protagonists', url: 'https://www.goodreads.com/' }
    ]
  },
  'Antithesis': {
    definition: 'A rhetorical device that places opposite ideas in parallel grammatical structures to create contrast and emphasize differences.',
    examples: [
      '"It was the best of times, it was the worst of times." - Charles Dickens',
      '"Give me liberty or give me death." - Patrick Henry',
      '"To err is human; to forgive, divine." - Alexander Pope'
    ],
    resources: [
      { title: 'Antithesis Examples', url: 'https://literarydevices.net/antithesis/' },
      { title: 'Parallel Structure', url: 'https://owl.purdue.edu/owl/general_writing/mechanics/parallel_structure.html' }
    ]
  },
  'Aphorism': {
    definition: 'A concise, memorable statement that expresses a general truth or principle, often witty or philosophical in nature.',
    examples: [
      '"Knowledge is power." - Francis Bacon',
      '"The only constant is change." - Heraclitus',
      '"Actions speak louder than words." - Traditional proverb'
    ],
    resources: [
      { title: 'Famous Aphorisms', url: 'https://www.brainyquote.com/' },
      { title: 'Philosophical Quotes', url: 'https://www.goodreads.com/quotes' }
    ]
  },
  'Archetype': {
    definition: 'A universal character, symbol, or situation pattern that recurs across different cultures and time periods, representing fundamental human experiences.',
    examples: [
      'The Hero (Luke Skywalker, Harry Potter) - embarks on a journey and overcomes challenges.',
      'The Mentor (Gandalf, Dumbledore) - guides and teaches the hero.',
      'The Trickster (Loki, Coyote) - disrupts order and creates chaos.'
    ],
    resources: [
      { title: 'Jungian Archetypes', url: 'https://www.carl-jung.net/archetypes.html' },
      { title: 'Character Archetypes', url: 'https://literarydevices.net/archetype/' }
    ]
  },
  'Assonance': {
    definition: 'The repetition of vowel sounds in nearby words to create internal rhyming and musical effects.',
    examples: [
      '"The rain in Spain falls mainly on the plain."',
      '"Hear the mellow wedding bells." - Edgar Allan Poe',
      '"The crumbling thunder of seas" - Robert Louis Stevenson'
    ],
    resources: [
      { title: 'Assonance Examples', url: 'https://literarydevices.net/assonance/' },
      { title: 'Sound Devices', url: 'https://www.poetryfoundation.org/learn/glossary-terms/assonance' }
    ]
  },
  'Atmosphere': {
    definition: 'The mood or feeling created by a literary work through setting, imagery, and tone, which affects how readers experience the story.',
    examples: [
      'Gothic atmosphere in "Wuthering Heights" - dark, mysterious, and foreboding.',
      'Peaceful atmosphere in Wordsworth\'s nature poems - calm and contemplative.',
      'Tense atmosphere in "The Tell-Tale Heart" - nervous and paranoid.'
    ],
    resources: [
      { title: 'Mood and Atmosphere', url: 'https://literarydevices.net/mood/' },
      { title: 'Setting in Literature', url: 'https://www.litcharts.com/literary-devices-and-terms/setting' }
    ]
  },
  'Ballad': {
    definition: 'A narrative poem that tells a story, often set to music, with simple language, regular rhythm, and sometimes a refrain.',
    examples: [
      '"The Rime of the Ancient Mariner" by Samuel Taylor Coleridge',
      '"La Belle Dame sans Merci" by John Keats',
      'Traditional folk ballads like "Barbara Allen"'
    ],
    resources: [
      { title: 'Ballad Examples', url: 'https://www.poetryfoundation.org/learn/glossary-terms/ballad' },
      { title: 'Folk Ballads', url: 'https://www.folklib.net/' }
    ]
  },
  'Bathos': {
    definition: 'An abrupt shift from the serious or sublime to the trivial or ridiculous, often creating an unintentionally comic effect.',
    examples: [
      'A dramatic speech ending with "And that\'s why I need to borrow five dollars."',
      'A romantic poem that suddenly mentions laundry.',
      'A heroic description that ends with mundane details.'
    ],
    resources: [
      { title: 'Bathos Examples', url: 'https://literarydevices.net/bathos/' },
      { title: 'Comic Relief', url: 'https://www.litcharts.com/literary-devices-and-terms/comic-relief' }
    ]
  },
  'Bildungsroman': {
    definition: 'A novel that focuses on the psychological and moral growth of the protagonist from youth to adulthood, showing their coming-of-age journey.',
    examples: [
      '"To Kill a Mockingbird" by Harper Lee - Scout\'s moral development.',
      '"The Catcher in the Rye" by J.D. Salinger - Holden\'s search for identity.',
      '"Great Expectations" by Charles Dickens - Pip\'s journey to maturity.'
    ],
    resources: [
      { title: 'Coming-of-Age Novels', url: 'https://www.goodreads.com/shelf/show/coming-of-age' },
      { title: 'Bildungsroman Definition', url: 'https://literarydevices.net/bildungsroman/' }
    ]
  },
  'Catharsis': {
    definition: 'The emotional release or purification that audiences experience through art, particularly tragedy, leading to a sense of renewal or relief.',
    examples: [
      'The emotional release felt after watching a tragic play like "Romeo and Juliet."',
      'The cleansing feeling after reading a powerful novel about loss.',
      'The sense of relief after experiencing intense emotions through music or poetry.'
    ],
    resources: [
      { title: 'Aristotle on Catharsis', url: 'https://www.britannica.com/topic/catharsis-criticism' },
      { title: 'Tragedy in Literature', url: 'https://literarydevices.net/tragedy/' }
    ]
  },
  'Characterization': {
    definition: 'The way an author reveals and develops a character\'s personality, traits, and qualities through description, dialogue, actions, and thoughts.',
    examples: [
      'Direct characterization: "John was a tall, nervous man who always fidgeted."',
      'Indirect characterization: John\'s actions show he\'s generous when he gives his lunch to a homeless person.',
      'Through dialogue: "I can\'t stand being late!" reveals a character\'s punctuality obsession.'
    ],
    resources: [
      { title: 'Character Development', url: 'https://literarydevices.net/characterization/' },
      { title: 'Writing Characters', url: 'https://www.writersdigest.com/write-better-fiction' }
    ]
  },
  'Chiasmus': {
    definition: 'A rhetorical device where words or phrases are repeated in reverse order to create a balanced, mirror-like structure.',
    examples: [
      '"Ask not what your country can do for you, ask what you can do for your country." - JFK',
      '"Fair is foul, and foul is fair." - Shakespeare',
      '"When the going gets tough, the tough get going."'
    ],
    resources: [
      { title: 'Chiasmus Examples', url: 'https://literarydevices.net/chiasmus/' },
      { title: 'Rhetorical Devices', url: 'https://www.americanrhetoric.com/rhetoricaldevicesinsound.htm' }
    ]
  },
  'Climax': {
    definition: 'The turning point of highest tension and drama in a story, where the conflict reaches its peak and the outcome becomes clear.',
    examples: [
      'The final battle between Harry Potter and Voldemort.',
      'The moment when Romeo finds Juliet apparently dead.',
      'The confrontation between Atticus Finch and the mob in "To Kill a Mockingbird."'
    ],
    resources: [
      { title: 'Plot Structure', url: 'https://literarydevices.net/plot/' },
      { title: 'Story Elements', url: 'https://www.litcharts.com/literary-devices-and-terms/plot' }
    ]
  },
  'Connotation': {
    definition: 'The emotional, cultural, or associative meanings that words carry beyond their literal definitions, often influenced by context and experience.',
    examples: [
      '"Home" has positive connotations of warmth and security, while "house" is more neutral.',
      '"Snake" has negative connotations of deceit, while "serpent" might sound more poetic.',
      '"Childlike" suggests innocence, while "childish" suggests immaturity.'
    ],
    resources: [
      { title: 'Word Connotations', url: 'https://literarydevices.net/connotation/' },
      { title: 'Semantics', url: 'https://www.linguisticsociety.org/resource/semantics' }
    ]
  },
  'Denotation': {
    definition: 'The literal, dictionary definition of a word, without any emotional or cultural associations.',
    examples: [
      'The denotation of "snake" is simply "a long, legless reptile."',
      'The denotation of "home" is "a place where one lives."',
      'The denotation of "rose" is "a woody perennial flowering plant."'
    ],
    resources: [
      { title: 'Dictionary Definitions', url: 'https://www.merriam-webster.com/' },
      { title: 'Word Meanings', url: 'https://www.etymonline.com/' }
    ]
  },
  'Dialogue': {
    definition: 'Conversation between characters in a literary work, used to reveal character, advance plot, and provide information.',
    examples: [
      'The witty banter between Beatrice and Benedick in "Much Ado About Nothing."',
      'The philosophical discussions between Socrates and his students in Plato\'s dialogues.',
      'The tense exchanges between characters in a mystery novel revealing clues.'
    ],
    resources: [
      { title: 'Writing Dialogue', url: 'https://www.writersdigest.com/write-better-fiction/writing-dialogue' },
      { title: 'Dialogue Tags', url: 'https://owl.purdue.edu/owl/general_writing/mechanics/dialogue.html' }
    ]
  },
  'Diction': {
    definition: 'An author\'s choice of words and style of expression, which contributes to the tone, mood, and overall effect of a literary work.',
    examples: [
      'Formal diction: "I am unable to attend the function."',
      'Informal diction: "I can\'t make it to the party."',
      'Poetic diction: "The golden orb descended behind yon verdant hills."'
    ],
    resources: [
      { title: 'Word Choice', url: 'https://literarydevices.net/diction/' },
      { title: 'Writing Style', url: 'https://owl.purdue.edu/owl/general_writing/style/' }
    ]
  },
  'Dramatic Irony': {
    definition: 'A situation where the audience or reader knows something that the characters in the story do not, creating tension and anticipation.',
    examples: [
      'In "Romeo and Juliet," the audience knows Juliet is alive when Romeo thinks she\'s dead.',
      'In "Oedipus Rex," the audience knows Oedipus\' true identity before he does.',
      'In horror movies, the audience sees the killer while the character doesn\'t.'
    ],
    resources: [
      { title: 'Types of Irony', url: 'https://literarydevices.net/irony/' },
      { title: 'Dramatic Techniques', url: 'https://www.litcharts.com/literary-devices-and-terms/dramatic-irony' }
    ]
  },
  'Elegy': {
    definition: 'A mournful, melancholic poem, especially a funeral song or a lament for the dead.',
    examples: [
      '"Elegy Written in a Country Churchyard" by Thomas Gray',
      '"In Memory of W.B. Yeats" by W.H. Auden',
      '"When Lilacs Last in the Dooryard Bloom\'d" by Walt Whitman'
    ],
    resources: [
      { title: 'Elegy Examples', url: 'https://www.poetryfoundation.org/learn/glossary-terms/elegy' },
      { title: 'Poetry Forms', url: 'https://www.poets.org/poetsorg/glossary' }
    ]
  },
  'Epiphany': {
    definition: 'A sudden realization or insight that leads to a new understanding or awareness, often a turning point in a character\'s development.',
    examples: [
      'Scout\'s realization about Boo Radley in "To Kill a Mockingbird."',
      'The moment when the narrator understands the meaning of the wallpaper in "The Yellow Wallpaper."',
      'Joyce\'s characters experiencing "epiphanies" in "Dubliners."'
    ],
    resources: [
      { title: 'Epiphany in Literature', url: 'https://literarydevices.net/epiphany/' },
      { title: 'Character Development', url: 'https://www.litcharts.com/literary-devices-and-terms/characterization' }
    ]
  },
  'Foreshadowing': {
    definition: 'A literary device where the author hints at future events in the story, creating suspense and preparing readers for what\'s to come.',
    examples: [
      'The witches\' prophecies in "Macbeth" foreshadow his downfall.',
      'Early mentions of the weather in "The Great Gatsby" foreshadow the climactic scene.',
      'Subtle hints about a character\'s true nature before the revelation.'
    ],
    resources: [
      { title: 'Foreshadowing Techniques', url: 'https://literarydevices.net/foreshadowing/' },
      { title: 'Plot Devices', url: 'https://www.litcharts.com/literary-devices-and-terms/foreshadowing' }
    ]
  },
  'Hyperbole': {
    definition: 'Deliberate exaggeration for emphasis or humorous effect, not meant to be taken literally.',
    examples: [
      '"I\'ve told you a million times!"',
      '"This bag weighs a ton!"',
      '"I\'m so hungry I could eat a horse!"'
    ],
    resources: [
      { title: 'Hyperbole Examples', url: 'https://literarydevices.net/hyperbole/' },
      { title: 'Figurative Language', url: 'https://www.litcharts.com/literary-devices-and-terms/figurative-language' }
    ]
  },
  'Imagery': {
    definition: 'Vivid descriptive language that appeals to the senses, creating mental pictures and sensory experiences for the reader.',
    examples: [
      '"The crimson sunset painted the sky with streaks of gold and purple."',
      '"The crisp autumn leaves crunched underfoot, releasing their earthy scent."',
      '"The icy wind howled through the barren trees like a mournful ghost."'
    ],
    resources: [
      { title: 'Imagery in Poetry', url: 'https://literarydevices.net/imagery/' },
      { title: 'Sensory Details', url: 'https://www.poetryfoundation.org/learn/glossary-terms/imagery' }
    ]
  },
  'Irony': {
    definition: 'A contrast between expectation and reality, often used to create humor, emphasize themes, or reveal character flaws.',
    examples: [
      'Verbal irony: Saying "What a beautiful day!" during a storm.',
      'Situational irony: A fire station burning down.',
      'Dramatic irony: The audience knows something characters don\'t.'
    ],
    resources: [
      { title: 'Types of Irony', url: 'https://literarydevices.net/irony/' },
      { title: 'Irony Examples', url: 'https://www.litcharts.com/literary-devices-and-terms/irony' }
    ]
  },
  'Metaphor': {
    definition: 'A direct comparison between two unlike things without using "like" or "as," suggesting they are the same in some way.',
    examples: [
      '"Life is a journey."',
      '"The classroom was a zoo."',
      '"Time is money."'
    ],
    resources: [
      { title: 'Metaphor Examples', url: 'https://literarydevices.net/metaphor/' },
      { title: 'Figurative Language', url: 'https://www.poetryfoundation.org/learn/glossary-terms/metaphor' }
    ]
  },
  'Motif': {
    definition: 'A recurring element, such as an image, symbol, theme, or idea, that appears throughout a literary work to reinforce its meaning.',
    examples: [
      'The green light in "The Great Gatsby" representing hope and the American Dream.',
      'Light and darkness in "Romeo and Juliet" representing love and death.',
      'The color red in "The Scarlet Letter" representing sin and passion.'
    ],
    resources: [
      { title: 'Motif in Literature', url: 'https://literarydevices.net/motif/' },
      { title: 'Symbolism', url: 'https://www.litcharts.com/literary-devices-and-terms/motif' }
    ]
  },
  'Oxymoron': {
    definition: 'A figure of speech that combines contradictory terms to create a paradoxical effect.',
    examples: [
      '"Jumbo shrimp"',
      '"Deafening silence"',
      '"Bittersweet"',
      '"Living dead"'
    ],
    resources: [
      { title: 'Oxymoron Examples', url: 'https://literarydevices.net/oxymoron/' },
      { title: 'Contradictory Terms', url: 'https://www.merriam-webster.com/words-at-play/oxymoron' }
    ]
  },
  'Paradox': {
    definition: 'A statement that appears contradictory but reveals a deeper truth when examined more closely.',
    examples: [
      '"Less is more."',
      '"The beginning of the end."',
      '"I am nobody."',
      '"This statement is false."'
    ],
    resources: [
      { title: 'Paradox Examples', url: 'https://literarydevices.net/paradox/' },
      { title: 'Logical Paradoxes', url: 'https://plato.stanford.edu/entries/paradoxes/' }
    ]
  },
  'Personification': {
    definition: 'Giving human characteristics, emotions, or behaviors to non-human things, such as animals, objects, or abstract concepts.',
    examples: [
      '"The wind whispered through the trees."',
      '"The sun smiled down on the earth."',
      '"Time flies when you\'re having fun."',
      '"The car coughed and sputtered to life."'
    ],
    resources: [
      { title: 'Personification Examples', url: 'https://literarydevices.net/personification/' },
      { title: 'Figurative Language', url: 'https://www.poetryfoundation.org/learn/glossary-terms/personification' }
    ]
  },
  'Plot': {
    definition: 'The sequence of events that make up a story, including the exposition, rising action, climax, falling action, and resolution.',
    examples: [
      'Exposition: Introducing characters and setting.',
      'Rising Action: Building conflict and tension.',
      'Climax: The turning point of highest tension.',
      'Falling Action: Events following the climax.',
      'Resolution: The conclusion and outcome.'
    ],
    resources: [
      { title: 'Plot Structure', url: 'https://literarydevices.net/plot/' },
      { title: 'Story Elements', url: 'https://www.litcharts.com/literary-devices-and-terms/plot' }
    ]
  },
  'Point of View': {
    definition: 'The perspective from which a story is told, determining who is narrating and how much information the reader has access to.',
    examples: [
      'First Person: "I walked down the street."',
      'Second Person: "You walk down the street."',
      'Third Person Limited: "He walked down the street, unaware of what awaited him."',
      'Third Person Omniscient: "He walked down the street, while she waited around the corner."'
    ],
    resources: [
      { title: 'Narrative Perspective', url: 'https://literarydevices.net/point-of-view/' },
      { title: 'POV in Fiction', url: 'https://www.litcharts.com/literary-devices-and-terms/point-of-view' }
    ]
  },
  'Satire': {
    definition: 'A literary technique that uses humor, irony, exaggeration, or ridicule to expose and criticize people\'s stupidity or vices.',
    examples: [
      '"Animal Farm" by George Orwell - satirizes the Russian Revolution.',
      '"Gulliver\'s Travels" by Jonathan Swift - satirizes human nature and society.',
      '"The Daily Show" - satirizes current events and politics.'
    ],
    resources: [
      { title: 'Satire Examples', url: 'https://literarydevices.net/satire/' },
      { title: 'Political Satire', url: 'https://www.britannica.com/art/satire' }
    ]
  },
  'Setting': {
    definition: 'The time and place in which a story occurs, including the physical environment, historical period, and social context.',
    examples: [
      'Time: Victorian England in "Great Expectations."',
      'Place: The American South in "To Kill a Mockingbird."',
      'Social Context: The Jazz Age in "The Great Gatsby."',
      'Physical Environment: The moors in "Wuthering Heights."'
    ],
    resources: [
      { title: 'Setting in Literature', url: 'https://literarydevices.net/setting/' },
      { title: 'World Building', url: 'https://www.litcharts.com/literary-devices-and-terms/setting' }
    ]
  },
  'Simile': {
    definition: 'A comparison between two unlike things using "like" or "as" to create vivid imagery and make descriptions more engaging.',
    examples: [
      '"As brave as a lion."',
      '"Like a rolling stone."',
      '"As white as snow."',
      '"Like a fish out of water."'
    ],
    resources: [
      { title: 'Simile Examples', url: 'https://literarydevices.net/simile/' },
      { title: 'Figurative Language', url: 'https://www.poetryfoundation.org/learn/glossary-terms/simile' }
    ]
  },
  'Symbol': {
    definition: 'An object, person, place, or action that represents something beyond its literal meaning, often an abstract idea or concept.',
    examples: [
      'The green light in "The Great Gatsby" symbolizes hope and the American Dream.',
      'The scarlet letter "A" symbolizes sin and shame.',
      'The mockingbird in "To Kill a Mockingbird" symbolizes innocence.',
      'The conch shell in "Lord of the Flies" symbolizes order and civilization.'
    ],
    resources: [
      { title: 'Symbolism in Literature', url: 'https://literarydevices.net/symbolism/' },
      { title: 'Common Symbols', url: 'https://www.litcharts.com/literary-devices-and-terms/symbolism' }
    ]
  },
  'Theme': {
    definition: 'The central message, meaning, or insight about life that a literary work conveys, often expressed through characters, plot, and symbols.',
    examples: [
      'Love conquers all in "Romeo and Juliet."',
      'The corruption of the American Dream in "The Great Gatsby."',
      'The importance of empathy in "To Kill a Mockingbird."',
      'The destructive nature of ambition in "Macbeth."'
    ],
    resources: [
      { title: 'Theme in Literature', url: 'https://literarydevices.net/theme/' },
      { title: 'Identifying Themes', url: 'https://www.litcharts.com/literary-devices-and-terms/theme' }
    ]
  },
  'Tone': {
    definition: 'The author\'s attitude toward the subject matter, characters, or audience, conveyed through word choice, syntax, and other stylistic elements.',
    examples: [
      'Formal tone: Academic or professional writing.',
      'Informal tone: Casual conversation or friendly writing.',
      'Ironic tone: Saying one thing but meaning another.',
      'Melancholic tone: Sad or reflective mood.',
      'Humorous tone: Light-hearted and amusing.'
    ],
    resources: [
      { title: 'Tone in Writing', url: 'https://literarydevices.net/tone/' },
      { title: 'Author\'s Attitude', url: 'https://www.litcharts.com/literary-devices-and-terms/tone' }
    ]
  },
  'Anthimeria': {
    definition: 'A figure of speech where one part of speech is used as another, often converting nouns to verbs or adjectives to nouns.',
    examples: [
      '"Google it" - using the noun "Google" as a verb.',
      '"The good, the bad, and the ugly" - using adjectives as nouns.',
      '"Let me text you" - using the noun "text" as a verb.',
      '"The haves and have-nots" - using verbs as nouns.'
    ],
    resources: [
      { title: 'Parts of Speech', url: 'https://literarydevices.net/anthimeria/' },
      { title: 'Word Formation', url: 'https://www.merriam-webster.com/words-at-play/verbing-nouns' }
    ]
  },
  'Anthropomorphism': {
    definition: 'Attributing human characteristics, emotions, or behaviors to animals, objects, or abstract concepts.',
    examples: [
      'Disney characters like Mickey Mouse and Donald Duck.',
      'The animals in "Animal Farm" who walk on two legs and wear clothes.',
      'The talking trees in "The Lord of the Rings."',
      'The personification of death as the Grim Reaper.'
    ],
    resources: [
      { title: 'Anthropomorphism in Literature', url: 'https://literarydevices.net/anthropomorphism/' },
      { title: 'Animal Characters', url: 'https://www.britannica.com/art/anthropomorphism' }
    ]
  },
  'Aposiopesis': {
    definition: 'A figure of speech where a sentence is deliberately left unfinished, often to create suspense or suggest overwhelming emotion.',
    examples: [
      '"If you do that again, I\'ll..." (threat left unfinished).',
      '"I was so angry that I..." (emotion too strong to express).',
      '"The horror... the horror..." - from "Heart of Darkness."',
      '"If only I had known..." (regret left unspoken).'
    ],
    resources: [
      { title: 'Aposiopesis Examples', url: 'https://literarydevices.net/aposiopesis/' },
      { title: 'Rhetorical Devices', url: 'https://www.americanrhetoric.com/rhetoricaldevicesinsound.htm' }
    ]
  },
  'Appositive': {
    definition: 'A noun or noun phrase that renames or explains another noun, usually set off by commas.',
    examples: [
      '"My brother, a doctor, lives in Boston."',
      '"Shakespeare, the famous playwright, wrote many sonnets."',
      '"Paris, the capital of France, is known for its art."',
      '"My dog, a golden retriever, loves to swim."'
    ],
    resources: [
      { title: 'Appositive Phrases', url: 'https://owl.purdue.edu/owl/general_writing/grammar/appositives.html' },
      { title: 'Grammar Rules', url: 'https://www.grammarly.com/blog/appositive/' }
    ]
  },
  'Apostrophe': {
    definition: 'A figure of speech where the speaker addresses an absent person, abstract concept, or inanimate object as if it were present.',
    examples: [
      '"O Death, where is thy sting?" - addressing death directly.',
      '"Twinkle, twinkle, little star, how I wonder what you are."',
      '"O Romeo, Romeo, wherefore art thou Romeo?"',
      '"Hello, darkness, my old friend."'
    ],
    resources: [
      { title: 'Apostrophe in Poetry', url: 'https://literarydevices.net/apostrophe/' },
      { title: 'Rhetorical Figures', url: 'https://www.poetryfoundation.org/learn/glossary-terms/apostrophe' }
    ]
  },
  'Archaism': {
    definition: 'The use of old-fashioned or outdated words and expressions, often to create a sense of historical authenticity or formality.',
    examples: [
      'Using "thou" and "thee" instead of "you."',
      '"Hark!" instead of "Listen!"',
      '"Forsooth" instead of "indeed."',
      '"Whither" instead of "where."'
    ],
    resources: [
      { title: 'Archaic Words', url: 'https://literarydevices.net/archaism/' },
      { title: 'Historical Language', url: 'https://www.etymonline.com/' }
    ]
  },
  'Asyndeton': {
    definition: 'The deliberate omission of conjunctions between words, phrases, or clauses to create a sense of speed, urgency, or emphasis.',
    examples: [
      '"I came, I saw, I conquered." - Julius Caesar',
      '"The air was thick, heavy, oppressive."',
      '"He was brave, loyal, honest, kind."',
      '"We shall fight on the beaches, we shall fight on the landing grounds, we shall fight in the fields."'
    ],
    resources: [
      { title: 'Asyndeton Examples', url: 'https://literarydevices.net/asyndeton/' },
      { title: 'Rhetorical Devices', url: 'https://www.americanrhetoric.com/rhetoricaldevicesinsound.htm' }
    ]
  },
  'Caesura': {
    definition: 'A pause or break in a line of poetry, often marked by punctuation or natural speech patterns, used to create rhythm and emphasis.',
    examples: [
      '"To be, || or not to be, || that is the question."',
      '"The woods are lovely, || dark and deep."',
      '"Shall I compare thee || to a summer\'s day?"',
      '"Break, || break, || break, || On thy cold gray stones, O Sea!"'
    ],
    resources: [
      { title: 'Caesura in Poetry', url: 'https://literarydevices.net/caesura/' },
      { title: 'Poetic Rhythm', url: 'https://www.poetryfoundation.org/learn/glossary-terms/caesura' }
    ]
  },
  'Characterization': {
    definition: 'The way an author reveals and develops a character\'s personality, traits, and qualities through description, dialogue, actions, and thoughts.',
    examples: [
      'Direct characterization: "John was a tall, nervous man who always fidgeted."',
      'Indirect characterization: John\'s actions show he\'s generous when he gives his lunch to a homeless person.',
      'Through dialogue: "I can\'t stand being late!" reveals a character\'s punctuality obsession.'
    ],
    resources: [
      { title: 'Character Development', url: 'https://literarydevices.net/characterization/' },
      { title: 'Writing Characters', url: 'https://www.writersdigest.com/write-better-fiction' }
    ]
  },
  'Chronology': {
    definition: 'The arrangement of events in the order they occurred in time, or the study of time order in narrative structure.',
    examples: [
      'Linear chronology: Events told in the order they happened.',
      'Non-linear chronology: Flashbacks and flashforwards disrupting time order.',
      'Reverse chronology: Story told backwards from end to beginning.',
      'Circular chronology: Story ends where it began.'
    ],
    resources: [
      { title: 'Narrative Time', url: 'https://literarydevices.net/chronology/' },
      { title: 'Story Structure', url: 'https://www.litcharts.com/literary-devices-and-terms/chronology' }
    ]
  },
  'Cliché': {
    definition: 'An overused expression or idea that has lost its originality and impact due to excessive repetition.',
    examples: [
      '"Actions speak louder than words."',
      '"You can\'t judge a book by its cover."',
      '"Every cloud has a silver lining."',
      '"Time heals all wounds."'
    ],
    resources: [
      { title: 'Avoiding Clichés', url: 'https://literarydevices.net/cliche/' },
      { title: 'Fresh Writing', url: 'https://www.writersdigest.com/write-better-fiction' }
    ]
  },
  'Cliffhanger': {
    definition: 'A narrative device where a story ends at a moment of high suspense or uncertainty, leaving the resolution for later.',
    examples: [
      'A detective novel ending with the detective in mortal danger.',
      'A TV episode ending with a character\'s fate unknown.',
      'A chapter ending with a shocking revelation.',
      'A story ending with a question unanswered.'
    ],
    resources: [
      { title: 'Suspense Techniques', url: 'https://literarydevices.net/cliffhanger/' },
      { title: 'Story Endings', url: 'https://www.litcharts.com/literary-devices-and-terms/cliffhanger' }
    ]
  },
  'Consonance': {
    definition: 'The repetition of consonant sounds in nearby words, especially at the end of words, to create musical effects.',
    examples: [
      '"All mammals named Sam are clammy."',
      '"The ship has sailed to the far off shores."',
      '"He struck a streak of bad luck."',
      '"The dark, deep, damp dungeon."'
    ],
    resources: [
      { title: 'Consonance Examples', url: 'https://literarydevices.net/consonance/' },
      { title: 'Sound Devices', url: 'https://www.poetryfoundation.org/learn/glossary-terms/consonance' }
    ]
  },
  'Conundrum': {
    definition: 'A difficult problem or question that is puzzling or confusing, often involving a paradox or riddle.',
    examples: [
      '"Which came first, the chicken or the egg?"',
      '"If a tree falls in the forest and no one hears it, does it make a sound?"',
      '"Can God create a stone so heavy that He cannot lift it?"',
      'The prisoner\'s dilemma in game theory.'
    ],
    resources: [
      { title: 'Philosophical Puzzles', url: 'https://plato.stanford.edu/entries/paradoxes/' },
      { title: 'Logic Problems', url: 'https://www.britannica.com/topic/conundrum' }
    ]
  },
  'Cynicism': {
    definition: 'A distrustful attitude toward the motives of others, often expressed through skepticism, sarcasm, or pessimism.',
    examples: [
      'A character who believes all politicians are corrupt.',
      'Someone who thinks every act of kindness has ulterior motives.',
      'A narrator who sees the worst in human nature.',
      'A writer who exposes society\'s hypocrisies.'
    ],
    resources: [
      { title: 'Cynicism in Literature', url: 'https://literarydevices.net/cynicism/' },
      { title: 'Philosophical Cynicism', url: 'https://plato.stanford.edu/entries/cynics/' }
    ]
  },
  'Deus ex machina': {
    definition: 'A plot device where an unexpected, artificial, or improbable solution is suddenly introduced to resolve a seemingly unsolvable problem.',
    examples: [
      'A character being rescued by a helicopter that appears out of nowhere.',
      'A magical solution that solves all problems at the end of a story.',
      'A previously unmentioned character who saves the day.',
      'A natural disaster that conveniently resolves the conflict.'
    ],
    resources: [
      { title: 'Plot Devices', url: 'https://literarydevices.net/deus-ex-machina/' },
      { title: 'Story Resolution', url: 'https://www.litcharts.com/literary-devices-and-terms/deus-ex-machina' }
    ]
  },
  'Denouement': {
    definition: 'The final part of a story where the plot is resolved, loose ends are tied up, and the outcome is revealed.',
    examples: [
      'The final chapter of a mystery novel where the detective explains the solution.',
      'The wedding scene at the end of a romance novel.',
      'The aftermath scene showing how characters\' lives have changed.',
      'The final scene that provides closure to the story.'
    ],
    resources: [
      { title: 'Story Resolution', url: 'https://literarydevices.net/denouement/' },
      { title: 'Plot Structure', url: 'https://www.litcharts.com/literary-devices-and-terms/denouement' }
    ]
  },
  'Deuteragonist': {
    definition: 'The secondary main character in a story, often supporting or contrasting with the protagonist.',
    examples: [
      'Samwise Gamgee in "The Lord of the Rings" - Frodo\'s loyal companion.',
      'Dr. Watson in Sherlock Holmes stories - Holmes\'s friend and chronicler.',
      'Horatio in "Hamlet" - Hamlet\'s trusted friend.',
      'Ron Weasley in "Harry Potter" - Harry\'s best friend.'
    ],
    resources: [
      { title: 'Character Types', url: 'https://literarydevices.net/deuteragonist/' },
      { title: 'Supporting Characters', url: 'https://www.litcharts.com/literary-devices-and-terms/deuteragonist' }
    ]
  },
  'Dialect': {
    definition: 'A regional or social variety of a language that differs from the standard form in pronunciation, grammar, or vocabulary.',
    examples: [
      'Southern American English: "Y\'all" instead of "you all."',
      'Cockney English: "Ain\'t" and dropping h\'s.',
      'African American Vernacular English (AAVE).',
      'Scottish dialect: "Aye" for "yes."'
    ],
    resources: [
      { title: 'Dialect in Literature', url: 'https://literarydevices.net/dialect/' },
      { title: 'Regional Speech', url: 'https://www.britannica.com/topic/dialect' }
    ]
  },
  'Double Entendre': {
    definition: 'A word or phrase that has two meanings, usually one obvious and one subtle, often used for humorous or suggestive effect.',
    examples: [
      '"Time flies like an arrow. Fruit flies like a banana."',
      'Shakespeare\'s puns: "Ask for me tomorrow and you shall find me a grave man."',
      'Advertising slogans with hidden meanings.',
      'Innuendo in comedy and literature.'
    ],
    resources: [
      { title: 'Wordplay', url: 'https://literarydevices.net/double-entendre/' },
      { title: 'Puns and Wordplay', url: 'https://www.merriam-webster.com/words-at-play/double-entendre' }
    ]
  },
  'Dystopia': {
    definition: 'An imagined society that is undesirable or frightening, often characterized by oppression, environmental disaster, or other negative features.',
    examples: [
      '"1984" by George Orwell - totalitarian surveillance state.',
      '"The Handmaid\'s Tale" by Margaret Atwood - patriarchal theocracy.',
      '"Brave New World" by Aldous Huxley - controlled happiness.',
      '"The Hunger Games" - oppressive government controlling citizens.'
    ],
    resources: [
      { title: 'Dystopian Literature', url: 'https://literarydevices.net/dystopia/' },
      { title: 'Utopia vs Dystopia', url: 'https://www.britannica.com/art/dystopia' }
    ]
  },
  'Elegy': {
    definition: 'A mournful, melancholic poem, especially a funeral song or a lament for the dead.',
    examples: [
      '"Elegy Written in a Country Churchyard" by Thomas Gray',
      '"In Memory of W.B. Yeats" by W.H. Auden',
      '"When Lilacs Last in the Dooryard Bloom\'d" by Walt Whitman'
    ],
    resources: [
      { title: 'Elegy Examples', url: 'https://www.poetryfoundation.org/learn/glossary-terms/elegy' },
      { title: 'Poetry Forms', url: 'https://www.poets.org/poetsorg/glossary' }
    ]
  },
  'Epigram': {
    definition: 'A brief, witty, and often satirical statement or poem that expresses an idea in a clever and memorable way.',
    examples: [
      '"I can resist everything except temptation." - Oscar Wilde',
      '"The only way to get rid of a temptation is to yield to it." - Oscar Wilde',
      '"Experience is the name everyone gives to their mistakes." - Oscar Wilde',
      '"A cynic is a man who knows the price of everything and the value of nothing."'
    ],
    resources: [
      { title: 'Epigram Examples', url: 'https://literarydevices.net/epigram/' },
      { title: 'Witty Sayings', url: 'https://www.poetryfoundation.org/learn/glossary-terms/epigram' }
    ]
  },
  'Epigraph': {
    definition: 'A quotation, poem, or phrase placed at the beginning of a literary work to suggest its theme or set the tone.',
    examples: [
      'T.S. Eliot\'s "The Waste Land" begins with an epigraph from Dante.',
      'Hemingway\'s "The Sun Also Rises" opens with a biblical quote.',
      'Fitzgerald\'s "The Great Gatsby" begins with a poem.',
      'Many novels use epigraphs to establish context or mood.'
    ],
    resources: [
      { title: 'Epigraph Usage', url: 'https://literarydevices.net/epigraph/' },
      { title: 'Book Introductions', url: 'https://www.litcharts.com/literary-devices-and-terms/epigraph' }
    ]
  },
  'Epilogue': {
    definition: 'A concluding section that comes after the main story, often providing additional information about what happened to the characters afterward.',
    examples: [
      'The final chapter of "Harry Potter" showing the characters as adults.',
      'The ending of "The Lord of the Rings" showing the departure of the elves.',
      'A final scene that wraps up loose ends.',
      'An author\'s note about the story\'s aftermath.'
    ],
    resources: [
      { title: 'Story Endings', url: 'https://literarydevices.net/epilogue/' },
      { title: 'Narrative Structure', url: 'https://www.litcharts.com/literary-devices-and-terms/epilogue' }
    ]
  },
  'Epitaph': {
    definition: 'An inscription on a tombstone or monument in memory of a deceased person, often poetic or meaningful.',
    examples: [
      '"Here lies one whose name was writ in water." - John Keats',
      '"Good friend, for Jesus\' sake forbear\nTo dig the dust enclosed here." - Shakespeare',
      '"I told you I was sick." - Humorous epitaph',
      '"Rest in peace" - Common epitaph'
    ],
    resources: [
      { title: 'Famous Epitaphs', url: 'https://literarydevices.net/epitaph/' },
      { title: 'Memorial Inscriptions', url: 'https://www.britannica.com/topic/epitaph' }
    ]
  },
  'Epithet': {
    definition: 'A descriptive word or phrase that characterizes a person, place, or thing, often used repeatedly.',
    examples: [
      '"Alexander the Great"',
      '"Richard the Lionheart"',
      '"The Bard of Avon" for Shakespeare',
      '"The Big Apple" for New York City'
    ],
    resources: [
      { title: 'Epithet Examples', url: 'https://literarydevices.net/epithet/' },
      { title: 'Descriptive Names', url: 'https://www.merriam-webster.com/dictionary/epithet' }
    ]
  },
  'Exposition': {
    definition: 'The part of a story that provides background information about characters, setting, and situation to help readers understand the narrative.',
    examples: [
      'The opening chapters of "Pride and Prejudice" introducing the Bennet family.',
      'The beginning of "The Great Gatsby" establishing the setting and narrator.',
      'Background information about a character\'s past.',
      'Historical context provided at the start of a novel.'
    ],
    resources: [
      { title: 'Story Exposition', url: 'https://literarydevices.net/exposition/' },
      { title: 'Narrative Setup', url: 'https://www.litcharts.com/literary-devices-and-terms/exposition' }
    ]
  },
  'Extended Metaphor': {
    definition: 'A metaphor that is developed throughout a literary work, comparing two unlike things in multiple ways.',
    examples: [
      'Life as a journey in "The Road Not Taken" by Robert Frost.',
      'The comparison of love to a rose in poetry.',
      'The extended metaphor of the caged bird in Maya Angelou\'s work.',
      'The ship of state metaphor in political writing.'
    ],
    resources: [
      { title: 'Extended Metaphor Examples', url: 'https://literarydevices.net/extended-metaphor/' },
      { title: 'Metaphor Development', url: 'https://www.poetryfoundation.org/learn/glossary-terms/extended-metaphor' }
    ]
  },
  'Farce': {
    definition: 'A type of comedy characterized by exaggerated situations, physical humor, and improbable plot developments.',
    examples: [
      'Shakespeare\'s "The Comedy of Errors" with mistaken identities.',
      'Modern sitcoms with exaggerated misunderstandings.',
      'Slapstick comedy with physical humor.',
      'Plays with ridiculous plot twists and coincidences.'
    ],
    resources: [
      { title: 'Farce in Drama', url: 'https://literarydevices.net/farce/' },
      { title: 'Comedy Types', url: 'https://www.britannica.com/art/farce' }
    ]
  },
  'Flashback': {
    definition: 'A narrative technique that interrupts the present story to show events that happened earlier, providing background or context.',
    examples: [
      'A character remembering their childhood during a present moment.',
      'A detective recalling a previous case that relates to the current investigation.',
      'A war veteran having memories of battle during a peaceful moment.',
      'A novel alternating between present and past timelines.'
    ],
    resources: [
      { title: 'Flashback Techniques', url: 'https://literarydevices.net/flashback/' },
      { title: 'Narrative Time', url: 'https://www.litcharts.com/literary-devices-and-terms/flashback' }
    ]
  },
  'Flashforward': {
    definition: 'A narrative technique that jumps ahead in time to show future events, then returns to the present, creating anticipation or suspense.',
    examples: [
      'A story beginning with a future scene, then going back to explain how it happened.',
      'A character having a vision of what might happen.',
      'A novel that starts at the end and works backward.',
      'A prologue showing future events before the main story begins.'
    ],
    resources: [
      { title: 'Flashforward in Literature', url: 'https://literarydevices.net/flashforward/' },
      { title: 'Time Manipulation', url: 'https://www.litcharts.com/literary-devices-and-terms/flashforward' }
    ]
  },
  'Genre': {
    definition: 'A category or type of literature characterized by specific conventions, themes, and styles.',
    examples: [
      'Mystery: Detective stories with clues and solutions.',
      'Romance: Love stories with happy endings.',
      'Science Fiction: Stories with futuristic technology or settings.',
      'Horror: Stories designed to frighten or disturb.',
      'Fantasy: Stories with magical or supernatural elements.'
    ],
    resources: [
      { title: 'Literary Genres', url: 'https://literarydevices.net/genre/' },
      { title: 'Genre Classification', url: 'https://www.britannica.com/art/literature' }
    ]
  },
  'Haiku': {
    definition: 'A traditional Japanese poem with three lines and a specific syllable pattern (5-7-5), often focusing on nature and the seasons.',
    examples: [
      '"An old silent pond\nA frog jumps into the pond—\nSplash! Silence again." - Basho',
      '"The light of a candle\nIs transferred to another candle—\nSpring twilight." - Yosa Buson',
      '"In the twilight rain\nThese brilliant-colored flowers\nA luminous moon." - Shiki'
    ],
    resources: [
      { title: 'Haiku Examples', url: 'https://www.poetryfoundation.org/learn/glossary-terms/haiku' },
      { title: 'Japanese Poetry', url: 'https://literarydevices.net/haiku/' }
    ]
  },
  'Hamartia': {
    definition: 'A tragic flaw or error in judgment that leads to the downfall of a tragic hero, often hubris (excessive pride).',
    examples: [
      'Oedipus\'s determination to find the truth leads to his downfall.',
      'Macbeth\'s ambition drives him to murder and destruction.',
      'Romeo\'s impulsiveness leads to tragic consequences.',
      'Creon\'s stubbornness in "Antigone" causes his family\'s destruction.'
    ],
    resources: [
      { title: 'Tragic Flaw', url: 'https://literarydevices.net/hamartia/' },
      { title: 'Tragedy in Literature', url: 'https://www.litcharts.com/literary-devices-and-terms/hamartia' }
    ]
  },
  'Homage': {
    definition: 'A respectful tribute or reference to another work, artist, or style, often used to show admiration or influence.',
    examples: [
      'Quentin Tarantino\'s films paying homage to classic cinema.',
      'A novel referencing famous literary works.',
      'A song sampling or referencing another artist\'s work.',
      'A painting that echoes the style of a famous artist.'
    ],
    resources: [
      { title: 'Artistic Tributes', url: 'https://literarydevices.net/homage/' },
      { title: 'Influence in Art', url: 'https://www.britannica.com/art/homage' }
    ]
  },
  'Hubris': {
    definition: 'Excessive pride or self-confidence that leads to a character\'s downfall, often a central flaw in tragic heroes.',
    examples: [
      'Icarus flying too close to the sun despite warnings.',
      'Oedipus believing he can outsmart the gods.',
      'Macbeth\'s overconfidence after becoming king.',
      'Victor Frankenstein\'s belief he can control life and death.'
    ],
    resources: [
      { title: 'Hubris in Literature', url: 'https://literarydevices.net/hubris/' },
      { title: 'Tragic Pride', url: 'https://www.litcharts.com/literary-devices-and-terms/hubris' }
    ]
  },
  'Idiom': {
    definition: 'An expression whose meaning cannot be understood from the literal meanings of its individual words.',
    examples: [
      '"Break a leg" meaning good luck.',
      '"It\'s raining cats and dogs" meaning heavy rain.',
      '"Kick the bucket" meaning to die.',
      '"Piece of cake" meaning something easy.'
    ],
    resources: [
      { title: 'Common Idioms', url: 'https://literarydevices.net/idiom/' },
      { title: 'English Expressions', url: 'https://www.merriam-webster.com/words-at-play/idioms' }
    ]
  },
  'Inference': {
    definition: 'A logical conclusion drawn from evidence and reasoning rather than from explicit statements.',
    examples: [
      'Concluding a character is wealthy from their expensive clothes and mansion.',
      'Inferring someone is sad from their slumped posture and tears.',
      'Deducing the time period from historical details in the text.',
      'Understanding a character\'s motives from their actions.'
    ],
    resources: [
      { title: 'Reading Between the Lines', url: 'https://literarydevices.net/inference/' },
      { title: 'Critical Reading', url: 'https://owl.purdue.edu/owl/general_writing/academic_writing/' }
    ]
  },
  'Innuendo': {
    definition: 'An indirect suggestion or hint, often with a negative or suggestive meaning, conveyed through implication rather than direct statement.',
    examples: [
      'A character making suggestive comments without being explicit.',
      'Political satire implying corruption without naming names.',
      'Social commentary through subtle hints and implications.',
      'Humor that relies on implied meanings rather than direct statements.'
    ],
    resources: [
      { title: 'Indirect Communication', url: 'https://literarydevices.net/innuendo/' },
      { title: 'Subtle Hints', url: 'https://www.merriam-webster.com/dictionary/innuendo' }
    ]
  },
  'Intersectionality': {
    definition: 'The interconnected nature of social categorizations such as race, class, and gender, creating overlapping systems of discrimination or disadvantage.',
    examples: [
      'A black woman experiencing both racism and sexism.',
      'A poor LGBTQ+ person facing both economic and social discrimination.',
      'Literature exploring how multiple identities affect characters.',
      'Analysis of how different forms of oppression interact.'
    ],
    resources: [
      { title: 'Intersectional Analysis', url: 'https://www.britannica.com/topic/intersectionality' },
      { title: 'Social Justice', url: 'https://www.naacpldf.org/' }
    ]
  },
  'Intertextuality': {
    definition: 'The relationship between texts, where one text references, quotes, or alludes to another, creating layers of meaning.',
    examples: [
      'James Joyce\'s "Ulysses" referencing Homer\'s "Odyssey."',
      'Modern adaptations of Shakespeare\'s plays.',
      'Songs that sample or reference other songs.',
      'Novels that echo the structure or themes of classic works.'
    ],
    resources: [
      { title: 'Text Relationships', url: 'https://literarydevices.net/intertextuality/' },
      { title: 'Literary Allusion', url: 'https://www.litcharts.com/literary-devices-and-terms/intertextuality' }
    ]
  },
  'Invective': {
    definition: 'Abusive, insulting, or highly critical language used to attack or denounce someone or something.',
    examples: [
      'Political speeches attacking opponents with harsh language.',
      'Satirical writing that uses insults to make a point.',
      'Characters in plays or novels using abusive language.',
      'Editorials that strongly criticize policies or people.'
    ],
    resources: [
      { title: 'Abusive Language', url: 'https://literarydevices.net/invective/' },
      { title: 'Rhetorical Attack', url: 'https://www.merriam-webster.com/dictionary/invective' }
    ]
  },
  'Jargon': {
    definition: 'Specialized vocabulary or terminology used by a particular profession, group, or field that may be difficult for outsiders to understand.',
    examples: [
      'Medical jargon: "myocardial infarction" instead of "heart attack."',
      'Legal jargon: "heretofore" and "whereas."',
      'Computer jargon: "RAM," "CPU," "algorithm."',
      'Academic jargon: "paradigm," "discourse," "hegemony."'
    ],
    resources: [
      { title: 'Professional Language', url: 'https://literarydevices.net/jargon/' },
      { title: 'Specialized Vocabulary', url: 'https://www.merriam-webster.com/dictionary/jargon' }
    ]
  },
  'Juxtaposition': {
    definition: 'The placement of two contrasting elements side by side to highlight their differences and create a dramatic effect.',
    examples: [
      'A wealthy character dining next to a homeless person.',
      'A peaceful scene immediately followed by violence.',
      'Light and dark imagery in a poem.',
      'Past and present scenes alternating in a story.'
    ],
    resources: [
      { title: 'Contrast in Literature', url: 'https://literarydevices.net/juxtaposition/' },
      { title: 'Literary Contrast', url: 'https://www.litcharts.com/literary-devices-and-terms/juxtaposition' }
    ]
  },
  'Lingo': {
    definition: 'Informal language, slang, or specialized vocabulary used by a particular group or in a specific context.',
    examples: [
      'Teenage lingo: "lit," "savage," "on fleek."',
      'Surfer lingo: "dude," "radical," "gnarly."',
      'Gaming lingo: "noob," "pwned," "GG."',
      'Business lingo: "synergy," "leverage," "touch base."'
    ],
    resources: [
      { title: 'Slang and Informal Language', url: 'https://literarydevices.net/lingo/' },
      { title: 'Modern Slang', url: 'https://www.urbandictionary.com/' }
    ]
  },
  'Literary Device': {
    definition: 'A technique or tool used by writers to create meaning, enhance style, or convey ideas in a more effective way.',
    examples: [
      'Metaphor, simile, and personification for figurative language.',
      'Alliteration and assonance for sound effects.',
      'Foreshadowing and flashback for narrative structure.',
      'Irony and satire for tone and meaning.'
    ],
    resources: [
      { title: 'Literary Devices Guide', url: 'https://literarydevices.net/' },
      { title: 'Writing Techniques', url: 'https://www.litcharts.com/literary-devices-and-terms' }
    ]
  },
  'Melodrama': {
    definition: 'A dramatic work characterized by exaggerated emotions, stereotypical characters, and sensational plot developments.',
    examples: [
      'Victorian melodramas with clear heroes and villains.',
      'Soap operas with over-the-top emotional scenes.',
      'Silent films with exaggerated gestures and expressions.',
      'Modern TV shows with dramatic plot twists.'
    ],
    resources: [
      { title: 'Melodrama in Theater', url: 'https://literarydevices.net/melodrama/' },
      { title: 'Dramatic Genres', url: 'https://www.britannica.com/art/melodrama' }
    ]
  },
  'Memoir': {
    definition: 'A personal account of experiences, often focusing on a specific period or theme in the author\'s life.',
    examples: [
      '"The Glass Castle" by Jeannette Walls about her unconventional childhood.',
      '"Eat, Pray, Love" by Elizabeth Gilbert about her journey of self-discovery.',
      '"Angela\'s Ashes" by Frank McCourt about growing up in poverty.',
      '"Wild" by Cheryl Strayed about hiking the Pacific Crest Trail.'
    ],
    resources: [
      { title: 'Memoir Writing', url: 'https://literarydevices.net/memoir/' },
      { title: 'Personal Narrative', url: 'https://www.writersdigest.com/write-better-fiction' }
    ]
  },
  'Meter': {
    definition: 'The rhythmic pattern of stressed and unstressed syllables in poetry, creating a regular beat or rhythm.',
    examples: [
      'Iambic pentameter: "Shall I compare thee to a summer\'s day?"',
      'Trochaic tetrameter: "Double, double, toil and trouble."',
      'Anapestic trimeter: "Twas the night before Christmas."',
      'Dactylic hexameter: Classical epic poetry.'
    ],
    resources: [
      { title: 'Poetic Meter', url: 'https://literarydevices.net/meter/' },
      { title: 'Rhythm in Poetry', url: 'https://www.poetryfoundation.org/learn/glossary-terms/meter' }
    ]
  },
  'Metonymy': {
    definition: 'A figure of speech where one word or phrase is substituted for another with which it is closely associated.',
    examples: [
      '"The White House" for the U.S. government.',
      '"The crown" for the monarchy.',
      '"The pen is mightier than the sword" (pen for writing, sword for war).',
      '"Hollywood" for the American film industry.'
    ],
    resources: [
      { title: 'Metonymy Examples', url: 'https://literarydevices.net/metonymy/' },
      { title: 'Word Substitution', url: 'https://www.litcharts.com/literary-devices-and-terms/metonymy' }
    ]
  },
  'Mnemonic': {
    definition: 'A memory aid or device that helps people remember information through patterns, rhymes, or associations.',
    examples: [
      '"ROY G. BIV" for the colors of the rainbow.',
      '"Every Good Boy Does Fine" for the lines of the treble clef.',
      '"My Very Educated Mother Just Served Us Nine Pizzas" for the planets.',
      '"Thirty days hath September..." for the days in each month.'
    ],
    resources: [
      { title: 'Memory Techniques', url: 'https://literarydevices.net/mnemonic/' },
      { title: 'Learning Strategies', url: 'https://www.mnemonic-device.com/' }
    ]
  },
  'Monologue': {
    definition: 'A long speech by one character, either alone on stage (soliloquy) or addressed to other characters.',
    examples: [
      'Hamlet\'s "To be or not to be" soliloquy.',
      'A character explaining their backstory to others.',
      'A stand-up comedian\'s routine.',
      'A character\'s internal thoughts expressed aloud.'
    ],
    resources: [
      { title: 'Monologue in Drama', url: 'https://literarydevices.net/monologue/' },
      { title: 'Dramatic Speech', url: 'https://www.litcharts.com/literary-devices-and-terms/monologue' }
    ]
  },
  'Montage': {
    definition: 'A series of images, scenes, or events presented in rapid succession to create a particular effect or show the passage of time.',
    examples: [
      'A training montage in sports movies showing progress over time.',
      'A series of newspaper headlines showing historical events.',
      'Quick cuts between different locations or characters.',
      'A sequence of images representing memories or dreams.'
    ],
    resources: [
      { title: 'Montage in Film', url: 'https://literarydevices.net/montage/' },
      { title: 'Visual Storytelling', url: 'https://www.britannica.com/art/montage' }
    ]
  },
  'Narrative': {
    definition: 'A story or account of real or fictional events, told through a sequence of connected events.',
    examples: [
      'A novel telling the story of a character\'s journey.',
      'A personal essay about a significant experience.',
      'A historical account of past events.',
      'A folktale passed down through generations.'
    ],
    resources: [
      { title: 'Narrative Structure', url: 'https://literarydevices.net/narrative/' },
      { title: 'Storytelling', url: 'https://www.litcharts.com/literary-devices-and-terms/narrative' }
    ]
  },
  'Narrator': {
    definition: 'The person or voice telling the story, whose perspective and reliability can significantly affect how readers understand the events.',
    examples: [
      'First-person narrator: "I walked down the street."',
      'Third-person omniscient: Knows all characters\' thoughts.',
      'Unreliable narrator: Distorts or lies about events.',
      'Multiple narrators: Different perspectives on the same events.'
    ],
    resources: [
      { title: 'Narrative Voice', url: 'https://literarydevices.net/narrator/' },
      { title: 'Point of View', url: 'https://www.litcharts.com/literary-devices-and-terms/narrator' }
    ]
  },
  'Nostalgia': {
    definition: 'A sentimental longing for the past, often idealized and romanticized, used to evoke emotional responses.',
    examples: [
      'A character remembering their childhood home.',
      'A story set in a bygone era that seems simpler.',
      'Music or objects that remind people of better times.',
      'Literature that idealizes the past.'
    ],
    resources: [
      { title: 'Nostalgia in Literature', url: 'https://literarydevices.net/nostalgia/' },
      { title: 'Memory and Emotion', url: 'https://www.britannica.com/topic/nostalgia' }
    ]
  },
  'Onomatopoeia': {
    definition: 'Words that imitate or suggest the sounds they describe, creating auditory imagery.',
    examples: [
      '"Buzz" for the sound of bees.',
      '"Crash" for the sound of breaking glass.',
      '"Hiss" for the sound of a snake.',
      '"Splash" for the sound of water.'
    ],
    resources: [
      { title: 'Onomatopoeia Examples', url: 'https://literarydevices.net/onomatopoeia/' },
      { title: 'Sound Words', url: 'https://www.poetryfoundation.org/learn/glossary-terms/onomatopoeia' }
    ]
  },
  'Palindrome': {
    definition: 'A word, phrase, or sequence that reads the same backward as forward.',
    examples: [
      'Words: "racecar," "level," "radar."',
      'Phrases: "A man, a plan, a canal, Panama."',
      'Names: "Hannah," "Otto."',
      'Numbers: "12321."'
    ],
    resources: [
      { title: 'Palindrome Examples', url: 'https://literarydevices.net/palindrome/' },
      { title: 'Word Play', url: 'https://www.merriam-webster.com/words-at-play/palindrome' }
    ]
  },
  'Parable': {
    definition: 'A simple story used to illustrate a moral or spiritual lesson, often featuring human characters.',
    examples: [
      'The Parable of the Good Samaritan from the Bible.',
      'The Parable of the Prodigal Son.',
      'Aesop\'s fables like "The Tortoise and the Hare."',
      'Modern parables in literature and film.'
    ],
    resources: [
      { title: 'Parable Examples', url: 'https://literarydevices.net/parable/' },
      { title: 'Moral Stories', url: 'https://www.britannica.com/art/parable' }
    ]
  },
  'Parallelism': {
    definition: 'The use of similar grammatical structures, phrases, or clauses to create balance and rhythm in writing.',
    examples: [
      '"I came, I saw, I conquered."',
      '"It was the best of times, it was the worst of times."',
      '"Ask not what your country can do for you, ask what you can do for your country."',
      '"The government of the people, by the people, for the people."'
    ],
    resources: [
      { title: 'Parallel Structure', url: 'https://literarydevices.net/parallelism/' },
      { title: 'Grammar Rules', url: 'https://owl.purdue.edu/owl/general_writing/mechanics/parallel_structure.html' }
    ]
  },
  'Paraphrase': {
    definition: 'Restating text in different words while maintaining the original meaning, often used for clarity or to avoid plagiarism.',
    examples: [
      'Summarizing a complex passage in simpler terms.',
      'Explaining a difficult concept in your own words.',
      'Translating technical language into everyday speech.',
      'Rewriting a quote to fit your writing style.'
    ],
    resources: [
      { title: 'Paraphrasing Techniques', url: 'https://literarydevices.net/paraphrase/' },
      { title: 'Academic Writing', url: 'https://owl.purdue.edu/owl/research_and_citation/' }
    ]
  },
  'Parody': {
    definition: 'A humorous imitation of a serious work, style, or genre, often exaggerating its characteristics for comic effect.',
    examples: [
      '"Weird Al" Yankovic\'s song parodies.',
      'Satirical versions of famous novels or films.',
      'Political cartoons that parody current events.',
      'Comedy sketches that mock popular TV shows.'
    ],
    resources: [
      { title: 'Parody Examples', url: 'https://literarydevices.net/parody/' },
      { title: 'Satire and Parody', url: 'https://www.britannica.com/art/parody' }
    ]
  },
  'Peripeteia': {
    definition: 'A sudden reversal of fortune or circumstances, often the turning point in a tragedy where the protagonist\'s situation changes dramatically.',
    examples: [
      'Oedipus discovering he killed his father and married his mother.',
      'Macbeth learning that Birnam Wood is moving toward his castle.',
      'A character discovering a long-hidden truth that changes everything.',
      'A sudden twist that completely alters the story\'s direction.'
    ],
    resources: [
      { title: 'Plot Twists', url: 'https://literarydevices.net/peripeteia/' },
      { title: 'Tragic Reversal', url: 'https://www.litcharts.com/literary-devices-and-terms/peripeteia' }
    ]
  },
  'Plagiarism': {
    definition: 'Using another person\'s work, ideas, or words without proper attribution or permission.',
    examples: [
      'Copying text from a source without quotation marks.',
      'Using someone else\'s ideas without citing them.',
      'Submitting work written by another person.',
      'Paraphrasing too closely to the original without credit.'
    ],
    resources: [
      { title: 'Avoiding Plagiarism', url: 'https://owl.purdue.edu/owl/research_and_citation/using_research/' },
      { title: 'Academic Integrity', url: 'https://www.plagiarism.org/' }
    ]
  },
  'Platitude': {
    definition: 'An overused statement that lacks originality or depth, often used to avoid addressing real issues.',
    examples: [
      '"Everything happens for a reason."',
      '"Time heals all wounds."',
      '"What doesn\'t kill you makes you stronger."',
      '"It is what it is."'
    ],
    resources: [
      { title: 'Avoiding Platitudes', url: 'https://literarydevices.net/platitude/' },
      { title: 'Fresh Writing', url: 'https://www.writersdigest.com/write-better-fiction' }
    ]
  },
  'Polemic': {
    definition: 'A strong verbal or written attack on someone or something, often controversial and argumentative.',
    examples: [
      'Political speeches attacking opponents\' policies.',
      'Religious debates about doctrine or beliefs.',
      'Academic arguments about controversial theories.',
      'Social commentary that strongly criticizes institutions.'
    ],
    resources: [
      { title: 'Polemic Writing', url: 'https://literarydevices.net/polemic/' },
      { title: 'Argumentative Writing', url: 'https://www.britannica.com/topic/polemic' }
    ]
  },
  'Polysyndeton': {
    definition: 'The deliberate use of many conjunctions in close succession, often to create a sense of abundance or overwhelming effect.',
    examples: [
      '"I said, "Who killed him?" and he said, "I don\'t know who killed him, but he\'s dead all right," and it was dark and there was water standing in the street and no lights and windows broke and boats all up in the town and trees blown down and everything all blown and I got a skiff and went out and found my boat where I had her inside Mango Key and she was right only she was full of water."',
      '"Neither snow nor rain nor heat nor gloom of night stays these couriers from the swift completion of their appointed rounds."',
      '"We lived and laughed and loved and left."'
    ],
    resources: [
      { title: 'Polysyndeton Examples', url: 'https://literarydevices.net/polysyndeton/' },
      { title: 'Rhetorical Devices', url: 'https://www.americanrhetoric.com/rhetoricaldevicesinsound.htm' }
    ]
  },
  'Prologue': {
    definition: 'An introductory section of a literary work that provides background information or sets the stage for the main story.',
    examples: [
      'The opening of "Romeo and Juliet" explaining the feud between families.',
      'A prologue that introduces the narrator or setting.',
      'Background information about historical events.',
      'A scene that takes place before the main story begins.'
    ],
    resources: [
      { title: 'Prologue in Literature', url: 'https://literarydevices.net/prologue/' },
      { title: 'Story Introductions', url: 'https://www.litcharts.com/literary-devices-and-terms/prologue' }
    ]
  },
  'Propaganda': {
    definition: 'Information, especially biased or misleading information, used to promote a particular political cause or point of view.',
    examples: [
      'Political posters during wartime.',
      'Advertisements that appeal to emotions rather than facts.',
      'News articles with obvious bias.',
      'Social media posts designed to influence opinions.'
    ],
    resources: [
      { title: 'Propaganda Techniques', url: 'https://literarydevices.net/propaganda/' },
      { title: 'Media Literacy', url: 'https://www.britannica.com/topic/propaganda' }
    ]
  },
  'Prose': {
    definition: 'Written language that follows natural speech patterns, without the metrical structure of poetry.',
    examples: [
      'Novels and short stories.',
      'Essays and articles.',
      'Letters and diaries.',
      'Scripts and plays (dialogue).'
    ],
    resources: [
      { title: 'Prose vs Poetry', url: 'https://literarydevices.net/prose/' },
      { title: 'Writing Forms', url: 'https://www.britannica.com/art/prose' }
    ]
  },
  'Protagonist': {
    definition: 'The main character of a story, around whom the plot revolves and whose journey drives the narrative.',
    examples: [
      'Harry Potter in the "Harry Potter" series.',
      'Elizabeth Bennet in "Pride and Prejudice."',
      'Atticus Finch in "To Kill a Mockingbird."',
      'Frodo Baggins in "The Lord of the Rings."'
    ],
    resources: [
      { title: 'Main Characters', url: 'https://literarydevices.net/protagonist/' },
      { title: 'Character Development', url: 'https://www.litcharts.com/literary-devices-and-terms/protagonist' }
    ]
  },
  'Pseudonym': {
    definition: 'A fictitious name used by an author instead of their real name, often for privacy, marketing, or artistic reasons.',
    examples: [
      'Mark Twain (Samuel Clemens).',
      'George Eliot (Mary Ann Evans).',
      'J.K. Rowling writing as Robert Galbraith.',
      'Stephen King writing as Richard Bachman.'
    ],
    resources: [
      { title: 'Pen Names', url: 'https://literarydevices.net/pseudonym/' },
      { title: 'Author Names', url: 'https://www.britannica.com/topic/pseudonym' }
    ]
  },
  'Pun': {
    definition: 'A play on words that exploits multiple meanings of a term or similar-sounding words for humorous or rhetorical effect.',
    examples: [
      '"Time flies like an arrow. Fruit flies like a banana."',
      '"A horse is a very stable animal."',
      '"I wondered why the baseball was getting bigger. Then it hit me."',
      'Shakespeare\'s many puns in his plays.'
    ],
    resources: [
      { title: 'Pun Examples', url: 'https://literarydevices.net/pun/' },
      { title: 'Wordplay', url: 'https://www.merriam-webster.com/words-at-play/pun' }
    ]
  },
  'Red Herring': {
    definition: 'A misleading clue or distraction that leads readers or characters away from the real issue or solution.',
    examples: [
      'A detective novel where a suspicious character turns out to be innocent.',
      'A mystery where the obvious suspect is not the real culprit.',
      'A story that focuses on a minor detail to distract from the main plot.',
      'Political debates that bring up irrelevant issues.'
    ],
    resources: [
      { title: 'Plot Devices', url: 'https://literarydevices.net/red-herring/' },
      { title: 'Mystery Writing', url: 'https://www.litcharts.com/literary-devices-and-terms/red-herring' }
    ]
  },
  'Rhetorical Device': {
    definition: 'A technique used in writing or speech to convey meaning effectively, persuade an audience, or create a particular effect.',
    examples: [
      'Alliteration: "Peter Piper picked a peck of pickled peppers."',
      'Anaphora: "We shall fight on the beaches, we shall fight on the landing grounds."',
      'Hyperbole: "I\'ve told you a million times!"',
      'Metaphor: "Life is a journey."'
    ],
    resources: [
      { title: 'Rhetorical Devices', url: 'https://literarydevices.net/rhetorical-devices/' },
      { title: 'Persuasive Techniques', url: 'https://www.americanrhetoric.com/rhetoricaldevicesinsound.htm' }
    ]
  },
  'Rhyme': {
    definition: 'The repetition of similar sounds at the end of words, especially in poetry, creating a musical effect.',
    examples: [
      'Perfect rhyme: "cat" and "hat."',
      'Slant rhyme: "love" and "move."',
      'Internal rhyme: "Once upon a midnight dreary, while I pondered, weak and weary."',
      'End rhyme: "Roses are red, violets are blue."'
    ],
    resources: [
      { title: 'Rhyme in Poetry', url: 'https://literarydevices.net/rhyme/' },
      { title: 'Poetic Techniques', url: 'https://www.poetryfoundation.org/learn/glossary-terms/rhyme' }
    ]
  },
  'Romanticize': {
    definition: 'To make something seem better, more appealing, or more ideal than it actually is, often ignoring negative aspects.',
    examples: [
      'Portraying the past as simpler and better than the present.',
      'Making poverty seem charming or noble.',
      'Idealizing war as glorious and heroic.',
      'Presenting difficult relationships as passionate and exciting.'
    ],
    resources: [
      { title: 'Idealization in Literature', url: 'https://literarydevices.net/romanticize/' },
      { title: 'Nostalgia', url: 'https://www.britannica.com/topic/nostalgia' }
    ]
  },
  'Sardonic': {
    definition: 'Grimly mocking or cynical humor, often expressing bitterness or scorn through sarcastic remarks.',
    examples: [
      'A character making dark jokes about death or suffering.',
      'Sarcastic commentary about human nature.',
      'Bitter humor about life\'s disappointments.',
      'Cynical observations about society or politics.'
    ],
    resources: [
      { title: 'Sardonic Humor', url: 'https://literarydevices.net/sardonic/' },
      { title: 'Dark Comedy', url: 'https://www.merriam-webster.com/dictionary/sardonic' }
    ]
  },
  'Science Fiction': {
    definition: 'A genre of fiction that explores futuristic concepts, scientific discoveries, space travel, time travel, and other speculative elements.',
    examples: [
      '"Dune" by Frank Herbert - space politics and ecology.',
      '"The Handmaid\'s Tale" by Margaret Atwood - dystopian society.',
      '"Neuromancer" by William Gibson - cyberpunk technology.',
      '"The Martian" by Andy Weir - space survival.'
    ],
    resources: [
      { title: 'Science Fiction', url: 'https://literarydevices.net/science-fiction/' },
      { title: 'Speculative Fiction', url: 'https://www.britannica.com/art/science-fiction' }
    ]
  },
  'Self-Fulfilling Prophecy': {
    definition: 'A prediction that causes itself to become true through the actions of people who believe in it.',
    examples: [
      'A student who believes they\'ll fail a test, so they don\'t study and fail.',
      'A bank run where people withdraw money because they fear the bank will fail.',
      'A character who expects rejection and behaves defensively, causing rejection.',
      'Economic predictions that influence market behavior.'
    ],
    resources: [
      { title: 'Psychological Effects', url: 'https://www.britannica.com/topic/self-fulfilling-prophecy' },
      { title: 'Behavioral Psychology', url: 'https://www.psychologytoday.com/' }
    ]
  },
  'Soliloquy': {
    definition: 'A speech given by a character alone on stage, revealing their inner thoughts and feelings to the audience.',
    examples: [
      'Hamlet\'s "To be or not to be" soliloquy.',
      'Macbeth\'s "Is this a dagger" speech.',
      'Juliet\'s balcony speech in "Romeo and Juliet."',
      'Any character speaking their thoughts aloud when alone.'
    ],
    resources: [
      { title: 'Soliloquy in Drama', url: 'https://literarydevices.net/soliloquy/' },
      { title: 'Dramatic Monologue', url: 'https://www.litcharts.com/literary-devices-and-terms/soliloquy' }
    ]
  },
  'Sonnet': {
    definition: 'A 14-line poem with a specific rhyme scheme and meter, often exploring themes of love, beauty, or mortality.',
    examples: [
      'Shakespearean sonnet: "Shall I compare thee to a summer\'s day?"',
      'Petrarchan sonnet: "How do I love thee? Let me count the ways."',
      'Modern sonnets that break traditional rules.',
      'Sonnet sequences like Shakespeare\'s 154 sonnets.'
    ],
    resources: [
      { title: 'Sonnet Forms', url: 'https://literarydevices.net/sonnet/' },
      { title: 'Poetry Forms', url: 'https://www.poetryfoundation.org/learn/glossary-terms/sonnet' }
    ]
  },
  'Stanza': {
    definition: 'A grouped set of lines in a poem, separated by blank lines, similar to paragraphs in prose.',
    examples: [
      'Couplet: Two lines that rhyme.',
      'Quatrain: Four lines, often with alternating rhyme.',
      'Sestet: Six lines, common in sonnets.',
      'Octave: Eight lines, often in sonnets.'
    ],
    resources: [
      { title: 'Poetic Structure', url: 'https://literarydevices.net/stanza/' },
      { title: 'Poetry Forms', url: 'https://www.poetryfoundation.org/learn/glossary-terms/stanza' }
    ]
  },
  'Style': {
    definition: 'An author\'s unique way of writing, including word choice, sentence structure, tone, and other distinctive features.',
    examples: [
      'Hemingway\'s simple, direct style with short sentences.',
      'Dickens\'s elaborate, descriptive style with long sentences.',
      'Joyce\'s stream-of-consciousness style.',
      'Twain\'s conversational, humorous style.'
    ],
    resources: [
      { title: 'Writing Style', url: 'https://literarydevices.net/style/' },
      { title: 'Author Voice', url: 'https://www.litcharts.com/literary-devices-and-terms/style' }
    ]
  },
  'Subtext': {
    definition: 'The underlying meaning or message that is not stated directly but can be inferred from context, tone, or implications.',
    examples: [
      'A character saying "I\'m fine" while clearly being upset.',
      'Political commentary hidden in a children\'s story.',
      'Social criticism embedded in a seemingly simple narrative.',
      'Emotional undertones in dialogue that reveal character relationships.'
    ],
    resources: [
      { title: 'Reading Between the Lines', url: 'https://literarydevices.net/subtext/' },
      { title: 'Implied Meaning', url: 'https://www.litcharts.com/literary-devices-and-terms/subtext' }
    ]
  },
  'Surrealism': {
    definition: 'An artistic and literary movement that explores the unconscious mind, dreams, and irrational elements, often creating bizarre or illogical scenes.',
    examples: [
      'Salvador Dalí\'s melting clocks in paintings.',
      'Magical realism in literature like "One Hundred Years of Solitude."',
      'Dream sequences in films and literature.',
      'Illogical or impossible events in stories.'
    ],
    resources: [
      { title: 'Surrealism in Art', url: 'https://literarydevices.net/surrealism/' },
      { title: 'Dream Literature', url: 'https://www.britannica.com/art/Surrealism' }
    ]
  },
  'Synecdoche': {
    definition: 'A figure of speech where a part represents the whole or the whole represents a part.',
    examples: [
      '"All hands on deck" (hands for sailors).',
      '"The White House announced..." (White House for the government).',
      '"Wheels" for a car.',
      '"Bread" for food in general.'
    ],
    resources: [
      { title: 'Synecdoche Examples', url: 'https://literarydevices.net/synecdoche/' },
      { title: 'Part for Whole', url: 'https://www.litcharts.com/literary-devices-and-terms/synecdoche' }
    ]
  },
  'Synesthesia': {
    definition: 'A neurological condition where stimulation of one sense leads to automatic experiences in another sense, or describing one sense in terms of another.',
    examples: [
      '"The music was blue" (hearing described in terms of color).',
      '"The sunset was loud" (visual described in terms of sound).',
      '"The chocolate was smooth" (taste described in terms of touch).',
      'Poetry that mixes sensory descriptions.'
    ],
    resources: [
      { title: 'Synesthesia in Literature', url: 'https://literarydevices.net/synesthesia/' },
      { title: 'Sensory Language', url: 'https://www.britannica.com/science/synesthesia' }
    ]
  },
  'Thesis': {
    definition: 'The main argument or claim that a writer presents and supports throughout their work.',
    examples: [
      'A research paper arguing that climate change is caused by human activity.',
      'An essay claiming that social media affects mental health.',
      'A literary analysis arguing that a character represents a specific theme.',
      'A persuasive speech advocating for a particular policy.'
    ],
    resources: [
      { title: 'Writing a Thesis', url: 'https://owl.purdue.edu/owl/general_writing/the_writing_process/thesis_statement_tips.html' },
      { title: 'Academic Writing', url: 'https://owl.purdue.edu/owl/general_writing/' }
    ]
  },
  'Trope': {
    definition: 'A common or overused theme, device, or convention in literature, film, or other media.',
    examples: [
      'The "chosen one" trope in fantasy stories.',
      'The "damsel in distress" trope.',
      'The "wise mentor" trope like Gandalf or Dumbledore.',
      'The "love triangle" trope in romance stories.'
    ],
    resources: [
      { title: 'Common Tropes', url: 'https://literarydevices.net/trope/' },
      { title: 'Story Conventions', url: 'https://tvtropes.org/' }
    ]
  },
  'Truism': {
    definition: 'A statement that is obviously true and generally accepted, often used to avoid addressing real issues.',
    examples: [
      '"Actions speak louder than words."',
      '"You can\'t judge a book by its cover."',
      '"Honesty is the best policy."',
      '"A penny saved is a penny earned."'
    ],
    resources: [
      { title: 'Common Sayings', url: 'https://literarydevices.net/truism/' },
      { title: 'Proverbs', url: 'https://www.phrases.org.uk/meanings/proverbs.html' }
    ]
  },
  'Utopia': {
    definition: 'An imagined perfect society or place where everything is ideal, often used to critique current society.',
    examples: [
      'Thomas More\'s "Utopia" describing an ideal society.',
      'Plato\'s "Republic" outlining a perfect state.',
      'Modern utopian visions in science fiction.',
      'Religious descriptions of heaven or paradise.'
    ],
    resources: [
      { title: 'Utopian Literature', url: 'https://literarydevices.net/utopia/' },
      { title: 'Perfect Societies', url: 'https://www.britannica.com/topic/utopia' }
    ]
  },
  'Verisimilitude': {
    definition: 'The appearance of being true or real, creating believability in fiction through realistic details and plausible events.',
    examples: [
      'Historical novels with accurate period details.',
      'Science fiction with believable technology.',
      'Characters with realistic motivations and behaviors.',
      'Settings that feel authentic and lived-in.'
    ],
    resources: [
      { title: 'Realism in Fiction', url: 'https://literarydevices.net/verisimilitude/' },
      { title: 'Believable Writing', url: 'https://www.litcharts.com/literary-devices-and-terms/verisimilitude' }
    ]
  },
  'Vernacular': {
    definition: 'The everyday language of ordinary people in a particular region or social group, as opposed to formal or literary language.',
    examples: [
      'African American Vernacular English (AAVE).',
      'Regional dialects and accents.',
      'Slang and informal expressions.',
      'Local idioms and phrases.'
    ],
    resources: [
      { title: 'Everyday Language', url: 'https://literarydevices.net/vernacular/' },
      { title: 'Regional Speech', url: 'https://www.britannica.com/topic/vernacular' }
    ]
  },
  'Vignette': {
    definition: 'A brief, descriptive literary sketch that captures a moment, character, or scene without a complete plot.',
    examples: [
      'A short scene showing a character\'s daily routine.',
      'A brief description of a place or setting.',
      'A moment of interaction between characters.',
      'A snapshot of life without full narrative development.'
    ],
    resources: [
      { title: 'Literary Sketches', url: 'https://literarydevices.net/vignette/' },
      { title: 'Short Prose', url: 'https://www.litcharts.com/literary-devices-and-terms/vignette' }
    ]
  },
  'Voice': {
    definition: 'The distinctive style, tone, and personality that comes through in an author\'s writing, making it recognizable and unique.',
    examples: [
      'Mark Twain\'s humorous, folksy voice.',
      'Virginia Woolf\'s stream-of-consciousness voice.',
      'Ernest Hemingway\'s simple, direct voice.',
      'Toni Morrison\'s lyrical, poetic voice.'
    ],
    resources: [
      { title: 'Author Voice', url: 'https://literarydevices.net/voice/' },
      { title: 'Writing Style', url: 'https://www.litcharts.com/literary-devices-and-terms/voice' }
    ]
  },
  'Volta': {
    definition: 'A dramatic shift or turn in a poem, often occurring in sonnets where the mood, tone, or argument changes direction.',
    examples: [
      'The turn in a sonnet from problem to solution.',
      'A shift from description to reflection.',
      'A change from question to answer.',
      'A transition from past to present or vice versa.'
    ],
    resources: [
      { title: 'Poetic Turns', url: 'https://literarydevices.net/volta/' },
      { title: 'Sonnet Structure', url: 'https://www.poetryfoundation.org/learn/glossary-terms/volta' }
    ]
  }
  // All terms now have detailed content
};

export default function NarrativeTheory() {
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);

  const handleTermClick = (term: string) => {
    setSelectedTerm(term);
  };

  const closeModal = () => {
    setSelectedTerm(null);
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden pt-16"
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
            Narrative Theory
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-[var(--accent)] font-serif italic px-4 mb-4"
          >
            Exploring the art and science of storytelling.
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-sm text-[var(--accent)] font-serif italic px-4 mb-6"
          >
            Dedicated to Professor Brian McHale, Professor Emeritus, The Ohio State University
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mb-3"
          >
            <h3 className="text-sm text-[var(--accent)] font-serif">
              For Primary Source Info on Narrative Theory, Checkout these Links
            </h3>
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex flex-wrap justify-center gap-6 text-sm"
          >
            <a 
              href="https://ohiostatepress.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[var(--accent)] hover:text-[var(--highlight)] transition-colors underline"
            >
              The Ohio State University Press
            </a>
            <span className="text-[var(--accent)]">•</span>
            <a 
              href="https://ohiostatepress.org/Narrative.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[var(--accent)] hover:text-[var(--highlight)] transition-colors underline"
            >
              Journal of Narrative Theory
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* Content Section */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-8"
        >
          {/* Introduction */}
          <div className="bg-[var(--card)] rounded-lg p-6 border-2 border-[var(--accent)]">
            <h2 className="text-2xl font-bold mb-4 text-[var(--foreground)]">What is Narrative Theory?</h2>
            <p className="text-lg text-[var(--foreground)] leading-relaxed">
              Narrative theory examines how stories work, why they matter, and how they shape our understanding of the world. 
              From ancient myths to modern media, narratives are fundamental to human communication and culture.
            </p>
          </div>

          {/* Key Concepts */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[var(--card)] rounded-lg p-6 border-2 border-[var(--accent)]">
              <h3 className="text-xl font-semibold mb-3 text-[var(--foreground)]">Story Structure</h3>
              <p className="text-[var(--foreground)]">
                The fundamental building blocks of narrative: plot, character, setting, and theme. 
                Understanding how these elements work together creates compelling stories.
              </p>
            </div>

            <div className="bg-[var(--card)] rounded-lg p-6 border-2 border-[var(--accent)]">
              <h3 className="text-xl font-semibold mb-3 text-[var(--foreground)]">Character Development</h3>
              <p className="text-[var(--foreground)]">
                How characters grow, change, and drive the story forward. 
                Character arcs and motivations are central to engaging narratives.
              </p>
            </div>

            <div className="bg-[var(--card)] rounded-lg p-6 border-2 border-[var(--accent)]">
              <h3 className="text-xl font-semibold mb-3 text-[var(--foreground)]">Narrative Perspective</h3>
              <p className="text-[var(--foreground)]">
                Point of view shapes how readers experience the story. 
                First, second, and third person perspectives each offer unique storytelling possibilities.
              </p>
            </div>

            <div className="bg-[var(--card)] rounded-lg p-6 border-2 border-[var(--accent)]">
              <h3 className="text-xl font-semibold mb-3 text-[var(--foreground)]">Thematic Elements</h3>
              <p className="text-[var(--foreground)]">
                The deeper meanings and messages within stories. 
                Themes connect individual narratives to universal human experiences.
              </p>
            </div>
          </div>

          {/* Applications */}
          <div className="bg-[var(--card)] rounded-lg p-6 border-2 border-[var(--accent)]">
            <h2 className="text-2xl font-bold mb-4 text-[var(--foreground)]">Applications in Modern Media</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <h4 className="font-semibold mb-2 text-[var(--foreground)]">Literature</h4>
                <p className="text-sm text-[var(--accent)]">Novels, short stories, poetry</p>
              </div>
              <div className="text-center">
                <h4 className="font-semibold mb-2 text-[var(--foreground)]">Film & Television</h4>
                <p className="text-sm text-[var(--accent)]">Movies, series, documentaries</p>
              </div>
              <div className="text-center">
                <h4 className="font-semibold mb-2 text-[var(--foreground)]">Games</h4>
                <p className="text-sm text-[var(--accent)]">Video games, tabletop RPGs</p>
              </div>
            </div>
          </div>

          {/* Narrative Toolbox */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="space-y-8"
          >
            <div className="bg-[var(--card)] rounded-lg p-6 border-2 border-[var(--accent)]">
              <h2 className="text-3xl font-bold mb-6 text-[var(--foreground)] text-center">Narrative Toolbox</h2>
              <p className="text-lg text-[var(--foreground)] leading-relaxed mb-8 text-center">
                Practical tools and frameworks for crafting compelling narratives across all mediums.
              </p>
            </div>

            {/* Story Structure Tools */}
            <div className="bg-[var(--card)] rounded-lg p-6 border-2 border-[var(--accent)]">
              <h3 className="text-2xl font-bold mb-6 text-[var(--foreground)]">Story Structure Frameworks</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-[var(--accent)]">Three-Act Structure</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[var(--foreground)]">Act 1 (Setup):</span>
                      <span className="text-[var(--accent)]">25%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--foreground)]">Act 2 (Confrontation):</span>
                      <span className="text-[var(--accent)]">50%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--foreground)]">Act 3 (Resolution):</span>
                      <span className="text-[var(--accent)]">25%</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-[var(--accent)]">Hero's Journey</h4>
                  <div className="space-y-2 text-sm">
                    <div className="text-[var(--foreground)]">• Ordinary World</div>
                    <div className="text-[var(--foreground)]">• Call to Adventure</div>
                    <div className="text-[var(--foreground)]">• Crossing Threshold</div>
                    <div className="text-[var(--foreground)]">• Tests & Allies</div>
                    <div className="text-[var(--foreground)]">• Return with Elixir</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-[var(--accent)]">Save the Cat</h4>
                  <div className="space-y-2 text-sm">
                    <div className="text-[var(--foreground)]">• Opening Image</div>
                    <div className="text-[var(--foreground)]">• Theme Stated</div>
                    <div className="text-[var(--foreground)]">• Catalyst</div>
                    <div className="text-[var(--foreground)]">• Break into Two</div>
                    <div className="text-[var(--foreground)]">• Finale</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Character Development Tools */}
            <div className="bg-[var(--card)] rounded-lg p-6 border-2 border-[var(--accent)]">
              <h3 className="text-2xl font-bold mb-6 text-[var(--foreground)]">Character Development Tools</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-[var(--accent)]">Character Arc Types</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-[var(--background)] rounded border border-[var(--accent)]">
                      <div className="font-semibold text-[var(--foreground)]">Positive Arc</div>
                      <div className="text-sm text-[var(--accent)]">Character grows and improves</div>
                    </div>
                    <div className="p-3 bg-[var(--background)] rounded border border-[var(--accent)]">
                      <div className="font-semibold text-[var(--foreground)]">Negative Arc</div>
                      <div className="text-sm text-[var(--accent)]">Character declines or fails</div>
                    </div>
                    <div className="p-3 bg-[var(--background)] rounded border border-[var(--accent)]">
                      <div className="font-semibold text-[var(--foreground)]">Flat Arc</div>
                      <div className="text-sm text-[var(--accent)]">Character changes the world</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4 text-[var(--accent)]">Character Questionnaire</h4>
                  <div className="space-y-2 text-sm">
                    <div className="text-[var(--foreground)]">• What does your character want most?</div>
                    <div className="text-[var(--foreground)]">• What are their biggest fears?</div>
                    <div className="text-[var(--foreground)]">• What's their defining flaw?</div>
                    <div className="text-[var(--foreground)]">• How do they speak differently?</div>
                    <div className="text-[var(--foreground)]">• What's their backstory?</div>
                    <div className="text-[var(--foreground)]">• How do they change by the end?</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Conflict & Tension Tools */}
            <div className="bg-[var(--card)] rounded-lg p-6 border-2 border-[var(--accent)]">
              <h3 className="text-2xl font-bold mb-6 text-[var(--foreground)]">Conflict & Tension Tools</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-[var(--accent)]">Types of Conflict</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-2 bg-[var(--background)] rounded">
                      <span className="text-[var(--foreground)]">Man vs. Man</span>
                      <span className="text-xs text-[var(--accent)]">External</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-[var(--background)] rounded">
                      <span className="text-[var(--foreground)]">Man vs. Self</span>
                      <span className="text-xs text-[var(--accent)]">Internal</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-[var(--background)] rounded">
                      <span className="text-[var(--foreground)]">Man vs. Nature</span>
                      <span className="text-xs text-[var(--accent)]">External</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-[var(--background)] rounded">
                      <span className="text-[var(--foreground)]">Man vs. Society</span>
                      <span className="text-xs text-[var(--accent)]">External</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4 text-[var(--accent)]">Tension Building</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-[var(--background)] rounded border border-[var(--accent)]">
                      <div className="font-semibold text-[var(--foreground)]">Dramatic Irony</div>
                      <div className="text-sm text-[var(--accent)]">Readers know what characters don't</div>
                    </div>
                    <div className="p-3 bg-[var(--background)] rounded border border-[var(--accent)]">
                      <div className="font-semibold text-[var(--foreground)]">Time Pressure</div>
                      <div className="text-sm text-[var(--accent)]">Deadlines and countdowns</div>
                    </div>
                    <div className="p-3 bg-[var(--background)] rounded border border-[var(--accent)]">
                      <div className="font-semibold text-[var(--foreground)]">Stakes Escalation</div>
                      <div className="text-sm text-[var(--accent)]">Consequences get worse</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dialogue & Voice Tools */}
            <div className="bg-[var(--card)] rounded-lg p-6 border-2 border-[var(--accent)]">
              <h3 className="text-2xl font-bold mb-6 text-[var(--foreground)]">Dialogue & Voice Tools</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-[var(--accent)]">Dialogue Functions</h4>
                  <div className="space-y-2 text-sm">
                    <div className="text-[var(--foreground)]">• Reveal character</div>
                    <div className="text-[var(--foreground)]">• Advance plot</div>
                    <div className="text-[var(--foreground)]">• Provide exposition</div>
                    <div className="text-[var(--foreground)]">• Create conflict</div>
                    <div className="text-[var(--foreground)]">• Establish relationships</div>
                    <div className="text-[var(--foreground)]">• Set tone/mood</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4 text-[var(--accent)]">Voice Techniques</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-[var(--background)] rounded border border-[var(--accent)]">
                      <div className="font-semibold text-[var(--foreground)]">Subtext</div>
                      <div className="text-sm text-[var(--accent)]">What's said vs. what's meant</div>
                    </div>
                    <div className="p-3 bg-[var(--background)] rounded border border-[var(--accent)]">
                      <div className="font-semibold text-[var(--foreground)]">Speech Patterns</div>
                      <div className="text-sm text-[var(--accent)]">Unique vocabulary and rhythm</div>
                    </div>
                    <div className="p-3 bg-[var(--background)] rounded border border-[var(--accent)]">
                      <div className="font-semibold text-[var(--foreground)]">Emotional Beats</div>
                      <div className="text-sm text-[var(--accent)]">Actions between dialogue</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Theme & Symbolism Tools */}
            <div className="bg-[var(--card)] rounded-lg p-6 border-2 border-[var(--accent)]">
              <h3 className="text-2xl font-bold mb-6 text-[var(--foreground)]">Theme & Symbolism Tools</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-[var(--accent)]">Universal Themes</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-[var(--foreground)]">• Love vs. Hate</div>
                    <div className="text-[var(--foreground)]">• Good vs. Evil</div>
                    <div className="text-[var(--foreground)]">• Life vs. Death</div>
                    <div className="text-[var(--foreground)]">• Order vs. Chaos</div>
                    <div className="text-[var(--foreground)]">• Freedom vs. Control</div>
                    <div className="text-[var(--foreground)]">• Truth vs. Lies</div>
                    <div className="text-[var(--foreground)]">• Past vs. Future</div>
                    <div className="text-[var(--foreground)]">• Individual vs. Society</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4 text-[var(--accent)]">Symbolism Techniques</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-[var(--background)] rounded border border-[var(--accent)]">
                      <div className="font-semibold text-[var(--foreground)]">Motifs</div>
                      <div className="text-sm text-[var(--accent)]">Recurring images or ideas</div>
                    </div>
                    <div className="p-3 bg-[var(--background)] rounded border border-[var(--accent)]">
                      <div className="font-semibold text-[var(--foreground)]">Metaphors</div>
                      <div className="text-sm text-[var(--accent)]">Direct comparisons</div>
                    </div>
                    <div className="p-3 bg-[var(--background)] rounded border border-[var(--accent)]">
                      <div className="font-semibold text-[var(--foreground)]">Allegory</div>
                      <div className="text-sm text-[var(--accent)]">Extended symbolic meaning</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pacing & Rhythm Tools */}
            <div className="bg-[var(--card)] rounded-lg p-6 border-2 border-[var(--accent)]">
              <h3 className="text-2xl font-bold mb-6 text-[var(--foreground)]">Pacing & Rhythm Tools</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-[var(--accent)]">Pacing Techniques</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-[var(--background)] rounded border border-[var(--accent)]">
                      <div className="font-semibold text-[var(--foreground)]">Scene vs. Summary</div>
                      <div className="text-sm text-[var(--accent)]">Show important moments, tell transitions</div>
                    </div>
                    <div className="p-3 bg-[var(--background)] rounded border border-[var(--accent)]">
                      <div className="font-semibold text-[var(--foreground)]">Sentence Variation</div>
                      <div className="text-sm text-[var(--accent)]">Mix short and long sentences</div>
                    </div>
                    <div className="p-3 bg-[var(--background)] rounded border border-[var(--accent)]">
                      <div className="font-semibold text-[var(--foreground)]">Chapter Breaks</div>
                      <div className="text-sm text-[var(--accent)]">Strategic stopping points</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4 text-[var(--accent)]">Rhythm Patterns</h4>
                  <div className="space-y-2 text-sm">
                    <div className="text-[var(--foreground)]">• Action → Reflection</div>
                    <div className="text-[var(--foreground)]">• Tension → Release</div>
                    <div className="text-[var(--foreground)]">• Fast → Slow</div>
                    <div className="text-[var(--foreground)]">• Loud → Quiet</div>
                    <div className="text-[var(--foreground)]">• Complex → Simple</div>
                    <div className="text-[var(--foreground)]">• External → Internal</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Advanced Narrative Theory */}
            <div className="bg-[var(--card)] rounded-lg p-6 border-2 border-[var(--accent)]">
              <h3 className="text-2xl font-bold mb-6 text-[var(--foreground)]">Advanced Narrative Theory</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-[var(--accent)]">Narratological Frameworks</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-[var(--background)] rounded border border-[var(--accent)]">
                      <div className="font-semibold text-[var(--foreground)]">Gérard Genette's Categories</div>
                      <div className="text-sm text-[var(--accent)]">Order, Duration, Frequency, Mood, Voice</div>
                    </div>
                    <div className="p-3 bg-[var(--background)] rounded border border-[var(--accent)]">
                      <div className="font-semibold text-[var(--foreground)]">Mikhail Bakhtin's Dialogism</div>
                      <div className="text-sm text-[var(--accent)]">Polyphony, Heteroglossia, Chronotope</div>
                    </div>
                    <div className="p-3 bg-[var(--background)] rounded border border-[var(--accent)]">
                      <div className="font-semibold text-[var(--foreground)]">Wayne Booth's Rhetoric</div>
                      <div className="text-sm text-[var(--accent)]">Implied Author, Unreliable Narrator</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4 text-[var(--accent)]">Postmodern Narratology</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-[var(--background)] rounded border border-[var(--accent)]">
                      <div className="font-semibold text-[var(--foreground)]">Metafiction</div>
                      <div className="text-sm text-[var(--accent)]">Self-reflexive narrative techniques</div>
                    </div>
                    <div className="p-3 bg-[var(--background)] rounded border border-[var(--accent)]">
                      <div className="font-semibold text-[var(--foreground)]">Intertextuality</div>
                      <div className="text-sm text-[var(--accent)]">Textual relationships and references</div>
                    </div>
                    <div className="p-3 bg-[var(--background)] rounded border border-[var(--accent)]">
                      <div className="font-semibold text-[var(--foreground)]">Fragmentation</div>
                      <div className="text-sm text-[var(--accent)]">Disrupted linear narrative</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cognitive Narratology */}
            <div className="bg-[var(--card)] rounded-lg p-6 border-2 border-[var(--accent)]">
              <h3 className="text-2xl font-bold mb-6 text-[var(--foreground)]">Cognitive Narratology</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-[var(--accent)]">Mental Models</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-[var(--background)] rounded border border-[var(--accent)]">
                      <div className="font-semibold text-[var(--foreground)]">Storyworld Construction</div>
                      <div className="text-sm text-[var(--accent)]">Reader's mental representation</div>
                    </div>
                    <div className="p-3 bg-[var(--background)] rounded border border-[var(--accent)]">
                      <div className="font-semibold text-[var(--foreground)]">Character Theory of Mind</div>
                      <div className="text-sm text-[var(--accent)]">Understanding character psychology</div>
                    </div>
                    <div className="p-3 bg-[var(--background)] rounded border border-[var(--accent)]">
                      <div className="font-semibold text-[var(--foreground)]">Narrative Transportation</div>
                      <div className="text-sm text-[var(--accent)]">Immersion in fictional worlds</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4 text-[var(--accent)]">Processing Strategies</h4>
                  <div className="space-y-2 text-sm">
                    <div className="text-[var(--foreground)]">• Schema Activation</div>
                    <div className="text-[var(--foreground)]">• Inference Generation</div>
                    <div className="text-[var(--foreground)]">• Gap Filling</div>
                    <div className="text-[var(--foreground)]">• Perspective Taking</div>
                    <div className="text-[var(--foreground)]">• Emotional Simulation</div>
                    <div className="text-[var(--foreground)]">• Memory Integration</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feminist & Queer Narratology */}
            <div className="bg-[var(--card)] rounded-lg p-6 border-2 border-[var(--accent)]">
              <h3 className="text-2xl font-bold mb-6 text-[var(--foreground)]">Feminist & Queer Narratology</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-[var(--accent)]">Gendered Narrative</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-[var(--background)] rounded border border-[var(--accent)]">
                      <div className="font-semibold text-[var(--foreground)]">Écriture Féminine</div>
                      <div className="text-sm text-[var(--accent)]">Cixous' feminine writing</div>
                    </div>
                    <div className="p-3 bg-[var(--background)] rounded border border-[var(--accent)]">
                      <div className="font-semibold text-[var(--foreground)]">Gynocriticism</div>
                      <div className="text-sm text-[var(--accent)]">Showalter's female literary tradition</div>
                    </div>
                    <div className="p-3 bg-[var(--background)] rounded border border-[var(--accent)]">
                      <div className="font-semibold text-[var(--foreground)]">Queer Temporality</div>
                      <div className="text-sm text-[var(--accent)]">Non-linear temporal structures</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4 text-[var(--accent)]">Narrative Identity</h4>
                  <div className="space-y-2 text-sm">
                    <div className="text-[var(--foreground)]">• Gender Performance</div>
                    <div className="text-[var(--foreground)]">• Sexual Subjectivity</div>
                    <div className="text-[var(--foreground)]">• Intersectional Analysis</div>
                    <div className="text-[var(--foreground)]">• Counter-narratives</div>
                    <div className="text-[var(--foreground)]">• Voice and Agency</div>
                    <div className="text-[var(--foreground)]">• Embodied Experience</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Digital & Transmedia Narratology */}
            <div className="bg-[var(--card)] rounded-lg p-6 border-2 border-[var(--accent)]">
              <h3 className="text-2xl font-bold mb-6 text-[var(--foreground)]">Digital & Transmedia Narratology</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-[var(--accent)]">Hypertext Theory</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-[var(--background)] rounded border border-[var(--accent)]">
                      <div className="font-semibold text-[var(--foreground)]">Non-linear Reading</div>
                      <div className="text-sm text-[var(--accent)]">Multiple narrative paths</div>
                    </div>
                    <div className="p-3 bg-[var(--background)] rounded border border-[var(--accent)]">
                      <div className="font-semibold text-[var(--foreground)]">Interactive Fiction</div>
                      <div className="text-sm text-[var(--accent)]">Reader agency in storytelling</div>
                    </div>
                    <div className="p-3 bg-[var(--background)] rounded border border-[var(--accent)]">
                      <div className="font-semibold text-[var(--foreground)]">Cyborg Narratives</div>
                      <div className="text-sm text-[var(--accent)]">Human-machine storytelling</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4 text-[var(--accent)]">Transmedia Storytelling</h4>
                  <div className="space-y-2 text-sm">
                    <div className="text-[var(--foreground)]">• Storyworld Expansion</div>
                    <div className="text-[var(--foreground)]">• Medium-Specific Narratives</div>
                    <div className="text-[var(--foreground)]">• Participatory Culture</div>
                    <div className="text-[var(--foreground)]">• Convergence Culture</div>
                    <div className="text-[var(--foreground)]">• Narrative Architecture</div>
                    <div className="text-[var(--foreground)]">• Cross-media Adaptation</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Proppian Fairytale Analysis */}
            <div className="bg-[var(--card)] rounded-lg p-6 border-2 border-[var(--accent)]">
              <h3 className="text-2xl font-bold mb-6 text-[var(--foreground)]">Proppian Fairytale Analysis</h3>
              <div className="mb-6 p-4 bg-[var(--background)] rounded-lg border border-[var(--accent)]">
                <p className="text-sm text-[var(--foreground)] leading-relaxed">
                  <strong>Vladimir Propp</strong> (1895-1970) was a Russian folklorist and structuralist who revolutionized narrative theory with his 1928 work <em>Morphology of the Folktale</em>. By analyzing 100 Russian fairy tales, Propp discovered that despite surface differences, these stories shared a common underlying structure. He identified 31 narrative functions and 7 character types that could be combined in various ways to create the infinite variety of fairy tales. This structuralist approach revealed that stories, like language, follow predictable patterns and can be broken down into fundamental units. Propp's work influenced later structuralists like Claude Lévi-Strauss and remains foundational in narrative theory, demonstrating how seemingly diverse stories can be analyzed through systematic structural principles.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-[var(--accent)]">Character Functions</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-[var(--background)] rounded border border-[var(--accent)]">
                      <div className="font-semibold text-[var(--foreground)]">Hero</div>
                      <div className="text-sm text-[var(--accent)]">Protagonist who embarks on quest</div>
                    </div>
                    <div className="p-3 bg-[var(--background)] rounded border border-[var(--accent)]">
                      <div className="font-semibold text-[var(--foreground)]">Villain</div>
                      <div className="text-sm text-[var(--accent)]">Antagonist who opposes hero</div>
                    </div>
                    <div className="p-3 bg-[var(--background)] rounded border border-[var(--accent)]">
                      <div className="font-semibold text-[var(--foreground)]">Donor</div>
                      <div className="text-sm text-[var(--accent)]">Provides magical aid or object</div>
                    </div>
                    <div className="p-3 bg-[var(--background)] rounded border border-[var(--accent)]">
                      <div className="font-semibold text-[var(--foreground)]">Helper</div>
                      <div className="text-sm text-[var(--accent)]">Assists hero in quest</div>
                    </div>
                    <div className="p-3 bg-[var(--background)] rounded border border-[var(--accent)]">
                      <div className="font-semibold text-[var(--foreground)]">Princess</div>
                      <div className="text-sm text-[var(--accent)]">Sought-after reward or goal</div>
                    </div>
                    <div className="p-3 bg-[var(--background)] rounded border border-[var(--accent)]">
                      <div className="font-semibold text-[var(--foreground)]">Dispatcher</div>
                      <div className="text-sm text-[var(--accent)]">Sends hero on mission</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4 text-[var(--accent)]">Narrative Functions</h4>
                  <div className="space-y-2 text-sm">
                    <div className="text-[var(--foreground)]">• Absentation (Hero leaves home)</div>
                    <div className="text-[var(--foreground)]">• Interdiction (Warning given)</div>
                    <div className="text-[var(--foreground)]">• Violation (Warning ignored)</div>
                    <div className="text-[var(--foreground)]">• Reconnaissance (Villain seeks info)</div>
                    <div className="text-[var(--foreground)]">• Trickery (Villain deceives)</div>
                    <div className="text-[var(--foreground)]">• Complicity (Victim deceived)</div>
                    <div className="text-[var(--foreground)]">• Villainy (Harm done)</div>
                    <div className="text-[var(--foreground)]">• Lack (Something needed)</div>
                    <div className="text-[var(--foreground)]">• Departure (Hero leaves)</div>
                    <div className="text-[var(--foreground)]">• Test (Hero challenged)</div>
                    <div className="text-[var(--foreground)]">• Receipt (Magical aid given)</div>
                    <div className="text-[var(--foreground)]">• Struggle (Hero vs. Villain)</div>
                    <div className="text-[var(--foreground)]">• Victory (Hero triumphs)</div>
                    <div className="text-[var(--foreground)]">• Return (Hero comes home)</div>
                    <div className="text-[var(--foreground)]">• Wedding (Happy ending)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Literary Terms Dictionary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="space-y-8"
            >
              <div className="bg-[var(--card)] rounded-lg p-6 border-2 border-[var(--accent)]">
                <h2 className="text-3xl font-bold mb-6 text-[var(--foreground)] text-center">Dictionary of Literary Terms</h2>
                <p className="text-lg text-[var(--foreground)] leading-relaxed mb-8 text-center">
                  Essential literary terms for AICE, AP, & IB students. Understanding these terms is crucial for narrative analysis and sound literary criticism on exams.
                </p>
              </div>

              {/* A-C Terms */}
              <div className="bg-[var(--card)] rounded-lg p-6 border-2 border-[var(--accent)]">
                <h3 className="text-2xl font-bold mb-6 text-[var(--foreground)]">A - C</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {dictionaryAC.map(({ term, def }) => (
                    <motion.div 
                      key={term} 
                      className="p-3 bg-[var(--background)] rounded border border-[var(--accent)] cursor-pointer hover:border-[var(--highlight)] hover:shadow-lg transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleTermClick(term)}
                    >
                      <div className="font-semibold text-[var(--foreground)]">{term}</div>
                      <div className="text-sm text-[var(--accent)]">{def}</div>
                    </motion.div>
                  ))}
                  {Array((3 - (dictionaryAC.length % 3)) % 3).fill(0).map((_, i) => (
                    <div key={`pad-ac-${i}`} className="invisible" />
                  ))}
                </div>
              </div>

              {/* D-H Terms */}
              <div className="bg-[var(--card)] rounded-lg p-6 border-2 border-[var(--accent)]">
                <h3 className="text-2xl font-bold mb-6 text-[var(--foreground)]">D - H</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {dictionaryDH.map(({ term, def }) => (
                    <motion.div 
                      key={term} 
                      className="p-3 bg-[var(--background)] rounded border border-[var(--accent)] cursor-pointer hover:border-[var(--highlight)] hover:shadow-lg transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleTermClick(term)}
                    >
                      <div className="font-semibold text-[var(--foreground)]">{term}</div>
                      <div className="text-sm text-[var(--accent)]">{def}</div>
                    </motion.div>
                  ))}
                  {Array((3 - (dictionaryDH.length % 3)) % 3).fill(0).map((_, i) => (
                    <div key={`pad-dh-${i}`} className="invisible" />
                  ))}
                </div>
              </div>

              {/* I-P Terms */}
              <div className="bg-[var(--card)] rounded-lg p-6 border-2 border-[var(--accent)]">
                <h3 className="text-2xl font-bold mb-6 text-[var(--foreground)]">I - P</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {dictionaryIP.map(({ term, def }) => (
                    <motion.div 
                      key={term} 
                      className="p-3 bg-[var(--background)] rounded border border-[var(--accent)] cursor-pointer hover:border-[var(--highlight)] hover:shadow-lg transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleTermClick(term)}
                    >
                      <div className="font-semibold text-[var(--foreground)]">{term}</div>
                      <div className="text-sm text-[var(--accent)]">{def}</div>
                    </motion.div>
                  ))}
                  {Array((3 - (dictionaryIP.length % 3)) % 3).fill(0).map((_, i) => (
                    <div key={`pad-ip-${i}`} className="invisible" />
                  ))}
                </div>
              </div>

              {/* R-Z Terms */}
              <div className="bg-[var(--card)] rounded-lg p-6 border-2 border-[var(--accent)]">
                <h3 className="text-2xl font-bold mb-6 text-[var(--foreground)]">R - Z</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {dictionaryRZ.map(({ term, def }) => (
                    <motion.div 
                      key={term} 
                      className="p-3 bg-[var(--background)] rounded border border-[var(--accent)] cursor-pointer hover:border-[var(--highlight)] hover:shadow-lg transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleTermClick(term)}
                    >
                      <div className="font-semibold text-[var(--foreground)]">{term}</div>
                      <div className="text-sm text-[var(--accent)]">{def}</div>
                    </motion.div>
                  ))}
                  {Array((3 - (dictionaryRZ.length % 3)) % 3).fill(0).map((_, i) => (
                    <div key={`pad-rz-${i}`} className="invisible" />
                  ))}
                </div>
              </div>

              {/* Reference Link */}
              <div className="bg-[var(--card)] rounded-lg p-6 border-2 border-[var(--accent)] text-center">
                <p className="text-[var(--foreground)] mb-4">
                  For more detailed definitions and examples, visit:
                </p>
                <a 
                  href="https://literaryterms.net" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-[var(--highlight)] text-[var(--background)] px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105 hover:shadow-lg"
                >
                  LiteraryTerms.net
                </a>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Expanded Term Modal */}
      <AnimatePresence>
        {selectedTerm && detailedTerms[selectedTerm] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[var(--card)] rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-[var(--card)] border-b border-[var(--accent)] p-6 rounded-t-xl">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-bold text-[var(--foreground)]">{selectedTerm}</h2>
                  <button
                    onClick={closeModal}
                    className="text-[var(--accent)] hover:text-[var(--foreground)] transition-colors text-2xl font-bold p-2 hover:bg-[var(--background)] rounded-lg"
                  >
                    ×
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-8">
                {/* Definition */}
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-[var(--accent)]">Definition</h3>
                  <p className="text-[var(--foreground)] leading-relaxed text-lg">
                    {detailedTerms[selectedTerm].definition}
                  </p>
                </div>

                {/* Examples */}
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-[var(--accent)]">Examples</h3>
                  <div className="space-y-3">
                    {detailedTerms[selectedTerm].examples.map((example, index) => (
                      <div key={index} className="bg-[var(--background)] p-4 rounded-lg border-l-4 border-[var(--highlight)]">
                        <p className="text-[var(--foreground)] italic">"{example}"</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Further Resources */}
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-[var(--accent)]">Further Resources</h3>
                  <div className="space-y-2">
                    {detailedTerms[selectedTerm].resources.map((resource, index) => (
                      <a
                        key={index}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-[var(--accent)] hover:text-[var(--highlight)] transition-colors underline"
                      >
                        {resource.title}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 