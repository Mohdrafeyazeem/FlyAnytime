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
