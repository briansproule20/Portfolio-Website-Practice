"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    title: string;
    subtitle: string;
    description: string;
    favicon?: string;
    link?: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards",
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse",
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "160s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className,
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
        {items.map((item, idx) => {
          const CardContent = (
            <div className="flex flex-col h-full">
              <div className="flex items-center mb-4">
                {item.favicon && (
                  <div className="mr-3 flex-shrink-0">
                    <img
                      src={item.favicon}
                      alt={`${item.title} favicon`}
                      className="w-16 h-16 rounded-sm"
                    />
                  </div>
                )}
                <div className="flex flex-col">
                  <h3 className="text-lg font-semibold text-[var(--foreground)] leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm font-medium text-[var(--accent)]">
                    {item.subtitle}
                  </p>
                </div>
              </div>
              <p className="text-sm leading-[1.6] font-normal text-[var(--foreground)] flex-1">
                {item.description}
              </p>
            </div>
          );

          return (
            <li
              className="relative w-[350px] max-w-full shrink-0 rounded-2xl border-2 border-[var(--accent)] bg-[var(--card)] px-8 py-6 md:w-[450px] shadow-md hover:border-[var(--highlight)] transition-colors"
              key={idx}
            >
              {item.link ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full cursor-pointer"
                >
                  {CardContent}
                </a>
              ) : (
                CardContent
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};