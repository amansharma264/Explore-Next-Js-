'use client';
import React, { use } from "react";
import Link from "next/link";
import courseData from "@/src/data/music_courses.json";
import Image from "next/image";
import { BackgroundGradient as CardGradient } from "@/src/components/ui/background-gradient";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function CourseDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const course = courseData.courses.find((c) => c.slug === resolvedParams.slug);

  if (!course) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center pt-36 px-4">
        <h1 className="text-4xl font-bold mb-4">Course Not Found</h1>
        <p className="text-neutral-400 mb-8">The course you are looking for does not exist or has been moved.</p>
        <Link
          href="/courses"
          className="px-6 py-3 rounded-lg bg-teal-600 text-white font-medium hover:bg-teal-500 transition duration-200"
        >
          Back to All Courses
        </Link>
      </div>
    );
  }

  const syllabus = [
    "Foundational music theory & ear training fundamentals",
    "Hands-on instrumental practice & technical exercises",
    "Mastering rhythm, scales, chord progressions, and harmony",
    "Interactive studio sessions & instructor feedback",
    "Final capstone project & performance recording"
  ];

  return (
    <div className="min-h-screen bg-black text-white py-12 pt-36 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/courses"
          className="inline-flex items-center text-teal-400 hover:text-teal-300 mb-8 text-sm font-medium transition duration-150"
        >
          ← Back to All Courses
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-3">
              {course.isFeatured && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-400 border border-teal-500/30">
                  Featured Masterclass
                </span>
              )}
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-zinc-800 text-neutral-300">
                Instructor: {course.instructor}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {course.title}
            </h1>

            <p className="text-lg text-neutral-300 leading-relaxed">
              {course.description}
            </p>

            <div className="pt-6 border-t border-neutral-800">
              <h2 className="text-2xl font-bold text-white mb-4">Course Curriculum Highlights</h2>
              <ul className="space-y-3">
                {syllabus.map((item, index) => (
                  <li key={index} className="flex items-start space-x-3 text-neutral-300 text-sm sm:text-base">
                    <span className="flex-shrink-0 h-6 w-6 rounded-full bg-teal-600/20 text-teal-400 flex items-center justify-center text-xs font-bold mt-0.5">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 border-t border-neutral-800 grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                <p className="text-xs text-neutral-400 font-medium">Duration</p>
                <p className="text-lg font-semibold text-white mt-1">8 Weeks</p>
              </div>
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                <p className="text-xs text-neutral-400 font-medium">Skill Level</p>
                <p className="text-lg font-semibold text-white mt-1">All Levels</p>
              </div>
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                <p className="text-xs text-neutral-400 font-medium">Access</p>
                <p className="text-lg font-semibold text-white mt-1">Lifetime</p>
              </div>
            </div>
          </div>

          {/* Sidebar / Media Card */}
          <div className="lg:col-span-1">
            <CardGradient className="rounded-[22px] p-6 bg-zinc-900 text-white flex flex-col justify-between">
              <div className="relative h-52 w-full mb-6 rounded-xl overflow-hidden">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-neutral-400 text-sm">Course Price</span>
                  <span className="text-3xl font-extrabold text-teal-400">${course.price}</span>
                </div>

                <Link
                  href={`/contact?course=${course.slug}`}
                  className="w-full block text-center py-3.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold transition duration-200 shadow-lg shadow-teal-900/30"
                >
                  Enroll Now
                </Link>

                <p className="text-center text-xs text-neutral-400">
                  🔒 30-Day Money Back Guarantee • Instant Access
                </p>
              </div>
            </CardGradient>
          </div>
        </div>
      </div>
    </div>
  );
}
