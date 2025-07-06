import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { certificateApi } from '../services/certificateApi';

/**
 * Custom hook for certificate API operations
 * Handles loading states, error handling, and success notifications
 */
export function useCertificateApi() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Generate and download certificate
   * @param {Object} formData - Form data containing name and code
   * @returns {Promise<boolean>} - Success status
   */
  const generateCertificate = useCallback(async (formData) => {
    setIsLoading(true);
    setError(null);

    try {
      const success = await certificateApi.generateCertificate(formData);
      
      if (success) {
        toast.success('Certificate generated successfully! Download started.', {
          position: 'top-right',
          autoClose: 5000,
        });
        return true;
      } else {
        throw new Error('Failed to generate certificate');
      }
    } catch (err) {
      let errorMessage = err.message || 'An error occurred while generating the certificate';
      
      // If error doesn't already contain contact info, add it for certificate-related errors
      if (!errorMessage.includes('Soham') && !errorMessage.includes('contact:')) {
        if (errorMessage.includes('not found') || 
            errorMessage.includes('haven\'t attended') || 
            errorMessage.includes('Invalid roll') ||
            errorMessage.includes('don\'t match')) {
          errorMessage += '\n\nIf you attended the event and need help, contact:\nSoham: +91 8692811341 | Shaunik: +91 90826 98665 | Rishi: +91 8169775426';
        }
      }
      
      setError(errorMessage);
      
      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 10000,
      });
      
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Check API health status
   * @returns {Promise<boolean>} - Health status
   */
  const checkHealth = useCallback(async () => {
    try {
      return await certificateApi.checkHealth();
    } catch (err) {
      console.error('Health check failed:', err);
      return false;
    }
  }, []);

  return {
    generateCertificate,
    checkHealth,
    isLoading,
    error,
  };
}