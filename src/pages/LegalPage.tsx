import React from 'react';
import { Footer } from '../components/Footer';

interface LegalPageProps {
  title: string;
  children: React.ReactNode;
}

export const LegalPage = ({ title, children }: LegalPageProps) => {
  return (
    <div className="min-h-screen bg-white">
      <header className="py-8 border-b border-gray-100">
        <div className="container mx-auto px-6">
          <a href="/" className="text-xl font-black tracking-tighter">Aqua<span className="text-primary">Lume™</span></a>
        </div>
      </header>
      <main className="container mx-auto px-6 py-20 max-w-4xl">
        <h1 className="text-5xl font-black tracking-tighter text-brand-dark mb-10">{title}</h1>
        <div className="prose prose-brand-dark max-w-none text-gray-500 font-secondary leading-relaxed">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};
