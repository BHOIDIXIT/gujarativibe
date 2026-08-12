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
import { LiveUserCounter } from './components/LiveUserCounter';
import { Keyboard, Radio, Sparkles, Truck, ShieldAlert, Eye, EyeOff, ListMusic, X, Youtube } from 'lucide-react';
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
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);
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
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlayPause, seekTo, setVolume, toggleMute, playerState]);

  const togglePlaylist = () => {
    trackListRef.current?.scrollIntoView({ behavior: 'smooth' });
    setIsPlaylistOpen(prev => !prev);
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
        <header className="w-full max-w-7xl px-4 sm:px-6 py-2.5 sm:py-3 flex flex-wrap items-center justify-between gap-3 z-30">
          
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

          {/* Live Listener Counter Badge in Header */}
          <div className="flex items-center justify-center">
            <LiveUserCounter />
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsPlayerVisible(!isPlayerVisible)}
              title={isPlayerVisible ? "Hide Player Card" : "Show Player Card"}
              className={`p-2 sm:px-3 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-gujarati backdrop-blur-md ${
                isPlayerVisible
                  ? 'bg-orange-500/30 text-orange-200 border-orange-500/50 hover:bg-orange-500/40'
                  : 'bg-black/40 text-slate-300 border-white/10 hover:text-white'
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

            <a
              href="https://music.youtube.com/playlist?list=PLYXh3YOOErgs&si=a5MvutU3n_HsRy4A"
              target="_blank"
              rel="noopener noreferrer"
              title="YouTube Music પ્લેલિસ્ટ ખોલો (YT Music)"
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-red-600/20 hover:bg-red-600/40 text-red-400 border border-red-500/30 flex items-center gap-1.5 transition-all text-xs font-gujarati backdrop-blur-md hover:scale-105 active:scale-95 shadow-lg shadow-red-950/20"
            >
              <Youtube className="w-4 h-4 text-red-500" />
              <span className="hidden sm:inline font-semibold">YT Music</span>
            </a>
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

        {/* Right Sidebar Playlist Drawer Panel */}
        {isPlaylistOpen && (
          <>
            {/* Backdrop Overlay */}
            <div 
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity"
              onClick={() => setIsPlaylistOpen(false)}
            />

            {/* Slide-out Right Sidebar Panel */}
            <div 
              ref={trackListRef}
              className="fixed top-0 right-0 bottom-[80px] sm:bottom-[92px] h-[calc(100vh-80px)] sm:h-[calc(100vh-92px)] w-full max-w-md sm:max-w-lg bg-slate-950/95 backdrop-blur-2xl border-l border-white/15 shadow-2xl z-50 flex flex-col p-4 sm:p-5 overflow-hidden"
            >
            

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
                onClose={() => setIsPlaylistOpen(false)}
                isSidebar
              />
            </div>
          </>
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
