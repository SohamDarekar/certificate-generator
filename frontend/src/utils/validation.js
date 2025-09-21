/**
 * Form validation utilities
 * Provides validation functions for certificate form fields
 */

/**
 * Validate name field
 * @param {string} name - Name to validate
 * @returns {string|null} - Error message or null if valid
 */
export function validateName(name) {
  if (!name || typeof name !== 'string') {
    return 'Name is required';
  }
  
  const trimmedName = name.trim();
  
  if (trimmedName.length === 0) {
    return 'Name cannot be empty';
  }
  
  if (trimmedName.length < 2) {
    return 'Name must be at least 2 characters long';
  }
  
  if (trimmedName.length > 100) {
    return 'Name must be less than 100 characters';
  }
  
// Check for valid characters (letters, spaces, hyphens, apostrophes)
const nameRegex = /^[a-zA-Z\s\-'.]+$/;
if (!nameRegex.test(trimmedName)) {
  return 'Name can only contain letters, spaces, hyphens, apostrophes, and periods';
}

return null;
}

/**
 * Validate roll number field
 * @param {string} code - Roll number to validate (10 alphanumeric characters)
 * @returns {string|null} - Error message or null if valid
 */
export function validateCode(code) {
  if (!code || typeof code !== 'string') {
    return 'Roll number is required. If you attended the event and need help, contact Soham: +91 8692811341';
  }
  
  const trimmedCode = code.trim();
  
  if (trimmedCode.length === 0) {
    return 'Roll number cannot be empty. If you attended the event and need help, contact Soham: +91 8692811341';
  }
  
  if (trimmedCode.length !== 10) {
    return 'Roll number must be exactly 10 characters long. If you attended the event and need help, contact Soham: +91 8692811341';
  }
  
  // Check for valid characters (alphanumeric for 10-character roll numbers)
  const codeRegex = /^[A-Za-z0-9]{10}$/;
  if (!codeRegex.test(trimmedCode)) {
    return 'Roll number must contain exactly 10 alphanumeric characters (letters and numbers, case-insensitive). If you attended the event and need help, contact Soham: +91 8692811341';
  }
  
  return null;
}

/**
 * Validate entire form
 * @param {Object} formData - Form data to validate
 * @returns {Object} - Object containing validation errors
 */
export function validateForm(formData) {
  const errors = {};
  
  const nameError = validateName(formData.name);
  if (nameError) {
    errors.name = nameError;
  }
  
  const codeError = validateCode(formData.code);
  if (codeError) {
    errors.code = codeError;
  }
  
  return errors;
}

/**
 * Check if form has any validation errors
 * @param {Object} errors - Validation errors object
 * @returns {boolean} - True if form is valid
 */
export function isFormValid(errors) {
  return Object.keys(errors).length === 0;
}

/**
 * Sanitize input string
 * @param {string} input - Input to sanitize
 * @returns {string} - Sanitized input
 */
export function sanitizeInput(input) {
  if (!input || typeof input !== 'string') {
    return '';
  }
  
  return input.trim();
}