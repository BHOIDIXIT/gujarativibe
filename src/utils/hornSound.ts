/**
 * Web Audio API synthesizer for authentic Indian Truck Horn & Sound Effects
 * Gujju Truck Radio - "🔊 હૉર્ન વગાડો"
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Plays a loud, punchy Indian truck dual-tone air horn sound ("PAAA-PAAANN!!")
 */
export function playTruckHorn(type: 'classic' | 'pressure' | 'dipper' = 'classic') {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    if (type === 'classic' || type === 'pressure') {
      // Dual brass air horn oscillators
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const osc3 = ctx.createOscillator();

      const gainNode = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // Frequencies for iconic heavy-vehicle brass horn (A3 & C#4 resonant pair)
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(220, now); // Low note
      osc1.frequency.exponentialRampToValueAtTime(225, now + 0.1);

      osc2.type = 'square';
      osc2.frequency.setValueAtTime(277.18, now); // Major third higher
      osc2.frequency.exponentialRampToValueAtTime(282, now + 0.1);

      osc3.type = 'sawtooth';
      osc3.frequency.setValueAtTime(440, now); // Octave overtone for punch
      
      // Filter for brassy resonance
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1800, now);
      filter.Q.setValueAtTime(3, now);

      // Volume envelope
      const duration = type === 'pressure' ? 0.8 : 0.55;
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.45, now + 0.04); // Punchy attack
      gainNode.gain.setValueAtTime(0.42, now + duration - 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);

      // Connect graph
      osc1.connect(filter);
      osc2.connect(filter);
      osc3.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc3.start(now);

      osc1.stop(now + duration);
      osc2.stop(now + duration);
      osc3.stop(now + duration);

    } else if (type === 'dipper') {
      // Quick double beep for "Light Dipper Maro"
      [0, 0.18].forEach((delay) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(880, now + delay);
        
        gain.gain.setValueAtTime(0, now + delay);
        gain.gain.linearRampToValueAtTime(0.3, now + delay + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.12);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + delay);
        osc.stop(now + delay + 0.14);
      });
    }
  } catch (e) {
    console.warn('AudioContext playback error:', e);
  }
}
