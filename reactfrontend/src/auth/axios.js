import axios from "axios";

// Creating an axios instance
const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/", // Correct key name: baseURL
    headers: {
        "Content-Type": "application/json", // Fixing the capitalization
    },
});

// Adding a request interceptor to include the access token
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
