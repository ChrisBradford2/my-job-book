// hooks/useJobOffers.ts
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { fetchJobOffers, createOrUpdateJobOffer, deleteJobOffer, updateJobOfferStatus } from '../requests/jobOffers';
import { JobOffer } from '@/types/JobOffer';

const useJobOffers = () => {
  const [jobOffers, setJobOffers] = useState<JobOffer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

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
        const data = await fetchJobOffers();
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

  const addOrUpdateJobOffer = async (formData: any, currentJobId: number | null) => {
    try {
      const updatedJobOffer = await createOrUpdateJobOffer(formData, currentJobId);

      toast.success(`${currentJobId ? 'Updated' : 'Created'} job offer successfully 🎉`);

      if (currentJobId) {
        setJobOffers(prevOffers => prevOffers.map(offer => offer.id === currentJobId ? updatedJobOffer : offer));
      } else {
        setJobOffers(prevOffers => [...prevOffers, updatedJobOffer]);
      }
    } catch (error) {
      toast.error(`Failed to ${currentJobId ? 'update' : 'create'} job offer, please try again`);
    }
  };

  const removeJobOffer = async (id: number) => {
    try {
      await deleteJobOffer(id);
      setJobOffers(prevOffers => prevOffers.filter(offer => offer.id !== id));
    } catch (error) {
      toast.error('Failed to delete job offer, please try again');
    }
  };

  const updateJobStatus = async (id: number, status: string, additionalData?: any) => {
    try {
      const updatedJobOffer = await updateJobOfferStatus(id, status, additionalData);
      setJobOffers(prevOffers => prevOffers.map(offer => offer.id === id ? updatedJobOffer : offer));
      toast.success('Updated job offer status successfully 🎉');
    } catch (error) {
      toast.error('Failed to update job offer status, please try again');
    }
  };

  return {
    jobOffers,
    isLoading,
    loadingProgress,
    addOrUpdateJobOffer,
    removeJobOffer,
    updateJobStatus,
  };
};

export default useJobOffers;
