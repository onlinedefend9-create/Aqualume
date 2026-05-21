export interface TranslationSet {
  navProducts: string;
  navTechnology: string;
  navFieldReports: string;
  navReviews: string;
  navContact: string;
  btnOrder: string;
  btnEquip: string;
  badgeSurvival: string;
  badgeShipping: string;
  tagline: string;
  heroTitle1: string;
  heroTitle2: string;
  heroTitleSpan: string;
  heroDesc: string;
  certifiedReviews: string;
  patentedTech: string;
  electrolyticPower: string;
  waterproofTitle: string;
  waterproofDesc: string;
  telemetryStatus: string;
  telemetrySource: string;
  productsTitle: string;
  productsSubtitle: string;
  productFreeShipping: string;
  techDiveTitle: string;
  techDiveSubtitle: string;
  techDiveDesc: string;
  techMagnesium: string;
  techVoltage: string;
  techZeroLoss: string;
  techZeroLossDesc: string;
  techInstantOn: string;
  techInstantOnDesc: string;
  howItWorksTitle: string;
  howItWorksSubtitle: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  ugcTitle: string;
  ugcSubtitle: string;
  ugcFilterAll: string;
  ugcFilterEmergency: string;
  ugcFilterWilderness: string;
  ugcFilterMarine: string;
  ugcFilterOffgrid: string;
  reviewsTitle: string;
  reviewsSubtitle: string;
  guaranteeBadgeTitle: string;
  guaranteeBadgeDesc: string;
  supportBadgeTitle: string;
  supportBadgeDesc: string;
  ecoBadgeTitle: string;
  ecoBadgeDesc: string;
  ctaTitle: string;
  ctaDesc: string;
  ctaButton: string;
  faqTitle: string;
  faqSubtitle: string;
  faq1Q: string;
  faq1A: string;
  faq2Q: string;
  faq2A: string;
  faq3Q: string;
  faq3A: string;
  faq4Q: string;
  faq4A: string;
}

export const translations: Record<"fr" | "en", TranslationSet> = {
  fr: {
    navProducts: "Produits",
    navTechnology: "Technologie",
    navFieldReports: "Avis Terrain",
    navReviews: "Retours",
    navContact: "Contact",
    btnOrder: "Commander",
    btnEquip: "S'éqiper",
    badgeSurvival: "Survie & Innovation",
    badgeShipping: "Envoi International",
    tagline: "💧 \"Pure Light. Pure Water.\"",
    heroTitle1: "Zéro Piles.",
    heroTitle2: "Juste ",
    heroTitleSpan: "du Sel et de l'Eau.",
    heroDesc: "Découvrez AquaLume™, l'innovation ultime de l'éclairage autonome. Conçue pour parer aux situations d'urgence, aux activités de plein air et offrir une lumière éternelle sans pile ni batterie.",
    certifiedReviews: "+ de 2 400 avis certifiés",
    patentedTech: "Technologie Brevetée",
    electrolyticPower: "Énergie 100% Électrolytique",
    waterproofTitle: "Étanchéité IP67",
    waterproofDesc: "Conçu pour la survie extrême",
    telemetryStatus: "AQ.SYS // UNITÉ.DE.PURIFICATION : OPÉRATIONNELLE [100%]",
    telemetrySource: "SOURCE: SURVIE MILITAIRE RECOMMANDÉ",
    productsTitle: "La Gamme Absolue AquaLume™",
    productsSubtitle: "Systèmes d'urgence autonomes prêts à fonctionner instantanément, sans aucune source d'énergie externe requise.",
    productFreeShipping: "Livraison Express Offerte",
    techDiveTitle: "Technical Superiority",
    techDiveSubtitle: "Energy from Salt Ions.",
    techDiveDesc: "En exploitant la conductivité naturelle des sels, AquaLume™ génère une réaction électrolytique haute performance alimentant des matrices LED à haute puissance. Ce n'est pas qu'une simple lampe : c'est une centrale portative.",
    techMagnesium: "Coeur de Magnésium",
    techVoltage: "Stabilité de tension",
    techZeroLoss: "Zéro Perte de Charge",
    techZeroLossDesc: "Le magnésium endormi ne se dégrade pas. Durée de vie garantie de plus de 10 ans.",
    techInstantOn: "Activation Instantanée",
    techInstantOnDesc: "Pas de panneau solaire à déployer ni de manivelle à tourner. De la lumière en 5 secondes.",
    howItWorksTitle: "Technologie Révolutionnaire",
    howItWorksSubtitle: "Une source d'éclairage infatigable en 3 mouvements simples.",
    step1Title: "1. Versez de l'eau",
    step1Desc: "Remplissez le réservoir avec de l'eau douce ou de mer. Même de l'urine ou de la neige fondue fonctionne.",
    step2Title: "2. Ajoutez du sel (si douce)",
    step2Desc: "Si vous utilisez de l'eau douce, ajoutez un sachet de sel de table normal. L'eau de mer s'utilise directement.",
    step3Title: "3. Profitez de la lumière",
    step3Desc: "La réaction électrochimique produit instantanément un flux de lumière éblouissant continu pendant 120 heures par anode.",
    ugcTitle: "Rapports d'Action du Terrain",
    ugcSubtitle: "Découvrez comment nos utilisateurs s'en sortent en milieu hostile grâce à AquaLume™",
    ugcFilterAll: "Tous les rapports",
    ugcFilterEmergency: "Urgences",
    ugcFilterWilderness: "Explorations",
    ugcFilterMarine: "Marine",
    ugcFilterOffgrid: "Autonomie",
    reviewsTitle: "Vos retours d'expérience",
    reviewsSubtitle: "Des milliers d'aventuriers, de marins et de professionnels de la survie recommandent AquaLume™.",
    guaranteeBadgeTitle: "Garantie de 10 ans",
    guaranteeBadgeDesc: "Votre matériel est garanti à vie contre toute détérioration des fonctions de base.",
    supportBadgeTitle: "Support Client Expert",
    supportBadgeDesc: "Une assistance technique dédiée basée en Europe pour répondre à tous vos besoins.",
    ecoBadgeTitle: "Zéro Déchet Toxique",
    ecoBadgeDesc: "Contrairement aux piles au lithium, notre réaction saline produit des sous-produits 100% écologiques.",
    ctaTitle: "N'attendez pas la prochaine panne de courant.",
    ctaDesc: "La sécurité est la seule chose que l'on ne peut se permettre d'acheter trop tard.",
    ctaButton: "S'équiper avec AquaLume™",
    faqTitle: "Questions Fréquentes",
    faqSubtitle: "Tout savoir sur le fonctionnement et l'entretien de notre technologie.",
    faq1Q: "Comment fonctionne précisément l'éclairage sans pile ?",
    faq1A: "AquaLume™ utilise un couple d'oxydoréduction breveté : une anode de magnésium de haute pureté et une cathode de carbone. L'introduction d'eau salée agit comme l'électrolyte, initiant une réaction chimique stable qui libère des électrons, alimentant directement nos LED UV-C et blanches à haute intensité.",
    faq2Q: "Quelle eau puis-je utiliser dans l'appareil ?",
    faq2A: "Absolument n'importe quelle eau salée ! L'eau de mer classique (environ 3,5% de salinité) est idéale. Si vous avez de l'eau douce (rivière, robinet, bouteille, neige fondue), ajoutez simplement du sel de cuisine ordinaire. En cas de survie extrême, l'urine, la sueur ou l'eau boueuse salée activeront également l'appareil.",
    faq3Q: "Quelle est la durée de vie du système ?",
    faq3A: "Tant qu'il n'est pas activé, l'AquaLume™ peut être stocké plus de 10 ans dans sa boîte sans subir aucune autodécharge ni dégradation (contrairement aux piles qui se vident). Une fois activé, une anode de magnésium fournit jusqu'à 120 heures de lumière continu. Les recharges d'anodes sont remplaçables en quelques secondes.",
    faq4Q: "Le système de purification d'eau est-il certifié ?",
    faq4A: "Oui, notre purificateur AquaLume Purify Go utilise une LED UV-C certifiée de longueur d'onde médicale de 275nm. Ce processus bio-destructeur brise l'ADN des virus, amibes et bactéries présents dans l'eau douce en 60 secondes chrono, avec un taux d'éradication de 99,99 % validé en laboratoire.",
  },
  en: {
    navProducts: "Products",
    navTechnology: "Technology",
    navFieldReports: "Field Reports",
    navReviews: "Reviews",
    navContact: "Contact",
    btnOrder: "Order Now",
    btnEquip: "Equip",
    badgeSurvival: "Survival & Innovation",
    badgeShipping: "International Shipping",
    tagline: "💧 \"Pure Light. Pure Water.\"",
    heroTitle1: "Zero Batteries.",
    heroTitle2: "Just ",
    heroTitleSpan: "Salt and Water.",
    heroDesc: "Discover AquaLume™, the ultimate innovation in self-powered lighting. Designed for emergencies, outdoor adventures, and off-grid living with endless light and zero batteries.",
    certifiedReviews: "Over 2,400 certified reviews",
    patentedTech: "Patented Technology",
    electrolyticPower: "100% Electrolytic Energy",
    waterproofTitle: "IP67 Waterproof",
    waterproofDesc: "Engineered for extreme survival",
    telemetryStatus: "AQ.SYS // PURIFICATION.UNIT : OPERATIONAL [100%]",
    telemetrySource: "SOURCE: MILITARY SURVIVAL RECOMMENDED",
    productsTitle: "The Definitive AquaLume™ Lineup",
    productsSubtitle: "Self-powered emergency systems ready to run instantly, with no external electricity source required.",
    productFreeShipping: "Free Express Shipping Included",
    techDiveTitle: "Technical Superiority",
    techDiveSubtitle: "Energy from Salt Ions.",
    techDiveDesc: "By leveraging the natural conductivity of salts, AquaLume™ generates a high-performance electrolytic reaction that powers high-efficiency LED arrays. It’s not just a light: it’s a portable power station.",
    techMagnesium: "Magnesium Core",
    techVoltage: "Voltage Stability",
    techZeroLoss: "Zero Charge Decay",
    techZeroLossDesc: "Dormant magnesium does not degrade over time. Guaranteed shelf life of more than 10 years.",
    techInstantOn: "Instant Activation",
    techInstantOnDesc: "No solar panels to deploy, no batteries to charge, no hand cranks to turn. Light in 5 seconds.",
    howItWorksTitle: "Revolutionary Technology",
    howItWorksSubtitle: "An untiring source of emergency illumination in 3 simple movements.",
    step1Title: "1. Add Water",
    step1Desc: "Fill the chamber with fresh water, river water, or sea water. Even snowmelt or urine works in emergencies.",
    step2Title: "2. Add Salt (if fresh)",
    step2Desc: "If using fresh water, add a packet of regular table salt. If using saltwater, simply pour it directly in.",
    step3Title: "3. Instant Light",
    step3Desc: "The electrochemical reaction immediately releases high-density electron flows, powering bright LEDs for 120 hours.",
    ugcTitle: "Action Reports from the Field",
    ugcSubtitle: "See how adventurers and rescue teams survive hostile environments using the AquaLume™ power.",
    ugcFilterAll: "All Reports",
    ugcFilterEmergency: "Emergencies",
    ugcFilterWilderness: "Wilderness",
    ugcFilterMarine: "Marine",
    ugcFilterOffgrid: "Off-Grid",
    reviewsTitle: "Verified User Reviews",
    reviewsSubtitle: "Thousands of hikers, remote cabin owners, and tactical teams trust AquaLume™.",
    guaranteeBadgeTitle: "10-Year Guarantee",
    guaranteeBadgeDesc: "Our equipment is fully guaranteed against any deterioration of critical operations.",
    supportBadgeTitle: "Expert Customer Support",
    supportBadgeDesc: "Dedicated live tech assistance based in Europe to assist you whenever you need us.",
    ecoBadgeTitle: "Zero Toxic Waste",
    ecoBadgeDesc: "Unlike standard heavy lithium batteries, our saline reaction generates 100% clean, non-toxic byproducts.",
    ctaTitle: "Don't wait for the next major blackout.",
    ctaDesc: "Preparedness is the one thing you cannot afford to buy too late.",
    ctaButton: "Equip with AquaLume™",
    faqTitle: "Frequently Asked Questions",
    faqSubtitle: "Find answers to all your questions about our patented salt-water systems.",
    faq1Q: "How exactly does it work without any battery?",
    faq1A: "AquaLume™ works using a patented redox reaction between a premium-grade magnesium anode and a porous carbon cathode. Saltwater triggers the electrolyte path, setting off a safe, stable electrical current that powers high-efficiency LEDs directly.",
    faq2Q: "What kind of water can I put in it?",
    faq2A: "Any water combined with salt! Ocean seawater is ideal. If you only have fresh water (river, tap, bottled, snow), simply add ordinary table salt. In survival situations, urine, sweat, or brackish salty water are also fully capable of triggering the reaction.",
    faq3Q: "What is the lifespan of the AquaLume?",
    faq3A: "Before activation, AquaLume can be stored dormant for over 10 years with absolutely zero charge leak or corrosion. Once water is added, the active magnesium anode provides up to 120 hours of continuous light. Individual replacement anodes can be hot-swapped in seconds.",
    faq4Q: "Is the water purification module certified?",
    faq4A: "Absolutely. Our smart container uses clinical-wavelength (275nm) UV-C LED sanitizers. This destroys the cellular DNA of bacteria, parasites, and pathogens in 60 seconds with a lab-validated 99.99% elimination rate."
  }
};
