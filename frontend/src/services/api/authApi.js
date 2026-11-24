import apiClient from './apiClient';

/**
 * Authentication API Service (communicates with Express backend via Axios)
 */
export const authApi = {
  /**
   * Register a new user
   * @param {Object} userData - { name, email, password }
   * @returns {Promise<Object>} API envelope: { success, message, data: { user, token } }
   */
  register: (userData) => apiClient.post('/auth/register', userData),

  /**
   * Log in an existing user
   * @param {Object} credentials - { email, password }
   * @returns {Promise<Object>} API envelope: { success, message, data: { user, token } }
   */
  login: (credentials) => apiClient.post('/auth/login', credentials),

  /**
   * Get current authenticated user profile
   * @returns {Promise<Object>}
   */
  getMe: () => apiClient.get('/auth/me'),
};

export default authApi;
