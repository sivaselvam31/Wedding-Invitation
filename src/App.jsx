import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from './sections/Hero';
import Countdown from './sections/Countdown';
import Events from './sections/Events';
import StoryGallery from './sections/StoryGallery';
import Venue from './sections/Venue';
import Outro from './sections/Outro';
import { Heart } from 'lucide-react';

// Ensure Lenis CSS styles are active
import 'lenis/dist/lenis.css';

export default function App() {
  const [isPreloaded, setIsPreloaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [lenisInstance, setLenisInstance] = useState(null);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8, // Increased from 1.2s to make the scroll transition longer and more gradual
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 0.8, // Decreased to reduce scroll distance per wheel click
      touchMultiplier: 0.5, // Decreased from 1.2 to make touch scrolling less sensitive
      infinite: false,
      gestureOrientation: 'vertical',
    });

    setLenisInstance(lenis);

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Control scrolling lock during preloading
  useEffect(() => {
    if (!isPreloaded) {
      document.body.style.overflow = 'hidden';
      if (lenisInstance) lenisInstance.stop();
    } else {
      document.body.style.overflow = '';
      if (lenisInstance) lenisInstance.start();
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isPreloaded, lenisInstance]);

  return (
    <main className="max-w-md mx-auto w-full min-h-dvh bg-background shadow-medium relative overflow-visible border-x border-primary/5 flex flex-col">
      {/* Fullscreen Premium Loader Overlay */}
      <AnimatePresence>
        {!isPreloaded && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background px-6 select-none"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            <motion.div 
              className="flex flex-col items-center max-w-xs w-full text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              {/* Gold Ring Spin Animation */}
              <div className="relative mb-6 flex items-center justify-center">
                <div className="w-20 h-20 border-2 border-primary/10 rounded-full"></div>
                <svg className="absolute w-20 h-20 transform -rotate-90">
                  <circle
                    cx="40"
                    cy="40"
                    r="38"
                    className="stroke-primary fill-none"
                    strokeWidth="2"
                    strokeDasharray={2 * Math.PI * 38}
                    strokeDashoffset={2 * Math.PI * 38 * (1 - loadingProgress / 100)}
                    style={{ transition: 'stroke-dashoffset 0.1s ease-out', transform: 'translate(0, 0)' }}
                  />
                </svg>
                <Heart className="absolute text-accent w-6 h-6 animate-pulse" />
              </div>

              <span className="font-sans text-[10px] tracking-[0.35em] uppercase text-text-secondary mb-2 block">
                Save The Date
              </span>
              <h2 className="font-serif text-2xl text-primary tracking-wide mb-1">
                Domesh &amp; Sivaranjani
              </h2>
              <p className="font-sans text-xs italic text-accent font-light mb-6">
                Cinematic Invitation
              </p>

              {/* Progress Bar & Percentage */}
              <div className="w-full bg-primary/5 h-0.75 rounded-full overflow-hidden mb-2 relative">
                <motion.div 
                  className="h-full bg-accent"
                  style={{ width: `${loadingProgress}%` }}
                  transition={{ ease: 'easeOut', duration: 0.1 }}
                />
              </div>
              
              <div className="flex justify-between w-full px-1 text-[10px] tracking-wider text-text-secondary uppercase">
                <span>Loading Assets</span>
                <span className="font-semibold">{loadingProgress}%</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Sections */}
      <Hero
        onPreloadComplete={setIsPreloaded}
        onProgressUpdate={setLoadingProgress}
      />

      {/* Reveal subsequent invitation cards only after preloading has finished */}
      <AnimatePresence>
        {isPreloaded && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
          >
            <Countdown />
            <Events />
            <StoryGallery />
            <Venue />
            <Outro />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
