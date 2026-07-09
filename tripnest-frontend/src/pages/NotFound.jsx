import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, MoveLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-void px-6 text-center">
      
      {/* Visual Icon */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="p-5 bg-accent/10 text-accent rounded-full mb-6 border border-accent/20 shadow-glow"
      >
        <Compass className="w-16 h-16 animate-spin-slow" />
      </motion.div>

      {/* Message */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4 max-w-md animate-scale-in"
      >
        <h1 className="text-4xl font-extrabold tracking-tight text-light font-display">
          Lost In Transit (404)
        </h1>
        <p className="text-sm text-muted leading-relaxed">
          It looks like you have drifted off the map! The travel page you are trying to visit doesn't exist or was moved.
        </p>

        {/* Back Link */}
        <div className="pt-4">
          <Link 
            to="/" 
            className="btn-glow-primary inline-flex items-center gap-2"
          >
            <MoveLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
        </div>
      </motion.div>

    </div>
  );
};

export default NotFound;
