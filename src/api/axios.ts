/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import {
  getAccessToken,
  setAccessToken,
  clearTokens,
  getRefreshToken,
} from "@/stores/auth";

// Constants
const REQ_TIMEOUT = 30_000;
const REFRESH_ENDPOINT = "/RefreshToken";

interface FailedRequestQueueItem {
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
  config: AxiosRequestConfig;
}

let isRefreshing = false;
const failedQueue: FailedRequestQueueItem[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      if (token && prom.config.headers) {
        prom.config.headers["Authorization"] = `Bearer ${token}`;
      }
      axiosInstance.request(prom.config).then(prom.resolve).catch(prom.reject);
    }
  });
  failedQueue.length = 0;
};

// Create Axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: REQ_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: attach access token
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = getAccessToken();
    const refreshToken = getRefreshToken();

    if (token) config.headers["Authorization"] = `Bearer ${token}`;
    if (refreshToken) config.headers["x-refresh-token"] = refreshToken;

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle 401 & refresh logic
axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  async (error) => {
    const originalRequest = error.config;

    // Ensure config exists and it's not for refresh endpoint itself
    if (
      !originalRequest ||
      originalRequest._retry ||
      originalRequest.url === REFRESH_ENDPOINT
    ) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ config: originalRequest, resolve, reject });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newAccessToken = await performTokenRefresh();
        if (newAccessToken) {
          setAccessToken(newAccessToken);
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          processQueue(null, newAccessToken);
          return axiosInstance(originalRequest);
        } else {
          throw new Error("Unable to refresh token");
        }
      } catch (refreshError) {
        processQueue(refreshError, null);
        clearTokens();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// Perform token refresh request
const performTokenRefresh = async (): Promise<string | null> => {
  try {
    const response = await axiosInstance.get(REFRESH_ENDPOINT);
    const newToken = response.headers["x-access-token"];
    return newToken ?? null;
  } catch (error: any) {
    console.error("Token refresh failed:", error);
    return null;
  }
};

export default axiosInstance;
