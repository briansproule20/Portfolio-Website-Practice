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
  }
];

export function getFeaturedPhotos(): Photo[] {
  // Randomly select 3 unique photos
  const shuffled = [...photos].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3);
}

export type { Photo }; 