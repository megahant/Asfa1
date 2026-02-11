
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const schoolRef = useRef<HTMLDivElement>(null);
  const presentsRef = useRef<HTMLDivElement>(null);
  const certRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(titleRef.current, 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 2, ease: 'expo.out' }
    )
    .fromTo(schoolRef.current, 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' },
      '-=1.5'
    )
    .fromTo(presentsRef.current, 
      { opacity: 0, scale: 0.9, letterSpacing: '0.1em' }, 
      { opacity: 1, scale: 1, letterSpacing: '0.3em', duration: 2, ease: 'power2.out' },
      '-=0.8'
    )
    .fromTo(certRef.current, 
      { opacity: 0, scale: 1.15, filter: 'blur(20px)' }, 
      { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 3, ease: 'expo.out' },
      '-=1'
    );

    gsap.to(containerRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
      y: 150,
      opacity: 0,
    });
  }, []);

  return (
    <section 
      ref={containerRef}
      className="h-screen flex flex-col items-center justify-center text-center px-4 relative overflow-hidden"
    >
      <div className="space-y-8 max-w-5xl mx-auto z-10">
        <div ref={titleRef} className="font-cinzel text-xs md:text-sm tracking-[0.5em] text-[#d4af37]">
          DEPARTMENT OF EDUCATIONAL EXCELLENCE
        </div>
        <div ref={schoolRef} className="font-cinzel text-xl md:text-4xl tracking-[0.2em] text-white font-light">
          ST. MICHAELS CONVENT SCHOOL
        </div>
        <div ref={presentsRef} className="font-script text-3xl md:text-5xl text-white/40 py-4">
          Proudly Honors
        </div>
        <h1 
          ref={certRef} 
          className="font-cinzel text-5xl md:text-8xl lg:text-9xl gold-text font-black drop-shadow-[0_0_30px_rgba(212,175,55,0.2)] leading-[0.9]"
        >
          A Lifetime <br /> <span className="text-[0.6em] tracking-normal">of Inspiration</span>
        </h1>
      </div>
      
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-50">
        <span className="font-cinzel text-[10px] tracking-[0.4em] text-[#d4af37] mb-4">SCROLL TO REVEAL</span>
        <div className="w-px h-24 bg-gradient-to-b from-[#d4af37] to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
