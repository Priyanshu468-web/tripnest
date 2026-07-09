import api from './api';

export const tripService = {
  getTrips: async () => {
    const response = await api.get('/api/trips');
    return response.data.trips;
  },

  getTripById: async (id) => {
    const response = await api.get(`/api/trips/${id}`);
    return response.data;
  },

  createTrip: async (tripData) => {
    const response = await api.post('/api/trips', tripData);
    return response.data;
  },

  updateTrip: async (id, tripData) => {
    const response = await api.patch(`/api/trips/${id}`, tripData);
    return response.data;
  },

  deleteTrip: async (id) => {
    const response = await api.delete(`/api/trips/${id}`);
    return response.data;
  },

  addMember: async (tripId, email) => {
    const response = await api.post(`/api/trips/${tripId}/members`, { email });
    return response.data;
  },

  getItineraries: async (tripId) => {
    const response = await api.get(`/api/trips/${tripId}/itineraries`);
    return response.data;
  },

  addActivity: async (tripId, day, activityData) => {
    const response = await api.post(`/api/trips/${tripId}/itineraries/${day}/activities`, activityData);
    return response.data;
  },

  updateActivity: async (activityId, activityData) => {
    const response = await api.patch(`/api/activities/${activityId}`, activityData);
    return response.data;
  },

  deleteActivity: async (activityId) => {
    const response = await api.delete(`/api/activities/${activityId}`);
    return response.data;
  }
};

export default tripService;
