import axios from "axios";
import { useAuthStore } from "@/stores/authStore";
import { SERVER_API } from "@/constants/api";

const api = axios.create({
  baseURL: SERVER_API,
  withCredentials: true,
});

// inject access token ke setiap request
api.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// auto refresh token kalau 401
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await axios.post(
          `${SERVER_API}/auth/refresh`,
          {},
          { withCredentials: true }
        );
        const newToken = res.data.data.token;

        useAuthStore.getState().setAuth(newToken);

        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshErr) {
        useAuthStore.getState().clearAuth();
        return Promise.reject(refreshErr);
      }
    }
    return Promise.reject(err);
  }
);

export default api;
