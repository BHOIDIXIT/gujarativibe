/**
 * Custom React Hook to manage YouTube IFrame Player API for Playlist PLYXh3YOOErgs
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { Track, PlayerState, RepeatMode } from '../types';
import { fetchTrackMetadata, parseArtistAndTitle } from '../utils/trackParser';

const PLAYLIST_ID = 'PLYXh3YOOErgs';
const FAV_STORAGE_KEY = 'gujju_radio_fav_tracks_v1';

export function useYouTubePlayer() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(FAV_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [playerState, setPlayerState] = useState<PlayerState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 80,
    isMuted: false,
    isShuffle: false,
    repeatMode: 'all',
    currentIndex: 0,
    isLoading: true,
    isBuffering: false,
    error: null,
  });

  const playerRef = useRef<any>(null);
  const tickerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync favorites with localStorage
  const toggleFavorite = useCallback((videoId: string) => {
    setFavorites((prev) => {
      const next = prev.includes(videoId)
        ? prev.filter((id) => id !== videoId)
        : [...prev, videoId];
      try {
        localStorage.setItem(FAV_STORAGE_KEY, JSON.stringify(next));
      } catch (e) {
        console.error('Failed to save favorite to localStorage', e);
      }
      return next;
    });
  }, []);

  // Fetch playlist items and construct track objects
  const loadPlaylistTracks = useCallback(async (player: any) => {
    try {
      let videoIds: string[] = player.getPlaylist() || [];

      // If playlist isn't instantly ready, poll a few times
      if (!videoIds || videoIds.length === 0) {
        let attempts = 0;
        while ((!videoIds || videoIds.length === 0) && attempts < 10) {
          await new Promise((res) => setTimeout(res, 300));
          videoIds = player.getPlaylist() || [];
          attempts++;
        }
      }

      if (!videoIds || videoIds.length === 0) {
        // Fallback default set if YouTube API returns empty
        videoIds = ['u9E8k_Nn-kM', 'z4S_x-0G12Y', 'x0u7r4T3yEw', 'Gg4D-z5A44M', 'p4_s5k67123', 'H7s01x_Lp0Q', 'q37x4W9-m3A'];
      }

      // Fetch metadata in parallel for all playlist items
      const trackPromises = videoIds.map((id) => fetchTrackMetadata(id));
      const loadedTracks = await Promise.all(trackPromises);

      setTracks(loadedTracks);
      setPlayerState((prev) => ({ ...prev, isLoading: false }));
    } catch (err) {
      console.error('Error loading YouTube playlist tracks:', err);
      setPlayerState((prev) => ({
        ...prev,
        isLoading: false,
        error: 'સંગીત યાદી લોડ કરવામાં સમસ્યા આવી. (Unable to load playlist)',
      }));
    }
  }, []);

  // Initialize YouTube IFrame API
  useEffect(() => {
    const initPlayer = () => {
      if (playerRef.current) return;

      playerRef.current = new window.YT.Player('youtube-hidden-player', {
        height: '1',
        width: '1',
        playerVars: {
          listType: 'playlist',
          list: PLAYLIST_ID,
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
          enablejsapi: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: (event: any) => {
            event.target.setVolume(80);
            loadPlaylistTracks(event.target);
          },
          onStateChange: (event: any) => {
            const state = event.data;
            const YTState = window.YT.PlayerState;

            if (state === YTState.PLAYING) {
              const curIndex = playerRef.current.getPlaylistIndex();
              const dur = playerRef.current.getDuration() || 0;
              setPlayerState((prev) => ({
                ...prev,
                isPlaying: true,
                isBuffering: false,
                currentIndex: curIndex >= 0 ? curIndex : prev.currentIndex,
                duration: dur > 0 ? dur : prev.duration,
              }));

              // Dynamically update title if YT video data provides detailed title
              try {
                const videoData = playerRef.current.getVideoData();
                if (videoData && videoData.title && videoData.video_id) {
                  const parsed = parseArtistAndTitle(videoData.title);
                  setTracks((prevTracks) =>
                    prevTracks.map((t) =>
                      t.id === videoData.video_id
                        ? { ...t, title: parsed.title, artist: parsed.artist }
                        : t
                    )
                  );
                }
              } catch (e) {
                // Ignore videoData error
              }

            } else if (state === YTState.PAUSED) {
              setPlayerState((prev) => ({ ...prev, isPlaying: false, isBuffering: false }));
            } else if (state === YTState.BUFFERING) {
              setPlayerState((prev) => ({ ...prev, isBuffering: true }));
            } else if (state === YTState.ENDED) {
              setPlayerState((prev) => ({ ...prev, isPlaying: false, isBuffering: false }));
              handleTrackEnded();
            }
          },
          onError: (event: any) => {
            console.warn('YouTube Player error code:', event.data);
            // Auto skip to next track on error
            setTimeout(() => {
              if (playerRef.current) {
                playerRef.current.nextVideo();
              }
            }, 1000);
          },
        },
      });
    };

    if (!window.YT || !window.YT.Player) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        initPlayer();
      };
    } else {
      initPlayer();
    }

    return () => {
      if (tickerRef.current) clearInterval(tickerRef.current);
    };
  }, [loadPlaylistTracks]);

  // Handle Track End with repeat/shuffle logic
  const handleTrackEnded = () => {
    if (!playerRef.current) return;

    setPlayerState((prev) => {
      const { repeatMode, isShuffle, currentIndex } = prev;

      if (repeatMode === 'one') {
        playerRef.current.seekTo(0, true);
        playerRef.current.playVideo();
        return prev;
      }

      if (isShuffle && tracks.length > 1) {
        let randomIndex = Math.floor(Math.random() * tracks.length);
        if (randomIndex === currentIndex) {
          randomIndex = (currentIndex + 1) % tracks.length;
        }
        playerRef.current.playVideoAt(randomIndex);
        return { ...prev, currentIndex: randomIndex };
      }

      // Default playlist next
      playerRef.current.nextVideo();
      return prev;
    });
  };

  // Time update ticker
  useEffect(() => {
    if (playerState.isPlaying) {
      tickerRef.current = setInterval(() => {
        if (playerRef.current) {
          const curTime = playerRef.current.getCurrentTime() || 0;
          const dur = playerRef.current.getDuration() || playerState.duration;
          const curIndex = playerRef.current.getPlaylistIndex();

          setPlayerState((prev) => ({
            ...prev,
            currentTime: curTime,
            duration: dur,
            currentIndex: curIndex >= 0 ? curIndex : prev.currentIndex,
          }));
        }
      }, 500);
    } else {
      if (tickerRef.current) clearInterval(tickerRef.current);
    }

    return () => {
      if (tickerRef.current) clearInterval(tickerRef.current);
    };
  }, [playerState.isPlaying, playerState.duration]);

  // Player controls
  const togglePlayPause = useCallback(() => {
    if (!playerRef.current) return;
    if (playerState.isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  }, [playerState.isPlaying]);

  const playVideoAt = useCallback((index: number) => {
    if (!playerRef.current) return;
    playerRef.current.playVideoAt(index);
    setPlayerState((prev) => ({ ...prev, currentIndex: index, isPlaying: true }));
  }, []);

  const nextTrack = useCallback(() => {
    if (!playerRef.current) return;
    if (playerState.isShuffle && tracks.length > 1) {
      let rand = Math.floor(Math.random() * tracks.length);
      if (rand === playerState.currentIndex) rand = (rand + 1) % tracks.length;
      playVideoAt(rand);
    } else {
      playerRef.current.nextVideo();
    }
  }, [playerState.isShuffle, playerState.currentIndex, tracks.length, playVideoAt]);

  const previousTrack = useCallback(() => {
    if (!playerRef.current) return;
    if (playerState.currentTime > 4) {
      playerRef.current.seekTo(0, true);
    } else {
      playerRef.current.previousVideo();
    }
  }, [playerState.currentTime]);

  const seekTo = useCallback((seconds: number) => {
    if (!playerRef.current) return;
    playerRef.current.seekTo(seconds, true);
    setPlayerState((prev) => ({ ...prev, currentTime: seconds }));
  }, []);

  const setVolume = useCallback((val: number) => {
    if (!playerRef.current) return;
    const clamped = Math.max(0, Math.min(100, val));
    playerRef.current.setVolume(clamped);
    setPlayerState((prev) => ({
      ...prev,
      volume: clamped,
      isMuted: clamped === 0,
    }));
  }, []);

  const toggleMute = useCallback(() => {
    if (!playerRef.current) return;
    if (playerState.isMuted) {
      playerRef.current.unMute();
      setPlayerState((prev) => ({ ...prev, isMuted: false }));
    } else {
      playerRef.current.mute();
      setPlayerState((prev) => ({ ...prev, isMuted: true }));
    }
  }, [playerState.isMuted]);

  const toggleShuffle = useCallback(() => {
    setPlayerState((prev) => ({ ...prev, isShuffle: !prev.isShuffle }));
  }, []);

  const cycleRepeatMode = useCallback(() => {
    setPlayerState((prev) => {
      const modes: RepeatMode[] = ['off', 'all', 'one'];
      const nextIdx = (modes.indexOf(prev.repeatMode) + 1) % modes.length;
      return { ...prev, repeatMode: modes[nextIdx] };
    });
  }, []);

  const currentTrack = tracks[playerState.currentIndex] || null;

  return {
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
  };
}
