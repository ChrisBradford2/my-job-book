// context/authContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import { User } from '@/types/User';

const AuthContext = createContext<{
  user: User | null;
  setUser: (user: User | null) => void;
  userIsLogged: boolean;
  setUserIsLogged: (logged: boolean) => void;
}>({
  user: null,
  setUser: () => {},
  userIsLogged: false,
  setUserIsLogged: () => {}
});

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userIsLogged, setUserIsLogged] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = Cookies.get('auth');
    if (token) {
      try {
        const decoded = jwt.decode(token) as User;
        if (decoded) {
          setUserIsLogged(true);
          setUser(decoded);
        } else {
          setUserIsLogged(false);
          setUser(null);
        }
      } catch (error) {
        console.error("Invalid token");
        setUserIsLogged(false);
        setUser(null);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, userIsLogged, setUserIsLogged }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
