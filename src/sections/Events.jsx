import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, CalendarPlus } from 'lucide-react';

const EVENTS = [
  {
    title: 'Wedding Reception',
    date: '23 June 2026, Tuesday',
    time: '7:00 PM – 9:00 PM',
    venue: 'Sengunthar Mudaliyar Samutaya Koodam',
    city: 'Kanchipuram, Tamil Nadu',
    googleCalendarUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Domesh+%26+Sivaranjani+-+Wedding+Reception&dates=20260623T133000Z/20260623T153000Z&details=You+are+cordially+invited+to+the+wedding+reception+of+Domesh+%26+Sivaranjani.&location=Sengunthar+Mudaliyar+Samutaya+Koodam,+Pillaiyarpalayam,+Kanchipuram,+Tamil+Nadu,+India',
  },
  {
    title: 'Wedding Ceremony (Muhurtham)',
    date: '24 June 2026, Wednesday',
    time: '6:00 AM – 7:30 AM',
    venue: 'Sengunthar Mudaliyar Samutaya Koodam',
    city: 'Kanchipuram, Tamil Nadu',
    googleCalendarUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Domesh+%26+Sivaranjani+-+Wedding+Ceremony&dates=20260624T003000Z/20260624T020000Z&details=You+are+cordially+invited+to+the+wedding+ceremony+(Muhurtham)+of+Domesh+%26+Sivaranjani.&location=Sengunthar+Mudaliyar+Samutaya+Koodam,+Pillaiyarpalayam,+Kanchipuram,+Tamil+Nadu,+India',
  }
];

export default function Events() {
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
            The Events
          </span>
          <h2 className="font-serif text-3xl text-primary font-light mb-3">
            Schedule of Celebrations
          </h2>
          <p className="font-sans text-xs text-text-secondary max-w-xs mx-auto">
            Join us in celebrating these special moments. We look forward to your presence.
          </p>
        </motion.div>

        {/* Vertical Stack of Cards */}
        <div className="flex flex-col gap-8">
          {EVENTS.map((event, index) => (
            <motion.div
              key={index}
              className="relative bg-background rounded-2xl p-6 shadow-soft border border-secondary/10 overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: index * 0.15, duration: 0.8 }}
              whileHover={{ y: -2 }}
            >
              {/* Premium Gold Corner Accent Accent Line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-accent/20 via-accent to-accent/20" />
              
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-primary/5 rounded-full text-xs font-sans text-primary font-semibold uppercase tracking-wider mb-2">
                  {event.title}
                </span>
              </div>

              {/* Event details with premium icons */}
              <div className="space-y-4 my-6">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="font-serif text-lg text-primary font-medium leading-none">
                      {event.date}
                    </p>
                    <span className="font-sans text-xs text-text-secondary uppercase tracking-wider">Date</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="font-serif text-lg text-primary font-medium leading-none">
                      {event.time}
                    </p>
                    <span className="font-sans text-xs text-text-secondary uppercase tracking-wider">Time</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="font-serif text-base text-primary leading-tight font-medium">
                      {event.venue}
                    </p>
                    <p className="font-sans text-xs text-text-secondary mt-0.5">
                      {event.city}
                    </p>
                    <span className="font-sans text-xs text-text-secondary uppercase tracking-wider">Venue</span>
                  </div>
                </div>
              </div>

              {/* Add to Calendar Button */}
              <a
                href={event.googleCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-accent/30 text-accent font-sans text-xs uppercase tracking-wider hover:bg-accent hover:text-white transition-colors duration-300 font-semibold"
              >
                <CalendarPlus className="w-4 h-4" />
                Add to Google Calendar
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
