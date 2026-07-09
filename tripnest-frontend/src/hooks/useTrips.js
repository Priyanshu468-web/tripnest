import { useState, useEffect, useCallback } from 'react';
import tripService from '../services/tripService';
import toast from 'react-hot-toast';

export const useTrips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTrips = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await tripService.getTrips();
      setTrips(data);
    } catch (err) {
      console.error('Failed to fetch trips', err);
      setError(err);
      toast.error('Failed to load trips');
    } finally {
      setLoading(false);
    }
  }, []);

  const createTrip = async (tripData) => {
    try {
      setLoading(true);
      const newTrip = await tripService.createTrip(tripData);
      toast.success('Trip planned weightlessly! 🌌');
      fetchTrips();
      return newTrip;
    } catch (err) {
      console.error('Failed to create trip', err);
      toast.error(err.response?.data?.message || 'Failed to plan trip');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteTrip = async (id) => {
    try {
      setLoading(true);
      await tripService.deleteTrip(id);
      toast.success('Trip deleted');
      fetchTrips();
    } catch (err) {
      console.error('Failed to delete trip', err);
      toast.error(err.response?.data?.message || 'Failed to delete trip');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  return { trips, loading, error, refetch: fetchTrips, createTrip, deleteTrip };
};

export default useTrips;
