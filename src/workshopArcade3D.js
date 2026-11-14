import * as THREE from 'three';

/**
 * Dual-Identity 3D Scene:
 *   LEFT  (x < 0) = Sunlit Swiss Editorial Print & Design Studio (Framed Folios & Proof Table)
 *   RIGHT (x > 0) = Cozy Tactile Garage Game Room (7 Distinct Setups: Mobile, Handhelds, Cab, PC & Consoles)
 *   SEAM  (x = 0) = Architectural Threshold Between Print Atelier & Garage Game Room
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

  // Sunlit museum gallery skylight on Left Atelier (x < 0)
  const atelierSunlight = new THREE.SpotLight('#fffaf0', 54, 32, Math.PI * 0.48, 0.42, 1.0);
  atelierSunlight.position.set(-5.2, 8.2, 6.8);
  atelierSunlight.target.position.set(-4.8, 2.3, -1.2);
  scene.add(atelierSunlight);
  scene.add(atelierSunlight.target);

  const galleryWarmBounce = new THREE.PointLight('#ffeed6', 7.5, 16);
  galleryWarmBounce.position.set(-3.2, 2.2, 3.0);
  scene.add(galleryWarmBounce);

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
    signGames: 'GARAGE GAME ROOM',
    signGamesSub: 'TAP OR SWIPE SETUPS TO PLAY'
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
      toolNodes.forEach((node) => {
        node.printMat.map?.userData?.redraw?.();
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
