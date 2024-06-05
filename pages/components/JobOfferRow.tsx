// components/JobOfferRow.tsx
import React from 'react';

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
};

const JobOfferRow: React.FC<JobOfferRowProps> = ({ job, handleDelete, handleEdit }) => {

  return (
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
        <button onClick={() => handleEdit(job)} className="font-medium text-blue-600 hover:underline">Edit</button>
        <button onClick={() => handleDelete(job.id)} className="font-medium text-red-600 hover:underline">Delete</button>
      </td>
    </tr>
  );
};

export default JobOfferRow;
