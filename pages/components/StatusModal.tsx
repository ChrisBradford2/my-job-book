// components/StatusModal.tsx
import React, { useState } from 'react';

type StatusModalProps = {
  currentStatus: string;
  onUpdateStatus: (status: string, additionalData?: any) => void;
  onClose: () => void;
};

const StatusModal: React.FC<StatusModalProps> = ({ currentStatus, onUpdateStatus, onClose }) => {
  const [newStatus, setNewStatus] = useState(currentStatus);
  const [cvSent, setCvSent] = useState(false);
  const [coverLetterSent, setCoverLetterSent] = useState(false);
  const [interviewDate, setInterviewDate] = useState('');

  const handleUpdateStatus = () => {
    if (newStatus === 'Ready to send' && (!cvSent || !coverLetterSent)) {
      alert("You must send both CV and cover letter to proceed.");
      return;
    }

    const additionalData: any = {};
    if (newStatus === 'Application sent') {
      additionalData.applicationDate = new Date().toISOString();
      additionalData.followUpDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
    } else if (newStatus === 'Interview scheduled') {
      additionalData.interviewDate = interviewDate;
    }

    onUpdateStatus(newStatus, additionalData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Update Status</h2>
        {currentStatus === 'Ready to send' && (
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
          </div>
        )}
        {newStatus === 'Interview scheduled' && (
          <div className="mb-4">
            <label>
              Interview Date:
              <input type="date" value={interviewDate} onChange={(e) => setInterviewDate(e.target.value)} />
            </label>
          </div>
        )}
        <div className="mb-4">
          <label>
            <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
              <option value="Ready to send">Ready to send</option>
              <option value="Application sent">Application sent</option>
              <option value="Follow-up sent">Follow-up sent</option>
              <option value="Contacted by recruiter">Contacted by recruiter</option>
              <option value="Interview scheduled">Interview scheduled</option>
              <option value="Rejected">Rejected</option>
            </select>
          </label>
        </div>
        <div className="flex justify-between">
          <button onClick={handleUpdateStatus} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700">
            Update
          </button>
          <button onClick={onClose} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatusModal;
