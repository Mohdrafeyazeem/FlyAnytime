---
phase: 4
plan: 1
wave: 1
gap_closure: false
---

# Plan 4.1: Concierge Inquiry Persistence & Royal Portfolio Dashboard

## Objective
Implement client-side storage (`localStorage`) for submitted inquiries and saved itineraries, along with an off-canvas Royal Portfolio Drawer accessible across all 5 platform pages. Travelers can view active inquiries with status indicators, download PDF vouchers, bookmark journeys, and initiate WhatsApp follow-ups with their specific Inquiry Reference ID.

## Context
- [.gsd/SPEC.md](file:///c:/Users/irfan/Desktop/Clients%20and%20Projects/Fly%20Anytime/.gsd/SPEC.md)
- [css/styles.css](file:///c:/Users/irfan/Desktop/Clients%20and%20Projects/Fly%20Anytime/css/styles.css)
- [js/main.js](file:///c:/Users/irfan/Desktop/Clients%20and%20Projects/Fly%20Anytime/js/main.js)
- [index.html](file:///c:/Users/irfan/Desktop/Clients%20and%20Projects/Fly%20Anytime/index.html)

## Tasks

<task type="auto">
  <name>Build LocalStorage Store & Inquiries Controller</name>
  <files>c:/Users/irfan/Desktop/Clients and Projects/Fly Anytime/js/main.js</files>
  <action>
    - Intercept form submissions on #planTripForm to save inquiry data ({id, title, date, name, phone, preferences, status, timestamp}) to localStorage under `fly_anytime_inquiries`.
    - Provide helper methods: getInquiries(), saveInquiry(), removeInquiry(), getSavedTrips(), toggleSaveTrip().
    - Update portfolio badge counter dynamically (e.g., `#portfolioCountBadge`).
  </action>
  <verify>Submit an inquiry and verify localStorage contains updated JSON array</verify>
  <done>Inquiry data persists across page reloads and tab navigations</done>
</task>

<task type="auto">
  <name>Implement Royal Portfolio Slide-Over Drawer UI</name>
  <files>
    c:/Users/irfan/Desktop/Clients and Projects/Fly Anytime/index.html
    c:/Users/irfan/Desktop/Clients and Projects/Fly Anytime/flights.html
    c:/Users/irfan/Desktop/Clients and Projects/Fly Anytime/stays.html
    c:/Users/irfan/Desktop/Clients and Projects/Fly Anytime/trains.html
    c:/Users/irfan/Desktop/Clients and Projects/Fly Anytime/destinations.html
    c:/Users/irfan/Desktop/Clients and Projects/Fly Anytime/css/styles.css
  </files>
  <action>
    - Add `#portfolioDrawer` markup to all 5 pages with dual tabs (Active Inquiries & Saved Journeys), list rendering container, and clear actions.
    - Add Portfolio trigger button in header and mobile navigation dock.
    - Add drawer transition CSS styles with smooth slide-in transform.
  </action>
  <verify>Open drawer via header button, verify submitted inquiry displays with reference code and actions</verify>
  <done>Travelers can manage and review their royal inquiries from anywhere</done>
</task>

## Must-Haves
- [ ] `localStorage` inquiry storage functioning with reference IDs
- [ ] Portfolio drawer openable across all 5 platform pages
- [ ] Direct WhatsApp follow-up and voucher re-opening from drawer
- [ ] Badge counter reflecting active inquiries

## Success Criteria
- [ ] Inquiries persist after page reloads
- [ ] Zero layout disruption and full responsiveness on mobile/desktop
