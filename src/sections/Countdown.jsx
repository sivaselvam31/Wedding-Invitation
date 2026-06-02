import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Target date: 24 June 2026, 06:00 AM IST (UTC+05:30)
const TARGET_TIME = new Date('2026-06-24T06:00:00+05:30').getTime();

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const now = Date.now();
    const difference = TARGET_TIME - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isCompleted: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isCompleted: false
    };
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeItems = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ];

  return (
    <section className="relative px-6 py-16 text-center bg-background border-b border-primary/5">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-accent font-semibold block mb-2">
            The Celebration
          </span>
          <h2 className="font-serif text-3xl text-primary font-light mb-3">
            Counting Down To Our Forever
          </h2>
          <p className="font-sans text-xs text-text-secondary tracking-wide mb-10 max-w-xs mx-auto">
            We can't wait to share this magical day with you. Join us in the countdown to our wedding.
          </p>
        </motion.div>

        {/* 2x2 Grid Layout */}
        <div className="grid grid-cols-2 gap-4 max-w-70 mx-auto">
          {timeItems.map((item, index) => (
            <motion.div
              key={item.label}
              className="glass-panel rounded-2xl p-4 flex flex-col items-center justify-center aspect-square shadow-soft"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="h-10 overflow-hidden flex items-center justify-center">
                {/* Animate number change smoothly using vertical slide transitions */}
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={item.value}
                    initial={{ y: 25, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -25, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    className="font-serif text-3xl font-bold text-primary tracking-tight select-none block"
                  >
                    {String(item.value).padStart(2, '0')}
                  </motion.span>
                </AnimatePresence>
              </div>
              <span className="font-sans text-[10px] tracking-widest font-semibold uppercase text-text-secondary mt-2">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
