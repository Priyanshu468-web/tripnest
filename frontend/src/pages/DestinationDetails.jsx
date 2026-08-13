import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { destinationService } from '../services/destinationService';
<<<<<<< HEAD
import { MapPin, Star, Calendar, Sparkles, ArrowLeft, CheckCircle2, Compass, Sun, CloudRain, Thermometer, Map as MapIcon } from 'lucide-react';
import API from '../services/api';
=======
import { MapPin, Star, Calendar, Sparkles, ArrowLeft, CheckCircle2, Compass } from 'lucide-react';
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e

export const DestinationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [destination, setDestination] = useState(null);
<<<<<<< HEAD
  const [weather, setWeather] = useState(null);
=======
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    destinationService.getDestinationById(id)
<<<<<<< HEAD
      .then(async (data) => {
        setDestination(data);
        try {
          const wRes = await API.get(`/destinations/${encodeURIComponent(data.name)}/weather`);
          setWeather(wRes.data);
        } catch (e) {
          // Weather fallback handled gracefully
        }
=======
      .then(data => {
        setDestination(data);
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="glass-card p-12 text-center text-slate-400 text-sm max-w-xl mx-auto my-12">
<<<<<<< HEAD
        Loading destination details & live weather...
=======
        Loading destination details...
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="glass-card p-12 text-center text-slate-400 text-sm max-w-xl mx-auto my-12">
        Destination not found.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Destinations</span>
      </button>

      <div className="glass-card rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
        <div className="relative h-72 sm:h-96">
          <img
            src={destination.imageUrl}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 text-indigo-400 text-sm font-semibold mb-1">
                <MapPin className="w-4 h-4" />
                <span>{destination.country}</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white">{destination.name}</h1>
            </div>

            <div className="flex items-center space-x-3">
              <div className="px-4 py-2 bg-slate-900/80 backdrop-blur-md rounded-xl text-amber-400 text-sm font-bold flex items-center space-x-1.5 border border-amber-400/30">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{destination.rating || '4.8'} Rating</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">
<<<<<<< HEAD
          {/* Weather Widget */}
          {weather && (
            <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950/60 border border-indigo-500/30 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                  <Sun className="w-7 h-7 text-amber-400 animate-spin-slow" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase text-indigo-400 tracking-wider">Live Weather Forecast</span>
                    <span className="text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full">
                      {weather.isLive ? 'OpenWeather Live' : 'Dynamic Forecast'}
                    </span>
                  </div>
                  <div className="text-2xl font-extrabold text-white mt-0.5">{weather.temp}°C - {weather.condition}</div>
                  <p className="text-xs text-slate-400">{weather.description} (Humidity: {weather.humidity}%)</p>
                </div>
              </div>

              <div className="text-right hidden sm:block">
                <span className="text-xs text-slate-400">Feels like</span>
                <p className="text-lg font-bold text-teal-400">{weather.feelsLike || weather.temp}°C</p>
              </div>
            </div>
          )}

=======
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
          <div>
            <h3 className="text-lg font-bold text-white mb-2">About {destination.name}</h3>
            <p className="text-slate-300 text-sm leading-relaxed">{destination.description}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-2">
              <h4 className="text-sm font-bold text-indigo-400 flex items-center space-x-2">
                <Compass className="w-4 h-4" />
                <span>Popular Attractions</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">{destination.attractions}</p>
            </div>

            <div className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-2">
              <h4 className="text-sm font-bold text-emerald-400 flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Best Time to Visit</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">{destination.bestTimeToVisit || 'Year-round'}</p>
            </div>
          </div>

<<<<<<< HEAD
          {/* Location Map View */}
          <div className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center space-x-2">
              <MapIcon className="w-4 h-4 text-teal-400" />
              <span>Location Map & Attractions Preview</span>
            </h4>
            <div className="w-full h-56 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 relative">
              <iframe
                title={`Map of ${destination.name}`}
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                src={`https://maps.google.com/maps?q=${encodeURIComponent(destination.name + ', ' + destination.country)}&t=&z=12&ie=UTF8&iwloc=&output=embed`}
                allowFullScreen
              />
            </div>
          </div>

=======
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
          {destination.popularLocations && (
            <div>
              <h3 className="text-base font-bold text-white mb-3">Popular Neighborhoods & Hotspots</h3>
              <div className="flex flex-wrap gap-2">
                {destination.popularLocations.split(',').map((loc, idx) => (
                  <span key={idx} className="px-3 py-1.5 bg-slate-900 text-slate-200 border border-slate-700/80 rounded-xl text-xs font-semibold flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{loc.trim()}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-slate-800/80">
            <button
              onClick={() => navigate(`/trips/new?destination=${encodeURIComponent(destination.name)}`)}
<<<<<<< HEAD
              className="bg-gradient-to-r from-indigo-600 to-teal-500 hover:from-indigo-500 hover:to-teal-400 text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-xl shadow-indigo-500/20 flex items-center space-x-2"
=======
              className="gradient-button text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-xl shadow-indigo-500/20 flex items-center space-x-2"
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
            >
              <Sparkles className="w-4 h-4" />
              <span>Create Trip to {destination.name}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
