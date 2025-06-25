import { NextRequest, NextResponse } from 'next/server';

// Collection of quotes from the three franchises
const quotes = {
  lotr: [
    "Not all those who wander are lost.",
    "Even the smallest person can change the course of the future.",
    "All we have to decide is what to do with the time that is given us.",
    "I will not say: do not weep; for not all tears are an evil.",
    "There is some good in this world, and it's worth fighting for.",
    "Courage is found in unlikely places.",
    "The road goes ever on and on.",
    "A wizard is never late, nor is he early. He arrives precisely when he means to."
  ],
  starWars: [
    "May the Force be with you.",
    "Do or do not, there is no try.",
    "The Force will be with you, always.",
    "Fear leads to anger, anger leads to hate, hate leads to suffering.",
    "In my experience, there's no such thing as luck.",
    "The Force is strong with this one.",
    "Help me, Obi-Wan Kenobi. You're my only hope.",
    "I find your lack of faith disturbing."
  ],
  harryPotter: [
    "It is our choices that show what we truly are, far more than our abilities.",
    "Happiness can be found even in the darkest of times, if one only remembers to turn on the light.",
    "We've all got both light and dark inside us.",
    "It takes a great deal of bravery to stand up to our enemies, but just as much to stand up to our friends.",
    "Working hard is important, but there's something that matters even more: believing in yourself.",
    "The ones that love us never really leave us.",
    "Fear of a name increases fear of the thing itself.",
    "After all this time? Always."
  ],
  redRising: [
    "I would have lived in peace. But my enemies brought me war.",
    "I am the Reaper and death is my shadow.",
    "I am Cassius Bellona, son of Tiberius, son of Julia, brother of Darrow, Morning Knight of the Solar Republic, and my honor remains.",
    "The tragedy of the gifted is the belief they are entitled to greatness, Lysander. As a human, you are entitled only to death.",
    "Until then, endure, my love. Endure.",
    "Mauler, brawler, legacy hauler!",
    "There is no greater plague to an introvert than the extrovert.",
    "Per Aspera Ad Astra",
  ],
  witcher: [
    "Hmm.",
    "Fuck.", 
    "Wind's howling.",
    "Evil is evil. Lesser, greater, middling, it's all the same.",
    "If I'm to choose between one evil and another, I'd rather not choose at all.",
    "People like to invent monsters and monstrosities. Then they seem less monstrous themselves.",
    "Destiny is just the embodiment of the soul's desire to grow.",
    "Every legend, every fairy tale has a grain of truth to it.",
    "I'm not a hero. I'm a monster."
  ]
};

function getRandomQuote(): { quote: string; source: string } {
  const franchises = Object.keys(quotes) as Array<keyof typeof quotes>;
  const randomFranchise = franchises[Math.floor(Math.random() * franchises.length)];
  const franchiseQuotes = quotes[randomFranchise];
  const randomQuote = franchiseQuotes[Math.floor(Math.random() * franchiseQuotes.length)];
  
  const sourceMap = {
    lotr: "The Lord of the Rings",
    starWars: "Star Wars",
    harryPotter: "Harry Potter",
    redRising: "Red Rising",
    witcher: "The Witcher"
  };
  
  return {
    quote: randomQuote,
    source: sourceMap[randomFranchise]
  };
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();
    
    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }
    
    // Add a small delay to make it feel more natural
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
    
    const response = getRandomQuote();
    
    return NextResponse.json({
      response: response.quote,
      source: response.source,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Chat API is running',
    availableQuotes: Object.keys(quotes).reduce((acc, key) => {
      acc[key] = quotes[key as keyof typeof quotes].length;
      return acc;
    }, {} as Record<string, number>)
  });
} 