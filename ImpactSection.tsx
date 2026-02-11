
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const traits = [
  { title: 'Wisdom', desc: 'The light that guides every student through the complexities of literature.' },
  { title: 'Inspiration', desc: 'Igniting a passion for words that transforms perspectives.' },
  { title: 'Grace', desc: 'Handling every challenge with the elegance of a true mentor.' }
];

const ImpactSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    gsap.fromTo(cardsRef.current,
      { opacity: 0, y: 100 },
      {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'center center',
          scrub: 1,
        },
        opacity: 1,
        y: 0,
        stagger: 0.2,
        ease: 'power3.out'
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-32 px-4 relative max-w-6xl mx-auto">
      <div className="text-center mb-20">
        <h3 className="font-cinzel text-[#d4af37] text-xl tracking-[0.3em] mb-4">THE GUIDING FORCE</h3>
        <h2 className="font-cinzel text-4xl md:text-5xl text-white">Three Pillars of Excellence</h2>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {traits.map((trait, i) => (
          <div 
            key={trait.title}
            // Fix: Ref callback must return void. Wrapping the assignment in braces prevents it from returning the element.
            ref={(el) => { if (el) cardsRef.current[i] = el; }}
            className="p-10 bg-white/5 border border-[#d4af37]/20 rounded-2xl backdrop-blur-md hover:border-[#d4af37]/50 transition-colors group"
          >
            <div className="w-12 h-12 border border-[#d4af37] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#d4af37] transition-all duration-500">
              <span className="text-[#d4af37] group-hover:text-[#0b0f1a] font-cinzel">0{i+1}</span>
            </div>
            <h4 className="font-cinzel text-2xl text-[#d4af37] mb-4">{trait.title}</h4>
            <p className="text-white/70 font-serif italic text-lg leading-relaxed">{trait.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ImpactSection;
