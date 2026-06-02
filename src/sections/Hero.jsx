import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import useMobileCanvasScrubber from '../hooks/useMobileCanvasScrubber';
import { ChevronDown, Heart } from 'lucide-react';

export default function Hero({ onPreloadComplete, onProgressUpdate }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // Track scroll progress over the 500vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Connect the canvas scrubber to the scroll progress
  const { loadingProgress, isPreloaded } = useMobileCanvasScrubber(canvasRef, scrollYProgress);

  // Send preloading progress values to the parent App orchestrator
  useEffect(() => {
    if (onPreloadComplete) {
      onPreloadComplete(isPreloaded);
    }
  }, [isPreloaded, onPreloadComplete]);

  useEffect(() => {
    if (onProgressUpdate) {
      onProgressUpdate(loadingProgress);
    }
  }, [loadingProgress, onProgressUpdate]);

  // Overlay 1: Bride & Groom Names (Active from 0% to 25% scroll)
  const opacity1 = useTransform(scrollYProgress, [0, 0.12, 0.22, 0.3], [1, 1, 0, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.12, 0.22, 0.3], [0, 0, -35, -35]);


  // // Define dot background color transformations at the top level to adhere strictly to the Rules of Hooks
  // const bgDot0 = useTransform(scrollYProgress, [-0.1, 0, 0.1], ['rgba(123, 75, 122, 0.2)', 'rgba(123, 75, 122, 1)', 'rgba(123, 75, 122, 0.2)']);
  // const bgDot1 = useTransform(scrollYProgress, [0.15, 0.25, 0.35], ['rgba(123, 75, 122, 0.2)', 'rgba(123, 75, 122, 1)', 'rgba(123, 75, 122, 0.2)']);
  // const bgDot2 = useTransform(scrollYProgress, [0.4, 0.5, 0.6], ['rgba(123, 75, 122, 0.2)', 'rgba(123, 75, 122, 1)', 'rgba(123, 75, 122, 0.2)']);
  // const bgDot3 = useTransform(scrollYProgress, [0.65, 0.75, 0.85], ['rgba(123, 75, 122, 0.2)', 'rgba(123, 75, 122, 1)', 'rgba(123, 75, 122, 0.2)']);
  // const bgDot4 = useTransform(scrollYProgress, [0.9, 1, 1.1], ['rgba(123, 75, 122, 0.2)', 'rgba(123, 75, 122, 1)', 'rgba(123, 75, 122, 0.2)']);

  // const dotBackgrounds = [bgDot0, bgDot1, bgDot2, bgDot3, bgDot4];

  return (
    <div ref={containerRef} className="relative w-full h-[500vh] bg-background">
      {/* Sticky Canvas Container */}
      <div className="sticky top-0 w-full h-dvh overflow-hidden bg-background">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover block"
        />

        {/* Cinematic Vignette Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-linear-to-b from-background/25 via-transparent to-background/55 pointer-events-none" />

        {/* Text Overlay 1: Welcome & Names */}
        <motion.div
          style={{ opacity: opacity1, y: y1 }}
          className="absolute inset-x-6 top-[20%] flex flex-col items-center text-center pointer-events-none"
        >
          <span className="font-sans text-xs tracking-[0.25em] uppercase text-surface mb-3 text-shadow-elegant">
            The Wedding Invitation
          </span>
          <div className="w-6 h-px bg-accent/60 mb-5" />
          <h1 className="font-serif text-6xl font-semibold text-purple-300 leading-tight text-shadow-elegant">
            Domesh
            <span className="block font-sans text-lg italic text-accent my-1">&amp;</span>
            Sivaranjani
          </h1>
          <div className="w-6 h-px bg-accent/60 mt-5 mb-4" />
          <p className="font-serif text-lg text-black px-4 max-w-xs leading-relaxed text-shadow-elegant">
            Together with our families, we invite you to celebrate our wedding.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
