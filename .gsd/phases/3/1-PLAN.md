---
phase: 3
plan: 1
wave: 1
gap_closure: false
---

# Plan 3.1: Digital Itinerary Summary Voucher & High-Fidelity Print Engine

## Objective
Implement a luxury digital itinerary voucher viewer and client-side print/PDF export engine. Travelers can click "Download / Print Itinerary" on any package or custom charter quote to open a refined, print-optimized royal itinerary voucher with QR/booking reference, flight/hotel timeline, passenger manifest, and print dialog with dedicated `@media print` typography.

## Context
- [.gsd/SPEC.md](file:///c:/Users/irfan/Desktop/Clients%20and%20Projects/Fly%20Anytime/.gsd/SPEC.md)
- [css/styles.css](file:///c:/Users/irfan/Desktop/Clients%20and%20Projects/Fly%20Anytime/css/styles.css)
- [js/main.js](file:///c:/Users/irfan/Desktop/Clients%20and%20Projects/Fly%20Anytime/js/main.js)
- [index.html](file:///c:/Users/irfan/Desktop/Clients%20and%20Projects/Fly%20Anytime/index.html)
- [flights.html](file:///c:/Users/irfan/Desktop/Clients%20and%20Projects/Fly%20Anytime/flights.html)

## Tasks

<task type="auto">
  <name>Build Print Stylesheet in styles.css</name>
  <files>c:/Users/irfan/Desktop/Clients and Projects/Fly Anytime/css/styles.css</files>
  <action>
    - Add comprehensive `@media print` rules that hide navigation bars, mobile bottom docks, ambient gradients, floating buttons, and background glass blurs.
    - Style the `.itinerary-printable-voucher` with crisp high-contrast black/dark-slate typography, elegant border trims, clear page break rules (`page-break-inside: avoid`), and royal emblem headers.
  </action>
  <verify>Check styles.css contains @media print with .itinerary-printable-voucher styling and navigation hiding rules</verify>
  <done>Print stylesheet enables clean, crisp browser PDF printing without UI clutter</done>
</task>

<task type="auto">
  <name>Implement Digital Itinerary Voucher Modal & Dynamic Populator</name>
  <files>
    c:/Users/irfan/Desktop/Clients and Projects/Fly Anytime/index.html
    c:/Users/irfan/Desktop/Clients and Projects/Fly Anytime/flights.html
    c:/Users/irfan/Desktop/Clients and Projects/Fly Anytime/stays.html
    c:/Users/irfan/Desktop/Clients and Projects/Fly Anytime/trains.html
    c:/Users/irfan/Desktop/Clients and Projects/Fly Anytime/destinations.html
    c:/Users/irfan/Desktop/Clients and Projects/Fly Anytime/js/main.js
  </files>
  <action>
    - Add `#itineraryVoucherModal` markup to the HTML pages with ticket header, itinerary schedule, aircraft & stay breakdown, pricing summary, and "Print / Save PDF" + "WhatsApp Concierge" actions.
    - Wire "View Itinerary / Brochure" triggers on trip cards (`.open-voucher-modal`).
    - Add JavaScript handler in `js/main.js` to populate itinerary details dynamically and trigger `window.print()` when the print button is clicked.
  </action>
  <verify>Trigger voucher modal and verify voucher details populate and print action triggers window.print()</verify>
  <done>Travelers can view and export complete luxury itineraries as clean PDFs</done>
</task>

## Must-Haves
- [ ] `@media print` stylesheet rules hiding interactive chrome and rendering crisp printable vouchers
- [ ] Dynamic voucher modal populator with booking reference, day-by-day outline, and pricing
- [ ] One-click "Print / Save as PDF" button activating browser print engine

## Success Criteria
- [ ] Voucher renders cleanly on screen and in print preview
- [ ] No clipping or distorted images during export
