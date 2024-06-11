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
  isAdmin: boolean;
}>({
  user: null,
  setUser: () => {},
  userIsLogged: false,
  setUserIsLogged: () => {},
  isAdmin: false
});

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userIsLogged, setUserIsLogged] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false); // Add isAdmin state

  useEffect(() => {
    const token = Cookies.get('auth');
    if (token) {
      try {
        const decoded = jwt.decode(token) as User;
        if (decoded) {
          setUserIsLogged(true);
          setUser(decoded);
          setIsAdmin(decoded.role === 'admin')
        } else {
          setUserIsLogged(false);
          setUser(null);
          setIsAdmin(false);
        }
      } catch (error) {
        setUserIsLogged(false);
        setUser(null);
        setIsAdmin(false);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, userIsLogged, setUserIsLogged, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
