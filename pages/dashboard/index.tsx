// pages/dashboard.tsx
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Cookies from 'js-cookie';
import Loading from '../components/Loading';
import JobOfferForm from '../components/JobOfferForm';
import JobOfferTable from '../components/JobOfferTable';
import StatusModal from '../components/StatusModal';
import { toast } from 'react-toastify';

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
  const [statusModalIsOpen, setStatusModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: 0,
    title: '',
    company: '',
    link: '',
    status: '',
    applicationDate: '',
    followUpDate: '',
  });
  const [currentJobId, setCurrentJobId] = useState<number | null>(null);
  const [currentStatus, setCurrentStatus] = useState<string>('');
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
      const method = currentJobId ? 'PUT' : 'POST';
      const url = currentJobId ? `/api/jobOffers/${currentJobId}` : '/api/jobOffers';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error(`Failed to ${currentJobId ? 'update' : 'create'} job offer`);

      const updatedJobOffer = await response.json();
      toast.success(`${currentJobId ? 'Updated' : 'Created'} job offer successfully 🎉`)

      if (currentJobId) {
        setJobOffers(prevOffers => prevOffers.map(offer => offer.id === currentJobId ? updatedJobOffer : offer));
      } else {
        setJobOffers(prevOffers => [...prevOffers, updatedJobOffer]);
      }

      closeModal();
    } catch (error) {
      toast.error(`Failed to ${currentJobId ? 'update' : 'create'} job offer, please try again`);
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
      toast.error('Failed to delete job offer, please try again');
    }
  };

  const handleEdit = (job: JobOffer) => {
    setCurrentJobId(job.id);
    setFormData({
      id: job.id,
      title: job.title,
      company: job.company,
      link: job.link,
      status: job.status,
      applicationDate: job.applicationDate || '',
      followUpDate: job.followUpDate || '',
    });
    openModal();
  };

  const handleUpdateStatus = async (status: string, additionalData?: any) => {
    if (!currentJobId) return;

    try {
      const response = await fetch(`/api/jobOffers/status/${currentJobId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ status, ...additionalData })
      });

      if (!response.ok) throw new Error('Failed to update job offer status');

      const updatedJobOffer = await response.json();
      setJobOffers(prevOffers => prevOffers.map(offer => offer.id === currentJobId ? updatedJobOffer : offer));
      toast.success('Updated job offer status successfully 🎉');
      closeStatusModal();
    } catch (error) {
      toast.error('Failed to update job offer status, please try again');
    }
  };

  const openStatusModal = (jobId: number, currentStatus: string) => {
    setCurrentJobId(jobId);
    setCurrentStatus(currentStatus);
    setStatusModalIsOpen(true);
  };

  const closeStatusModal = () => {
    setStatusModalIsOpen(false);
    setCurrentJobId(null);
    setCurrentStatus('');
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setCurrentJobId(null);
    setFormData({
      id: 0,
      title: '',
      company: '',
      link: '',
      status: '',
      applicationDate: '',
      followUpDate: '',
    });
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
        setJobOffers(data);
        clearInterval(interval);
        setLoadingProgress(100);
        setIsLoading(false);
      } catch (error: any) {
        toast.error('Failed to load job offers: ' + error.message);
        clearInterval(interval);
        setLoadingProgress(100);
        setIsLoading(false);
      }
    };

    loadJobOffers();
  }, []);

  if (isLoading) {
    return <Loading progress={loadingProgress} />;
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Job Application Dashboard</h1>
      <button onClick={openModal} className="mb-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-700">Add Job Offer</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Job Offer Modal"
      >
        <h2 className="text-xl font-semibold mb-4">{currentJobId ? 'Edit Job Offer' : 'Add New Job Offer'}</h2>
        <JobOfferForm formData={formData} handleInputChange={handleInputChange} handleSubmit={handleSubmit} closeModal={closeModal} />
      </Modal>
      {statusModalIsOpen && (
        <StatusModal
          currentStatus={currentStatus}
          onUpdateStatus={handleUpdateStatus}
          onClose={closeStatusModal}
        />
      )}
      <JobOfferTable jobOffers={jobOffers} handleDelete={handleDelete} handleEdit={handleEdit} openStatusModal={openStatusModal} />
    </main>
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
