/**
 * Dual-World Procedural WebAudio Synthesizer (0 KB assets, $0 API cost)
 * -----------------------------------------------------------------------------
 * LEFT WORLD ("tool" — Editorial Print & Photography Design Atelier):
 *   - Archival heavy-stock paper whisper-flicks on hover
 *   - Tactile Leica leaf-shutter / letterpress impression clicks on step/select
 *   - Broadsheet folio turn + warm sunlit studio chord on world entry & launch
 *
 * RIGHT WORLD ("arcade" / "game" — Garage Game Room & Physical Consoles):
 *   - Light ABS plastic D-pad / thumbstick micro-ticks on hover
 *   - Crisp plastic cartridge latch snaps & controller face-button clicks on select/step
 *   - Garage pull-switch click + warm TV hum + upbeat console boot chime on room entry
 *   - Tactile cartridge/disc slot clunk + warm nostalgic console startup chord on launch
 *   - Soft mechanical rocker power-switch click off on stage exit
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
 * Subtle tactile hover — Archival Cardstock Whisper-Flick (Left) vs. D-Pad / Thumbstick Micro-Tick (Right)
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
    // Light ABS plastic D-pad / analog thumbstick micro-tick
    triggerNoiseBurst(ctx, out, {
      time: now,
      attack: 0.001,
      duration: 0.014,
      filterType: 'bandpass',
      freq: 3000,
      freqEnd: 1850,
      q: 2.6,
      gain: 0.024
    });

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(860, now);
    osc.frequency.exponentialRampToValueAtTime(380, now + 0.017);
    gain.gain.setValueAtTime(0.016, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.02);
    osc.connect(gain);
    gain.connect(out);
    osc.start(now);
    osc.stop(now + 0.024);
  }
}

/**
 * Primary selection / step — Leica Rangefinder & Archival Stamp (Left) vs. Cartridge / Controller Button Click (Right)
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
    // Crisp molded plastic cartridge snap / controller face-button click
    triggerNoiseBurst(ctx, out, {
      time: now,
      attack: 0.001,
      duration: 0.016,
      filterType: 'bandpass',
      freq: 2250,
      q: 2.4,
      gain: 0.052
    });

    // Secondary tactile detent rebound click
    triggerNoiseBurst(ctx, out, {
      time: now + 0.019,
      attack: 0.001,
      duration: 0.012,
      filterType: 'highpass',
      freq: 2800,
      q: 1.9,
      gain: 0.034
    });

    // Molded ABS plastic shell thock
    const shellOsc = ctx.createOscillator();
    const shellGain = ctx.createGain();
    shellOsc.type = 'triangle';
    shellOsc.frequency.setValueAtTime(320, now);
    shellOsc.frequency.exponentialRampToValueAtTime(112, now + 0.034);
    shellGain.gain.setValueAtTime(0.048, now);
    shellGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.038);
    shellOsc.connect(shellGain);
    shellGain.connect(out);
    shellOsc.start(now);
    shellOsc.stop(now + 0.042);

    const latchOsc = ctx.createOscillator();
    const latchGain = ctx.createGain();
    latchOsc.type = 'sine';
    latchOsc.frequency.setValueAtTime(640, now + 0.018);
    latchOsc.frequency.exponentialRampToValueAtTime(270, now + 0.04);
    latchGain.gain.setValueAtTime(0.024, now + 0.018);
    latchGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.044);
    latchOsc.connect(latchGain);
    latchGain.connect(out);
    latchOsc.start(now + 0.018);
    latchOsc.stop(now + 0.048);
  }
}

/**
 * Crossing the split seam between Hub <-> Left Editorial Studio <-> Right Garage Game Room
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
    // 1. Garage shop-light pull-switch mechanical click
    triggerNoiseBurst(ctx, out, {
      time: now,
      attack: 0.001,
      duration: 0.018,
      filterType: 'bandpass',
      freq: 2500,
      q: 2.2,
      gain: 0.048
    });
    triggerNoiseBurst(ctx, out, {
      time: now + 0.028,
      attack: 0.001,
      duration: 0.014,
      filterType: 'bandpass',
      freq: 1750,
      q: 2.0,
      gain: 0.036
    });

    // 2. Warm low-frequency garage power-strip hum bloom
    [60, 120].forEach((humFreq, i) => {
      const hum = ctx.createOscillator();
      const hg = ctx.createGain();
      hum.type = 'sine';
      hum.frequency.setValueAtTime(humFreq, now + 0.02);
      hg.gain.setValueAtTime(0.0001, now + 0.02);
      hg.gain.linearRampToValueAtTime(i === 0 ? 0.028 : 0.012, now + 0.075);
      hg.gain.exponentialRampToValueAtTime(0.0001, now + 0.34);
      hum.connect(hg);
      hg.connect(out);
      hum.start(now + 0.02);
      hum.stop(now + 0.36);
    });

    // 3. Upbeat nostalgic console boot chime (D5 -> A5 -> E6)
    [587.33, 880.0, 1318.51].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const eg = ctx.createGain();
      const t0 = now + 0.05 + idx * 0.052;
      const dur = idx === 2 ? 0.26 : 0.14;
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t0);
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(3400, t0);
      eg.gain.setValueAtTime(0.036, t0);
      eg.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
      osc.connect(filter);
      filter.connect(eg);
      eg.connect(out);
      osc.start(t0);
      osc.stop(t0 + dur + 0.01);
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
 * vs. Tactile Cartridge/Disc Slot Load Clunk + Warm Console Startup Chord (Right)
 */
export function playLaunchSound(mode = 'game') {
  const ctx = getCtx();
  if (!ctx) return;

  const now = ctx.currentTime;

  if (mode === 'game') {
    const out = createStereoOut(ctx, 0.06);

    // 1. Physical cartridge / disc tray slide & seating clunk
    triggerNoiseBurst(ctx, out, {
      time: now,
      attack: 0.003,
      duration: 0.044,
      filterType: 'bandpass',
      freq: 1150,
      freqEnd: 1850,
      q: 1.5,
      gain: 0.052
    });

    const clunk = ctx.createOscillator();
    const clunkGain = ctx.createGain();
    clunk.type = 'sine';
    clunk.frequency.setValueAtTime(142, now + 0.012);
    clunk.frequency.exponentialRampToValueAtTime(46, now + 0.095);
    clunkGain.gain.setValueAtTime(0.088, now + 0.012);
    clunkGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.11);
    clunk.connect(clunkGain);
    clunkGain.connect(out);
    clunk.start(now + 0.012);
    clunk.stop(now + 0.115);

    // Positive mechanical slot lock click
    triggerNoiseBurst(ctx, out, {
      time: now + 0.052,
      attack: 0.001,
      duration: 0.016,
      filterType: 'bandpass',
      freq: 2650,
      q: 2.3,
      gain: 0.048
    });

    // 2. Warm nostalgic polyphonic console startup chord (Cmaj9: C4, G4, B4, D5, G5)
    [261.63, 392.0, 493.88, 587.33, 783.99].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const shimmer = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();
      const t0 = now + 0.088 + idx * 0.032;
      const dur = idx >= 3 ? 0.38 : 0.28;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t0);
      shimmer.type = 'sine';
      shimmer.frequency.setValueAtTime(freq * 2, t0);

      const shimmerGain = ctx.createGain();
      shimmerGain.gain.setValueAtTime(0.28, t0);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(3600, t0);

      gain.gain.setValueAtTime(0.0001, t0);
      gain.gain.linearRampToValueAtTime(0.032, t0 + 0.016);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);

      osc.connect(filter);
      shimmer.connect(shimmerGain);
      shimmerGain.connect(filter);
      filter.connect(gain);
      gain.connect(out);
      osc.start(t0);
      shimmer.start(t0);
      osc.stop(t0 + dur + 0.01);
      shimmer.stop(t0 + dur + 0.01);
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
 * Closing the stage — Soft Linen Folio Close (Left) vs. Soft Console Power-Switch Click Off (Right)
 */
export function playStageClose(mode = 'game') {
  const ctx = getCtx();
  if (!ctx) return;
  const now = ctx.currentTime;

  if (mode === 'game') {
    triggerNoiseBurst(ctx, ctx.destination, {
      time: now,
      attack: 0.001,
      duration: 0.016,
      filterType: 'bandpass',
      freq: 2050,
      q: 2.2,
      gain: 0.042
    });
    triggerNoiseBurst(ctx, ctx.destination, {
      time: now + 0.024,
      attack: 0.001,
      duration: 0.012,
      filterType: 'lowpass',
      freq: 1450,
      q: 1.4,
      gain: 0.028
    });
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(235, now);
    osc.frequency.exponentialRampToValueAtTime(68, now + 0.068);
    g.gain.setValueAtTime(0.038, now);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.075);
    osc.connect(g);
    g.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.08);
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
