# ROADMAP.md

> **Current Phase**: Phase 2
> **Milestone**: v1.0 — Core Atelier Platform & Booking Experience

## Must-Haves (from SPEC)
- [x] 5 responsive presentation pages with Stitch MCP design system tokens
- [x] GPU-accelerated View Transitions and luxury top progress bar
- [x] Responsive fluid aspect-ratio image containers with zero distortion
- [x] Interactive live quotation & flight distance calculator
- [x] WhatsApp concierge deep link generator
- [ ] Digital itinerary PDF export & brochure download
- [ ] Inquiry persistence & review portal

---

## Phases

### Phase 1: Foundation, Design System & View Transitions
**Status**: 🟩 Completed
**Objective**: Build core multi-page web platform with Claymorphism 3D cards, Frosted Glassmorphism, fluid responsive images, and GPU view transitions.
**Deliverables**:
- `index.html`, `flights.html`, `stays.html`, `trains.html`, `destinations.html`
- `css/styles.css`, `js/main.js`
- Mobile drawer menu & thumb navigation dock

### Phase 2: Live Charter Calculator & Route Visualizer
**Status**: 🟩 Completed
**Objective**: Add live interactive flight charter estimation (hours, hourly tariffs, total INR quote), city distance calculator, and dynamic WhatsApp concierge inquiry generator.
**Deliverables**:
- Charter quotation calculator widget
- Route preview indicator
- WhatsApp deep-link message generator with formatted booking payload

### Phase 3: Digital Itinerary Export & Brochure Generation
**Status**: ⬜ Not Started
**Objective**: Allow travelers to export their customized royal itinerary as a clean printable/PDF summary and add PWA manifest for offline reading.
**Deliverables**:
- Printable itinerary summary view
- Client-side PDF generator / print stylesheet
- PWA manifest & offline service worker

### Phase 4: Concierge Inquiry Persistence & Review Dashboard
**Status**: ⬜ Not Started
**Objective**: Client-side storage of submitted inquiries, local itinerary saving, and simulated royal concierge review dashboard.
**Deliverables**:
- LocalStorage inquiry queue
- Saved trips drawer / badge counter
- Concierge simulated confirmation responses
