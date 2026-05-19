import React from 'react';
import { LegalPage } from './LegalPage';

export const ShippingPolicy = () => (
  <LegalPage title="Shipping Policy">
    <p>We take pride in our fast, worldwide shipping. We aim to process and ship all orders within 48 hours of purchase.</p>
    <h2 className="text-2xl font-bold mt-8 mb-4">Shipping Times</h2>
    <p>International shipping usually takes between 7-14 business days, depending on your location and local customs.</p>
    <h2 className="text-2xl font-bold mt-8 mb-4">Tracking</h2>
    <p>Once your order ships, you will receive a tracking number via email to monitor your package's delivery progress.</p>
  </LegalPage>
);
