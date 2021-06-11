import axiosInstance from './axios';

export const httpGet = async (url, query = '', options = {}) => {
  if (!url) {
    return {
      isSuccess: false,
      message: 'url cant be empty',
    };
  }

  let res = await axiosInstance()
    .get(url + query, {
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

  let res = await axiosInstance()
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

  let res = await axiosInstance()
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

  let res = await axiosInstance()
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
