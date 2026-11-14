import { SITE_META, TOOLS_ITEMS, GAMES_ITEMS } from './data.js';
import { toggleSfx, playMicroClick, playLaunchSound } from './audio.js';

// ============================================================================
// State
// ============================================================================
let currentMode = 'hub'; // 'hub' | 'tools' | 'games'
let selectedToolIdx = 0;
let selectedGameIdx = 0;

let scene3D = null;
const prefetchedUrls = new Set();
let dwellTimer = null;
let activeStageItem = null;
let freezeTimer = null;

// ============================================================================
// DOM References
// ============================================================================
const brandHomeBtn = document.getElementById('brandHomeBtn');
const navToolsBtn = document.getElementById('navToolsBtn');
const navGamesBtn = document.getElementById('navGamesBtn');
const openQuickIndexBtn = document.getElementById('openQuickIndexBtn');
const sfxToggleBtn = document.getElementById('sfxToggleBtn');

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

// Quick Index Modal refs
const quickIndexDialog = document.getElementById('quickIndexDialog');
const quickIndexBody = document.getElementById('quickIndexBody');

// ============================================================================
// 1. Speculative Dwell Prefetching (<link rel="prefetch"> after 900ms linger)
// ============================================================================
function updatePrefetchBadge(item) {
  if (!p1PrefetchIndicator || !item) return;
  p1PrefetchIndicator.hidden = !prefetchedUrls.has(item.playUrl);
}

function scheduleSpeculativePrefetch(item) {
  clearTimeout(dwellTimer);
  if (!item || prefetchedUrls.has(item.playUrl)) {
    updatePrefetchBadge(item);
    return;
  }
  updatePrefetchBadge(item);
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

// ============================================================================
// 2. 3D Pegboard Wall & Neon Arcade Initialization
// ============================================================================
import('./workshopArcade3D.js').then(({ createWorkshopArcade3D }) => {
  scene3D = createWorkshopArcade3D({
    container: threeCanvasHost,
    tools: TOOLS_ITEMS,
    games: GAMES_ITEMS,
    onSelectMode(mode, index) {
      if (mode === 'tools' && typeof index === 'number') selectedToolIdx = index;
      if (mode === 'games' && typeof index === 'number') selectedGameIdx = index;
      setMode(mode);
    },
    onSelectTool(idx) {
      selectedToolIdx = idx;
      playMicroClick('tool');
      renderHud();
    },
    onSelectGame(idx) {
      selectedGameIdx = idx;
      playMicroClick('arcade');
      renderHud();
    },
    onLaunchTool(idx) {
      selectedToolIdx = idx;
      renderHud();
      openPlayableStage(TOOLS_ITEMS[idx], 'tool', 'live');
    },
    onLaunchGame(idx) {
      selectedGameIdx = idx;
      renderHud();
      openPlayableStage(GAMES_ITEMS[idx], 'game', 'live');
    }
  });

  scene3D.setState({
    mode: currentMode,
    toolIndex: selectedToolIdx,
    gameIndex: selectedGameIdx,
    zoomed: Boolean(playStageDialog.open)
  });
});

function setMode(targetMode) {
  currentMode = targetMode;
  document.body.dataset.mode = targetMode;
  playMicroClick(targetMode === 'games' ? 'arcade' : 'tool');
  renderHud();
}

function renderHud() {
  const isHub = currentMode === 'hub';
  p1HubOverlay.hidden = !isHub;
  p1WingNav.hidden = isHub;
  p1InspectorBar.hidden = isHub;

  navToolsBtn.classList.toggle('active-mode-pill', currentMode === 'tools');
  navGamesBtn.classList.toggle('active-mode-pill', currentMode === 'games');

  if (scene3D) {
    scene3D.setState({
      mode: currentMode,
      toolIndex: selectedToolIdx,
      gameIndex: selectedGameIdx,
      zoomed: Boolean(playStageDialog.open)
    });
  }

  if (isHub) {
    clearTimeout(dwellTimer);
    return;
  }

  const isGames = currentMode === 'games';
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
      renderHud();
    });
    p1DotsStrip.appendChild(dot);
  });

  scheduleSpeculativePrefetch(item);
}

brandHomeBtn.addEventListener('click', () => setMode('hub'));
navToolsBtn.addEventListener('click', () => setMode('tools'));
navGamesBtn.addEventListener('click', () => setMode('games'));
p1GoToolsBtn.addEventListener('click', () => setMode('tools'));
p1GoGamesBtn.addEventListener('click', () => setMode('games'));
p1BackHubBtn.addEventListener('click', () => setMode('hub'));
p1CrossSwitchBtn.addEventListener('click', () => {
  setMode(currentMode === 'games' ? 'tools' : 'games');
});

p1PrevBtn.addEventListener('click', () => {
  if (currentMode === 'games' && selectedGameIdx > 0) {
    selectedGameIdx--;
    playMicroClick('arcade');
    renderHud();
  } else if (currentMode === 'tools' && selectedToolIdx > 0) {
    selectedToolIdx--;
    playMicroClick('tool');
    renderHud();
  }
});

p1NextBtn.addEventListener('click', () => {
  if (currentMode === 'games' && selectedGameIdx < GAMES_ITEMS.length - 1) {
    selectedGameIdx++;
    playMicroClick('arcade');
    renderHud();
  } else if (currentMode === 'tools' && selectedToolIdx < TOOLS_ITEMS.length - 1) {
    selectedToolIdx++;
    playMicroClick('tool');
    renderHud();
  }
});

p1LaunchBtn.addEventListener('click', () => {
  if (currentMode === 'games') {
    openPlayableStage(GAMES_ITEMS[selectedGameIdx], 'game', 'live');
  } else {
    openPlayableStage(TOOLS_ITEMS[selectedToolIdx], 'tool', 'live');
  }
});

p1InfoBtn.addEventListener('click', () => {
  if (currentMode === 'games') {
    openPlayableStage(GAMES_ITEMS[selectedGameIdx], 'game', 'specs');
  } else {
    openPlayableStage(TOOLS_ITEMS[selectedToolIdx], 'tool', 'specs');
  }
});

// ============================================================================
// 3. Zero-Lag Playable Stage (Lazy Iframe + 3D Auto-Pause)
// ============================================================================
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
  playLaunchSound(kind);

  playStageShell.dataset.stageTheme = kind;
  closeStageLabel.textContent = kind === 'game' ? 'Step Out of Cabinet' : 'Back to Pegboard';
  stageIcon.src = item.iconUrl;
  stageIcon.alt = item.name;
  stageTitle.textContent = item.name;
  stageExternalLink.href = item.playUrl;
  stageTelemetryTag.textContent = `${item.category}`;
  stageLoadingText.textContent = `Launching ${item.name}…`;

  stageSpecsContent.innerHTML = `
    <div class="arch-card" style="padding:20px">
      <div class="arch-step">${item.category}</div>
      <h3 style="font-size:22px;margin-top:6px">${item.name}</h3>
      <span class="arch-metric-pill">${item.bundleSizeLabel}</span>
      <p style="font-size:14px;line-height:1.65;margin-top:8px">${item.description}</p>
      <div style="display:flex;flex-wrap:wrap;gap:7px;margin-top:14px">
        ${item.tech.map((t) => `<span class="mini-badge">${t}</span>`).join('')}
      </div>
    </div>
  `;

  if (scene3D) {
    scene3D.setState({
      mode: currentMode === 'hub' ? (kind === 'game' ? 'games' : 'tools') : currentMode,
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
  liveProjectIframe.src = 'about:blank';
  activeStageItem = null;

  if (playStageDialog.open) {
    playStageDialog.close();
  }

  if (scene3D) {
    scene3D.setPaused(false);
    scene3D.setState({
      mode: currentMode,
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
  if (playStageDialog.open || quickIndexDialog.open) return;

  if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
    const dir = e.key === 'ArrowRight' ? 1 : -1;
    if (currentMode === 'games') {
      const n = Math.max(0, Math.min(GAMES_ITEMS.length - 1, selectedGameIdx + dir));
      if (n !== selectedGameIdx) {
        selectedGameIdx = n;
        playMicroClick('arcade');
        renderHud();
      }
    } else if (currentMode === 'tools') {
      const n = Math.max(0, Math.min(TOOLS_ITEMS.length - 1, selectedToolIdx + dir));
      if (n !== selectedToolIdx) {
        selectedToolIdx = n;
        playMicroClick('tool');
        renderHud();
      }
    }
  }
});

// ============================================================================
// 4. Plain-Text Quick Index Modal
// ============================================================================
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
            <div style="font-size:11.5px;color:#94a3b8;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${it.badge} &bull; ${it.category}</div>
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
      ${renderCol(TOOLS_ITEMS, 'tool', '← Left Wall: Interactive Tools (6)', '#38bdf8')}
      ${renderCol(GAMES_ITEMS, 'game', 'Right Hall: Playable Arcade (6) →', '#ff2a85')}
    </div>
    <div style="padding-top:12px;border-top:1px solid rgba(148,163,184,0.16);display:flex;gap:14px;flex-wrap:wrap;font-size:12.5px">
      <a href="${SITE_META.portfolioUrl}" target="_blank" rel="noopener" style="color:#bae6fd">Full Portfolio (mascaz.github.io) &#8599;</a>
      <a href="${SITE_META.githubUrl}" target="_blank" rel="noopener" style="color:#bae6fd">GitHub (Mascaz/AI-Services) &#8599;</a>
    </div>
  `;

  quickIndexBody.querySelectorAll('[data-quick-kind]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const kind = btn.dataset.quickKind;
      const idx = Number(btn.dataset.quickIdx);
      quickIndexDialog.close();
      if (kind === 'tool') {
        selectedToolIdx = idx;
        setMode('tools');
        openPlayableStage(TOOLS_ITEMS[idx], 'tool', 'live');
      } else {
        selectedGameIdx = idx;
        setMode('games');
        openPlayableStage(GAMES_ITEMS[idx], 'game', 'live');
      }
    });
  });
}

openQuickIndexBtn.addEventListener('click', () => {
  renderQuickIndexModal();
  quickIndexDialog.showModal();
});

sfxToggleBtn.addEventListener('click', () => {
  const on = toggleSfx();
  sfxToggleBtn.innerHTML = on ? '&#128266;' : '&#128263;';
  sfxToggleBtn.style.opacity = on ? '1' : '0.55';
});

if (!('closedBy' in HTMLDialogElement.prototype)) {
  quickIndexDialog.addEventListener('click', (e) => {
    if (e.target === quickIndexDialog) quickIndexDialog.close();
  });
}

renderHud();
