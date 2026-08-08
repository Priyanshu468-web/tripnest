import API from './api';

export const destinationService = {
  getAllDestinations: async () => {
    const response = await API.get('/destinations');
    return response.data;
  },

  getDestinationById: async (id) => {
    const response = await API.get(`/destinations/${id}`);
    return response.data;
  },

  searchDestinations: async (query) => {
    const response = await API.get(`/destinations/search`, { params: { query } });
    return response.data;
  }
};
