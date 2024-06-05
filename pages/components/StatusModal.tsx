// components/StatusModal.tsx
import React, { useState, useEffect } from 'react';

type StatusModalProps = {
  currentStatus: string;
  followUpDate?: string;
  onUpdateStatus: (status: string, additionalData?: any) => void;
  onClose: () => void;
};

const StatusModal: React.FC<StatusModalProps> = ({ currentStatus, followUpDate, onUpdateStatus, onClose }) => {
  const [newStatus, setNewStatus] = useState(currentStatus);
  const [cvSent, setCvSent] = useState(false);
  const [coverLetterSent, setCoverLetterSent] = useState(false);
  const [interviewDate, setInterviewDate] = useState('');
  const [step, setStep] = useState(0);

  const isFollowUpEnabled = followUpDate ? new Date() >= new Date(followUpDate) : false;

  useEffect(() => {
    if (currentStatus === 'Application sent' || currentStatus === 'Interview scheduled' || currentStatus === 'Waiting feedback') {
      setStep(2);
    } else if (currentStatus !== 'Ready to send') {
      setStep(2);
    }
  }, [currentStatus]);

  const handleNextStep = () => {
    if (step === 0) {
      if (!cvSent || !coverLetterSent) {
        alert("You must send both CV and cover letter to proceed.");
        return;
      }
      setNewStatus('Application sent');
      setStep(1);
      handleUpdateStatus('Application sent', {
        applicationDate: new Date().toISOString(),
        followUpDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      });
    } else {
      setStep(step + 1);
    }
  };

  const handleUpdateStatus = (status: string, additionalData?: any) => {
    const additionalDataObj: any = {};
    if (status === 'Application sent') {
      additionalDataObj.applicationDate = new Date().toISOString();
      additionalDataObj.followUpDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
    } else if (status === 'Interview scheduled') {
      additionalDataObj.interviewDate = interviewDate;
    }

    onUpdateStatus(status, { ...additionalDataObj, ...additionalData });
  };

  const handleStatusChange = (status: string) => {
    setNewStatus(status);
    handleUpdateStatus(status);
    if (status !== 'Contacted by recruiter' && status !== 'Interview scheduled' && status !== 'Waiting feedback') {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Update Status</h2>
        {step === 0 && (
          <div className="mb-4">
            <h3 className="font-semibold">Before proceeding:</h3>
            <div>
              <label>
                <input type="checkbox" checked={cvSent} onChange={(e) => setCvSent(e.target.checked)} />
                I have sent my CV
              </label>
            </div>
            <div>
              <label>
                <input type="checkbox" checked={coverLetterSent} onChange={(e) => setCoverLetterSent(e.target.checked)} />
                I have sent my cover letter
              </label>
            </div>
            <button onClick={handleNextStep} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">
              Next
            </button>
          </div>
        )}
        {step === 1 && (
          <div className="mb-4">
            <p>Your application has been sent.</p>
            <button onClick={() => setStep(2)} className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700">
              Confirm
            </button>
          </div>
        )}
        {step === 2 && newStatus === 'Application sent' && (
          <div className="mb-4">
            <h3 className="font-semibold">Select the status:</h3>
            <div>
              <button
                onClick={() => handleStatusChange('Follow-up sent')}
                className={`mt-4 px-4 py-2 rounded-md ${
                  isFollowUpEnabled ? 'bg-yellow-500 text-white hover:bg-yellow-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!isFollowUpEnabled}
              >
                Follow-up sent
              </button>
            </div>
            <div>
              <button onClick={() => handleStatusChange('Contacted by recruiter')} className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700">
                Contacted by recruiter
              </button>
            </div>
            <div>
              <button onClick={() => handleStatusChange('Rejected')} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700">
                Rejected
              </button>
            </div>
          </div>
        )}
        {step === 2 && newStatus === 'Contacted by recruiter' && (
          <div className="mb-4">
            <label>
              Interview Date:
              <input type="date" value={interviewDate} onChange={(e) => setInterviewDate(e.target.value)} />
            </label>
            <button onClick={() => handleStatusChange('Interview scheduled')} className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700">
              Schedule Interview
            </button>
          </div>
        )}
        {step === 2 && newStatus === 'Interview scheduled' && (
          <div className="mb-4">
            <h3 className="font-semibold">Select the status:</h3>
            <div>
              <button onClick={() => handleStatusChange('Waiting feedback')} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">
                Waiting feedback
              </button>
            </div>
            <div>
              <button onClick={() => handleStatusChange('Rejected')} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700">
                Rejected
              </button>
            </div>
          </div>
        )}
        {step === 2 && newStatus === 'Waiting feedback' && (
          <div className="mb-4">
            <h3 className="font-semibold">Select the status:</h3>
            <div>
              <button onClick={() => handleStatusChange('Offer received')} className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700">
                Offer received
              </button>
            </div>
            <div>
              <button onClick={() => handleStatusChange('Contacted by recruiter')} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">
                Contacted by recruiter
              </button>
            </div>
            <div>
              <button onClick={() => handleStatusChange('Rejected')} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700">
                Rejected
              </button>
            </div>
          </div>
        )}
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default StatusModal;
