import { CONTACT_CONFIG, TOOLS_ITEMS, GAMES_ITEMS } from './data.js';
import { LANGUAGES, t } from './i18n.js';
import { toggleSfx, playMicroClick, playLaunchSound } from './audio.js';

// ============================================================================
// State
// ============================================================================
let currentMode = 'hub'; // 'hub' | 'tools' | 'games'
let audienceFilter = 'all'; // 'all' | 'business' | 'creator'
let currentLang = 'en';
let itemTranslationsMap = null; // Lazy-loaded on demand for non-English languages

let selectedToolIdx = 0;
let selectedGameIdx = 0;

// Project Brief Builder state
let briefWho = 'whoBiz';
let selectedNeeds = new Set(['needWeb']);

let scene3D = null;
const prefetchedUrls = new Set();
let dwellTimer = null;
let activeStageItem = null;
let activeStageKind = 'tool';
let freezeTimer = null;

// ============================================================================
// DOM References
// ============================================================================
const brandHomeBtn = document.getElementById('brandHomeBtn');
const audAllBtn = document.getElementById('audAllBtn');
const audBizBtn = document.getElementById('audBizBtn');
const audCreatorBtn = document.getElementById('audCreatorBtn');

const navToolsBtn = document.getElementById('navToolsBtn');
const navToolsLabel = document.getElementById('navToolsLabel');
const navGamesBtn = document.getElementById('navGamesBtn');
const navGamesLabel = document.getElementById('navGamesLabel');
const openBriefBtn = document.getElementById('openBriefBtn');
const navStartLabel = document.getElementById('navStartLabel');
const openQuickIndexBtn = document.getElementById('openQuickIndexBtn');
const navAllLabel = document.getElementById('navAllLabel');
const sfxToggleBtn = document.getElementById('sfxToggleBtn');

const langFlagBtn = document.getElementById('langFlagBtn');
const currentFlagEmoji = document.getElementById('currentFlagEmoji');
const langPopover = document.getElementById('langPopover');
const langGrid = document.getElementById('langGrid');
const langEasterNote = document.getElementById('langEasterNote');

const threeCanvasHost = document.getElementById('threeCanvasHost');
const p1HubOverlay = document.getElementById('p1HubOverlay');
const hubEyebrow = document.getElementById('hubEyebrow');
const hubTitle = document.getElementById('hubTitle');
const hubSub = document.getElementById('hubSub');
const p1GoToolsBtn = document.getElementById('p1GoToolsBtn');
const leftDirLabel = document.getElementById('leftDirLabel');
const leftTitleLabel = document.getElementById('leftTitleLabel');
const leftSubLabel = document.getElementById('leftSubLabel');
const p1GoGamesBtn = document.getElementById('p1GoGamesBtn');
const rightDirLabel = document.getElementById('rightDirLabel');
const rightTitleLabel = document.getElementById('rightTitleLabel');
const rightSubLabel = document.getElementById('rightSubLabel');

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
const p1IdeaPrefix = document.getElementById('p1IdeaPrefix');
const p1IdeaText = document.getElementById('p1IdeaText');
const p1LaunchBtn = document.getElementById('p1LaunchBtn');
const p1BuildSimilarBtn = document.getElementById('p1BuildSimilarBtn');
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
const stageBuildSimilarBtn = document.getElementById('stageBuildSimilarBtn');
const stageBuildLabel = document.getElementById('stageBuildLabel');
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

// Project Brief Modal refs
const projectBriefDialog = document.getElementById('projectBriefDialog');
const briefModalTitle = document.getElementById('briefModalTitle');
const briefModalSub = document.getElementById('briefModalSub');
const briefWhoLabel = document.getElementById('briefWhoLabel');
const whoBizChip = document.getElementById('whoBizChip');
const whoCreatorChip = document.getElementById('whoCreatorChip');
const whoOtherChip = document.getElementById('whoOtherChip');
const briefNeedLabel = document.getElementById('briefNeedLabel');
const needWebChip = document.getElementById('needWebChip');
const needProdChip = document.getElementById('needProdChip');
const needMarketChip = document.getElementById('needMarketChip');
const needGameChip = document.getElementById('needGameChip');
const needVideoChip = document.getElementById('needVideoChip');
const briefNoteInput = document.getElementById('briefNoteInput');
const briefPreviewBox = document.getElementById('briefPreviewBox');
const sendIgBtn = document.getElementById('sendIgBtn');
const sendIgLabel = document.getElementById('sendIgLabel');
const sendWaBtn = document.getElementById('sendWaBtn');
const sendWaLabel = document.getElementById('sendWaLabel');
const sendMailBtn = document.getElementById('sendMailBtn');
const sendMailLabel = document.getElementById('sendMailLabel');
const footerIgLink = document.getElementById('footerIgLink');

// Quick Index Modal refs
const quickIndexDialog = document.getElementById('quickIndexDialog');
const quickIndexBody = document.getElementById('quickIndexBody');

// Sync configured Instagram handle cleanly everywhere
footerIgLink.textContent = `@${CONTACT_CONFIG.instagramHandle}`;
footerIgLink.href = `https://www.instagram.com/${CONTACT_CONFIG.instagramHandle}/`;

// ============================================================================
// Localization Helpers (16 Languages + Lazy Item Translations)
// ============================================================================
function localizeItem(item) {
  if (currentLang === 'en' || !itemTranslationsMap?.[currentLang]?.[item.id]) {
    return item;
  }
  const tr = itemTranslationsMap[currentLang][item.id];
  return {
    ...item,
    name: tr.name || item.name,
    badge: tr.badge || item.badge,
    tldr: tr.tldr || item.tldr,
    ideaBiz: tr.ideaBiz || item.ideaBiz,
    ideaCreator: tr.ideaCreator || item.ideaCreator
  };
}

function getIgButtonLabel() {
  return t(currentLang, 'sendIg').replace('maxalwayswell', CONTACT_CONFIG.instagramHandle);
}

async function setLanguage(langCode) {
  const langObj = LANGUAGES.find((l) => l.code === langCode) || LANGUAGES[0];
  currentLang = langObj.code;

  if (currentLang !== 'en' && !itemTranslationsMap) {
    try {
      const mod = await import('./itemTranslations.js');
      itemTranslationsMap = mod.ITEM_TRANSLATIONS;
    } catch {
      itemTranslationsMap = {};
    }
  }

  document.documentElement.lang = langObj.code;
  document.documentElement.dir = langObj.dir || 'ltr';
  currentFlagEmoji.textContent = langObj.flag;

  try {
    localStorage.setItem('maxwell_ai_lang', currentLang);
  } catch {
    // Ignore private mode storage errors
  }

  applyStaticTranslations();
  renderLangGrid();
  renderHud();
  updateBriefPreview();

  if (scene3D) {
    scene3D.setSignsText({
      signTools: t(currentLang, 'signTools'),
      signToolsSub: t(currentLang, 'signToolsSub'),
      signGames: t(currentLang, 'signGames'),
      signGamesSub: t(currentLang, 'signGamesSub')
    });
  }
}

function applyStaticTranslations() {
  audAllBtn.textContent = t(currentLang, 'filterAll');
  audBizBtn.textContent = t(currentLang, 'filterBiz');
  audCreatorBtn.textContent = t(currentLang, 'filterCreator');

  navToolsLabel.textContent = t(currentLang, 'navTools');
  navGamesLabel.textContent = t(currentLang, 'navGames');
  navStartLabel.textContent = t(currentLang, 'navStart');
  navAllLabel.textContent = t(currentLang, 'navAll');

  hubEyebrow.textContent = t(currentLang, 'eyebrow');
  hubTitle.textContent = t(currentLang, 'hubTitle');
  hubSub.textContent = t(currentLang, 'hubSub');

  leftDirLabel.textContent = t(currentLang, 'leftDir');
  leftTitleLabel.textContent = t(currentLang, 'leftTitle');
  leftSubLabel.textContent = t(currentLang, 'leftSub');

  rightDirLabel.textContent = t(currentLang, 'rightDir');
  rightTitleLabel.textContent = t(currentLang, 'rightTitle');
  rightSubLabel.textContent = t(currentLang, 'rightSub');

  p1BackHubBtn.textContent = t(currentLang, 'backCenter');
  p1BuildSimilarBtn.textContent = t(currentLang, 'buildSimilar');
  p1InfoBtn.textContent = t(currentLang, 'details');
  stageBuildLabel.textContent = t(currentLang, 'buildSimilar').replace('✦ ', '');
  stageTabSpecs.textContent = t(currentLang, 'details');

  langEasterNote.textContent = t(currentLang, 'langEasterNote');

  // Project Brief Modal labels
  briefModalTitle.textContent = t(currentLang, 'briefTitle');
  briefModalSub.textContent = t(currentLang, 'briefSub');
  briefWhoLabel.textContent = t(currentLang, 'whoLabel');
  whoBizChip.textContent = t(currentLang, 'whoBiz');
  whoCreatorChip.textContent = t(currentLang, 'whoCreator');
  whoOtherChip.textContent = t(currentLang, 'whoOther');

  briefNeedLabel.textContent = t(currentLang, 'needLabel');
  needWebChip.textContent = t(currentLang, 'needWeb');
  needProdChip.textContent = t(currentLang, 'needProd');
  needMarketChip.textContent = t(currentLang, 'needMarket');
  needGameChip.textContent = t(currentLang, 'needGame');
  needVideoChip.textContent = t(currentLang, 'needVideo');
  briefNoteInput.placeholder = t(currentLang, 'notePlaceholder');

  sendIgLabel.textContent = getIgButtonLabel();
  sendWaLabel.textContent = t(currentLang, 'sendWa');
  sendMailLabel.textContent = t(currentLang, 'sendMail');
}

function renderLangGrid() {
  langGrid.innerHTML = '';
  LANGUAGES.forEach((lang) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `lang-option-btn ${lang.code === currentLang ? 'active' : ''}`;
    btn.innerHTML = `<span>${lang.flag}</span><span>${lang.name}</span>`;
    btn.addEventListener('click', () => {
      playMicroClick('tool');
      langPopover.hidden = true;
      langFlagBtn.setAttribute('aria-expanded', 'false');
      setLanguage(lang.code);
    });
    langGrid.appendChild(btn);
  });
}

langFlagBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  const nextHidden = !langPopover.hidden;
  langPopover.hidden = nextHidden;
  langFlagBtn.setAttribute('aria-expanded', String(!nextHidden));
  if (!nextHidden) {
    playMicroClick('tool');
    renderLangGrid();
  }
});

document.addEventListener('click', (e) => {
  if (!langPopover.hidden && !langPopover.contains(e.target) && e.target !== langFlagBtn) {
    langPopover.hidden = true;
    langFlagBtn.setAttribute('aria-expanded', 'false');
  }
});

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
// 2. Audience Lens Toggle ("Who Are You?")
// ============================================================================
function setAudienceFilter(nextFilter) {
  audienceFilter = nextFilter;
  playMicroClick('tool');

  [audAllBtn, audBizBtn, audCreatorBtn].forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.audience === audienceFilter);
  });

  if (audienceFilter === 'business') briefWho = 'whoBiz';
  if (audienceFilter === 'creator') briefWho = 'whoCreator';
  syncBriefChipStates();

  if (scene3D) {
    scene3D.setAudienceFilter(audienceFilter);
  }

  // If currently inspecting an item that doesn't match the selected lens, jump to first match
  if (audienceFilter !== 'all') {
    if (currentMode === 'tools' && !TOOLS_ITEMS[selectedToolIdx].audiences.includes(audienceFilter)) {
      const firstMatch = TOOLS_ITEMS.findIndex((it) => it.audiences.includes(audienceFilter));
      if (firstMatch >= 0) selectedToolIdx = firstMatch;
    } else if (
      currentMode === 'games' &&
      !GAMES_ITEMS[selectedGameIdx].audiences.includes(audienceFilter)
    ) {
      const firstMatch = GAMES_ITEMS.findIndex((it) => it.audiences.includes(audienceFilter));
      if (firstMatch >= 0) selectedGameIdx = firstMatch;
    }
  }

  renderHud();
}

[audAllBtn, audBizBtn, audCreatorBtn].forEach((btn) => {
  btn.addEventListener('click', () => setAudienceFilter(btn.dataset.audience));
});

// ============================================================================
// 3. 3D Pegboard Wall & Neon Arcade Initialization
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
    },
    onOpenBrief() {
      openProjectBriefModal();
    }
  });

  scene3D.setAudienceFilter(audienceFilter);
  if (currentLang !== 'en') {
    scene3D.setSignsText({
      signTools: t(currentLang, 'signTools'),
      signToolsSub: t(currentLang, 'signToolsSub'),
      signGames: t(currentLang, 'signGames'),
      signGamesSub: t(currentLang, 'signGamesSub')
    });
  }
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
  const rawItem = list[activeIdx];
  const item = localizeItem(rawItem);

  p1CrossSwitchBtn.textContent = isGames ? t(currentLang, 'toTools') : t(currentLang, 'toArcade');
  p1CrossSwitchBtn.className = `glass-nav-pill ${isGames ? 'accent-tools-pill' : 'accent-cross-pill'}`;

  p1InspectorCard.style.setProperty('--active-accent', rawItem.accent);
  p1ItemIcon.src = rawItem.iconUrl;
  p1ItemIcon.alt = `${item.name} icon`;
  p1ItemBadge.textContent = item.badge;
  p1ItemLoadBadge.textContent = rawItem.bundleSizeLabel;
  p1ItemTitle.textContent = item.name;
  p1ItemSummary.textContent = item.tldr;

  // Audience-tailored "What I Could Build For You" spark callout
  if (audienceFilter === 'business') {
    p1IdeaPrefix.textContent = t(currentLang, 'ideaPrefixBiz');
    p1IdeaText.textContent = item.ideaBiz;
  } else if (audienceFilter === 'creator') {
    p1IdeaPrefix.textContent = t(currentLang, 'ideaPrefixCreator');
    p1IdeaText.textContent = item.ideaCreator;
  } else {
    const prefersCreator = rawItem.audiences?.[0] === 'creator' && isGames;
    p1IdeaPrefix.textContent = t(currentLang, 'ideaPrefixAll');
    p1IdeaText.textContent = prefersCreator ? item.ideaCreator : item.ideaBiz;
  }

  const actionText = isGames ? t(currentLang, 'playLive') : t(currentLang, 'tryLive');
  p1LaunchBtn.innerHTML = isGames ? `&#129689; ${actionText}` : `&#9654; ${actionText}`;

  p1SwipeHint.textContent = isGames ? t(currentLang, 'swipeGames') : t(currentLang, 'swipeTools');

  p1PrevBtn.disabled = activeIdx <= 0;
  p1NextBtn.disabled = activeIdx >= list.length - 1;

  p1DotsStrip.innerHTML = '';
  list.forEach((entry, idx) => {
    const matchesFilter =
      audienceFilter === 'all' || (entry.audiences || []).includes(audienceFilter);
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = `rail-dot-btn ${idx === activeIdx ? 'active' : ''} ${!matchesFilter ? 'dimmed-dot' : ''}`;
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

  scheduleSpeculativePrefetch(rawItem);
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

p1BuildSimilarBtn.addEventListener('click', () => {
  const activeItem =
    currentMode === 'games' ? GAMES_ITEMS[selectedGameIdx] : TOOLS_ITEMS[selectedToolIdx];
  openProjectBriefModal(activeItem);
});

p1InfoBtn.addEventListener('click', () => {
  if (currentMode === 'games') {
    openPlayableStage(GAMES_ITEMS[selectedGameIdx], 'game', 'specs');
  } else {
    openPlayableStage(TOOLS_ITEMS[selectedToolIdx], 'tool', 'specs');
  }
});

// ============================================================================
// 4. Zero-Lag Playable Stage (Lazy Iframe + 3D Auto-Pause)
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

function openPlayableStage(rawItem, kind = 'game', initialTab = 'live') {
  if (!rawItem) return;
  activeStageItem = rawItem;
  activeStageKind = kind;
  const item = localizeItem(rawItem);
  playLaunchSound(kind);

  playStageShell.dataset.stageTheme = kind;
  closeStageLabel.textContent = kind === 'game' ? t(currentLang, 'navGames') : t(currentLang, 'navTools');
  stageIcon.src = rawItem.iconUrl;
  stageIcon.alt = item.name;
  stageTitle.textContent = item.name;
  stageExternalLink.href = rawItem.playUrl;
  stageTelemetryTag.textContent = rawItem.category;
  stageLoadingText.textContent = `${item.name}…`;

  stageSpecsContent.innerHTML = `
    <div class="arch-card" style="padding:20px">
      <div class="arch-step">${rawItem.category}</div>
      <h3 style="font-size:22px;margin-top:6px">${item.name}</h3>
      <span class="arch-metric-pill">${rawItem.bundleSizeLabel}</span>
      <p style="font-size:14px;line-height:1.65;margin-top:8px">${rawItem.description}</p>
      <div class="idea-spark-box" style="margin-top:14px">
        <strong>${t(currentLang, 'ideaPrefixBiz')}</strong> ${item.ideaBiz}<br/>
        <strong style="display:inline-block;margin-top:4px">${t(currentLang, 'ideaPrefixCreator')}</strong> ${item.ideaCreator}
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:7px;margin-top:14px">
        ${rawItem.tech.map((tag) => `<span class="mini-badge">${tag}</span>`).join('')}
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

stageBuildSimilarBtn.addEventListener('click', () => {
  const refItem = activeStageItem;
  closePlayableStage();
  openProjectBriefModal(refItem);
});

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

// ============================================================================
// 5. "Build With Me / Build Similar" Project Brief Modal (IG + WA + Email)
// ============================================================================
function syncBriefChipStates() {
  [whoBizChip, whoCreatorChip, whoOtherChip].forEach((chip) => {
    chip.classList.toggle('active', chip.dataset.who === briefWho);
  });

  [needWebChip, needProdChip, needMarketChip, needGameChip, needVideoChip].forEach((chip) => {
    chip.classList.toggle('active', selectedNeeds.has(chip.dataset.need));
  });
}

function buildBriefText() {
  const whoStr = t(currentLang, briefWho);
  const needStr = Array.from(selectedNeeds)
    .map((key) => t(currentLang, key))
    .join(' + ');
  const note = briefNoteInput.value.trim();

  const lines = [
    `Hi Maxwell! I explored your 3D AI Services studio.`,
    `• Profile: ${whoStr}`,
    `• Interested in: ${needStr || t(currentLang, 'needWeb')}`
  ];
  if (note) {
    lines.push(`• Details: ${note}`);
  }
  return lines.join('\n');
}

function updateBriefPreview() {
  const text = buildBriefText();
  briefPreviewBox.textContent = text;

  const encoded = encodeURIComponent(text);
  sendWaBtn.href = `https://wa.me/${CONTACT_CONFIG.whatsappNumber}?text=${encoded}`;
  sendMailBtn.href = `mailto:${CONTACT_CONFIG.email}?subject=${encodeURIComponent(
    'Custom AI / Website Project Inquiry'
  )}&body=${encoded}`;
  sendIgLabel.textContent = getIgButtonLabel();
}

function openProjectBriefModal(inspiredByItem = null) {
  playMicroClick('tool');

  if (audienceFilter === 'creator') briefWho = 'whoCreator';
  else if (audienceFilter === 'business') briefWho = 'whoBiz';

  if (inspiredByItem) {
    selectedNeeds = new Set([inspiredByItem.briefPresetNeed || 'needWeb']);
    const loc = localizeItem(inspiredByItem);
    if (!briefNoteInput.value.trim()) {
      briefNoteInput.value = `Inspired by: ${loc.name}`;
    }
  } else if (selectedNeeds.size === 0) {
    selectedNeeds.add('needWeb');
  }

  syncBriefChipStates();
  updateBriefPreview();
  projectBriefDialog.showModal();
}

openBriefBtn.addEventListener('click', () => openProjectBriefModal(null));

[whoBizChip, whoCreatorChip, whoOtherChip].forEach((chip) => {
  chip.addEventListener('click', () => {
    briefWho = chip.dataset.who;
    playMicroClick('tool');
    syncBriefChipStates();
    updateBriefPreview();
  });
});

[needWebChip, needProdChip, needMarketChip, needGameChip, needVideoChip].forEach((chip) => {
  chip.addEventListener('click', () => {
    const key = chip.dataset.need;
    if (selectedNeeds.has(key) && selectedNeeds.size > 1) {
      selectedNeeds.delete(key);
    } else {
      selectedNeeds.add(key);
    }
    playMicroClick('tool');
    syncBriefChipStates();
    updateBriefPreview();
  });
});

briefNoteInput.addEventListener('input', updateBriefPreview);

// Instagram Direct Message: Copy brief to clipboard + open ig.me/m/<handle>
sendIgBtn.addEventListener('click', async () => {
  const text = buildBriefText();
  try {
    await navigator.clipboard.writeText(text);
    sendIgLabel.textContent = t(currentLang, 'igCopied');
  } catch {
    // Clipboard fallback if blocked
  }
  window.open(
    `https://ig.me/m/${CONTACT_CONFIG.instagramHandle}`,
    '_blank',
    'noopener,noreferrer'
  );
  setTimeout(() => {
    sendIgLabel.textContent = getIgButtonLabel();
  }, 3600);
});

// ============================================================================
// 6. Plain-Text Quick Launcher Modal ("All Projects")
// ============================================================================
function renderQuickIndexModal() {
  const renderCol = (items, kind, heading, color) => `
    <div>
      <h3 style="font-size:16px;color:${color};margin-bottom:6px">${heading}</h3>
      ${items
        .map((raw, idx) => {
          const it = localizeItem(raw);
          return `
            <button type="button" class="tldr-row-btn" data-quick-kind="${kind}" data-quick-idx="${idx}">
              <img src="${raw.iconUrl}" alt="${it.name}" width="38" height="38" loading="lazy" />
              <div style="flex:1;min-width:0">
                <div style="font-weight:800;font-size:13.5px">${it.name}</div>
                <div style="font-size:11.5px;color:#94a3b8;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${it.badge} &bull; ${raw.category}</div>
              </div>
              <span style="font-family:var(--font-mono);font-size:12px;color:${color}">&#9654;</span>
            </button>
          `;
        })
        .join('')}
    </div>
  `;

  quickIndexBody.innerHTML = `
    <div class="tldr-columns">
      ${renderCol(TOOLS_ITEMS, 'tool', `← ${t(currentLang, 'leftTitle')} (7)`, '#38bdf8')}
      ${renderCol(GAMES_ITEMS, 'game', `${t(currentLang, 'rightTitle')} (7) →`, '#ff2a85')}
    </div>
    <div style="padding-top:12px;border-top:1px solid rgba(148,163,184,0.16);display:flex;justify-content:space-between;align-items:center;gap:14px;flex-wrap:wrap;font-size:12.5px">
      <div style="display:flex;gap:14px;flex-wrap:wrap">
        <a href="${CONTACT_CONFIG.portfolioUrl}" target="_blank" rel="noopener" style="color:#bae6fd">Full Portfolio (mascaz.github.io) &#8599;</a>
        <a href="https://www.instagram.com/${CONTACT_CONFIG.instagramHandle}/" target="_blank" rel="noopener" style="color:#bae6fd">@${CONTACT_CONFIG.instagramHandle} &#8599;</a>
      </div>
      <button type="button" id="quickStartProjectBtn" class="build-similar-btn" style="flex:0 0 auto">
        ${t(currentLang, 'buildSimilar')}
      </button>
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

  document.getElementById('quickStartProjectBtn')?.addEventListener('click', () => {
    quickIndexDialog.close();
    openProjectBriefModal(null);
  });
}

openQuickIndexBtn.addEventListener('click', () => {
  renderQuickIndexModal();
  quickIndexDialog.showModal();
});

// Keyboard Arrow Navigation for Arcade Cabinets & Pegboard Tools
window.addEventListener('keydown', (e) => {
  if (playStageDialog.open || quickIndexDialog.open || projectBriefDialog.open) return;

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

sfxToggleBtn.addEventListener('click', () => {
  const on = toggleSfx();
  sfxToggleBtn.innerHTML = on ? '&#128266;' : '&#128263;';
  sfxToggleBtn.style.opacity = on ? '1' : '0.55';
});

if (!('closedBy' in HTMLDialogElement.prototype)) {
  [quickIndexDialog, projectBriefDialog].forEach((dlg) => {
    dlg.addEventListener('click', (e) => {
      if (e.target === dlg) dlg.close();
    });
  });
}

// Initialize language (restore saved language if visitor previously switched flags)
let initialLang = 'en';
try {
  const saved = localStorage.getItem('maxwell_ai_lang');
  if (saved && LANGUAGES.some((l) => l.code === saved)) {
    initialLang = saved;
  }
} catch {
  // Default to English
}

setLanguage(initialLang);
