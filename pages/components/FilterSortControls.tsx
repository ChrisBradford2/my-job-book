import { t } from 'i18next';
import React from 'react';

interface FilterSortControlsProps {
  filterStatus: string;
  setFilterStatus: (status: string) => void;
  sortField: string;
  setSortField: (field: string) => void;
  sortOrder: 'asc' | 'desc';
  setSortOrder: (order: 'asc' | 'desc') => void;
}

const FilterSortControls: React.FC<FilterSortControlsProps> = ({ filterStatus, setFilterStatus, sortField, setSortField, sortOrder, setSortOrder }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between mb-4 space-y-2 sm:space-y-0 sm:space-x-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
        <label htmlFor="filterStatus" className="mr-2 text-sm">{t('filter_by_status')}:</label>
        <select
          id="filterStatus"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="p-2 border rounded w-full sm:w-auto"
        >
          <option value="">All</option>
          <option value="Ready to send">{t('ready_to_send')}</option>
          <option value="Application sent">{t('application_sent')}</option>
          <option value="Follow-up sent">{t('follow_up_sent')}</option>
          <option value="Contacted by recruiter">{t('contacted_by_recruiter')}</option>
          <option value="Interview scheduled">{t('interview_scheduled')}</option>
          <option value="Waiting feedback">{t('waiting_feedback')}</option>
          <option value="Rejected">{t('rejected')}</option>
          <option value="Offer received">{t('offer_received')}</option>
        </select>
      </div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
        <label htmlFor="sortField" className="mr-2 text-sm">{t('sort_by')}:</label>
        <select
          id="sortField"
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
          className="p-2 border rounded w-full sm:w-auto"
        >
          <option value="">{t('none')}</option>
          <option value="title">{t('title')}</option>
          <option value="company">{t('company')}</option>
          <option value="applicationDate">{t('application_date')}</option>
          <option value="followUpDate">{t('follow_up_date')}</option>
        </select>
        <select
          id="sortOrder"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
          className="p-2 border rounded w-full sm:w-auto"
        >
          <option value="asc">{t('ascending')}</option>
          <option value="desc">{t('descending')}</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSortControls;
