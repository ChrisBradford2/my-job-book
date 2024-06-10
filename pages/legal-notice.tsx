// pages/legal-notice.tsx
import React from 'react';

const LegalNotice: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Mentions Légales</h1>

      <section className="mb-4">
        <h2 className="text-xl font-semibold">Éditeur du Site</h2>
        <p>
          <strong>Nom de l'entreprise :</strong> [Nom de votre entreprise]<br />
          <strong>Adresse :</strong> [Adresse de l'entreprise]<br />
          <strong>Téléphone :</strong> [Numéro de téléphone de l'entreprise]<br />
          <strong>Email :</strong> <a href="mailto:[email de contact]">[email de contact]</a><br />
          <strong>Numéro SIRET :</strong> [Numéro SIRET]<br />
          <strong>Directeur de la publication :</strong> [Nom du directeur]
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-xl font-semibold">Hébergeur du Site</h2>
        <p>
          <strong>Nom de l'hébergeur :</strong> [Nom de l'hébergeur]<br />
          <strong>Adresse :</strong> [Adresse de l'hébergeur]<br />
          <strong>Téléphone :</strong> [Numéro de téléphone de l'hébergeur]<br />
          <strong>Email :</strong> <a href="mailto:[email de l'hébergeur]">[email de l'hébergeur]</a><br />
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-xl font-semibold">Propriété Intellectuelle</h2>
        <p>
          Le contenu du site [Nom de votre site] est la propriété exclusive de [Nom de votre entreprise] et est protégé par les lois françaises et internationales relatives à la propriété intellectuelle. Toute reproduction, distribution, modification, adaptation, retransmission ou publication, même partielle, de ces différents éléments est strictement interdite sans l'accord écrit de [Nom de votre entreprise].
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-xl font-semibold">Responsabilité</h2>
        <p>
          [Nom de votre entreprise] ne pourra être tenu responsable des dommages directs et indirects causés au matériel de l'utilisateur, lors de l'accès au site [Nom de votre site], et résultant soit de l'utilisation d'un matériel ne répondant pas aux spécifications indiquées, soit de l'apparition d'un bug ou d'une incompatibilité.
        </p>
        <p>
          [Nom de votre entreprise] ne pourra également être tenu responsable des dommages indirects (tels par exemple qu'une perte de marché ou perte d'une chance) consécutifs à l'utilisation du site [Nom de votre site].
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-xl font-semibold">Données Personnelles</h2>
        <p>
          Conformément aux dispositions de la loi n° 78-17 du 6 janvier 1978 modifiée, l'utilisateur dispose d'un droit d'accès, de modification et de suppression des informations collectées par [Nom de votre entreprise]. Pour exercer ce droit, il reviendra à l'utilisateur d'envoyer un message à l'adresse suivante : <a href="mailto:[email de contact]">[email de contact]</a>.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-xl font-semibold">Litiges</h2>
        <p>
          Les présentes conditions du site [Nom de votre site] sont régies par les lois françaises et tout litige ou contentieux qui pourrait naître de l'interprétation ou de l'exécution de celles-ci sera de la compétence exclusive des tribunaux dont dépend le siège social de l'entreprise. La langue de référence, pour le règlement de contentieux éventuels, est le français.
        </p>
      </section>
    </div>
  );
};

export default LegalNotice;
