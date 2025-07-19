'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { EloEntity, EloDimension, ELO_DIMENSIONS } from '@/types/elo';
import { 
  generateLeaderboard, 
  generateSuperscoreLeaderboard, 
  getRandomPair,
  processMatch
} from '@/lib/elo-utils';
import { ELO_ENTITIES } from '@/data/elo-entities';
import EloMatchup from './components/EloMatchup';
import EloLeaderboard from './components/EloLeaderboard';
import EloSuperscoreLeaderboard from './components/EloSuperscoreLeaderboard';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function EloPage() {
  const [entities, setEntities] = useState<EloEntity[]>([]);
  const [currentDimension, setCurrentDimension] = useState<EloDimension>('fight');
  const [currentPair, setCurrentPair] = useState<[EloEntity, EloEntity] | null>(null);
  const [leaderboards, setLeaderboards] = useState<Record<EloDimension, any[]>>({
    fight: [],
    better: [],
    cute: [],
    ally: []
  });
  const [superscoreLeaderboard, setSuperscoreLeaderboard] = useState<any[]>([]);
  const [showAllItemsModal, setShowAllItemsModal] = useState(false);
  const [totalVotes, setTotalVotes] = useState(0);
  const [sessionVotes, setSessionVotes] = useState(0);
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState(false);
  const [error, setError] = useState('');

  // Load rankings from API
  useEffect(() => {
    loadRankings();
  }, []);

  const loadRankings = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/elo');
      const data = await response.json();
      
      if (data.success) {
        setEntities(data.data.entities);
        setTotalVotes(data.data.totalVotes);
        updateLeaderboards(data.data.entities);
        generateNewPair(data.data.entities);
      } else {
        setError(data.error || 'Failed to load rankings');
      }
    } catch (err) {
      setError('Failed to connect to ELO service');
    } finally {
      setLoading(false);
    }
  };

  const updateLeaderboards = (currentEntities: EloEntity[]) => {
    const newLeaderboards = {
      fight: generateLeaderboard(currentEntities, 'fight'),
      better: generateLeaderboard(currentEntities, 'better'),
      cute: generateLeaderboard(currentEntities, 'cute'),
      ally: generateLeaderboard(currentEntities, 'ally')
    };
    
    setLeaderboards(newLeaderboards);
    setSuperscoreLeaderboard(generateSuperscoreLeaderboard(currentEntities));
  };

  const generateNewPair = (entityList: EloEntity[]) => {
    if (entityList.length < 2) return;
    
    const shuffled = [...entityList].sort(() => Math.random() - 0.5);
    setCurrentPair([shuffled[0], shuffled[1]]);
  };

  const handleMatchResult = async (winner: 'entity1' | 'entity2') => {
    if (!currentPair || voting) return;
    
    setVoting(true);
    try {
      const [entity1, entity2] = currentPair;
      const winnerId = winner === 'entity1' ? entity1.id : entity2.id;
      
      const response = await fetch('/api/elo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          entity1Id: entity1.id,
          entity2Id: entity2.id,
          dimension: currentDimension,
          winner: winnerId
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setEntities(data.rankings.entities);
        setTotalVotes(data.rankings.totalVotes);
        updateLeaderboards(data.rankings.entities);
        setSessionVotes(prev => prev + 1);
        generateNewPair(data.rankings.entities);
      } else {
        setError(data.error || 'Failed to submit vote');
      }
    } catch (err) {
      setError('Failed to submit vote');
    } finally {
      setVoting(false);
    }
  };

  const getNewMatchup = () => {
    generateNewPair(entities);
  };

  useEffect(() => {
    if (entities.length >= 2) {
      generateNewPair(entities);
    }
  }, [entities]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--highlight)] mx-auto mb-4"></div>
          <p className="text-[var(--accent)]">Loading ELO rankings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">Oops!</h2>
          <p className="text-[var(--accent)] mb-6">{error}</p>
          <button
            onClick={loadRankings}
            className="px-6 py-3 bg-[var(--highlight)] text-[var(--foreground)] rounded-lg font-semibold hover:bg-[var(--accent)] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] relative">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-[30vh] sm:h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden pt-16"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--highlight)] to-[var(--background)] opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent opacity-70" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-7xl font-black mb-2 sm:mb-4 md:mb-6 text-[var(--foreground)] tracking-tight"
          >
            ELO
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl text-[var(--accent)] font-serif italic px-4"
          >
            Pairwise ranking system for Animals, Dinosaurs, and Characters
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-2 sm:mt-4 text-xs sm:text-sm text-[var(--accent)]"
          >
            <span className="block sm:inline">Four dimensions of comparison</span>
            <span className="hidden sm:inline"> | </span>
            <span className="block sm:inline">Real-time rankings</span>
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-2 sm:mt-4 text-xs sm:text-sm text-[var(--accent)]"
          >
            <span className="block sm:inline">Total Votes: {totalVotes}</span>
            <span className="hidden sm:inline"> | </span>
            <span className="block sm:inline">Your Session: {sessionVotes}</span>
          </motion.div>
        </div>
      </motion.section>

      {/* Content Section */}
      <motion.section 
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-6xl mx-auto px-4 pb-16"
      >
        <div className="space-y-8">
          {/* Dimension Selector */}
          <div className="bg-[var(--card)] border-2 border-[var(--accent)] rounded-lg p-4 sm:p-6 md:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--foreground)] mb-4 sm:mb-6">Choose Ranking Dimension</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {Object.entries(ELO_DIMENSIONS).map(([key, dimension]) => (
                <button
                  key={key}
                  onClick={() => setCurrentDimension(key as EloDimension)}
                  className={`p-3 sm:p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                    currentDimension === key
                      ? 'border-[var(--highlight)] bg-[var(--highlight)]/10 text-[var(--highlight)]'
                      : 'border-[var(--accent)] hover:border-[var(--highlight)] hover:text-[var(--highlight)]'
                  }`}
                >
                  <div className="text-2xl sm:text-3xl mb-2">{dimension.icon}</div>
                  <div className="font-semibold text-xs sm:text-sm leading-tight">{dimension.name}</div>
                  <div className="text-xs text-[var(--accent)] mt-1 opacity-75">
                    {dimension.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Current Matchup */}
          {currentPair && (
            <div className="bg-[var(--card)] border-2 border-[var(--accent)] rounded-lg p-4 sm:p-6 md:p-8">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-3">
                <h2 className="text-xl sm:text-2xl font-bold text-[var(--foreground)]">
                  {ELO_DIMENSIONS[currentDimension].icon} {ELO_DIMENSIONS[currentDimension].name}
                </h2>
                <button
                  onClick={getNewMatchup}
                  className="px-4 py-2 bg-[var(--highlight)] text-[var(--foreground)] rounded-lg font-semibold hover:bg-[var(--accent)] transition-colors text-sm sm:text-base self-start sm:self-auto"
                >
                  New Matchup
                </button>
              </div>
              <EloMatchup
                entity1={currentPair[0]}
                entity2={currentPair[1]}
                dimension={currentDimension}
                onResult={handleMatchResult}
                voting={voting}
              />
            </div>
          )}

          {/* Leaderboards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Superscore Leaderboard */}
            <div className="bg-[var(--card)] border-2 border-[var(--accent)] rounded-lg p-4 sm:p-6 md:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-[var(--foreground)] mb-4 sm:mb-6">
                🏆 Overall Superscore Leaderboard
              </h3>
              <EloSuperscoreLeaderboard entries={superscoreLeaderboard} />
            </div>

            {/* Individual Dimension Leaderboard */}
            <div className="bg-[var(--card)] border-2 border-[var(--accent)] rounded-lg p-4 sm:p-6 md:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-[var(--foreground)] mb-4 sm:mb-6">
                {ELO_DIMENSIONS[currentDimension].icon} {ELO_DIMENSIONS[currentDimension].name} Leaderboard
              </h3>
              <EloLeaderboard
                entries={leaderboards[currentDimension]}
                dimension={currentDimension}
              />
            </div>
          </div>

          {/* All Dimension Leaderboards */}
          <div className="bg-[var(--card)] border-2 border-[var(--accent)] rounded-lg p-4 sm:p-6 md:p-8">
            <h3 className="text-xl sm:text-2xl font-bold text-[var(--foreground)] mb-4 sm:mb-6">All Dimension Leaderboards</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(ELO_DIMENSIONS).map(([key, dimension]) => (
                <div key={key} className="space-y-3">
                  <h4 className="text-lg font-semibold text-[var(--foreground)]">
                    {dimension.icon} {dimension.name}
                  </h4>
                  <EloLeaderboard
                    entries={leaderboards[key as EloDimension]}
                    dimension={key as EloDimension}
                    compact={true}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* View All Items Button */}
      <div className="text-center pb-8">
        <button
          onClick={() => setShowAllItemsModal(true)}
          className="px-6 py-3 bg-[var(--highlight)] text-[var(--foreground)] rounded-lg font-semibold hover:bg-[var(--accent)] transition-colors text-sm sm:text-base"
        >
          View All Items
        </button>
      </div>

      {/* All Items Modal */}
      {showAllItemsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-[var(--card)] border-2 border-[var(--accent)] rounded-lg p-6 max-w-6xl w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[var(--foreground)]">All ELO Items</h2>
              <button
                onClick={() => setShowAllItemsModal(false)}
                className="text-[var(--accent)] hover:text-[var(--foreground)] p-2"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Animals Column */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-[var(--foreground)] border-b border-[var(--accent)] pb-2">
                  🦁 Animals
                </h3>
                <div className="space-y-3">
                  {entities.filter(entity => entity.category === 'animal').map((entity) => (
                    <div key={entity.id} className="flex items-center gap-3 p-3 bg-[var(--background)] rounded-lg border border-[var(--accent)]">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={entity.imageUrl}
                          alt={entity.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-[var(--foreground)]">{entity.name}</h4>
                        {entity.description && (
                          <p className="text-sm text-[var(--accent)] opacity-75">{entity.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dinosaurs Column */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-[var(--foreground)] border-b border-[var(--accent)] pb-2">
                  🦖 Dinosaurs
                </h3>
                <div className="space-y-3">
                  {entities.filter(entity => entity.category === 'dinosaur').map((entity) => (
                    <div key={entity.id} className="flex items-center gap-3 p-3 bg-[var(--background)] rounded-lg border border-[var(--accent)]">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={entity.imageUrl}
                          alt={entity.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-[var(--foreground)]">{entity.name}</h4>
                        {entity.description && (
                          <p className="text-sm text-[var(--accent)] opacity-75">{entity.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Characters Column */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-[var(--foreground)] border-b border-[var(--accent)] pb-2">
                  🦸 Characters
                </h3>
                <div className="space-y-3">
                  {entities.filter(entity => entity.category === 'character').map((entity) => (
                    <div key={entity.id} className="flex items-center gap-3 p-3 bg-[var(--background)] rounded-lg border border-[var(--accent)]">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={entity.imageUrl}
                          alt={entity.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-[var(--foreground)]">{entity.name}</h4>
                        {entity.description && (
                          <p className="text-sm text-[var(--accent)] opacity-75">{entity.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
} 