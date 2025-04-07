import axios from 'axios';

const createAxiosInstance = (baseURL: string) => {
  const instance = axios.create({
    baseURL,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    withCredentials: true,
  });

  // 요청 인터셉터
  instance.interceptors.request.use(
    config => {
      // const token = localStorage.getItem('token');
      // if (token) {
      //   config.headers.Authorization = `Bearer ${token}`;
      // }
      return config;
    },
    error => Promise.reject(error),
  );

  // 응답 인터셉터
  instance.interceptors.response.use(
    response => response,
    error => {
      console.error(`[API ERROR - ${baseURL}]`, error.response?.data || error.message);
      return Promise.reject(error);
    },
  );

  return instance;
};

export const axiosHttpApi = createAxiosInstance('http://44.194.216.102:3000');
export const axiosHttpsApi = createAxiosInstance('https://sdui-dev.shop');
export const axiosGeneralBff = createAxiosInstance('https://bff-general-10.dev.albamon.com');
