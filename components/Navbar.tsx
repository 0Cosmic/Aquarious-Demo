
import React from 'react';

interface NavbarProps {
  onNav: (view: 'home' | 'ar' | 'price') => void;
  activeView: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNav, activeView }) => {
  return (
    <nav className="fixed top-0 left-0 w-full z-[100] px-8 py-6 flex justify-between items-center pointer-events-none">
      <div 
        className="pointer-events-auto cursor-pointer" 
        onClick={() => onNav('home')}
      >
        <span className="syncopate text-xl font-bold tracking-widest text-cyan-400">AQRS</span>
      </div>

      <div className="hidden md:flex gap-12 pointer-events-auto bg-black/20 backdrop-blur-md px-10 py-4 rounded-full border border-white/10">
        {[
          { id: 'home', label: 'Sanctuary' },
          { id: 'ar', label: 'Ink-Vision' },
          { id: 'price', label: 'Engine' }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => onNav(item.id as any)}
            className={`text-[10px] font-bold uppercase tracking-[0.3em] transition-all hover:text-cyan-400 ${
              activeView === item.id ? 'text-cyan-400' : 'text-white'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="pointer-events-auto">
        <button className="w-12 h-12 bg-cyan-500 text-black rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg shadow-cyan-500/20">
          <i className="fas fa-calendar-alt"></i>
        </button>
      </div>
    </nav>
  );
};
