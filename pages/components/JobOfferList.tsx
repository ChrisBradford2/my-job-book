// components/JobOfferTable.tsx
import React from 'react';
import JobOfferListItem from './JobOfferListItem';

type JobOffer = {
  id: number;
  title: string;
  company: string;
  link: string;
  status: string;
  applicationDate: string;
  followUpDate?: string;
};

type JobOfferListProps = {
  jobOffers: JobOffer[];
  handleEdit: (job: JobOffer) => void;
  handleDelete: (id: number) => void;
  openStatusModal: (jobId: number, currentStatus: string) => void;
};

const JobOfferList: React.FC<JobOfferListProps> = ({ jobOffers = [], handleEdit, handleDelete, openStatusModal }) => {
  if (jobOffers.length === 0) {
    return (
      <div className="text-center text-lg font-semibold p-8">
        <h2>No job offers found</h2>
      </div>
    );
  }

  return (
    <ul className="job-list space-y-4">
      {jobOffers.map((job) => (
        <JobOfferListItem
          key={job.id}
          job={job}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          openStatusModal={openStatusModal}
        />
      ))}
    </ul>
  );
};

export default JobOfferList;
