---
name: Monorail
description: Server-driven UI framework for Laravel + Inertia.js + React
colors:
  primary: "oklch(0.205 0.06 130)"
  primary-fg: "oklch(0.985 0 0)"
  surface-light: "oklch(1 0 0)"
  surface-subtle: "oklch(0.97 0.01 130)"
  surface-dark: "#020617"
  surface-raised: "#0f172a"
  surface-elevated: "#1e293b"
  border-dark: "#334155"
  text-base: "oklch(0.141 0.005 130)"
  text-muted: "oklch(0.55 0.02 130)"
  border-subtle: "oklch(0.922 0.01 130)"
  accent-signal: "#34d399"
  destructive: "oklch(0.577 0.245 27.325)"
typography:
  display:
    fontFamily: "Instrument Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3.75rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Instrument Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 2.25rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Instrument Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "Instrument Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Instrument Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.005em"
rounded:
  sm: "6px"
  md: "8px"
  lg: "10px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-fg}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
    height: "36px"
  button-primary-hover:
    backgroundColor: "oklch(0.24 0.06 130)"
    textColor: "{colors.primary-fg}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
  button-outline:
    backgroundColor: "{colors.surface-light}"
    textColor: "{colors.text-base}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
    height: "36px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.text-muted}"
    rounded: "{rounded.md}"
    padding: "8px 12px"
    height: "36px"
  button-landing-cta:
    backgroundColor: "{colors.surface-light}"
    textColor: "{colors.surface-dark}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
    height: "32px"
---

# Design System: Monorail

## 1. Overview

**Creative North Star: "The Control Room"**

Monorail speaks to a developer who already knows what they're doing. The interface projects authority without performance — a dark cockpit on the landing page, a crisp instrument panel in the docs. Everything here has a job. Nothing decorates.

The landing page lives in near-black (`surface-dark`, `#020617`) with a single signal-green accent used with discipline. The docs surface flips to a light, green-tinted neutral system — same hue family, entirely different register. Together they say: this tool was made by people who care about craft, not by a marketing team.

This system explicitly rejects the aesthetics of SaaS launch-week fever: no gradient blobs, no big-number hero metrics, no "10x your workflow" superlatives. No neon-on-black gamer energy. No glassmorphism as decoration. No bootstrapped-indie-hacker warmth. The vibe is closer to a well-maintained Unix man page that happens to look exceptional.

**Key Characteristics:**
- Two surfaces: dark landing (engine room) + light docs (workshop bench)
- Single accent color (`accent-signal` emerald) used sparingly on the dark surface; primary forest-green on light
- Code-forward: real, readable PHP examples carry more weight than copy
- Instrument Sans throughout: humanist warmth without softness
- Flat by default: no ambient shadows, depth through tonal layering and borders

## 2. Colors: The Two-Surface Palette

One hue family (green, 130° OKLCH), two completely different surface strategies united by discipline.

### Primary
- **Precision Ink** (`oklch(0.205 0.06 130)`): The primary interactive color for the light docs surface. Buttons, links, active nav states, focus rings. Deep forest-green with enough chroma to read as deliberate, not accidental.
- **Signal Green** (`#34d399`, emerald-400): The sole accent on the dark landing surface. Used on active nav items, code syntax highlights, small badges, hover treatments. Its rarity is the point — when it appears, it means something.

### Neutral (Dark Surface)
- **Engine Room** (`#020617`, slate-950): Landing page base background. The darkest surface. Headers, body, hero section.
- **Instrument Bay** (`#0f172a`, slate-900): Slightly lifted dark surface for code blocks and panels.
- **Gauge Panel** (`#1e293b`, slate-800): Navbar background, raised elements on the dark surface.
- **Circuit Trace** (`#334155`, slate-700): Borders, dividers, and rule lines on the dark surface.

### Neutral (Light Surface)
- **Workshop White** (`oklch(1 0 0)`): The docs page background. Pure white, green-tinted system implies warmth without asserting it.
- **Blueprint Linen** (`oklch(0.97 0.01 130)`): Subtle surface tint for secondary panels, code backgrounds in docs, muted containers.
- **Technical Ink** (`oklch(0.141 0.005 130)`): Primary text. Near-black with a whisper of forest green.
- **Calibration Grey** (`oklch(0.55 0.02 130)`): Secondary text, captions, nav links at rest.
- **Spec Line** (`oklch(0.922 0.01 130)`): Borders and dividers on the light surface.

### Named Rules
**The One Signal Rule.** `accent-signal` (emerald) appears only on the dark landing surface. It never appears in docs or product UI. Its rarity is structural — one green note in a dark room. If it appears everywhere, it means nothing.

**The Tint Discipline Rule.** Every light neutral carries hue 130° at chroma ≤0.01. This is not visible as "green" — it reads as warmth. Never use neutral greys (chroma 0). The tint is load-bearing even when invisible.

## 3. Typography

**Display / Body Font:** Instrument Sans (with `ui-sans-serif, system-ui, sans-serif` fallback stack)

**Character:** A single humanist sans-serif family throughout. Instrument Sans has geometric bones with warm, slightly irregular stroke endings — it reads as confident but not cold. The single-family approach avoids the pitfall of pairing mismatched type systems; instead, hierarchy is built through weight contrast (400 body, 600 headline, 700 display) and scale (1.25+ ratio between steps).

### Hierarchy
- **Display** (700, `clamp(2.25rem, 5vw, 3.75rem)`, lh 1.05, ls -0.02em): Hero headlines on the landing page. Tightly tracked. Used once per major section.
- **Headline** (600, `clamp(1.5rem, 3vw, 2.25rem)`, lh 1.15, ls -0.01em): Section headers in landing + H2 in docs. Strong without being loud.
- **Title** (600, `1.125rem`, lh 1.3): H3 in docs, feature headings, card labels.
- **Body** (400, `1rem`, lh 1.625): All prose. Max line length 65–75ch enforced on docs pages.
- **Label** (500, `0.875rem`, lh 1.4, ls 0.005em): Nav items, tags, button text, metadata. Slightly tracked for clarity at small sizes.

### Named Rules
**The One Family Rule.** No secondary typeface. All hierarchy through weight (400/600/700) and size scale. If a design needs "more personality," add it through color and spacing — not a display font.

## 4. Elevation

This system is flat by default on both surfaces. Depth is communicated through tonal layering (darker = further back on dark surface; lighter-tinted surfaces = raised on light surface) and borders, not shadows.

On the dark landing surface: the stacking order is Engine Room → Instrument Bay → Gauge Panel, each step lighter. On the light docs surface: Workshop White base, Blueprint Linen panels, borders at Spec Line weight.

Shadows appear only as state responses:

### Shadow Vocabulary
- **Focus halo** (`0 0 0 3px oklch(0.205 0.06 130 / 0.5)`): Keyboard focus ring on interactive elements (light surface). The ring-[3px] treatment in the button component.
- **Ambient lift** (`0 1px 2px oklch(0 0 0 / 0.05)`): `shadow-xs` — the minimal shadow on default, outline, and secondary buttons. Structural, not decorative.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest. Shadows appear only as a response to state. A design with shadows everywhere has no shadows at all.

## 5. Components

### Buttons

Buttons are task-completion tools, not brand statements. Shape is gently curved (8px radius, `rounded-md`) — never pill-shaped, never sharp.

- **Primary:** `primary` background (`oklch(0.205 0.06 130)`), white text, 8px radius, 36px height, 16px horizontal padding. Hover: 90% opacity. Focus: ring-[3px] halo.
- **Outline:** `border-input` border, `background` fill, same radius. Hover: `accent` background tint.
- **Ghost:** No border, no background. Hover: `accent` tint. Used for nav-adjacent actions and destructive confirmations.
- **Landing CTA (Get Started):** On dark surface — white background, `surface-dark` text. 32px height (sm variant). Reverses the dark-on-light logic intentionally.
- **Link variant:** No background, primary text color, underline on hover. Reserved for inline prose actions.

### Cards / Containers

- **Corner Style:** Gently curved (8px–10px radius, `rounded-md` or `rounded-lg`).
- **Dark surface:** `surface-raised` background (`#0f172a`), `border-dark` border (`#334155`). No shadow.
- **Light surface:** `surface-subtle` (`oklch(0.97 0.01 130)`) background or white with `border-subtle` border.
- **Internal Padding:** 16px (`spacing.md`) minimum. 24px (`spacing.lg`) for feature cards.
- **No nested cards.** A card inside a card is always wrong.

### Inputs / Fields

- **Style:** `border-input` stroke, `background` fill, 8px radius, 36px height.
- **Focus:** `border-ring` + `ring-[3px]` with ring at 50% opacity. No glow, no color flood.
- **Disabled:** 50% opacity via `disabled:opacity-50`. No custom treatment.
- **Error:** `aria-invalid:ring-destructive/20` + `aria-invalid:border-destructive`.

### Navigation (Landing)

- **Fixed header**, `bg-slate-950/80` with `backdrop-blur-md`. 56px height (`h-14`).
- **Logo:** 28px container, `bg-white/10` background, white-filled icon.
- **Nav links:** `text-slate-400` at rest, `text-white` on hover. No underlines, no bold.
- **CTA button:** White background, dark text (Landing CTA variant). Always rightmost.

### Navigation (Docs)

- Uses the `docs-navbar` pattern: light surface, Precision Ink active state, Calibration Grey resting links.

### Code Blocks (Signature Component)

The design's most expressive element. Code examples are not decoration — they're the primary proof of value.

- **Dark surface code:** `surface-raised` (`#0f172a`) background, syntax palette: violet-400 (keywords), sky-300 (class names), amber-300 (method names), emerald-400 (strings), slate-500 (comments/structure).
- **Language:** always PHP. Monorail's value proposition lives in the PHP declaration layer.
- **Fake browser chrome** on admin mockups: red/yellow/green `size-2.5` dots, `surface-elevated` bar. This is deliberate — it frames the output as a real interface, not a marketing abstraction.

## 6. Do's and Don'ts

### Do:
- **Do** lead with real PHP code. A `TextColumn::make('name')->searchable()` example communicates more than three paragraphs about developer experience.
- **Do** use `accent-signal` (emerald) exclusively on the dark landing surface and exclusively for active/selected states. One signal, one surface.
- **Do** maintain the hue-130 green tint across all light neutral tokens (`oklch(* * 130)`), even at chroma as low as 0.005. The tint is structural.
- **Do** build hierarchy through weight contrast: 400/600/700 at meaningful scale ratios (≥1.25 between steps).
- **Do** keep body text to 65–75ch max line length on docs pages.
- **Do** use tonal layering (Engine Room → Instrument Bay → Gauge Panel) for depth on dark surfaces. No shadows.
- **Do** treat the fake browser chrome in admin mockups as load-bearing. It frames PHP output as a real interface.

### Don't:
- **Don't** use big-number hero metrics, gradient blobs, or "10x your workflow" copy. This is the SaaS hero template — prohibited.
- **Don't** use glassmorphism decoratively. Backdrop blur is on the navbar because it's the single fixed layer — not because glass is trendy.
- **Don't** apply `accent-signal` (emerald) in the docs or product UI. It belongs only to the dark landing surface.
- **Don't** use side-stripe `border-left` accents on cards or list items. Rewrite with background tints, leading icons, or nothing.
- **Don't** use gradient text (`background-clip: text`). Emphasis is weight or size — single solid color only.
- **Don't** create a design that a reader could identify as belonging to a no-code tool (Bubble, Webflow, Glide). Monorail is for real developers.
- **Don't** use neon-on-black or heavy glassmorphism — the dark theme here is steel, not cyberpunk.
- **Don't** add identical card grids (same size, icon + heading + text repeated). Vary rhythm, vary content density.
- **Don't** introduce a second typeface. All hierarchy through weight and scale within Instrument Sans.
- **Don't** add empty `--` (em dash) substitutes or em dashes to copy. Commas, colons, semicolons.
