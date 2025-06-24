'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { PersistentTrack, PlaylistRankings, getTrackStats } from '@/types/rankings';

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

const cardVariants = {
  enter: { opacity: 0, scale: 0.9, rotateY: 180 },
  center: { opacity: 1, scale: 1, rotateY: 0 },
  exit: { opacity: 0, scale: 0.9, rotateY: -180 }
};

const sidebarVariants = {
  hidden: { x: '100%' },
  visible: { x: 0 }
};

export default function Tunes() {
  const [rankings, setRankings] = useState<PlaylistRankings | null>(null);
  const [rankedTracks, setRankedTracks] = useState<PersistentTrack[]>([]);
  const [currentPair, setCurrentPair] = useState<[PersistentTrack, PersistentTrack] | null>(null);
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState(false);
  const [error, setError] = useState('');
  const [gameMode, setGameMode] = useState<'ranking' | 'results'>('ranking');
  const [sessionVotes, setSessionVotes] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Check if desktop on mount
  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  // Load rankings on component mount
  useEffect(() => {
    loadRankings();
  }, []);

  const loadRankings = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/rankings');
      const data = await response.json();
      
      if (data.success) {
        setRankings(data.data);
        const sortedTracks = [...data.data.tracks].sort((a, b) => b.eloRating - a.eloRating);
        setRankedTracks(sortedTracks);
        generateNewPair(data.data.tracks);
      } else {
        setError(data.error || 'Failed to load rankings');
      }
    } catch (err) {
      setError('Failed to connect to rankings service');
    } finally {
      setLoading(false);
    }
  };

  // Generate a new random pair for comparison
  const generateNewPair = (trackList: PersistentTrack[]) => {
    if (trackList.length < 2) return;
    
    const shuffled = [...trackList].sort(() => Math.random() - 0.5);
    setCurrentPair([shuffled[0], shuffled[1]]);
  };

  // Handle voting
  const handleVote = async (winner: PersistentTrack, loser: PersistentTrack) => {
    if (voting) return;
    
    setVoting(true);
    try {
      const response = await fetch('/api/rankings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          winnerId: winner.id,
          loserId: loser.id
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setRankings(data.rankings);
        setRankedTracks(data.rankedTracks);
        setSessionVotes(prev => prev + 1);
        generateNewPair(data.rankings.tracks);
      } else {
        setError(data.error || 'Failed to submit vote');
      }
    } catch (err) {
      setError('Failed to submit vote');
    } finally {
      setVoting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--highlight)] mx-auto mb-4"></div>
          <p className="text-[var(--accent)]">Loading playlist rankings...</p>
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
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-20 right-4 z-50 bg-[var(--highlight)] text-[var(--foreground)] p-2 rounded-lg shadow-lg hover:bg-[var(--accent)] transition-colors"
        title={sidebarOpen ? "Hide Rankings" : "Show Rankings"}
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          {sidebarOpen ? (
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          ) : (
            <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          )}
        </svg>
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 h-full w-64 bg-[var(--card)] border-l-2 border-[var(--accent)] z-30 overflow-y-auto pt-16 shadow-xl"
          >
            <div className="p-3">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold text-[var(--foreground)]">Rankings</h3>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="text-[var(--accent)] hover:text-[var(--foreground)] p-1"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-1.5">
                {rankedTracks.slice(0, 15).map((track, index) => {
                  const stats = getTrackStats(track);
                  return (
                    <div
                      key={track.id}
                      className="flex items-center gap-2 p-1.5 bg-[var(--background)] rounded border border-[var(--accent)] hover:border-[var(--highlight)] transition-colors"
                    >
                      <div className="text-xs font-bold text-[var(--highlight)] min-w-[1.2rem] text-center">
                        {index + 1}
                      </div>
                      
                      {track.image_url && (
                        <div className="relative w-6 h-6 rounded overflow-hidden flex-shrink-0">
                          <Image
                            src={track.image_url}
                            alt={track.album}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          <h4 className="font-medium text-xs text-[var(--foreground)] truncate leading-tight">{track.name}</h4>
                          {stats.isHot && <span className="text-red-500 text-xs">🔥</span>}
                          {stats.isCold && <span className="text-blue-500 text-xs">❄️</span>}
                        </div>
                        <p className="text-xs text-[var(--accent)] truncate opacity-75">{track.artist}</p>
                        <div className="text-xs text-[var(--accent)] opacity-60">
                          {Math.round(track.eloRating)} • {stats.winRate}%
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Compact Stats Summary */}
              <div className="mt-4 p-2 bg-[var(--background)] rounded border border-[var(--accent)]">
                <h4 className="font-bold text-xs text-[var(--foreground)] mb-1.5">Stats</h4>
                <div className="space-y-0.5 text-xs text-[var(--accent)]">
                  <div className="flex justify-between">
                    <span>Songs:</span>
                    <span>{rankedTracks.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Votes:</span>
                    <span>{rankings?.totalVotes || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Top:</span>
                    <span className="truncate ml-1">{rankedTracks[0]?.name || 'N/A'}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay for mobile sidebar only */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'md:mr-64' : ''}`}>
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
              Tunes
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl text-[var(--accent)] font-serif italic px-4"
            >
              {rankings?.playlistName} - Community Rankings
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-2 sm:mt-4 text-xs sm:text-sm text-[var(--accent)]"
            >
              <span className="block sm:inline">Total Votes: {rankings?.totalVotes || 0}</span>
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
          {gameMode === 'ranking' && currentPair && (
            <motion.div
              variants={item}
              className="text-center"
            >
              <div className="mb-6 sm:mb-8">
                <p className="text-[var(--accent)] mb-4 text-sm sm:text-base px-2">
                  Choose your favorite! Every vote helps shape the community rankings.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto">
                {currentPair.map((track, index) => {
                  const stats = getTrackStats(track);
                  return (
                    <motion.div
                      key={track.id}
                      variants={cardVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className={`bg-[var(--card)] border-2 border-[var(--accent)] rounded-lg p-4 sm:p-6 cursor-pointer hover:border-[var(--highlight)] transition-all duration-300 hover:scale-105 ${voting ? 'pointer-events-none opacity-75' : ''}`}
                      onClick={() => handleVote(track, currentPair[1 - index])}
                    >
                      {/* Added By Badge */}
                      {track.addedBy && (
                        <div className="flex justify-between items-center mb-3">
                          <div className="text-xs text-[var(--accent)] bg-[var(--background)] px-2 py-1 rounded-full">
                            Added by {track.addedBy}
                          </div>
                        </div>
                      )}

                      {track.image_url && (
                        <div className="relative w-full aspect-square mb-3 sm:mb-4 rounded-lg overflow-hidden">
                          <Image
                            src={track.image_url}
                            alt={track.album}
                            fill
                            className="object-cover"
                          />
                          {/* Trend indicator */}
                          {stats.isHot && (
                            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                              🔥 HOT
                            </div>
                          )}
                          {stats.isCold && (
                            <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                              ❄️ COLD
                            </div>
                          )}
                        </div>
                      )}
                      
                      <h3 className="text-lg sm:text-xl font-bold mb-2 text-[var(--foreground)] leading-tight">
                        {track.name}
                      </h3>
                      <p className="text-[var(--accent)] mb-1 sm:mb-2 text-sm sm:text-base">{track.artist}</p>
                      <p className="text-xs sm:text-sm text-[var(--accent)] mb-3 sm:mb-4">{track.album}</p>
                      
                      {track.preview_url && (
                        <audio controls className="w-full mb-3 sm:mb-4 h-8 sm:h-10">
                          <source src={track.preview_url} type="audio/mpeg" />
                        </audio>
                      )}
                      
                      <div className="text-xs sm:text-sm text-[var(--accent)] space-y-1">
                        <div>Rating: {Math.round(track.eloRating)} 
                          {stats.trend !== 0 && (
                            <span className={`ml-2 ${stats.trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
                              ({stats.trend > 0 ? '+' : ''}{stats.trend})
                            </span>
                          )}
                        </div>
                        <div>Win Rate: {stats.winRate}% ({track.totalWins}W-{track.totalLosses}L)</div>
                        <div>Battles: {track.totalComparisons}</div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
                <button
                  onClick={() => setGameMode('results')}
                  className="px-4 sm:px-6 py-3 bg-[var(--accent)] text-[var(--foreground)] rounded-lg font-semibold hover:bg-[var(--highlight)] transition-colors text-sm sm:text-base"
                >
                  View Full Rankings
                </button>
                <button
                  onClick={() => generateNewPair(rankings?.tracks || [])}
                  disabled={voting}
                  className="px-4 sm:px-6 py-3 border-2 border-[var(--accent)] text-[var(--accent)] rounded-lg font-semibold hover:border-[var(--highlight)] hover:text-[var(--highlight)] transition-colors disabled:opacity-50 text-sm sm:text-base"
                >
                  {voting ? 'Processing...' : 'Skip Pair'}
                </button>
              </div>
            </motion.div>
          )}

          {gameMode === 'results' && (
            <motion.div
              variants={item}
              className="bg-[var(--card)] border-2 border-[var(--accent)] rounded-lg p-4 sm:p-6 md:p-8"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-3">
                <h2 className="text-xl sm:text-2xl font-bold text-[var(--foreground)] leading-tight">
                  Community Rankings
                  <span className="block sm:inline text-base sm:text-2xl text-[var(--accent)] font-normal">
                    <span className="hidden sm:inline"> - </span>{rankings?.playlistName}
                  </span>
                </h2>
                <button
                  onClick={() => setGameMode('ranking')}
                  className="px-4 py-2 bg-[var(--highlight)] text-[var(--foreground)] rounded-lg font-semibold hover:bg-[var(--accent)] transition-colors text-sm sm:text-base self-start sm:self-auto"
                >
                  Continue Voting
                </button>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                {rankedTracks.map((track, index) => {
                  const stats = getTrackStats(track);
                  return (
                    <div
                      key={track.id}
                      className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-[var(--background)] rounded-lg border border-[var(--accent)]"
                    >
                      <div className="text-lg sm:text-2xl font-bold text-[var(--highlight)] min-w-[2rem] sm:min-w-[3rem] text-center">
                        #{index + 1}
                      </div>
                      
                      {track.image_url && (
                        <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={track.image_url}
                            alt={track.album}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-[var(--foreground)] text-sm sm:text-base truncate">{track.name}</h3>
                          {stats.isHot && <span className="text-red-500 text-xs sm:text-sm">🔥</span>}
                          {stats.isCold && <span className="text-blue-500 text-xs sm:text-sm">❄️</span>}
                        </div>
                        <p className="text-[var(--accent)] text-xs sm:text-sm truncate">{track.artist}</p>
                        {track.addedBy && (
                          <p className="text-xs text-[var(--accent)] opacity-75">Added by {track.addedBy}</p>
                        )}
                      </div>
                      
                      <div className="text-right text-xs sm:text-sm text-[var(--accent)] flex-shrink-0">
                        <div className="font-bold">Rating: {Math.round(track.eloRating)}</div>
                        <div className="hidden sm:block">Win Rate: {stats.winRate}%</div>
                        <div className="sm:hidden">WR: {stats.winRate}%</div>
                        <div className="hidden sm:block">{track.totalWins}W-{track.totalLosses}L ({track.totalComparisons} battles)</div>
                        <div className="sm:hidden">{track.totalWins}W-{track.totalLosses}L</div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-[var(--accent)] space-y-1">
                <p>Rankings updated in real-time based on community votes.</p>
                <p>Last updated: {rankings?.lastUpdated ? new Date(rankings.lastUpdated).toLocaleString() : 'Unknown'}</p>
              </div>
            </motion.div>
          )}
        </motion.section>
      </div>
    </div>
  );
} 