// pages/dashboard.tsx
import { GetServerSideProps } from 'next';
import DashboardContent from './components/DashboardContent';
import { getI18nProps } from '@/lib/i18n';

const Dashboard = () => {
  return <DashboardContent />;
};

export default Dashboard;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, locale } = context;
  const userIsLogged = !!req.cookies.auth;

  if (!userIsLogged) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      ...(await getI18nProps(locale || 'fr')),
    },
  };
};
