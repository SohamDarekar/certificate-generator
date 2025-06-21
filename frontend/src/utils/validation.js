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
 * Validate verification code field
 * @param {string} code - Code to validate
 * @returns {string|null} - Error message or null if valid
 */
export function validateCode(code) {
  if (!code || typeof code !== 'string') {
    return 'Verification code is required';
  }
  
  const trimmedCode = code.trim();
  
  if (trimmedCode.length === 0) {
    return 'Verification code cannot be empty';
  }
  
  if (trimmedCode.length < 3) {
    return 'Verification code must be at least 3 characters long';
  }
  
  if (trimmedCode.length > 50) {
    return 'Verification code must be less than 50 characters';
  }
  
  // Check for valid characters (alphanumeric, hyphens, underscores)
  const codeRegex = /^[a-zA-Z0-9\-_]+$/;
  if (!codeRegex.test(trimmedCode)) {
    return 'Verification code can only contain letters, numbers, hyphens, and underscores';
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