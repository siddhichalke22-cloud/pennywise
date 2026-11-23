import apiClient from './apiClient';

export const groupApi = {
  getGroups: () => apiClient.get('/groups'),
  getGroupById: (id) => apiClient.get(`/groups/${id}`),
  createGroup: (data) => apiClient.post('/groups', data),
  addMember: (groupId, userId) => apiClient.post(`/groups/${groupId}/members`, { userId }),
};

export default groupApi;
