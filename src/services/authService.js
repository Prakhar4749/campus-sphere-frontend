import axiosInstance from '../utils/axiosInstance';

const authService = {
  // 1. Send Registration OTP
  sendOTP: (email) => {
    console.info(`[AuthService] Requesting registration OTP for email: ${email}`);
    return axiosInstance.post(`/auth/send-otp?email=${email}`);
  },

  // 2. User Signup
  signup: (payload) => {
    console.info(`[AuthService] Attempting user signup for email: ${payload.email}`, { 
      enrollmentNo: payload.enrollmentNo,
      role: payload.role 
    });
    return axiosInstance.post('/auth/signup', payload);
  },

  // 3. User Login
  login: (credentials) => {
    console.info(`[AuthService] Attempting login for email: ${credentials.email}`);
    return axiosInstance.post('/auth/login', credentials);
  },

  // 4. Forgot Password (Request OTP)
  forgotPassword: (email) => {
    console.info(`[AuthService] Requesting forgot-password OTP for email: ${email}`);
    return axiosInstance.post(`/auth/forgot-password?email=${email}`);
  },

  // 5. Reset Password (Verify OTP & Change)
  resetPassword: (payload) => {
    console.info(`[AuthService] Attempting password reset for email: ${payload.email}`);
    return axiosInstance.post('/auth/reset-password', payload);
  },

  // 6. Change Password (Force Reset or Manual Update)
  changePassword: (payload) => {
    console.info(`[AuthService] Attempting password change for email: ${payload.email}`);
    return axiosInstance.post('/auth/change-password', payload);
  },
};

export default authService;