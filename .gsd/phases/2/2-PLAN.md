---
phase: 2
plan: 2
wave: 1
---

# Plan 2.2: Formatted WhatsApp Concierge Deep-Link & Summary Generator

## Objective
Enable travelers to immediately forward their customized trip or private charter quotation to the Fly Anytime 24/7 Royal Concierge desk via WhatsApp with a pre-formatted luxury itinerary inquiry payload.

## Context
- [.gsd/SPEC.md](file:///c:/Users/irfan/Desktop/Clients%20and%20Projects/Fly%20Anytime/.gsd/SPEC.md)
- [js/main.js](file:///c:/Users/irfan/Desktop/Clients%20and%20Projects/Fly%20Anytime/js/main.js)
- [index.html](file:///c:/Users/irfan/Desktop/Clients%20and%20Projects/Fly%20Anytime/index.html)
- [flights.html](file:///c:/Users/irfan/Desktop/Clients%20and%20Projects/Fly%20Anytime/flights.html)

## Tasks

<task type="auto">
  <name>Implement WhatsApp Payload Formatter</name>
  <files>c:/Users/irfan/Desktop/Clients and Projects/Fly Anytime/js/main.js</files>
  <action>
    - Add a function generateWhatsAppInquiryUrl(inquiryData) that formats route, dates, passenger count, selected palace or aircraft, and estimated budget into an encoded WhatsApp URL (https://wa.me/919876543210?text=...).
    - Format message with clean bullet points and luxury concierge greeting.
  </action>
  <verify>Check generated URL string with mock inquiry data and verify proper URI encoding and expected text parameters</verify>
  <done>WhatsApp deep link accurately incorporates user's selected journey details</done>
</task>

<task type="auto">
  <name>Add WhatsApp Instant Concierge Action in Modal & Console</name>
  <files>c:/Users/irfan/Desktop/Clients and Projects/Fly Anytime/index.html, c:/Users/irfan/Desktop/Clients and Projects/Fly Anytime/flights.html</files>
  <action>
    - Add an "Instant WhatsApp Concierge" button alongside the standard consultation form inside the modal and on the booking bar.
    - Wire button to open WhatsApp in a new tab with the structured itinerary summary pre-populated.
  </action>
  <verify>Click WhatsApp button in consultation modal; verify it opens wa.me link with encoded trip summary</verify>
  <done>User can seamlessly initiate real-time concierge chat with their selected itinerary</done>
</task>

## Success Criteria
- [ ] Clicking WhatsApp Concierge produces an instant, correctly formatted booking message.
- [ ] Travelers can choose between website consultation submission or direct WhatsApp concierge chat.
