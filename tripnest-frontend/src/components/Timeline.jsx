import React from 'react';
import { Compass, MapPin, Coffee, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

const Timeline = ({ itinerary }) => {
  // If no itinerary is passed, default to a robust multi-day travel schedule
  const items = itinerary || [
    {
      day: "Day 1",
      title: "Arrival & Traditional Welcome",
      description: "Land at the nearest airport/station. Meet our guide and check-in to your resort. Enjoy a traditional welcome dinner and floating shikara/boat tour in the evening.",
      icon: Compass,
      time: "Evening"
    },
    {
      day: "Day 2",
      title: "Scenic Sightseeing & Exploration",
      description: "Start early with a guided tour of heritage gardens and tea plantations. Witness local craft demonstrations and sample traditional street food delicacies.",
      icon: Sun,
      time: "Morning/Afternoon"
    },
    {
      day: "Day 3",
      title: "Adventure & Natural Trails",
      description: "Hike up scenic ridges and viewpoints to capture panoramic mountain valleys. Enjoy a picnic lunch by a secret waterfall, followed by white water rafting or local sports.",
      icon: Coffee,
      time: "All Day"
    },
    {
      day: "Day 4",
      title: "Local Shopping & Cultural Evening",
      description: "Spend the day browsing handloom bazaars and souvenir markets. Conclude your tour with an authentic bonfire musical evening featuring local folk artists.",
      icon: Moon,
      time: "Evening"
    }
  ];

  return (
    <div className="relative pl-6 border-l-2 border-slate-200 dark:border-slate-800 space-y-8 py-2">
      {items.map((item, idx) => {
        const Icon = item.icon || Compass;
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="relative space-y-2"
          >
            {/* Timeline Circle Bullet */}
            <div className="absolute left-[-35px] top-1.5 p-1 bg-white dark:bg-slate-900 border-2 border-accent text-accent rounded-full shadow-md">
              <Icon className="w-3.5 h-3.5" />
            </div>

            {/* Time Stamp */}
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-accent/10 border border-accent/20 text-[10px] font-extrabold text-accent uppercase tracking-wider">
              <span>{item.day}</span>
              <span className="w-1 h-1 rounded-full bg-accent/40" />
              <span>{item.time}</span>
            </div>

            {/* Content Card */}
            <div className="p-4 bg-surface/40 hover:bg-surface/75 border border-slate-200/50 dark:border-slate-800/50 rounded-xl transition-all duration-200 space-y-1.5">
              <h4 className="font-extrabold text-sm text-light font-display">
                {item.title}
              </h4>
              <p className="text-xs text-muted leading-relaxed">
                {item.description}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default Timeline;
