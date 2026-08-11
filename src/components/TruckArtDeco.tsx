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
      {/* 1. Deep Navy to Vibrant Orange Gradient Background */}
      <div
        className={`absolute inset-0 bg-gradient-to-b from-[#0A192F] via-[#1A0A1F] via-60% to-[#FF4E00] transition-all duration-1000 ${
          isPlaying ? 'opacity-100 filter brightness-105' : 'opacity-95 filter brightness-95'
        }`}
      />

      {/* Warm horizon glow overlay */}
      <div className="absolute bottom-0 inset-x-0 h-2/3 bg-gradient-to-t from-[#FF4E00]/50 via-[#FF4E00]/20 to-transparent" />

      {/* Subtle SVG Noise Texture */}
      <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none" />

      {/* 2. Flying Birds Silhouette in Sunset Sky */}
      <svg
        className="absolute top-[18%] right-[22%] sm:right-[32%] w-32 sm:w-56 h-auto opacity-75 text-slate-900 fill-current"
        viewBox="0 0 200 100"
      >
        {/* Flock of birds */}
        <path d="M20 30 Q30 20 40 30 Q50 20 60 30 Q50 25 40 33 Q30 25 20 30 Z" />
        <path d="M70 15 Q77 7 85 15 Q92 7 100 15 Q92 11 85 17 Q77 11 70 15 Z" transform="scale(0.8) translate(20, 10)" />
        <path d="M110 40 Q118 32 126 40 Q134 32 142 40 Q134 36 126 42 Q118 36 110 40 Z" transform="scale(0.65) translate(60, 20)" />
        <path d="M45 55 Q52 48 60 55 Q67 48 75 55 Q67 52 60 57 Q52 52 45 55 Z" transform="scale(0.7) translate(-10, 30)" />
        <path d="M140 25 Q145 20 150 25 Q155 20 160 25 Q155 22 150 26 Q145 22 140 25 Z" transform="scale(0.5) translate(120, 10)" />
      </svg>

      {/* 3. Left Silhouette: Traditional Gujarati Haveli Wall with Doorway & Lipan Kaam */}
      <div className="absolute bottom-0 left-0 w-[42%] sm:w-[32%] max-w-[420px] h-full flex flex-col justify-end z-10">
        <div className="relative w-full h-[85%] sm:h-[90%] bg-[#1a0a07]/85 border-r-2 border-amber-900/40 rounded-tr-3xl shadow-2xl overflow-visible backdrop-blur-xs">
          
          {/* Mud wall texture & Hand-painted Gujarati Lipan Kaam border */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-950/60 to-transparent" />

          {/* Traditional Doorframe & Moldings */}
          <div className="absolute bottom-0 left-4 sm:left-8 w-2/3 h-2/3 border-t-8 border-r-8 border-amber-950/90 rounded-tl-lg bg-[#0a0302]/90 shadow-inner">
            {/* Wooden door detail */}
            <div className="absolute inset-2 border-2 border-amber-900/30 flex divide-x divide-amber-900/40">
              <div className="w-1/2 h-full bg-gradient-to-b from-amber-950/80 to-[#120503]" />
              <div className="w-1/2 h-full bg-gradient-to-b from-amber-950/80 to-[#120503]" />
            </div>
          </div>

          {/* Lipan Kaam SVG Mandala Art around door */}
          <svg
            className="absolute top-12 left-6 w-28 sm:w-36 h-28 sm:h-36 opacity-35 text-amber-200 fill-none stroke-current stroke-2"
            viewBox="0 0 100 100"
          >
            <circle cx="50" cy="50" r="42" strokeDasharray="3 3" />
            <circle cx="50" cy="50" r="30" />
            <circle cx="50" cy="50" r="16" />
            <path d="M50 0 L50 100 M0 50 L100 50 M15 15 L85 85 M15 85 L85 15" strokeWidth="1" />
            {/* Peacock / Lotus Petals */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <circle
                key={i}
                cx={50 + 36 * Math.cos((angle * Math.PI) / 180)}
                cy={50 + 36 * Math.sin((angle * Math.PI) / 180)}
                r="3"
                fill="currentColor"
              />
            ))}
          </svg>

          {/* 4. Hanging Lantern (Glowing Light) */}
          <div className="absolute top-[28%] -right-5 sm:-right-8 z-30">
            {/* Iron bracket */}
            <div className="w-8 sm:w-12 h-3 border-t-2 border-r-2 border-amber-800 rounded-tr-md" />
            
            {/* Hanging chain */}
            <div className="ml-6 sm:ml-10 w-0.5 h-6 sm:h-10 bg-amber-800/80 mx-auto" />

            {/* Lantern Lamp */}
            <div className="relative ml-4 sm:ml-7 -mt-1">
              {/* Radial Light Glow Effect */}
              <div
                className={`absolute -inset-10 rounded-full bg-gradient-to-r from-amber-500/50 via-orange-500/30 to-transparent blur-2xl transition-all duration-700 ${
                  isPlaying ? 'lantern-glow scale-125' : 'opacity-70 scale-100'
                }`}
              />

              {/* Lantern Glass & Frame */}
              <div className="relative w-7 sm:w-10 h-10 sm:h-14 bg-gradient-to-b from-amber-950 via-amber-700/80 to-amber-950 border-2 border-amber-500/80 rounded-lg shadow-xl flex items-center justify-center">
                {/* Flame core */}
                <div
                  className={`w-3 sm:w-4 h-5 sm:h-7 bg-gradient-to-t from-red-500 via-amber-400 to-amber-100 rounded-full blur-[1px] shadow-[0_0_15px_#f59e0b] ${
                    isPlaying ? 'animate-pulse scale-110' : ''
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Right Silhouette: Temple, Pavilion (Chhatri), Saffron Flag & Riverside */}
      <div className="absolute bottom-0 right-0 w-[48%] sm:w-[38%] h-[60%] sm:h-[70%] z-10 flex items-end justify-end">
        <svg
          className="w-full h-full text-[#140605] fill-current opacity-95 drop-shadow-xl"
          viewBox="0 0 400 300"
          preserveAspectRatio="none"
        >
          {/* Temple Shikhara & Domes */}
          <path d="M220 300 L220 180 Q240 120 250 100 Q260 120 280 180 L280 300 Z" />
          <path d="M250 100 L250 80 M245 80 L255 80" stroke="#f59e0b" strokeWidth="2" />
          
          {/* Flagpole & Saffron Flag ("જય શ્રી કૃષ્ણા") */}
          <path d="M250 80 L250 40 M250 40 L290 52 L250 64 Z" fill="#dc2626" />

          {/* Pavilion / Chhatri Arches */}
          <path d="M280 300 L280 190 Q300 170 320 190 L320 300 M320 300 L320 190 Q340 170 360 190 L360 300 M360 300 L360 190 Q380 170 400 190 L400 300" />
          <path d="M270 190 Q340 140 400 190 Z" />

          {/* Distant Trees & Ghat Skyline */}
          <path d="M120 300 Q140 240 160 300 Q180 230 200 300 M50 300 Q80 260 110 300" />
        </svg>
      </div>

      {/* 6. River Mist / Fog Layer at Bottom */}
      <div className="absolute bottom-0 inset-x-0 h-28 sm:h-36 bg-gradient-to-t from-red-950/90 via-orange-950/40 to-transparent z-20 backdrop-blur-[1px]" />

      {/* 7. Truck Art Decorative Slogans (Hanging Banners) */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-4 z-20 opacity-80 hover:opacity-100 transition-opacity">
        <div className="px-3 py-1 rounded-sm bg-gradient-to-r from-amber-500 to-red-600 text-slate-950 font-bold text-xs shadow-md border border-amber-300 font-gujarati uppercase tracking-wider">
          🔥 બુરી નજર વાળા મંુહ તેરા કાલા
        </div>
        <div className="px-3 py-1 rounded-sm bg-gradient-to-r from-red-600 to-amber-500 text-slate-950 font-bold text-xs shadow-md border border-amber-300 font-gujarati">
          🚩 જય શ્રી કૃષ્ણા
        </div>
        <div className="px-3 py-1 rounded-sm bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-bold text-xs shadow-md border border-amber-300 font-gujarati">
          ✨ હસી તો ફસી!
        </div>
      </div>
    </div>
  );
};
