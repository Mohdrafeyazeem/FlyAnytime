# ROADMAP.md

> **Milestone**: v1.1 — Bespoke Expedition Customizer & Fleet Orchestration
> **Status**: 🟩 Phase 5 Complete & Verified

## Must-Haves (from SPEC)
- [x] 5 responsive presentation pages with Stitch MCP design system tokens
- [x] GPU-accelerated View Transitions and luxury top progress bar
- [x] Responsive fluid aspect-ratio image containers with zero distortion
- [x] Interactive live quotation & flight distance calculator
- [x] WhatsApp concierge deep link generator
- [x] Digital itinerary PDF export & brochure download
- [x] Inquiry persistence & review portal (Royal Portfolio Dashboard)
- [x] Interactive Multi-City Flight Circuit Builder with animated stepper nodes

---

## Phases

### Phase 1: Foundation, Design System & View Transitions
**Status**: 🟩 Completed
**Objective**: Build core multi-page web platform with Claymorphism 3D cards, Frosted Glassmorphism, fluid responsive images, and GPU view transitions.

### Phase 2: Live Charter Calculator & Route Visualizer
**Status**: 🟩 Completed
**Objective**: Add live interactive flight charter estimation (hours, hourly tariffs, total INR quote), city distance calculator, and dynamic WhatsApp concierge inquiry generator.

### Phase 3: Digital Itinerary Export & Brochure Generation
**Status**: 🟩 Completed
**Objective**: Allow travelers to export their customized royal itinerary as a clean printable/PDF summary and add PWA manifest for offline reading.

### Phase 4: Concierge Inquiry Persistence & Review Dashboard
**Status**: 🟩 Completed
**Objective**: Client-side storage of submitted inquiries, local itinerary saving, and simulated royal concierge review dashboard.

### Phase 5: Interactive Multi-City Flight Circuit Builder
**Status**: 🟩 Completed
**Objective**: Build multi-stop charter route builder (Delhi ➔ Udaipur ➔ Jaipur ➔ Varanasi) with animated stepper path, layover day selector, cumulative distance & rate engine, and export to Voucher/WhatsApp.
**Deliverables**:
- Multi-city distance and duration calculation matrix in `js/main.js`
- Interactive route stepper with pulse nodes and flight progress lines in `flights.html` & `css/styles.css`
- Global navigation links across all 5 portals

### Phase 6: Pan-Device Responsiveness Hardening & Media Fit Audit
**Status**: 🟨 Planned (Awaiting Execution)
**Objective**: Audit and harden responsiveness across all 5 presentation portals (`index.html`, `flights.html`, `stays.html`, `trains.html`, `destinations.html`) on mobile (360px–428px), tablet (768px–1024px), and desktop (1280px–1920px). Standardize 16:10 aspect-ratio image containers with `object-fit: cover` and centered focal points, ensure zero modal clipping/overflow, and guarantee unobstructed mobile bottom dock clearance.
**Deliverables**:
- Fluid media container enforcement in `css/styles.css` and all 5 HTML portals
- Modal dialog max-width and viewport height auto-scroll rules
- Bottom dock safe margin clearance (`pb-24 lg:pb-16`)
- Automated verification suite `scripts/verify_responsiveness_suite.ps1`

