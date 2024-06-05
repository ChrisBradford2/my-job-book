// pages/dashboard.tsx
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Cookies from 'js-cookie';
import Loading from '../components/Loading';
import JobOfferForm from '../components/JobOfferForm';
import JobOfferTable from '../components/JobOfferTable';

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
      setJobOffers(prevOffers => [...prevOffers, newJobOffer]);
      closeModal();
    } catch (error) {
      console.error('Error creating job offer:', error);
    }
  };
  
  const handleDelete = async (id: number) => {
    const confirm = window.confirm('Are you sure you want to delete this job offer?');
    if (!confirm) return;
    try {
      const response = await fetch(`/api/jobOffers/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (!response.ok) throw new Error('Failed to delete job offer');

      setJobOffers(prevOffers => prevOffers.filter(offer => offer.id !== id));
    } catch (error) {
      console.error('Error deleting job offer:', error);
    }
  }

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
    return <Loading progress={loadingProgress} />;
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
        <JobOfferForm formData={formData} handleInputChange={handleInputChange} handleSubmit={handleSubmit} closeModal={closeModal} />
      </Modal>
      <JobOfferTable jobOffers={jobOffers} handleDelete={handleDelete} />
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
