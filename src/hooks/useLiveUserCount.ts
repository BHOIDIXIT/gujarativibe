import { useState, useEffect, useMemo } from 'react';
import { collection, doc, setDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { firestore } from '../lib/firebase';

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
    if (!firestore) {
      setIsConnected(false);
      return;
    }

    const docRef = doc(firestore, 'presence', sessionId);

    // 1. Set online status
    const updatePresence = async () => {
      try {
        await setDoc(docRef, {
          online: true,
          timestamp: Date.now()
        });
        setIsConnected(true);
      } catch (err) {
        console.warn('Failed to set presence in Firestore:', err);
        setIsConnected(false);
      }
    };

    updatePresence();

    // Heartbeat every 30 seconds
    const intervalId = setInterval(updatePresence, 30000);

    // 2. Listen to presence collection
    const presenceCol = collection(firestore, 'presence');
    const unsubscribe = onSnapshot(
      presenceCol,
      (snapshot) => {
        const now = Date.now();
        let activeCount = 0;
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          if (data && data.online && data.timestamp && now - data.timestamp < 120000) {
            activeCount++;
          }
        });
        setCount(BASE_COUNT + (activeCount > 0 ? activeCount : 1));
        setIsConnected(true);
      },
      (error) => {
        console.warn('Firestore presence snapshot error:', error);
        setIsConnected(false);
      }
    );

    // Clean up on unmount / tab close
    const handleUnload = () => {
      deleteDoc(docRef).catch(() => {});
    };

    window.addEventListener('beforeunload', handleUnload);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('beforeunload', handleUnload);
      deleteDoc(docRef).catch(() => {});
      unsubscribe();
    };
  }, [sessionId]);

  return { count, isConnected };
}
