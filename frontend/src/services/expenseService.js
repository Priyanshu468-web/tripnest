import API from './api';

export const expenseService = {
  addExpense: async (tripId, expenseData) => {
    const response = await API.post(`/trips/${tripId}/expenses`, expenseData);
    return response.data;
  },

  getExpensesByTrip: async (tripId) => {
    const response = await API.get(`/trips/${tripId}/expenses`);
    return response.data;
  },

  getExpenseById: async (tripId, id) => {
    const response = await API.get(`/trips/${tripId}/expenses/${id}`);
    return response.data;
  },

  updateExpense: async (tripId, id, expenseData) => {
    const response = await API.put(`/trips/${tripId}/expenses/${id}`, expenseData);
    return response.data;
  },

  deleteExpense: async (tripId, id) => {
    const response = await API.delete(`/trips/${tripId}/expenses/${id}`);
    return response.data;
  },

  getExpenseSummary: async (tripId) => {
    const response = await API.get(`/trips/${tripId}/expenses/summary`);
    return response.data;
  },

  getBudget: async (tripId) => {
    const response = await API.get(`/trips/${tripId}/budget`);
    return response.data;
  },

  updateBudget: async (tripId, budgetData) => {
    const response = await API.put(`/trips/${tripId}/budget`, budgetData);
    return response.data;
  }
};
