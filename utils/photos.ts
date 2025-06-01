interface Photo {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  width: number;
  height: number;
}

// This is the same photos array from your photos page
const photos: Photo[] = [
  {
    id: 1,
    title: "Wolff's Cabin",
    category: "Nature",
    description: "A peaceful retreat in the wilderness, smoke rising over the water.",
    image: "/photos/cabin.jpg",
    width: 3024,
    height: 4032
  },
  {
    id: 2,
    title: "Behind Enemy Lines",
    category: "Friends",
    description: "Some Buckeyes out in enemy territory.",
    image: "/photos/ND.jpg",
    width: 3024,
    height: 4032
  },
  {
    id: 3,
    title: "Willys",
    category: "Nature",
    description: "The 1950's Willys Jeep, a staple of the cabin.",
    image: "/photos/jeep.jpg",
    width: 3024,
    height: 4032
  },
  {
    id: 4,
    title: "A Winter Storm",
    category: "Pets",
    description: "Enjoying the snow in the foothills.",
    image: "/photos/storm.jpg",
    width: 3024,
    height: 4032
  },
  {
    id: 5,
    title: "Grandma Rosie",
    category: "Memoriam",
    description: "Always getting down and playing with us kids. Love and miss you, Grandma Rosie.",
    image: "/photos/rosie.jpg",
    width: 3024,
    height: 4032
  },
  {
    id: 6,
    title: "The Orioles",
    category: "Family",
    description: "Pappy and Dad coaching the Orioles T-Ball team, with some help from Willy and Ryan.",
    image: "/photos/orioles.jpg",
    width: 4032,
    height: 3024
  },
  {
    id: 7,
    title: "Thanksgiving Dinner 2024",
    category: "Food",
    description: "Traditional, Irish Thanksgiving dinner could be the best meal of the year.",
    image: "/photos/thanksgiving.jpg",
    width: 3024,
    height: 4032
  },
  {
    id: 8,
    title: "SCUBA Diving",
    category: "Nature",
    description: "Diving off the coast of Southern France, the Mediteranean Sea.",
    image: "/photos/med.jpg",
    width: 4032,
    height: 3024
  }
];

export function getFeaturedPhotos(): Photo[] {
  // Separate horizontal and vertical photos
  const horizontalPhotos = photos.filter(photo => photo.width > photo.height);
  const verticalPhotos = photos.filter(photo => photo.width <= photo.height);
  
  // Randomly decide whether to use horizontal or vertical photos
  const useHorizontal = Math.random() > 0.5 && horizontalPhotos.length >= 2 && verticalPhotos.length >= 2;
  
  if (useHorizontal) {
    // Get 2 random horizontal photos and 2 vertical photos
    const shuffledHorizontal = [...horizontalPhotos].sort(() => Math.random() - 0.5).slice(0, 2);
    const shuffledVertical = [...verticalPhotos].sort(() => Math.random() - 0.5).slice(0, 2);
    // Return in specific order: horizontal, vertical, vertical, horizontal
    // This places horizontal photos in opposite corners
    return [shuffledHorizontal[0], shuffledVertical[0], shuffledVertical[1], shuffledHorizontal[1]];
  } else {
    // Get 3 random vertical photos
    const shuffledVertical = [...verticalPhotos].sort(() => Math.random() - 0.5);
    return shuffledVertical.slice(0, 3);
  }
}

export default photos; 