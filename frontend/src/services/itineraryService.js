import API from './api';

export const itineraryService = {
  getItinerariesByTripId: async (tripId) => {
    const response = await API.get(`/itineraries/trip/${tripId}`);
    return response.data;
  },

  createOrUpdateItinerary: async (itineraryData) => {
    const response = await API.post('/itineraries', itineraryData);
    return response.data;
  },

  deleteItinerary: async (id) => {
    const response = await API.delete(`/itineraries/${id}`);
    return response.data;
  }
};
