import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;
export const API_PATH = import.meta.env.VITE_API_PATH;

//前台使用
export const api = axios.create({
  baseURL: API_BASE,
});

//後台使用
export const adminApi = axios.create({
  baseURL: API_BASE,
});

adminApi.interceptors.request.use(
  (config) => {
    // 從 cookie 讀 token
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("PAPAYA_KG_TOKEN="))
      ?.split("=")[1];
    // 修改實體建立時所指派的預設配置
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
