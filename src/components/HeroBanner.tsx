/**
 * Hero Banner with Gujarati calligraphy wordmark, tagline, live status pill,
 * and quick player launcher.
 */

import React from 'react';
import { Track } from '../types';
import { Radio } from 'lucide-react';

interface HeroBannerProps {
  currentTrack: Track | null;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  currentTrack,
}) => {
  return (
    <div className="relative z-20 w-full pt-4 pb-8 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
      
      {/* Live Status Pill */}
      <div className="flex items-center justify-center w-full max-w-3xl mb-4 sm:mb-6">
        <div className="inline-flex items-center gap-3 bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 shadow-xl max-w-full overflow-hidden">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shrink-0"></div>
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-green-400 font-sans shrink-0">
            ● હવે વાગે છે — મારો અવાજ
          </span>
          <span className="text-white/20 shrink-0">|</span>
          <div className="overflow-hidden whitespace-nowrap relative flex-1 text-left min-w-[120px]">
            {currentTrack ? (
              <div className="animate-marquee inline-block font-semibold text-orange-200/90 font-gujarati text-xs">
                <span className="mr-8">{currentTrack.title} — {currentTrack.artist}</span>
                <span className="mr-8">{currentTrack.title} — {currentTrack.artist}</span>
              </div>
            ) : (
              <span className="text-orange-200/70 font-gujarati text-xs">
                ૧૦૮ FM · ગુજ્જુ સ્પેશિયલ રેડિયો
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Center Display: Calligraphy Heading */}
      <header className="relative z-10 flex flex-col items-center text-center my-4 sm:my-8 select-none">
        
        {/* Brush Calligraphy Title: "હું ગુજરાતી" */}
        <div className="relative">
          <h1
            className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-bold text-[#F5F5DC] font-yatra tracking-tight leading-none drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]"
            style={{ textShadow: '0 4px 30px rgba(255, 78, 0, 0.5)' }}
          >
            હું ગુજરાતી
          </h1>
          
          {/* Subtle warm painted stroke accent under text */}
          <div className="w-full h-2 sm:h-3 -mt-2 sm:-mt-4 bg-gradient-to-r from-transparent via-[#F5F5DC]/40 to-transparent rounded-full blur-[1px]" />
        </div>
      </header>

    </div>
  );
};
