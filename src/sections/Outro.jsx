import React from 'react';
import { motion } from 'framer-motion';
import PetalDrift from '../components/PetalDrift';
import { Heart } from 'lucide-react';

export default function Outro() {
  return (
    <section className="relative px-6 py-28 bg-background overflow-hidden flex flex-col items-center justify-center min-h-[60vh] text-center">
      {/* Falling lavender petals overlay layer restricted to this section context */}
      <PetalDrift />

      <div className="max-w-md mx-auto relative z-20 flex flex-col items-center">
        {/* Double Heart Floral Centerpiece */}
        <motion.div
          className="flex items-center gap-2 text-accent mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-8 h-px bg-accent/40" />
          <Heart className="w-5 h-5 fill-accent stroke-accent" />
          <Heart className="w-4 h-4 fill-accent stroke-accent -ml-1 mt-2" />
          <div className="w-8 h-px bg-accent/40" />
        </motion.div>

        {/* Emotionally-driven final message */}
        <motion.p
          className="font-serif text-2xl italic text-primary leading-relaxed px-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1 }}
        >
          "Your presence will make our celebration complete."
        </motion.p>

        <motion.div
          className="flex flex-col items-center gap-1"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-text-secondary">
            With Love
          </span>
          <h3 className="font-serif text-2xl text-primary font-bold tracking-wide mt-1">
            Domesh &amp; Sivaranjani
          </h3>
        </motion.div>

        {/* Decorative Divider */}
        <div className="w-12 h-px bg-accent/40 mt-12 mb-4" />
        <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-text-secondary/60">
          #DomeshWedsSivaranjani
        </span>
      </div>
    </section>
  );
}
