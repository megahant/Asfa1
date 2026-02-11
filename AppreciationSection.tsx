
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const messages = [
  "You didn't just teach us English; you taught us how to feel the soul of every story.",
  "Thank you for believing in us when we were still finding our own voices.",
  "Your classroom was a sanctuary of creativity and kindness.",
  "A true legend of St. Michaels—your impact is forever."
];

const AppreciationSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".tribute-msg", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "bottom center",
          scrub: 2,
        },
        x: (i) => i % 2 === 0 ? -100 : 100,
        opacity: 0,
        stagger: 0.3
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-40 relative overflow-hidden px-4">
      <div className="max-w-4xl mx-auto space-y-24">
        <div className="text-center mb-16">
          <h2 className="font-cinzel text-3xl md:text-4xl gold-text mb-4">Voices of Gratitude</h2>
          <p className="text-white/50 italic">Heartfelt messages from those you've inspired</p>
        </div>

        {messages.map((msg, i) => (
          <div 
            key={i} 
            className={`tribute-msg flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}
          >
            <blockquote className="max-w-md text-2xl md:text-3xl font-script text-[#d4af37]/90 text-center md:text-left leading-relaxed">
              "{msg}"
            </blockquote>
          </div>
        ))}
      </div>
      
      {/* Decorative large quotes */}
      <div className="absolute top-0 left-0 text-[20rem] font-serif text-[#d4af37]/5 pointer-events-none select-none">“</div>
      <div className="absolute bottom-0 right-0 text-[20rem] font-serif text-[#d4af37]/5 pointer-events-none select-none">”</div>
    </section>
  );
};

export default AppreciationSection;
