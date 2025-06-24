import { NextRequest, NextResponse } from 'next/server';
import { getVoteHistory } from '@/lib/rankings-server';
import { VoteRecord } from '@/types/rankings';

export async function GET(request: NextRequest) {
  try {
    const votes = await getVoteHistory();
    
    if (votes.length === 0) {
      return NextResponse.json({
        success: true,
        data: {
          totalVotes: 0,
          analytics: null,
          message: 'No votes recorded yet'
        }
      });
    }

    // Calculate analytics
    const analytics = calculateVoteAnalytics(votes);
    
    return NextResponse.json({
      success: true,
      data: {
        totalVotes: votes.length,
        analytics
      }
    });

  } catch (error) {
    console.error('Error in vote analytics:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}

function calculateVoteAnalytics(votes: VoteRecord[]) {
  // Track statistics by song
  const songStats: { [trackId: string]: { wins: number; losses: number; totalRatingGain: number; totalRatingLoss: number } } = {};
  
  // Track voting activity over time
  const votingActivity: { [date: string]: number } = {};
  
  // Track biggest rating changes
  let biggestGain = { amount: 0, voteId: '', trackId: '' };
  let biggestLoss = { amount: 0, voteId: '', trackId: '' };
  
  votes.forEach(vote => {
    // Song stats
    if (!songStats[vote.winnerId]) {
      songStats[vote.winnerId] = { wins: 0, losses: 0, totalRatingGain: 0, totalRatingLoss: 0 };
    }
    if (!songStats[vote.loserId]) {
      songStats[vote.loserId] = { wins: 0, losses: 0, totalRatingGain: 0, totalRatingLoss: 0 };
    }
    
    songStats[vote.winnerId].wins++;
    songStats[vote.loserId].losses++;
    
    const winnerGain = vote.winnerRatingAfter - vote.winnerRatingBefore;
    const loserLoss = vote.loserRatingBefore - vote.loserRatingAfter;
    
    songStats[vote.winnerId].totalRatingGain += winnerGain;
    songStats[vote.loserId].totalRatingLoss += loserLoss;
    
    // Track biggest changes
    if (winnerGain > biggestGain.amount) {
      biggestGain = { amount: winnerGain, voteId: vote.id, trackId: vote.winnerId };
    }
    if (loserLoss > biggestLoss.amount) {
      biggestLoss = { amount: loserLoss, voteId: vote.id, trackId: vote.loserId };
    }
    
    // Activity by date
    const date = vote.timestamp.split('T')[0];
    votingActivity[date] = (votingActivity[date] || 0) + 1;
  });
  
  // Find most active songs
  const mostActiveTrack = Object.entries(songStats)
    .sort((a, b) => (b[1].wins + b[1].losses) - (a[1].wins + a[1].losses))[0];
  
  // Find highest win rate
  const highestWinRate = Object.entries(songStats)
    .filter(([_, stats]) => stats.wins + stats.losses >= 3) // At least 3 votes
    .sort((a, b) => (b[1].wins / (b[1].wins + b[1].losses)) - (a[1].wins / (a[1].wins + a[1].losses)))[0];
  
  // Recent activity (last 7 days)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const recentVotes = votes.filter(vote => new Date(vote.timestamp) >= sevenDaysAgo);
  
  return {
    totalTracks: Object.keys(songStats).length,
    averageVotesPerTrack: votes.length / Object.keys(songStats).length,
    mostActiveTrack: mostActiveTrack ? {
      trackId: mostActiveTrack[0],
      totalVotes: mostActiveTrack[1].wins + mostActiveTrack[1].losses,
      wins: mostActiveTrack[1].wins,
      losses: mostActiveTrack[1].losses
    } : null,
    highestWinRate: highestWinRate ? {
      trackId: highestWinRate[0],
      winRate: (highestWinRate[1].wins / (highestWinRate[1].wins + highestWinRate[1].losses) * 100).toFixed(1),
      wins: highestWinRate[1].wins,
      losses: highestWinRate[1].losses
    } : null,
    biggestRatingGain: biggestGain.amount > 0 ? biggestGain : null,
    biggestRatingLoss: biggestLoss.amount > 0 ? biggestLoss : null,
    recentActivity: {
      votesLast7Days: recentVotes.length,
      dailyAverage: (recentVotes.length / 7).toFixed(1)
    },
    votingActivity: Object.entries(votingActivity)
      .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime())
      .slice(0, 30) // Last 30 days
  };
} 