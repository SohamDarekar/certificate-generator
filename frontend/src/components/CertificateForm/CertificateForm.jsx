import React, { useState, useEffect } from 'react';
import { useCertificate } from '../../contexts/CertificateContext';
import { useCertificateApi } from '../../hooks/useCertificateApi';
import { validateForm, sanitizeInput } from '../../utils/validation';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
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
  
  // Local state for real-time validation
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
  };

  /**
   * Handle form submission
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
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const success = await generateCertificate(formData);
      
      if (success) {
        // Clear form on successful generation
        setTimeout(() => {
          clearForm();
          setTouched({});
        }, 2000);
      }
    } catch (error) {
      console.error('Certificate generation failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Handle form reset
   */
  const handleReset = () => {
    clearForm();
    setTouched({});
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
    <div className="certificate-form">
      <div className="certificate-form__header">
        <h2 className="certificate-form__title">
          Generate Your Certificate
        </h2>
        <p className="certificate-form__description">
          Enter your full name and verification code to generate your IEEE WIE Day Workshop participation certificate.
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
              Enter your name exactly as you registered for the workshop
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
            Verification Code
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
            placeholder="Enter your unique verification code"
            disabled={isFormDisabled}
            aria-invalid={validationErrors.code && touched.code ? 'true' : 'false'}
            aria-describedby={validationErrors.code && touched.code ? 'code-error' : 'code-help'}
            autoComplete="off"
            maxLength={50}
          />
          
          {!validationErrors.code && (
            <p id="code-help" className="form-group__help">
              This code was provided to you during workshop registration
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
      </form>
    </div>
  );
}

export default CertificateForm;