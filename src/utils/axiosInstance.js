import axios from 'axios';
import { toast } from 'react-toastify';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_GATEWAY_URL,
});

// Request Interceptor: Attach JWT and Log Requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt_token');
    const userId = localStorage.getItem('user_id');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    if (userId) {
      config.headers.loggedInUserId = userId;
    }
    
    // Structured log for outgoing requests
    console.info(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, {
      params: config.params,
      headers: config.headers,
      data: config.data,
      baseURL: config.baseURL
    });
    
    return config;
  },
  (error) => {
    console.error(`[API Request Error]`, error);
    return Promise.reject(error);
  }
);

// Response Interceptor: Global Error & Success Handling and Log Responses
axiosInstance.interceptors.response.use(
  (response) => {
    // Log successful responses
    console.info(`[API Response Success] ${response.config.method?.toUpperCase()} ${response.config.url}`, {
      status: response.status,
      data: response.data
    });

    // Show success toasts for non-GET requests if a message is present
    if (response.config.method !== 'get' && response.data?.message) {
      toast.success(response.data.message);
    }
    return response.data; // Return only the standardized API response body
  },
  (error) => {
    const apiError = error.response?.data;
    const { config, response } = error;

    // Structured log for response errors
    console.error(`[API Response Error] ${config?.method?.toUpperCase()} ${config?.url}`, {
      status: response?.status,
      message: error.message,
      apiError: apiError,
      url: config?.url,
      baseURL: config?.baseURL
    });

    if (apiError && !apiError.success) {
      // Special Logic: Force Password Reset
      if (apiError.errorCode === 'ERR_PASSWORD_RESET_REQUIRED') {
        console.warn(`[Auth Action] Redirecting to change-password due to ${apiError.errorCode}`);
        toast.warning("Initial login detected. Please change your password.");
        window.location.href = '/change-password';
        return Promise.reject(error);
      }

      // Special Logic: Account Pending Approval
      if (apiError.errorCode === 'ERR_ACCOUNT_NOT_APPROVED') {
        console.info(`[Auth Info] Account pending approval: ${apiError.message}`);
        toast.info("Your account is pending HOD approval.");
        return Promise.reject(error);
      }

      // Standard Error Toast
      toast.error(apiError.message || "An unexpected error occurred.");
    } else {
      console.error(`[Network Error] Possible connection failure to ${config?.baseURL}${config?.url}`);
      toast.error("Network Error: Unable to connect to the server.");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;