import React, { createContext, useContext, useReducer } from 'react';

// Action types
const CERTIFICATE_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_FORM_DATA: 'SET_FORM_DATA',
  SET_VALIDATION_ERRORS: 'SET_VALIDATION_ERRORS',
  CLEAR_FORM: 'CLEAR_FORM',
  SET_DOWNLOAD_STATUS: 'SET_DOWNLOAD_STATUS',
};

// Initial state
const initialState = {
  isLoading: false,
  formData: {
    name: '',
    code: '',
  },
  validationErrors: {},
  downloadStatus: null, // 'success', 'error', or null
};

// Reducer function
function certificateReducer(state, action) {
  switch (action.type) {
    case CERTIFICATE_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    
    case CERTIFICATE_ACTIONS.SET_FORM_DATA:
      return {
        ...state,
        formData: {
          ...state.formData,
          ...action.payload,
        },
        validationErrors: {}, // Clear errors when form data changes
      };
    
    case CERTIFICATE_ACTIONS.SET_VALIDATION_ERRORS:
      return {
        ...state,
        validationErrors: action.payload,
      };
    
    case CERTIFICATE_ACTIONS.CLEAR_FORM:
      return {
        ...state,
        formData: initialState.formData,
        validationErrors: {},
        downloadStatus: null,
      };
    
    case CERTIFICATE_ACTIONS.SET_DOWNLOAD_STATUS:
      return {
        ...state,
        downloadStatus: action.payload,
      };
    
    default:
      return state;
  }
}

// Create context
const CertificateContext = createContext();

/**
 * Certificate Context Provider
 * Manages global state for certificate generation including form data,
 * loading states, validation errors, and download status
 */
export function CertificateProvider({ children }) {
  const [state, dispatch] = useReducer(certificateReducer, initialState);

  // Action creators
  const actions = {
    setLoading: (isLoading) => {
      dispatch({ type: CERTIFICATE_ACTIONS.SET_LOADING, payload: isLoading });
    },
    
    setFormData: (data) => {
      dispatch({ type: CERTIFICATE_ACTIONS.SET_FORM_DATA, payload: data });
    },
    
    setValidationErrors: (errors) => {
      dispatch({ type: CERTIFICATE_ACTIONS.SET_VALIDATION_ERRORS, payload: errors });
    },
    
    clearForm: () => {
      dispatch({ type: CERTIFICATE_ACTIONS.CLEAR_FORM });
    },
    
    setDownloadStatus: (status) => {
      dispatch({ type: CERTIFICATE_ACTIONS.SET_DOWNLOAD_STATUS, payload: status });
    },
  };

  const value = {
    ...state,
    ...actions,
  };

  return (
    <CertificateContext.Provider value={value}>
      {children}
    </CertificateContext.Provider>
  );
}

/**
 * Custom hook to use certificate context
 * Throws error if used outside of CertificateProvider
 */
export function useCertificate() {
  const context = useContext(CertificateContext);
  
  if (!context) {
    throw new Error('useCertificate must be used within a CertificateProvider');
  }
  
  return context;
}

export { CERTIFICATE_ACTIONS };