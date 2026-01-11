
import React from 'react';
import { motion } from 'framer-motion';

export const Gallery: React.FC = () => {
  const items = [
    { title: 'Void Weaver', category: 'Fine Line', img: 'https://picsum.photos/600/800?1' },
    { title: 'Obsidian Flow', category: 'Blackwork', img: 'https://picsum.photos/601/801?2' },
    { title: 'Cyan Pulse', category: 'Cyberpunk', img: 'https://picsum.photos/602/802?3' },
    { title: 'Ethereal Soul', category: 'Minimalist', img: 'https://picsum.photos/603/803?4' },
    { title: 'Jayanagar Crest', category: 'Traditional', img: 'https://picsum.photos/604/804?5' },
    { title: 'Aquarius Heart', category: 'Abstract', img: 'https://picsum.photos/605/805?6' },
  ];

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
            className="group relative h-[500px] overflow-hidden rounded-3xl cursor-pointer"
          >
            <img 
              src={item.img} 
              alt={item.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
            
            <div className="absolute bottom-0 left-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform">
              <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest block mb-2">{item.category}</span>
              <h3 className="text-2xl font-bold">{item.title}</h3>
            </div>

            <div className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <i className="fas fa-plus text-cyan-400"></i>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
