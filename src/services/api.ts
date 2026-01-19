import { useAuthStore } from '@/store/authStore';
import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/api$/, '');

export const authApi = axios.create({
  baseURL,
  withCredentials: true,
});

const baseApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
  withXSRFToken: true,
});

baseApi.interceptors.request.use((config) => {
  const token = useAuthStore.getState().getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default baseApi;
