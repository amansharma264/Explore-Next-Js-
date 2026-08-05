'use client';

import React, { useState, useEffect } from "react";
import { HoveredLink, Menu, MenuItem } from "./ui/navbar-menu";
import Link from "next/link";
import { motion } from "motion/react";
import { cn } from "../lib/utils";

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      if (window.scrollY > 25) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={false}
      animate={
        mounted
          ? {
              top: scrolled ? "0px" : "1.75rem",
              width: scrolled ? "100%" : "90%",
              maxWidth: scrolled ? "100%" : "42rem", // max-w-2xl
              borderRadius: scrolled ? "0px 0px 1.25rem 1.25rem" : "9999px",
              borderColor: scrolled ? "rgba(13, 148, 136, 0.3)" : "rgba(255, 255, 255, 0.15)",
              backgroundColor: scrolled ? "rgba(5, 5, 5, 0.92)" : "rgba(10, 10, 10, 0.75)",
              boxShadow: scrolled
                ? "0 20px 40px -15px rgba(0, 0, 0, 0.9), 0 0 25px rgba(13, 148, 136, 0.15)"
                : "0 10px 30px -10px rgba(0, 0, 0, 0.6)",
            }
          : undefined
      }
      style={
        !mounted
          ? {
              top: "1.75rem",
              width: "90%",
              maxWidth: "42rem",
              borderRadius: "9999px",
              borderColor: "rgba(255, 255, 255, 0.15)",
              backgroundColor: "rgba(10, 10, 10, 0.75)",
            }
          : undefined
      }
      transition={{
        type: "spring",
        stiffness: 240,
        damping: 24,
        mass: 0.8,
      }}
      className={cn(
        "fixed inset-x-0 mx-auto z-50 backdrop-blur-xl border transition-colors duration-300",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between px-6 transition-all duration-300",
          scrolled && mounted ? "py-3 max-w-7xl mx-auto" : "py-2"
        )}
      >
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <span className="text-xl">🎵</span>
          <span className="font-extrabold tracking-tight text-white group-hover:text-teal-400 transition-colors text-sm md:text-base">
            Master<span className="text-teal-400">Music</span>
          </span>
        </Link>

        {/* Center Menu Navigation */}
        <Menu setActive={setActive} className="border-0 bg-transparent shadow-none py-0 px-0 space-x-4 md:space-x-8">
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
          className="hidden sm:inline-flex items-center justify-center px-4 py-1.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 transition-all duration-300 shadow-md hover:shadow-teal-500/20 active:scale-95"
        >
          Explore Courses &rarr;
        </Link>
      </div>
    </motion.header>
  );
}

export default Navbar;
