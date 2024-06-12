import { appWithTranslation } from 'next-i18next';
import { AuthProvider } from '@/context/authContext';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Modal from 'react-modal';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import i18n from '@/i18n';
import { RegisterProvider } from '@/context/registerContext';

Modal.setAppElement('#__next');

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  useEffect(() => {
    const { locale } = router;
    if (locale && i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
  }, [router, router.locale]);

  return (
    <AuthProvider>
      <RegisterProvider>
        <Header />
        <Component {...pageProps} />
        <Footer />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </RegisterProvider>
    </AuthProvider>
  );
};

export default appWithTranslation(App);
