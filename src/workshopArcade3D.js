import * as THREE from 'three';

/**
 * Prototype 1: Procedural 3D Maker's Pegboard Wall (Left) & Neon Arcade Row (Right)
 * - 100% Procedural Geometry + High-DPI Canvas2D Textures (~0 KB .glb downloads!)
 * - Camera-on-Rails ONLY (Tap & Horizontal Swipe — zero disorienting FPS controls)
 * - Automatic render-loop pause (`setPaused(true)`) while a game/tool iframe is active
 */

function createSignTexture(title, subtitle, primaryHex, secondaryHex, bgHex = '#090d16') {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = bgHex;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Outer neon border
  ctx.strokeStyle = primaryHex;
  ctx.lineWidth = 10;
  ctx.shadowColor = primaryHex;
  ctx.shadowBlur = 28;
  ctx.strokeRect(18, 18, canvas.width - 36, canvas.height - 36);

  ctx.shadowBlur = 0;
  ctx.strokeStyle = secondaryHex;
  ctx.lineWidth = 3;
  ctx.strokeRect(32, 32, canvas.width - 64, canvas.height - 64);

  // Main title
  ctx.font = '900 84px Inter, system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = primaryHex;
  ctx.shadowBlur = 24;
  ctx.fillStyle = '#ffffff';
  ctx.fillText(title, canvas.width / 2, 108);

  // Subtitle
  ctx.shadowBlur = 0;
  ctx.font = '700 28px Inter, system-ui, sans-serif';
  ctx.fillStyle = secondaryHex;
  ctx.fillText(subtitle, canvas.width / 2, 188);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

function createPegTagTexture(item) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 148;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, 512, 148);

  ctx.fillStyle = item.accent;
  ctx.fillRect(0, 0, 14, 148);

  ctx.strokeStyle = 'rgba(148, 163, 184, 0.45)';
  ctx.lineWidth = 4;
  ctx.strokeRect(2, 2, 508, 144);

  ctx.fillStyle = '#f8fafc';
  ctx.font = '800 38px Inter, system-ui, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(item.shortName, 32, 62);

  ctx.fillStyle = item.accent;
  ctx.font = '700 23px Inter, system-ui, sans-serif';
  ctx.fillText(item.physicalLabel.toUpperCase(), 32, 108);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createBlueprintTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#082038';
  ctx.fillRect(0, 0, 1024, 512);

  ctx.strokeStyle = 'rgba(56, 189, 248, 0.18)';
  ctx.lineWidth = 1.5;
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

  ctx.strokeStyle = 'rgba(56, 189, 248, 0.55)';
  ctx.lineWidth = 4;
  ctx.strokeRect(28, 28, 968, 456);

  ctx.fillStyle = 'rgba(125, 211, 252, 0.72)';
  ctx.font = '700 24px monospace';
  ctx.fillText('MAKER WORKBENCH // SPEC REV 4.2 // SELECT ANY HANGING TOOL ABOVE', 52, 462);

  // Technical schematic circles
  ctx.beginPath();
  ctx.arc(840, 220, 110, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(840, 220, 68, 0, Math.PI * 2);
  ctx.stroke();

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createMarqueeTexture(game) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 160;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createLinearGradient(0, 0, 512, 160);
  grad.addColorStop(0, '#090612');
  grad.addColorStop(0.5, game.cabinetBodyColor || '#1a1030');
  grad.addColorStop(1, '#090612');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 160);

  ctx.strokeStyle = game.accent;
  ctx.lineWidth = 8;
  ctx.strokeRect(10, 10, 492, 140);

  ctx.shadowColor = game.accent;
  ctx.shadowBlur = 22;
  ctx.fillStyle = '#ffffff';
  ctx.font = '900 50px Inter, system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(game.shortName.toUpperCase(), 256, 76);

  ctx.shadowBlur = 0;
  ctx.fillStyle = game.secondaryAccent;
  ctx.font = '800 20px monospace';
  ctx.fillText(`★ ${game.badge.toUpperCase()} ★`, 256, 126);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createCrtScreenTexture(game) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 384;
  const ctx = canvas.getContext('2d');

  function draw(img = null) {
    const bg = ctx.createRadialGradient(256, 180, 30, 256, 192, 300);
    bg.addColorStop(0, '#1e293b');
    bg.addColorStop(1, '#05070e');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 512, 384);

    // Subtle neon horizon grid
    ctx.strokeStyle = `${game.accent}44`;
    ctx.lineWidth = 2;
    for (let i = 0; i < 8; i++) {
      const y = 220 + i * 22;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(512, y);
      ctx.stroke();
    }

    if (img) {
      ctx.save();
      ctx.shadowColor = game.accent;
      ctx.shadowBlur = 26;
      ctx.beginPath();
      ctx.roundRect(184, 44, 144, 144, 28);
      ctx.clip();
      ctx.drawImage(img, 184, 44, 144, 144);
      ctx.restore();
    } else {
      ctx.fillStyle = game.accent;
      ctx.beginPath();
      ctx.roundRect(196, 52, 120, 120, 24);
      ctx.fill();
    }

    ctx.fillStyle = '#ffffff';
    ctx.font = '800 34px Inter, system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(game.shortName, 256, 240);

    // Blinking-style INSERT COIN pill
    ctx.fillStyle = game.accent;
    ctx.beginPath();
    ctx.roundRect(106, 274, 300, 54, 27);
    ctx.fill();

    ctx.fillStyle = '#050811';
    ctx.font = '900 24px monospace';
    ctx.fillText('▶ TAP TO PLAY LIVE', 256, 309);

    // CRT Scanlines overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.24)';
    for (let y = 0; y < 384; y += 6) {
      ctx.fillRect(0, y, 512, 2);
    }

    // Vignette border
    ctx.strokeStyle = game.secondaryAccent;
    ctx.lineWidth = 5;
    ctx.strokeRect(8, 8, 496, 368);
  }

  draw(null);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;

  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = () => {
    draw(img);
    tex.needsUpdate = true;
  };
  img.src = game.iconUrl;

  return tex;
}

/**
 * Builds each custom 3D physical tool mesh that hangs on the Maker Pegboard
 */
function buildPhysicalToolMesh(tool) {
  const group = new THREE.Group();
  const chromeMat = new THREE.MeshStandardMaterial({
    color: 0xe2e8f0,
    metalness: 0.88,
    roughness: 0.2
  });
  const darkGripMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    metalness: 0.35,
    roughness: 0.65
  });
  const accentMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(tool.accent),
    metalness: 0.45,
    roughness: 0.28,
    emissive: new THREE.Color(tool.accent),
    emissiveIntensity: 0.35
  });
  const glowMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(tool.secondaryAccent),
    emissive: new THREE.Color(tool.secondaryAccent),
    emissiveIntensity: 0.85,
    roughness: 0.2
  });

  switch (tool.toolShape) {
    case 'airbrush': {
      // Chrome Airbrush Body + Gravity Cup + Anodized Tail + Nozzle
      const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.042, 0.68, 20), chromeMat);
      barrel.rotation.z = Math.PI / 2;
      group.add(barrel);

      const tail = new THREE.Mesh(new THREE.CylinderGeometry(0.042, 0.035, 0.34, 18), accentMat);
      tail.rotation.z = Math.PI / 2;
      tail.position.x = 0.46;
      group.add(tail);

      const nozzle = new THREE.Mesh(new THREE.ConeGeometry(0.042, 0.18, 18), glowMat);
      nozzle.rotation.z = Math.PI / 2;
      nozzle.position.x = -0.42;
      group.add(nozzle);

      const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.045, 0.22, 20), chromeMat);
      cup.position.set(-0.08, 0.16, 0);
      cup.rotation.z = -0.25;
      group.add(cup);

      const trigger = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.11, 0.04), glowMat);
      trigger.position.set(0.1, 0.1, 0);
      group.add(trigger);

      const handleDrop = new THREE.Mesh(new THREE.CylinderGeometry(0.048, 0.055, 0.36, 16), darkGripMat);
      handleDrop.position.set(0.12, -0.2, 0);
      handleDrop.rotation.z = -0.28;
      group.add(handleDrop);
      group.rotation.z = 0.16;
      break;
    }

    case 'visor': {
      // Tactical Privacy Visor Shield + YOLOv8 Camera Optic Loupe
      const shield = new THREE.Mesh(
        new THREE.CylinderGeometry(0.42, 0.42, 0.34, 28, 1, true, -Math.PI * 0.38, Math.PI * 0.76),
        new THREE.MeshStandardMaterial({
          color: 0x0f172a,
          metalness: 0.9,
          roughness: 0.12,
          side: THREE.DoubleSide
        })
      );
      shield.position.z = -0.22;
      group.add(shield);

      const topRim = new THREE.Mesh(
        new THREE.TorusGeometry(0.42, 0.032, 12, 32, Math.PI * 0.78),
        accentMat
      );
      topRim.rotation.x = Math.PI / 2;
      topRim.rotation.z = -Math.PI * 0.39 + Math.PI / 2;
      topRim.position.set(0, 0.17, -0.22);
      group.add(topRim);

      const lensRing = new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.028, 14, 28), glowMat);
      lensRing.position.set(0, 0, 0.21);
      group.add(lensRing);

      const lensCore = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.05, 24), accentMat);
      lensCore.rotation.x = Math.PI / 2;
      lensCore.position.set(0, 0, 0.19);
      group.add(lensCore);
      break;
    }

    case 'clapper': {
      // Hollywood Director Clapperboard with angled top clapper stick
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
      const clapStick = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.08, 0.065), glowMat);
      clapStick.position.set(0.37, 0.04, 0);
      topClap.add(clapStick);
      topClap.rotation.z = 0.24;
      group.add(topClap);
      break;
    }

    case 'caliper': {
      // Precision Stainless Vernier Caliper with Digital Readout Box
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

      const thumbWheel = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.06, 16), glowMat);
      thumbWheel.rotation.x = Math.PI / 2;
      thumbWheel.position.set(0.18, -0.07, 0.02);
      group.add(thumbWheel);
      group.rotation.z = -0.12;
      break;
    }

    case 'oscilloscope': {
      // Rugged Handheld Quant Multimeter / Oscilloscope
      const body = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.72, 0.12), darkGripMat);
      group.add(body);

      const bumper = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.76, 0.08), accentMat);
      bumper.position.z = -0.015;
      group.add(bumper);

      const scopeScreen = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.26, 0.02), glowMat);
      scopeScreen.position.set(0, 0.16, 0.065);
      group.add(scopeScreen);

      const rotaryDial = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.05, 22), chromeMat);
      rotaryDial.rotation.x = Math.PI / 2;
      rotaryDial.position.set(0, -0.14, 0.065);
      group.add(rotaryDial);

      [-0.12, 0, 0.12].forEach((px, idx) => {
        const jack = new THREE.Mesh(
          new THREE.CylinderGeometry(0.028, 0.028, 0.04, 14),
          idx === 0 ? glowMat : chromeMat
        );
        jack.rotation.x = Math.PI / 2;
        jack.position.set(px, -0.29, 0.065);
        group.add(jack);
      });
      break;
    }

    case 'scale':
    default: {
      // Precision Twin-Pan Unit-Economics Balance Scale
      const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.055, 0.56, 18), chromeMat);
      group.add(pillar);

      const topHub = new THREE.Mesh(new THREE.OctahedronGeometry(0.09, 0), glowMat);
      topHub.position.y = 0.28;
      group.add(topHub);

      const crossBeam = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.045, 0.045), accentMat);
      crossBeam.position.y = 0.24;
      crossBeam.rotation.z = 0.08;
      group.add(crossBeam);

      [-0.33, 0.33].forEach((px, idx) => {
        const dy = idx === 0 ? -0.03 : 0.03;
        const chain = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.26, 8), chromeMat);
        chain.position.set(px, 0.1 + dy, 0);
        group.add(chain);

        const pan = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.11, 0.045, 20), glowMat);
        pan.position.set(px, -0.03 + dy, 0);
        group.add(pan);
      });
      break;
    }
  }

  return group;
}

/**
 * Builds each custom 3D Neon Arcade Cabinet
 */
function buildArcadeCabinet(game, index) {
  const root = new THREE.Group();
  const isWide = game.cabinetStyle === 'stadium-wide';
  const w = isWide ? 1.38 : 1.16;

  const bodyMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(game.cabinetBodyColor || '#140d24'),
    roughness: 0.36,
    metalness: 0.35
  });
  const trimMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(game.accent),
    emissive: new THREE.Color(game.accent),
    emissiveIntensity: 0.75,
    roughness: 0.22
  });
  const secondaryTrimMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(game.secondaryAccent),
    emissive: new THREE.Color(game.secondaryAccent),
    emissiveIntensity: 0.6,
    roughness: 0.25
  });
  const darkMetalMat = new THREE.MeshStandardMaterial({
    color: 0x0b0f19,
    roughness: 0.5,
    metalness: 0.65
  });

  // Lower base cabinet box
  const lowerBox = new THREE.Mesh(new THREE.BoxGeometry(w, 1.32, 1.05), bodyMat);
  lowerBox.position.set(0, 0.66, 0);
  root.add(lowerBox);

  // Upper CRT housing
  const upperBox = new THREE.Mesh(new THREE.BoxGeometry(w, 1.28, 0.92), bodyMat);
  upperBox.position.set(0, 1.92, -0.06);
  root.add(upperBox);

  // Top Marquee overhang hood
  const marqueeHood = new THREE.Mesh(new THREE.BoxGeometry(w + 0.03, 0.42, 1.06), bodyMat);
  marqueeHood.position.set(0, 2.74, 0.02);
  root.add(marqueeHood);

  // Glowing side T-molding strips (Left & Right)
  [-w / 2 - 0.012, w / 2 + 0.012].forEach((sx) => {
    const moldingLower = new THREE.Mesh(new THREE.BoxGeometry(0.026, 2.92, 0.04), trimMat);
    moldingLower.position.set(sx, 1.48, 0.48);
    root.add(moldingLower);

    const moldingTop = new THREE.Mesh(new THREE.BoxGeometry(0.026, 0.04, 1.02), trimMat);
    moldingTop.position.set(sx, 2.95, 0.02);
    root.add(moldingTop);
  });

  // Illuminated Marquee Sign
  const marqueeTex = createMarqueeTexture(game);
  const marqueeMat = new THREE.MeshStandardMaterial({
    map: marqueeTex,
    emissiveMap: marqueeTex,
    emissive: new THREE.Color('#ffffff'),
    emissiveIntensity: 1.15,
    roughness: 0.18
  });
  const marqueePlane = new THREE.Mesh(new THREE.PlaneGeometry(w - 0.08, 0.34), marqueeMat);
  marqueePlane.position.set(0, 2.73, 0.555);
  marqueePlane.rotation.x = 0.08;
  root.add(marqueePlane);

  // Recessed Angled CRT Screen
  const crtTex = createCrtScreenTexture(game);
  const crtMat = new THREE.MeshStandardMaterial({
    map: crtTex,
    emissiveMap: crtTex,
    emissive: new THREE.Color('#ffffff'),
    emissiveIntensity: 0.92,
    roughness: 0.12,
    metalness: 0.15
  });
  const screenMesh = new THREE.Mesh(new THREE.PlaneGeometry(w - 0.18, 0.82), crtMat);
  screenMesh.position.set(0, 1.94, 0.415);
  screenMesh.rotation.x = -0.22;
  root.add(screenMesh);

  // Control Panel Deck
  const controlDeck = new THREE.Mesh(new THREE.BoxGeometry(w + 0.02, 0.16, 0.48), darkMetalMat);
  controlDeck.position.set(0, 1.32, 0.46);
  controlDeck.rotation.x = 0.2;
  root.add(controlDeck);

  // Joysticks + Glowing Buttons
  const stickOffsets = isWide ? [-0.34, 0.24] : [-0.24];
  stickOffsets.forEach((jx) => {
    const shaft = new THREE.Mesh(
      new THREE.CylinderGeometry(0.014, 0.014, 0.13, 10),
      new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.9, roughness: 0.15 })
    );
    shaft.position.set(jx, 1.44, 0.48);
    root.add(shaft);

    const ballTop = new THREE.Mesh(new THREE.SphereGeometry(0.042, 16, 16), trimMat);
    ballTop.position.set(jx, 1.51, 0.48);
    root.add(ballTop);
  });

  // Arcade buttons cluster
  for (let b = 0; b < 4; b++) {
    const btn = new THREE.Mesh(
      new THREE.CylinderGeometry(0.028, 0.03, 0.03, 14),
      b % 2 === 0 ? trimMat : secondaryTrimMat
    );
    btn.position.set(0.08 + (b % 2) * 0.09, 1.415 - Math.floor(b / 2) * 0.015, 0.45 + Math.floor(b / 2) * 0.08);
    btn.rotation.x = 0.2;
    root.add(btn);
  }

  // Coin Door + 25¢ Glowing Coin Slots
  const coinDoor = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.52, 0.04), darkMetalMat);
  coinDoor.position.set(0, 0.68, 0.525);
  root.add(coinDoor);

  const coinSlotMat = new THREE.MeshStandardMaterial({
    color: 0xff3b30,
    emissive: 0xff3b30,
    emissiveIntensity: 1.4
  });
  [-0.09, 0.09].forEach((cx) => {
    const coinSlot = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.09, 0.05), coinSlotMat);
    coinSlot.position.set(cx, 0.78, 0.535);
    root.add(coinSlot);
  });

  // Signature Cabinet Topper Flairs
  if (game.cabinetStyle === 'gacha-dome') {
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

  // Floor Neon Under-Glow Pool
  const glowRing = new THREE.Mesh(
    new THREE.PlaneGeometry(w + 0.55, 1.65),
    new THREE.MeshBasicMaterial({
      color: new THREE.Color(game.accent),
      transparent: true,
      opacity: 0.22
    })
  );
  glowRing.rotation.x = -Math.PI / 2;
  glowRing.position.set(0, 0.012, 0.12);
  root.add(glowRing);

  // Invisible generous raycast hitbox for effortless tapping on mobile & desktop
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

  // Extra specific screen hit marker so tapping the CRT directly can trigger Play
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
    trimMat
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
  onLaunchGame
}) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#060913');
  scene.fog = new THREE.FogExp2('#060913', 0.036);

  const camera = new THREE.PerspectiveCamera(48, 16 / 9, 0.1, 80);
  camera.position.set(0, 2.35, 9.2);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  container.appendChild(renderer.domElement);

  // =========================================================================
  // Lighting: Warm Tungsten/Cyan Left vs. Synthwave Magenta/Cyan Right
  // =========================================================================
  const hemiLight = new THREE.HemisphereLight('#93c5fd', '#0f172a', 0.72);
  scene.add(hemiLight);

  const workshopSpot = new THREE.SpotLight('#ffedd5', 26, 22, Math.PI * 0.38, 0.45, 1.2);
  workshopSpot.position.set(-4.2, 6.4, 4.8);
  workshopSpot.target.position.set(-4.2, 2.1, -1.2);
  scene.add(workshopSpot);
  scene.add(workshopSpot.target);

  const blueprintRim = new THREE.PointLight('#38bdf8', 7.5, 11);
  blueprintRim.position.set(-4.2, 1.4, 1.6);
  scene.add(blueprintRim);

  const arcadeMagentaLight = new THREE.PointLight('#ff2a85', 14, 18);
  arcadeMagentaLight.position.set(4.5, 4.6, 3.6);
  scene.add(arcadeMagentaLight);

  const arcadeCyanLight = new THREE.PointLight('#00f0ff', 12, 20);
  arcadeCyanLight.position.set(9.2, 4.2, 4.8);
  scene.add(arcadeCyanLight);

  // =========================================================================
  // Architectural Floor + Center Split Laser Seam
  // =========================================================================
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(48, 36),
    new THREE.MeshStandardMaterial({
      color: '#090d18',
      roughness: 0.28,
      metalness: 0.55
    })
  );
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);

  const gridHelper = new THREE.GridHelper(44, 44, '#1e293b', '#111827');
  gridHelper.position.y = 0.005;
  scene.add(gridHelper);

  // Center glowing threshold seam (Left = Tools | Right = Games)
  const centerSeam = new THREE.Mesh(
    new THREE.PlaneGeometry(0.08, 22),
    new THREE.MeshBasicMaterial({
      color: '#e2e8f0',
      transparent: true,
      opacity: 0.7
    })
  );
  centerSeam.rotation.x = -Math.PI / 2;
  centerSeam.position.set(0, 0.015, 2.0);
  scene.add(centerSeam);

  const centerPillar = new THREE.Mesh(
    new THREE.BoxGeometry(0.14, 5.2, 0.18),
    new THREE.MeshStandardMaterial({
      color: '#1e293b',
      emissive: '#64748b',
      emissiveIntensity: 0.45,
      metalness: 0.8,
      roughness: 0.2
    })
  );
  centerPillar.position.set(0, 2.6, -2.1);
  scene.add(centerPillar);

  // =========================================================================
  // LEFT WING: THE MAKER'S PEGBOARD WALL + HANGING 3D TOOLS
  // =========================================================================
  const workshopGroup = new THREE.Group();
  workshopGroup.position.set(-4.35, 0, -1.15);
  workshopGroup.rotation.y = 0.16;
  scene.add(workshopGroup);

  const boardW = 6.5;
  const boardH = 3.65;
  const boardCenterY = 2.62;

  // Steel Pegboard Backing
  const pegboardFrame = new THREE.Mesh(
    new THREE.BoxGeometry(boardW + 0.24, boardH + 0.24, 0.14),
    new THREE.MeshStandardMaterial({
      color: '#334155',
      metalness: 0.78,
      roughness: 0.32
    })
  );
  pegboardFrame.position.set(0, boardCenterY, -0.06);
  workshopGroup.add(pegboardFrame);

  const pegboardFace = new THREE.Mesh(
    new THREE.BoxGeometry(boardW, boardH, 0.08),
    new THREE.MeshStandardMaterial({
      color: '#131c2e',
      metalness: 0.48,
      roughness: 0.55
    })
  );
  pegboardFace.position.set(0, boardCenterY, 0);
  workshopGroup.add(pegboardFace);

  // Instanced Pegboard Holes (1 draw call!)
  const cols = 26;
  const rows = 14;
  const holeGeom = new THREE.CircleGeometry(0.022, 8);
  const holeMat = new THREE.MeshBasicMaterial({ color: '#050811' });
  const pegHoles = new THREE.InstancedMesh(holeGeom, holeMat, cols * rows);
  const dummy = new THREE.Object3D();
  let hIdx = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const hx = -boardW / 2 + 0.25 + (c * (boardW - 0.5)) / (cols - 1);
      const hy = boardCenterY - boardH / 2 + 0.24 + (r * (boardH - 0.48)) / (rows - 1);
      dummy.position.set(hx, hy, 0.043);
      dummy.updateMatrix();
      pegHoles.setMatrixAt(hIdx++, dummy.matrix);
    }
  }
  workshopGroup.add(pegHoles);

  // Overhead Sign above Pegboard ("TOOLS // PEGBOARD")
  const toolsSignMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(3.8, 0.95),
    new THREE.MeshBasicMaterial({
      map: createSignTexture('TOOLS', 'CLICK A HANGING TOOL TO INSPECT', '#38bdf8', '#fbbf24')
    })
  );
  toolsSignMesh.position.set(0, 5.05, 0.12);
  toolsSignMesh.userData = { hitType: 'wing-tools' };
  workshopGroup.add(toolsSignMesh);

  // Workbench Table below Pegboard
  const benchTop = new THREE.Mesh(
    new THREE.BoxGeometry(boardW + 0.3, 0.14, 1.35),
    new THREE.MeshStandardMaterial({ color: '#1e293b', metalness: 0.65, roughness: 0.35 })
  );
  benchTop.position.set(0, 0.68, 0.58);
  workshopGroup.add(benchTop);

  const blueprintMat = new THREE.Mesh(
    new THREE.PlaneGeometry(boardW - 0.5, 1.05),
    new THREE.MeshBasicMaterial({ map: createBlueprintTexture() })
  );
  blueprintMat.rotation.x = -Math.PI / 2;
  blueprintMat.position.set(0, 0.755, 0.62);
  workshopGroup.add(blueprintMat);

  // Generous Wing Hitbox for Hub Mode clicking Left
  const workshopWingHit = new THREE.Mesh(
    new THREE.BoxGeometry(boardW + 0.6, 5.5, 1.6),
    new THREE.MeshBasicMaterial({ visible: false })
  );
  workshopWingHit.position.set(0, 2.75, 0.3);
  workshopWingHit.userData = { hitType: 'wing-tools' };
  workshopGroup.add(workshopWingHit);

  // 6 Hanging Physical 3D Tools (3 columns × 2 rows)
  const interactiveObjects = [toolsSignMesh, workshopWingHit];
  const toolNodes = [];
  const hookGeom = new THREE.CylinderGeometry(0.016, 0.016, 0.24, 10);
  const hookMat = new THREE.MeshStandardMaterial({ color: '#cbd5e1', metalness: 0.92, roughness: 0.15 });

  tools.forEach((tool, idx) => {
    const col = idx % 3;
    const row = Math.floor(idx / 3);
    const localX = (col - 1) * 2.05;
    const localY = row === 0 ? 3.48 : 1.92;

    const slotGroup = new THREE.Group();
    slotGroup.position.set(localX, localY, 0.05);
    workshopGroup.add(slotGroup);

    // Glowing pegboard outline halo ring
    const haloRing = new THREE.Mesh(
      new THREE.RingGeometry(0.42, 0.48, 36),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(tool.accent),
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide
      })
    );
    haloRing.position.z = 0.01;
    slotGroup.add(haloRing);

    // Dual Chrome Pegboard Hooks
    [-0.18, 0.18].forEach((hx) => {
      const hook = new THREE.Mesh(hookGeom, hookMat);
      hook.rotation.x = Math.PI / 2;
      hook.position.set(hx, 0.22, 0.11);
      slotGroup.add(hook);
    });

    // Hanging 3D Tool Mesh
    const meshHolder = new THREE.Group();
    meshHolder.position.set(0, 0.02, 0.22);
    const toolMesh = buildPhysicalToolMesh(tool);
    meshHolder.add(toolMesh);
    slotGroup.add(meshHolder);

    // Crisp Pegboard Nameplate directly below each tool
    const tagPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(1.48, 0.42),
      new THREE.MeshBasicMaterial({ map: createPegTagTexture(tool) })
    );
    tagPlane.position.set(0, -0.56, 0.03);
    slotGroup.add(tagPlane);

    // Generous Hitbox per Tool
    const hitBox = new THREE.Mesh(
      new THREE.BoxGeometry(1.85, 1.45, 0.7),
      new THREE.MeshBasicMaterial({ visible: false })
    );
    hitBox.position.set(0, -0.1, 0.22);
    hitBox.userData = {
      hitType: 'tool',
      index: idx,
      id: tool.id
    };
    slotGroup.add(hitBox);
    interactiveObjects.push(hitBox);

    toolNodes.push({
      item: tool,
      index: idx,
      slotGroup,
      meshHolder,
      haloRing,
      currentLift: 0
    });
  });

  // =========================================================================
  // RIGHT WING: THE NEON ARCADE ROW (6 PLAYABLE 3D CABINETS)
  // =========================================================================
  const arcadeGroup = new THREE.Group();
  scene.add(arcadeGroup);

  // Overhead Neon Arcade Sign
  const gamesSignMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(3.8, 0.95),
    new THREE.MeshBasicMaterial({
      map: createSignTexture('GAMES', 'TAP OR SWIPE ARCADE CABINETS', '#ff2a85', '#00f0ff', '#10071c')
    })
  );
  gamesSignMesh.position.set(4.55, 5.05, -0.82);
  gamesSignMesh.rotation.y = -0.18;
  gamesSignMesh.userData = { hitType: 'wing-games' };
  arcadeGroup.add(gamesSignMesh);
  interactiveObjects.push(gamesSignMesh);

  const cabinetNodes = [];
  games.forEach((game, idx) => {
    // Gentle arcade gallery line angled slightly toward the viewer
    const cx = 2.05 + idx * 1.62;
    const cz = -1.25 + idx * 0.26;
    const built = buildArcadeCabinet(game, idx);
    built.root.position.set(cx, 0, cz);
    built.root.rotation.y = -0.18;
    arcadeGroup.add(built.root);

    interactiveObjects.push(built.hitMesh);
    interactiveObjects.push(built.screenMesh);

    cabinetNodes.push({
      item: game,
      index: idx,
      ...built,
      currentPop: 0
    });
  });

  // =========================================================================
  // Camera-on-Rails State Machine (Hub | Tools Pegboard | Arcade Row | ZoomIn)
  // =========================================================================
  let currentMode = 'hub'; // 'hub' | 'tools' | 'games'
  let activeToolIndex = 0;
  let activeGameIndex = 0;
  let isZoomedIntoScreen = false;
  let isPaused = false;
  let isDisposed = false;

  const targetCamPos = new THREE.Vector3(0, 2.35, 9.2);
  const targetLookAt = new THREE.Vector3(0, 2.0, -0.8);
  const currentLookAt = new THREE.Vector3(0, 2.0, -0.8);

  const pointerNdc = new THREE.Vector2(0, 0);
  let dragPreviewOffset = 0; // Live elastic swipe feedback on mobile/touch

  const tmpWorldPos = new THREE.Vector3();
  const tmpQuat = new THREE.Quaternion();
  const tmpForward = new THREE.Vector3();

  function recomputeCameraTargets() {
    const w = container.clientWidth || window.innerWidth;
    const h = container.clientHeight || window.innerHeight;
    const aspect = w / Math.max(h, 1);
    const isPortrait = aspect < 0.92;

    // Adjust FOV slightly on narrow portrait screens so left + right breathe cleanly
    const desiredFov = isPortrait ? 58 : 46;
    if (camera.fov !== desiredFov) {
      camera.fov = desiredFov;
      camera.updateProjectionMatrix();
    }

    if (currentMode === 'hub') {
      const zDist = isPortrait ? 13.2 : aspect < 1.35 ? 10.4 : 8.6;
      targetCamPos.set(0.15, isPortrait ? 2.65 : 2.35, zDist);
      targetLookAt.set(0.1, isPortrait ? 1.95 : 2.15, -1.05);
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
        const dist = isPortrait ? 4.35 : 3.25;
        targetCamPos.copy(tmpWorldPos).addScaledVector(tmpForward, dist);
        targetCamPos.y = tmpWorldPos.y - (isPortrait ? 0.22 : 0.06);
        targetLookAt.copy(tmpWorldPos);
        targetLookAt.y -= isPortrait ? 0.34 : 0.08;
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
  // Unified Tap + Touch Swipe + Trackpad Glide Input (Zero FPS Free-Look!)
  // =========================================================================
  const raycaster = new THREE.Raycaster();
  let pDownX = 0;
  let pDownY = 0;
  let pDownTime = 0;
  let isPointerDown = false;
  let hoveredToolIdx = -1;
  let hoveredCabIdx = -1;

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

    if (isPointerDown) {
      const dx = e.clientX - pDownX;
      dragPreviewOffset = THREE.MathUtils.clamp(-dx / 240, -0.65, 0.65);
      return;
    }

    // Lightweight hover cursor feedback on desktop
    const hit = getRaycastHit(e.clientX, e.clientY);
    hoveredToolIdx = hit?.hitType === 'tool' ? hit.index : -1;
    hoveredCabIdx =
      hit?.hitType === 'cabinet' || hit?.hitType === 'cabinet-screen' ? hit.index : -1;
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

    // 1. Horizontal Swipe Gesture (Mobile Touch or Desktop Drag)
    if (absX > 38 && absX > absY * 1.15 && dt < 900) {
      const dir = dx < 0 ? 1 : -1; // Swipe left -> advance right (+1)
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
          // Clicking left half vs right half of viewport in Hub enters that world immediately
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
        } else if (hit?.hitType === 'cabinet' || hit?.hitType === 'cabinet-screen' || hit?.hitType === 'wing-games') {
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
  // Smooth 60fps Animation Loop (Auto-Pauses to 0% GPU while playing a game!)
  // =========================================================================
  const clock = new THREE.Clock();
  let rafId = 0;

  function tick() {
    if (isDisposed || isPaused) return;
    rafId = requestAnimationFrame(tick);

    const dt = Math.min(clock.getDelta(), 0.05);
    const elapsed = clock.elapsedTime;
    const damp = 1 - Math.exp(-7.5 * dt);

    // Subtle pointer breathing parallax (never disorienting)
    const parallaxX = pointerNdc.x * (currentMode === 'hub' ? 0.28 : 0.1) + dragPreviewOffset;
    const parallaxY = pointerNdc.y * (currentMode === 'hub' ? 0.14 : 0.06);

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetCamPos.x + parallaxX, damp);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetCamPos.y + parallaxY, damp);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetCamPos.z, damp);

    currentLookAt.x = THREE.MathUtils.lerp(currentLookAt.x, targetLookAt.x + dragPreviewOffset * 0.65, damp);
    currentLookAt.y = THREE.MathUtils.lerp(currentLookAt.y, targetLookAt.y, damp);
    currentLookAt.z = THREE.MathUtils.lerp(currentLookAt.z, targetLookAt.z, damp);
    camera.lookAt(currentLookAt);

    // Animate Hanging 3D Tools on Pegboard (lift forward off hook when selected/hovered)
    toolNodes.forEach((node, idx) => {
      const isSelected = currentMode === 'tools' && idx === activeToolIndex;
      const isHovered = idx === hoveredToolIdx;
      const targetLift = isSelected ? 0.34 : isHovered ? 0.16 : 0;
      node.currentLift = THREE.MathUtils.lerp(node.currentLift, targetLift, damp);

      node.meshHolder.position.z = 0.22 + node.currentLift;
      node.meshHolder.rotation.y = isSelected
        ? Math.sin(elapsed * 2.1) * 0.22
        : Math.sin(elapsed * 0.9 + idx) * 0.04;
      node.haloRing.material.opacity = isSelected ? 0.92 : isHovered ? 0.58 : 0.24;
    });

    // Animate 3D Neon Arcade Cabinets (step slightly forward & pulse under-glow when active)
    cabinetNodes.forEach((cab, idx) => {
      const isSelected = currentMode === 'games' && idx === activeGameIndex;
      const isHovered = idx === hoveredCabIdx;
      const targetPop = isSelected ? 0.22 : isHovered ? 0.09 : 0;
      cab.currentPop = THREE.MathUtils.lerp(cab.currentPop, targetPop, damp);

      const baseZ = -1.25 + idx * 0.26;
      cab.root.position.z = baseZ + cab.currentPop;
      cab.glowRing.material.opacity = isSelected
        ? 0.44 + Math.sin(elapsed * 4) * 0.08
        : isHovered
          ? 0.3
          : 0.16;
      cab.trimMat.emissiveIntensity = isSelected ? 1.25 : 0.68;
    });

    renderer.render(scene, camera);
  }

  tick();

  return {
    setState({ mode, toolIndex, gameIndex, zoomed }) {
      currentMode = mode;
      if (typeof toolIndex === 'number') activeToolIndex = toolIndex;
      if (typeof gameIndex === 'number') activeGameIndex = gameIndex;
      if (typeof zoomed === 'boolean') isZoomedIntoScreen = zoomed;
      recomputeCameraTargets();
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
