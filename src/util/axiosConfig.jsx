import axios from "axios";

const axiosConfig = axios.create({
    baseURL: "https://cash-coach-backend.onrender.com/api",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
})

// endpoints that do not require auth header
const excludeEndpoints = ["/login", "/add", "/status", "/activate"];

// request interceptor
axiosConfig.interceptors.request.use((config) => {
    const skipToken = excludeEndpoints.some((endpoint) => {
        return config.url?.includes(endpoint)
    });

    if (!skipToken) {
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// response interceptor
axiosConfig.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response) {
        if (error.response.status === 401) {
            window.location.href = "/login";
        } else if (error.response.status === 500) {
            console.error("Server error. Try again later.");
        }
    } else if (error.code === "ECONNABORTED") {
        console.error("Request timeout. Try again.");
    }
    return Promise.reject(error);
});

export default axiosConfig;
