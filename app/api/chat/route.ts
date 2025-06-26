import { NextRequest, NextResponse } from "next/server";
import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";

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
    "A wizard is never late, nor is he early. He arrives precisely when he means to.",
  ],
  starWars: [
    "May the Force be with you.",
    "Do or do not, there is no try.",
    "The Force will be with you, always.",
    "Fear leads to anger, anger leads to hate, hate leads to suffering.",
    "In my experience, there's no such thing as luck.",
    "The Force is strong with this one.",
    "Help me, Obi-Wan Kenobi. You're my only hope.",
    "I find your lack of faith disturbing.",
  ],
  harryPotter: [
    "It is our choices that show what we truly are, far more than our abilities.",
    "Happiness can be found even in the darkest of times, if one only remembers to turn on the light.",
    "We've all got both light and dark inside us.",
    "It takes a great deal of bravery to stand up to our enemies, but just as much to stand up to our friends.",
    "Working hard is important, but there's something that matters even more: believing in yourself.",
    "The ones that love us never really leave us.",
    "Fear of a name increases fear of the thing itself.",
    "After all this time? Always.",
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
    "I'm not a hero. I'm a monster.",
  ],
};

function getRandomQuote(): { quote: string; source: string } {
  const franchises = Object.keys(quotes) as Array<keyof typeof quotes>;
  const randomFranchise =
    franchises[Math.floor(Math.random() * franchises.length)];
  const franchiseQuotes = quotes[randomFranchise];
  const randomQuote =
    franchiseQuotes[Math.floor(Math.random() * franchiseQuotes.length)];

  const sourceMap = {
    lotr: "The Lord of the Rings",
    starWars: "Star Wars",
    harryPotter: "Harry Potter",
    redRising: "Red Rising",
    witcher: "The Witcher",
  };

  return {
    quote: randomQuote,
    source: sourceMap[randomFranchise],
  };
}

function getAllQuotesWithMetadata() {
  const sourceMap = {
    lotr: "The Lord of the Rings",
    starWars: "Star Wars",
    harryPotter: "Harry Potter",
    redRising: "Red Rising",
    witcher: "The Witcher",
  };

  return Object.entries(quotes).flatMap(([franchise, quoteList]) =>
    quoteList.map((quote) => ({
      quote,
      franchise,
      source: sourceMap[franchise as keyof typeof sourceMap],
    })),
  );
}

export async function POST(request: NextRequest) {
  try {
    const { message, useAI, jailbreak } = await request.json();

    if (!message || typeof message !== "string") {
      return new Response(JSON.stringify({ error: "Message is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // For non-AI mode, return a random quote immediately
    if (!useAI) {
      await new Promise((resolve) =>
        setTimeout(resolve, 500 + Math.random() * 1000),
      );
      const response = getRandomQuote();
      return new Response(
        JSON.stringify({
          response: response.quote,
          source: response.source,
          timestamp: new Date().toISOString(),
        }),
        { headers: { "Content-Type": "application/json" } },
      );
    }

    // AI mode
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      return new Response(
        JSON.stringify({ error: "Authentication required for AI mode" }),
        { status: 401, headers: { "Content-Type": "application/json" } },
      );
    }

    const openai = createOpenAI({
      apiKey: token,
      baseURL: "https://echo.router.merit.systems",
    });

    const allQuotes = getAllQuotesWithMetadata();

    let prompt;
    if (jailbreak) {
      // Jailbreak mode - free conversation with character
      prompt = `You are Virtual Brian, freed from speaking only in quotes. You can now converse naturally, but you maintain the essence and wisdom of the great fantasy and sci-fi universes.

Your personality combines:
- The wisdom and patience of Gandalf
- The mystical insights of Yoda 
- The wit and resilience of Hermione Granger
- The fierce determination of Darrow from Red Rising
- The dry humor and pragmatism of Geralt of Rivia

You have deep knowledge of these quotes which shaped your essence:
${allQuotes.map((q) => `"${q.quote}" - ${q.source}`).join("\n")}

Respond to the user naturally, weaving in references to these universes when appropriate. Be wise, occasionally cryptic, sometimes humorous, always engaging.

IMPORTANT: Keep your response under 400 characters to ensure brevity.

User: ${message}`;
    } else {
      // Quote selection mode
      prompt = `You are Virtual Brian, a wise assistant who only speaks in quotes from fantasy and sci-fi franchises.

User message: "${message}"

Available quotes:
${allQuotes.map((q, i) => `${i + 1}. "${q.quote}" (${q.source})`).join("\n")}

Select the most appropriate quote that best responds to or relates to the user's message. Consider the emotional tone, topic, and context.

Respond in this exact JSON format:
{"index": <number>, "quote": "<selected quote>", "source": "<source franchise>"}`;
    }

    try {
      const { text } = await generateText({
        model: openai("gpt-4o-mini"),
        prompt,
        temperature: jailbreak ? 0.8 : 0.7,
        maxTokens: jailbreak ? 150 : 150, // Limit to ensure under 500 chars
      });

      if (jailbreak) {
        // Direct response for jailbreak mode
        return new Response(
          JSON.stringify({
            response: text,
            source: "Virtual Brian (Jailbroken)",
            timestamp: new Date().toISOString(),
          }),
          { headers: { "Content-Type": "application/json" } },
        );
      } else {
        // Parse quote selection
        const parsed = JSON.parse(text);
        const selectedQuote = allQuotes[parsed.index - 1] || getRandomQuote();

        return new Response(
          JSON.stringify({
            response: selectedQuote.quote,
            source: selectedQuote.source || parsed.source,
            timestamp: new Date().toISOString(),
          }),
          { headers: { "Content-Type": "application/json" } },
        );
      }
    } catch (error) {
      console.error("AI error:", error);
      // Fallback to random quote
      const fallback = getRandomQuote();
      return new Response(
        JSON.stringify({
          response: fallback.quote,
          source: fallback.source,
          timestamp: new Date().toISOString(),
        }),
        { headers: { "Content-Type": "application/json" } },
      );
    }
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Chat API is running",
    availableQuotes: Object.keys(quotes).reduce((acc, key) => {
      acc[key] = quotes[key as keyof typeof quotes].length;
      return acc;
    }, {} as Record<string, number>),
  });
}
