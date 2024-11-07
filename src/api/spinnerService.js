// spinnerService.js
import React, { createContext, useContext, useState } from 'react';

// Create a context for the spinner
const SpinnerContext = createContext();

// Spinner provider to manage spinner state
export const SpinnerProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const showSpinner = () => setLoading(true);
  const hideSpinner = () => setLoading(false);

  return (
    <SpinnerContext.Provider value={{ loading, showSpinner, hideSpinner }}>
      {children}
    </SpinnerContext.Provider>
  );
};

// Custom hook to access spinner context
export const useSpinner = () => useContext(SpinnerContext);
