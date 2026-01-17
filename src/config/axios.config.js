import axios from "axios";
export default function createApiConfig({ contentType = 'application/json' } = {}) {
    const instance = axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL,
        timeout: 8000,
        headers: {
            'Content-Type': contentType, 
        }
    });
    instance.interceptors.request.use(
        (config) => {
            const token = import.meta.env.VITE_MOVIE_ACCESS_TOKEN;
            if(token){
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        }, 
        (error) => {
            console.error('Request Error:', error);
            return Promise.reject(error);
        }
    );

    instance.interceptors.response.use(
        (response) => {
            return response;
        }, 
        (error) => {
                if (error.response?.status === 401) {
                console.log('Unauthorized! Redirecting...');
            }
            
            return Promise.reject(error);
        }
    );

    return instance;
}

// Alternative: Export as a pre-configured instance
export const apiClient = createApiConfig();