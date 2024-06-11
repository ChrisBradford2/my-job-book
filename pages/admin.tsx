// pages/admin/index.tsx
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/router';
import { User } from '@/types/User';
import { toast } from 'react-toastify';
import Head from 'next/head';

const AdminPanel = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  
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
        <title>Admin Panel</title>
        <meta name="description" content="Admin panel" />
      </Head>
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map(user => (
          <div key={user.id} className="p-4 border rounded-lg shadow-md bg-white">
            <h2 className="text-xl font-semibold mb-2">{user.firstName} {user.lastName}</h2>
            <p className="mb-1"><span className="font-semibold">Email:</span> {user.email}</p>
            <p className="mb-1"><span className="font-semibold">Phone:</span> {user.phoneNumber}</p>
            <p className="mb-2"><span className="font-semibold">Role:</span> {user.role}</p>
            <h3 className="text-lg font-semibold mb-2">Job Offers:</h3>
            <ul className="list-disc list-inside space-y-1">
              {user.JobOffer.map(offer => (
                <li key={offer.id} className="text-gray-700">
                  <span className="font-semibold">{offer.title}</span> at {offer.company} - <span className="italic">{offer.status}</span>
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
