import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, MapPin, Star, Search, Shield, Coffee, Award, Mail, Phone, Map } from 'lucide-react';
import toast from 'react-hot-toast';

const Home = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    toast.success('Thank you for subscribing! 🌌');
    setNewsletterEmail('');
  };

  const stays = [
    {
      name: 'LA NICHOLAS RESORT',
      location: 'Ri-Bhoi',
      rating: 5,
      price: '₹ 7,280',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format&fit=crop'
    },
    {
      name: 'SOHRA PLAZA',
      location: 'Cherrapunjee (Sohra)',
      rating: 5,
      price: '₹ 3,000',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=600&auto=format&fit=crop'
    },
    {
      name: 'PUJA GUEST HOUSE',
      location: 'Shillong',
      rating: 5,
      price: '₹ 2,240',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=600&auto=format&fit=crop'
    },
    {
      name: 'LIVE INN GUEST HOUSE',
      location: 'Shillong',
      rating: 5,
      price: '₹ 1,800',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600&auto=format&fit=crop'
    }
  ];

  const categories = [
    {
      name: 'STAY IN SIKKIM',
      desc: 'A must-see destination of India. Sikkim is blessed with a marvelous array of natural marvels.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=600&auto=format&fit=crop'
    },
    {
      name: 'STAY IN MAJULI',
      desc: 'Assam is a state in North-Eastern India known for its flora and river islands.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=600&auto=format&fit=crop'
    },
    {
      name: 'STAY IN SHILLONG',
      desc: 'Your stay in Shillong is just an ideal match for your destination requirements.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1571401888144-1273fb874e30?q=80&w=600&auto=format&fit=crop'
    }
  ];

  const featuredDeals = [
    {
      title: 'EXCLUSIVE 20%',
      location: 'CHERAPUNJEE',
      price: '₹ 999',
      image: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?q=80&w=200&auto=format&fit=crop'
    },
    {
      title: 'EXCLUSIVE 15%',
      location: 'SHILLONG',
      price: '₹ 1,500',
      image: 'https://images.unsplash.com/photo-1504829857797-ddff28127792?q=80&w=200&auto=format&fit=crop'
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-void text-light flex flex-col justify-between">
      
      {/* Decorative Blur Spheres */}
      <div className="absolute top-[-10%] left-[-10%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-accent/10 blur-[100px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full bg-glow/10 blur-[120px] pointer-events-none" />

      {/* Hero Header Section */}
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-16 text-center space-y-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/10 border border-accent/20 text-accent font-semibold text-xs rounded-full"
        >
          <Compass className="w-4 h-4 animate-spin-slow" />
          <span>Explore the Unexplored</span>
        </motion.div>
        
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight font-display">
          Your Journey Our Hospitality
        </h1>
        <p className="text-muted text-base sm:text-lg max-w-2xl mx-auto">
          Design weightless itineraries, track currencies, divide dinner bills, and explore popular Northeast Indian getaways in one premium digital dashboard.
        </p>

        <div className="flex justify-center gap-4 pt-4">
          <Link to="/register" className="btn-glow-primary px-8 py-3.5">
            Start Planning Free
          </Link>
          <Link to="/login" className="btn-glow-secondary px-8 py-3.5">
            Sign In
          </Link>
        </div>
      </div>

      {/* Resorts / Stays section */}
      <section className="max-w-7xl mx-auto px-6 py-12 relative z-10 w-full">
        <div className="border-b border-white/5 pb-4 mb-8 flex justify-between items-end">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-light font-display">Stays & Resorts</h2>
            <p className="text-xs text-muted">Handpicked accommodations for your comfort</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stays.map((stay, idx) => (
            <motion.div 
              key={stay.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
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
                  <span className="text-[10px] text-muted block uppercase font-bold tracking-wider">Avg / Night</span>
                  <span className="text-sm font-bold font-mono text-accent">{stay.price}</span>
                </div>
                <button 
                  onClick={() => toast.success(`Viewing rates for ${stay.name}`)}
                  className="px-3 py-1.5 bg-hover/80 hover:bg-accent hover:text-white rounded-lg text-xs font-bold transition-all border border-white/5"
                >
                  Book Stay
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Reasons to book with us */}
      <section className="max-w-7xl mx-auto px-6 py-12 relative z-10 w-full border-t border-white/5">
        <h2 className="text-center text-xl font-bold tracking-tight text-light font-display mb-12">Reasons To Book With Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex gap-4 items-start p-6 bg-surface/50 rounded-2xl border border-white/5">
            <div className="p-3 bg-accent/10 rounded-xl text-accent shadow-[0_0_15px_rgba(99,102,241,0.1)]">
              <Coffee className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-light">Easy and Comfort Stay</h3>
              <p className="text-xs text-muted leading-relaxed">
                Rooms equipped with comfort, with all the essentials that you seek. Your staying filled with our hospitality.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start p-6 bg-surface/50 rounded-2xl border border-white/5">
            <div className="p-3 bg-accent/10 rounded-xl text-accent shadow-[0_0_15px_rgba(99,102,241,0.1)]">
              <Shield className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-light">Security & Trust</h3>
              <p className="text-xs text-muted leading-relaxed">
                Safe, sound, and secure rooms. We make sure our guest gets the best service and absolute peace of mind.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start p-6 bg-surface/50 rounded-2xl border border-white/5">
            <div className="p-3 bg-accent/10 rounded-xl text-accent shadow-[0_0_15px_rgba(99,102,241,0.1)]">
              <Award className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-light">Top Rated Services</h3>
              <p className="text-xs text-muted leading-relaxed">
                Consistently high reviews for hospitality, guides, hygiene, and local travel itinerary arrangements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Highlight Categories section */}
      <section className="max-w-7xl mx-auto px-6 py-12 relative z-10 w-full border-t border-white/5">
        <div className="border-b border-white/5 pb-4 mb-8">
          <h2 className="text-xl font-bold tracking-tight text-light font-display">Popular Destinations</h2>
          <p className="text-xs text-muted">A touch of Nature to the land of culture</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <motion.div 
              key={cat.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -5 }}
              className="rounded-2xl bg-surface/80 border border-white/5 p-4 flex flex-col justify-between shadow-glass hover:border-accent/20 transition-all duration-300 group"
            >
              <div className="space-y-4">
                <div className="h-48 w-full rounded-xl overflow-hidden bg-void/50 border border-white/5">
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="font-extrabold text-sm text-light font-display tracking-wider">
                    {cat.name}
                  </h3>
                  <div className="flex gap-0.5">
                    {[...Array(cat.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-warning fill-warning" />
                    ))}
                  </div>
                  <p className="text-xs text-muted leading-relaxed">
                    {cat.desc}
                  </p>
                </div>
              </div>

              <div className="border-t border-white/5 mt-4 pt-3 flex justify-end">
                <button 
                  onClick={() => toast.success(`Exploring tours in ${cat.name.split('IN ')[1]}`)}
                  className="btn-glow-primary text-xs py-2 px-4"
                >
                  Explore Tour
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Main Footer Section */}
      <footer className="w-full bg-surface/90 border-t border-white/5 pt-16 pb-8 relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Column 1: Get in Touch */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-light border-l-2 border-accent pl-2">
              Get In Touch
            </h3>
            <ul className="space-y-3 text-xs text-muted">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <span>
                  No-8, Oakland, Bivar Road,<br />
                  Shillong, Meghalaya-793001
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-accent flex-shrink-0" />
                <span>+91 603 317 4441</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-accent flex-shrink-0" />
                <span>support@tripnest.in</span>
              </li>
            </ul>
          </div>

          {/* Column 2: Featured Deals */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-light border-l-2 border-accent pl-2">
              Featured Deals
            </h3>
            <div className="space-y-4">
              {featuredDeals.map((deal, idx) => (
                <div key={idx} className="flex gap-3 items-center">
                  <div className="w-14 h-10 rounded overflow-hidden border border-white/5 bg-void/50 flex-shrink-0">
                    <img src={deal.image} alt={deal.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="text-[10px]">
                    <span className="font-extrabold text-light block tracking-wider">{deal.title}</span>
                    <span className="text-muted uppercase tracking-wider block">Location: {deal.location}</span>
                    <span className="font-bold text-accent block font-mono">{deal.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Travel In */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-light border-l-2 border-accent pl-2">
              Travel In
            </h3>
            <ul className="grid grid-cols-2 gap-2 text-xs text-muted">
              {['Shillong', 'Guwahati', 'Kaziranga', 'Majuli', 'Arunachal', 'Sikkim'].map((dest) => (
                <li key={dest} className="hover:text-accent transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent/40" />
                  <span>{dest}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter Sign Up */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-light border-l-2 border-accent pl-2">
              Newsletter Sign Up
            </h3>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input 
                type="email" 
                placeholder="your email" 
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full px-3 py-2 rounded bg-void/50 border border-white/10 text-xs text-light focus:outline-none focus:border-accent"
                required
              />
              <button 
                type="submit" 
                className="w-full bg-[#FF6B00] hover:bg-[#FF7A00] text-white font-bold py-2 rounded text-xs transition-colors tracking-widest uppercase"
              >
                Sign Up
              </button>
            </form>
          </div>

        </div>

        {/* Sub-Footer Copyright */}
        <div className="max-w-7xl mx-auto px-6 border-t border-white/5 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-muted">
          <p>© COPYRIGHT 2021-22 BY TRIPNEST.IN. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-accent transition-colors">Contact Support</a>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Home;
