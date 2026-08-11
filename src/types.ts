/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Track {
  id: string; // video ID
  title: string;
  artist: string;
  thumbnailUrl: string;
  duration?: string;
  isFavorite?: boolean;
}

export type RepeatMode = 'off' | 'one' | 'all';

export interface PlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number; // 0 to 100
  isMuted: boolean;
  isShuffle: boolean;
  repeatMode: RepeatMode;
  currentIndex: number;
  isLoading: boolean;
  isBuffering: boolean;
  error: string | null;
}

// Global YouTube API Window augmentation
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}
