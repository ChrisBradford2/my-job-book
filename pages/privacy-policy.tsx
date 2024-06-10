// pages/privacy-policy.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const PrivacyPolicy: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{t('privacy_policy_title')}</h1>

      <section className="mb-4">
        <h2 className="text-xl font-semibold">{t('introduction_title')}</h2>
        <p>{t('introduction_text')}</p>
      </section>

      <section className="mb-4">
        <h2 className="text-xl font-semibold">{t('information_we_collect_title')}</h2>
        <p>{t('information_we_collect_text')}</p>
        <ul className="list-disc list-inside">
          <li>{t('identification_info')}</li>
          <li>{t('login_info')}</li>
          <li>{t('financial_info')}</li>
          <li>{t('usage_info')}</li>
        </ul>
      </section>

      <section className="mb-4">
        <h2 className="text-xl font-semibold">{t('use_of_information_title')}</h2>
        <p>{t('use_of_information_text')}</p>
        <ul className="list-disc list-inside">
          <li>{t('provide_improve_services')}</li>
          <li>{t('process_transactions')}</li>
          <li>{t('send_communications')}</li>
          <li>{t('respond_requests')}</li>
          <li>{t('improve_security')}</li>
        </ul>
      </section>

      <section className="mb-4">
        <h2 className="text-xl font-semibold">{t('sharing_information_title')}</h2>
        <p>{t('sharing_information_text')}</p>
        <ul className="list-disc list-inside">
          <li>{t('with_consent')}</li>
          <li>{t('process_transactions_services')}</li>
          <li>{t('comply_legal_obligations')}</li>
          <li>{t('protect_rights_property')}</li>
        </ul>
      </section>

      <section className="mb-4">
        <h2 className="text-xl font-semibold">{t('security_information_title')}</h2>
        <p>{t('security_information_text')}</p>
      </section>

      <section className="mb-4">
        <h2 className="text-xl font-semibold">{t('your_rights_title')}</h2>
        <p>{t('your_rights_text')}</p>
      </section>

      <section className="mb-4">
        <h2 className="text-xl font-semibold">{t('cookies_title')}</h2>
        <p>{t('cookies_text')}</p>
      </section>

      <section className="mb-4">
        <h2 className="text-xl font-semibold">{t('policy_changes_title')}</h2>
        <p>{t('policy_changes_text')}</p>
      </section>

      <section className="mb-4">
        <h2 className="text-xl font-semibold">{t('contact_title')}</h2>
        <p>{t('contact_text')}</p>
        <address>
          {t('company_name')}<br />
          {t('address')}<br />
          <a href={`mailto:${t('contact_email')}`}>{t('contact_email')}</a><br />
          {t('phone_number')}
        </address>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
