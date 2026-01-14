
import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface PriceEngineProps {
  onClose: () => void;
}

export const PriceEngine: React.FC<PriceEngineProps> = ({ onClose }) => {
  const [size, setSize] = useState(2); // in inches
  const [detail, setDetail] = useState(1); // 1-3
  const [color, setColor] = useState(false);

  const calculatePrice = () => {
    const base = 2500;
    const sizeMultiplier = size * 500;
    const detailMultiplier = detail === 1 ? 1 : detail === 2 ? 1.5 : 2.2;
    const colorAdd = color ? 1500 : 0;
    
    return Math.round((base + sizeMultiplier) * detailMultiplier + colorAdd);
  };

  return (
    <div 
      className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl overflow-y-auto"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-2xl bg-zinc-900 border border-cyan-500/20 p-6 sm:p-10 rounded-[2.5rem] relative overflow-hidden my-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[100px] rounded-full -mr-32 -mt-32 pointer-events-none"></div>
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors z-20 p-2"
        >
          <i className="fas fa-times text-2xl"></i>
        </button>

        <h2 className="text-2xl sm:text-4xl font-bold mb-10 syncopate text-cyan-400">Price Engine</h2>

        <div className="space-y-12">
          {/* Size Slider */}
          <div className="relative">
            <div className="flex justify-between items-end mb-6">
              <label className="text-zinc-500 uppercase text-[10px] font-bold tracking-[0.3em]">Tattoo Magnitude (Inches)</label>
              <span className="text-cyan-400 font-bold text-3xl">{size}"</span>
            </div>
            
            <div className="relative h-12 flex items-center px-2" style={{ touchAction: 'pan-x' }}>
              <input 
                type="range" 
                min="1" 
                max="12" 
                step="1"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          {/* Detail Level */}
          <div>
            <label className="text-zinc-500 uppercase text-[10px] font-bold tracking-[0.3em] block mb-6">Fidelity Protocol</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { id: 1, label: 'Minimal', icon: 'fa-feather' },
                { id: 2, label: 'Standard', icon: 'fa-pen-nib' },
                { id: 3, label: 'Hyper-Real', icon: 'fa-eye' }
              ].map((lvl) => (
                <button
                  key={lvl.id}
                  onClick={() => setDetail(lvl.id)}
                  className={`p-5 rounded-2xl border transition-all flex flex-col items-center gap-3 ${
                    detail === lvl.id 
                    ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400' 
                    : 'border-zinc-800 text-zinc-500 hover:border-zinc-700 bg-zinc-800/20'
                  }`}
                >
                  <i className={`fas ${lvl.icon} text-lg`}></i>
                  <span className="text-[10px] font-black uppercase tracking-widest">{lvl.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Color Toggle */}
          <div className="p-6 bg-zinc-800/30 rounded-3xl border border-white/5 flex items-center justify-between cursor-pointer" onClick={() => setColor(!color)}>
            <div className="flex items-center gap-5">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 ${color ? 'bg-cyan-500 shadow-[0_0_20px_rgba(0,229,255,0.4)]' : 'bg-zinc-800'}`}>
                <i className={`fas fa-palette text-lg ${color ? 'text-black' : 'text-zinc-600'}`}></i>
              </div>
              <span className="text-xs font-bold uppercase tracking-[0.2em]">Chromatic Infusion</span>
            </div>
            <div className={`w-16 h-8 rounded-full transition-all duration-300 relative p-1 ${color ? 'bg-cyan-500' : 'bg-zinc-700'}`}>
              <div className={`w-6 h-6 bg-white rounded-full transition-all duration-300 ${color ? 'translate-x-8' : 'translate-x-0'}`}></div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-10 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-8 text-center sm:text-left">
          <div>
            <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.4em] block mb-2">ESTIMATED INVESTMENT</span>
            <div className="text-5xl sm:text-6xl font-black text-cyan-400">
              <span className="text-2xl mr-1">₹</span>
              {calculatePrice().toLocaleString()}
            </div>
          </div>
          <button className="w-full sm:w-auto px-12 py-5 bg-white text-black font-black text-sm tracking-[0.2em] rounded-full hover:bg-cyan-400 transition-all uppercase">
            Book Now
          </button>
        </div>
      </motion.div>
    </div>
  );
};
