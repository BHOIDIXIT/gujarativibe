/**
 * Hero Banner with Gujarati calligraphy wordmark, tagline, live status pill,
 * and quick player launcher.
 */

import React from 'react';
import { Track, PlayerState } from '../types';
import { HornButton } from './HornButton';
import { Play, Pause, Radio, Sparkles, Music2 } from 'lucide-react';

interface HeroBannerProps {
  currentTrack: Track | null;
  playerState: PlayerState;
  onTogglePlayPause: () => void;
  onOpenShortcuts?: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  currentTrack,
  playerState,
  onTogglePlayPause,
  onOpenShortcuts,
}) => {
  const { isPlaying, isLoading } = playerState;

  return (
    <div className="relative z-20 w-full pt-8 pb-6 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
      
      {/* Live Status Pill - Bold Typography Theme */}
      <div className="flex items-center justify-between w-full max-w-3xl mb-4 sm:mb-6">
        <div className="inline-flex items-center gap-3 bg-black/30 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 shadow-xl max-w-full overflow-hidden">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shrink-0"></div>
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-green-400 font-sans shrink-0">
            ● હવે વાગે છે — મારો ટ્રક મારો અવાજ
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
                ૧૦૮ FM · ગુજ્જુ હાઇવે સ્પેશિયલ રેડિયો
              </span>
            )}
          </div>
        </div>

        {/* Right Action: Horn Button */}
        <div className="hidden sm:block shrink-0">
          <HornButton variant="inline" />
        </div>
      </div>

      {/* Main Center Display: Bold Typography Heading & Tagline */}
      <header className="relative z-10 flex flex-col items-center text-center my-2 sm:my-4">
        {/* Decorative badge */}
        <div className="flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-300 text-xs font-bold tracking-wider uppercase font-sans">
          <Radio className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
          <span>ગુજરાતી દેશી અને અર્બન મ્યુઝિક</span>
        </div>

        {/* Huge Bold Title */}
        <h1
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-1 drop-shadow-2xl text-[#F5F5DC] font-yatra leading-tight select-none"
          style={{ letterSpacing: '-2px' }}
        >
          ગુજ્જુ ટ્રક રેડિયો
        </h1>

        {/* Serif Tagline */}
        <p
          className="text-lg sm:text-2xl font-medium text-amber-100/90 italic tracking-widest font-rozha mt-1 drop-shadow"
        >
          આપણી ઓળખ, આપણું સંગીત
        </p>

        {/* Sub-slogan */}
        <p className="mt-2 text-xs sm:text-sm font-gujarati text-orange-200/70 max-w-lg">
          ગરબા, લોકગીતો, કચ્છી ધૂન અને સુપરહીટ ગીતોનો અવિરત પ્રવાહ 🚚💨
        </p>

        {/* Primary Call To Action Buttons */}
        <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onTogglePlayPause}
            disabled={isLoading}
            id="btn-hero-play-main"
            className="flex items-center gap-3 px-7 sm:px-9 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-slate-950 font-extrabold text-base sm:text-lg shadow-xl shadow-orange-600/40 hover:shadow-orange-500/60 hover:scale-105 active:scale-95 transition-all duration-200 border border-white/20 font-gujarati"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-3 border-slate-950 border-t-transparent rounded-full animate-spin" />
            ) : isPlaying ? (
              <>
                <Pause className="w-6 h-6 fill-current" />
                <span>સંગીત થોભાવો (Pause)</span>
              </>
            ) : (
              <>
                <Play className="w-6 h-6 fill-current ml-0.5" />
                <span>સંગીત શરૂ કરો (Play)</span>
              </>
            )}
          </button>

          <HornButton variant="hero" />
        </div>
      </header>
    </div>
  );
};
