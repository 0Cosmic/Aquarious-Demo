
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import { Experience } from './components/Experience.tsx';
import { PriceEngine } from './components/PriceEngine.tsx';
import { ARTryOn } from './components/ARTryOn.tsx';
import { Gallery } from './components/Gallery.tsx';
import { Navbar } from './components/Navbar.tsx';
import { Footer } from './components/Footer.tsx';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<'home' | 'ar' | 'price'>('home');
  const [scrolled, setScrolled] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const h = document.documentElement;
      const b = document.body;
      const st = 'scrollTop';
      const sh = 'scrollHeight';
      const scrollPos = (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight);
      setScrolled(isNaN(scrollPos) ? 0 : scrollPos);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (activeView !== 'home') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [activeView]);

  return (
    <div className="relative min-h-screen bg-[#050505] text-white selection:bg-cyan-500/30">
      <Navbar onNav={(view) => setActiveView(view)} activeView={activeView} />

      <AnimatePresence mode="wait">
        {activeView === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Hero Section */}
            <section className="relative h-[300vh] lg:h-[300vh]">
              <div className="sticky top-0 h-screen w-full overflow-hidden">
                {/* 3D background wrapper - pointer-events-none ensures user can scroll through the planet */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                   <Experience progress={scrolled} />
                </div>
                
                {/* Hero Overlay Text */}
                <div 
                  className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-4 text-center z-10"
                  style={{ opacity: Math.max(0, 1 - scrolled * 6) }}
                >
                  <motion.h1 
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 drop-shadow-2xl syncopate"
                  >
                    Aquarius
                  </motion.h1>
                  <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-cyan-400 text-[10px] md:text-sm tracking-[0.5em] uppercase font-bold"
                  >
                    Jayanagar's Cosmic Ink Protocol
                  </motion.p>
                </div>

                {/* Info Overlay */}
                <div 
                  className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-6 text-center z-10"
                  style={{ 
                    opacity: Math.max(0, (scrolled - 0.2) * 5),
                    transform: `translateY(${(0.5 - scrolled) * 50}px)`
                  }}
                >
                  <h2 className="text-3xl md:text-5xl font-bold mb-6 syncopate">The Sanctuary</h2>
                  <p className="max-w-xl text-zinc-400 text-sm md:text-base leading-relaxed bg-black/40 backdrop-blur-xl p-6 rounded-3xl border border-white/5">
                    We specialize in futuristic geometry and hyper-realism. Our studio in Jayanagar is a fusion of advanced technology and traditional craftsmanship.
                  </p>
                </div>
              </div>
            </section>

            {/* Gallery */}
            <div className="relative z-20 bg-[#050505] -mt-[1px]">
              <Gallery />
            </div>

            {/* Final CTA */}
            <section className="relative z-20 py-32 px-6 flex flex-col items-center justify-center text-center bg-zinc-950 border-t border-white/5">
              <h2 className="text-4xl md:text-6xl font-bold mb-12 max-w-4xl syncopate">Ready for Transformation?</h2>
              <div className="flex flex-col sm:flex-row gap-6">
                <button 
                  onClick={() => setActiveView('ar')}
                  className="px-10 py-5 bg-cyan-500 text-black font-bold rounded-full hover:bg-white transition-all shadow-[0_0_30px_rgba(6,182,212,0.4)]"
                >
                  START AR TRY-ON
                </button>
                <button 
                  onClick={() => setActiveView('price')}
                  className="px-10 py-5 border border-cyan-500/50 hover:border-cyan-400 rounded-full font-bold transition-all"
                >
                  CALCULATE PRICE
                </button>
              </div>
            </section>
          </motion.div>
        )}

        {activeView === 'ar' && (
          <motion.div
            key="ar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200]"
          >
            <ARTryOn onClose={() => setActiveView('home')} />
          </motion.div>
        )}

        {activeView === 'price' && (
          <motion.div
            key="price"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200]"
          >
            <PriceEngine onClose={() => setActiveView('home')} />
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<App />);
}
