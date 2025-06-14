import axios from "axios";

const axiosInstancePrivate = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const axiosInstancePublic = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstancePrivate.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstancePrivate.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Error in response:", error);
    return Promise.reject(error);
  }
);

export { axiosInstancePrivate, axiosInstancePublic };
