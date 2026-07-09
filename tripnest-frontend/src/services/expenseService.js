import api from './api';

export const expenseService = {
  getExpenses: async (tripId) => {
    const response = await api.get(`/api/trips/${tripId}/expenses`);
    return response.data;
  },

  addExpense: async (tripId, expenseData) => {
    const response = await api.post(`/api/trips/${tripId}/expenses`, expenseData);
    return response.data;
  },

  deleteExpense: async (expenseId) => {
    const response = await api.delete(`/api/expenses/${expenseId}`);
    return response.data;
  },

  getSettlement: async (tripId) => {
    const response = await api.get(`/api/trips/${tripId}/settlement`);
    return response.data.settlements;
  }
};

export default expenseService;
