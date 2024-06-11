// pages/admin/index.tsx
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/router';
import { User } from '@/types/User';
import { toast } from 'react-toastify';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';

const AdminPanel = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const { t } = useTranslation('common');
  
  useEffect(() => {
    if (!user || user.role !== 'admin') {
      toast.error("You are not authorized to view this page.");
    } else {
      fetch('/api/admin/users')
        .then(response => response.json())
        .then(data => setUsers(data))
        .catch(error => console.error("Failed to fetch users", error));
    }
  }, [user, router]);

  if (!user || user.role !== 'admin') {
    return (
      <main className="container mx-auto p-4">
        <p className="text-xl font-semibold text-red-600">You are not authorized to view this page.</p>
      </main>
    );
  }

  return (
    <main className="container mx-auto p-4">
      <Head>
        <title>{t('admin_dashboard')}</title>
        <meta name="description" content={t('admin_dashboard_description')} />
      </Head>
      <h1 className="text-2xl font-bold mb-4">{t('admin_dashboard')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map(user => (
          <div key={user.id} className="p-4 border rounded-lg shadow-md bg-white hover:scale-105 transition-transform">
            <h2 className="text-xl font-semibold mb-2">{user.firstName} {user.lastName}</h2>
            <p className="mb-1"><span className="font-semibold">{t("email")}:</span> {user.email}</p>
            <p className="mb-1"><span className="font-semibold">{t('phone_number')}:</span> {user.phoneNumber}</p>
            <p className="mb-2"><span className="font-semibold">{t('role')}:</span> {user.role}</p>
            <h3 className="text-lg font-semibold mb-2">{t('job_offers')}</h3>
            <ul className="list-disc list-inside space-y-1">
              {user.JobOffer.map(offer => (
                <li key={offer.id} className="text-gray-700">
                  <span className="font-semibold">{offer.title}</span> {t("at")} {offer.company} - <span className="italic">{offer.status}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
};

export default AdminPanel;
