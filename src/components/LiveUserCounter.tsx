import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLiveUserCount } from '../hooks/useLiveUserCount';

export const LiveUserCounter: React.FC = () => {
  const { count } = useLiveUserCount();
  const displayCount = count > 0 ? count : 50;

  return (
    <div 
      className="inline-flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-emerald-500/40 shadow-xl text-xs font-mono text-emerald-300 transition-all select-none"
      title={`${displayCount} લોકો હમણાં સાંભળી રહ્યા છે`}
    >
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
      </span>

      <div className="flex items-center font-bold text-emerald-200">
        <div className="overflow-hidden h-4 flex items-center min-w-[10px] justify-center">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={displayCount}
              initial={{ y: -12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 12, opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="inline-block text-emerald-200 font-bold leading-none"
            >
              {displayCount}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
