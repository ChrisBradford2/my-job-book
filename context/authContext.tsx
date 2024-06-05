// context/authContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext<{
  userIsLogged: boolean;
  setUserIsLogged: (logged: boolean) => void;
}>({
  userIsLogged: false,
  setUserIsLogged: () => {}
});

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userIsLogged, setUserIsLogged] = useState(false);

  useEffect(() => {
    const token = Cookies.get('auth');
    console.log('Token from cookies:', token); // Debugging line
    if (token) {
      setUserIsLogged(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userIsLogged, setUserIsLogged }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
