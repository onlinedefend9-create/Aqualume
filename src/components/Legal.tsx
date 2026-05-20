import React from "react";
import { X, ShieldCheck, Scale, FileText, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface LegalPageProps {
  isOpen: boolean;
  onClose: () => void;
  initialSection?: "privacy" | "terms" | "legal" | "refund";
}

export const LegalPage: React.FC<LegalPageProps> = ({ isOpen, onClose, initialSection = "legal" }) => {
  const [activeTab, setActiveTab] = React.useState(initialSection);

  const tabs = [
    { id: "legal" as const, label: "Legal Notice", icon: ShieldCheck },
    { id: "terms" as const, label: "Terms & Conditions", icon: Scale },
    { id: "privacy" as const, label: "Privacy Policy", icon: FileText },
    { id: "refund" as const, label: "Refund Policy", icon: RefreshCw },
  ];

  const content = {
    legal: (
      <div className="space-y-6">
        <section>
          <h3 className="text-xl font-bold text-white mb-3">1. Identification</h3>
          <p className="text-muted-foreground leading-relaxed">
            AquaLume is a brand operated by <strong>AquaLume Technologies S.A.S.</strong> <br />
            Registered Capital: 50,000 EUR <br />
            Registration Number: RCS London 842 931 022 <br />
            VAT Identification: GB 923 102 244 <br />
            Registered Office: 24 High Street, London, EC1A 1BB, UK.
          </p>
        </section>
        <section>
          <h3 className="text-xl font-bold text-white mb-3">2. Publication & Hosting</h3>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Director of Publication:</strong> Marc Henderson, CEO. <br />
            <strong>Web Hosting:</strong> Google Cloud Platform (GCP) - Europe-West Region. <br />
            <strong>Contact:</strong> legal@aqualume.tech
          </p>
        </section>
        <section>
          <h3 className="text-xl font-bold text-white mb-3">3. Intellectual Property</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">
            Pursuant to Intellectual Property laws, the structure of the site and all its components (text, graphics, logos, images, videos) are the property of AquaLume Technologies. Any reproduction, representation, or distribution, in whole or in part, without the express written consent of the publisher is strictly prohibited.
          </p>
        </section>
      </div>
    ),
    terms: (
      <div className="space-y-6">
        <section>
          <h3 className="text-xl font-bold text-white mb-3">1. Scope of Application</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">
            These General Terms and Conditions of Sale (GTCS) apply, without restriction or reservation, to all sales concluded by the Vendor with non-professional buyers ("the Customers") wishing to acquire the products offered for sale via the website.
          </p>
        </section>
        <section>
          <h3 className="text-xl font-bold text-white mb-3">2. Order and Payment</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">
            Orders are validated upon receipt of full payment. Payment is processed via encrypted gateways (PCI-DSS compliant). In accordance with Article L132-2 of the Monetary and Financial Code, the commitment to pay given by card is irrevocable.
          </p>
        </section>
        <section>
          <h3 className="text-xl font-bold text-white mb-3">3. Legal Warranties</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">
            All products are covered by the <strong>Legal Warranty of Conformity</strong> (Article L217-4 and following) and the <strong>Warranty against Hidden Defects</strong> (Articles 1641 to 1649 of the Civil Code), allowing the Customer to return defective or non-conforming products delivered.
          </p>
        </section>
      </div>
    ),
    privacy: (
      <div className="space-y-6">
        <section>
          <h3 className="text-xl font-bold text-white mb-3">GDPR Compliance</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">
            AquaLume Technologies processes personal data in accordance with <strong>Regulation (EU) 2016/679 (General Data Protection Regulation - GDPR)</strong>. 
          </p>
        </section>
        <section>
          <h3 className="text-xl font-bold text-white mb-3">Data Collection & Rights</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">
            Data collected includes: Name, Address, Email, and IP Address for logistics and security. 
            Pursuant to the GDPR, you have the right to access, rectify, port, and erase your personal data. To exercise these rights, please contact our Data Protection Officer (DPO) at dpo@aqualume.tech.
          </p>
        </section>
      </div>
    ),
    refund: (
      <div className="space-y-6">
        <section>
          <h3 className="text-xl font-bold text-white mb-3">Right of Withdrawal</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">
             In accordance with <strong>Article L221-18 of the Consumer Code</strong>, you have a period of 14 days from receipt of the product to exercise your right of withdrawal without having to justify your reasons or pay any penalties.
          </p>
        </section>
        <section>
          <h3 className="text-xl font-bold text-white mb-3">Return Conditions</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">
            Returns must be made in their original condition and complete (packaging, accessories, instructions). The customer is responsible for return shipping costs. Refunds are processed within 14 days of receipt of the returned item.
          </p>
        </section>
      </div>
    ),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/95 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-card border border-border w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  {React.createElement(tabs.find(t => t.id === activeTab)?.icon || FileText, { className: "text-primary w-6 h-6" })}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white leading-tight">Legal Center</h2>
                  <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">AquaLume Security Compliance</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
              {/* Sidebar Tabs */}
              <div className="w-full md:w-64 border-r border-border p-4 bg-muted/30 overflow-x-auto md:overflow-y-auto flex md:flex-col gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap md:whitespace-normal
                      ${activeTab === tab.id 
                        ? 'bg-primary text-brand-dark shadow-lg shadow-primary/20' 
                        : 'text-muted-foreground hover:bg-muted hover:text-white'}`}
                  >
                    <tab.icon size={18} />
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Main Text */}
              <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className="prose prose-invert max-w-none"
                >
                  <h1 className="text-3xl font-black text-white mb-6 uppercase tracking-tighter">
                    {tabs.find(t => t.id === activeTab)?.label}
                  </h1>
                  {content[activeTab]}
                </motion.div>
                
                <div className="mt-12 pt-8 border-t border-border/50">
                  <p className="text-xs text-muted-foreground italic">
                    Last update: May 2024. For any further questions, please use our support portal.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
