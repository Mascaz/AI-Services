/**
 * Centralized Project & Prototype Catalog for AI-Services Dual-World Showcase
 * Left World  = TOOLS (Interactive AI, Shader, Quant & Pipeline Tools)
 * Right World = GAMES (Playable WebGL, Canvas, Physics & RTS Games)
 */

export const SITE_META = {
  owner: 'Maxwell Montes Diaz',
  portfolioUrl: 'https://mascaz.github.io/',
  githubUrl: 'https://github.com/Mascaz/AI-Services'
};

export const TOOLS_ITEMS = [
  {
    id: 'ai-airbrush',
    name: 'AI Airbrush Studio',
    shortName: 'AI Airbrush',
    toolShape: 'airbrush',
    physicalLabel: 'Pneumatic Shader Airbrush',
    accent: '#38bdf8',
    secondaryAccent: '#f59e0b',
    badge: 'GPU Shader Studio',
    loadType: 'local',
    bundleSizeLabel: '252 KB • Lazy Mount',
    category: 'Metal & WebGL Portrait Retouching • 3D Relighting & UV Liquify',
    iconUrl: './assets/icons/ai-airbrush.png',
    playUrl: './games/ai-airbrush/index.html',
    playLabel: 'Launch WebGL Airbrush',
    tldr: 'On-device portrait retouching studio with 3D directional normal-field relighting, bilateral skin smoothing, and UV Liquify sculpting.',
    description:
      'Ports custom iOS Metal compute/fragment kernels directly to WebGL for 100% client-side high-resolution portrait retouching. Drag the interactive 3D studio light orb across 6 presets, sculpt with cumulative RGFloat UV Liquify brushes (Push, Slim, Plump, Restore), and inspect changes with a real-time Before/After split slider—zero cloud uploads.',
    tech: ['WebGL GLSL Shaders', 'SwiftUI & Metal Origin', '3D Normal Relighting', 'UV Liquify Mesh']
  },
  {
    id: 'emoji-shield',
    name: 'EmojiShield Privacy AI',
    shortName: 'EmojiShield',
    toolShape: 'visor',
    physicalLabel: 'Optic Privacy Visor',
    accent: '#fbbf24',
    secondaryAccent: '#34d399',
    badge: 'On-Device WASM AI',
    loadType: 'edge',
    bundleSizeLabel: '0 KB Repo • Edge Streamed',
    category: 'Client-Side YOLOv8 Auto-Censor • ONNX Runtime Web WASM',
    iconUrl: './assets/icons/emoji-shield.png',
    playUrl: 'https://mascaz.github.io/games/emoji-shield/index.html',
    playLabel: 'Launch EmojiShield AI',
    tldr: 'Runs YOLOv8 locally inside the browser via SIMD WebAssembly to detect faces/regions and composite vector emoji shields with zero server uploads.',
    description:
      'Demonstrates Edge Micro-Frontend streaming: although the YOLOv8 ONNX model + WASM runtime weighs ~55 MB, this repository stays 0 KB heavier and initial site boot downloads 0 bytes until the moment you launch the tool. Includes batch processing and an interactive Touch-Up sticker canvas.',
    tech: ['ONNX Runtime Web (WASM)', 'YOLOv8 320n', 'React & TypeScript', '100% Local Privacy']
  },
  {
    id: 'fototecateca',
    name: 'Fototecateca Ad Booth',
    shortName: 'Fototecateca',
    toolShape: 'clapper',
    physicalLabel: "Director's Slate & Rig",
    accent: '#f472b6',
    secondaryAccent: '#60a5fa',
    badge: 'AI Video Studio',
    loadType: 'local',
    bundleSizeLabel: '104 KB • Lazy Mount',
    category: 'Structured TV Parody Commercial Generator • Veo 3.1 & Gemini 3.5',
    iconUrl: './assets/icons/fototecateca.svg',
    playUrl: './games/fototecateca/index.html',
    playLabel: 'Enter Ad Booth Studio',
    tldr: 'Interactive TV parody commercial booth compiling 3-frame storyboards and 8s Veo 3.1 commercials across 5 classic broadcast channels.',
    description:
      'Turns pet or cast profiles into structured 3-beat TV parody ads (90s Infomercial, Luxury Perfume, Local Injury Lawyer, Retro Toy Ad, Action Trailer) with guided Arcade-Dial corrections and unused-take coin rebates. Runs a self-contained client-side interactive studio preview.',
    tech: ['Next.js 15 Architecture', 'Veo 3.1 & Gemini 3.5', 'Stripe Rebate Ledger', 'WebAudio Booth UX']
  },
  {
    id: 'game-localization',
    name: 'ES Localization Workbench',
    shortName: 'ES Localization',
    toolShape: 'caliper',
    physicalLabel: 'Token-Parity Vernier Caliper',
    accent: '#2dd4bf',
    secondaryAccent: '#818cf8',
    badge: 'QA Pipeline Tool',
    loadType: 'local',
    bundleSizeLabel: '16 KB • Instant',
    category: 'Game-to-Spanish Dialogue Engine & Overflow Validator • Python & LLM',
    iconUrl: './assets/icons/game-localization.svg',
    playUrl: './games/game-localization/index.html',
    playLabel: 'Open Localization Bench',
    tldr: 'Translates dialogue bundles into Latin American Spanish (es-419) while shielding inline engine control tags and auditing line-width expansion.',
    description:
      'Freezes inline runtime sequences (color switches, wait/shake triggers, hard breaks, and dynamic variables) prior to LLM batch translation, enforces 100% token parity in automated QA, locks speaker formality (tú vs. usted), and previews typewriter cadence live.',
    tech: ['Control-Tag Shielding', 'es-419 Glossary Lock', 'Line-Budget Auditor', 'Typewriter Sim']
  },
  {
    id: 'argon-bot',
    name: 'Argon FX Quant Engine',
    shortName: 'Argon FX Bot',
    toolShape: 'oscilloscope',
    physicalLabel: '3-Layer Telemetry Scope',
    accent: '#34d399',
    secondaryAccent: '#38bdf8',
    badge: 'Quant Simulator',
    loadType: 'local',
    bundleSizeLabel: '16 KB • Instant',
    category: 'Decoupled Micro/Meso/Macro FX Strategy Engine • Python & Gemini',
    iconUrl: './assets/icons/argon-bot.svg',
    playUrl: './games/argon-bot/index.html',
    playLabel: 'Launch Quant Telemetry',
    tldr: 'Separates 1-second stop-loss reflexes (Micro), 1-minute 8-currency strength matrices (Meso), and Gemini LLM regime tuning (Macro).',
    description:
      'Prevents microstructure tick noise from whipsawing macro thesis execution. Features bounded ring-buffer tick ingestion, drawdown circuit breakers, 2.5× spread friction filters, and session-aware regime switching—running live in-browser on 100% synthetic market streams.',
    tech: ['3-Layer Quant Loop', '8-Major Strength Matrix', 'Gemini Macro Tuning', 'Synthetic Tick Sim']
  },
  {
    id: 'dropshipping-made-easy',
    name: 'E-Commerce Margin Forge',
    shortName: 'Margin Forge',
    toolShape: 'scale',
    physicalLabel: 'Unit-Economics Balance',
    accent: '#a78bfa',
    secondaryAccent: '#fbbf24',
    badge: 'Bilingual Playbook',
    loadType: 'local',
    bundleSizeLabel: '400 KB • Lazy Mount',
    category: 'Bilingual (EN/ES) Unit-Economics & Copy Launchpad • React 19',
    iconUrl: './assets/icons/dropshipping-made-easy.svg',
    playUrl: './games/dropshipping-made-easy/index.html',
    playLabel: 'Open Margin Simulator',
    tldr: 'Interactive English & Spanish store launchpad with real CPA/ROAS margin calculators, supplier checklists, and viral short-form script builders.',
    description:
      'Guides founders through unit economics without hype: simulate net margin after COGS, shipping, payment fees, and ad spend; generate bilingual boutique brand copy and TikTok/Reels hooks; and export shareable launch blueprints.',
    tech: ['React 19', 'TypeScript', 'Bilingual EN/ES', 'Live ROAS & Margin Math']
  }
];

export const GAMES_ITEMS = [
  {
    id: 'redial',
    name: 'REDIAL',
    shortName: 'REDIAL',
    cabinetStyle: 'neon-slasher',
    accent: '#ff2a85',
    secondaryAccent: '#00f0ff',
    cabinetBodyColor: '#1a0b26',
    badge: 'Playable Roguelike',
    loadType: 'local',
    bundleSizeLabel: '232 KB • Instant CRT',
    controlsHint: 'WASD + Mouse / Gamepad / Twin-Stick Touch',
    category: 'Neon One-Hit-Kill Action Roguelike • Procedural Floors & Synthwave',
    iconUrl: './assets/icons/redial.png',
    playUrl: './games/redial/index.html',
    playLabel: 'Insert Coin • Play REDIAL',
    tldr: '"Do you like starting over?" Neon-soaked top-down one-hit-kill roguelike with stackable animal masks, floor modifiers, and a synthwave jukebox.',
    description:
      'Every floor is generated from scratch. One hit drops them—and one hit drops you. Draft stackable animal mask perks between calls, survive Blackout and Heavy Hitters modifiers, and play seamlessly with keyboard+mouse, controller, or mobile twin-stick touch controls.',
    tech: ['HTML5 Canvas', 'Procedural Floor Gen', 'Synthwave Jukebox', 'Twin-Stick Mobile + KB/M']
  },
  {
    id: 'ai-pikmin',
    name: 'Pikmin: PNF-404 Sim',
    shortName: 'PNF-404 Sim',
    cabinetStyle: 'botanical-rts',
    accent: '#34d399',
    secondaryAccent: '#fbbf24',
    cabinetBodyColor: '#0c241c',
    badge: 'Playable Squad RTS',
    loadType: 'local',
    bundleSizeLabel: '312 KB • Instant CRT',
    controlsHint: 'Click/Drag Whistle & Throw • Touch Ready',
    category: 'Top-Down Squad Tactics & 1–4P Co-op • TypeScript & PeerJS',
    iconUrl: './assets/icons/ai-pikmin.png',
    playUrl: './games/ai-pikmin/index.html',
    playLabel: 'Insert Coin • Play PNF-404',
    tldr: 'Command Red, Yellow, and Blue squads across 5 planetary sectors, boss arenas, 4-minute Time Attack drills, and serverless WebRTC co-op.',
    description:
      'Help Captain Olimar pass his Hocotate Freight Deep-Space Salvage Certification! Micro-manage elemental Pikmin squads with throw and whistle rings to haul 15 ship modules before sunset across Story Mode, 15-Cycle Hard Mode, and Time Attack.',
    tech: ['TypeScript', 'Squad Pathing AI', 'PeerJS 1–4P Co-op', 'Procedural WebAudio']
  },
  {
    id: 'world-strikers',
    name: 'World Strikers',
    shortName: 'World Strikers',
    cabinetStyle: 'stadium-wide',
    accent: '#facc15',
    secondaryAccent: '#38bdf8',
    cabinetBodyColor: '#0f1d38',
    badge: 'Playable Cage Demo',
    loadType: 'edge',
    bundleSizeLabel: '0 KB Repo • Edge Streamed',
    controlsHint: 'Keyboard / Gamepad / Touch Arcade Controls',
    category: '20,000V Walled-Cage Arcade Soccer • Canvas & 9-Track EDM OST',
    iconUrl: './assets/icons/world-strikers.png',
    playUrl: 'https://mascaz.github.io/games/world-strikers/index.html',
    playLabel: 'Insert Coin • Kick Off',
    tldr: 'Smash rivals into 20,000V electric fences, unleash cultural chaos items, and rip slow-motion Super Shots in Spain vs. France exhibition play.',
    description:
      'High-voltage arcade soccer brawler! Streamed on-demand from the edge CDN so its 9-track EDM soundtrack and sprites add 0 ms to initial page boot. Features X-ray electric fence shocks, item chaos, AI tactics, and MVP box scores.',
    tech: ['Custom Cage Physics', 'Slow-Mo Super Shots', '9-Track EDM Synth', 'Edge Micro-Frontend']
  },
  {
    id: 'sumten',
    name: 'SumTen',
    shortName: 'SumTen',
    cabinetStyle: 'pixel-candy',
    accent: '#fb7185',
    secondaryAccent: '#2dd4bf',
    cabinetBodyColor: '#231224',
    badge: 'Playable Puzzle',
    loadType: 'local',
    bundleSizeLabel: '20 KB • Ultra-Light',
    controlsHint: 'Mouse Drag or Finger Drag Rectangles',
    category: '16×10 Retro Pixel Number Grid • Guaranteed-Solvable Generator',
    iconUrl: './assets/icons/sumten.png',
    playUrl: './games/sumten/index.html',
    playLabel: 'Insert Coin • Play SumTen',
    tldr: 'Drag rectangles over digits summing to 10 against a 120s clock on backwards-generated 100% solvable boards with ×8 combos and chiptune SFX.',
    description:
      'Weighing just 20 KB total, SumTen boots in under a single frame! Every 16×10 grid is constructed in reverse from a complete clear path—including nested clear sequences—paired with procedural pixel visuals and chiptune audio.',
    tech: ['20 KB Total Footprint', 'Reverse-Solved Boards', 'Procedural Chiptune', 'Touch + Mouse Drag']
  },
  {
    id: 'wild-peak',
    name: 'Wild Peak 3D',
    shortName: 'Wild Peak 3D',
    cabinetStyle: 'n64-poly',
    accent: '#a78bfa',
    secondaryAccent: '#f59e0b',
    cabinetBodyColor: '#1b1630',
    badge: 'Playable 3D N64',
    loadType: 'local',
    bundleSizeLabel: '1.0 MB • Pause-3D Handoff',
    controlsHint: 'WASD / Arrows / Splitscreen / Touch',
    category: 'Procedural N64 Low-Poly 3D Survival Roguelite • Three.js',
    iconUrl: './assets/icons/wild-peak.svg',
    playUrl: './games/wild-peak/index.html?v=2',
    playLabel: 'Insert Coin • Enter 3D Wilds',
    tldr: '100% code-generated N64 low-poly wilderness with towering landmarks, procedural IK characters, custom N64 shaders, and splitscreen racing.',
    description:
      'Showcases Single-WebGL-Context Governance: the moment you step into the Wild Peak cabinet, the outer 3D Arcade freezes its own render loop to 0% GPU so Wild Peak’s Three.js N64 shader world gets 100% of your graphics card.',
    tech: ['Three.js N64 Shader', '100% Procedural Geometry', 'IK Character Poses', 'Splitscreen Race Mode']
  },
  {
    id: 'cat-capsules',
    name: 'Cat Capsules',
    shortName: 'Cat Capsules',
    cabinetStyle: 'gacha-dome',
    accent: '#f472b6',
    secondaryAccent: '#c084fc',
    cabinetBodyColor: '#29152c',
    badge: 'Playable Physics',
    loadType: 'edge',
    bundleSizeLabel: '0 KB Repo • Edge Streamed',
    controlsHint: 'Tap or Move & Click to Drop Capsules',
    category: 'Suika-Style Reactive Physics Merge • PixiJS v8 & Rapier2D WASM',
    iconUrl: './assets/icons/cat-capsules.png',
    playUrl: 'https://mascaz.github.io/games/cat-capsules/index.html',
    playLabel: 'Insert Coin • Drop Cats',
    tldr: 'Drop and merge glossy cat capsules driven by Rapier2D WASM physics, real-time cursor eye-tracking, impact squish, and skeletal tail/ear rigs.',
    description:
      'Combines deterministic Rapier2D physics with a procedural 2D skeletal cat animation rig that tracks your cursor/finger, squishes on collision, and unlocks boutique capsule themes—streamed on demand only when launched.',
    tech: ['PixiJS v8', 'Rapier2D WASM', '2D Bone Gaze Rig', 'Mobile + Desktop Ready']
  }
];

