/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { useYouTubePlayer } from './hooks/useYouTubePlayer';
import { TruckArtDeco } from './components/TruckArtDeco';
import { HeroBanner } from './components/HeroBanner';
import { TrackList } from './components/TrackList';
import { Player } from './components/Player';
import { KeyboardShortcutsModal } from './components/KeyboardShortcutsModal';
import { playTruckHorn } from './utils/hornSound';
import { Keyboard, Radio, Sparkles, Truck, ShieldAlert } from 'lucide-react';

export default function App() {
  const {
    tracks,
    currentTrack,
    playerState,
    favorites,
    togglePlayPause,
    playVideoAt,
    nextTrack,
    previousTrack,
    seekTo,
    setVolume,
    toggleMute,
    toggleShuffle,
    cycleRepeatMode,
    toggleFavorite,
  } = useYouTubePlayer();

  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const trackListRef = useRef<HTMLDivElement>(null);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts if user is typing in an input
      const targetTag = (e.target as HTMLElement)?.tagName?.toUpperCase();
      if (targetTag === 'INPUT' || targetTag === 'TEXTAREA' || targetTag === 'SELECT') {
        return;
      }

      switch (e.code) {
        case 'Space':
          e.preventDefault();
          togglePlayPause();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          seekTo(Math.max(0, playerState.currentTime - 5));
          break;
        case 'ArrowRight':
          e.preventDefault();
          seekTo(Math.min(playerState.duration, playerState.currentTime + 5));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setVolume(Math.min(100, playerState.volume + 10));
          break;
        case 'ArrowDown':
          e.preventDefault();
          setVolume(Math.max(0, playerState.volume - 10));
          break;
        case 'KeyM':
          e.preventDefault();
          toggleMute();
          break;
        case 'KeyH':
          e.preventDefault();
          playTruckHorn('classic');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlayPause, seekTo, setVolume, toggleMute, playerState]);

  const scrollToTrackList = () => {
    trackListRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 font-gujarati selection:bg-amber-500 selection:text-slate-950 flex flex-col justify-between overflow-x-hidden pb-28">
      
      {/* Off-screen hidden YouTube IFrame Container */}
      <div
        id="youtube-hidden-player"
        className="fixed -top-[9999px] -left-[9999px] w-[1px] h-[1px] opacity-0 pointer-events-none select-none"
      />

      {/* Full-bleed Sunset Gradient & Layered Silhouette Artwork */}
      <TruckArtDeco isPlaying={playerState.isPlaying} />

      {/* Main Content Area */}
      <div className="relative z-20 flex-1 flex flex-col items-center">
        
        {/* Top Header Navigation Bar */}
        <header className="w-full max-w-7xl px-4 sm:px-6 py-4 flex items-center justify-between z-30">
          
          {/* Station Brand Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-orange-500/30 border border-white/20">
              <Truck className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <span className="font-yatra text-base sm:text-lg font-bold text-[#F5F5DC] tracking-wide">
                ગુજ્જુ ટ્રક રેડિયો
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 font-sans border border-orange-500/30">
                108.4 FM
              </span>
            </div>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsShortcutsOpen(true)}
              title="Keyboard Shortcuts"
              className="p-2 rounded-xl bg-black/40 hover:bg-black/60 text-slate-200 hover:text-orange-300 border border-white/10 transition-colors flex items-center gap-1.5 text-xs font-gujarati backdrop-blur-md"
            >
              <Keyboard className="w-4 h-4 text-orange-400" />
              <span className="hidden sm:inline">કીબોર્ડ મદદ</span>
            </button>
          </div>
        </header>

        {/* Hero Banner Section */}
        <HeroBanner
          currentTrack={currentTrack}
          playerState={playerState}
          onTogglePlayPause={togglePlayPause}
          onOpenShortcuts={() => setIsShortcutsOpen(true)}
        />

        {/* Scroll Anchor & Track List Section */}
        <div ref={trackListRef} className="w-full">
          <TrackList
            tracks={tracks}
            currentTrackIndex={playerState.currentIndex}
            isPlaying={playerState.isPlaying}
            isLoading={playerState.isLoading}
            favorites={favorites}
            onSelectTrack={playVideoAt}
            onToggleFavorite={toggleFavorite}
          />
        </div>

        {/* Trucker Culture Fun Footer Badges */}
        <div className="w-full max-w-4xl px-4 my-8 text-center space-y-3 z-20">
          <div className="inline-flex flex-wrap items-center justify-center gap-3 p-3 rounded-2xl bg-slate-900/60 backdrop-blur-md border border-slate-800/80 text-xs text-amber-200/80">
            <span className="flex items-center gap-1 font-bold text-amber-400">
              <ShieldAlert className="w-4 h-4 text-amber-500" />
              ટ્રક સ્પેશિયલ સુવિચારો:
            </span>
            <span>"હસતો રહે કાન્હા, દુનિયા તો જળ્યા કરશે"</span>
            <span>•</span>
            <span>"ઓકે ટાટા, બાય બાય"</span>
            <span>•</span>
            <span>"માતાજી ની દયા"</span>
          </div>

          <p className="text-xs text-slate-500 font-sans">
            © {new Date().getFullYear()} ગુજ્જુ ટ્રક રેડિયો | Powered by YouTube Music Playlist & Web Audio API
          </p>
        </div>
      </div>

      {/* Fixed Bottom Mini Player */}
      <Player
        currentTrack={currentTrack}
        playerState={playerState}
        favorites={favorites}
        onTogglePlayPause={togglePlayPause}
        onNext={nextTrack}
        onPrevious={previousTrack}
        onSeek={seekTo}
        onVolumeChange={setVolume}
        onToggleMute={toggleMute}
        onToggleShuffle={toggleShuffle}
        onCycleRepeat={cycleRepeatMode}
        onToggleFavorite={toggleFavorite}
        onToggleTrackListDrawer={scrollToTrackList}
      />

      {/* Keyboard Shortcuts Helper Modal */}
      <KeyboardShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />
    </div>
  );
}
