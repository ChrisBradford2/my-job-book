// pages/confirmation-success.tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Confetti from 'react-confetti';

const ConfirmationSuccess = () => {
  const router = useRouter();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/login');
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  useEffect(() => {
    function updateDimensions() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <Confetti 
        width={dimensions.width}
        height={dimensions.height}
      />
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Votre compte a été validé !</h1>
        <p className="text-gray-700">Vous allez être redirigé vers la page de login.</p>
        <p className="text-gray-700">Merci de confirmer votre email.</p>
      </div>
    </div>
  );
};

export default ConfirmationSuccess;
