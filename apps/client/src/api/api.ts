import axios, { AxiosError, AxiosRequestConfig } from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

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
    console.log("Sendin token and calling from inside api.ts", accessToken);
    if (accessToken && config.headers) {
      config.headers.Authorization = `${accessToken}`;
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
        const { data } = await axios.put<{
          data: { accessToken: string; user: object };
        }>(
          `${BASE_URL}/auth/refresh-token`,
          {}, // No request body
          {
            withCredentials: true, // Ensures cookies are sent
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const newAccessToken = data.data.accessToken;
        const user = data.data.user;
        if (!newAccessToken) {
          throw new Error("Refreshing access token failed");
        }

        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("currentUser", JSON.stringify(user));

        // Update the authorization header and retry the request
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = newAccessToken;
        }

        return api(originalRequest);
      } catch (refreshError) {
        console.error("Session expired, please log in again.", refreshError);
        document.dispatchEvent(new CustomEvent("logout"));
      }
    }
    return Promise.reject(error);
  }
);

export default api;
