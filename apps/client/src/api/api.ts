import axios, { AxiosError, AxiosRequestConfig } from "axios";


const BASE_URL = import.meta.env.VITE_BACKEND_URL 

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Request Interceptor: Attach Access Token
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle 401 & Refresh Token
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the token
        const { data } = await axios.get<{ data: { accessToken: string } }>(
          `${BASE_URL}/auth/refresh-token`,
          { withCredentials: true }
        );

        const newAccessToken = data.data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);

        // Update the authorization header and retry the request
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = newAccessToken;
        }

        return api(originalRequest);
      } catch (refreshError) {
        console.error("Session expired, please log in again.", refreshError);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("currentUser");

        // Optional: Redirect to login page
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
