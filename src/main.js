import {
  SITE_META,
  TOOLS_ITEMS,
  GAMES_ITEMS,
  FAST_LOAD_SOLUTIONS,
  EXTRA_CONCEPT_IDEAS
} from './data.js';
import { isSfxEnabled, toggleSfx, playMicroClick, playLaunchSound } from './audio.js';

const shellBootMs = Math.max(8, Math.round(performance.now()));

// ============================================================================
// State & Telemetry
// ============================================================================
let activeProto = 'workshop'; // 'workshop' | 'split' | 'artifacts'
let p1Mode = 'hub'; // 'hub' | 'tools' | 'games'
let p2Mode = 'hub'; // 'hub' | 'tools' | 'games'
let p3Mode = 'hub'; // 'hub' | 'tools' | 'games'

let selectedToolIdx = 0;
let selectedGameIdx = 0;

let scene3D = null;
let scene3DLoading = null;

const prefetchedUrls = new Set();
let dwellTimer = null;
let activeStageItem = null;
let activeStageKind = 'game'; // 'tool' | 'game'

// ============================================================================
// DOM References
// ============================================================================
const brandHomeBtn = document.getElementById('brandHomeBtn');
const protoButtons = document.querySelectorAll('[data-proto-btn]');
const bootMetricBadge = document.getElementById('bootMetricBadge');
const openSpeedLabBtn = document.getElementById('openSpeedLabBtn');
const openQuickIndexBtn = document.getElementById('openQuickIndexBtn');
const sfxToggleBtn = document.getElementById('sfxToggleBtn');

// Views
const protoWorkshopView = document.getElementById('protoWorkshopView');
const protoSplitView = document.getElementById('protoSplitView');
const protoArtifactsView = document.getElementById('protoArtifactsView');

// Prototype 1 refs
const threeCanvasHost = document.getElementById('threeCanvasHost');
const p1HubOverlay = document.getElementById('p1HubOverlay');
const p1GoToolsBtn = document.getElementById('p1GoToolsBtn');
const p1GoGamesBtn = document.getElementById('p1GoGamesBtn');
const p1WingNav = document.getElementById('p1WingNav');
const p1BackHubBtn = document.getElementById('p1BackHubBtn');
const p1CrossSwitchBtn = document.getElementById('p1CrossSwitchBtn');
const p1InspectorBar = document.getElementById('p1InspectorBar');
const p1InspectorCard = document.getElementById('p1InspectorCard');
const p1PrevBtn = document.getElementById('p1PrevBtn');
const p1NextBtn = document.getElementById('p1NextBtn');
const p1ItemIcon = document.getElementById('p1ItemIcon');
const p1ItemBadge = document.getElementById('p1ItemBadge');
const p1ItemLoadBadge = document.getElementById('p1ItemLoadBadge');
const p1PrefetchIndicator = document.getElementById('p1PrefetchIndicator');
const p1ItemTitle = document.getElementById('p1ItemTitle');
const p1ItemSummary = document.getElementById('p1ItemSummary');
const p1LaunchBtn = document.getElementById('p1LaunchBtn');
const p1InfoBtn = document.getElementById('p1InfoBtn');
const p1DotsStrip = document.getElementById('p1DotsStrip');
const p1SwipeHint = document.getElementById('p1SwipeHint');

// Prototype 2 refs
const p2SplitHub = document.getElementById('p2SplitHub');
const p2EnterTools = document.getElementById('p2EnterTools');
const p2EnterGames = document.getElementById('p2EnterGames');
const p2ToolsWall = document.getElementById('p2ToolsWall');
const p2PegboardGrid = document.getElementById('p2PegboardGrid');
const p2ArcadeCoverflow = document.getElementById('p2ArcadeCoverflow');
const p2CoverflowStage = document.getElementById('p2CoverflowStage');
const p2CoverflowTrack = document.getElementById('p2CoverflowTrack');
const p2CabPrev = document.getElementById('p2CabPrev');
const p2CabNext = document.getElementById('p2CabNext');
const p2ActiveGameFooter = document.getElementById('p2ActiveGameFooter');

// Prototype 3 refs
const p3HardwareHub = document.getElementById('p3HardwareHub');
const p3SelectCyberdeck = document.getElementById('p3SelectCyberdeck');
const p3SelectBartop = document.getElementById('p3SelectBartop');
const p3CyberdeckScreen = document.getElementById('p3CyberdeckScreen');
const p3BartopScreen = document.getElementById('p3BartopScreen');
const p3ZoomedOs = document.getElementById('p3ZoomedOs');
const p3ZoomOutBtn = document.getElementById('p3ZoomOutBtn');
const p3OsEyebrow = document.getElementById('p3OsEyebrow');
const p3OsHeading = document.getElementById('p3OsHeading');
const p3FlipDeviceBtn = document.getElementById('p3FlipDeviceBtn');
const p3OsBody = document.getElementById('p3OsBody');

// Playable Stage Modal refs
const playStageDialog = document.getElementById('playStageDialog');
const playStageShell = document.getElementById('playStageShell');
const closeStageBtn = document.getElementById('closeStageBtn');
const closeStageLabel = document.getElementById('closeStageLabel');
const stageIcon = document.getElementById('stageIcon');
const stageTitle = document.getElementById('stageTitle');
const stageTelemetryTag = document.getElementById('stageTelemetryTag');
const stageTabLive = document.getElementById('stageTabLive');
const stageTabSpecs = document.getElementById('stageTabSpecs');
const stageFullscreenBtn = document.getElementById('stageFullscreenBtn');
const stageExternalLink = document.getElementById('stageExternalLink');
const stageLivePanel = document.getElementById('stageLivePanel');
const stageLoadingCurtain = document.getElementById('stageLoadingCurtain');
const stageLoadingText = document.getElementById('stageLoadingText');
const liveProjectIframe = document.getElementById('liveProjectIframe');
const stageSpecsPanel = document.getElementById('stageSpecsPanel');
const stageSpecsContent = document.getElementById('stageSpecsContent');

// Modals
const speedLabDialog = document.getElementById('speedLabDialog');
const liveMetricsStrip = document.getElementById('liveMetricsStrip');
const speedLabBody = document.getElementById('speedLabBody');
const quickIndexDialog = document.getElementById('quickIndexDialog');
const quickIndexBody = document.getElementById('quickIndexBody');

bootMetricBadge.textContent = `Shell ${shellBootMs}ms • 0KB Games`;

// ============================================================================
// 1. Speculative Dwell Prefetching (<link rel="prefetch"> after 900ms linger)
// ============================================================================
function scheduleSpeculativePrefetch(item) {
  clearTimeout(dwellTimer);
  if (!item || prefetchedUrls.has(item.playUrl)) {
    updatePrefetchBadge(item);
    return;
  }
  updatePrefetchBadge(item);

  // Respect mobile data-saver preference
  if (navigator.connection?.saveData) return;

  dwellTimer = setTimeout(() => {
    const run = () => {
      if (prefetchedUrls.has(item.playUrl)) return;
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = item.playUrl;
      link.as = 'document';
      document.head.appendChild(link);
      prefetchedUrls.add(item.playUrl);
      updatePrefetchBadge(item);
    };
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(run, { timeout: 1200 });
    } else {
      run();
    }
  }, 900);
}

function updatePrefetchBadge(item) {
  if (!p1PrefetchIndicator || !item) return;
  p1PrefetchIndicator.hidden = !prefetchedUrls.has(item.playUrl);
}

// ============================================================================
// 2. Prototype 1: Lazy-Booted 3D Pegboard Wall & Neon Arcade
// ============================================================================
async function ensureScene3D() {
  if (scene3D) return scene3D;
  if (scene3DLoading) return scene3DLoading;

  scene3DLoading = import('./workshopArcade3D.js').then(({ createWorkshopArcade3D }) => {
    scene3D = createWorkshopArcade3D({
      container: threeCanvasHost,
      tools: TOOLS_ITEMS,
      games: GAMES_ITEMS,
      onSelectMode(mode, index) {
        if (mode === 'tools' && typeof index === 'number') selectedToolIdx = index;
        if (mode === 'games' && typeof index === 'number') selectedGameIdx = index;
        setP1Mode(mode);
      },
      onSelectTool(idx) {
        selectedToolIdx = idx;
        playMicroClick('tool');
        renderP1Hud();
      },
      onSelectGame(idx) {
        selectedGameIdx = idx;
        playMicroClick('arcade');
        renderP1Hud();
      },
      onLaunchTool(idx) {
        selectedToolIdx = idx;
        renderP1Hud();
        openPlayableStage(TOOLS_ITEMS[idx], 'tool', 'live');
      },
      onLaunchGame(idx) {
        selectedGameIdx = idx;
        renderP1Hud();
        openPlayableStage(GAMES_ITEMS[idx], 'game', 'live');
      }
    });
    scene3D.setState({
      mode: p1Mode,
      toolIndex: selectedToolIdx,
      gameIndex: selectedGameIdx,
      zoomed: false
    });
    return scene3D;
  });

  return scene3DLoading;
}

function setP1Mode(targetMode) {
  p1Mode = targetMode;
  document.body.dataset.mode = targetMode;
  playMicroClick(targetMode === 'games' ? 'arcade' : 'tool');
  renderP1Hud();
}

function renderP1Hud() {
  const isHub = p1Mode === 'hub';
  p1HubOverlay.hidden = !isHub;
  p1WingNav.hidden = isHub;
  p1InspectorBar.hidden = isHub;

  if (scene3D) {
    scene3D.setState({
      mode: p1Mode,
      toolIndex: selectedToolIdx,
      gameIndex: selectedGameIdx,
      zoomed: Boolean(playStageDialog.open)
    });
  }

  if (isHub) {
    clearTimeout(dwellTimer);
    return;
  }

  const isGames = p1Mode === 'games';
  const list = isGames ? GAMES_ITEMS : TOOLS_ITEMS;
  const activeIdx = isGames ? selectedGameIdx : selectedToolIdx;
  const item = list[activeIdx];

  p1CrossSwitchBtn.textContent = isGames ? '← Switch to Tool Pegboard' : 'Switch to Neon Arcade →';
  p1CrossSwitchBtn.className = `glass-nav-pill ${isGames ? 'accent-tools-pill' : 'accent-cross-pill'}`;

  p1InspectorCard.style.setProperty('--active-accent', item.accent);
  p1ItemIcon.src = item.iconUrl;
  p1ItemIcon.alt = `${item.name} icon`;
  p1ItemBadge.textContent = item.badge;
  p1ItemLoadBadge.textContent = item.bundleSizeLabel;
  p1ItemTitle.textContent = item.name;
  p1ItemSummary.textContent = item.tldr;
  p1LaunchBtn.innerHTML = isGames ? `&#129689; ${item.playLabel}` : `&#128295; ${item.playLabel}`;
  p1SwipeHint.textContent = isGames
    ? `Cabinet ${activeIdx + 1} of ${list.length} • ${item.controlsHint} • Swipe or tap cabinets`
    : `Peg Hook ${activeIdx + 1} of ${list.length} (${item.physicalLabel}) • Swipe or tap any hanging 3D tool`;

  p1PrevBtn.disabled = activeIdx <= 0;
  p1NextBtn.disabled = activeIdx >= list.length - 1;

  p1DotsStrip.innerHTML = '';
  list.forEach((entry, idx) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = `rail-dot-btn ${idx === activeIdx ? 'active' : ''}`;
    dot.title = entry.name;
    dot.setAttribute('aria-label', `Select ${entry.name}`);
    dot.addEventListener('click', () => {
      if (isGames) selectedGameIdx = idx;
      else selectedToolIdx = idx;
      playMicroClick(isGames ? 'arcade' : 'tool');
      renderP1Hud();
    });
    p1DotsStrip.appendChild(dot);
  });

  scheduleSpeculativePrefetch(item);
}

p1GoToolsBtn.addEventListener('click', () => setP1Mode('tools'));
p1GoGamesBtn.addEventListener('click', () => setP1Mode('games'));
p1BackHubBtn.addEventListener('click', () => setP1Mode('hub'));
p1CrossSwitchBtn.addEventListener('click', () => {
  setP1Mode(p1Mode === 'games' ? 'tools' : 'games');
});

p1PrevBtn.addEventListener('click', () => {
  if (p1Mode === 'games' && selectedGameIdx > 0) {
    selectedGameIdx--;
    playMicroClick('arcade');
    renderP1Hud();
  } else if (p1Mode === 'tools' && selectedToolIdx > 0) {
    selectedToolIdx--;
    playMicroClick('tool');
    renderP1Hud();
  }
});

p1NextBtn.addEventListener('click', () => {
  if (p1Mode === 'games' && selectedGameIdx < GAMES_ITEMS.length - 1) {
    selectedGameIdx++;
    playMicroClick('arcade');
    renderP1Hud();
  } else if (p1Mode === 'tools' && selectedToolIdx < TOOLS_ITEMS.length - 1) {
    selectedToolIdx++;
    playMicroClick('tool');
    renderP1Hud();
  }
});

p1LaunchBtn.addEventListener('click', () => {
  if (p1Mode === 'games') {
    openPlayableStage(GAMES_ITEMS[selectedGameIdx], 'game', 'live');
  } else {
    openPlayableStage(TOOLS_ITEMS[selectedToolIdx], 'tool', 'live');
  }
});

p1InfoBtn.addEventListener('click', () => {
  if (p1Mode === 'games') {
    openPlayableStage(GAMES_ITEMS[selectedGameIdx], 'game', 'specs');
  } else {
    openPlayableStage(TOOLS_ITEMS[selectedToolIdx], 'tool', 'specs');
  }
});

// ============================================================================
// 3. Prototype 2: Kinetic Split Curtain + Swinging Pegboard + CSS-3D Coverflow
// ============================================================================
function renderP2() {
  p2SplitHub.hidden = p2Mode !== 'hub';
  p2ToolsWall.hidden = p2Mode !== 'tools';
  p2ArcadeCoverflow.hidden = p2Mode !== 'games';

  if (p2Mode === 'tools') {
    renderP2Pegboard();
  } else if (p2Mode === 'games') {
    renderP2Coverflow();
  }
}

function renderP2Pegboard() {
  p2PegboardGrid.innerHTML = '';
  TOOLS_ITEMS.forEach((tool) => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'hanging-tool-plaque';
    card.style.setProperty('--plaque-accent', tool.accent);
    card.innerHTML = `
      <div class="plaque-head">
        <img src="${tool.iconUrl}" alt="${tool.name}" width="52" height="52" loading="lazy" />
        <div>
          <div class="plaque-physical-tag">${tool.physicalLabel}</div>
          <h3>${tool.name}</h3>
        </div>
      </div>
      <p class="plaque-desc">${tool.tldr}</p>
      <div class="plaque-footer">
        <span class="mini-badge badge-load">${tool.bundleSizeLabel}</span>
        <span class="plaque-launch-chip">&#9654; Launch Tool</span>
      </div>
    `;
    card.addEventListener('pointerenter', () => scheduleSpeculativePrefetch(tool));
    card.addEventListener('click', () => openPlayableStage(tool, 'tool', 'live'));
    p2PegboardGrid.appendChild(card);
  });
}

function renderP2Coverflow() {
  p2CoverflowTrack.innerHTML = '';

  GAMES_ITEMS.forEach((game, idx) => {
    const offset = idx - selectedGameIdx;
    const absOff = Math.abs(offset);
    const cab = document.createElement('div');
    cab.className = 'css3d-cabinet';
    cab.style.setProperty('--cab-accent', game.accent);
    cab.style.setProperty('--cab-sec', game.secondaryAccent);

    const tx = offset * 215;
    const tz = -absOff * 145;
    const ry = Math.max(-42, Math.min(42, -offset * 28));
    cab.style.transform = `translate3d(${tx}px, 0, ${tz}px) rotateY(${ry}deg)`;
    cab.style.zIndex = String(20 - absOff);
    cab.style.opacity = absOff > 2 ? '0' : absOff === 0 ? '1' : '0.68';
    cab.style.pointerEvents = absOff > 2 ? 'none' : 'auto';

    cab.innerHTML = `
      <div class="css3d-marquee">${game.shortName}</div>
      <div class="css3d-crt">
        <img src="${game.iconUrl}" alt="${game.name}" width="74" height="74" />
        <strong style="font-size:15px">${game.name}</strong>
        <span style="font-size:11px;color:#cbd5e1">${game.badge}</span>
        <span class="css3d-crt-cta">${offset === 0 ? '▶ INSERT COIN' : 'TAP CABINET'}</span>
      </div>
      <div class="css3d-deck">
        <span class="deck-stick-dot"></span>
        <div class="deck-btn-cluster"><span></span><span></span><span></span><span></span></div>
      </div>
    `;

    cab.addEventListener('click', () => {
      if (idx === selectedGameIdx) {
        openPlayableStage(game, 'game', 'live');
      } else {
        selectedGameIdx = idx;
        playMicroClick('arcade');
        renderP2Coverflow();
      }
    });

    p2CoverflowTrack.appendChild(cab);
  });

  const activeGame = GAMES_ITEMS[selectedGameIdx];
  p2ActiveGameFooter.style.setProperty('--active-accent', activeGame.accent);
  p2ActiveGameFooter.innerHTML = `
    <div style="display:flex;justify-content:center;gap:8px;margin-bottom:6px;flex-wrap:wrap">
      <span class="mini-badge">${activeGame.badge}</span>
      <span class="mini-badge badge-load">${activeGame.bundleSizeLabel}</span>
    </div>
    <h3 style="font-size:19px;font-weight:800">${activeGame.name}</h3>
    <p style="font-size:13px;color:#cbd5e1;margin:6px 0 12px">${activeGame.tldr}</p>
    <div style="display:flex;justify-content:center;gap:10px">
      <button type="button" id="p2PlayActiveBtn" class="primary-launch-btn" style="max-width:260px">
        &#129689; ${activeGame.playLabel}
      </button>
      <button type="button" id="p2SpecsActiveBtn" class="secondary-specs-btn">Specs</button>
    </div>
  `;

  document.getElementById('p2PlayActiveBtn')?.addEventListener('click', () => {
    openPlayableStage(activeGame, 'game', 'live');
  });
  document.getElementById('p2SpecsActiveBtn')?.addEventListener('click', () => {
    openPlayableStage(activeGame, 'game', 'specs');
  });

  p2CabPrev.disabled = selectedGameIdx <= 0;
  p2CabNext.disabled = selectedGameIdx >= GAMES_ITEMS.length - 1;
  scheduleSpeculativePrefetch(activeGame);
}

p2EnterTools.addEventListener('click', () => {
  p2Mode = 'tools';
  playMicroClick('tool');
  renderP2();
});
p2EnterTools.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    p2EnterTools.click();
  }
});
p2EnterGames.addEventListener('click', () => {
  p2Mode = 'games';
  playMicroClick('arcade');
  renderP2();
});
p2EnterGames.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    p2EnterGames.click();
  }
});
document.querySelectorAll('[data-p2-nav]').forEach((btn) => {
  btn.addEventListener('click', () => {
    p2Mode = btn.dataset.p2Nav;
    playMicroClick('arcade');
    renderP2();
  });
});

p2CabPrev.addEventListener('click', () => {
  if (selectedGameIdx > 0) {
    selectedGameIdx--;
    playMicroClick('arcade');
    renderP2Coverflow();
  }
});
p2CabNext.addEventListener('click', () => {
  if (selectedGameIdx < GAMES_ITEMS.length - 1) {
    selectedGameIdx++;
    playMicroClick('arcade');
    renderP2Coverflow();
  }
});

// Touch Swipe on Prototype 2 Coverflow
let p2TouchX = 0;
p2CoverflowStage.addEventListener('pointerdown', (e) => {
  p2TouchX = e.clientX;
});
p2CoverflowStage.addEventListener('pointerup', (e) => {
  const dx = e.clientX - p2TouchX;
  if (Math.abs(dx) > 40) {
    const next = Math.max(0, Math.min(GAMES_ITEMS.length - 1, selectedGameIdx + (dx < 0 ? 1 : -1)));
    if (next !== selectedGameIdx) {
      selectedGameIdx = next;
      playMicroClick('arcade');
      renderP2Coverflow();
    }
  }
});

// ============================================================================
// 4. Prototype 3: Dual Desk Artifacts (Cyberdeck vs. Bartop Mini-Arcade)
// ============================================================================
function transitionP3Mode(nextMode) {
  if (nextMode === p3Mode) return;
  const prevMode = p3Mode;

  const applyDom = () => {
    p3Mode = nextMode;
    p3HardwareHub.hidden = nextMode !== 'hub';
    p3ZoomedOs.hidden = nextMode === 'hub';
    if (nextMode !== 'hub') renderP3Os(nextMode);
  };

  playMicroClick(nextMode === 'games' ? 'arcade' : 'tool');

  if (!document.startViewTransition) {
    applyDom();
    return;
  }

  // Pair device screen on desk with zoomed OS view (same magic as mascaz.github.io)
  [p3CyberdeckScreen, p3BartopScreen, p3ZoomedOs].forEach((el) => el.classList.remove('vt-morph-target'));
  if (prevMode === 'hub' && nextMode === 'tools') p3CyberdeckScreen.classList.add('vt-morph-target');
  if (prevMode === 'hub' && nextMode === 'games') p3BartopScreen.classList.add('vt-morph-target');
  if (prevMode !== 'hub' && nextMode === 'hub') p3ZoomedOs.classList.add('vt-morph-target');

  const vt = document.startViewTransition(() => {
    [p3CyberdeckScreen, p3BartopScreen, p3ZoomedOs].forEach((el) => el.classList.remove('vt-morph-target'));
    if (nextMode !== 'hub') {
      p3ZoomedOs.classList.add('vt-morph-target');
    } else if (prevMode === 'tools') {
      p3CyberdeckScreen.classList.add('vt-morph-target');
    } else if (prevMode === 'games') {
      p3BartopScreen.classList.add('vt-morph-target');
    }
    applyDom();
  });

  vt.finished.finally(() => {
    [p3CyberdeckScreen, p3BartopScreen, p3ZoomedOs].forEach((el) => el.classList.remove('vt-morph-target'));
  });
}

function renderP3Os(kind) {
  const isGames = kind === 'games';
  const items = isGames ? GAMES_ITEMS : TOOLS_ITEMS;

  p3OsEyebrow.textContent = isGames
    ? 'BARTOP ARCADE OS // 6 PLAYABLE CABINETS'
    : 'FIELD CYBERDECK MK-VI // 6 LIVE TOOLS';
  p3OsHeading.textContent = isGames ? 'Select a Game Cartridge to Play' : 'Select a Cyberdeck Tool Module';
  p3FlipDeviceBtn.textContent = isGames
    ? '← Switch to Tool Cyberdeck'
    : 'Switch to Bartop Arcade →';

  p3OsBody.innerHTML = '';
  items.forEach((item) => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'os-module-card';
    card.style.setProperty('--mod-accent', item.accent);
    card.innerHTML = `
      <div style="display:flex;align-items:center;gap:12px">
        <img src="${item.iconUrl}" alt="${item.name}" width="48" height="48" style="border-radius:12px;object-fit:cover" loading="lazy" />
        <div>
          <span class="mini-badge" style="--active-accent:${item.accent}">${item.badge}</span>
          <h3 style="font-size:17px;font-weight:800;margin-top:4px">${item.name}</h3>
        </div>
      </div>
      <p style="font-size:13px;line-height:1.5;color:#cbd5e1;flex:1">${item.tldr}</p>
      <div style="display:flex;justify-content:space-between;align-items:center;padding-top:8px;border-top:1px solid rgba(148,163,184,0.15)">
        <span class="mini-badge badge-load">${item.bundleSizeLabel}</span>
        <span style="font-weight:800;font-size:12.5px;color:${item.accent}">&#9654; ${item.playLabel}</span>
      </div>
    `;
    card.addEventListener('pointerenter', () => scheduleSpeculativePrefetch(item));
    card.addEventListener('click', () => openPlayableStage(item, isGames ? 'game' : 'tool', 'live'));
    p3OsBody.appendChild(card);
  });
}

p3SelectCyberdeck.addEventListener('click', () => transitionP3Mode('tools'));
p3SelectBartop.addEventListener('click', () => transitionP3Mode('games'));
p3ZoomOutBtn.addEventListener('click', () => transitionP3Mode('hub'));
p3FlipDeviceBtn.addEventListener('click', () => {
  transitionP3Mode(p3Mode === 'games' ? 'tools' : 'games');
});

// ============================================================================
// 5. Prototype Switcher (01 Workshop 3D | 02 Split Curtain | 03 Artifacts)
// ============================================================================
function switchPrototype(protoId) {
  activeProto = protoId;
  document.body.dataset.proto = protoId;

  protoButtons.forEach((btn) => {
    const active = btn.dataset.protoBtn === protoId;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-selected', String(active));
  });

  protoWorkshopView.hidden = protoId !== 'workshop';
  protoSplitView.hidden = protoId !== 'split';
  protoArtifactsView.hidden = protoId !== 'artifacts';

  const url = new URL(window.location.href);
  url.searchParams.set('proto', protoId);
  window.history.replaceState({}, '', url);

  if (protoId === 'workshop') {
    ensureScene3D().then((s) => {
      s.setPaused(Boolean(playStageDialog.open));
      s.resize();
      renderP1Hud();
    });
  } else {
    if (scene3D) scene3D.setPaused(true);
    if (protoId === 'split') renderP2();
    if (protoId === 'artifacts' && p3Mode !== 'hub') renderP3Os(p3Mode);
  }
}

protoButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    playMicroClick('tool');
    switchPrototype(btn.dataset.protoBtn);
  });
});

brandHomeBtn.addEventListener('click', () => {
  if (activeProto === 'workshop') setP1Mode('hub');
  else if (activeProto === 'split') {
    p2Mode = 'hub';
    renderP2();
  } else if (activeProto === 'artifacts') {
    transitionP3Mode('hub');
  }
});

// ============================================================================
// 6. Unified Zero-Lag Playable Stage (Lazy Iframe + 3D Auto-Pause)
// ============================================================================
let freezeTimer = null;

function setStageTab(tabName) {
  const isLive = tabName === 'live';
  stageTabLive.classList.toggle('active', isLive);
  stageTabLive.setAttribute('aria-selected', String(isLive));
  stageTabSpecs.classList.toggle('active', !isLive);
  stageTabSpecs.setAttribute('aria-selected', String(!isLive));

  stageLivePanel.hidden = !isLive;
  stageSpecsPanel.hidden = isLive;

  if (isLive && activeStageItem) {
    if (liveProjectIframe.getAttribute('src') !== activeStageItem.playUrl) {
      stageLoadingCurtain.hidden = false;
      stageLoadingCurtain.style.opacity = '1';
      liveProjectIframe.src = activeStageItem.playUrl;
    }
  }
}

function openPlayableStage(item, kind = 'game', initialTab = 'live') {
  if (!item) return;
  activeStageItem = item;
  activeStageKind = kind;
  playLaunchSound(kind);

  playStageShell.dataset.stageTheme = kind;
  closeStageLabel.textContent = kind === 'game' ? 'Step Out of Cabinet' : 'Back to Pegboard';
  stageIcon.src = item.iconUrl;
  stageIcon.alt = item.name;
  stageTitle.textContent = item.name;
  stageExternalLink.href = item.playUrl;

  const isEdge = item.loadType === 'edge';
  stageTelemetryTag.textContent =
    activeProto === 'workshop'
      ? `⚡ ${item.bundleSizeLabel} • 3D Room Auto-Paused (0% BG GPU)`
      : `⚡ ${item.bundleSizeLabel} • Lazy Mounted`;

  stageLoadingText.textContent = isEdge
    ? `Streaming ${item.name} from Edge CDN (0 KB in main repo)…`
    : `Mounting ${item.name} (${item.bundleSizeLabel})…`;

  stageSpecsContent.innerHTML = `
    <div class="arch-card" style="padding:20px">
      <div class="arch-step">${item.category}</div>
      <h3 style="font-size:22px;margin-top:6px">${item.name}</h3>
      <span class="arch-metric-pill">Load Strategy: ${item.bundleSizeLabel}</span>
      <p style="font-size:14px;line-height:1.65;margin-top:8px">${item.description}</p>
      <div style="display:flex;flex-wrap:wrap;gap:7px;margin-top:14px">
        ${item.tech.map((t) => `<span class="mini-badge">${t}</span>`).join('')}
      </div>
    </div>
  `;

  // Zoom 3D camera into CRT / Workbench for 380ms, then freeze 3D loop to 0% GPU!
  if (activeProto === 'workshop' && scene3D) {
    scene3D.setState({
      mode: p1Mode === 'hub' ? (kind === 'game' ? 'games' : 'tools') : p1Mode,
      toolIndex: selectedToolIdx,
      gameIndex: selectedGameIdx,
      zoomed: true
    });
    clearTimeout(freezeTimer);
    freezeTimer = setTimeout(() => {
      if (playStageDialog.open && scene3D) scene3D.setPaused(true);
    }, 420);
  }

  liveProjectIframe.src = 'about:blank';
  setStageTab(initialTab);

  if (!playStageDialog.open) {
    playStageDialog.showModal();
  }
}

liveProjectIframe.addEventListener('load', () => {
  if (liveProjectIframe.getAttribute('src') === 'about:blank') return;
  stageLoadingCurtain.style.opacity = '0';
  setTimeout(() => {
    stageLoadingCurtain.hidden = true;
  }, 240);
});

function closePlayableStage() {
  clearTimeout(freezeTimer);
  // Immediately release game WebGL context, WASM memory & WebAudio
  liveProjectIframe.src = 'about:blank';
  activeStageItem = null;

  if (playStageDialog.open) {
    playStageDialog.close();
  }

  if (activeProto === 'workshop' && scene3D) {
    scene3D.setPaused(false);
    scene3D.setState({
      mode: p1Mode,
      toolIndex: selectedToolIdx,
      gameIndex: selectedGameIdx,
      zoomed: false
    });
  }
}

closeStageBtn.addEventListener('click', closePlayableStage);
playStageDialog.addEventListener('close', () => {
  if (activeStageItem) closePlayableStage();
});

stageTabLive.addEventListener('click', () => setStageTab('live'));
stageTabSpecs.addEventListener('click', () => setStageTab('specs'));

stageFullscreenBtn.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    playStageShell.requestFullscreen?.().catch(() => {});
  } else {
    document.exitFullscreen?.().catch(() => {});
  }
});

// Keyboard Arrow Navigation for Arcade Cabinets & Pegboard Tools
window.addEventListener('keydown', (e) => {
  if (playStageDialog.open || speedLabDialog.open || quickIndexDialog.open) return;

  if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
    const dir = e.key === 'ArrowRight' ? 1 : -1;
    if (activeProto === 'workshop' && p1Mode === 'games') {
      const n = Math.max(0, Math.min(GAMES_ITEMS.length - 1, selectedGameIdx + dir));
      if (n !== selectedGameIdx) {
        selectedGameIdx = n;
        playMicroClick('arcade');
        renderP1Hud();
      }
    } else if (activeProto === 'workshop' && p1Mode === 'tools') {
      const n = Math.max(0, Math.min(TOOLS_ITEMS.length - 1, selectedToolIdx + dir));
      if (n !== selectedToolIdx) {
        selectedToolIdx = n;
        playMicroClick('tool');
        renderP1Hud();
      }
    } else if (activeProto === 'split' && p2Mode === 'games') {
      const n = Math.max(0, Math.min(GAMES_ITEMS.length - 1, selectedGameIdx + dir));
      if (n !== selectedGameIdx) {
        selectedGameIdx = n;
        playMicroClick('arcade');
        renderP2Coverflow();
      }
    }
  }
});

// ============================================================================
// 7. Fast-Load Architecture Lab & Plain-Text Quick Index Modals
// ============================================================================
function renderSpeedLabModal() {
  liveMetricsStrip.innerHTML = `
    <div class="metric-box">
      <div class="metric-val">${shellBootMs} ms</div>
      <div class="metric-lbl">Initial UI Shell Ready</div>
    </div>
    <div class="metric-box">
      <div class="metric-val">0 KB</div>
      <div class="metric-lbl">Game Code Downloaded on Boot</div>
    </div>
    <div class="metric-box">
      <div class="metric-val">0 .glb</div>
      <div class="metric-lbl">100% Procedural 3D Meshes</div>
    </div>
    <div class="metric-box">
      <div class="metric-val">${prefetchedUrls.size} Warm</div>
      <div class="metric-lbl">Dwell-Prefetched Builds</div>
    </div>
  `;

  speedLabBody.innerHTML = `
    <div>
      <h3 style="font-size:17px;margin-bottom:10px;color:#bae6fd">6-Layer Solution: Playable Games Without Slow Website Loads</h3>
      <div class="arch-grid">
        ${FAST_LOAD_SOLUTIONS.map(
          (s) => `
          <div class="arch-card">
            <div class="arch-step">SOLUTION ${s.step}</div>
            <h4>${s.title}</h4>
            <span class="arch-metric-pill">${s.metric}</span>
            <p>${s.detail}</p>
          </div>
        `
        ).join('')}
      </div>
    </div>

    <div>
      <h3 style="font-size:17px;margin-bottom:10px;color:#fbcfe8">5 "Woah" Dual-World Concepts (3 Built Live Above + 2 Bonus Directions)</h3>
      <div class="arch-grid">
        ${EXTRA_CONCEPT_IDEAS.map(
          (c) => `
          <div class="arch-card">
            <div class="arch-step">${c.vibe.toUpperCase()}</div>
            <h4>${c.name}</h4>
            <p style="margin-top:6px">${c.summary}</p>
          </div>
        `
        ).join('')}
      </div>
    </div>
  `;
}

function renderQuickIndexModal() {
  const renderCol = (items, kind, heading, color) => `
    <div>
      <h3 style="font-size:16px;color:${color};margin-bottom:6px">${heading}</h3>
      ${items
        .map(
          (it, idx) => `
        <button type="button" class="tldr-row-btn" data-quick-kind="${kind}" data-quick-idx="${idx}">
          <img src="${it.iconUrl}" alt="${it.name}" width="38" height="38" loading="lazy" />
          <div style="flex:1;min-width:0">
            <div style="font-weight:800;font-size:14px">${it.name}</div>
            <div style="font-size:11.5px;color:#94a3b8;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${it.bundleSizeLabel} &bull; ${it.badge}</div>
          </div>
          <span style="font-family:var(--font-mono);font-size:12px;color:${color}">&#9654;</span>
        </button>
      `
        )
        .join('')}
    </div>
  `;

  quickIndexBody.innerHTML = `
    <div class="tldr-columns">
      ${renderCol(TOOLS_ITEMS, 'tool', '← Left World: Interactive Tools (6)', '#38bdf8')}
      ${renderCol(GAMES_ITEMS, 'game', 'Right World: Playable Games (6) →', '#ff2a85')}
    </div>
    <div style="padding-top:12px;border-top:1px solid rgba(148,163,184,0.16);display:flex;gap:14px;flex-wrap:wrap;font-size:12.5px">
      <a href="${SITE_META.portfolioUrl}" target="_blank" rel="noopener" style="color:#bae6fd">Main Portfolio (mascaz.github.io) &#8599;</a>
      <a href="${SITE_META.githubUrl}" target="_blank" rel="noopener" style="color:#bae6fd">GitHub Repo (Mascaz/AI-Services) &#8599;</a>
    </div>
  `;

  quickIndexBody.querySelectorAll('[data-quick-kind]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const kind = btn.dataset.quickKind;
      const idx = Number(btn.dataset.quickIdx);
      quickIndexDialog.close();
      if (kind === 'tool') {
        selectedToolIdx = idx;
        openPlayableStage(TOOLS_ITEMS[idx], 'tool', 'live');
      } else {
        selectedGameIdx = idx;
        openPlayableStage(GAMES_ITEMS[idx], 'game', 'live');
      }
    });
  });
}

openSpeedLabBtn.addEventListener('click', () => {
  renderSpeedLabModal();
  speedLabDialog.showModal();
});

openQuickIndexBtn.addEventListener('click', () => {
  renderQuickIndexModal();
  quickIndexDialog.showModal();
});

sfxToggleBtn.addEventListener('click', () => {
  const on = toggleSfx();
  sfxToggleBtn.innerHTML = on ? '&#128266;' : '&#128263;';
  sfxToggleBtn.style.opacity = on ? '1' : '0.55';
});

// Fallback backdrop click dismissal for browsers without native <dialog closedby="any">
[speedLabDialog, quickIndexDialog].forEach((dlg) => {
  if (!('closedBy' in HTMLDialogElement.prototype)) {
    dlg.addEventListener('click', (e) => {
      if (e.target === dlg) dlg.close();
    });
  }
});

// ============================================================================
// 8. Boot Initial Prototype from URL (?proto=workshop|split|artifacts)
// ============================================================================
const params = new URLSearchParams(window.location.search);
const initialProto = ['workshop', 'split', 'artifacts'].includes(params.get('proto'))
  ? params.get('proto')
  : 'workshop';

switchPrototype(initialProto);
