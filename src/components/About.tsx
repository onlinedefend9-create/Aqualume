import React from 'react';
import { Droplets, Globe, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 bg-[#151b27] text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              {t.aboutTitle}<span className="text-[#4ade80]">{t.aboutTitleHighlight}</span>
            </h2>
            <p className="text-lg text-gray-300 font-light mb-6 leading-relaxed">
              {t.aboutDesc1}
            </p>
            <p className="text-lg text-gray-300 font-light mb-8 leading-relaxed">
              {t.aboutDesc2}
            </p>
            
            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-[#4ade80]">
                <Globe size={20} />
                <span className="text-sm font-bold uppercase tracking-wider">{t.aboutBadgeDurable}</span>
              </div>
              <div className="flex items-center gap-2 text-[#4ade80]">
                <ShieldCheck size={20} />
                <span className="text-sm font-bold uppercase tracking-wider">{t.aboutBadgeReliable}</span>
              </div>
            </div>
          </div>
          <div className="relative mx-4 md:mx-0 mt-8 md:mt-0">
            <div className="absolute inset-0 bg-[#4ade80] rounded-3xl transform rotate-3 opacity-20"></div>
            <div className="relative bg-[#0a0f1a] p-8 rounded-3xl border border-white/10">
              <Droplets className="text-[#4ade80] w-16 h-16 mb-6" />
              <h3 className="text-2xl font-bold mb-4">{t.aboutMissionTitle}</h3>
              <p className="text-gray-400 leading-relaxed text-left font-light">
                {t.aboutMissionDesc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
