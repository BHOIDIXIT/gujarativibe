/**
 * Hero Banner with Gujarati calligraphy wordmark, tagline, live status pill,
 * and quick player launcher.
 */

import React, { useState } from 'react';
import { Track, PlayerState } from '../types';
import { formatTime } from './Player';
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Repeat1, Eye, EyeOff } from 'lucide-react';

interface HeroBannerProps {
  currentTrack: Track | null;
  playerState: PlayerState;
  onTogglePlayPause: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  onSeek?: (seconds: number) => void;
  onToggleShuffle?: () => void;
  onCycleRepeat?: () => void;
  onOpenShortcuts?: () => void;
  isPlayerVisible?: boolean;
  onTogglePlayerVisible?: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  currentTrack,
  playerState,
  onTogglePlayPause,
  onNext,
  onPrevious,
  onSeek,
  onToggleShuffle,
  onCycleRepeat,
  onOpenShortcuts,
  isPlayerVisible: propIsPlayerVisible,
  onTogglePlayerVisible,
}) => {
  const [internalPlayerVisible, setInternalPlayerVisible] = useState(true);
  const isVisible = propIsPlayerVisible !== undefined ? propIsPlayerVisible : internalPlayerVisible;
  const toggleVisibility = onTogglePlayerVisible || (() => setInternalPlayerVisible(prev => !prev));
  const {
    isPlaying,
    isLoading,
    currentTime,
    duration,
    isShuffle,
    repeatMode,
    isBuffering,
  } = playerState;

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onSeek) return;
    const newPercent = parseFloat(e.target.value);
    const newTime = (newPercent / 100) * duration;
    onSeek(newTime);
  };

  return (
    <div className="relative z-20 w-full flex-1 pt-2 pb-20 sm:pb-24 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto flex flex-col items-center justify-between text-center min-h-[75vh]">
      
      {/* Top Header & Title Group */}
      <div className="w-full flex flex-col items-center">
        {/* Live Status Pill */}
        <div className="flex flex-wrap items-center justify-center gap-3 w-full max-w-4xl mb-2 sm:mb-3">
          <div className="inline-flex items-center gap-2.5 sm:gap-3 bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 shadow-xl max-w-full overflow-hidden">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shrink-0"></div>
            <span className="text-[10px] font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase text-green-400 font-sans shrink-0">
              ● હવે વાગે છે — મારો અવાજ
            </span>
            <span className="text-white/20 shrink-0">|</span>
            <div className="overflow-hidden whitespace-nowrap relative flex-1 text-left min-w-[100px] sm:min-w-[140px]">
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
        <header className="relative z-10 flex flex-col items-center text-center my-2 sm:my-3 select-none">
          
          {/* Brush Calligraphy Title: "હું ગુજરાતી" */}
          <div className="relative">
            <h1
              className="text-5xl mt-3 sm:text-6xl md:text-7xl lg:text-[7.5rem] font-bold text-[#F5F5DC] font-yatra tracking-tight leading-none drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]"
              style={{ textShadow: '0 4px 30px rgba(255, 78, 0, 0.5)' }}
            >
              હું ગુજરાતી
            </h1>
            
            {/* Subtle warm painted stroke accent under text */}
            <div className="w-full h-1.5 sm:h-2 -mt-1 sm:-mt-2 bg-gradient-to-r from-transparent via-[#F5F5DC]/40 to-transparent rounded-full blur-[1px]" />
          </div>
        </header>
      </div>

      {/* Floating Glassmorphic Audio Player (Positioned above footer) */}
      {isVisible ? (
        <div className="w-full max-w-xl sm:max-w-2xl mt-auto mb-2 px-2 transition-all duration-300">
          <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-3 sm:p-4 shadow-[0_20px_50px_rgba(0,0,0,0.6)] text-left flex flex-col sm:flex-row items-center gap-3 sm:gap-5 transition-all hover:bg-white/15 group">
            
            {/* Quick Hide Toggle Button on Card */}
            <button
              onClick={toggleVisibility}
              title="Hide Player Card"
              className="absolute -top-2.5 -right-2.5 w-7 h-7 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-white/20 text-slate-300 hover:text-orange-400 flex items-center justify-center shadow-lg transition-all hover:scale-110 z-10"
            >
              <EyeOff className="w-3.5 h-3.5" />
            </button>

            {/* Thumbnail Image */}
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-black shrink-0 border border-white/20 shadow-lg">
              {currentTrack ? (
                <img
                  src={currentTrack.thumbnailUrl}
                  alt={currentTrack.title}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    isPlaying ? 'scale-105' : 'scale-100'
                  }`}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-orange-400 text-xs font-gujarati">
                  સંગીત
                </div>
              )}
              {isPlaying && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center gap-1">
                  <span className="w-1 bg-white eq-bar-1 rounded-t h-3.5" />
                  <span className="w-1 bg-white eq-bar-2 rounded-t h-3.5" />
                  <span className="w-1 bg-white eq-bar-3 rounded-t h-3.5" />
                </div>
              )}
            </div>

            {/* Track Details & Seek Bar */}
            <div className="flex-1 min-w-0 w-full">
              <h3 className="text-sm sm:text-base font-bold text-white font-gujarati truncate leading-snug">
                {currentTrack ? currentTrack.title : 'કેસરીયો રંગ તારો'}
              </h3>
              <p className="text-xs text-orange-200/80 font-gujarati truncate mt-0.5">
                {currentTrack ? currentTrack.artist : 'ગુજરાતી લોક ગીત'}
              </p>

              {/* Time readout */}
              <div className="text-[11px] font-mono opacity-80 text-orange-100 mt-1">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>

              {/* Seek bar */}
              <div className="relative group w-full mt-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="0.1"
                  value={progressPercent || 0}
                  onChange={handleSeekChange}
                  className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white hover:h-1.5 transition-all"
                />
              </div>
            </div>

            {/* Media Control Buttons */}
            <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
              
              {/* Shuffle */}
              {onToggleShuffle && (
                <button
                  onClick={onToggleShuffle}
                  title="Shuffle"
                  className={`p-2 rounded-full transition-colors ${
                    isShuffle ? 'text-orange-400 bg-white/10' : 'text-white/70 hover:text-white'
                  }`}
                >
                  <Shuffle className="w-4 h-4" />
                </button>
              )}

              {/* Previous */}
              {onPrevious && (
                <button
                  onClick={onPrevious}
                  title="Previous"
                  className="p-2 text-white/80 hover:text-white active:scale-90 transition-transform"
                >
                  <SkipBack className="w-5 h-5 fill-current" />
                </button>
              )}

              {/* Main Solid White Circular Play/Pause Button */}
              <button
                onClick={onTogglePlayPause}
                disabled={isLoading}
                title={isPlaying ? 'Pause' : 'Play'}
                className="w-12 h-12 rounded-full bg-white text-slate-950 flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all"
              >
                {isBuffering || isLoading ? (
                  <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                ) : isPlaying ? (
                  <Pause className="w-5 h-5 fill-current" />
                ) : (
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                )}
              </button>

              {/* Next */}
              {onNext && (
                <button
                  onClick={onNext}
                  title="Next"
                  className="p-2 text-white/80 hover:text-white active:scale-90 transition-transform"
                >
                  <SkipForward className="w-5 h-5 fill-current" />
                </button>
              )}

              {/* Repeat */}
              {onCycleRepeat && (
                <button
                  onClick={onCycleRepeat}
                  title="Repeat"
                  className={`p-2 rounded-full transition-colors ${
                    repeatMode !== 'off' ? 'text-orange-400 bg-white/10' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {repeatMode === 'one' ? <Repeat1 className="w-4 h-4" /> : <Repeat className="w-4 h-4" />}
                </button>
              )}
            </div>

          </div>
        </div>
      ) : (
        <div className="w-full max-w-xl sm:max-w-2xl mt-auto mb-2 px-2 translate-y-2 flex justify-center animate-fadeIn">
          <button
            onClick={toggleVisibility}
            className="inline-flex items-center gap-2 bg-black/60 hover:bg-black/80 backdrop-blur-xl border border-orange-500/40 text-orange-300 hover:text-orange-100 px-5 py-2.5 rounded-2xl shadow-2xl font-gujarati text-sm transition-all hover:scale-105"
          >
            <Eye className="w-4 h-4 text-orange-400" />
            <span>સંગીત પ્લેયર ડિસ્પ્લે ચાલુ કરો (Show Player Card)</span>
          </button>
        </div>
      )}



    </div>
  );
};

