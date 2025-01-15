import axios from "axios";

// Utility to handle the token
const TOKEN_KEY = "jwtToken";

// Save token
export const saveToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
};

// Retrieve token
export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};

// Remove token
export const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
};

const apiClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`, // Adjust as needed
});

// Add a request interceptor to include the token
apiClient.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle token expiration
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            removeToken(); // Clear the token
            window.location.href = "/login"; // Redirect to login
        }
        return Promise.reject(error);
    }
);

export default apiClient;
