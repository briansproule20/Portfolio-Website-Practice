'use client';

import { useState } from 'react';

interface ContributionGraphProps {
  contributions: Record<string, number>;
  totalContributions: number;
}

export default function ContributionGraph({ contributions, totalContributions }: ContributionGraphProps) {
  const [hoveredDay, setHoveredDay] = useState<{ date: string; count: number } | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Generate grid for current year
  const generateGrid = () => {
    const weeks = [];
    const currentYear = new Date().getFullYear();
    const startDate = new Date(currentYear, 0, 1);
    const endDate = new Date(currentYear, 11, 31);

    // Start from the first Sunday of the year or before
    const firstSunday = new Date(startDate);
    firstSunday.setDate(firstSunday.getDate() - firstSunday.getDay());

    let currentDate = new Date(firstSunday);

    while (currentDate <= endDate || weeks.length < 53) {
      const week = [];

      for (let day = 0; day < 7; day++) {
        const dateStr = currentDate.toISOString().split('T')[0];
        const count = contributions[dateStr] || 0;
        const isCurrentYear = currentDate.getFullYear() === currentYear;

        week.push({
          date: dateStr,
          count: isCurrentYear ? count : 0,
          displayDate: currentDate.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
          })
        });

        currentDate.setDate(currentDate.getDate() + 1);
      }

      weeks.push(week);

      if (currentDate > endDate && weeks.length >= 52) break;
    }

    return weeks;
  };

  const getIntensity = (count: number) => {
    if (count === 0) return 0;
    if (count <= 3) return 1;
    if (count <= 6) return 2;
    if (count <= 9) return 3;
    return 4;
  };

  const getColor = (intensity: number) => {
    const colors = [
      '#ebedf0', // 0 contributions
      '#9be9a8', // 1-3 contributions
      '#40c463', // 4-6 contributions
      '#30a14e', // 7-9 contributions
      '#216e39'  // 10+ contributions
    ];
    return colors[intensity];
  };

  const weeks = generateGrid();

  const handleMouseEnter = (day: any, event: React.MouseEvent) => {
    setHoveredDay({ date: day.displayDate, count: day.count });
    setMousePos({ x: event.clientX, y: event.clientY });
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    setMousePos({ x: event.clientX, y: event.clientY });
  };

  const handleMouseLeave = () => {
    setHoveredDay(null);
  };

  return (
    <div className="contribution-graph-container">
      {/* Month labels */}
      <div className="flex mb-2 text-xs text-[var(--accent)]">
        <div className="w-6"></div>
        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, index) => (
          <div key={month} className="flex-1 text-center" style={{ marginLeft: index * 4 }}>
            {month}
          </div>
        ))}
      </div>

      {/* Contribution grid */}
      <div className="flex">
        {/* Day labels */}
        <div className="flex flex-col text-xs text-[var(--accent)] mr-2">
          <div className="h-[11px] mb-[2px]"></div>
          <div className="h-[11px] mb-[2px]">Mon</div>
          <div className="h-[11px] mb-[2px]"></div>
          <div className="h-[11px] mb-[2px]">Wed</div>
          <div className="h-[11px] mb-[2px]"></div>
          <div className="h-[11px] mb-[2px]">Fri</div>
          <div className="h-[11px] mb-[2px]"></div>
        </div>

        {/* Grid */}
        <div className="flex gap-[2px]">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-[2px]">
              {week.map((day, dayIndex) => (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  className="w-[11px] h-[11px] rounded-sm cursor-pointer hover:ring-1 hover:ring-[var(--accent)] transition-all"
                  style={{ backgroundColor: getColor(getIntensity(day.count)) }}
                  onMouseEnter={(e) => handleMouseEnter(day, e)}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  title={`${day.count} contributions on ${day.displayDate}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between mt-4 text-xs text-[var(--accent)]">
        <span>Less</span>
        <div className="flex gap-1">
          {[0, 1, 2, 3, 4].map(intensity => (
            <div
              key={intensity}
              className="w-[11px] h-[11px] rounded-sm"
              style={{ backgroundColor: getColor(intensity) }}
            />
          ))}
        </div>
        <span>More</span>
      </div>

      {/* Total contributions */}
      <div className="text-center mt-4 text-sm text-[var(--foreground)]">
        <strong>{totalContributions.toLocaleString()}</strong> contributions this year
      </div>

      {/* Tooltip */}
      {hoveredDay && (
        <div
          className="fixed bg-gray-800 text-white px-2 py-1 rounded text-xs z-50 pointer-events-none"
          style={{
            left: mousePos.x + 10,
            top: mousePos.y - 30,
          }}
        >
          <strong>{hoveredDay.count}</strong> contributions on {hoveredDay.date}
        </div>
      )}
    </div>
  );
}