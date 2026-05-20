/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  Zap, 
  Droplets, 
  Battery, 
  ShieldCheck, 
  CheckCircle2, 
  ChevronDown, 
  Clock,
  Navigation,
  Wind,
  Star,
  Quote,
  ArrowRight,
  Shield,
  Truck,
  Leaf,
  Lightbulb,
  CirclePlus,
  RotateCcw,
  Mail,
  Headset,
  X,
  AlertCircle,
  Activity,
  Globe,
  Lock,
  Compass
} from "lucide-react";
import React, { useState, useEffect, useMemo } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Checkout } from "./components/Checkout";
import { Footer } from "./components/Footer";
import { LegalPage } from "./components/Legal";
import { ChatInterface } from "./components/ChatInterface";

// Asset Imports
import heroImage from "./assets/images/aqualume_product_shot_premium_1779219202665.png";
import blackoutImage from "./assets/images/aqualume_lifestyle_survival_expert_1779219222506.png";
import rainSurvivalImage from "./assets/images/aqualume_rain_waterproof_action_1779194224010.png";
import nightTentImage from "./assets/images/aqualume_lifestyle_tent_night_1779194171975.png";
import techDiagram from "./assets/images/aqualume_technical_diagram_element_1779219238572.png";
import step1Img from "./assets/images/aqualume_gear_setup_survival_1779194209010.png";
import step2Img from "./assets/images/aqualume_macro_led_detail_1779194241704.png";
import step3Img from "./assets/images/aqualume_hero_cinematic_v2_1779194153162.png";

// Components
const VectorDots = () => (
  <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-10">
    <pattern id="dotPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.5" fill="currentColor" />
    </pattern>
    <rect width="100%" height="100%" fill="url(#dotPattern)" />
  </svg>
);

const TrustBadge = ({ icon, text }: { icon: React.ReactNode, text: string }) => (
  <div className="flex items-center gap-3 px-6 py-4 glass rounded-3xl border border-white/20 shadow-xl shadow-black/5 animate-fade-in">
    <div className="text-primary">{icon}</div>
    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-dark">{text}</span>
  </div>
);

const FAQItem = ({ question, subtitle, answer }: { question: string, subtitle?: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 py-8 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-start text-left py-2 hover:text-primary transition-all group"
      >
        <div className="space-y-2">
          {subtitle && <span className="text-[10px] uppercase font-black tracking-widest text-primary opacity-60 block">{subtitle}</span>}
          <span className="block text-xl md:text-2xl font-black text-brand-dark group-hover:translate-x-1 transition-transform tracking-tighter leading-none">{question}</span>
        </div>
        <div className={`mt-2 p-2 rounded-full transition-all duration-500 ${isOpen ? 'rotate-180 bg-primary/10 text-primary' : 'bg-gray-50 text-gray-300'}`}>
          <ChevronDown className="w-5 h-5" />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="py-6 text-gray-500 text-lg leading-relaxed font-secondary">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [legalState, setLegalState] = useState<{ isOpen: boolean; section: "privacy" | "terms" | "legal" | "refund" }>({
    isOpen: false,
    section: "legal"
  });
  const { scrollY } = useScroll();
  const buyButtonOpacity = useTransform(scrollY, [600, 800], [0, 1]);
  const buyButtonY = useTransform(scrollY, [600, 800], [20, 0]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCheckout = () => {
    setIsCheckoutOpen(true);
  };

  const getPayPalClientId = () => {
    // Check for environment variable
    const envId = import.meta.env.VITE_PAYPAL_CLIENT_ID;
    // Standard Sandbox testing ID - very reliable for demos
    const defaultId = "test";
    
    // Validate the ID
    if (envId && envId.trim() !== "" && envId.length > 10) {
      return envId;
    }
    
    return defaultId;
  };

  const paypalOptions = useMemo(() => ({
    clientId: getPayPalClientId(),
    currency: "USD",
    intent: "capture",
    components: "buttons",
    // Adding a generic test data attribute for better compatibility in sandboxed environments
    "data-sdk-integration-source": "button-factory"
  }), []);

  const pathname = window.location.pathname;
  // Handle paths if needed, or stick to single page app state

  return (
    <PayPalScriptProvider options={paypalOptions}>
      <div className="min-h-screen bg-white">
        <Checkout 
          isOpen={isCheckoutOpen} 
          onClose={() => setIsCheckoutOpen(false)} 
          price="35.00" 
          currency="USD" 
        />
        <LegalPage 
          isOpen={legalState.isOpen}
          onClose={() => setLegalState(prev => ({ ...prev, isOpen: false }))}
          initialSection={legalState.section}
        />
        <ChatInterface />
      {/* Navigation */}
      <header className={`fixed top-0 w-full z-[60] transition-all duration-500 ${isScrolled ? 'glass py-3 shadow-lg shadow-black/5 text-brand-dark' : 'bg-transparent py-8 text-white'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="#" className="text-2xl font-black tracking-tighter flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30" aria-hidden="true">
              <Droplets className="text-brand-dark w-6 h-6" />
            </div>
            <span className="text-current font-sans tracking-tighter uppercase text-xl">Aqua<span className="text-primary font-black">Lume™</span></span>
          </a>
          <div className="flex items-center gap-6">
            <nav className={`hidden lg:flex items-center gap-8 text-sm font-bold ${isScrolled ? 'text-gray-400' : 'text-gray-300'}`} aria-label="Main Navigation">
               <a href="#how-it-works" className={`hover:text-primary transition-colors ${isScrolled ? 'hover:text-brand-dark' : 'hover:text-primary'}`}>How it works</a>
               <a href="#features" className={`hover:text-primary transition-colors ${isScrolled ? 'hover:text-brand-dark' : 'hover:text-primary'}`}>Features</a>
               <a href="#reviews" className={`hover:text-primary transition-colors ${isScrolled ? 'hover:text-brand-dark' : 'hover:text-primary'}`}>Reviews</a>
            </nav>
            <button 
              onClick={handleCheckout}
              aria-label="Order AquaLume now"
              className={`px-8 py-3 rounded-full text-sm font-black transition-all hover:scale-105 active:scale-95 shadow-xl ${isScrolled ? 'bg-brand-dark text-white shadow-black/10' : 'bg-white text-brand-dark shadow-white/10'}`}
            >
              Get Yours Now
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* 1. Hero Section - Cinematic Upgrade */}
        <section className="relative pt-32 pb-16 md:pt-48 md:pb-32 overflow-hidden bg-brand-dark">
          <div className="absolute top-0 right-0 p-20 opacity-5 select-none pointer-events-none text-white">
            <VectorDots />
          </div>
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="space-y-8 max-w-5xl"
              >
                <div className="flex justify-center gap-4 flex-wrap">
                   <div className="flex items-center gap-3 px-6 py-4 glass-dark rounded-3xl border border-white/10 shadow-2xl animate-fade-in backdrop-blur-xl">
                      <div className="text-primary"><Activity size={12} /></div>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Survival Innovation</span>
                   </div>
                   <div className="flex items-center gap-3 px-6 py-4 glass-dark rounded-3xl border border-white/10 shadow-2xl animate-fade-in backdrop-blur-xl">
                      <div className="text-primary"><Globe size={12} /></div>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Worldwide Shipping</span>
                   </div>
                </div>
                <h1 className="text-6xl md:text-[9rem] font-black text-white leading-[0.85] tracking-tighter">
                  No Batteries. <br /> Just <span className="text-primary italic animate-pulse">Salt + Water.</span>
                </h1>
                <p className="text-gray-400 text-xl md:text-3xl max-w-3xl mx-auto font-secondary leading-relaxed font-light">
                  Meet AquaLume™. The ultimate survival-tech light. Engineered for emergency readiness, outdoor reliability, and battery-free innovation. 
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-8">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCheckout}
                    className="btn-primary px-16 py-8 text-2xl w-full sm:w-auto shadow-[0_30px_70px_rgba(162,214,54,0.4)] group"
                  >
                    Get Yours Now <ArrowRight size={32} className="group-hover:translate-x-2 transition-transform" />
                  </motion.button>
                  <div className="flex items-center gap-6 text-left p-2 glass-dark rounded-full pr-8 border border-white/5 backdrop-blur-xl">
                    <div className="flex -space-x-4">
                      {[1,2,3,4,5].map(i => (
                        <img key={i} src={`https://i.pravatar.cc/150?u=user${i+88}`} className="w-12 h-12 rounded-full border-4 border-brand-dark shadow-xl" alt="Reviewer" />
                      ))}
                    </div>
                    <div>
                      <div className="flex gap-0.5 text-primary">
                        {[...Array(5)].map((_, i) => <Star key={i} size={10} className="fill-current" />)}
                      </div>
                      <p className="text-[10px] font-black text-white uppercase tracking-widest mt-1">2,400+ Trusted Reviews</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "circOut", delay: 0.2 }}
                className="relative w-full max-w-6xl group mt-10"
              >
                <div className="absolute inset-0 bg-primary/20 blur-[150px] rounded-full scale-90 -z-10 animate-pulse" />
                <div className="relative rounded-[4rem] md:rounded-[6rem] overflow-hidden shadow-[0_100px_200px_-50px_rgba(0,0,0,0.8)] border-[1px] border-white/10 group-hover:shadow-[0_120px_250px_-60px_rgba(162,214,54,0.3)] transition-all duration-1000">
                  <img 
                    src={heroImage} 
                    alt="AquaLume Master Product Render" 
                    className="w-full h-auto transform group-hover:scale-105 transition-transform duration-[4s] ease-out"
                    loading="eager"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Glassmorphism Floating Tech Overlay */}
                  <div className="absolute top-12 right-12 hidden md:block">
                    <div className="glass-dark px-8 py-6 rounded-[3rem] border border-white/10 shadow-2xl space-y-2 backdrop-blur-3xl">
                      <p className="text-[11px] font-black uppercase text-primary tracking-[0.3em]">Proprietary Tech</p>
                      <p className="text-xl font-black text-white leading-tight">100% Electrolytic <br /> Power Delivery</p>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-12 left-12 hidden md:block text-left">
                    <div className="glass-dark p-10 rounded-[4rem] border border-white/10 shadow-2xl space-y-6 backdrop-blur-3xl">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-[1.5rem] bg-primary/10 flex items-center justify-center text-primary"><Zap size={24} /></div>
                        <div className="w-12 h-12 rounded-[1.5rem] bg-primary/10 flex items-center justify-center text-primary"><Droplets size={24} /></div>
                        <div className="w-12 h-12 rounded-[1.5rem] bg-primary/10 flex items-center justify-center text-primary"><ShieldCheck size={24} /></div>
                      </div>
                      <div>
                        <p className="text-3xl font-black text-white tracking-tighter">IP67 Waterproof</p>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-[0.2em] mt-1">Engineered for extreme survival</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 2. Trust Bar - Minimal Tech Logos */}
        <section className="bg-white border-y border-gray-100 py-16 overflow-hidden">
          <div className="container mx-auto px-6">
             <p className="text-center text-[10px] font-black uppercase tracking-[0.5em] text-gray-300 mb-12">The global standard for battery-free readiness</p>
             <div className="flex flex-wrap justify-center gap-16 md:gap-32 opacity-20 grayscale items-center contrast-125">
                <span className="text-3xl font-black text-brand-dark italic">KICKSTARTER</span>
                <span className="text-3xl font-black text-brand-dark tracking-tighter">EXPLORE<Activity className="inline ml-1" /></span>
                <span className="text-3xl font-black text-brand-dark tracking-[0.2em]">GEAR LAB</span>
                <span className="text-3xl font-black text-brand-dark">SURVIVAL.CO</span>
                <span className="text-3xl font-black text-brand-dark italic">MODERN.</span>
             </div>
          </div>
        </section>

        {/* 3. Emotional Storytelling - Cinematic Sections */}
        <section className="section-padding bg-gray-50 overflow-hidden">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="text-center space-y-4 mb-20">
               <span className="text-[10px] font-black uppercase tracking-[0.6em] text-primary">Reliability Matters</span>
               <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-brand-dark">Light that waits <br /> for <span className="italic">you.</span></h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
              {/* Feature 1: Family Blackout Emergency */}
              <motion.div 
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 50 }}
                viewport={{ once: true }}
                className="md:col-span-12 relative rounded-[4rem] md:rounded-[6rem] overflow-hidden group h-[600px] md:h-[800px]"
              >
                <img 
                  src={blackoutImage} 
                  alt="AquaLume Emergency Blackout Safety" 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[5s] ease-out"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                <div className="absolute bottom-16 left-8 md:bottom-24 md:left-24 space-y-8 max-w-4xl">
                  <div className="inline-flex items-center gap-3 px-6 py-3 glass rounded-full border border-white/20">
                    <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-white">Trust Certified: Emergency Ready</span>
                  </div>
                  <h3 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter">Safety for what <br /> matters most.</h3>
                  <p className="text-gray-300 font-secondary text-lg md:text-2xl max-w-2xl leading-relaxed">When the grid fails, your family shouldn't be left in the dark. AquaLume™ provides immediate, dependable safety without the anxiety of dead batteries.</p>
                  <button onClick={handleCheckout} className="btn-primary w-fit px-12 group">Protect My Home <ArrowRight className="group-hover:translate-x-2 transition-transform" /></button>
                </div>
              </motion.div>

              {/* Feature 2: Rain/Wilderness Survival */}
              <motion.div 
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: -50 }}
                viewport={{ once: true }}
                className="md:col-span-7 relative rounded-[4rem] group overflow-hidden h-[500px] md:h-[700px]"
              >
                <img 
                  src={rainSurvivalImage} 
                  alt="AquaLume Wet Outdoor Survival" 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[3s]"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                <div className="absolute bottom-12 left-12 space-y-4 right-12">
                   <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase text-white tracking-widest border border-white/10">Expedition Spec</span>
                  <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter">Thrives where <br /> others fail.</h3>
                  <p className="text-gray-400 font-secondary text-lg leading-relaxed max-w-lg">Engineered for the humidity of the jungle and the damp of the forest floor. Completely waterproof, rust-resistant, and ready for any storm.</p>
                </div>
              </motion.div>

              {/* Feature 3: Tactical/Waterproof */}
              <motion.div 
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: 50 }}
                viewport={{ once: true }}
                className="md:col-span-5 relative rounded-[4rem] group overflow-hidden h-[500px] md:h-[700px]"
              >
                <img 
                  src={nightTentImage} 
                  alt="Waterproof Performance" 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[3s]"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                <div className="absolute bottom-12 left-12 space-y-4 right-12">
                  <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter">IP67 Tough.</h3>
                  <p className="text-gray-400 font-secondary text-lg leading-relaxed">Built for the rain. The sealed electrolytic chamber prevents moisture from damaging internal chips. It thrives in conditions that destroy standard gear.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 4. Technical Dive - Apple Style Product Reveal */}
        <section className="section-padding bg-brand-dark relative overflow-hidden">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="relative group">
                 <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full scale-125 -z-10 animate-pulse" />
                 <div className="relative rounded-[4rem] overflow-hidden border border-white/5 shadow-2xl shadow-black/80">
                    <img 
                      src={techDiagram} 
                      alt="AquaLume Technical Specs Diagram" 
                      className="w-full h-auto transform group-hover:scale-105 transition-transform duration-[3s] ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-10 left-10 right-10 flex border-t border-white/10 pt-8 gap-10">
                       <div className="space-y-1">
                          <p className="text-[9px] font-black text-primary uppercase tracking-[0.3em]">Magnesium Core</p>
                          <p className="text-white text-lg font-black tracking-tighter">99.9% Purity</p>
                       </div>
                       <div className="space-y-1">
                          <p className="text-[9px] font-black text-primary uppercase tracking-[0.3em]">Voltage Stability</p>
                          <p className="text-white text-lg font-black tracking-tighter">3.7V Peak</p>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="space-y-12">
                <div className="space-y-6">
                   <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">Technical Superiority</span>
                   <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
                     Energy from <br /> <span className="text-primary italic italic animate-pulse">Salt Ions.</span>
                   </h2>
                   <p className="text-gray-400 font-secondary text-xl leading-relaxed">
                     By leveraging the natural conductivity of salts, AquaLume™ creates a high-efficiency electrolyte reaction that powers high-density LED arrays. It’s not just a light; it’s a portable power plant.
                   </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="p-8 glass-dark rounded-[2.5rem] space-y-4 border border-white/5 hover:border-white/20 transition-all">
                      <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary"><ShieldCheck size={28} /></div>
                      <h4 className="text-xl font-black text-white tracking-tight leading-none uppercase tracking-tighter">Zero Charge Loss</h4>
                      <p className="text-gray-500 text-sm font-secondary">Dormant magnesium doesn't degrade. 10+ year shelf life guaranteed.</p>
                   </div>
                   <div className="p-8 glass-dark rounded-[2.5rem] space-y-4 border border-white/5 hover:border-white/20 transition-all">
                      <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary"><Zap size={28} /></div>
                      <h4 className="text-xl font-black text-white tracking-tight leading-none uppercase tracking-tighter">Instant On</h4>
                      <p className="text-gray-500 text-sm font-secondary">No solar panels to deploy or cranks to turn. Light in 5 seconds.</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. How It Works - Premium 3-Step */}
        <section id="how-it-works" className="section-padding bg-white relative overflow-hidden">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="max-w-4xl mx-auto text-center space-y-6 mb-24">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">Simple Innovation</span>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none text-brand-dark">Light in seconds. <br /> <span className="text-gray-200">Zero batteries.</span></h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-12 relative">
              <div className="absolute top-1/2 left-0 w-full h-px bg-gray-100 -z-10 hidden md:block" />
              {[
                { 
                  step: "01", 
                  title: "Add Saltwater", 
                  desc: "Pour 15g of salt and 300ml of water into the chemical chamber.", 
                  icon: <Droplets className="w-12 h-12" />,
                  img: step1Img
                },
                { 
                  step: "02", 
                  title: "Activate", 
                  desc: "Shake gently to initiate the electrolytic reaction instantly.", 
                  icon: <RotateCcw className="w-12 h-12" />,
                  img: step2Img
                },
                { 
                  step: "03", 
                  title: "Steady Light", 
                  desc: "Enjoy up to 120 hours of high-performance LED brightness.", 
                  icon: <Zap className="w-12 h-12" />,
                  img: step3Img
                }
              ].map((s, i) => (
                <div key={i} className="group text-center space-y-10">
                   <div className="relative mx-auto w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-8 border-gray-50 shadow-2xl group-hover:scale-105 transition-transform duration-700">
                      <img src={s.img} alt={s.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                         <span className="text-6xl font-black text-white">{s.step}</span>
                      </div>
                   </div>
                   <div className="space-y-4 px-6">
                      <h4 className="text-3xl font-black tracking-tighter text-brand-dark group-hover:text-primary transition-colors">{s.title}</h4>
                      <p className="text-gray-400 font-secondary text-lg leading-relaxed">{s.desc}</p>
                   </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Benefits Bento Box - Modern Grid */}
        <section id="features" className="section-padding bg-gray-50">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-24">
               <div className="space-y-6 max-w-2xl text-left">
                  <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">Performance Specs</span>
                  <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-brand-dark leading-none">Built for <br /> the extreme.</h2>
               </div>
               <div className="hidden md:flex gap-4">
                  <div className="w-20 h-20 rounded-full border border-gray-200 flex items-center justify-center text-gray-300 animate-spin-slow">
                    <Activity size={32} />
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
               <div className="md:col-span-3 bg-white p-12 rounded-[4rem] border border-gray-100 flex flex-col justify-between hover:shadow-2xl transition-all group overflow-hidden relative">
                  <div className="absolute -top-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Wind size={240} />
                  </div>
                  <div className="space-y-10 relative">
                    <div className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center text-primary group-hover:rotate-12 transition-transform duration-500">
                      <Wind size={40} />
                    </div>
                    <div className="space-y-4">
                       <h3 className="text-3xl md:text-5xl font-black tracking-tighter text-brand-dark">Storm Tested. <br /> IP67 Armor.</h3>
                       <p className="text-gray-500 font-secondary text-xl max-w-md">Fully operational in heavy rain, extreme humidity, and salty coastal air. Built rugged for survival.</p>
                    </div>
                  </div>
               </div>

               <div className="md:col-span-3 bg-brand-dark p-12 rounded-[4rem] border border-white/5 flex flex-col justify-between group overflow-hidden relative shadow-2xl">
                  <div className="absolute -bottom-20 -left-20 opacity-10 group-hover:opacity-20 transition-all duration-1000 rotate-12">
                    <Zap size={300} className="fill-primary" />
                  </div>
                  <div className="space-y-10 relative">
                    <div className="w-20 h-20 bg-white/10 rounded-[2rem] flex items-center justify-center text-primary backdrop-blur-md">
                      <Activity size={40} />
                    </div>
                    <div className="space-y-4">
                       <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter">Infinite Ready. <br /> Zero Decay.</h3>
                       <p className="text-gray-400 font-secondary text-xl max-w-md">Unlike Li-ion batteries that leak over time, WATTer LAMP™ remains dormant until activated. Years in storage, seconds to light.</p>
                    </div>
                  </div>
               </div>

               <div className="md:col-span-2 bg-white p-10 rounded-[4rem] border border-gray-100 flex flex-col items-center text-center space-y-6 hover:shadow-xl transition-all group">
                  <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center text-primary"><Clock size={32} /></div>
                  <h4 className="text-2xl font-black tracking-tight text-brand-dark leading-none">120H Pulse</h4>
                  <p className="text-gray-400 text-sm font-secondary">Over 5 days of continuous light from a single activation.</p>
               </div>

               <div className="md:col-span-2 bg-white p-10 rounded-[4rem] border border-gray-100 flex flex-col items-center text-center space-y-6 hover:shadow-xl transition-all group">
                  <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center text-primary"><Leaf size={32} /></div>
                  <h4 className="text-2xl font-black tracking-tight text-brand-dark leading-none">Eco Core</h4>
                  <p className="text-gray-400 text-sm font-secondary">Zero lithium. Zero heavy metals. Sustainably powered by electrolyte chemistry.</p>
               </div>

               <div className="md:col-span-2 bg-white p-10 rounded-[4rem] border border-gray-100 flex flex-col items-center text-center space-y-6 hover:shadow-xl transition-all group">
                  <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center text-primary"><Navigation size={32} /></div>
                  <h4 className="text-2xl font-black tracking-tight text-brand-dark leading-none">Portability</h4>
                  <p className="text-gray-400 text-sm font-secondary">Featherweight design at only 220g. Fits in any pack.</p>
               </div>
            </div>
          </div>
        </section>


      {/* 6. Social Proof - Compact & Premium Review Cards */}
      <section id="reviews" className="section-padding bg-white overflow-hidden py-24">
        <div className="container mx-auto px-6 max-w-7xl">
           <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-16">
               <div className="space-y-4 max-w-2xl text-left">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Global Vetting</span>
                  <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-brand-dark leading-none">Trusted in <br /> conditions.</h2>
               </div>
               <div className="flex items-center gap-2 group cursor-pointer pb-2">
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-300 group-hover:text-primary transition-colors border-b border-gray-100 pb-1">View 2,400+ Reports</span>
                  <ArrowRight size={16} className="text-gray-200 group-hover:text-primary group-hover:translate-x-1 transition-all" />
               </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { 
                  name: "Megan R.", 
                  loc: "PNW", 
                  txt: "Total lifesaver during our coastal storm. Batteries were dead, but salt was in the back. Simple physics for peace of mind.", 
                  img: "https://i.pravatar.cc/150?u=user1",
                  tag: "Emergency"
                },
                { 
                  name: "Jason L.", 
                  loc: "Rockies", 
                  txt: "I leave it in my alpine go-bag 24/7. Knowing it won't leak or lose charge after years is everything.", 
                  img: "https://i.pravatar.cc/150?u=user2",
                  tag: "Survival"
                },
                { 
                  name: "Emily K.", 
                  loc: "Moab", 
                  txt: "The light fill is incredibly warm. We used it inside our tent during the desert frost nights. Flawless.", 
                  img: "https://i.pravatar.cc/150?u=user3",
                  tag: "Camping"
                },
                { 
                  name: "Marcus T.", 
                  loc: "Austin", 
                  txt: "Real tactical build quality. This isn't a plastic toy—it's a deliberate piece of survival engineering.", 
                  img: "https://i.pravatar.cc/150?u=user4",
                  tag: "Off-Grid"
                }
              ].map((rev, i) => (
                <motion.div 
                  whileHover={{ y: -5 }}
                  key={i} 
                  className="bg-gray-50/50 p-6 rounded-[2rem] border border-gray-100 flex flex-col justify-between group h-full hover:bg-white hover:shadow-2xl hover:shadow-black/5 transition-all"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                       <img src={rev.img} alt={rev.name} className="w-10 h-10 rounded-full border border-white shadow-sm" />
                       <div className="text-left font-secondary">
                          <p className="text-xs font-black tracking-tight text-brand-dark">{rev.name}</p>
                          <p className="text-[9px] uppercase font-bold text-gray-300 tracking-widest leading-none">{rev.loc}</p>
                       </div>
                    </div>
                    <div className="flex gap-0.5 text-primary">
                      {[...Array(5)].map((_, j) => <Star key={j} size={8} className="fill-current" />)}
                    </div>
                    <p className="text-gray-500 font-secondary text-[13px] leading-snug text-left">"{rev.txt}"</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                     <span className="text-[8px] font-black uppercase text-gray-300 tracking-[0.2em] px-2 py-0.5 bg-white rounded-full border border-gray-50">{rev.tag}</span>
                     <div className="flex items-center gap-1">
                        <CheckCircle2 size={10} className="text-primary" />
                        <span className="text-[8px] font-black text-primary/50 uppercase">Verified</span>
                     </div>
                  </div>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* 7. FAQ & Trust Section */}
      <section className="section-padding bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-24 items-start">
            <div className="space-y-12 lg:sticky lg:top-32">
                <div className="space-y-10 text-center lg:text-left">
                  <div className="space-y-6">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">Support Center</span>
                    <h2 className="text-6xl md:text-8xl font-black text-brand-dark tracking-tighter leading-none">Answers for <br /> explorers.</h2>
                    <p className="font-secondary text-gray-400 text-xl max-w-xl leading-relaxed">AquaLume™ is built for real-world stress—camping, storms, and survival. No gimmicks, just physics.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-xl shadow-black/5 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 group">
                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-foreground transition-colors"><Headset size={24} /></div>
                        <span className="text-sm font-black text-brand-dark uppercase tracking-widest">24/7 Global Support</span>
                     </div>
                     <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-xl shadow-black/5 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 group">
                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-foreground transition-colors"><Lock size={24} /></div>
                        <span className="text-sm font-black text-brand-dark uppercase tracking-widest">30-Day Guarantee</span>
                     </div>
                  </div>
                </div>
            </div>

            <div className="space-y-2 bg-white p-6 md:p-16 rounded-[4rem] md:rounded-[6rem] shadow-2xl shadow-black/5 border border-gray-100">
               <FAQItem 
                subtitle="Electrolysis 101"
                question="How does AquaLume™ work?"
                answer="It uses an electrolytic reaction between salt ions, water, and our proprietary Magnesium core to generate direct current. Zero external charging—just raw chemistry."
               />
               <FAQItem 
                subtitle="Lifecycle"
                question="How long until it needs refill?"
                answer="A single saltwater activation provides up to 120 hours of high-efficiency light. Once spent, you simply replace the saltwater to continue."
               />
               <FAQItem 
                subtitle="Engineering"
                question="Can it survive a deep drop?"
                answer="The IP67 reinforced polymer casing is drop-tested up to 3 meters. It’s built to handle forest floors and rocky terrains."
               />
               <FAQItem 
                subtitle="Sustainability"
                question="Is it safe for the environment?"
                answer="Yes. We eliminate the toxic heavy metals found in standard batteries. AquaLume™ is 100% recyclable and battery-waste free."
               />
               <div className="pt-12">
                  <button onClick={handleCheckout} className="btn-primary w-full shadow-2xl group">
                    Get Ready Now <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                  </button>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Global Trust Section (International Buyers) */}
      <section className="py-20 bg-white overflow-hidden border-y border-gray-100">
        <div className="container mx-auto px-6 max-w-7xl">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center opacity-40">
              <div className="space-y-4 group cursor-default">
                 <Globe className="mx-auto w-10 h-10 group-hover:text-primary transition-colors" />
                 <p className="text-[10px] font-black uppercase tracking-[0.3em]">International Shipping</p>
              </div>
              <div className="space-y-4 group cursor-default">
                 <ShieldCheck className="mx-auto w-10 h-10 group-hover:text-primary transition-colors" />
                 <p className="text-[10px] font-black uppercase tracking-[0.3em]">Secure Auth-Pay</p>
              </div>
              <div className="space-y-4 group cursor-default">
                 <Activity className="mx-auto w-10 h-10 group-hover:text-primary transition-colors" />
                 <p className="text-[10px] font-black uppercase tracking-[0.3em]">Lifetime Readiness</p>
              </div>
              <div className="space-y-4 group cursor-default">
                 <Compass className="mx-auto w-10 h-10 group-hover:text-primary transition-colors" />
                 <p className="text-[10px] font-black uppercase tracking-[0.3em]">Veteran Engineered</p>
              </div>
           </div>
        </div>
      </section>

      {/* 9. Final CTA - Dark Aesthetic Cinematic */}
      <section id="checkout-now" className="section-padding bg-black text-white relative overflow-hidden py-32 md:py-64">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542156822-6924d1a71ace?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-20 filter grayscale"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black"></div>
        <div className="absolute -top-48 -left-48 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute -bottom-48 -right-48 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] animate-pulse animation-delay-2000"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
            <motion.div 
               whileInView={{ opacity: 1, scale: 1 }}
               initial={{ opacity: 0, scale: 0.95 }}
               viewport={{ once: true }}
               className="space-y-12"
            >
               <div className="flex justify-center gap-2 mb-8">
                 {[...Array(5)].map((_, i) => <Star key={i} className="w-8 h-8 fill-primary text-primary" />)}
               </div>
               <h2 className="text-white text-6xl md:text-[10rem] font-black max-w-6xl mx-auto leading-[0.85] tracking-tighter">
                Be Ready <br /> <span className="text-primary italic">Anywhere.</span>
               </h2>
               <p className="text-gray-400 max-w-3xl mx-auto font-secondary text-2xl md:text-4xl font-light leading-relaxed">Safety is the one thing you can't afford to buy <span className="text-white font-bold italic">too late.</span></p>
               
               <div className="flex flex-col md:flex-row gap-8 justify-center pt-10">
                  <button onClick={handleCheckout} className="btn-primary px-16 py-8 text-3xl shadow-[0_40px_100px_rgba(162,214,54,0.4)] group">
                    Secure My AquaLume™ <ArrowRight size={40} className="group-hover:translate-x-3 transition-transform" />
                  </button>
               </div>

               <div className="pt-16 space-y-10">
                  <div className="flex flex-wrap justify-center gap-16 opacity-40 hover:opacity-100 transition-opacity duration-1000">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-8 w-auto object-contain opacity-70 hover:opacity-100 hover:scale-105 transition-all duration-300" loading="lazy" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-8 w-auto object-contain brightness-0 invert opacity-70 hover:opacity-100 hover:scale-105 transition-all duration-300" loading="lazy" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="MasterCard" className="h-8 w-auto object-contain brightness-0 invert opacity-70 hover:opacity-100 hover:scale-105 transition-all duration-300" loading="lazy" />
                  </div>
                  <div className="flex items-center justify-center gap-8 text-[10px] uppercase font-black tracking-[0.5em] text-gray-500">
                     <span>Worldwide Express</span>
                     <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                     <span>Full Warranty</span>
                     <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                     <span>Secure Data</span>
                  </div>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sticky Bottom CTA for Mobile - Conversion Focused */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full p-6 z-[70] pointer-events-none">
        <motion.div 
           initial={{ y: 100 }}
           animate={{ y: 0 }}
           className="glass p-2 rounded-[3rem] border border-white/20 shadow-2xl backdrop-blur-3xl pointer-events-auto"
        >
          <button 
            onClick={handleCheckout}
            className="w-full bg-primary text-foreground py-6 rounded-[2.5rem] font-black text-xl flex items-center justify-between px-10 shadow-xl shadow-primary/30 active:scale-95 transition-all"
          >
            <span>Get AquaLume™ Now</span>
            <ArrowRight size={24} />
          </button>
        </motion.div>
      </div>


      </main>

      {/* Desktop Sticky Buy Now */}
      <motion.div 
        style={{ opacity: buyButtonOpacity, y: buyButtonY }}
        className="hidden lg:block fixed bottom-24 right-10 z-[70]"
      >
        <button 
          onClick={handleCheckout}
          className="bg-brand-dark text-white pl-10 pr-14 py-6 rounded-full flex items-center gap-6 font-black shadow-2xl hover:bg-black transition-all group border-[6px] border-white ring-1 ring-black/5"
        >
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-primary/40">
            <Zap className="w-6 h-6 fill-white text-white" />
          </div>
          <div className="text-left">
            <p className="text-[9px] text-gray-400 uppercase tracking-widest font-black opacity-60">Ready for Anything</p>
            <p className="text-xl tracking-tight">Order Now — 35.00 USD</p>
          </div>
        </button>
      </motion.div>

      <Footer onLegalClick={(section) => setLegalState({ isOpen: true, section })} />
      </div>
    </PayPalScriptProvider>
  );
}
