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
              
              {/* Gérard Genette Section */}
              <div className="mb-8 p-4 bg-[var(--background)] rounded-lg border border-[var(--accent)]">
                <h4 className="text-xl font-bold mb-3 text-[var(--accent)]">Gérard Genette's Narratological Categories</h4>
                <p className="text-sm text-[var(--foreground)] leading-relaxed mb-4">
                  <strong>Gérard Genette</strong> (1930-2018) was a French literary theorist who revolutionized narrative theory with his systematic analysis of narrative discourse. In his seminal work <em>Narrative Discourse</em> (1972), Genette developed a comprehensive framework for analyzing how stories are told, introducing five key categories that continue to influence narratological studies today.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold text-[var(--foreground)] mb-2">Order (Ordre)</h5>
                    <p className="text-xs text-[var(--accent)] mb-2">The relationship between the chronological order of events and their presentation in the narrative</p>
                    <ul className="text-xs text-[var(--foreground)] space-y-1">
                      <li>• <strong>Analepsis:</strong> Flashback - presenting events that occurred before the current point</li>
                      <li>• <strong>Prolepsis:</strong> Flashforward - presenting events that will occur later</li>
                      <li>• <strong>Ellipsis:</strong> Omission of events from the narrative</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-[var(--foreground)] mb-2">Duration (Durée)</h5>
                    <p className="text-xs text-[var(--accent)] mb-2">The relationship between the time events take to occur and the space devoted to them in the narrative</p>
                    <ul className="text-xs text-[var(--foreground)] space-y-1">
                      <li>• <strong>Scene:</strong> Equal time - narrative time equals story time</li>
                      <li>• <strong>Summary:</strong> Narrative time shorter than story time</li>
                      <li>• <strong>Pause:</strong> Narrative time longer than story time (description)</li>
                      <li>• <strong>Ellipsis:</strong> No narrative time for story events</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-[var(--foreground)] mb-2">Frequency (Fréquence)</h5>
                    <p className="text-xs text-[var(--accent)] mb-2">The relationship between how many times an event occurs in the story and how many times it is narrated</p>
                    <ul className="text-xs text-[var(--foreground)] space-y-1">
                      <li>• <strong>Singulative:</strong> Event occurs once, narrated once</li>
                      <li>• <strong>Repetitive:</strong> Event occurs once, narrated multiple times</li>
                      <li>• <strong>Iterative:</strong> Event occurs multiple times, narrated once</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-[var(--foreground)] mb-2">Mood (Mode)</h5>
                    <p className="text-xs text-[var(--accent)] mb-2">The degree of mediation between the narrator and the story</p>
                    <ul className="text-xs text-[var(--foreground)] space-y-1">
                      <li>• <strong>Distance:</strong> How close the narrator is to the events</li>
                      <li>• <strong>Focalization:</strong> The perspective through which events are perceived</li>
                      <li>• <strong>Internal/External:</strong> Whether the focalizer is a character or not</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Mikhail Bakhtin Section */}
              <div className="mb-8 p-4 bg-[var(--background)] rounded-lg border border-[var(--accent)]">
                <h4 className="text-xl font-bold mb-3 text-[var(--accent)]">Mikhail Bakhtin's Dialogism</h4>
                <p className="text-sm text-[var(--foreground)] leading-relaxed mb-4">
                  <strong>Mikhail Bakhtin</strong> (1895-1975) was a Russian philosopher and literary theorist whose work on dialogism, polyphony, and the novel fundamentally changed how we understand narrative discourse. His concepts of heteroglossia and the chronotope provide crucial tools for analyzing the complex interplay of voices and temporal-spatial relationships in narrative texts.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-[var(--foreground)] mb-2">Polyphony</h5>
                    <p className="text-xs text-[var(--accent)] mb-2">Multiple independent voices in a text, each with equal authority</p>
                    <ul className="text-xs text-[var(--foreground)] space-y-1">
                      <li>• <strong>Dostoevsky's Novels:</strong> Each character has their own "truth"</li>
                      <li>• <strong>Democratic Discourse:</strong> No single authoritative voice</li>
                      <li>• <strong>Contradictory Perspectives:</strong> Multiple viewpoints coexist</li>
                      <li>• <strong>Unfinalizability:</strong> No final resolution of competing voices</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-[var(--foreground)] mb-2">Heteroglossia</h5>
                    <p className="text-xs text-[var(--accent)] mb-2">The coexistence of different languages, dialects, and speech types</p>
                    <ul className="text-xs text-[var(--foreground)] space-y-1">
                      <li>• <strong>Social Languages:</strong> Different class, profession, age groups</li>
                      <li>• <strong>Generic Languages:</strong> Different literary forms and styles</li>
                      <li>• <strong>Centripetal vs Centrifugal:</strong> Unifying vs. diversifying forces</li>
                      <li>• <strong>Dialogic Tension:</strong> Conflict between different speech types</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-[var(--foreground)] mb-2">Chronotope</h5>
                    <p className="text-xs text-[var(--accent)] mb-2">The intrinsic connectedness of temporal and spatial relationships</p>
                    <ul className="text-xs text-[var(--foreground)] space-y-1">
                      <li>• <strong>Road Chronotope:</strong> Journey as narrative structure</li>
                      <li>• <strong>Castle Chronotope:</strong> Enclosed space with specific time</li>
                      <li>• <strong>Threshold Chronotope:</strong> Moment of crisis and decision</li>
                      <li>• <strong>Salon Chronotope:</strong> Social space for intellectual discourse</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-[var(--foreground)] mb-2">Carnivalesque</h5>
                    <p className="text-xs text-[var(--accent)] mb-2">The temporary suspension of hierarchical order and social norms</p>
                    <ul className="text-xs text-[var(--foreground)] space-y-1">
                      <li>• <strong>Grotesque Realism:</strong> Celebration of the body and material life</li>
                      <li>• <strong>Social Inversion:</strong> Temporary reversal of power structures</li>
                      <li>• <strong>Laughter:</strong> Subversive force against authority</li>
                      <li>• <strong>Regeneration:</strong> Renewal through chaos and disorder</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Wayne Booth Section */}
              <div className="mb-8 p-4 bg-[var(--background)] rounded-lg border border-[var(--accent)]">
                <h4 className="text-xl font-bold mb-3 text-[var(--accent)]">Wayne Booth's Rhetoric of Fiction</h4>
                <p className="text-sm text-[var(--foreground)] leading-relaxed mb-4">
                  <strong>Wayne C. Booth</strong> (1921-2005) was an American literary critic who revolutionized our understanding of narrative rhetoric. His work on the implied author, unreliable narrator, and the ethical dimensions of narrative technique established crucial concepts for analyzing how narratives persuade and affect readers.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-[var(--foreground)] mb-2">Implied Author</h5>
                    <p className="text-xs text-[var(--accent)] mb-2">The author's "second self" as reconstructed from the text</p>
                    <ul className="text-xs text-[var(--foreground)] space-y-1">
                      <li>• <strong>Textual Construction:</strong> Reader's inference from the work</li>
                      <li>• <strong>Ethical Stance:</strong> Moral position revealed through narrative</li>
                      <li>• <strong>Narrative Choices:</strong> Selection and arrangement of material</li>
                      <li>• <strong>Authorial Distance:</strong> Separation from narrator and characters</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-[var(--foreground)] mb-2">Unreliable Narrator</h5>
                    <p className="text-xs text-[var(--accent)] mb-2">A narrator whose credibility is compromised</p>
                    <ul className="text-xs text-[var(--foreground)] space-y-1">
                      <li>• <strong>Moral Unreliability:</strong> Narrator's values are suspect</li>
                      <li>• <strong>Intellectual Unreliability:</strong> Narrator's understanding is limited</li>
                      <li>• <strong>Factual Unreliability:</strong> Narrator's account is inaccurate</li>
                      <li>• <strong>Emotional Unreliability:</strong> Narrator's emotional state affects perception</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-[var(--foreground)] mb-2">Narrative Distance</h5>
                    <p className="text-xs text-[var(--accent)] mb-2">The degree of separation between narrator and events</p>
                    <ul className="text-xs text-[var(--foreground)] space-y-1">
                      <li>• <strong>Temporal Distance:</strong> Time between events and narration</li>
                      <li>• <strong>Physical Distance:</strong> Spatial relationship to events</li>
                      <li>• <strong>Intellectual Distance:</strong> Understanding of events</li>
                      <li>• <strong>Emotional Distance:</strong> Emotional involvement in events</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-[var(--foreground)] mb-2">Narrative Ethics</h5>
                    <p className="text-xs text-[var(--accent)] mb-2">The moral implications of narrative technique</p>
                    <ul className="text-xs text-[var(--foreground)] space-y-1">
                      <li>• <strong>Authorial Responsibility:</strong> Ethical consequences of narrative choices</li>
                      <li>• <strong>Reader Response:</strong> How narrative affects reader's moral understanding</li>
                      <li>• <strong>Narrative Coherence:</strong> Ethical consistency in storytelling</li>
                      <li>• <strong>Rhetorical Effect:</strong> How narrative persuades ethically</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Roland Barthes Section */}
              <div className="mb-8 p-4 bg-[var(--background)] rounded-lg border border-[var(--accent)]">
                <h4 className="text-xl font-bold mb-3 text-[var(--accent)]">Roland Barthes' Structural Analysis</h4>
                <p className="text-sm text-[var(--foreground)] leading-relaxed mb-4">
                  <strong>Roland Barthes</strong> (1915-1980) was a French literary theorist, philosopher, and semiotician whose work revolutionized our understanding of narrative structure and meaning. His contributions to narratology include the distinction between "readerly" and "writerly" texts, the concept of the "death of the author," and structural analysis of narrative codes.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-[var(--foreground)] mb-2">Narrative Codes</h5>
                    <p className="text-xs text-[var(--accent)] mb-2">The five codes that structure narrative meaning</p>
                    <ul className="text-xs text-[var(--foreground)] space-y-1">
                      <li>• <strong>Hermeneutic Code:</strong> Questions and answers that create suspense</li>
                      <li>• <strong>Proairetic Code:</strong> Actions and their consequences</li>
                      <li>• <strong>Semantic Code:</strong> Connotative meanings and themes</li>
                      <li>• <strong>Symbolic Code:</strong> Binary oppositions and symbolic structures</li>
                      <li>• <strong>Cultural Code:</strong> Shared cultural knowledge and references</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-[var(--foreground)] mb-2">Readerly vs Writerly Texts</h5>
                    <p className="text-xs text-[var(--accent)] mb-2">Two types of textual engagement</p>
                    <ul className="text-xs text-[var(--foreground)] space-y-1">
                      <li>• <strong>Readerly (Lisible):</strong> Traditional, closed texts that confirm expectations</li>
                      <li>• <strong>Writerly (Scriptible):</strong> Open texts that require active reader participation</li>
                      <li>• <strong>Pleasure vs Jouissance:</strong> Different types of reading pleasure</li>
                      <li>• <strong>Textual Production:</strong> Reader as co-producer of meaning</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-[var(--foreground)] mb-2">Death of the Author</h5>
                    <p className="text-xs text-[var(--accent)] mb-2">The separation of text from authorial intention</p>
                    <ul className="text-xs text-[var(--foreground)] space-y-1">
                      <li>• <strong>Authorial Absence:</strong> Author's intentions are irrelevant to meaning</li>
                      <li>• <strong>Reader's Role:</strong> Reader creates meaning through interpretation</li>
                      <li>• <strong>Textual Autonomy:</strong> Text exists independently of its creator</li>
                      <li>• <strong>Intertextuality:</strong> Texts refer to other texts, not authors</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-[var(--foreground)] mb-2">Structural Analysis</h5>
                    <p className="text-xs text-[var(--accent)] mb-2">Breaking down narrative into structural units</p>
                    <ul className="text-xs text-[var(--foreground)] space-y-1">
                      <li>• <strong>Lexias:</strong> Smallest units of reading</li>
                      <li>• <strong>Functions:</strong> Narrative units with specific purposes</li>
                      <li>• <strong>Indices:</strong> Units that indicate character or atmosphere</li>
                      <li>• <strong>Catalyzers:</strong> Units that fill narrative space</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Algirdas Julien Greimas Section */}
              <div className="mb-8 p-4 bg-[var(--background)] rounded-lg border border-[var(--accent)]">
                <h4 className="text-xl font-bold mb-3 text-[var(--accent)]">Algirdas Julien Greimas' Semiotic Square</h4>
                <p className="text-sm text-[var(--foreground)] leading-relaxed mb-4">
                  <strong>Algirdas Julien Greimas</strong> (1917-1992) was a Lithuanian-French semiotician who developed the semiotic square and actantial model, providing powerful tools for analyzing narrative structure and meaning. His work extends structuralist analysis into deeper semantic and logical relationships.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-[var(--foreground)] mb-2">Semiotic Square</h5>
                    <p className="text-xs text-[var(--accent)] mb-2">Logical structure of semantic oppositions</p>
                    <ul className="text-xs text-[var(--foreground)] space-y-1">
                      <li>• <strong>Contradiction:</strong> Direct opposition (A vs non-A)</li>
                      <li>• <strong>Contrariety:</strong> Contrary terms (A vs B)</li>
                      <li>• <strong>Implication:</strong> Logical relationships between terms</li>
                      <li>• <strong>Presupposition:</strong> Assumed relationships</li>
                      <li>• <strong>Dynamic Trajectories:</strong> Movement between positions</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-[var(--foreground)] mb-2">Actantial Model</h5>
                    <p className="text-xs text-[var(--accent)] mb-2">Six fundamental roles in narrative</p>
                    <ul className="text-xs text-[var(--foreground)] space-y-1">
                      <li>• <strong>Subject:</strong> Protagonist seeking the object</li>
                      <li>• <strong>Object:</strong> What the subject desires</li>
                      <li>• <strong>Sender:</strong> Initiates the quest</li>
                      <li>• <strong>Receiver:</strong> Benefits from the quest</li>
                      <li>• <strong>Helper:</strong> Aids the subject</li>
                      <li>• <strong>Opponent:</strong> Hinders the subject</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-[var(--foreground)] mb-2">Narrative Programs</h5>
                    <p className="text-xs text-[var(--accent)] mb-2">Sequences of actions in narrative</p>
                    <ul className="text-xs text-[var(--foreground)] space-y-1">
                      <li>• <strong>Manipulation:</strong> Sender influences subject</li>
                      <li>• <strong>Competence:</strong> Subject acquires abilities</li>
                      <li>• <strong>Performance:</strong> Subject accomplishes action</li>
                      <li>• <strong>Sanction:</strong> Success or failure is evaluated</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-[var(--foreground)] mb-2">Semantic Analysis</h5>
                    <p className="text-xs text-[var(--accent)] mb-2">Deep structure of meaning</p>
                    <ul className="text-xs text-[var(--foreground)] space-y-1">
                      <li>• <strong>Isotopies:</strong> Semantic consistency in text</li>
                      <li>• <strong>Classemes:</strong> Semantic categories</li>
                      <li>• <strong>Semes:</strong> Minimal units of meaning</li>
                      <li>• <strong>Semantic Fields:</strong> Related meanings</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Tzvetan Todorov Section */}
              <div className="mb-8 p-4 bg-[var(--background)] rounded-lg border border-[var(--accent)]">
                <h4 className="text-xl font-bold mb-3 text-[var(--accent)]">Tzvetan Todorov's Narrative Grammar</h4>
                <p className="text-sm text-[var(--foreground)] leading-relaxed mb-4">
                  <strong>Tzvetan Todorov</strong> (1939-2017) was a Bulgarian-French literary theorist who developed a grammatical approach to narrative structure. His work on narrative transformation and the fantastic genre provides crucial tools for understanding how narratives change and develop over time.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-[var(--foreground)] mb-2">Narrative Grammar</h5>
                    <p className="text-xs text-[var(--accent)] mb-2">Linguistic structure of narrative</p>
                    <ul className="text-xs text-[var(--foreground)] space-y-1">
                      <li>• <strong>Propositions:</strong> Basic narrative units</li>
                      <li>• <strong>Sequences:</strong> Groups of related propositions</li>
                      <li>• <strong>Transformations:</strong> Changes in narrative state</li>
                      <li>• <strong>Equilibrium:</strong> Stable narrative states</li>
                      <li>• <strong>Disequilibrium:</strong> Unstable narrative states</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-[var(--foreground)] mb-2">The Fantastic</h5>
                    <p className="text-xs text-[var(--accent)] mb-2">Genre defined by reader hesitation</p>
                    <ul className="text-xs text-[var(--foreground)] space-y-1">
                      <li>• <strong>Hesitation:</strong> Reader's uncertainty about supernatural</li>
                      <li>• <strong>Uncanny:</strong> Supernatural explained rationally</li>
                      <li>• <strong>Marvelous:</strong> Supernatural accepted as real</li>
                      <li>• <strong>Poetic:</strong> Symbolic interpretation</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-[var(--foreground)] mb-2">Narrative Transformation</h5>
                    <p className="text-xs text-[var(--accent)] mb-2">How narratives change over time</p>
                    <ul className="text-xs text-[var(--foreground)] space-y-1">
                      <li>• <strong>Modification:</strong> Change in character attributes</li>
                      <li>• <strong>Transformation:</strong> Change in character identity</li>
                      <li>• <strong>Deterioration:</strong> Negative character change</li>
                      <li>• <strong>Improvement:</strong> Positive character change</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-[var(--foreground)] mb-2">Narrative Typology</h5>
                    <p className="text-xs text-[var(--accent)] mb-2">Classification of narrative types</p>
                    <ul className="text-xs text-[var(--foreground)] space-y-1">
                      <li>• <strong>Mythological:</strong> Supernatural explanations</li>
                      <li>• <strong>Gnoseological:</strong> Knowledge-seeking narratives</li>
                      <li>• <strong>Ideological:</strong> Value-based narratives</li>
                      <li>• <strong>Novelistic:</strong> Realistic narratives</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Four Perspectives Framework */}
              <div className="mb-8 p-4 bg-[var(--background)] rounded-lg border border-[var(--accent)]">
                <h4 className="text-xl font-bold mb-3 text-[var(--accent)]">Four Perspectives on Narrative Theory</h4>
                <p className="text-sm text-[var(--foreground)] leading-relaxed mb-4">
                  This framework presents four distinct approaches to narrative analysis, each with its own theoretical foundations and methodological tools. The perspectives are applied to specific case studies to demonstrate their analytical power and reveal different aspects of narrative meaning.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-[var(--foreground)] mb-2">Rhetorical Perspective (Phelan & Rabinowitz)</h5>
                    <p className="text-xs text-[var(--accent)] mb-2">Case Study: <em>Huckleberry Finn</em></p>
                    <ul className="text-xs text-[var(--foreground)] space-y-1">
                      <li>• <strong>Authorial Audience:</strong> Ideal reader constructed by the text</li>
                      <li>• <strong>Narrative Progression:</strong> How stories move forward</li>
                      <li>• <strong>Narrative Judgments:</strong> Ethical and aesthetic evaluations</li>
                      <li>• <strong>Rhetorical Purpose:</strong> Author's communicative goals</li>
                      <li>• <strong>Reader Response:</strong> How actual readers respond</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-[var(--foreground)] mb-2">Feminist Perspective (Warhol)</h5>
                    <p className="text-xs text-[var(--accent)] mb-2">Case Study: <em>Persuasion</em></p>
                    <ul className="text-xs text-[var(--foreground)] space-y-1">
                      <li>• <strong>Gendered Narration:</strong> How gender affects storytelling</li>
                      <li>• <strong>Female Agency:</strong> Women's narrative power</li>
                      <li>• <strong>Domestic Space:</strong> Private sphere as narrative setting</li>
                      <li>• <strong>Marriage Plot:</strong> Romance as narrative structure</li>
                      <li>• <strong>Social Constraints:</strong> Gender roles in narrative</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-[var(--foreground)] mb-2">Mind-Oriented Perspective (Herman)</h5>
                    <p className="text-xs text-[var(--accent)] mb-2">Case Study: <em>On Chesil Beach</em></p>
                    <ul className="text-xs text-[var(--foreground)] space-y-1">
                      <li>• <strong>Storyworld Construction:</strong> Mental models of narrative worlds</li>
                      <li>• <strong>Character Consciousness:</strong> Internal mental states</li>
                      <li>• <strong>Cognitive Processing:</strong> How readers understand stories</li>
                      <li>• <strong>Mental Simulation:</strong> Empathetic engagement</li>
                      <li>• <strong>Memory Integration:</strong> How stories are remembered</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-[var(--foreground)] mb-2">Unnatural Perspective (Richardson)</h5>
                    <p className="text-xs text-[var(--accent)] mb-2">Case Study: <em>Midnight's Children</em></p>
                    <ul className="text-xs text-[var(--foreground)] space-y-1">
                      <li>• <strong>Impossible Narration:</strong> Narrators who cannot exist</li>
                      <li>• <strong>Anti-mimetic Elements:</strong> Non-realistic narrative features</li>
                      <li>• <strong>Experimental Forms:</strong> Innovative narrative techniques</li>
                      <li>• <strong>Postmodern Play:</strong> Self-conscious narrative games</li>
                      <li>• <strong>Reader Disorientation:</strong> Challenging reader expectations</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Core Concepts Across Perspectives */}
              <div className="mb-8 p-4 bg-[var(--background)] rounded-lg border border-[var(--accent)]">
                <h4 className="text-xl font-bold mb-3 text-[var(--accent)]">Core Concepts Across Perspectives</h4>
                <p className="text-sm text-[var(--foreground)] leading-relaxed mb-4">
                  Each perspective addresses the same fundamental concepts but with different theoretical frameworks and analytical tools, revealing the multifaceted nature of narrative meaning.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-[var(--foreground)] mb-2">Authors, Narrators, Narration</h5>
                    <ul className="text-xs text-[var(--foreground)] space-y-1">
                      <li>• <strong>Rhetorical:</strong> Author's communicative purpose and audience</li>
                      <li>• <strong>Feminist:</strong> Gendered voice and authority</li>
                      <li>• <strong>Mind-Oriented:</strong> Mental representation of narrators</li>
                      <li>• <strong>Unnatural:</strong> Impossible or anti-mimetic narrators</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-[var(--foreground)] mb-2">Plot, Time, and Progression</h5>
                    <ul className="text-xs text-[var(--foreground)] space-y-1">
                      <li>• <strong>Rhetorical:</strong> Narrative movement and reader engagement</li>
                      <li>• <strong>Feminist:</strong> Gendered temporal structures</li>
                      <li>• <strong>Mind-Oriented:</strong> Cognitive processing of time</li>
                      <li>• <strong>Unnatural:</strong> Impossible temporal arrangements</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-[var(--foreground)] mb-2">Space, Setting, and Perspective</h5>
                    <ul className="text-xs text-[var(--foreground)] space-y-1">
                      <li>• <strong>Rhetorical:</strong> Spatial organization and reader positioning</li>
                      <li>• <strong>Feminist:</strong> Gendered spaces and domestic settings</li>
                      <li>• <strong>Mind-Oriented:</strong> Mental mapping of storyworlds</li>
                      <li>• <strong>Unnatural:</strong> Impossible or contradictory spaces</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-[var(--foreground)] mb-2">Character and Reception</h5>
                    <ul className="text-xs text-[var(--foreground)] space-y-1">
                      <li>• <strong>Rhetorical:</strong> Character construction and reader judgment</li>
                      <li>• <strong>Feminist:</strong> Gender performance and social roles</li>
                      <li>• <strong>Mind-Oriented:</strong> Character consciousness and empathy</li>
                      <li>• <strong>Unnatural:</strong> Impossible or contradictory characters</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Fabula and Syuzhet */}
              <div className="mb-8 p-4 bg-[var(--background)] rounded-lg border border-[var(--accent)]">
                <h4 className="text-xl font-bold mb-3 text-[var(--accent)]">Fabula and Syuzhet</h4>
                <p className="text-sm text-[var(--foreground)] leading-relaxed mb-4">
                  <strong>Fabula</strong> and <strong>Syuzhet</strong> are fundamental concepts in Russian Formalist narratology, introduced by Viktor Shklovsky and developed by other Formalist critics. These terms distinguish between the raw story material and its artistic presentation, providing crucial tools for analyzing narrative structure and artistic technique.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-[var(--foreground)] mb-2">Fabula (Story)</h5>
                    <p className="text-xs text-[var(--accent)] mb-2">The raw chronological sequence of events</p>
                    <ul className="text-xs text-[var(--foreground)] space-y-1">
                      <li>• <strong>Chronological Order:</strong> Events as they "actually" happened</li>
                      <li>• <strong>Raw Material:</strong> Unprocessed story content</li>
                      <li>• <strong>Abstract Level:</strong> Logical sequence of actions</li>
                      <li>• <strong>Reconstructible:</strong> Can be pieced together from narrative</li>
                      <li>• <strong>Universal:</strong> Same fabula can be told in many ways</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-[var(--foreground)] mb-2">Syuzhet (Plot)</h5>
                    <p className="text-xs text-[var(--accent)] mb-2">The artistic arrangement and presentation of events</p>
                    <ul className="text-xs text-[var(--foreground)] space-y-1">
                      <li>• <strong>Artistic Order:</strong> Events as they are presented</li>
                      <li>• <strong>Narrative Technique:</strong> How the story is told</li>
                      <li>• <strong>Concrete Level:</strong> Actual textual presentation</li>
                      <li>• <strong>Defamiliarization:</strong> Making familiar strange</li>
                      <li>• <strong>Unique:</strong> Each telling creates different syuzhet</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-[var(--foreground)] mb-2">Relationship Between Fabula and Syuzhet</h5>
                    <p className="text-xs text-[var(--accent)] mb-2">How story and plot interact</p>
                    <ul className="text-xs text-[var(--foreground)] space-y-1">
                      <li>• <strong>Transformation:</strong> Fabula becomes syuzhet through artistic choices</li>
                      <li>• <strong>Deviation:</strong> Syuzhet may depart from chronological order</li>
                      <li>• <strong>Selection:</strong> Not all fabula events appear in syuzhet</li>
                      <li>• <strong>Emphasis:</strong> Some events receive more attention than others</li>
                      <li>• <strong>Perspective:</strong> Point of view affects what is shown</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-[var(--foreground)] mb-2">Narrative Techniques</h5>
                    <p className="text-xs text-[var(--accent)] mb-2">Methods of transforming fabula into syuzhet</p>
                    <ul className="text-xs text-[var(--foreground)] space-y-1">
                      <li>• <strong>Flashback:</strong> Presenting past events out of order</li>
                      <li>• <strong>Flashforward:</strong> Showing future events prematurely</li>
                      <li>• <strong>Ellipsis:</strong> Omitting events from presentation</li>
                      <li>• <strong>Summary:</strong> Condensing time periods</li>
                      <li>• <strong>Scene:</strong> Detailed presentation of moments</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Mimesis and Diegesis */}
              <div className="mb-8 p-4 bg-[var(--background)] rounded-lg border border-[var(--accent)]">
                <h4 className="text-xl font-bold mb-3 text-[var(--accent)]">Mimesis and Diegesis</h4>
                <p className="text-sm text-[var(--foreground)] leading-relaxed mb-4">
                  <strong>Mimesis</strong> and <strong>Diegesis</strong> are ancient Greek concepts that distinguish between showing and telling in narrative. These terms, originating in Plato's <em>Republic</em> and developed by Aristotle, remain fundamental to understanding different modes of narrative presentation and their effects on readers.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-[var(--foreground)] mb-2">Mimesis (Showing)</h5>
                    <p className="text-xs text-[var(--accent)] mb-2">Direct presentation of events and dialogue</p>
                    <ul className="text-xs text-[var(--foreground)] space-y-1">
                      <li>• <strong>Direct Speech:</strong> Characters speak for themselves</li>
                      <li>• <strong>Scene:</strong> Events shown as they happen</li>
                      <li>• <strong>Immediacy:</strong> Reader experiences events directly</li>
                      <li>• <strong>Dramatic Effect:</strong> Creates sense of presence</li>
                      <li>• <strong>Dialogue:</strong> Characters' words presented directly</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-[var(--foreground)] mb-2">Diegesis (Telling)</h5>
                    <p className="text-xs text-[var(--accent)] mb-2">Narrator's summary and description of events</p>
                    <ul className="text-xs text-[var(--foreground)] space-y-1">
                      <li>• <strong>Narrator's Voice:</strong> Events filtered through narrator</li>
                      <li>• <strong>Summary:</strong> Condensed presentation of events</li>
                      <li>• <strong>Mediation:</strong> Reader receives narrator's version</li>
                      <li>• <strong>Distance:</strong> Creates narrative distance</li>
                      <li>• <strong>Indirect Speech:</strong> Characters' words reported</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-[var(--foreground)] mb-2">Mimetic Techniques</h5>
                    <p className="text-xs text-[var(--accent)] mb-2">Methods of showing in narrative</p>
                    <ul className="text-xs text-[var(--foreground)] space-y-1">
                      <li>• <strong>Dialogue:</strong> Direct character speech</li>
                      <li>• <strong>Action Scenes:</strong> Events shown in detail</li>
                      <li>• <strong>Stream of Consciousness:</strong> Direct access to character thoughts</li>
                      <li>• <strong>Free Indirect Discourse:</strong> Character's thoughts in narrator's voice</li>
                      <li>• <strong>Dramatic Monologue:</strong> Character speaking at length</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-[var(--foreground)] mb-2">Diegetic Techniques</h5>
                    <p className="text-xs text-[var(--accent)] mb-2">Methods of telling in narrative</p>
                    <ul className="text-xs text-[var(--foreground)] space-y-1">
                      <li>• <strong>Narrative Summary:</strong> Condensed presentation of events</li>
                      <li>• <strong>Description:</strong> Narrator's account of setting/character</li>
                      <li>• <strong>Exposition:</strong> Background information provided</li>
                      <li>• <strong>Commentary:</strong> Narrator's interpretation/opinion</li>
                      <li>• <strong>Reported Speech:</strong> Characters' words summarized</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Postmodern Narratology */}
              <div className="p-4 bg-[var(--background)] rounded-lg border border-[var(--accent)]">
                <h4 className="text-xl font-bold mb-3 text-[var(--accent)]">Postmodern Narratology</h4>
                <p className="text-sm text-[var(--foreground)] leading-relaxed mb-4">
                  Postmodern narratology challenges traditional assumptions about narrative coherence, authorial authority, and textual boundaries. It explores how contemporary narratives reflect and respond to the fragmented, mediated nature of postmodern experience.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-[var(--foreground)] mb-2">Metafiction</h5>
                    <p className="text-xs text-[var(--accent)] mb-2">Fiction that self-consciously draws attention to its fictional nature</p>
                    <ul className="text-xs text-[var(--foreground)] space-y-1">
                      <li>• <strong>Self-Reflexivity:</strong> Text commenting on its own construction</li>
                      <li>• <strong>Authorial Intrusion:</strong> Author appearing within the narrative</li>
                      <li>• <strong>Narrative Framing:</strong> Stories within stories</li>
                      <li>• <strong>Reader Address:</strong> Direct communication with audience</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-[var(--foreground)] mb-2">Intertextuality</h5>
                    <p className="text-xs text-[var(--accent)] mb-2">The complex web of relationships between texts</p>
                    <ul className="text-xs text-[var(--foreground)] space-y-1">
                      <li>• <strong>Quotation:</strong> Direct borrowing from other texts</li>
                      <li>• <strong>Allusion:</strong> Indirect reference to other works</li>
                      <li>• <strong>Parody:</strong> Imitation with critical distance</li>
                      <li>• <strong>Pastiche:</strong> Imitation without critical intent</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-[var(--foreground)] mb-2">Fragmentation</h5>
                    <p className="text-xs text-[var(--accent)] mb-2">The disruption of linear, coherent narrative structure</p>
                    <ul className="text-xs text-[var(--foreground)] space-y-1">
                      <li>• <strong>Non-linear Structure:</strong> Disrupted chronological order</li>
                      <li>• <strong>Multiple Perspectives:</strong> Competing narrative viewpoints</li>
                      <li>• <strong>Textual Gaps:</strong> Missing or incomplete information</li>
                      <li>• <strong>Collage Technique:</strong> Assembling fragments into new wholes</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-[var(--foreground)] mb-2">Hyperreality</h5>
                    <p className="text-xs text-[var(--accent)] mb-2">The blurring of boundaries between reality and simulation</p>
                    <ul className="text-xs text-[var(--foreground)] space-y-1">
                      <li>• <strong>Simulation:</strong> Copies without originals</li>
                      <li>• <strong>Media Saturation:</strong> Reality mediated through technology</li>
                      <li>• <strong>Authenticity Crisis:</strong> Difficulty distinguishing real from fake</li>
                      <li>• <strong>Virtual Reality:</strong> Computer-generated environments</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Cognitive Narratology */}
            <div className="bg-[var(--card)] rounded-lg p-6 border-2 border-[var(--accent)]">
              <h3 className="text-2xl font-bold mb-6 text-[var(--foreground)]">Cognitive Narratology</h3>
              
              {/* Introduction */}
              <div className="mb-6 p-4 bg-[var(--background)] rounded-lg border border-[var(--accent)]">
                <p className="text-sm text-[var(--foreground)] leading-relaxed">
                  <strong>Cognitive Narratology</strong> applies insights from cognitive science, psychology, and neuroscience to understand how readers process and understand narratives. This interdisciplinary approach examines the mental processes involved in reading, including how we construct storyworlds, understand characters, and experience narrative immersion. Key figures include David Herman, Monika Fludernik, and Alan Palmer, who have developed frameworks for analyzing the cognitive dimensions of narrative comprehension.
                </p>
              </div>

              {/* Mental Models Section */}
              <div className="mb-8 p-4 bg-[var(--background)] rounded-lg border border-[var(--accent)]">
                <h4 className="text-xl font-bold mb-3 text-[var(--accent)]">Mental Models & Storyworld Construction</h4>
                <p className="text-sm text-[var(--foreground)] leading-relaxed mb-4">
                  Readers construct mental models of fictional worlds based on textual cues, background knowledge, and inferential processes. These models include spatial, temporal, and character representations that allow readers to navigate and understand narrative worlds.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-[var(--foreground)] mb-2">Storyworld Construction</h5>
                    <p className="text-xs text-[var(--accent)] mb-2">How readers build mental representations of fictional worlds</p>
                    <ul className="text-xs text-[var(--foreground)] space-y-1">
                      <li>• <strong>Spatial Models:</strong> Mental maps of story locations and settings</li>
                      <li>• <strong>Temporal Models:</strong> Understanding of story chronology and duration</li>
                      <li>• <strong>Causal Models:</strong> Mental representations of cause-and-effect relationships</li>
                      <li>• <strong>Character Models:</strong> Mental representations of characters and their traits</li>
                      <li>• <strong>World Rules:</strong> Understanding of the fictional world's laws and constraints</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-[var(--foreground)] mb-2">Schema Activation</h5>
                    <p className="text-xs text-[var(--accent)] mb-2">How background knowledge structures narrative comprehension</p>
                    <ul className="text-xs text-[var(--foreground)] space-y-1">
                      <li>• <strong>Genre Schemas:</strong> Expectations based on literary conventions</li>
                      <li>• <strong>Cultural Schemas:</strong> Shared cultural knowledge and assumptions</li>
                      <li>• <strong>Personal Schemas:</strong> Individual reader's background knowledge</li>
                      <li>• <strong>Script Schemas:</strong> Knowledge of typical event sequences</li>
                      <li>• <strong>Frame Schemas:</strong> Understanding of social situations and contexts</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-[var(--foreground)] mb-2">Inference Generation</h5>
                    <p className="text-xs text-[var(--accent)] mb-2">How readers fill gaps and draw conclusions from textual cues</p>
                    <ul className="text-xs text-[var(--foreground)] space-y-1">
                      <li>• <strong>Bridging Inferences:</strong> Connecting different parts of the text</li>
                      <li>• <strong>Elaborative Inferences:</strong> Adding details not explicitly stated</li>
                      <li>• <strong>Causal Inferences:</strong> Understanding why events occur</li>
                      <li>• <strong>Character Inferences:</strong> Understanding character motivations and traits</li>
                      <li>• <strong>Predictive Inferences:</strong> Anticipating future events</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-[var(--foreground)] mb-2">Gap Filling</h5>
                    <p className="text-xs text-[var(--accent)] mb-2">How readers handle missing or ambiguous information</p>
                    <ul className="text-xs text-[var(--foreground)] space-y-1">
                      <li>• <strong>Textual Gaps:</strong> Information deliberately omitted by the author</li>
                      <li>• <strong>Ambiguity Resolution:</strong> Choosing between multiple interpretations</li>
                      <li>• <strong>Default Assumptions:</strong> Using background knowledge to fill gaps</li>
                      <li>• <strong>Contextual Clues:</strong> Using surrounding information to infer meaning</li>
                      <li>• <strong>Reader Variability:</strong> Different readers may fill gaps differently</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Character Theory of Mind Section */}
              <div className="mb-8 p-4 bg-[var(--background)] rounded-lg border border-[var(--accent)]">
                <h4 className="text-xl font-bold mb-3 text-[var(--accent)]">Character Theory of Mind</h4>
                <p className="text-sm text-[var(--foreground)] leading-relaxed mb-4">
                  Readers apply their understanding of human psychology to fictional characters, attributing mental states, intentions, and emotions. This process involves both automatic and conscious cognitive processes that allow readers to "read minds" and understand character psychology.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-[var(--foreground)] mb-2">Mental State Attribution</h5>
                    <p className="text-xs text-[var(--accent)] mb-2">How readers understand character thoughts and feelings</p>
                    <ul className="text-xs text-[var(--foreground)] space-y-1">
                      <li>• <strong>Belief Attribution:</strong> Understanding what characters know and believe</li>
                      <li>• <strong>Desire Attribution:</strong> Understanding character goals and motivations</li>
                      <li>• <strong>Emotion Attribution:</strong> Understanding character emotional states</li>
                      <li>• <strong>Intention Attribution:</strong> Understanding character plans and purposes</li>
                      <li>• <strong>Perspective Taking:</strong> Seeing the world from character viewpoints</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-[var(--foreground)] mb-2">Character Coherence</h5>
                    <p className="text-xs text-[var(--accent)] mb-2">How readers maintain consistent character models</p>
                    <ul className="text-xs text-[var(--foreground)] space-y-1">
                      <li>• <strong>Trait Integration:</strong> Combining character traits into coherent personalities</li>
                      <li>• <strong>Behavior Consistency:</strong> Expecting characters to act in character</li>
                      <li>• <strong>Development Tracking:</strong> Following character changes over time</li>
                      <li>• <strong>Motivation Understanding:</strong> Grasping why characters act as they do</li>
                      <li>• <strong>Relationship Mapping:</strong> Understanding character interactions</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-[var(--foreground)] mb-2">Empathy & Identification</h5>
                    <p className="text-xs text-[var(--accent)] mb-2">How readers emotionally connect with characters</p>
                    <ul className="text-xs text-[var(--foreground)] space-y-1">
                      <li>• <strong>Emotional Simulation:</strong> Experiencing character emotions vicariously</li>
                      <li>• <strong>Perspective Taking:</strong> Adopting character viewpoints</li>
                      <li>• <strong>Moral Alignment:</strong> Sharing character values and goals</li>
                      <li>• <strong>Physical Simulation:</strong> Mirroring character actions and sensations</li>
                      <li>• <strong>Narrative Transportation:</strong> Becoming absorbed in character experiences</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-[var(--foreground)] mb-2">Character Complexity</h5>
                    <p className="text-xs text-[var(--accent)] mb-2">How readers handle complex character representations</p>
                    <ul className="text-xs text-[var(--foreground)] space-y-1">
                      <li>• <strong>Multi-dimensional Characters:</strong> Characters with conflicting traits</li>
                      <li>• <strong>Character Development:</strong> Characters who change over time</li>
                      <li>• <strong>Unreliable Characters:</strong> Characters whose perspectives are limited</li>
                      <li>• <strong>Character Relationships:</strong> Complex interactions between characters</li>
                      <li>• <strong>Character Functions:</strong> Understanding character roles in the story</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Narrative Transportation Section */}
              <div className="mb-8 p-4 bg-[var(--background)] rounded-lg border border-[var(--accent)]">
                <h4 className="text-xl font-bold mb-3 text-[var(--accent)]">Narrative Transportation & Immersion</h4>
                <p className="text-sm text-[var(--foreground)] leading-relaxed mb-4">
                  Narrative transportation refers to the phenomenon where readers become so absorbed in a story that they lose awareness of their immediate surroundings and feel transported into the fictional world. This immersive experience involves multiple cognitive processes working together.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-[var(--foreground)] mb-2">Transportation Mechanisms</h5>
                    <p className="text-xs text-[var(--accent)] mb-2">How readers become immersed in fictional worlds</p>
                    <ul className="text-xs text-[var(--foreground)] space-y-1">
                      <li>• <strong>Attention Capture:</strong> Story demands full cognitive focus</li>
                      <li>• <strong>Mental Imagery:</strong> Vivid visualization of story events</li>
                      <li>• <strong>Emotional Engagement:</strong> Strong emotional responses to story</li>
                      <li>• <strong>Narrative Coherence:</strong> Story makes sense and flows naturally</li>
                      <li>• <strong>Character Identification:</strong> Strong connection with characters</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-[var(--foreground)] mb-2">Immersion Factors</h5>
                    <p className="text-xs text-[var(--accent)] mb-2">Elements that enhance narrative immersion</p>
                    <ul className="text-xs text-[var(--foreground)] space-y-1">
                      <li>• <strong>Vivid Descriptions:</strong> Rich sensory details and imagery</li>
                      <li>• <strong>Engaging Plot:</strong> Compelling story events and conflicts</li>
                      <li>• <strong>Relatable Characters:</strong> Characters readers can identify with</li>
                      <li>• <strong>Emotional Resonance:</strong> Story touches on universal human experiences</li>
                      <li>• <strong>Narrative Flow:</strong> Smooth, uninterrupted reading experience</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-[var(--foreground)] mb-2">Transportation Effects</h5>
                    <p className="text-xs text-[var(--accent)] mb-2">Consequences of narrative transportation</p>
                    <ul className="text-xs text-[var(--foreground)] space-y-1">
                      <li>• <strong>Belief Change:</strong> Temporary adoption of story beliefs</li>
                      <li>• <strong>Attitude Change:</strong> Shifts in reader attitudes and opinions</li>
                      <li>• <strong>Behavioral Effects:</strong> Changes in real-world behavior</li>
                      <li>• <strong>Emotional Impact:</strong> Lasting emotional responses</li>
                      <li>• <strong>Memory Enhancement:</strong> Better recall of transported content</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-[var(--foreground)] mb-2">Breaking Immersion</h5>
                    <p className="text-xs text-[var(--accent)] mb-2">Factors that disrupt narrative transportation</p>
                    <ul className="text-xs text-[var(--foreground)] space-y-1">
                      <li>• <strong>Narrative Inconsistencies:</strong> Contradictions in the story world</li>
                      <li>• <strong>Poor Writing:</strong> Awkward prose or dialogue</li>
                      <li>• <strong>Character Inconsistencies:</strong> Characters acting out of character</li>
                      <li>• <strong>External Distractions:</strong> Real-world interruptions</li>
                      <li>• <strong>Reader Disengagement:</strong> Lack of interest or connection</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Memory & Processing Section */}
              <div className="p-4 bg-[var(--background)] rounded-lg border border-[var(--accent)]">
                <h4 className="text-xl font-bold mb-3 text-[var(--accent)]">Memory & Information Processing</h4>
                <p className="text-sm text-[var(--foreground)] leading-relaxed mb-4">
                  Reading narratives involves complex memory processes, including working memory for immediate comprehension, episodic memory for story events, and semantic memory for background knowledge. Understanding these processes helps explain how readers construct and maintain coherent narrative representations.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-[var(--foreground)] mb-2">Working Memory</h5>
                    <p className="text-xs text-[var(--accent)] mb-2">Immediate processing of narrative information</p>
                    <ul className="text-xs text-[var(--foreground)] space-y-1">
                      <li>• <strong>Text Processing:</strong> Immediate comprehension of sentences</li>
                      <li>• <strong>Coherence Building:</strong> Connecting current text with previous</li>
                      <li>• <strong>Inference Generation:</strong> Drawing conclusions from text</li>
                      <li>• <strong>Character Tracking:</strong> Maintaining character information</li>
                      <li>• <strong>Plot Integration:</strong> Connecting story events</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-[var(--foreground)] mb-2">Episodic Memory</h5>
                    <p className="text-xs text-[var(--accent)] mb-2">Long-term storage of story events and experiences</p>
                    <ul className="text-xs text-[var(--foreground)] space-y-1">
                      <li>• <strong>Event Memory:</strong> Remembering story events and sequences</li>
                      <li>• <strong>Character Memory:</strong> Storing character information and traits</li>
                      <li>• <strong>Spatial Memory:</strong> Remembering story locations and settings</li>
                      <li>• <strong>Temporal Memory:</strong> Understanding story chronology</li>
                      <li>• <strong>Emotional Memory:</strong> Remembering emotional responses to story</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-[var(--foreground)] mb-2">Semantic Memory</h5>
                    <p className="text-xs text-[var(--accent)] mb-2">Background knowledge used in narrative comprehension</p>
                    <ul className="text-xs text-[var(--foreground)] space-y-1">
                      <li>• <strong>World Knowledge:</strong> General knowledge about the world</li>
                      <li>• <strong>Cultural Knowledge:</strong> Shared cultural assumptions and values</li>
                      <li>• <strong>Literary Knowledge:</strong> Understanding of narrative conventions</li>
                      <li>• <strong>Language Knowledge:</strong> Understanding of words and grammar</li>
                      <li>• <strong>Schema Knowledge:</strong> Knowledge of typical situations and events</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-[var(--foreground)] mb-2">Memory Integration</h5>
                    <p className="text-xs text-[var(--accent)] mb-2">How different types of memory work together</p>
                    <ul className="text-xs text-[var(--foreground)] space-y-1">
                      <li>• <strong>Cross-referencing:</strong> Connecting new information with existing knowledge</li>
                      <li>• <strong>Schema Updating:</strong> Modifying existing knowledge structures</li>
                      <li>• <strong>Memory Consolidation:</strong> Strengthening memory traces over time</li>
                      <li>• <strong>Retrieval Cues:</strong> Using context to access stored information</li>
                      <li>• <strong>Memory Reconstruction:</strong> Rebuilding memories from fragments</li>
                    </ul>
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