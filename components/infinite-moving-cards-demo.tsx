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
    favicon: "",
  },
  {
    title: "App 2",
    subtitle: "",
    description: "",
    favicon: "",
  },
  {
    title: "App 3",
    subtitle: "",
    description: "",
    favicon: "",
  },
  {
    title: "App 4",
    subtitle: "",
    description: "",
    favicon: "",
  },
  {
    title: "App 5",
    subtitle: "",
    description: "",
    favicon: "",
  },
  {
    title: "App 6",
    subtitle: "",
    description: "",
    favicon: "",
  },
  {
    title: "App 7",
    subtitle: "",
    description: "",
    favicon: "",
  },
  {
    title: "App 8",
    subtitle: "",
    description: "",
    favicon: "",
  },
  {
    title: "App 9",
    subtitle: "",
    description: "",
    favicon: "",
  },
  {
    title: "App 10",
    subtitle: "",
    description: "",
    favicon: "",
  },
  {
    title: "App 11",
    subtitle: "",
    description: "",
    favicon: "",
  },
];