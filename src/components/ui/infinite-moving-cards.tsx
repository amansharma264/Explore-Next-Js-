"use client";
import { cn } from "../../lib/utils";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items = [],
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items?: {
    quote: string;
    name: string;
    title: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (items && items.length > 0) {
      addAnimation();
    }
    // we do NOT want to re-run when `items` changes to avoid multiple cloneNodes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      // avoid cloning twice if already done
      if (scrollerRef.current.children.length <= items.length) {
        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true);
          scrollerRef.current?.appendChild(duplicatedItem);
        });
      }

      setDirection();
      setSpeed();
      setStart(true);
    }
  }

  function setDirection() {
    if (!containerRef.current) return;
    containerRef.current.style.setProperty(
      "--animation-direction",
      direction === "left" ? "forwards" : "reverse",
    );
  }

  function setSpeed() {
    if (!containerRef.current) return;
    const durations: Record<string, string> = {
      fast: "20s",
      normal: "40s",
      slow: "80s",
    };
    containerRef.current.style.setProperty(
      "--animation-duration",
      durations[speed] || "40s",
    );
  }

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
        {Array.isArray(items) && items.length > 0 ? (
          items.map((item, idx) => (
            <li
              key={`${item.name}-${idx}`}
              className="relative w-[350px] max-w-full shrink-0 rounded-2xl border border-b-0 border-zinc-200 bg-[linear-gradient(180deg,#fafafa,#f5f5f5)] px-8 py-6 md:w-[450px] dark:border-zinc-700 dark:bg-[linear-gradient(180deg,#27272a,#18181b)]"
            >
              <blockquote>
                <span className="relative z-20 text-sm font-normal leading-[1.6] text-neutral-800 dark:text-gray-100">
                  {item.quote}
                </span>
                <div className="relative z-20 mt-6 flex flex-col gap-1">
                  <span className="text-sm font-normal leading-[1.6] text-neutral-500 dark:text-gray-400">
                    {item.name}
                  </span>
                  <span className="text-sm font-normal leading-[1.6] text-neutral-500 dark:text-gray-400">
                    {item.title}
                  </span>
                </div>
              </blockquote>
            </li>
          ))
        ) : (
          <p className="text-neutral-500 dark:text-neutral-400 px-4">
            No testimonials available.
          </p>
        )}
      </ul>
    </div>
  );
};
