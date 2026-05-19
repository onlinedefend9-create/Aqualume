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
  AlertCircle
} from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Checkout } from "./components/Checkout";

// Components
const VectorDots = () => (
  <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-20">
    <pattern id="dotPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.5" fill="currentColor" />
    </pattern>
    <rect width="100%" height="100%" fill="url(#dotPattern)" />
  </svg>
);

const FAQItem = ({ question, subtitle, answer }: { question: string, subtitle?: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 py-6 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-start text-left py-2 hover:text-brand-blue transition-colors group"
      >
        <div className="space-y-1">
          {subtitle && <span className="kicker mb-2">{subtitle}</span>}
          <span className="block text-xl font-extrabold text-brand-dark group-hover:text-brand-blue tracking-tight">{question}</span>
        </div>
        <div className={`mt-1 p-2 rounded-full bg-gray-50 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-brand-blue/10 text-brand-blue' : ''}`}>
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
            <p className="py-4 text-gray-500 text-lg leading-relaxed font-secondary">
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
        {/* 1. Hero Section */}
        <section className="relative pt-32 pb-16 md:pt-48 md:pb-32 overflow-hidden bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6 max-w-4xl"
              >
                <div className="flex justify-center gap-3">
                   <span className="px-5 py-2 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-sm border border-primary/20">The Original WATTer LAMP™</span>
                   <span className="px-5 py-2 bg-gray-100 text-gray-400 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-gray-200">Limited Stock Available</span>
                </div>
                <h1 className="text-5xl md:text-8xl font-black text-brand-dark leading-[0.95] tracking-tighter">
                  Light anywhere. <br /> Just add <span className="text-primary italic">saltwater.</span>
                </h1>
                <p className="text-gray-500 text-xl md:text-2xl max-w-2xl mx-auto font-secondary leading-relaxed">
                  The ultimate survival-tech light. No batteries, no charging—just pure science for camping, blackouts, and emergency kits.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
                  <button 
                    onClick={handleCheckout}
                    className="btn-primary px-12 py-6 text-xl w-full sm:w-auto shadow-[0_20px_50px_rgba(162,214,54,0.3)]"
                  >
                    Get Yours Now <ArrowRight size={24} />
                  </button>
                  <div className="flex items-center gap-4 text-left">
                    <div className="flex -space-x-3">
                      {[1,2,3,4].map(i => (
                        <img key={i} src={`https://i.pravatar.cc/100?u=user${i+50}`} className="w-10 h-10 rounded-full border-2 border-white shadow-lg" alt="Reviewer" />
                      ))}
                    </div>
                    <div>
                      <p className="text-xs font-black text-brand-dark uppercase tracking-widest">4.9/5 Rating</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">2,400+ Explorers</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "circOut", delay: 0.2 }}
                className="relative w-full max-w-5xl group"
              >
                <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full scale-90 -z-10 animate-pulse" />
                <div className="relative rounded-[3rem] md:rounded-[5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border-[8px] md:border-[16px] border-white group-hover:shadow-[0_60px_120px_-30px_rgba(162,214,54,0.25)] transition-all duration-700">
                  <img 
                    src="input_file_0.png" 
                    alt="WATTer LAMP Premium Showcase" 
                    className="w-full h-auto transform group-hover:scale-105 transition-transform duration-[3s] ease-out"
                    loading="eager"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Floating Tech Badges */}
                  <div className="absolute top-10 right-10 hidden md:block">
                    <div className="glass px-6 py-4 rounded-[2rem] border border-white/40 shadow-2xl space-y-1">
                      <p className="text-[10px] font-black uppercase text-primary tracking-widest">Battery-Free</p>
                      <p className="text-sm font-black text-brand-dark">100% Electrolytic</p>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-10 left-10 hidden md:block text-left">
                    <div className="glass p-6 rounded-[2.5rem] border border-white/40 shadow-2xl space-y-4">
                      <div className="flex gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary"><Zap size={16} /></div>
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary"><Droplets size={16} /></div>
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary"><ShieldCheck size={16} /></div>
                      </div>
                      <div>
                        <p className="text-xl font-black text-brand-dark tracking-tight">IP67 Waterproof</p>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Built for extreme environments</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 2. Brand Identity / Trust Bar */}
        <section className="bg-white border-y border-gray-100 py-12 overflow-hidden">
          <div className="container mx-auto px-6">
             <p className="text-center text-[10px] font-black uppercase tracking-[0.4em] text-gray-300 mb-10">Trusted by modern adventurers & emergency kits</p>
             <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-30 grayscale items-center">
                <span className="text-2xl font-black text-brand-dark italic">KICKSTARTER</span>
                <span className="text-2xl font-black text-brand-dark">EXPLORE</span>
                <span className="text-2xl font-black text-brand-dark tracking-[0.2em]">GEAR LAB</span>
                <span className="text-2xl font-black text-brand-dark">SURVIVAL.CO</span>
                <span className="text-2xl font-black text-brand-dark italic">OUTDOOR</span>
             </div>
          </div>
        </section>

        {/* 3. Lifestyle Gallery (Premium Storytelling) */}
        <section className="section-padding bg-gray-50 overflow-hidden">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Feature 1: Camping */}
              <motion.div 
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 30 }}
                viewport={{ once: true }}
                className="md:col-span-8 relative rounded-[3.5rem] overflow-hidden group h-[500px]"
              >
                <img 
                  src="/src/assets/images/watter_lamp_lifestyle_camping_1779187223703.png" 
                  alt="WATTer LAMP Camping usage" 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[2s]"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-12 left-12 space-y-4">
                  <span className="px-4 py-1.5 bg-primary text-foreground rounded-full text-[10px] font-black uppercase tracking-widest leading-none">Field Tested: Everest Base Camp</span>
                  <h3 className="text-4xl font-black text-white leading-tight max-w-lg">The zero-fail camping companion.</h3>
                  <p className="text-gray-300 font-secondary text-lg max-w-md">Lightweight, rugged, and completely independent from batteries. Ideal for long-haul treks.</p>
                </div>
              </motion.div>

              {/* Feature 2: Survival Detail */}
              <motion.div 
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 30 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="md:col-span-4 relative rounded-[3.5rem] overflow-hidden group h-[500px]"
              >
                <img 
                  src="/src/assets/images/watter_lamp_lifestyle_backpack_1779187261953.png" 
                  alt="Survival Go-Bag placement" 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[2s]"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-10 left-10 right-10">
                  <h3 className="text-2xl font-black text-white mb-2 underline decoration-primary underline-offset-8">Go-Bag Essential</h3>
                  <p className="text-gray-400 text-sm font-secondary">Store indefinitely. No leaks. No charge loss. Just add salt + water when it matters most.</p>
                </div>
              </motion.div>

              {/* Feature 3: Deep Dive Activation */}
              <motion.div 
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 30 }}
                viewport={{ once: true }}
                className="md:col-span-4 relative rounded-[3.5rem] overflow-hidden group h-[500px] bg-white border border-gray-100 flex flex-col p-10 justify-between items-center text-center"
              >
                <div className="space-y-4">
                   <div className="w-16 h-16 bg-primary/10 rounded-3xl mx-auto flex items-center justify-center text-primary leading-none">
                     <Zap size={32} />
                   </div>
                   <h3 className="text-3xl font-black text-brand-dark leading-tight">Saltwater <br /> Activation.</h3>
                   <p className="text-gray-500 font-secondary text-sm">Powered by the electrolytic reaction between salt and water. No sun, no crank, no batteries needed.</p>
                </div>
                <div className="relative w-full aspect-square p-8">
                   <img 
                    src="/src/assets/images/watter_lamp_detail_activation_1779187279374.png" 
                    alt="Activation Detail" 
                    className="w-full h-full object-contain rounded-full shadow-2xl border-4 border-gray-50"
                  />
                </div>
              </motion.div>

              {/* Feature 4: Emergency/Home */}
              <motion.div 
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 30 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="md:col-span-8 relative rounded-[3.5rem] overflow-hidden group h-[500px]"
              >
                <img 
                  src="/src/assets/images/watter_lamp_lifestyle_blackout_1779187241594.png" 
                  alt="WATTer LAMP Emergency Blackout" 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[2s]"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-12 left-12 space-y-4">
                  <span className="p-4 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-black uppercase text-white tracking-widest border border-white/10">Blackout Prevention</span>
                  <h3 className="text-4xl font-black text-white leading-tight max-w-lg">Home safety shouldn't have an expiration date.</h3>
                  <p className="text-gray-300 font-secondary text-lg max-w-md">Keep a WATTer LAMP™ in your kitchen drawer for instant, reliable safety when the grid goes dark.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>


      {/* 4. Deep Technical Dive / Product Breakdown */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-24 items-center">
              <div className="space-y-12">
                <div className="space-y-6">
                  <span className="kicker">The Science of Light</span>
                  <h2 className="text-5xl md:text-6xl font-black text-brand-dark tracking-tighter leading-none">
                    How it <br /> <span className="text-primary italic">actually</span> works.
                  </h2>
                  <p className="text-gray-500 font-secondary text-lg">
                    No magic, just high-efficiency electrolysis. WATTer LAMP™ converts the chemical energy of Saltwater directly into electricity to power ultra-bright LED chips.
                  </p>
                </div>

                <div className="space-y-10">
                  {[
                    { title: "Magnesium Anode", desc: "High-purity core that reacts with salt ions.", icon: <Zap /> },
                    { title: "LED Matrix", desc: "Optimized for low-draw, high-lumen output.", icon: <CheckCircle2 /> },
                    { title: "IP67 Polymer", desc: "Industrial grade casing for extreme weather.", icon: <ShieldCheck /> }
                  ].map((tech, i) => (
                    <div key={i} className="flex gap-6 group">
                      <div className="w-14 h-14 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-foreground transition-all duration-500 shadow-sm">
                        {tech.icon}
                      </div>
                      <div className="space-y-1 pt-1">
                        <h4 className="text-xl font-black text-brand-dark">{tech.title}</h4>
                        <p className="text-gray-400 font-secondary text-sm">{tech.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-6">
                   <button onClick={handleCheckout} className="btn-primary w-full md:w-auto px-12 group">
                      Reserve My WATTer LAMP™ <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                   </button>
                </div>
              </div>

              <div className="relative group">
                 <div className="absolute inset-0 bg-primary/5 blur-[100px] rounded-full scale-125 -z-10 animate-pulse" />
                 <div className="relative p-4 sm:p-12 bg-gray-50 rounded-[4rem] border border-gray-100 shadow-inner">
                    <img 
                      src="/src/assets/images/watter_lamp_detail_activation_1779187279374.png" 
                      alt="WATTer LAMP Technical Detail" 
                      className="rounded-[3rem] shadow-2xl border-4 border-white w-full h-auto object-cover transform transition-transform duration-700 group-hover:rotate-1"
                    />
                    <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-[2.5rem] shadow-2xl border border-gray-50 hidden md:block max-w-xs">
                       <p className="text-[10px] font-black uppercase text-primary tracking-widest mb-3 italic">Step 01: Activation</p>
                       <p className="text-sm font-black text-brand-dark leading-tight">Pour 15g of salt and 300ml of water. Light up for 120H+.</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Bento Grid Features (Polished) */}
      <section id="features" className="section-padding bg-gray-50">
        <div className="container mx-auto px-6 max-w-7xl">
           <div className="text-center space-y-4 mb-20">
              <span className="kicker">Features</span>
              <h2 className="text-brand-dark tracking-tighter">Everything survival demands.</h2>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="bg-white p-12 rounded-[4rem] border border-gray-100 space-y-8 hover:shadow-2xl transition-all duration-700 group">
                <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <Wind size={32} />
                </div>
                <div className="space-y-3">
                  <h3 className="text-3xl font-black tracking-tight">Storm Proof</h3>
                  <p className="text-gray-500 font-secondary leading-relaxed">Built for the rain. The sealed electrolytic chamber prevents moisture from damaging internal chips.</p>
                </div>
              </div>

              {/* Card 2 - Highlight */}
              <div className="bg-brand-dark p-12 rounded-[4rem] border border-white/5 space-y-8 hover:shadow-2xl transition-all duration-700 group relative overflow-hidden">
                <div className="absolute -top-10 -right-10 opacity-10 rotate-12 transition-transform duration-1000 group-hover:-rotate-12">
                   <Zap size={240} />
                </div>
                <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center text-primary leading-none relative z-10">
                  <Battery size={32} />
                </div>
                <div className="space-y-3 relative z-10">
                  <h3 className="text-3xl font-black tracking-tight text-white">Infinite Shelf Life</h3>
                  <p className="text-gray-400 font-secondary leading-relaxed">Unlike Li-ion batteries that degrade or leak over time, WATTer LAMP™ remains dormant until activated.</p>
                </div>
              </div>

               {/* Card 3 */}
               <div className="bg-white p-12 rounded-[4rem] border border-gray-100 space-y-8 hover:shadow-2xl transition-all duration-700 group">
                <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <Leaf size={32} />
                </div>
                <div className="space-y-3">
                  <h3 className="text-3xl font-black tracking-tight">Eco Conscientious</h3>
                  <p className="text-gray-500 font-secondary leading-relaxed">Zero lithium. Zero heavy metals. A sustainable alternative to disposable batteries in the wilderness.</p>
                </div>
              </div>
           </div>
        </div>
      </section>


      {/* 6. Reviews/testimonials Section */}
      <section id="reviews" className="section-padding bg-gray-50/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-6 mb-20">
            <h2 className="text-brand-dark tracking-tighter">Trusted Light When It Matters Most</h2>
            <p className="text-gray-400 font-secondary text-lg">Real feedback from campers and emergency kits—fast shipping, dependable support, and a money-back guarantee.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              { 
                name: "Megan R.", 
                loc: "Portland, OR", 
                txt: "Used the WATTer LAMP saltwater LED lamp on a rainy camping weekend and it still worked great. Just added salt and water and shook it and the light came on fast.", 
                img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=100&w=800" 
              },
              { 
                name: "Jason L.", 
                loc: "Austin, TX", 
                txt: "Picked this up for my emergency kit and I like that it needs no batteries. The hanging strap is handy in the garage and the brightness is better than I expected.", 
                img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=100&w=800" 
              },
              { 
                name: "Emily K.", 
                loc: "Denver, CO", 
                txt: "Super lightweight in my pack and the adjustable settings are useful for tent light versus walking to the restroom. Feels solid and the saltwater setup is oddly satisfying.", 
                img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=100&w=800" 
              }
            ].map((rev, i) => (
              <div key={i} className="flex flex-col bg-white rounded-[3rem] overflow-hidden shadow-xl shadow-black/5 border border-gray-100 h-full">
                <div className="aspect-square bg-gray-200">
                   <img src={rev.img} alt={rev.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="p-10 space-y-6 flex-1 flex flex-col justify-between">
                   <div className="space-y-4">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-brand-blue text-brand-blue" />)}
                      </div>
                      <p className="text-gray-700 italic font-secondary text-lg leading-relaxed">"{rev.txt}"</p>
                   </div>
                   <div className="pt-8 border-t border-gray-100">
                      <p className="text-brand-dark font-black tracking-tight mb-1">{rev.name}</p>
                      <p className="text-xs uppercase text-gray-400 font-black tracking-widest">{rev.loc}</p>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQ Section */}
      <section className="section-padding bg-white overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-12 sticky top-32">
                <div className="space-y-10 text-center lg:text-left">
                  <div className="space-y-6">
                    <span className="kicker">Everything you need to know</span>
                    <h2 className="text-brand-dark leading-none">Kept simple.</h2>
                    <p className="font-secondary text-gray-500">WATTer LAMP™ is designed for real use—camping, storms, and everyday readiness. Salt + water. A steady light when batteries aren’t an option.</p>
                  </div>
                  <div className="relative pt-10">
                     <div className="absolute -inset-10 bg-brand-blue/5 blur-[80px] rounded-full"></div>
                     <img 
                      src="input_file_0.png" 
                      alt="WATTer LAMP in use" 
                      className="relative rounded-[3rem] shadow-2xl border-4 border-white w-full aspect-video object-contain bg-white p-8"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
            </div>

            <div className="space-y-2 bg-gray-50/50 p-6 md:p-12 rounded-[4rem] border border-gray-100">
               <FAQItem 
                subtitle="Power"
                question="How does WATTer LAMP™ work?"
                answer="WATTer LAMP™ uses an electrolytic reaction between salt, water, and internal power components to generate electricity. Simply add salt + water and shake to activate instant, steady light."
               />
               <FAQItem 
                subtitle="Runtime"
                question="Does it really last 120 hours?"
                answer="Yes! A single saltwater activation provides up to 120 hours of continuous LED light on typical settings. It's designed to be used, drained, and stored as needed."
               />
               <FAQItem 
                subtitle="Waterproof"
                question="Can I use it in the rain?"
                answer="Absolutely. The lamp features a weather-resistant, waterproof (IP68-ready) build specifically designed for storms, splashes, and wet camping environments."
               />
               <FAQItem 
                subtitle="Brightness"
                question="Is it bright enough for a room?"
                answer="It generates enough high-efficiency LED light to illuminate a campsite tent or a standard room during a blackout for practical visibility and tasks."
               />
               <FAQItem 
                subtitle="Eco"
                question="What makes it eco-friendly?"
                answer="By using standard salt and water, we eliminate the need for dangerous heavy-metal batteries that end up in landfills. It’s a sustainable, maintenance-free solution."
               />
               <div className="pt-10 text-center lg:text-left">
                  <button onClick={handleCheckout} className="btn-primary px-12 group">
                    Get Yours Now <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </button>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Final CTA Section (Pricing/Final Offer) - Matching the checkout area */}
      <section id="checkout-now" className="section-padding bg-brand-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[#A2D636]/5 mix-blend-overlay"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse animation-delay-2000"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-7xl mx-auto flex flex-col items-center">
            <div className="text-center space-y-6 mb-16">
               <div className="flex justify-center gap-2 mb-4">
                 {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-primary text-primary" />)}
               </div>
               <h2 className="text-white text-4xl md:text-7xl font-black max-w-4xl mx-auto leading-none tracking-tighter">
                Security that doesn't <br /> <span className="text-primary italic">require a plug.</span>
               </h2>
               <p className="text-gray-400 max-w-2xl mx-auto font-secondary text-xl font-light">WATTer LAMP™ powers up with salt + water for dependable illumination in emergencies, camping nights, and go-bags.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 w-full max-w-6xl">
              {/* Product Visual */}
              <div className="bg-white/5 rounded-[4rem] border border-white/10 p-12 flex flex-col items-center justify-center text-center space-y-10 backdrop-blur-xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-10 opacity-10 -rotate-12 transition-transform duration-700 group-hover:rotate-0">
                    <VectorDots />
                 </div>
                 <div className="space-y-3 relative z-10">
                   <h4 className="text-3xl font-black text-white tracking-tight">Technical Kit</h4>
                   <p className="text-sm text-gray-400 font-secondary max-w-xs mx-auto">The original WATTer LAMP™ Saltwater device, ready for instant activation. Shake well and light up.</p>
                 </div>
                 <div className="relative p-12 bg-white rounded-[4rem] shadow-2xl transition-all duration-700 group-hover:scale-105 group-hover:rotate-1">
                   <img 
                    src="input_file_0.png" 
                    alt="Official WATTer LAMP" 
                    className="w-full max-w-sm h-auto object-contain"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-8 left-8 bg-primary text-foreground px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                    Authentic
                  </div>
                 </div>
                <div className="flex flex-wrap justify-center gap-4 relative z-10">
                  <div className="px-6 py-4 bg-white/10 rounded-3xl flex items-center gap-3 border border-white/5 backdrop-blur-md">
                    <Truck className="text-primary" size={20} />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">In Stock Today</span>
                  </div>
                  <div className="px-6 py-4 bg-primary text-foreground rounded-3xl flex items-center gap-3 shadow-xl shadow-primary/20">
                    <ShieldCheck size={20} />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Full Warranty</span>
                  </div>
                </div>
              </div>

              {/* Price/Button Area */}
              <div className="bg-white p-12 md:p-16 rounded-[4rem] flex flex-col justify-center items-center text-center text-brand-dark space-y-12 shadow-2xl relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
                 <div className="space-y-4">
                   <h3 className="text-4xl font-black leading-none tracking-tighter">Secure your light <br /> while it lasts.</h3>
                   <p className="text-gray-400 font-secondary text-base">Grab your WATTer LAMP™ at introductory pricing.</p>
                 </div>

                 <div className="space-y-2">
                    <p className="text-gray-200 line-through text-3xl font-black">462.47 MAD</p>
                    <p className="text-7xl font-black text-primary tracking-tighter shadow-sm">323.70 MAD</p>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest pt-2">Free International Shipping</p>
                 </div>

                 <button onClick={handleCheckout} className="btn-primary w-full py-8 text-2xl shadow-[0_25px_60px_rgba(162,214,54,0.4)] transition-all active:scale-95 group">
                   GET MY WATTer LAMP™ <ArrowRight size={32} className="group-hover:translate-x-2 transition-transform" />
                 </button>

                 <div className="space-y-8 pt-4 w-full">
                    <div className="flex flex-wrap justify-center gap-10 opacity-30 grayscale contrast-125">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6" loading="lazy" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-6" loading="lazy" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_Pay_logo.svg" alt="Apple Pay" className="h-7" loading="lazy" />
                    </div>
                    <div className="flex items-center justify-center gap-4">
                       <div className="h-px bg-gray-100 flex-1"></div>
                       <p className="text-[10px] uppercase font-black text-gray-300 tracking-[0.4em] whitespace-nowrap">Secure 256-bit SSL Checkout</p>
                       <div className="h-px bg-gray-100 flex-1"></div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>


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

      {/* Mobile Sticky Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full p-4 glass z-[70] border-t border-gray-100 flex items-center gap-4" aria-hidden="true">
        <button 
          onClick={handleCheckout}
          aria-label="Order WATTer LAMP now"
          className="w-full bg-brand-blue text-white py-5 rounded-[2rem] font-black text-xl flex items-center justify-between px-10 shadow-2xl shadow-brand-blue/30 active:scale-95 transition-all"
        >
          <span>S'offrir WATTer LAMP™</span>
          <span className="opacity-50 text-sm">323.70 MAD</span>
        </button>
      </div>

      {/* Desktop Sticky Buy Now */}
      <motion.div 
        style={{ opacity: buyButtonOpacity, y: buyButtonY }}
        className="hidden lg:block fixed bottom-10 right-10 z-[70]"
      >
        <button 
          onClick={handleCheckout}
          className="bg-brand-dark text-white pl-10 pr-14 py-6 rounded-full flex items-center gap-6 font-black shadow-2xl hover:bg-black transition-all group border-[6px] border-white ring-1 ring-black/5"
        >
          <div className="w-12 h-12 bg-brand-blue rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-brand-blue/40">
            <Zap className="w-6 h-6 fill-white text-white" />
          </div>
          <div className="text-left">
            <p className="text-[9px] text-gray-400 uppercase tracking-widest font-black opacity-60">Prêt pour l'urgence</p>
            <p className="text-xl tracking-tight">Commander — 323.70 MAD</p>
          </div>
        </button>
      </motion.div>
      </div>
    </PayPalScriptProvider>
  );
}
