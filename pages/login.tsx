// pages/login.tsx
import Head from 'next/head';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/authContext';
import { toast } from 'react-toastify';
import { FaSpinner } from 'react-icons/fa';
import { GetServerSideProps } from 'next';
import { getI18nProps } from '@/lib/i18n';
import { useTranslation } from 'next-i18next';
import { usePasswordToggle } from '@/utils/passwordToggle';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import Link from 'next/link';
import { RegisterContext } from '@/context/registerContext';

const Login: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const { setUserIsLogged } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendConfirmation, setResendConfirmation] = useState(false);
  const [showPassword, toggleShowPassword] = usePasswordToggle();

  const { showSuccessToast, setShowSuccessToast } = useContext(RegisterContext);

  useEffect(() => {
    if (showSuccessToast) {
      toast.success("Inscription réussie ! Veuillez vérifier votre adresse mail avant d'accéder à votre compte");
      setShowSuccessToast(false);
    }
  }, [showSuccessToast, setShowSuccessToast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        setUserIsLogged(true);
        setLoading(false);
        router.push('/dashboard');
      } else if (res.status === 403) {
        setLoading(false);
        toast.error(t('account_not_confirmed'));
        setResendConfirmation(true);
      } else if (res.status === 401) {
        setLoading(false);
        toast.error(t('invalid_credentials'));
      } else {
        const error = await res.json();
        setLoading(false);
        toast.error(error.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error('An error occurred. Please try again.');
    }
  };

  const handleResendConfirmation = async () => {
    try {
      const res = await fetch('/api/resend-confirmation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        toast.success(t('confirmation_email_sent'));
      } else {
        const error = await res.json();
        toast.error(t('failed_to_send_confirmation') + error.message);
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <>
      <Head>
        <title>{t('login')}</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">{t('login')}</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">{t('email')}</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-700 sm:text-sm"
                required
              />
            </div>
            <div className="mb-6 relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">{t('password')}</label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full pl-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-700 sm:text-sm relative pr-10"
                required
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="text-sm text-gray-600 hover:underline absolute right-4 bottom-3"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <button
              type="submit"
              className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${loading ? 'bg-gray-500 cursor-not-allowed' : ''}`}
            >
              {loading ? <FaSpinner className="animate-spin inline-block" /> : t('login')}
            </button>
          </form>
          <Link className="text-sm text-blue-500 hover:underline mt-4 inline-block" href="/forgot-password">
            {t('forgot_password')}
          </Link>
          {resendConfirmation && (
            <div className="mt-4 text-center">
              <p className="text-gray-600">{t('did_not_receive_confirmation')}</p>
              <button
                onClick={handleResendConfirmation}
                className="text-indigo-600 hover:underline"
              >
                {t('resend_confirmation_email')}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await getI18nProps(locale || 'fr')),
    },
  };
};
