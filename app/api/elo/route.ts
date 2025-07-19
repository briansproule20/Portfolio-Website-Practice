import { NextRequest, NextResponse } from 'next/server';
import { 
  loadEloRankings, 
  saveEloRankings, 
  initializeEloRankings, 
  updateEloRankings,
  logEloVote,
  getEloVoteHistory,
  syncNewEntities,
  ELO_ENTITIES
} from '@/lib/elo-server';

export async function GET() {
  try {
    console.log('🎯 Loading ELO rankings...');
    
    // Load existing rankings
    let rankings = await loadEloRankings();
    
    // If no rankings exist, initialize with default entities
    if (!rankings) {
      console.log('🎯 No rankings found, initializing with default entities...');
      rankings = initializeEloRankings(ELO_ENTITIES);
      await saveEloRankings(rankings);
      console.log(`🎯 Initialized rankings with ${rankings.entities.length} entities`);
    } else {
      // Always sync entities from data file (add new ones, remove deleted ones, update existing ones)
      console.log('🎯 Syncing entities from data file...');
      const updatedRankings = syncNewEntities(rankings, ELO_ENTITIES);
      
      // Always save if there were any changes (additions, removals, or updates)
      if (updatedRankings.entities.length !== rankings.entities.length || 
          updatedRankings.lastUpdated !== rankings.lastUpdated) {
        rankings = updatedRankings;
        await saveEloRankings(rankings);
        console.log(`🎯 Entity sync complete: ${rankings.entities.length} total entities`);
      }
    }

    return NextResponse.json({
      success: true,
      data: rankings
    });

  } catch (error) {
    console.error('Error in ELO rankings GET:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const action = url.searchParams.get('action');
    
    if (action === 'vote-history') {
      const votes = await getEloVoteHistory();
      
      return NextResponse.json({
        success: true,
        data: votes,
        total: votes.length
      });
    }
    
    return NextResponse.json(
      { success: false, error: 'Invalid action' },
      { status: 400 }
    );
    
  } catch (error) {
    console.error('Error in ELO rankings PATCH:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { entity1Id, entity2Id, dimension, winner } = await request.json();
    
    if (!entity1Id || !entity2Id || !dimension || !winner || entity1Id === entity2Id) {
      return NextResponse.json(
        { success: false, error: 'Invalid vote data' },
        { status: 400 }
      );
    }

    // Load current rankings
    let rankings = await loadEloRankings();
    
    if (!rankings) {
      return NextResponse.json(
        { success: false, error: 'Rankings not initialized' },
        { status: 500 }
      );
    }

    // Update rankings with the vote
    const { updatedRankings, voteRecord } = updateEloRankings(rankings, entity1Id, entity2Id, dimension, winner);
    
    if (!voteRecord) {
      return NextResponse.json(
        { success: false, error: 'Invalid entity IDs' },
        { status: 400 }
      );
    }

    // Save updated rankings
    await saveEloRankings(updatedRankings);
    
    // Log the vote permanently
    await logEloVote(voteRecord);
    
    console.log(`🎯 Vote recorded: ${winner} beat ${winner === entity1Id ? entity2Id : entity1Id} in ${dimension}`);
    
    return NextResponse.json({
      success: true,
      rankings: updatedRankings,
      voteId: voteRecord.id
    });

  } catch (error) {
    console.error('Error in ELO rankings POST:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
} 