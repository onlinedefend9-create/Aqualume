import React, { useEffect, useRef, useState } from 'react';
import mainImg from '../assets/images/regenerated_image_1779310653796.png';
import life1Img from '../assets/images/aqualume_hero_cinematic_v2_1779194153162.png';
import life2Img from '../assets/images/aqualume_blackout_lifestyle_1779190686659.png';
import detailImg from '../assets/images/aqualume_detail_activation_v1_1779191688943.png';

const Products: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(mainImg);
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    }, { threshold: 0.1 });

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const images = [mainImg, life1Img, life2Img, detailImg];

  return (
    <section id="products" className="py-24 px-6 bg-[#0a0f1a]">
      <div 
        ref={sectionRef} 
        className="max-w-6xl mx-auto"
        style={{ 
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 1s ease-out'
        }}
      >
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          
          {/* Left: Image Gallery */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <div className="w-full aspect-square rounded-3xl overflow-hidden bg-[#151b27] border border-white/5 shadow-[0_0_50px_rgba(74,222,128,0.1)] relative group">
              <img 
                src={selectedImage} 
                alt="AquaLume Water Lamp" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-full aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                    selectedImage === img 
                      ? 'border-[#4ade80] opacity-100 scale-105' 
                      : 'border-white/10 opacity-60 hover:opacity-100 hover:border-white/30'
                  }`}
                >
                  <img src={img} alt={`Gallery thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
            <div className="inline-block px-4 py-1.5 rounded-full border border-[#4ade80]/30 bg-[#4ade80]/10 text-[#4ade80] text-sm font-bold tracking-wide uppercase mb-6">
              New Arrival
            </div>
            
            <h2 className="text-5xl md:text-6xl font-black mb-4 tracking-tight leading-none text-white">
              AquaLume <br /> Water Lamp
            </h2>
            
            <p className="text-xl md:text-2xl text-[#4ade80] font-medium mb-8">
              "The lamp that purifies with light"
            </p>
            
            <p className="text-gray-300 text-lg leading-relaxed font-light mb-10 border-b border-white/10 pb-10">
              A revolutionary water-activated LED lamp. No batteries needed — just add water to activate the light. Perfect for emergencies, camping, and ambient home lighting.
            </p>
            
            <ul className="space-y-4 mb-12 w-full">
              {[
                "Activated by water — no batteries",
                "UV purification technology",
                "8-12 hours autonomy",
                "Waterproof & portable",
                "Eco-friendly, zero chemicals"
              ].map((feature, idx) => (
                <li key={idx} className="flex items-start gap-4 text-gray-200 font-light text-lg">
                  <span className="text-[#4ade80] text-xl leading-none font-bold mt-1">✦</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <div className="flex flex-col sm:flex-row items-center gap-8 w-full">
              <div className="text-5xl font-black text-white whitespace-nowrap">
                34.99 €
              </div>
              
              <a 
                href="https://www.aliexpress.com/item/1005012048993433.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex-1 bg-[#4ade80] text-[#151b27] px-10 py-5 rounded-full font-black text-xl uppercase tracking-widest relative overflow-hidden group transition-transform hover:scale-[1.02] active:scale-[0.98] text-center"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Order Now
                </span>
                <div className="absolute inset-0 bg-white/30 scale-0 rounded-full group-active:scale-150 transition-transform duration-500 ease-out origin-center" />
              </a>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Products;
