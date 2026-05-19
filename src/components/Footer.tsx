import { Mail, Facebook, Instagram, Twitter, Shield, Truck, RotateCcw } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-brand-dark text-white pt-24 pb-32 border-t border-white/10">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="space-y-6 md:col-span-1">
             <a href="#" className="text-2xl font-black tracking-tighter flex items-center gap-2">
                <span className="text-white font-secondary tracking-tighter uppercase text-xl">Aqua<span className="text-primary font-black">Lume™</span></span>
             </a>
             <p className="text-gray-400 text-xs font-secondary leading-relaxed">The global standard for battery-free readiness. Engineered for survival, designed for longevity.</p>
             <div className="flex gap-4">
                <Instagram className="hover:text-primary cursor-pointer transition-colors" />
                <Twitter className="hover:text-primary cursor-pointer transition-colors" />
                <Facebook className="hover:text-primary cursor-pointer transition-colors" />
             </div>
          </div>
          
          <div className="space-y-6">
            <h4 className="font-black uppercase tracking-[0.2em] text-xs text-primary">Shop</h4>
            <ul className="space-y-3 text-sm text-gray-400 font-secondary">
              <li><a href="#how-it-works" className="hover:text-primary transition-colors">How it works</a></li>
              <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
              <li><a href="#reviews" className="hover:text-primary transition-colors">Reviews</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-black uppercase tracking-[0.2em] text-xs text-primary">Company</h4>
            <ul className="space-y-3 text-sm text-gray-400 font-secondary">
              <li><a href="/legal/privacy" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="/legal/terms" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="/legal/shipping" className="hover:text-primary transition-colors">Shipping Policy</a></li>
              <li><a href="/legal/refund" className="hover:text-primary transition-colors">Refund Policy</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-black uppercase tracking-[0.2em] text-xs text-primary">Contact</h4>
            <div className="flex items-center gap-3 text-sm text-gray-400 font-secondary">
               <Mail size={16} className="text-primary" />
               <a href="mailto:support@aqualume.com" className="hover:text-primary transition-colors">support@aqualume.com</a>
            </div>
            <p className="text-xs text-gray-500 mt-4 italic">Available 24/7 for emergency support</p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-400 font-bold uppercase tracking-[0.1em] w-full mt-4">
           <p>© 2026 AquaLume™. All rights reserved.</p>
           <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-1.5"><Shield size={12} /> Secure Checkout</div>
              <div className="flex items-center gap-1.5"><Truck size={12} /> Global Express</div>
              <div className="flex items-center gap-1.5"><RotateCcw size={12} /> 30-Day Guarantee</div>
           </div>
        </div>
      </div>
    </footer>
  );
};
