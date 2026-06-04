import React from 'react';
import { motion } from 'framer-motion';
import image_1 from '../assets/images/image_1.webp';
import image_2 from '../assets/images/image_2.webp';
import image_3 from '../assets/images/image_3.webp';
import image_4 from '../assets/images/image_4.webp';

const STORIES = [
  {
    title: 'Our First Meeting',
    tagline: 'A Story Begins',
    image: image_3,
    align: 'left',
  },
  {
    title: 'A Beautiful Beginning',
    tagline: 'Two Paths Converge',
    image: image_1,
    align: 'right',
  },
  {
    title: 'Two Hearts, One Journey',
    tagline: 'The Next Chapter',
    image: image_2,
    align: 'left', 
  },
  {
    title: 'A Life Together',
    tagline: 'The Beginning',
    image: image_4,
    align: 'right', 
  }
];

// Helper component to render images with a smooth fade-in animation and shimmer placeholder
function GalleryImage({ src, alt }) {
  const [isLoaded, setIsLoaded] = React.useState(false);

  return (
    <div className="relative w-full h-full">
      {/* Delicate pulsing shimmer placeholder */}
      <div 
        className={`absolute inset-0 bg-surface transition-opacity duration-500 z-10 ${
          isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="w-full h-full bg-linear-to-r from-primary/5 via-primary/10 to-primary/5 animate-pulse" />
      </div>

      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover select-none transition-all duration-700 hover:scale-105 ${
          isLoaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-98 blur-xs'
        }`}
      />
    </div>
  );
}

export default function StoryGallery() {
  return (
    <section className="relative px-6 py-16 bg-background border-b border-primary/5">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-accent font-semibold block mb-2">
            Our Journey
          </span>
          <p className="font-sans text-xs text-text-secondary max-w-xs mx-auto">
            A celebration of how our separate paths crossed and merged into one beautiful destination.
          </p>
        </motion.div>

        {/* Alternating Stream Gallery */}
        <div className="flex flex-col gap-14">
          {STORIES.map((story, index) => {
            const isLeft = story.align === 'left';
            return (
              <motion.div
                key={index}
                className={`flex flex-col gap-4 ${isLeft ? 'pr-8 text-left' : 'pl-8 text-right'}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                {/* Image Card Container with Locked Aspect Ratio */}
                <div className="relative overflow-hidden rounded-2xl shadow-medium border border-primary/5 aspect-3/4 w-full bg-surface">
                  <GalleryImage src={story.image} alt={story.title} />
                  {/* Subtle soft gradient over image for premium cinematic feel */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none z-20" />
                </div>

                {/* Story Description Block */}
                <div className={`mt-2 ${isLeft ? 'pl-2' : 'pr-2'}`}>
                  <span className="font-sans text-[10px] tracking-widest uppercase font-semibold text-accent block mb-1">
                    {story.tagline}
                  </span>
                  <h3 className="font-serif text-xl text-primary font-semibold mb-2">
                    {story.title}
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
