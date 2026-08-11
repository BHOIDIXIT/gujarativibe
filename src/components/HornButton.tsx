/**
 * Playful "🔊 હૉર્ન વગાડો" (Honk the Horn) button component
 */

import React, { useState } from 'react';
import { playTruckHorn } from '../utils/hornSound';
import { Volume2, Sparkles, Flame } from 'lucide-react';

interface HornButtonProps {
  className?: string;
  variant?: 'floating' | 'inline' | 'hero';
}

export const HornButton: React.FC<HornButtonProps> = ({ className = '', variant = 'inline' }) => {
  const [isHonking, setIsHonking] = useState(false);
  const [honkCount, setHonkCount] = useState(0);

  const handleHonk = (type: 'classic' | 'pressure' | 'dipper' = 'classic') => {
    setIsHonking(true);
    playTruckHorn(type);
    setHonkCount((prev) => prev + 1);

    setTimeout(() => {
      setIsHonking(false);
    }, 450);
  };

  if (variant === 'hero') {
    return (
      <div className={`relative group inline-flex flex-col items-center ${className}`}>
        <button
          onClick={() => handleHonk('pressure')}
          title="હૉર્ન વગાડો (Honk Truck Horn)"
          id="btn-honk-horn-hero"
          className={`relative z-10 flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-slate-950 font-extrabold text-sm sm:text-base shadow-lg shadow-orange-600/40 hover:shadow-orange-500/60 hover:scale-105 active:scale-95 transition-all duration-200 border border-white/20 font-gujarati ${
            isHonking ? 'animate-bounce ring-4 ring-orange-400/80 scale-110' : ''
          }`}
        >
          <Volume2 className={`w-5 h-5 ${isHonking ? 'animate-spin' : ''}`} />
          <span className="tracking-wide">🔊 હૉર્ન વગાડો</span>
          {honkCount > 0 && (
            <span className="ml-1 px-2 py-0.5 text-xs bg-slate-950/80 text-orange-300 rounded-full font-sans border border-orange-400/40">
              {honkCount}
            </span>
          )}
        </button>

        {/* Floating fun tag */}
        <div className="mt-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
          <span className="text-[11px] font-gujarati text-orange-200/90 bg-black/40 backdrop-blur-sm px-3 py-0.5 rounded-full border border-orange-500/20">
            સાવધાન! આગળ હાઇવે છે 🚚
          </span>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => handleHonk('classic')}
      id="btn-honk-horn-inline"
      className={`relative inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-600/20 border border-orange-500/40 text-orange-400 font-bold text-xs hover:bg-orange-500 hover:text-white transition-all active:scale-95 font-gujarati shadow-sm ${
        isHonking ? 'scale-105 bg-orange-500 text-white ring-2 ring-orange-300' : ''
      } ${className}`}
    >
      <Volume2 className={`w-4 h-4 ${isHonking ? 'animate-ping' : ''}`} />
      <span>🔊 હૉર્ન</span>
    </button>
  );
};
