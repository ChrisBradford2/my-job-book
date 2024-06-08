import Head from 'next/head';
import { GetServerSideProps } from 'next';
import DashboardContent from './components/DashboardContent';
import { getI18nProps } from '@/lib/i18n';
import { useTranslation } from 'next-i18next';

const Dashboard = () => {
  const { t } = useTranslation('common');
  return (
    <>
      <Head>
        <title>{t('dashboard')}</title>
      </Head>
      <DashboardContent />
    </>
  );
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
