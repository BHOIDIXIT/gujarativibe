/**
 * Cultural Visual Art component rendering Haveli wall, glowing lantern,
 * temple skyline silhouette, flying birds, and truck art decorations.
 */

import React from 'react';

interface TruckArtDecoProps {
  isPlaying?: boolean;
}

export const TruckArtDeco: React.FC<TruckArtDecoProps> = ({ isPlaying = false }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* 1. Deep Sunset Gradient Background (Indigo -> Purple -> Crimson -> Fiery Orange) */}
      <div
        className={`absolute inset-0 bg-gradient-to-b from-[#0b132a] via-[#1a0a28] via-40% to-[#cb2210] transition-all duration-1000 ${
          isPlaying ? 'opacity-100 filter brightness-105' : 'opacity-95 filter brightness-95'
        }`}
      />

      {/* Fiery Sunset Light Source in Horizon */}
      <div className="absolute bottom-1/4 inset-x-0 h-1/2 bg-gradient-to-t from-[#ff4e00] via-[#ff7700]/40 to-transparent opacity-85" />

      {/* River Reflection Layer */}
      <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-[#800000] via-[#c01500]/90 to-transparent z-10" />

      {/* Subtle Noise Texture */}
      <div className="absolute inset-0 bg-noise opacity-15 pointer-events-none" />

      {/* 2. Top-Right Silhouetted Tree Branches hanging down */}
      <svg
        className="absolute top-0 right-0 w-[50%] max-w-[550px] h-auto text-[#0a0302] fill-current opacity-95 z-10"
        viewBox="0 0 400 300"
      >
        <path d="M400 0 Q340 30 280 15 Q220 0 180 40 Q210 60 260 50 Q310 40 400 20 Z" />
        <path d="M350 0 Q280 50 220 90 Q170 120 120 110 Q160 130 210 110 Q270 90 380 40 Z" />
        {/* Leaf clusters */}
        <path d="M120 110 Q110 95 125 90 Q140 85 135 105 Z M180 40 Q165 30 175 20 Q190 20 195 35 Z M220 90 Q205 80 215 70 Q230 70 235 85 Z M280 15 Q265 5 275 0 Q290 0 295 10 Z" />
        <path d="M260 50 Q240 65 250 80 Q270 75 275 60 Z M310 40 Q290 55 300 70 Q320 65 325 50 Z M150 120 Q135 130 145 140 Q160 135 162 122 Z" />
      </svg>

      {/* 3. Flying Birds Silhouette in Sunset Sky */}
      <svg
        className="absolute top-[22%] right-[25%] sm:right-[35%] w-36 sm:w-56 h-auto opacity-80 text-slate-950 fill-current"
        viewBox="0 0 200 100"
      >
        <path d="M20 30 Q30 20 40 30 Q50 20 60 30 Q50 25 40 33 Q30 25 20 30 Z" />
        <path d="M70 15 Q77 7 85 15 Q92 7 100 15 Q92 11 85 17 Q77 11 70 15 Z" transform="scale(0.8) translate(20, 10)" />
        <path d="M110 40 Q118 32 126 40 Q134 32 142 40 Q134 36 126 42 Q118 36 110 40 Z" transform="scale(0.65) translate(60, 20)" />
        <path d="M45 55 Q52 48 60 55 Q67 48 75 55 Q67 52 60 57 Q52 52 45 55 Z" transform="scale(0.7) translate(-10, 30)" />
        <path d="M140 25 Q145 20 150 25 Q155 20 160 25 Q155 22 150 26 Q145 22 140 25 Z" transform="scale(0.5) translate(120, 10)" />
      </svg>

      {/* 4. Left Side: Traditional Gujarati Mud House Wall with Warli / Lipan Kaam Art & Steps */}
      <div className="absolute bottom-0 left-0 w-[42%] sm:w-[32%] max-w-[440px] h-full flex flex-col justify-end z-10">
        <div className="relative w-full h-[88%] bg-[#24110b]/90 border-r-4 border-[#3d1d13] shadow-2xl overflow-visible backdrop-blur-xs">
          
          {/* Mud wall texture gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-amber-950/20 to-transparent" />

          {/* White Warli & Lipan Kaam Art Rendered in Crisp SVG */}
          <svg
            className="absolute inset-0 w-full h-full text-amber-100/70 fill-none stroke-current stroke-2 pointer-events-none"
            viewBox="0 0 300 600"
            preserveAspectRatio="none"
          >
            {/* Top Border Band (Traditional Triangle Motifs) */}
            <path d="M0 20 L300 20 M0 40 L300 40" strokeWidth="1.5" strokeDasharray="4 2" />
            <path d="M10 20 L20 40 L30 20 L40 40 L50 20 L60 40 L70 20 L80 40 L90 20 L100 40 L110 20 L120 40 L130 20 L140 40 L150 20 L160 40 L170 20 L180 40 L190 20 L200 40 L210 20 L220 40 L230 20 L240 40 L250 20 L260 40 L270 20 L280 40 L290 20" strokeWidth="1" />

            {/* Traditional Circular Lipan Mirror Mandala Art */}
            <g transform="translate(140, 140)">
              <circle cx="0" cy="0" r="55" strokeWidth="2" />
              <circle cx="0" cy="0" r="42" strokeDasharray="3 3" />
              <circle cx="0" cy="0" r="28" strokeWidth="1.5" />
              <circle cx="0" cy="0" r="14" fill="currentColor" fillOpacity="0.2" />
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                <line
                  key={deg}
                  x1={28 * Math.cos((deg * Math.PI) / 180)}
                  y1={28 * Math.sin((deg * Math.PI) / 180)}
                  x2={42 * Math.cos((deg * Math.PI) / 180)}
                  y2={42 * Math.sin((deg * Math.PI) / 180)}
                  strokeWidth="1.5"
                />
              ))}
            </g>

            {/* Warli Art Female Figure Playing Garba / Holding Diya */}
            <g transform="translate(135, 290)" fill="currentColor" stroke="none">
              <circle cx="0" cy="-45" r="8" />
              <circle cx="9" cy="-47" r="4" />
              <polygon points="0,-35 -14,-15 14,-15" />
              <polygon points="0,-5 -14,-25 14,-25" />
              <path d="M-6,-5 L-12,25 M6,-5 L12,25" stroke="currentColor" strokeWidth="3.5" />
              <path d="M-12,-20 L-28,-10 L-20,10 M12,-20 L28,-10 L20,10" stroke="currentColor" strokeWidth="2.5" fill="none" />
              <path d="M-18,0 Q0,8 18,0" stroke="currentColor" strokeWidth="2" fill="none" />
            </g>

            {/* Floor Border */}
            <path d="M0 450 L300 450 M0 470 L300 470" strokeWidth="1.5" strokeDasharray="6 3" />
          </svg>

          {/* Steps & Clay Pot (Earthen Matka/Kumbh at the base) */}
          <div className="absolute bottom-0 left-0 right-0 z-20">
            <div className="w-full h-8 bg-[#180a06] border-t-2 border-amber-900/60 shadow-md" />
            <div className="w-[85%] h-8 bg-[#120704] border-t-2 border-amber-900/60 shadow-md" />
            
            {/* Earthen Pot (Matka) on steps */}
            <div className="absolute -top-12 left-8 w-12 h-12 bg-gradient-to-tr from-[#3a150a] via-[#632410] to-[#8f3619] rounded-full border border-amber-800/80 shadow-2xl flex flex-col items-center justify-start pt-1">
              <div className="w-7 h-2 bg-[#42170b] border border-amber-900 rounded-full shadow-inner" />
            </div>
          </div>

          {/* 5. Hanging Traditional Iron Lantern with Glowing Flame */}
          <div className="absolute top-[22%] -right-7 sm:-right-10 z-30">
            <div className="w-10 sm:w-14 h-4 border-t-4 border-r-4 border-[#0d0403] rounded-tr-lg shadow-lg" />
            <div className="ml-8 sm:ml-11 w-1 h-8 sm:h-12 bg-[#0d0403] mx-auto" />

            <div className="relative ml-5 sm:ml-8 -mt-1">
              <div
                className={`absolute -inset-12 rounded-full bg-gradient-to-r from-amber-500/60 via-orange-500/40 to-transparent blur-3xl transition-all duration-700 ${
                  isPlaying ? 'lantern-glow scale-125' : 'opacity-85 scale-100'
                }`}
              />

              <div className="relative w-8 sm:w-12 h-12 sm:h-16 bg-gradient-to-b from-[#0a0302] via-[#2d1209] to-[#0a0302] border-2 border-amber-600/80 rounded-xl shadow-2xl flex items-center justify-center">
                <div className="absolute inset-x-0 top-0 bottom-0 border-x border-black/80 mx-2" />
                
                <div
                  className={`w-3.5 sm:w-5 h-6 sm:h-8 bg-gradient-to-t from-red-600 via-amber-400 to-yellow-100 rounded-full blur-[1px] shadow-[0_0_20px_#f59e0b] ${
                    isPlaying ? 'animate-pulse scale-110' : ''
                  }`}
                />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 6. Right Side: Temple Skyline, Shikhara Spires, Red Flag & Riverside */}
      <div className="absolute bottom-0 right-0 w-[52%] sm:w-[42%] h-[65%] sm:h-[75%] z-10 flex items-end justify-end">
        <svg
          className="w-full h-full text-[#0a0302] fill-current opacity-95 drop-shadow-2xl"
          viewBox="0 0 400 300"
          preserveAspectRatio="none"
        >
          <path d="M220 300 L220 170 Q240 100 250 80 Q260 100 280 170 L280 300 Z" />
          <path d="M250 80 L250 60 M245 60 L255 60" stroke="#ff8c00" strokeWidth="2.5" />
          
          <path d="M250 60 L250 20 M250 20 L295 32 L250 44 Z" fill="#e60000" />

          <path d="M170 300 L170 200 Q190 150 200 130 Q210 150 230 200 L230 300 Z" />
          <path d="M200 130 L200 115" stroke="#ff8c00" strokeWidth="2" />
          <path d="M200 115 L230 123 L200 131 Z" fill="#e60000" />

          <path d="M280 300 L280 180 Q300 160 320 180 L320 300 M320 300 L320 180 Q340 160 360 180 L360 300 M360 300 L360 180 Q380 160 400 180 L400 300" />
          <path d="M270 180 Q340 130 400 180 Z" />

          <path d="M100 300 Q120 230 140 300 Q160 220 180 300 M30 300 Q60 250 90 300" />
        </svg>
      </div>

      {/* 7. Crimson Mist / Fog Layer at Bottom Water Edge */}
      <div className="absolute bottom-0 inset-x-0 h-32 sm:h-44 bg-gradient-to-t from-red-950/90 via-red-900/40 to-transparent z-20 backdrop-blur-[1px]" />
    </div>
  );
};
