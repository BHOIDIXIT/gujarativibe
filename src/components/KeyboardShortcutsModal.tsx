/**
 * Keyboard Shortcuts Modal Component
 */

import React from 'react';
import { X, Keyboard, Volume2 } from 'lucide-react';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const shortcuts = [
    { key: 'Space', desc: 'સંગીત શરૂ / થોભાવો (Play / Pause)' },
    { key: '← / →', desc: 'પાછળ / આગળ સીક કરો (Seek -/+ 5s)' },
    { key: '↑ / ↓', desc: 'અવાજ વધારો / ઘટાડો (Volume Up/Down)' },
    { key: 'M', desc: 'અવાજ બંધ કરો (Mute / Unmute)' },

  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-[#0A192F] border border-white/10 rounded-2xl shadow-2xl p-6 text-slate-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-orange-300 p-1.5 rounded-full hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400">
            <Keyboard className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold font-gujarati text-white">
              કીબોર્ડ શોર્ટકટ્સ (Shortcuts)
            </h3>
            <p className="text-xs text-slate-400 font-gujarati">
              ઝડપી કંટ્રોલ માટે કીબોર્ડ વાપરો
            </p>
          </div>
        </div>

        {/* Shortcuts list */}
        <div className="space-y-2.5 my-4 divide-y divide-white/10">
          {shortcuts.map((s, i) => (
            <div key={i} className="pt-2 flex items-center justify-between text-xs sm:text-sm">
              <span className="font-gujarati text-slate-300">{s.desc}</span>
              <kbd className="px-2.5 py-1 bg-black/60 border border-white/10 rounded-md font-mono text-orange-400 font-bold shadow-inner">
                {s.key}
              </kbd>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-3 border-t border-white/10 text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-orange-500 text-slate-950 font-bold text-sm font-gujarati hover:bg-orange-400 transition-colors"
          >
            સમજાઈ ગયું (Got it!)
          </button>
        </div>
      </div>
    </div>
  );
};
