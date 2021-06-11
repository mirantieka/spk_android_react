import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default (history = null) => {
  const domain = 'spkapp.herokuapp.com';
  const baseUrl = `https://${domain}/api/`;

  let headers = {};
  let token = undefined;
  AsyncStorage.getItem('authToken').then(tkn => (token = tkn));

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
        navigation.navigate('Login');
      } else {
        return new Promise((resolve, reject) => {
          reject(error?.response?.data);
        });
      }
    },
  );

  return axiosInstance;
};
