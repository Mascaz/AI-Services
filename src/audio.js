/**
 * Dual-World Procedural WebAudio Synthesizer (0 KB assets, $0 API cost)
 * -----------------------------------------------------------------------------
 * LEFT WORLD ("tool" — Braun / Teenage Engineering Hardware Lab):
 *   - Machined aluminum rotary detent ticks (high-passed noise impulse + woody click)
 *   - Tactile Alps/Cherry mechanical keycap switches (dual transient + chassis thud)
 *   - Precision camera-shutter latch + warm harmonic calibration triad on launch
 *
 * RIGHT WORLD ("arcade" / "game" — 1986 Shibuya CRT Arcade):
 *   - Sanwa leaf-spring microswitch ticks & convex plunger double-snaps
 *   - Metallic iron coin-chute drop + YM2151 FM synth 1UP arpeggio + CRT degauss thump
 *   - CRT horizontal beam collapse zap on stage exit
 */

let audioCtx = null;
let noiseBuffer = null;
let sfxEnabled = true;
let lastHoverTime = 0;

function getCtx() {
  if (!sfxEnabled) return null;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;
  if (!audioCtx) {
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

function getNoiseBuffer(ctx) {
  if (noiseBuffer && noiseBuffer.sampleRate === ctx.sampleRate) {
    return noiseBuffer;
  }
  const duration = 0.25;
  const length = Math.floor(ctx.sampleRate * duration);
  const buf = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buf.getChannelData(0);
  let b0 = 0;
  let b1 = 0;
  let b2 = 0;
  for (let i = 0; i < length; i++) {
    const white = Math.random() * 2 - 1;
    // Hybrid crisp white + warm pink transient texture
    b0 = 0.99765 * b0 + white * 0.099046;
    b1 = 0.963 * b1 + white * 0.2965164;
    b2 = 0.57 * b2 + white * 1.0526913;
    const pink = (b0 + b1 + b2 + white * 0.1848) * 0.18;
    data[i] = white * 0.62 + pink * 0.38;
  }
  noiseBuffer = buf;
  return buf;
}

function createStereoOut(ctx, pan = 0) {
  if (typeof ctx.createStereoPanner === 'function') {
    const panner = ctx.createStereoPanner();
    panner.pan.setValueAtTime(Math.max(-1, Math.min(1, pan)), ctx.currentTime);
    panner.connect(ctx.destination);
    return panner;
  }
  return ctx.destination;
}

function triggerNoiseBurst(ctx, dest, { time, duration, filterType = 'bandpass', freq = 2000, q = 2.0, gain = 0.04 }) {
  const src = ctx.createBufferSource();
  src.buffer = getNoiseBuffer(ctx);

  const filter = ctx.createBiquadFilter();
  filter.type = filterType;
  filter.frequency.setValueAtTime(freq, time);
  filter.Q.setValueAtTime(q, time);

  const env = ctx.createGain();
  env.gain.setValueAtTime(Math.max(0.0001, gain), time);
  env.gain.exponentialRampToValueAtTime(0.0001, time + duration);

  src.connect(filter);
  filter.connect(env);
  env.connect(dest);

  src.start(time);
  src.stop(time + duration + 0.005);
}

export function isSfxEnabled() {
  return sfxEnabled;
}

export function toggleSfx() {
  sfxEnabled = !sfxEnabled;
  if (sfxEnabled) {
    playMicroClick('tool', 0);
  }
  return sfxEnabled;
}

/**
 * Subtle tactile hover tick — rotary detent (Left) vs. leaf-spring ping (Right)
 */
export function playHoverTick(kind = 'tool', pan = kind === 'tool' ? -0.15 : 0.15) {
  const nowPerf = performance.now();
  if (nowPerf - lastHoverTime < 55) return;
  lastHoverTime = nowPerf;

  const ctx = getCtx();
  if (!ctx) return;
  const now = ctx.currentTime;
  const out = createStereoOut(ctx, pan);

  if (kind === 'tool') {
    // Machined aluminum rotary dial detent
    triggerNoiseBurst(ctx, out, {
      time: now,
      duration: 0.012,
      filterType: 'highpass',
      freq: 3400,
      q: 1.4,
      gain: 0.024
    });

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1320, now);
    osc.frequency.exponentialRampToValueAtTime(480, now + 0.016);
    gain.gain.setValueAtTime(0.02, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.018);
    osc.connect(gain);
    gain.connect(out);
    osc.start(now);
    osc.stop(now + 0.022);
  } else {
    // Arcade microswitch feather tick + CRT phosphor blip
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(1680, now);
    osc.frequency.setValueAtTime(2240, now + 0.009);
    gain.gain.setValueAtTime(0.012, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.024);
    osc.connect(gain);
    gain.connect(out);
    osc.start(now);
    osc.stop(now + 0.028);
  }
}

/**
 * Primary selection / step sound — Mechanical Keycap Switch (Left) vs. Sanwa Arcade Button (Right)
 */
export function playMicroClick(kind = 'tool', pan = null) {
  const ctx = getCtx();
  if (!ctx) return;

  const now = ctx.currentTime;
  const stereoPan = pan !== null ? pan : kind === 'tool' ? -0.1 : 0.1;
  const out = createStereoOut(ctx, stereoPan);

  if (kind === 'tool') {
    // 1. Keycap tactile leaf transient
    triggerNoiseBurst(ctx, out, {
      time: now,
      duration: 0.018,
      filterType: 'bandpass',
      freq: 2650,
      q: 2.8,
      gain: 0.075
    });

    // 2. Anodized aluminum plate bottom-out thud
    const bodyOsc = ctx.createOscillator();
    const bodyGain = ctx.createGain();
    bodyOsc.type = 'triangle';
    bodyOsc.frequency.setValueAtTime(240, now);
    bodyOsc.frequency.exponentialRampToValueAtTime(68, now + 0.042);
    bodyGain.gain.setValueAtTime(0.075, now);
    bodyGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.046);
    bodyOsc.connect(bodyGain);
    bodyGain.connect(out);
    bodyOsc.start(now);
    bodyOsc.stop(now + 0.05);

    // 3. Crisp metallic contact ping
    const pinOsc = ctx.createOscillator();
    const pinGain = ctx.createGain();
    pinOsc.type = 'sine';
    pinOsc.frequency.setValueAtTime(1180, now + 0.004);
    pinOsc.frequency.exponentialRampToValueAtTime(590, now + 0.028);
    pinGain.gain.setValueAtTime(0.032, now + 0.004);
    pinGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.032);
    pinOsc.connect(pinGain);
    pinGain.connect(out);
    pinOsc.start(now + 0.004);
    pinOsc.stop(now + 0.036);
  } else {
    // Sanwa OBSF-30 convex arcade button snap + spring rebound
    triggerNoiseBurst(ctx, out, {
      time: now,
      duration: 0.014,
      filterType: 'bandpass',
      freq: 1900,
      q: 3.2,
      gain: 0.06
    });

    // Plunger strike + microswitch spring ring
    const snapOsc = ctx.createOscillator();
    const snapGain = ctx.createGain();
    snapOsc.type = 'square';
    snapOsc.frequency.setValueAtTime(660, now);
    snapOsc.frequency.exponentialRampToValueAtTime(185, now + 0.034);
    snapGain.gain.setValueAtTime(0.034, now);
    snapGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.038);
    snapOsc.connect(snapGain);
    snapGain.connect(out);
    snapOsc.start(now);
    snapOsc.stop(now + 0.042);

    // Secondary arcade chirp harmonic
    const bleep = ctx.createOscillator();
    const bleepGain = ctx.createGain();
    bleep.type = 'sawtooth';
    bleep.frequency.setValueAtTime(880, now + 0.016);
    bleep.frequency.setValueAtTime(1320, now + 0.032);
    bleepGain.gain.setValueAtTime(0.022, now + 0.016);
    bleepGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);
    bleep.connect(bleepGain);
    bleepGain.connect(out);
    bleep.start(now + 0.016);
    bleep.stop(now + 0.065);
  }
}

/**
 * Crossing the split seam between Hub <-> Left Hardware Lab <-> Right Shibuya Arcade
 */
export function playWorldTransition(targetMode = 'hub') {
  const ctx = getCtx();
  if (!ctx) return;

  const now = ctx.currentTime;

  if (targetMode === 'tools') {
    const out = createStereoOut(ctx, -0.22);
    // Pneumatic drafting rail slide + mechanical relay latch
    triggerNoiseBurst(ctx, out, {
      time: now,
      duration: 0.14,
      filterType: 'bandpass',
      freq: 1200,
      q: 1.8,
      gain: 0.042
    });

    [440, 659.25].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      const t0 = now + 0.03 + idx * 0.045;
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t0);
      g.gain.setValueAtTime(0.042, t0);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.13);
      osc.connect(g);
      g.connect(out);
      osc.start(t0);
      osc.stop(t0 + 0.14);
    });
  } else if (targetMode === 'games') {
    const out = createStereoOut(ctx, 0.22);
    // Neon transformer power-up sweep + 80s synth arpeggio spark
    const sweep = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const g = ctx.createGain();
    sweep.type = 'sawtooth';
    sweep.frequency.setValueAtTime(110, now);
    sweep.frequency.exponentialRampToValueAtTime(440, now + 0.16);
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, now);
    filter.frequency.exponentialRampToValueAtTime(3600, now + 0.16);
    g.gain.setValueAtTime(0.032, now);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.19);
    sweep.connect(filter);
    filter.connect(g);
    g.connect(out);
    sweep.start(now);
    sweep.stop(now + 0.2);

    [587.33, 880, 1174.66].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const eg = ctx.createGain();
      const t0 = now + 0.035 + idx * 0.035;
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, t0);
      eg.gain.setValueAtTime(0.022, t0);
      eg.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.11);
      osc.connect(eg);
      eg.connect(out);
      osc.start(t0);
      osc.stop(t0 + 0.12);
    });
  } else {
    // Center Split Hub — balanced dual-detent lock
    const out = createStereoOut(ctx, 0);
    triggerNoiseBurst(ctx, out, {
      time: now,
      duration: 0.025,
      filterType: 'bandpass',
      freq: 1800,
      q: 2.2,
      gain: 0.04
    });
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, now);
    osc.frequency.exponentialRampToValueAtTime(392.0, now + 0.09);
    g.gain.setValueAtTime(0.038, now);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);
    osc.connect(g);
    g.connect(out);
    osc.start(now);
    osc.stop(now + 0.11);
  }
}

/**
 * Stage Boot Sound — Leica/Hardware Shutter + Calibration Chord (Left)
 * vs. Iron Coin Mech Drop + YM2151 1UP Chime + CRT Degauss Thump (Right)
 */
export function playLaunchSound(mode = 'game') {
  const ctx = getCtx();
  if (!ctx) return;

  const now = ctx.currentTime;

  if (mode === 'game') {
    const out = createStereoOut(ctx, 0.06);

    // 1. CRT Degauss magnetic low thump
    const thump = ctx.createOscillator();
    const thumpGain = ctx.createGain();
    thump.type = 'sine';
    thump.frequency.setValueAtTime(92, now);
    thump.frequency.exponentialRampToValueAtTime(38, now + 0.18);
    thumpGain.gain.setValueAtTime(0.09, now);
    thumpGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);
    thump.connect(thumpGain);
    thumpGain.connect(out);
    thump.start(now);
    thump.stop(now + 0.21);

    // 2. Metallic Yen/Quarter Coin Chute Clink (inharmonic bell partials)
    [2780, 4190].forEach((freq, i) => {
      const bell = ctx.createOscillator();
      const bg = ctx.createGain();
      const t0 = now + i * 0.022;
      bell.type = 'sine';
      bell.frequency.setValueAtTime(freq, t0);
      bg.gain.setValueAtTime(0.042, t0);
      bg.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.09);
      bell.connect(bg);
      bg.connect(out);
      bell.start(t0);
      bell.stop(t0 + 0.095);
    });

    // 3. Classic 1986 1UP Arcade Arpeggio (B5 -> E6 -> G#6 -> B6)
    [987.77, 1318.51, 1661.22, 1975.53].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();
      const t0 = now + 0.055 + idx * 0.048;
      const dur = idx === 3 ? 0.28 : 0.11;

      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, t0);
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(4800, t0);

      gain.gain.setValueAtTime(0.036, t0);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(out);
      osc.start(t0);
      osc.stop(t0 + dur + 0.01);
    });
  } else {
    const out = createStereoOut(ctx, -0.06);

    // 1. Precision dual-curtain mechanical shutter / bench clamp
    triggerNoiseBurst(ctx, out, {
      time: now,
      duration: 0.02,
      filterType: 'bandpass',
      freq: 2900,
      q: 2.4,
      gain: 0.07
    });
    triggerNoiseBurst(ctx, out, {
      time: now + 0.036,
      duration: 0.022,
      filterType: 'bandpass',
      freq: 2100,
      q: 2.6,
      gain: 0.065
    });

    // 2. Teenage Engineering OP-1 warm calibration triad (C5 -> G5 -> D6)
    [523.25, 783.99, 1174.66].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();
      const t0 = now + 0.05 + idx * 0.038;
      const dur = idx === 2 ? 0.24 : 0.15;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t0);
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2800, t0);

      gain.gain.setValueAtTime(0.052, t0);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(out);
      osc.start(t0);
      osc.stop(t0 + dur + 0.01);
    });
  }
}

/**
 * Closing the stage — Mechanical Unlatch (Left) vs. CRT Beam Collapse (Right)
 */
export function playStageClose(mode = 'game') {
  const ctx = getCtx();
  if (!ctx) return;
  const now = ctx.currentTime;

  if (mode === 'game') {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(780, now);
    osc.frequency.exponentialRampToValueAtTime(52, now + 0.14);
    g.gain.setValueAtTime(0.032, now);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);
    osc.connect(g);
    g.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.16);
  } else {
    triggerNoiseBurst(ctx, ctx.destination, {
      time: now,
      duration: 0.018,
      filterType: 'bandpass',
      freq: 1950,
      q: 2.5,
      gain: 0.055
    });
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(620, now);
    osc.frequency.exponentialRampToValueAtTime(220, now + 0.055);
    g.gain.setValueAtTime(0.04, now);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);
    osc.connect(g);
    g.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.065);
  }
}
