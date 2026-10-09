---
phase: 3
plan: 2
wave: 1
gap_closure: false
---

# Plan 3.2: Progressive Web App Manifest & Offline Service Worker Engine

## Objective
Implement PWA capabilities for Fly Anytime, enabling travelers to save the platform to their home screen as a standalone luxury web app, view cached itineraries and brochures while offline, and ensure instantaneous asset delivery.

## Context
- [.gsd/SPEC.md](file:///c:/Users/irfan/Desktop/Clients%20and%20Projects/Fly%20Anytime/.gsd/SPEC.md)
- [index.html](file:///c:/Users/irfan/Desktop/Clients%20and%20Projects/Fly%20Anytime/index.html)
- [js/main.js](file:///c:/Users/irfan/Desktop/Clients%20and%20Projects/Fly%20Anytime/js/main.js)

## Tasks

<task type="auto">
  <name>Create PWA Web App Manifest</name>
  <files>c:/Users/irfan/Desktop/Clients and Projects/Fly Anytime/manifest.json</files>
  <action>
    - Define `manifest.json` with app name, short name, start URL (`index.html`), standalone display mode, theme color (`#8f1d1d`), background color (`#faf8f5`), and SVG/PNG icon definitions.
    - Link `manifest.json` across all HTML pages.
  </action>
  <verify>Verify manifest.json is valid JSON and referenced with <link rel="manifest"> in all 5 HTML files</verify>
  <done>PWA manifest configured and linked on all platform pages</done>
</task>

<task type="auto">
  <name>Build and Register Offline Service Worker</name>
  <files>
    c:/Users/irfan/Desktop/Clients and Projects/Fly Anytime/sw.js
    c:/Users/irfan/Desktop/Clients and Projects/Fly Anytime/js/main.js
  </files>
  <action>
    - Create `sw.js` with Cache-First / Network-Fallback caching strategy for core shell assets (`index.html`, `flights.html`, `stays.html`, `trains.html`, `destinations.html`, `css/styles.css`, `js/main.js`).
    - Handle install, activate (cache cleanup), and fetch events gracefully.
    - Register the service worker in `js/main.js` with feature detection (`'serviceWorker' in navigator`).
  </action>
  <verify>Check sw.js exists with valid event listeners and is registered in main.js</verify>
  <done>Service worker caches application shell and allows offline browsing</done>
</task>

## Must-Haves
- [ ] `manifest.json` valid JSON with standalone display mode and royal theme styling
- [ ] `sw.js` implementing offline caching for core platform shell
- [ ] Service worker registered in `js/main.js`

## Success Criteria
- [ ] App is installable as a PWA
- [ ] Platform assets load reliably even with spotty connectivity
