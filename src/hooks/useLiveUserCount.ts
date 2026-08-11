import { useState, useEffect, useMemo } from 'react';
import { ref, onValue, set, onDisconnect } from 'firebase/database';
import { db } from '../lib/firebase';

export interface UseLiveUserCountResult {
  count: number;
  isConnected: boolean;
}

const BASE_COUNT = 50;

export function useLiveUserCount(): UseLiveUserCountResult {
  const [count, setCount] = useState<number>(BASE_COUNT);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const sessionId = useMemo(() => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return 'session_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
  }, []);

  useEffect(() => {
    if (!db) {
      setIsConnected(false);
      return;
    }

    let myPresenceRef: ReturnType<typeof ref> | null = null;

    // 1. Listen for connection status
    const connectedRef = ref(db, '.info/connected');
    const unsubscribeConnected = onValue(
      connectedRef,
      (snap) => {
        if (snap.val() === true) {
          myPresenceRef = ref(db, `presence/${sessionId}`);
          
          // Setup onDisconnect handler to auto-remove on disconnect/tab close
          onDisconnect(myPresenceRef)
            .remove()
            .then(() => {
              if (myPresenceRef) {
                return set(myPresenceRef, {
                  online: true,
                  timestamp: Date.now()
                });
              }
            })
            .catch((err) => {
              console.warn('Failed to set onDisconnect/presence:', err);
            });

          setIsConnected(true);
        } else {
          setIsConnected(false);
        }
      },
      (error) => {
        console.warn('Firebase connection check error:', error);
        setIsConnected(false);
      }
    );

    // 2. Listen to presence count changes
    const presenceRef = ref(db, 'presence');
    const unsubscribePresence = onValue(
      presenceRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const val = snapshot.val();
          const activeCount = val ? Object.keys(val).length : 0;
          setCount(BASE_COUNT + activeCount);
        } else {
          setCount(BASE_COUNT);
        }
      },
      (error) => {
        console.warn('Firebase presence listener error:', error);
        setIsConnected(false);
        setCount(BASE_COUNT);
      }
    );

    return () => {
      unsubscribeConnected();
      unsubscribePresence();
      if (myPresenceRef) {
        set(myPresenceRef, null).catch(() => {});
      }
    };
  }, [sessionId]);

  return { count, isConnected };
}
