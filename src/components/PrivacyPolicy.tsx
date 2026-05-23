import React, { useEffect } from 'react';
import { useLanguage } from '../lib/LanguageContext';

const PrivacyPolicy: React.FC = () => {
  const { language } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (language === 'en') {
    return (
      <div className="pt-32 pb-24 px-6 relative z-10 w-full max-w-4xl mx-auto text-gray-300 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">Privacy Policy</h1>
        
        <div className="space-y-8 text-lg font-light leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
            <p>
              Welcome to AquaLume. We highly value the protection of your personal data and respect your privacy. This policy explains what information we collect and how we use it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Collected Data</h2>
            <p>
              We may collect the following information:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Your email address when you subscribe to our newsletter.</li>
              <li>Your payment details are securely processed by our third-party payment partner (PayPal); we store absolutely no credit card numbers or banking data on our servers.</li>
              <li>Anonymized navigation behavior data to improve the user experience.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Data Usage</h2>
            <p>
              Your data is used exclusively to:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Process your purchase orders.</li>
              <li>Send you relevant information regarding AquaLume if you have opted in.</li>
              <li>Improve our services and our website.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Data Sharing</h2>
            <p>
              We do not sell, trade, or rent your personal identification information to third parties. Any sharing of data is done strictly with trusted providers (such as PayPal for payments) to execute the necessary support.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Your Rights</h2>
            <p>
              Pursuant to applicable data security laws, you possess the full right to access, rectify, delete, and transfer your data. To exercise these rights, please contact our support team or use our contact forms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Policy Updates</h2>
            <p>
              We reserve the right to update or modify this Privacy Policy at any time. Any revisions will be published instantly on this page.
            </p>
          </section>
        </div>
      </div>
    );
  }

  // French default
  return (
    <div className="pt-32 pb-24 px-6 relative z-10 w-full max-w-4xl mx-auto text-gray-300 animate-fade-in">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">Politique de Confidentialité</h1>
      
      <div className="space-y-8 text-lg font-light leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
          <p>
            Bienvenue sur AquaLume. Nous accordons une grande importance à la protection de vos données personnelles et au respect de votre vie privée. Cette politique explique quelles données nous collectons et comment nous les utilisons.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">2. Données collectées</h2>
          <p>
            Nous pouvons être amenés à collecter les informations suivantes :
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>Votre adresse e-mail lorsque vous vous inscrivez à notre newsletter.</li>
            <li>Vos informations de paiement traitées de manière sécurisée par notre partenaire de paiement (PayPal), nous ne stockons aucune donnée de carte bancaire.</li>
            <li>Des données de navigation anonymisées pour améliorer l'expérience utilisateur.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">3. Utilisation des données</h2>
          <p>
            Vos données sont utilisées exclusivement pour :
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>Traiter vos commandes.</li>
            <li>Vous envoyer des informations concernant AquaLume si vous y avez consenti.</li>
            <li>Améliorer nos services et notre site Web.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">4. Partage de données</h2>
          <p>
            Nous ne vendons, n'échangeons ni ne louons vos informations personnelles à des tiers. Les seules données partagées le sont avec des prestataires de services de confiance (comme PayPal pour les paiements) dans le strict cadre de l'exécution de nos services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">5. Vos droits</h2>
          <p>
            Conformément à la législation en vigueur, vous disposez d'un droit d'accès, de rectification, d'effacement et de portabilité de vos données. Pour exercer ces droits, veuillez nous contacter via le formulaire de contact ou à l'adresse e-mail dédiée.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">6. Modification</h2>
          <p>
            Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Toute modification sera publiée sur cette page.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
