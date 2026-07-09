import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Compass } from 'lucide-react';
import toast from 'react-hot-toast';

const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    toast.success('Thank you for subscribing to TripNest newsletters! 🌌');
    setNewsletterEmail('');
  };

  const featuredDeals = [
    {
      title: 'EXCLUSIVE 20%',
      location: 'Srinagar (Dal Lake)',
      price: '₹ 9,500',
      image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=80&w=200&auto=format&fit=crop'
    },
    {
      title: 'EXCLUSIVE 15%',
      location: 'Munnar Tea Estates',
      price: '₹ 16,800',
      image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=200&auto=format&fit=crop'
    }
  ];

  return (
    <footer className="w-full bg-surface/80 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 pt-16 pb-8 relative z-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
        
        {/* Brand & Get in Touch */}
        <div className="lg:col-span-3 space-y-4">
          <Link to="/" className="flex items-center gap-2 font-extrabold text-xl tracking-tight text-accent">
            <Compass className="w-6 h-6 text-accent animate-spin-slow" />
            <span className="bg-gradient-to-r from-accent to-glow bg-clip-text text-transparent">
              TripNest
            </span>
          </Link>
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

        {/* Featured Deals */}
        <div className="lg:col-span-3 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-light border-l-2 border-accent pl-2 font-display">
            Featured Deals
          </h3>
          <div className="space-y-3">
            {featuredDeals.map((deal, idx) => (
              <div key={idx} className="flex gap-3 items-center">
                <div className="w-14 h-10 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 bg-void flex-shrink-0">
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

        {/* Popular Locations */}
        <div className="lg:col-span-3 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-light border-l-2 border-accent pl-2 font-display">
            Popular Destinations
          </h3>
          <ul className="grid grid-cols-2 gap-2 text-xs text-muted">
            {['Srinagar', 'Ladakh', 'Munnar', 'Goa', 'Udaipur', 'Shillong'].map((dest) => (
              <li key={dest} className="hover:text-accent transition-colors flex items-center gap-1.5 cursor-pointer">
                <span className="w-1.5 h-1.5 rounded-full bg-accent/40" />
                <span>{dest}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter Sign Up */}
        <div className="lg:col-span-3 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-light border-l-2 border-accent pl-2 font-display">
            Newsletter Sign Up
          </h3>
          <form onSubmit={handleSubscribe} className="space-y-3">
            <input 
              type="email" 
              placeholder="Your email address" 
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-void border border-slate-200 dark:border-slate-800 text-xs text-light focus:outline-none focus:border-accent"
              required
            />
            <button 
              type="submit" 
              className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-2.5 rounded-xl text-xs transition-colors tracking-widest uppercase shadow-md hover:shadow-glow"
            >
              Subscribe
            </button>
          </form>
        </div>

      </div>

      {/* Sub-Footer Copyright */}
      <div className="max-w-7xl mx-auto px-6 border-t border-slate-200 dark:border-slate-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-muted">
        <p>© COPYRIGHT {new Date().getFullYear()} BY TRIPNEST.IN. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-accent transition-colors">Contact Support</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
