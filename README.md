# AI-Services — 3D Tool Pegboard (`Left`) & Playable Neon Arcade (`Right`)

Live Site: **`https://mascaz.github.io/AI-Services/`**  
Repository: **`https://github.com/Mascaz/AI-Services`**

Interactive 3D showcase by **Maxwell Montes Diaz** built for **small businesses** and **content creators**:

- **Left Wall (7 Business & Creator AI Tools + 3D Before/After Workbench):**
  1. **Website Makeover Workbench** — Interactive Before ↔ After split slider comparing generic starter templates against live client-grade builds (`Relais Palais` luxury editorial storefront & `Dr. Luis Montes` bilingual orthopedic clinic).
  2. **Product Photo, Copy & Market Lab** — Upload a raw product snapshot (or test 4 samples) to generate 5 studio lighting backdrops, EN/ES Shopify copy, viral TikTok hooks, and competitor price/review-gap analysis.
  3. **Photo & Portrait Relighting (`AI Airbrush`)** — On-device WebGL 3D normal relighting & UV Liquify retouching.
  4. **Instant Video Ad Booth (`Fototecateca`)** — 3-scene storyboarded commercial generator across 5 broadcast styles.
  5. **Creator Shorts & Video Pipeline** — Automated script-to-1080p bilingual MP4 rendering with neural EN/ES voiceovers and synced captions.
  6. **Market, Margin & Copy Forge** — Unit-economics CPA/ROAS profit simulator and bilingual ad copy builder.
  7. **Global & Bilingual Translator** — Layout-safe storefront & script localization engine.
- **Right Hall (7 Playable Neon Arcade Cabinets):**
  - Includes **`DESIRED`** (25-card swipeable creator persona quiz + instant `1080×1920` 9:16 IG/TikTok Story Card generator), **`Cat Capsules`**, **`SumTen`**, **`World Strikers`**, **`REDIAL`**, **`Pikmin: PNF-404 Sim`**, and **`Wild Peak 3D`**.
- **Audience Lens & Lead Capture:**
  - `"Who Are You?"` toggle (`All Visitors` | `Small Business` | `Creators`) spotlights matching 3D tools/cabinets and tailors the `"💡 What I could build for you"` idea callouts.
  - `"✦ Build Similar For Me"` / `"✦ Build With Me"` project brief builder sends pre-filled inquiries via **Instagram DM**, **WhatsApp**, or **Email**.
- **Discreet 16-Language Easter Egg:**
  - Clicking the unadvertised flag icon in the top-right corner switches the entire UI, 3D neon signs, and project descriptions across 16 languages (`en`, `es`, `fr`, `de`, `it`, `pt`, `ja`, `ko`, `zh`, `ar` RTL, `ru`, `hi`, `nl`, `sv`, `tr`, `pl`) with on-demand lazy chunk loading.

## Updating Contact & Instagram Handle

Open `src/data.js` and edit `CONTACT_CONFIG` at the top of the file:

```js
export const CONTACT_CONFIG = {
  owner: 'Maxwell Montes Diaz',
  instagramHandle: 'maxalwayswell', // Change this when your business IG account is ready
  whatsappNumber: '16196347772',
  phoneDisplay: '619-634-7772',
  email: 'maxwell_montes@yahoo.com',
  portfolioUrl: 'https://mascaz.github.io/',
  githubUrl: 'https://github.com/Mascaz/AI-Services'
};
```

## Commands

```bash
npm run dev      # Start local dev server
npm run build    # Production build
npm run deploy   # Publish dist/ directly to GitHub Pages (gh-pages)
```
