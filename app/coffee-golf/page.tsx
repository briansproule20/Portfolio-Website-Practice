'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ScatterChart, Scatter, Cell, PieChart, Pie } from 'recharts';
import { TrendingDown, Trophy, Target, Users, Calendar, BarChart3 } from 'lucide-react';
import Link from 'next/link';

interface CoffeeGolfStats {
  player: string;
  totalRounds: number;
  averageScore: number;
  bestScore: number;
  worstScore: number;
  wins: number;
  top3Finishes: number;
  lastUpdated: string;
}

interface DailyData {
  date: string;
  [key: string]: any;
}

const CoffeeGolfDashboard = () => {
  const [selectedView, setSelectedView] = useState('overview');
  const [stats, setStats] = useState<CoffeeGolfStats[]>([]);
  const [dailyData, setDailyData] = useState<DailyData[]>([]);
  const [players, setPlayers] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/coffee-golf');
        if (!response.ok) {
          throw new Error('Failed to fetch stats');
        }
        const data = await response.json();
        
        if (data.error) {
          setError(data.error);
        } else {
          setStats(data.stats || []);
          setDailyData(data.dailyData || []);
          setPlayers(data.players || []);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch stats');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Process data for different charts
  const processedData = useMemo(() => {
    return dailyData.map(row => {
      const processed: any = { date: row.date };
      players.forEach(player => {
        processed[player] = row[player] === null ? null : row[player];
      });
      return processed;
    });
  }, [dailyData, players]);

  // Calculate player statistics (GOLF SCORING - LOWER IS BETTER)
  const playerStats = useMemo(() => {
    const statsMap: any = {};
    players.forEach(player => {
      const scores = processedData
        .map(day => day[player])
        .filter(score => score !== null && !isNaN(score));
      
      if (scores.length > 0) {
        const total = scores.reduce((sum, score) => sum + score, 0);
        const avg = total / scores.length;
        const best = Math.min(...scores); // Best = lowest in golf
        const worst = Math.max(...scores); // Worst = highest in golf
        const wins = processedData.filter(day => {
          const dayScores = players.map(p => day[p]).filter(s => s !== null && !isNaN(s));
          if (dayScores.length === 0) return false;
          const minScore = Math.min(...dayScores); // Winner has MINIMUM score
          return day[player] === minScore;
        }).length;
        
        statsMap[player] = {
          name: player,
          average: isNaN(avg) ? 0 : Math.round(avg * 10) / 10,
          best: isNaN(best) ? 0 : best,
          worst: isNaN(worst) ? 0 : worst,
          gamesPlayed: scores.length,
          wins: isNaN(wins) ? 0 : wins,
          totalScore: isNaN(total) ? 0 : total
        };
      }
    });
    return Object.values(statsMap);
  }, [processedData, players]);

  // Radar chart data for player comparison (INVERTED FOR GOLF)
  const radarData = useMemo(() => {
    return players.map(player => {
      const playerData = playerStats.find((p: any) => p.name === player) as any;
      if (!playerData) return null;
      
      const consistency = Math.max(0, 100 - (playerData.worst - playerData.best) * 3);
      const performance = Math.max(0, 120 - playerData.average * 8); // Lower avg = higher performance
      const participation = (playerData.gamesPlayed / processedData.length) * 100;
      const winRate = (playerData.wins / Math.max(1, playerData.gamesPlayed)) * 100;
      
      return {
        player,
        consistency: isNaN(consistency) ? 0 : consistency,
        performance: isNaN(performance) ? 0 : performance,
        participation: isNaN(participation) ? 0 : participation,
        winRate: isNaN(winRate) ? 0 : winRate
      };
    }).filter(Boolean);
  }, [playerStats, processedData, players]);

  // Daily winners (LOWEST SCORES WIN)
  const dailyWinners = useMemo(() => {
    return processedData.map(day => {
      const scores = players.map(player => ({ player, score: day[player] }))
        .filter(item => item.score !== null && !isNaN(item.score));
      
      if (scores.length === 0) return { date: day.date, winners: [], score: null };
      
      const minScore = Math.min(...scores.map(s => s.score)); // MINIMUM score wins
      const winners = scores.filter(s => s.score === minScore).map(s => s.player);
      
      return { date: day.date, winners, score: isNaN(minScore) ? null : minScore };
    });
  }, [processedData, players]);

  // Get today's winner
  const todaysWinner = useMemo(() => {
    const today = new Date();
    const todayString = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear().toString().slice(-2)}`;
    
    const todayData = processedData.find(day => day.date === todayString);
    if (!todayData) return null;
    
    const scores = players.map(player => ({ player, score: todayData[player] }))
      .filter(item => item.score !== null && !isNaN(item.score));
    
    if (scores.length === 0) return null;
    
    const minScore = Math.min(...scores.map(s => s.score));
    const winners = scores.filter(s => s.score === minScore).map(s => s.player);
    
    return {
      date: todayString,
      winners,
      score: minScore,
      participants: scores.length
    };
  }, [processedData, players]);



  const colors = ['#0F7B0F', '#228B22', '#32CD32', '#9ACD32', '#6B8E23', '#556B2F', '#8FBC8F', '#90EE90'];
  
  const ViewSelector = () => (
    <div className="flex flex-wrap gap-2 mb-6">
      {[
        { id: 'overview', label: 'Overview', icon: BarChart3 },
        { id: 'performance', label: 'Performance', icon: TrendingDown },
        { id: 'comparison', label: 'Player Comparison', icon: Users },
        { id: 'wins', label: 'Daily Winners', icon: Trophy }
      ].map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => setSelectedView(id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
            selectedView === id
              ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Icon size={16} />
          {label}
        </button>
      ))}
    </div>
  );



  const StatCard = ({ title, value, subtitle, icon: Icon, color }: any) => (
    <div className={`bg-gradient-to-br ${color} rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow duration-300`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium opacity-90">{title}</h3>
          <p className="text-2xl font-bold mt-1">{value}</p>
          {subtitle && <p className="text-xs opacity-80 mt-1">{subtitle}</p>}
        </div>
        <Icon size={24} className="opacity-80" />
      </div>
    </div>
  );

  const renderOverview = () => {
    const validAverages = playerStats.map((p: any) => p.average).filter(avg => !isNaN(avg));
    const bestAverage = validAverages.length > 0 ? Math.min(...validAverages) : 0;
    const bestPlayer = (playerStats.find((p: any) => p.average === bestAverage) as any)?.name || 'No data';
    
    const validWins = playerStats.map((p: any) => p.wins).filter(wins => !isNaN(wins));
    const mostWins = validWins.length > 0 ? Math.max(...validWins) : 0;
    const mostWinsPlayer = (playerStats.find((p: any) => p.wins === mostWins) as any)?.name || 'No data';
    
    // Calculate total rounds (sum of all games played by all players)
    const totalRounds = playerStats.reduce((sum, player: any) => sum + player.gamesPlayed, 0);
    
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Rounds"
            value={totalRounds}
            subtitle={`${processedData.length} days played (6/25-7/19)`}
            icon={Calendar}
            color="from-green-600 to-green-700"
          />
          <StatCard
            title="Active Players"
            value={playerStats.length}
            subtitle="Regular participants"
            icon={Users}
            color="from-blue-600 to-blue-700"
          />
          <StatCard
            title="Best Average"
            value={bestAverage}
            subtitle={`${bestPlayer} leading`}
            icon={Target}
            color="from-yellow-600 to-orange-600"
          />
          <StatCard
            title="Most Wins"
            value={mostWins}
            subtitle={mostWinsPlayer}
            icon={Trophy}
            color="from-purple-600 to-purple-700"
          />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800">🏆 Golf Leaderboard (Lower Scores Win)</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-2">Rank</th>
                  <th className="text-left py-3 px-2">Player</th>
                  <th className="text-right py-3 px-2">Avg Score</th>
                  <th className="text-right py-3 px-2">Best Round</th>
                  <th className="text-right py-3 px-2">Rounds</th>
                  <th className="text-right py-3 px-2">Wins</th>
                  <th className="text-right py-3 px-2">Win %</th>
                </tr>
              </thead>
              <tbody>
                {playerStats
                  .sort((a: any, b: any) => a.average - b.average) // Sort by lowest average (best in golf)
                  .map((player: any, index: number) => (
                    <tr key={player.name} className="border-b border-gray-100 hover:bg-green-50 transition-colors">
                      <td className="py-3 px-2">
                        <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                          index === 0 ? 'bg-yellow-100 text-yellow-800' :
                          index === 1 ? 'bg-gray-100 text-gray-800' :
                          index === 2 ? 'bg-orange-100 text-orange-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {index + 1}
                        </span>
                      </td>
                      <td className="py-3 px-2 font-medium">{player.name}</td>
                      <td className="py-3 px-2 text-right font-mono font-bold text-green-600">{player.average}</td>
                      <td className="py-3 px-2 text-right font-mono text-blue-600">{player.best}</td>
                      <td className="py-3 px-2 text-right">{player.gamesPlayed}</td>
                      <td className="py-3 px-2 text-right">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-bold">
                          {player.wins}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-right font-semibold">
                        {((player.wins / player.gamesPlayed) * 100).toFixed(1)}%
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderPerformance = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4 text-gray-800">🏌️ Score Trends (Lower is Better)</h3>
        <p className="text-gray-600 mb-4">Data points: {processedData.length}, Players: {players.length}</p>
        {processedData.length > 0 && players.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={[...processedData]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                stroke="#666"
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                stroke="#666"
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  border: 'none', 
                  borderRadius: '8px', 
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)' 
                }}
              />
              <Legend />
              {players.map((player, index) => (
                <Line
                  key={player}
                  type="monotone"
                  dataKey={player}
                  stroke={colors[index % colors.length]}
                  strokeWidth={2}
                  dot={{ fill: colors[index % colors.length], strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: colors[index % colors.length], strokeWidth: 2 }}
                  connectNulls={false}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No data available for charts</p>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4 text-gray-800">🎯 Average Performance (Best to Worst)</h3>
        <p className="text-gray-600 mb-4">Player stats: {playerStats.length}</p>
        {playerStats.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[...playerStats].sort((a: any, b: any) => a.average - b.average)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#666" />
              <YAxis tick={{ fontSize: 12 }} stroke="#666" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  border: 'none', 
                  borderRadius: '8px', 
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)' 
                }}
              />
              <Bar dataKey="average" radius={[4, 4, 0, 0]}>
                {playerStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No player stats available</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderComparison = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4 text-gray-800">📊 Player Performance Radar</h3>
        <p className="text-gray-600 mb-6">Higher values are better in all categories</p>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={[...radarData]}>
            <PolarGrid stroke="#e5e7eb" />
            <PolarAngleAxis 
              tick={{ fontSize: 12, fill: '#666' }}
              dataKey="player"
            />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 100]}
              tick={{ fontSize: 10, fill: '#666' }}
            />
            <Radar
              name="Consistency"
              dataKey="consistency"
              stroke="#0F7B0F"
              fill="#0F7B0F"
              fillOpacity={0.1}
              strokeWidth={2}
            />
            <Radar
              name="Performance"
              dataKey="performance"
              stroke="#228B22"
              fill="#228B22"
              fillOpacity={0.1}
              strokeWidth={2}
            />
            <Radar
              name="Participation"
              dataKey="participation"
              stroke="#32CD32"
              fill="#32CD32"
              fillOpacity={0.1}
              strokeWidth={2}
            />
            <Radar
              name="Win Rate"
              dataKey="winRate"
              stroke="#FFD700"
              fill="#FFD700"
              fillOpacity={0.1}
              strokeWidth={2}
            />
            <Legend />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800">🎯 Skill vs Participation</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                type="number" 
                dataKey="gamesPlayed" 
                name="Games Played"
                tick={{ fontSize: 12 }}
                stroke="#666"
              />
              <YAxis 
                type="number" 
                dataKey="average" 
                name="Average Score"
                tick={{ fontSize: 12 }}
                stroke="#666"
                scale="linear"
              />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  border: 'none', 
                  borderRadius: '8px', 
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)' 
                }}
                formatter={(value, name) => [value, name === 'average' ? 'Avg Score' : 'Games Played']}
              />
              <Scatter name="Players" data={[...playerStats]} fill="#0F7B0F">
                {playerStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800">🏆 Win Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[...playerStats.filter((p: any) => p.wins > 0)]}
                dataKey="wins"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, value }) => `${name}: ${value}`}
              >
                {playerStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderWins = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4 text-gray-800">🏌️ Daily Winners (Lowest Scores)</h3>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {dailyWinners.slice().reverse().map((day, index) => (
            <div key={day.date} className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border-l-4 border-green-500">
              <div>
                <p className="font-semibold text-gray-800">{day.date}</p>
                <div className="flex gap-2 mt-1">
                  {day.winners.map((winner, i) => (
                    <span key={i} className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                      {winner}
                    </span>
                  ))}
                  {day.winners.length === 0 && (
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm">
                      No scores
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-600">{day.score || 'N/A'}</p>
                <p className="text-xs text-gray-500">Winning Score</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 pt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading coffee golf stats...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 pt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center">
            <p className="text-red-500 mb-4">Error loading stats: {error}</p>
            <Link href="/" className="text-green-600 hover:underline">
              Return to home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
            ⛳ Coffee Golf Championship
          </h1>
          <p className="text-gray-600 mb-4">Professional golf scoring - Lower scores win!</p>
          <Link 
            href="/" 
            className="inline-flex items-center text-green-600 hover:text-green-700 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Portfolio
          </Link>
        </div>

        {/* Today's Winner Box */}
        {todaysWinner && (
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-6 mb-8 shadow-lg">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">🏆 Today's Winner</h2>
              <div className="flex items-center justify-center gap-4 mb-3">
                <div className="text-center">
                  <p className="text-white text-sm opacity-90">Date</p>
                  <p className="text-white font-bold text-lg">{todaysWinner.date}</p>
                </div>
                <div className="text-center">
                  <p className="text-white text-sm opacity-90">Winning Score</p>
                  <p className="text-white font-bold text-3xl">{todaysWinner.score}</p>
                </div>
                <div className="text-center">
                  <p className="text-white text-sm opacity-90">Participants</p>
                  <p className="text-white font-bold text-lg">{todaysWinner.participants}</p>
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {todaysWinner.winners.map((winner, index) => (
                  <span key={index} className="bg-white text-orange-600 px-4 py-2 rounded-full font-bold text-lg shadow-md">
                    {winner}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {!todaysWinner && (
          <div className="bg-gradient-to-r from-gray-400 to-gray-500 rounded-xl p-6 mb-8 shadow-lg">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">📅 No Games Today</h2>
              <p className="text-white opacity-90">Check back later for today's results!</p>
            </div>
          </div>
        )}

        <ViewSelector />

        {selectedView === 'overview' && renderOverview()}
        {selectedView === 'performance' && renderPerformance()}
        {selectedView === 'comparison' && renderComparison()}
        {selectedView === 'wins' && renderWins()}
      </div>
    </div>
  );
};

export default CoffeeGolfDashboard; 