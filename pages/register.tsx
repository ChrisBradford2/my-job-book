// pages/register.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';
import  { FaSpinner, FaCheck } from 'react-icons/fa6';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Register = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false); // État de chargement

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
      toast.error('All fields are required');
      setLoading(false); // Fin du chargement
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Invalid email address');
      setLoading(false); // Fin du chargement
      return;
    }

    const phoneRegex = /^\+[1-9]\d{1,14}$/;
    if (!phoneRegex.test(phoneNumber)) {
      toast.error('Invalid phone number');
      setLoading(false); // Fin du chargement
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
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
        const smsMessage = `Welcome ${firstName}! Thank you for registering with My Job Book. We will keep you updated on your job applications.`;
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
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false); // Fin du chargement
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">First Name</label>
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
            <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Last Name</label>
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
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
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
            <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">Phone Number</label>
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
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
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
                At least 8 characters
              </li>
              <li className={`flex items-center ${hasLowerCase ? 'text-green-500' : 'text-red-500'}`}>
                {hasLowerCase ? <FaCheck className="mr-1" /> : <FaTimes className="mr-1" />}
                At least one lowercase letter
              </li>
              <li className={`flex items-center ${hasUpperCase ? 'text-green-500' : 'text-red-500'}`}>
                {hasUpperCase ? <FaCheck className="mr-1" /> : <FaTimes className="mr-1" />}
                At least one uppercase letter
              </li>
              <li className={`flex items-center ${hasNumber ? 'text-green-500' : 'text-red-500'}`}>
                {hasNumber ? <FaCheck className="mr-1" /> : <FaTimes className="mr-1" />}
                At least one number
              </li>
              <li className={`flex items-center ${hasSpecialChar ? 'text-green-500' : 'text-red-500'}`}>
                {hasSpecialChar ? <FaCheck className="mr-1" /> : <FaTimes className="mr-1" />}
                At least one special character
              </li>
            </ul>
          </div>
          <div className="mb-4">
            <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
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
            {loading ? <FaSpinner className="animate-spin inline-block" /> : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
