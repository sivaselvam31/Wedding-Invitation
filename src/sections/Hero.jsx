import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import useMobileCanvasScrubber from "../hooks/useMobileCanvasScrubber";
import { ChevronDown, Heart } from "lucide-react";

export default function Hero({ onPreloadComplete, onProgressUpdate }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // Track scroll progress over the 500vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Connect the canvas scrubber to the scroll progress
  const { loadingProgress, isPreloaded } = useMobileCanvasScrubber(
    canvasRef,
    scrollYProgress,
  );

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
  const opacity1 = useTransform(
    scrollYProgress,
    [0, 0.12, 0.22, 0.3, 1],
    [1, 1, 0, 0, 0],
    { clamp: true },
  );
  const y1 = useTransform(
    scrollYProgress,
    [0, 0.12, 0.22, 0.3, 1],
    [0, 0, -35, -35, -35],
    { clamp: true },
  );

  // Scroll Indicator: Visible initially, fades out quickly as user scrolls down
  const scrollIndicatorOpacity = useTransform(
    scrollYProgress,
    [0, 0.05, 1],
    [1, 0, 0],
    { clamp: true },
  );


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
          className="absolute inset-x-6 top-[20%] flex flex-col items-center text-center pointer-events-none"
          style={{ opacity: opacity1, y: y1 }}
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isPreloaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-yesteryear text-xs tracking-[0.25em] uppercase text-black mb-3 text-shadow-elegant"
          >
            Wedding Invitation
          </motion.span>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isPreloaded ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="w-6 h-px bg-accent/60 mb-5"
          />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={isPreloaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-elegant text-7xl font-semibold text-custom-red leading-tight text-shadow-elegant"
          >
            Domesan
            <span className="block text-4xl font-bold text-surface my-1">
              &amp;
            </span>
            Sivaranjani
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={isPreloaded ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="w-6 h-px bg-accent/60 mt-5 mb-4"
          />
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isPreloaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-yesteryear text-xl text-black px-4 max-w-xs leading-relaxed tracking-wide text-shadow-elegant"
          >
            Together with our families, we invite you to celebrate our wedding.
          </motion.p>
        </motion.div>

        {/* Animated Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isPreloaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          style={{ opacity: scrollIndicatorOpacity }}
          className="absolute bottom-[6dvh] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 pointer-events-none select-none z-30"
        >
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-text-secondary/80 text-shadow-elegant">
            Scroll to Begin
          </span>

          {/* Delicate scroll track and indicator */}
          <div className="relative flex flex-col items-center">
            {/* The thin vertical guideline */}
            <div className="w-1px h-14 bg-linear-to-b from-accent/50 via-accent/20 to-transparent" />

            {/* The floating element (a tiny delicate gold heart) */}
            <motion.div
              className="absolute top-0 text-custom-red"
              animate={{
                y: [0, 24, 0],
                opacity: [0.4, 1, 0.4],
                scale: [0.8, 1.1, 0.8],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Heart className="w-3.5 h-3.5 fill-custom-red stroke-custom-red" />
            </motion.div>
          </div>
        </motion.div>

        {/* Circular Scroll Progress Indicator (Right Bottom) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isPreloaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="absolute bottom-[6dvh] right-6 z-40 flex items-center justify-center w-10 h-10 rounded-full shadow-soft border border-primary/10 select-none pointer-events-none"
        >
          {/* Label indicating scroll (always visible, clean and elegant) */}
          <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 font-sans text-[8px] tracking-[0.2em] uppercase text-text-secondary bg-background/50 backdrop-blur-xs px-2 py-0.75 rounded-md border border-primary/5 whitespace-nowrap shadow-xs opacity-80">
            Scroll
          </span>

          {/* SVG Progress Ring */}
          <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 44 44">
            {/* Background circle track */}
            <circle
              cx="22"
              cy="22"
              r="19"
              className="stroke-primary/10 fill-none"
              strokeWidth="2.5"
            />
            {/* Active progress path */}
            <motion.circle
              cx="22"
              cy="22"
              r="19"
              className="stroke-custom-red fill-none"
              strokeWidth="2.5"
              strokeLinecap="round"
              style={{
                pathLength: scrollYProgress,
              }}
            />
          </svg>
        </motion.div>
      </div>
    </div>
  );
}
