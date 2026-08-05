'use client';

import React, { useState, useEffect } from "react";
import { HoveredLink, Menu, MenuItem } from "./ui/navbar-menu";
import Link from "next/link";
import { cn } from "../lib/utils";

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 mx-auto z-50 transition-all duration-500 ease-in-out backdrop-blur-xl border",
        scrolled
          ? "top-0 w-full max-w-full rounded-b-2xl bg-black/90 border-teal-500/30 shadow-2xl py-3.5 px-6 md:px-10"
          : "top-6 w-[92%] max-w-2xl rounded-full bg-neutral-950/80 border-white/15 shadow-xl py-2.5 px-6",
        className
      )}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto w-full">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-2 group shrink-0">
          <span className="text-xl">🎵</span>
          <span className="font-extrabold tracking-tight text-white group-hover:text-teal-400 transition-colors text-sm md:text-base">
            Master<span className="text-teal-400">Music</span>
          </span>
        </Link>

        {/* Center Menu Navigation */}
        <Menu setActive={setActive} className="border-0 bg-transparent shadow-none py-0 px-0 space-x-3 md:space-x-8">
          <Link href={"/"}>
            <MenuItem setActive={setActive} active={active} item="Home" />
          </Link>
          
          <MenuItem setActive={setActive} active={active} item="Our Courses">
            <div className="flex flex-col space-y-3 text-sm p-1">
              <HoveredLink href="/courses">All Courses</HoveredLink>
              <HoveredLink href="/courses/guitar-fundamentals">Guitar Fundamentals</HoveredLink>
              <HoveredLink href="/courses/piano-masterclass">Piano Masterclass</HoveredLink>
              <HoveredLink href="/courses/vocal-training">Vocal Training</HoveredLink>
              <HoveredLink href="/courses/music-production">Music Production</HoveredLink>
            </div>
          </MenuItem>

          <Link href={"/contact"}>
            <MenuItem setActive={setActive} active={active} item="Contact Us" />
          </Link>
        </Menu>

        {/* Right CTA Action Button */}
        <Link
          href="/courses"
          className="hidden sm:inline-flex items-center justify-center px-4 py-1.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 transition-all duration-300 shadow-md hover:shadow-teal-500/20 active:scale-95 shrink-0"
        >
          Explore Courses &rarr;
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
