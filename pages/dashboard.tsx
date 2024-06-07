// pages/dashboard.tsx
import { GetServerSideProps } from 'next';
import DashboardContent from './components/DashboardContent';

const Dashboard = () => {
  return <DashboardContent />;
};

export default Dashboard;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userIsLogged = !!context.req.cookies.auth;

  if (!userIsLogged) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
