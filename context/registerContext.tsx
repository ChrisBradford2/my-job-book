import React, { createContext, useState } from 'react';

interface RegisterContextProps {
  showSuccessToast: boolean;
  setShowSuccessToast: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RegisterContext = createContext<RegisterContextProps>({
  showSuccessToast: false,
  setShowSuccessToast: () => {},
});

export const RegisterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  return (
    <RegisterContext.Provider value={{ showSuccessToast, setShowSuccessToast }}>
      {children}
    </RegisterContext.Provider>
  );
};
