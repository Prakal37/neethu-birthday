/**
 * HER UNIVERSE — AUDIO & SOUND EFFECTS ENGINE
 * 
 * Uses the Web Audio API for zero-dependency, ultra-crisp audio synthesized
 * in real-time (piñata hits, celestial chimes, confetti bursts, envelope opens,
 * ambient cosmic soundtrack, and music-box Happy Birthday melody).
 * Also supports user-provided MP3 files gracefully.
 */

let audioCtx = null;
let ambientOscillators = [];
let ambientGain = null;
let isAmbientPlaying = false;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Piñata impact sound (satisfying punch + resonance)
 */
export function playHitSound(pitchMultiplier = 1) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    
    // Low thud
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(160 * pitchMultiplier, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.15);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.2);

    // High sparkle tap
    const clickOsc = ctx.createOscillator();
    const clickGain = ctx.createGain();
    clickOsc.type = 'sine';
    clickOsc.frequency.setValueAtTime(520 * pitchMultiplier, now);
    clickOsc.frequency.exponentialRampToValueAtTime(880 * pitchMultiplier, now + 0.12);

    clickGain.gain.setValueAtTime(0.25, now);
    clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

    clickOsc.connect(clickGain);
    clickGain.connect(ctx.destination);

    clickOsc.start(now);
    clickOsc.stop(now + 0.15);
  } catch {
    // Graceful fallback if Web Audio is restricted
  }
}

/**
 * Piñata shatter / Supernova burst sound
 */
export function playShatterSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const chords = [523.25, 659.25, 783.99, 1046.5, 1318.51]; // C Major sparkle

    chords.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.05);

      gain.gain.setValueAtTime(0.2, now + idx * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8 + idx * 0.1);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.05);
      osc.stop(now + 1.2);
    });
  } catch {
    // fallback
  }
}

/**
 * Ascending chime when a clue is solved or quiz is correct
 */
export function playSuccessChime() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [440, 554.37, 659.25, 880]; // A Major arpeggio

    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + index * 0.08);

      gain.gain.setValueAtTime(0.18, now + index * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.08 + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + index * 0.08);
      osc.stop(now + index * 0.08 + 0.45);
    });
  } catch {
    // fallback
  }
}

/**
 * Subtle sparkle shimmer for interactions & button hovers
 */
export function playSparkle() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(987.77, now); // B5
    osc.frequency.exponentialRampToValueAtTime(1318.51, now + 0.12); // E6

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.22);
  } catch {
    // fallback
  }
}

/**
 * Envelope open rustle sound
 */
export function playPaperRustle() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const bufferSize = ctx.sampleRate * 0.25;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1400, now);
    filter.Q.setValueAtTime(3.0, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.24);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
  } catch {
    // fallback
  }
}

/**
 * Plays a gentle music-box rendering of "Happy Birthday"
 */
export function playBirthdayMelody() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const notes = [
      { note: 261.63, dur: 0.35, pause: 0.4 }, // C4
      { note: 261.63, dur: 0.25, pause: 0.3 }, // C4
      { note: 293.66, dur: 0.5, pause: 0.6 },  // D4
      { note: 261.63, dur: 0.5, pause: 0.6 },  // C4
      { note: 349.23, dur: 0.5, pause: 0.6 },  // F4
      { note: 329.63, dur: 0.9, pause: 1.0 },  // E4

      { note: 261.63, dur: 0.35, pause: 0.4 }, // C4
      { note: 261.63, dur: 0.25, pause: 0.3 }, // C4
      { note: 293.66, dur: 0.5, pause: 0.6 },  // D4
      { note: 261.63, dur: 0.5, pause: 0.6 },  // C4
      { note: 392.00, dur: 0.5, pause: 0.6 },  // G4
      { note: 349.23, dur: 0.9, pause: 1.0 },  // F4

      { note: 261.63, dur: 0.35, pause: 0.4 }, // C4
      { note: 261.63, dur: 0.25, pause: 0.3 }, // C4
      { note: 523.25, dur: 0.5, pause: 0.6 },  // C5
      { note: 440.00, dur: 0.5, pause: 0.6 },  // A4
      { note: 349.23, dur: 0.5, pause: 0.6 },  // F4
      { note: 329.63, dur: 0.5, pause: 0.6 },  // E4
      { note: 293.66, dur: 0.8, pause: 0.9 },  // D4

      { note: 466.16, dur: 0.35, pause: 0.4 }, // Bb4
      { note: 466.16, dur: 0.25, pause: 0.3 }, // Bb4
      { note: 440.00, dur: 0.5, pause: 0.6 },  // A4
      { note: 349.23, dur: 0.5, pause: 0.6 },  // F4
      { note: 392.00, dur: 0.5, pause: 0.6 },  // G4
      { note: 349.23, dur: 1.2, pause: 1.4 },  // F4
    ];

    let startTime = ctx.currentTime + 0.1;

    notes.forEach(({ note, dur, pause }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Music box bell timbre
      osc.type = 'sine';
      osc.frequency.setValueAtTime(note, startTime);

      gain.gain.setValueAtTime(0.18, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + dur);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + dur + 0.05);

      startTime += pause;
    });
  } catch {
    // fallback
  }
}

/**
 * Toggle ethereal celestial ambient background drone
 */
export function toggleAmbientMusic(shouldPlay) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return false;

    if (shouldPlay && !isAmbientPlaying) {
      // Start ethereal drone
      const now = ctx.currentTime;
      ambientGain = ctx.createGain();
      ambientGain.gain.setValueAtTime(0.01, now);
      ambientGain.gain.exponentialRampToValueAtTime(0.08, now + 2); // Soft gentle fade in

      const freqs = [110, 164.81, 220, 329.63]; // A chord pad
      ambientOscillators = freqs.map((f, i) => {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f + (i % 2 === 0 ? 0.3 : -0.3), now);
        osc.connect(ambientGain);
        osc.start(now);
        return osc;
      });

      ambientGain.connect(ctx.destination);
      isAmbientPlaying = true;
      return true;
    } else if (!shouldPlay && isAmbientPlaying) {
      if (ambientGain) {
        const now = ctx.currentTime;
        ambientGain.gain.setValueAtTime(ambientGain.gain.value, now);
        ambientGain.gain.exponentialRampToValueAtTime(0.001, now + 1);
        setTimeout(() => {
          ambientOscillators.forEach((osc) => {
            try { osc.stop(); } catch {}
          });
          ambientOscillators = [];
        }, 1100);
      }
      isAmbientPlaying = false;
      return false;
    }
    return isAmbientPlaying;
  } catch {
    return false;
  }
}
