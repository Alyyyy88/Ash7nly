import { useAuthStore } from '@/stores/auth';
import axios from 'axios';
// import { Platform } from 'react-native';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.1.23:8080/api/';
export const axiosApi = axios.create({
  // for local testing with emulator use the following baseURL
  // http://192.168.1.23:8080/api/
  // http://172.20.10.4/api/

  baseURL: 'http://192.168.1.23/api/',
  timeout: 10000,
});
// const baseURL = Platform.select({
//   ios: 'http://192.168.1.23:8080/api/',
//   android: 'http://10.0.2.2:8080/api/', // or use IP
//   web: 'http://localhost:8080/api/',
// });

export const axiosApiWithCreds = axios.create({
  baseURL: 'http://192.168.1.23/api/',
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosApiWithCreds.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken || localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
