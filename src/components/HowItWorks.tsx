import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Droplet, Zap } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean[]>([false, false, false]);
  const stepsR = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          const index = Number(entry.target.getAttribute('data-index'));
          setIsVisible(prev => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
          });
        }
      });
    }, { threshold: 0.3 });

    stepsR.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const steps = [
    { title: "Connect", desc: "Plug in your unit to a standard power source.", icon: <Zap size={32} /> },
    { title: "Purify", desc: "Water flows through our advanced UV-C filters.", icon: <Droplet size={32} /> },
    { title: "Illuminate", desc: "Smart LED lighting activates, indicating purity.", icon: <Sparkles size={32} /> }
  ];

  return (
    <section id="how-it-works" className="py-24 px-6 bg-[#151b27] relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black mb-4">How It Works</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">Three simple steps to absolute purity and ambient light.</p>
        </div>

        <div className="relative">
          {/* Connecting Line Desktop */}
          <div className="hidden md:block absolute top-[44px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-transparent via-[#4ade80]/50 to-transparent" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {steps.map((step, idx) => (
              <div 
                key={idx}
                data-index={idx}
                ref={el => stepsR.current[idx] = el}
                className="relative text-center"
                style={{
                  opacity: isVisible[idx] ? 1 : 0,
                  transform: isVisible[idx] ? 'translateY(0)' : 'translateY(40px)',
                  transition: `all 0.7s ease ${idx * 0.2}s`
                }}
              >
                <div className="w-24 h-24 mx-auto rounded-full bg-[#0a0f1a] border border-[#4ade80]/50 flex items-center justify-center text-[#4ade80] mb-6 relative z-10 shadow-[0_0_30px_rgba(74,222,128,0.15)]">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">0{idx + 1}. {step.title}</h3>
                <p className="text-gray-400 font-light leading-relaxed max-w-xs mx-auto">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
