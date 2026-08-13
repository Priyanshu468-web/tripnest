import API from './api';

export const documentService = {
  getDocumentsByTripId: async (tripId) => {
    const response = await API.get(`/documents/trip/${tripId}`);
    return response.data;
  },

  uploadDocument: async (tripId, title, type, file) => {
    const formData = new FormData();
    formData.append('tripId', tripId);
    if (title) formData.append('title', title);
    if (type) formData.append('type', type);
    formData.append('file', file);

    const response = await API.post('/documents/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  deleteDocument: async (id) => {
    const response = await API.delete(`/documents/${id}`);
    return response.data;
  }
};
