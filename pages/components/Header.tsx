import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/authContext';
import Cookies from 'js-cookie';
import router from 'next/router';

const Header = () => {
  const { userIsLogged, setUserIsLogged } = useAuth();
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkTheme(savedTheme === 'dark');
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDarkTheme ? 'light' : 'dark';
    setIsDarkTheme(!isDarkTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', !isDarkTheme);
  };

  const handleLogout = () => {
    Cookies.remove('auth');
    setUserIsLogged(false);
    router.push('/');
  };

  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          My Job Book
        </Link>
        <nav className="flex items-center space-x-4">
          <Link href="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link href="/dashboard" className="hover:text-gray-300">
            Dashboard
          </Link>
          {userIsLogged ? (
            <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-700">
              Logout
            </button>
          ) : (
            <>
              <Link href="/login" className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-700">
                Login
              </Link>
              <Link href="/register" className="bg-green-500 px-3 py-1 rounded hover:bg-green-700">
                Register
              </Link>
            </>
          )}
          <button onClick={toggleTheme} className="bg-gray-700 px-3 py-1 rounded hover:bg-gray-600">
            {isDarkTheme ? 'Light Theme' : 'Dark Theme'}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
