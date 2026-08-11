/**
 * TrackList component displaying the scrollable list of Gujarati songs
 * with search, favorites tab, and playing indicators.
 */

import React, { useState, useMemo } from 'react';
import { Track } from '../types';
import { Search, Heart, Play, Music, Sparkles, Volume2 } from 'lucide-react';

interface TrackListProps {
  tracks: Track[];
  currentTrackIndex: number;
  isPlaying: boolean;
  isLoading: boolean;
  favorites: string[];
  onSelectTrack: (index: number) => void;
  onToggleFavorite: (videoId: string) => void;
}

export const TrackList: React.FC<TrackListProps> = ({
  tracks,
  currentTrackIndex,
  isPlaying,
  isLoading,
  favorites,
  onSelectTrack,
  onToggleFavorite,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'favorites'>('all');

  const currentTrack = tracks[currentTrackIndex] || null;

  // Filter tracks by tab and search query
  const filteredTracks = useMemo(() => {
    return tracks
      .map((track, originalIndex) => ({ track, originalIndex }))
      .filter(({ track }) => {
        if (activeTab === 'favorites' && !favorites.includes(track.id)) {
          return false;
        }
        if (!searchQuery.trim()) return true;

        const q = searchQuery.toLowerCase();
        return (
          track.title.toLowerCase().includes(q) ||
          track.artist.toLowerCase().includes(q)
        );
      });
  }, [tracks, searchQuery, activeTab, favorites]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 my-6 z-20 relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* Left Column (5 cols): Featured Now Playing Album Artwork Card */}
        {currentTrack && (
          <div className="lg:col-span-5 flex flex-col items-center justify-center py-2">
            <div className="relative group w-full max-w-[340px]">
              {/* Glowing ambient background blur */}
              <div className="absolute -inset-4 bg-orange-500/20 rounded-2xl blur-xl group-hover:bg-orange-500/30 transition-all pointer-events-none" />
              
              {/* Album art frame */}
              <div className="relative aspect-square w-full bg-[#1A1A1A] rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl group">
                <img
                  src={currentTrack.thumbnailUrl}
                  alt={currentTrack.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Gradient overlay with current track info */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6">
                  <span className="text-xs font-bold text-orange-400 uppercase tracking-widest block mb-1 font-sans">
                    ● હવે વાગે છે (Now Playing)
                  </span>
                  <h2 className="text-2xl font-bold leading-tight text-white font-gujarati drop-shadow-md">
                    {currentTrack.title}
                  </h2>
                  <p className="text-sm opacity-80 text-orange-100 font-gujarati mt-1">
                    {currentTrack.artist}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Right Column (7 cols): Glass Playlist Container */}
        <div className={`${currentTrack ? 'lg:col-span-7' : 'lg:col-span-12'} flex flex-col bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl p-4 sm:p-6`}>
          
          {/* Header & Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            
            {/* Title & Badge */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold shadow-md">
                <Music className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-orange-400 font-sans flex items-center gap-2">
                  <span>પ્લેલિસ્ટ (Playlist)</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 font-sans border border-orange-500/30">
                    {tracks.length} Tracks
                  </span>
                </h3>
                <p className="text-xs text-slate-300/80 font-gujarati">
                  ગરબા, લોકગીતો અને દેશી સંગીત સ્પેશિયલ
                </p>
              </div>
            </div>

            {/* Filter Tabs & Search Box */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              
              {/* Tabs */}
              <div className="flex bg-black/50 p-1 rounded-xl border border-white/10 font-gujarati text-xs">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    activeTab === 'all'
                      ? 'bg-orange-500 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  બધા ({tracks.length})
                </button>
                <button
                  onClick={() => setActiveTab('favorites')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                    activeTab === 'favorites'
                      ? 'bg-red-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Heart className="w-3.5 h-3.5 fill-current" />
                  <span>પસંદગીના ({favorites.length})</span>
                </button>
              </div>

              {/* Search Input */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="શોધો (Search)..."
                  className="w-full sm:w-40 md:w-48 pl-9 pr-3 py-1.5 text-xs bg-black/60 border border-white/10 focus:border-orange-500 text-slate-100 rounded-xl outline-none transition-all placeholder:text-slate-500 font-gujarati"
                />
              </div>
            </div>
          </div>

          {/* Scrollable Track List */}
          <div className="mt-4 max-h-[420px] overflow-y-auto pr-1 space-y-1.5">
            
            {/* Skeleton Loaders */}
            {isLoading && (
              <div className="space-y-3 py-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <div key={n} className="flex items-center gap-4 p-3 rounded-xl bg-white/5 animate-pulse">
                    <div className="w-12 h-12 bg-white/10 rounded-lg shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="w-3/4 h-4 bg-white/10 rounded" />
                      <div className="w-1/2 h-3 bg-white/10 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!isLoading && filteredTracks.length === 0 && (
              <div className="py-12 text-center text-slate-400 font-gujarati space-y-2">
                <p className="text-base font-bold text-slate-300">કોઈ ગીત મળ્યું નથી (No songs found)</p>
                <p className="text-xs text-slate-500">
                  {activeTab === 'favorites'
                    ? 'તમે કોઈ પણ ગીત પર ❤️ દબાવીને ફેવરિટ્સમાં ઉમેરી શકો છો.'
                    : 'કૃપા કરીને શોધો શબ્દ બદલી જુઓ.'}
                </p>
              </div>
            )}

            {/* List Items */}
            {!isLoading &&
              filteredTracks.map(({ track, originalIndex }) => {
                const isCurrent = currentTrackIndex === originalIndex;
                const isFav = favorites.includes(track.id);

                return (
                  <div
                    key={track.id + originalIndex}
                    onClick={() => onSelectTrack(originalIndex)}
                    className={`group relative flex items-center justify-between p-2.5 rounded-xl transition-all duration-200 cursor-pointer ${
                      isCurrent
                        ? 'bg-orange-500/20 border border-orange-500/30 text-white font-bold shadow-lg'
                        : 'hover:bg-white/5 text-slate-200 border border-transparent'
                    }`}
                  >
                    {/* Left: Index & Thumbnail & Details */}
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      
                      {/* Index Badge */}
                      <div className={`w-7 h-7 rounded-md flex-shrink-0 flex items-center justify-center text-xs font-bold ${
                        isCurrent ? 'bg-orange-600 text-white shadow' : 'bg-white/5 text-slate-400'
                      }`}>
                        {isCurrent && isPlaying ? (
                          <div className="flex items-end justify-center gap-0.5 h-3.5 w-3.5">
                            <span className="w-0.5 bg-white eq-bar-1 rounded-t" />
                            <span className="w-0.5 bg-white eq-bar-2 rounded-t" />
                            <span className="w-0.5 bg-white eq-bar-3 rounded-t" />
                          </div>
                        ) : (
                          <span>{String(originalIndex + 1).padStart(2, '0')}</span>
                        )}
                      </div>

                      {/* Thumbnail Image with Play Overlay */}
                      <div className="relative w-11 h-11 rounded-lg overflow-hidden bg-black shrink-0 shadow-sm border border-white/10">
                        <img
                          src={track.thumbnailUrl}
                          alt={track.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                        <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity ${
                          isCurrent ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                        }`}>
                          <div className="w-6 h-6 rounded-full bg-orange-500 text-slate-950 flex items-center justify-center shadow">
                            <Play className="w-3 h-3 fill-current ml-0.5" />
                          </div>
                        </div>
                      </div>

                      {/* Title & Artist */}
                      <div className="min-w-0 flex-1">
                        <h4 className={`text-sm font-bold font-gujarati truncate ${
                          isCurrent ? 'text-orange-300' : 'text-slate-100 group-hover:text-orange-200'
                        }`}>
                          {track.title}
                        </h4>
                        <p className="text-xs text-slate-400 font-gujarati truncate mt-0.5">
                          {track.artist}
                        </p>
                      </div>
                    </div>

                    {/* Right: Duration & Favorite Button */}
                    <div className="flex items-center gap-2.5 shrink-0 ml-2">
                      {track.duration && (
                        <span className="text-[11px] font-mono text-slate-400 hidden sm:inline-block">
                          {track.duration}
                        </span>
                      )}

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite(track.id);
                        }}
                        title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                        className={`p-1.5 rounded-full transition-colors ${
                          isFav
                            ? 'text-red-500 hover:text-red-400 bg-red-500/10'
                            : 'text-slate-500 hover:text-red-400 hover:bg-white/10'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
