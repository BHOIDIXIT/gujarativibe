/**
 * Custom Mini-Player Bar fixed to the bottom of the screen.
 * Art on left, center progress & media controls, volume & playlist drawer toggle on right.
 */

import React from 'react';
import { Track, PlayerState } from '../types';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Repeat1,
  Volume2,
  VolumeX,
  Heart,
  ListMusic,
  Maximize2,
} from 'lucide-react';

interface PlayerProps {
  currentTrack: Track | null;
  playerState: PlayerState;
  favorites: string[];
  onTogglePlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onSeek: (seconds: number) => void;
  onVolumeChange: (volume: number) => void;
  onToggleMute: () => void;
  onToggleShuffle: () => void;
  onCycleRepeat: () => void;
  onToggleFavorite: (videoId: string) => void;
  onToggleTrackListDrawer?: () => void;
}

export function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

export const Player: React.FC<PlayerProps> = ({
  currentTrack,
  playerState,
  favorites,
  onTogglePlayPause,
  onNext,
  onPrevious,
  onSeek,
  onVolumeChange,
  onToggleMute,
  onToggleShuffle,
  onCycleRepeat,
  onToggleFavorite,
  onToggleTrackListDrawer,
}) => {
  const {
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isShuffle,
    repeatMode,
    isBuffering,
  } = playerState;

  const isFav = currentTrack ? favorites.includes(currentTrack.id) : false;
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPercent = parseFloat(e.target.value);
    const newTime = (newPercent / 100) * duration;
    onSeek(newTime);
  };

  return (
    <footer className="fixed bottom-0 inset-x-0 z-50 bg-black/85 backdrop-blur-3xl border-t border-white/10 px-3 sm:px-6 py-2.5 sm:py-3.5 text-slate-100 shadow-[0_-10px_35px_rgba(0,0,0,0.9)]">
      
      {/* Top Seek Progress Bar (Slim Width Bar) */}
      <div className="relative group w-full mb-2 -mt-2 sm:-mt-3">
        <input
          type="range"
          min="0"
          max="100"
          step="0.1"
          value={progressPercent || 0}
          onChange={handleSeekChange}
          id="range-progress-bar"
          className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-orange-500 hover:h-1.5 transition-all"
        />
      </div>

      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Left Section: Album Art & Track Info */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0 w-1/3 sm:w-1/4">
          {currentTrack ? (
            <>
              {/* Thumbnail with rotating effect when playing */}
              <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-lg overflow-hidden bg-black border border-white/15 shrink-0 shadow-lg group">
                <img
                  src={currentTrack.thumbnailUrl}
                  alt={currentTrack.title}
                  className={`w-full h-full object-cover transition-transform duration-500 ${
                    isPlaying ? 'scale-105' : 'scale-100'
                  }`}
                />
                {/* Playing Equalizer Indicator overlay */}
                {isPlaying && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-0.5">
                    <span className="w-0.5 bg-orange-400 eq-bar-1 rounded" />
                    <span className="w-0.5 bg-orange-400 eq-bar-2 rounded" />
                    <span className="w-0.5 bg-orange-400 eq-bar-3 rounded" />
                  </div>
                )}
              </div>

              {/* Title & Artist */}
              <div className="min-w-0 flex-1">
                <h4 className="text-xs sm:text-sm font-bold font-gujarati text-white truncate leading-snug">
                  {currentTrack.title}
                </h4>
                <p className="text-[11px] sm:text-xs text-orange-200/70 font-gujarati truncate">
                  {currentTrack.artist}
                </p>
              </div>

              {/* Favorite Heart Button */}
              <button
                onClick={() => onToggleFavorite(currentTrack.id)}
                title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                className="p-1.5 text-slate-400 hover:text-red-500 transition-colors shrink-0"
              >
                <Heart className={`w-4 h-4 ${isFav ? 'text-red-500 fill-current' : ''}`} />
              </button>
            </>
          ) : (
            <div className="text-xs text-slate-500 font-gujarati">સંગીત લોડ થઈ રહ્યું છે...</div>
          )}
        </div>

        {/* Center Section: Media Controls & Time */}
        <div className="flex flex-col items-center justify-center flex-1 max-w-md">
          
          {/* Main Control Buttons */}
          <div className="flex items-center gap-3 sm:gap-6">
            
            {/* Shuffle */}
            <button
              onClick={onToggleShuffle}
              title={isShuffle ? 'Shuffle On' : 'Shuffle Off'}
              className={`p-1.5 rounded-full transition-colors ${
                isShuffle
                  ? 'text-orange-400 bg-orange-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Shuffle className="w-4 h-4" />
            </button>

            {/* Previous Track */}
            <button
              onClick={onPrevious}
              title="Previous Song"
              id="btn-player-prev"
              className="p-1.5 text-slate-300 hover:text-orange-400 active:scale-90 transition-transform"
            >
              <SkipBack className="w-5 h-5 fill-current" />
            </button>

            {/* Play / Pause Main Circle - Bold Typography Theme White Circle */}
            <button
              onClick={onTogglePlayPause}
              title={isPlaying ? 'Pause' : 'Play'}
              id="btn-player-play-pause"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white text-black flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              {isBuffering ? (
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : isPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current ml-0.5" />
              )}
            </button>

            {/* Next Track */}
            <button
              onClick={onNext}
              title="Next Song"
              id="btn-player-next"
              className="p-1.5 text-slate-300 hover:text-orange-400 active:scale-90 transition-transform"
            >
              <SkipForward className="w-5 h-5 fill-current" />
            </button>

            {/* Repeat Mode */}
            <button
              onClick={onCycleRepeat}
              title={`Repeat: ${repeatMode}`}
              className={`p-1.5 rounded-full transition-colors ${
                repeatMode !== 'off'
                  ? 'text-orange-400 bg-orange-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {repeatMode === 'one' ? (
                <Repeat1 className="w-4 h-4" />
              ) : (
                <Repeat className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Time Labels underneath */}
          <div className="flex items-center gap-1.5 text-[10px] font-mono opacity-50 text-slate-300 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>/</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Right Section: Volume & Tracklist Drawer Toggle */}
        <div className="flex items-center justify-end gap-2 sm:gap-4 w-1/3 sm:w-1/4">
          
          {/* Volume Control */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={onToggleMute}
              className="p-1 text-slate-400 hover:text-orange-300 transition-colors"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4 text-red-400" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
            
            <input
              type="range"
              min="0"
              max="100"
              value={isMuted ? 0 : volume}
              onChange={(e) => onVolumeChange(Number(e.target.value))}
              id="range-volume-slider"
              className="w-16 md:w-24 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
          </div>

          {/* Tracklist Toggle */}
          {onToggleTrackListDrawer && (
            <button
              onClick={onToggleTrackListDrawer}
              title="ગીતો ની યાદી (Toggle Tracklist)"
              id="btn-toggle-tracklist-drawer"
              className="p-2 rounded-xl bg-black/50 border border-white/10 hover:border-orange-500/50 text-slate-300 hover:text-orange-300 transition-colors flex items-center gap-1.5 text-xs font-gujarati"
            >
              <ListMusic className="w-4 h-4 text-orange-400" />
              <span className="hidden md:inline">ગીતો</span>
            </button>
          )}
        </div>
      </div>
    </footer>
  );
};
