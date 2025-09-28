"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

export default function InfiniteMovingCardsDemo() {
  return (
    <div className="h-[20rem] rounded-md flex flex-col antialiased bg-[var(--background)] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
        pauseOnHover={true}
      />
    </div>
  );
}

const testimonials = [
  {
    title: "App 1",
    subtitle: "",
    description: "",
    favicon: "/appfavicons/code-explainer favicon.png",
  },
  {
    title: "App 2",
    subtitle: "",
    description: "",
    favicon: "/appfavicons/color-forge favicon.png",
  },
  {
    title: "App 3",
    subtitle: "",
    description: "",
    favicon: "/appfavicons/dungeonmaster-favicon.png",
  },
  {
    title: "App 4",
    subtitle: "",
    description: "",
    favicon: "/appfavicons/echo-ideas favicon.png",
  },
  {
    title: "App 5",
    subtitle: "",
    description: "",
    favicon: "/appfavicons/ela-tutor-chat.png",
  },
  {
    title: "App 6",
    subtitle: "",
    description: "",
    favicon: "/appfavicons/fuzzy-pancake favicon.png",
  },
  {
    title: "App 7",
    subtitle: "",
    description: "",
    favicon: "/appfavicons/hey-bartender favicon.png",
  },
  {
    title: "App 8",
    subtitle: "",
    description: "",
    favicon: "/appfavicons/litparlorfavicon copy.png",
  },
  {
    title: "App 9",
    subtitle: "",
    description: "",
    favicon: "/appfavicons/npc-chat favicon.png",
  },
  {
    title: "App 10",
    subtitle: "",
    description: "",
    favicon: "/appfavicons/shirtslop_logo.png",
  },
  {
    title: "App 11",
    subtitle: "",
    description: "",
    favicon: "/appfavicons/yes-chef favicon.png",
  },
];