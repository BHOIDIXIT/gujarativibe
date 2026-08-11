/**
 * Synthesizes a truck horn sound using Web Audio API.
 */
export const playTruckHorn = (type: 'classic' | 'pressure' | 'dipper' = 'classic') => {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    if (type === 'pressure') {
      osc1.frequency.value = 340;
      osc2.frequency.value = 410;
    } else if (type === 'dipper') {
      osc1.frequency.value = 290;
      osc2.frequency.value = 360;
    } else {
      osc1.frequency.value = 310;
      osc2.frequency.value = 380;
    }

    osc1.type = 'sawtooth';
    osc2.type = 'sawtooth';

    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start();
    osc2.start();

    osc1.stop(ctx.currentTime + 0.45);
    osc2.stop(ctx.currentTime + 0.45);
  } catch {
    // Ignore audio context restrictions or browser constraints
  }
};
