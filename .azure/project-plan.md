# Bengaluru Rental Discovery

**Status**: Planning
**Created**: 2026-09-29
**Mode**: Static frontend MVP

## 1. Project Summary
Build a mobile-first Bengaluru/Bangalore rental discovery website using plain HTML, CSS, and JavaScript. Visitors can browse localities and listings, filter results, inspect listing details, and contact a lister directly by WhatsApp or phone.

## 2. User Experience
- Homepage: explain the service and provide locality/listing discovery entry points.
- Locality browsing: show available areas and their listing counts or summaries.
- Listing browsing: render static listing data with practical filters such as locality, property type, budget, and key amenities where data exists.
- Listing detail: show property facts, location context, image/media placeholders when available, and clear WhatsApp/phone actions.
- Submission and moderation entry points: link users to externally managed Google Forms/Sheets workflows, with moderation remaining manual.
- Responsive mobile-first layout with usable touch targets, readable type, keyboard access, and visible focus states.

## 3. Architecture & Services
- Single static frontend service deployed as HTML, CSS, JavaScript, and static listing data (JSON or an equivalent local data module).
- Client-side filtering and navigation; no server runtime or API for the MVP.
- External links for WhatsApp, phone, and future Google Forms/Sheets intake.

## 4. Data & Security
- No datastore required for launch.
- Listing data is versioned with the site and contains only approved/public information.
- Do not embed secrets, private contact data, or moderation credentials in client-side files.
- Validate and encode listing fields before rendering; use safe URL handling for phone, WhatsApp, and external form links.
- Future data-backed storage and authenticated moderation are deferred to a later phase.

## 5. Phased Milestones
1. **Foundation**: establish page structure, static data shape, global styles, responsive layout, and navigation.
2. **Discovery flows**: implement homepage, locality browsing, listing cards, client-side filters, empty states, and listing detail views.
3. **Contact and intake**: add accessible WhatsApp/phone actions plus configurable submission and moderation entry-point links.
4. **Quality and launch**: test representative mobile and desktop sizes, keyboard navigation, link behavior, content fallbacks, performance, and deployment configuration.

## 6. Design System & UI
**Component Library**: Pico.css

- Use a restrained, locally themed visual system with clear locality and listing hierarchy.
- Prefer semantic HTML elements and small reusable patterns: header/navigation, filter controls, listing card, detail facts, contact actions, and empty state.
- Keep the interface touch-friendly and mobile-first; enhance the layout for larger screens without changing the core browsing flow.

## 7. Acceptance Criteria
- A visitor can open the homepage and reach locality browsing and listing browsing without broken links.
- Listings render from the static data source and remain usable when optional fields are absent.
- Filters update visible results correctly, support clearing/resetting, and show a useful empty state.
- A listing detail view displays the selected listing and provides working WhatsApp and phone links when contact data exists.
- Submission and moderation entry points are clearly available and point to configurable external destinations.
- Layout, controls, focus states, and content remain usable on narrow mobile and desktop viewports.
- No sign-in, backend, datastore, or client-side secret is required to run the site.
- The site builds or publishes as static files with no server-side runtime dependency.

## 8. Hosting & Deployment
- **GitHub Pages**: publish the repository's static site directory from a branch or GitHub Actions workflow; configure the site base path if hosted under a repository subpath.
- **Netlify**: connect the repository, use the static site directory as the publish directory, and leave the build command empty unless a later toolchain is introduced. Add a redirect only if client-side detail URLs require one.
- Keep external Google Forms/Sheets URLs and contact configuration in one clearly identified data/config location so they can be changed without altering the UI structure.
- Before launch, verify deployed asset paths, HTTPS, WhatsApp/phone links, mobile layout, and a representative set of listing filters.

## 9. Out of Scope
- User accounts, sign-in, roles, or self-service moderation.
- Backend APIs, database persistence, server-side search, or real-time listing updates.
- In-app chat, payment collection, booking, or automated lead management.
- Automated listing approval, identity verification, fraud detection, or duplicate detection.
- Full Google Forms/Sheets synchronization; launch uses links/manual workflows only.
- Advanced maps, geocoding, recommendation systems, analytics dashboards, or native mobile apps.
