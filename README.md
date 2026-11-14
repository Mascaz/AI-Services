# AI-Services — Dual-World Interactive Prototypes (`Tools` ← | → `Games`)

Live Preview: **`https://mascaz.github.io/AI-Services/`**  
Repository: **`https://github.com/Mascaz/AI-Services`**

Interactive multi-prototype showcase exploring **Left = Tools** and **Right = Playable Games** with **near-instant initial page boot (`0 KB` game code loaded on startup)**:

1. **Prototype 01 (`?proto=workshop`) — 3D Maker's Pegboard & Neon Arcade (Three.js on Rails)**
   - **Center Split Hub:** Industrial tungsten/cyan pegboard workshop on the left; synthwave neon arcade row on the right.
   - **Zero FPS Camera Controls:** Pure tap/click and horizontal mobile swipe navigation—tap any hanging 3D tool on the pegboard or swipe from arcade cabinet to arcade cabinet, then zoom straight into the CRT glass to play.
2. **Prototype 02 (`?proto=split`) — Kinetic Split-Dimension Curtain + CSS-3D Coverflow**
   - **Zero-WebGL (`< 15ms` shell boot):** Elastic split portal parting into swinging physical pegboard plaques (Left) or a swipe-snapping CSS-3D Arcade Cabinet Coverflow (Right).
3. **Prototype 03 (`?proto=artifacts`) — Dual Desk Artifacts: Field Cyberdeck vs. Bartop Mini-Arcade**
   - Direct hardware-storytelling sibling to [`mascaz.github.io`](https://mascaz.github.io/), using the native View Transitions API to morph from desk hardware into the live module/game launcher.

---

## Fast-Load Playable Architecture Implemented Here

- **Zero-Game-Bytes Boot:** `iframe.src` stays empty until a user explicitly launches a Tool or Game, and resets to `about:blank` on close to free WebGL contexts, WASM heaps, and WebAudio nodes.
- **100% Procedural 3D Scene:** All 6 hanging 3D tools, perforated pegboard (`InstancedMesh`), and 6 neon 3D arcade cabinets are generated procedurally in ~25 KB of JS (`0` `.glb` downloads), with `three` code-split into an async chunk.
- **900ms Dwell Prefetching:** Lingering on a selected cabinet or tool injects `<link rel="prefetch">` during idle time (skipped automatically when `Save-Data` is enabled).
- **Hybrid Local + Edge Micro-Frontends:** Lightweight sample builds (`20 KB`–`1.0 MB`) ship locally in `public/games/`, while heavy WASM/audio builds (*EmojiShield* 55 MB ONNX, *World Strikers* 16 MB, *Cat Capsules*) stream directly from edge GitHub Pages URLs so this repo stays `< 3 MB`.
- **Single-WebGL-Context Governance:** Launching any game automatically pauses the outer Three.js `requestAnimationFrame` loop (`0%` background GPU) until you step back out of the cabinet.

---

## Local Development & Live Deployment

```bash
# Start local dev server
npm run dev

# Production build check
npm run build

# Publish immediately to https://mascaz.github.io/AI-Services/
npm run deploy
```

> Pushing to `main` also triggers `.github/workflows/deploy.yml` to automatically build and update `gh-pages`.
