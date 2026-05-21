import React, { useState, useEffect } from 'react';
import { Droplets, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-[100] transition-all duration-300 ${isScrolled ? 'bg-[#0a0f1a]/90 backdrop-blur-md py-4 border-b border-white/10 shadow-lg' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 max-w-7xl flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <Droplets className="text-[#4ade80] w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
          <span className="font-bold text-2xl tracking-wide uppercase">
            AQUA<span className="text-[#4ade80]">LUME</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-gray-300">
          <a href="#" className="hover:text-[#4ade80] transition-colors">Home</a>
          <a href="#products" className="hover:text-[#4ade80] transition-colors">Products</a>
          <a href="#how-it-works" className="hover:text-[#4ade80] transition-colors">How It Works</a>
          <a href="#features" className="hover:text-[#4ade80] transition-colors">Features</a>
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <button className="bg-[#4ade80] text-[#151b27] px-6 py-2.5 rounded-full font-bold transition-all hover:scale-105 shadow-[0_0_15px_rgba(74,222,128,0.2)] hover:shadow-[0_0_20px_rgba(74,222,128,0.4)]">
            Get Started
          </button>
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
      <div className={`md:hidden absolute top-full left-0 w-full bg-[#0a0f1a]/95 backdrop-blur-lg border-b border-white/10 transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-80' : 'max-h-0'}`}>
        <div className="flex flex-col p-6 gap-6 text-center text-lg font-medium">
          <a href="#" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#4ade80]">Home</a>
          <a href="#products" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#4ade80]">Products</a>
          <a href="#how-it-works" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#4ade80]">How It Works</a>
          <a href="#features" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#4ade80]">Features</a>
          <button className="bg-[#4ade80] text-[#151b27] py-3 rounded-full font-bold mt-2" onClick={() => setIsMobileMenuOpen(false)}>
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
