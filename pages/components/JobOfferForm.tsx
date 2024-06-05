type JobOfferFormProps = {
  formData: {
    id: number;
    title: string;
    company: string;
    link: string;
    status: string;
    applicationDate: string;
    followUpDate?: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  closeModal: () => void;
};

const JobOfferForm: React.FC<JobOfferFormProps> = ({ formData, handleInputChange, handleSubmit, closeModal }) => {
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
