import React, { useState, useEffect, useRef } from 'react';
import { Droplets, Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 20);
        rafRef.current = 0;
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const headerClass = isScrolled
    ? 'bg-[#0a0f1a]/90 backdrop-blur-md py-4 border-b border-white/10 shadow-lg'
    : 'bg-transparent py-6';

  return (
    <header className={`fixed top-0 w-full z-[100] transition-all duration-300 ${headerClass}`}>
      <div className="container mx-auto px-6 max-w-7xl flex justify-between items-center animate-fade-in-down">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group">
          <Droplets className="text-[#4ade80] w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
          <span className="font-bold text-2xl tracking-wide uppercase">
            AQUA<span className="text-[#4ade80]">LUME</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-gray-300">
          <a href="/#" className="hover:text-[#4ade80] transition-colors">{t.navHome}</a>
          <a href="/#about" className="hover:text-[#4ade80] transition-colors">{t.navAbout}</a>
          <a href="/#products" className="hover:text-[#4ade80] transition-colors">{t.navProducts}</a>
          <a href="/#how-it-works" className="hover:text-[#4ade80] transition-colors">{t.navHowItWorks}</a>
          <a href="/#features" className="hover:text-[#4ade80] transition-colors">{t.navFeatures}</a>
        </nav>

        {/* Language switcher & CTA (Desktop) */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-1 border border-white/10 bg-[#151b27]/80 rounded-full p-1 text-xs shadow-inner">
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 rounded-full transition-all uppercase text-[11px] font-bold tracking-wider ${
                language === 'en'
                  ? 'bg-[#4ade80] text-[#151b27] shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('fr')}
              className={`px-3 py-1 rounded-full transition-all uppercase text-[11px] font-bold tracking-wider ${
                language === 'fr'
                  ? 'bg-[#4ade80] text-[#151b27] shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              FR
            </button>
          </div>

          <a href="/#products" className="inline-block bg-[#4ade80] text-[#151b27] px-6 py-2.5 rounded-full font-bold transition-all hover:scale-105 shadow-[0_0_15px_rgba(74,222,128,0.2)] hover:shadow-[0_0_20px_rgba(74,222,128,0.4)]">
            {t.btnOrder}
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white hover:text-[#4ade80] transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-[#0a0f1a]/95 backdrop-blur-lg border-b border-white/10 transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-[500px]' : 'max-h-0'}`}>
        <div className="flex flex-col p-6 gap-6 text-center text-lg font-medium text-white">
          <a href="/#" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#4ade80]">{t.navHome}</a>
          <a href="/#about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#4ade80]">{t.navAbout}</a>
          <a href="/#products" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#4ade80]">{t.navProducts}</a>
          <a href="/#how-it-works" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#4ade80]">{t.navHowItWorks}</a>
          <a href="/#features" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#4ade80]">{t.navFeatures}</a>
          
          {/* Mobile switcher in Drawer */}
          <div className="flex justify-center my-2">
            <div className="flex items-center gap-1 border border-white/10 bg-[#151b27]/80 rounded-full p-1 text-sm shadow-inner w-fit">
              <button
                onClick={() => { setLanguage('en'); setIsMobileMenuOpen(false); }}
                className={`px-4 py-1.5 rounded-full transition-all uppercase text-xs font-bold tracking-wider ${
                  language === 'en'
                    ? 'bg-[#4ade80] text-[#151b27] shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                English (EN)
              </button>
              <button
                onClick={() => { setLanguage('fr'); setIsMobileMenuOpen(false); }}
                className={`px-4 py-1.5 rounded-full transition-all uppercase text-xs font-bold tracking-wider ${
                  language === 'fr'
                    ? 'bg-[#4ade80] text-[#151b27] shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Français (FR)
              </button>
            </div>
          </div>

          <a href="/#products" className="block w-full bg-[#4ade80] text-[#151b27] py-3 rounded-full font-bold mt-2 text-center" onClick={() => setIsMobileMenuOpen(false)}>
            {t.btnOrder}
          </a>
        </div>
      </div>
    </header>
  );
};

export default React.memo(Navbar);
