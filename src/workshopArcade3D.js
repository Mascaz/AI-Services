import * as THREE from 'three';

/**
 * Dual-Identity 3D Scene:
 *   LEFT  (x < 0) = Sunlit Design & Maker's Workshop (7 Bespoke 3D Workbench Rigs & Output Proofs)
 *   RIGHT (x > 0) = Cozy Tactile Garage Game Room (7 Distinct Setups: Mobile, Handhelds, Cab, PC & Consoles)
 *   SEAM  (x = 0) = Architectural Threshold Between Sunlit Workshop & Garage Game Room
 */

const ED_PAPER = '#faf6ee';
const ED_WALL = '#f2ece1';
const ED_INK = '#151413';
const ED_VERMILION = '#c83e2b';
const ED_BRASS = '#b08d57';

const GAR_SHELL = '#181a20';
const GAR_PANEL = '#232732';
const GAR_AMBER = '#f59e0b';
const GAR_AMBER_BRIGHT = '#fbbf24';
const GAR_WARM_BULB = '#ffdfa8';
const GAR_LED_GREEN = '#10b981';

function createEditorialSignTexture(title, subtitle) {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  // Warm archival cotton-rag & brass-pinned workshop masthead plaque
  ctx.fillStyle = ED_PAPER;
  ctx.fillRect(0, 0, 1024, 256);

  // Outer sumi-ink architectural frame + brushed-brass inner rule
  ctx.strokeStyle = ED_INK;
  ctx.lineWidth = 10;
  ctx.strokeRect(5, 5, 1014, 246);

  ctx.strokeStyle = ED_BRASS;
  ctx.lineWidth = 3;
  ctx.strokeRect(20, 20, 984, 216);

  ctx.strokeStyle = ED_INK;
  ctx.lineWidth = 1.5;
  ctx.strokeRect(28, 28, 968, 200);

  // 4 Machined brass corner pins
  [
    [40, 40],
    [984, 40],
    [40, 216],
    [984, 216]
  ].forEach(([px, py]) => {
    ctx.fillStyle = ED_BRASS;
    ctx.beginPath();
    ctx.arc(px, py, 6.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = ED_INK;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  });

  // Top editorial colophon rule
  ctx.strokeStyle = ED_INK;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(54, 68);
  ctx.lineTo(970, 68);
  ctx.stroke();

  ctx.fillStyle = ED_INK;
  ctx.font = '700 16px "Space Mono", ui-monospace, monospace';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('§ BENCH 01–07 — SUNLIT MAKER’S STUDIO', 58, 49);

  // Top-right vermilion workshop live stamp
  ctx.fillStyle = ED_VERMILION;
  ctx.fillRect(790, 35, 176, 26);
  ctx.fillStyle = '#ffffff';
  ctx.font = '700 14px "Space Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('WORKSHOP LIVE', 878, 49);

  // Main expressive editorial serif masthead
  const fontSize = title.length > 22 ? 44 : title.length > 16 ? 50 : title.length > 12 ? 58 : 70;
  ctx.font = `700 ${fontSize}px "Fraunces", Georgia, serif`;
  ctx.fillStyle = ED_INK;
  ctx.textAlign = 'center';
  ctx.fillText(title.toUpperCase(), 512, 126, 896);

  // Bottom colophon rule + caption
  ctx.strokeStyle = ED_INK;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(104, 178);
  ctx.lineTo(920, 178);
  ctx.stroke();

  ctx.fillStyle = ED_VERMILION;
  ctx.font = '700 18px "Space Mono", ui-monospace, monospace';
  ctx.fillText(subtitle.toUpperCase(), 512, 203, 880);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

function createGarageSignTexture(title, subtitle) {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  // Brushed dark-slate metal plaque with warm shop-light gradient
  const bg = ctx.createLinearGradient(0, 0, 1024, 256);
  bg.addColorStop(0, '#171a22');
  bg.addColorStop(0.5, '#242936');
  bg.addColorStop(1, '#151820');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 1024, 256);

  // Subtle horizontal brushed-aluminum grain
  ctx.fillStyle = 'rgba(255, 255, 255, 0.025)';
  for (let y = 0; y < 256; y += 6) {
    ctx.fillRect(0, y, 1024, 2);
  }

  // Outer industrial steel bezel + warm tungsten inner trim
  ctx.strokeStyle = '#475066';
  ctx.lineWidth = 10;
  ctx.strokeRect(8, 8, 1008, 240);

  ctx.strokeStyle = GAR_AMBER;
  ctx.lineWidth = 4;
  ctx.strokeRect(22, 22, 980, 212);

  // Corner hex bolts
  [
    [38, 38],
    [986, 38],
    [38, 218],
    [986, 218]
  ].forEach(([bx, by]) => {
    ctx.fillStyle = '#64748b';
    ctx.beginPath();
    ctx.arc(bx, by, 7, 0, Math.PI * 2);
    ctx.fill();
  });

  // Top hardware header strip
  ctx.fillStyle = GAR_LED_GREEN;
  ctx.beginPath();
  ctx.arc(62, 54, 7, 0, Math.PI * 2);
  ctx.fill();

  ctx.font = '700 18px "Chakra Petch", "Space Mono", monospace';
  ctx.fillStyle = GAR_AMBER_BRIGHT;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('POWER ON • 07 PLAYABLE SETUPS', 80, 54);

  ctx.fillStyle = '#cbd5e1';
  ctx.textAlign = 'right';
  ctx.fillText('CARTS • DISCS • RIGS', 964, 54);

  // Main Garage Game Room plaque title
  const fontSize = title.length > 14 ? 56 : title.length > 10 ? 64 : 74;
  ctx.font = `700 ${fontSize}px "Space Grotesk", "Syne", system-ui, sans-serif`;
  ctx.textAlign = 'center';
  ctx.shadowColor = 'rgba(245, 158, 11, 0.42)';
  ctx.shadowBlur = 18;
  ctx.fillStyle = '#ffffff';
  ctx.fillText(title.toUpperCase(), 512, 126);
  ctx.shadowBlur = 0;

  // Bottom warm amber callout bar
  ctx.fillStyle = 'rgba(245, 158, 11, 0.14)';
  ctx.fillRect(96, 174, 832, 38);
  ctx.strokeStyle = 'rgba(251, 191, 36, 0.5)';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(96, 174, 832, 38);

  ctx.font = '700 19px "Chakra Petch", "Space Mono", monospace';
  ctx.fillStyle = GAR_AMBER_BRIGHT;
  ctx.fillText(subtitle.toUpperCase(), 512, 194);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

/**
 * Generates crisp sunlit editorial screen textures for all 7 Left Workshop Displays
 * ('drafting-split' for Bench 01 widescreen proof press, 'portrait' for Bench 05 9:16 monitor, or 'landscape')
 */
function createToolScreenTexture(tool, aspectMode = 'landscape', benchIdx = 0) {
  const canvas = document.createElement('canvas');
  if (aspectMode === 'portrait') {
    canvas.width = 384;
    canvas.height = 640;
  } else if (aspectMode === 'drafting-split') {
    canvas.width = 560;
    canvas.height = 384;
  } else {
    canvas.width = 512;
    canvas.height = 384;
  }
  const ctx = canvas.getContext('2d');
  let loadedImg = null;

  function draw() {
    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const benchTag = `BENCH 0${benchIdx + 1}`;

    // Sunlit cotton-rag ivory display paper stock
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#fdfbf7');
    bg.addColorStop(1, '#efe7d8');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // Subtle architectural pica grid in background
    ctx.strokeStyle = 'rgba(21, 20, 19, 0.065)';
    ctx.lineWidth = 1;
    for (let x = 28; x < W - 16; x += 32) {
      ctx.beginPath();
      ctx.moveTo(x, 48);
      ctx.lineTo(x, H - 18);
      ctx.stroke();
    }
    for (let y = 64; y < H - 18; y += 32) {
      ctx.beginPath();
      ctx.moveTo(16, y);
      ctx.lineTo(W - 16, y);
      ctx.stroke();
    }

    // Top sumi-ink editorial colophon telemetry strip
    ctx.fillStyle = ED_INK;
    ctx.fillRect(12, 12, W - 24, 34);
    ctx.fillStyle = ED_PAPER;
    ctx.font = '700 13.5px "Space Mono", ui-monospace, monospace';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    const modeLabel =
      aspectMode === 'portrait'
        ? `${benchTag} • 9:16 MASTER`
        : aspectMode === 'drafting-split'
          ? `${benchTag} • SPLIT PROOF`
          : `${benchTag} • STUDIO LIVE`;
    ctx.fillText(modeLabel, 22, 29);

    // Vermilion badge stamp on top-right
    const badgeStr = tool.badge.toUpperCase();
    const badgeW = Math.min(182, Math.max(116, badgeStr.length * 9.5 + 20));
    ctx.fillStyle = ED_VERMILION;
    ctx.fillRect(W - 16 - badgeW, 15, badgeW, 28);
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 12.5px "Space Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(badgeStr, W - 16 - badgeW / 2, 29, badgeW - 10);

    if (aspectMode === 'drafting-split') {
      // =====================================================================
      // BENCH 01 SPECIAL: Unobstructed Upper Identity + Lower Before/After Split Band
      // (Physical 3D brass divider bar glides over y = 204..322 without blocking icon/title!)
      // =====================================================================
      const iconSize = 118;
      const ix = 42;
      const iy = 62;

      ctx.save();
      ctx.fillStyle = ED_INK;
      ctx.fillRect(ix - 5, iy - 5, iconSize + 10, iconSize + 10);
      ctx.strokeStyle = ED_BRASS;
      ctx.lineWidth = 3;
      ctx.strokeRect(ix - 8, iy - 8, iconSize + 16, iconSize + 16);
      if (loadedImg) {
        ctx.drawImage(loadedImg, ix, iy, iconSize, iconSize);
      } else {
        ctx.fillStyle = tool.accent;
        ctx.fillRect(ix, iy, iconSize, iconSize);
      }
      ctx.restore();

      ctx.textAlign = 'left';
      ctx.fillStyle = ED_INK;
      ctx.font = '700 33px "Fraunces", Georgia, serif';
      ctx.fillText(tool.shortName, 184, 98, W - 206);

      ctx.fillStyle = ED_VERMILION;
      ctx.font = '700 13.5px "Space Mono", monospace';
      ctx.fillText('BEFORE ↔ AFTER STOREFRONT ENGINE', 184, 132, W - 206);

      // Vermilion CTA button in upper-right clear zone
      ctx.fillStyle = ED_VERMILION;
      ctx.fillRect(184, 150, 336, 36);
      ctx.strokeStyle = ED_INK;
      ctx.lineWidth = 2;
      ctx.strokeRect(184, 150, 336, 36);
      ctx.fillStyle = '#ffffff';
      ctx.font = '700 14.5px "Space Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('▶ COMPARE LIVE BEFORE & AFTER', 352, 169);

      // Dedicated Lower Split-Proof Comparison Band (y = 202..362)
      const bandY = 202;
      const bandH = 160;
      const halfW = (W - 40) / 2;

      // Left Half: Wireframe Generic Template ("BEFORE")
      ctx.fillStyle = '#ded8cc';
      ctx.fillRect(20, bandY, halfW, bandH);
      ctx.fillStyle = '#787166';
      ctx.fillRect(32, bandY + 12, halfW - 28, 22);
      ctx.fillStyle = '#ffffff';
      ctx.font = '700 12px "Space Mono", monospace';
      ctx.textAlign = 'left';
      ctx.fillText('BEFORE // GENERIC THEME', 40, bandY + 23);
      ctx.strokeStyle = '#8b8478';
      ctx.lineWidth = 2;
      ctx.strokeRect(32, bandY + 44, 102, 76);
      ctx.strokeRect(144, bandY + 44, 102, 76);
      ctx.fillStyle = '#6c665c';
      ctx.fillRect(32, bandY + 130, 168, 12);

      // Right Half: Luxury Editorial Storefront ("AFTER // RELAIS PALAIS")
      ctx.fillStyle = ED_INK;
      ctx.fillRect(20 + halfW, bandY, halfW, bandH);
      ctx.fillStyle = ED_BRASS;
      ctx.fillRect(32 + halfW, bandY + 12, halfW - 24, 22);
      ctx.fillStyle = ED_INK;
      ctx.font = '700 12px "Space Mono", monospace';
      ctx.fillText('AFTER // BESPOKE FLAGSHIP', 40 + halfW, bandY + 23);

      ctx.fillStyle = ED_PAPER;
      ctx.font = 'italic 700 28px "Fraunces", Georgia, serif';
      ctx.textAlign = 'center';
      ctx.fillText('Relais Palais', 20 + halfW + halfW / 2, bandY + 78);
      ctx.fillStyle = ED_VERMILION;
      ctx.fillRect(20 + halfW + halfW / 2 - 74, bandY + 106, 148, 30);
      ctx.fillStyle = '#ffffff';
      ctx.font = '700 12px "Space Mono", monospace';
      ctx.fillText('HIGH-TRUST UX →', 20 + halfW + halfW / 2, bandY + 121);

      ctx.strokeStyle = ED_INK;
      ctx.lineWidth = 2.5;
      ctx.strokeRect(20, bandY, W - 40, bandH);

      // Center vermilion datum line
      ctx.strokeStyle = ED_VERMILION;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(cx, bandY);
      ctx.lineTo(cx, bandY + bandH);
      ctx.stroke();
    } else {
      // =====================================================================
      // PORTRAIT (9:16) & LANDSCAPE STUDIO REFERENCE SCREENS (256x256 Icon Crisp Bake)
      // =====================================================================
      const iconSize = aspectMode === 'portrait' ? 196 : 148;
      const ix = Math.round((W - iconSize) / 2);
      const iy = aspectMode === 'portrait' ? 78 : 56;

      ctx.save();
      // Drop-offset sumi-ink editorial shadow block + brass trim around crisp icon
      ctx.fillStyle = ED_INK;
      ctx.fillRect(ix + 6, iy + 6, iconSize + 8, iconSize + 8);
      ctx.fillStyle = '#12151c';
      ctx.fillRect(ix - 4, iy - 4, iconSize + 8, iconSize + 8);
      ctx.strokeStyle = ED_BRASS;
      ctx.lineWidth = 3.5;
      ctx.strokeRect(ix - 4, iy - 4, iconSize + 8, iconSize + 8);

      if (loadedImg) {
        ctx.drawImage(loadedImg, ix, iy, iconSize, iconSize);
      } else {
        ctx.fillStyle = tool.accent;
        ctx.fillRect(ix, iy, iconSize, iconSize);
      }
      ctx.restore();

      // Expressive Fraunces serif title below icon
      const titleY = iy + iconSize + (aspectMode === 'portrait' ? 54 : 38);
      const titleFont =
        tool.shortName.length > 14
          ? aspectMode === 'portrait'
            ? 29
            : 27
          : aspectMode === 'portrait'
            ? 35
            : 31;
      ctx.fillStyle = ED_INK;
      ctx.font = `700 ${titleFont}px "Fraunces", Georgia, serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(tool.shortName, cx, titleY, W - 44);

      if (aspectMode === 'portrait') {
        // Subtle EN / ES neural voiceover waveform bars on 9:16 display
        const waveY = titleY + 58;
        for (let b = 0; b < 18; b++) {
          const bh = 12 + Math.abs(Math.sin(b * 0.78 + 1.2)) * 38;
          ctx.fillStyle = b % 3 === 0 ? ED_VERMILION : ED_INK;
          ctx.fillRect(cx - 108 + b * 12, waveY - bh / 2, 7, bh);
        }
        ctx.fillStyle = '#57524a';
        ctx.font = '700 13px "Space Mono", monospace';
        ctx.fillText('EN / ES VOICE + SYNCED CAPTIONS', cx, waveY + 38);
      } else {
        // Subtle station spec sub-caption
        ctx.fillStyle = '#57524a';
        ctx.font = '700 12.5px "Space Mono", monospace';
        ctx.fillText((tool.stationLabel || tool.physicalLabel || '').toUpperCase(), cx, titleY + 28, W - 48);
      }

      // Crisp Vermilion Letterpress Launch CTA Stamp at bottom
      const pillW = Math.min(W - 52, 344);
      const pillH = aspectMode === 'portrait' ? 54 : 44;
      const pillX = Math.round((W - pillW) / 2);
      const pillY = aspectMode === 'portrait' ? H - 92 : H - 64;

      ctx.fillStyle = ED_INK;
      ctx.fillRect(pillX + 4, pillY + 4, pillW, pillH);
      ctx.fillStyle = ED_VERMILION;
      ctx.fillRect(pillX, pillY, pillW, pillH);
      ctx.strokeStyle = ED_INK;
      ctx.lineWidth = 2.5;
      ctx.strokeRect(pillX, pillY, pillW, pillH);

      ctx.fillStyle = '#fcfaf5';
      ctx.font = '700 15.5px "Space Mono", monospace';
      const ctaLabel =
        aspectMode === 'portrait' ? '▶ WATCH LIVE PIPELINE' : '▶ LAUNCH WORKBENCH • LIVE';
      ctx.fillText(ctaLabel, cx, pillY + pillH / 2 + 1, pillW - 18);
    }

    // Outer double editorial border
    ctx.strokeStyle = ED_INK;
    ctx.lineWidth = 5;
    ctx.strokeRect(5, 5, W - 10, H - 10);
    ctx.strokeStyle = ED_BRASS;
    ctx.lineWidth = 1.5;
    ctx.strokeRect(10, 10, W - 20, H - 20);
  }

  draw();
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;

  const img = new Image();
  img.crossOrigin = 'anonymous';
  // Explicit 256x256 ensures viewBox-only SVGs rasterize razor-sharp on all browsers
  img.width = 256;
  img.height = 256;
  img.onload = () => {
    loadedImg = img;
    draw();
    tex.needsUpdate = true;
  };
  img.src = tool.iconUrl;

  tex.userData = {
    redraw() {
      draw();
      tex.needsUpdate = true;
    }
  };
  return tex;
}

/**
 * Generates bespoke printed cover artwork for each Workshop bench's physical 3D output artifact
 */
function createWorkshopOutputTexture(tool, artifactFormat = 'lookbook', benchIdx = 0) {
  const canvas = document.createElement('canvas');
  if (artifactFormat === 'reel-case') {
    canvas.width = 420;
    canvas.height = 420;
  } else if (artifactFormat === 'storyboard') {
    canvas.width = 512;
    canvas.height = 368;
  } else {
    canvas.width = 384;
    canvas.height = 512;
  }
  const ctx = canvas.getContext('2d');
  let loadedImg = null;

  const headers = {
    lookbook: 'FLAGSHIP LOOKBOOK • EDITION 01',
    'sku-dossier': 'EN / ES SKU SPEC + PRICE BAND',
    'portrait-proof': '3D RELIGHT STUDIO PROOF',
    storyboard: '3-BEAT COMMERCIAL STORYBOARD',
    'reel-case': '1080P BILINGUAL MASTER REEL',
    'roas-ledger': 'UNIT ECONOMICS & ROAS LEDGER',
    'polyglot-booklet': '15+ LANGUAGE TYPESETTING QA'
  };

  function draw() {
    const W = canvas.width;
    const H = canvas.height;

    // Warm museum rag stock base
    ctx.fillStyle = ED_PAPER;
    ctx.fillRect(0, 0, W, H);

    // Left bookcloth / archival spine accent band
    ctx.fillStyle = ED_INK;
    ctx.fillRect(0, 0, 34, H);
    ctx.fillStyle = ED_VERMILION;
    ctx.fillRect(34, 0, 7, H);

    // Top editorial header bar
    ctx.fillStyle = '#efe8da';
    ctx.fillRect(41, 0, W - 41, 52);
    ctx.strokeStyle = ED_INK;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(41, 52);
    ctx.lineTo(W, 52);
    ctx.stroke();

    ctx.fillStyle = ED_INK;
    ctx.font = '700 13.5px "Space Mono", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const contentCx = 41 + (W - 41) / 2;
    ctx.fillText(headers[artifactFormat] || 'STUDIO PROOF', contentCx, 27, W - 64);

    if (artifactFormat === 'storyboard') {
      // 3-Scene Cinema Contact Strip + Icon Badge
      ctx.fillStyle = ED_INK;
      ctx.fillRect(62, 74, W - 86, 152);
      ['ACT I', 'ACT II', 'ACT III'].forEach((act, i) => {
        const fw = (W - 122) / 3;
        const fx = 74 + i * (fw + 6);
        ctx.fillStyle = i === 1 ? ED_VERMILION : '#faf6ee';
        ctx.fillRect(fx, 92, fw, 116);
        ctx.fillStyle = i === 1 ? '#ffffff' : ED_INK;
        ctx.font = '700 18px "Fraunces", Georgia, serif';
        ctx.fillText(act, fx + fw / 2, 134);
      });
      if (loadedImg) {
        ctx.drawImage(loadedImg, Math.round(contentCx - 34), 140, 68, 68);
      }
      ctx.fillStyle = ED_INK;
      ctx.font = '700 26px "Fraunces", Georgia, serif';
      ctx.fillText(tool.shortName, contentCx, 268, W - 76);

      ctx.fillStyle = ED_VERMILION;
      ctx.fillRect(72, 300, W - 104, 38);
      ctx.fillStyle = '#ffffff';
      ctx.font = '700 14px "Space Mono", monospace';
      ctx.fillText(tool.badge.toUpperCase(), contentCx, 319);
    } else {
      const iconSize = artifactFormat === 'reel-case' ? 156 : 168;
      const ix = Math.round(contentCx - iconSize / 2);
      const iy = artifactFormat === 'reel-case' ? 76 : 84;

      ctx.fillStyle = ED_INK;
      ctx.fillRect(ix + 5, iy + 5, iconSize + 8, iconSize + 8);
      ctx.fillStyle = '#12151c';
      ctx.fillRect(ix - 4, iy - 4, iconSize + 8, iconSize + 8);
      ctx.strokeStyle = ED_BRASS;
      ctx.lineWidth = 3;
      ctx.strokeRect(ix - 4, iy - 4, iconSize + 8, iconSize + 8);
      if (loadedImg) {
        ctx.drawImage(loadedImg, ix, iy, iconSize, iconSize);
      } else {
        ctx.fillStyle = tool.accent;
        ctx.fillRect(ix, iy, iconSize, iconSize);
      }

      const titleY = iy + iconSize + (artifactFormat === 'reel-case' ? 40 : 52);
      ctx.fillStyle = ED_INK;
      ctx.font = '700 26px "Fraunces", Georgia, serif';
      ctx.fillText(tool.shortName, contentCx, titleY, W - 70);

      // Specimen detail strip depending on station
      if (artifactFormat === 'polyglot-booklet') {
        ctx.fillStyle = ED_VERMILION;
        ctx.font = '700 20px "Fraunces", serif';
        ctx.fillText('Aa • Ññ • あ • ع', contentCx, titleY + 38);
      } else if (artifactFormat === 'roas-ledger') {
        ctx.fillStyle = '#0f766e';
        ctx.font = '700 15px "Space Mono", monospace';
        ctx.fillText('NET MARGIN • +3.8× ROAS', contentCx, titleY + 36);
      } else if (artifactFormat === 'sku-dossier') {
        ['#151413', '#c83e2b', '#fbbf24', '#38bdf8', '#b08d57'].forEach((sw, si) => {
          ctx.fillStyle = sw;
          ctx.fillRect(contentCx - 95 + si * 40, titleY + 24, 30, 18);
        });
      }

      // Bottom archival colophon stamp
      const stampY = H - 68;
      ctx.fillStyle = ED_VERMILION;
      ctx.fillRect(64, stampY, W - 88, 38);
      ctx.fillStyle = '#ffffff';
      ctx.font = '700 14px "Space Mono", monospace';
      ctx.fillText(`BENCH 0${benchIdx + 1} • ${tool.badge.toUpperCase()}`, contentCx, stampY + 19, W - 102);
    }

    ctx.strokeStyle = ED_INK;
    ctx.lineWidth = 5;
    ctx.strokeRect(3, 3, W - 6, H - 6);
  }

  draw();
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;

  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.width = 256;
  img.height = 256;
  img.onload = () => {
    loadedImg = img;
    draw();
    tex.needsUpdate = true;
  };
  img.src = tool.iconUrl;

  tex.userData = {
    redraw() {
      draw();
      tex.needsUpdate = true;
    }
  };
  return tex;
}

function createStudioCuttingMatTexture(benchIdx = 1) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  // Self-healing warm linen/cream architectural drafting mat
  ctx.fillStyle = '#efe8da';
  ctx.fillRect(0, 0, 512, 256);

  ctx.strokeStyle = 'rgba(21, 20, 19, 0.13)';
  ctx.lineWidth = 1;
  for (let x = 24; x <= 488; x += 24) {
    ctx.beginPath();
    ctx.moveTo(x, 16);
    ctx.lineTo(x, 240);
    ctx.stroke();
  }
  for (let y = 24; y <= 232; y += 24) {
    ctx.beginPath();
    ctx.moveTo(16, y);
    ctx.lineTo(496, y);
    ctx.stroke();
  }

  // Outer sumi-ink & vermilion pica scale border
  ctx.strokeStyle = ED_INK;
  ctx.lineWidth = 3;
  ctx.strokeRect(12, 12, 488, 232);

  ctx.fillStyle = ED_VERMILION;
  ctx.fillRect(18, 218, 128, 18);
  ctx.fillStyle = '#ffffff';
  ctx.font = '700 11px "Space Mono", monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`BENCH 0${benchIdx} // SPEC`, 82, 227);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createWorkshopRunnerTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Sunlit woven Belgian linen & warm travertine runner weave
  ctx.fillStyle = '#ebe3d3';
  ctx.fillRect(0, 0, 1024, 512);

  // Architectural selvedge border bands (sumi ink, vermilion, antique brass)
  const stripes = [
    [26, 16, ED_INK],
    [50, 10, ED_VERMILION],
    [68, 8, ED_BRASS],
    [436, 8, ED_BRASS],
    [446, 10, ED_VERMILION],
    [464, 16, ED_INK]
  ];
  stripes.forEach(([y, h, col]) => {
    ctx.fillStyle = col;
    ctx.fillRect(18, y, 988, h);
  });

  // Subtle Swiss editorial registration crosses & pica medallions down center
  for (let x = 96; x < 960; x += 128) {
    ctx.strokeStyle = 'rgba(21, 20, 19, 0.16)';
    ctx.lineWidth = 2;
    ctx.strokeRect(x - 28, 228, 56, 56);
    ctx.strokeStyle = 'rgba(200, 62, 43, 0.35)';
    ctx.beginPath();
    ctx.moveTo(x - 12, 256);
    ctx.lineTo(x + 12, 256);
    ctx.moveTo(x, 244);
    ctx.lineTo(x, 268);
    ctx.stroke();
  }

  // Fine woven linen warp lines
  ctx.fillStyle = 'rgba(21, 20, 19, 0.035)';
  for (let y = 0; y < 512; y += 4) {
    ctx.fillRect(0, y, 1024, 1.2);
  }

  // Heavy bound linen border
  ctx.strokeStyle = ED_INK;
  ctx.lineWidth = 14;
  ctx.strokeRect(8, 8, 1008, 496);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createStudioPegboardTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  // Warm sunlit birch/cream studio pegboard
  ctx.fillStyle = '#efe7d8';
  ctx.fillRect(0, 0, 256, 256);

  ctx.fillStyle = '#756856';
  for (let y = 16; y < 256; y += 24) {
    for (let x = 16; x < 256; x += 24) {
      ctx.beginPath();
      ctx.arc(x, y, 3.0, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(4, 2);
  return tex;
}

function createGlobeParchmentTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  // Warm cartographic parchment ocean
  ctx.fillStyle = '#f2ead9';
  ctx.fillRect(0, 0, 512, 256);

  // Stylized architectural continent silhouettes in warm brass/terracotta
  ctx.fillStyle = '#cbb389';
  [
    [82, 62, 68, 54],
    [122, 128, 44, 68],
    [232, 52, 56, 48],
    [244, 106, 52, 74],
    [306, 56, 112, 68],
    [392, 148, 54, 42]
  ].forEach(([rx, ry, rw, rh]) => {
    ctx.beginPath();
    ctx.ellipse(rx + rw / 2, ry + rh / 2, rw / 2, rh / 2, 0.18, 0, Math.PI * 2);
    ctx.fill();
  });

  // Graticule latitude/longitude lines + vermilion equator
  ctx.strokeStyle = 'rgba(21, 20, 19, 0.22)';
  ctx.lineWidth = 1.2;
  for (let x = 32; x < 512; x += 48) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 256);
    ctx.stroke();
  }
  for (let y = 32; y < 256; y += 32) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(512, y);
    ctx.stroke();
  }

  ctx.strokeStyle = ED_VERMILION;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(0, 128);
  ctx.lineTo(512, 128);
  ctx.stroke();

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createTypeTrayTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#241e19';
  ctx.fillRect(0, 0, 512, 256);

  const cells = [
    ['Aa', '#faf6ee', ED_INK],
    ['Ññ', ED_VERMILION, '#ffffff'],
    ['あ', '#efe6d5', ED_INK],
    ['ع', '#d4b47c', ED_INK]
  ];
  cells.forEach(([glyph, bg, fg], i) => {
    const cx = 18 + i * 121;
    ctx.fillStyle = bg;
    ctx.fillRect(cx, 22, 112, 152);
    ctx.strokeStyle = ED_BRASS;
    ctx.lineWidth = 3;
    ctx.strokeRect(cx, 22, 112, 152);
    ctx.fillStyle = fg;
    ctx.font = '700 48px "Fraunces", system-ui, serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(glyph, cx + 56, 98);
  });

  // Lower letterpress compartment matrix
  for (let c = 0; c < 8; c++) {
    ctx.fillStyle = c % 2 === 0 ? '#3a3028' : '#2e2620';
    ctx.fillRect(18 + c * 60, 188, 54, 48);
    ctx.strokeStyle = ED_BRASS;
    ctx.lineWidth = 1.5;
    ctx.strokeRect(18 + c * 60, 188, 54, 48);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createCommissionDossierTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 384;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  function draw() {
    ctx.fillStyle = ED_PAPER;
    ctx.fillRect(0, 0, 384, 512);

    ctx.strokeStyle = ED_INK;
    ctx.lineWidth = 6;
    ctx.strokeRect(8, 8, 368, 496);
    ctx.lineWidth = 1.5;
    ctx.strokeRect(18, 18, 348, 476);

    ctx.fillStyle = ED_INK;
    ctx.font = 'italic 700 30px "Fraunces", Georgia, serif';
    ctx.fillText('Commission Brief', 34, 68);

    ctx.strokeStyle = ED_VERMILION;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(34, 88);
    ctx.lineTo(350, 88);
    ctx.stroke();

    const rows = ['§ Website Makeover', '§ Product Visuals AI', '§ Market Dossier', '§ Interactive Piece'];
    ctx.fillStyle = ED_INK;
    ctx.font = '700 22px "Fraunces", Georgia, serif';
    rows.forEach((line, i) => {
      ctx.fillText(line, 36, 154 + i * 62);
    });

    ctx.fillStyle = ED_VERMILION;
    ctx.fillRect(34, 404, 316, 66);
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 19px "Space Mono", monospace';
    ctx.fillText('INQUIRE / BRIEF →', 68, 444);
  }

  draw();
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.userData = {
    redraw() {
      draw();
      tex.needsUpdate = true;
    }
  };
  return tex;
}

function createCabinetMarqueeTexture(game) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 160;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createLinearGradient(0, 0, 512, 160);
  grad.addColorStop(0, '#0f172a');
  grad.addColorStop(0.5, game.cabinetBodyColor || '#1e293b');
  grad.addColorStop(1, '#0f172a');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 160);

  // Diagonal stadium speed stripes
  ctx.fillStyle = `${game.accent}2e`;
  for (let x = -120; x < 620; x += 42) {
    ctx.beginPath();
    ctx.moveTo(x, 160);
    ctx.lineTo(x + 22, 160);
    ctx.lineTo(x + 76, 0);
    ctx.lineTo(x + 54, 0);
    ctx.closePath();
    ctx.fill();
  }

  ctx.strokeStyle = game.accent;
  ctx.lineWidth = 8;
  ctx.strokeRect(8, 8, 496, 144);

  ctx.strokeStyle = game.secondaryAccent;
  ctx.lineWidth = 3;
  ctx.strokeRect(18, 18, 476, 124);

  ctx.shadowColor = game.accent;
  ctx.shadowBlur = 16;
  ctx.fillStyle = '#ffffff';
  const fSize = game.shortName.length > 11 ? 38 : 44;
  ctx.font = `700 ${fSize}px "Space Grotesk", "Syne", system-ui, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(game.shortName.toUpperCase(), 256, 68);

  ctx.shadowBlur = 0;
  ctx.fillStyle = game.accent;
  ctx.font = '700 17px "Chakra Petch", "Space Mono", monospace';
  ctx.fillText(`2-PLAYER REC-ROOM CAB • ${game.badge.toUpperCase()}`, 256, 122);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/**
 * Generates live illuminated screen textures for each of the 7 Garage Game Room displays
 * ('portrait' for 9:16 mobile, 'pocket' for square pocket screen, 'wide-handheld', or 'landscape')
 */
function createGameScreenTexture(game, aspectMode = 'landscape') {
  const canvas = document.createElement('canvas');
  if (aspectMode === 'portrait') {
    canvas.width = 384;
    canvas.height = 640;
  } else if (aspectMode === 'pocket') {
    canvas.width = 420;
    canvas.height = 400;
  } else if (aspectMode === 'wide-handheld') {
    canvas.width = 560;
    canvas.height = 372;
  } else {
    canvas.width = 512;
    canvas.height = 384;
  }
  const ctx = canvas.getContext('2d');
  let loadedImg = null;

  function draw() {
    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;

    if (aspectMode === 'pocket') {
      // Warm backlit pocket LCD palette with crisp contrast so SumTen icon & title pop
      const bg = ctx.createLinearGradient(0, 0, 0, H);
      bg.addColorStop(0, '#182628');
      bg.addColorStop(1, '#0d1517');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);
    } else {
      const bg = ctx.createRadialGradient(cx, H * 0.42, 20, cx, H * 0.5, Math.max(W, H) * 0.72);
      bg.addColorStop(0, game.cabinetBodyColor || '#1e2433');
      bg.addColorStop(1, '#090b10');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);
    }

    // Subtle decorative geometric grid in background
    ctx.strokeStyle = `${game.accent}38`;
    ctx.lineWidth = 2;
    const gridStart = Math.round(H * 0.58);
    for (let y = gridStart; y < H - 16; y += 26) {
      ctx.beginPath();
      ctx.moveTo(14, y);
      ctx.lineTo(W - 14, y);
      ctx.stroke();
    }

    // Top telemetry HUD strip (authentic per-platform status)
    ctx.fillStyle = 'rgba(10, 12, 18, 0.72)';
    ctx.fillRect(12, 12, W - 24, 34);
    ctx.fillStyle = GAR_AMBER_BRIGHT;
    ctx.font = '700 14px "Chakra Petch", "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    const leftStatus =
      aspectMode === 'portrait'
        ? '9:16 DECK LIVE'
        : aspectMode === 'pocket'
          ? '20 KB ROM'
          : aspectMode === 'wide-handheld'
            ? 'COLOR PAK'
            : 'READY • LIVE';
    ctx.fillText(leftStatus, 24, 29);

    ctx.fillStyle = game.secondaryAccent;
    ctx.textAlign = 'right';
    ctx.fillText(game.badge.toUpperCase(), W - 24, 29);

    // Prominent, completely unobstructed game logo/icon artwork
    const iconSize =
      aspectMode === 'portrait'
        ? 210
        : aspectMode === 'pocket'
          ? 164
          : aspectMode === 'wide-handheld'
            ? 150
            : 154;
    const ix = Math.round((W - iconSize) / 2);
    const iy = aspectMode === 'portrait' ? 88 : 56;

    ctx.save();
    ctx.shadowColor = game.accent;
    ctx.shadowBlur = 24;
    ctx.fillStyle = '#0c0f16';
    ctx.fillRect(ix - 6, iy - 6, iconSize + 12, iconSize + 12);
    ctx.strokeStyle = game.accent;
    ctx.lineWidth = 4;
    ctx.strokeRect(ix - 6, iy - 6, iconSize + 12, iconSize + 12);
    if (loadedImg) {
      ctx.drawImage(loadedImg, ix, iy, iconSize, iconSize);
    } else {
      ctx.fillStyle = game.accent;
      ctx.fillRect(ix, iy, iconSize, iconSize);
    }
    ctx.restore();

    // Game Title below icon
    const titleY = iy + iconSize + (aspectMode === 'portrait' ? 58 : 40);
    const titleFont =
      game.shortName.length > 12 ? (aspectMode === 'portrait' ? 29 : 28) : aspectMode === 'portrait' ? 36 : 32;
    ctx.fillStyle = '#ffffff';
    ctx.font = `700 ${titleFont}px "Space Grotesk", "Syne", system-ui, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(game.shortName.toUpperCase(), cx, titleY);

    // Tactile Start / Tap prompt pill at bottom
    const pillW = Math.min(W - 56, 336);
    const pillH = aspectMode === 'portrait' ? 58 : 46;
    const pillX = Math.round((W - pillW) / 2);
    const pillY = aspectMode === 'portrait' ? H - 122 : H - 72;

    ctx.fillStyle = game.accent;
    ctx.fillRect(pillX, pillY, pillW, pillH);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2.5;
    ctx.strokeRect(pillX, pillY, pillW, pillH);

    ctx.fillStyle = '#090b10';
    ctx.font = '700 18px "Chakra Petch", "Space Mono", monospace';
    const ctaText =
      aspectMode === 'portrait' ? '▶ SWIPE DECK • PLAY' : '▶ PRESS START • PLAY';
    ctx.fillText(ctaText, cx, pillY + pillH / 2 + 1);

    // Crisp outer display border
    ctx.strokeStyle = game.secondaryAccent;
    ctx.lineWidth = 4;
    ctx.strokeRect(6, 6, W - 12, H - 12);
  }

  draw();
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;

  const img = new Image();
  img.crossOrigin = 'anonymous';
  // Explicit width/height ensures viewBox-only SVGs (desired.svg, wild-peak.svg) rasterize crisply
  img.width = 256;
  img.height = 256;
  img.onload = () => {
    loadedImg = img;
    draw();
    tex.needsUpdate = true;
  };
  img.src = game.iconUrl;

  tex.userData = {
    redraw() {
      draw();
      tex.needsUpdate = true;
    }
  };
  return tex;
}

/**
 * Generates authentic physical retail box / Shockbox / keep-case / big-box PC cover artwork
 */
function createBoxCoverTexture(game, boxFormat = 'keep-case') {
  const canvas = document.createElement('canvas');
  if (boxFormat === 'landscape-box') {
    canvas.width = 512;
    canvas.height = 368;
  } else if (boxFormat === 'square-box') {
    canvas.width = 420;
    canvas.height = 420;
  } else {
    canvas.width = 384;
    canvas.height = 512;
  }
  const ctx = canvas.getContext('2d');
  let loadedImg = null;

  const platformHeaders = {
    'tuck-deck': 'COLLECTOR EDITION • 25 CARDS',
    'square-box': 'COLOR HANDHELD PAK',
    'mini-box': 'POCKET 20KB SERIES',
    shockbox: 'PRO-GEAR ARCADE SYSTEM',
    'big-box-pc': 'PC CD-ROM • BIG BOX EDITION',
    'keep-case': 'OPTICAL MINI-DISC • 1–4P',
    'landscape-box': '64-BIT HOME CONSOLE PAK'
  };

  function draw() {
    const W = canvas.width;
    const H = canvas.height;

    // Rich printed cardboard / sleeve gradient
    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, '#161924');
    bg.addColorStop(0.55, game.cabinetBodyColor || '#222634');
    bg.addColorStop(1, '#0e1017');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // Decorative diagonal box-art accent flash
    ctx.fillStyle = `${game.accent}33`;
    ctx.beginPath();
    ctx.moveTo(0, H * 0.65);
    ctx.lineTo(W, H * 0.32);
    ctx.lineTo(W, H * 0.54);
    ctx.lineTo(0, H * 0.87);
    ctx.closePath();
    ctx.fill();

    if (boxFormat === 'landscape-box') {
      // Iconic right-side vertical platform band on 64-bit landscape cardboard box
      ctx.fillStyle = game.accent;
      ctx.fillRect(W - 74, 0, 74, H);
      ctx.fillStyle = GAR_AMBER;
      ctx.fillRect(W - 84, 0, 10, H);

      ctx.save();
      ctx.translate(W - 36, H / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillStyle = '#0b0d12';
      ctx.font = '700 21px "Chakra Petch", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('64-BIT ROM PAK', 0, 6);
      ctx.restore();

      const artW = W - 84;
      ctx.fillStyle = '#0c0e14';
      ctx.fillRect(14, 14, artW - 28, 36);
      ctx.fillStyle = GAR_AMBER_BRIGHT;
      ctx.font = '700 15px "Chakra Petch", monospace';
      ctx.textAlign = 'left';
      ctx.fillText(platformHeaders[boxFormat], 24, 37);

      const iconSize = 168;
      const ix = Math.round((artW - iconSize) / 2);
      const iy = 64;
      ctx.fillStyle = '#0c0f16';
      ctx.fillRect(ix - 5, iy - 5, iconSize + 10, iconSize + 10);
      ctx.strokeStyle = game.accent;
      ctx.lineWidth = 4;
      ctx.strokeRect(ix - 5, iy - 5, iconSize + 10, iconSize + 10);
      if (loadedImg) {
        ctx.drawImage(loadedImg, ix, iy, iconSize, iconSize);
      }

      ctx.fillStyle = '#ffffff';
      ctx.font = '700 30px "Space Grotesk", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(game.shortName.toUpperCase(), artW / 2, 274);

      ctx.fillStyle = game.secondaryAccent;
      ctx.font = '700 15px "Chakra Petch", monospace';
      ctx.fillText(`★ ${game.badge.toUpperCase()} ★`, artW / 2, 314);
    } else if (boxFormat === 'square-box' || boxFormat === 'mini-box') {
      // Classic left-side metallic handheld platform stripe + square cover art
      ctx.fillStyle = game.accent;
      ctx.fillRect(0, 0, 58, H);
      ctx.fillStyle = game.secondaryAccent;
      ctx.fillRect(58, 0, 7, H);

      ctx.save();
      ctx.translate(30, H / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillStyle = '#0b0d12';
      ctx.font = '700 19px "Chakra Petch", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(boxFormat === 'mini-box' ? 'POCKET 20KB' : 'HANDHELD COLOR', 0, 5);
      ctx.restore();

      const contentCx = 65 + (W - 65) / 2;
      const iconSize = boxFormat === 'square-box' ? 186 : 168;
      const ix = Math.round(contentCx - iconSize / 2);
      const iy = boxFormat === 'square-box' ? 54 : 74;

      ctx.fillStyle = '#0c0f16';
      ctx.fillRect(ix - 5, iy - 5, iconSize + 10, iconSize + 10);
      ctx.strokeStyle = game.accent;
      ctx.lineWidth = 4;
      ctx.strokeRect(ix - 5, iy - 5, iconSize + 10, iconSize + 10);
      if (loadedImg) {
        ctx.drawImage(loadedImg, ix, iy, iconSize, iconSize);
      }

      ctx.fillStyle = '#ffffff';
      ctx.font = '700 28px "Space Grotesk", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(game.shortName.toUpperCase(), contentCx, iy + iconSize + 46);

      ctx.fillStyle = GAR_AMBER_BRIGHT;
      ctx.font = '700 14px "Chakra Petch", monospace';
      ctx.fillText(game.badge.toUpperCase(), contentCx, iy + iconSize + 80);
    } else {
      // Top platform banner (Keep-Case, Big-Box PC, Shockbox, Collector Tuck-Deck)
      ctx.fillStyle = game.accent;
      ctx.fillRect(0, 0, W, 56);
      ctx.fillStyle = '#090b10';
      ctx.font = '700 16px "Chakra Petch", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(platformHeaders[boxFormat] || 'GARAGE EDITION', W / 2, 29);

      const iconSize = 204;
      const ix = Math.round((W - iconSize) / 2);
      const iy = 92;
      ctx.fillStyle = '#0c0f16';
      ctx.fillRect(ix - 6, iy - 6, iconSize + 12, iconSize + 12);
      ctx.strokeStyle = game.secondaryAccent;
      ctx.lineWidth = 4;
      ctx.strokeRect(ix - 6, iy - 6, iconSize + 12, iconSize + 12);
      if (loadedImg) {
        ctx.drawImage(loadedImg, ix, iy, iconSize, iconSize);
      }

      ctx.fillStyle = '#ffffff';
      const tFont = game.shortName.length > 11 ? 30 : 35;
      ctx.font = `700 ${tFont}px "Space Grotesk", sans-serif`;
      ctx.fillText(game.shortName.toUpperCase(), W / 2, 352);

      // Authentic corner seal / edition badge
      ctx.fillStyle = 'rgba(245, 158, 11, 0.18)';
      ctx.fillRect(36, 404, W - 72, 46);
      ctx.strokeStyle = GAR_AMBER_BRIGHT;
      ctx.lineWidth = 2;
      ctx.strokeRect(36, 404, W - 72, 46);
      ctx.fillStyle = GAR_AMBER_BRIGHT;
      ctx.font = '700 16px "Chakra Petch", monospace';
      ctx.fillText(game.badge.toUpperCase(), W / 2, 428);
    }

    // Subtle printed box border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.28)';
    ctx.lineWidth = 4;
    ctx.strokeRect(3, 3, W - 6, H - 6);
  }

  draw();
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;

  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.width = 256;
  img.height = 256;
  img.onload = () => {
    loadedImg = img;
    draw();
    tex.needsUpdate = true;
  };
  img.src = game.iconUrl;

  tex.userData = {
    redraw() {
      draw();
      tex.needsUpdate = true;
    }
  };
  return tex;
}

/**
 * Generates miniature physical media artwork for Cartridges, Optical Discs, and NFC Cards
 */
function createMediaLabelTexture(game, mediaKind = 'cart') {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  let loadedImg = null;

  function draw() {
    ctx.clearRect(0, 0, 256, 256);

    if (mediaKind === 'disc') {
      // Iridescent optical CD-ROM / 8cm Mini-Disc with custom printed label ring
      const cx = 128;
      const cy = 128;
      const grad = ctx.createConicGradient(0.4, cx, cy);
      grad.addColorStop(0, '#e2e8f0');
      grad.addColorStop(0.18, game.accent);
      grad.addColorStop(0.35, '#bae6fd');
      grad.addColorStop(0.52, '#fef08a');
      grad.addColorStop(0.72, game.secondaryAccent);
      grad.addColorStop(1, '#e2e8f0');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, 122, 0, Math.PI * 2);
      ctx.fill();

      // Upper printed art half
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, 114, Math.PI, Math.PI * 2);
      ctx.closePath();
      ctx.fillStyle = '#141720';
      ctx.fill();
      ctx.restore();

      if (loadedImg) {
        ctx.drawImage(loadedImg, 96, 30, 64, 64);
      }

      ctx.fillStyle = '#0f172a';
      ctx.font = '700 18px "Chakra Petch", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(game.shortName.toUpperCase().slice(0, 12), cx, 192);

      // Clear polycarbonate clamping ring + spindle hole
      ctx.fillStyle = '#cbd5e1';
      ctx.beginPath();
      ctx.arc(cx, cy, 34, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#111318';
      ctx.beginPath();
      ctx.arc(cx, cy, 16, 0, Math.PI * 2);
      ctx.fill();
      return;
    }

    if (mediaKind === 'nfc-card') {
      ctx.fillStyle = '#14161d';
      ctx.fillRect(0, 0, 256, 256);
      ctx.strokeStyle = GAR_AMBER_BRIGHT;
      ctx.lineWidth = 8;
      ctx.strokeRect(8, 8, 240, 240);

      // Gold NFC chip pad
      ctx.fillStyle = GAR_AMBER_BRIGHT;
      ctx.fillRect(28, 34, 48, 38);
      ctx.fillStyle = '#ffffff';
      ctx.font = '700 19px "Chakra Petch", monospace';
      ctx.textAlign = 'right';
      ctx.fillText('NFC TAP )))', 228, 58);

      if (loadedImg) {
        ctx.drawImage(loadedImg, 84, 84, 88, 88);
      }

      ctx.fillStyle = game.accent;
      ctx.fillRect(20, 192, 216, 40);
      ctx.fillStyle = '#090b10';
      ctx.font = '700 20px "Space Grotesk", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(game.shortName.toUpperCase(), 128, 219);
      return;
    }

    // Cartridge sticker (Pastel Pak, 20 KB Pocket Cart, Pro Arcade Cart, 64-Bit ROM Cart)
    ctx.fillStyle = '#141720';
    ctx.fillRect(0, 0, 256, 256);

    ctx.fillStyle = game.accent;
    ctx.fillRect(0, 0, 256, 54);
    ctx.fillStyle = '#090b10';
    ctx.font = '700 22px "Chakra Petch", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const topTag =
      mediaKind === '20kb-cart'
        ? '20 KB ROM PAK'
        : mediaKind === 'mvs-cart'
          ? 'PRO ARCADE CART'
          : mediaKind === 'n64-cart'
            ? '64-BIT PAK'
            : 'COLOR PAK';
    ctx.fillText(topTag, 128, 28);

    if (loadedImg) {
      ctx.drawImage(loadedImg, 68, 66, 120, 120);
    } else {
      ctx.fillStyle = game.secondaryAccent;
      ctx.fillRect(68, 66, 120, 120);
    }

    ctx.fillStyle = '#ffffff';
    ctx.font = '700 22px "Space Grotesk", sans-serif';
    ctx.fillText(game.shortName.toUpperCase().slice(0, 13), 128, 216);

    ctx.strokeStyle = game.secondaryAccent;
    ctx.lineWidth = 6;
    ctx.strokeRect(4, 4, 248, 248);
  }

  draw();
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;

  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.width = 256;
  img.height = 256;
  img.onload = () => {
    loadedImg = img;
    draw();
    tex.needsUpdate = true;
  };
  img.src = game.iconUrl;

  tex.userData = {
    redraw() {
      draw();
      tex.needsUpdate = true;
    }
  };
  return tex;
}

function createLeftEditorialFloorTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Sunlit architectural gallery limestone / warm travertine tile
  ctx.fillStyle = '#dfd7c8';
  ctx.fillRect(0, 0, 512, 512);

  // Fine Swiss architectural joint lines
  ctx.strokeStyle = 'rgba(21, 20, 19, 0.18)';
  ctx.lineWidth = 2;
  ctx.strokeRect(0, 0, 512, 512);

  ctx.strokeStyle = 'rgba(21, 20, 19, 0.07)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(256, 0);
  ctx.lineTo(256, 512);
  ctx.moveTo(0, 256);
  ctx.lineTo(512, 256);
  ctx.stroke();

  // Subtle vermilion gallery registration cross at tile center
  ctx.strokeStyle = 'rgba(200, 62, 43, 0.42)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(246, 256);
  ctx.lineTo(266, 256);
  ctx.moveTo(256, 246);
  ctx.lineTo(256, 266);
  ctx.stroke();

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(14, 18);
  return tex;
}

function createGarageConcreteFloorTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Sealed warm charcoal-slate garage concrete slab
  ctx.fillStyle = '#1f232b';
  ctx.fillRect(0, 0, 512, 512);

  // Subtle aggregate mineral mottling
  for (let i = 0; i < 220; i++) {
    const sx = (i * 97) % 512;
    const sy = (i * 151) % 512;
    ctx.fillStyle = i % 2 === 0 ? 'rgba(255, 255, 255, 0.025)' : 'rgba(0, 0, 0, 0.08)';
    ctx.fillRect(sx, sy, 4, 4);
  }

  // Saw-cut concrete expansion control joints
  ctx.strokeStyle = 'rgba(10, 12, 16, 0.55)';
  ctx.lineWidth = 3;
  ctx.strokeRect(0, 0, 512, 512);

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(3, 3);
  ctx.lineTo(509, 3);
  ctx.moveTo(3, 3);
  ctx.lineTo(3, 509);
  ctx.stroke();

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(10, 10);
  return tex;
}

function createGarageRugTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Warm woven charcoal-heather base weave
  ctx.fillStyle = '#262322';
  ctx.fillRect(0, 0, 1024, 512);

  // Cozy rec-room woven stripe bands (burnt sienna, ochre amber, slate, warm cream)
  const stripes = [
    [28, 18, '#b45309'],
    [54, 10, '#f59e0b'],
    [72, 12, '#334155'],
    [420, 12, '#334155'],
    [438, 10, '#f59e0b'],
    [456, 18, '#b45309']
  ];
  stripes.forEach(([y, h, col]) => {
    ctx.fillStyle = col;
    ctx.fillRect(18, y, 988, h);
  });

  // Subtle woven geometric diamond medallions along center runner
  for (let x = 96; x < 960; x += 128) {
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.24)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x, 212);
    ctx.lineTo(x + 38, 256);
    ctx.lineTo(x, 300);
    ctx.lineTo(x - 38, 256);
    ctx.closePath();
    ctx.stroke();
  }

  // Woven textile grain lines
  ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
  for (let y = 0; y < 512; y += 4) {
    ctx.fillRect(0, y, 1024, 1.5);
  }

  // Heavy bound rug serged edge
  ctx.strokeStyle = '#78350f';
  ctx.lineWidth = 18;
  ctx.strokeRect(9, 9, 1006, 494);
  ctx.strokeStyle = '#d97706';
  ctx.lineWidth = 3;
  ctx.strokeRect(20, 20, 984, 472);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createGarageCinderblockTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Painted warm slate-charcoal garage masonry wall
  ctx.fillStyle = '#252934';
  ctx.fillRect(0, 0, 512, 512);

  const rows = 8;
  const cols = 4;
  const rowH = 512 / rows;
  const colW = 512 / cols;

  for (let r = 0; r < rows; r++) {
    const y = r * rowH;
    const offset = (r % 2) * (colW / 2);

    // Subtle painted block tonal variation
    for (let c = -1; c <= cols; c++) {
      const x = c * colW + offset;
      ctx.fillStyle = (r + c) % 2 === 0 ? 'rgba(255,255,255,0.018)' : 'rgba(0,0,0,0.03)';
      ctx.fillRect(x + 3, y + 3, colW - 6, rowH - 6);
    }

    // Horizontal mortar joint
    ctx.fillStyle = '#181b23';
    ctx.fillRect(0, y, 512, 4);
    ctx.fillStyle = 'rgba(255,255,255,0.04)';
    ctx.fillRect(0, y + 4, 512, 1.5);

    // Staggered vertical mortar joints
    for (let c = 0; c <= cols; c++) {
      const vx = (c * colW + offset) % 512;
      ctx.fillStyle = '#181b23';
      ctx.fillRect(vx, y, 4, rowH);
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(9, 4.5);
  return tex;
}

function createPegboardTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#2b303c';
  ctx.fillRect(0, 0, 256, 256);

  ctx.fillStyle = '#111318';
  for (let y = 16; y < 256; y += 24) {
    for (let x = 16; x < 256; x += 24) {
      ctx.beginPath();
      ctx.arc(x, y, 3.2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(4, 2);
  return tex;
}

/**
 * Sunlit Design & Maker's Studio Workbench (blackened-ash frame + pale Nordic birch butcher-block top at y = 0.96)
 */
function buildStudioWorkbenchBase(index, accentHex) {
  const group = new THREE.Group();
  const benchW = 1.88;
  const benchD = 1.04;
  const topH = 0.075;
  const topCenterY = 0.96 - topH / 2;

  const ashFrameMat = new THREE.MeshStandardMaterial({
    color: 0x1c1a17,
    roughness: 0.48,
    metalness: 0.16
  });
  const birchTopMat = new THREE.MeshStandardMaterial({
    color: 0xdcc7a6,
    roughness: 0.54,
    metalness: 0.04
  });
  const brassMat = new THREE.MeshStandardMaterial({
    color: ED_BRASS,
    roughness: 0.3,
    metalness: 0.8
  });
  const ragBoxMat = new THREE.MeshStandardMaterial({
    color: 0xf5efe3,
    roughness: 0.74,
    metalness: 0.02
  });
  const vermilionMat = new THREE.MeshStandardMaterial({
    color: ED_VERMILION,
    roughness: 0.42,
    metalness: 0.08
  });

  // Pale Nordic birch butcher-block worktop (top surface sits at exact y = 0.96)
  const tabletop = new THREE.Mesh(new THREE.BoxGeometry(benchW, topH, benchD), birchTopMat);
  tabletop.position.set(0, topCenterY, 0);
  group.add(tabletop);

  // Brushed-brass front inlay strip along birch tabletop edge
  const brassFrontInlay = new THREE.Mesh(
    new THREE.BoxGeometry(benchW + 0.006, 0.018, 0.014),
    brassMat
  );
  brassFrontInlay.position.set(0, 0.924, benchD / 2 + 0.004);
  group.add(brassFrontInlay);

  // Self-healing architectural drafting / pica cutting mat on tabletop
  const cuttingMat = new THREE.Mesh(
    new THREE.PlaneGeometry(1.74, 0.88),
    new THREE.MeshStandardMaterial({
      map: createStudioCuttingMatTexture(index + 1),
      roughness: 0.78,
      metalness: 0.02
    })
  );
  cuttingMat.rotation.x = -Math.PI / 2;
  cuttingMat.position.set(0, 0.962, 0.01);
  group.add(cuttingMat);

  // Blackened-ash structural apron beneath tabletop
  const apron = new THREE.Mesh(
    new THREE.BoxGeometry(benchW - 0.08, 0.07, benchD - 0.08),
    ashFrameMat
  );
  apron.position.set(0, 0.855, 0);
  group.add(apron);

  // 4 Blackened-ash studio legs + machined brass leveling feet
  const legPositions = [
    [-benchW / 2 + 0.09, -benchD / 2 + 0.09],
    [benchW / 2 - 0.09, -benchD / 2 + 0.09],
    [-benchW / 2 + 0.09, benchD / 2 - 0.09],
    [benchW / 2 - 0.09, benchD / 2 - 0.09]
  ];
  legPositions.forEach(([lx, lz]) => {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.065, 0.85, 0.065), ashFrameMat);
    leg.position.set(lx, 0.455, lz);
    group.add(leg);

    const brassFoot = new THREE.Mesh(new THREE.CylinderGeometry(0.036, 0.04, 0.03, 14), brassMat);
    brassFoot.position.set(lx, 0.015, lz);
    group.add(brassFoot);
  });

  // Lower archival flat-file storage shelf
  const lowerShelf = new THREE.Mesh(
    new THREE.BoxGeometry(benchW - 0.2, 0.035, benchD - 0.24),
    ashFrameMat
  );
  lowerShelf.position.set(0, 0.24, -0.02);
  group.add(lowerShelf);

  // Stacked cotton-rag archival portfolio boxes on left of lower shelf
  [0, 1].forEach((bi) => {
    const folioBox = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.075, 0.42), ragBoxMat);
    folioBox.position.set(-0.44, 0.295 + bi * 0.082, 0.02);
    folioBox.rotation.y = bi === 1 ? 0.04 : -0.02;
    group.add(folioBox);

    const spineTab = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.032, 0.012), vermilionMat);
    spineTab.position.set(-0.44, 0.295 + bi * 0.082, 0.232);
    group.add(spineTab);
  });

  // Rolled architectural blueprint tubes with brass/vermilion caps on right of lower shelf
  [-0.08, 0.06, 0.0].forEach((tz, ti) => {
    const tube = new THREE.Mesh(
      new THREE.CylinderGeometry(0.036, 0.036, 0.56, 14),
      new THREE.MeshStandardMaterial({
        color: ti === 1 ? 0xd5be97 : 0xf4eee2,
        roughness: 0.68
      })
    );
    tube.rotation.z = Math.PI / 2;
    tube.position.set(0.42, ti === 2 ? 0.355 : 0.295, tz + 0.04);
    group.add(tube);

    const cap = new THREE.Mesh(
      new THREE.CylinderGeometry(0.038, 0.038, 0.024, 14),
      ti === 0 ? vermilionMat : brassMat
    );
    cap.rotation.z = Math.PI / 2;
    cap.position.set(0.705, ti === 2 ? 0.355 : 0.295, tz + 0.04);
    group.add(cap);
  });

  // Sumi-ink & brass bench number plate on front edge of birch top
  const badgePlate = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.046, 0.016), ashFrameMat);
  badgePlate.position.set(0, 0.924, benchD / 2 + 0.012);
  group.add(badgePlate);

  const accentPinMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(accentHex),
    emissive: new THREE.Color(accentHex),
    emissiveIntensity: 0.65,
    roughness: 0.28
  });
  const accentPin = new THREE.Mesh(new THREE.BoxGeometry(0.065, 0.022, 0.022), accentPinMat);
  accentPin.position.set(-0.095, 0.924, benchD / 2 + 0.016);
  group.add(accentPin);

  return { group, accentPinMat };
}

/**
 * Builds a Sunlit Studio Reference Display ('landscape', 'drafting-split', 'pen-easel', 'broadcast-hood', or 'portrait')
 */
function buildStudioDisplayMonitor(
  tool,
  benchIdx,
  { mode = 'landscape', width = 0.82, height = 0.62 } = {}
) {
  const group = new THREE.Group();
  const inkShellMat = new THREE.MeshStandardMaterial({
    color: 0x181715,
    roughness: 0.42,
    metalness: 0.22
  });
  const brassMat = new THREE.MeshStandardMaterial({
    color: ED_BRASS,
    roughness: 0.3,
    metalness: 0.82
  });
  const bezelMaskMat = new THREE.MeshStandardMaterial({
    color: 0x0e0d0c,
    roughness: 0.35,
    metalness: 0.18
  });

  const texAspect =
    mode === 'portrait' ? 'portrait' : mode === 'drafting-split' ? 'drafting-split' : 'landscape';
  const screenTex = createToolScreenTexture(tool, texAspect, benchIdx);
  const screenMat = new THREE.MeshStandardMaterial({
    map: screenTex,
    emissiveMap: screenTex,
    emissive: new THREE.Color('#fffaf0'),
    emissiveIntensity: 0.3,
    roughness: 0.22,
    metalness: 0.05
  });

  const framePivot = new THREE.Group();
  let screenW = width - 0.09;
  let screenH = height - 0.09;
  let tallyMat = null;

  if (mode === 'drafting-split') {
    // Weighted blackened-ash press plinth + twin machined-brass side trunnion uprights
    const plinth = new THREE.Mesh(new THREE.BoxGeometry(width + 0.08, 0.036, 0.3), inkShellMat);
    plinth.position.set(0, 0.018, 0.0);
    group.add(plinth);

    [-width / 2 - 0.035, width / 2 + 0.035].forEach((tx) => {
      const trunnionPost = new THREE.Mesh(new THREE.BoxGeometry(0.038, 0.44, 0.055), brassMat);
      trunnionPost.position.set(tx, 0.23, -0.02);
      group.add(trunnionPost);

      const knob = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.026, 16), brassMat);
      knob.rotation.z = Math.PI / 2;
      knob.position.set(tx + (tx < 0 ? -0.024 : 0.024), 0.41, -0.02);
      group.add(knob);
    });

    framePivot.position.set(0, 0.42, 0.0);
    framePivot.rotation.x = -0.11;
  } else if (mode === 'pen-easel') {
    // Articulated retouching easel base + angled pen-display chassis + docked stylus
    const easelFoot = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.028, 0.34), inkShellMat);
    easelFoot.position.set(0, 0.014, 0.02);
    group.add(easelFoot);

    const easelRearStrut = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.34, 0.04), brassMat);
    easelRearStrut.position.set(0, 0.17, -0.08);
    easelRearStrut.rotation.x = 0.28;
    group.add(easelRearStrut);

    framePivot.position.set(0, 0.33, 0.03);
    framePivot.rotation.x = -0.32;

    // Docked precision retouching stylus on right side of tablet bezel
    const penBody = new THREE.Mesh(
      new THREE.CylinderGeometry(0.009, 0.007, 0.19, 12),
      inkShellMat
    );
    penBody.position.set(width / 2 + 0.025, 0.02, 0.02);
    penBody.rotation.z = -0.08;
    framePivot.add(penBody);

    const penBrassFerrule = new THREE.Mesh(
      new THREE.CylinderGeometry(0.0095, 0.006, 0.038, 12),
      brassMat
    );
    penBrassFerrule.position.set(width / 2 + 0.018, -0.075, 0.02);
    penBrassFerrule.rotation.z = -0.08;
    framePivot.add(penBrassFerrule);
  } else if (mode === 'portrait') {
    // Weighted circular brass-ringed swivel base + vertical column for 9:16 Shorts Monitor
    const baseDisc = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.22, 0.03, 24), inkShellMat);
    baseDisc.position.set(0, 0.015, 0);
    group.add(baseDisc);

    const brassTrimRing = new THREE.Mesh(new THREE.TorusGeometry(0.205, 0.009, 10, 28), brassMat);
    brassTrimRing.rotation.x = Math.PI / 2;
    brassTrimRing.position.set(0, 0.028, 0);
    group.add(brassTrimRing);

    const neckCol = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.038, 0.44, 16), brassMat);
    neckCol.position.set(0, 0.23, -0.05);
    group.add(neckCol);

    framePivot.position.set(0, 0.46, 0.01);
    framePivot.rotation.x = -0.06;
  } else {
    // Classic studio reference pedestal (ash + brass inlay + cylindrical brass column)
    const basePlate = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.032, 0.28), inkShellMat);
    basePlate.position.set(0, 0.016, 0.01);
    group.add(basePlate);

    const baseBrassLip = new THREE.Mesh(new THREE.BoxGeometry(0.425, 0.012, 0.012), brassMat);
    baseBrassLip.position.set(0, 0.016, 0.152);
    group.add(baseBrassLip);

    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.034, 0.042, 0.16, 16), brassMat);
    neck.position.set(0, 0.1, -0.04);
    group.add(neck);

    framePivot.position.set(0, 0.13 + height / 2, 0.02);
    framePivot.rotation.x = -0.08;
  }

  group.add(framePivot);

  // Outer brushed-brass architectural fillet + matte sumi-ink display housing
  const brassRim = new THREE.Mesh(
    new THREE.BoxGeometry(width + 0.024, height + 0.024, 0.042),
    brassMat
  );
  brassRim.position.set(0, 0, -0.004);
  framePivot.add(brassRim);

  const housing = new THREE.Mesh(new THREE.BoxGeometry(width, height, 0.052), inkShellMat);
  framePivot.add(housing);

  const maskPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(screenW + 0.022, screenH + 0.022),
    bezelMaskMat
  );
  maskPlane.position.set(0, 0, 0.027);
  framePivot.add(maskPlane);

  const screenMesh = new THREE.Mesh(new THREE.PlaneGeometry(screenW, screenH), screenMat);
  screenMesh.position.set(0, 0, 0.031);
  framePivot.add(screenMesh);

  if (mode === 'broadcast-hood') {
    // 3-sided anti-glare director's sun hood + top glowing ON-AIR tally bar
    const hoodDepth = 0.17;
    const hoodMat = new THREE.MeshStandardMaterial({
      color: 0x141312,
      roughness: 0.72,
      metalness: 0.12
    });
    const topBaffle = new THREE.Mesh(new THREE.BoxGeometry(width + 0.03, 0.018, hoodDepth), hoodMat);
    topBaffle.position.set(0, height / 2 + 0.008, hoodDepth / 2 + 0.01);
    framePivot.add(topBaffle);

    [-width / 2 - 0.008, width / 2 + 0.008].forEach((hx) => {
      const sideBaffle = new THREE.Mesh(
        new THREE.BoxGeometry(0.018, height + 0.02, hoodDepth),
        hoodMat
      );
      sideBaffle.position.set(hx, 0, hoodDepth / 2 + 0.01);
      framePivot.add(sideBaffle);
    });

    tallyMat = new THREE.MeshStandardMaterial({
      color: ED_VERMILION,
      emissive: ED_VERMILION,
      emissiveIntensity: 1.25,
      roughness: 0.25
    });
    const tallyBar = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.03, 0.034), tallyMat);
    tallyBar.position.set(0, height / 2 + 0.028, hoodDepth - 0.01);
    framePivot.add(tallyBar);
  }

  return {
    group,
    framePivot,
    screenMesh,
    screenMat,
    screenW,
    screenH,
    tallyMat
  };
}

/**
 * Builds a Propped Physical 3D Studio Output Artifact (Lookbook, SKU Dossier, Storyboard, Reel Case, Ledger, or Polyglot Booklet)
 */
function buildProppedStudioArtifact(tool, artifactFormat = 'lookbook', benchIdx = 0) {
  const group = new THREE.Group();
  let bw = 0.34;
  let bh = 0.44;
  let bd = 0.048;

  if (artifactFormat === 'storyboard') {
    bw = 0.45;
    bh = 0.33;
    bd = 0.038;
  } else if (artifactFormat === 'reel-case') {
    bw = 0.36;
    bh = 0.36;
    bd = 0.046;
  }

  const spineMat = new THREE.MeshStandardMaterial({
    color: artifactFormat === 'reel-case' ? 0xcbd5e1 : 0x181715,
    roughness: artifactFormat === 'reel-case' ? 0.32 : 0.55,
    metalness: artifactFormat === 'reel-case' ? 0.72 : 0.12
  });
  const pageBlockMat = new THREE.MeshStandardMaterial({
    color: 0xf7f1e5,
    roughness: 0.78,
    metalness: 0.02
  });
  const brassMat = new THREE.MeshStandardMaterial({
    color: ED_BRASS,
    roughness: 0.3,
    metalness: 0.82
  });

  // Outer clothbound / aluminum folio shell
  const body = new THREE.Mesh(new THREE.BoxGeometry(bw, bh, bd), spineMat);
  body.position.set(0, bh / 2 + 0.016, 0);
  group.add(body);

  // Cream cotton-rag page block visible along top & right fore-edge
  if (artifactFormat !== 'reel-case') {
    const pageEdge = new THREE.Mesh(
      new THREE.BoxGeometry(bw - 0.024, bh - 0.022, bd + 0.004),
      pageBlockMat
    );
    pageEdge.position.set(0.01, bh / 2 + 0.016, 0);
    group.add(pageEdge);
  }

  // Printed high-contrast cover artwork
  const coverTex = createWorkshopOutputTexture(tool, artifactFormat, benchIdx);
  const coverMat = new THREE.MeshStandardMaterial({
    map: coverTex,
    emissiveMap: coverTex,
    emissive: new THREE.Color('#fffaf0'),
    emissiveIntensity: 0.26,
    roughness: 0.36,
    metalness: 0.04
  });
  const coverPlane = new THREE.Mesh(new THREE.PlaneGeometry(bw - 0.012, bh - 0.012), coverMat);
  coverPlane.position.set(0, bh / 2 + 0.016, bd / 2 + 0.005);
  group.add(coverPlane);

  // Brushed-brass tabletop book easel stand
  const easelBase = new THREE.Mesh(new THREE.BoxGeometry(bw * 0.76, 0.016, bd + 0.09), brassMat);
  easelBase.position.set(0, 0.008, 0.01);
  group.add(easelBase);

  const easelFrontLip = new THREE.Mesh(new THREE.BoxGeometry(bw * 0.76, 0.032, 0.012), brassMat);
  easelFrontLip.position.set(0, 0.022, bd / 2 + 0.048);
  group.add(easelFrontLip);

  group.rotation.x = -0.11;
  return { group, coverMat, bw, bh };
}

/**
 * Builds each of the 7 Bespoke Sunlit Workshop Stations (Bench + Live Studio Display + Bespoke 3D Tool Rig + Output Proof)
 */
function buildWorkshopToolStation(tool, index) {
  const root = new THREE.Group();
  const extraTexMats = [];
  const deskY = 0.96;

  const benchBuilt = buildStudioWorkbenchBase(index, tool.accent);
  root.add(benchBuilt.group);

  const brassMat = new THREE.MeshStandardMaterial({
    color: ED_BRASS,
    roughness: 0.28,
    metalness: 0.82
  });
  const inkMat = new THREE.MeshStandardMaterial({
    color: 0x181715,
    roughness: 0.44,
    metalness: 0.2
  });
  const chromeMat = new THREE.MeshStandardMaterial({
    color: 0xe2e8f0,
    roughness: 0.18,
    metalness: 0.9
  });
  const paperMat = new THREE.MeshStandardMaterial({
    color: 0xfaf6ee,
    roughness: 0.72,
    metalness: 0.02
  });
  const vermilionMat = new THREE.MeshStandardMaterial({
    color: ED_VERMILION,
    roughness: 0.4,
    metalness: 0.1
  });

  let screenMesh = null;
  let screenMat = null;
  let animateIdle = null;

  let camFocus = {
    distDesktop: 2.66,
    distPortrait: 3.62,
    camYDesktop: 1.63,
    camYPortrait: 1.54,
    lookYDesktop: 1.13,
    lookYPortrait: 0.9,
    offsetX: 0
  };

  if (tool.id === 'website-makeover') {
    // =======================================================================
    // BENCH 01: Split-Screen Drafting & Proofing Press
    // =======================================================================
    const mon = buildStudioDisplayMonitor(tool, index, {
      mode: 'drafting-split',
      width: 0.94,
      height: 0.67
    });
    mon.group.position.set(-0.28, deskY, -0.06);
    mon.group.rotation.y = 0.09;
    root.add(mon.group);
    screenMesh = mon.screenMesh;
    screenMat = mon.screenMat;

    // Physical brass guide rails + sliding Before/After divider bar across ONLY the lower split-proof band!
    const railSpanW = mon.screenW - 0.04;
    const bandCenterY = -0.234 * mon.screenH;
    const bandBarH = 0.42 * mon.screenH;

    [-bandBarH / 2 - 0.012, bandBarH / 2 + 0.012].forEach((ry) => {
      const guideRod = new THREE.Mesh(
        new THREE.CylinderGeometry(0.0055, 0.0055, railSpanW + 0.03, 10),
        brassMat
      );
      guideRod.rotation.z = Math.PI / 2;
      guideRod.position.set(0, bandCenterY + ry, 0.042);
      mon.framePivot.add(guideRod);
    });

    const sliderCarriage = new THREE.Group();
    sliderCarriage.position.set(0, bandCenterY, 0.046);
    mon.framePivot.add(sliderCarriage);

    const brassDividerBar = new THREE.Mesh(
      new THREE.BoxGeometry(0.016, bandBarH + 0.034, 0.016),
      brassMat
    );
    sliderCarriage.add(brassDividerBar);

    // Optical glass inspection loupe ring centered on the sliding brass bar
    const loupeRing = new THREE.Mesh(new THREE.TorusGeometry(0.046, 0.008, 12, 24), brassMat);
    loupeRing.position.set(0, 0, 0.008);
    sliderCarriage.add(loupeRing);

    const loupeGlass = new THREE.Mesh(
      new THREE.CircleGeometry(0.042, 20),
      new THREE.MeshStandardMaterial({
        color: 0xe0f2fe,
        transparent: true,
        opacity: 0.28,
        roughness: 0.08,
        metalness: 0.1
      })
    );
    loupeGlass.position.set(0, 0, 0.01);
    sliderCarriage.add(loupeGlass);

    const knurledKnob = new THREE.Mesh(
      new THREE.CylinderGeometry(0.016, 0.016, 0.022, 14),
      vermilionMat
    );
    knurledKnob.rotation.x = Math.PI / 2;
    knurledKnob.position.set(0, -bandBarH / 2 - 0.014, 0.012);
    sliderCarriage.add(knurledKnob);

    // Stepped Proofing Ink-Slab Cradle + Brass & Vermilion Proofing Brayer (roller)
    const slabPlinth = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.045, 0.18), inkMat);
    slabPlinth.position.set(0.28, deskY + 0.022, 0.12);
    slabPlinth.rotation.y = -0.18;
    root.add(slabPlinth);

    const brayerGroup = new THREE.Group();
    brayerGroup.position.set(0.28, deskY + 0.082, 0.12);
    brayerGroup.rotation.set(0.25, -0.32, 0);
    root.add(brayerGroup);

    const rollerDrum = new THREE.Mesh(
      new THREE.CylinderGeometry(0.034, 0.034, 0.19, 18),
      vermilionMat
    );
    rollerDrum.rotation.z = Math.PI / 2;
    brayerGroup.add(rollerDrum);

    const rollerYoke = new THREE.Mesh(new THREE.BoxGeometry(0.21, 0.014, 0.055), brassMat);
    rollerYoke.position.set(0, 0.012, -0.028);
    brayerGroup.add(rollerYoke);

    const rollerHandle = new THREE.Mesh(
      new THREE.CylinderGeometry(0.015, 0.019, 0.13, 14),
      inkMat
    );
    rollerHandle.rotation.x = Math.PI / 2;
    rollerHandle.position.set(0, 0.012, -0.095);
    brayerGroup.add(rollerHandle);

    // Upright Fanned Brand Color Swatch Deck standing between press & lookbook
    const swatchStand = new THREE.Group();
    swatchStand.position.set(0.28, deskY + 0.12, -0.08);
    swatchStand.rotation.x = -0.18;
    root.add(swatchStand);

    const swatchColors = [0x151413, 0xc83e2b, 0x38bdf8, 0xfbbf24, 0xfaf6ee];
    swatchColors.forEach((sc, si) => {
      const card = new THREE.Mesh(
        new THREE.BoxGeometry(0.058, 0.19, 0.006),
        new THREE.MeshStandardMaterial({ color: sc, roughness: 0.45 })
      );
      card.position.set((si - 2) * 0.024, 0.04, si * 0.007);
      card.rotation.z = -(si - 2) * 0.17;
      swatchStand.add(card);
    });

    // Propped Luxury Storefront Lookbook Folio on right
    const folio = buildProppedStudioArtifact(tool, 'lookbook', index);
    folio.group.position.set(0.65, deskY, -0.02);
    folio.group.rotation.y = -0.25;
    extraTexMats.push(folio.coverMat);
    root.add(folio.group);

    animateIdle = (elapsed, isSelected) => {
      const amp = isSelected ? 0.28 : 0.21;
      sliderCarriage.position.x = Math.sin(elapsed * 1.15) * amp;
    };
  } else if (tool.id === 'product-to-launch') {
    // =======================================================================
    // BENCH 02: Tabletop Cyclorama Photo Lightbox Studio
    // =======================================================================
    const mon = buildStudioDisplayMonitor(tool, index, {
      mode: 'landscape',
      width: 0.76,
      height: 0.58
    });
    mon.group.position.set(-0.46, deskY, -0.05);
    mon.group.rotation.y = 0.15;
    root.add(mon.group);
    screenMesh = mon.screenMesh;
    screenMat = mon.screenMat;

    // Mini Curved White Infinity Photo-Sweep Stage at center
    const cycGroup = new THREE.Group();
    cycGroup.position.set(0.12, deskY, 0.0);
    root.add(cycGroup);

    const stageCradle = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.028, 0.44), inkMat);
    stageCradle.position.y = 0.014;
    cycGroup.add(stageCradle);

    const sweepWhiteMat = new THREE.MeshStandardMaterial({
      color: 0xfdfbf7,
      emissive: 0xfff8eb,
      emissiveIntensity: 0.18,
      roughness: 0.65
    });
    const sweepFloor = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.012, 0.34), sweepWhiteMat);
    sweepFloor.position.set(0, 0.032, 0.03);
    cycGroup.add(sweepFloor);

    const sweepBackWall = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.38, 0.016), sweepWhiteMat);
    sweepBackWall.position.set(0, 0.22, -0.185);
    cycGroup.add(sweepBackWall);

    // Seamless cyclorama quarter-pipe cove joining floor to rear backdrop
    const sweepCove = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.08, 0.5, 16, 1, true, Math.PI, Math.PI / 2),
      new THREE.MeshStandardMaterial({
        color: 0xfdfbf7,
        emissive: 0xfff8eb,
        emissiveIntensity: 0.18,
        roughness: 0.65,
        side: THREE.DoubleSide
      })
    );
    sweepCove.rotation.z = Math.PI / 2;
    sweepCove.position.set(0, 0.112, -0.105);
    cycGroup.add(sweepCove);

    // Rotating machined-brass product turntable + amber botanical serum bottle SKU
    const turntable = new THREE.Group();
    turntable.position.set(0, 0.048, 0.01);
    cycGroup.add(turntable);

    const platter = new THREE.Mesh(new THREE.CylinderGeometry(0.095, 0.105, 0.022, 24), brassMat);
    turntable.add(platter);

    const bottleGlass = new THREE.Mesh(
      new THREE.CylinderGeometry(0.042, 0.044, 0.145, 20),
      new THREE.MeshStandardMaterial({
        color: 0xd97706,
        emissive: 0xf59e0b,
        emissiveIntensity: 0.22,
        roughness: 0.16,
        metalness: 0.15
      })
    );
    bottleGlass.position.y = 0.084;
    turntable.add(bottleGlass);

    const bottleLabel = new THREE.Mesh(
      new THREE.CylinderGeometry(0.045, 0.045, 0.068, 20, 1, true, -0.9, 1.8),
      paperMat
    );
    bottleLabel.position.y = 0.08;
    turntable.add(bottleLabel);

    const atomizerCollar = new THREE.Mesh(
      new THREE.CylinderGeometry(0.02, 0.022, 0.036, 16),
      brassMat
    );
    atomizerCollar.position.y = 0.172;
    turntable.add(atomizerCollar);

    // Twin Articulated Studio Softbox Lamps on Brass Arms flanking the cyclorama
    const softboxFaceMat = new THREE.MeshStandardMaterial({
      color: 0xfffef7,
      emissive: 0xfff3d1,
      emissiveIntensity: 1.05,
      roughness: 0.25
    });
    [-0.31, 0.31].forEach((sx) => {
      const armPost = new THREE.Mesh(new THREE.CylinderGeometry(0.011, 0.014, 0.42, 12), brassMat);
      armPost.position.set(sx, 0.21, 0.08);
      armPost.rotation.z = sx < 0 ? -0.14 : 0.14;
      cycGroup.add(armPost);

      const softboxHead = new THREE.Group();
      softboxHead.position.set(sx * 0.86, 0.41, 0.08);
      softboxHead.rotation.y = sx < 0 ? 0.58 : -0.58;
      softboxHead.rotation.x = 0.28;
      cycGroup.add(softboxHead);

      const hood = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.12, 0.08), inkMat);
      softboxHead.add(hood);

      const diffuser = new THREE.Mesh(new THREE.PlaneGeometry(0.142, 0.102), softboxFaceMat);
      diffuser.position.z = 0.042;
      softboxHead.add(diffuser);
    });

    // Foreground Brass 8x Photographer's Inspection Loupe + Tether Cable
    const loupeBody = new THREE.Mesh(
      new THREE.CylinderGeometry(0.038, 0.046, 0.055, 20),
      brassMat
    );
    loupeBody.position.set(-0.14, deskY + 0.028, 0.29);
    root.add(loupeBody);

    root.add(
      buildCableTube(
        [
          [-0.14, deskY + 0.02, 0.06],
          [-0.24, deskY + 0.015, 0.18],
          [-0.38, deskY + 0.02, 0.06]
        ],
        0.008,
        0xc83e2b
      )
    );

    // Propped Bilingual EN/ES SKU Spec Dossier on right
    const skuDossier = buildProppedStudioArtifact(tool, 'sku-dossier', index);
    skuDossier.group.position.set(0.65, deskY, -0.02);
    skuDossier.group.rotation.y = -0.25;
    extraTexMats.push(skuDossier.coverMat);
    root.add(skuDossier.group);

    animateIdle = (elapsed, isSelected) => {
      turntable.rotation.y = elapsed * (isSelected ? 0.85 : 0.5);
      softboxFaceMat.emissiveIntensity = (isSelected ? 1.25 : 0.95) + Math.sin(elapsed * 2.2) * 0.08;
    };
  } else if (tool.id === 'ai-airbrush') {
    // =======================================================================
    // BENCH 03: 3D Orbital Ring-Light & Retouching Easel
    // =======================================================================
    const mon = buildStudioDisplayMonitor(tool, index, {
      mode: 'pen-easel',
      width: 0.78,
      height: 0.58
    });
    mon.group.position.set(-0.43, deskY, 0.02);
    mon.group.rotation.y = 0.13;
    root.add(mon.group);
    screenMesh = mon.screenMesh;
    screenMat = mon.screenMat;

    // Sculpted Matte-Alabaster Portrait Bust inside a 360° Brass Gimbal Ring + Orbiting Light Orb
    const rigGroup = new THREE.Group();
    rigGroup.position.set(0.16, deskY, -0.03);
    root.add(rigGroup);

    const plinth = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.13, 0.045, 24), inkMat);
    plinth.position.y = 0.022;
    rigGroup.add(plinth);

    const bustMat = new THREE.MeshStandardMaterial({
      color: 0xf5efe4,
      roughness: 0.52,
      metalness: 0.03
    });
    const shoulders = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.088, 0.09, 20), bustMat);
    shoulders.position.y = 0.09;
    rigGroup.add(shoulders);

    const neckCol = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.038, 0.06, 16), bustMat);
    neckCol.position.y = 0.155;
    rigGroup.add(neckCol);

    const portraitHead = new THREE.Mesh(new THREE.SphereGeometry(0.078, 24, 24), bustMat);
    portraitHead.scale.set(0.88, 1.12, 0.94);
    portraitHead.position.y = 0.245;
    rigGroup.add(portraitHead);

    // Outer calibrated brass gimbal ring
    const gimbalRing = new THREE.Mesh(new THREE.TorusGeometry(0.21, 0.01, 14, 42), brassMat);
    gimbalRing.position.y = 0.245;
    gimbalRing.rotation.y = 0.25;
    rigGroup.add(gimbalRing);

    const horizonRing = new THREE.Mesh(new THREE.TorusGeometry(0.225, 0.008, 12, 42), brassMat);
    horizonRing.position.y = 0.245;
    horizonRing.rotation.x = Math.PI / 2 - 0.24;
    rigGroup.add(horizonRing);

    // Orbiting 3D Directional Key-Light Orb
    const orbPivot = new THREE.Group();
    orbPivot.position.y = 0.245;
    orbPivot.rotation.z = 0.24;
    rigGroup.add(orbPivot);

    const orbMat = new THREE.MeshStandardMaterial({
      color: 0xe0faff,
      emissive: 0x22d3ee,
      emissiveIntensity: 1.65,
      roughness: 0.12
    });
    const lightOrb = new THREE.Mesh(new THREE.SphereGeometry(0.032, 18, 18), orbMat);
    lightOrb.position.set(0.225, 0, 0);
    orbPivot.add(lightOrb);

    const orbBrassCollar = new THREE.Mesh(
      new THREE.CylinderGeometry(0.022, 0.028, 0.022, 14),
      brassMat
    );
    orbBrassCollar.rotation.z = Math.PI / 2;
    orbBrassCollar.position.set(0.242, 0, 0);
    orbPivot.add(orbBrassCollar);

    // Chrome Gravity-Feed Precision Airbrush in Elevated Brass Gooseneck Stand + Braided Hose
    const airbrushStand = new THREE.Mesh(new THREE.CylinderGeometry(0.042, 0.052, 0.04, 16), inkMat);
    airbrushStand.position.set(-0.04, deskY + 0.02, 0.16);
    root.add(airbrushStand);

    const standStem = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.01, 0.13, 12), brassMat);
    standStem.position.set(-0.04, deskY + 0.095, 0.16);
    root.add(standStem);

    const airbrushGroup = new THREE.Group();
    airbrushGroup.position.set(-0.04, deskY + 0.165, 0.16);
    airbrushGroup.rotation.set(0.12, -0.28, 0.26);
    root.add(airbrushGroup);

    const abBarrel = new THREE.Mesh(
      new THREE.CylinderGeometry(0.01, 0.014, 0.22, 14),
      chromeMat
    );
    abBarrel.rotation.z = Math.PI / 2;
    airbrushGroup.add(abBarrel);

    const gravityCup = new THREE.Mesh(
      new THREE.CylinderGeometry(0.024, 0.01, 0.046, 14),
      chromeMat
    );
    gravityCup.position.set(0.03, 0.03, 0);
    airbrushGroup.add(gravityCup);

    root.add(
      buildCableTube(
        [
          [-0.04, deskY + 0.13, 0.16],
          [-0.08, deskY + 0.018, 0.24],
          [-0.22, deskY + 0.02, 0.18]
        ],
        0.007,
        0x1e293b
      )
    );

    // Propped Portrait Relight Proof Portfolio on right
    const proofFolio = buildProppedStudioArtifact(tool, 'portrait-proof', index);
    proofFolio.group.position.set(0.65, deskY, -0.02);
    proofFolio.group.rotation.y = -0.25;
    extraTexMats.push(proofFolio.coverMat);
    root.add(proofFolio.group);

    animateIdle = (elapsed, isSelected) => {
      orbPivot.rotation.y = elapsed * (isSelected ? 1.15 : 0.72);
      gimbalRing.rotation.y = 0.25 + Math.sin(elapsed * 0.6) * 0.18;
    };
  } else if (tool.id === 'fototecateca') {
    // =======================================================================
    // BENCH 04: Broadcast Director's Monitor & Cinema Rig
    // =======================================================================
    const mon = buildStudioDisplayMonitor(tool, index, {
      mode: 'broadcast-hood',
      width: 0.8,
      height: 0.6
    });
    mon.group.position.set(-0.42, deskY, -0.05);
    mon.group.rotation.y = 0.13;
    root.add(mon.group);
    screenMesh = mon.screenMesh;
    screenMat = mon.screenMat;

    // Compact Cinema Camera & Matte-Box Lens Rig on Elevated Brass Studio Riser
    const camRiser = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.045, 0.24), inkMat);
    camRiser.position.set(0.18, deskY + 0.022, -0.06);
    root.add(camRiser);

    const camRig = new THREE.Group();
    camRig.position.set(0.18, deskY + 0.045, -0.06);
    camRig.rotation.y = -0.24;
    root.add(camRig);

    [-0.042, 0.042].forEach((rx) => {
      const rod = new THREE.Mesh(
        new THREE.CylinderGeometry(0.008, 0.008, 0.34, 10),
        brassMat
      );
      rod.rotation.x = Math.PI / 2;
      rod.position.set(rx, 0.032, 0);
      camRig.add(rod);
    });

    const camBody = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.15, 0.18), inkMat);
    camBody.position.set(0, 0.115, -0.04);
    camRig.add(camBody);

    const topHandle = new THREE.Mesh(new THREE.BoxGeometry(0.032, 0.036, 0.16), brassMat);
    topHandle.position.set(0, 0.205, -0.04);
    camRig.add(topHandle);

    const primeLens = new THREE.Mesh(
      new THREE.CylinderGeometry(0.052, 0.056, 0.11, 20),
      inkMat
    );
    primeLens.rotation.x = Math.PI / 2;
    primeLens.position.set(0, 0.115, 0.09);
    camRig.add(primeLens);

    const focusGearRing = new THREE.Mesh(new THREE.TorusGeometry(0.055, 0.007, 10, 24), brassMat);
    focusGearRing.position.set(0, 0.115, 0.085);
    camRig.add(focusGearRing);

    const matteBox = new THREE.Mesh(new THREE.BoxGeometry(0.17, 0.13, 0.055), inkMat);
    matteBox.position.set(0, 0.115, 0.165);
    camRig.add(matteBox);

    const lensGlass = new THREE.Mesh(
      new THREE.CircleGeometry(0.046, 20),
      new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x1d4ed8,
        emissiveIntensity: 0.35,
        roughness: 0.08,
        metalness: 0.65
      })
    );
    lensGlass.position.set(0, 0.115, 0.194);
    camRig.add(lensGlass);

    // Open Striped Cinema Clapperboard + 3-Dial Director Control Console in foreground
    const clapperGroup = new THREE.Group();
    clapperGroup.position.set(0.02, deskY + 0.125, 0.17);
    clapperGroup.rotation.set(-0.2, 0.22, 0);
    root.add(clapperGroup);

    const slateBoard = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.17, 0.016), inkMat);
    clapperGroup.add(slateBoard);

    const slateStripeBottom = new THREE.Mesh(new THREE.BoxGeometry(0.242, 0.022, 0.018), paperMat);
    slateStripeBottom.position.y = 0.072;
    clapperGroup.add(slateStripeBottom);

    const clapStickPivot = new THREE.Group();
    clapStickPivot.position.set(-0.12, 0.088, 0);
    clapStickPivot.rotation.z = 0.26;
    clapperGroup.add(clapStickPivot);

    const clapStick = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.026, 0.018), inkMat);
    clapStick.position.set(0.12, 0.012, 0);
    clapStickPivot.add(clapStick);

    for (let si = 0; si < 4; si++) {
      const chev = new THREE.Mesh(new THREE.BoxGeometry(0.032, 0.027, 0.02), paperMat);
      chev.position.set(0.04 + si * 0.056, 0.012, 0);
      clapStickPivot.add(chev);
    }

    // 3-Dial Tactile Director Control Puck
    const dialDeck = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.026, 0.11), inkMat);
    dialDeck.position.set(-0.24, deskY + 0.013, 0.29);
    root.add(dialDeck);
    [-0.065, 0, 0.065].forEach((dx) => {
      const dial = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.024, 0.022, 16), brassMat);
      dial.position.set(-0.24 + dx, deskY + 0.034, 0.29);
      root.add(dial);
    });

    // Propped 3-Beat Commercial Storyboard Slate on right
    const storyboard = buildProppedStudioArtifact(tool, 'storyboard', index);
    storyboard.group.position.set(0.62, deskY, 0.01);
    storyboard.group.rotation.y = -0.26;
    extraTexMats.push(storyboard.coverMat);
    root.add(storyboard.group);

    animateIdle = (elapsed, isSelected) => {
      if (mon.tallyMat) {
        mon.tallyMat.emissiveIntensity = (isSelected ? 1.65 : 1.1) + Math.sin(elapsed * 3.2) * 0.35;
      }
      clapStickPivot.rotation.z = 0.22 + Math.abs(Math.sin(elapsed * 1.1)) * (isSelected ? 0.14 : 0.06);
    };
  } else if (tool.id === 'creator-video-pipeline') {
    // =======================================================================
    // BENCH 05: Dual-Reel Telecine Mastering Deck & 9:16 Monitor
    // =======================================================================
    camFocus = {
      distDesktop: 2.74,
      distPortrait: 3.74,
      camYDesktop: 1.65,
      camYPortrait: 1.56,
      lookYDesktop: 1.17,
      lookYPortrait: 0.94,
      offsetX: 0
    };

    const mon = buildStudioDisplayMonitor(tool, index, {
      mode: 'portrait',
      width: 0.5,
      height: 0.82
    });
    mon.group.position.set(-0.5, deskY, -0.02);
    mon.group.rotation.y = 0.16;
    root.add(mon.group);
    screenMesh = mon.screenMesh;
    screenMat = mon.screenMat;

    // Sloped Brushed-Metal & Walnut Dual-Spool Telecine Mastering Deck
    const deckGroup = new THREE.Group();
    deckGroup.position.set(0.08, deskY, -0.01);
    root.add(deckGroup);

    const walnutMat = new THREE.MeshStandardMaterial({
      color: 0x5c3a21,
      roughness: 0.52,
      metalness: 0.06
    });
    const brushedSilverMat = new THREE.MeshStandardMaterial({
      color: 0xd6d3cd,
      roughness: 0.28,
      metalness: 0.72
    });

    const deckChassis = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.14, 0.42), walnutMat);
    deckChassis.position.y = 0.07;
    deckChassis.rotation.x = 0.22;
    deckGroup.add(deckChassis);

    const deckFaceplate = new THREE.Mesh(
      new THREE.BoxGeometry(0.52, 0.02, 0.4),
      brushedSilverMat
    );
    deckFaceplate.position.set(0, 0.142, 0.004);
    deckFaceplate.rotation.x = 0.22;
    deckGroup.add(deckFaceplate);

    // Twin turning metallic mastering reels on the sloped deck faceplate
    const reelSpools = [];
    [-0.135, 0.135].forEach((rx) => {
      const spool = new THREE.Group();
      spool.position.set(rx, 0.164, -0.045);
      spool.rotation.x = 0.22;
      deckGroup.add(spool);

      const flangeBottom = new THREE.Mesh(
        new THREE.CylinderGeometry(0.105, 0.105, 0.006, 24),
        chromeMat
      );
      spool.add(flangeBottom);

      const tapePack = new THREE.Mesh(
        new THREE.CylinderGeometry(0.078, 0.078, 0.018, 20),
        inkMat
      );
      tapePack.position.y = 0.011;
      spool.add(tapePack);

      const flangeTop = new THREE.Mesh(
        new THREE.CylinderGeometry(0.105, 0.105, 0.005, 24),
        chromeMat
      );
      flangeTop.position.y = 0.022;
      spool.add(flangeTop);

      // 3 visual spokes across top flange so gentle reel rotation is unmistakably readable!
      [0, (Math.PI * 2) / 3, (Math.PI * 4) / 3].forEach((ang) => {
        const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.19, 0.007, 0.018), brassMat);
        spoke.position.y = 0.025;
        spoke.rotation.y = ang;
        spool.add(spoke);
      });

      const centerCap = new THREE.Mesh(
        new THREE.CylinderGeometry(0.022, 0.022, 0.032, 16),
        vermilionMat
      );
      centerCap.position.y = 0.02;
      spool.add(centerCap);

      reelSpools.push(spool);
    });

    // Warm backlit dual VU meters + tactile transport keys along front of deck
    [-0.12, 0.0].forEach((vx) => {
      const vuMeter = new THREE.Mesh(
        new THREE.BoxGeometry(0.095, 0.014, 0.048),
        new THREE.MeshStandardMaterial({
          color: 0xfef3c7,
          emissive: 0xf59e0b,
          emissiveIntensity: 0.75,
          roughness: 0.2
        })
      );
      vuMeter.position.set(vx, 0.122, 0.135);
      vuMeter.rotation.x = 0.22;
      deckGroup.add(vuMeter);
    });

    for (let k = 0; k < 4; k++) {
      const key = new THREE.Mesh(
        new THREE.BoxGeometry(0.028, 0.018, 0.042),
        k === 1 ? vermilionMat : inkMat
      );
      key.position.set(0.1 + k * 0.038, 0.122, 0.14);
      key.rotation.x = 0.22;
      deckGroup.add(key);
    }

    // Studio Broadcast Voiceover Mic + Pop Filter on Brass Boom Arm (clear of 9:16 screen!)
    const boomBase = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.055, 0.035, 16), inkMat);
    boomBase.position.set(-0.2, deskY + 0.018, -0.26);
    root.add(boomBase);

    const boomLower = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.012, 0.42, 10), brassMat);
    boomLower.position.set(-0.2, deskY + 0.22, -0.24);
    boomLower.rotation.z = -0.18;
    root.add(boomLower);

    const boomUpper = new THREE.Mesh(new THREE.CylinderGeometry(0.009, 0.01, 0.3, 10), brassMat);
    boomUpper.position.set(-0.11, deskY + 0.44, -0.14);
    boomUpper.rotation.x = 0.72;
    root.add(boomUpper);

    const micBody = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.026, 0.13, 16), inkMat);
    micBody.position.set(-0.11, deskY + 0.4, -0.02);
    root.add(micBody);

    const micGrille = new THREE.Mesh(new THREE.SphereGeometry(0.028, 16, 16), brassMat);
    micGrille.position.set(-0.11, deskY + 0.33, -0.02);
    root.add(micGrille);

    const popFilter = new THREE.Mesh(
      new THREE.CylinderGeometry(0.052, 0.052, 0.008, 20),
      inkMat
    );
    popFilter.rotation.x = Math.PI / 2;
    popFilter.position.set(-0.11, deskY + 0.35, 0.045);
    root.add(popFilter);

    // Propped Anodized 1080p Master Reel Tin on right
    const reelCase = buildProppedStudioArtifact(tool, 'reel-case', index);
    reelCase.group.position.set(0.64, deskY, 0.02);
    reelCase.group.rotation.y = -0.24;
    extraTexMats.push(reelCase.coverMat);
    root.add(reelCase.group);

    animateIdle = (elapsed, isSelected) => {
      const speed = isSelected ? 1.15 : 0.65;
      reelSpools.forEach((sp) => {
        sp.rotation.y = -elapsed * speed;
      });
    };
  } else if (tool.id === 'dropshipping-made-easy') {
    // =======================================================================
    // BENCH 06: Precision Brass Balance Scale & Margin Terminal
    // =======================================================================
    const mon = buildStudioDisplayMonitor(tool, index, {
      mode: 'landscape',
      width: 0.78,
      height: 0.6
    });
    mon.group.position.set(-0.43, deskY, -0.05);
    mon.group.rotation.y = 0.13;
    root.add(mon.group);
    screenMesh = mon.screenMesh;
    screenMat = mon.screenMat;

    // Sculpted Twin-Pan Precision Brass Balance Scale
    const scaleGroup = new THREE.Group();
    scaleGroup.position.set(0.14, deskY, -0.01);
    root.add(scaleGroup);

    const scalePlinth = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.042, 0.18), inkMat);
    scalePlinth.position.y = 0.021;
    scaleGroup.add(scalePlinth);

    const scaleBrassStep = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.022, 0.14), brassMat);
    scaleBrassStep.position.y = 0.052;
    scaleGroup.add(scaleBrassStep);

    const scalePillar = new THREE.Mesh(
      new THREE.CylinderGeometry(0.016, 0.024, 0.38, 16),
      brassMat
    );
    scalePillar.position.y = 0.25;
    scaleGroup.add(scalePillar);

    const scaleFinial = new THREE.Mesh(new THREE.SphereGeometry(0.024, 16, 16), brassMat);
    scaleFinial.position.y = 0.455;
    scaleGroup.add(scaleFinial);

    // Pivoting weigh-beam + counter-rotating plumb pans
    const beamPivot = new THREE.Group();
    beamPivot.position.y = 0.42;
    scaleGroup.add(beamPivot);

    const beamBar = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.016, 0.018), brassMat);
    beamPivot.add(beamBar);

    const pointerNeedle = new THREE.Mesh(
      new THREE.ConeGeometry(0.012, 0.1, 10),
      vermilionMat
    );
    pointerNeedle.rotation.x = Math.PI;
    pointerNeedle.position.y = -0.055;
    beamPivot.add(pointerNeedle);

    const panGroups = [];
    [-0.195, 0.195].forEach((px, pi) => {
      const panHanger = new THREE.Group();
      panHanger.position.set(px, 0, 0);
      beamPivot.add(panHanger);

      // 3 suspension chains down to brass pan
      [-0.04, 0.04].forEach((cz) => {
        const chain = new THREE.Mesh(
          new THREE.CylinderGeometry(0.0025, 0.0025, 0.19, 8),
          brassMat
        );
        chain.position.set(0, -0.095, cz);
        chain.rotation.x = cz < 0 ? -0.2 : 0.2;
        panHanger.add(chain);
      });

      const dish = new THREE.Mesh(new THREE.CylinderGeometry(0.082, 0.068, 0.016, 22), brassMat);
      dish.position.y = -0.19;
      panHanger.add(dish);

      if (pi === 0) {
        // Left Pan: Miniature Kraft Corrugated SKU Parcel Box
        const skuBox = new THREE.Mesh(
          new THREE.BoxGeometry(0.092, 0.082, 0.092),
          new THREE.MeshStandardMaterial({ color: 0xc59b6d, roughness: 0.78 })
        );
        skuBox.position.y = -0.142;
        skuBox.rotation.y = 0.25;
        panHanger.add(skuBox);

        const tapeStrip = new THREE.Mesh(
          new THREE.BoxGeometry(0.094, 0.084, 0.022),
          vermilionMat
        );
        tapeStrip.position.y = -0.142;
        tapeStrip.rotation.y = 0.25;
        panHanger.add(tapeStrip);
      } else {
        // Right Pan: 3 Graduated Cylindrical Brass Margin Weights
        [
          [-0.026, 0.024, 0.054],
          [0.024, 0.019, 0.042],
          [0.004, 0.014, 0.03]
        ].forEach(([wx, wr, wh], wi) => {
          const weight = new THREE.Mesh(new THREE.CylinderGeometry(wr, wr, wh, 16), brassMat);
          weight.position.set(wx, -0.182 + wh / 2, wi === 2 ? 0.026 : -0.01);
          panHanger.add(weight);
        });
      }

      panGroups.push(panHanger);
    });

    // Angled Tactile Mechanical Profit Keypad + Upright ROAS Ledger Tape Dispenser
    const keypadGroup = new THREE.Group();
    keypadGroup.position.set(-0.04, deskY + 0.055, 0.16);
    keypadGroup.rotation.set(0.42, 0.12, 0);
    root.add(keypadGroup);

    const keypadCase = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.032, 0.15), inkMat);
    keypadGroup.add(keypadCase);

    for (let kr = 0; kr < 3; kr++) {
      for (let kc = 0; kc < 3; kc++) {
        const keycap = new THREE.Mesh(
          new THREE.BoxGeometry(0.038, 0.018, 0.034),
          kr === 2 && kc === 2 ? vermilionMat : paperMat
        );
        keycap.position.set(-0.046 + kc * 0.046, 0.022, -0.04 + kr * 0.04);
        keypadGroup.add(keycap);
      }
    }

    const tapeStand = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.04, 0.09), brassMat);
    tapeStand.position.set(0.32, deskY + 0.02, 0.15);
    root.add(tapeStand);

    const tapeRoll = new THREE.Mesh(new THREE.CylinderGeometry(0.042, 0.042, 0.075, 18), paperMat);
    tapeRoll.rotation.z = Math.PI / 2;
    tapeRoll.position.set(0.32, deskY + 0.072, 0.15);
    root.add(tapeRoll);

    // Propped Unit-Economics & ROAS Hardcover Ledger on right
    const ledger = buildProppedStudioArtifact(tool, 'roas-ledger', index);
    ledger.group.position.set(0.65, deskY, -0.02);
    ledger.group.rotation.y = -0.25;
    extraTexMats.push(ledger.coverMat);
    root.add(ledger.group);

    animateIdle = (elapsed, isSelected) => {
      const tilt = Math.sin(elapsed * 1.05) * (isSelected ? 0.075 : 0.042);
      beamPivot.rotation.z = tilt;
      panGroups.forEach((pg) => {
        pg.rotation.z = -tilt;
      });
    };
  } else {
    // =======================================================================
    // BENCH 07: Multilingual Typesetting Bench & Brass Caliper
    // =======================================================================
    const mon = buildStudioDisplayMonitor(tool, index, {
      mode: 'landscape',
      width: 0.78,
      height: 0.6
    });
    mon.group.position.set(-0.43, deskY, -0.05);
    mon.group.rotation.y = 0.13;
    root.add(mon.group);
    screenMesh = mon.screenMesh;
    screenMat = mon.screenMat;

    // Tabletop Cartographic Parchment & Brass-Meridian Architectural Globe
    const globeGroup = new THREE.Group();
    globeGroup.position.set(0.12, deskY, -0.11);
    root.add(globeGroup);

    const globeBase = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.105, 0.038, 22), inkMat);
    globeBase.position.y = 0.019;
    globeGroup.add(globeBase);

    const globeStem = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.022, 0.08, 14), brassMat);
    globeStem.position.y = 0.072;
    globeGroup.add(globeStem);

    const meridianRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.158, 0.009, 12, 36, Math.PI * 1.18),
      brassMat
    );
    meridianRing.position.y = 0.255;
    meridianRing.rotation.z = -Math.PI * 0.58;
    globeGroup.add(meridianRing);

    const globeAxis = new THREE.Group();
    globeAxis.position.y = 0.255;
    globeAxis.rotation.z = 0.38;
    globeGroup.add(globeAxis);

    const globeSphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.14, 28, 24),
      new THREE.MeshStandardMaterial({
        map: createGlobeParchmentTexture(),
        roughness: 0.58,
        metalness: 0.05
      })
    );
    globeAxis.add(globeSphere);

    // Angled Wooden Letterpress Movable-Type Composing Tray ('Aa / Ññ / あ / ع') + Brass Caliper
    const trayGroup = new THREE.Group();
    trayGroup.position.set(0.15, deskY + 0.095, 0.14);
    trayGroup.rotation.set(0.58, -0.08, 0);
    root.add(trayGroup);

    const trayBox = new THREE.Mesh(
      new THREE.BoxGeometry(0.4, 0.032, 0.2),
      new THREE.MeshStandardMaterial({ color: 0x3b2a1e, roughness: 0.62 })
    );
    trayGroup.add(trayBox);

    const trayTop = new THREE.Mesh(
      new THREE.PlaneGeometry(0.38, 0.18),
      new THREE.MeshStandardMaterial({
        map: createTypeTrayTexture(),
        roughness: 0.48
      })
    );
    trayTop.rotation.x = -Math.PI / 2;
    trayTop.position.set(0, 0.018, 0);
    trayGroup.add(trayTop);

    // Machined Brass Vernier Caliper gauging UI string-width expansion across top of type tray
    const caliperGroup = new THREE.Group();
    caliperGroup.position.set(0, 0.024, -0.085);
    trayGroup.add(caliperGroup);

    const caliperBeam = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.01, 0.022), brassMat);
    caliperGroup.add(caliperBeam);

    const fixedJaw = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.014, 0.078), brassMat);
    fixedJaw.position.set(-0.145, 0, 0.028);
    caliperGroup.add(fixedJaw);

    const slidingJaw = new THREE.Mesh(new THREE.BoxGeometry(0.028, 0.018, 0.078), brassMat);
    slidingJaw.position.set(0.02, 0.002, 0.028);
    caliperGroup.add(slidingJaw);

    // Propped Multilingual Proof Compendium on right
    const polyBook = buildProppedStudioArtifact(tool, 'polyglot-booklet', index);
    polyBook.group.position.set(0.65, deskY, -0.02);
    polyBook.group.rotation.y = -0.25;
    extraTexMats.push(polyBook.coverMat);
    root.add(polyBook.group);

    animateIdle = (elapsed, isSelected) => {
      globeSphere.rotation.y = elapsed * (isSelected ? 0.55 : 0.28);
      slidingJaw.position.x = 0.015 + Math.sin(elapsed * 1.1) * 0.036;
    };
  }

  // Subtle sunlit vermilion-brass registration floor mat beneath each Workshop station
  const glowRing = new THREE.Mesh(
    new THREE.PlaneGeometry(2.04, 1.46),
    new THREE.MeshBasicMaterial({
      color: new THREE.Color(ED_VERMILION),
      transparent: true,
      opacity: 0.1
    })
  );
  glowRing.rotation.x = -Math.PI / 2;
  glowRing.position.set(0, 0.014, 0.06);
  root.add(glowRing);

  // Unified raycast hit volume covering workbench, live screen, 3D tool hardware, and propped output proof
  const hitMesh = new THREE.Mesh(
    new THREE.BoxGeometry(2.08, 2.15, 1.32),
    new THREE.MeshBasicMaterial({ visible: false })
  );
  hitMesh.position.set(0, 1.15, 0.05);
  hitMesh.userData = {
    hitType: 'tool',
    index,
    id: tool.id
  };
  root.add(hitMesh);

  screenMesh.userData = {
    hitType: 'tool-screen',
    index,
    id: tool.id
  };

  return {
    root,
    screenMesh,
    hitMesh,
    glowRing,
    trimMat: benchBuilt.accentPinMat,
    screenMat,
    extraTexMats,
    camFocus,
    animateIdle
  };
}

/**
 * Populates the Sunlit Design & Maker's Workshop Environment (x < 0):
 * Woven Belgian linen studio runner, pale Nordic birch vertical slat & warm plaster wall,
 * studio tool/swatch pegboards & shelves, sunlit north-light return wall at x = -21.5,
 * overhead track lighting + skylight shafts, and Hub-visible Entry Drafting Table with Commission Brief!
 */
function buildWorkshopEnvironment(workshopGroup, interactiveObjects) {
  const ashMat = new THREE.MeshStandardMaterial({
    color: 0x1b1917,
    roughness: 0.48,
    metalness: 0.16
  });
  const birchMatA = new THREE.MeshStandardMaterial({
    color: 0xe3d1b4,
    roughness: 0.58,
    metalness: 0.04
  });
  const birchMatB = new THREE.MeshStandardMaterial({
    color: 0xd6c09d,
    roughness: 0.62,
    metalness: 0.04
  });
  const brassMat = new THREE.MeshStandardMaterial({
    color: ED_BRASS,
    roughness: 0.3,
    metalness: 0.8
  });
  const plasterWallMat = new THREE.MeshStandardMaterial({
    color: 0xf4eee2,
    roughness: 0.85,
    metalness: 0.02
  });

  // 1. Woven Belgian Linen & Vermilion-Bordered Studio Runner spanning the Workshop
  const runnerMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(20.4, 4.4),
    new THREE.MeshStandardMaterial({
      map: createWorkshopRunnerTexture(),
      roughness: 0.88,
      metalness: 0.02
    })
  );
  runnerMesh.rotation.x = -Math.PI / 2;
  runnerMesh.position.set(-10.85, 0.008, -0.35);
  workshopGroup.add(runnerMesh);

  // 2. Warm Cotton-Plaster Backing + Pale Nordic Birch Vertical Architectural Slat Wall (z = -3.82)
  const plasterBacking = new THREE.Mesh(
    new THREE.BoxGeometry(20.6, 4.5, 0.08),
    plasterWallMat
  );
  plasterBacking.position.set(-10.9, 2.35, -3.88);
  workshopGroup.add(plasterBacking);

  for (let sx = -0.8; sx >= -21.0; sx -= 0.24) {
    const slat = new THREE.Mesh(
      new THREE.BoxGeometry(0.135, 4.42, 0.05),
      Math.round(Math.abs(sx) * 10) % 2 === 0 ? birchMatA : birchMatB
    );
    slat.position.set(sx, 2.35, -3.82);
    workshopGroup.add(slat);
  }

  // Top & Bottom blackened-ash + brushed-brass datum trim rails
  [0.14, 4.58].forEach((ty) => {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(20.7, 0.085, 0.14), ashMat);
    rail.position.set(-10.9, ty, -3.82);
    workshopGroup.add(rail);

    const brassFillet = new THREE.Mesh(new THREE.BoxGeometry(20.72, 0.02, 0.15), brassMat);
    brassFillet.position.set(-10.9, ty + (ty > 2 ? -0.045 : 0.045), -3.82);
    workshopGroup.add(brassFillet);
  });

  // Sunlit Studio End Return Wall with Glowing Frosted North-Light Clerestory Windows at x = -21.5
  const returnWall = new THREE.Mesh(new THREE.BoxGeometry(0.14, 6.2, 8.6), plasterWallMat);
  returnWall.position.set(-21.5, 3.1, -0.6);
  workshopGroup.add(returnWall);

  const skylightGlassMat = new THREE.MeshStandardMaterial({
    color: 0xfffcf5,
    emissive: 0xfff5dc,
    emissiveIntensity: 0.72,
    roughness: 0.22
  });
  [-2.2, 0.2].forEach((wz) => {
    const windowFrame = new THREE.Mesh(new THREE.BoxGeometry(0.18, 2.6, 1.9), ashMat);
    windowFrame.position.set(-21.44, 3.35, wz);
    workshopGroup.add(windowFrame);

    const frostedPane = new THREE.Mesh(new THREE.PlaneGeometry(1.74, 2.42), skylightGlassMat);
    frostedPane.rotation.y = Math.PI / 2;
    frostedPane.position.set(-21.34, 3.35, wz);
    workshopGroup.add(frostedPane);
  });

  // 3. Studio Tool & Swatch Pegboards + Floating Birch Folio Shelves
  const pegMat = new THREE.MeshStandardMaterial({
    map: createStudioPegboardTexture(),
    roughness: 0.68,
    metalness: 0.08
  });
  const slipcaseColors = [0xfaf6ee, 0xc83e2b, 0x181715, 0xd4b47c, 0x38bdf8, 0xe7dfd1];
  const shelfCenters = [-2.45, -7.6, -13.1, -18.0];

  shelfCenters.forEach((scx, si) => {
    const pegFrame = new THREE.Mesh(new THREE.BoxGeometry(2.86, 1.4, 0.04), ashMat);
    pegFrame.position.set(scx, 2.85, -3.75);
    workshopGroup.add(pegFrame);

    const pegBoard = new THREE.Mesh(new THREE.BoxGeometry(2.78, 1.32, 0.05), pegMat);
    pegBoard.position.set(scx, 2.85, -3.73);
    workshopGroup.add(pegBoard);

    // Floating Nordic birch shelf above pegboard holding linen archival slipcases & color binders
    const shelfPlank = new THREE.Mesh(new THREE.BoxGeometry(2.9, 0.065, 0.36), birchMatA);
    shelfPlank.position.set(scx, 3.62, -3.62);
    workshopGroup.add(shelfPlank);

    for (let bi = 0; bi < 5; bi++) {
      const col = slipcaseColors[(si * 2 + bi) % slipcaseColors.length];
      const slipcase = new THREE.Mesh(
        new THREE.BoxGeometry(0.22, 0.35 + (bi % 2) * 0.05, 0.18),
        new THREE.MeshStandardMaterial({ color: col, roughness: 0.58 })
      );
      slipcase.position.set(scx - 1.0 + bi * 0.48, 3.83, -3.6);
      slipcase.rotation.y = (bi - 2) * 0.05;
      workshopGroup.add(slipcase);
    }

    // Hung Brass T-Square Ruler & Color Swatch Ring on each Studio Pegboard
    const tSquareBlade = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.62, 0.016), brassMat);
    tSquareBlade.position.set(scx - 0.76, 2.84, -3.68);
    workshopGroup.add(tSquareBlade);

    const tSquareHead = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.052, 0.024), ashMat);
    tSquareHead.position.set(scx - 0.76, 3.14, -3.67);
    workshopGroup.add(tSquareHead);

    const swatchRing = new THREE.Mesh(new THREE.TorusGeometry(0.11, 0.018, 10, 24), brassMat);
    swatchRing.position.set(scx + 0.72, 2.94, -3.68);
    workshopGroup.add(swatchRing);

    const hungCard = new THREE.Mesh(
      new THREE.BoxGeometry(0.22, 0.16, 0.02),
      new THREE.MeshStandardMaterial({ color: ED_VERMILION, roughness: 0.45 })
    );
    hungCard.position.set(scx + 0.04, 2.86, -3.68);
    workshopGroup.add(hungCard);
  });

  // 4. Hub-Visible Workshop Entry Drafting Table & Commission Brief Stand (at x = -2.45, z = -1.65)
  const entryDrafting = new THREE.Group();
  entryDrafting.position.set(-2.45, 0, -1.65);
  entryDrafting.rotation.y = 0.14;
  workshopGroup.add(entryDrafting);

  const draftBase = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.86, 0.78), ashMat);
  draftBase.position.y = 0.43;
  entryDrafting.add(draftBase);

  const draftTop = new THREE.Mesh(new THREE.BoxGeometry(2.18, 0.07, 0.84), birchMatA);
  draftTop.position.y = 0.895;
  entryDrafting.add(draftTop);

  const draftBrassEdge = new THREE.Mesh(new THREE.BoxGeometry(2.19, 0.02, 0.016), brassMat);
  draftBrassEdge.position.set(0, 0.895, 0.422);
  entryDrafting.add(draftBrassEdge);

  const draftMat = new THREE.Mesh(
    new THREE.PlaneGeometry(1.94, 0.68),
    new THREE.MeshStandardMaterial({
      map: createStudioCuttingMatTexture(0),
      roughness: 0.78
    })
  );
  draftMat.rotation.x = -Math.PI / 2;
  draftMat.position.set(0, 0.932, 0.01);
  entryDrafting.add(draftMat);

  // Articulated Brushed-Brass Architect's Swing-Arm Daylight Lamp on right of Entry Table
  const lampFoot = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.13, 0.036, 18), brassMat);
  lampFoot.position.set(0.72, 0.948, -0.08);
  entryDrafting.add(lampFoot);

  const lampLowerArm = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.014, 0.38, 10), brassMat);
  lampLowerArm.position.set(0.76, 1.13, -0.1);
  lampLowerArm.rotation.z = -0.22;
  entryDrafting.add(lampLowerArm);

  const lampUpperArm = new THREE.Mesh(new THREE.CylinderGeometry(0.011, 0.012, 0.34, 10), brassMat);
  lampUpperArm.position.set(0.66, 1.34, -0.02);
  lampUpperArm.rotation.z = 0.56;
  entryDrafting.add(lampUpperArm);

  const lampShade = new THREE.Mesh(
    new THREE.ConeGeometry(0.12, 0.14, 18, 1, true),
    new THREE.MeshStandardMaterial({
      color: 0xfaf6ee,
      roughness: 0.42,
      side: THREE.DoubleSide
    })
  );
  lampShade.position.set(0.52, 1.38, 0.04);
  lampShade.rotation.z = 0.25;
  entryDrafting.add(lampShade);

  const daylightBulb = new THREE.Mesh(
    new THREE.SphereGeometry(0.052, 14, 14),
    new THREE.MeshStandardMaterial({
      color: 0xfffef8,
      emissive: 0xfff5d6,
      emissiveIntensity: 1.9,
      roughness: 0.15
    })
  );
  daylightBulb.position.set(0.52, 1.33, 0.04);
  entryDrafting.add(daylightBulb);

  // Stacked lookbook folios + vermilion swatch deck at center of Entry Drafting Table
  [0xfaf6ee, 0x181715, 0xc83e2b].forEach((fc, fi) => {
    const book = new THREE.Mesh(
      new THREE.BoxGeometry(0.36, 0.042, 0.26),
      new THREE.MeshStandardMaterial({ color: fc, roughness: 0.52 })
    );
    book.position.set(0.14, 0.955 + fi * 0.044, 0.04);
    book.rotation.y = (fi - 1) * 0.09;
    entryDrafting.add(book);
  });

  // Clickable Archival Cream Commission Brief Clipboard on left of Entry Drafting Table
  const clipboardGroup = new THREE.Group();
  clipboardGroup.position.set(-0.56, 1.18, 0.04);
  clipboardGroup.rotation.set(-0.58, 0.18, 0.04);
  entryDrafting.add(clipboardGroup);

  const clipBoardBack = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.74, 0.03), ashMat);
  clipboardGroup.add(clipBoardBack);

  const clipSheetTex = createCommissionDossierTexture();
  const briefSheetMat = new THREE.MeshStandardMaterial({
    map: clipSheetTex,
    emissiveMap: clipSheetTex,
    emissive: new THREE.Color('#fffaf0'),
    emissiveIntensity: 0.42,
    roughness: 0.36
  });
  const clipSheet = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.66), briefSheetMat);
  clipSheet.position.z = 0.018;
  clipboardGroup.add(clipSheet);

  const clipMetal = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.06, 0.048), brassMat);
  clipMetal.position.set(0, 0.32, 0.026);
  clipboardGroup.add(clipMetal);

  const clipboardHit = new THREE.Mesh(
    new THREE.BoxGeometry(0.76, 0.9, 0.32),
    new THREE.MeshBasicMaterial({ visible: false })
  );
  clipboardHit.userData = { hitType: 'clipboard-brief' };
  clipboardGroup.add(clipboardHit);
  interactiveObjects.unshift(clipboardHit);

  const entryWingHit = new THREE.Mesh(
    new THREE.BoxGeometry(2.6, 2.4, 1.3),
    new THREE.MeshBasicMaterial({ visible: false })
  );
  entryWingHit.position.set(0, 1.2, 0);
  entryWingHit.userData = { hitType: 'wing-tools' };
  entryDrafting.add(entryWingHit);
  interactiveObjects.push(entryWingHit);

  // 5. Overhead Studio Track-Lighting Rail & Translucent Sunlit Skylight Beams (x = -1.6..-19.4)
  const trackRail = new THREE.Mesh(new THREE.BoxGeometry(19.6, 0.048, 0.055), ashMat);
  trackRail.position.set(-10.5, 5.65, -2.1);
  workshopGroup.add(trackRail);

  const spotBulbMat = new THREE.MeshStandardMaterial({
    color: 0xfffef8,
    emissive: 0xfff4d6,
    emissiveIntensity: 1.85,
    roughness: 0.16
  });

  for (let lx = -2.0; lx >= -19.2; lx -= 2.45) {
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.34, 8), brassMat);
    stem.position.set(lx, 5.47, -2.1);
    workshopGroup.add(stem);

    const spotCan = new THREE.Mesh(
      new THREE.CylinderGeometry(0.075, 0.095, 0.22, 16),
      new THREE.MeshStandardMaterial({ color: 0xfaf6ee, roughness: 0.42 })
    );
    spotCan.position.set(lx, 5.24, -2.06);
    spotCan.rotation.x = 0.28;
    workshopGroup.add(spotCan);

    const spotLens = new THREE.Mesh(new THREE.CircleGeometry(0.082, 16), spotBulbMat);
    spotLens.position.set(lx, 5.13, -2.02);
    spotLens.rotation.x = Math.PI / 2 + 0.28;
    workshopGroup.add(spotLens);
  }

  // Soft diagonal sunlit north-skylight shafts in the upper studio air
  const sunBeamMat = new THREE.MeshBasicMaterial({
    color: 0xfffbf0,
    transparent: true,
    opacity: 0.042,
    depthWrite: false,
    side: THREE.DoubleSide
  });
  [-4.8, -10.8, -16.8].forEach((bx) => {
    const beam = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 5.4), sunBeamMat);
    beam.position.set(bx, 4.35, -2.25);
    beam.rotation.z = -0.22;
    beam.rotation.y = 0.18;
    workshopGroup.add(beam);
  });

  return { briefSheetMat };
}

function buildCableTube(points, radius = 0.011, color = 0x181b22) {
  const curve = new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(p[0], p[1], p[2])));
  const geo = new THREE.TubeGeometry(curve, 24, radius, 8, false);
  const mat = new THREE.MeshStandardMaterial({
    color,
    roughness: 0.55,
    metalness: 0.15
  });
  return new THREE.Mesh(geo, mat);
}

/**
 * Sturdy Garage Workbench Table (heavy powder-coated steel frame + warm butcher-block oak top at y = 0.96)
 */
function buildWorkbenchBase(index, accentHex) {
  const group = new THREE.Group();
  const benchW = 1.88;
  const benchD = 1.04;
  const topH = 0.075;
  const topCenterY = 0.96 - topH / 2;

  const steelMat = new THREE.MeshStandardMaterial({
    color: 0x1c2029,
    roughness: 0.48,
    metalness: 0.68
  });
  const oakMat = new THREE.MeshStandardMaterial({
    color: 0x8b5e38,
    roughness: 0.62,
    metalness: 0.06
  });
  const darkTrimMat = new THREE.MeshStandardMaterial({
    color: 0x12151c,
    roughness: 0.45,
    metalness: 0.4
  });

  // Butcher-block wooden worktop (top surface sits at exact y = 0.96)
  const tabletop = new THREE.Mesh(new THREE.BoxGeometry(benchW, topH, benchD), oakMat);
  tabletop.position.set(0, topCenterY, 0);
  group.add(tabletop);

  // Protective dark steel front & side apron under tabletop
  const apron = new THREE.Mesh(
    new THREE.BoxGeometry(benchW - 0.08, 0.07, benchD - 0.08),
    steelMat
  );
  apron.position.set(0, 0.855, 0);
  group.add(apron);

  // 4 Square-tube steel garage bench legs
  const legPositions = [
    [-benchW / 2 + 0.09, -benchD / 2 + 0.09],
    [benchW / 2 - 0.09, -benchD / 2 + 0.09],
    [-benchW / 2 + 0.09, benchD / 2 - 0.09],
    [benchW / 2 - 0.09, benchD / 2 - 0.09]
  ];
  legPositions.forEach(([lx, lz]) => {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.065, 0.88, 0.065), steelMat);
    leg.position.set(lx, 0.44, lz);
    group.add(leg);
  });

  // Lower storage shelf + surge-protector power strip with warm glowing rocker switch
  const lowerShelf = new THREE.Mesh(
    new THREE.BoxGeometry(benchW - 0.2, 0.035, benchD - 0.24),
    darkTrimMat
  );
  lowerShelf.position.set(0, 0.24, -0.02);
  group.add(lowerShelf);

  const powerStrip = new THREE.Mesh(
    new THREE.BoxGeometry(0.38, 0.04, 0.09),
    new THREE.MeshStandardMaterial({ color: 0xd6d3cd, roughness: 0.5 })
  );
  powerStrip.position.set(-0.48, 0.275, 0.16);
  group.add(powerStrip);

  const rockerSwitch = new THREE.Mesh(
    new THREE.BoxGeometry(0.035, 0.018, 0.028),
    new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xf59e0b,
      emissiveIntensity: 1.2
    })
  );
  rockerSwitch.position.set(-0.61, 0.298, 0.16);
  group.add(rockerSwitch);

  // Small brushed-metal station number plate on front edge of butcher block
  const badgePlate = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.045, 0.016), darkTrimMat);
  badgePlate.position.set(0, topCenterY, benchD / 2 + 0.006);
  group.add(badgePlate);

  const badgeAccentDot = new THREE.Mesh(
    new THREE.SphereGeometry(0.011, 10, 10),
    new THREE.MeshStandardMaterial({
      color: new THREE.Color(accentHex),
      emissive: new THREE.Color(accentHex),
      emissiveIntensity: 1.1
    })
  );
  badgeAccentDot.position.set(-0.1, topCenterY, benchD / 2 + 0.016);
  group.add(badgeAccentDot);

  return group;
}

/**
 * Propped 3D Physical Game Box / Keep Case / Shockbox / Collector Deck Box
 */
function buildRetailBox3D(game, boxFormat) {
  const group = new THREE.Group();
  const dims = {
    'tuck-deck': [0.33, 0.47, 0.11],
    'square-box': [0.43, 0.43, 0.1],
    'mini-box': [0.35, 0.43, 0.095],
    shockbox: [0.39, 0.53, 0.105],
    'big-box-pc': [0.41, 0.56, 0.125],
    'keep-case': [0.36, 0.5, 0.052],
    'landscape-box': [0.49, 0.35, 0.1]
  };
  const [bw, bh, bd] = dims[boxFormat] || dims['keep-case'];

  const shellColor =
    boxFormat === 'keep-case' || boxFormat === 'shockbox'
      ? '#141720'
      : game.cabinetBodyColor || '#222634';

  const boxMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(shellColor),
    roughness: boxFormat === 'keep-case' ? 0.22 : 0.46,
    metalness: 0.12
  });
  const boxMesh = new THREE.Mesh(new THREE.BoxGeometry(bw, bh, bd), boxMat);
  boxMesh.position.y = bh / 2;
  group.add(boxMesh);

  // Colored spine accent strip on left side of box
  const spineStrip = new THREE.Mesh(
    new THREE.BoxGeometry(0.008, bh - 0.02, bd - 0.014),
    new THREE.MeshStandardMaterial({
      color: new THREE.Color(game.accent),
      roughness: 0.35
    })
  );
  spineStrip.position.set(-bw / 2 - 0.002, bh / 2, 0);
  group.add(spineStrip);

  // Printed cover face
  const coverTex = createBoxCoverTexture(game, boxFormat);
  const coverMat = new THREE.MeshStandardMaterial({
    map: coverTex,
    emissiveMap: coverTex,
    emissive: new THREE.Color('#ffffff'),
    emissiveIntensity: 0.32,
    roughness: boxFormat === 'keep-case' ? 0.18 : 0.4,
    metalness: 0.06
  });
  const coverPlane = new THREE.Mesh(new THREE.PlaneGeometry(bw - 0.016, bh - 0.016), coverMat);
  coverPlane.position.set(0, bh / 2, bd / 2 + 0.004);
  group.add(coverPlane);

  // Subtle dark acrylic display stand lip holding the box upright
  const easelBase = new THREE.Mesh(
    new THREE.BoxGeometry(bw * 0.72, 0.018, bd + 0.07),
    new THREE.MeshStandardMaterial({ color: 0x161922, roughness: 0.35, metalness: 0.3 })
  );
  easelBase.position.set(0, 0.009, 0.01);
  group.add(easelBase);

  group.rotation.x = -0.11;
  return { group, coverMat, bw, bh };
}

/**
 * Builds a Garage Gaming TV or Desktop PC Monitor with crisp illuminated screen
 */
function buildDisplayMonitor(game, { width = 0.84, height = 0.66, depth = 0.36, shellHex = 0x232732, isPcMonitor = false } = {}) {
  const group = new THREE.Group();
  const shellMat = new THREE.MeshStandardMaterial({
    color: shellHex,
    roughness: 0.44,
    metalness: 0.18
  });
  const bezelRecessMat = new THREE.MeshStandardMaterial({
    color: 0x0d1016,
    roughness: 0.38,
    metalness: 0.22
  });

  if (isPcMonitor) {
    // Swivel pedestal base for Desktop PC Monitor
    const basePlate = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.035, 0.32), shellMat);
    basePlate.position.set(0, 0.018, 0.02);
    group.add(basePlate);

    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.12, 0.1, 16), shellMat);
    neck.position.set(0, 0.07, 0);
    group.add(neck);
  } else {
    // Low rubberized TV feet
    const tvFoot = new THREE.Mesh(new THREE.BoxGeometry(width - 0.12, 0.04, depth * 0.7), bezelRecessMat);
    tvFoot.position.set(0, 0.02, 0);
    group.add(tvFoot);
  }

  const baseY = isPcMonitor ? 0.11 : 0.04;
  // Front housing
  const bezelBox = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth * 0.48), shellMat);
  bezelBox.position.set(0, baseY + height / 2, 0.04);
  group.add(bezelBox);

  // Tapered rear tube/back housing
  const rearBox = new THREE.Mesh(
    new THREE.BoxGeometry(width * 0.74, height * 0.76, depth * 0.58),
    shellMat
  );
  rearBox.position.set(0, baseY + height * 0.48, -depth * 0.38);
  group.add(rearBox);

  const frontZ = 0.04 + (depth * 0.48) / 2;
  // Inner dark screen mask
  const screenW = width - 0.13;
  const screenH = height - 0.14;
  const maskPlane = new THREE.Mesh(new THREE.PlaneGeometry(screenW + 0.03, screenH + 0.03), bezelRecessMat);
  maskPlane.position.set(0, baseY + height / 2 + 0.015, frontZ + 0.002);
  group.add(maskPlane);

  const screenTex = createGameScreenTexture(game, 'landscape');
  const screenMat = new THREE.MeshStandardMaterial({
    map: screenTex,
    emissiveMap: screenTex,
    emissive: new THREE.Color('#ffffff'),
    emissiveIntensity: 0.96,
    roughness: 0.14,
    metalness: 0.1
  });
  const screenMesh = new THREE.Mesh(new THREE.PlaneGeometry(screenW, screenH), screenMat);
  screenMesh.position.set(0, baseY + height / 2 + 0.015, frontZ + 0.008);
  group.add(screenMesh);

  // Power LED on bottom-right chin
  const led = new THREE.Mesh(
    new THREE.SphereGeometry(0.011, 10, 10),
    new THREE.MeshStandardMaterial({
      color: GAR_LED_GREEN,
      emissive: GAR_LED_GREEN,
      emissiveIntensity: 1.5
    })
  );
  led.position.set(width / 2 - 0.08, baseY + 0.036, frontZ + 0.008);
  group.add(led);

  // Front AV Yellow/White/Red composite jacks on TV chin
  if (!isPcMonitor) {
    [0xfacc15, 0xf8fafc, 0xef4444].forEach((jCol, ji) => {
      const jack = new THREE.Mesh(
        new THREE.CylinderGeometry(0.009, 0.009, 0.014, 10),
        new THREE.MeshStandardMaterial({ color: jCol, roughness: 0.3 })
      );
      jack.rotation.x = Math.PI / 2;
      jack.position.set(-width / 2 + 0.1 + ji * 0.032, baseY + 0.036, frontZ + 0.006);
      group.add(jack);
    });
  }

  return { group, screenMesh, screenMat };
}

/**
 * Builds each of the 7 Distinct Garage Game Room Setups (Hardware + Slotted/Exposed Media + 3D Box)
 */
function buildGarageGameStation(game, index) {
  const root = new THREE.Group();
  const extraTexMats = [];
  let marqueeMat = null;
  let screenMesh = null;
  let screenMat = null;

  const accentMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(game.accent),
    emissive: new THREE.Color(game.accent),
    emissiveIntensity: 0.55,
    roughness: 0.28,
    metalness: 0.2
  });
  const secondaryMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(game.secondaryAccent),
    roughness: 0.34,
    metalness: 0.2
  });

  // Default camera framing for workbench stations (tabletop y = 0.96, hardware y = 0.96..1.95)
  let camFocus = {
    distDesktop: 2.58,
    distPortrait: 3.68,
    camYDesktop: 1.58,
    camYPortrait: 1.54,
    lookYDesktop: 1.24,
    lookYPortrait: 1.12,
    offsetX: 0
  };

  if (game.hardwareType === 'garage-cabinet') {
    // =======================================================================
    // STATION 04: WORLD STRIKERS — 2-Player Garage Arcade Cabinet + Side Cart & Shockbox Stand
    // =======================================================================
    camFocus = {
      distDesktop: 3.64,
      distPortrait: 4.78,
      camYDesktop: 1.96,
      camYPortrait: 1.88,
      lookYDesktop: 1.55,
      lookYPortrait: 1.38,
      offsetX: 0.16
    };

    const cabX = -0.18;
    const cabW = 1.22;
    const woodSideMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(game.cabinetBodyColor || '#17253b'),
      roughness: 0.42,
      metalness: 0.22
    });
    const cabDarkMat = new THREE.MeshStandardMaterial({
      color: 0x121620,
      roughness: 0.48,
      metalness: 0.52
    });

    const lowerCab = new THREE.Mesh(new THREE.BoxGeometry(cabW, 1.16, 0.96), woodSideMat);
    lowerCab.position.set(cabX, 0.58, 0);
    root.add(lowerCab);

    // Recessed monitor housing + warm wood/navy side cheeks
    const upperBack = new THREE.Mesh(new THREE.BoxGeometry(cabW - 0.08, 1.12, 0.62), cabDarkMat);
    upperBack.position.set(cabX, 1.72, -0.16);
    root.add(upperBack);

    [-cabW / 2 + 0.035, cabW / 2 - 0.035].forEach((sx) => {
      const cheek = new THREE.Mesh(new THREE.BoxGeometry(0.07, 1.16, 0.88), woodSideMat);
      cheek.position.set(cabX + sx, 1.74, -0.03);
      root.add(cheek);

      // Classic yellow T-molding trim along front edge of cabinet cheeks
      const tMold = new THREE.Mesh(new THREE.BoxGeometry(0.022, 2.52, 0.032), accentMat);
      tMold.position.set(cabX + sx, 1.28, 0.42);
      root.add(tMold);
    });

    // Illuminated Rec-Room Marquee Hood
    const marqueeBox = new THREE.Mesh(new THREE.BoxGeometry(cabW + 0.02, 0.34, 0.92), woodSideMat);
    marqueeBox.position.set(cabX, 2.44, 0.0);
    root.add(marqueeBox);

    const mTex = createCabinetMarqueeTexture(game);
    marqueeMat = new THREE.MeshStandardMaterial({
      map: mTex,
      emissiveMap: mTex,
      emissive: new THREE.Color('#ffffff'),
      emissiveIntensity: 1.05,
      roughness: 0.22
    });
    const marqueePlane = new THREE.Mesh(new THREE.PlaneGeometry(cabW - 0.1, 0.28), marqueeMat);
    marqueePlane.position.set(cabX, 2.43, 0.47);
    marqueePlane.rotation.x = 0.07;
    root.add(marqueePlane);

    // Unobstructed 25" Arcade Screen
    const sTex = createGameScreenTexture(game, 'landscape');
    screenMat = new THREE.MeshStandardMaterial({
      map: sTex,
      emissiveMap: sTex,
      emissive: new THREE.Color('#ffffff'),
      emissiveIntensity: 0.98,
      roughness: 0.14
    });
    screenMesh = new THREE.Mesh(new THREE.PlaneGeometry(cabW - 0.2, 0.78), screenMat);
    screenMesh.position.set(cabX, 1.74, 0.33);
    screenMesh.rotation.x = -0.16;
    root.add(screenMesh);

    // 2-Player Control Panel (1P Yellow + 2P Sky-Blue Joysticks & 8 Tactile Buttons)
    const cpoDeck = new THREE.Mesh(new THREE.BoxGeometry(cabW + 0.02, 0.14, 0.46), cabDarkMat);
    cpoDeck.position.set(cabX, 1.16, 0.42);
    cpoDeck.rotation.x = 0.18;
    root.add(cpoDeck);

    [
      [-0.34, accentMat],
      [0.16, secondaryMat]
    ].forEach(([jx, ballMat]) => {
      const shaft = new THREE.Mesh(
        new THREE.CylinderGeometry(0.012, 0.012, 0.11, 10),
        new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.88, roughness: 0.16 })
      );
      shaft.position.set(cabX + jx, 1.27, 0.44);
      root.add(shaft);

      const ball = new THREE.Mesh(new THREE.SphereGeometry(0.04, 16, 16), ballMat);
      ball.position.set(cabX + jx, 1.33, 0.44);
      root.add(ball);

      for (let b = 0; b < 4; b++) {
        const btn = new THREE.Mesh(
          new THREE.CylinderGeometry(0.022, 0.024, 0.025, 12),
          b % 2 === 0 ? accentMat : secondaryMat
        );
        btn.position.set(
          cabX + jx + 0.12 + (b % 2) * 0.068,
          1.25 - Math.floor(b / 2) * 0.012,
          0.42 + Math.floor(b / 2) * 0.068
        );
        btn.rotation.x = 0.18;
        root.add(btn);
      }
    });

    // Front steel service door
    const serviceDoor = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.48, 0.03), cabDarkMat);
    serviceDoor.position.set(cabX, 0.6, 0.485);
    root.add(serviceDoor);

    // Inline Garage Side Pedestal holding the Oversized Pro Arcade Cartridge + Shockbox Case!
    const sideX = 0.84;
    const pedTop = new THREE.Mesh(
      new THREE.BoxGeometry(0.76, 0.06, 0.68),
      new THREE.MeshStandardMaterial({ color: 0x8b5e38, roughness: 0.6 })
    );
    pedTop.position.set(sideX, 1.05, 0.08);
    root.add(pedTop);

    const pedBody = new THREE.Mesh(new THREE.BoxGeometry(0.7, 1.02, 0.62), cabDarkMat);
    pedBody.position.set(sideX, 0.51, 0.08);
    root.add(pedBody);

    // Oversized MVS-style Pro Arcade Cartridge on front-left of side pedestal
    const mvsGroup = new THREE.Group();
    mvsGroup.position.set(sideX - 0.2, 1.08, 0.22);
    mvsGroup.rotation.set(-0.14, -0.14, 0);
    root.add(mvsGroup);

    const mvsShell = new THREE.Mesh(
      new THREE.BoxGeometry(0.32, 0.24, 0.058),
      new THREE.MeshStandardMaterial({ color: 0x1b1e26, roughness: 0.4 })
    );
    mvsShell.position.y = 0.14;
    mvsGroup.add(mvsShell);

    // Gold PCB edge-connector pins visible at bottom of arcade cart
    const pcbEdge = new THREE.Mesh(
      new THREE.BoxGeometry(0.26, 0.026, 0.022),
      new THREE.MeshStandardMaterial({ color: 0xfbbf24, metalness: 0.82, roughness: 0.22 })
    );
    pcbEdge.position.y = 0.013;
    mvsGroup.add(pcbEdge);

    const mvsLabelTex = createMediaLabelTexture(game, 'mvs-cart');
    const mvsLabelMat = new THREE.MeshStandardMaterial({
      map: mvsLabelTex,
      emissiveMap: mvsLabelTex,
      emissive: new THREE.Color('#ffffff'),
      emissiveIntensity: 0.35,
      roughness: 0.35
    });
    extraTexMats.push(mvsLabelMat);
    const mvsSticker = new THREE.Mesh(new THREE.PlaneGeometry(0.26, 0.19), mvsLabelMat);
    mvsSticker.position.set(0, 0.145, 0.032);
    mvsGroup.add(mvsSticker);

    // Propped Neo-Geo style Shockbox Case right beside the arcade cartridge
    const shockBuilt = buildRetailBox3D(game, 'shockbox');
    shockBuilt.group.position.set(sideX + 0.15, 1.08, -0.04);
    shockBuilt.group.rotation.y = -0.24;
    extraTexMats.push(shockBuilt.coverMat);
    root.add(shockBuilt.group);
  } else {
    // All other 6 setups rest on sturdy Butcher-Block Garage Workbenches (top y = 0.96)
    root.add(buildWorkbenchBase(index + 1, game.accent));
    const deskY = 0.96;

    if (game.hardwareType === 'mobile-deck') {
      // =====================================================================
      // STATION 01: DESIRED — Vertical 9:16 Smartphone on Stand + Collector Card Deck Box & NFC Card
      // =====================================================================
      const phoneGroup = new THREE.Group();
      phoneGroup.position.set(-0.22, deskY, 0.06);
      phoneGroup.rotation.y = 0.1;
      root.add(phoneGroup);

      const alumMat = new THREE.MeshStandardMaterial({
        color: 0x94a3b8,
        metalness: 0.78,
        roughness: 0.24
      });
      const standBase = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.022, 0.28), alumMat);
      standBase.position.set(0, 0.011, 0);
      phoneGroup.add(standBase);

      const standArm = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.34, 0.035), alumMat);
      standArm.position.set(0, 0.17, -0.05);
      standArm.rotation.x = 0.22;
      phoneGroup.add(standArm);

      // Sleek 9:16 Smartphone Chassis (scaled so live 9:16 screen & logo read crisply!)
      const phoneHolder = new THREE.Group();
      phoneHolder.position.set(0, 0.45, 0.03);
      phoneHolder.rotation.x = -0.15;
      phoneGroup.add(phoneHolder);

      const phoneBody = new THREE.Mesh(
        new THREE.BoxGeometry(0.42, 0.76, 0.036),
        new THREE.MeshStandardMaterial({ color: 0x14161f, metalness: 0.65, roughness: 0.22 })
      );
      phoneHolder.add(phoneBody);

      // Subtle rose-crimson anodized frame band
      const phoneRim = new THREE.Mesh(new THREE.BoxGeometry(0.432, 0.772, 0.024), accentMat);
      phoneRim.position.z = -0.002;
      phoneHolder.add(phoneRim);

      const pTex = createGameScreenTexture(game, 'portrait');
      screenMat = new THREE.MeshStandardMaterial({
        map: pTex,
        emissiveMap: pTex,
        emissive: new THREE.Color('#ffffff'),
        emissiveIntensity: 0.98,
        roughness: 0.12
      });
      screenMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.38, 0.69), screenMat);
      screenMesh.position.z = 0.021;
      phoneHolder.add(screenMesh);

      // Braided charging cable curving from bottom of phone stand
      root.add(
        buildCableTube(
          [
            [-0.22, deskY + 0.08, 0.08],
            [-0.28, deskY + 0.015, 0.22],
            [-0.48, deskY + 0.015, 0.16],
            [-0.58, deskY + 0.015, -0.32]
          ],
          0.009,
          0xf43f5e
        )
      );

      // Physical NFC Tap Game Card propped on an angled display stand beside phone!
      const nfcGroup = new THREE.Group();
      nfcGroup.position.set(0.14, deskY + 0.1, 0.12);
      nfcGroup.rotation.set(-0.34, -0.14, 0);
      root.add(nfcGroup);

      const nfcCard = new THREE.Mesh(
        new THREE.BoxGeometry(0.24, 0.16, 0.012),
        new THREE.MeshStandardMaterial({ color: 0x14161d, roughness: 0.3 })
      );
      nfcGroup.add(nfcCard);

      const nfcTex = createMediaLabelTexture(game, 'nfc-card');
      const nfcMat = new THREE.MeshStandardMaterial({
        map: nfcTex,
        emissiveMap: nfcTex,
        emissive: new THREE.Color('#ffffff'),
        emissiveIntensity: 0.42,
        roughness: 0.25
      });
      extraTexMats.push(nfcMat);
      const nfcFace = new THREE.Mesh(new THREE.PlaneGeometry(0.228, 0.148), nfcMat);
      nfcFace.position.z = 0.008;
      nfcGroup.add(nfcFace);

      // Fanned trio of physical Persona Scenario Cards on the desk
      [-0.18, 0, 0.18].forEach((ang, ci) => {
        const card = new THREE.Mesh(
          new THREE.BoxGeometry(0.13, 0.006, 0.2),
          new THREE.MeshStandardMaterial({
            color: ci === 1 ? game.accent : 0xf8fafc,
            roughness: 0.35
          })
        );
        card.position.set(0.18 + (ci - 1) * 0.055, deskY + 0.008 + ci * 0.005, 0.02);
        card.rotation.y = ang;
        root.add(card);
      });

      // Collector's Physical Card Deck Tuck-Box propped on right
      const deckBox = buildRetailBox3D(game, 'tuck-deck');
      deckBox.group.position.set(0.5, deskY, -0.02);
      deckBox.group.rotation.y = -0.24;
      extraTexMats.push(deckBox.coverMat);
      root.add(deckBox.group);
    } else if (game.hardwareType === 'wide-handheld') {
      // =====================================================================
      // STATION 02: CAT CAPSULES — Wide Translucent Handheld + Slotted Pastel Cart + Square Box
      // =====================================================================
      const hhGroup = new THREE.Group();
      hhGroup.position.set(-0.3, deskY + 0.33, 0.05);
      hhGroup.rotation.set(-0.18, 0.08, 0);
      root.add(hhGroup);

      // Desktop display cradle under the wide handheld
      const cradle = new THREE.Mesh(
        new THREE.BoxGeometry(0.54, 0.12, 0.26),
        new THREE.MeshStandardMaterial({ color: 0x1e222d, roughness: 0.42, metalness: 0.3 })
      );
      cradle.position.set(-0.3, deskY + 0.06, 0.03);
      cradle.rotation.y = 0.08;
      root.add(cradle);

      // Translucent Atomic-Lilac / Pastel-Berry Wide Handheld Shell!
      const transShellMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#c084fc'),
        roughness: 0.22,
        metalness: 0.05,
        transmission: 0.32,
        transparent: true,
        opacity: 0.9
      });
      const hhBody = new THREE.Mesh(new THREE.BoxGeometry(0.94, 0.48, 0.085), transShellMat);
      hhGroup.add(hhBody);

      // Subtle internal green PCB silhouette visible through the translucent shell!
      const innerPcb = new THREE.Mesh(
        new THREE.BoxGeometry(0.82, 0.38, 0.02),
        new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.6 })
      );
      innerPcb.position.z = -0.01;
      hhGroup.add(innerPcb);

      // Rounded side grip wings + white L/R shoulder bumpers
      [-0.44, 0.44].forEach((gx) => {
        const grip = new THREE.Mesh(
          new THREE.CylinderGeometry(0.22, 0.2, 0.09, 20),
          transShellMat
        );
        grip.rotation.x = Math.PI / 2;
        grip.scale.set(0.52, 1, 1.05);
        grip.position.set(gx, -0.01, 0);
        hhGroup.add(grip);

        const shoulder = new THREE.Mesh(
          new THREE.BoxGeometry(0.16, 0.05, 0.075),
          new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.3 })
        );
        shoulder.position.set(gx * 0.84, 0.245, -0.005);
        hhGroup.add(shoulder);
      });

      // Left white cross D-Pad
      const whiteBtnMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.28 });
      const dpadH = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.036, 0.03), whiteBtnMat);
      dpadH.position.set(-0.36, 0.03, 0.048);
      hhGroup.add(dpadH);
      const dpadV = new THREE.Mesh(new THREE.BoxGeometry(0.036, 0.11, 0.03), whiteBtnMat);
      dpadV.position.set(-0.36, 0.03, 0.048);
      hhGroup.add(dpadV);

      // Right A / B tactile buttons + green power LED
      [
        [0.34, -0.01],
        [0.4, 0.05]
      ].forEach(([bx, by]) => {
        const btn = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.024, 0.026, 14), whiteBtnMat);
        btn.rotation.x = Math.PI / 2;
        btn.position.set(bx, by, 0.048);
        hhGroup.add(btn);
      });

      // Dark glass screen lens + crisp backlit color display
      const lens = new THREE.Mesh(
        new THREE.PlaneGeometry(0.56, 0.39),
        new THREE.MeshStandardMaterial({ color: 0x161922, roughness: 0.18 })
      );
      lens.position.set(0, 0.01, 0.045);
      hhGroup.add(lens);

      const whTex = createGameScreenTexture(game, 'wide-handheld');
      screenMat = new THREE.MeshStandardMaterial({
        map: whTex,
        emissiveMap: whTex,
        emissive: new THREE.Color('#ffffff'),
        emissiveIntensity: 0.98,
        roughness: 0.12
      });
      screenMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.33), screenMat);
      screenMesh.position.set(0, 0.01, 0.05);
      hhGroup.add(screenMesh);

      // PASTEL GAME CARTRIDGE VISIBLY SLOTTED INTO THE TOP SLOT!
      const cartGroup = new THREE.Group();
      cartGroup.position.set(0, 0.29, -0.018);
      hhGroup.add(cartGroup);

      const pastelCartMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#f472b6'),
        roughness: 0.32
      });
      const cartBody = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.17, 0.044), pastelCartMat);
      cartGroup.add(cartBody);

      const cartLip = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.034, 0.052), pastelCartMat);
      cartLip.position.y = 0.082;
      cartGroup.add(cartLip);

      const cartTex = createMediaLabelTexture(game, 'pastel-cart');
      const cartLabelMat = new THREE.MeshStandardMaterial({
        map: cartTex,
        emissiveMap: cartTex,
        emissive: new THREE.Color('#ffffff'),
        emissiveIntensity: 0.35,
        roughness: 0.3
      });
      extraTexMats.push(cartLabelMat);
      const cartSticker = new THREE.Mesh(new THREE.PlaneGeometry(0.26, 0.12), cartLabelMat);
      cartSticker.position.set(0, -0.005, 0.025);
      cartGroup.add(cartSticker);

      // Propped Square Cardboard Retail Box + 2 cute glossy Gacha Capsules on desk
      const sqBox = buildRetailBox3D(game, 'square-box');
      sqBox.group.position.set(0.56, deskY, -0.02);
      sqBox.group.rotation.y = -0.24;
      extraTexMats.push(sqBox.coverMat);
      root.add(sqBox.group);

      [
        [0.28, 0.2, '#f472b6'],
        [0.39, 0.23, '#38bdf8']
      ].forEach(([cx, cz, col]) => {
        const cap = new THREE.Mesh(
          new THREE.SphereGeometry(0.044, 16, 16),
          new THREE.MeshStandardMaterial({ color: col, roughness: 0.15, metalness: 0.1 })
        );
        cap.position.set(cx, deskY + 0.044, cz);
        root.add(cap);
      });
    } else if (game.hardwareType === 'pocket-handheld') {
      // =====================================================================
      // STATION 03: SUMTEN — Classic Vertical Pocket Handheld + Exposed "20 KB" Cart + Mini Box
      // =====================================================================
      const dmgDock = new THREE.Mesh(
        new THREE.BoxGeometry(0.46, 0.09, 0.26),
        new THREE.MeshStandardMaterial({ color: 0x1e222d, roughness: 0.45 })
      );
      dmgDock.position.set(-0.18, deskY + 0.045, 0.05);
      dmgDock.rotation.y = 0.08;
      root.add(dmgDock);

      const pktGroup = new THREE.Group();
      pktGroup.position.set(-0.18, deskY + 0.44, 0.06);
      pktGroup.rotation.set(-0.15, 0.08, 0);
      root.add(pktGroup);

      const puttyShellMat = new THREE.MeshStandardMaterial({
        color: 0xd8d3c5,
        roughness: 0.42,
        metalness: 0.05
      });
      const pktBody = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.8, 0.11), puttyShellMat);
      pktGroup.add(pktBody);

      // Dark slate screen bezel + red battery LED
      const bezel = new THREE.Mesh(
        new THREE.PlaneGeometry(0.46, 0.39),
        new THREE.MeshStandardMaterial({ color: 0x3f4454, roughness: 0.35 })
      );
      bezel.position.set(0, 0.15, 0.057);
      pktGroup.add(bezel);

      const battLed = new THREE.Mesh(
        new THREE.SphereGeometry(0.01, 10, 10),
        new THREE.MeshStandardMaterial({
          color: 0xef4444,
          emissive: 0xef4444,
          emissiveIntensity: 1.5
        })
      );
      battLed.position.set(-0.2, 0.17, 0.062);
      pktGroup.add(battLed);

      const pkTex = createGameScreenTexture(game, 'pocket');
      screenMat = new THREE.MeshStandardMaterial({
        map: pkTex,
        emissiveMap: pkTex,
        emissive: new THREE.Color('#ffffff'),
        emissiveIntensity: 0.98,
        roughness: 0.16
      });
      screenMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.37, 0.34), screenMat);
      screenMesh.position.set(0.012, 0.15, 0.061);
      pktGroup.add(screenMesh);

      // Classic black cross D-Pad + Plum/Crimson A & B buttons + Start/Select pills
      const dpadMat = new THREE.MeshStandardMaterial({ color: 0x181a20, roughness: 0.38 });
      const dpH = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.042, 0.03), dpadMat);
      dpH.position.set(-0.14, -0.16, 0.062);
      pktGroup.add(dpH);
      const dpV = new THREE.Mesh(new THREE.BoxGeometry(0.042, 0.13, 0.03), dpadMat);
      dpV.position.set(-0.14, -0.16, 0.062);
      pktGroup.add(dpV);

      const abMat = new THREE.MeshStandardMaterial({ color: 0xbe123c, roughness: 0.28 });
      [
        [0.11, -0.18],
        [0.18, -0.13]
      ].forEach(([bx, by]) => {
        const ab = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.026, 16), abMat);
        ab.rotation.x = Math.PI / 2;
        ab.position.set(bx, by, 0.062);
        pktGroup.add(ab);
      });

      [-0.045, 0.035].forEach((sx) => {
        const pill = new THREE.Mesh(
          new THREE.BoxGeometry(0.055, 0.018, 0.02),
          new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.5 })
        );
        pill.position.set(sx, -0.3, 0.06);
        pill.rotation.z = 0.42;
        pktGroup.add(pill);
      });

      // EXPOSED "20 KB" CARTRIDGE STICKING PROMINENTLY OUT OF THE TOP SLOT!
      const cart20Group = new THREE.Group();
      cart20Group.position.set(0, 0.47, -0.022);
      pktGroup.add(cart20Group);

      const tealCartMat = new THREE.MeshStandardMaterial({ color: 0x14b8a6, roughness: 0.34 });
      const cart20Body = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.24, 0.048), tealCartMat);
      cart20Group.add(cart20Body);

      const cart20Grip = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.042, 0.056), tealCartMat);
      cart20Grip.position.y = 0.105;
      cart20Group.add(cart20Grip);

      const c20Tex = createMediaLabelTexture(game, '20kb-cart');
      const c20Mat = new THREE.MeshStandardMaterial({
        map: c20Tex,
        emissiveMap: c20Tex,
        emissive: new THREE.Color('#ffffff'),
        emissiveIntensity: 0.38,
        roughness: 0.3
      });
      extraTexMats.push(c20Mat);
      const c20Sticker = new THREE.Mesh(new THREE.PlaneGeometry(0.28, 0.16), c20Mat);
      c20Sticker.position.set(0, -0.008, 0.027);
      cart20Group.add(c20Sticker);

      // Clear frosted plastic pocket cart snap-case on desk + Mini Retail Box
      const snapCase = new THREE.Mesh(
        new THREE.BoxGeometry(0.2, 0.024, 0.22),
        new THREE.MeshStandardMaterial({
          color: 0xe2e8f0,
          transparent: true,
          opacity: 0.55,
          roughness: 0.2
        })
      );
      snapCase.position.set(0.2, deskY + 0.014, 0.26);
      snapCase.rotation.y = 0.25;
      root.add(snapCase);

      const miniBox = buildRetailBox3D(game, 'mini-box');
      miniBox.group.position.set(0.49, deskY, -0.02);
      miniBox.group.rotation.y = -0.24;
      extraTexMats.push(miniBox.coverMat);
      root.add(miniBox.group);
    } else if (game.hardwareType === 'desktop-pc') {
      // =====================================================================
      // STATION 05: REDIAL — Desktop PC Monitor, Mech Keyboard & Mouse, Tower w/ CD-ROM in Open Tray + Jewel Case + Big-Box
      // =====================================================================
      camFocus.camYDesktop = 1.66;
      camFocus.distDesktop = 2.72;
      camFocus.distPortrait = 3.88;

      const pcMon = buildDisplayMonitor(game, {
        width: 0.8,
        height: 0.62,
        depth: 0.34,
        shellHex: 0xd6d1c4,
        isPcMonitor: true
      });
      pcMon.group.position.set(-0.34, deskY, -0.11);
      pcMon.group.rotation.y = 0.1;
      screenMesh = pcMon.screenMesh;
      screenMat = pcMon.screenMat;
      root.add(pcMon.group);

      // Tactile Mechanical Keyboard with sculpted keycap block + hot-pink ESC & WASD cluster
      const kbGroup = new THREE.Group();
      kbGroup.position.set(-0.36, deskY + 0.02, 0.21);
      kbGroup.rotation.set(0.08, 0.08, 0);
      root.add(kbGroup);

      const kbCase = new THREE.Mesh(
        new THREE.BoxGeometry(0.52, 0.032, 0.19),
        new THREE.MeshStandardMaterial({ color: 0xd6d1c4, roughness: 0.45 })
      );
      kbGroup.add(kbCase);

      const keyBed = new THREE.Mesh(
        new THREE.BoxGeometry(0.47, 0.022, 0.14),
        new THREE.MeshStandardMaterial({ color: 0x333846, roughness: 0.5 })
      );
      keyBed.position.y = 0.018;
      kbGroup.add(keyBed);

      // Hot-pink ESC + WASD gamer keycaps
      [
        [-0.21, -0.048],
        [-0.14, -0.015],
        [-0.16, 0.015],
        [-0.14, 0.015],
        [-0.12, 0.015]
      ].forEach(([kx, kz]) => {
        const cap = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.014, 0.018), accentMat);
        cap.position.set(kx, 0.032, kz);
        kbGroup.add(cap);
      });

      // Mousepad + 2-Button Desktop Mouse
      const mousePad = new THREE.Mesh(
        new THREE.BoxGeometry(0.2, 0.006, 0.18),
        new THREE.MeshStandardMaterial({ color: 0x171b24, roughness: 0.85 })
      );
      mousePad.position.set(0.02, deskY + 0.004, 0.22);
      root.add(mousePad);

      const mouseBody = new THREE.Mesh(
        new THREE.SphereGeometry(0.045, 16, 12),
        new THREE.MeshStandardMaterial({ color: 0xd6d1c4, roughness: 0.35 })
      );
      mouseBody.scale.set(0.85, 0.52, 1.25);
      mouseBody.position.set(0.02, deskY + 0.022, 0.22);
      root.add(mouseBody);

      // Compact Desktop Mini-Tower PC with OPEN CD-ROM Drive Tray & Visible Shiny CD-ROM Disc!
      const towerGroup = new THREE.Group();
      towerGroup.position.set(0.22, deskY, -0.1);
      towerGroup.rotation.y = -0.1;
      root.add(towerGroup);

      const towerMat = new THREE.MeshStandardMaterial({ color: 0xcfcac0, roughness: 0.45 });
      const towerChassis = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.54, 0.44), towerMat);
      towerChassis.position.y = 0.27;
      towerGroup.add(towerChassis);

      // Drive bays + green power LED + amber HDD LED
      const bayFace = new THREE.Mesh(
        new THREE.PlaneGeometry(0.21, 0.18),
        new THREE.MeshStandardMaterial({ color: 0xbab4a8, roughness: 0.5 })
      );
      bayFace.position.set(0, 0.41, 0.222);
      towerGroup.add(bayFace);

      const pwrBtn = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.014, 14), accentMat);
      pwrBtn.rotation.x = Math.PI / 2;
      pwrBtn.position.set(0, 0.18, 0.222);
      towerGroup.add(pwrBtn);

      // Extended Motorized CD-ROM Tray jutting out toward the viewer!
      const cdTray = new THREE.Mesh(
        new THREE.BoxGeometry(0.19, 0.014, 0.21),
        new THREE.MeshStandardMaterial({ color: 0x1e222b, roughness: 0.35 })
      );
      cdTray.position.set(0, 0.44, 0.31);
      towerGroup.add(cdTray);

      const discTex = createMediaLabelTexture(game, 'disc');
      const discMat = new THREE.MeshStandardMaterial({
        map: discTex,
        emissiveMap: discTex,
        emissive: new THREE.Color('#ffffff'),
        emissiveIntensity: 0.45,
        roughness: 0.12,
        metalness: 0.55
      });
      extraTexMats.push(discMat);
      const cdDisc = new THREE.Mesh(new THREE.CircleGeometry(0.082, 28), discMat);
      cdDisc.rotation.x = -Math.PI / 2;
      cdDisc.position.set(0, 0.449, 0.315);
      towerGroup.add(cdDisc);

      // Open Clear CD Jewel Case lying on desk in front of tower
      const jewelGroup = new THREE.Group();
      jewelGroup.position.set(0.27, deskY + 0.01, 0.22);
      jewelGroup.rotation.y = -0.35;
      root.add(jewelGroup);

      const jewelBase = new THREE.Mesh(
        new THREE.BoxGeometry(0.19, 0.012, 0.17),
        new THREE.MeshStandardMaterial({ color: 0x181b24, roughness: 0.3 })
      );
      jewelGroup.add(jewelBase);

      const jewelDisc = new THREE.Mesh(new THREE.CircleGeometry(0.072, 24), discMat);
      jewelDisc.rotation.x = -Math.PI / 2;
      jewelDisc.position.set(0, 0.008, 0);
      jewelGroup.add(jewelDisc);

      const jewelLid = new THREE.Mesh(
        new THREE.BoxGeometry(0.19, 0.16, 0.008),
        new THREE.MeshStandardMaterial({
          color: 0xcbd5e1,
          transparent: true,
          opacity: 0.48,
          roughness: 0.12
        })
      );
      jewelLid.position.set(0, 0.075, -0.09);
      jewelLid.rotation.x = -0.35;
      jewelGroup.add(jewelLid);

      // Big-Box PC Cardboard Game Box propped on right
      const bigBox = buildRetailBox3D(game, 'big-box-pc');
      bigBox.group.position.set(0.62, deskY, -0.03);
      bigBox.group.rotation.y = -0.26;
      extraTexMats.push(bigBox.coverMat);
      root.add(bigBox.group);
    } else if (game.hardwareType === 'disc-console') {
      // =====================================================================
      // STATION 06: AI-PIKMIN — Garage TV + 4-Port Top-Loading Cube Console + Open Lid Mini-Disc + Keep Case
      // =====================================================================
      camFocus.distDesktop = 2.66;
      camFocus.distPortrait = 3.82;

      const tv = buildDisplayMonitor(game, {
        width: 0.84,
        height: 0.65,
        depth: 0.38,
        shellHex: 0x222631,
        isPcMonitor: false
      });
      tv.group.position.set(-0.34, deskY, -0.06);
      tv.group.rotation.y = 0.1;
      screenMesh = tv.screenMesh;
      screenMat = tv.screenMat;
      root.add(tv.group);

      // Compact Indigo 4-Controller-Port Cube Home Console!
      const cubeGroup = new THREE.Group();
      cubeGroup.position.set(0.22, deskY, 0.04);
      cubeGroup.rotation.y = -0.14;
      root.add(cubeGroup);

      const indigoMat = new THREE.MeshStandardMaterial({
        color: 0x3b3578,
        roughness: 0.35,
        metalness: 0.14
      });
      const cubeBody = new THREE.Mesh(new THREE.BoxGeometry(0.33, 0.26, 0.33), indigoMat);
      cubeBody.position.y = 0.13;
      cubeGroup.add(cubeBody);

      // Rear black carry handle
      const handleBar = new THREE.Mesh(
        new THREE.BoxGeometry(0.22, 0.025, 0.045),
        new THREE.MeshStandardMaterial({ color: 0x151821, roughness: 0.45 })
      );
      handleBar.position.set(0, 0.21, -0.185);
      cubeGroup.add(handleBar);

      // Light-gray front controller port plate with 4 distinct circular controller ports!
      const frontPlate = new THREE.Mesh(
        new THREE.PlaneGeometry(0.29, 0.11),
        new THREE.MeshStandardMaterial({ color: 0xd1d5db, roughness: 0.4 })
      );
      frontPlate.position.set(0, 0.18, 0.167);
      cubeGroup.add(frontPlate);

      const portMat = new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.4 });
      [-0.096, -0.032, 0.032, 0.096].forEach((px, pi) => {
        const port = new THREE.Mesh(new THREE.CylinderGeometry(0.021, 0.021, 0.014, 14), portMat);
        port.rotation.x = Math.PI / 2;
        port.position.set(px, 0.18, 0.17);
        cubeGroup.add(port);

        if (pi < 2) {
          // Plugged-in controller connector plugs in Ports 1 & 2
          const plug = new THREE.Mesh(
            new THREE.CylinderGeometry(0.016, 0.018, 0.038, 12),
            pi === 0 ? indigoMat : accentMat
          );
          plug.rotation.x = Math.PI / 2;
          plug.position.set(px, 0.18, 0.186);
          cubeGroup.add(plug);
        }
      });

      // Warm orange front power LED on top front edge of cube
      const cubeLed = new THREE.Mesh(
        new THREE.BoxGeometry(0.04, 0.012, 0.02),
        new THREE.MeshStandardMaterial({
          color: 0xf97316,
          emissive: 0xf97316,
          emissiveIntensity: 1.5
        })
      );
      cubeLed.position.set(0, 0.262, 0.13);
      cubeGroup.add(cubeLed);

      // Dark optical spindle well + VISIBLE 8CM MINI OPTICAL DISC + Angled-Open Top Disc Lid!
      const spindleWell = new THREE.Mesh(
        new THREE.CircleGeometry(0.115, 24),
        new THREE.MeshStandardMaterial({ color: 0x0f1219, roughness: 0.4 })
      );
      spindleWell.rotation.x = -Math.PI / 2;
      spindleWell.position.set(0, 0.262, 0);
      cubeGroup.add(spindleWell);

      const miniDiscTex = createMediaLabelTexture(game, 'disc');
      const miniDiscMat = new THREE.MeshStandardMaterial({
        map: miniDiscTex,
        emissiveMap: miniDiscTex,
        emissive: new THREE.Color('#ffffff'),
        emissiveIntensity: 0.48,
        roughness: 0.12,
        metalness: 0.55
      });
      extraTexMats.push(miniDiscMat);
      const miniDisc = new THREE.Mesh(new THREE.CircleGeometry(0.095, 28), miniDiscMat);
      miniDisc.rotation.x = -Math.PI / 2;
      miniDisc.position.set(0, 0.266, 0);
      cubeGroup.add(miniDisc);

      // Popped-open circular top disc lid hinged at the rear so the mini-disc is 100% visible!
      const openLidPivot = new THREE.Group();
      openLidPivot.position.set(0, 0.262, -0.11);
      openLidPivot.rotation.x = -0.88;
      cubeGroup.add(openLidPivot);

      const lidDisc = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.018, 24), indigoMat);
      lidDisc.position.set(0, 0, 0.11);
      openLidPivot.add(lidDisc);

      // Sculpted Indigo Gamepad resting in front of cube console + cable
      const padGroup = new THREE.Group();
      padGroup.position.set(0.16, deskY + 0.036, 0.22);
      padGroup.rotation.y = 0.16;
      root.add(padGroup);

      const padCore = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.042, 0.12), indigoMat);
      padGroup.add(padCore);
      [-0.085, 0.085].forEach((hx) => {
        const grip = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.02, 0.11, 12), indigoMat);
        grip.rotation.x = Math.PI / 2;
        grip.position.set(hx, -0.008, 0.055);
        padGroup.add(grip);
      });
      const greenABtn = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.02, 12), accentMat);
      greenABtn.position.set(0.058, 0.025, -0.01);
      padGroup.add(greenABtn);
      const cStick = new THREE.Mesh(new THREE.SphereGeometry(0.016, 10, 10), secondaryMat);
      cStick.position.set(0.038, 0.028, 0.032);
      padGroup.add(cStick);

      root.add(
        buildCableTube(
          [
            [0.14, deskY + 0.17, 0.21],
            [0.09, deskY + 0.02, 0.19],
            [0.15, deskY + 0.025, 0.21]
          ],
          0.008,
          0x1e1b4b
        )
      );

      // Plastic DVD-style Keep Case propped on right
      const keepCase = buildRetailBox3D(game, 'keep-case');
      keepCase.group.position.set(0.61, deskY, -0.02);
      keepCase.group.rotation.y = -0.26;
      extraTexMats.push(keepCase.coverMat);
      root.add(keepCase.group);
    } else {
      // =====================================================================
      // STATION 07: WILD PEAK 3D — Garage TV + 64-Bit Top-Loading Console + Plugged-In ROM Cart + Landscape Box
      // =====================================================================
      camFocus.distDesktop = 2.68;
      camFocus.distPortrait = 3.84;

      const tv64 = buildDisplayMonitor(game, {
        width: 0.85,
        height: 0.66,
        depth: 0.38,
        shellHex: 0x20242e,
        isPcMonitor: false
      });
      tv64.group.position.set(-0.35, deskY, -0.06);
      tv64.group.rotation.y = 0.1;
      screenMesh = tv64.screenMesh;
      screenMat = tv64.screenMat;
      root.add(tv64.group);

      // Sculpted Charcoal 64-Bit Top-Loading Home Console
      const n64Group = new THREE.Group();
      n64Group.position.set(0.2, deskY, 0.04);
      n64Group.rotation.y = -0.12;
      root.add(n64Group);

      const charcoalMat = new THREE.MeshStandardMaterial({
        color: 0x262934,
        roughness: 0.38,
        metalness: 0.16
      });
      const deckBase = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.11, 0.34), charcoalMat);
      deckBase.position.y = 0.055;
      n64Group.add(deckBase);

      // Sculpted curved front console feet + center expansion memory cover
      [-0.15, 0.15].forEach((fx) => {
        const foot = new THREE.Mesh(
          new THREE.CylinderGeometry(0.068, 0.075, 0.115, 16),
          charcoalMat
        );
        foot.position.set(fx, 0.058, 0.14);
        n64Group.add(foot);
      });

      const expCover = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.018, 0.08), accentMat);
      expCover.position.set(0, 0.114, 0.095);
      n64Group.add(expCover);

      // Glowing red front power LED + 4 front controller sockets
      const redLed = new THREE.Mesh(
        new THREE.SphereGeometry(0.011, 10, 10),
        new THREE.MeshStandardMaterial({
          color: 0xef4444,
          emissive: 0xef4444,
          emissiveIntensity: 1.6
        })
      );
      redLed.position.set(0, 0.065, 0.175);
      n64Group.add(redLed);

      [-0.14, -0.08, 0.08, 0.14].forEach((px) => {
        const cPort = new THREE.Mesh(
          new THREE.CylinderGeometry(0.016, 0.016, 0.018, 12),
          new THREE.MeshStandardMaterial({ color: 0x111318, roughness: 0.5 })
        );
        cPort.rotation.x = Math.PI / 2;
        cPort.position.set(px, 0.042, 0.185);
        n64Group.add(cPort);
      });

      // CHUNKY 64-BIT ROM CARTRIDGE VISIBLY PLUGGED STRAIGHT INTO THE TOP SLOT!
      const romGroup = new THREE.Group();
      romGroup.position.set(0, 0.19, -0.02);
      n64Group.add(romGroup);

      const cartGrayMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.42 });
      const romBody = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.17, 0.052), cartGrayMat);
      romGroup.add(romBody);

      const romTopLip = new THREE.Mesh(new THREE.BoxGeometry(0.256, 0.028, 0.056), cartGrayMat);
      romTopLip.position.y = 0.092;
      romGroup.add(romTopLip);

      const romTopCrown = new THREE.Mesh(new THREE.BoxGeometry(0.175, 0.016, 0.058), cartGrayMat);
      romTopCrown.position.y = 0.108;
      romGroup.add(romTopCrown);

      const romTex = createMediaLabelTexture(game, 'n64-cart');
      const romLabelMat = new THREE.MeshStandardMaterial({
        map: romTex,
        emissiveMap: romTex,
        emissive: new THREE.Color('#ffffff'),
        emissiveIntensity: 0.38,
        roughness: 0.32
      });
      extraTexMats.push(romLabelMat);
      const romSticker = new THREE.Mesh(new THREE.PlaneGeometry(0.185, 0.135), romLabelMat);
      romSticker.position.set(0, -0.004, 0.029);
      romGroup.add(romSticker);

      // Iconic 3-Prong Analog Thumbstick Gamepad resting in front of console + coiled cable
      const pad64 = new THREE.Group();
      pad64.position.set(0.15, deskY + 0.036, 0.22);
      pad64.rotation.y = 0.15;
      root.add(pad64);

      const padWingMat = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.36 });
      const padBridge = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.036, 0.1), padWingMat);
      pad64.add(padBridge);
      [-0.1, 0, 0.1].forEach((px, pi) => {
        const prong = new THREE.Mesh(
          new THREE.CylinderGeometry(0.022, 0.017, pi === 1 ? 0.12 : 0.105, 12),
          padWingMat
        );
        prong.rotation.x = Math.PI / 2;
        prong.position.set(px, -0.006, 0.065);
        pad64.add(prong);
      });
      // Center white analog stick + red Start button + blue/green A/B buttons
      const analogStick = new THREE.Mesh(
        new THREE.CylinderGeometry(0.014, 0.008, 0.035, 10),
        new THREE.MeshStandardMaterial({ color: 0xf8fafc })
      );
      analogStick.position.set(0, 0.03, 0.025);
      pad64.add(analogStick);

      const startRed = new THREE.Mesh(
        new THREE.CylinderGeometry(0.014, 0.014, 0.016, 12),
        new THREE.MeshStandardMaterial({ color: 0xef4444 })
      );
      startRed.position.set(0, 0.022, -0.012);
      pad64.add(startRed);

      root.add(
        buildCableTube(
          [
            [0.08, deskY + 0.045, 0.2],
            [0.06, deskY + 0.015, 0.19],
            [0.14, deskY + 0.025, 0.21]
          ],
          0.008,
          0x1e293b
        )
      );

      // Landscape Cardboard 64-Bit Console Box propped on right!
      const landBox = buildRetailBox3D(game, 'landscape-box');
      landBox.group.position.set(0.64, deskY, -0.02);
      landBox.group.rotation.y = -0.26;
      extraTexMats.push(landBox.coverMat);
      root.add(landBox.group);
    }
  }

  // Warm ambient floor glow pad beneath each Garage Game Room station
  const glowRing = new THREE.Mesh(
    new THREE.PlaneGeometry(2.05, 1.48),
    new THREE.MeshBasicMaterial({
      color: new THREE.Color(game.accent),
      transparent: true,
      opacity: 0.16
    })
  );
  glowRing.rotation.x = -Math.PI / 2;
  glowRing.position.set(0, 0.014, 0.06);
  root.add(glowRing);

  // Invisible unified hit volume covering hardware, slotted medium, and propped 3D box
  const isCab = game.hardwareType === 'garage-cabinet';
  const hitMesh = new THREE.Mesh(
    new THREE.BoxGeometry(2.08, isCab ? 2.75 : 2.15, 1.32),
    new THREE.MeshBasicMaterial({ visible: false })
  );
  hitMesh.position.set(0, isCab ? 1.36 : 1.15, 0.05);
  hitMesh.userData = {
    hitType: 'cabinet',
    index,
    id: game.id
  };
  root.add(hitMesh);

  screenMesh.userData = {
    hitType: 'cabinet-screen',
    index,
    id: game.id
  };

  return {
    root,
    screenMesh,
    hitMesh,
    glowRing,
    trimMat: accentMat,
    marqueeMat,
    screenMat,
    extraTexMats,
    camFocus
  };
}

/**
 * Populates the Cozy Garage Game Room Environment (x > 0):
 * Wood-slat accent wall, pegboard & collector shelves, entry showcase (visible in Hub split!),
 * woven garage area rug, coiled controller cables, and warm overhead Edison shop bulbs.
 */
function buildGarageEnvironment(garageGroup, interactiveObjects) {
  // 1. Woven Garage Area Rug spanning the entire Game Room (visible in Hub right-half & all 7 stations)
  const rugMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(20.4, 4.4),
    new THREE.MeshStandardMaterial({
      map: createGarageRugTexture(),
      roughness: 0.92,
      metalness: 0.02
    })
  );
  rugMesh.rotation.x = -Math.PI / 2;
  rugMesh.position.set(10.85, 0.008, -0.35);
  garageGroup.add(rugMesh);

  // 2. Warm Cedar/Walnut Vertical Wood-Slat Accent Wall Paneling behind the stations (z = -3.85)
  const slatBacking = new THREE.Mesh(
    new THREE.BoxGeometry(20.6, 4.5, 0.08),
    new THREE.MeshStandardMaterial({ color: 0x141210, roughness: 0.9 })
  );
  slatBacking.position.set(10.9, 2.35, -3.88);
  garageGroup.add(slatBacking);

  const woodMatA = new THREE.MeshStandardMaterial({ color: 0x6e472b, roughness: 0.62, metalness: 0.05 });
  const woodMatB = new THREE.MeshStandardMaterial({ color: 0x593820, roughness: 0.66, metalness: 0.05 });
  for (let sx = 0.8; sx <= 21.0; sx += 0.24) {
    const slat = new THREE.Mesh(
      new THREE.BoxGeometry(0.14, 4.42, 0.055),
      Math.round(sx * 10) % 2 === 0 ? woodMatA : woodMatB
    );
    slat.position.set(sx, 2.35, -3.82);
    garageGroup.add(slat);
  }

  // Top & Bottom dark steel trim rails framing the wood-slat accent wall
  const trimSteel = new THREE.MeshStandardMaterial({ color: 0x1d212b, roughness: 0.45, metalness: 0.6 });
  [0.14, 4.58].forEach((ty) => {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(20.7, 0.09, 0.14), trimSteel);
    rail.position.set(10.9, ty, -3.82);
    garageGroup.add(rail);
  });

  // 3. Garage Pegboard & Collector Display Shelves (including Entry Corner at x = 2.45 for Hub Split!)
  const pegTex = createPegboardTexture();
  const pegMat = new THREE.MeshStandardMaterial({ map: pegTex, roughness: 0.65, metalness: 0.2 });

  const shelfCenters = [2.45, 7.6, 13.1, 18.0];
  const collectorColors = [0xf43f5e, 0xf59e0b, 0x38bdf8, 0x34d399, 0xa78bfa, 0xf472b6];

  shelfCenters.forEach((scx, si) => {
    const pegBoard = new THREE.Mesh(new THREE.BoxGeometry(2.8, 1.35, 0.05), pegMat);
    pegBoard.position.set(scx, 2.85, -3.73);
    garageGroup.add(pegBoard);

    // Floating walnut collector shelf above pegboard holding spare retro game boxes & cartridge caddies
    const shelfPlank = new THREE.Mesh(new THREE.BoxGeometry(2.9, 0.07, 0.38), woodMatA);
    shelfPlank.position.set(scx, 3.62, -3.62);
    garageGroup.add(shelfPlank);

    for (let bi = 0; bi < 5; bi++) {
      const boxCol = collectorColors[(si * 3 + bi) % collectorColors.length];
      const cBox = new THREE.Mesh(
        new THREE.BoxGeometry(0.24, 0.34 + (bi % 2) * 0.06, 0.16),
        new THREE.MeshStandardMaterial({ color: boxCol, roughness: 0.42 })
      );
      cBox.position.set(scx - 1.05 + bi * 0.46, 3.83, -3.6);
      cBox.rotation.y = (bi - 2) * 0.06;
      garageGroup.add(cBox);
    }

    // Hanging controllers + coiled cables on pegboard hooks
    [-0.72, 0.72].forEach((hx, hi) => {
      const pad = new THREE.Mesh(
        new THREE.BoxGeometry(0.28, 0.15, 0.05),
        new THREE.MeshStandardMaterial({
          color: hi === 0 ? 0xd6d3cd : 0x334155,
          roughness: 0.4
        })
      );
      pad.position.set(scx + hx, 2.95, -3.66);
      pad.rotation.z = hi === 0 ? -0.1 : 0.1;
      garageGroup.add(pad);

      // Coiled controller cord loop hanging beside pad
      const cableLoop = new THREE.Mesh(
        new THREE.TorusGeometry(0.12, 0.016, 10, 24),
        new THREE.MeshStandardMaterial({ color: 0x14171f, roughness: 0.55 })
      );
      cableLoop.position.set(scx + hx * 0.32, 2.74, -3.67);
      garageGroup.add(cableLoop);
    });
  });

  // 4. Hub-Visible Garage Entry Sideboard / Cartridge Storage Credenza (at x = 2.45, z = -1.65)
  // Gives the right half of the Center Hub Split immediate warm Garage Game Room presence!
  const entryCredenza = new THREE.Group();
  entryCredenza.position.set(2.45, 0, -1.65);
  entryCredenza.rotation.y = -0.14;
  garageGroup.add(entryCredenza);

  const credBody = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.86, 0.78), trimSteel);
  credBody.position.y = 0.43;
  entryCredenza.add(credBody);

  const credTop = new THREE.Mesh(new THREE.BoxGeometry(2.18, 0.07, 0.84), woodMatA);
  credTop.position.y = 0.895;
  entryCredenza.add(credTop);

  // Stacked collector cartridges, warm glowing desk cage lamp, & spare test monitor on entry credenza
  const lampBase = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.13, 0.05, 16), trimSteel);
  lampBase.position.set(-0.72, 0.955, 0);
  entryCredenza.add(lampBase);

  const warmBulbMat = new THREE.MeshStandardMaterial({
    color: GAR_WARM_BULB,
    emissive: GAR_AMBER,
    emissiveIntensity: 2.2,
    roughness: 0.15
  });
  const deskBulb = new THREE.Mesh(new THREE.SphereGeometry(0.085, 16, 16), warmBulbMat);
  deskBulb.position.set(-0.72, 1.12, 0);
  entryCredenza.add(deskBulb);

  // Stack of colorful ROM cartridges + collector boxes on entry credenza
  [0xf43f5e, 0xfacc15, 0x34d399, 0xa78bfa].forEach((cc, ci) => {
    const stackedCart = new THREE.Mesh(
      new THREE.BoxGeometry(0.32, 0.055, 0.22),
      new THREE.MeshStandardMaterial({ color: cc, roughness: 0.38 })
    );
    stackedCart.position.set(-0.18, 0.96 + ci * 0.058, 0.05);
    stackedCart.rotation.y = ci * 0.08;
    entryCredenza.add(stackedCart);
  });

  // Compact garage test monitor on entry credenza showing warm amber glow
  const pvmBox = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.5, 0.5), trimSteel);
  pvmBox.position.set(0.56, 1.18, -0.02);
  pvmBox.rotation.y = -0.18;
  entryCredenza.add(pvmBox);

  const pvmScreen = new THREE.Mesh(
    new THREE.PlaneGeometry(0.44, 0.34),
    new THREE.MeshStandardMaterial({
      color: GAR_AMBER_BRIGHT,
      emissive: GAR_AMBER,
      emissiveIntensity: 0.85,
      roughness: 0.2
    })
  );
  pvmScreen.position.set(0.515, 1.19, 0.232);
  pvmScreen.rotation.y = -0.18;
  entryCredenza.add(pvmScreen);

  const entryWingHit = new THREE.Mesh(
    new THREE.BoxGeometry(2.6, 2.4, 1.3),
    new THREE.MeshBasicMaterial({ visible: false })
  );
  entryWingHit.position.set(0, 1.2, 0);
  entryWingHit.userData = { hitType: 'wing-games' };
  entryCredenza.add(entryWingHit);
  interactiveObjects.push(entryWingHit);

  // 5. Overhead Shop Conduit & Warm Edison String/Pendant Lights spanning x = 1.6..19.4
  const conduit = new THREE.Mesh(new THREE.BoxGeometry(19.6, 0.045, 0.045), trimSteel);
  conduit.position.set(10.5, 5.65, -2.1);
  garageGroup.add(conduit);

  for (let lx = 2.0; lx <= 19.2; lx += 2.45) {
    const dropCord = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.52, 8), trimSteel);
    dropCord.position.set(lx, 5.38, -2.1);
    garageGroup.add(dropCord);

    const shade = new THREE.Mesh(
      new THREE.ConeGeometry(0.18, 0.14, 16, 1, true),
      new THREE.MeshStandardMaterial({
        color: 0x222630,
        roughness: 0.4,
        metalness: 0.65,
        side: THREE.DoubleSide
      })
    );
    shade.position.set(lx, 5.12, -2.1);
    garageGroup.add(shade);

    const edisonBulb = new THREE.Mesh(new THREE.SphereGeometry(0.058, 14, 14), warmBulbMat);
    edisonBulb.position.set(lx, 5.03, -2.1);
    garageGroup.add(edisonBulb);
  }
}

export function createWorkshopArcade3D({
  container,
  tools,
  games,
  onSelectMode,
  onSelectTool,
  onSelectGame,
  onLaunchTool,
  onLaunchGame,
  onOpenBrief,
  onHoverItem,
  onHubLean
}) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#101218');
  scene.fog = new THREE.FogExp2('#101218', 0.015);

  const camera = new THREE.PerspectiveCamera(48, 16 / 9, 0.1, 80);
  camera.position.set(0, 2.35, 9.4);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.14;
  container.appendChild(renderer.domElement);

  // =========================================================================
  // Dual-World Lighting: Sunlit Gallery Daylight (Left) vs. Warm Garage Edison Shop Glow (Right)
  // =========================================================================
  const hemiLight = new THREE.HemisphereLight('#f5efe4', '#161922', 0.78);
  scene.add(hemiLight);

  // Sunlit Design & Maker's Workshop lighting along the full Left Rail (x < 0, clamped so zero light spills past x = 0)
  const atelierSunlight = new THREE.SpotLight('#fffaf0', 54, 32, Math.PI * 0.48, 0.42, 1.0);
  atelierSunlight.position.set(-5.2, 8.2, 6.8);
  atelierSunlight.target.position.set(-4.8, 2.3, -1.2);
  scene.add(atelierSunlight);
  scene.add(atelierSunlight.target);

  const galleryWarmBounce = new THREE.PointLight('#ffeed6', 7.5, 16);
  galleryWarmBounce.position.set(-3.2, 2.2, 3.0);
  scene.add(galleryWarmBounce);

  const workshopMidLight = new THREE.PointLight('#fffaf0', 23, 14);
  workshopMidLight.position.set(-10.8, 4.8, 2.5);
  scene.add(workshopMidLight);

  const workshopFarLight = new THREE.PointLight('#fffaf0', 25, 15);
  workshopFarLight.position.set(-17.4, 4.8, 2.5);
  scene.add(workshopFarLight);

  const workshopBenchFill = new THREE.PointLight('#fff5e4', 12.5, 15);
  workshopBenchFill.position.set(-13.2, 2.6, 4.1);
  scene.add(workshopBenchFill);

  const workshopEndSkylight = new THREE.PointLight('#fffaf0', 14, 12);
  workshopEndSkylight.position.set(-19.6, 3.3, 1.4);
  scene.add(workshopEndSkylight);

  // Warm Overhead Edison / Shop Lights in the Right Garage Game Room (x > 0)
  const garageEntryLight = new THREE.PointLight('#ffdfaa', 18, 13);
  garageEntryLight.position.set(4.5, 4.7, 2.5);
  scene.add(garageEntryLight);

  const garageMidLight = new THREE.PointLight('#ffd28c', 22, 16);
  garageMidLight.position.set(11.4, 4.7, 2.5);
  scene.add(garageMidLight);

  const garageFarLight = new THREE.PointLight('#ffdfaa', 22, 16);
  garageFarLight.position.set(17.8, 4.7, 2.5);
  scene.add(garageFarLight);

  const garageBenchFill = new THREE.PointLight('#fff3db', 11, 18);
  garageBenchFill.position.set(12.0, 2.6, 4.2);
  scene.add(garageBenchFill);

  // =========================================================================
  // LITERAL ARCHITECTURAL SPLIT: Sunlit Gallery Plaster (Left) vs. Garage Cinderblock (Right)
  // =========================================================================
  const leftBackWall = new THREE.Mesh(
    new THREE.PlaneGeometry(34, 18),
    new THREE.MeshStandardMaterial({
      color: '#e8e0d2',
      roughness: 0.9,
      metalness: 0.04
    })
  );
  leftBackWall.position.set(-17, 7.5, -5.2);
  scene.add(leftBackWall);

  const rightBackWall = new THREE.Mesh(
    new THREE.PlaneGeometry(38, 18),
    new THREE.MeshStandardMaterial({
      map: createGarageCinderblockTexture(),
      roughness: 0.82,
      metalness: 0.08
    })
  );
  rightBackWall.position.set(19, 7.5, -5.2);
  scene.add(rightBackWall);

  // Left Floor (x < 0): Sunlit Warm Travertine / Gallery Parquet
  const leftFloor = new THREE.Mesh(
    new THREE.PlaneGeometry(32, 38),
    new THREE.MeshStandardMaterial({
      map: createLeftEditorialFloorTexture(),
      roughness: 0.65,
      metalness: 0.08
    })
  );
  leftFloor.rotation.x = -Math.PI / 2;
  leftFloor.position.set(-16, 0, 0);
  scene.add(leftFloor);

  // Right Floor (x > 0): Sealed Charcoal Garage Concrete Slab
  const rightFloor = new THREE.Mesh(
    new THREE.PlaneGeometry(38, 38),
    new THREE.MeshStandardMaterial({
      map: createGarageConcreteFloorTexture(),
      roughness: 0.58,
      metalness: 0.14
    })
  );
  rightFloor.rotation.x = -Math.PI / 2;
  rightFloor.position.set(19, 0, 0);
  scene.add(rightFloor);

  // Dual-Sided Threshold Seam at x = 0 (Archival Paper/Vermilion Left + Tungsten Steel Right)
  const seamLeftStrip = new THREE.Mesh(
    new THREE.BoxGeometry(0.06, 0.025, 26),
    new THREE.MeshStandardMaterial({
      color: ED_VERMILION,
      emissive: ED_VERMILION,
      emissiveIntensity: 0.35,
      roughness: 0.4
    })
  );
  seamLeftStrip.position.set(-0.038, 0.013, 2.0);
  scene.add(seamLeftStrip);

  const seamRightStrip = new THREE.Mesh(
    new THREE.BoxGeometry(0.06, 0.025, 26),
    new THREE.MeshStandardMaterial({
      color: GAR_AMBER,
      emissive: GAR_AMBER,
      emissiveIntensity: 0.55,
      roughness: 0.35
    })
  );
  seamRightStrip.position.set(0.038, 0.013, 2.0);
  scene.add(seamRightStrip);

  const pillarLeftHalf = new THREE.Mesh(
    new THREE.BoxGeometry(0.09, 6.4, 0.24),
    new THREE.MeshStandardMaterial({
      color: ED_PAPER,
      roughness: 0.5,
      metalness: 0.08
    })
  );
  pillarLeftHalf.position.set(-0.045, 3.2, -2.1);
  scene.add(pillarLeftHalf);

  const pillarRightHalf = new THREE.Mesh(
    new THREE.BoxGeometry(0.09, 6.4, 0.24),
    new THREE.MeshStandardMaterial({
      color: GAR_PANEL,
      emissive: GAR_AMBER,
      emissiveIntensity: 0.35,
      roughness: 0.38,
      metalness: 0.45
    })
  );
  pillarRightHalf.position.set(0.045, 3.2, -2.1);
  scene.add(pillarRightHalf);

  // =========================================================================
  // LEFT WING: SUNLIT DESIGN & MAKER'S WORKSHOP (7 BESPOKE 3D WORKBENCH SETUPS)
  // =========================================================================
  let currentSignTexts = {
    signTools: 'DESIGN & AI WORKSHOP',
    signToolsSub: 'TAP OR SWIPE WORKBENCHES TO TRY LIVE',
    signGames: 'GARAGE GAME ROOM',
    signGamesSub: 'TAP OR SWIPE SETUPS TO PLAY'
  };

  const interactiveObjects = [];
  const workshopGroup = new THREE.Group();
  scene.add(workshopGroup);

  const workshopEnv = buildWorkshopEnvironment(workshopGroup, interactiveObjects);

  const toolsSignMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(4.4, 1.04),
    new THREE.MeshBasicMaterial({
      map: createEditorialSignTexture(currentSignTexts.signTools, currentSignTexts.signToolsSub)
    })
  );
  toolsSignMesh.position.set(-4.68, 5.06, -0.92);
  toolsSignMesh.rotation.y = 0.15;
  toolsSignMesh.userData = { hitType: 'wing-tools' };
  workshopGroup.add(toolsSignMesh);
  interactiveObjects.push(toolsSignMesh);

  const toolNodes = [];
  tools.forEach((tool, idx) => {
    const cx = -5.4 - idx * 2.2;
    const cz = -1.12;
    const built = buildWorkshopToolStation(tool, idx);
    built.root.position.set(cx, 0, cz);
    built.root.rotation.y = 0.09;
    workshopGroup.add(built.root);

    interactiveObjects.unshift(built.hitMesh);
    interactiveObjects.unshift(built.screenMesh);

    toolNodes.push({
      item: tool,
      index: idx,
      baseZ: cz,
      ...built,
      currentPop: 0,
      audienceMatch: true
    });
  });

  // =========================================================================
  // RIGHT WING: COZY GARAGE GAME ROOM (7 DISTINCT PLAYABLE HARDWARE SETUPS)
  // =========================================================================
  const arcadeGroup = new THREE.Group();
  scene.add(arcadeGroup);

  buildGarageEnvironment(arcadeGroup, interactiveObjects);

  const gamesSignMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(4.4, 1.04),
    new THREE.MeshBasicMaterial({
      map: createGarageSignTexture(currentSignTexts.signGames, currentSignTexts.signGamesSub)
    })
  );
  gamesSignMesh.position.set(5.25, 5.06, -0.92);
  gamesSignMesh.rotation.y = -0.15;
  gamesSignMesh.userData = { hitType: 'wing-games' };
  arcadeGroup.add(gamesSignMesh);
  interactiveObjects.push(gamesSignMesh);

  const cabinetNodes = [];
  games.forEach((game, idx) => {
    const cx = 5.4 + idx * 2.2;
    const cz = -1.12;
    const built = buildGarageGameStation(game, idx);
    built.root.position.set(cx, 0, cz);
    built.root.rotation.y = -0.09;
    arcadeGroup.add(built.root);

    interactiveObjects.unshift(built.hitMesh);
    interactiveObjects.unshift(built.screenMesh);

    cabinetNodes.push({
      item: game,
      index: idx,
      baseZ: cz,
      ...built,
      currentPop: 0,
      audienceMatch: true
    });
  });

  // =========================================================================
  // Camera-on-Rails State Machine (Hub | Editorial Studio | Garage Game Room | ZoomIn)
  // =========================================================================
  let currentMode = 'hub';
  let activeToolIndex = 0;
  let activeGameIndex = 0;
  let isZoomedIntoScreen = false;
  let isPaused = false;
  let isDisposed = false;

  const targetCamPos = new THREE.Vector3(0, 2.35, 9.4);
  const targetLookAt = new THREE.Vector3(0, 2.0, -0.8);
  const currentLookAt = new THREE.Vector3(0, 2.0, -0.8);

  const pointerNdc = new THREE.Vector2(0, 0);
  let dragPreviewOffset = 0;

  const tmpWorldPos = new THREE.Vector3();
  const tmpQuat = new THREE.Quaternion();
  const tmpForward = new THREE.Vector3();
  const tmpRight = new THREE.Vector3();

  function recomputeCameraTargets() {
    const w = container.clientWidth || window.innerWidth;
    const h = container.clientHeight || window.innerHeight;
    const aspect = w / Math.max(h, 1);
    const isPortrait = aspect < 0.92;

    const desiredFov = isPortrait ? 58 : 46;
    if (camera.fov !== desiredFov) {
      camera.fov = desiredFov;
      camera.updateProjectionMatrix();
    }

    if (currentMode === 'hub') {
      const zDist = isPortrait ? 13.6 : aspect < 1.35 ? 10.8 : 9.0;
      targetCamPos.set(0.0, isPortrait ? 2.68 : 2.38, zDist);
      targetLookAt.set(0.0, isPortrait ? 1.95 : 2.15, -1.05);
      return;
    }

    if (currentMode === 'tools') {
      const station = toolNodes[activeToolIndex] || toolNodes[0];
      if (isZoomedIntoScreen) {
        station.screenMesh.getWorldPosition(tmpWorldPos);
        station.root.getWorldQuaternion(tmpQuat);
        tmpForward.set(0, 0, 1).applyQuaternion(tmpQuat);
        targetCamPos.copy(tmpWorldPos).addScaledVector(tmpForward, 0.68);
        targetLookAt.copy(tmpWorldPos);
      } else {
        station.root.getWorldPosition(tmpWorldPos);
        station.root.getWorldQuaternion(tmpQuat);
        tmpForward.set(0, 0, 1).applyQuaternion(tmpQuat);
        tmpRight.set(1, 0, 0).applyQuaternion(tmpQuat);

        const cf = station.camFocus;
        const dist = isPortrait ? cf.distPortrait : cf.distDesktop;
        const shiftX = cf.offsetX || 0;

        targetCamPos
          .copy(tmpWorldPos)
          .addScaledVector(tmpRight, shiftX)
          .addScaledVector(tmpForward, dist);
        targetCamPos.y = isPortrait ? cf.camYPortrait : cf.camYDesktop;

        targetLookAt.copy(tmpWorldPos).addScaledVector(tmpRight, shiftX);
        targetLookAt.y = isPortrait ? cf.lookYPortrait : cf.lookYDesktop;
      }
      return;
    }

    if (currentMode === 'games') {
      const cab = cabinetNodes[activeGameIndex] || cabinetNodes[0];
      if (isZoomedIntoScreen) {
        cab.screenMesh.getWorldPosition(tmpWorldPos);
        cab.root.getWorldQuaternion(tmpQuat);
        tmpForward.set(0, 0, 1).applyQuaternion(tmpQuat);
        targetCamPos.copy(tmpWorldPos).addScaledVector(tmpForward, 0.65);
        targetLookAt.copy(tmpWorldPos);
      } else {
        cab.root.getWorldPosition(tmpWorldPos);
        cab.root.getWorldQuaternion(tmpQuat);
        tmpForward.set(0, 0, 1).applyQuaternion(tmpQuat);
        tmpRight.set(1, 0, 0).applyQuaternion(tmpQuat);

        const cf = cab.camFocus;
        const dist = isPortrait ? cf.distPortrait : cf.distDesktop;
        const shiftX = cf.offsetX || 0;

        // Framed so hardware + live screen logo + slotted medium + 3D box sit cleanly above Inspector!
        targetCamPos.copy(tmpWorldPos).addScaledVector(tmpRight, shiftX).addScaledVector(tmpForward, dist);
        targetCamPos.y = isPortrait ? cf.camYPortrait : cf.camYDesktop;

        targetLookAt.copy(tmpWorldPos).addScaledVector(tmpRight, shiftX);
        targetLookAt.y = isPortrait ? cf.lookYPortrait : cf.lookYDesktop;
      }
    }
  }

  function resize() {
    const w = container.clientWidth || window.innerWidth;
    const h = container.clientHeight || window.innerHeight;
    camera.aspect = w / Math.max(h, 1);
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
    recomputeCameraTargets();
  }

  window.addEventListener('resize', resize);
  resize();

  // =========================================================================
  // Unified Tap + Touch Swipe + Hover Audio Feedback
  // =========================================================================
  const raycaster = new THREE.Raycaster();
  let pDownX = 0;
  let pDownY = 0;
  let pDownTime = 0;
  let isPointerDown = false;
  let hoveredToolIdx = -1;
  let hoveredCabIdx = -1;
  let hoveredBrief = false;
  let lastHubLean = 'center';

  function getRaycastHit(clientX, clientY) {
    const rect = renderer.domElement.getBoundingClientRect();
    const nx = ((clientX - rect.left) / rect.width) * 2 - 1;
    const ny = -((clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera({ x: nx, y: ny }, camera);
    const hits = raycaster.intersectObjects(interactiveObjects, false);
    if (hits.length === 0) return null;
    // Prefer specific station/prop hitboxes over broad wing catchers when overlapping along the ray
    const primaryHit =
      hits.find((h) => !String(h.object.userData?.hitType || '').startsWith('wing-')) || hits[0];
    return primaryHit.object.userData || null;
  }

  function onPointerDown(e) {
    if (isPaused) return;
    isPointerDown = true;
    pDownX = e.clientX;
    pDownY = e.clientY;
    pDownTime = performance.now();
    dragPreviewOffset = 0;
  }

  function onPointerMove(e) {
    if (isPaused) return;
    const rect = renderer.domElement.getBoundingClientRect();
    pointerNdc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointerNdc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    if (currentMode === 'hub') {
      const nextLean = pointerNdc.x < -0.1 ? 'left' : pointerNdc.x > 0.1 ? 'right' : 'center';
      if (nextLean !== lastHubLean) {
        lastHubLean = nextLean;
        onHubLean?.(nextLean, pointerNdc.x);
      } else {
        onHubLean?.(nextLean, pointerNdc.x);
      }
    }

    if (isPointerDown) {
      const dx = e.clientX - pDownX;
      dragPreviewOffset = THREE.MathUtils.clamp(-dx / 240, -0.65, 0.65);
      return;
    }

    const hit = getRaycastHit(e.clientX, e.clientY);
    const nextToolIdx =
      hit?.hitType === 'tool' || hit?.hitType === 'tool-screen' ? hit.index : -1;
    const nextCabIdx =
      hit?.hitType === 'cabinet' || hit?.hitType === 'cabinet-screen' ? hit.index : -1;
    const nextBrief = hit?.hitType === 'clipboard-brief';

    if (nextToolIdx !== -1 && nextToolIdx !== hoveredToolIdx) {
      onHoverItem?.('tool', nextToolIdx);
    } else if (nextCabIdx !== -1 && nextCabIdx !== hoveredCabIdx) {
      onHoverItem?.('arcade', nextCabIdx);
    }

    hoveredToolIdx = nextToolIdx;
    hoveredCabIdx = nextCabIdx;
    hoveredBrief = nextBrief;
    renderer.domElement.style.cursor = hit ? 'pointer' : currentMode === 'hub' ? 'pointer' : 'grab';
  }

  function onPointerUp(e) {
    if (!isPointerDown || isPaused) return;
    isPointerDown = false;
    dragPreviewOffset = 0;

    const dx = e.clientX - pDownX;
    const dy = e.clientY - pDownY;
    const dt = performance.now() - pDownTime;
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);

    if (absX > 38 && absX > absY * 1.15 && dt < 900) {
      if (currentMode === 'games') {
        const dir = dx < 0 ? 1 : -1;
        const nextIdx = THREE.MathUtils.clamp(activeGameIndex + dir, 0, games.length - 1);
        if (nextIdx !== activeGameIndex) onSelectGame(nextIdx);
      } else if (currentMode === 'tools') {
        // Benches run from x = -5.4 (01) leftward to x = -18.6 (07), matching dragPreviewOffset direction
        const toolDir = dx > 0 ? 1 : -1;
        const nextIdx = THREE.MathUtils.clamp(activeToolIndex + toolDir, 0, tools.length - 1);
        if (nextIdx !== activeToolIndex) onSelectTool(nextIdx);
      } else if (currentMode === 'hub') {
        onSelectMode(dx < 0 ? 'games' : 'tools');
      }
      return;
    }

    if (absX < 14 && absY < 14) {
      const hit = getRaycastHit(e.clientX, e.clientY);

      if (hit?.hitType === 'clipboard-brief') {
        onOpenBrief?.();
        return;
      }

      if (currentMode === 'hub') {
        if (hit?.hitType === 'tool' || hit?.hitType === 'tool-screen') {
          onSelectMode('tools', hit.index);
        } else if (hit?.hitType === 'cabinet' || hit?.hitType === 'cabinet-screen') {
          onSelectMode('games', hit.index);
        } else if (hit?.hitType === 'wing-tools') {
          onSelectMode('tools', activeToolIndex);
        } else if (hit?.hitType === 'wing-games') {
          onSelectMode('games', activeGameIndex);
        } else {
          const rect = renderer.domElement.getBoundingClientRect();
          const isLeftHalf = e.clientX - rect.left < rect.width * 0.5;
          onSelectMode(isLeftHalf ? 'tools' : 'games');
        }
        return;
      }

      if (currentMode === 'tools') {
        if (hit?.hitType === 'tool-screen' && hit.index === activeToolIndex) {
          onLaunchTool(activeToolIndex);
        } else if (hit?.hitType === 'tool' || hit?.hitType === 'tool-screen') {
          if (hit.index === activeToolIndex) {
            onLaunchTool(activeToolIndex);
          } else {
            onSelectTool(hit.index);
          }
        } else if (
          hit?.hitType === 'cabinet' ||
          hit?.hitType === 'cabinet-screen' ||
          hit?.hitType === 'wing-games'
        ) {
          onSelectMode('games', hit.index ?? activeGameIndex);
        }
        return;
      }

      if (currentMode === 'games') {
        if (hit?.hitType === 'cabinet-screen' && hit.index === activeGameIndex) {
          onLaunchGame(activeGameIndex);
        } else if (hit?.hitType === 'cabinet' || hit?.hitType === 'cabinet-screen') {
          if (hit.index === activeGameIndex) {
            onLaunchGame(activeGameIndex);
          } else {
            onSelectGame(hit.index);
          }
        } else if (
          hit?.hitType === 'tool' ||
          hit?.hitType === 'tool-screen' ||
          hit?.hitType === 'wing-tools'
        ) {
          onSelectMode('tools', hit.index ?? activeToolIndex);
        }
      }
    }
  }

  let wheelCooldown = 0;
  function onWheel(e) {
    if (isPaused || currentMode === 'hub') return;
    const now = performance.now();
    if (now - wheelCooldown < 340) return;
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(delta) < 22) return;
    wheelCooldown = now;
    const dir = delta > 0 ? 1 : -1;
    if (currentMode === 'games') {
      const next = THREE.MathUtils.clamp(activeGameIndex + dir, 0, games.length - 1);
      if (next !== activeGameIndex) onSelectGame(next);
    } else if (currentMode === 'tools') {
      const next = THREE.MathUtils.clamp(activeToolIndex + dir, 0, tools.length - 1);
      if (next !== activeToolIndex) onSelectTool(next);
    }
  }

  const domEl = renderer.domElement;
  domEl.addEventListener('pointerdown', onPointerDown);
  window.addEventListener('pointermove', onPointerMove, { passive: true });
  window.addEventListener('pointerup', onPointerUp);
  domEl.addEventListener('wheel', onWheel, { passive: true });

  // =========================================================================
  // Smooth 60fps Animation Loop
  // =========================================================================
  const clock = new THREE.Clock();
  let rafId = 0;

  function tick() {
    if (isDisposed || isPaused) return;
    rafId = requestAnimationFrame(tick);

    const dt = Math.min(clock.getDelta(), 0.05);
    const elapsed = clock.elapsedTime;
    const damp = 1 - Math.exp(-7.5 * dt);

    const parallaxX = pointerNdc.x * (currentMode === 'hub' ? 0.28 : 0.1) + dragPreviewOffset;
    const parallaxY = pointerNdc.y * (currentMode === 'hub' ? 0.14 : 0.06);

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetCamPos.x + parallaxX, damp);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetCamPos.y + parallaxY, damp);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetCamPos.z, damp);

    currentLookAt.x = THREE.MathUtils.lerp(
      currentLookAt.x,
      targetLookAt.x + dragPreviewOffset * 0.65,
      damp
    );
    currentLookAt.y = THREE.MathUtils.lerp(currentLookAt.y, targetLookAt.y, damp);
    currentLookAt.z = THREE.MathUtils.lerp(currentLookAt.z, targetLookAt.z, damp);
    camera.lookAt(currentLookAt);

    if (workshopEnv.briefSheetMat) {
      workshopEnv.briefSheetMat.emissiveIntensity = hoveredBrief
        ? 0.62
        : 0.38 + Math.sin(elapsed * 2.0) * 0.04;
    }

    // Animate 7 Bespoke Sunlit Workshop Benches on Left
    toolNodes.forEach((node, idx) => {
      const isSelected = currentMode === 'tools' && idx === activeToolIndex;
      const isHovered = idx === hoveredToolIdx;
      const matchBoost = node.audienceMatch ? 1 : 0.38;
      const targetPop = isSelected ? 0.16 : isHovered ? 0.07 : 0;
      node.currentPop = THREE.MathUtils.lerp(node.currentPop, targetPop, damp);

      node.root.position.z = node.baseZ + node.currentPop;
      node.glowRing.material.opacity = isSelected
        ? 0.28 + Math.sin(elapsed * 3.0) * 0.05
        : isHovered
          ? 0.18
          : 0.09 * matchBoost;
      node.trimMat.emissiveIntensity = isSelected ? 0.85 : 0.42 * matchBoost;
      node.screenMat.emissiveIntensity = isSelected
        ? 0.38
        : isHovered
          ? 0.32
          : 0.24 * matchBoost;
      node.animateIdle?.(elapsed, isSelected, isHovered);
    });

    // Animate 7 Garage Game Room Hardware Setups on Right
    cabinetNodes.forEach((cab, idx) => {
      const isSelected = currentMode === 'games' && idx === activeGameIndex;
      const isHovered = idx === hoveredCabIdx;
      const matchBoost = cab.audienceMatch ? 1 : 0.35;
      const targetPop = isSelected ? 0.16 : isHovered ? 0.07 : 0;
      cab.currentPop = THREE.MathUtils.lerp(cab.currentPop, targetPop, damp);

      cab.root.position.z = cab.baseZ + cab.currentPop;
      cab.glowRing.material.opacity = isSelected
        ? 0.34 + Math.sin(elapsed * 3.2) * 0.06
        : isHovered
          ? 0.22
          : 0.12 * matchBoost;
      cab.trimMat.emissiveIntensity = isSelected ? 0.85 : 0.45 * matchBoost;
      cab.screenMat.emissiveIntensity = isSelected ? 1.04 : 0.86 * matchBoost;
    });

    renderer.render(scene, camera);
  }

  tick();

  function rebuildSigns() {
    const oldToolsTex = toolsSignMesh.material.map;
    toolsSignMesh.material.map = createEditorialSignTexture(
      currentSignTexts.signTools,
      currentSignTexts.signToolsSub
    );
    toolsSignMesh.material.needsUpdate = true;
    oldToolsTex?.dispose();

    const oldGamesTex = gamesSignMesh.material.map;
    gamesSignMesh.material.map = createGarageSignTexture(
      currentSignTexts.signGames,
      currentSignTexts.signGamesSub
    );
    gamesSignMesh.material.needsUpdate = true;
    oldGamesTex?.dispose();
  }

  return {
    setState({ mode, toolIndex, gameIndex, zoomed }) {
      currentMode = mode;
      if (typeof toolIndex === 'number') activeToolIndex = toolIndex;
      if (typeof gameIndex === 'number') activeGameIndex = gameIndex;
      if (typeof zoomed === 'boolean') isZoomedIntoScreen = zoomed;
      recomputeCameraTargets();
    },
    setAudienceFilter(filter) {
      toolNodes.forEach((node) => {
        node.audienceMatch = filter === 'all' || (node.item.audiences || []).includes(filter);
      });
      cabinetNodes.forEach((cab) => {
        cab.audienceMatch = filter === 'all' || (cab.item.audiences || []).includes(filter);
      });
    },
    setSignsText({ signTools, signToolsSub, signGames, signGamesSub }) {
      currentSignTexts = { signTools, signToolsSub, signGames, signGamesSub };
      rebuildSigns();
    },
    refreshTypographyTextures() {
      rebuildSigns();
      workshopEnv.briefSheetMat?.map?.userData?.redraw?.();
      toolNodes.forEach((node) => {
        node.screenMat.map?.userData?.redraw?.();
        node.extraTexMats?.forEach((mat) => {
          mat.map?.userData?.redraw?.();
        });
      });
      cabinetNodes.forEach((cab) => {
        if (cab.marqueeMat) {
          const oldM = cab.marqueeMat.map;
          const nextM = createCabinetMarqueeTexture(cab.item);
          cab.marqueeMat.map = nextM;
          cab.marqueeMat.emissiveMap = nextM;
          cab.marqueeMat.needsUpdate = true;
          oldM?.dispose();
        }
        cab.screenMat.map?.userData?.redraw?.();
        cab.extraTexMats?.forEach((mat) => {
          mat.map?.userData?.redraw?.();
        });
      });
    },
    setPaused(paused) {
      if (isPaused === paused) return;
      isPaused = paused;
      if (!isPaused && !isDisposed) {
        clock.getDelta();
        tick();
      } else {
        cancelAnimationFrame(rafId);
      }
    },
    resize,
    dispose() {
      isDisposed = true;
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      domEl.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      domEl.removeEventListener('wheel', onWheel);
      renderer.dispose();
      domEl.remove();
    }
  };
}
