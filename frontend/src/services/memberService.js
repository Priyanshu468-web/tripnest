import API from './api';

export const memberService = {
  inviteUser: async (tripId, inviteData) => {
    const response = await API.post(`/trips/${tripId}/members/invite`, inviteData);
    return response.data;
  },

  getMembersByTrip: async (tripId) => {
    const response = await API.get(`/trips/${tripId}/members`);
    return response.data;
  },

  getMyInvitations: async () => {
    const response = await API.get('/members/invitations');
    return response.data;
  },

  acceptInvitation: async (id) => {
    const response = await API.put(`/members/invitations/${id}/accept`);
    return response.data;
  },

  rejectInvitation: async (id) => {
    const response = await API.put(`/members/invitations/${id}/reject`);
    return response.data;
  },

  removeMember: async (tripId, id) => {
    const response = await API.delete(`/trips/${tripId}/members/${id}`);
    return response.data;
  },

  updateMemberRole: async (tripId, id, role) => {
    const response = await API.put(`/trips/${tripId}/members/${id}/role`, null, { params: { role } });
    return response.data;
  }
};
