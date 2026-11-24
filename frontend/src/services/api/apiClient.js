import axios from 'axios';
import { tokenStorage } from '../storage/tokenStorage';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:5000/api';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: attach bearer token to requests if available
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await tokenStorage.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (err) {
      console.warn('[ApiClient] Failed to retrieve token from storage:', err);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: extract response payload and normalize error messages
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const responseData = error.response?.data;
    const message =
      responseData?.message ||
      (responseData?.errors && responseData.errors[0]?.msg) ||
      error.message ||
      'Network request failed. Please check your connection.';

    const customError = new Error(message);
    customError.statusCode = error.response?.status;
    customError.data = responseData;
    customError.errors = responseData?.errors;
    return Promise.reject(customError);
  }
);

export default apiClient;
