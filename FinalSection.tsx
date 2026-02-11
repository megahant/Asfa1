
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const FinalSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.fromTo(textRef.current,
      { opacity: 0, scale: 0.95, filter: 'blur(10px)' },
      {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          end: 'center center',
          scrub: 1,
        },
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
      }
    );

    gsap.to(containerRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'bottom 80%',
        end: 'bottom top',
        scrub: true,
      },
      backgroundColor: '#000000',
    });
  }, []);

  return (
    <section 
      ref={containerRef}
      className="h-screen flex flex-col items-center justify-center text-center px-4 relative"
    >
      <h2 
        ref={textRef}
        className="font-cinzel text-3xl md:text-5xl lg:text-6xl gold-text max-w-4xl leading-tight font-bold drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]"
      >
        To The Teacher Who Turned Words Into Worlds.
      </h2>
      
      <div className="mt-20 opacity-30">
        <div className="w-12 h-12 border border-[#d4af37] rounded-full flex items-center justify-center animate-pulse">
          <div className="w-2 h-2 bg-[#d4af37] rounded-full" />
        </div>
      </div>

      <footer className="absolute bottom-10 text-[#f5f5f5]/30 font-cinzel text-xs tracking-[0.3em]">
        EST. 2024 • ST. MICHAELS CONVENT SCHOOL
      </footer>
    </section>
  );
};

export default FinalSection;
