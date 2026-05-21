import React, { useEffect, useRef, useState } from 'react';
import { Droplets, Sparkles, Leaf } from 'lucide-react';

const Features: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean[]>([false, false, false]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setIsVisible(prev => {
              const newState = [...prev];
              newState[index] = true;
              return newState;
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: <Droplets size={32} className="text-[#4ade80]" />,
      title: "Pure Water",
      desc: "Advanced UV-C purification technology eliminates 99.99% of harmful pathogens instantly.",
    },
    {
      icon: <Sparkles size={32} className="text-[#4ade80]" />,
      title: "Smart Light",
      desc: "Adaptive LED system provides perfect ambient lighting, adjusting to your environment naturally.",
    },
    {
      icon: <Leaf size={32} className="text-[#4ade80]" />,
      title: "Eco Friendly",
      desc: "Zero chemical additives and sustainable design minimizes your carbon footprint effortlessly.",
    }
  ];

  return (
    <section id="features" className="py-24 px-6 bg-[#151b27]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4">Mastering the Elements</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">Harnessing the power of advanced technology to deliver unparalleled purity and illumination.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feat, idx) => (
            <div 
              key={idx}
              data-index={idx}
              ref={el => cardRefs.current[idx] = el}
              className="bg-[#0a0f1a] rounded-3xl p-8 border border-white/5 hover:border-[#4ade80]/50 hover:shadow-[0_0_30px_rgba(74,222,128,0.15)] transition-all duration-500 group"
              style={{ 
                opacity: isVisible[idx] ? 1 : 0,
                transform: isVisible[idx] ? 'translateY(0)' : 'translateY(40px)',
                transition: `all 0.7s ease ${idx * 0.15}s`
              }}
            >
              <div className="w-16 h-16 rounded-2xl bg-[#151b27] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-white/5">
                {feat.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{feat.title}</h3>
              <p className="text-gray-400 leading-relaxed font-light">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
