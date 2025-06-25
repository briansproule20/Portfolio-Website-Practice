export interface Photo {
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
    description: "Buckeyes out in enemy territory.",
    image: "/photos/ND.jpg",
    width: 3024,
    height: 4032
  },
  {
    id: 3,
    title: "Willys",
    category: "Nature",
    description: "The 1950's Willys Jeep, a staple of the cabin, with Bear trotting up to the photographer for some attention.",
    image: "/photos/jeep.jpg",
    width: 3024,
    height: 4032
  },
  {
    id: 4,
    title: "A Winter Storm",
    category: "Pets",
    description: "Enjoying the snow in the foothills of Western Pennsylvania.",
    image: "/photos/storm.jpg",
    width: 3024,
    height: 4032
  },
  {
    id: 5,
    title: "Grandma Rosie",
    category: "Memoriam",
    description: "Always getting down and playing with us kids. Love and miss you, Grandma Rosie.",
    image: "/photos/rosie.JPG",
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
    description: "Traditional, Irish Thanksgiving dinner could be my favorite meal of the year.",
    image: "/photos/thanksgiving.jpg",
    width: 3024,
    height: 4032
  },
  {
    id: 8,
    title: "SCUBA Diving",
    category: "Nature",
    description: "Diving off the coast of Southern France, Mediteranean Sea.",
    image: "/photos/med.JPG",
    width: 4032,
    height: 3024
  },
  {
    id: 9,
    title: "Lauterbrunnen",
    category: "Friends",
    description: "Exploring the Lauterbrunnen Valley in Switzerland.",
    image: "/photos/Switz.JPG",
    width: 3024,
    height: 4032,
  },
  {
    id: 10,
    title: "Buckeyes",
    category: "Friends",
    description: "Celebrating graduation in the Horseshoe.",
    image: "/photos/Bucks.JPG",
    width: 4032,
    height: 3024,
  },
  {
    id: 11,
    title: "A Day in Wrigleyville",
    category: "Friends",
    description: "Out and about in Wrigleyville, Chicago for Mass' birthday and the ZBB Concert.",
    image: "/photos/Wrigley.JPG",
    width: 3024,
    height: 4032,
  },
  {
    id: 12,
    title: "Rusty on Dogwood",
    category: "Pets",
    description: "Rusty out in the yard, saying goodbye on my first day of second grade.",
    image: "/photos/rusty.JPG",
    width: 4032,
    height: 3024,
  },
  {
    id: 13,
    title: "Aunt Tine and Uncle Louis",
    category: "Family",
    description: "Visiting the Princess Diana Memorial Fountain in London.",
    image: "/photos/Diana.JPG",
    width: 4032,
    height: 3024,
  },
  {
    id: 14,
    title: "William Penn's Woods in Winter",
    category: "Nature",
    description: "At the cabin in the aftermath of of a mid-winter snowstorm.",
    image: "/photos/Woods.JPG",
    width: 4032,
    height: 3024,
  },
  {
    id: 15,
    title: "Baby Sister Lucy",
    category: "Family",
    description: "Our final foster baby, Lucy, who we took care of at the beginning of the pandemic.",
    image: "/photos/Lucy.JPG",
    width: 3024,
    height: 4032,
  },
  {
    id: 16,
    title: "Das Boot",
    category: "Family",
    description: "Will and I working through our boots at Das Superkuchen while visiting Ry in San Francisco.",
    image: "/photos/Boot.JPG",
    width: 3024,
    height: 4032,
  },
  {
    id: 17,
    title: "Tarpon River Rats",
    category: "Family",
    description: "Dinner at Coconuts, missing baby Theo!",
    image: "/photos/Critters.JPG",
    width: 3024,
    height: 4032,
  },
  {
    id: 18,
    title: "Cornhole Champs",
    category: "Friends",
    description: "Dawson and I winning the cornhole tournament at Theta, Ohio State University.",
    image: "/photos/Champs.JPG",
    width: 3024,
    height: 4032,
  },
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