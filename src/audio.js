/**
 * Dual-World Procedural WebAudio Synthesizer (0 KB assets, $0 API cost)
 * -----------------------------------------------------------------------------
 * LEFT WORLD ("tool" — Editorial Print & Photography Design Atelier):
 *   - Archival heavy-stock paper whisper-flicks on hover
 *   - Tactile Leica leaf-shutter / letterpress impression clicks on step/select
 *   - Broadsheet folio turn + warm sunlit studio chord on world entry & launch
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
  const duration = 0.28;
  const length = Math.floor(ctx.sampleRate * duration);
  const buf = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buf.getChannelData(0);
  let b0 = 0;
  let b1 = 0;
  let b2 = 0;
  for (let i = 0; i < length; i++) {
    const white = Math.random() * 2 - 1;
    b0 = 0.99765 * b0 + white * 0.099046;
    b1 = 0.963 * b1 + white * 0.2965164;
    b2 = 0.57 * b2 + white * 1.0526913;
    const pink = (b0 + b1 + b2 + white * 0.1848) * 0.18;
    data[i] = white * 0.52 + pink * 0.48;
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

function triggerNoiseBurst(
  ctx,
  dest,
  { time, duration, attack = 0.002, filterType = 'bandpass', freq = 2000, freqEnd = null, q = 2.0, gain = 0.04 }
) {
  const src = ctx.createBufferSource();
  src.buffer = getNoiseBuffer(ctx);

  const filter = ctx.createBiquadFilter();
  filter.type = filterType;
  filter.frequency.setValueAtTime(freq, time);
  if (freqEnd) {
    filter.frequency.exponentialRampToValueAtTime(freqEnd, time + duration);
  }
  filter.Q.setValueAtTime(q, time);

  const env = ctx.createGain();
  env.gain.setValueAtTime(0.0001, time);
  env.gain.linearRampToValueAtTime(Math.max(0.0002, gain), time + attack);
  env.gain.exponentialRampToValueAtTime(0.0001, time + duration);

  src.connect(filter);
  filter.connect(env);
  env.connect(dest);

  src.start(time);
  src.stop(time + duration + 0.008);
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
 * Subtle tactile hover — Archival Cardstock Whisper-Flick (Left) vs. Arcade Microswitch Blip (Right)
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
    // Crisp cotton-rag cardstock corner brush
    triggerNoiseBurst(ctx, out, {
      time: now,
      attack: 0.004,
      duration: 0.028,
      filterType: 'bandpass',
      freq: 2600,
      freqEnd: 4200,
      q: 1.1,
      gain: 0.026
    });

    // Subtle wooden gallery frame / nib tap
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(680, now);
    osc.frequency.exponentialRampToValueAtTime(260, now + 0.018);
    gain.gain.setValueAtTime(0.016, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.02);
    osc.connect(gain);
    gain.connect(out);
    osc.start(now);
    osc.stop(now + 0.024);
  } else {
    // Arcade microswitch feather tick + CRT phosphor blip (Unchanged)
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
 * Primary selection / step — Leica Rangefinder & Archival Stamp (Left) vs. Sanwa Arcade Button (Right)
 */
export function playMicroClick(kind = 'tool', pan = null) {
  const ctx = getCtx();
  if (!ctx) return;

  const now = ctx.currentTime;
  const stereoPan = pan !== null ? pan : kind === 'tool' ? -0.1 : 0.1;
  const out = createStereoOut(ctx, stereoPan);

  if (kind === 'tool') {
    // 1. Heavy archival folio page slide + crisp letterpress impression
    triggerNoiseBurst(ctx, out, {
      time: now,
      attack: 0.003,
      duration: 0.048,
      filterType: 'bandpass',
      freq: 1750,
      freqEnd: 2900,
      q: 1.35,
      gain: 0.055
    });

    // 2. Delicate Leica leaf-shutter double click
    triggerNoiseBurst(ctx, out, {
      time: now + 0.011,
      attack: 0.001,
      duration: 0.012,
      filterType: 'highpass',
      freq: 3200,
      q: 1.8,
      gain: 0.036
    });

    // 3. Warm wooden drafting-table dampened settle
    const bodyOsc = ctx.createOscillator();
    const bodyGain = ctx.createGain();
    bodyOsc.type = 'sine';
    bodyOsc.frequency.setValueAtTime(168, now);
    bodyOsc.frequency.exponentialRampToValueAtTime(54, now + 0.045);
    bodyGain.gain.setValueAtTime(0.068, now);
    bodyGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
    bodyOsc.connect(bodyGain);
    bodyGain.connect(out);
    bodyOsc.start(now);
    bodyOsc.stop(now + 0.054);
  } else {
    // Sanwa OBSF-30 convex arcade button snap + spring rebound (Unchanged)
    triggerNoiseBurst(ctx, out, {
      time: now,
      duration: 0.014,
      filterType: 'bandpass',
      freq: 1900,
      q: 3.2,
      gain: 0.06
    });

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
 * Crossing the split seam between Hub <-> Left Editorial Studio <-> Right Shibuya Arcade
 */
export function playWorldTransition(targetMode = 'hub') {
  const ctx = getCtx();
  if (!ctx) return;

  const now = ctx.currentTime;

  if (targetMode === 'tools') {
    const out = createStereoOut(ctx, -0.22);
    // Broadsheet folio page turn + warm sunlit gallery fifth (F4 -> C5)
    triggerNoiseBurst(ctx, out, {
      time: now,
      attack: 0.018,
      duration: 0.16,
      filterType: 'bandpass',
      freq: 950,
      freqEnd: 2400,
      q: 1.0,
      gain: 0.048
    });

    [349.23, 523.25].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      const t0 = now + 0.025 + idx * 0.055;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t0);
      g.gain.setValueAtTime(0.045, t0);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.24);
      osc.connect(g);
      g.connect(out);
      osc.start(t0);
      osc.stop(t0 + 0.26);
    });
  } else if (targetMode === 'games') {
    const out = createStereoOut(ctx, 0.22);
    // Neon transformer power-up sweep + 80s synth arpeggio spark (Unchanged)
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
    const out = createStereoOut(ctx, 0);
    triggerNoiseBurst(ctx, out, {
      time: now,
      duration: 0.03,
      filterType: 'bandpass',
      freq: 1600,
      q: 1.8,
      gain: 0.036
    });
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, now);
    osc.frequency.exponentialRampToValueAtTime(392.0, now + 0.1);
    g.gain.setValueAtTime(0.036, now);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.11);
    osc.connect(g);
    g.connect(out);
    osc.start(now);
    osc.stop(now + 0.12);
  }
}

/**
 * Stage Boot — Hasselblad Studio Shutter + Warm Maj7 Chord (Left)
 * vs. Iron Coin Mech Drop + YM2151 1UP Chime + CRT Degauss Thump (Right)
 */
export function playLaunchSound(mode = 'game') {
  const ctx = getCtx();
  if (!ctx) return;

  const now = ctx.currentTime;

  if (mode === 'game') {
    const out = createStereoOut(ctx, 0.06);

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

    // 1. Crisp medium-format camera mirror & leaf shutter
    triggerNoiseBurst(ctx, out, {
      time: now,
      attack: 0.002,
      duration: 0.024,
      filterType: 'bandpass',
      freq: 2400,
      q: 2.0,
      gain: 0.058
    });
    triggerNoiseBurst(ctx, out, {
      time: now + 0.042,
      attack: 0.002,
      duration: 0.032,
      filterType: 'bandpass',
      freq: 1650,
      q: 1.6,
      gain: 0.052
    });

    // 2. Warm gallery Rhodes / tuning-fork Fmaj7 chord (F4 -> A4 -> C5 -> E5)
    [349.23, 440.0, 523.25, 659.25].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const t0 = now + 0.045 + idx * 0.032;
      const dur = idx === 3 ? 0.34 : 0.22;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t0);
      gain.gain.setValueAtTime(0.036, t0);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);

      osc.connect(gain);
      gain.connect(out);
      osc.start(t0);
      osc.stop(t0 + dur + 0.01);
    });
  }
}

/**
 * Closing the stage — Soft Linen Folio Close (Left) vs. CRT Beam Collapse (Right)
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
      attack: 0.005,
      duration: 0.065,
      filterType: 'lowpass',
      freq: 1400,
      q: 0.9,
      gain: 0.045
    });
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(210, now);
    osc.frequency.exponentialRampToValueAtTime(78, now + 0.065);
    g.gain.setValueAtTime(0.042, now);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);
    osc.connect(g);
    g.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.075);
  }
}
