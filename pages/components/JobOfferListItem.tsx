// components/JobOfferRow.tsx
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { FaEdit, FaEllipsisV, FaTrash } from 'react-icons/fa';

type JobOffer = {
  id: number;
  title: string;
  company: string;
  link: string;
  status: string;
  applicationDate: string;
  followUpDate?: string;
};

type JobOfferListItemProps = {
  job: JobOffer | null;
  handleDelete: (id: number) => void;
  handleEdit: (job: JobOffer) => void;
  openStatusModal: (jobId: number, currentStatus: string) => void;
};

const JobOfferListItem: React.FC<JobOfferListItemProps> = ({ job, handleDelete, handleEdit, openStatusModal }) => {
  if (!job) return null; // Retournez null si job est null
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const followUp = job.followUpDate ? new Date(job.followUpDate).toLocaleDateString() : 'N/A';
  const needFollowUp = followUp !== 'N/A' && new Date(followUp) < new Date();

  const toggleDialog = () => setIsDialogOpen(!isDialogOpen);



  return (
    <li className="job-list-item border p-4 rounded-lg shadow-sm bg-white">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold relative flex items-center">
          {job.title}
          {needFollowUp && (
            <span className="absolute top-0 right-0 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
            </span>
          )}
          <span
            className={`ml-2 inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${
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
                : job.status === 'Waiting feedback'
                ? 'bg-blue-100 text-blue-800'
                : job.status === 'Rejected'
                ? 'bg-red-100 text-red-800'
                : job.status === 'Offer received'
                ? 'bg-green-100 text-green-800'
                : ''
            }`}
          >
            {job.status}
          </span>
        </h3>
        <div className="flex space-x-2">
          {/* Mobile: Three dots */}
          <button onClick={toggleDialog} className="text-gray-600 hover:text-gray-900 block sm:hidden">
            <FaEllipsisV />
          </button>
          {/* Desktop: Edit and Delete icons */}
          <button onClick={() => handleEdit(job)} className="text-blue-600 hover:text-blue-900 hidden sm:block">
            <FaEdit />
          </button>
          <button onClick={() => handleDelete(job.id)} className="text-red-600 hover:text-red-900 hidden sm:block">
            <FaTrash />
          </button>
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col md:relative md:block space-y-2 md:flex-row md:space-x-4 md:space-y-0">
        <div className='relative'>
          <div className="mb-2">
            <span className="font-semibold">Company: </span>
            <span>{job.company}</span>
          </div>
          <div className="mb-2">
            <span className="font-semibold">Link: </span>
            <a href={job.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View Posting</a>
          </div>
          <div className="mb-2">
            <span className="font-semibold">Applied Date: </span>
            <span>{job.applicationDate ? new Date(job.applicationDate).toLocaleDateString() : 'N/A'}</span>
          </div>
          <div className="mb-2">
            <span className="font-semibold">Follow Up Date: </span>
            <span>{job.followUpDate ? new Date(job.followUpDate).toLocaleDateString() : 'N/A'}</span>
          </div>
        </div>
        <button
          onClick={() => openStatusModal(job.id, job.status)}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:px-4 sm:py-2 md:absolute md:top-1/2 md:-translate-y-1/2 md:right-0"
        >
          Update Status
        </button>
      </div>

      <Transition appear show={isDialogOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={toggleDialog}>
          <div className="flex items-end justify-center min-h-screen text-center sm:block sm:p-0">
            <Transition.Child
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={toggleDialog}>
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
            </Transition.Child>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>

            <Transition.Child
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-full"
              enterTo="opacity-100 translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-full"
            >
              <div className="inline-block align-bottom bg-white rounded-t-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Manage Job Offer</h3>
                      <div className="mt-2">
                        <ul className="divide-y divide-gray-200">
                          <li className="py-4 flex">
                            <button
                              onClick={() => {
                                handleEdit(job);
                                toggleDialog();
                              }}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              Edit
                            </button>
                          </li>
                          <li className="py-4 flex">
                            <button
                              onClick={() => {
                                handleDelete(job.id);
                                toggleDialog();
                              }}
                              className="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={toggleDialog}
                  >
                    Close
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </li>
  );
};

export default JobOfferListItem;
