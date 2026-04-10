# Design Brief

**Tone & Differentiation**: Premium enterprise maximalism. Cybersecurity SaaS dashboard with bold neon blue accents, gradient borders, glassmorphic depth, and code-inspired typography. Aesthetic matches CrowdStrike, Palo Alto Networks, Darktrace. Every card features gradient neon border, inner glow, soft glass shadow, and hover elevation.

## Palette (Dark Mode OKLCH)

| Token | L | C | H | Use |
|-------|---|---|---|----|
| background | 0.08 | 0.01 | 258 | Deep navy page background |
| foreground | 0.96 | 0.01 | 258 | Off-white body text |
| card | 0.14 | 0.02 | 270 | Elevated surface (dark blue-gray) |
| primary | 0.67 | 0.30 | 257 | Neon blue accent (#4F8CFF) |
| secondary | 0.72 | 0.22 | 200 | Electric blue accent (#00D4FF) |
| accent | 0.55 | 0.25 | 287 | Purple accent (#7A5CFF) |
| destructive | 0.60 | 0.28 | 25 | Error/critical states (#FF4D4D) |
| warning | 0.66 | 0.20 | 70 | Warning states (#FFB020) |
| muted | 0.25 | 0.02 | 270 | Disabled/secondary text |
| border | 0.22 | 0.02 | 270 | Subtle dividers (blue-gray) |

## Typography

| Layer | Font | Size | Weight | Use |
|-------|------|------|--------|-----|
| Display | JetBrains Mono | 3xl–4xl | 400 | Headings, hero text, premium CTAs |
| Body | General Sans | sm–base | 400–500 | Body copy, descriptions |
| Mono | Geist Mono | xs–sm | 400 | Code snippets, API status, tech details |

## Depth & Glass Effects

**Card Depth System**:
- Gradient neon border (primary blue to purple gradient)
- Inner glow: `inset 0 0 20px oklch(0.67 0.30 257 / 0.1)`
- Glass shadow: `0 20px 40px rgba(0,0,0,0.4), inset 0 0 30px rgba(79,140,255,0.05)`
- Hover elevation: `-4px` translateY with intensified shadow

**Structural Zones**:
| Zone | Background | Border | Shadow | Hover |
|------|------------|--------|--------|-------|
| Sidebar Nav | `oklch(0.12 0.02 270)` | `border-primary/20` | Glass depth | Primary/40 |
| Dashboard Card | `oklch(0.14 0.02 270)` | Gradient neon | Glass depth + inner glow | Lift -4px, border primary/40 |
| Status Indicator | `primary/10` | `primary/30` | Subtle glow | Pulse animation |
| Terminal/Code | `oklch(0.10 0 0)` | `primary/15` | Scan line animation | None |

## Component Patterns

**Depth Cards**: `border border-primary/20 rounded-lg shadow-glass-depth` with gradient-neon-blue border, inner-glow. Hover: `-translate-y-1 border-primary/40`.

**Status Badges**: `.status-active` (green glow) or `.status-inactive` (muted). Show API health, scan counts, AI engine state.

**CTA Buttons**: `bg-primary text-primary-foreground` with `shadow-glow-blue-lg`, `font-display` (JetBrains Mono).

**Glow Text**: Primary headlines use `.glow-primary`, accents use `.glow-accent`.

## Motion & Animation

- **Card Lift**: Subtle hover elevation (card-lift animation, 3s loop)
- **Glow Pulse**: Status indicators pulse (glow-pulse, 2s loop)
- **Scan Line**: Terminal-style effect on hero (scan-line, 3s linear)
- **Grid Shimmer**: Animated background grid (grid-shimmer, 8s linear)
- **Page Transitions**: Fade + slide up on section entrance (100ms staggered)

## Dashboard Navigation

**Sidebar**: Fixed left panel, dark background, primary-colored active state with accent underline. Routes: Dashboard, AI Agent, Scan Center, Threat Intel, Reports.

**Dashboard Hub**: System Control Panel (API status, active scans, AI engine), Live Activity Feed (right panel), AI Insight Cards, Security Score (animated circle).

**AI Agent Page**: 3-panel split (left target input, center AI thinking timeline, right output/vulnerabilities).

**Scan Center**: Terminal view with live logs, scan pipeline visual (animated flow).

**Threat Intel**: Unified intelligence cards (IP risk, malware activity).

**Reports**: Executive summary, technical details, CVSS scores.

## Constraints

- Max-width: 1400px (container)
- Padding: 2rem outer, 1.5rem card inner
- Border radius: 0.625rem (lg), 0.375rem (md), -0.125rem (sm)
- Neon glows: Primary blue on interactive, purple on accent, red on danger
- All text contrast ≥ AA+ on dark backgrounds
- No bright saturated colors outside palette
- Card depth applies to all interactive containers (not to text or small badges)

## Signature Detail

Neon blue gradient borders with inner glow on every card, combined with smooth hover elevation (-4px translateY) and glass shadow depth. Creates premium "glowing dashboard" aesthetic unique to enterprise cybersecurity positioning.
