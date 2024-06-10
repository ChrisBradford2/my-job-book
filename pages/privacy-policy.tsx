// pages/privacy-policy.tsx
import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Politique de Confidentialité</h1>

      <section className="mb-4">
        <h2 className="text-xl font-semibold">Introduction</h2>
        <p>Bienvenue sur My Job Book (le "Site"). Nous nous engageons à protéger et à respecter votre vie privée. Cette politique de confidentialité décrit la manière dont nous recueillons, utilisons, divulguons et protégeons vos informations personnelles.</p>
      </section>

      <section className="mb-4">
        <h2 className="text-xl font-semibold">Informations que Nous Collectons</h2>
        <p>Nous pouvons collecter et traiter les types de données suivants :</p>
        <ul className="list-disc list-inside">
          <li><strong>Informations d'identification</strong> : nom, adresse e-mail, numéro de téléphone.</li>
          <li><strong>Informations de connexion</strong> : adresse IP, type de navigateur, fuseau horaire, informations sur les cookies.</li>
          <li><strong>Informations financières</strong> : détails de paiement (le cas échéant).</li>
          <li><strong>Informations sur l'utilisation</strong> : informations sur votre utilisation de notre site web.</li>
        </ul>
      </section>

      <section className="mb-4">
        <h2 className="text-xl font-semibold">Utilisation des Informations</h2>
        <p>Nous utilisons les informations collectées pour :</p>
        <ul className="list-disc list-inside">
          <li>Fournir et améliorer nos services.</li>
          <li>Traiter vos transactions.</li>
          <li>Vous envoyer des communications marketing et promotionnelles.</li>
          <li>Répondre à vos demandes et questions.</li>
          <li>Améliorer la sécurité de notre site.</li>
        </ul>
      </section>

      <section className="mb-4">
        <h2 className="text-xl font-semibold">Partage des Informations</h2>
        <p>Nous pouvons partager vos informations avec des tiers uniquement dans les cas suivants :</p>
        <ul className="list-disc list-inside">
          <li>Avec votre consentement.</li>
          <li>Pour traiter des transactions ou fournir des services que vous avez demandés.</li>
          <li>Pour se conformer à des obligations légales.</li>
          <li>Pour protéger nos droits et notre propriété.</li>
        </ul>
      </section>

      <section className="mb-4">
        <h2 className="text-xl font-semibold">Sécurité des Informations</h2>
        <p>Nous mettons en œuvre des mesures de sécurité pour protéger vos informations personnelles contre l'accès non autorisé, l'altération, la divulgation ou la destruction. Cependant, veuillez noter qu'aucune méthode de transmission sur Internet ou de stockage électronique n'est totalement sécurisée.</p>
      </section>

      <section className="mb-4">
        <h2 className="text-xl font-semibold">Vos Droits</h2>
        <p>Selon votre juridiction, vous pouvez avoir certains droits concernant vos informations personnelles, tels que le droit d'accès, de rectification, de suppression et de limitation du traitement. Pour exercer ces droits, veuillez nous contacter à [adresse e-mail de contact].</p>
      </section>

      <section className="mb-4">
        <h2 className="text-xl font-semibold">Cookies</h2>
        <p>Notre site utilise des cookies pour améliorer votre expérience en ligne. Un cookie est un petit fichier texte qui est placé sur votre appareil lorsque vous visitez notre site. Vous pouvez configurer votre navigateur pour refuser les cookies, mais cela peut affecter la fonctionnalité du site.</p>
      </section>

      <section className="mb-4">
        <h2 className="text-xl font-semibold">Modifications de cette Politique</h2>
        <p>Nous pouvons mettre à jour cette politique de confidentialité de temps en temps. Nous vous encourageons à consulter cette page régulièrement pour rester informé des modifications. En continuant à utiliser notre site après la publication des modifications, vous acceptez ces modifications.</p>
      </section>

      <section className="mb-4">
        <h2 className="text-xl font-semibold">Contact</h2>
        <p>Si vous avez des questions ou des préoccupations concernant cette politique de confidentialité, veuillez nous contacter à :</p>
        <address>
          [nom de votre entreprise]<br />
          [adresse]<br />
          <a href="mailto:[e-mail de contact]">[e-mail de contact]</a><br />
          [numéro de téléphone]
        </address>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
