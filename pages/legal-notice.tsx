// pages/legal-notice.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const LegalNotice: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{t('legal_notice_title')}</h1>

      <section className="mb-4">
        <h2 className="text-xl font-semibold">{t('site_publisher_title')}</h2>
        <p>
          <strong>{t('company_name')}</strong><br />
          <strong>{t('company_address')}</strong><br />
          <strong>{t('company_phone')}</strong><br />
          <strong>{t('company_email')}</strong><br />
          <strong>{t('company_siret')}</strong><br />
          <strong>{t('publication_director')}</strong>
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-xl font-semibold">{t('site_host_title')}</h2>
        <p>
          <strong>{t('host_name')}</strong><br />
          <strong>{t('host_address')}</strong><br />
          <strong>{t('host_phone')}</strong><br />
          <strong>{t('host_email')}</strong><br />
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-xl font-semibold">{t('intellectual_property_title')}</h2>
        <p>{t('intellectual_property_text')}</p>
      </section>

      <section className="mb-4">
        <h2 className="text-xl font-semibold">{t('responsibility_title')}</h2>
        <p>{t('responsibility_text_1')}</p>
        <p>{t('responsibility_text_2')}</p>
      </section>

      <section className="mb-4">
        <h2 className="text-xl font-semibold">{t('personal_data_title')}</h2>
        <p>{t('personal_data_text')}</p>
      </section>

      <section className="mb-4">
        <h2 className="text-xl font-semibold">{t('litigation_title')}</h2>
        <p>{t('litigation_text')}</p>
      </section>
    </div>
  );
};

export default LegalNotice;
