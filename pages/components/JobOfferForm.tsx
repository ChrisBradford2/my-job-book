import React from 'react';
import { useTranslation } from 'react-i18next';

type JobOfferFormProps = {
  formData: {
    id?: number;
    title: string;
    company: string;
    link: string;
    recruiterEmail?: string;
    status: string;
    applicationDate?: string;
    followUpDate?: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  closeModal: () => void;
};

const JobOfferForm: React.FC<JobOfferFormProps> = ({ formData = { title: '', company: '', link: '', recruiterEmail:'', status: '', applicationDate: '', followUpDate: '' }, handleInputChange, handleSubmit, closeModal }) => {
  const { t } = useTranslation('common');

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        placeholder={t('job_title')}
        className="mb-2 w-full p-2 border border-gray-300 rounded"
      />
      <input
        name="company"
        value={formData.company}
        onChange={handleInputChange}
        placeholder={t('company')}
        className="mb-2 w-full p-2 border border-gray-300 rounded"
      />
      <input
        name="link"
        value={formData.link}
        onChange={handleInputChange}
        placeholder={t('job_link')}
        className="mb-2 w-full p-2 border border-gray-300 rounded"
      />
      <input
        name="recruiterEmail"
        value={formData.recruiterEmail}
        onChange={handleInputChange}
        placeholder={t('recruiter_email')}
        className={`mb-2 w-full p-2 border border-gray-300 rounded`}
      />
      <div className="flex justify-between">
        <button type="submit" className="px-4 py-2 bg-green-500 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none">
          {formData.id ? t('update_job_offer') : t('add_job_offer')}
        </button>
        <button type="button" onClick={closeModal} className="px-4 py-2 bg-red-500 text-white font-medium rounded-md hover:bg-red-700 focus:outline-none">
          {t('cancel')}
        </button>
      </div>
    </form>
  );
};

export default JobOfferForm;
