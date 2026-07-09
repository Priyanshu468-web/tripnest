import { useState, useEffect, useCallback } from 'react';
import budgetService from '../services/budgetService';
import toast from 'react-hot-toast';

export const useBudget = (tripId) => {
  const [budget, setBudget] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchBudget = useCallback(async () => {
    if (!tripId) return;
    try {
      setLoading(true);
      const data = await budgetService.getBudget(tripId);
      setBudget(data);
    } catch (err) {
      console.error('Failed to fetch budget details', err);
    } finally {
      setLoading(false);
    }
  }, [tripId]);

  const updateBudget = async (allocated) => {
    try {
      setLoading(true);
      const data = await budgetService.updateBudget(tripId, allocated);
      setBudget(data);
      toast.success('Budget allocation updated!');
    } catch (err) {
      console.error('Failed to update budget', err);
      toast.error('Failed to update budget');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBudget();
  }, [fetchBudget]);

  return { budget, loading, updateBudget, refetch: fetchBudget };
};

export default useBudget;
