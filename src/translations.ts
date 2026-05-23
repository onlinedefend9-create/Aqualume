export interface TranslationSet {
  // Navigation
  navHome: string;
  navAbout: string;
  navProducts: string;
  navHowItWorks: string;
  navFeatures: string;
  navContact: string;
  btnOrder: string;

  // Hero Section
  heroTitle1: string;
  heroTitle2: string;
  heroSubtitle: string;
  heroCTA: string;

  // About Section
  aboutTitle: string;
  aboutTitleHighlight: string;
  aboutDesc1: string;
  aboutDesc2: string;
  aboutBadgeDurable: string;
  aboutBadgeReliable: string;
  aboutMissionTitle: string;
  aboutMissionDesc: string;

  // Features Section
  featuresTitle: string;
  featuresSubtitle: string;
  featCleanEnergyTitle: string;
  featCleanEnergyDesc: string;
  featSmartLightTitle: string;
  featSmartLightDesc: string;
  featEcoTitle: string;
  featEcoDesc: string;

  // How It Works
  howItWorksTitle: string;
  howItWorksSubtitle: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;

  // Products Section
  prodBadgeNew: string;
  prodTitle: string;
  prodSubtitle: string;
  prodDesc: string;
  prodBullet1: string;
  prodBullet2: string;
  prodBullet3: string;
  prodBullet4: string;
  prodBullet5: string;

  // Testimonials Section
  testimonialsTitle: string;
  testi1Text: string;
  testi2Text: string;
  testi3Text: string;

  // Footer & Newsletter
  footerNewsletterTitle: string;
  footerNewsletterSub: string;
  footerPlaceholder: string;
  footerSubscribeBtn: string;
  footerSubscribeLoading: string;
  footerSubscribeSuccess: string;
  footerSubscribeError: string;
  footerCopyright: string;
  
  // Legal Pages Link
  footerPrivacy: string;
  footerTerms: string;
}

export const translations: Record<"fr" | "en", TranslationSet> = {
  fr: {
    navHome: "Accueil",
    navAbout: "À propos",
    navProducts: "Produits",
    navHowItWorks: "Comment ça marche",
    navFeatures: "Fonctionnalités",
    navContact: "Contact",
    btnOrder: "Commander",

    heroTitle1: "Lumière Pure.",
    heroTitle2: "Solution Pure.",
    heroSubtitle: "L'alliance de l'eau, du sel et d'un éclairage intelligent.",
    heroCTA: "Découvrir AquaLume",

    aboutTitle: "À propos d'",
    aboutTitleHighlight: "AquaLume",
    aboutDesc1: "AquaLume est la source de lumière portable révolutionnaire qui change notre façon de concevoir les urgences et la vie hors réseau. Alimentée par la plus simple des ressources — l'eau salée — notre technologie brevetée offre un éclairage fiable et durable sans avoir besoin de batteries traditionnelles ou de panneaux solaires.",
    aboutDesc2: "Conçue pour les aventuriers, les familles et les kits de préparation aux situations d'urgence, AquaLume est conçue pour résister aux conditions les plus difficiles tout en conservant un profil élégant et esthétique. Que vous soyez à des kilomètres de la prise la plus proche ou que vous vous prépariez à une panne de courant, AquaLume garantit qu'une source de lumière durable est toujours à portée de main.",
    aboutBadgeDurable: "Durable",
    aboutBadgeReliable: "Fiable",
    aboutMissionTitle: "Notre Mission",
    aboutMissionDesc: "Notre mission est de démocratiser l'accès à une énergie propre et inépuisable grâce à notre lampe à eau salée. Nous concevons un éclairage écologique et sans pile, idéal pour le camping, la survie et les situations d'urgence. AquaLume s'engage à offrir une source de lumière fiable et durable, garantissant sécurité et autonomie partout dans le monde, même en l'absence de réseau électrique.",

    featuresTitle: "Maîtriser les éléments",
    featuresSubtitle: "Exploiter la puissance des technologies avancées pour fournir une illumination inégalée.",
    featCleanEnergyTitle: "Énergie propre",
    featCleanEnergyDesc: "La technologie avancée génère de l'électricité sans produits chimiques en utilisant uniquement du sel et de l'eau.",
    featSmartLightTitle: "Éclairage intelligent",
    featSmartLightDesc: "L'éclairage LED adaptatif offre une luminosité parfaite pour votre environnement.",
    featEcoTitle: "Écologique",
    featEcoDesc: "Sans additifs chimiques et conçu de manière durable, minimise sans effort votre empreinte carbone.",

    howItWorksTitle: "Comment ça marche",
    howItWorksSubtitle: "Trois étapes simples pour une illumination autonome et fiable.",
    step1Title: "Ajouter l'eau",
    step1Desc: "Versez de l'eau claire avec la bonne quantité de sel dans la lampe.",
    step2Title: "Mélanger",
    step2Desc: "Mélangez la solution pour que le sel se dessolve correctement.",
    step3Title: "Illuminer",
    step3Desc: "Appuyez sur le bouton et la lumière s'allume instantanément.",

    prodBadgeNew: "Nouveauté",
    prodTitle: "Lampe AquaLume",
    prodSubtitle: '"La lumière 100% autonome"',
    prodDesc: "Une lampe LED révolutionnaire activée au sel et à l'eau. Pas besoin de batterie — il suffit de verser de l'eau et du sel pour allumer la lumière. Idéal pour les urgences, la survie et le camping.",
    prodBullet1: "Activée par l'eau et le sel — sans pile",
    prodBullet2: "Fournit un éclairage d'urgence LED puissant",
    prodBullet3: "Autonomie de 140h par recharge",
    prodBullet4: "Étanche, pliable & portable",
    prodBullet5: "Écologique, sûr, ne contient aucun agent toxique",

    testimonialsTitle: "Ils parlent de nous",
    testi1Text: "Une lumière incroyablement pure et l'éclairage ambiant transforme complètement nos soirées. Parfait pour se détendre.",
    testi2Text: "L'installation a été un jeu d'enfant. J'adore le design minimaliste et l'indicateur lumineux semble très futuriste.",
    testi3Text: "Le meilleur investissement pour notre maison. La tranquillité d'esprit associée à l'esthétique est imbattable.",

    footerNewsletterTitle: "Restez Informés",
    footerNewsletterSub: "Rejoignez notre newsletter pour des offres exclusives.",
    footerPlaceholder: "Adresse e-mail",
    footerSubscribeBtn: "S'abonner",
    footerSubscribeLoading: "...",
    footerSubscribeSuccess: "Merci pour votre inscription !",
    footerSubscribeError: "L'adresse e-mail n'est pas valide ou une erreur s'est produite.",
    footerCopyright: "Tous droits réservés.",
    footerPrivacy: "Politique de confidentialité",
    footerTerms: "Conditions d'utilisation",
  },
  en: {
    navHome: "Home",
    navAbout: "About Us",
    navProducts: "Products",
    navHowItWorks: "How It Works",
    navFeatures: "Features",
    navContact: "Contact",
    btnOrder: "Order Now",

    heroTitle1: "Pure Light.",
    heroTitle2: "Pure Solution.",
    heroSubtitle: "The perfect synergy of water, salt, and smart illumination.",
    heroCTA: "Discover AquaLume",

    aboutTitle: "About ",
    aboutTitleHighlight: "AquaLume",
    aboutDesc1: "AquaLume is the revolutionary portable light source that changes how we think about emergency preparedness and off-grid living. Powered by one of the earth's simplest resources — salt water — our patented technology offers reliable, long-lasting illumination without the need for traditional batteries or solar panels.",
    aboutDesc2: "Designed for adventurers, households, and emergency survival kits alike, AquaLume is built to withstand the harshest environments while maintaining a sleek, elegant form factor. Whether you are miles away from the nearest power outlet or preparing for an unexpected power outage, AquaLume guarantees that durable light is always within reach.",
    aboutBadgeDurable: "Sustainable",
    aboutBadgeReliable: "Reliable",
    aboutMissionTitle: "Our Mission",
    aboutMissionDesc: "Our mission is to democratize access to clean, infinite power through our saltwater-activated lamps. We design eco-friendly, battery-free lighting perfectly tailored for camping, survival, and emergency situations. AquaLume is committed to providing a reliable, sustainable source of light that delivers safety and self-sufficiency worldwide-even when the electrical grid goes down.",

    featuresTitle: "Master the Elements",
    featuresSubtitle: "Harness the power of advanced technology to deliver unparalleled illumination.",
    featCleanEnergyTitle: "Clean Energy",
    featCleanEnergyDesc: "Our advanced technology generates electricity completely chemical-free using only salt and water.",
    featSmartLightTitle: "Smart Lighting",
    featSmartLightDesc: "Adaptive high-efficiency LED lighting provides the perfect brightness output tailored for your surroundings.",
    featEcoTitle: "Eco-Friendly",
    featEcoDesc: "Sustainably designed and free of heavy metals or toxic chemicals, making it effortless to reduce your carbon footprint.",

    howItWorksTitle: "How It Works",
    howItWorksSubtitle: "Three simple steps for fully autonomous and reliable illumination.",
    step1Title: "Add Water",
    step1Desc: "Pour clean water along with the correct amount of salt directly into the lamp chamber.",
    step2Title: "Mix & Dissolve",
    step2Desc: "Gently stir the solution to ensure the salt dissolves properly and acts as the electrolyte.",
    step3Title: "Illuminate",
    step3Desc: "Press the primary power switch and enjoy bright, continuous illumination instantly.",

    prodBadgeNew: "New Release",
    prodTitle: "AquaLume Lamp",
    prodSubtitle: '"100% Autonomous Light"',
    prodDesc: "A revolutionary LED lamp powered entirely by salt and water. No batteries or solar panels required — simply fill with water and salt to unlock bright light. Perfect for emergencies, outdoor adventures, and survival situations.",
    prodBullet1: "Activated by salt and water — 100% battery-free",
    prodBullet2: "Delivers powerful, high-output emergency LED lighting",
    prodBullet3: "Up to 140 hours of run time per saline charge",
    prodBullet4: "Waterproof, durable, lightweight & highly portable",
    prodBullet5: "Eco-friendly, safe, non-toxic, and chemical-free",

    testimonialsTitle: "What They Say",
    testi1Text: "Incredibly pure light and the ambient illumination completely transforms our evenings. Absolutely perfect for relaxing.",
    testi2Text: "Setup was a total breeze. I love the clean minimalist aesthetic, and the glowing indicator ring feels brilliantly futuristic.",
    testi3Text: "The absolute best backup investment for our home. The peace of mind combined with beautiful design is completely unbeatable.",

    footerNewsletterTitle: "Stay Informed",
    footerNewsletterSub: "Join our newsletter to receive exclusive updates and emergency tips.",
    footerPlaceholder: "Your email address",
    footerSubscribeBtn: "Subscribe",
    footerSubscribeLoading: "...",
    footerSubscribeSuccess: "Thank you for subscribing!",
    footerSubscribeError: "Please enter a valid email address or try again later.",
    footerCopyright: "All rights reserved.",
    footerPrivacy: "Privacy Policy",
    footerTerms: "Terms of Service",
  }
};
