import API from './api';

export const adminService = {
  getAdminDashboard: async () => {
    const response = await API.get('/admin/dashboard');
    return response.data;
  }
};
