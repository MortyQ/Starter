import axios from "axios";

import router from "@/app/router";

export const TOKEN_TYPE = "Bearer";
export const ACCESS_TOKEN = "accessToken";
export const REFRESH_TOKEN = "refreshToken";
export const AUTH_HEADER = "Authorization";
export const REFRESH_TOKEN_URL = "/refresh-token";

const axiosIns = axios.create({
  baseURL: import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : "/api",
});

axiosIns.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  if (accessToken) {
    config.headers.set(AUTH_HEADER, `${TOKEN_TYPE} ${accessToken}`);
  }
  return config;
}, (error) => Promise.reject(error));

axiosIns.interceptors.response.use((response) => {
  return response;
}, (error) => {
  const { config, response } = error;
  const status = response?.status;
  const originalRequest = config;

  if (status === 401) {
    return axiosIns.post(REFRESH_TOKEN_URL, {
      refreshToken: localStorage.getItem(REFRESH_TOKEN),
    }).then(({ data }) => {
      if (data.accessToken) {
        localStorage.setItem(ACCESS_TOKEN, data.accessToken);


        axiosIns.defaults.headers.common[AUTH_HEADER] = `${TOKEN_TYPE} ${data.accessToken}`;

        return axiosIns(originalRequest);
      } else {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        if (router.currentRoute.value.name !== "login") {
          router.push({ name: "login" });
        }
      }
    }).catch(() => {
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(REFRESH_TOKEN);
      if (router.currentRoute.value.name !== "login") {
        router.push({ name: "login" });
      }
    });
  }

  return Promise.reject(error);
});

export default axiosIns;
