
import React, { useState } from 'react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-2xl bg-zinc-900 border border-cyan-500/20 p-8 rounded-3xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full -mr-16 -mt-16"></div>
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors"
        >
          <i className="fas fa-times text-xl"></i>
        </button>

        <h2 className="text-3xl font-bold mb-8 syncopate text-cyan-400">Jayanagar Price Engine</h2>

        <div className="space-y-8">
          {/* Size Slider */}
          <div>
            <div className="flex justify-between mb-4">
              <label className="text-zinc-400 uppercase text-xs tracking-widest">Tattoo Size (Inches)</label>
              <span className="text-white font-bold">{size}"</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="12" 
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
          </div>

          {/* Detail Level */}
          <div>
            <label className="text-zinc-400 uppercase text-xs tracking-widest block mb-4">Detail Level</label>
            <div className="grid grid-cols-3 gap-4">
              {[
                { id: 1, label: 'Minimal', icon: 'fa-feather' },
                { id: 2, label: 'Standard', icon: 'fa-pen-nib' },
                { id: 3, label: 'Hyper-Real', icon: 'fa-eye' }
              ].map((lvl) => (
                <button
                  key={lvl.id}
                  onClick={() => setDetail(lvl.id)}
                  className={`py-4 rounded-xl border transition-all flex flex-col items-center gap-2 ${
                    detail === lvl.id 
                    ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400 shadow-[0_0_15px_-5px_rgba(6,182,212,0.3)]' 
                    : 'border-zinc-800 text-zinc-500 hover:border-zinc-700'
                  }`}
                >
                  <i className={`fas ${lvl.icon}`}></i>
                  <span className="text-[10px] font-bold uppercase">{lvl.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Color Toggle */}
          <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-2xl">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${color ? 'bg-gradient-to-tr from-pink-500 via-cyan-500 to-yellow-500' : 'bg-zinc-800'}`}>
                <i className="fas fa-palette text-sm"></i>
              </div>
              <div>
                <span className="block text-sm font-bold uppercase">Color Infusion</span>
                <span className="text-[10px] text-zinc-500 uppercase">Multi-tone pigments</span>
              </div>
            </div>
            <button 
              onClick={() => setColor(!color)}
              className={`w-14 h-8 rounded-full transition-colors relative ${color ? 'bg-cyan-500' : 'bg-zinc-700'}`}
            >
              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${color ? 'left-7' : 'left-1'}`}></div>
            </button>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-zinc-500 text-xs uppercase tracking-widest block mb-1">Estimated Investment</span>
            <div className="text-5xl font-bold flex items-baseline gap-2">
              <span className="text-cyan-400 text-2xl">₹</span>
              <span>{calculatePrice().toLocaleString()}</span>
            </div>
          </div>
          <button className="w-full sm:w-auto px-10 py-5 bg-white text-black font-bold rounded-full hover:bg-cyan-500 transition-all transform hover:scale-105 active:scale-95">
            BOOK CONSULTATION
          </button>
        </div>
      </motion.div>
    </div>
  );
};
