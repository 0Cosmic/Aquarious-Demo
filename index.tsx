
import React, { useState, useEffect, useRef, useMemo } from 'react';
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
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total <= 0) return;
      const scrollPos = window.scrollY / total;
      setScrolled(scrollPos);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger once on mount to set initial scroll state
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when overlays are active
  useEffect(() => {
    if (activeView !== 'home') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [activeView]);

  return (
    <div className="relative min-h-screen bg-[#050505] text-white selection:bg-cyan-500/30 overflow-x-hidden">
      <Navbar onNav={(view) => setActiveView(view)} activeView={activeView} />

      <AnimatePresence mode="wait">
        {activeView === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Hero Section with 3D Planet */}
            <section className="relative h-[300vh] sm:h-[400vh] lg:h-[300vh]">
              <div className="sticky top-0 h-screen w-full overflow-hidden">
                {/* 3D background wrapper - set pointer-events to none so clicks/scrolls fall through to canvas/page */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                   <Experience progress={scrolled} />
                </div>
                
                {/* Hero Overlay Text */}
                <div 
                  className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-4 text-center z-10"
                  style={{ opacity: 1 - scrolled * 5 }}
                >
                  <motion.h1 
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 drop-shadow-2xl"
                  >
                    Aquarius
                  </motion.h1>
                  <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="text-cyan-400 text-xs md:text-lg tracking-[0.5em] uppercase font-semibold"
                  >
                    Jayanagar's Cosmic Ink Protocol
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-12 flex flex-col items-center gap-2"
                  >
                    <span className="text-[10px] uppercase tracking-widest text-zinc-400 animate-pulse">Scroll to Enter</span>
                    <div className="w-px h-12 bg-gradient-to-b from-cyan-400 to-transparent"></div>
                  </motion.div>
                </div>

                {/* Second Phase Overlay - Information reveals as you scroll */}
                <div 
                  className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-4 text-center z-10"
                  style={{ 
                    opacity: Math.max(0, (scrolled - 0.15) * 4), 
                    visibility: scrolled > 0.15 ? 'visible' : 'hidden',
                    transform: `translateY(${(1 - scrolled) * 20}px)`
                  }}
                >
                  <h2 className="text-3xl md:text-5xl font-bold mb-6">Our Signature Works</h2>
                  <p className="max-w-xl text-zinc-300 text-sm md:text-base leading-relaxed bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-2xl">
                    From deep obsidian blacks to glowing cyan details, our artistry transcends the ordinary. 
                    Welcome to the Aquarius World.
                  </p>
                </div>
              </div>
            </section>

            {/* Content Sections */}
            <div className="relative z-20 bg-[#050505] shadow-[0_-20px_50px_rgba(0,0,0,0.9)]">
              <Gallery />
            </div>

            {/* CTA Section */}
            <section className="relative z-20 py-32 px-6 flex flex-col items-center justify-center text-center bg-zinc-950 border-t border-white/5">
              <h2 className="text-4xl md:text-6xl font-bold mb-12 max-w-4xl">Ready for your skin's transformation?</h2>
              <div className="flex flex-col sm:flex-row gap-6">
                <button 
                  onClick={() => setActiveView('ar')}
                  className="px-10 py-5 bg-cyan-500 text-black font-bold rounded-full hover:bg-white transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_30px_-5px_rgba(6,182,212,0.5)]"
                >
                  START AR TRY-ON
                </button>
                <button 
                  onClick={() => setActiveView('price')}
                  className="px-10 py-5 border border-cyan-500/50 hover:border-cyan-400 rounded-full font-bold transition-all transform hover:scale-105 active:scale-95"
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
