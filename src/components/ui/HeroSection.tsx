'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Spotlight } from '../ui/Spotlight';
import { Button } from './moving-border';
import { Hero3DCanvas } from './Hero3DCanvas';

function HeroSection() {
  return (
    <div className="h-auto min-h-[44rem] w-full rounded-md flex flex-col items-center justify-center relative overflow-hidden mx-auto py-16 md:py-24 bg-black/[0.96]">
      {/* 1. Interactive 3D Particle Sphere Canvas Background */}
      <Hero3DCanvas />

      {/* 2. Spotlight Lighting Effects */}
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill="white"
      />
      <Spotlight
        className="top-10 left-full md:left-2/3"
        fill="#14b8a6"
      />

      {/* 3. Ambient Dual Neon Glows */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-500/15 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/15 blur-[140px] rounded-full pointer-events-none" />

      {/* 4. 3D Floating Asset - Left (3D Music Note) */}
      <motion.div
        initial={{ opacity: 0, x: -60, y: 0 }}
        animate={{
          opacity: 0.9,
          x: [0, -10, 0],
          y: [0, -15, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
        className="hidden lg:block absolute left-6 xl:left-16 top-1/2 -translate-y-1/2 pointer-events-none z-10"
      >
        <div className="relative w-40 h-40 xl:w-52 xl:h-52 drop-shadow-[0_0_35px_rgba(20,184,166,0.5)]">
          <Image
            src="/hero_3d_music_note.png"
            alt="3D Music Note Graphic"
            fill
            className="object-contain"
          />
        </div>
      </motion.div>

      {/* 5. 3D Floating Asset - Right (3D Headphones) */}
      <motion.div
        initial={{ opacity: 0, x: 60, y: 0 }}
        animate={{
          opacity: 0.9,
          x: [0, 10, 0],
          y: [0, 15, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
        className="hidden lg:block absolute right-6 xl:right-16 top-1/2 -translate-y-1/2 pointer-events-none z-10"
      >
        <div className="relative w-40 h-40 xl:w-52 xl:h-52 drop-shadow-[0_0_35px_rgba(168,85,247,0.5)]">
          <Image
            src="/hero_3d_headphones.png"
            alt="3D Headphones Graphic"
            fill
            className="object-contain"
          />
        </div>
      </motion.div>

      {/* 6. Main Hero Content */}
      <div className="p-4 relative z-20 w-full text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-zinc-900/80 border border-teal-500/30 text-teal-400 text-xs sm:text-sm font-medium mb-6 backdrop-blur-md shadow-lg shadow-teal-950/40"
        >
          <span className="flex h-2 w-2 rounded-full bg-teal-400 animate-ping" />
          <span>Next-Gen 3D Interactive Masterclasses</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-4 text-4xl sm:text-6xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 via-neutral-100 to-neutral-500 tracking-tight leading-tight"
        >
          Master the art of music
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 font-normal text-base md:text-lg text-neutral-300 max-w-xl mx-auto leading-relaxed"
        >
          Dive into our comprehensive music courses and transform your musical journey today. Whether you are a beginner or looking to refine your skills, join us to unlock your true potential.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/courses">
            <Button borderRadius="1.75rem" className="bg-slate-900 text-white border-neutral-800 hover:border-teal-500/50 transition duration-300">
              Explore Courses
            </Button>
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 rounded-full text-sm font-semibold text-neutral-300 hover:text-white bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 transition duration-200 backdrop-blur-md"
          >
            Contact Admissions →
          </Link>
        </motion.div>
      </div>

      {/* 7. 3D Perspective Floor Grid */}
      <div className="absolute -bottom-10 inset-x-0 h-40 bg-gradient-to-t from-black via-black/80 to-transparent z-10 pointer-events-none" />
    </div>
  );
}

export default HeroSection;
