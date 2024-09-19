import apiClient from './Services/api';

export const getCsrfToken = async () => {
    await apiClient.get('/sanctum/csrf-cookie');
};

// Define the isAuthenticated function
export const isAuthenticated = () => {
    return !!localStorage.getItem('authToken'); 
};