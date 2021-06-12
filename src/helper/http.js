import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from './axios';
import {getAuthToken} from './Storage';

export const httpGet = async (url, options = {}) => {
  if (!url) {
    return {
      isSuccess: false,
      message: 'url cant be empty',
    };
  }

  const token = await getAuthToken();
  let res = await axiosInstance(token)
    .get(url, {
      ...options,
    })
    .then(res => {
      return res;
    })
    .catch(err => {
      console.error('http :: get :: err', err);
      throw err;
    });

  return res.data;
};

export const httpPost = async (url, body, options = {}) => {
  if (!url) {
    return {
      isSuccess: false,
      message: 'url cant be empty',
    };
  }

  const token = await getAuthToken();
  let res = await axiosInstance(token)
    .post(url, body, {
      ...options,
    })
    .then(res => {
      return res;
    })
    .catch(err => {
      console.error('http :: post :: err', err);
      throw err;
    });

  return res.data;
};

export const httpPut = async (url, body, options = {}) => {
  if (!url) {
    return {
      isSuccess: false,
      message: 'url cant be empty',
    };
  }

  const token = await getAuthToken();
  let res = await axiosInstance(token)
    .put(url, body, {
      ...options,
    })
    .then(res => {
      return res;
    })
    .catch(err => {
      console.error('http :: put :: err', err);
      throw err;
    });

  return res.data;
};

export const httpDelete = async (url, options = {}) => {
  if (!url) {
    return {
      isSuccess: false,
      message: 'url cant be empty',
    };
  }

  const token = await getAuthToken();
  let res = await axiosInstance(token)
    .delete(url, {
      ...options,
    })
    .then(res => {
      return res;
    })
    .catch(err => {
      console.error('http :: del :: err', err);
      throw err;
    });

  return res.data;
};
