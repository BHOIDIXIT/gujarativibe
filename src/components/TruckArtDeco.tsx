/**
 * Cultural Visual Art component rendering Haveli wall, glowing lantern,
 * temple skyline silhouette, flying birds, and truck art decorations.
 */

import React from 'react';
import bgImage from '../assets/images/gujarati_background_1786464232502.jpg';

interface TruckArtDecoProps {
  isPlaying?: boolean;
}

export const TruckArtDeco: React.FC<TruckArtDecoProps> = ({ isPlaying = false }) => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* 1. Primary Full-screen Background Image */}
      <img
        src={bgImage}
        alt="Gujarati Sunset Background"
        className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-1000 ${
          isPlaying ? 'scale-105 filter brightness-105 contrast-105' : 'scale-100 filter brightness-95'
        }`}
        referrerPolicy="no-referrer"
      />

      {/* Subtle Dark Vignette & Gradient Overlays for High Text Contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/30 to-slate-950/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-transparent to-slate-950/60" />

      {/* Atmospheric Ambient Sunset Glow */}
      <div 
        className={`absolute inset-0 bg-orange-600/10 mix-blend-color-dodge transition-opacity duration-1000 ${
          isPlaying ? 'opacity-100' : 'opacity-40'
        }`} 
      />

      {/* Crimson Fog / Water Edge Reflection at Bottom */}
      <div className="absolute bottom-0 inset-x-0 h-32 sm:h-48 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent z-10" />
    </div>
  );
};
