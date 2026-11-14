import * as THREE from 'three';

/**
 * Dual-Identity 3D Scene:
 *   LEFT  (x < 0) = Braun / Teenage Engineering Anodized Hardware Lab & Pegboard
 *   RIGHT (x > 0) = 1986 Shibuya Wet-Asphalt CRT Cyber-Arcade
 *   SEAM  (x = 0) = Literal Physical & Atmospheric Split Threshold
 */

const HW_PUTTY = '#ebe5d8';
const HW_INK = '#14171c';
const HW_ORANGE = '#ff5500';
const ARC_PINK = '#ff2a85';
const ARC_CYAN = '#00f0ff';

function createWorkshopSignTexture(title, subtitle) {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  // Anodized warm-putty Braun/TE faceplate
  ctx.fillStyle = HW_PUTTY;
  ctx.fillRect(0, 0, 1024, 256);

  // Heavy gunmetal outer bezel + recessed inner rule
  ctx.strokeStyle = HW_INK;
  ctx.lineWidth = 14;
  ctx.strokeRect(7, 7, 1010, 242);

  ctx.lineWidth = 3;
  ctx.strokeRect(26, 26, 972, 204);

  // Top-left safety-orange module badge
  ctx.fillStyle = HW_ORANGE;
  ctx.fillRect(26, 26, 210, 40);
  ctx.fillStyle = '#ffffff';
  ctx.font = '700 20px "IBM Plex Mono", ui-monospace, monospace';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('SYS.01 // LAB', 42, 47);

  // Top-right serial stamp
  ctx.fillStyle = '#525866';
  ctx.textAlign = 'right';
  ctx.fillText('REV.04 • 24V DC', 978, 47);

  // Corner screw crosshairs
  ctx.fillStyle = HW_INK;
  ctx.font = '700 24px "IBM Plex Mono", monospace';
  ctx.textAlign = 'center';
  [
    [46, 208],
    [978, 208]
  ].forEach(([sx, sy]) => {
    ctx.fillText('+', sx, sy);
  });

  // Main stamped hardware title
  const fontSize = title.length > 10 ? 64 : 84;
  ctx.font = `700 ${fontSize}px "Chakra Petch", system-ui, sans-serif`;
  ctx.fillStyle = HW_INK;
  ctx.textAlign = 'center';
  ctx.fillText(title.toUpperCase(), 512, 118);

  // Bottom dark gunmetal spec strip
  ctx.fillStyle = HW_INK;
  ctx.fillRect(140, 174, 744, 40);
  ctx.fillStyle = HW_PUTTY;
  ctx.font = '600 21px "IBM Plex Mono", system-ui, monospace';
  ctx.fillText(subtitle.toUpperCase(), 512, 195);

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

  // Deep Shibuya night acrylic
  ctx.fillStyle = '#080312';
  ctx.fillRect(0, 0, 1024, 256);

  // Scanline texture
  ctx.fillStyle = 'rgba(255, 42, 133, 0.07)';
  for (let y = 0; y < 256; y += 8) {
    ctx.fillRect(0, y, 1024, 3);
  }

  // Angled polygon neon tube outer border
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

  // Inner cyan trace
  ctx.shadowColor = ARC_CYAN;
  ctx.shadowBlur = 14;
  ctx.strokeStyle = ARC_CYAN;
  ctx.lineWidth = 3;
  ctx.strokeRect(34, 34, 956, 188);

  // Pixel corner telemetry
  ctx.shadowBlur = 0;
  ctx.font = '700 18px "Silkscreen", monospace';
  ctx.fillStyle = '#fde047';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('1UP • CREDIT 07', 52, 56);
  ctx.fillStyle = ARC_CYAN;
  ctx.textAlign = 'right';
  ctx.fillText('SHIBUYA 1986', 972, 56);

  // Blazing arcade marquee title
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

function createPegTagTexture(item, idx = 0) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 152;
  const ctx = canvas.getContext('2d');

  // Stamped warm-putty aluminum tag
  ctx.fillStyle = '#f2ede2';
  ctx.fillRect(0, 0, 512, 152);

  // Left safety-orange / unit index block
  ctx.fillStyle = idx === 0 ? HW_ORANGE : HW_INK;
  ctx.fillRect(0, 0, 86, 152);

  ctx.fillStyle = idx === 0 ? '#ffffff' : HW_ORANGE;
  ctx.font = '700 18px "IBM Plex Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('MOD', 43, 52);
  ctx.fillStyle = '#ffffff';
  ctx.font = '700 34px "Chakra Petch", sans-serif';
  ctx.fillText(`0${idx + 1}`, 43, 98);

  // Top accent bar
  ctx.fillStyle = item.accent;
  ctx.fillRect(86, 0, 426, 10);

  // Outer machined border
  ctx.strokeStyle = HW_INK;
  ctx.lineWidth = 6;
  ctx.strokeRect(3, 3, 506, 146);

  // Title & stamped spec badge
  ctx.fillStyle = HW_INK;
  ctx.font = '700 35px "Chakra Petch", system-ui, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(item.shortName.toUpperCase(), 106, 66);

  ctx.fillStyle = HW_INK;
  ctx.fillRect(106, 88, 376, 38);
  ctx.fillStyle = HW_PUTTY;
  ctx.font = '600 19px "IBM Plex Mono", system-ui, monospace';
  ctx.fillText(`▪ ${item.badge.toUpperCase()}`, 120, 113);

  // Rivet crosshairs on right
  ctx.fillStyle = '#646b78';
  ctx.font = '700 18px "IBM Plex Mono", monospace';
  ctx.fillText('+', 486, 34);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createBlueprintTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Teenage Engineering dark graphite self-healing cutting mat
  ctx.fillStyle = '#1b1f26';
  ctx.fillRect(0, 0, 1024, 512);

  ctx.strokeStyle = 'rgba(235, 229, 216, 0.13)';
  ctx.lineWidth = 1.2;
  for (let x = 0; x <= 1024; x += 32) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 512);
    ctx.stroke();
  }
  for (let y = 0; y <= 512; y += 32) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(1024, y);
    ctx.stroke();
  }

  // Safety-orange & putty technical calibration frame
  ctx.strokeStyle = 'rgba(235, 229, 216, 0.55)';
  ctx.lineWidth = 3;
  ctx.strokeRect(24, 24, 976, 464);

  ctx.fillStyle = HW_ORANGE;
  ctx.fillRect(24, 24, 18, 464);

  // Millimeter tick marks along top edge
  ctx.strokeStyle = HW_ORANGE;
  ctx.lineWidth = 2;
  for (let x = 64; x < 980; x += 16) {
    const h = x % 64 === 0 ? 18 : 9;
    ctx.beginPath();
    ctx.moveTo(x, 24);
    ctx.lineTo(x, 24 + h);
    ctx.stroke();
  }

  ctx.strokeStyle = 'rgba(255, 85, 0, 0.55)';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(512, 228, 94, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(400, 228);
  ctx.lineTo(624, 228);
  ctx.moveTo(512, 116);
  ctx.lineTo(512, 340);
  ctx.stroke();

  ctx.fillStyle = HW_PUTTY;
  ctx.font = '600 21px "IBM Plex Mono", monospace';
  ctx.fillText('FIELD WORKBENCH // 01: WEB MAKEOVER  •  02: PRODUCT LAB  •  03: BRIEF', 58, 464);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createBeforeAfterMonitorTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 640;
  canvas.height = 360;
  const ctx = canvas.getContext('2d');

  // Left Half: Dated gray template ("BEFORE")
  ctx.fillStyle = '#d6d3cb';
  ctx.fillRect(0, 0, 320, 360);
  ctx.fillStyle = '#9ca3af';
  ctx.fillRect(20, 22, 280, 34);
  ctx.fillStyle = '#374151';
  ctx.font = '700 20px "IBM Plex Mono", monospace';
  ctx.fillText('RAW // OLD TEMPLATE', 32, 46);
  ctx.fillStyle = '#e5e7eb';
  ctx.fillRect(20, 76, 132, 120);
  ctx.fillRect(166, 76, 134, 120);
  ctx.fillStyle = '#9ca3af';
  ctx.fillRect(20, 214, 240, 18);
  ctx.fillRect(20, 244, 180, 18);
  ctx.fillStyle = '#1f2937';
  ctx.font = '700 19px "Chakra Petch", sans-serif';
  ctx.fillText('GENERIC STARTER PAGE', 24, 318);

  // Right Half: High-craft bespoke build ("AFTER")
  ctx.fillStyle = '#12151c';
  ctx.fillRect(320, 0, 320, 360);

  ctx.fillStyle = HW_ORANGE;
  ctx.fillRect(340, 22, 280, 34);
  ctx.fillStyle = '#ffffff';
  ctx.font = '700 20px "IBM Plex Mono", monospace';
  ctx.fillText('AFTER // BESPOKE BUILD', 352, 46);

  ctx.fillStyle = '#ebe5d8';
  ctx.fillRect(340, 76, 280, 152);
  ctx.strokeStyle = HW_ORANGE;
  ctx.lineWidth = 4;
  ctx.strokeRect(340, 76, 280, 152);

  ctx.fillStyle = '#12151c';
  ctx.font = '700 28px "Chakra Petch", sans-serif';
  ctx.fillText('RELAIS PALAIS', 358, 138);
  ctx.font = '600 17px "IBM Plex Mono", monospace';
  ctx.fillStyle = '#4b5563';
  ctx.fillText('EDITORIAL + EN/ES UX', 358, 174);

  // Sharp mechanical trigger bar (zero round pill!)
  ctx.fillStyle = HW_ORANGE;
  ctx.fillRect(340, 256, 280, 56);
  ctx.fillStyle = '#ffffff';
  ctx.font = '700 20px "IBM Plex Mono", monospace';
  ctx.fillText('▶ TEST SPLIT SLIDER', 362, 291);

  // Center hardware split rule + square slider block
  ctx.strokeStyle = HW_ORANGE;
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(320, 0);
  ctx.lineTo(320, 360);
  ctx.stroke();

  ctx.fillStyle = HW_INK;
  ctx.fillRect(292, 152, 56, 56);
  ctx.strokeStyle = HW_ORANGE;
  ctx.lineWidth = 4;
  ctx.strokeRect(292, 152, 56, 56);
  ctx.fillStyle = '#ffffff';
  ctx.font = '700 24px "IBM Plex Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('↔', 320, 188);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createClipboardTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 384;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = HW_PUTTY;
  ctx.fillRect(0, 0, 384, 512);

  ctx.fillStyle = HW_INK;
  ctx.fillRect(0, 0, 384, 96);

  ctx.fillStyle = HW_ORANGE;
  ctx.fillRect(0, 92, 384, 8);

  ctx.fillStyle = '#ffffff';
  ctx.font = '700 27px "Chakra Petch", sans-serif';
  ctx.fillText('✦ SPEC BRIEF // 01', 24, 58);

  const rows = ['[X] WEBSITE MAKEOVER', '[X] PRODUCT PHOTO AI', '[X] MARKET RESEARCH', '[X] BRANDED ARCADE'];
  ctx.fillStyle = HW_INK;
  ctx.font = '600 22px "IBM Plex Mono", monospace';
  rows.forEach((line, i) => {
    ctx.fillText(line, 24, 162 + i * 62);
  });

  // Sharp TE orange keycap CTA
  ctx.fillStyle = HW_ORANGE;
  ctx.fillRect(24, 408, 336, 70);
  ctx.strokeStyle = HW_INK;
  ctx.lineWidth = 5;
  ctx.strokeRect(24, 408, 336, 70);

  ctx.fillStyle = '#ffffff';
  ctx.font = '700 23px "Chakra Petch", sans-serif';
  ctx.fillText('OPEN BRIEF SHEET →', 64, 451);

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

  // Diagonal 1986 arcade speed stripes
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
    const bg = ctx.createRadialGradient(256, 176, 24, 256, 192, 310);
    bg.addColorStop(0, '#1e1035');
    bg.addColorStop(1, '#04020a');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 512, 384);

    // Perspective synth horizon grid
    ctx.strokeStyle = `${game.accent}55`;
    ctx.lineWidth = 2;
    for (let i = 0; i < 8; i++) {
      const y = 216 + i * 22;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(512, y);
      ctx.stroke();
    }

    // Top CRT OSD bar
    ctx.fillStyle = '#fde047';
    ctx.font = '700 15px "Silkscreen", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('1UP  004800', 24, 32);
    ctx.fillStyle = game.secondaryAccent;
    ctx.textAlign = 'right';
    ctx.fillText('CREDIT 01', 488, 32);

    if (loadedImg) {
      ctx.save();
      ctx.shadowColor = game.accent;
      ctx.shadowBlur = 26;
      ctx.strokeStyle = game.accent;
      ctx.lineWidth = 4;
      ctx.strokeRect(188, 50, 136, 136);
      ctx.drawImage(loadedImg, 190, 52, 132, 132);
      ctx.restore();
    } else {
      ctx.fillStyle = game.accent;
      ctx.fillRect(196, 56, 120, 120);
    }

    ctx.fillStyle = '#ffffff';
    ctx.font = '800 30px "Syne", system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(game.shortName.toUpperCase(), 256, 232);

    // Angled arcade START prompt bar (zero round pill)
    ctx.fillStyle = game.accent;
    ctx.beginPath();
    ctx.moveTo(88, 268);
    ctx.lineTo(440, 268);
    ctx.lineTo(424, 324);
    ctx.lineTo(72, 324);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#05020a';
    ctx.font = '700 20px "Silkscreen", monospace';
    ctx.fillText('▶ INSERT COIN • PLAY', 256, 303);

    // Heavy authentic 15kHz CRT scanlines
    ctx.fillStyle = 'rgba(0, 0, 0, 0.32)';
    for (let y = 0; y < 384; y += 5) {
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

function createLeftStudioFloorTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Warm matte industrial drafting floor tile
  ctx.fillStyle = '#252830';
  ctx.fillRect(0, 0, 512, 512);

  // Subtle putty grid
  ctx.strokeStyle = 'rgba(235, 229, 216, 0.14)';
  ctx.lineWidth = 2;
  ctx.strokeRect(0, 0, 512, 512);

  ctx.strokeStyle = 'rgba(235, 229, 216, 0.06)';
  ctx.lineWidth = 1;
  for (let i = 128; i < 512; i += 128) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 512);
    ctx.moveTo(0, i);
    ctx.lineTo(512, i);
    ctx.stroke();
  }

  // Safety-orange registration crosshairs at intersections
  ctx.strokeStyle = 'rgba(255, 85, 0, 0.48)';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(244, 256);
  ctx.lineTo(268, 256);
  ctx.moveTo(256, 244);
  ctx.lineTo(256, 268);
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

  // Deep wet-asphalt Shibuya night floor
  ctx.fillStyle = '#070311';
  ctx.fillRect(0, 0, 512, 512);

  // Electric synthwave magenta/cyan grid
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

  // Subtle arcade carpet geometric diamond spark
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
 * Builds each custom 3D physical tool mesh hanging on the Braun/TE Pegboard (7 shapes)
 */
function buildPhysicalToolMesh(tool) {
  const group = new THREE.Group();
  const chromeMat = new THREE.MeshStandardMaterial({
    color: 0xf1f5f9,
    metalness: 0.85,
    roughness: 0.22
  });
  const darkGripMat = new THREE.MeshStandardMaterial({
    color: 0x161920,
    metalness: 0.28,
    roughness: 0.62
  });
  const teOrangeMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(HW_ORANGE),
    emissive: new THREE.Color(HW_ORANGE),
    emissiveIntensity: 0.32,
    roughness: 0.32,
    metalness: 0.2
  });
  const accentMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(tool.accent),
    metalness: 0.38,
    roughness: 0.28,
    emissive: new THREE.Color(tool.accent),
    emissiveIntensity: 0.25
  });

  switch (tool.toolShape) {
    case 'roller': {
      const rollerLeft = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.32, 22), darkGripMat);
      rollerLeft.rotation.z = Math.PI / 2;
      rollerLeft.position.set(-0.16, 0.18, 0);
      group.add(rollerLeft);

      const rollerRight = new THREE.Mesh(new THREE.CylinderGeometry(0.115, 0.115, 0.34, 22), teOrangeMat);
      rollerRight.rotation.z = Math.PI / 2;
      rollerRight.position.set(0.16, 0.18, 0);
      group.add(rollerRight);

      const seamRing = new THREE.Mesh(new THREE.CylinderGeometry(0.125, 0.125, 0.03, 24), chromeMat);
      seamRing.rotation.z = Math.PI / 2;
      seamRing.position.set(0, 0.18, 0);
      group.add(seamRing);

      const wireArm = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.34, 0.035), chromeMat);
      wireArm.position.set(0.34, 0.02, 0);
      group.add(wireArm);

      const wireCross = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.035, 0.035), chromeMat);
      wireCross.position.set(0.17, -0.13, 0);
      group.add(wireCross);

      const grip = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.048, 0.34, 16), darkGripMat);
      grip.position.set(0, -0.28, 0);
      group.add(grip);
      group.rotation.z = -0.14;
      break;
    }

    case 'camera-loupe': {
      const body = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.44, 0.18), darkGripMat);
      group.add(body);

      const topPrism = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.12, 0.15), chromeMat);
      topPrism.position.set(0, 0.26, 0);
      group.add(topPrism);

      const shutterBtn = new THREE.Mesh(new THREE.CylinderGeometry(0.048, 0.048, 0.065, 14), teOrangeMat);
      shutterBtn.position.set(0.22, 0.24, 0.02);
      group.add(shutterBtn);

      const lensBarrel = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.18, 0.16, 24), chromeMat);
      lensBarrel.rotation.x = Math.PI / 2;
      lensBarrel.position.set(0, -0.01, 0.14);
      group.add(lensBarrel);

      const ringLight = new THREE.Mesh(new THREE.TorusGeometry(0.19, 0.028, 14, 28), teOrangeMat);
      ringLight.position.set(0, -0.01, 0.22);
      group.add(ringLight);

      const opticGlass = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.04, 24), accentMat);
      opticGlass.rotation.x = Math.PI / 2;
      opticGlass.position.set(0, -0.01, 0.21);
      group.add(opticGlass);
      break;
    }

    case 'film-reel': {
      const outerRim = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.042, 14, 32), darkGripMat);
      group.add(outerRim);

      const innerDisc = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.05, 28), chromeMat);
      innerDisc.rotation.x = Math.PI / 2;
      group.add(innerDisc);

      for (let s = 0; s < 5; s++) {
        const angle = (s * Math.PI * 2) / 5;
        const spokeHole = new THREE.Mesh(new THREE.CylinderGeometry(0.058, 0.058, 0.065, 16), darkGripMat);
        spokeHole.rotation.x = Math.PI / 2;
        spokeHole.position.set(Math.cos(angle) * 0.165, Math.sin(angle) * 0.165, 0);
        group.add(spokeHole);
      }

      const playHub = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.08, 3), teOrangeMat);
      playHub.rotation.z = -Math.PI / 2;
      playHub.rotation.x = Math.PI / 2;
      playHub.position.set(0.01, 0, 0.05);
      group.add(playHub);
      break;
    }

    case 'airbrush': {
      const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.042, 0.68, 20), chromeMat);
      barrel.rotation.z = Math.PI / 2;
      group.add(barrel);

      const tail = new THREE.Mesh(new THREE.CylinderGeometry(0.042, 0.035, 0.34, 18), darkGripMat);
      tail.rotation.z = Math.PI / 2;
      tail.position.x = 0.46;
      group.add(tail);

      const nozzle = new THREE.Mesh(new THREE.ConeGeometry(0.042, 0.18, 18), teOrangeMat);
      nozzle.rotation.z = Math.PI / 2;
      nozzle.position.x = -0.42;
      group.add(nozzle);

      const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.045, 0.22, 20), accentMat);
      cup.position.set(-0.08, 0.16, 0);
      cup.rotation.z = -0.25;
      group.add(cup);

      const handleDrop = new THREE.Mesh(new THREE.CylinderGeometry(0.048, 0.055, 0.36, 16), darkGripMat);
      handleDrop.position.set(0.12, -0.2, 0);
      handleDrop.rotation.z = -0.28;
      group.add(handleDrop);
      group.rotation.z = 0.16;
      break;
    }

    case 'clapper': {
      const slate = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.52, 0.05), darkGripMat);
      slate.position.y = -0.06;
      group.add(slate);

      const slateScreen = new THREE.Mesh(new THREE.BoxGeometry(0.66, 0.36, 0.058), accentMat);
      slateScreen.position.y = -0.08;
      group.add(slateScreen);

      const bottomBar = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.08, 0.065), chromeMat);
      bottomBar.position.y = 0.22;
      group.add(bottomBar);

      const topClap = new THREE.Group();
      topClap.position.set(-0.37, 0.26, 0);
      const clapStick = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.08, 0.065), teOrangeMat);
      clapStick.position.set(0.37, 0.04, 0);
      topClap.add(clapStick);
      topClap.rotation.z = 0.24;
      group.add(topClap);
      break;
    }

    case 'caliper': {
      const mainBeam = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.08, 0.035), chromeMat);
      group.add(mainBeam);

      const fixedJaw = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.34, 0.04), chromeMat);
      fixedJaw.position.set(-0.41, -0.14, 0);
      group.add(fixedJaw);

      const sliderJaw = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.34, 0.042), chromeMat);
      sliderJaw.position.set(-0.08, -0.14, 0);
      group.add(sliderJaw);

      const lcdHousing = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.17, 0.075), darkGripMat);
      lcdHousing.position.set(0.04, 0.02, 0.02);
      group.add(lcdHousing);

      const lcdScreen = new THREE.Mesh(new THREE.BoxGeometry(0.21, 0.09, 0.082), accentMat);
      lcdScreen.position.set(0.04, 0.03, 0.02);
      group.add(lcdScreen);

      const thumbWheel = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.06, 16), teOrangeMat);
      thumbWheel.rotation.x = Math.PI / 2;
      thumbWheel.position.set(0.18, -0.07, 0.02);
      group.add(thumbWheel);
      group.rotation.z = -0.12;
      break;
    }

    case 'scale':
    default: {
      const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.055, 0.56, 18), darkGripMat);
      group.add(pillar);

      const topHub = new THREE.Mesh(new THREE.OctahedronGeometry(0.09, 0), teOrangeMat);
      topHub.position.y = 0.28;
      group.add(topHub);

      const crossBeam = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.045, 0.045), chromeMat);
      crossBeam.position.y = 0.24;
      crossBeam.rotation.z = 0.08;
      group.add(crossBeam);

      [-0.33, 0.33].forEach((px, idx) => {
        const dy = idx === 0 ? -0.03 : 0.03;
        const chain = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.26, 8), chromeMat);
        chain.position.set(px, 0.1 + dy, 0);
        group.add(chain);

        const pan = new THREE.Mesh(
          new THREE.CylinderGeometry(0.15, 0.11, 0.045, 20),
          idx === 0 ? teOrangeMat : accentMat
        );
        pan.position.set(px, -0.03 + dy, 0);
        group.add(pan);
      });
      break;
    }
  }

  return group;
}

/**
 * Builds each custom 3D 1986 Shibuya Neon Arcade Cabinet
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

  const lowerBox = new THREE.Mesh(new THREE.BoxGeometry(w, 1.32, 1.05), bodyMat);
  lowerBox.position.set(0, 0.66, 0);
  root.add(lowerBox);

  const upperBox = new THREE.Mesh(new THREE.BoxGeometry(w, 1.28, 0.92), bodyMat);
  upperBox.position.set(0, 1.92, -0.06);
  root.add(upperBox);

  const marqueeHood = new THREE.Mesh(new THREE.BoxGeometry(w + 0.03, 0.42, 1.06), bodyMat);
  marqueeHood.position.set(0, 2.74, 0.02);
  root.add(marqueeHood);

  [-w / 2 - 0.012, w / 2 + 0.012].forEach((sx) => {
    const moldingLower = new THREE.Mesh(new THREE.BoxGeometry(0.028, 2.92, 0.045), trimMat);
    moldingLower.position.set(sx, 1.48, 0.48);
    root.add(moldingLower);

    const moldingTop = new THREE.Mesh(new THREE.BoxGeometry(0.028, 0.045, 1.02), trimMat);
    moldingTop.position.set(sx, 2.95, 0.02);
    root.add(moldingTop);
  });

  const marqueeTex = createMarqueeTexture(game, index);
  const marqueeMat = new THREE.MeshStandardMaterial({
    map: marqueeTex,
    emissiveMap: marqueeTex,
    emissive: new THREE.Color('#ffffff'),
    emissiveIntensity: 1.2,
    roughness: 0.16
  });
  const marqueePlane = new THREE.Mesh(new THREE.PlaneGeometry(w - 0.08, 0.34), marqueeMat);
  marqueePlane.position.set(0, 2.73, 0.555);
  marqueePlane.rotation.x = 0.08;
  root.add(marqueePlane);

  const crtTex = createCrtScreenTexture(game);
  const crtMat = new THREE.MeshStandardMaterial({
    map: crtTex,
    emissiveMap: crtTex,
    emissive: new THREE.Color('#ffffff'),
    emissiveIntensity: 0.95,
    roughness: 0.1,
    metalness: 0.18
  });
  const screenMesh = new THREE.Mesh(new THREE.PlaneGeometry(w - 0.18, 0.82), crtMat);
  screenMesh.position.set(0, 1.94, 0.415);
  screenMesh.rotation.x = -0.22;
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
    cardA.position.set(-0.08, 3.14, 0.08);
    cardA.rotation.z = 0.22;
    root.add(cardA);
    const cardB = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.36, 0.025), secondaryTrimMat);
    cardB.position.set(0.09, 3.14, 0.11);
    cardB.rotation.z = -0.2;
    root.add(cardB);
  } else if (game.cabinetStyle === 'gacha-dome') {
    const dome = new THREE.Mesh(
      new THREE.SphereGeometry(0.24, 20, 16, 0, Math.PI * 2, 0, Math.PI / 2),
      secondaryTrimMat
    );
    dome.position.set(0, 2.95, 0.02);
    root.add(dome);
  } else if (game.cabinetStyle === 'botanical-rts') {
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.03, 0.36, 10), trimMat);
    stem.position.set(0, 3.12, 0.05);
    root.add(stem);
    const leaf = new THREE.Mesh(new THREE.SphereGeometry(0.13, 14, 10), secondaryTrimMat);
    leaf.scale.set(1.5, 0.35, 0.8);
    leaf.position.set(0.11, 3.3, 0.05);
    leaf.rotation.z = 0.35;
    root.add(leaf);
  } else if (game.cabinetStyle === 'neon-slasher') {
    const crown = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.32, 4), trimMat);
    crown.position.set(0, 3.11, 0.12);
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
  scene.background = new THREE.Color('#0c0e14');
  scene.fog = new THREE.FogExp2('#0a0b12', 0.028);

  const camera = new THREE.PerspectiveCamera(48, 16 / 9, 0.1, 80);
  camera.position.set(0, 2.35, 9.4);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.16;
  container.appendChild(renderer.domElement);

  // =========================================================================
  // Dual-World Lighting: Warm Studio Daylight/Tungsten (Left) vs. Shibuya Neon (Right)
  // =========================================================================
  const hemiLight = new THREE.HemisphereLight('#d6d3cb', '#0f071a', 0.68);
  scene.add(hemiLight);

  const workshopSpot = new THREE.SpotLight('#fff5e6', 38, 28, Math.PI * 0.44, 0.38, 1.1);
  workshopSpot.position.set(-4.8, 7.2, 5.6);
  workshopSpot.target.position.set(-4.6, 2.2, -1.2);
  scene.add(workshopSpot);
  scene.add(workshopSpot.target);

  const teOrangeFill = new THREE.PointLight(HW_ORANGE, 5.5, 13);
  teOrangeFill.position.set(-2.2, 1.6, 2.2);
  scene.add(teOrangeFill);

  const arcadeMagentaLight = new THREE.PointLight(ARC_PINK, 18, 21);
  arcadeMagentaLight.position.set(4.4, 4.6, 3.8);
  scene.add(arcadeMagentaLight);

  const arcadeCyanLight = new THREE.PointLight(ARC_CYAN, 15, 24);
  arcadeCyanLight.position.set(10.0, 4.2, 5.2);
  scene.add(arcadeCyanLight);

  // =========================================================================
  // LITERAL VISUAL SPLIT: Architectural Backdrop + Bisected Floor & Threshold Seam
  // =========================================================================
  // Left Studio Architectural Backdrop Wall (x < 0)
  const leftBackWall = new THREE.Mesh(
    new THREE.PlaneGeometry(34, 18),
    new THREE.MeshStandardMaterial({
      color: '#262930',
      roughness: 0.85,
      metalness: 0.1
    })
  );
  leftBackWall.position.set(-17, 7.5, -5.2);
  scene.add(leftBackWall);

  // Right Shibuya Midnight Alley Backdrop Wall (x > 0)
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

  // Vertical Shibuya Neon Accent Tubes in Right Background
  [2.6, 6.8, 11.2].forEach((nx, i) => {
    const tubeColor = i % 2 === 0 ? ARC_PINK : ARC_CYAN;
    const tube = new THREE.Mesh(
      new THREE.BoxGeometry(0.05, 6.2, 0.05),
      new THREE.MeshBasicMaterial({ color: tubeColor })
    );
    tube.position.set(nx, 3.1, -4.6);
    scene.add(tube);
  });

  // Left Floor (x < 0): Matte Industrial Drafting Concrete / Putty Grid
  const leftFloor = new THREE.Mesh(
    new THREE.PlaneGeometry(32, 38),
    new THREE.MeshStandardMaterial({
      map: createLeftStudioFloorTexture(),
      roughness: 0.72,
      metalness: 0.14
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

  // Dual-Sided Threshold Seam at x = 0 (Safety-Orange/Aluminum Left Lip + Neon Plasma Right Lip)
  const seamLeftStrip = new THREE.Mesh(
    new THREE.BoxGeometry(0.06, 0.025, 26),
    new THREE.MeshStandardMaterial({
      color: HW_PUTTY,
      emissive: HW_ORANGE,
      emissiveIntensity: 0.55,
      roughness: 0.3
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

  // Bisected Center Threshold Monolith Pillar at x = 0
  const pillarLeftHalf = new THREE.Mesh(
    new THREE.BoxGeometry(0.08, 6.4, 0.22),
    new THREE.MeshStandardMaterial({
      color: HW_PUTTY,
      roughness: 0.35,
      metalness: 0.25
    })
  );
  pillarLeftHalf.position.set(-0.042, 3.2, -2.1);
  scene.add(pillarLeftHalf);

  const pillarRightHalf = new THREE.Mesh(
    new THREE.BoxGeometry(0.08, 6.4, 0.22),
    new THREE.MeshStandardMaterial({
      color: '#090312',
      emissive: ARC_PINK,
      emissiveIntensity: 0.9,
      roughness: 0.2
    })
  );
  pillarRightHalf.position.set(0.042, 3.2, -2.1);
  scene.add(pillarRightHalf);

  // =========================================================================
  // LEFT WING: BRAUN / TEENAGE ENGINEERING ANODIZED HARDWARE PEGBOARD (7 TOOLS)
  // =========================================================================
  const workshopGroup = new THREE.Group();
  workshopGroup.position.set(-4.65, 0, -1.2);
  workshopGroup.rotation.y = 0.16;
  scene.add(workshopGroup);

  const boardW = 7.6;
  const boardH = 3.68;
  const boardCenterY = 2.65;

  // Heavy dark gunmetal chassis frame
  const pegboardFrame = new THREE.Mesh(
    new THREE.BoxGeometry(boardW + 0.28, boardH + 0.28, 0.15),
    new THREE.MeshStandardMaterial({
      color: HW_INK,
      metalness: 0.62,
      roughness: 0.38
    })
  );
  pegboardFrame.position.set(0, boardCenterY, -0.06);
  workshopGroup.add(pegboardFrame);

  // Warm anodized putty-aluminum pegboard face (stark contrast against dark arcade!)
  const pegboardFace = new THREE.Mesh(
    new THREE.BoxGeometry(boardW, boardH, 0.08),
    new THREE.MeshStandardMaterial({
      color: '#d5cfc3',
      metalness: 0.24,
      roughness: 0.48
    })
  );
  pegboardFace.position.set(0, boardCenterY, 0);
  workshopGroup.add(pegboardFace);

  // 4 Teenage Engineering safety-orange corner mounting bolts
  const boltGeom = new THREE.CylinderGeometry(0.065, 0.065, 0.1, 6);
  const boltMat = new THREE.MeshStandardMaterial({
    color: HW_ORANGE,
    emissive: HW_ORANGE,
    emissiveIntensity: 0.3,
    roughness: 0.3
  });
  [
    [-boardW / 2 + 0.12, boardCenterY + boardH / 2 - 0.12],
    [boardW / 2 - 0.12, boardCenterY + boardH / 2 - 0.12],
    [-boardW / 2 + 0.12, boardCenterY - boardH / 2 + 0.12],
    [boardW / 2 - 0.12, boardCenterY - boardH / 2 + 0.12]
  ].forEach(([bx, by]) => {
    const bolt = new THREE.Mesh(boltGeom, boltMat);
    bolt.rotation.x = Math.PI / 2;
    bolt.position.set(bx, by, 0.025);
    workshopGroup.add(bolt);
  });

  const cols = 30;
  const rows = 14;
  const holeGeom = new THREE.CircleGeometry(0.022, 8);
  const holeMat = new THREE.MeshBasicMaterial({ color: '#181b22' });
  const pegHoles = new THREE.InstancedMesh(holeGeom, holeMat, cols * rows);
  const dummy = new THREE.Object3D();
  let hIdx = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const hx = -boardW / 2 + 0.28 + (c * (boardW - 0.56)) / (cols - 1);
      const hy = boardCenterY - boardH / 2 + 0.26 + (r * (boardH - 0.52)) / (rows - 1);
      dummy.position.set(hx, hy, 0.043);
      dummy.updateMatrix();
      pegHoles.setMatrixAt(hIdx++, dummy.matrix);
    }
  }
  workshopGroup.add(pegHoles);

  let currentSignTexts = {
    signTools: 'TOOLS',
    signToolsSub: 'TAP ANY TOOL OR WORKBENCH MONITOR',
    signGames: 'ARCADE',
    signGamesSub: 'TAP OR SWIPE CABINETS TO PLAY'
  };

  const toolsSignMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(4.2, 1.02),
    new THREE.MeshBasicMaterial({
      map: createWorkshopSignTexture(currentSignTexts.signTools, currentSignTexts.signToolsSub)
    })
  );
  toolsSignMesh.position.set(0, 5.08, 0.12);
  toolsSignMesh.userData = { hitType: 'wing-tools' };
  workshopGroup.add(toolsSignMesh);

  // Machined Aluminum + Gunmetal Workbench Table below Pegboard
  const benchTop = new THREE.Mesh(
    new THREE.BoxGeometry(boardW + 0.34, 0.15, 1.44),
    new THREE.MeshStandardMaterial({ color: '#d8d2c5', metalness: 0.32, roughness: 0.42 })
  );
  benchTop.position.set(0, 0.68, 0.62);
  workshopGroup.add(benchTop);

  const benchFrontTrim = new THREE.Mesh(
    new THREE.BoxGeometry(boardW + 0.36, 0.05, 0.04),
    new THREE.MeshStandardMaterial({ color: HW_ORANGE, roughness: 0.35 })
  );
  benchFrontTrim.position.set(0, 0.68, 1.33);
  workshopGroup.add(benchFrontTrim);

  const blueprintMat = new THREE.Mesh(
    new THREE.PlaneGeometry(boardW - 0.4, 1.12),
    new THREE.MeshBasicMaterial({ map: createBlueprintTexture() })
  );
  blueprintMat.rotation.x = -Math.PI / 2;
  blueprintMat.position.set(0, 0.76, 0.64);
  workshopGroup.add(blueprintMat);

  // 3D "BEFORE ↔ AFTER" Hardware Monitor resting on the Left Workbench
  const monitorGroup = new THREE.Group();
  monitorGroup.position.set(-2.35, 0.75, 0.66);
  monitorGroup.rotation.y = 0.22;
  workshopGroup.add(monitorGroup);

  const monitorStand = new THREE.Mesh(
    new THREE.BoxGeometry(0.48, 0.06, 0.36),
    new THREE.MeshStandardMaterial({ color: HW_INK, metalness: 0.6, roughness: 0.35 })
  );
  monitorStand.position.y = 0.03;
  monitorGroup.add(monitorStand);

  const monitorNeck = new THREE.Mesh(
    new THREE.BoxGeometry(0.1, 0.28, 0.08),
    new THREE.MeshStandardMaterial({ color: '#9ca3af', metalness: 0.75, roughness: 0.25 })
  );
  monitorNeck.position.set(0, 0.16, -0.05);
  monitorGroup.add(monitorNeck);

  const monitorBezel = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 0.9, 0.07),
    new THREE.MeshStandardMaterial({
      color: HW_INK,
      emissive: HW_ORANGE,
      emissiveIntensity: 0.18,
      metalness: 0.5,
      roughness: 0.35
    })
  );
  monitorBezel.position.set(0, 0.56, 0);
  monitorBezel.rotation.x = -0.14;
  monitorGroup.add(monitorBezel);

  const monitorScreenTex = createBeforeAfterMonitorTexture();
  const monitorScreen = new THREE.Mesh(
    new THREE.PlaneGeometry(1.38, 0.78),
    new THREE.MeshStandardMaterial({
      map: monitorScreenTex,
      emissiveMap: monitorScreenTex,
      emissive: new THREE.Color('#ffffff'),
      emissiveIntensity: 0.88,
      roughness: 0.18
    })
  );
  monitorScreen.position.set(0, 0.56, 0.038);
  monitorScreen.rotation.x = -0.14;
  monitorScreen.userData = { hitType: 'workbench-makeover' };
  monitorGroup.add(monitorScreen);

  const monitorHit = new THREE.Mesh(
    new THREE.BoxGeometry(1.62, 1.05, 0.42),
    new THREE.MeshBasicMaterial({ visible: false })
  );
  monitorHit.position.set(0, 0.54, 0.04);
  monitorHit.userData = { hitType: 'workbench-makeover' };
  monitorGroup.add(monitorHit);

  // 3D Anodized Field Brief Clipboard on the Right Side of the Workbench
  const clipboardGroup = new THREE.Group();
  clipboardGroup.position.set(2.55, 0.76, 0.72);
  clipboardGroup.rotation.set(-1.18, -0.18, -0.08);
  workshopGroup.add(clipboardGroup);

  const clipBoardBack = new THREE.Mesh(
    new THREE.BoxGeometry(0.68, 0.9, 0.035),
    new THREE.MeshStandardMaterial({
      color: HW_INK,
      roughness: 0.4
    })
  );
  clipboardGroup.add(clipBoardBack);

  const clipSheetTex = createClipboardTexture();
  const clipSheet = new THREE.Mesh(
    new THREE.PlaneGeometry(0.6, 0.8),
    new THREE.MeshStandardMaterial({
      map: clipSheetTex,
      emissiveMap: clipSheetTex,
      emissive: new THREE.Color('#ffffff'),
      emissiveIntensity: 0.55,
      roughness: 0.28
    })
  );
  clipSheet.position.z = 0.022;
  clipboardGroup.add(clipSheet);

  const clipMetal = new THREE.Mesh(
    new THREE.BoxGeometry(0.26, 0.09, 0.06),
    new THREE.MeshStandardMaterial({ color: HW_ORANGE, roughness: 0.28 })
  );
  clipMetal.position.set(0, 0.39, 0.03);
  clipboardGroup.add(clipMetal);

  const clipboardHit = new THREE.Mesh(
    new THREE.BoxGeometry(0.9, 1.05, 0.35),
    new THREE.MeshBasicMaterial({ visible: false })
  );
  clipboardHit.userData = { hitType: 'clipboard-brief' };
  clipboardGroup.add(clipboardHit);

  const workshopWingHit = new THREE.Mesh(
    new THREE.BoxGeometry(boardW + 0.6, 5.5, 1.6),
    new THREE.MeshBasicMaterial({ visible: false })
  );
  workshopWingHit.position.set(0, 2.75, 0.1);
  workshopWingHit.userData = { hitType: 'wing-tools' };
  workshopGroup.add(workshopWingHit);

  // 7 Hanging Physical 3D Tools on the Anodized Pegboard
  const interactiveObjects = [monitorHit, monitorScreen, clipboardHit, toolsSignMesh, workshopWingHit];
  const toolNodes = [];
  const hookGeom = new THREE.CylinderGeometry(0.016, 0.016, 0.24, 10);
  const hookMat = new THREE.MeshStandardMaterial({ color: '#1e293b', metalness: 0.85, roughness: 0.25 });

  tools.forEach((tool, idx) => {
    const isTopRow = idx < 4;
    const localX = isTopRow ? (idx - 1.5) * 1.82 : (idx - 5) * 1.98;
    const localY = isTopRow ? 3.5 : 1.94;

    const slotGroup = new THREE.Group();
    slotGroup.position.set(localX, localY, 0.05);
    workshopGroup.add(slotGroup);

    // Precision square/octagonal calibration reticle instead of generic glow circle
    const haloRing = new THREE.Mesh(
      new THREE.RingGeometry(0.41, 0.47, 4),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(HW_ORANGE),
        transparent: true,
        opacity: 0.45,
        side: THREE.DoubleSide
      })
    );
    haloRing.rotation.z = Math.PI / 4;
    haloRing.position.z = 0.012;
    slotGroup.add(haloRing);

    [-0.17, 0.17].forEach((hx) => {
      const hook = new THREE.Mesh(hookGeom, hookMat);
      hook.rotation.x = Math.PI / 2;
      hook.position.set(hx, 0.22, 0.11);
      slotGroup.add(hook);
    });

    const meshHolder = new THREE.Group();
    meshHolder.position.set(0, 0.02, 0.22);
    const toolMesh = buildPhysicalToolMesh(tool);
    meshHolder.add(toolMesh);
    slotGroup.add(meshHolder);

    const tagMat = new THREE.MeshBasicMaterial({
      map: createPegTagTexture(tool, idx),
      transparent: true,
      opacity: 1
    });
    const tagPlane = new THREE.Mesh(new THREE.PlaneGeometry(1.44, 0.42), tagMat);
    tagPlane.position.set(0, -0.55, 0.035);
    slotGroup.add(tagPlane);

    const hitBox = new THREE.Mesh(
      new THREE.BoxGeometry(1.68, 1.4, 0.7),
      new THREE.MeshBasicMaterial({ visible: false })
    );
    hitBox.position.set(0, -0.1, 0.22);
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
      meshHolder,
      haloRing,
      tagMat,
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
  // Camera-on-Rails State Machine (Hub | Tools Pegboard | Arcade Row | ZoomIn)
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
      workshopGroup.getWorldQuaternion(tmpQuat);
      tmpForward.set(0, 0, 1).applyQuaternion(tmpQuat);

      if (isZoomedIntoScreen) {
        targetCamPos.copy(tmpWorldPos).addScaledVector(tmpForward, 0.95);
        targetLookAt.copy(tmpWorldPos);
      } else {
        const dist = isPortrait ? 4.45 : 3.35;
        targetCamPos.copy(tmpWorldPos).addScaledVector(tmpForward, dist);
        targetCamPos.y = tmpWorldPos.y - (isPortrait ? 0.24 : 0.08);
        targetLookAt.copy(tmpWorldPos);
        targetLookAt.y -= isPortrait ? 0.36 : 0.1;
      }
      return;
    }

    if (currentMode === 'games') {
      const cab = cabinetNodes[activeGameIndex] || cabinetNodes[0];
      if (isZoomedIntoScreen) {
        cab.screenMesh.getWorldPosition(tmpWorldPos);
        cab.root.getWorldQuaternion(tmpQuat);
        tmpForward.set(0, 0, 1).applyQuaternion(tmpQuat);
        targetCamPos.copy(tmpWorldPos).addScaledVector(tmpForward, 0.62);
        targetLookAt.copy(tmpWorldPos);
      } else {
        cab.root.getWorldPosition(tmpWorldPos);
        cab.root.getWorldQuaternion(tmpQuat);
        tmpForward.set(0, 0, 1).applyQuaternion(tmpQuat);

        const dist = isPortrait ? 4.15 : 3.05;
        targetCamPos.copy(tmpWorldPos).addScaledVector(tmpForward, dist);
        targetCamPos.y = isPortrait ? 1.88 : 1.92;

        targetLookAt.copy(tmpWorldPos);
        targetLookAt.y = isPortrait ? 1.42 : 1.82;
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

    // 1. Horizontal Swipe Gesture
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

    // 2. Clean Tap / Click (< 14px movement)
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

    // Subtle tally pulse on 3D Hardware Monitor
    monitorBezel.material.emissiveIntensity = hoveredMonitor
      ? 0.72
      : 0.18 + Math.sin(elapsed * 2.8) * 0.06;

    // Animate Hanging 3D Tools on Hardware Pegboard
    toolNodes.forEach((node, idx) => {
      const isSelected = currentMode === 'tools' && idx === activeToolIndex;
      const isHovered = idx === hoveredToolIdx;
      const matchBoost = node.audienceMatch ? 1 : 0.35;
      const targetLift = isSelected ? 0.34 : isHovered ? 0.16 : node.audienceMatch ? 0 : -0.05;
      node.currentLift = THREE.MathUtils.lerp(node.currentLift, targetLift, damp);

      node.meshHolder.position.z = 0.22 + node.currentLift;
      node.meshHolder.rotation.y = isSelected
        ? Math.sin(elapsed * 2.1) * 0.22
        : Math.sin(elapsed * 0.9 + idx) * 0.04;
      node.haloRing.material.opacity = isSelected
        ? 0.95
        : isHovered
          ? 0.7
          : 0.28 * matchBoost;
      node.tagMat.opacity = isSelected ? 1 : 0.38 + 0.62 * matchBoost;
    });

    // Animate 3D Shibuya Neon Arcade Cabinets
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
    toolsSignMesh.material.map = createWorkshopSignTexture(
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
      toolNodes.forEach((node, idx) => {
        const old = node.tagMat.map;
        node.tagMat.map = createPegTagTexture(node.item, idx);
        node.tagMat.needsUpdate = true;
        old?.dispose();
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
