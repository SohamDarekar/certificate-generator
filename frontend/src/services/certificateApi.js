import axios from 'axios';

// API configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
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
    
    if (!error.response) {
      throw new Error('Unable to connect to the server. Please check your internet connection.');
    }
    
    const { status, data } = error.response;
    
    switch (status) {
      case 400:
        throw new Error(data?.error || 'Invalid request. Please check your input.');
      case 404:
        throw new Error('Service not found. Please try again later.');
      case 431:
        throw new Error('Request headers too large. Please clear your browser cookies and try again.');
      case 500:
        throw new Error('Server error. Please try again later.');
      default:
        throw new Error(data?.error || `Request failed with status ${status}`);
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