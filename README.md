# Local Lawn Mowing & Maintenance — Website

A modern, SEO-optimised, static HTML website for **Local Lawn Mowing & Maintenance**
(Frankston, VIC). Built from the approved Claude Design brand kit and the SEO
strategy document, structured to be **Webflow-ready** (semantic HTML + a single
class-based stylesheet, no framework runtime).

## Pages

| File | Page | Primary keyword |
|------|------|-----------------|
| `index.html` | Homepage | Lawn Mowing Frankston |
| `services.html` | Services hub | Lawn & garden services Frankston |
| `lawn-mowing-frankston.html` | Service page | Lawn Mowing Frankston |
| `hedge-trimming-frankston.html` | Service page | Hedge Trimming Frankston |
| `grounds-maintenance-frankston.html` | Service page | Grounds Maintenance Frankston |
| `about.html` | About | Frankston lawn & garden care (brand + trust) |
| `contact.html` | Contact | Free lawn mowing quote Frankston |
| `thank-you.html` | Post-submit confirmation (noindex) | — |

## Structure

```
├── index.html, services.html, *-frankston.html, about.html, contact.html
├── css/style.css        Design system: tokens, components, responsive, animations
├── js/main.js           Nav toggle, scroll reveal, stat counters, before/after slider, form
├── assets/images/       Logo + photography (webp)
├── robots.txt
└── sitemap.xml
```

## Brand kit (from Claude Design)

- **Fonts:** Oswald (headings, uppercase) + Barlow (body) — loaded via Google Fonts.
- **Colours:** navy `#0f1747` / primary blue `#182a88` / green `#2f9e44` /
  light green `#8fe3a5` / cream `#f6f7f3` / amber stars `#f4a418`.
  All defined as CSS custom properties at the top of `css/style.css`.

## SEO / GEO / AEO (per strategy doc)

- **On-page:** exact-match `Lawn Mowing Frankston` in title, H1 and first 100 words of
  the homepage; unique meta title + description on every page; self-referencing canonicals.
- **Schema (JSON-LD):** `LocalBusiness` + `AggregateRating` (5.0 / 50 reviews) so the
  five-star reviews are eligible for rich results; `Service`, `BreadcrumbList`,
  `FAQPage`, `AboutPage`, `ContactPage`, `ItemList` across the site.
- **AEO:** question-phrased FAQ headings with concise 40–60 word answers on the
  homepage and each service page, mirrored in `FAQPage` schema.
- **GEO:** citable facts (established 2014, registered & insured, service radius,
  indicative pricing) stated in plain text for AI engines.
- **Technical:** `robots.txt`, `sitemap.xml`, Open Graph + Twitter `summary_large_image`,
  descriptive `alt` text, `width`/`height` on images to reduce layout shift.

## Webflow import notes

- No build step and no JS framework — plain HTML5, one external CSS file, one small
  vanilla JS file. Markup uses semantic sections and descriptive classes that map
  cleanly onto Webflow's structure panel.
- **Clean URLs:** internal links are extensionless (`/services`, `/contact`). GitHub
  Pages and Webflow both resolve these to the matching page automatically.
- **Quote form → GoHighLevel.** Field `name` attributes match the GHL contact fields
  exactly, so submissions sync to contacts:

  | Form field | GHL contact field |
  |---|---|
  | Full Name | `{{contact.full_name}}` |
  | Email | `{{contact.email}}` |
  | Phone | `{{contact.phone}}` |
  | Service Needed | `{{contact.service_needed}}` |
  | Property Address | `{{contact.property_address}}` |
  | Property Size | `{{contact.property_size}}` |
  | Job Notes | `{{contact.job_notes}}` |

  The form is rendered directly in the page DOM (no iframe), uses
  `<button type="submit">`, and **submits via the browser's native submit event** —
  no JS `preventDefault()` — which is what GHL's tracking requires to capture it.
  Enable *Form Analytics* and *Form Submissions* in GHL settings.
- **Tracking:** the GHL `external-tracking.js` snippet is on every page before `</body>`.
- **Thank-you page:** the form posts to `thank-you` via GET, so the submitted values
  arrive as query params and the page greets the visitor by first name and lists a
  summary of what they sent. If you host the thank-you page inside GHL instead, swap
  the inline script for the `{{contact.*}}` merge fields above. Page is `noindex` and
  excluded from `sitemap.xml`, making it a clean analytics conversion goal.
- Google Fonts are linked in `<head>` (Oswald + Barlow) — add the same two families
  in Webflow's font settings.
- JSON-LD `<script>` blocks can be pasted into each page's custom code (head).

## Local preview

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Notes / recommended next steps

- Confirm the exact street address (`3 Kooluna Crescent, Frankston 3199` used here —
  verify "Kooluna" spelling) and align NAP across the site, Google Business Profile
  and directories.
- Replace the `sameAs` social URLs with the real Facebook / Instagram / TikTok links.
- Suburb landing pages (Seaford, Mt Eliza, Langwarrin, Carrum Downs) are recommended
  in the strategy as a Phase 2 expansion — the internal linking and design system
  already support adding them.
