import { jwtDecode } from "jwt-decode";
import { getToken, removeToken } from "./apiClient";

// Check if the user is authenticated
export const isAuthenticated = () => {
    const token = getToken();
    if (!token) {
        return false; // No token means the user is not authenticated
    }

    try {
        // Decode the token to get its payload
        const decodedToken = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

        // Check if the token has expired
        if (decodedToken.exp < currentTime) {
            removeToken(); // Token is expired; remove it
            return false;
        }

        return true; // Token is valid
    } catch (error) {
        console.error("Invalid token:", error);
        removeToken(); // Clear invalid token
        return false;
    }
};