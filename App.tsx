
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Experience } from './components/Experience';
import { PriceEngine } from './components/PriceEngine';
import { ARTryOn } from './components/ARTryOn';
import { Gallery } from './components/Gallery';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<'home' | 'ar' | 'price'>('home');
  const [scrolled, setScrolled] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      setScrolled(scrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
            {/* Hero Section with 3D Planet */}
            <section className="relative h-[300vh]">
              <div className="sticky top-0 h-screen w-full overflow-hidden">
                <Experience progress={scrolled} />
                
                {/* Hero Overlay Text */}
                <div 
                  className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-4 text-center"
                  style={{ opacity: 1 - scrolled * 4 }}
                >
                  <motion.h1 
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="text-4xl md:text-7xl lg:text-8xl font-bold mb-4"
                  >
                    Aquarius
                  </motion.h1>
                  <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="text-cyan-400 text-sm md:text-lg tracking-[0.5em] uppercase"
                  >
                    Jayanagar's Cosmic Ink Protocol
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-12 flex flex-col items-center gap-2"
                  >
                    <span className="text-[10px] uppercase tracking-widest text-zinc-500">Scroll to Enter</span>
                    <div className="w-px h-12 bg-gradient-to-b from-cyan-400 to-transparent"></div>
                  </motion.div>
                </div>

                {/* Second Phase Overlay */}
                <div 
                  className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-4 text-center"
                  style={{ opacity: (scrolled - 0.25) * 4, visibility: scrolled > 0.25 ? 'visible' : 'hidden' }}
                >
                  <h2 className="text-3xl md:text-5xl font-bold mb-6">Our Signature Works</h2>
                  <p className="max-w-xl text-zinc-400 text-sm md:text-base">
                    From deep obsidian blacks to glowing cyan details, our artistry transcends the ordinary. 
                    Welcome to the Aquarius World.
                  </p>
                </div>
              </div>
            </section>

            {/* Gallery Section */}
            <Gallery />

            {/* CTA Section */}
            <section className="py-32 px-6 flex flex-col items-center justify-center text-center bg-zinc-950">
              <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready for your skin's transformation?</h2>
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
          >
            <PriceEngine onClose={() => setActiveView('home')} />
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default App;
