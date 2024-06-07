import React from 'react';

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

  return (
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
        name="recruiterEmail"
        value={formData.recruiterEmail}
        onChange={handleInputChange}
        placeholder="Recruiter Email"
        className={`mb-2 w-full p-2 border border-gray-300 rounded`}
      />
      <div className="flex justify-between">
        <button type="submit" className="px-4 py-2 bg-green-500 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none">
          {formData.id ? 'Update Job Offer' : 'Add Job Offer'}
        </button>
        <button type="button" onClick={closeModal} className="px-4 py-2 bg-red-500 text-white font-medium rounded-md hover:bg-red-700 focus:outline-none">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default JobOfferForm;
