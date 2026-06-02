import React from 'react';
import { motion } from 'framer-motion';
import firstMeetingImg from '../assets/story_first_meeting.png';
import proposalImg from '../assets/story_proposal.png';
import engagementImg from '../assets/story_engagement.png';

const STORIES = [
  {
    title: 'Our First Meeting',
    tagline: 'The Spark',
    text: 'A quiet spark of friendship that grew into something beautiful. In the silent pauses of our conversations, we discovered a soulmate in each other.',
    image: firstMeetingImg,
    align: 'left', // shifts margin to the right (pr-10)
  },
  {
    title: 'The Proposal',
    tagline: 'Two Paths Converge',
    text: 'Under the blessings of elders and the warmth of love, we walked hand-in-hand to make the promise of a lifetime. A simple yes that changed our lives.',
    image: proposalImg,
    align: 'right', // shifts margin to the left (pl-10)
  },
  {
    title: 'Two Hearts, One Journey',
    tagline: 'The Next Chapter',
    text: 'Standing on the threshold of a new beginning, we are ready to write our forever. Your blessings are the foundation of our future.',
    image: engagementImg,
    align: 'left', // shifts margin to the right (pr-10)
  }
];

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
          <h2 className="font-serif text-3xl text-primary font-light mb-3">
            Our Love Story
          </h2>
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
                <div className="relative overflow-hidden rounded-2xl shadow-medium border border-primary/5 aspect-[3/4] w-full bg-surface">
                  <img
                    src={story.image}
                    alt={story.title}
                    loading="lazy"
                    className="w-full h-full object-cover select-none transition-transform duration-700 hover:scale-105"
                  />
                  {/* Subtle soft gradient over image for premium cinematic feel */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Story Description Block */}
                <div className={`mt-2 ${isLeft ? 'pl-2' : 'pr-2'}`}>
                  <span className="font-sans text-[10px] tracking-widest uppercase font-semibold text-accent block mb-1">
                    {story.tagline}
                  </span>
                  <h3 className="font-serif text-xl text-primary font-semibold mb-2">
                    {story.title}
                  </h3>
                  <p className="font-sans text-xs text-text-secondary leading-relaxed font-light">
                    {story.text}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
