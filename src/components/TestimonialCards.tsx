'use client';
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

const musicSchoolTestimonials = [
  {
    quote: 'Joining the music school transformed my understanding of music and helped me to truly discover my own sound. The instructors are world-class!',
    name: 'Alex Johnson',
    title: 'Guitar Student',
  },
  {
    quote: "The community and support at this school are unmatched. I've grown not just as a pianist, but also as a performer, thanks to their comprehensive approach.",
    name: 'Samantha Lee',
    title: 'Piano Student',
  },
  {
    quote: "This school offered me the tools and confidence to take my singing to the next level. I'm endlessly grateful for the personalized coaching.",
    name: 'Michael Chen',
    title: 'Vocal Student',
  },
  {
    quote: 'As a violinist, finding the right mentor can be challenging, but this school matched me with a teacher who truly understands my goals and challenges.',
    name: 'Emily Taylor',
    title: 'Violin Student',
  },
  {
    quote: 'The production courses here opened my eyes to the intricacies of music production. Highly recommend for any aspiring producers!',
    name: 'Chris Morales',
    title: 'Music Production Student',
  },
];

function MusicSchoolTestimonials() {
  return (
    <div className="relative h-[40rem] w-full flex flex-col items-center justify-center overflow-hidden bg-black">

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.15] [background-size:40px_40px]
      [background-image:linear-gradient(to_right,#ffffff1a_1px,transparent_1px),
      linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)]" />

      {/* Radial fade */}
      <div className="absolute inset-0 pointer-events-none 
      [mask-image:radial-gradient(circle_at_center,transparent_20%,black_100%)]" />

      {/* Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04)_0%,transparent_70%)]" />

      <h2 className="relative z-20 text-4xl font-bold text-center text-white mb-8">
        Hear our Harmony: Voices of success
      </h2>

      <div className="relative z-20 flex justify-center w-full max-w-6xl px-4">
        <InfiniteMovingCards items={musicSchoolTestimonials} direction="right" speed="slow" />
      </div>
    </div>
  );
}


export default MusicSchoolTestimonials;
