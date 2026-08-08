import API from './api';

export const activityService = {
  addActivity: async (tripId, activityData) => {
    const response = await API.post(`/trips/${tripId}/activities`, activityData);
    return response.data;
  },

  getActivitiesByTrip: async (tripId) => {
    const response = await API.get(`/trips/${tripId}/activities`);
    return response.data;
  },

  updateActivity: async (id, activityData) => {
    const response = await API.put(`/activities/${id}`, activityData);
    return response.data;
  },

  deleteActivity: async (id) => {
    const response = await API.delete(`/activities/${id}`);
    return response.data;
  }
};
