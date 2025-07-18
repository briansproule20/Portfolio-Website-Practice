'use client';

import { motion } from 'framer-motion';

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

export default function NarrativeTheory() {
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
                    <div key={term} className="p-3 bg-[var(--background)] rounded border border-[var(--accent)]">
                      <div className="font-semibold text-[var(--foreground)]">{term}</div>
                      <div className="text-sm text-[var(--accent)]">{def}</div>
                    </div>
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
                    <div key={term} className="p-3 bg-[var(--background)] rounded border border-[var(--accent)]">
                      <div className="font-semibold text-[var(--foreground)]">{term}</div>
                      <div className="text-sm text-[var(--accent)]">{def}</div>
                    </div>
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
                    <div key={term} className="p-3 bg-[var(--background)] rounded border border-[var(--accent)]">
                      <div className="font-semibold text-[var(--foreground)]">{term}</div>
                      <div className="text-sm text-[var(--accent)]">{def}</div>
                    </div>
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
                    <div key={term} className="p-3 bg-[var(--background)] rounded border border-[var(--accent)]">
                      <div className="font-semibold text-[var(--foreground)]">{term}</div>
                      <div className="text-sm text-[var(--accent)]">{def}</div>
                    </div>
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
    </div>
  );
} 