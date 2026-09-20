// URL Dasar Backend NestJS (Port 8000)
export const BASE_URL = 'http://localhost:8000/';


export const API_ENDPOINTS = {
  BASE_URL,
  REGISTER: `${BASE_URL}register`,
  LOGIN: `${BASE_URL}auth/login`,
  CATEGORIES: `${BASE_URL}categories`,
};
