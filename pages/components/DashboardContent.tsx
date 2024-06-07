// components/DashboardContent.tsx
import { useState } from 'react';
import Cookies from 'js-cookie';
import Loading from './Loading';
import JobOfferTable from './JobOfferList';
import FilterSortControls from './FilterSortControls';
import useJobOffers, { JobOffer } from '../../hooks/useJobOffers';
import JobOfferModalContainer from './containers/JobOfferModalContainer';
import StatusModalContainer from './containers/StatusModalContainer';

const DashboardContent = () => {
  const { jobOffers, isLoading, loadingProgress, addOrUpdateJobOffer, removeJobOffer, updateJobStatus } = useJobOffers();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [statusModalIsOpen, setStatusModalIsOpen] = useState(false);
  const [formData, setFormData] = useState<JobOffer>({
    id: 0,
    title: '',
    company: '',
    link: '',
    recruiterEmail: '',
    status: '',
    applicationDate: '',
    followUpDate: '',
  });
  const [currentJobId, setCurrentJobId] = useState<number | null>(null);
  const [currentStatus, setCurrentStatus] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [sortField, setSortField] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const isDarkMode = Cookies.get('theme') === 'dark';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await addOrUpdateJobOffer(formData, currentJobId);
    closeModal();
  };

  const handleDelete = async (id: number) => {
    const confirm = window.confirm('Are you sure you want to delete this job offer?');
    if (!confirm) return;
    await removeJobOffer(id);
  };

  const handleEdit = (job: JobOffer) => {
    setCurrentJobId(job.id);
    setFormData(job);
    openModal();
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
      recruiterEmail: '',
      status: '',
      applicationDate: '',
      followUpDate: '',
    });
  }

  const filteredJobOffers = jobOffers
    .filter((job) => (filterStatus ? job.status === filterStatus : true))
    .sort((a, b) => {
      if (!sortField) return 0;
      const aField = a[sortField as keyof JobOffer];
      const bField = b[sortField as keyof JobOffer];
      if ((aField ?? '') < (bField ?? '')) return sortOrder === 'asc' ? -1 : 1;
      if ((aField ?? '') > (bField ?? '')) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

  if (isLoading) {
    return <Loading progress={loadingProgress} />;
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Job Application Dashboard</h1>
      <FilterSortControls
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        sortField={sortField}
        setSortField={setSortField}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
      <button onClick={openModal} className="mb-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-700">Add Job Offer</button>
      <JobOfferTable jobOffers={filteredJobOffers} handleEdit={handleEdit} handleDelete={handleDelete} openStatusModal={openStatusModal} />
      <JobOfferModalContainer
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isDarkMode={isDarkMode}
      />
      {statusModalIsOpen && (
        <StatusModalContainer
          currentStatus={currentStatus}
          currentJobId={currentJobId}
          updateJobStatus={updateJobStatus}
          closeStatusModal={closeStatusModal}
        />
      )}
    </main>
  );
};

export default DashboardContent;
