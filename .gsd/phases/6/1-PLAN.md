---
phase: 6
plan: 1
wave: 1
gap_closure: false
---

# Plan 6.1: Pan-Device Responsiveness Hardening & Media Fit Audit

## Objective
Execute a rigorous multi-device responsiveness audit and hardening across all 5 presentation portals (`index.html`, `flights.html`, `stays.html`, `trains.html`, `destinations.html`). Guarantee that all media assets fit cleanly inside fluid `aspect-ratio: 16/10` containers with `object-fit: cover` (zero awkward cuts, stretching, or distortion), all modals and slide-over drawers adapt gracefully to phone screens (360px - 428px), tablets (768px - 1024px), and wide monitors (1440px - 1920px), and bottom mobile navigation docks remain ergonomically unobstructed.

## Confirmed Specifications
- **Target Viewports**: 
  - Mobile: 360px (compact Android), 390px (iPhone 14/15/16), 428px (Pro Max)
  - Tablet: 768px (iPad), 820px (Surface), 1024px (iPad Pro)
  - Desktop: 1280px, 1440px, 1920px
- **Image Constraints**: Standardized 16:10 aspect-ratio containers with `object-fit: cover` and centered focal point (`object-position: center`) ensuring images never distort or look out of place.
- **Modal & Drawer Ergonomics**: Full-width adaptive modal cards (`max-w-[92vw]` on mobile with `max-h-[85vh]` internal vertical scroll) and touch-friendly paddings.
- **Dock Safe Spacing**: Ensure all pages have bottom padding (`pb-24 lg:pb-16`) so footer and bottom section elements are never hidden behind `.mobile-nav-bar`.

## Context
- [.gsd/SPEC.md](file:///c:/Users/irfan/Desktop/Clients%20and%20Projects/Fly%20Anytime/.gsd/SPEC.md)
- [css/styles.css](file:///c:/Users/irfan/Desktop/Clients%20and%20Projects/Fly%20Anytime/css/styles.css)
- [index.html](file:///c:/Users/irfan/Desktop/Clients%20and%20Projects/Fly%20Anytime/index.html)
- [flights.html](file:///c:/Users/irfan/Desktop/Clients%20and%20Projects/Fly%20Anytime/flights.html)
- [stays.html](file:///c:/Users/irfan/Desktop/Clients%20and%20Projects/Fly%20Anytime/stays.html)
- [trains.html](file:///c:/Users/irfan/Desktop/Clients%20and%20Projects/Fly%20Anytime/trains.html)
- [destinations.html](file:///c:/Users/irfan/Desktop/Clients%20and%20Projects/Fly%20Anytime/destinations.html)

## Tasks

<task type="auto">
  <name>Standardize Fluid Media Containers & Responsive Image Styling</name>
  <files>
    c:/Users/irfan/Desktop/Clients and Projects/Fly Anytime/css/styles.css
    c:/Users/irfan/Desktop/Clients and Projects/Fly Anytime/index.html
    c:/Users/irfan/Desktop/Clients and Projects/Fly Anytime/flights.html
    c:/Users/irfan/Desktop/Clients and Projects/Fly Anytime/stays.html
    c:/Users/irfan/Desktop/Clients and Projects/Fly Anytime/trains.html
    c:/Users/irfan/Desktop/Clients and Projects/Fly Anytime/destinations.html
  </files>
  <action>
    - Audit every single `<img>` element across all 5 hubs to ensure it is wrapped inside `.card-media-wrap` or `.hero-media-wrap`.
    - Enforce `aspect-ratio: 16 / 10` and `object-fit: cover` via `.responsive-img-cover` with smooth micro-hover scaling.
    - Prevent horizontal overflow across all pages by verifying `overflow-x: hidden` and flexible grid column fallbacks (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`).
  </action>
  <verify>Run scripts/verify_images.ps1 and confirm 100% of images conform to responsive wrappers without distortion</verify>
  <done>Images scale fluidly across 360px mobile to 1920px ultrawide without awkward cropping</done>
</task>

<task type="auto">
  <name>Harden Mobile Modals, Drawers & Bottom Dock Ergonomics</name>
  <files>
    c:/Users/irfan/Desktop/Clients and Projects/Fly Anytime/css/styles.css
    c:/Users/irfan/Desktop/Clients and Projects/Fly Anytime/index.html
    c:/Users/irfan/Desktop/Clients and Projects/Fly Anytime/flights.html
    c:/Users/irfan/Desktop/Clients and Projects/Fly Anytime/stays.html
    c:/Users/irfan/Desktop/Clients and Projects/Fly Anytime/trains.html
    c:/Users/irfan/Desktop/Clients and Projects/Fly Anytime/destinations.html
  </files>
  <action>
    - Ensure `#planTripModal` and `#itineraryVoucherModal` use `max-w-[92vw] sm:max-w-xl max-h-[88vh] overflow-y-auto` so buttons and form inputs are always accessible on small screens.
    - Verify `#portfolioDrawerPanel` adapts to `w-full sm:max-w-md` with touch-friendly header and tabs.
    - Ensure all 5 footers have `pb-24 lg:pb-16` to guarantee zero overlap with `.mobile-nav-bar`.
  </action>
  <verify>Run scripts/verify_responsiveness_suite.ps1 to test modal sizing, dock padding, and drawer responsiveness</verify>
  <done>Mobile users enjoy an app-grade touch experience without blocked content or unscrollable modals</done>
</task>

## Must-Haves
- [ ] 100% of images enclosed in 16:10 aspect-ratio responsive containers
- [ ] Zero horizontal body overflow on 360px, 390px, and 768px viewports
- [ ] Modals and drawers easily scrollable on small mobile screens
- [ ] Mobile bottom dock accessible with correct footer clearance
- [ ] Full pass on automated responsive verification suite

## Success Criteria
- [ ] Zero clipped images or broken layouts
- [ ] Clean empirical pass on `scripts/verify_responsiveness_suite.ps1`
