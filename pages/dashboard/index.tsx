// pages/dashboard.tsx
import { GetServerSideProps } from 'next';
import { cookies } from 'next/headers';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Cookies from 'js-cookie';
import { useAuth } from '@/context/authContext';

type JobOffer = {
  id: number;
  title: string;
  company: string;
  link: string;
  status: string;
  applicationDate: string;
  followUpDate?: string;
};

const Dashboard = () => {
  const [jobOffers, setJobOffers] = useState<JobOffer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    link: '',
    status: '',
    applicationDate: '',
    followUpDate: '',
  });
  const { userIsLogged } = useAuth();
  const [token, setToken] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    try {
      const response = await fetch('/api/jobOffers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });
  
      if (!response.ok) throw new Error('Failed to create job offer');
  
      const newJobOffer = await response.json();
      console.log('New job offer:', newJobOffer);
      setJobOffers(prevOffers => [...prevOffers, newJobOffer]);  // Mise à jour de la liste des offres
      closeModal();
    } catch (error) {
      console.error('Error creating job offer:', error);
    }
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '80%',
      border: '1px solid #ccc',
      padding: '20px'
    },
  };


  useEffect(() => {
    const tokenFromCookies = Cookies.get('auth');
    const documentToken = document.cookie.replace(/(?:(?:^|.*;\s*)auth\s*=\s*([^;]*).*$)|^.*$/, "$1");
    console.log('Token from cookies:', tokenFromCookies);
    console.log('Token from document.cookie:', documentToken);
    setToken(tokenFromCookies || '');
  }, []);

  useEffect(() => {
    const loadJobOffers = async () => {
      const interval = setInterval(() => {
        setLoadingProgress((oldProgress) => {
          const newProgress = oldProgress + 20;
          if (newProgress >= 100) {
            clearInterval(interval);
            setIsLoading(false);
          }
          return newProgress;
        });
      }, 500);

      try {
        const response = await fetch('/api/jobOffers', {
          credentials: 'include',
        });
        if (!response.ok) throw new Error('Failed to load job offers');
        const data = await response.json();
        console.log('Job offers:', data);
        setJobOffers(data);
        clearInterval(interval);
        setLoadingProgress(100);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading job offers:', error);
      }
    };

    loadJobOffers();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-lg font-semibold">Loading...</div>
        <div className="w-64 bg-gray-200 h-4 mt-2">
          <div className="bg-blue-500 h-4 text-xs flex justify-center items-center" style={{ width: `${loadingProgress}%` }}>
            {loadingProgress}%
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Job Application Dashboard</h1>
      <button onClick={openModal} className="mb-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-700">Add Job Offer</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Job Offer Modal"
      >
        <h2 className="text-xl font-semibold mb-4">Add New Job Offer</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Job Title"
            className="mb-2 w-full p-2 border border-gray-300 rounded"
          />
          <input
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            placeholder="Company"
            className="mb-2 w-full p-2 border border-gray-300 rounded"
          />
          <input
            name="link"
            value={formData.link}
            onChange={handleInputChange}
            placeholder="Job Link"
            className="mb-2 w-full p-2 border border-gray-300 rounded"
          />
          <input
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            placeholder="Status"
            className="mb-2 w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="date"
            name="applicationDate"
            value={formData.applicationDate}
            onChange={handleInputChange}
            placeholder="Application Date"
            className="mb-2 w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="date"
            name="followUpDate"
            value={formData.followUpDate}
            onChange={handleInputChange}
            placeholder="Follow Up Date"
            className="w-full mb-4 p-2 border border-gray-300 rounded"
          />
          <button type="submit" className="px-4 py-2 bg-green-500 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none">
            Add Job Offer
          </button>
        </form>
        <button onClick={closeModal} className="mt-4 px-4 py-2 bg-red-500 text-white font-medium rounded-md hover:bg-red-700 focus:outline-none">
          Close
        </button>
      </Modal>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        {jobOffers.length > 0 ? (
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="py-3 px-6">Job Title</th>
                <th scope="col" className="py-3 px-6">Company</th>
                <th scope="col" className="py-3 px-6">Link</th>
                <th scope="col" className="py-3 px-6">Status</th>
                <th scope="col" className="py-3 px-6">Applied Date</th>
                <th scope="col" className="py-3 px-6">Follow Up Date</th>
                <th scope="col" className="py-3 px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobOffers.map((job) => (
                <tr key={job.id} className="bg-white border-b">
                  <td className="py-4 px-6">{job.title}</td>
                  <td className="py-4 px-6">{job.company}</td>
                  <td className="py-4 px-6">
                    <a href={job.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View Posting</a>
                  </td>
                  <td className="py-4 px-6">{job.status}</td>
                  <td className="py-4 px-6">{new Date(job.applicationDate).toLocaleDateString()}</td>
                  <td className="py-4 px-6">{job.followUpDate ? new Date(job.followUpDate).toLocaleDateString() : 'N/A'}</td>
                  <td className="py-4 px-6 flex space-x-4">
                    <a href="#" className="font-medium text-blue-600 hover:underline">Edit</a>
                    <a href="#" className="font-medium text-red-600 hover:underline">Delete</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center text-lg font-semibold p-8">
            <h2>No job offers found</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userIsLogged = !!context.req.cookies.auth;

  if (!userIsLogged) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
