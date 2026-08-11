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
import { Keyboard, Radio, Sparkles, Truck, ShieldAlert, Eye, EyeOff, ListMusic, X } from 'lucide-react';

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
  const [isPlayerVisible, setIsPlayerVisible] = useState(true);
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(true);
  const [currentTimeString, setCurrentTimeString] = useState<string>('');
  const trackListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTimeString(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

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

  const togglePlaylist = () => {
    setIsPlaylistOpen(prev => {
      const nextState = !prev;
      if (nextState) {
        setTimeout(() => {
          trackListRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
      return nextState;
    });
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
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-slate-950 font-black text-sm tracking-tighter shadow-lg shadow-orange-500/30 border border-white/20 select-none">
              GV
            </div>
            <div>
              <span className="font-yatra text-base sm:text-lg font-bold text-[#F5F5DC] tracking-wide">
                Gujarati Vibe
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 font-mono border border-orange-500/30">
                {currentTimeString || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={togglePlaylist}
              title={isPlaylistOpen ? "Hide Playlist" : "Show Playlist"}
              className={`p-2 sm:px-3 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-gujarati backdrop-blur-md ${
                isPlaylistOpen
                  ? 'bg-orange-500/30 text-orange-200 border-orange-500/50 hover:bg-orange-500/40'
                  : 'bg-black/40 text-slate-300 border-white/10 hover:text-white'
              }`}
            >
              <ListMusic className="w-4 h-4 text-orange-400" />
              <span className="hidden sm:inline">પ્લેલિસ્ટ</span>
            </button>

            <button
              onClick={() => setIsPlayerVisible(!isPlayerVisible)}
              title={isPlayerVisible ? "Disable Player Display" : "Enable Player Display"}
              className={`p-2 sm:px-3 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-gujarati backdrop-blur-md ${
                isPlayerVisible
                  ? 'bg-orange-500/20 text-orange-300 border-orange-500/40 hover:bg-orange-500/30'
                  : 'bg-black/40 text-slate-400 border-white/10 hover:text-slate-200'
              }`}
            >
              {isPlayerVisible ? (
                <>
                  <Eye className="w-4 h-4 text-orange-400" />
                  <span className="hidden sm:inline">પ્લેયર ચાલુ</span>
                </>
              ) : (
                <>
                  <EyeOff className="w-4 h-4 text-slate-400" />
                  <span className="hidden sm:inline">પ્લેયર બંધ</span>
                </>
              )}
            </button>

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
          onNext={nextTrack}
          onPrevious={previousTrack}
          onSeek={seekTo}
          onToggleShuffle={toggleShuffle}
          onCycleRepeat={cycleRepeatMode}
          onOpenShortcuts={() => setIsShortcutsOpen(true)}
          isPlayerVisible={isPlayerVisible}
          onTogglePlayerVisible={() => setIsPlayerVisible(!isPlayerVisible)}
        />

        {/* Full Interactive Playlist TrackList Section */}
        {isPlaylistOpen && (
          <div ref={trackListRef} className="w-full max-w-7xl mx-auto px-4 my-6 z-30 animate-fadeIn relative">
            <button
              onClick={() => setIsPlaylistOpen(false)}
              title="Close Playlist"
              className="absolute top-2 right-6 sm:right-10 z-30 w-8 h-8 rounded-full bg-slate-900 border border-white/20 text-slate-300 hover:text-orange-400 flex items-center justify-center shadow-2xl transition-all hover:scale-110"
            >
              <X className="w-4 h-4" />
            </button>

            <TrackList
              tracks={tracks}
              currentTrackIndex={playerState.currentIndex}
              isPlaying={playerState.isPlaying}
              isLoading={playerState.isLoading}
              favorites={favorites}
              onSelectTrack={(index) => {
                playVideoAt(index);
              }}
              onToggleFavorite={toggleFavorite}
            />
          </div>
        )}

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
        onToggleTrackListDrawer={togglePlaylist}
      />

      {/* Keyboard Shortcuts Helper Modal */}
      <KeyboardShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />
    </div>
  );
}
