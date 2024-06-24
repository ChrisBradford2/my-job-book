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
  isLoading: boolean;
}>({
  user: null,
  setUser: () => {},
  userIsLogged: false,
  setUserIsLogged: () => {},
  isAdmin: false,
  isLoading: true,
});

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userIsLogged, setUserIsLogged] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = Cookies.get('auth');
      if (token) {
        try {
          const decoded = jwt.decode(token) as User;
          if (decoded) {
            const response = await fetch(`/api/profile?userId=${decoded.id}`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            if (response.ok) {
              const data = await response.json();
              setUser(data);
              setUserIsLogged(true);
              setIsAdmin(decoded.role === 'admin');
            } else {
              setUser(null);
              setUserIsLogged(false);
              setIsAdmin(false);
            }
          } else {
            setUser(null);
            setUserIsLogged(false);
            setIsAdmin(false);
          }
        } catch (error) {
          setUser(null);
          setUserIsLogged(false);
          setIsAdmin(false);
        }
      }
      setIsLoading(false);
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, userIsLogged, setUserIsLogged, isAdmin, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
