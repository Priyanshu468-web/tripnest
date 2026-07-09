import { useState, useEffect, useCallback } from 'react';
import tripService from '../services/tripService';
import toast from 'react-hot-toast';

export const useTripById = (tripId) => {
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTripDetails = useCallback(async () => {
    if (!tripId) return;
    try {
      setLoading(true);
      setError(null);
      const data = await tripService.getTripById(tripId);
      setTrip(data);
    } catch (err) {
      console.error('Failed to fetch trip details', err);
      setError(err);
      toast.error('Failed to load trip details');
    } finally {
      setLoading(false);
    }
  }, [tripId]);

  useEffect(() => {
    fetchTripDetails();
  }, [fetchTripDetails]);

  return { trip, loading, error, refetch: fetchTripDetails };
};

export default useTripById;
