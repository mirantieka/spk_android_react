import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigate} from './NavigationService';

export default (token = null, history = null) => {
  const domain = 'spkapp.herokuapp.com';
  const baseUrl = `https://${domain}/api/`;

  const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {},
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
        AsyncStorage.removeItem('user');
        navigate('Login');
      } else {
        return new Promise((resolve, reject) => {
          reject(error?.response?.data);
        });
      }
    },
  );

  return axiosInstance;
};
