export const fetchJobOffers = async () => {
  const response = await fetch('/api/jobOffers', {
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Failed to load job offers');
  return await response.json();
};

export const createOrUpdateJobOffer = async (formData: any, currentJobId: number | null) => {
  const method = currentJobId ? 'PUT' : 'POST';
  const url = currentJobId ? `/api/jobOffers/${currentJobId}` : '/api/jobOffers';

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(formData),
  });

  if (!response.ok) throw new Error(`Failed to ${currentJobId ? 'update' : 'create'} job offer`);

  return await response.json();
};

export const deleteJobOffer = async (id: number) => {
  const response = await fetch(`/api/jobOffers/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!response.ok) throw new Error('Failed to delete job offer');
};

export const updateJobOfferStatus = async (id: number, status: string, additionalData?: any) => {
  const response = await fetch(`/api/jobOffers/status/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ status, ...additionalData }),
  });

  if (!response.ok) throw new Error('Failed to update job offer status');

  return await response.json();
};
