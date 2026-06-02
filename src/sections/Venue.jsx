import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Compass } from 'lucide-react';

const GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/JQAq9bRkT9eoqdcLA?g_st=aw';

export default function Venue() {
  return (
    <section className="relative px-6 py-16 bg-surface border-b border-primary/5">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-accent font-semibold block mb-2">
            The Location
          </span>
          <h2 className="font-serif text-3xl text-primary font-light mb-3">
            Wedding Venue
          </h2>
          <p className="font-sans text-xs text-text-secondary max-w-xs mx-auto">
            Join us at our celebration venue in the historic city of Kanchipuram.
          </p>
        </motion.div>

        {/* Physical Card Block */}
        <motion.div
          className="bg-background rounded-2xl p-6 shadow-medium border border-secondary/10 overflow-hidden relative"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Decorative Corner Filigree (SVG lines) */}
          <div className="absolute top-0 right-0 w-24 h-24 text-accent/10 pointer-events-none">
            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5" className="w-full h-full">
              <circle cx="100" cy="0" r="80" />
              <circle cx="100" cy="0" r="60" />
              <circle cx="100" cy="0" r="40" />
            </svg>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
              <Compass className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <h3 className="font-serif text-lg text-primary font-medium">Sengunthar Mudaliyar Samutaya Koodam</h3>
              <p className="font-sans text-[11px] text-text-secondary uppercase tracking-wider">Celebration Hall</p>
            </div>
          </div>

          {/* Map Preview Mockup (Stylized vector graphic) */}
          <div className="relative w-full h-36 bg-surface/50 rounded-xl mb-6 border border-primary/5 overflow-hidden flex items-center justify-center">
            {/* Grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(123,75,122,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(123,75,122,0.03)_1px,transparent_1px)] bg-[size:14px_24px]" />
            
            {/* Route path lines */}
            <svg className="absolute inset-0 w-full h-full text-secondary/20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M -20,50 C 40,50 80,20 120,40 C 160,60 220,10 260,80 C 300,120 340,70 400,90" />
              <path d="M 50,0 C 80,40 20,80 120,120" strokeDasharray="3,3" />
              <path d="M 220,150 C 200,90 280,60 280,0" strokeWidth="1" />
            </svg>

            {/* Glowing Map Pin icon in center */}
            <div className="relative z-10 flex flex-col items-center">
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="w-12 h-12 bg-primary flex items-center justify-center rounded-full shadow-medium text-accent border-2 border-white"
              >
                <MapPin className="w-6 h-6" />
              </motion.div>
              <span className="font-sans text-[10px] uppercase tracking-widest font-semibold text-primary mt-2 bg-background px-2 py-0.5 rounded-full border border-primary/10">
                Pillaiyarpalayam, Kanchipuram
              </span>
            </div>
          </div>

          {/* Directions / Landmark Info */}
          <div className="space-y-3 mb-6 text-left border-t border-primary/5 pt-4">
            <div>
              <span className="font-sans text-[10px] text-text-secondary uppercase tracking-widest block">Address</span>
              <p className="font-sans text-xs text-text-primary mt-0.5 leading-relaxed font-light">
                Pillaiyarpalayam, Kanchipuram, Tamil Nadu 631501, India
              </p>
            </div>
            
            <div>
              <span className="font-sans text-[10px] text-text-secondary uppercase tracking-widest block">Landmark</span>
              <p className="font-sans text-xs text-text-primary mt-0.5 font-light">
                Near Sengunthar School, Pillaiyarpalayam
              </p>
            </div>
          </div>

          {/* Action CTA Button */}
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-12 flex items-center justify-center gap-2 bg-primary text-white rounded-xl shadow-soft font-sans text-xs uppercase tracking-wider font-semibold transition-all duration-300 hover:bg-primary/95 active:scale-[0.98]"
          >
            <Navigation className="w-4 h-4 fill-accent stroke-accent" />
            Open in Google Maps
          </a>
        </motion.div>
      </div>
    </section>
  );
}
