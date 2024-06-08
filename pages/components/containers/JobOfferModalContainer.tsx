import Modal from 'react-modal';
import JobOfferForm from '../JobOfferForm';
import { useTranslation } from 'next-i18next';
import { JobOffer } from '@/types/JobOffer';

type JobOfferModalContainerProps = {
  modalIsOpen: boolean;
  closeModal: () => void;
  formData: JobOffer;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent) => Promise<void>;
  isDarkMode: boolean;
};

const JobOfferModalContainer = ({ modalIsOpen, closeModal, formData, handleInputChange, handleSubmit, isDarkMode }: JobOfferModalContainerProps) => {
  const { t } = useTranslation('common');

  if (!formData) return null;

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
      backgroundColor: isDarkMode ? '#333' : '#fff',
      color: isDarkMode ? '#fff' : '#000',
      padding: '20px'
    },
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Add Job Offer Modal"
    >
      <h2 className="text-xl font-semibold mb-4">{formData.id ? t('edit_job_offer') : t('add_job_offer')}</h2>
      <JobOfferForm formData={formData} handleInputChange={handleInputChange} handleSubmit={handleSubmit} closeModal={closeModal} />
    </Modal>
  );
};

export default JobOfferModalContainer;
