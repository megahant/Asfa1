
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import confetti from 'canvas-confetti';
import Certificate3D from './Certificate3D';

const CertificateSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const [isFullyVisible, setIsFullyVisible] = useState(false);

  useEffect(() => {
    gsap.fromTo(textContentRef.current,
      { opacity: 0, y: 50 },
      {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'top 20%',
          scrub: 1,
        },
        opacity: 1,
        y: 0,
      }
    );

    gsap.to(sectionRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 30%',
        onEnter: () => {
          if (!isFullyVisible) {
            setIsFullyVisible(true);
            confetti({
              particleCount: 150,
              spread: 70,
              origin: { y: 0.6 },
              colors: ['#d4af37', '#fcf6ba', '#b38728'],
              scalar: 2
            });
          }
        }
      }
    });
  }, [isFullyVisible]);

  return (
    <section 
      ref={sectionRef} 
      className="min-h-[160vh] flex flex-col items-center justify-start py-20 relative px-4"
    >
      <div className="w-full h-[600px] md:h-[800px] sticky top-20 z-20 pointer-events-none">
        <Certificate3D />
      </div>

      <div 
        ref={textContentRef}
        className="mt-[400px] max-w-2xl text-center space-y-10 z-10 relative bg-[#0b0f1a]/90 backdrop-blur-xl p-10 rounded-3xl border border-[#d4af37]/30 shadow-[0_0_50px_rgba(212,175,55,0.1)]"
      >
        <div>
          <p className="text-[#d4af37] font-cinzel tracking-[0.4em] text-sm uppercase mb-4">
            Legacy of a Mentor
          </p>
          <h2 className="text-6xl md:text-8xl font-cinzel gold-text font-black mb-6">
            ASFA
          </h2>
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto" />
        </div>

        <div className="space-y-6">
          <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-serif italic">
            &ldquo;For transforming words into windows, for teaching us to read between the lines of life, and for being the heartbeat of English Literature.&rdquo;
          </p>
          <p className="text-[#d4af37]/80 text-lg font-cinzel tracking-widest uppercase">
            A Teacher Forever in our Hearts
          </p>
        </div>
      </div>
    </section>
  );
};

export default CertificateSection;
