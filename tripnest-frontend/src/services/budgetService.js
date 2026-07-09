import api from './api';

export const budgetService = {
  getBudget: async (tripId) => {
    const response = await api.get(`/api/trips/${tripId}/budget`);
    return response.data;
  },

  updateBudget: async (tripId, allocated) => {
    const response = await api.patch(`/api/trips/${tripId}/budget`, { allocated });
    return response.data;
  }
};

export default budgetService;
