import { useState } from 'react';

export const usePasswordToggle = () => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return [showPassword, toggleShowPassword] as const;
};
