import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Compass, Shield, Coffee, Award, Star, Quote } from 'lucide-react';
import toast from 'react-hot-toast';

// Services
import destinationService from '../services/destinationService';

// Components
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import DestinationCard from '../components/DestinationCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Home = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDestinations = async () => {
      try {
        setLoading(true);
        const data = await destinationService.searchDestinations();
        // Take the top 3-4 destinations as featured popular items
        setDestinations(data.slice(0, 4));
      } catch (err) {
        console.error("Failed to load destinations in Home", err);
      } finally {
        setLoading(false);
      }
    };
    loadDestinations();
  }, []);

  const testimonials = [
    {
      name: "Sneha Roy",
      role: "Corporate Traveler",
      avatar: "SR",
      quote: "TripNest made our family vacation to Munnar an absolute dream. The budget split tools and detailed itinerary timeline saved us hours of messaging!",
      rating: 5
    },
    {
      name: "Arjun Verma",
      role: "Solo Backpacker",
      avatar: "AV",
      quote: "Authentic local guides, transparent packages, and instant confirmed reservations. Highly recommended for final-year project reference or real trips alike!",
      rating: 5
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-void text-light flex flex-col justify-between">
      
      {/* Decorative Blur Spheres */}
      <div className="absolute top-[-10%] left-[-10%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-accent/10 blur-[100px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full bg-glow/10 blur-[120px] pointer-events-none" />

      {/* Modular Hero with background & search */}
      <Hero />

      {/* Popular Destinations catalog preview */}
      <section className="max-w-7xl mx-auto px-6 py-16 relative z-10 w-full border-t border-slate-200 dark:border-slate-800">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-4 mb-8 flex justify-between items-end">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-light font-display">Popular Destinations</h2>
            <p className="text-xs text-muted">A touch of nature, heritage, and scenic mountain ranges</p>
          </div>
        </div>

        {loading ? (
          <LoadingSpinner message="Locating popular getaways..." />
        ) : destinations.length === 0 ? (
          <div className="text-center p-8 bg-surface/50 rounded-2xl border border-slate-200 dark:border-slate-800">
            <p className="text-xs text-muted">No travel destinations seeded yet. Ensure the Spring Boot backend is active.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((dest) => (
              <DestinationCard key={dest.id} destination={dest} />
            ))}
          </div>
        )}
      </section>

      {/* Why Choose TripNest section */}
      <section className="max-w-7xl mx-auto px-6 py-16 relative z-10 w-full border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-center text-2xl font-bold tracking-tight text-light font-display mb-12">Why Choose TripNest</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="flex gap-4 items-start p-6 bg-surface/50 rounded-premium border border-slate-200 dark:border-slate-800 shadow-glass">
            <div className="p-3 bg-accent/10 rounded-xl text-accent shadow-[0_0_15px_rgba(37,99,235,0.1)]">
              <Coffee className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-light">Hospitality & Comfort</h3>
              <p className="text-xs text-muted leading-relaxed">
                Handpicked premium stays equipped with ultimate comforts. Experience top-tier room service and guides.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start p-6 bg-surface/50 rounded-premium border border-slate-200 dark:border-slate-800 shadow-glass">
            <div className="p-3 bg-accent/10 rounded-xl text-accent shadow-[0_0_15px_rgba(37,99,235,0.1)]">
              <Shield className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-light">Security & Trust</h3>
              <p className="text-xs text-muted leading-relaxed">
                100% secure payment methods, instant reservation confirmation vouchers, and 24/7 travel helpline support.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start p-6 bg-surface/50 rounded-premium border border-slate-200 dark:border-slate-800 shadow-glass">
            <div className="p-3 bg-accent/10 rounded-xl text-accent shadow-[0_0_15px_rgba(37,99,235,0.1)]">
              <Award className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-light">Best Price Guarantee</h3>
              <p className="text-xs text-muted leading-relaxed">
                Transparent tour pricing packages with zero hidden fees. Generous discounts for group packages.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Customer Testimonials section */}
      <section className="max-w-7xl mx-auto px-6 py-16 relative z-10 w-full border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-center text-2xl font-bold tracking-tight text-light font-display mb-12">What Travelers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((test, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -3 }}
              className="p-6 bg-surface/60 rounded-premium border border-slate-200 dark:border-slate-800 shadow-glass space-y-4"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent text-white font-black flex items-center justify-center">
                    {test.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-light">{test.name}</h4>
                    <span className="text-[10px] text-muted">{test.role}</span>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-warning text-warning" />
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <Quote className="w-8 h-8 text-accent/20 flex-shrink-0" />
                <p className="text-xs text-muted leading-relaxed italic">{test.quote}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Modular Footer */}
      <Footer />

    </div>
  );
};

export default Home;
