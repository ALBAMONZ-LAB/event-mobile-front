import axios from 'axios';

// 환경 변수에서 API 기본 URL 가져오기
const API_BASE_URL = 'http://44.194.216.102:3000';

// Axios 인스턴스 생성
export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000, // 5초 타임아웃 설정
  headers: {
    'Content-Type': 'application/json', //
    Accept: 'application/json',
  },
});

// 요청 인터셉터 설정 (필요에 따라 추가)
axiosInstance.interceptors.request.use(
  config => {
    // 예: 토큰을 헤더에 추가
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터 설정 (필요에 따라 추가)
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  },
);
