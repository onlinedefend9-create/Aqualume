import React, { useEffect, useRef } from 'react';
import { Star } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

const Testimonials: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
        }
      });
    }, { threshold: 0.1 });

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const reviews = [
    { text: t.testi1Text, name: "Sarah J.", loc: "Paris, FR", initials: "SJ", color: "bg-emerald-600" },
    { text: t.testi2Text, name: "Marcus T.", loc: "Lyon, FR", initials: "MT", color: "bg-blue-600" },
    { text: t.testi3Text, name: "Elena R.", loc: "Geneva, CH", initials: "ER", color: "bg-indigo-600" }
  ];

  return (
    <section className="py-24 px-6 bg-[#0a0f1a]">
      <div ref={sectionRef} className="max-w-7xl mx-auto opacity-0 translate-y-10 transition-all duration-1000 flex flex-col pt-10 pb-10">
        <h2 className="text-4xl md:text-5xl font-black text-center mb-16">{t.testimonialsTitle}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, i) => (
            <div key={i} className="bg-[#151b27] p-8 rounded-3xl border border-white/5 flex flex-col justify-between hover:border-[#4ade80]/30 transition-colors">
              <div>
                <div className="flex gap-1 mb-6 text-[#4ade80]">
                  {[1,2,3,4,5].map(star => <Star key={star} size={16} fill="currentColor" />)}
                </div>
                <p className="text-gray-300 italic mb-8 font-light leading-relaxed text-lg">"{rev.text}"</p>
              </div>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full ${rev.color} flex items-center justify-center font-bold text-white text-lg`}>
                  {rev.initials}
                </div>
                <div>
                  <h4 className="font-bold text-white tracking-wide">{rev.name}</h4>
                  <p className="text-[#4ade80] text-sm">{rev.loc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
