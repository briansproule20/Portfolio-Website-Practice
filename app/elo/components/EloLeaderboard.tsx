'use client';

import Image from 'next/image';
import { EloLeaderboardEntry, EloDimension } from '@/types/elo';

interface EloLeaderboardProps {
  entries: EloLeaderboardEntry[];
  dimension: EloDimension;
  compact?: boolean;
}

export default function EloLeaderboard({ entries, dimension, compact = false }: EloLeaderboardProps) {
  if (entries.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No data available
      </div>
    );
  }

  if (compact) {
    return (
      <div className="space-y-1.5">
        {entries.slice(0, 5).map((entry, index) => (
          <div key={entry.entity.id} className="flex items-center gap-2 p-1.5 bg-[var(--background)] rounded border border-[var(--accent)] hover:border-[var(--highlight)] transition-colors">
            <div className="text-xs font-bold text-[var(--highlight)] min-w-[1.2rem] text-center">
              {entry.rank}
            </div>
            <div className="relative w-6 h-6 rounded overflow-hidden flex-shrink-0">
              <Image
                src={entry.entity.imageUrl}
                alt={entry.entity.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-xs text-[var(--foreground)] truncate leading-tight">{entry.entity.name}</div>
              <p className="text-xs text-[var(--accent)] truncate opacity-75 capitalize">{entry.entity.category}</p>
              <div className="text-xs text-[var(--accent)] opacity-60">
                {entry.score} • {entry.winRate.toFixed(1)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {entries.map((entry) => (
        <div key={entry.entity.id} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-[var(--background)] rounded-lg border border-[var(--accent)]">
          <div className="text-lg sm:text-2xl font-bold text-[var(--highlight)] min-w-[2rem] sm:min-w-[3rem] text-center">
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
            <div className="font-bold">Rating: {entry.score}</div>
            <div className="hidden sm:block">Win Rate: {entry.winRate.toFixed(1)}%</div>
            <div className="sm:hidden">WR: {entry.winRate.toFixed(1)}%</div>
            <div className="hidden sm:block">{entry.wins}W-{entry.losses}L</div>
            <div className="sm:hidden">{entry.wins}W-{entry.losses}L</div>
          </div>
        </div>
      ))}
    </div>
  );
} 