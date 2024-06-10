import { GetServerSideProps } from 'next';
import Head from "next/head";
import Link from "next/link";
import { useTranslation } from 'next-i18next';
import { getI18nProps } from '@/lib/i18n';

export default function Home() {
  const { t } = useTranslation('common');
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Head>
        <title>My Job Book</title>
        <meta name="description" content="Your ultimate tool for managing job applications efficiently." />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#ffc40d" />
        <meta name="theme-color" content="#ffffff"></meta>
      </Head>
      
      {/* Hero Section */}
      <section className="bg-blue-600 dark:bg-blue-700 text-white">
        <div className="container mx-auto py-20 text-center px-4">
          <h1 className="text-4xl font-bold mb-4">{t('welcome')}</h1>
          <p className="text-lg mb-8">{t('your_tool')}</p>
          <Link href="/dashboard" className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-200">
            {t('get_started')}
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{t('features')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold mb-4">{t('track_applications')}</h3>
            <p>{t('track_applications_description')}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold mb-4">{t('automated_reminders')}</h3>
            <p>{t('automated_reminders_description')}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold mb-4">{t('detailed_insights')}</h3>
            <p>{t('detailed_insights_description')}</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gray-200 dark:bg-gray-800 py-16">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">{t('ready_to_get_started')}</h2>
          <p className="text-lg mb-8">{t('join_thousands')}</p>
          <Link href="/register" className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700">
            {t('sign_up_now')}
          </Link>
        </div>
      </section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await getI18nProps(locale || 'fr')),
    },
  };
};
