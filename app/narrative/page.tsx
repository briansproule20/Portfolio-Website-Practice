'use client';

import { motion } from 'framer-motion';

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

            {/* Critical Race Narratology */}
            <div className="bg-[var(--card)] rounded-lg p-6 border-2 border-[var(--accent)]">
              <h3 className="text-2xl font-bold mb-6 text-[var(--foreground)]">Critical Race Narratology</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-[var(--accent)]">Narrative Justice</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-[var(--background)] rounded border border-[var(--accent)]">
                      <div className="font-semibold text-[var(--foreground)]">Counter-storytelling</div>
                      <div className="text-sm text-[var(--accent)]">Challenging dominant narratives</div>
                    </div>
                    <div className="p-3 bg-[var(--background)] rounded border border-[var(--accent)]">
                      <div className="font-semibold text-[var(--foreground)]">Narrative Identity</div>
                      <div className="text-sm text-[var(--accent)]">Race and storytelling</div>
                    </div>
                    <div className="p-3 bg-[var(--background)] rounded border border-[var(--accent)]">
                      <div className="font-semibold text-[var(--foreground)]">Structural Racism</div>
                      <div className="text-sm text-[var(--accent)]">Narrative as systemic critique</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4 text-[var(--accent)]">Postcolonial Narratology</h4>
                  <div className="space-y-2 text-sm">
                    <div className="text-[var(--foreground)]">• Subaltern Voices</div>
                    <div className="text-[var(--foreground)]">• Colonial Discourse</div>
                    <div className="text-[var(--foreground)]">• Hybridity</div>
                    <div className="text-[var(--foreground)]">• Mimicry</div>
                    <div className="text-[var(--foreground)]">• Orientalism</div>
                    <div className="text-[var(--foreground)]">• Decolonization</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
} 