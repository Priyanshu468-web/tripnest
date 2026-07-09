import api from './api';

export const destinationService = {
  searchDestinations: async (query = '') => {
    const response = await api.get(`/api/destinations`, {
      params: { query }
    });
    return response.data;
  },

  getDestinationById: async (id) => {
    try {
      const response = await api.get(`/api/destinations/${id}`);
      return response.data;
    } catch (error) {
      console.warn(`Backend GET /api/destinations/${id} failed. Sourcing from search list fallback.`, error);
      const all = await destinationService.searchDestinations();
      const found = all.find(item => String(item.id) === String(id));
      if (!found) {
        throw new Error("Destination not found");
      }
      return found;
    }
  }
};

export default destinationService;
