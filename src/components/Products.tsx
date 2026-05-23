import React, { useState } from 'react';
import mainImg from '../assets/images/regenerated_image_1779310653796.png';
import life1Img from '../assets/images/aqualume_hero_cinematic_v2_1779194153162.png';
import life2Img from '../assets/images/aqualume_blackout_lifestyle_1779190686659.png';
import detailImg from '../assets/images/aqualume_detail_activation_v1_1779191688943.png';
import { useLanguage } from '../lib/LanguageContext';

const Products: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState(mainImg);
  const { language, t } = useLanguage();

  const images = [mainImg, life1Img, life2Img, detailImg];

  return (
    <section id="products" className="py-24 px-6 bg-[#0a0f1a]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          
          {/* Left: Image Gallery */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <div className="w-full aspect-square rounded-3xl overflow-hidden bg-[#151b27] border border-white/5 shadow-[0_0_50px_rgba(74,222,128,0.1)] relative group">
              <img 
                src={selectedImage} 
                alt="AquaLume Water Lamp" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                referrerPolicy="no-referrer"
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
                  <img src={img} alt={`Gallery thumbnail ${idx + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
            <div className="inline-block px-4 py-1.5 rounded-full border border-[#4ade80]/30 bg-[#4ade80]/10 text-[#4ade80] text-sm font-bold tracking-wide uppercase mb-6">
              {t.prodBadgeNew}
            </div>
            
            <h2 className="text-5xl md:text-6xl font-black mb-4 tracking-tight leading-none text-white">
              {t.prodTitle}
            </h2>
            
            <p className="text-xl md:text-2xl text-[#4ade80] font-medium mb-8">
              {t.prodSubtitle}
            </p>
            
            <p className="text-gray-300 text-lg leading-relaxed font-light mb-10 border-b border-white/10 pb-10">
              {t.prodDesc}
            </p>
            
            <ul className="space-y-4 mb-12 w-full">
              {[
                t.prodBullet1,
                t.prodBullet2,
                t.prodBullet3,
                t.prodBullet4,
                t.prodBullet5
              ].map((feature, idx) => (
                <li key={idx} className="flex items-start gap-4 text-gray-200 font-light text-lg">
                  <span className="text-[#4ade80] text-xl leading-none font-bold mt-1">✦</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <div className="flex flex-col gap-6 mt-4 pt-8 w-full border-t border-white/10">
              <div className="text-5xl font-black text-white whitespace-nowrap">
                {language === 'fr' ? '34.99 €' : '$34.99'}
              </div>
              
              <div className="flex flex-col gap-3 w-full">
                {/* Checkout Button */}
                <a
                  href="https://www.paypal.com/ncp/payment/9BR8ACKHBSX4Y"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-[#FFC439] text-[#003087] font-bold text-lg
                              rounded-full flex items-center justify-center gap-2 hover:bg-[#F2BA36] transition-all"
                >
                  <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6" />
                </a>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Products;
