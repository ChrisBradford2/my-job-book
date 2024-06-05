// components/JobOfferTable.tsx
import React from 'react';
import JobOfferRow from './JobOfferRow';

type JobOffer = {
  id: number;
  title: string;
  company: string;
  link: string;
  status: string;
  applicationDate: string;
  followUpDate?: string;
};

type JobOfferTableProps = {
  jobOffers: JobOffer[];
  handleDelete: (id: number) => void;
};

const JobOfferTable: React.FC<JobOfferTableProps> = ({ jobOffers, handleDelete }) => {
  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      {jobOffers.length > 0 ? (
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="py-3 px-6">Job Title</th>
              <th scope="col" className="py-3 px-6">Company</th>
              <th scope="col" className="py-3 px-6">Link</th>
              <th scope="col" className="py-3 px-6">Status</th>
              <th scope="col" className="py-3 px-6">Applied Date</th>
              <th scope="col" className="py-3 px-6">Follow Up Date</th>
              <th scope="col" className="py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobOffers.map((job) => (
              <JobOfferRow key={job.id} job={job} handleDelete={handleDelete} />
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center text-lg font-semibold p-8">
          <h2>No job offers found</h2>
        </div>
      )}
    </div>
  );
};

export default JobOfferTable;
