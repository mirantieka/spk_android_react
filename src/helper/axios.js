import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default (history = null) => {
  const domain = 'spkapp.herokuapp.com';
  const baseUrl = `https://${domain}/api/`;

  let headers = {};
  let token = AsyncStorage.getItem('authToken');

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers,
  });

  axiosInstance.interceptors.response.use(
    response =>
      new Promise((resolve, reject) => {
        resolve(response);
      }),
    error => {
      if (!error.response) {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }

      if (error.response.status === 401) {
        AsyncStorage.removeItem('authToken');
        //  if (history) {
        //    history.push('/auth/login');
        //  } else {
        //    window.location = '/auth/login';
        //  }
      } else {
        return new Promise((resolve, reject) => {
          reject(error?.response?.data);
        });
      }
    },
  );

  return axiosInstance;
};
