"use client";

import React from "react";
import Image from "next/image";

const apps = [
  {
    title: "Code Explainer",
    subtitle: "Paste code snippets, get plain explanations",
    description: "Great for vibe coders and learning devs. Upload code snippets and get detailed explanations, best practices, and optimization suggestions powered by AI.",
    favicon: "/appfavicons/code-explainer favicon.png",
    link: "https://code-explainer-nu.vercel.app",
  },
  {
    title: "Color Forge",
    subtitle: "AI powered color palette generator",
    description: "AI-powered color palette generator with poline playground. Create beautiful color palettes with AI assistance and export color schemes for your projects.",
    favicon: "/appfavicons/color-forge favicon.png",
    link: "https://color-forge-rust.vercel.app",
  },
  {
    title: "Digital Dungeonmaster",
    subtitle: "Intelligent tabletop RPG platform",
    description: "An intelligent platform that brings the magic of tabletop RPGs into the digital age, powered by advanced language models.",
    favicon: "/appfavicons/dungeonmaster-favicon.png",
    link: "https://digital-dungeonmaster.vercel.app",
  },
  {
    title: "Echo Ideas",
    subtitle: "Generate ideas for new Echo Apps",
    description: "Capture and develop ideas with AI-powered brainstorming. Generate ideas for new Merit System's Echo Apps and turn rough concepts into actionable plans.",
    favicon: "/appfavicons/echo-ideas favicon.png",
    link: "https://echo-ideas-nu.vercel.app",
  },
  {
    title: "ELA Tutor Chat",
    subtitle: "High school ELA and literature tutor",
    description: "Get personalized help with reading comprehension, essay writing, grammar, and literature analysis. Perfect for high school students looking to improve their English skills.",
    favicon: "/appfavicons/ela-tutor-chat.png",
    link: "https://www.litparlor.com/chat",
  },
  {
    title: "Fuzzy Pancake",
    subtitle: "Pic stitch with nano banana",
    description: "Creative image stitching tool with unique nano banana functionality. Combine and manipulate images in unexpected ways.",
    favicon: "/appfavicons/fuzzy-pancake favicon.png",
    link: "https://fuzzy-pancake-seven.vercel.app",
  },
  {
    title: "Hey Barkeep",
    subtitle: "Virtual mixologist",
    description: "AI bartender that creates custom cocktail recipes based on available ingredients and taste preferences. Your personal virtual mixologist.",
    favicon: "/appfavicons/hey-bartender favicon.png",
    link: "https://hey-barkeep.vercel.app",
  },
  {
    title: "Interstellar Weather Bureau",
    subtitle: "AI-powered cosmic weather data",
    description: "Get weather and astronomical data for celestial bodies across the solar system. Features NASA's Astronomy Picture of the Day and detailed environmental data for planets and moons.",
    favicon: "/IWB-favicon.png",
    link: "https://iwb-one.vercel.app/",
  },
  {
    title: "History Tutor Chat",
    subtitle: "AI-powered historical education",
    description: "Explore history through interactive conversations. Ask questions about historical events, figures, and periods to deepen your understanding of the past.",
    favicon: "/appfavicons/litparlorfavicon copy.png",
    link: "https://historytutor.litparlor.com",
  },
  {
    title: "NPC Chat",
    subtitle: "Receive life advice from favorite characters",
    description: "Chat with AI-powered NPCs and receive life advice from your favorite characters. Be warned, some of these individuals have not made good life choices.",
    favicon: "/appfavicons/npc-chat favicon.png",
    link: "https://npc-chat-bay.vercel.app",
  },
  {
    title: "Shirt Slop",
    subtitle: "from idea to shirt before you can say SLOP",
    description: "Custom t-shirt design platform powered by AI. Turn your wildest ideas into wearable art in minutes.",
    favicon: "/appfavicons/shirtslop_logo.png",
    link: "https://www.shirtslop.com/",
  },
  {
    title: "Yes Chef",
    subtitle: "Take pics, get recipe suggestions",
    description: "Take pics or type in what you have lying around the pantry/fridge, get recipe suggestions and alterations using AI technology.",
    favicon: "/appfavicons/yes-chef favicon.png",
    link: "https://yeschef-carrot.vercel.app",
  },
  {
    title: "Echo App Directory",
    subtitle: "Discover apps and identify gaps",
    description: "Intelligent insights into the Merit Echo platform. Browse existing Echo Apps and receive AI-powered analysis identifying gaps and opportunities for new applications. Works alongside Echo Ideas for strategic app development.",
    favicon: "/echo-directoryfavicon.png",
    link: "https://echo-directory.vercel.app",
  },
  {
    title: "Case Study",
    subtitle: "Law school companion and study aide",
    description: "AI-powered legal study assistant for law students. Analyze legal cases, break down complex precedents, and master case law. Features flashcards, quizzes, and intelligent guidance to help you succeed in law school.",
    favicon: "/casestudy-favicon.png",
    link: "https://case-study-rho-plum.vercel.app",
  },
  {
    title: "Big Corp Inc",
    subtitle: "Maximizing shareholder value",
    description: "Driving unprecedented ROI through strategic growth initiatives and operational excellence. We're laser-focused on delivering sustainable value creation while optimizing stakeholder returns at every touchpoint. Moving Forward, Together, Towards More Forward™",
    favicon: "/BigCorpInc Favicon.png",
    link: "https://bigcorpinc.company",
  },
  {
    title: "The Forge",
    subtitle: "3D print exploration platform",
    description: "Explore the world of 3D printing with curated models, materials, and techniques. Browse designs, learn about printing technologies, and discover possibilities. Dropshipping services coming soon.",
    favicon: "/Forge-Favicon.png",
    link: "https://the-forge-khaki.vercel.app",
  },
];

export default function Apps() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[var(--foreground)]">
            My Apps
          </h1>
          <p className="text-xl text-[var(--accent)] max-w-2xl mx-auto">
            A collection of AI-powered tools and applications I've built to solve everyday problems and spark creativity.
          </p>
        </div>
      </section>

      {/* Apps Grid */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {apps.map((app, index) => {
            const CardContent = (
              <div className="h-full flex flex-col">
                <div className="flex items-center mb-4">
                  <div className="mr-4 flex-shrink-0">
                    <Image
                      src={app.favicon}
                      alt={`${app.title} favicon`}
                      width={64}
                      height={64}
                      className="rounded-lg"
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <h3 className="text-xl font-bold text-[var(--foreground)] leading-tight">
                      {app.title}
                    </h3>
                    <p className="text-sm font-medium text-[var(--accent)] leading-tight">
                      {app.subtitle}
                    </p>
                  </div>
                </div>
                <p className="text-sm leading-[1.6] text-[var(--foreground)] flex-1">
                  {app.description}
                </p>
              </div>
            );

            return (
              <div
                key={index}
                className="rounded-2xl border-2 border-[var(--accent)] bg-[var(--card)] p-6 shadow-md hover:border-[var(--highlight)] transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                {app.link ? (
                  <a
                    href={app.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full cursor-pointer"
                  >
                    {CardContent}
                  </a>
                ) : (
                  CardContent
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}