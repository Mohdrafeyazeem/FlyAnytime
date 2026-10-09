---
phase: 2
plan: 1
wave: 1
---

# Plan 2.1: Interactive Live Charter Quotation & Route Estimator Engine

## Objective
Implement an interactive quotation calculator on `flights.html` and `index.html` that computes flight duration between Indian cities (Delhi, Mumbai, Udaipur, Goa, Jaipur, Srinagar, Leh, Kochi, Bengaluru), multiplies by selected aircraft hourly tariffs (Pilatus PC-24 Light Jet @ ₹1,85,000/hr, Challenger 350 Midsize @ ₹3,20,000/hr, AW109 Helicopter @ ₹1,40,000/hr), and renders dynamic pricing breakdowns in real-time.

## Context
- [.gsd/SPEC.md](file:///c:/Users/irfan/Desktop/Clients%20and%20Projects/Fly%20Anytime/.gsd/SPEC.md)
- [.gsd/ARCHITECTURE.md](file:///c:/Users/irfan/Desktop/Clients%20and%20Projects/Fly%20Anytime/.gsd/ARCHITECTURE.md)
- [flights.html](file:///c:/Users/irfan/Desktop/Clients%20and%20Projects/Fly%20Anytime/flights.html)
- [js/main.js](file:///c:/Users/irfan/Desktop/Clients%20and%20Projects/Fly%20Anytime/js/main.js)
- [css/styles.css](file:///c:/Users/irfan/Desktop/Clients%20and%20Projects/Fly%20Anytime/css/styles.css)

## Tasks

<task type="auto">
  <name>Build City Distance & Tariff Calculation Matrix</name>
  <files>c:/Users/irfan/Desktop/Clients and Projects/Fly Anytime/js/main.js</files>
  <action>
    - Add a flight matrix dataset containing aerial nautical miles and typical flight hours between Indian airports (DEL, BOM, UDR, GOX, JAI, SXR, IXL, COK, BLR).
    - Add aircraft category specifications (Light Jet, Super Midsize, Executive Helicopter) with cruising speeds and hourly rates.
    - Export a reactive calculation function calculateCharterQuote(origin, destination, aircraft, passengerCount) that returns flight hours, estimated distance in km, fuel & handling breakdown, and total estimated INR price.
  </action>
  <verify>Call calculateCharterQuote('DEL', 'UDR', 'light_jet', 4) in console and verify valid calculation output object with price > 0</verify>
  <done>Calculation matrix accurately returns expected flight duration and tariff breakdown for all Indian airport pairs</done>
</task>

<task type="auto">
  <name>Wire Live UI Quotation Matrix in flights.html</name>
  <files>c:/Users/irfan/Desktop/Clients and Projects/Fly Anytime/flights.html</files>
  <action>
    - Connect the booking console select dropdowns and radio buttons to trigger the live calculator.
    - Insert a reactive "Estimated Flight Time & Tariff" preview badge below the inputs showing real-time hours (e.g. "1 hr 15 mins • Approx ₹2,31,250") before submitting the inquiry.
    - Ensure styling matches the Claymorphic / Glassmorphic tokens in css/styles.css.
  </action>
  <verify>Change Origin to BOM and Destination to GOX in flights.html; observe real-time updated flight time and INR price</verify>
  <done>Live quotation badge updates instantaneously when user changes route or aircraft type</done>
</task>

## Success Criteria
- [ ] Route pairs between key Indian cities compute realistic flight durations.
- [ ] Real-time price breakdown displays seamlessly without page reloads.
