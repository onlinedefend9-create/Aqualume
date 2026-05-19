import React from 'react';
import { LegalPage } from './LegalPage';

export const PrivacyPolicy = () => (
  <LegalPage title="Privacy Policy">
    <p>At AquaLume™, we are committed to protecting your privacy. This policy outlines how we collect, use, and safeguard your personal information when you visit our website or purchase our products.</p>
    <h2 className="text-2xl font-bold mt-8 mb-4">Information We Collect</h2>
    <p>We collect information necessary to process your orders, such as your name, email address, shipping address, and payment details.</p>
    <h2 className="text-2xl font-bold mt-8 mb-4">How We Use Your Information</h2>
    <p>Your information is used to fulfill orders, improve our service, and communicate updates about your shipment. We never share your data with third parties for marketing purposes.</p>
  </LegalPage>
);
