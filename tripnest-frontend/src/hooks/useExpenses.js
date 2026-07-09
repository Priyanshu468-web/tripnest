import { useState, useEffect, useCallback } from 'react';
import expenseService from '../services/expenseService';
import toast from 'react-hot-toast';

export const useExpenses = (tripId) => {
  const [expenses, setExpenses] = useState([]);
  const [settlements, setSettlements] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchExpensesAndSettlement = useCallback(async () => {
    if (!tripId) return;
    try {
      setLoading(true);
      const expenseData = await expenseService.getExpenses(tripId);
      setExpenses(expenseData);
      
      const settlementData = await expenseService.getSettlement(tripId);
      setSettlements(settlementData);
    } catch (err) {
      console.error('Failed to fetch expenses/settlements', err);
    } finally {
      setLoading(false);
    }
  }, [tripId]);

  const addExpense = async (expenseData) => {
    try {
      setLoading(true);
      const newExpense = await expenseService.addExpense(tripId, expenseData);
      toast.success('Expense logged and split successfully!');
      fetchExpensesAndSettlement();
      return newExpense;
    } catch (err) {
      console.error('Failed to add expense', err);
      toast.error(err.response?.data?.message || 'Failed to split expense');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteExpense = async (expenseId) => {
    try {
      setLoading(true);
      await expenseService.deleteExpense(expenseId);
      toast.success('Expense deleted');
      fetchExpensesAndSettlement();
    } catch (err) {
      console.error('Failed to delete expense', err);
      toast.error(err.response?.data?.message || 'Failed to delete expense');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpensesAndSettlement();
  }, [fetchExpensesAndSettlement]);

  return { expenses, settlements, loading, addExpense, deleteExpense, refetch: fetchExpensesAndSettlement };
};

export default useExpenses;
