"use client";
import React from "react";
import { StickyScroll } from "./ui/sticky-scroll-reveal";

const musicSchoolContent = [
    {
      title: 'Discover Your Sound: Personalized Mentorship',
      description:
        'Embark on a musical journey tailored specifically to your goals. Our expert instruction adapts to your unique learning pace, fostering authentic artistic growth and unlocking creative confidence.',
    },
    {
      title: 'World-Class Faculty & Alumni Network',
      description:
        'Learn directly from acclaimed industry professionals, Grammy-nominated producers, and master musicians who bring real-world experience and industry insights into every masterclass.',
    },
    {
      title: 'State-of-the-Art Production Labs',
      description:
        'Gain hands-on experience with industry-standard digital audio workstations, analog synthesizers, studio-grade acoustics, and modern music production software.',
    },
    {
      title: 'Live Feedback & Engagement',
      description:
        'Immerse yourself in an interactive learning experience where feedback is immediate, just like real-time changes in a collaborative project. This approach enhances your understanding and mastery of music concepts and performance techniques.',
    },
    {
      title: 'Cutting-Edge Curriculum',
      description:
        'Our curriculum is continuously updated to include the latest music education trends and technologies, ensuring you’re always learning with the most current and effective methods. Say goodbye to outdated materials and welcome an education that evolves with the industry.',
    },
    {
      title: 'Limitless Learning Opportunities',
      description:
        'With our expansive resource library and dynamic course offerings, you’ll never find yourself without something new to explore. Our platform provides continuous opportunities for growth, ensuring your musical skills are always advancing.',
    },
  ];

function WhyChooseUs() {
  return (
    <div>
        <StickyScroll content={musicSchoolContent} />
    </div>
  )
}

export default WhyChooseUs