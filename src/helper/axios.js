import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default (history = null) => {
  const domain = 'spkapp.herokuapp.com';
  const baseUrl = `https://${domain}/api/`;

  let headers = {};
  let axiosInstance = axios.create({
    baseURL: baseUrl,
    headers,
  });

  let getAxiosInstance = async () => {
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
          navigation.navigate('Login');
        } else {
          return new Promise((resolve, reject) => {
            reject(error?.response?.data);
          });
        }
      },
    );
  };

  AsyncStorage.getItem('authToken')
    .then(tkn => {
      if (tkn) {
        axiosInstance.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${tkn}`;
      }
    })
    .then(getAxiosInstance);

  return axiosInstance;
};
