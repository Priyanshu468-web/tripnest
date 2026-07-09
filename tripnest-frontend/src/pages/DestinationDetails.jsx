import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Star, MapPin, Share2, Heart, CloudSun, CloudSnow, Sun, Thermometer,
  ShieldCheck, ArrowLeft, Send, HelpCircle, Map, CheckCircle2, XCircle
} from 'lucide-react';
import toast from 'react-hot-toast';

// Services
import destinationService from '../services/destinationService';
import packageService from '../services/packageService';
import reviewService from '../services/reviewService';

// Components
import Gallery from '../components/Gallery';
import PackageCard from '../components/PackageCard';
import Timeline from '../components/Timeline';
import ReviewCard from '../components/ReviewCard';
import BookingCard from '../components/BookingCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorPage from '../components/ErrorPage';

const DestinationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [destination, setDestination] = useState(null);
  const [packages, setPackages] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Interaction states
  const [inWishlist, setInWishlist] = useState(false);
  const [activeTab, setActiveTab] = useState('overview'); // overview, packages, itinerary, reviews, faqs
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  // Weather variables (derived state)
  const [weather, setWeather] = useState({ temp: 24, text: 'Sunny', icon: Sun });

  useEffect(() => {
    const loadDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Load main destination
        const destData = await destinationService.getDestinationById(id);
        
        // Enrich backend pricing details
        const price = 2000 + (destData.rating * 1500) + ((destData.id || 1) * 850);
        const enrichedDest = {
          ...destData,
          derivedPrice: Math.round(price)
        };
        setDestination(enrichedDest);

        // Load wishlist status
        const saved = localStorage.getItem('tripnest_wishlist');
        const wishlist = saved ? JSON.parse(saved) : [];
        setInWishlist(wishlist.some(item => String(item.id) === String(id)));

        // Load packages
        const pkgs = await packageService.getPackages(id);
        setPackages(pkgs);

        // Load reviews
        const revs = await reviewService.getReviewsByDestination(id);
        setReviews(revs);

        // Determine Weather deterministically based on name
        const name = destData.name.toLowerCase();
        if (name.includes('leh') || name.includes('ladakh') || name.includes('srinagar')) {
          setWeather({ temp: 12, text: 'Cool/Misty', icon: CloudSnow });
        } else if (name.includes('goa')) {
          setWeather({ temp: 31, text: 'Sunny/Humid', icon: Sun });
        } else if (name.includes('munnar') || name.includes('shillong') || name.includes('darjeeling')) {
          setWeather({ temp: 18, text: 'Partly Cloudy', icon: CloudSun });
        } else {
          setWeather({ temp: 26, text: 'Pleasant', icon: CloudSun });
        }

      } catch (err) {
        console.error('Error fetching details', err);
        setError(err.message || 'Could not retrieve destination details.');
      } finally {
        setLoading(false);
      }
    };
    loadDetails();
  }, [id]);

  const handleWishlistToggle = () => {
    const saved = localStorage.getItem('tripnest_wishlist');
    let wishlist = saved ? JSON.parse(saved) : [];
    
    if (inWishlist) {
      wishlist = wishlist.filter(item => String(item.id) !== String(id));
      toast.success('Removed from wishlist');
    } else {
      wishlist.push(destination);
      toast.success('Added to wishlist! ❤️');
    }
    
    localStorage.setItem('tripnest_wishlist', JSON.stringify(wishlist));
    setInWishlist(!inWishlist);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard! 🔗');
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) {
      toast.error('Please enter name and comment');
      return;
    }

    setSubmittingReview(true);
    try {
      const added = await reviewService.createReview({
        destinationId: id,
        authorName: newReviewAuthor,
        rating: newReviewRating,
        comment: newReviewComment
      });

      setReviews(prev => [added, ...prev]);
      toast.success('Thank you for your review!');
      setNewReviewAuthor('');
      setNewReviewComment('');
      setNewReviewRating(5);
    } catch (err) {
      toast.error('Failed to submit review');
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><LoadingSpinner message="Fetching details of your next gateway..." /></div>;
  if (error) return <div className="max-w-4xl mx-auto pt-12"><ErrorPage message={error} onRetry={() => window.location.reload()} /></div>;
  if (!destination) return null;

  // Custom static galleries
  const galleryImages = [
    destination.imageUrl,
    "https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=400&auto=format&fit=crop"
  ];

  const highlights = [
    "Premium resort stays with top-rated hospitality",
    "Tailored sightseeing with licensed local guides",
    "Curated traditional dining experiences included",
    "Comfortable private SUV travel during sight-seeing"
  ];

  const includedItems = ["Hotel Accommodations", "Daily Breakfast & Dinner buffet", "Dedicated Private Chauffeur & Vehicle", "Standard Entrance Tickets", "All Tolls & taxes"];
  const excludedItems = ["Airfare/Train tickets", "Lunch meals & snack costs", "Personal expenses (laundry, telephone, tips)", "Optional activity fees (rafting, paragliding)"];

  const activities = ["Cultural Monument tour", "Traditional handloom weaving visits", "Guided nature walk & bird watching", "Photography hotspots session"];
  const nearbyAttractions = ["Local craft heritage museum (3.2 km)", "Mountain stream waterfall picnic site (7.5 km)", "Ancient pine valley park (4.8 km)"];

  const faqs = [
    { q: "What is the best time to visit?", a: "This location is scenic year-round, but generally dry seasons from September to May offer the most optimal outdoor activity weather." },
    { q: "Are custom trip extensions allowed?", a: "Absolutely! After booking, our trip concierge team will call you to tailor dates or add custom hotel upgrades." },
    { q: "Is travel insurance included?", a: "Standard travel medical insurance is not included. We strongly recommend purchasing coverage separately." }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 relative space-y-8 animate-scale-in bg-void">
      
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-xs font-bold text-muted hover:text-light hover:bg-hover px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Catalog</span>
      </button>

      {/* Hero Banner */}
      <div className="relative h-64 sm:h-[450px] w-full rounded-premium overflow-hidden border border-slate-200 dark:border-slate-800 shadow-glass">
        <img 
          src={destination.imageUrl} 
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-6 sm:p-8">
          <div className="max-w-3xl space-y-3">
            <span className="flex items-center gap-1.5 text-xs font-bold text-accent bg-accent/20 border border-accent/30 w-fit px-3 py-1 rounded-full uppercase">
              <MapPin className="w-3.5 h-3.5" />
              <span>{destination.country}</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight leading-tight">
              {destination.name}
            </h1>
          </div>
        </div>
      </div>

      {/* Actions & Core Stats bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex gap-2 items-center">
          <div className="flex items-center gap-1 text-sm font-bold text-amber-600 bg-amber-500/10 px-3 py-1.5 rounded-xl">
            <Star className="w-4 h-4 fill-warning text-warning" />
            <span>{destination.rating?.toFixed(1) || "4.8"} Rating</span>
          </div>
          <span className="text-xs text-muted font-semibold">({reviews.length} Customer Reviews)</span>
        </div>

        {/* Share & Wishlist buttons */}
        <div className="flex gap-2">
          <button 
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-800 hover:bg-hover text-muted hover:text-light text-xs font-bold rounded-xl transition-all"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
          <button 
            onClick={handleWishlistToggle}
            className={`flex items-center gap-2 px-4 py-2 border text-xs font-bold rounded-xl transition-all ${
              inWishlist 
                ? 'bg-rose-500/10 border-rose-500 text-rose-500' 
                : 'border-slate-200 dark:border-slate-800 hover:bg-hover text-muted hover:text-light'
            }`}
          >
            <Heart className={`w-4 h-4 ${inWishlist ? 'fill-rose-500 text-rose-500' : ''}`} />
            <span>{inWishlist ? 'Saved' : 'Wishlist'}</span>
          </button>
        </div>
      </div>

      {/* Grid Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Detail Tabs */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Tab Navigation header */}
          <div className="flex overflow-x-auto gap-1 p-1 bg-surface border border-slate-200 dark:border-slate-800 rounded-xl scrollbar-none">
            {['overview', 'packages', 'itinerary', 'reviews', 'faqs'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all uppercase tracking-wider flex-shrink-0 ${
                  activeTab === tab 
                    ? 'bg-accent text-white shadow-md' 
                    : 'text-muted hover:text-light hover:bg-hover/40'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Dynamic Tab Body */}
          <div className="space-y-8">
            {activeTab === 'overview' && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="space-y-8"
              >
                {/* Description */}
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-light font-display">Overview</h3>
                  <p className="text-sm text-muted leading-relaxed font-sans">{destination.description}</p>
                </div>

                {/* Highlights list */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-light font-display">Key Highlights</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {highlights.map((hl, idx) => (
                      <div key={idx} className="flex gap-2.5 items-start p-4 bg-surface/50 border border-slate-200 dark:border-slate-800 rounded-xl">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-light leading-relaxed">{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Included/Excluded Grids */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-3 p-5 rounded-premium bg-surface/50 border border-slate-200 dark:border-slate-800">
                    <h4 className="text-xs font-bold text-light block uppercase tracking-widest border-l-2 border-emerald-500 pl-2">What's Included</h4>
                    <ul className="space-y-2 pt-2">
                      {includedItems.map((inc, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-muted">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3 p-5 rounded-premium bg-surface/50 border border-slate-200 dark:border-slate-800">
                    <h4 className="text-xs font-bold text-light block uppercase tracking-widest border-l-2 border-rose-500 pl-2">What's Excluded</h4>
                    <ul className="space-y-2 pt-2">
                      {excludedItems.map((exc, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-muted">
                          <XCircle className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
                          <span>{exc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Photo Gallery */}
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-light font-display">Image Gallery</h3>
                  <Gallery images={galleryImages} />
                </div>

                {/* Activities & Nearby Attractions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2.5">
                    <h4 className="font-extrabold text-sm text-light font-display">Activities Included</h4>
                    <ul className="space-y-1.5">
                      {activities.map((act, i) => (
                        <li key={i} className="text-xs text-muted flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="space-y-2.5">
                    <h4 className="font-extrabold text-sm text-light font-display">Nearby Attractions</h4>
                    <ul className="space-y-1.5">
                      {nearbyAttractions.map((att, i) => (
                        <li key={i} className="text-xs text-muted flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-glow" />
                          <span>{att}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'packages' && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-bold text-light font-display">Select Tour Package</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {packages.map((pkg) => (
                    <PackageCard key={pkg.id} pkg={pkg} destinationId={destination.id} />
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'itinerary' && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <h3 className="text-lg font-bold text-light font-display">Timeline Itinerary</h3>
                <Timeline />
              </motion.div>
            )}

            {activeTab === 'reviews' && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="space-y-8"
              >
                {/* Submit Form */}
                <div className="p-5 rounded-premium bg-surface/50 border border-slate-200 dark:border-slate-800 space-y-4">
                  <h4 className="font-extrabold text-sm text-light font-display">Add a Review</h4>
                  <form onSubmit={handleReviewSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-muted">Your Name</label>
                        <input
                          type="text"
                          required
                          value={newReviewAuthor}
                          onChange={(e) => setNewReviewAuthor(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-void border border-slate-200 dark:border-slate-800 text-xs text-light focus:outline-none"
                          placeholder="e.g. Priyas"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-muted">Rating</label>
                        <select
                          value={newReviewRating}
                          onChange={(e) => setNewReviewRating(parseFloat(e.target.value))}
                          className="w-full px-3 py-2 rounded-xl bg-void border border-slate-200 dark:border-slate-800 text-xs text-light focus:outline-none"
                        >
                          <option value="5">5 Stars (Excellent)</option>
                          <option value="4">4 Stars (Good)</option>
                          <option value="3">3 Stars (Average)</option>
                          <option value="2">2 Stars (Poor)</option>
                          <option value="1">1 Star (Very Bad)</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-muted">Comment</label>
                      <textarea
                        required
                        value={newReviewComment}
                        onChange={(e) => setNewReviewComment(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-void border border-slate-200 dark:border-slate-800 text-xs text-light focus:outline-none h-20 resize-none"
                        placeholder="Write your travel feedback..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submittingReview}
                      className="flex items-center justify-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent/90 text-white rounded-xl text-xs font-bold transition-all shadow-md"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{submittingReview ? 'Submitting...' : 'Post Review'}</span>
                    </button>
                  </form>
                </div>

                {/* Reviews List */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-light font-display">Customer Testimonials</h3>
                  {reviews.length === 0 ? (
                    <p className="text-xs text-muted">No reviews listed yet. Be the first to add one!</p>
                  ) : (
                    <div className="space-y-4">
                      {reviews.map((rev) => (
                        <ReviewCard key={rev.id} review={rev} />
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'faqs' && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-bold text-light font-display">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  {faqs.map((faq, idx) => (
                    <div key={idx} className="p-4 bg-surface/50 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
                      <div className="flex items-start gap-2.5">
                        <HelpCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <h4 className="font-extrabold text-sm text-light leading-snug">{faq.q}</h4>
                      </div>
                      <p className="text-xs text-muted pl-7 leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Right Side: Sticky Booking Side Card & Weather Widget */}
        <div className="lg:col-span-4 space-y-6">
          {/* Booking Card */}
          <BookingCard destination={destination} />

          {/* Dynamic Weather Widget */}
          <div className="rounded-premium p-6 bg-surface/75 border border-slate-200 dark:border-slate-800 shadow-glass flex items-center justify-between">
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-light block uppercase tracking-widest">Local Weather</h4>
              <div className="flex gap-2 items-center">
                <Thermometer className="w-5 h-5 text-accent" />
                <span className="text-2xl font-black font-mono text-light">{weather.temp}°C</span>
              </div>
              <span className="text-xs text-muted block font-semibold">{weather.text} Condition</span>
            </div>
            <div className="p-3 bg-accent/15 text-accent rounded-full animate-pulse">
              <weather.icon className="w-10 h-10" />
            </div>
          </div>

          {/* Embedded Google Map Stub */}
          <div className="rounded-premium p-4 bg-surface/75 border border-slate-200 dark:border-slate-800 shadow-glass space-y-3">
            <div className="flex gap-2 items-center">
              <Map className="w-4.5 h-4.5 text-accent" />
              <h4 className="text-xs font-bold text-light uppercase tracking-widest font-display">Route Guide</h4>
            </div>
            <div className="h-44 w-full rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-950 relative border border-slate-200 dark:border-slate-800">
              <iframe
                title="Location Map"
                src={`https://maps.google.com/maps?q=${destination.latitude || 27},${destination.longitude || 78}&t=&z=10&ie=UTF8&iwloc=&output=embed`}
                className="w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"
              />
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default DestinationDetails;
