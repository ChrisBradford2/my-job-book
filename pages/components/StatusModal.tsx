// components/StatusModal.tsx
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { FaCalendarAlt } from 'react-icons/fa';

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
  const [applicationDate, setApplicationDate] = useState(new Date().toISOString().split('T')[0]);
  const [isToday, setIsToday] = useState(true);
  const [step, setStep] = useState(0);

  const isFollowUpEnabled = followUpDate ? new Date() >= new Date(followUpDate) : false;
  const { t } = useTranslation('common');

  useEffect(() => {
    if (['Application sent', 'Interview scheduled', 'Waiting feedback', 'Follow-up sent'].includes(currentStatus)) {
      setStep(2);
    } else if (currentStatus !== 'Ready to send') {
      setStep(2);
    }
  }, [currentStatus]);

  const handleNextStep = () => {
    if (step === 0) {
      if (!cvSent || !coverLetterSent) {
        alert(t('cv_cover_letter_required'));
        return;
      }
      setNewStatus('Application sent');
      setStep(1);
      handleUpdateStatus('Application sent', {
        applicationDate: isToday ? new Date().toISOString() : new Date(applicationDate).toISOString(),
        followUpDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      });
    } else {
      setStep(step + 1);
    }
  };

  const handleUpdateStatus = (status: string, additionalData?: any) => {
    const additionalDataObj: any = {};
    if (status === 'Application sent') {
      additionalDataObj.applicationDate = isToday ? new Date().toISOString() : new Date(applicationDate).toISOString();
      additionalDataObj.followUpDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
    } else if (status === 'Contacted by recruiter') {
      additionalDataObj.interviewDate = new Date().toISOString();
      additionalDataObj.followUpDate = '';
    } else if (status === 'Interview scheduled') {
      additionalDataObj.interviewDate = interviewDate;
    } else if (status === 'Waiting feedback') {
      additionalDataObj.followUpDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
    }

    onUpdateStatus(status, { ...additionalDataObj, ...additionalData });
  };

  const handleStatusChange = (status: string) => {
    setNewStatus(status);
    handleUpdateStatus(status);
    if (!['Contacted by recruiter', 'Interview scheduled', 'Waiting feedback'].includes(status)) {
      onClose();
    }
  };

  const sendFollowUp = () => {
    handleUpdateStatus('Follow-up sent', { followUpDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() });
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-11/12 md:w-1/2 max-w-lg mx-auto">
        <h2 className="text-xl font-semibold mb-4">{t('update_status')}</h2>
        {step === 0 && (
          <div className="mb-4">
            <h3 className="font-semibold">{t('before_proceeding')}</h3>
            <div className="mt-4">
              <label className="flex items-center space-x-3">
                <input type="checkbox" checked={cvSent} onChange={(e) => setCvSent(e.target.checked)} className="form-checkbox h-5 w-5 text-blue-600" />
                <span>{t('cv_sent')}</span>
              </label>
            </div>
            <div className="mt-4">
              <label className="flex items-center space-x-3">
                <input type="checkbox" checked={coverLetterSent} onChange={(e) => setCoverLetterSent(e.target.checked)} className="form-checkbox h-5 w-5 text-blue-600" />
                <span>{t('cover_letter_sent')}</span>
              </label>
            </div>
            <div className="mt-6">
              <h4 className="font-semibold">{t('before_proceeding')}</h4>
              <label className="flex items-center cursor-pointer">
                <FaCalendarAlt className="text-gray-600 mr-2" />
                <input type="checkbox" className="sr-only" checked={isToday} onChange={() => setIsToday(!isToday)} />
                <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                  <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                  <div
                    className={`dot absolute left-1 top-1 w-6 h-6 rounded-full transition-transform ${
                      isToday ? 'transform translate-x-full bg-gray-300' : 'bg-yellow-500'
                    }`}
                  ></div>
                </div>
                <span className="text-gray-600 ml-3">{isToday ? t('today') : t('select_date')}</span>
              </label>
              {!isToday && (
                <div className="mt-2">
                  <label>{t('select_date')}:</label>
                  <input type="date" value={applicationDate} onChange={(e) => setApplicationDate(e.target.value)} className="border border-gray-300 rounded-md p-2 mt-1 w-full" />
                </div>
              )}
            </div>
            <button onClick={handleNextStep} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              {t('next')}
            </button>
          </div>
        )}
        {step === 1 && (
          <div className="mb-4">
            <p>{t('application_sent_message')}</p>
            <button onClick={() => setStep(2)} className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
              {t('continue')}
            </button>
          </div>
        )}
        {step === 2 && newStatus === 'Application sent' && (
          <div className="mb-4">
            <h3 className="font-semibold">{t('select_status')}:</h3>
            <div>
              <button
                onClick={() => sendFollowUp()}
                className={`mt-4 px-4 py-2 rounded-md ${
                  isFollowUpEnabled ? 'bg-yellow-500 text-white hover:bg-yellow-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!isFollowUpEnabled}
              >
                {t('send_follow_up')}
              </button>
            </div>
            <div>
              <button onClick={() => handleStatusChange('Contacted by recruiter')} className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
                {t('contacted_by_recruiter')}
              </button>
            </div>
            <div>
              <button onClick={() => handleStatusChange('Rejected')} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500">
                {t('rejected')}
              </button>
            </div>
          </div>
        )}
        {step === 2 && newStatus === 'Contacted by recruiter' && (
          <div className="mb-4">
            <label className="block mb-2">
              {t('interview_date')}:
              <input type="date" value={interviewDate} onChange={(e) => setInterviewDate(e.target.value)} className="border border-gray-300 rounded-md p-2 mt-1 w-full" />
            </label>
            <button onClick={() => handleStatusChange('Interview scheduled')} className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
              {t('schedule_interview')}
            </button>
          </div>
        )}
        {step === 2 && newStatus === 'Interview scheduled' && (
          <div className="mb-4">
            <h3 className="font-semibold">{t('select_status')}:</h3>
            <div>
              <button onClick={() => handleStatusChange('Waiting feedback')} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                {t('waiting_feedback')}
              </button>
            </div>
            <div>
              <button onClick={() => handleStatusChange('Rejected')} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500">
                {t('rejected')}
              </button>
            </div>
          </div>
        )}
        {step === 2 && newStatus === 'Waiting feedback' && (
          <div className="mb-4">
            <h3 className="font-semibold">Select the status:</h3>
            <div>
              <button onClick={() => handleStatusChange('Offer received')} className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
                {t('offer_received')}
              </button>
            </div>
            <div>
              <button onClick={() => handleStatusChange('Contacted by recruiter')} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                {t('contacted_by_recruiter')}
              </button>
            </div>
            <div>
              <button onClick={() => handleStatusChange('Rejected')} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500">
                {t('rejected')}
              </button>
            </div>
          </div>
        )}
        {step === 2 && newStatus === 'Follow-up sent' && (
          <div className="mb-4">
            <h3 className="font-semibold">{t('select_status')}:</h3>
            <div>
              <button onClick={() => handleStatusChange('Contacted by recruiter')} className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
                {t('contacted_by_recruiter')}
              </button>
            </div>
            <div>
              <button onClick={() => handleStatusChange('Rejected')} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500">
                {t('rejected')}
              </button>
            </div>
          </div>
        )}
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500">
          {t('cancel')}
        </button>
      </div>
    </div>
  );
}

export default StatusModal;
