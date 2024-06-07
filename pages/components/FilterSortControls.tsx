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
        <label htmlFor="filterStatus" className="mr-2 text-sm">Filter by Status:</label>
        <select
          id="filterStatus"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="p-2 border rounded w-full sm:w-auto"
        >
          <option value="">All</option>
          <option value="Ready to send">Ready to send</option>
          <option value="Application sent">Application sent</option>
          <option value="Follow-up sent">Follow-up sent</option>
          <option value="Contacted by recruiter">Contacted by recruiter</option>
          <option value="Interview scheduled">Interview scheduled</option>
          <option value="Waiting feedback">Waiting feedback</option>
          <option value="Rejected">Rejected</option>
          <option value="Offer received">Offer received</option>
        </select>
      </div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
        <label htmlFor="sortField" className="mr-2 text-sm">Sort by:</label>
        <select
          id="sortField"
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
          className="p-2 border rounded w-full sm:w-auto"
        >
          <option value="">None</option>
          <option value="title">Title</option>
          <option value="company">Company</option>
          <option value="applicationDate">Application Date</option>
          <option value="followUpDate">Follow Up Date</option>
        </select>
        <select
          id="sortOrder"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
          className="p-2 border rounded w-full sm:w-auto"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSortControls;
