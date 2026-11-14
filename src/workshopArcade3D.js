import * as THREE from 'three';

/**
 * Dual-Identity 3D Scene:
 *   LEFT  (x < 0) = Sunlit Swiss Editorial Print & Design Studio (Framed Folios & Proof Table)
 *   RIGHT (x > 0) = 1986 Shibuya Wet-Asphalt CRT Cyber-Arcade (7 Neon Cabinets)
 *   SEAM  (x = 0) = Literal Day-vs-Night Architectural & Atmospheric Threshold
 */

const ED_PAPER = '#faf6ee';
const ED_WALL = '#f2ece1';
const ED_INK = '#151413';
const ED_VERMILION = '#c83e2b';
const ED_BRASS = '#b08d57';

const ARC_PINK = '#ff2a85';
const ARC_CYAN = '#00f0ff';

function createEditorialSignTexture(title, subtitle) {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  // Warm archival cotton-rag masthead stock
  ctx.fillStyle = ED_PAPER;
  ctx.fillRect(0, 0, 1024, 256);

  // Outer sumi-ink gallery frame + hair-thin inner double rule
  ctx.strokeStyle = ED_INK;
  ctx.lineWidth = 10;
  ctx.strokeRect(5, 5, 1014, 246);

  ctx.lineWidth = 2;
  ctx.strokeRect(22, 22, 980, 212);
  ctx.strokeRect(28, 28, 968, 200);

  // Top editorial colophon rule
  ctx.beginPath();
  ctx.moveTo(44, 66);
  ctx.lineTo(980, 66);
  ctx.stroke();

  ctx.fillStyle = ED_INK;
  ctx.font = '700 17px "Space Mono", ui-monospace, monospace';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('§ EDITION N° 07 — PRINT & DIGITAL ATELIER', 48, 47);

  // Top-right vermilion ink stamp
  ctx.fillStyle = ED_VERMILION;
  ctx.fillRect(808, 34, 168, 26);
  ctx.fillStyle = '#ffffff';
  ctx.font = '700 15px "Space Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('ARCHIVE LIVE', 892, 48);

  // Main expressive editorial serif masthead
  const fontSize = title.length > 12 ? 62 : 76;
  ctx.font = `700 ${fontSize}px "Fraunces", Georgia, serif`;
  ctx.fillStyle = ED_INK;
  ctx.textAlign = 'center';
  ctx.fillText(title.toUpperCase(), 512, 126);

  // Bottom colophon rule + caption
  ctx.strokeStyle = ED_INK;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(120, 178);
  ctx.lineTo(904, 178);
  ctx.stroke();

  ctx.fillStyle = ED_VERMILION;
  ctx.font = '700 19px "Space Mono", ui-monospace, monospace';
  ctx.fillText(subtitle.toUpperCase(), 512, 204);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

function createArcadeSignTexture(title, subtitle) {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#080312';
  ctx.fillRect(0, 0, 1024, 256);

  ctx.fillStyle = 'rgba(255, 42, 133, 0.07)';
  for (let y = 0; y < 256; y += 8) {
    ctx.fillRect(0, y, 1024, 3);
  }

  const cut = 28;
  ctx.beginPath();
  ctx.moveTo(16 + cut, 16);
  ctx.lineTo(1008, 16);
  ctx.lineTo(1008, 240 - cut);
  ctx.lineTo(1008 - cut, 240);
  ctx.lineTo(16, 240);
  ctx.lineTo(16, 16 + cut);
  ctx.closePath();
  ctx.strokeStyle = ARC_PINK;
  ctx.lineWidth = 9;
  ctx.shadowColor = ARC_PINK;
  ctx.shadowBlur = 28;
  ctx.stroke();

  ctx.shadowColor = ARC_CYAN;
  ctx.shadowBlur = 14;
  ctx.strokeStyle = ARC_CYAN;
  ctx.lineWidth = 3;
  ctx.strokeRect(34, 34, 956, 188);

  ctx.shadowBlur = 0;
  ctx.font = '700 18px "Silkscreen", monospace';
  ctx.fillStyle = '#fde047';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('1UP • CREDIT 07', 52, 56);
  ctx.fillStyle = ARC_CYAN;
  ctx.textAlign = 'right';
  ctx.fillText('SHIBUYA 1986', 972, 56);

  const fontSize = title.length > 10 ? 60 : 80;
  ctx.font = `800 ${fontSize}px "Syne", system-ui, sans-serif`;
  ctx.textAlign = 'center';
  ctx.shadowColor = ARC_PINK;
  ctx.shadowBlur = 28;
  ctx.fillStyle = '#ffffff';
  ctx.fillText(title.toUpperCase(), 512, 120);

  ctx.shadowBlur = 10;
  ctx.shadowColor = ARC_CYAN;
  ctx.font = '700 21px "Silkscreen", system-ui, monospace';
  ctx.fillStyle = ARC_CYAN;
  ctx.fillText(subtitle.toUpperCase(), 512, 194);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

/**
 * Draws bespoke Swiss Modernist editorial print artwork inside each framed gallery folio
 */
function drawSwissEditorialMotif(ctx, tool, idx) {
  const cx = 256;
  const cy = 224;

  ctx.save();
  // Subtle archival cream plate background inside passe-partout
  ctx.fillStyle = '#f1ebe0';
  ctx.fillRect(42, 92, 428, 252);
  ctx.strokeStyle = ED_INK;
  ctx.lineWidth = 2;
  ctx.strokeRect(42, 92, 428, 252);

  switch (tool.toolShape) {
    case 'roller': {
      // 01: Editorial Split Spread (Wireframe Before vs. Black/Gold Luxury After)
      ctx.fillStyle = '#e5e0d5';
      ctx.fillRect(44, 94, 212, 248);
      ctx.strokeStyle = '#8c857b';
      ctx.lineWidth = 2;
      ctx.strokeRect(64, 118, 172, 28);
      ctx.strokeRect(64, 160, 80, 96);
      ctx.strokeRect(156, 160, 80, 96);
      ctx.fillStyle = '#6b655c';
      ctx.font = '700 14px "Space Mono", monospace';
      ctx.textAlign = 'left';
      ctx.fillText('BEFORE', 66, 137);

      ctx.fillStyle = ED_INK;
      ctx.fillRect(256, 94, 212, 248);
      ctx.fillStyle = ED_PAPER;
      ctx.font = 'italic 700 26px "Fraunces", Georgia, serif';
      ctx.textAlign = 'center';
      ctx.fillText('Relais', 362, 178);
      ctx.fillText('Palais', 362, 208);
      ctx.fillStyle = ED_VERMILION;
      ctx.fillRect(306, 232, 112, 26);
      ctx.fillStyle = '#ffffff';
      ctx.font = '700 12px "Space Mono", monospace';
      ctx.fillText('AFTER →', 362, 249);

      // Vermilion split rule
      ctx.strokeStyle = ED_VERMILION;
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(256, 92);
      ctx.lineTo(256, 344);
      ctx.stroke();
      break;
    }

    case 'camera-loupe': {
      // 02: Medium-Format Contact Sheet & Exposure Crop Marks
      ctx.strokeStyle = ED_INK;
      ctx.lineWidth = 2.5;
      // Crop L-brackets
      [
        [80, 118, 1, 1],
        [432, 118, -1, 1],
        [80, 318, 1, -1],
        [432, 318, -1, -1]
      ].forEach(([bx, by, sx, sy]) => {
        ctx.beginPath();
        ctx.moveTo(bx, by + sy * 26);
        ctx.lineTo(bx, by);
        ctx.lineTo(bx + sx * 26, by);
        ctx.stroke();
      });

      // Swiss modernist sun/lens study
      ctx.fillStyle = ED_INK;
      ctx.beginPath();
      ctx.arc(cx - 46, cy - 4, 66, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = ED_VERMILION;
      ctx.beginPath();
      ctx.arc(cx + 28, cy - 18, 42, 0, Math.PI * 2);
      ctx.fill();

      // Color calibration swatch strip
      ['#151413', '#c83e2b', '#d97706', '#b08d57', '#faf6ee'].forEach((col, i) => {
        ctx.fillStyle = col;
        ctx.fillRect(346, 134 + i * 32, 56, 24);
        ctx.strokeRect(346, 134 + i * 32, 56, 24);
      });
      break;
    }

    case 'airbrush': {
      // 03: Chiaroscuro Light & Shadow Sphere Study
      const grad = ctx.createRadialGradient(cx - 28, cy - 28, 12, cx, cy, 86);
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(0.48, '#d6cec2');
      grad.addColorStop(1, ED_INK);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, 82, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = ED_INK;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Golden-ratio orbit ring
      ctx.strokeStyle = ED_VERMILION;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.ellipse(cx, cy, 134, 42, -0.28, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = ED_VERMILION;
      ctx.beginPath();
      ctx.arc(cx - 116, cy + 34, 10, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'clapper': {
      // 04: 35mm Cinema Contact Storyboard Strip (3 Scenes)
      ctx.fillStyle = ED_INK;
      ctx.fillRect(58, 126, 396, 184);

      // Sprocket holes top & bottom
      ctx.fillStyle = ED_PAPER;
      for (let x = 72; x < 444; x += 28) {
        ctx.fillRect(x, 134, 14, 10);
        ctx.fillRect(x, 290, 14, 10);
      }

      // 3 Storyboard frames
      ['I', 'II', 'III'].forEach((roman, i) => {
        const fx = 74 + i * 124;
        ctx.fillStyle = i === 1 ? ED_VERMILION : '#f5efe4';
        ctx.fillRect(fx, 154, 112, 124);
        ctx.fillStyle = i === 1 ? '#ffffff' : ED_INK;
        ctx.font = 'italic 700 32px "Fraunces", serif';
        ctx.textAlign = 'center';
        ctx.fillText(roman, fx + 56, 224);
      });
      break;
    }

    case 'film-reel': {
      // 05: Vertical 9:16 Editorial Reel + Audio Waveform Spec
      ctx.fillStyle = ED_INK;
      ctx.fillRect(92, 108, 126, 218);
      ctx.fillStyle = ED_VERMILION;
      ctx.fillRect(102, 118, 106, 152);
      ctx.fillStyle = '#ffffff';
      ctx.font = '700 22px "Fraunces", serif';
      ctx.textAlign = 'center';
      ctx.fillText('9:16', 155, 200);
      ctx.fillStyle = ED_PAPER;
      ctx.fillRect(108, 282, 94, 12);
      ctx.fillRect(122, 300, 66, 10);

      // Editorial audio waveform bars on right
      for (let b = 0; b < 14; b++) {
        const bh = 28 + Math.abs(Math.sin(b * 0.85 + 1)) * 116;
        ctx.fillStyle = b % 4 === 0 ? ED_VERMILION : ED_INK;
        ctx.fillRect(250 + b * 14, cy - bh / 2, 8, bh);
      }
      break;
    }

    case 'scale': {
      // 06: Broadsheet Financial Ledger & Unit-Economics Chart
      ctx.strokeStyle = 'rgba(21, 20, 19, 0.2)';
      ctx.lineWidth = 1;
      for (let y = 124; y <= 316; y += 38) {
        ctx.beginPath();
        ctx.moveTo(68, y);
        ctx.lineTo(444, y);
        ctx.stroke();
      }

      const heights = [64, 96, 128, 168, 204];
      heights.forEach((bh, i) => {
        const bx = 88 + i * 70;
        ctx.fillStyle = i === 4 ? ED_VERMILION : i === 3 ? ED_BRASS : ED_INK;
        ctx.fillRect(bx, 318 - bh, 46, bh);
      });

      ctx.fillStyle = ED_INK;
      ctx.font = '700 16px "Space Mono", monospace';
      ctx.textAlign = 'left';
      ctx.fillText('ROAS +3.8× // NET MARGIN', 72, 124);
      break;
    }

    case 'caliper':
    default: {
      // 07: International Typographic Specimen Grid
      ctx.strokeStyle = ED_INK;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(256, 104);
      ctx.lineTo(256, 332);
      ctx.moveTo(56, 218);
      ctx.lineTo(456, 218);
      ctx.stroke();

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = ED_INK;
      ctx.font = 'italic 700 54px "Fraunces", Georgia, serif';
      ctx.fillText('Aa', 156, 162);
      ctx.fillStyle = ED_VERMILION;
      ctx.font = '700 50px "Fraunces", Georgia, serif';
      ctx.fillText('Ññ', 356, 162);
      ctx.fillStyle = ED_INK;
      ctx.font = '700 48px system-ui, sans-serif';
      ctx.fillText('あ', 156, 274);
      ctx.fillText('ع', 356, 274);
      break;
    }
  }

  ctx.restore();
}

function createEditorialFolioTexture(tool, idx = 0) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 460;
  const ctx = canvas.getContext('2d');
  let loadedIcon = null;

  function draw() {
    // Museum cotton-rag passe-partout mat
    ctx.fillStyle = ED_PAPER;
    ctx.fillRect(0, 0, 512, 460);

    // Outer double letterpress border
    ctx.strokeStyle = ED_INK;
    ctx.lineWidth = 6;
    ctx.strokeRect(10, 10, 492, 440);
    ctx.lineWidth = 1.5;
    ctx.strokeRect(20, 20, 472, 420);

    // Top Editorial Masthead Row
    ctx.fillStyle = ED_INK;
    ctx.font = 'italic 700 28px "Fraunces", Georgia, serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(`N° 0${idx + 1}`, 42, 54);

    ctx.fillStyle = ED_VERMILION;
    ctx.fillRect(326, 36, 144, 34);
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 15px "Space Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(tool.badge.toUpperCase(), 398, 54);

    ctx.strokeStyle = ED_INK;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(42, 78);
    ctx.lineTo(470, 78);
    ctx.stroke();

    // Central Swiss Print Artwork
    drawSwissEditorialMotif(ctx, tool, idx);

    // Small stamped corner icon badge if loaded
    if (loadedIcon) {
      ctx.save();
      ctx.fillStyle = ED_PAPER;
      ctx.fillRect(408, 282, 52, 52);
      ctx.strokeStyle = ED_INK;
      ctx.lineWidth = 2;
      ctx.strokeRect(408, 282, 52, 52);
      ctx.drawImage(loadedIcon, 412, 286, 44, 44);
      ctx.restore();
    }

    // Bottom Serif Title & Colophon
    ctx.fillStyle = ED_INK;
    const titleSize = tool.shortName.length > 14 ? 30 : 35;
    ctx.font = `700 ${titleSize}px "Fraunces", Georgia, serif`;
    ctx.textAlign = 'left';
    ctx.fillText(tool.shortName, 42, 382);

    ctx.strokeStyle = 'rgba(21, 20, 19, 0.28)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(42, 404);
    ctx.lineTo(470, 404);
    ctx.stroke();

    ctx.fillStyle = '#57524a';
    ctx.font = '700 15px "Space Mono", monospace';
    ctx.fillText(tool.physicalLabel.toUpperCase(), 42, 424);

    ctx.fillStyle = ED_VERMILION;
    ctx.textAlign = 'right';
    ctx.fillText('OPEN →', 470, 424);
  }

  draw();
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;

  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.width = 128;
  img.height = 128;
  img.onload = () => {
    loadedIcon = img;
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

function createEditorialDeskMatTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Warm natural linen / portfolio desk blotter
  ctx.fillStyle = '#e8e0d2';
  ctx.fillRect(0, 0, 1024, 512);

  // Fine architectural column grid
  ctx.strokeStyle = 'rgba(21, 20, 19, 0.14)';
  ctx.lineWidth = 1.2;
  for (let x = 64; x < 1024; x += 64) {
    ctx.beginPath();
    ctx.moveTo(x, 28);
    ctx.lineTo(x, 484);
    ctx.stroke();
  }

  ctx.strokeStyle = ED_INK;
  ctx.lineWidth = 3;
  ctx.strokeRect(24, 24, 976, 464);
  ctx.lineWidth = 1;
  ctx.strokeRect(32, 32, 960, 448);

  // Laid-out editorial contact sheet cards in center of table
  [330, 512, 694].forEach((cx, i) => {
    ctx.save();
    ctx.translate(cx, 224);
    ctx.rotate((i - 1) * 0.045);
    ctx.fillStyle = ED_PAPER;
    ctx.fillRect(-74, -96, 148, 192);
    ctx.strokeStyle = ED_INK;
    ctx.lineWidth = 2;
    ctx.strokeRect(-74, -96, 148, 192);

    ctx.fillStyle = i === 1 ? ED_VERMILION : ED_INK;
    ctx.fillRect(-58, -78, 116, 104);
    ctx.fillStyle = ED_INK;
    ctx.fillRect(-58, 42, 96, 8);
    ctx.fillRect(-58, 58, 68, 6);
    ctx.restore();
  });

  ctx.fillStyle = ED_INK;
  ctx.font = '700 20px "Space Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('ATELIER PROOF TABLE — § I: BEFORE/AFTER EDITION   •   § II: COMMISSION BRIEF', 512, 458);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createBeforeAfterProofTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 640;
  canvas.height = 360;
  const ctx = canvas.getContext('2d');

  // Left Half: Dated generic template ("BEFORE")
  ctx.fillStyle = '#ddd8ce';
  ctx.fillRect(0, 0, 320, 360);
  ctx.fillStyle = '#9c9589';
  ctx.fillRect(22, 22, 276, 32);
  ctx.fillStyle = '#ffffff';
  ctx.font = '700 17px "Space Mono", monospace';
  ctx.fillText('BEFORE // GENERIC', 34, 44);
  ctx.fillStyle = '#ece8e0';
  ctx.fillRect(22, 74, 130, 124);
  ctx.fillRect(166, 74, 132, 124);
  ctx.fillStyle = '#aba498';
  ctx.fillRect(22, 216, 236, 16);
  ctx.fillRect(22, 244, 174, 16);
  ctx.fillStyle = '#4a4640';
  ctx.font = '700 18px "Space Mono", monospace';
  ctx.fillText('PLAIN STARTER SITE', 26, 318);

  // Right Half: Bespoke Editorial Flagship ("AFTER")
  ctx.fillStyle = ED_PAPER;
  ctx.fillRect(320, 0, 320, 360);

  ctx.fillStyle = ED_INK;
  ctx.fillRect(340, 22, 278, 32);
  ctx.fillStyle = ED_PAPER;
  ctx.font = '700 17px "Space Mono", monospace';
  ctx.fillText('AFTER // EDITORIAL', 354, 44);

  ctx.fillStyle = ED_INK;
  ctx.fillRect(340, 74, 278, 156);
  ctx.fillStyle = ED_PAPER;
  ctx.font = 'italic 700 32px "Fraunces", Georgia, serif';
  ctx.fillText('Relais Palais', 362, 140);
  ctx.font = '400 16px "Space Mono", monospace';
  ctx.fillStyle = '#d6cfc2';
  ctx.fillText('BESPOKE + BILINGUAL UX', 362, 176);

  ctx.fillStyle = ED_VERMILION;
  ctx.fillRect(340, 254, 278, 56);
  ctx.fillStyle = '#ffffff';
  ctx.font = '700 18px "Space Mono", monospace';
  ctx.fillText('▶ DRAG LIVE PROOF', 368, 289);

  // Center vermilion proof divider
  ctx.strokeStyle = ED_VERMILION;
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(320, 0);
  ctx.lineTo(320, 360);
  ctx.stroke();

  ctx.fillStyle = ED_PAPER;
  ctx.fillRect(294, 154, 52, 52);
  ctx.strokeStyle = ED_INK;
  ctx.lineWidth = 3;
  ctx.strokeRect(294, 154, 52, 52);
  ctx.fillStyle = ED_INK;
  ctx.font = '700 22px "Space Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('↔', 320, 187);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createCommissionDossierTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 384;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

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

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createMarqueeTexture(game, idx = 0) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 160;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createLinearGradient(0, 0, 512, 160);
  grad.addColorStop(0, '#070310');
  grad.addColorStop(0.5, game.cabinetBodyColor || '#1e0b2e');
  grad.addColorStop(1, '#070310');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 160);

  ctx.fillStyle = `${game.accent}26`;
  for (let x = -120; x < 620; x += 44) {
    ctx.beginPath();
    ctx.moveTo(x, 160);
    ctx.lineTo(x + 20, 160);
    ctx.lineTo(x + 80, 0);
    ctx.lineTo(x + 60, 0);
    ctx.closePath();
    ctx.fill();
  }

  ctx.strokeStyle = game.accent;
  ctx.lineWidth = 8;
  ctx.strokeRect(8, 8, 496, 144);

  ctx.strokeStyle = game.secondaryAccent;
  ctx.lineWidth = 2.5;
  ctx.strokeRect(18, 18, 476, 124);

  ctx.shadowColor = game.accent;
  ctx.shadowBlur = 24;
  ctx.fillStyle = '#ffffff';
  const titleLen = game.shortName.length;
  const fSize = titleLen > 11 ? 36 : 44;
  ctx.font = `800 ${fSize}px "Syne", system-ui, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(game.shortName.toUpperCase(), 256, 70);

  ctx.shadowBlur = 0;
  ctx.fillStyle = game.secondaryAccent;
  ctx.font = '700 17px "Silkscreen", monospace';
  ctx.fillText(`1P-0${idx + 1} ★ ${game.badge.toUpperCase()}`, 256, 124);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createCrtScreenTexture(game) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 384;
  const ctx = canvas.getContext('2d');
  let loadedImg = null;

  function draw() {
    const bg = ctx.createRadialGradient(256, 164, 24, 256, 192, 310);
    bg.addColorStop(0, '#23123d');
    bg.addColorStop(1, '#05020c');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 512, 384);

    // Perspective synth horizon grid in lower half
    ctx.strokeStyle = `${game.accent}55`;
    ctx.lineWidth = 2;
    for (let i = 0; i < 7; i++) {
      const y = 232 + i * 22;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(512, y);
      ctx.stroke();
    }

    // Top CRT OSD bar
    ctx.fillStyle = '#fde047';
    ctx.font = '700 15px "Silkscreen", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('1UP  004800', 22, 30);
    ctx.fillStyle = game.secondaryAccent;
    ctx.textAlign = 'right';
    ctx.fillText('CREDIT 01', 490, 30);

    // Prominent, unobstructed 152x152 Cabinet Logo Artwork
    const iconSize = 152;
    const ix = Math.round((512 - iconSize) / 2);
    const iy = 42;

    if (loadedImg) {
      ctx.save();
      ctx.shadowColor = game.accent;
      ctx.shadowBlur = 30;
      ctx.fillStyle = '#090414';
      ctx.fillRect(ix - 4, iy - 4, iconSize + 8, iconSize + 8);
      ctx.strokeStyle = game.accent;
      ctx.lineWidth = 4;
      ctx.strokeRect(ix - 4, iy - 4, iconSize + 8, iconSize + 8);
      ctx.drawImage(loadedImg, ix, iy, iconSize, iconSize);
      ctx.restore();
    } else {
      ctx.fillStyle = game.accent;
      ctx.fillRect(ix, iy, iconSize, iconSize);
    }

    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = game.accent;
    ctx.shadowBlur = 14;
    ctx.font = '800 31px "Syne", system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(game.shortName.toUpperCase(), 256, 236);
    ctx.shadowBlur = 0;

    // Angled arcade START prompt bar
    ctx.fillStyle = game.accent;
    ctx.beginPath();
    ctx.moveTo(86, 268);
    ctx.lineTo(442, 268);
    ctx.lineTo(426, 324);
    ctx.lineTo(70, 324);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#05020a';
    ctx.font = '700 20px "Silkscreen", monospace';
    ctx.fillText('▶ INSERT COIN • PLAY', 256, 303);

    // Subtle 15kHz CRT scanlines (lighter over logo so artwork pops!)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.22)';
    for (let y = 0; y < 384; y += 6) {
      ctx.fillRect(0, y, 512, 2);
    }

    ctx.strokeStyle = game.secondaryAccent;
    ctx.lineWidth = 5;
    ctx.strokeRect(8, 8, 496, 368);
  }

  draw();
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;

  const img = new Image();
  img.crossOrigin = 'anonymous';
  // Explicit width/height ensures viewBox-only SVGs (e.g. desired.svg, wild-peak.svg) rasterize crisply in all browsers
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

function createRightArcadeFloorTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#070311';
  ctx.fillRect(0, 0, 512, 512);

  ctx.strokeStyle = 'rgba(255, 42, 133, 0.34)';
  ctx.lineWidth = 3;
  ctx.strokeRect(0, 0, 512, 512);

  ctx.strokeStyle = 'rgba(0, 240, 255, 0.16)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(256, 0);
  ctx.lineTo(256, 512);
  ctx.moveTo(0, 256);
  ctx.lineTo(512, 256);
  ctx.stroke();

  ctx.fillStyle = 'rgba(0, 240, 255, 0.22)';
  ctx.beginPath();
  ctx.moveTo(256, 238);
  ctx.lineTo(274, 256);
  ctx.lineTo(256, 274);
  ctx.lineTo(238, 256);
  ctx.closePath();
  ctx.fill();

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(14, 18);
  return tex;
}

/**
 * Builds a Framed Museum-Grade Editorial Print Folio for the Left Design Studio
 */
function buildEditorialFolioNode(tool, idx) {
  const root = new THREE.Group();
  const folioW = 1.42;
  const folioH = 1.26;

  // Matte sumi-black gallery box frame
  const frameMat = new THREE.MeshStandardMaterial({
    color: ED_INK,
    roughness: 0.45,
    metalness: 0.15
  });
  const brassMat = new THREE.MeshStandardMaterial({
    color: ED_BRASS,
    roughness: 0.32,
    metalness: 0.78
  });

  const outerFrame = new THREE.Mesh(new THREE.BoxGeometry(folioW, folioH, 0.065), frameMat);
  root.add(outerFrame);

  // Warm antique-brass inner gallery fillet
  const brassFillet = new THREE.Mesh(
    new THREE.BoxGeometry(folioW - 0.05, folioH - 0.05, 0.07),
    brassMat
  );
  root.add(brassFillet);

  // High-DPI Editorial Print Poster face
  const folioTex = createEditorialFolioTexture(tool, idx);
  const printMat = new THREE.MeshStandardMaterial({
    map: folioTex,
    emissiveMap: folioTex,
    emissive: new THREE.Color('#fffaf0'),
    emissiveIntensity: 0.22,
    roughness: 0.58,
    metalness: 0.04
  });
  const printFace = new THREE.Mesh(
    new THREE.PlaneGeometry(folioW - 0.09, folioH - 0.09),
    printMat
  );
  printFace.position.z = 0.038;
  root.add(printFace);

  // Overhead Brass Museum Picture Light above each Folio
  const lampStem = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.04, 0.18), brassMat);
  lampStem.position.set(0, folioH / 2 + 0.05, 0.06);
  root.add(lampStem);

  const lampHood = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.036, 0.46, 14), brassMat);
  lampHood.rotation.z = Math.PI / 2;
  lampHood.position.set(0, folioH / 2 + 0.05, 0.15);
  root.add(lampHood);

  // Selection Vermilion Gallery Backing Mat Outline
  const highlightPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(folioW + 0.1, folioH + 0.1),
    new THREE.MeshBasicMaterial({
      color: new THREE.Color(ED_VERMILION),
      transparent: true,
      opacity: 0.0
    })
  );
  highlightPlane.position.z = -0.025;
  root.add(highlightPlane);

  return {
    root,
    printMat,
    highlightPlane
  };
}

/**
 * Builds each custom 3D 1986 Shibuya Neon Arcade Cabinet (with unobstructed recessed CRT bay!)
 */
function buildArcadeCabinet(game, index) {
  const root = new THREE.Group();
  const isWide = game.cabinetStyle === 'stadium-wide';
  const w = isWide ? 1.34 : 1.14;

  const bodyMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(game.cabinetBodyColor || '#120822'),
    roughness: 0.28,
    metalness: 0.42
  });
  const trimMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(game.accent),
    emissive: new THREE.Color(game.accent),
    emissiveIntensity: 0.85,
    roughness: 0.2
  });
  const secondaryTrimMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(game.secondaryAccent),
    emissive: new THREE.Color(game.secondaryAccent),
    emissiveIntensity: 0.65,
    roughness: 0.25
  });
  const darkMetalMat = new THREE.MeshStandardMaterial({
    color: 0x090512,
    roughness: 0.42,
    metalness: 0.72
  });

  // Lower coin-door base cabinet
  const lowerBox = new THREE.Mesh(new THREE.BoxGeometry(w, 1.32, 1.05), bodyMat);
  lowerBox.position.set(0, 0.66, 0);
  root.add(lowerBox);

  // Recessed CRT back housing (front face sits at z = +0.16, well behind tilted CRT screen!)
  const upperBackBox = new THREE.Mesh(new THREE.BoxGeometry(w - 0.06, 1.28, 0.68), bodyMat);
  upperBackBox.position.set(0, 1.92, -0.18);
  root.add(upperBackBox);

  // Left & Right Arcade Side Cheeks framing the recessed CRT bay
  [-w / 2 + 0.035, w / 2 - 0.035].forEach((cx) => {
    const cheek = new THREE.Mesh(new THREE.BoxGeometry(0.07, 1.28, 0.94), bodyMat);
    cheek.position.set(cx, 1.92, -0.04);
    root.add(cheek);
  });

  // Top illuminated Marquee Hood
  const marqueeHood = new THREE.Mesh(new THREE.BoxGeometry(w + 0.03, 0.4, 1.02), bodyMat);
  marqueeHood.position.set(0, 2.75, 0.0);
  root.add(marqueeHood);

  [-w / 2 - 0.012, w / 2 + 0.012].forEach((sx) => {
    const moldingLower = new THREE.Mesh(new THREE.BoxGeometry(0.028, 2.94, 0.045), trimMat);
    moldingLower.position.set(sx, 1.48, 0.45);
    root.add(moldingLower);

    const moldingTop = new THREE.Mesh(new THREE.BoxGeometry(0.028, 0.045, 1.0), trimMat);
    moldingTop.position.set(sx, 2.96, 0.0);
    root.add(moldingTop);
  });

  const marqueeTex = createMarqueeTexture(game, index);
  const marqueeMat = new THREE.MeshStandardMaterial({
    map: marqueeTex,
    emissiveMap: marqueeTex,
    emissive: new THREE.Color('#ffffff'),
    emissiveIntensity: 1.22,
    roughness: 0.16
  });
  const marqueePlane = new THREE.Mesh(new THREE.PlaneGeometry(w - 0.08, 0.34), marqueeMat);
  marqueePlane.position.set(0, 2.74, 0.525);
  marqueePlane.rotation.x = 0.08;
  root.add(marqueePlane);

  // Unobstructed CRT Screen sitting cleanly inside the side cheeks (z = 0.38, topZ = 0.31 > 0.16!)
  const crtTex = createCrtScreenTexture(game);
  const crtMat = new THREE.MeshStandardMaterial({
    map: crtTex,
    emissiveMap: crtTex,
    emissive: new THREE.Color('#ffffff'),
    emissiveIntensity: 0.98,
    roughness: 0.1,
    metalness: 0.15
  });
  const screenMesh = new THREE.Mesh(new THREE.PlaneGeometry(w - 0.18, 0.86), crtMat);
  screenMesh.position.set(0, 1.95, 0.38);
  screenMesh.rotation.x = -0.17;
  root.add(screenMesh);

  const controlDeck = new THREE.Mesh(new THREE.BoxGeometry(w + 0.02, 0.16, 0.48), darkMetalMat);
  controlDeck.position.set(0, 1.32, 0.46);
  controlDeck.rotation.x = 0.2;
  root.add(controlDeck);

  const stickOffsets = isWide ? [-0.34, 0.24] : [-0.24];
  stickOffsets.forEach((jx) => {
    const shaft = new THREE.Mesh(
      new THREE.CylinderGeometry(0.014, 0.014, 0.13, 10),
      new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.9, roughness: 0.15 })
    );
    shaft.position.set(jx, 1.44, 0.48);
    root.add(shaft);

    const ballTop = new THREE.Mesh(new THREE.SphereGeometry(0.044, 16, 16), trimMat);
    ballTop.position.set(jx, 1.51, 0.48);
    root.add(ballTop);
  });

  for (let b = 0; b < 4; b++) {
    const btn = new THREE.Mesh(
      new THREE.CylinderGeometry(0.028, 0.03, 0.03, 14),
      b % 2 === 0 ? trimMat : secondaryTrimMat
    );
    btn.position.set(0.08 + (b % 2) * 0.09, 1.415 - Math.floor(b / 2) * 0.015, 0.45 + Math.floor(b / 2) * 0.08);
    btn.rotation.x = 0.2;
    root.add(btn);
  }

  const coinDoor = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.52, 0.04), darkMetalMat);
  coinDoor.position.set(0, 0.68, 0.525);
  root.add(coinDoor);

  const coinSlotMat = new THREE.MeshStandardMaterial({
    color: 0xff3b30,
    emissive: 0xff3b30,
    emissiveIntensity: 1.5
  });
  [-0.09, 0.09].forEach((cx) => {
    const coinSlot = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.09, 0.05), coinSlotMat);
    coinSlot.position.set(cx, 0.78, 0.535);
    root.add(coinSlot);
  });

  if (game.cabinetStyle === 'velvet-deck') {
    const cardA = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.36, 0.025), trimMat);
    cardA.position.set(-0.08, 3.15, 0.08);
    cardA.rotation.z = 0.22;
    root.add(cardA);
    const cardB = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.36, 0.025), secondaryTrimMat);
    cardB.position.set(0.09, 3.15, 0.11);
    cardB.rotation.z = -0.2;
    root.add(cardB);
  } else if (game.cabinetStyle === 'gacha-dome') {
    const dome = new THREE.Mesh(
      new THREE.SphereGeometry(0.24, 20, 16, 0, Math.PI * 2, 0, Math.PI / 2),
      secondaryTrimMat
    );
    dome.position.set(0, 2.96, 0.0);
    root.add(dome);
  } else if (game.cabinetStyle === 'botanical-rts') {
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.03, 0.36, 10), trimMat);
    stem.position.set(0, 3.13, 0.05);
    root.add(stem);
    const leaf = new THREE.Mesh(new THREE.SphereGeometry(0.13, 14, 10), secondaryTrimMat);
    leaf.scale.set(1.5, 0.35, 0.8);
    leaf.position.set(0.11, 3.31, 0.05);
    leaf.rotation.z = 0.35;
    root.add(leaf);
  } else if (game.cabinetStyle === 'neon-slasher') {
    const crown = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.32, 4), trimMat);
    crown.position.set(0, 3.12, 0.12);
    crown.rotation.y = Math.PI / 4;
    root.add(crown);
  }

  const glowRing = new THREE.Mesh(
    new THREE.PlaneGeometry(w + 0.55, 1.65),
    new THREE.MeshBasicMaterial({
      color: new THREE.Color(game.accent),
      transparent: true,
      opacity: 0.25
    })
  );
  glowRing.rotation.x = -Math.PI / 2;
  glowRing.position.set(0, 0.012, 0.12);
  root.add(glowRing);

  const hitMesh = new THREE.Mesh(
    new THREE.BoxGeometry(w + 0.18, 3.15, 1.25),
    new THREE.MeshBasicMaterial({ visible: false })
  );
  hitMesh.position.set(0, 1.55, 0.05);
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
    trimMat,
    marqueeMat,
    crtMat
  };
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
  scene.background = new THREE.Color('#0c0a12');
  scene.fog = new THREE.FogExp2('#0b0910', 0.022);

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
  // Dual-World Lighting: Warm Sunlit Gallery Daylight (Left) vs. Shibuya Neon (Right)
  // =========================================================================
  const hemiLight = new THREE.HemisphereLight('#f5efe4', '#0f071a', 0.72);
  scene.add(hemiLight);

  // Sunlit museum gallery skylight on Left Atelier (x < 0)
  const atelierSunlight = new THREE.SpotLight('#fffaf0', 54, 32, Math.PI * 0.48, 0.42, 1.0);
  atelierSunlight.position.set(-5.2, 8.2, 6.8);
  atelierSunlight.target.position.set(-4.8, 2.3, -1.2);
  scene.add(atelierSunlight);
  scene.add(atelierSunlight.target);

  const galleryWarmBounce = new THREE.PointLight('#ffeed6', 7.5, 16);
  galleryWarmBounce.position.set(-3.2, 2.2, 3.0);
  scene.add(galleryWarmBounce);

  // 1986 Shibuya Neon Lights on Right Hall (x > 0)
  const arcadeMagentaLight = new THREE.PointLight(ARC_PINK, 18, 21);
  arcadeMagentaLight.position.set(4.4, 4.6, 3.8);
  scene.add(arcadeMagentaLight);

  const arcadeCyanLight = new THREE.PointLight(ARC_CYAN, 15, 24);
  arcadeCyanLight.position.set(10.0, 4.2, 5.2);
  scene.add(arcadeCyanLight);

  // =========================================================================
  // LITERAL DAY-VS-NIGHT SPLIT: Sunlit Gallery Plaster (Left) vs. Shibuya Night (Right)
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
    new THREE.PlaneGeometry(34, 18),
    new THREE.MeshStandardMaterial({
      color: '#06020d',
      roughness: 0.4,
      metalness: 0.35
    })
  );
  rightBackWall.position.set(17, 7.5, -5.2);
  scene.add(rightBackWall);

  [2.6, 6.8, 11.2].forEach((nx, i) => {
    const tubeColor = i % 2 === 0 ? ARC_PINK : ARC_CYAN;
    const tube = new THREE.Mesh(
      new THREE.BoxGeometry(0.05, 6.2, 0.05),
      new THREE.MeshBasicMaterial({ color: tubeColor })
    );
    tube.position.set(nx, 3.1, -4.6);
    scene.add(tube);
  });

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

  // Right Floor (x > 0): Glossy Wet Shibuya Asphalt + Neon Grid
  const rightFloor = new THREE.Mesh(
    new THREE.PlaneGeometry(32, 38),
    new THREE.MeshStandardMaterial({
      map: createRightArcadeFloorTexture(),
      roughness: 0.18,
      metalness: 0.78
    })
  );
  rightFloor.rotation.x = -Math.PI / 2;
  rightFloor.position.set(16, 0, 0);
  scene.add(rightFloor);

  // Dual-Sided Threshold Seam at x = 0 (Archival Paper/Vermilion Left + Neon Plasma Right)
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
    new THREE.MeshBasicMaterial({
      color: ARC_PINK
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
      color: '#090312',
      emissive: ARC_PINK,
      emissiveIntensity: 0.9,
      roughness: 0.2
    })
  );
  pillarRightHalf.position.set(0.045, 3.2, -2.1);
  scene.add(pillarRightHalf);

  // =========================================================================
  // LEFT WING: SWISS EDITORIAL PRINT & DESIGN STUDIO (7 FRAMED PRINT FOLIOS)
  // =========================================================================
  const atelierGroup = new THREE.Group();
  atelierGroup.position.set(-4.7, 0, -1.2);
  atelierGroup.rotation.y = 0.16;
  scene.add(atelierGroup);

  const wallW = 7.9;
  const wallH = 3.86;
  const wallCenterY = 2.7;

  // Blackened-Walnut / Sumi Architectural Gallery Frame
  const galleryMolding = new THREE.Mesh(
    new THREE.BoxGeometry(wallW + 0.26, wallH + 0.26, 0.14),
    new THREE.MeshStandardMaterial({
      color: ED_INK,
      roughness: 0.55,
      metalness: 0.12
    })
  );
  galleryMolding.position.set(0, wallCenterY, -0.06);
  atelierGroup.add(galleryMolding);

  // Warm Cotton-Plaster Museum Exhibition Wall
  const galleryWallFace = new THREE.Mesh(
    new THREE.BoxGeometry(wallW, wallH, 0.08),
    new THREE.MeshStandardMaterial({
      color: ED_WALL,
      roughness: 0.82,
      metalness: 0.04
    })
  );
  galleryWallFace.position.set(0, wallCenterY, 0);
  atelierGroup.add(galleryWallFace);

  // Two Brushed-Brass Architectural Gallery Hanging Rails
  const railMat = new THREE.MeshStandardMaterial({
    color: ED_BRASS,
    roughness: 0.32,
    metalness: 0.78
  });
  [4.18, 2.66].forEach((ry) => {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(wallW - 0.36, 0.032, 0.045), railMat);
    rail.position.set(0, ry, 0.055);
    atelierGroup.add(rail);
  });

  let currentSignTexts = {
    signTools: 'DESIGN STUDIO',
    signToolsSub: 'TAP ANY FRAMED FOLIO OR PROOF TABLE',
    signGames: 'ARCADE',
    signGamesSub: 'TAP OR SWIPE CABINETS TO PLAY'
  };

  const toolsSignMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(4.3, 1.04),
    new THREE.MeshBasicMaterial({
      map: createEditorialSignTexture(currentSignTexts.signTools, currentSignTexts.signToolsSub)
    })
  );
  toolsSignMesh.position.set(0, 5.18, 0.12);
  toolsSignMesh.userData = { hitType: 'wing-tools' };
  atelierGroup.add(toolsSignMesh);

  // Blackened-Ash & Warm-Linen Editorial Proof Table below the Gallery Wall
  const benchTop = new THREE.Mesh(
    new THREE.BoxGeometry(wallW + 0.34, 0.14, 1.46),
    new THREE.MeshStandardMaterial({ color: '#1b1917', roughness: 0.48, metalness: 0.14 })
  );
  benchTop.position.set(0, 0.68, 0.62);
  atelierGroup.add(benchTop);

  const brassTableEdge = new THREE.Mesh(
    new THREE.BoxGeometry(wallW + 0.36, 0.035, 0.03),
    railMat
  );
  brassTableEdge.position.set(0, 0.69, 1.34);
  atelierGroup.add(brassTableEdge);

  const deskBlotter = new THREE.Mesh(
    new THREE.PlaneGeometry(wallW - 0.36, 1.14),
    new THREE.MeshBasicMaterial({ map: createEditorialDeskMatTexture() })
  );
  deskBlotter.rotation.x = -Math.PI / 2;
  deskBlotter.position.set(0, 0.755, 0.64);
  atelierGroup.add(deskBlotter);

  // Left Table Stand: Tilted Before ↔ After Editorial Proof Display
  const monitorGroup = new THREE.Group();
  monitorGroup.position.set(-2.45, 0.75, 0.66);
  monitorGroup.rotation.y = 0.22;
  atelierGroup.add(monitorGroup);

  const monitorStand = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.05, 0.36),
    new THREE.MeshStandardMaterial({ color: ED_INK, roughness: 0.45 })
  );
  monitorStand.position.y = 0.025;
  monitorGroup.add(monitorStand);

  const monitorNeck = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.28, 0.07), railMat);
  monitorNeck.position.set(0, 0.16, -0.05);
  monitorGroup.add(monitorNeck);

  const monitorBezel = new THREE.Mesh(
    new THREE.BoxGeometry(1.52, 0.92, 0.06),
    new THREE.MeshStandardMaterial({
      color: ED_INK,
      emissive: ED_VERMILION,
      emissiveIntensity: 0.12,
      roughness: 0.42
    })
  );
  monitorBezel.position.set(0, 0.56, 0);
  monitorBezel.rotation.x = -0.16;
  monitorGroup.add(monitorBezel);

  const monitorScreenTex = createBeforeAfterProofTexture();
  const monitorScreen = new THREE.Mesh(
    new THREE.PlaneGeometry(1.4, 0.8),
    new THREE.MeshStandardMaterial({
      map: monitorScreenTex,
      emissiveMap: monitorScreenTex,
      emissive: new THREE.Color('#fffaf0'),
      emissiveIntensity: 0.75,
      roughness: 0.25
    })
  );
  monitorScreen.position.set(0, 0.56, 0.035);
  monitorScreen.rotation.x = -0.16;
  monitorScreen.userData = { hitType: 'workbench-makeover' };
  monitorGroup.add(monitorScreen);

  const monitorHit = new THREE.Mesh(
    new THREE.BoxGeometry(1.62, 1.05, 0.42),
    new THREE.MeshBasicMaterial({ visible: false })
  );
  monitorHit.position.set(0, 0.54, 0.04);
  monitorHit.userData = { hitType: 'workbench-makeover' };
  monitorGroup.add(monitorHit);

  // Right Table Stand: Archival Cream Commission Dossier
  const clipboardGroup = new THREE.Group();
  clipboardGroup.position.set(2.6, 0.76, 0.72);
  clipboardGroup.rotation.set(-1.18, -0.18, -0.08);
  atelierGroup.add(clipboardGroup);

  const clipBoardBack = new THREE.Mesh(
    new THREE.BoxGeometry(0.68, 0.9, 0.035),
    new THREE.MeshStandardMaterial({ color: ED_INK, roughness: 0.45 })
  );
  clipboardGroup.add(clipBoardBack);

  const clipSheetTex = createCommissionDossierTexture();
  const clipSheet = new THREE.Mesh(
    new THREE.PlaneGeometry(0.62, 0.82),
    new THREE.MeshStandardMaterial({
      map: clipSheetTex,
      emissiveMap: clipSheetTex,
      emissive: new THREE.Color('#fffaf0'),
      emissiveIntensity: 0.52,
      roughness: 0.35
    })
  );
  clipSheet.position.z = 0.022;
  clipboardGroup.add(clipSheet);

  const clipMetal = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.07, 0.055), railMat);
  clipMetal.position.set(0, 0.39, 0.03);
  clipboardGroup.add(clipMetal);

  const clipboardHit = new THREE.Mesh(
    new THREE.BoxGeometry(0.9, 1.05, 0.35),
    new THREE.MeshBasicMaterial({ visible: false })
  );
  clipboardHit.userData = { hitType: 'clipboard-brief' };
  clipboardGroup.add(clipboardHit);

  const workshopWingHit = new THREE.Mesh(
    new THREE.BoxGeometry(wallW + 0.6, 5.5, 1.6),
    new THREE.MeshBasicMaterial({ visible: false })
  );
  workshopWingHit.position.set(0, 2.75, 0.1);
  workshopWingHit.userData = { hitType: 'wing-tools' };
  atelierGroup.add(workshopWingHit);

  // 7 Framed Editorial Print Folios (4 upper gallery plates, 3 lower plates)
  const interactiveObjects = [monitorHit, monitorScreen, clipboardHit, toolsSignMesh, workshopWingHit];
  const toolNodes = [];

  tools.forEach((tool, idx) => {
    const isTopRow = idx < 4;
    const localX = isTopRow ? (idx - 1.5) * 1.84 : (idx - 5) * 1.96;
    const localY = isTopRow ? 3.46 : 1.92;

    const slotGroup = new THREE.Group();
    slotGroup.position.set(localX, localY, 0.06);
    atelierGroup.add(slotGroup);

    const folioBuilt = buildEditorialFolioNode(tool, idx);
    slotGroup.add(folioBuilt.root);

    const hitBox = new THREE.Mesh(
      new THREE.BoxGeometry(1.62, 1.42, 0.55),
      new THREE.MeshBasicMaterial({ visible: false })
    );
    hitBox.position.set(0, 0, 0.12);
    hitBox.userData = {
      hitType: 'tool',
      index: idx,
      id: tool.id
    };
    slotGroup.add(hitBox);
    interactiveObjects.unshift(hitBox);

    toolNodes.push({
      item: tool,
      index: idx,
      slotGroup,
      folioRoot: folioBuilt.root,
      printMat: folioBuilt.printMat,
      highlightPlane: folioBuilt.highlightPlane,
      currentLift: 0,
      audienceMatch: true
    });
  });

  // =========================================================================
  // RIGHT WING: 1986 SHIBUYA NEON CRT ARCADE ROW (7 PLAYABLE CABINETS)
  // =========================================================================
  const arcadeGroup = new THREE.Group();
  scene.add(arcadeGroup);

  const gamesSignMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(4.2, 1.02),
    new THREE.MeshBasicMaterial({
      map: createArcadeSignTexture(currentSignTexts.signGames, currentSignTexts.signGamesSub)
    })
  );
  gamesSignMesh.position.set(4.55, 5.08, -0.82);
  gamesSignMesh.rotation.y = -0.18;
  gamesSignMesh.userData = { hitType: 'wing-games' };
  arcadeGroup.add(gamesSignMesh);
  interactiveObjects.push(gamesSignMesh);

  const cabinetNodes = [];
  games.forEach((game, idx) => {
    const cx = 1.95 + idx * 1.54;
    const cz = -1.25 + idx * 0.25;
    const built = buildArcadeCabinet(game, idx);
    built.root.position.set(cx, 0, cz);
    built.root.rotation.y = -0.18;
    arcadeGroup.add(built.root);

    interactiveObjects.unshift(built.hitMesh);
    interactiveObjects.unshift(built.screenMesh);

    cabinetNodes.push({
      item: game,
      index: idx,
      ...built,
      currentPop: 0,
      audienceMatch: true
    });
  });

  // =========================================================================
  // Camera-on-Rails State Machine (Hub | Editorial Studio | Arcade Row | ZoomIn)
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
      const node = toolNodes[activeToolIndex] || toolNodes[0];
      node.slotGroup.getWorldPosition(tmpWorldPos);
      atelierGroup.getWorldQuaternion(tmpQuat);
      tmpForward.set(0, 0, 1).applyQuaternion(tmpQuat);

      if (isZoomedIntoScreen) {
        targetCamPos.copy(tmpWorldPos).addScaledVector(tmpForward, 0.95);
        targetLookAt.copy(tmpWorldPos);
      } else {
        const dist = isPortrait ? 4.35 : 3.28;
        targetCamPos.copy(tmpWorldPos).addScaledVector(tmpForward, dist);
        targetCamPos.y = tmpWorldPos.y - (isPortrait ? 0.34 : 0.22);
        targetLookAt.copy(tmpWorldPos);
        targetLookAt.y -= isPortrait ? 0.42 : 0.28;
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

        // Framed so Topper + Illuminated Marquee + Full CRT Logo + Joysticks sit cleanly above Inspector!
        const dist = isPortrait ? 4.75 : 3.78;
        targetCamPos.copy(tmpWorldPos).addScaledVector(tmpForward, dist);
        targetCamPos.y = isPortrait ? 2.12 : 2.24;

        targetLookAt.copy(tmpWorldPos);
        targetLookAt.y = isPortrait ? 1.56 : 1.92;
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
  let hoveredMonitor = false;
  let lastHubLean = 'center';

  function getRaycastHit(clientX, clientY) {
    const rect = renderer.domElement.getBoundingClientRect();
    const nx = ((clientX - rect.left) / rect.width) * 2 - 1;
    const ny = -((clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera({ x: nx, y: ny }, camera);
    const hits = raycaster.intersectObjects(interactiveObjects, false);
    return hits.length > 0 ? hits[0].object.userData : null;
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
    const nextToolIdx = hit?.hitType === 'tool' ? hit.index : -1;
    const nextCabIdx =
      hit?.hitType === 'cabinet' || hit?.hitType === 'cabinet-screen' ? hit.index : -1;
    const nextMonitor = hit?.hitType === 'workbench-makeover';

    if (nextToolIdx !== -1 && nextToolIdx !== hoveredToolIdx) {
      onHoverItem?.('tool', nextToolIdx);
    } else if (nextCabIdx !== -1 && nextCabIdx !== hoveredCabIdx) {
      onHoverItem?.('arcade', nextCabIdx);
    } else if (nextMonitor && !hoveredMonitor) {
      onHoverItem?.('tool', 0);
    }

    hoveredToolIdx = nextToolIdx;
    hoveredCabIdx = nextCabIdx;
    hoveredMonitor = nextMonitor;
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
      const dir = dx < 0 ? 1 : -1;
      if (currentMode === 'games') {
        const nextIdx = THREE.MathUtils.clamp(activeGameIndex + dir, 0, games.length - 1);
        if (nextIdx !== activeGameIndex) onSelectGame(nextIdx);
      } else if (currentMode === 'tools') {
        const nextIdx = THREE.MathUtils.clamp(activeToolIndex + dir, 0, tools.length - 1);
        if (nextIdx !== activeToolIndex) onSelectTool(nextIdx);
      } else if (currentMode === 'hub') {
        onSelectMode(dir > 0 ? 'games' : 'tools');
      }
      return;
    }

    if (absX < 14 && absY < 14) {
      const hit = getRaycastHit(e.clientX, e.clientY);

      if (hit?.hitType === 'clipboard-brief') {
        onOpenBrief?.();
        return;
      }

      if (hit?.hitType === 'workbench-makeover') {
        if (currentMode !== 'tools') {
          onSelectMode('tools', 0);
        }
        onLaunchTool(0);
        return;
      }

      if (currentMode === 'hub') {
        if (hit?.hitType === 'tool') {
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
        if (hit?.hitType === 'tool') {
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
        } else if (hit?.hitType === 'tool' || hit?.hitType === 'wing-tools') {
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

    monitorBezel.material.emissiveIntensity = hoveredMonitor
      ? 0.55
      : 0.12 + Math.sin(elapsed * 2.4) * 0.04;

    // Animate 7 Framed Editorial Print Folios on Left Gallery Wall
    toolNodes.forEach((node, idx) => {
      const isSelected = currentMode === 'tools' && idx === activeToolIndex;
      const isHovered = idx === hoveredToolIdx;
      const matchBoost = node.audienceMatch ? 1 : 0.38;
      const targetLift = isSelected ? 0.26 : isHovered ? 0.12 : node.audienceMatch ? 0 : -0.03;
      node.currentLift = THREE.MathUtils.lerp(node.currentLift, targetLift, damp);

      node.folioRoot.position.z = node.currentLift;
      node.folioRoot.rotation.y = isSelected ? Math.sin(elapsed * 1.4) * 0.035 : 0;
      node.highlightPlane.material.opacity = isSelected ? 0.95 : isHovered ? 0.55 : 0.0;
      node.printMat.emissiveIntensity = isSelected
        ? 0.42
        : isHovered
          ? 0.3
          : 0.18 * matchBoost;
    });

    // Animate 7 1986 Shibuya Neon Arcade Cabinets on Right
    cabinetNodes.forEach((cab, idx) => {
      const isSelected = currentMode === 'games' && idx === activeGameIndex;
      const isHovered = idx === hoveredCabIdx;
      const matchBoost = cab.audienceMatch ? 1 : 0.35;
      const targetPop = isSelected ? 0.22 : isHovered ? 0.09 : 0;
      cab.currentPop = THREE.MathUtils.lerp(cab.currentPop, targetPop, damp);

      const baseZ = -1.25 + idx * 0.25;
      cab.root.position.z = baseZ + cab.currentPop;
      cab.glowRing.material.opacity = isSelected
        ? 0.5 + Math.sin(elapsed * 4.5) * 0.09
        : isHovered
          ? 0.32
          : 0.18 * matchBoost;
      cab.trimMat.emissiveIntensity = isSelected ? 1.35 : 0.78 * matchBoost;
      cab.crtMat.emissiveIntensity = isSelected ? 1.05 : 0.88 * matchBoost;
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
    gamesSignMesh.material.map = createArcadeSignTexture(
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
      toolNodes.forEach((node) => {
        node.printMat.map?.userData?.redraw?.();
      });
      cabinetNodes.forEach((cab, idx) => {
        const oldM = cab.marqueeMat.map;
        const nextM = createMarqueeTexture(cab.item, idx);
        cab.marqueeMat.map = nextM;
        cab.marqueeMat.emissiveMap = nextM;
        cab.marqueeMat.needsUpdate = true;
        oldM?.dispose();
        cab.crtMat.map?.userData?.redraw?.();
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
