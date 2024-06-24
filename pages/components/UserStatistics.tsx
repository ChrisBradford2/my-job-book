import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

interface UserStatisticsProps {
  jobOffers: {
    status: string;
  }[];
}

const UserStatistics: React.FC<UserStatisticsProps> = ({ jobOffers }) => {
  console.log("UserStatistics - jobOffers:", jobOffers); // Log des jobOffers

  // Assurez-vous que jobOffers est défini et est un tableau
  const statusCounts = (jobOffers || []).reduce((acc: Record<string, number>, job) => {
    console.log("Processing job:", job); // Log de chaque job
    acc[job.status] = (acc[job.status] || 0) + 1;
    return acc;
  }, {});

  console.log("UserStatistics - statusCounts:", statusCounts); // Log des statusCounts

  const data = {
    labels: [
      'Ready to send',
      'Application sent',
      'Follow-up sent',
      'Contacted by recruiter',
      'Interview scheduled',
      'Waiting feedback',
      'Rejected',
      'Offer received'
    ],
    datasets: [
      {
        label: '# of Applications',
        data: [
          statusCounts['Ready to send'] || 0,
          statusCounts['Application sent'] || 0,
          statusCounts['Follow-up sent'] || 0,
          statusCounts['Contacted by recruiter'] || 0,
          statusCounts['Interview scheduled'] || 0,
          statusCounts['Waiting feedback'] || 0,
          statusCounts['Rejected'] || 0,
          statusCounts['Offer received'] || 0
        ],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#FF9F40',
          '#4BC0C0',
          '#9966FF',
          '#FF6384',
          '#FFCD56'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#FF9F40',
          '#4BC0C0',
          '#9966FF',
          '#FF6384',
          '#FFCD56'
        ],
      },
    ],
  };

  console.log("UserStatistics - data:", data); // Log des data pour le graphique

  return (
    <div className="bg-white shadow-md rounded-lg p-6 md:col-span-2 mt-4">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Application Statistics</h2>
      <Pie data={data} />
    </div>
  );
};

export default UserStatistics;
