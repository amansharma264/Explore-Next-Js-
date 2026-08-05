'use client';
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "@/src/components/ui/3d-card";
import courseData from "@/src/data/music_courses.json";

function CoursesPage() {
  return (
    <div className="min-h-screen bg-black py-12 pt-36">
      <h1 className="text-3xl md:text-7xl text-center font-sans font-bold mb-4 text-white">
        All Courses ({courseData.courses.length})
      </h1>
      <p className="text-center text-neutral-400 text-sm md:text-base max-w-xl mx-auto mb-12 px-4">
        Explore our curated curriculum designed by world-class music professionals and producers.
      </p>
      <div className="flex flex-wrap justify-center px-4">
        {courseData.courses.map((course) => (
          <CardContainer key={course.id} className="inter-val m-4">
            <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-teal-500/[0.15] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border transition-all duration-300">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-neutral-600 dark:text-white"
              >
                {course.title}
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
              >
                {course.description}
              </CardItem>
              <CardItem translateZ="100" className="w-full mt-4">
                <Image
                  src={course.image}
                  height="1000"
                  width="1000"
                  className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                  alt={course.title}
                />
              </CardItem>
              <div className="flex justify-between items-center mt-8">
                <CardItem
                  translateZ={20}
                  className="text-teal-400 font-bold text-lg"
                >
                  ${course.price}
                </CardItem>
                <div className="flex space-x-3">
                  <CardItem
                    translateZ={20}
                    as={Link}
                    href={`/courses/${course.slug}`}
                    className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white hover:underline flex items-center"
                  >
                    View Details →
                  </CardItem>
                  <CardItem
                    translateZ={20}
                    as={Link}
                    href={`/contact?course=${course.slug}`}
                    className="px-4 py-2 rounded-xl bg-teal-600 dark:bg-teal-500 text-white dark:text-black text-xs font-bold hover:bg-teal-500 transition duration-200"
                  >
                    Enroll Now
                  </CardItem>
                </div>
              </div>
            </CardBody>
          </CardContainer>
        ))}
      </div>
    </div>
  );
}

export default CoursesPage;