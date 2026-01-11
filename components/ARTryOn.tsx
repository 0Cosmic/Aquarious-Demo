
import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ARTryOnProps {
  onClose: () => void;
}

export const ARTryOn: React.FC<ARTryOnProps> = ({ onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [selectedTattoo, setSelectedTattoo] = useState(0);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [scale, setScale] = useState(1);

  const tattoos = [
    { name: 'Cosmic Koi', url: 'https://picsum.photos/300/300?grayscale' },
    { name: 'Obsidian Geometric', url: 'https://picsum.photos/301/301?grayscale' },
    { name: 'Neo-Trad Rose', url: 'https://picsum.photos/302/302?grayscale' },
    { name: 'Minimalist Wave', url: 'https://picsum.photos/303/303?grayscale' }
  ];

  useEffect(() => {
    async function setupCamera() {
      try {
        const s = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' }, 
          audio: false 
        });
        setStream(s);
        if (videoRef.current) {
          videoRef.current.srcObject = s;
        }
      } catch (err) {
        console.error("Camera error:", err);
      }
    }
    setupCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleDrag = (e: React.MouseEvent | React.TouchEvent) => {
    // Simple drag logic (simulated for demo)
    // Real implementation would use framer-motion drag or complex touch events
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      <div className="relative flex-1 bg-zinc-900 overflow-hidden">
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          className="w-full h-full object-cover grayscale opacity-60"
        />

        {/* Floating Tattoo Overlay */}
        <motion.div 
          drag
          dragMomentum={false}
          className="absolute cursor-move z-10"
          style={{ 
            left: `${position.x}%`, 
            top: `${position.y}%`, 
            transform: 'translate(-50%, -50%)',
            width: `${150 * scale}px`,
            height: `${150 * scale}px`
          }}
        >
          <img 
            src={tattoos[selectedTattoo].url} 
            className="w-full h-full object-contain mix-blend-multiply opacity-80" 
            alt="Tattoo Overlay"
            style={{ filter: 'contrast(1.5) brightness(0.8)' }}
          />
          <div className="absolute inset-0 border-2 border-cyan-500/20 rounded-lg pointer-events-none"></div>
        </motion.div>

        {/* UI Controls */}
        <div className="absolute top-6 left-6 right-6 flex justify-between items-center pointer-events-none">
          <button 
            onClick={onClose}
            className="w-12 h-12 bg-black/50 backdrop-blur-lg rounded-full flex items-center justify-center text-white pointer-events-auto border border-white/10"
          >
            <i className="fas fa-arrow-left"></i>
          </button>
          <div className="bg-black/50 backdrop-blur-lg px-4 py-2 rounded-full border border-white/10 pointer-events-auto">
            <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">AR Visualizer Mode</span>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-10 left-0 right-0 px-6 flex flex-col items-center gap-6">
          <div className="flex gap-4 w-full overflow-x-auto pb-4 no-scrollbar">
            {tattoos.map((t, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedTattoo(idx)}
                className={`flex-shrink-0 w-20 h-20 rounded-2xl border-2 transition-all p-1 ${
                  selectedTattoo === idx ? 'border-cyan-500 scale-110' : 'border-zinc-700 opacity-50'
                }`}
              >
                <img src={t.url} className="w-full h-full object-cover rounded-xl" />
              </button>
            ))}
          </div>
          
          <div className="flex gap-6 items-center">
             <button 
               onClick={() => setScale(s => Math.max(0.5, s - 0.1))}
               className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center"
             >
               <i className="fas fa-minus"></i>
             </button>
             <span className="text-xs font-bold uppercase tracking-widest">Scale</span>
             <button 
               onClick={() => setScale(s => Math.min(2, s + 0.1))}
               className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center"
             >
               <i className="fas fa-plus"></i>
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};
