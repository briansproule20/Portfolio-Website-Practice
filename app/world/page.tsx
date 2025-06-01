'use client';

import { useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from "react-simple-maps";
import { countryData, defaultCountryInfo } from '@/utils/countryData';

const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

export default function WorldMap() {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [position, setPosition] = useState<{
    coordinates: [number, number];
    zoom: number;
  }>({ coordinates: [0, 0], zoom: 1 });

  function handleMoveEnd(position: any) {
    setPosition(position);
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero Section */}
      <section className="relative h-[30vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[var(--card)] opacity-50"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-6xl font-black mb-6 text-[var(--foreground)]">World Travels</h1>
          <p className="text-xl text-[var(--accent)] font-serif italic">
            Exploring the world one adventure at a time. Hover over countries to learn more about my experiences.
          </p>
        </div>
      </section>

      {/* Map Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="relative bg-[var(--card)] rounded-xl p-6 shadow-lg">
          <div style={{ width: "100%", height: "600px" }}>
            <ComposableMap projection="geoMercator">
              <ZoomableGroup
                zoom={position.zoom}
                center={position.coordinates}
                onMoveEnd={handleMoveEnd}
              >
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const countryCode = geo.properties.ISO_A3;
                      const isVisited = countryData[countryCode]?.visited;
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          onMouseEnter={() => setHoveredCountry(countryCode)}
                          onMouseLeave={() => setHoveredCountry(null)}
                          style={{
                            default: {
                              fill: isVisited ? "var(--highlight)" : "var(--accent)",
                              stroke: "var(--foreground)",
                              strokeWidth: 0.5,
                              outline: "none",
                            },
                            hover: {
                              fill: "var(--highlight)",
                              stroke: "var(--foreground)",
                              strokeWidth: 0.75,
                              outline: "none",
                            },
                          }}
                        />
                      );
                    })
                  }
                </Geographies>
              </ZoomableGroup>
            </ComposableMap>
          </div>

          {/* Country Information */}
          {hoveredCountry && (
            <div className="absolute bottom-8 left-8 bg-[var(--background)] p-6 rounded-lg shadow-xl border-2 border-[var(--accent)] max-w-md">
              <h2 className="text-2xl font-bold mb-2 text-[var(--foreground)]">
                {countryData[hoveredCountry]?.name || defaultCountryInfo.name}
              </h2>
              <p className="text-[var(--accent)] mb-4">
                {countryData[hoveredCountry]?.description || defaultCountryInfo.description}
              </p>
              {countryData[hoveredCountry]?.highlights && (
                <div>
                  <h3 className="font-semibold mb-2 text-[var(--foreground)]">Highlights:</h3>
                  <ul className="list-disc list-inside text-[var(--accent)]">
                    {countryData[hoveredCountry].highlights?.map((highlight, index) => (
                      <li key={index}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              )}
              {countryData[hoveredCountry]?.yearVisited && (
                <p className="mt-4 text-sm text-[var(--highlight)]">
                  Visited in {countryData[hoveredCountry].yearVisited}
                </p>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
} 