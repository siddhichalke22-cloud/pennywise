import apiClient from './apiClient';

export const expenseApi = {
  createExpense: (data) => apiClient.post('/expenses', data),
  getGroupExpenses: (groupId) => apiClient.get(`/expenses/group/${groupId}`),
  getExpenseById: (id) => apiClient.get(`/expenses/${id}`),
  deleteExpense: (id) => apiClient.delete(`/expenses/${id}`),
};

export default expenseApi;
