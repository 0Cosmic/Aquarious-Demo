
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

  // Explicit change handler for better mobile responsiveness
  const handleSizeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSize(Number(e.target.value));
  }, []);

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 bg-black/95 backdrop-blur-2xl overflow-y-auto">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-2xl bg-zinc-900 border border-cyan-500/20 p-6 sm:p-8 rounded-3xl relative overflow-hidden my-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full -mr-16 -mt-16"></div>
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors z-20 p-2"
        >
          <i className="fas fa-times text-xl"></i>
        </button>

        <h2 className="text-2xl sm:text-3xl font-bold mb-8 syncopate text-cyan-400 pr-8">Price Engine</h2>

        <div className="space-y-10