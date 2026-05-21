import React from 'react';
import { Droplets, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0a0f1a] border-t-2 border-[#4ade80]/20 pt-16 pb-8 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center mb-16">
          <a href="#" className="flex items-center gap-2">
            <Droplets className="text-[#4ade80] w-8 h-8" />
            <span className="font-bold text-2xl tracking-wide uppercase text-white">
              AQUA<span className="text-[#4ade80]">LUME</span>
            </span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 text-center md:text-left">
          {/* Column 1 */}
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">About</h4>
            <ul className="space-y-4 text-gray-400 font-light text-sm">
              <li><a href="#" className="hover:text-[#4ade80] transition-colors">Our Mission</a></li>
              <li><a href="#" className="hover:text-[#4ade80] transition-colors">Sustainability</a></li>
              <li><a href="#" className="hover:text-[#4ade80] transition-colors">Technology</a></li>
              <li><a href="#" className="hover:text-[#4ade80] transition-colors">Careers</a></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Products</h4>
            <ul className="space-y-4 text-gray-400 font-light text-sm">
              <li><a href="#" className="hover:text-[#4ade80] transition-colors">AquaLume Pro</a></li>
              <li><a href="#" className="hover:text-[#4ade80] transition-colors">AquaLume Mini</a></li>
              <li><a href="#" className="hover:text-[#4ade80] transition-colors">Accessories</a></li>
              <li><a href="#" className="hover:text-[#4ade80] transition-colors">Support center</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Stay Updated</h4>
            <p className="text-gray-400 text-sm font-light mb-4">Join our newsletter for exclusive offers and updates.</p>
            <div className="flex w-full max-w-sm">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-[#151b27] text-white px-4 py-3 rounded-l-full flex-1 border border-white/10 focus:outline-none focus:border-[#4ade80] text-sm"
              />
              <button className="bg-[#4ade80] text-[#151b27] px-6 py-3 rounded-r-full font-bold text-sm hover:brightness-110 transition-all">
                Subscribe
              </button>
            </div>
            <div className="flex gap-4 mt-8">
              <a href="#" className="w-10 h-10 rounded-full bg-[#151b27] border border-white/5 flex items-center justify-center text-gray-400 hover:text-[#4ade80] hover:border-[#4ade80] transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#151b27] border border-white/5 flex items-center justify-center text-gray-400 hover:text-[#4ade80] hover:border-[#4ade80] transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#151b27] border border-white/5 flex items-center justify-center text-gray-400 hover:text-[#4ade80] hover:border-[#4ade80] transition-colors">
                <Twitter size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center">
          <p className="text-gray-500 text-sm font-light">
            &copy; {new Date().getFullYear()} AquaLume. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500 font-light">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
