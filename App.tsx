
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import Hero from './components/Hero';
import CertificateSection from './components/CertificateSection';
import ImpactSection from './components/ImpactSection';
import AppreciationSection from './components/AppreciationSection';
import FinalSection from './components/FinalSection';
import ParticleBackground from './components/ParticleBackground';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(raf);
    };
  }, []);

  return (
    <div ref={scrollContainerRef} className="relative bg-[#0b0f1a] selection:bg-[#d4af37] selection:text-[#0b0f1a]">
      <div className="fixed inset-0 pointer-events-none z-0">
        <ParticleBackground />
      </div>

      <main className="relative z-10">
        <Hero />
        <ImpactSection />
        <CertificateSection />
        <AppreciationSection />
        <FinalSection />
      </main>

      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(11,15,26,0.6)_100%)]" />
    </div>
  );
};

export default App;
