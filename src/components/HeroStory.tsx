import React, { useEffect, useState } from 'react';
import { Droplets, ArrowDown } from 'lucide-react';
import heroBg from '../assets/images/aqualume_hero_cinematic_v2_1779194153162.png';
import { useLanguage } from '../lib/LanguageContext';

interface Particle {
  id: number;
  left: string;
  size: string;
  delay: string;
  duration: string;
}

const HeroStory: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const { t } = useLanguage();

  useEffect(() => {
    const newParticles: Particle[] = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 4 + 2}px`,
      delay: `${Math.random() * 5}s`,
      duration: `${Math.random() * 6 + 6}s`,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0f1a] py-32">
      {/* Background Image & Deep Gradient */}
      <img src={heroBg} alt="AquaLume Cinematic" className="absolute inset-0 w-full h-full object-cover opacity-20 z-0" loading="eager" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1a]/80 to-[#151b27] z-0" />

      {/* Light Rays */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-[-20%] left-[-10%] w-[150%] h-[150%] origin-[top_left]"
          style={{ animation: "light-ray 8s ease-in-out infinite", background: "linear-gradient(90deg, transparent, rgba(74, 222, 128, 0.4), transparent)" }}
        />
        <div 
          className="absolute top-[-10%] left-[20%] w-[100%] h-[150%] origin-[top_left]"
          style={{ animation: "light-ray 12s ease-in-out infinite 2s", background: "linear-gradient(90deg, transparent, rgba(74, 222, 128, 0.3), transparent)" }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute bottom-0 bg-[#4ade80] rounded-full blur-[1px]"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              animation: `float-up ${p.duration} linear infinite`,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>

      {/* Ripple Rings */}
      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 z-10 pointer-events-none">
        {[0, 1, 2, 3].map((i) => (
          <div 
            key={i}
            className="absolute inset-0 border border-[#4ade80] rounded-full"
            style={{ animation: `ripple 3s ease-out infinite ${i * 0.75}s` }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-6 mt-16 max-w-4xl">
        <div className="flex justify-center mb-10" style={{ animation: "fade-in-up 1s ease forwards" }}>
          <Droplets className="text-[#4ade80] w-20 h-20 drop-shadow-[0_0_20px_rgba(74,222,128,0.8)]" />
        </div>
        
        <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-tight mb-6 flex flex-col items-center" style={{ animation: "fade-in-up 1s ease forwards 0.3s" }}>
          <span className="text-white block">{t.heroTitle1}</span>
          <span className="text-[#4ade80] block" style={{ animation: "glow-pulse 4s infinite" }}>{t.heroTitle2}</span>
        </h1>
        
        <p className="text-lg md:text-2xl text-gray-300 font-light max-w-2xl mx-auto mb-12" style={{ animation: "fade-in-up 1s ease forwards 0.6s" }}>
          {t.heroSubtitle}
        </p>
        
        <div style={{ animation: "fade-in-up 1s ease forwards 0.9s" }}>
          <a href="#products" className="inline-block bg-[#4ade80] text-[#151b27] px-10 py-4 rounded-full font-bold text-lg uppercase tracking-wide transition-transform hover:scale-105 active:scale-95 relative overflow-hidden group">
            <span className="relative z-10">{t.heroCTA}</span>
            <div className="absolute inset-0 bg-white/30 scale-0 rounded-full group-active:scale-150 transition-transform duration-500 ease-out origin-center" />
          </a>
        </div>

        {/* Responsive Video Section */}
        <div 
          className="mt-16 sm:mt-24 w-full mx-auto max-w-4xl px-3 sm:px-6 md:px-0"
          style={{ animation: "fade-in-up 1s ease forwards 1.2s" }}
        >
          {/* Header Tagline showing clear utility with dynamic pulse label */}
          <div className="flex flex-col items-center gap-2 mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-widest text-[#4ade80] bg-[#4ade80]/10 border border-[#4ade80]/20">
              <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse" />
              Product Demonstration
            </span>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-sans">
              The Saltwater Lamp in Action
            </h3>
          </div>

          {/* Premium High-Contrast Video Container */}
          <div className="w-full aspect-video rounded-3xl overflow-hidden border-2 border-[#4ade80]/30 shadow-[0_0_60px_rgba(74,222,128,0.25)] relative bg-black transition-all duration-300 hover:border-[#4ade80]/60 hover:shadow-[0_0_80px_rgba(74,222,128,0.35)]">
            <video 
              src="/api/video" 
              controls 
              autoPlay 
              muted 
              loop 
              playsInline 
              className="w-full h-full object-cover select-none pointer-events-auto"
            >
              Your browser does not support the video tag.
            </video>
          </div>

          {/* User note for interaction */}
          <p className="mt-4 text-xs sm:text-sm font-light text-gray-400 max-w-md mx-auto italic">
            * Turn on the sound to listen to the detailed review.
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2" style={{ animation: "fade-in-up 1s ease forwards 1.5s" }}>
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-[#4ade80] to-[#4ade80]" />
        <ArrowDown className="text-[#4ade80] w-6 h-6 z-10" style={{ animation: "bounce-custom 2s infinite" }} />
      </div>
    </section>
  );
};

export default HeroStory;
