---
phase: 7
plan: 1
wave: 1
gap_closure: false
---

# Plan 7.1: Interactive Expedition Map & Geographic Circuit Visualizer

## Objective
Implement a bespoke, interactive SVG Vector Map of India showcase section on the homepage (`index.html`) featuring animated flight trajectory arcs, sovereign rail paths, pulsating luxury waypoints (Delhi Hub, Leh, Udaipur, Jaipur, Varanasi, Kerala), and an interactive corridor inspector card connected directly to the royal consultation booking flow.

## Confirmed Specifications
- **Technology**: Native SVG Vector Map (zero external CDN or map-tile dependencies, instant load time, 100% fluid responsive).
- **Color Palette**: Royal Gold (`#d4af37`), Saffron Amber (`#ff7a00`), Deep Slate silhouette (`#1b1c1a`), and Frosted Glass overlay containers.
- **Key Corridors & Waypoints**:
  - Delhi (Central Aviation Hub)
  - Leh Ladakh (High Altitude Wilderness)
  - Udaipur & Jaipur (Royal Rajputana & Lake Palaces)
  - Varanasi (Sacred Ganga Ghats)
  - Alleppey & Kochi (Emerald Backwaters)
- **Animations**: Animated SVG dashed flight paths with smooth `dashoffset` flow along Bezier curves and pulsating radar rings on active waypoints.
- **Interactivity**: Clicking any waypoint or corridor highlights the flight arc and updates the interactive corridor inspector card with distance, flight duration, recommended aircraft, and one-click "Book This Corridor" CTA.
- **Responsiveness**: Strict fluid SVG `viewBox="0 0 800 900"`, adaptive two-column desktop / single-column mobile layout, zero horizontal overflow.

## Context
- [.gsd/SPEC.md](file:///c:/Users/irfan/Desktop/Clients%20and%20Projects/Fly%20Anytime/.gsd/SPEC.md)
- [.gsd/DECISIONS.md](file:///c:/Users/irfan/Desktop/Clients%20and%20Projects/Fly%20Anytime/.gsd/DECISIONS.md)
- [index.html](file:///c:/Users/irfan/Desktop/Clients%20and%20Projects/Fly%20Anytime/index.html)
- [css/styles.css](file:///c:/Users/irfan/Desktop/Clients%20and%20Projects/Fly%20Anytime/css/styles.css)
- [js/main.js](file:///c:/Users/irfan/Desktop/Clients%20and%20Projects/Fly%20Anytime/js/main.js)

## Tasks

<task type="auto">
  <name>Build SVG Vector Map Styles & Trajectory Motion Engine</name>
  <files>
    c:/Users/irfan/Desktop/Clients and Projects/Fly Anytime/css/styles.css
    c:/Users/irfan/Desktop/Clients and Projects/Fly Anytime/js/main.js
  </files>
  <action>
    - Add SVG map styles in css/styles.css: glowing gold flight arcs (.map-flight-arc), animated dash flow (@keyframes flightFlow), beacon radar pulses (.map-beacon-pulse), and interactive waypoint pins (.map-waypoint-node).
    - In js/main.js, define MAP_WAYPOINTS and MAP_CORRIDORS metadata structures with city coordinates, route names, flight times, aircraft recommendations, and highlights.
    - Implement interactive waypoint controller: handle click/hover events to highlight active corridors, update the corridor inspector details, and connect the "Book This Corridor" action directly to #planTripModal with pre-populated destination data.
  </action>
  <verify>Check js/main.js and css/styles.css for MAP_CORRIDORS, flightFlow keyframes, and event listeners</verify>
  <done>SVG flight arcs animate smoothly and clicking waypoints triggers instant corridor highlight and state updates</done>
</task>

<task type="auto">
  <name>Implement Homepage Expedition Map Section & Responsive Corridor Card</name>
  <files>
    c:/Users/irfan/Desktop/Clients and Projects/Fly Anytime/index.html
  </files>
  <action>
    - Add #expeditionMapSection on index.html right after the Bespoke Destination Planner section with royal section header and luxury badge.
    - Embed the clean SVG map graphic with detailed India geographic outline paths, flight trajectory curves, and interactive waypoint buttons.
    - Build the frosted clay Corridor Inspector Card on the right/bottom featuring interactive corridor selector tabs, aircraft spec badges, route duration, and one-click "Book This Corridor" button.
    - Ensure 100% responsive fluid behavior across mobile (360px–428px), tablet, and desktop screens with zero horizontal overflow.
  </action>
  <verify>Run scripts/verify_responsiveness_suite.ps1 to verify 100% responsiveness and no layout breaks</verify>
  <done>Interactive expedition map renders beautifully on homepage with seamless mobile and desktop adaptation</done>
</task>

<task type="auto">
  <name>Create Automated Verification Script for Phase 7</name>
  <files>
    c:/Users/irfan/Desktop/Clients and Projects/Fly Anytime/scripts/verify_phase_7.ps1
  </files>
  <action>
    - Create scripts/verify_phase_7.ps1 verifying:
      - MAP_CORRIDORS and MAP_WAYPOINTS data objects in js/main.js
      - .map-flight-arc, .map-beacon-pulse, and @keyframes flightFlow in css/styles.css
      - #expeditionMapSection, #expeditionSvgMap, and #corridorInspectorCard in index.html
      - Zero syntax errors or missing DOM selectors
  </action>
  <verify>Execute powershell -ExecutionPolicy Bypass -File "scripts/verify_phase_7.ps1"</verify>
  <done>Phase 7 automated verification script exits with code 0 and all assertions passing</done>
</task>

## Must-Haves
- [ ] Custom SVG Vector Map of India with zero external library dependencies
- [ ] Animated golden flight arcs connecting Delhi to key royal corridors (Ladakh, Udaipur, Jaipur, Varanasi, Kerala)
- [ ] Interactive pulsating beacon waypoints with hover/click selection
- [ ] Responsive Corridor Inspector Card with flight time, aircraft recommendation, and direct Consultation Modal booking trigger
- [ ] 100% pan-device responsiveness with zero horizontal body overflow

## Success Criteria
- [ ] Clicking any waypoint highlights the corridor and updates route stats without lag
- [ ] "Book This Corridor" button launches #planTripModal with destination pre-populated
- [ ] scripts/verify_phase_7.ps1 and scripts/verify_responsiveness_suite.ps1 pass with 100% success rate
