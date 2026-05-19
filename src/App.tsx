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

  return (
    <PayPalScriptProvider options={paypalOptions}>
      <div className="min-h-screen bg-white">
        <Checkout 
          isOpen={isCheckoutOpen} 
          onClose={() => setIsCheckoutOpen(false)} 
          price="32.40" 
          currency="USD" 
        />
      {/* Navigation */}
      <header className={`fixed top-0 w-full z-[60] transition-all duration-500 ${isScrolled ? 'glass py-3 shadow-lg shadow-black/5' : 'bg-transparent py-8'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="#" className="text-2xl font-black tracking-tighter flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30" aria-hidden="true">
              <Droplets className="text-foreground w-6 h-6" />
            </div>
            <span className="text-foreground">WATTer LAMP<span className="text-primary">™</span></span>
          </a>
          <div className="flex items-center gap-6">
            <nav className="hidden lg:flex items-center gap-8 text-sm font-bold text-muted-foreground" aria-label="Main Navigation">
               <a href="#how-it-works" className="hover:text-foreground transition-colors">How it works</a>
               <a href="#features" className="hover:text-foreground transition-colors">Features</a>
               <a href="#reviews" className="hover:text-foreground transition-colors">Reviews</a>
            </nav>
            <button 
              onClick={handleCheckout}
              aria-label="Order WATTer LAMP now"
              className="px-8 py-3 bg-foreground text-background rounded-full text-sm font-black hover:bg-black transition-all hover:scale-105 active:scale-95 shadow-xl shadow-black/10"
            >
              Get Yours Now
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* 1. Hero Section - Cinematic Upgrade */}
        <section className="relative pt-32 pb-16 md:pt-48 md:pb-32 overflow-hidden bg-white">
          <div className="absolute top-0 right-0 p-20 opacity-30 select-none pointer-events-none">
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
                   <TrustBadge icon={<Activity size={12} />} text="Survival Innovation" />
                   <TrustBadge icon={<Globe size={12} />} text="Worldwide Shipping" />
                </div>
                <h1 className="text-6xl md:text-[9rem] font-black text-brand-dark leading-[0.85] tracking-tighter">
                  No Batteries. <br /> Just <span className="text-primary italic animate-pulse">Salt + Water.</span>
                </h1>
                <p className="text-gray-500 text-xl md:text-3xl max-w-3xl mx-auto font-secondary leading-relaxed font-light">
                  The ultimate survival-tech light. Engineered for emergency readiness, outdoor reliability, and battery-free innovation. 
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
                  <div className="flex items-center gap-6 text-left p-2 glass rounded-full pr-8 border border-white/50">
                    <div className="flex -space-x-4">
                      {[1,2,3,4,5].map(i => (
                        <img key={i} src={`https://i.pravatar.cc/150?u=user${i+88}`} className="w-12 h-12 rounded-full border-4 border-white shadow-xl" alt="Reviewer" />
                      ))}
                    </div>
                    <div>
                      <div className="flex gap-0.5 text-primary">
                        {[...Array(5)].map((_, i) => <Star key={i} size={10} className="fill-current" />)}
                      </div>
                      <p className="text-[10px] font-black text-brand-dark uppercase tracking-widest mt-1">2,400+ Trusted Reviews</p>
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
                <div className="relative rounded-[4rem] md:rounded-[6rem] overflow-hidden shadow-[0_80px_160px_-40px_rgba(0,0,0,0.2)] border-[10px] md:border-[20px] border-white group-hover:shadow-[0_100px_200px_-50px_rgba(162,214,54,0.3)] transition-all duration-1000">
                  <img 
                    src="input_file_0.png" 
                    alt="WATTer LAMP Premium Showcase" 
                    className="w-full h-auto transform group-hover:scale-110 transition-transform duration-[4s] ease-out"
                    loading="eager"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Glassmorphism Floating Tech Overlay */}
                  <div className="absolute top-12 right-12 hidden md:block">
                    <div className="glass px-8 py-6 rounded-[3rem] border border-white/50 shadow-2xl space-y-2 backdrop-blur-3xl">
                      <p className="text-[11px] font-black uppercase text-primary tracking-[0.3em]">Proprietary Tech</p>
                      <p className="text-xl font-black text-brand-dark leading-tight">100% Electrolytic <br /> Power Delivery</p>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-12 left-12 hidden md:block text-left">
                    <div className="glass p-10 rounded-[4rem] border border-white/50 shadow-2xl space-y-6 backdrop-blur-3xl">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-[1.5rem] bg-primary/20 flex items-center justify-center text-primary"><Zap size={24} /></div>
                        <div className="w-12 h-12 rounded-[1.5rem] bg-primary/20 flex items-center justify-center text-primary"><Droplets size={24} /></div>
                        <div className="w-12 h-12 rounded-[1.5rem] bg-primary/20 flex items-center justify-center text-primary"><ShieldCheck size={24} /></div>
                      </div>
                      <div>
                        <p className="text-3xl font-black text-brand-dark tracking-tighter">IP67 Waterproof</p>
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-[0.2em] mt-1">Engineered for extreme survival</p>
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
              {/* Feature 1: Camping/Adventure */}
              <motion.div 
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 50 }}
                viewport={{ once: true }}
                className="md:col-span-12 relative rounded-[4rem] md:rounded-[6rem] overflow-hidden group h-[600px] md:h-[800px]"
              >
                <img 
                  src="/src/assets/images/watter_lamp_lifestyle_camping_1779187223703.png" 
                  alt="WATTer LAMP Camping usage" 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[5s] ease-out"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                <div className="absolute bottom-16 left-8 md:bottom-24 md:left-24 space-y-8 max-w-4xl">
                  <div className="inline-flex items-center gap-3 px-6 py-3 glass rounded-full border border-white/20">
                    <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-white">Adrenaline Tech Certified</span>
                  </div>
                  <h3 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter">The ultimate <br /> wilderness hack.</h3>
                  <p className="text-gray-300 font-secondary text-lg md:text-2xl max-w-2xl leading-relaxed">Lightweight, rugged, and completely independent from the grid. Because in the backcountry, batteries are your biggest liability.</p>
                  <button onClick={handleCheckout} className="btn-primary w-fit px-12 group">Expedition Ready <ArrowRight className="group-hover:translate-x-2 transition-transform" /></button>
                </div>
              </motion.div>

              {/* Feature 2: Emergency Blackout */}
              <motion.div 
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: -50 }}
                viewport={{ once: true }}
                className="md:col-span-7 relative rounded-[4rem] group overflow-hidden h-[500px] md:h-[700px]"
              >
                <img 
                  src="/src/assets/images/watter_lamp_lifestyle_blackout_1779187241594.png" 
                  alt="WATTer LAMP Emergency Blackout" 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[3s]"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                <div className="absolute bottom-12 left-12 space-y-4 right-12">
                   <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase text-white tracking-widest border border-white/10">Blackout Protocol</span>
                  <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter">Your home kit, <br /> evolved.</h3>
                  <p className="text-gray-400 font-secondary text-lg leading-relaxed max-w-lg">Don’t reach for a flashlight with dead batteries when the storm hits. WATTer LAMP™ is ready instantly, even after years in a drawer.</p>
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
                  src="/src/assets/images/watter_lamp_waterproof_tactical_1779188391501.png" 
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

        {/* 4. How It Works - Premium 3-Step */}
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
                  desc: "Pour 15g of salt and 300ml of water into the chamber.", 
                  icon: <Droplets className="w-12 h-12" />,
                  img: "/src/assets/images/watter_lamp_detail_activation_1779187279374.png"
                },
                { 
                  step: "02", 
                  title: "Activate", 
                  desc: "Shake gently to initiate the electrolytic reaction instantly.", 
                  icon: <RotateCcw className="w-12 h-12" />,
                  img: "input_file_0.png"
                },
                { 
                  step: "03", 
                  title: "Steady Light", 
                  desc: "Enjoy up to 120 hours of reliable LED brightness.", 
                  icon: <Zap className="w-12 h-12" />,
                  img: "/src/assets/images/watter_lamp_hero_minimal_1779187204366.png"
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


      {/* 6. Social Proof - TikTok Style Feed */}
      <section id="reviews" className="section-padding bg-white overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl">
           <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-24">
               <div className="space-y-6 max-w-2xl">
                  <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">Community Voice</span>
                  <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-brand-dark leading-none">Real Stories, <br /> Real Ready.</h2>
               </div>
               <div className="flex items-center gap-2 group cursor-pointer">
                  <span className="text-sm font-black uppercase tracking-widest text-gray-300 group-hover:text-primary transition-colors">See all 2,400+ reviews</span>
                  <ArrowRight size={20} className="text-gray-200 group-hover:text-primary group-hover:translate-x-1 transition-all" />
               </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  name: "Megan R.", 
                  loc: "Pacific Northwest", 
                  txt: "Total lifesaver during our coastal storm. Batteries were flat, salt was in the cabinet. It just works.", 
                  img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=100&w=800",
                  tag: "Emergency Kit"
                },
                { 
                  name: "Jason L.", 
                  loc: "Colorado Rockies", 
                  txt: "I leave it in my go-bag 24/7. Peace of mind knowing it'll light up instantly regardless of age.", 
                  img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=100&w=800",
                  tag: "Backcountry"
                },
                { 
                  name: "Emily K.", 
                  loc: "Desert Explorer", 
                  txt: "Used it every night on our Moab trek. The glow is surprisingly warm and fills the entire tent.", 
                  img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=100&w=800",
                  tag: "Camping"
                },
                { 
                  name: "Marcus T.", 
                  loc: "Urban Survivalist", 
                  txt: "The science is cool, but the reliability is what sold me. Built like a specialized piece of tech.", 
                  img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=100&w=800",
                  tag: "Off-Grid"
                }
              ].map((rev, i) => (
                <motion.div 
                  whileHover={{ y: -10 }}
                  key={i} 
                  className="bg-gray-50 rounded-[3rem] overflow-hidden border border-gray-100 flex flex-col h-full group"
                >
                  <div className="aspect-[3/4] relative overflow-hidden">
                     <img src={rev.img} alt={rev.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                     <div className="absolute top-6 left-6 px-4 py-2 glass rounded-2xl text-[9px] font-black uppercase text-white tracking-widest">{rev.tag}</div>
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                     <div className="absolute bottom-6 left-6 right-6">
                        <div className="flex gap-0.5 mb-2 text-primary">
                          {[...Array(5)].map((_, j) => <Star key={j} size={10} className="fill-current" />)}
                        </div>
                        <p className="text-white text-sm font-black tracking-tight">{rev.name} • {rev.loc}</p>
                     </div>
                  </div>
                  <div className="p-8 flex-1">
                     <p className="text-gray-500 font-secondary text-sm leading-relaxed italic">"{rev.txt}"</p>
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
                    <p className="font-secondary text-gray-400 text-xl max-w-xl leading-relaxed">WATTer LAMP™ is built for real-world stress—camping, storms, and survival. No gimmicks, just physics.</p>
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
                question="How does WATTer LAMP™ work?"
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
                answer="Yes. We eliminate the toxic heavy metals found in standard batteries. WATTer LAMP™ is 100% recyclable and battery-waste free."
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
                    Secure My WATTer LAMP™ <ArrowRight size={40} className="group-hover:translate-x-3 transition-transform" />
                  </button>
               </div>

               <div className="pt-16 space-y-10">
                  <div className="flex flex-wrap justify-center gap-16 opacity-40 hover:opacity-100 transition-opacity duration-1000">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-8 invert" loading="lazy" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-8 invert" loading="lazy" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_Pay_logo.svg" alt="Apple Pay" className="h-10 invert" loading="lazy" />
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
            <span>Get WATTer LAMP™ Now</span>
            <ArrowRight size={24} />
          </button>
        </motion.div>
      </div>


      </main>

      {/* Footer */}
      <footer className="py-24 bg-white border-t border-gray-100 overflow-hidden text-brand-dark">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
             <div className="space-y-10 max-w-md">
                <div className="text-2xl font-black tracking-tighter flex items-center gap-2">
                  <div className="w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center">
                    <Droplets className="text-white w-6 h-6" />
                  </div>
                  <span>WATTer LAMP<span className="text-brand-blue">™</span></span>
                </div>
                <p className="text-gray-500 font-secondary text-base">
                  Innovative emergency lighting powered by science—reliable brightness with just salt and water. Ready for any situation.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-400">
                    <Leaf className="w-4 h-4 text-green-500" /> Écologique
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-400">
                    <Shield className="w-4 h-4 text-brand-blue" /> Garantie
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-400">
                    <Truck className="w-4 h-4 text-brand-blue" /> Livraison
                  </div>
                </div>
             </div>

             <div className="grid grid-cols-2 lg:grid-cols-3 gap-10">
                <div className="space-y-6">
                  <h4 className="text-[10px] uppercase font-black tracking-[0.2em] text-gray-300 border-b border-gray-100 pb-2">Links</h4>
                  <ul className="space-y-4 text-sm font-black text-gray-600">
                    <li><a href="#" className="hover:text-brand-blue transition-colors">Home</a></li>
                    <li><a href="#" className="hover:text-brand-blue transition-colors">Contact</a></li>
                  </ul>
                </div>
                <div className="space-y-6">
                  <h4 className="text-[10px] uppercase font-black tracking-[0.2em] text-gray-300 border-b border-gray-100 pb-2">Policies</h4>
                  <ul className="space-y-4 text-sm font-black text-gray-600">
                    <li><a href="#" className="hover:text-brand-blue transition-colors font-black">Privacy</a></li>
                    <li><a href="#" className="hover:text-brand-blue transition-colors font-black">Returns</a></li>
                    <li><a href="#" className="hover:text-brand-blue transition-colors font-black">Shipping</a></li>
                  </ul>
                </div>
                <div className="col-span-2 md:col-span-1 space-y-6">
                   <h4 className="text-[10px] uppercase font-black tracking-[0.2em] text-gray-300 border-b border-gray-100 pb-2">Emergency ready tips</h4>
                   <div className="flex gap-2">
                     <label htmlFor="email-newsletter" className="sr-only">Enter your email for emergency ready tips</label>
                     <input id="email-newsletter" type="email" placeholder="Enter email" className="bg-gray-50 border border-gray-100 px-4 py-3 rounded-2xl text-sm font-secondary w-full focus:outline-none focus:ring-1 focus:ring-brand-blue" />
                     <button className="bg-brand-dark text-white p-3 rounded-2xl hover:bg-black transition-colors shadow-lg" aria-label="Subscribe to newsletter"><ArrowRight size={20} aria-hidden="true" /></button>
                   </div>
                </div>
             </div>
          </div>
          <div className="pt-24 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-gray-100 mt-20 opacity-30">
            <p className="text-[10px] font-black uppercase tracking-[0.4em]">© 2026 WATTer LAMP™ Global.</p>
            <p className="text-[10px] font-black uppercase tracking-[0.4em]">Secure • Sustainable • Reliable</p>
          </div>
        </div>
      </footer>

      {/* Desktop Sticky Buy Now */}
      <motion.div 
        style={{ opacity: buyButtonOpacity, y: buyButtonY }}
        className="hidden lg:block fixed bottom-10 right-10 z-[70]"
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
            <p className="text-xl tracking-tight">Order Now — 32.40 USD</p>
          </div>
        </button>
      </motion.div>
      </div>
    </PayPalScriptProvider>
  );
}
