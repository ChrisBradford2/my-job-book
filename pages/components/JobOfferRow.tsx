// components/JobOfferRow.tsx
import React from "react";

type JobOffer = {
  id: number;
  title: string;
  company: string;
  link: string;
  status: string;
  applicationDate: string;
  followUpDate?: string;
};

type JobOfferRowProps = {
  job: JobOffer;
  handleDelete: (id: number) => void;
  handleEdit: (job: JobOffer) => void;
  openStatusModal: (jobId: number, currentStatus: string) => void;
};

const JobOfferRow: React.FC<JobOfferRowProps> = ({
  job,
  handleDelete,
  handleEdit,
  openStatusModal,
}) => {
  return (
    <tr key={job.id} className="bg-white border-b">
    <td className="py-4 px-6">{job.title}</td>
    <td className="py-4 px-6">{job.company}</td>
    <td className="py-4 px-6">
      <a href={job.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View Posting</a>
    </td>
    <td className="py-4 px-6">
      <span
        className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium cursor-pointer ${
          job.status === 'Ready to send'
            ? 'bg-gray-100 text-gray-800'
            : job.status === 'Application sent'
            ? 'bg-blue-100 text-blue-800'
            : job.status === 'Follow-up sent'
            ? 'bg-yellow-100 text-yellow-800'
            : job.status === 'Contacted by recruiter'
            ? 'bg-green-100 text-green-800'
            : job.status === 'Interview scheduled'
            ? 'bg-purple-100 text-purple-800'
            : 'bg-red-100 text-red-800'
        }`}
        onClick={() => openStatusModal(job.id, job.status)}
      >
        {job.status}
      </span>
    </td>
    <td className="py-4 px-6">{new Date(job.applicationDate).toLocaleDateString()}</td>
    <td className="py-4 px-6">{job.followUpDate ? new Date(job.followUpDate).toLocaleDateString() : 'N/A'}</td>
    <td className="py-4 px-6 flex space-x-4">
      <button onClick={() => handleEdit(job)} className="font-medium text-blue-600 hover:underline">Edit</button>
      <button onClick={() => handleDelete(job.id)} className="font-medium text-red-600 hover:underline">Delete</button>
    </td>
  </tr>
  );
};

export default JobOfferRow;
