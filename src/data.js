/**
 * Centralized Project & Service Catalog for Maxwell — AI Services
 * Left World  = TOOLS (7 Sunlit 3D Design & AI Workshop Benches — Proofing, Cyclorama, Cinema, Telecine & Brass Rigs)
 * Right World = GAMES (7 Playable Garage Game Room Setups — Carts, Discs, Rigs & Retail Boxes)
 */

export const CONTACT_CONFIG = {
  owner: 'Maxwell Montes Diaz',
  // Update instagramHandle below whenever you launch your dedicated business IG account:
  instagramHandle: 'maxalwayswell',
  whatsappNumber: '16196347772',
  phoneDisplay: '619-634-7772',
  email: 'maxwell_montes@yahoo.com',
  portfolioUrl: 'https://mascaz.github.io/',
  githubUrl: 'https://github.com/Mascaz/AI-Services'
};

// Backwards-compatible alias
export const SITE_META = CONTACT_CONFIG;

export const TOOLS_ITEMS = [
  {
    id: 'website-makeover',
    name: 'Website Makeover Workbench',
    shortName: 'Site Makeover',
    toolShape: 'roller',
    stationLabel: 'PROOFING PRESS • SPLIT SLIDER',
    physicalLabel: 'Before ↔ After Proof',
    accent: '#38bdf8',
    secondaryAccent: '#fbbf24',
    audiences: ['business', 'creator'],
    briefPresetNeed: 'needWeb',
    badge: 'Before ↔ After',
    loadType: 'local',
    bundleSizeLabel: 'Live Split Slider',
    category: 'Full Storefront & Local Business Redesigns • Mobile-First & High-Trust',
    iconUrl: './assets/icons/website-makeover.svg',
    playUrl: './games/website-makeover/index.html',
    playLabel: 'Compare Before & After',
    tldr: 'Drag the live split slider to watch a plain Shopify template become an editorial luxury store, or an old 2014 brochure site turn into a modern bilingual clinic.',
    mobileTldr: 'Drag the split slider: plain templates become high-trust flagship sites.',
    ideaBiz:
      'Turn an outdated website or default Shopify theme into a fast, high-trust storefront with instant WhatsApp/booking conversion.',
    ideaCreator:
      'Upgrade a generic link-in-bio or merch template into a custom flagship site that makes brands and sponsors take you seriously.',
    description:
      'Compare generic “Before” templates directly against real finished client architectures: Case 01 transforms a plain starter Shopify product grid into Relais Palais (cinematic editorial lookbooks, hover swaps, tactile cart drawer), and Case 02 upgrades a cramped 2014 clinic page into Dr. Luis Montes’s bilingual EN/ES orthopedic platform.',
    tech: ['Shopify & Custom Web', 'Before/After Split View', 'Bilingual EN/ES UX', 'WhatsApp & Booking Flows']
  },
  {
    id: 'product-to-launch',
    name: 'Product Photo, Copy & Market Lab',
    shortName: 'Product AI Lab',
    toolShape: 'camera-loupe',
    stationLabel: 'CYCLORAMA STUDIO • SOFTBOX RIG',
    physicalLabel: 'Photo + Copy + Market Suite',
    accent: '#fbbf24',
    secondaryAccent: '#38bdf8',
    audiences: ['business', 'creator'],
    briefPresetNeed: 'needProd',
    badge: 'Upload & Test',
    loadType: 'local',
    bundleSizeLabel: 'Instant Studio',
    category: '1 Raw Photo → Studio Backdrops + EN/ES Copy + Competitor Price Research',
    iconUrl: './assets/icons/product-to-launch.svg',
    playUrl: './games/product-to-launch/index.html',
    playLabel: 'Try Product AI Lab',
    tldr: 'Upload any product photo (or pick a sample) to generate studio lighting scenes, bilingual Shopify descriptions, viral hooks, and competitor price/review-gap analysis.',
    mobileTldr: 'One phone photo → studio lighting, EN/ES copy & competitor price comps.',
    ideaBiz:
      'A private tool trained on your brand style: snap a phone photo of new inventory and get clean catalog images, SEO copy, and pricing comps in 15 seconds.',
    ideaCreator:
      'Turn merch samples, digital products, or affiliate picks into studio-lit thumbnails and high-converting 3-second TikTok/Reels hooks.',
    description:
      'Built specifically to show small businesses and creators how one cohesive workflow replaces three separate subscriptions: stage product photos across 5 lighting moods with downloadable PNGs, generate English + Spanish product copy and UGC scripts, and inspect market price bands plus competitor 1-star review gaps.',
    tech: ['Custom Photo Upload', '5 Studio Lighting Presets', 'EN/ES Copy & Hooks', 'Competitor Gap Research']
  },
  {
    id: 'ai-airbrush',
    name: 'Photo & Portrait Relighting',
    shortName: 'AI Airbrush',
    toolShape: 'airbrush',
    stationLabel: 'ORBITAL LIGHT • RETOUCH EASEL',
    physicalLabel: '3D Light & Retouch Studio',
    accent: '#22d3ee',
    secondaryAccent: '#f59e0b',
    audiences: ['business', 'creator'],
    briefPresetNeed: 'needProd',
    badge: 'Fix Photos Fast',
    loadType: 'local',
    bundleSizeLabel: '252 KB • WebGL GPU',
    category: 'On-Device 3D Directional Relighting, Retouching & Sculpting • Zero Cloud Lag',
    iconUrl: './assets/icons/ai-airbrush.png',
    playUrl: './games/ai-airbrush/index.html',
    playLabel: 'Launch Photo Relighter',
    tldr: 'Fix flat phone lighting without booking a reshoot: drag a 3D studio light orb around portraits or products and retouch details privately in your browser.',
    mobileTldr: 'Drag a 3D studio light orb to fix flat photos in-browser.',
    ideaBiz:
      'Give your team a 1-click browser retoucher so staff portraits, menu items, and catalog shots look consistently studio-lit.',
    ideaCreator:
      'Add dramatic rim-lighting and clean retouching to YouTube thumbnails and IG cover shots right on your phone or laptop.',
    description:
      'Ports custom iOS Metal compute/fragment shaders directly to WebGL for 100% client-side high-resolution retouching. Drag the interactive 3D studio light orb across 6 presets, sculpt with cumulative UV Liquify brushes, and compare with a real-time split slider—with zero server uploads.',
    tech: ['WebGL GLSL Shaders', '3D Normal Relighting', 'UV Liquify Brushes', '100% Private On-Device']
  },
  {
    id: 'fototecateca',
    name: 'Instant Video Ad Booth',
    shortName: 'Video Ad Booth',
    toolShape: 'clapper',
    stationLabel: 'DIRECTOR MONITOR • CINEMA RIG',
    physicalLabel: "Director's Storyboard Suite",
    accent: '#f472b6',
    secondaryAccent: '#60a5fa',
    audiences: ['business', 'creator'],
    briefPresetNeed: 'needVideo',
    badge: 'AI Commercials',
    loadType: 'local',
    bundleSizeLabel: '104 KB • Storyboard',
    category: 'Photo-to-Commercial Storyboard & AI Video Ad Generator • 5 Broadcast Styles',
    iconUrl: './assets/icons/fototecateca.svg',
    playUrl: './games/fototecateca/index.html',
    playLabel: 'Open Video Ad Booth',
    tldr: 'Turn a product, founder, or mascot photo into a 3-scene storyboarded commercial across 5 broadcast styles with guided director controls.',
    mobileTldr: 'Turn any product photo into a 3-scene commercial across 5 styles.',
    ideaBiz:
      'Generate scroll-stopping 90s infomercials, luxury spots, or local promo ads for new product launches without hiring a video crew.',
    ideaCreator:
      'Embed an interactive AI commercial booth where fans cast themselves or their pets in themed promos for your brand.',
    description:
      'Turns uploaded profiles or product shots into structured 3-beat commercials (90s Infomercial, Luxury Perfume, Local Spotlight, Retro Toy Ad, Action Trailer) with guided Arcade-Dial corrections instead of confusing prompt engineering.',
    tech: ['Veo 3.1 & Gemini Pipeline', '3-Beat Storyboards', 'Guided Director Dials', 'Zero Prompt Guesswork']
  },
  {
    id: 'creator-video-pipeline',
    name: 'Creator Shorts & Video Pipeline',
    shortName: 'Shorts Pipeline',
    toolShape: 'film-reel',
    stationLabel: 'TELECINE DECK • 9:16 MONITOR',
    physicalLabel: '1080p Auto-Video Engine',
    accent: '#a78bfa',
    secondaryAccent: '#f472b6',
    audiences: ['creator', 'business'],
    briefPresetNeed: 'needVideo',
    badge: 'Auto 1080p MP4',
    loadType: 'local',
    bundleSizeLabel: 'Live Rendered Video',
    category: 'Script-to-1080p Bilingual Video Automation • Voiceover, Captions & Motion',
    iconUrl: './assets/icons/creator-video-pipeline.svg',
    playUrl: './games/creator-video-pipeline/index.html',
    playLabel: 'Watch Live Pipeline',
    tldr: 'Feed in a short topic or product spec and automatically render a 1080p MP4 complete with EN/ES neural voiceovers, synced captions, and camera motion.',
    mobileTldr: 'Script to 1080p MP4 with EN/ES voiceover, captions & motion.',
    ideaBiz:
      'Automatically turn every new Shopify product or FAQ into narrated Reels, TikToks, and bilingual product explainer videos.',
    ideaCreator:
      'Batch-produce faceless Shorts/Reels series or automatically dub and caption every upload for Spanish + English channels.',
    description:
      'Built on a battle-tested Python + FFmpeg + Neural TTS + AI scene engine that compiles structured JSON scripts into broadcast-ready 1080p videos with dual-language narration, character consistency, and word-timed subtitles.',
    tech: ['Automated 1080p MP4', 'Bilingual EN/ES Voice', 'Synced Burn-In Captions', 'Batch Content Engine']
  },
  {
    id: 'dropshipping-made-easy',
    name: 'Market, Margin & Copy Forge',
    shortName: 'Margin & Market',
    toolShape: 'scale',
    stationLabel: 'BRASS SCALE • MARGIN TERMINAL',
    physicalLabel: 'Margin & ROAS Ledger',
    accent: '#34d399',
    secondaryAccent: '#fbbf24',
    audiences: ['business', 'creator'],
    briefPresetNeed: 'needMarket',
    badge: 'Margin + Research',
    loadType: 'local',
    bundleSizeLabel: 'Bilingual EN/ES',
    category: 'Unit-Economics Simulator, Niche Validator & Viral Ad Script Builder',
    iconUrl: './assets/icons/dropshipping-made-easy.svg',
    playUrl: './games/dropshipping-made-easy/index.html',
    playLabel: 'Open Margin & Copy Tool',
    tldr: 'Validate product margins before spending on ads: live CPA/ROAS profit calculator, supplier vetting checklist, and bilingual (EN/ES) store copy.',
    mobileTldr: 'Live CPA/ROAS profit simulator, niche validator & bilingual ad copy.',
    ideaBiz:
      'Add interactive pricing, quote, or ROI calculators to your website—or use custom research dashboards to vet new SKUs before ordering inventory.',
    ideaCreator:
      'Know your exact break-even ROAS and profit per unit before launching creator merch, digital bundles, or TikTok Shop items.',
    description:
      'Interactive English & Spanish e-commerce launchpad that replaces guesswork with transparent unit economics: model COGS, shipping, ad CPA, and net margin while generating boutique product descriptions and short-form ad scripts.',
    tech: ['Live ROAS & Margin Math', 'Niche Validation', 'Bilingual EN/ES Copy', 'React 19 Interactive']
  },
  {
    id: 'game-localization',
    name: 'Global & Bilingual Translator',
    shortName: 'Global Translator',
    toolShape: 'caliper',
    stationLabel: 'TYPESETTING BENCH • QA CALIPER',
    physicalLabel: 'Multilingual Typesetting QA',
    accent: '#2dd4bf',
    secondaryAccent: '#818cf8',
    audiences: ['business', 'creator'],
    briefPresetNeed: 'needWeb',
    badge: '15+ Languages',
    loadType: 'local',
    bundleSizeLabel: '16 KB • Instant',
    category: 'Layout-Safe Brand & Storefront Localization • Tone Lock & Overflow QA',
    iconUrl: './assets/icons/game-localization.svg',
    playUrl: './games/game-localization/index.html',
    playLabel: 'Test Translator Bench',
    tldr: 'Translate websites, catalogs, and scripts into Spanish or 15+ languages while preserving brand voice, UI button lengths, and formatting tags.',
    mobileTldr: 'Translate sites & stores into 15+ languages without breaking UI layouts.',
    ideaBiz:
      'Unlock cross-border & bilingual customers cleanly—your entire store, booking form, and catalog localized without broken layouts.',
    ideaCreator:
      'Localize digital products, subtitles, quizzes, or interactive experiences for global fans in minutes instead of weeks.',
    description:
      'Demonstrates why raw copy-paste translation breaks real apps and storefronts—and how an engineered AI localization pipeline shields code/HTML tags, locks brand glossary terms, enforces formality, and verifies UI character widths automatically.',
    tech: ['15+ Language Ready', 'Brand Glossary Lock', 'UI Width Validator', 'Formatting Tag Shield']
  }
];

export const GAMES_ITEMS = [
  {
    id: 'desired',
    name: 'DESIRED — Viral Persona Deck',
    shortName: 'DESIRED',
    hardwareType: 'mobile-deck',
    stationLabel: 'MOBILE RIG • NFC + CARD DECK',
    mediaLabel: 'NFC CARD + 25-CARD DECK',
    boxFormat: 'tuck-deck',
    cabinetStyle: 'velvet-deck',
    accent: '#f43f5e',
    secondaryAccent: '#fbbf24',
    cabinetBodyColor: '#241820',
    audiences: ['creator', 'business'],
    briefPresetNeed: 'needGame',
    badge: 'Creator Funnel',
    loadType: 'local',
    bundleSizeLabel: '236 KB • 9:16 Story Card',
    controlsHint: 'Swipe Cards Left/Right or Tap Choices',
    category: '25-Card Swipeable Quiz + Instant 1080×1920 IG/TikTok Story Card Export',
    iconUrl: './assets/icons/desired.svg',
    playUrl: './games/desired/index.html',
    playLabel: 'Tap & Swipe Deck',
    tldr: 'Swipe through 25 tactile scenario cards to reveal your archetype—then download a crisp 9:16 Story Card designed to go viral on Instagram & TikTok.',
    mobileTldr: 'Swipe 25 scenario cards & export a viral 9:16 IG/TikTok Story.',
    ideaBiz:
      'A 60-second “Find Your Perfect Routine / Shade / Gift” swipe quiz that recommends your exact products and captures warm leads.',
    ideaCreator:
      'A custom personality deck for your community where every fan posts a branded 9:16 result card tagging your @handle in their Story.',
    description:
      'Built specifically as a high-retention social growth engine: combines spring-physics card swiping across 4 psychological axes with an instant client-side 1080×1920 canvas Story Card generator so every player becomes free organic reach.',
    tech: ['Swipe Card Physics', '1080×1920 Story Export', 'Zero Backend Cost', 'Built for IG & TikTok']
  },
  {
    id: 'cat-capsules',
    name: 'Cat Capsules',
    shortName: 'Cat Capsules',
    hardwareType: 'wide-handheld',
    stationLabel: 'WIDE HANDHELD • GAME PAK',
    mediaLabel: 'PASTEL PAK CARTRIDGE',
    boxFormat: 'square-box',
    cabinetStyle: 'gacha-dome',
    accent: '#f472b6',
    secondaryAccent: '#c084fc',
    cabinetBodyColor: '#3a2242',
    audiences: ['business', 'creator'],
    briefPresetNeed: 'needGame',
    badge: 'Brand Gacha',
    loadType: 'edge',
    bundleSizeLabel: '0 KB Boot • On-Demand',
    controlsHint: 'Tap or Move & Click to Drop Capsules',
    category: 'Tactile Physics Drop & Merge Experience • PixiJS v8 & Rapier2D WASM',
    iconUrl: './assets/icons/cat-capsules.png',
    playUrl: 'https://mascaz.github.io/games/cat-capsules/index.html',
    playLabel: 'Slot Cart • Drop Cats',
    tldr: 'Drop and merge glossy cat capsules with reactive eye-tracking, squish physics, and unlockable themes—showing how irresistible branded mini-games feel.',
    mobileTldr: 'Drop & merge squishy cat capsules with live cursor eye-tracking physics.',
    ideaBiz:
      'Replace ignored “Spin-the-Wheel” discount popups with a 30-second physics drop featuring your actual products to unlock VIP perks.',
    ideaCreator:
      'A cozy branded mascot merge game on your page where weekly high scores win merch drops or shoutouts.',
    description:
      'Combines deterministic Rapier2D WASM physics with a procedural 2D skeletal cat animation rig that tracks your finger/cursor and squishes on impact—streamed on demand so initial page load stays instant.',
    tech: ['PixiJS v8', 'Rapier2D Physics', 'Cursor Eye-Tracking', 'Mobile + Desktop']
  },
  {
    id: 'sumten',
    name: 'SumTen',
    shortName: 'SumTen',
    hardwareType: 'pocket-handheld',
    stationLabel: 'POCKET HANDHELD • 20KB CART',
    mediaLabel: '20 KB POCKET ROM',
    boxFormat: 'mini-box',
    cabinetStyle: 'pixel-candy',
    accent: '#fb7185',
    secondaryAccent: '#2dd4bf',
    cabinetBodyColor: '#d9d4c7',
    audiences: ['business', 'creator'],
    briefPresetNeed: 'needGame',
    badge: '20 KB Daily Hook',
    loadType: 'local',
    bundleSizeLabel: '20 KB • Instant Load',
    controlsHint: 'Drag Rectangles Summing to 10 (Mouse or Touch)',
    category: 'Ultra-Light 20 KB Daily Retention Puzzle • Guaranteed-Solvable Boards',
    iconUrl: './assets/icons/sumten.png',
    playUrl: './games/sumten/index.html',
    playLabel: 'Slot 20KB Cart • Play',
    tldr: 'Drag boxes over numbers summing to 10 against a 120s clock—weighing just 20 KB total, it loads faster than a single JPEG banner.',
    mobileTldr: 'Fast daily sum-to-10 puzzle—just 20 KB total, lighter than a JPEG.',
    ideaBiz:
      'Embed a Wordle-style daily 90-second puzzle in your loyalty app or newsletter to bring customers back every morning.',
    ideaCreator:
      'Give followers a daily streak challenge on your site with shareable score badges for group chats and X/Threads.',
    description:
      'Proves that playable interactivity never has to slow down a storefront: at 20 KB total (code + visuals + chiptune audio), SumTen boots in a single frame with reverse-engineered 100% solvable boards.',
    tech: ['20 KB Total Size', '100% Solvable Gen', 'Procedural Audio', 'Zero Load Penalty']
  },
  {
    id: 'world-strikers',
    name: 'World Strikers',
    shortName: 'World Strikers',
    hardwareType: 'garage-cabinet',
    stationLabel: '2P GARAGE CAB • ARCADE CART',
    mediaLabel: 'PRO ARCADE CART + SHOCKBOX',
    boxFormat: 'shockbox',
    cabinetStyle: 'stadium-wide',
    accent: '#facc15',
    secondaryAccent: '#38bdf8',
    cabinetBodyColor: '#17253b',
    audiences: ['creator', 'business'],
    briefPresetNeed: 'needGame',
    badge: 'Event Arcade',
    loadType: 'edge',
    bundleSizeLabel: '0 KB Boot • On-Demand',
    controlsHint: 'Keyboard / Gamepad / Touch Arcade Controls',
    category: '20,000V Walled-Cage Arcade Soccer • Slow-Mo Super Shots & 9-Track OST',
    iconUrl: './assets/icons/world-strikers.png',
    playUrl: 'https://mascaz.github.io/games/world-strikers/index.html',
    playLabel: 'Step Up • Kick Off',
    tldr: 'High-voltage arcade cage soccer with electric fence shocks, item chaos, and slow-motion Super Shots across mobile touch, controller, and keyboard.',
    mobileTldr: '20,000V cage arcade soccer with slow-mo Super Shots & touch controls.',
    ideaBiz:
      'Launch a limited-time sports or holiday event game with your brand on the stadium boards and coupon rewards for winners.',
    ideaCreator:
      'Host a community tournament pitting fan factions against each other right inside the browser—no app download needed.',
    description:
      'Full arcade sports spectacle running smoothly in any browser tab, streamed on demand from edge CDN so its 9-track EDM synth soundtrack adds zero weight to initial site load.',
    tech: ['Custom Cage Physics', 'Slow-Mo Super Shots', 'Touch + Gamepad', 'On-Demand Streaming']
  },
  {
    id: 'redial',
    name: 'REDIAL',
    shortName: 'REDIAL',
    hardwareType: 'desktop-pc',
    stationLabel: 'DESKTOP PC • CD-ROM + BIG BOX',
    mediaLabel: 'CD-ROM DISC + JEWEL CASE',
    boxFormat: 'big-box-pc',
    cabinetStyle: 'neon-slasher',
    accent: '#ff2a85',
    secondaryAccent: '#38bdf8',
    cabinetBodyColor: '#252830',
    audiences: ['creator'],
    briefPresetNeed: 'needGame',
    badge: 'Pure Juice & Craft',
    loadType: 'local',
    bundleSizeLabel: '232 KB • CD-ROM Rig',
    controlsHint: 'WASD + Mouse / Gamepad / Twin-Stick Touch',
    category: 'Top-Down One-Hit-Kill Action Roguelike • Procedural Floors & Synthwave Jukebox',
    iconUrl: './assets/icons/redial.png',
    playUrl: './games/redial/index.html',
    playLabel: 'Spin CD-ROM • Play',
    tldr: 'Fast top-down action with procedural rooms, animal mask perks, screen shake, and a synthwave jukebox—built to show off high-polish game feel.',
    mobileTldr: 'Neon top-down action roguelike with procedural rooms & synthwave jukebox.',
    ideaBiz:
      'When your brand wants an unforgettable interactive launch microsite instead of another static landing page.',
    ideaCreator:
      'Pair an album release, comic, or streetwear drop with a playable world featuring your own music and lore.',
    description:
      'Every floor is generated from scratch with crisp hit-stop, lighting, and stackable mask perks—playable seamlessly on desktop keyboard/mouse, controller, or twin-stick mobile touch.',
    tech: ['HTML5 Canvas', 'Procedural Floors', 'Synthwave Jukebox', 'Mobile Twin-Stick']
  },
  {
    id: 'ai-pikmin',
    name: 'Pikmin: PNF-404 Sim',
    shortName: 'PNF-404 Sim',
    hardwareType: 'disc-console',
    stationLabel: '4-PORT CUBE • MINI-DISC',
    mediaLabel: '8CM OPTICAL MINI-DISC',
    boxFormat: 'keep-case',
    cabinetStyle: 'botanical-rts',
    accent: '#34d399',
    secondaryAccent: '#fbbf24',
    cabinetBodyColor: '#2d2b52',
    audiences: ['creator'],
    briefPresetNeed: 'needGame',
    badge: '1–4P Live Co-op',
    loadType: 'local',
    bundleSizeLabel: '312 KB • 1–4P Co-op',
    controlsHint: 'Click/Drag Whistle & Throw • Touch Ready',
    category: 'Real-Time Squad Tactics & Serverless 1–4 Player WebRTC Co-op',
    iconUrl: './assets/icons/ai-pikmin.png',
    playUrl: './games/ai-pikmin/index.html',
    playLabel: 'Load Mini-Disc • Play',
    tldr: 'Command elemental squads across 5 sectors and boss arenas—including live 1–4 player multiplayer in the browser with zero server bills.',
    mobileTldr: 'Command elemental squads with serverless 1–4 player browser co-op.',
    ideaBiz:
      'Proof of full-stack engineering: if real-time multiplayer AI runs smoothly in 312 KB, your custom business tool is in safe hands.',
    ideaCreator:
      'Play a custom co-op browser game live on Twitch/YouTube stream with viewers joining instantly via 4-letter room codes.',
    description:
      'Micro-manage Red, Yellow, and Blue squads with whistle/throw rings across Story Mode, Time Attack, and serverless PeerJS WebRTC co-op.',
    tech: ['TypeScript', 'Pathfinding AI', '1–4P WebRTC Co-op', 'Procedural Audio']
  },
  {
    id: 'wild-peak',
    name: 'Wild Peak 3D',
    shortName: 'Wild Peak 3D',
    hardwareType: 'cart-console',
    stationLabel: '64-BIT CONSOLE • ROM CART',
    mediaLabel: '64-BIT GAME PAK CART',
    boxFormat: 'landscape-box',
    cabinetStyle: 'n64-poly',
    accent: '#a78bfa',
    secondaryAccent: '#f59e0b',
    cabinetBodyColor: '#262833',
    audiences: ['creator', 'business'],
    briefPresetNeed: 'needGame',
    badge: 'Procedural 3D',
    loadType: 'local',
    bundleSizeLabel: '1.0 MB • GPU Handoff',
    controlsHint: 'WASD / Arrows / Splitscreen / Touch',
    category: '100% Code-Generated Low-Poly 3D World • Custom Three.js Shaders',
    iconUrl: './assets/icons/wild-peak.svg',
    playUrl: './games/wild-peak/index.html?v=2',
    playLabel: 'Plug In Cart • Enter 3D',
    tldr: 'An entire 3D mountain world generated from pure code—just like this 3D game room—proving 3D websites can feel magical without slow downloads.',
    mobileTldr: 'Procedural low-poly 3D mountain world built from pure shader code.',
    ideaBiz:
      'Interactive 3D product showcases, virtual showrooms, or spatial menus that load fast on mobile phones.',
    ideaCreator:
      'A playable 3D world, virtual pop-up room, or treasure hunt built around your brand universe.',
    description:
      'Demonstrates Single-WebGL-Context Governance: the moment you launch Wild Peak 3D, the outer 3D Game Room pauses its own render loop to 0% GPU so the inner 3D world runs at buttery 60fps.',
    tech: ['Three.js Shaders', 'Procedural 3D', 'Zero .GLB Bloat', 'Splitscreen Ready']
  }
];
