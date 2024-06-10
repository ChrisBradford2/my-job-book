import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/authContext';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'next-i18next';

const Header = () => {
  const { userIsLogged, setUserIsLogged } = useAuth();
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const router = useRouter();
  const { t } = useTranslation('common');

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
        <nav className="hidden md:flex items-center space-x-4">
          {userIsLogged ? (
            <>
              <Link href="/dashboard" className="hover:text-gray-300">
                {t('dashboard')}
              </Link>
              <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-700">
                {t('logout')}
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-700">
                {t('login')}
              </Link>
              <Link href="/register" className="bg-green-500 px-3 py-1 rounded hover:bg-green-700">
                {t('register')}
              </Link>
            </>
          )}
          <LanguageSwitcher />
          <label className="flex items-center cursor-pointer">
            <FaSun className="text-yellow-500 mr-3" />
            <input type="checkbox" className="sr-only" checked={isDarkTheme} onChange={toggleTheme} />
            <div className="relative">
              <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
              <div
                className={`dot absolute left-1 top-1 w-6 h-6 rounded-full transition ${
                  isDarkTheme ? 'transform translate-x-full bg-gray-300' : 'bg-yellow-500'
                }`}
              ></div>
            </div>
            <FaMoon className="text-gray-400 ml-3" />
          </label>
        </nav>
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsSidebarOpen(true)} className="text-gray-300 hover:text-white focus:outline-none">
            <FaBars className="h-6 w-6" />
          </button>
        </div>
      </div>
      <div className={`fixed inset-0 z-50 flex ${isSidebarOpen ? '' : 'pointer-events-none'}`}>
        <div
          className={`fixed inset-0 bg-black transition-opacity duration-300 ${isSidebarOpen ? 'opacity-50' : 'opacity-0'}`}
          onClick={() => setIsSidebarOpen(false)}
        ></div>
        <div
          className={`fixed right-0 top-0 bg-gray-800 w-64 h-full shadow-xl transition-transform transform ${
            isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
          } duration-300`}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <h2 className="text-2xl font-bold">Menu</h2>
            <button onClick={() => setIsSidebarOpen(false)} className="text-gray-300 hover:text-white focus:outline-none">
              <FaTimes className="h-6 w-6" />
            </button>
          </div>
          <nav className="p-4 space-y-4">
            <Link href="/" className="block text-gray-300 hover:text-white" onClick={() => setIsSidebarOpen(false)}>
              {t('home')}
            </Link>
            {userIsLogged ? (
              <>
                <Link href="/dashboard" className="block text-gray-300 hover:text-white" onClick={() => setIsSidebarOpen(false)}>
                  {t('dashboard')}
                </Link>
                <button onClick={() => { handleLogout(); setIsSidebarOpen(false); }} className="block w-full text-left text-gray-300 hover:text-white">
                  {t('logout')}
                </button>
              </>
            ) : (
              <>
                <Link href="/login"
                className="block text-gray-300 hover:text-white" onClick={() => setIsSidebarOpen(false)}>
                  {t('login')}
                </Link>
                <Link href="/register" className="block text-gray-300 hover:text-white" onClick={() => setIsSidebarOpen(false)}>
                  {t('register')}
                </Link>
              </>
            )}
            <LanguageSwitcher />
            <label className="flex items-center cursor-pointer mt-4">
              <FaSun className="text-yellow-500 mr-3" />
              <input type="checkbox" className="sr-only" checked={isDarkTheme} onChange={toggleTheme} />
              <div className="relative">
                <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                <div
                  className={`dot absolute left-1 top-1 w-6 h-6 rounded-full transition ${
                    isDarkTheme ? 'transform translate-x-full bg-gray-300' : 'bg-yellow-500'
                  }`}
                ></div>
              </div>
              <FaMoon className="text-gray-400 ml-3" />
            </label>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
