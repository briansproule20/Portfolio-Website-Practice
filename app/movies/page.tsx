'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface MediaItem {
  title: string;
  year: number;
  rating: number;
  review: string;
  comments?: string;
  director?: string;
  creator?: string;
  genre: string[];
  runtime?: string;
  seasons?: number;
}

interface MoviePoster {
  id: number;
  title: string;
  year: number;
  imageUrl: string;
  posterPath: string;
}

export default function Movies() {
  const [currentPosterIndex, setCurrentPosterIndex] = useState(0);
  const [moviePosters, setMoviePosters] = useState<MoviePoster[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // CUSTOMIZE YOUR MOVIE SELECTION HERE!
  // Add/remove/reorder these TMDB IDs to change which posters appear
  const classicMovieIds = [
    238,    // The Godfather
    278,    // The Shawshank Redemption
    240,    // The Godfather Part II
    424,    // Schindler's List
    13,     // Forrest Gump
    680,    // Pulp Fiction
    550,    // Fight Club
    274,    // The Silence of the Lambs
    27205,  // Inception
    155,    // The Dark Knight
    497,    // The Green Mile
    389,    // 12 Angry Men
    637,    // Life Is Beautiful
    585,    // Spirited Away
    539,    // Psycho
    920,    // Casablanca
    11216,  // Cinema Paradiso
    346,    // Seven Samurai
    598,    // City of God
    161,    // Goodfellas
    
    // Lord of the Rings Trilogy
    122,    // The Lord of the Rings: The Return of the King
    120,    // The Lord of the Rings: The Fellowship of the Ring
    121,    // The Lord of the Rings: The Two Towers
    
    // More Classics
    629,    // The Usual Suspects
    858,    // Scent of a Woman
    769,    // Good Will Hunting
    95,     // Braveheart
    103,    // Taxi Driver
    500,    // Reservoir Dogs
    
    // Additional Masterpieces
    1,      // Toy Story
    11,     // Star Wars
    181,    // Return of the Jedi
    1891,   // The Empire Strikes Back
    105,    // Back to the Future
    311,    // Once Upon a Time in America
    429,    // The Good, the Bad and the Ugly
    72,     // The Godfather Part III
    510,    // One Flew Over the Cuckoo's Nest
    12,     // Finding Nemo
    914,    // The Great Dictator
    329,    // Jurassic Park
    857,    // Saving Private Ryan
    11324,  // Shutter Island
    475,    // Polar Express
    77,     // Memento
    862,    // Toy Story 2
    863,    // Toy Story 3
    597,    // Titanic
    19,     // Metropolis
    578,    // Jaws
    8587,   // The Lion King
    694,    // The Shining
    2062,   // Ratatouille
    508,    // Eternal Sunshine of the Spotless Mind
    1422,   // The Departed
    475557, // Joker
    324857, // Spider-Man: Into the Spider-Verse
    299536, // Avengers: Infinity War
    299534, // Avengers: Endgame
    49026,  // The Dark Knight Rises
    872585, // Oppenheimer
    346364, // It
    335984, // Blade Runner 2049
    447332, // A Quiet Place
    284054, // Black Panther
    862,    // Toy Story 2
    866398, // The Beekeeper

    550,    // Fight Club
    78,     // Blade Runner
    348,    // Alien
    1892,   // The Terminator
    218,    // The Terminator 2
    381,    // Kill Bill: Vol. 1
    393,    // Kill Bill: Vol. 2
    245,    // Million Dollar Baby
    1585,   // It's a Wonderful Life
    1422,   // The Departed

    // Sci-Fi
    603,    // The Matrix
    604,    // The Matrix Reloaded
    605,    // The Matrix Revolutions
    62,     // 2001: A Space Odyssey
    78,     // Blade Runner
    348,    // Alien
    679,    // Aliens

    // Horror
    694,    // The Shining
      ];

  // Fetch movie posters from TMDB
  useEffect(() => {
    const fetchMoviePosters = async () => {
      try {
        setIsLoading(true);
        const posters: MoviePoster[] = [];
        
        // Fetch movies in parallel
        const moviePromises = classicMovieIds.map(async (id) => {
          try {
            const response = await fetch(
              `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&append_to_response=images`
            );
            
            if (!response.ok) {
              console.warn(`Failed to fetch movie ${id}`);
              return null;
            }
            
            const data = await response.json();
            
            return {
              id: data.id,
              title: data.title,
              year: new Date(data.release_date).getFullYear(),
              imageUrl: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
              posterPath: data.poster_path
            };
          } catch (error) {
            console.warn(`Error fetching movie ${id}:`, error);
            return null;
          }
        });

        const results = await Promise.all(moviePromises);
        const validResults = results.filter(Boolean) as MoviePoster[];
        
        setMoviePosters(validResults);
      } catch (error) {
        console.error('Error fetching movie posters:', error);
        // Fallback to placeholder data
        setMoviePosters([
          {
            id: 1,
            title: 'The Godfather',
            year: 1972,
            imageUrl: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop',
            posterPath: ''
          },
          {
            id: 2,
            title: 'Casablanca',
            year: 1942,
            imageUrl: 'https://images.unsplash.com/photo-1489599832527-2b8e0d3c3b3a?w=400&h=600&fit=crop',
            posterPath: ''
          },
          {
            id: 3,
            title: 'Citizen Kane',
            year: 1941,
            imageUrl: 'https://images.unsplash.com/photo-1489599832527-2b8e0d3c3b3a?w=400&h=600&fit=crop',
            posterPath: ''
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMoviePosters();
  }, []);

  // Auto-scroll effect
  useEffect(() => {
    if (moviePosters.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentPosterIndex((prev) => (prev + 1) % moviePosters.length);
    }, 4000); // Slower scroll for better viewing

    return () => clearInterval(interval);
  }, [moviePosters.length]);

  const movies: MediaItem[] = [
    {
      title: 'The Lord of the Rings Trilogy',
      year: 2001,
      rating: 5.0,
      review: 'Epic fantasy masterpiece that defined a generation of filmmaking.',
      comments: 'Extended editions are the only way to watch. The world-building is unparalleled.',
      director: 'Peter Jackson',
      genre: ['Fantasy', 'Adventure', 'Drama'],
      runtime: '558 min (Extended)'
    },
    {
      title: 'Interstellar',
      year: 2014,
      rating: 5.0,
      review: 'A breathtaking sci-fi epic that explores love, time, and humanity\'s place in the universe.',
      comments: 'Hans Zimmer\'s score is absolutely transcendent. The science is mind-bending.',
      director: 'Christopher Nolan',
      genre: ['Sci-Fi', 'Drama', 'Adventure'],
      runtime: '169 min'
    },
    {
      title: 'The Shawshank Redemption',
      year: 1994,
      rating: 5.0,
      review: 'A powerful story of hope, friendship, and redemption.',
      comments: 'The ending still gives me chills every time.',
      director: 'Frank Darabont',
      genre: ['Drama', 'Crime'],
      runtime: '142 min'
    },
    {
      title: 'The Matrix',
      year: 1999,
      rating: 4.5,
      review: 'Revolutionary sci-fi that changed action cinema forever.',
      comments: 'The practical effects and philosophy still hold up.',
      director: 'Lana & Lilly Wachowski',
      genre: ['Sci-Fi', 'Action', 'Thriller'],
      runtime: '136 min'
    },
    {
      title: 'Inception',
      year: 2010,
      rating: 4.5,
      review: 'Mind-bending thriller that rewards multiple viewings.',
      comments: 'The practical effects and dream logic are brilliant.',
      director: 'Christopher Nolan',
      genre: ['Sci-Fi', 'Thriller', 'Action'],
      runtime: '148 min'
    },
    {
      title: 'The Grand Budapest Hotel',
      year: 2014,
      rating: 4.5,
      review: 'Wes Anderson at his most whimsical and visually stunning.',
      comments: 'The production design and color palette are incredible.',
      director: 'Wes Anderson',
      genre: ['Comedy', 'Drama', 'Adventure'],
      runtime: '99 min'
    },
    {
      title: 'The Hobbit Trilogy',
      year: 2012,
      rating: 4.0,
      review: 'An epic journey through Middle-earth that, while not as perfect as LOTR, still delivers adventure and heart.',
      comments: 'The extended editions are worth it. Martin Freeman is perfect as Bilbo.',
      director: 'Peter Jackson',
      genre: ['Fantasy', 'Adventure', 'Drama'],
      runtime: '474 min (Extended)'
    },
    {
      title: 'Star Wars Prequel Trilogy',
      year: 1999,
      rating: 4.0,
      review: 'Flawed but fascinating exploration of how democracy dies and heroes are born.',
      comments: 'Revenge of the Sith is genuinely great. The memes are legendary.',
      director: 'George Lucas',
      genre: ['Sci-Fi', 'Fantasy', 'Adventure'],
      runtime: '418 min'
    },
    {
      title: 'Star Wars Original Trilogy',
      year: 1977,
      rating: 5.0,
      review: 'The trilogy that defined a generation and created the modern blockbuster.',
      comments: 'Empire Strikes Back is perfect. The practical effects still hold up.',
      director: 'George Lucas',
      genre: ['Sci-Fi', 'Fantasy', 'Adventure'],
      runtime: '378 min'
    },
    {
      title: 'Once Upon a Time in Hollywood',
      year: 2019,
      rating: 4.5,
      review: 'Tarantino\'s love letter to 1969 Hollywood with incredible attention to period detail.',
      comments: 'The ending is cathartic. Leo and Brad have amazing chemistry.',
      director: 'Quentin Tarantino',
      genre: ['Drama', 'Comedy', 'Thriller'],
      runtime: '161 min'
    },
    {
      title: 'Rogue One',
      year: 2016,
      rating: 4.5,
      review: 'A gritty war movie disguised as a Star Wars film. The third act is pure cinema.',
      comments: 'The Vader hallway scene alone makes it worth watching.',
      director: 'Gareth Edwards',
      genre: ['Sci-Fi', 'Action', 'Drama'],
      runtime: '133 min'
    },
    {
      title: 'The Martian',
      year: 2015,
      rating: 4.5,
      review: 'A brilliant blend of hard science and humor about human resilience and ingenuity.',
      comments: 'Matt Damon carries the whole movie. The science is surprisingly accurate.',
      director: 'Ridley Scott',
      genre: ['Sci-Fi', 'Drama', 'Adventure'],
      runtime: '144 min'
    },
    {
      title: '2001: A Space Odyssey',
      year: 1968,
      rating: 5.0,
      review: 'A transcendent masterpiece that redefined science fiction cinema and visual storytelling.',
      comments: 'The monolith sequence is pure cinema. HAL 9000 is still terrifying.',
      director: 'Stanley Kubrick',
      genre: ['Sci-Fi', 'Drama', 'Mystery'],
      runtime: '149 min'
    },
    {
      title: 'Blade Runner',
      year: 1982,
      rating: 5.0,
      review: 'A visually stunning neo-noir that explores what it means to be human in a dystopian future.',
      comments: 'The Final Cut is the definitive version. Rutger Hauer\'s monologue is perfect.',
      director: 'Ridley Scott',
      genre: ['Sci-Fi', 'Thriller', 'Drama'],
      runtime: '117 min'
    },
    {
      title: 'Arrival',
      year: 2016,
      rating: 4.5,
      review: 'A thoughtful and emotionally resonant sci-fi that explores communication, time, and human connection.',
      comments: 'Amy Adams gives a phenomenal performance. The linguistics angle is fascinating.',
      director: 'Denis Villeneuve',
      genre: ['Sci-Fi', 'Drama', 'Mystery'],
      runtime: '116 min'
    },
    {
      title: 'Dune',
      year: 2021,
      rating: 4.5,
      review: 'A visually stunning and faithful adaptation that finally does justice to Herbert\'s masterpiece.',
      comments: 'The world-building is incredible. Hans Zimmer\'s score is otherworldly.',
      director: 'Denis Villeneuve',
      genre: ['Sci-Fi', 'Drama', 'Adventure'],
      runtime: '155 min'
    },
    {
      title: 'Dune: Part Two',
      year: 2024,
      rating: 5.0,
      review: 'A perfect conclusion that delivers on the promise of Part One with epic scope and emotional depth.',
      comments: 'The sandworm sequences are breathtaking. Timothée Chalamet owns the role of Paul.',
      director: 'Denis Villeneuve',
      genre: ['Sci-Fi', 'Drama', 'Adventure'],
      runtime: '166 min'
    },
    {
      title: 'Alien',
      year: 1979,
      rating: 5.0,
      review: 'A masterclass in atmospheric horror and sci-fi that redefined both genres.',
      comments: 'Ripley is the ultimate final girl. The practical effects still hold up perfectly.',
      director: 'Ridley Scott',
      genre: ['Sci-Fi', 'Horror', 'Thriller'],
      runtime: '117 min'
    }
  ];

  const tvShows: MediaItem[] = [
    {
      title: 'Breaking Bad',
      year: 2008,
      rating: 5.0,
      review: 'A masterclass in character development and storytelling.',
      comments: 'Walter White\'s transformation is one of the greatest arcs in TV history.',
      creator: 'Vince Gilligan',
      genre: ['Drama', 'Crime', 'Thriller'],
      seasons: 5
    },
    {
      title: 'Star Wars: The Clone Wars',
      year: 2008,
      rating: 5.0,
      review: 'A masterful animated series that deepens the Star Wars mythology and delivers some of the best storytelling in the franchise.',
      comments: 'The character development and world-building are incredible. Ahsoka\'s journey is particularly compelling.',
      creator: 'George Lucas & Dave Filoni',
      genre: ['Animation', 'Sci-Fi', 'Adventure', 'Action'],
      seasons: 7
    },
    {
      title: 'Game of Thrones',
      year: 2011,
      rating: 4.5,
      review: 'Epic fantasy that redefined television production values.',
      comments: 'The first 6 seasons are perfect. We don\'t talk about the rest.',
      creator: 'David Benioff & D.B. Weiss',
      genre: ['Fantasy', 'Drama', 'Adventure'],
      seasons: 8
    },
    {
      title: 'The Office',
      year: 2005,
      rating: 4.5,
      review: 'The gold standard for workplace comedy.',
      comments: 'Michael Scott is both cringe-worthy and endearing.',
      creator: 'Greg Daniels',
      genre: ['Comedy', 'Mockumentary'],
      seasons: 9
    },
    {
      title: 'Parks and Recreation',
      year: 2009,
      rating: 4.5,
      review: 'Heartwarming comedy that celebrates community and friendship.',
      comments: 'Leslie Knope is the most optimistic character ever created.',
      creator: 'Greg Daniels & Michael Schur',
      genre: ['Comedy', 'Mockumentary'],
      seasons: 7
    },
    {
      title: 'The Mandalorian',
      year: 2019,
      rating: 4.0,
      review: 'A return to the heart and soul of Star Wars.',
      comments: 'Baby Yoda stole the show, but the storytelling is solid.',
      creator: 'Jon Favreau',
      genre: ['Sci-Fi', 'Adventure', 'Western'],
      seasons: 3
    },
    {
      title: 'Star Wars Rebels',
      year: 2014,
      rating: 4.5,
      review: 'A brilliant animated series that bridges the prequel and original trilogies with compelling characters and stories.',
      comments: 'Kanan and Ezra\'s relationship is beautifully developed. The finale is absolutely perfect.',
      creator: 'Simon Kinberg & Dave Filoni',
      genre: ['Animation', 'Sci-Fi', 'Adventure', 'Action'],
      seasons: 4
    },
    {
      title: 'Arrested Development',
      year: 2003,
      rating: 4.5,
      review: 'The gold standard for smart, layered comedy with incredible rewatch value.',
      comments: 'The first three seasons are comedy perfection. Every line is a setup for a later payoff.',
      creator: 'Mitchell Hurwitz',
      genre: ['Comedy', 'Mockumentary'],
      seasons: 5
    },
    {
      title: 'Chernobyl',
      year: 2019,
      rating: 5.0,
      review: 'A harrowing and masterfully crafted miniseries about one of history\'s worst nuclear disasters.',
      comments: 'The attention to detail and historical accuracy is incredible. Haunting and unforgettable.',
      creator: 'Craig Mazin',
      genre: ['Drama', 'History', 'Thriller'],
      seasons: 1
    },
    {
      title: 'Community',
      year: 2009,
      rating: 4.5,
      review: 'A brilliantly meta comedy that constantly reinvents itself while maintaining heart and humor.',
      comments: 'Six seasons and a movie! The paintball episodes are legendary.',
      creator: 'Dan Harmon',
      genre: ['Comedy', 'Mockumentary'],
      seasons: 6
    },
    {
      title: 'Brooklyn Nine-Nine',
      year: 2013,
      rating: 4.5,
      review: 'A perfect blend of workplace comedy and police procedural with an incredible ensemble cast.',
      comments: 'Jake and Holt\'s relationship is comedy gold. Noice!',
      creator: 'Dan Goor & Michael Schur',
      genre: ['Comedy', 'Crime', 'Police Procedural'],
      seasons: 8
    },
    {
      title: 'Andor',
      year: 2022,
      rating: 5.0,
      review: 'A mature, grounded Star Wars series that explores the birth of rebellion with incredible depth and nuance.',
      comments: 'Finally, Star Wars for adults. The writing and character development are exceptional.',
      creator: 'Tony Gilroy',
      genre: ['Sci-Fi', 'Drama', 'Thriller'],
      seasons: 2
    }
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-lg ${
              star <= rating 
                ? 'text-yellow-400' 
                : 'text-gray-300'
            }`}
          >
            ★
          </span>
        ))}
        <span className="text-sm text-[var(--accent)] ml-2">
          {rating}/5
        </span>
      </div>
    );
  };

  const renderMediaCard = (item: MediaItem, index: number) => (
    <motion.div
      key={item.title}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-[var(--background)] rounded-xl p-6 border border-[var(--accent)] hover:border-[var(--highlight)] transition-all duration-300"
    >
      <div className="space-y-4">
        {/* Header */}
        <div>
          <h3 className="text-xl font-bold text-[var(--foreground)] mb-1">
            {item.title}
          </h3>
          <div className="flex items-center gap-4 text-sm text-[var(--accent)]">
            <span>{item.year}</span>
            {item.director && <span>Dir. {item.director}</span>}
            {item.creator && <span>Created by {item.creator}</span>}
            {item.runtime && <span>{item.runtime}</span>}
            {item.seasons && <span>{item.seasons} season{item.seasons > 1 ? 's' : ''}</span>}
          </div>
        </div>

        {/* Rating */}
        {renderStars(item.rating)}


        {/* Review */}
        <div>
          <p className="text-[var(--foreground)] font-medium mb-2">Review:</p>
          <p className="text-[var(--foreground)] text-sm leading-relaxed">
            {item.review}
          </p>
        </div>

        {/* Comments */}
        {item.comments && (
          <div>
            <p className="text-[var(--foreground)] font-medium mb-2">Comments:</p>
            <p className="text-[var(--accent)] text-sm italic leading-relaxed">
              {item.comments}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--card)] to-transparent opacity-30" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-7xl font-black mb-4 md:mb-6 text-[var(--foreground)] tracking-tight"
          >
            Movies & Shows
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-[var(--accent)] font-serif italic px-4"
          >
            A curated collection with ratings, reviews, and thoughts.
          </motion.p>
        </div>
      </motion.section>

      {/* Movie Posters Carousel */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="py-16 bg-gradient-to-b from-[var(--card)] to-[var(--background)]"
      >
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[var(--foreground)] mb-12 text-center flex items-center justify-center gap-3">
            <span className="w-12 h-1 bg-[var(--highlight)] rounded-full"></span>
            Classic Cinema
            <span className="w-12 h-1 bg-[var(--highlight)] rounded-full"></span>
          </h2>
          
          <div className="h-80 md:h-96">
            {isLoading ? (
              <div className="flex justify-center items-center h-full">
                <div className="text-[var(--accent)] text-lg">Loading classic movies...</div>
              </div>
            ) : moviePosters.length > 0 ? (
              <div className="relative h-full overflow-hidden">
                <div className="flex justify-center items-center gap-2 md:gap-4 h-full px-4">
                  {/* Show 7 posters at once on large screens, 5 on medium, 3 on small */}
                  {[-3, -2, -1, 0, 1, 2, 3].map((offset) => {
                    const index = (currentPosterIndex + offset + moviePosters.length) % moviePosters.length;
                    const poster = moviePosters[index];
                    const isCenter = offset === 0;
                    const isNear = Math.abs(offset) <= 1;
                    
                    return (
                      <motion.div
                        key={`${poster.id}-${offset}`}
                        initial={{ opacity: 0, scale: 0.8, x: offset * 50 }}
                        animate={{ 
                          opacity: isCenter ? 1 : isNear ? 0.7 : 0.3,
                          scale: isCenter ? 1 : isNear ? 0.85 : 0.7,
                          x: 0
                        }}
                        transition={{ duration: 0.5 }}
                        className={`relative cursor-pointer transition-all duration-300 ${
                          isCenter ? 'z-20' : 'z-10'
                        }`}
                        onClick={() => setCurrentPosterIndex(index)}
                      >
                        <div className={`rounded-lg overflow-hidden shadow-2xl border-4 transition-all duration-300 ${
                          isCenter 
                            ? 'w-48 md:w-56 h-72 md:h-80 border-[var(--highlight)]' 
                            : 'w-32 md:w-40 h-48 md:h-56 border-[var(--accent)] opacity-60'
                        }`}>
                          <img
                            src={poster.imageUrl}
                            alt={poster.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
                
                {/* Navigation Dots */}
                <div className="flex justify-center mt-6 space-x-2">
                  {moviePosters.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPosterIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentPosterIndex 
                          ? 'bg-[var(--highlight)] w-6' 
                          : 'bg-[var(--accent)] opacity-50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex justify-center items-center h-full">
                <div className="text-[var(--accent)] text-lg">No movies available</div>
              </div>
            )}
          </div>
        </div>
      </motion.section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-4 py-12 space-y-12">
        {/* Movies Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-8"
        >
          <h2 className="text-3xl font-bold text-[var(--foreground)] flex items-center gap-3">
            <span className="w-12 h-1 bg-[var(--highlight)] rounded-full"></span>
            Movies
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {movies.map((movie, index) => renderMediaCard(movie, index))}
          </div>
        </motion.div>

        {/* TV Shows Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-8"
        >
          <h2 className="text-3xl font-bold text-[var(--foreground)] flex items-center gap-3">
            <span className="w-12 h-1 bg-[var(--highlight)] rounded-full"></span>
            TV Shows
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tvShows.map((show, index) => renderMediaCard(show, index))}
          </div>
        </motion.div>
      </section>
    </div>
  );
} 