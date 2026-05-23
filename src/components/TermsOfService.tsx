import React, { useEffect } from 'react';
import { useLanguage } from '../lib/LanguageContext';

const TermsOfService: React.FC = () => {
  const { language } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (language === 'en') {
    return (
      <div className="pt-32 pb-24 px-6 relative z-10 w-full max-w-4xl mx-auto text-gray-300 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">Terms of Service</h1>
        
        <div className="space-y-8 text-lg font-light leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using this website, you agree to be bound by these Terms of Service. If you do not accept these terms, please refrain from using our site or purchasing our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Use of Site</h2>
            <p>
              You agree to use our site solely for legal, authorized purposes and in a manner that does not infringe upon, restrict, or inhibit anyone else's use and enjoyment of this website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Intellectual Property</h2>
            <p>
              All content present on this site, including text, graphics, logos, images, and software, is the property of AquaLume or its content providers and is protected by international intellectual property laws. Any unauthorized reproduction is strictly forbidden.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Orders and Payments</h2>
            <p>
              All orders placed are subject to item availability and price confirmation. Payments are securely managed through our third-party provider (PayPal). We do not collect or store sensitive financial credentials.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Limitation of Liability</h2>
            <p>
              AquaLume will not be held liable for any direct, indirect, incidental, consequential, or special damages arising from the use or inability to use this website or products purchased through it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Governing Law</h2>
            <p>
              These terms of service are governed by the laws in effect in the country of AquaLume's registration. Any disputes relating to the use of this site shall be submitted to the exclusive jurisdiction of the competent courts.
            </p>
          </section>
        </div>
      </div>
    );
  }

  // French default
  return (
    <div className="pt-32 pb-24 px-6 relative z-10 w-full max-w-4xl mx-auto text-gray-300 animate-fade-in">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">Conditions d'Utilisation</h1>
      
      <div className="space-y-8 text-lg font-light leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">1. Acceptation des conditions</h2>
          <p>
            En accédant et en utilisant ce site Web, vous acceptez d'être lié par les présentes Conditions d'Utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre site ou nos services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">2. Utilisation du site</h2>
          <p>
            Vous vous engagez à utiliser notre site uniquement à des fins légales et d'une manière qui ne porte pas atteinte aux droits de tiers, ni ne restreint ou n'empêche l'utilisation et la jouissance du site par des tiers.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">3. Propriété intellectuelle</h2>
          <p>
            Tout le contenu présent sur ce site, y compris les textes, graphiques, logos, images, et logiciels, est la propriété d'AquaLume ou de ses fournisseurs de contenu et est protégé par les lois sur la propriété intellectuelle. Toute reproduction non autorisée est strictement interdite.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">4. Commandes et paiements</h2>
          <p>
            Toutes les commandes sont sujettes à disponibilité et confirmation du prix. Les paiements sur ce site sont sécurisés et gérés par des prestataires tiers (PayPal). Nous ne conservons aucune information financière sensible.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">5. Limitation de responsabilité</h2>
          <p>
            AquaLume ne pourra être tenu responsable des dommages directs, indirects, consécutifs ou spéciaux résultant de l'utilisation ou de l'impossibilité d'utiliser ce site Web ou les produits achetés par son intermédiaire.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">6. Droit applicable</h2>
          <p>
            Les présentes conditions d'utilisation sont régies par les lois en vigueur dans le pays d'immatriculation d'AquaLume. Tout litige relatif à l'utilisation de ce site sera soumis à la juridiction exclusive des tribunaux compétents.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;
