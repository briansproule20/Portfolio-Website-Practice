'use client';

import Image from 'next/image';
import { SuperscoreEntry } from '@/types/elo';

interface EloSuperscoreLeaderboardProps {
  entries: SuperscoreEntry[];
}

export default function EloSuperscoreLeaderboard({ entries }: EloSuperscoreLeaderboardProps) {
  if (entries.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No data available
      </div>
    );
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {entries.slice(0, 10).map((entry) => (
        <div key={entry.entity.id} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-[var(--background)] rounded-lg border border-[var(--accent)]">
          <div className="text-lg sm:text-2xl font-bold text-yellow-500 min-w-[2rem] sm:min-w-[3rem] text-center">
            #{entry.rank}
          </div>
          
          <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={entry.entity.imageUrl}
              alt={entry.entity.name}
              fill
              className="object-cover"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-[var(--foreground)] text-sm sm:text-base truncate">{entry.entity.name}</h3>
            </div>
            <p className="text-[var(--accent)] text-xs sm:text-sm truncate capitalize">{entry.entity.category}</p>
          </div>
          
          <div className="text-right text-xs sm:text-sm text-[var(--accent)] flex-shrink-0">
            <div className="font-bold text-yellow-500">Superscore: {entry.superscore}</div>
            <div className="hidden sm:block">{entry.totalWins}W-{entry.totalLosses}L ({entry.overallWinRate.toFixed(1)}%)</div>
            <div className="sm:hidden">{entry.totalWins}W-{entry.totalLosses}L</div>
          </div>
        </div>
      ))}
    </div>
  );
} 