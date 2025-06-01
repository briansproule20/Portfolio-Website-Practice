'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ReadsTable from './ReadsTable';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from "react-simple-maps";
import { countryData, defaultCountryInfo } from '@/utils/countryData';

const geoUrl = "/world-110m.json";

const DEFAULT_POSITION = {
  coordinates: [0, 30] as [number, number],
  zoom: 1.2
};

type Book = {
  title: string;
  author: string;
  pages?: string;
  year?: string;
  rating?: string;
};

type ReadsClientProps = {
  books: Book[];
};

export default function ReadsClient({ books }: ReadsClientProps) {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [position, setPosition] = useState<typeof DEFAULT_POSITION>(DEFAULT_POSITION);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);
  const [hoveredCountryName, setHoveredCountryName] = useState<string | null>(null);

  function handleMoveEnd(newPosition: any) {
    setPosition(newPosition);
  }

  function handleMove(position: { x: number; y: number; zoom: number }) {
    setPosition({
      coordinates: [position.x, position.y] as [number, number],
      zoom: position.zoom
    });
  }

  function handleDoubleClick() {
    setPosition(DEFAULT_POSITION);
  }

  function handleMouseMove(e: React.MouseEvent) {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[var(--card)] opacity-50"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-6xl font-black mb-6 text-[var(--foreground)]">Reading List</h1>
          <p className="text-xl text-[var(--accent)] font-serif italic">
          "I have lived a thousand lives and I've loved a thousand loves. I've walked on distant worlds and seen the end of time. Because I read." ― George R. R. Martin
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-6xl mx-auto px-4 -mt-16 relative z-20">
        <div className="bg-[var(--card)] rounded-xl shadow-xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <p className="text-4xl font-bold text-[var(--highlight)]">{books.length}</p>
            <p className="text-[var(--accent)] mt-2">Books Read</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-[var(--highlight)]">
              {books.reduce((acc: number, book: Book) => acc + (book.rating ? parseFloat(book.rating.split('/')[0]) : 0) / books.length, 0).toFixed(1)}
            </p>
            <p className="text-[var(--accent)] mt-2">Average Rating</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-[var(--highlight)]">
              {books.reduce((acc: number, book: Book) => acc + (book.pages ? parseInt(book.pages) : 0), 0).toLocaleString()}
            </p>
            <p className="text-[var(--accent)] mt-2">Pages Read</p>
          </div>
        </div>
      </section>

      {/* Books Table Section */}
      <section className="max-w-6xl mx-auto bg-[var(--card)] py-12 px-4 mt-16 rounded-xl shadow-lg">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-[var(--foreground)] text-center">Book Collection</h2>
          <p className="text-[var(--accent)] text-center mt-2">
            Books do not appear in order read here. See spreadsheet for more detailed breakdown.
          </p>
        </div>
        <ReadsTable books={books} />
      </section>

      {/* Quote Section */}
      <section className="max-w-4xl mx-auto px-4 py-24 text-center">
        <blockquote className="text-2xl font-serif italic text-[var(--foreground)]">
          "A reader lives a thousand lives before he dies. The man who never reads lives only one."
        </blockquote>
        <p className="text-[var(--accent)] mt-4">― George R.R. Martin</p>
      </section>

      {/* World Map Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[var(--foreground)]">Where I Read</h2>
          <p className="text-[var(--accent)] mt-2">
            Exploring literature around the globe. Hover over countries to see where I've read books.
          </p>
        </div>
        <div className="relative bg-[var(--card)] rounded-xl p-6 shadow-lg mb-12">
          <div 
            style={{ width: "100%", height: "600px", position: "relative" }}
            onDoubleClick={handleDoubleClick}
            onMouseMove={handleMouseMove}
          >
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                scale: 150,
                center: [0, 30]
              }}
              style={{
                width: "100%",
                height: "100%"
              }}
            >
              <ZoomableGroup
                zoom={position.zoom}
                center={position.coordinates}
                onMoveEnd={handleMoveEnd}
                onMove={handleMove}
                minZoom={1}
                maxZoom={4}
                translateExtent={[
                  [-180, -90],
                  [180, 90]
                ]}
              >
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const countryCode = geo.properties.ISO_A3;
                      const isVisited = countryData[countryCode]?.visited;
                      const countryName = countryData[countryCode]?.name || geo.properties.name;
                      
                      return (
                        <g key={geo.rsmKey} aria-label={countryName}>
                          <Geography
                            geography={geo}
                            onMouseEnter={() => {
                              console.log('Hovering:', geo.properties);
                              const name = countryData[countryCode]?.name || geo.properties.name;
                              setHoveredCountry(countryCode);
                              setHoveredCountryName(name);
                            }}
                            onMouseLeave={() => {
                              setHoveredCountry(null);
                              setMousePosition(null);
                              setHoveredCountryName(null);
                            }}
                            tabIndex={-1}
                            style={{
                              default: {
                                fill: isVisited ? "var(--highlight)" : "var(--accent)",
                                stroke: "var(--foreground)",
                                strokeWidth: 0.5,
                                outline: "none",
                                opacity: 0.75,
                                cursor: "grab"
                              },
                              hover: {
                                fill: "var(--highlight)",
                                stroke: "var(--foreground)",
                                strokeWidth: 1,
                                outline: "none",
                                opacity: 1,
                                cursor: "pointer"
                              },
                              pressed: {
                                cursor: "grabbing"
                              }
                            }}
                          />
                        </g>
                      );
                    })
                  }
                </Geographies>
              </ZoomableGroup>
            </ComposableMap>

            {/* Hover Tooltip */}
            {hoveredCountryName && mousePosition && (
              <div 
                className="fixed z-50 px-2 py-1 bg-[var(--background)] text-[var(--foreground)] border border-[var(--accent)] rounded shadow-lg text-sm pointer-events-none"
                style={{
                  left: `${mousePosition.x}px`,
                  top: `${mousePosition.y - 30}px`,
                }}
              >
                {hoveredCountryName}
              </div>
            )}
          </div>

          {/* Map Instructions */}
          <div className="absolute top-2 right-2 bg-[var(--background)] p-2 rounded-lg shadow-md text-xs text-[var(--accent)] space-y-1">
            <div className="flex items-center gap-1">
              <span>🖱️</span>
              <span>Scroll: zoom</span>
            </div>
            <div className="flex items-center gap-1">
              <span>🖱️</span>
              <span>Drag: pan</span>
            </div>
            <button
              onClick={handleDoubleClick}
              className="w-full mt-1 px-2 py-1 bg-[var(--highlight)] text-[var(--background)] rounded-md hover:opacity-90 transition-opacity flex items-center justify-center gap-1 text-xs"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
              Reset
            </button>
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

      {/* Spreadsheet Link Section */}
      <section className="max-w-4xl mx-auto px-4 pb-24 text-center">
        <a 
          href="https://docs.google.com/spreadsheets/d/1c6zdCUsDR_oMYe1ZJBxDujmSjtYXUMRKROyUkr72z0Q/edit?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[var(--highlight)] text-[var(--background)] px-8 py-4 rounded-lg font-semibold transition-all hover:scale-105 hover:shadow-lg"
        >
          View Complete Reading Log
        </a>
        <p className="text-[var(--accent)] mt-4 text-sm">
          Click to see my detailed reading log spreadsheet with more information and statistics
        </p>
      </section>
    </div>
  );
} 