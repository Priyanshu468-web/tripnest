import api from './api';

export const destinationService = {
  searchDestinations: async (query = '') => {
    const response = await api.get(`/api/destinations`, {
      params: { query }
    });
    return response.data;
  }
};

export default destinationService;
