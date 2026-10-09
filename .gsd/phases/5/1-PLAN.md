---
phase: 5
plan: 1
wave: 1
gap_closure: false
---

# Plan 5.1: Interactive Multi-City Flight Circuit Builder

## Objective
Implement an interactive Multi-City Flight Circuit Builder that allows high-net-worth travelers to configure bespoke multi-hop private charter expeditions across India (e.g. Delhi ➔ Udaipur ➔ Jaipur ➔ Varanasi ➔ Delhi). The tool calculates cumulative flight times, stopover layover tariffs, renders an animated GPU route stepper with node indicators, and instantly binds to the Digital Itinerary Voucher and WhatsApp Royal Concierge link.

## Confirmed Specifications
- **Color Palette**: Saffron (`#ff7a00`), Deep Terracotta (`#994700`), Royal Navy (`#243756`), Light Parchment (`#fbf9f6`).
- **Placement**: Dedicated embedded interactive section in `flights.html` + Modal Circuit Customizer accessible across all 5 platforms.
- **Animation**: GPU Smooth Stepper Animation with glowing node pulses and animated connecting flight lines.
- **Image Fit**: High-resolution Stitch aerial & palace assets with container `aspect-ratio: 16/10` and `object-fit: cover`.

## Context
- [.gsd/SPEC.md](file:///c:/Users/irfan/Desktop/Clients%20and%20Projects/Fly%20Anytime/.gsd/SPEC.md)
- [flights.html](file:///c:/Users/irfan/Desktop/Clients%20and%20Projects/Fly%20Anytime/flights.html)
- [css/styles.css](file:///c:/Users/irfan/Desktop/Clients%20and%20Projects/Fly%20Anytime/css/styles.css)
- [js/main.js](file:///c:/Users/irfan/Desktop/Clients%20and%20Projects/Fly%20Anytime/js/main.js)

## Tasks

<task type="auto">
  <name>Build Multi-City Circuit Engine & Calculation Controller</name>
  <files>c:/Users/irfan/Desktop/Clients and Projects/Fly Anytime/js/main.js</files>
  <action>
    - Define pre-configured curated circuits (e.g. "Royal Rajputana Grand Triangle", "Heritage & Ghats Odyssey", "Himalayan & Desert Grand Circuit").
    - Implement multi-hop calculation engine: compute total cumulative nautical distance, flight hours, layover days, and combined charter tariffs with aircraft speed and hourly rates.
    - Wire circuit state changes to the dynamic quote badge, Digital Voucher export, and WhatsApp Concierge deep-linker with formatted multi-stop breakdown.
  </action>
  <verify>Run scripts/verify_phase_5.ps1 to verify multi-city calculation math and payload formatting</verify>
  <done>Travelers can add/remove cities, choose aircraft class, and see cumulative distance and pricing update dynamically</done>
</task>

<task type="auto">
  <name>Implement Animated Stepper Node UI & Modal Circuit Customizer</name>
  <files>
    c:/Users/irfan/Desktop/Clients and Projects/Fly Anytime/flights.html
    c:/Users/irfan/Desktop/Clients and Projects/Fly Anytime/index.html
    c:/Users/irfan/Desktop/Clients and Projects/Fly Anytime/stays.html
    c:/Users/irfan/Desktop/Clients and Projects/Fly Anytime/trains.html
    c:/Users/irfan/Desktop/Clients and Projects/Fly Anytime/destinations.html
    c:/Users/irfan/Desktop/Clients and Projects/Fly Anytime/css/styles.css
  </files>
  <action>
    - Build `#multiCityCircuitSection` in `flights.html` featuring interactive city chips, stopover day counters, and aircraft selector.
    - Style the animated flight route stepper (`.circuit-stepper-node`, `.circuit-pulse-ring`, `.circuit-line-fill`) with CSS hardware acceleration.
    - Add responsive media wrappers with aspect-ratio: 16/10 ensuring all destination imagery is 100% fluid with zero distortion.
    - Add Circuit Customizer trigger button across headers and mobile navigation docks.
  </action>
  <verify>Test responsive rendering on mobile (390px) and desktop; open circuit customizer and confirm stops animate correctly</verify>
  <done>Multi-city circuit builder operates smoothly with full responsive fit and seamless voucher integration</done>
</task>

## Must-Haves
- [ ] Pre-curated royal circuits selectable with one tap
- [ ] Add/remove destination stops dynamically (minimum 2, up to 5 cities)
- [ ] Real-time total distance (km), total flight time, and price quotation
- [ ] Export circuit directly to Digital Itinerary Voucher and WhatsApp Concierge
- [ ] Full responsiveness across mobile and desktop with zero image clipping

## Success Criteria
- [ ] All multi-city route permutations calculate without NaN errors
- [ ] Zero visual distortion or horizontal scrollbars across all screen widths
