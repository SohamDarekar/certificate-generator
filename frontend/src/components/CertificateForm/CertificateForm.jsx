import React, { useState, useEffect } from 'react';
import { useCertificate } from '../../contexts/CertificateContext';
import { useCertificateApi } from '../../hooks/useCertificateApi';
import { validateForm, sanitizeInput } from '../../utils/validation';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import Toast from '../Toast/Toast';
import './CertificateForm.css';

/**
 * Certificate generation form component
 * Handles form validation, submission, and certificate download
 */
function CertificateForm() {
  const {
    formData,
    validationErrors,
    setFormData,
    setValidationErrors,
    clearForm,
  } = useCertificate();

  const { generateCertificate, isLoading } = useCertificateApi();
  
  // Local state for real-time validation and UI feedback
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });
  const [formProgress, setFormProgress] = useState(0);

  // Calculate form completion progress
  useEffect(() => {
    const totalFields = 2;
    let completedFields = 0;
    
    if (formData.name && formData.name.trim().length > 0) completedFields++;
    if (formData.code && formData.code.trim().length > 0) completedFields++;
    
    setFormProgress((completedFields / totalFields) * 100);
  }, [formData]);

  // Toast handler
  const showToast = (message, type = 'info') => {
    // Longer duration for error messages on mobile
    const duration = (type === 'error' && window.innerWidth <= 768) ? 8000 : 5000;
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'info' }), duration);
  };

  /**
   * Handle input changes with real-time validation
   */
  const handleInputChange = (field, value) => {
    // Store raw value to allow spaces while typing
    setFormData({ [field]: value });
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  /**
   * Handle input blur for validation and sanitization
   */
  const handleInputBlur = (field) => {
    // Sanitize (trim) value on blur
    const sanitizedValue = sanitizeInput(formData[field]);
    if (sanitizedValue !== formData[field]) {
      setFormData({ [field]: sanitizedValue });
    }
    setTouched(prev => ({ ...prev, [field]: true }));
    
    // Validate single field
    const errors = validateForm({ ...formData, [field]: sanitizedValue });
    setValidationErrors(errors);
  };  /**
   * Handle form submission with enhanced feedback
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({ name: true, code: true });
    
    // Validate form
    const errors = validateForm(formData);
    setValidationErrors(errors);
    
    // Stop if validation errors exist
    if (Object.keys(errors).length > 0) {
      // Focus first error field
      const firstErrorField = Object.keys(errors)[0];
      const errorElement = document.getElementById(firstErrorField);
      if (errorElement) {
        errorElement.focus();
      }
      showToast('Please fix the errors below', 'error');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const success = await generateCertificate(formData);
      
      if (success) {
        setShowSuccessAnimation(true);
        
        // Clear form on successful generation
        setTimeout(() => {
          clearForm();
          setTouched({});
          setShowSuccessAnimation(false);
        }, 3000);
      }
    } catch (error) {
      console.error('Certificate generation failed:', error);
      
      // Enhanced error messaging
      let errorMessage = error.message;
      
      if (errorMessage.includes("haven't attended")) {
        errorMessage = "Attendee not found or roll number mismatch. Please check your details.";
      } else if (errorMessage.includes("not found")) {
        errorMessage = "Attendee not found or roll number mismatch. Please check your details.";
      } else if (errorMessage.includes("Invalid roll number")) {
        errorMessage = "Attendee not found or roll number mismatch. Please check your details.";
      } else if (errorMessage.includes("don't match") || errorMessage.includes("mismatch")) {
        errorMessage = "Attendee not found or roll number mismatch. Please check your details.";
      } else if (errorMessage.includes("connect")) {
        errorMessage = "Unable to connect to server. Please check your internet connection.";
      }
      
      // For mobile, show shorter message with contact info
      if (window.innerWidth <= 768) {
        if (errorMessage.includes("mismatch") || errorMessage.includes("not found")) {
          errorMessage = "Attendee not found or roll number mismatch. Contact: Soham +91 8692811341";
        }
      }
      
      showToast(errorMessage, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Handle form reset with feedback
   */
  const handleReset = () => {
    clearForm();
    setTouched({});
    setShowSuccessAnimation(false);
    showToast('Form cleared successfully', 'info');
  };

  // Real-time validation effect
  useEffect(() => {
    if (Object.keys(touched).length > 0) {
      const errors = validateForm(formData);
      setValidationErrors(errors);
    }
  }, [formData, touched, setValidationErrors]);

  const isFormDisabled = isLoading || isSubmitting;

  return (
    <>
      <div className={`certificate-form ${showSuccessAnimation ? 'certificate-form--success' : ''}`}>
        {/* Progress Bar */}
        <div className="certificate-form__progress">
          <div className="certificate-form__progress-track">
            <div 
              className="certificate-form__progress-fill" 
              style={{ width: `${formProgress}%` }}
            />
          </div>
          <span className="certificate-form__progress-text">
            {formProgress === 100 ? 'Ready to generate certificate!' : `${Math.round(formProgress)}% complete`}
          </span>
        </div>
      <div className="certificate-form__header">
        <h2 className="certificate-form__title">
          Generate Your Certificate
        </h2>
        <p className="certificate-form__description">
          Enter your full name and roll number to generate your IEEE VSIT Workshop participation certificate.
        </p>
      </div>

      <form 
        className="certificate-form__form" 
        onSubmit={handleSubmit}
        noValidate
        aria-label="Certificate generation form"
      >
        {/* Name Field */}
        <div className="form-group">
          <label 
            htmlFor="name" 
            className="form-group__label"
          >
            Full Name
            <span className="form-group__required" aria-label="required">*</span>
          </label>
          
          <input
            type="text"
            id="name"
            name="name"
            className={`form-group__input ${
              validationErrors.name && touched.name ? 'form-group__input--error' : ''
            }`}
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            onBlur={() => handleInputBlur('name')}
            placeholder="Enter your full name as it should appear on the certificate"
            disabled={isFormDisabled}
            aria-invalid={validationErrors.name && touched.name ? 'true' : 'false'}
            aria-describedby={validationErrors.name && touched.name ? 'name-error' : 'name-help'}
            autoComplete="name"
            maxLength={100}
          />
          
          {!validationErrors.name && (
            <p id="name-help" className="form-group__help">
              Enter your name as registered (case-insensitive: "John Doe" or "john doe" both work)
            </p>
          )}
          
          {validationErrors.name && touched.name && (
            <p 
              id="name-error" 
              className="form-group__error"
              role="alert"
              aria-live="polite"
            >
              {validationErrors.name}
            </p>
          )}
        </div>

        {/* Code Field */}
        <div className="form-group">
          <label 
            htmlFor="code" 
            className="form-group__label"
          >
            Roll Number
            <span className="form-group__required" aria-label="required">*</span>
          </label>
          
          <input
            type="text"
            id="code"
            name="code"
            className={`form-group__input ${
              validationErrors.code && touched.code ? 'form-group__input--error' : ''
            }`}
            value={formData.code}
            onChange={(e) => handleInputChange('code', e.target.value)}
            onBlur={() => handleInputBlur('code')}
            placeholder="Enter your roll number (alphanumeric)"
            disabled={isFormDisabled}
            aria-invalid={validationErrors.code && touched.code ? 'true' : 'false'}
            aria-describedby={validationErrors.code && touched.code ? 'code-error' : 'code-help'}
            autoComplete="off"
            maxLength={10}
          />
          
          {!validationErrors.code && (
            <p id="code-help" className="form-group__help">
              Enter your college roll number (case-insensitive: "24302F0019" or "24302f0019" both work)
            </p>
          )}
          
          {validationErrors.code && touched.code && (
            <p 
              id="code-error" 
              className="form-group__error"
              role="alert"
              aria-live="polite"
            >
              {validationErrors.code}
            </p>
          )}
        </div>

        {/* Form Actions */}
        <div className="certificate-form__actions">
          <button
            type="submit"
            className="btn btn--primary btn--large certificate-form__submit"
            disabled={isFormDisabled}
            aria-describedby="submit-help"
          >
            {isSubmitting ? (
              <>
                <LoadingSpinner size="small" />
                <span>Generating Certificate...</span>
              </>
            ) : (
              <>
                <span>Generate Certificate</span>
                <svg 
                  className="btn__icon" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </>
            )}
          </button>
          
          <button
            type="button"
            className="btn btn--secondary certificate-form__reset"
            onClick={handleReset}
            disabled={isFormDisabled}
          >
            Clear Form
          </button>
        </div>
        
        <p id="submit-help" className="certificate-form__submit-help">
          Your certificate will be automatically downloaded as a PDF file
        </p>
        
        {/* Contact Information */}
        <div className="certificate-form__contact-info">
          <div className="certificate-form__contact-header">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--primary-500)' }}>
              <path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z" />
            </svg>
            <span>Need Help?</span>
          </div>
          <p className="certificate-form__contact-text">
            If you attended the event and can't generate your certificate:
          </p>
          <div className="certificate-form__contacts">
            <div className="certificate-form__contact-item">
              <strong>Soham Darekar (Chairperson):</strong> +91 8692811341
            </div>
            <div className="certificate-form__contact-item">
              <strong>Shaunik Virdi (Vice-Chairperson):</strong> +91 90826 98665
            </div>
            <div className="certificate-form__contact-item">
              <strong>Rishi Desai (General Secretary):</strong> +91 8169775426
            </div>
          </div>
        </div>
      </form>
    </div>
    
    {/* Toast Notification */}
    {toast.show && (
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ show: false, message: '', type: 'info' })}
      />
    )}
  </>
  );
}

export default CertificateForm;