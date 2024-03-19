import axios, { CreateAxiosDefaults } from "axios";
import { useAuthStore } from "../store/auth.store";

const config: CreateAxiosDefaults = {
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
};

export const axiosHttp = axios.create({
  ...config,
});
export const axiosHttpWithToken = axios.create({
  ...config,
});

axiosHttpWithToken.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    const token = authStore.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosHttpWithToken;
