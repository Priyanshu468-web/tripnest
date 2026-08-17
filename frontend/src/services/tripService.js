import API from './api';

export const tripService = {
  createTrip: async (tripData) => {
    const response = await API.post('/trips', tripData);
    return response.data;
  },

  getMyTrips: async () => {
    const response = await API.get('/trips/my-trips');
    return response.data;
  },

  getTripById: async (id) => {
    const response = await API.get(`/trips/${id}`);
    return response.data;
  },

  updateTrip: async (id, tripData) => {
    const response = await API.put(`/trips/${id}`, tripData);
    return response.data;
  },

  deleteTrip: async (id) => {
    const response = await API.delete(`/trips/${id}`);
    return response.data;
  },

  shareTrip: async (id) => {
    const response = await API.post(`/trips/${id}/share`);
    return response.data;
  }
};
