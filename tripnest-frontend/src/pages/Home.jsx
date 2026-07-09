import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Coffee, Shield, Award, Compass, Search, Globe, ChevronLeft, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';

const Home = () => {
  const navigate = useNavigate();

  // Search widget state
  const [hotelSearch, setHotelSearch] = useState({
    name: '',
    checkIn: '',
    checkOut: '',
    stars: '5 Stars',
    price: '1500',
    propertyType: 'Resorts'
  });

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    toast.success(`Locating properties in Northeast India matching: ${hotelSearch.name || 'All'}... 🌌`);
  };

  const stays = [
    {
      name: 'LA NICHOLAS RESORT',
      location: 'Ri-Bhoi',
      rating: 5,
      price: '₹ 7280',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format&fit=crop'
    },
    {
      name: 'PUJA GUEST HOUSE',
      location: 'Shillong',
      rating: 5,
      price: '₹ 2240',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=600&auto=format&fit=crop'
    },
    {
      name: 'LIVE INN GUEST HOUSE',
      location: 'Shillong',
      rating: 5,
      price: '₹ 1800',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600&auto=format&fit=crop'
    },
    {
      name: 'SOHRA PLAZA',
      location: 'Cherrapunji (Sohra)',
      rating: 5,
      price: '₹ 3000',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=600&auto=format&fit=crop'
    }
  ];

  const popularDestinations = [
    {
      name: 'STAY IN SIKKIM',
      desc: 'A MUST-SEE DESTINATION OF INDIA, SIKKIM IS BLESSED WITH A MARVELOUS ARRAY OF NATURAL MARVELS AND MONASTERIES.',
      rating: 5,
      wiki: 'https://en.wikipedia.org/wiki/Sikkim',
      image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=600&auto=format&fit=crop'
    },
    {
      name: 'STAY IN ARUNACHAL',
      desc: 'THE LAND OF DAWN-LIT MOUNTAINS, ARUNACHAL PRADESH IS THE LARGEST STATE IN NORTH-EAST INDIA, RICH IN CULTURAL TRIBES.',
      rating: 5,
      wiki: 'https://en.wikipedia.org/wiki/Arunachal_Pradesh',
      image: 'https://images.unsplash.com/photo-1600100397608-f010e423b971?q=80&w=600&auto=format&fit=crop'
    },
    {
      name: 'STAY IN MAJULI',
      desc: 'ASSAM IS A STATE IN NORTH-EASTERN INDIA KNOWN FOR ITS FLORA AND MAJULI, THE WORLD\'S LARGEST RIVER ISLAND.',
      rating: 5,
      wiki: 'https://en.wikipedia.org/wiki/Majuli',
      image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=600&auto=format&fit=crop'
    },
    {
      name: 'STAY IN GUWAHATI',
      desc: 'GUWAHATI IS A MIST OF WONDER, RICH IN HISTORY AND CULTURE SERVING AS AN IDEAL PLACE FOR EXPLORING THE ANCIENT TEMPLES.',
      rating: 5,
      wiki: 'https://en.wikipedia.org/wiki/Guwahati',
      image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=80&w=600&auto=format&fit=crop'
    },
    {
      name: 'STAY IN KAZIRANGA',
      desc: 'WIDELY KNOWN FOR ONE HORNED RHINOCEROS AND A LARGE NUMBER OF BIRD SPECIES, KAZIRANGA IS A WILDLIFE PARADISE.',
      rating: 5,
      wiki: 'https://en.wikipedia.org/wiki/Kaziranga_National_Park',
      image: 'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?q=80&w=600&auto=format&fit=crop'
    },
    {
      name: 'STAY IN SHILLONG',
      desc: 'YOUR STAY IN SHILLONG IS JUST AN IDEAL MATCH FOR YOUR DESTINATION REQUIREMENTS WITH WIDE ROADS AND GREEN FORESTS.',
      rating: 5,
      wiki: 'https://en.wikipedia.org/wiki/Shillong',
      image: 'https://images.unsplash.com/photo-1571401888144-1273fb874e30?q=80&w=600&auto=format&fit=crop'
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-void text-light flex flex-col justify-between">
      
      {/* Decorative Blur Spheres */}
      <div className="absolute top-[-10%] left-[-10%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-accent/10 blur-[100px] pointer-events-none" />
      <div className="absolute top-[50%] right-[-10%] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full bg-glow/10 blur-[120px] pointer-events-none" />

      {/* 🚀 Hero Section with Background image & Left Side Search Widget */}
      <section 
        className="relative min-h-[85vh] flex items-center justify-center py-16 px-6 bg-cover bg-center border-b border-white/5"
        style={{ 
          backgroundImage: `linear-gradient(to bottom, rgba(13,17,23,0.7), rgba(13,17,23,0.85)), url('https://images.unsplash.com/photo-1571401888144-1273fb874e30?q=80&w=1200&auto=format&fit=crop')` 
        }}
      >
        <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Left Side: Booking Engine Form */}
          <div className="lg:col-span-4 rounded-3xl bg-surface/90 border border-white/10 p-6 shadow-glass-lg space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-accent border-b border-white/5 pb-2 font-display">
              Find Hotels & Resorts
            </h3>
            
            <form onSubmit={handleSearchSubmit} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-muted uppercase tracking-wider" htmlFor="name">Hotel Name</label>
                <input 
                  type="text" 
                  id="name"
                  placeholder="e.g. La Nicholas"
                  value={hotelSearch.name}
                  onChange={(e) => setHotelSearch({...hotelSearch, name: e.target.value})}
                  className="w-full px-3.5 py-2 rounded-lg bg-void/50 border border-white/10 text-xs text-light placeholder-muted focus:outline-none focus:border-accent"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted uppercase tracking-wider" htmlFor="checkIn">Check In</label>
                  <input 
                    type="date" 
                    id="checkIn"
                    value={hotelSearch.checkIn}
                    onChange={(e) => setHotelSearch({...hotelSearch, checkIn: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg bg-void/50 border border-white/10 text-xs text-light focus:outline-none focus:border-accent"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted uppercase tracking-wider" htmlFor="checkOut">Check Out</label>
                  <input 
                    type="date" 
                    id="checkOut"
                    value={hotelSearch.checkOut}
                    onChange={(e) => setHotelSearch({...hotelSearch, checkOut: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg bg-void/50 border border-white/10 text-xs text-light focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted uppercase tracking-wider" htmlFor="stars">Hotel Stars</label>
                  <select 
                    id="stars"
                    value={hotelSearch.stars}
                    onChange={(e) => setHotelSearch({...hotelSearch, stars: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg bg-void/50 border border-white/10 text-xs text-light focus:outline-none focus:border-accent"
                  >
                    <option>5 Stars</option>
                    <option>4 Stars</option>
                    <option>3 Stars</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted uppercase tracking-wider" htmlFor="price">Max Price (₹)</label>
                  <input 
                    type="number" 
                    id="price"
                    placeholder="1500"
                    value={hotelSearch.price}
                    onChange={(e) => setHotelSearch({...hotelSearch, price: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg bg-void/50 border border-white/10 text-xs text-light focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-muted uppercase tracking-wider" htmlFor="propertyType">Property Type</label>
                <select 
                  id="propertyType"
                  value={hotelSearch.propertyType}
                  onChange={(e) => setHotelSearch({...hotelSearch, propertyType: e.target.value})}
                  className="w-full px-3 py-2.5 rounded-lg bg-void/50 border border-white/10 text-xs text-light focus:outline-none focus:border-accent"
                >
                  <option>Resorts</option>
                  <option>Hotels</option>
                  <option>Guest House</option>
                </select>
              </div>

              <button 
                type="submit" 
                className="w-full bg-[#FF6B00] hover:bg-[#FF7A00] text-white font-bold py-2.5 rounded-lg text-xs transition-colors tracking-widest uppercase shadow-md shadow-orange-500/10 mt-2"
              >
                Search
              </button>
            </form>
          </div>

          {/* Right Side: Copywriting slider & Exclusive Deals */}
          <div className="lg:col-span-8 space-y-8 lg:pl-8">
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-light leading-tight font-display">
                GREAT JOURNEY BEGINS WITH A SMALL STEP
              </h2>
              <p className="text-muted text-base sm:text-lg max-w-xl">
                Make Your Life Better and Bright! You must trip with Us!
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={() => navigate('/register')} 
                  className="btn-glow-primary px-6 py-3 text-xs"
                >
                  Start Planning
                </button>
                <a 
                  href="#popular" 
                  className="btn-glow-secondary px-6 py-3 text-xs"
                >
                  Learn More
                </a>
              </div>
            </div>

            {/* Exclusive side cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-white/5">
              <div className="flex gap-3.5 items-center p-3.5 bg-surface/80 rounded-2xl border border-white/5">
                <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-void/50">
                  <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=200" alt="exclusive-deal" className="w-full h-full object-cover" />
                </div>
                <div className="text-[10px]">
                  <span className="font-extrabold text-[#FF6B00] block tracking-wider">EXCLUSIVE 20%</span>
                  <span className="text-muted block mt-0.5">LOCATION: RI-BHOI</span>
                  <span className="font-bold text-light block mt-0.5 font-mono">₹ 7280</span>
                </div>
              </div>

              <div className="flex gap-3.5 items-center p-3.5 bg-surface/80 rounded-2xl border border-white/5">
                <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-void/50">
                  <img src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=200" alt="exclusive-deal" className="w-full h-full object-cover" />
                </div>
                <div className="text-[10px]">
                  <span className="font-extrabold text-[#FF6B00] block tracking-wider">EXCLUSIVE 10%</span>
                  <span className="text-muted block mt-0.5">LOCATION: CHERRAPUNJI (SOHRA)</span>
                  <span className="font-bold text-light block mt-0.5 font-mono">₹ 3000</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Resorts / Stays section */}
      <section className="max-w-7xl mx-auto px-6 py-16 relative z-10 w-full" id="stays">
        <div className="border-b border-white/5 pb-4 mb-8">
          <h2 className="text-xl font-bold tracking-tight text-light font-display">Stays & Resorts</h2>
          <p className="text-xs text-muted">Handpicked premium stays in Ri-Bhoi, Shillong, and Cherrapunji</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stays.map((stay) => (
            <motion.div 
              key={stay.name}
              whileHover={{ y: -5 }}
              className="rounded-2xl bg-surface/80 border border-white/5 p-4 flex flex-col justify-between shadow-glass hover:border-accent/20 transition-all duration-300 group"
            >
              <div className="space-y-3">
                <div className="h-44 w-full rounded-xl overflow-hidden bg-void/50 border border-white/5 relative">
                  <img 
                    src={stay.image} 
                    alt={stay.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-void/80 px-2 py-0.5 rounded text-[10px] font-semibold text-accent border border-white/5">
                    {stay.location}
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-xs text-light tracking-wide truncate" title={stay.name}>
                    {stay.name}
                  </h3>
                  <div className="flex gap-0.5">
                    {[...Array(stay.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-warning fill-warning" />
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center border-t border-white/5 mt-4 pt-3">
                <div>
                  <span className="text-[9px] text-muted block uppercase font-bold tracking-wider">Price</span>
                  <span className="text-sm font-bold font-mono text-accent">{stay.price}</span>
                </div>
                <button 
                  onClick={() => toast.success(`Starting booking flow for ${stay.name}`)}
                  className="px-3 py-1.5 bg-hover/80 hover:bg-[#FF6B00] hover:text-white rounded-lg text-xs font-bold transition-all border border-white/5"
                >
                  Book Stay
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Reasons to book with us */}
      <section className="max-w-7xl mx-auto px-6 py-16 relative z-10 w-full border-t border-white/5">
        <h2 className="text-center text-xl font-bold tracking-tight text-light font-display mb-12">REASONS TO BOOK WITH US</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          <div className="flex gap-4 items-start p-6 bg-surface/50 rounded-2xl border border-white/5 shadow-glass">
            <div className="p-3 bg-accent/10 rounded-xl text-accent shadow-[0_0_15px_rgba(99,102,241,0.1)]">
              <Coffee className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-light">EASY AND COMFORT STAY</h3>
              <p className="text-xs text-muted leading-relaxed">
                Rooms equipped with comfort, with all the essentials that you seek. Your staying filled with our hospitality.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start p-6 bg-surface/50 rounded-2xl border border-white/5 shadow-glass">
            <div className="p-3 bg-accent/10 rounded-xl text-accent shadow-[0_0_15px_rgba(99,102,241,0.1)]">
              <Shield className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-light">SECURITY</h3>
              <p className="text-xs text-muted leading-relaxed">
                Safe sound and secure with an assurance that our guest gets the best of memories they look at when they are a past of our guest.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 🏞️ Popular Indian Destinations list (replicated from screenshots) */}
      <section className="max-w-7xl mx-auto px-6 py-16 relative z-10 w-full border-t border-white/5" id="popular">
        <div className="border-b border-white/5 pb-4 mb-8">
          <h2 className="text-xl font-bold tracking-tight text-light font-display">POPULAR DESTINATIONS</h2>
          <p className="text-xs text-muted font-display">A touch of Nature to the land of culture</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularDestinations.map((dest, idx) => (
            <motion.div 
              key={dest.name}
              whileHover={{ y: -5 }}
              className="rounded-2xl bg-surface/85 border border-white/5 p-4 flex flex-col justify-between shadow-glass hover:border-accent/20 transition-all duration-300 group"
            >
              <div className="space-y-4">
                <div className="h-48 w-full rounded-xl overflow-hidden bg-void/50 border border-white/5">
                  <img 
                    src={dest.image} 
                    alt={dest.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="font-extrabold text-sm text-light font-display tracking-wider">
                      {dest.name}
                    </h3>
                    <div className="flex gap-0.5">
                      {[...Array(dest.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-warning text-warning" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-muted leading-relaxed uppercase">
                    {dest.desc}
                  </p>
                </div>
              </div>

              <div className="border-t border-white/5 mt-5 pt-4 flex justify-between items-center">
                <button
                  onClick={() => navigate('/dashboard/create-trip', { state: { destination: dest.name.split('IN ')[1] } })}
                  className="btn-glow-primary text-xs py-2 px-4"
                >
                  Plan Trip
                </button>
                <a 
                  href={dest.wiki}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 bg-hover/80 hover:bg-hover text-muted hover:text-light rounded-xl text-xs font-bold border border-white/5 transition-all text-center flex items-center gap-1.5"
                >
                  <Globe className="w-4 h-4 text-accent" />
                  <span>Wikipedia</span>
                </a>
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
