// pages/register.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';
import  { FaSpinner, FaCheck } from 'react-icons/fa6';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { GetServerSideProps } from 'next';
import { getI18nProps } from '@/lib/i18n';
import { useTranslation } from 'next-i18next';

const Register = () => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [isMinLength, setIsMinLength] = useState(false);
  const [hasLowerCase, setHasLowerCase] = useState(false);
  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    setIsMinLength(value.length >= 8);
    setHasLowerCase(/[a-z]/.test(value));
    setHasUpperCase(/[A-Z]/.test(value));
    setHasNumber(/\d/.test(value));
    setHasSpecialChar(/[^a-zA-Z0-9]/.test(value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Début du chargement

    if (!firstName || !lastName || !email || !phoneNumber || !password) {
      toast.error(t('all_fields_required'));
      setLoading(false); // Fin du chargement
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error(t('invalid_email'));
      setLoading(false); // Fin du chargement
      return;
    }

    const phoneRegex = /^\+[1-9]\d{1,14}$/;
    if (!phoneRegex.test(phoneNumber)) {
      toast.error(t('invalid_phone_number'));
      setLoading(false); // Fin du chargement
      return;
    }

    if (password !== confirmPassword) {
      toast.error(t('passwords_do_not_match'));
      setLoading(false); // Fin du chargement
      return;
    }

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, email, phoneNumber, password }),
      });

      if (res.ok) {
        const smsMessage = t('welcome_message', { firstName });
        await fetch('/api/send-sms', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ to: phoneNumber, message: smsMessage }),
        });
        router.push('/login');
      } else {
        const error = await res.json();
        toast.error(error.message);
      }
    } catch (error) {
      toast.error('unexpected_error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">{t("register")}</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">{t('first_name')}</label>
            <input
              type="text"
              id="first_name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-700 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">{t('last_name')}</label>
            <input
              type="text"
              id="last_name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-700 sm:text-sm"
              required
            />
          </div>
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
          <div className="mb-4">
            <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">{t('phone_number')}</label>
            <input
              type="text"
              id="phone_number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-700 sm:text-sm"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">{t('password')}</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-700 sm:text-sm"
              required
            />
            <ul className="mt-2 text-sm text-gray-600">
              <li className={`flex items-center ${isMinLength ? 'text-green-500' : 'text-red-500'}`}>
                {isMinLength ? <FaCheck className="mr-1" /> : <FaTimes className="mr-1" />}
                {t('at_least_eight_characters')}
              </li>
              <li className={`flex items-center ${hasLowerCase ? 'text-green-500' : 'text-red-500'}`}>
                {hasLowerCase ? <FaCheck className="mr-1" /> : <FaTimes className="mr-1" />}
                {t('at_least_one_lowercase_letter')}
              </li>
              <li className={`flex items-center ${hasUpperCase ? 'text-green-500' : 'text-red-500'}`}>
                {hasUpperCase ? <FaCheck className="mr-1" /> : <FaTimes className="mr-1" />}
                {t('at_least_one_uppercase_letter')}
              </li>
              <li className={`flex items-center ${hasNumber ? 'text-green-500' : 'text-red-500'}`}>
                {hasNumber ? <FaCheck className="mr-1" /> : <FaTimes className="mr-1" />}
                {t('at_least_one_number')}
              </li>
              <li className={`flex items-center ${hasSpecialChar ? 'text-green-500' : 'text-red-500'}`}>
                {hasSpecialChar ? <FaCheck className="mr-1" /> : <FaTimes className="mr-1" />}
                {t('at_least_one_special_character')}
              </li>
            </ul>
          </div>
          <div className="mb-4">
            <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700">{t('confirm_password')}</label>
            <input
              type="password"
              id="confirm_password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-700 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
            disabled={loading}
          >
            {loading ? <FaSpinner className="animate-spin inline-block" /> : t('sign-up')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await getI18nProps(locale || 'fr')),
    },
  };
};
