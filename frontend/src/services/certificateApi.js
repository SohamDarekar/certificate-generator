import axios from 'axios';

// Environment detection
const isProduction = process.env.NODE_ENV === 'production';

// API configuration
const API_BASE_URL = (() => {
  // In production, we must have the API URL set
  if (isProduction && !process.env.REACT_APP_API_URL) {
    console.warn('Warning: REACT_APP_API_URL is not set in production environment');
  }
  
  return process.env.REACT_APP_API_URL || 
         (isProduction ? 'https://certificate-generator-3m2v.onrender.com' : 'http://localhost:3000');
})();

console.log(`API Base URL: ${API_BASE_URL}, Environment: ${process.env.NODE_ENV}`);

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Needed for CORS with credentials
});

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error);
    
    // Handle different error scenarios
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. Please try again.');
    }
    
    // Specific handling for CORS errors
    if (error.message.includes('Network Error') || error.message.includes('CORS')) {
      console.error('Possible CORS issue:', error.message);
      throw new Error(
        `Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at ${API_BASE_URL}. ` +
        'Please ensure the server is configured correctly to allow requests from this origin.'
      );
    }
    
    if (!error.response) {
      throw new Error('Unable to connect to the server. Please check your internet connection.');
    }
    
    const { status, data } = error.response;
    
    const contactInfo = '\n\nIf you have attended the event and still can\'t generate your certificate, please contact:\n• Soham Darekar (IEEE Chairperson): +91 8692811341\n• Shaunik Virdi (IEEE Vice-Chairperson): +91 90826 98665\n• Rishi Desai (IEEE General Secretary): +91 8169775426';
    
    switch (status) {
      case 400:
        // Check for specific error codes from backend
        if (data?.errorCode === 'NOT_ATTENDED') {
          throw new Error("Attendee not found or roll number mismatch" + contactInfo);
        } else if (data?.errorCode === 'NAME_NOT_FOUND') {
          throw new Error("Attendee not found or roll number mismatch" + contactInfo);
        } else if (data?.errorCode === 'INVALID_CODE') {
          throw new Error("Attendee not found or roll number mismatch" + contactInfo);
        } else if (data?.errorCode === 'MISMATCH') {
          throw new Error("Attendee not found or roll number mismatch" + contactInfo);
        }
        
        // Fallback for other 400 errors
        if (data?.error?.includes('roll') || 
            data?.error?.includes('code') || 
            data?.error?.includes('not found') ||
            data?.error?.includes('invalid code') ||
            data?.error?.includes('mismatch')) {
          throw new Error("Attendee not found or roll number mismatch" + contactInfo);
        }
        throw new Error((data?.error || 'Invalid request. Please check your input.') + contactInfo);
      case 403:
        throw new Error('Access forbidden. This may be due to CORS restrictions.');
      case 404:
        throw new Error('Service not found. Please try again later.');
      case 431:
        throw new Error('Request headers too large. Please clear your browser cookies and try again.');
      case 500:
        throw new Error('Server error. Please try again later.');
      default:
        throw new Error((data?.error || `Request failed with status ${status}`) + contactInfo);
    }
  }
);

/**
 * Certificate API service
 * Handles all certificate-related API calls
 */
export const certificateApi = {
  /**
   * Generate and download certificate
   * @param {Object} formData - Contains name and code
   * @returns {Promise<boolean>} - Success status
   */
  async generateCertificate(formData) {
    try {
      const response = await apiClient.post('/generate-certificate', formData, {
        responseType: 'blob', // Important for PDF download
      });

      // Create blob URL and trigger download
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      
      // Create temporary download link
      const link = document.createElement('a');
      link.href = url;
      link.download = `${formData.name.replace(/\s+/g, '_')}_certificate.pdf`;
      link.style.display = 'none';
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      return true;
    } catch (error) {
      console.error('Certificate generation failed:', error);
      throw error;
    }
  },

  /**
   * Check API health status
   * @returns {Promise<boolean>} - Health status
   */
  async checkHealth() {
    try {
      const response = await apiClient.get('/api/health');
      return response.status === 200;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  },
};