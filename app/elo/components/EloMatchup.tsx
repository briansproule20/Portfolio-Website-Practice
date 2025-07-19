'use client';

import Image from 'next/image';
import { EloEntity, EloDimension, ELO_DIMENSIONS } from '@/types/elo';
import { getEntityStats } from '@/lib/elo-utils';

interface EloMatchupProps {
  entity1: EloEntity;
  entity2: EloEntity;
  dimension: EloDimension;
  onResult: (winner: 'entity1' | 'entity2') => void;
  voting?: boolean;
}

export default function EloMatchup({ entity1, entity2, dimension, onResult, voting = false }: EloMatchupProps) {
  const stats1 = getEntityStats(entity1, dimension);
  const stats2 = getEntityStats(entity2, dimension);

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <p className="text-[var(--accent)] mb-4 text-sm sm:text-base px-2">
          Choose your winner! Every vote helps shape the rankings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto">
        {/* Entity 1 */}
        <div className={`bg-[var(--background)] border-2 border-[var(--accent)] rounded-lg p-4 sm:p-6 cursor-pointer hover:border-[var(--highlight)] transition-all duration-300 hover:scale-105 ${voting ? 'pointer-events-none opacity-75' : ''}`}>
          <div className="relative w-full aspect-square mb-3 sm:mb-4 rounded-lg overflow-hidden">
            <Image
              src={entity1.imageUrl}
              alt={entity1.name}
              fill
              className="object-cover"
            />
          </div>
          
          <div className="text-center">
            <h4 className="text-lg sm:text-xl font-bold mb-2 text-[var(--foreground)] leading-tight">{entity1.name}</h4>
            <p className="text-[var(--accent)] mb-1 sm:mb-2 text-sm sm:text-base capitalize">{entity1.category}</p>
            {entity1.description && (
              <p className="text-xs sm:text-sm text-[var(--accent)] mb-3 sm:mb-4">{entity1.description}</p>
            )}
            
            <div className="text-xs sm:text-sm text-[var(--accent)] space-y-1 mb-3 sm:mb-4">
              <div>Rating: {stats1.score}</div>
              <div>Win Rate: {stats1.winRate.toFixed(1)}% ({stats1.wins}W-{stats1.losses}L)</div>
              <div>Battles: {stats1.total}</div>
            </div>

            <button
              onClick={() => onResult('entity1')}
              className="w-full py-3 px-6 bg-[var(--highlight)] text-[var(--foreground)] rounded-lg font-semibold hover:bg-[var(--accent)] transition-colors text-sm sm:text-base"
            >
              Choose {entity1.name}
            </button>
          </div>
        </div>

        {/* Entity 2 */}
        <div className={`bg-[var(--background)] border-2 border-[var(--accent)] rounded-lg p-4 sm:p-6 cursor-pointer hover:border-[var(--highlight)] transition-all duration-300 hover:scale-105 ${voting ? 'pointer-events-none opacity-75' : ''}`}>
          <div className="relative w-full aspect-square mb-3 sm:mb-4 rounded-lg overflow-hidden">
            <Image
              src={entity2.imageUrl}
              alt={entity2.name}
              fill
              className="object-cover"
            />
          </div>
          
          <div className="text-center">
            <h4 className="text-lg sm:text-xl font-bold mb-2 text-[var(--foreground)] leading-tight">{entity2.name}</h4>
            <p className="text-[var(--accent)] mb-1 sm:mb-2 text-sm sm:text-base capitalize">{entity2.category}</p>
            {entity2.description && (
              <p className="text-xs sm:text-sm text-[var(--accent)] mb-3 sm:mb-4">{entity2.description}</p>
            )}
            
            <div className="text-xs sm:text-sm text-[var(--accent)] space-y-1 mb-3 sm:mb-4">
              <div>Rating: {stats2.score}</div>
              <div>Win Rate: {stats2.winRate.toFixed(1)}% ({stats2.wins}W-{stats2.losses}L)</div>
              <div>Battles: {stats2.total}</div>
            </div>

            <button
              onClick={() => onResult('entity2')}
              className="w-full py-3 px-6 bg-[var(--highlight)] text-[var(--foreground)] rounded-lg font-semibold hover:bg-[var(--accent)] transition-colors text-sm sm:text-base"
            >
              Choose {entity2.name}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 