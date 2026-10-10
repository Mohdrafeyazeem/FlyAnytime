# Architectural Decision Records (ADR)

## ADR-001: Zero-Build Multi-Page Architecture
- **Context**: Need maximum performance, instant previews, and easy deployment without heavy Node/bundler overhead.
- **Decision**: Standard HTML5 multi-page structure with shared stylesheet and scripts.
- **Consequences**: Fast loading, zero dependency vulnerabilities, fully browsable directly in browser.

## ADR-002: Dual-Layer Page Transition Engine
- **Context**: User requested seamless transitions when switching between pages.
- **Decision**: Combine native CSS `@view-transition` with an asynchronous JavaScript link-interception engine and top glowing progress sweep bar.
- **Consequences**: Silky smooth transitions on all browsers with hardware acceleration on modern engines.

## ADR-003: Strict Responsive Aspect-Ratio Image Enclosures
- **Context**: Images must never distort or cut off awkwardly across diverse devices.
- **Decision**: Wrap all images in explicit `card-media-wrap` / `hero-media-wrap` containers utilizing fluid `aspect-ratio` and `object-fit: cover` with centered alignment.
- **Consequences**: Pristine visual presentation on viewports from 360px up to 4K displays.

## Phase 7 Decisions: Interactive Expedition Map & Geographic Circuit Visualizer

**Date:** 2026-10-11

### Scope & Placement
- Showcase section on `index.html` titled **"Royal Expedition Corridors: Interactive Geographic Map"** (`#expeditionMapSection`).
- Direct deep links from `flights.html`, `stays.html`, and Mega Menu drawer.
- Interactive waypoints for premier corridors: Delhi (Hub), Leh (High Altitude), Udaipur (Lake Palaces), Jaipur (Rajputana), Varanasi (Ganga Ghats), and Alleppey/Kochi (Backwaters).

### Approach & Technology
- **Engine**: Bespoke SVG Vector Map of India with zero external heavy CDN dependencies, guaranteeing instant load times, zero third-party latency, and complete visual theme consistency.
- **Visuals**: Royal Gold & Amber glow (`#ff7a00`, `#d4af37`), deep slate terrain silhouette, pulsating radar beacon waypoints, and animated dashed flight trajectory arcs (`dashoffset` animations).
- **Interactivity**: Clicking any corridor/waypoint dynamically highlights the route, displays a responsive frosted glass waypoint detail drawer/card with flight time, aircraft class recommendation, and one-click "Book This Corridor" action directly connected to the consultation modal.

### Constraints & Quality
- Strict compliance with 16:10 / fluid responsive SVG viewport bounds (`viewBox="0 0 800 900"`, `w-full h-auto`).
- Zero horizontal overflow on mobile screens down to 360px.
- No code execution until user explicitly says "start".

