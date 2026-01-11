
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-20 px-8 border-t border-zinc-900 bg-[#050505]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-3xl font-bold syncopate mb-6">Aquarius Studio</h2>
          <p className="text-zinc-500 max-w-sm mb-8 leading-relaxed">
            The premium ink destination in Bengaluru. Marrying cosmic aesthetics with technical precision. 
            Located in the heart of Jayanagar 4th Block.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center hover:border-cyan-500 transition-colors">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center hover:border-cyan-500 transition-colors">
              <i className="fab fa-whatsapp"></i>
            </a>
            <a href="#" className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center hover:border-cyan-500 transition-colors">
              <i className="fas fa-map-marker-alt"></i>
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-6">Location</h4>
          <p className="text-zinc-400 text-sm leading-loose">
            #42, 4th Block<br />
            10th Main Road, Jayanagar<br />
            Bengaluru, Karnataka 560011
          </p>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-6">Hours</h4>
          <p className="text-zinc-400 text-sm leading-loose">
            Mon - Sat: 11 AM - 9 PM<br />
            Sunday: By Appointment Only<br />
            Closed on Public Holidays
          </p>
        </div>
      </div>
      
      <div className="mt-20 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-zinc-600">
        <span>© 2025 Aquarius Tattoo Studio</span>
        <span>Built by Cosmic Creative Agency</span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white">Privacy</a>
          <a href="#" className="hover:text-white">Terms</a>
        </div>
      </div>
    </footer>
  );
};
