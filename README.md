# DTC Teaching Tool

A collection of interactive teaching guides and documentation for understanding securities ownership, post-trade infrastructure, and regulatory processes.

## Version

**v1.1** (July 2026)

## Overview

This project provides educational materials for learning about:
- DTC eligibility requirements and the FAST program
- Securities ownership through DTC, DTCC, Cede & Co., and Euroclear
- Trade finance processes and documentary collections
- Government contracting and surety bonds
- Corporate structures and securities issuance
- Trust and fiduciary structures
- Non-profit foundations and endowment management

## Project Structure

```
dtc_teaching_tool/
├── index.html                          # Main landing page with document hub
├── sitemap.html                        # Site map with all guides
├── pages/
│   ├── guides/                        # Teaching guides
│   │   ├── dtc-guide.html            # Securities Ownership Wizard
│   │   ├── corporate-structures.html # LLCs, Corporations & Partnerships
│   │   ├── trusts-fiduciary.html     # Trusts & Fiduciary Structures
│   │   ├── non-profit-foundations.html # Non-Profit Foundations
│   │   ├── sf28-teaching-guide.html  # SF 28 Affidavit of Individual Surety
│   │   └── collateral-ucc-article-8.html # Securities as Collateral (UCC Article 8)
│   ├── forms/                         # Interactive forms & questionnaires
│   │   └── dtc-eligibility-questionnaire.html
│   └── docs/                          # Reference documentation
│       └── treasury-international-bill-of-exchange.html
├── js/                                # shared, quiz, oa-canon, scenarios, search-index
├── styles/                            # shared + teaching + page CSS (forms/guides)
├── data/                              # OA canon + scenario JSON
├── tests/                             # Playwright smoke tests
├── docs/                              # Visual QA checklist, etc.
├── vercel.json                        # Production static config
├── pdf/                               # Reference PDFs
└── scripts/                           # build-search-index, audits, deploy notes
```

## Features

- **Interactive Concept Maps**: SVG-based diagrams showing relationships between entities and processes
- **Glossary Tooltips**: Hover over underlined terms for sourced definitions
- **Self-Graded Quizzes**: Assessment modules with explanations
- **Dark/Light Theme**: Automatic theme switching
- **Responsive Design**: Works on desktop and mobile
- **Local Progress Tracking**: Uses localStorage (no account required)

## Getting Started

Serve over HTTP (required for OA canon JSON, scenarios data, and accurate paths):

```bash
# From repo root
python3 -m http.server 8000
# then open http://127.0.0.1:8000/index.html
```

Opening files via `file://` will load most HTML, but **`data/oa-canon.json` will not fetch**.

### Teaching features (Days 1–60)

| Feature | Where |
|---------|--------|
| **Shared design tokens** | `styles/shared.css` (do not re-copy `:root` into pages) |
| **Page CSS** | `styles/forms-eligibility.css`, `guides-dtc.css`, `guides-sf28.css`, `guides-corporate.css`, `teaching.css` |
| **Learning paths** | Hub `#learning-paths` ← `data/learning-paths.json` + `js/learning-paths.js` |
| **Layout partials** | `js/layout.js` — inject/enhance footer + breadcrumbs (`data-layout`) |
| **OA Canon (Then→Now)** | `data/oa-canon.json` → eligibility form `#oa-crosswalk` |
| **Scenario engine** | `js/scenarios.js` + `data/eligibility-scenarios.json` |
| **Search index** | `python3 scripts/build-search-index.py` → `js/search-index.js` ([docs](scripts/SEARCH_INDEX.md)) |
| **Visual QA** | [docs/VISUAL_QA_CHECKLIST.md](docs/VISUAL_QA_CHECKLIST.md) |
| **Deploy** | Push `main` → Vercel production ([guide](scripts/VERCEL_DEPLOYMENT_GUIDE.md)) |
| **Smoke tests** | `npm test` |

```bash
npm install
npx playwright install chromium   # first time
npm run build:search              # regenerate search index after content edits
npm test
```

## Key Concepts Covered

### DTC & DTCC Infrastructure
- DTC (Depository Trust Company) - CSD for U.S. securities
- DTCC (Depository Trust & Clearing Corporation) - Parent organization
- NSCC (National Securities Clearing Corporation) - Equity CCP
- FICC (Fixed Income Clearing Corporation) - Fixed income CCP
- Cede & Co. - DTCC's nominee for book-entry securities
- FAST program - Fully Automated System for Transfer
- DRS (Direct Registration System)

### European Infrastructure
- Euroclear Group - International CSD
- Euroclear Bank - ICSD with banking license
- National CSDs - Domestic settlement systems
- T2S (TARGET2-Securities) - Eurosystem settlement platform

### Trade Finance
- Documentary collections (URC 522)
- Bills of exchange
- Sight drafts vs. time drafts
- Documents Against Payment (D/P) vs. Documents Against Acceptance (D/A)

### Government Contracting
- SF 28 Affidavit of Individual Surety
- FAR 28.203 requirements
- Individual vs. corporate sureties

## Sources

Content is sourced from:
- DTCC Operational Arrangements
- SEC regulations and guidance
- ICC Uniform Rules for Collections (URC 522)
- Federal Acquisition Regulation (FAR)
- Uniform Commercial Code (UCC)
- Euroclear publications

## Legal Notice

This teaching tool is provided for educational purposes only. It does not constitute legal, investment, or regulatory advice. For official rules and procedures, consult DTCC, DTC, SEC, Euroclear, and other authoritative sources directly.

## License

Educational use only. See individual source citations for specific reference materials.

## Changelog

### v1.4 (July 2026) — paths, layout partials, tests
- Hub learning paths (5 tracks) from JSON
- Shared `layout.js` footer/breadcrumb partials
- Expanded Playwright coverage (paths, deposit lifecycle, theme/help)

### v1.3 (July 2026) — stabilize pass (Days 1–30)
- Extracted shared/page CSS; removed duplicate `:root` block from eligibility form
- Page stylesheets: `forms-eligibility.css`, `guides-dtc|sf28|corporate.css`
- `vercel.json` cache headers; deploy docs (production = `main`)
- Search index generator (`scripts/build-search-index.py`) + visual QA checklist

### v1.2 (July 2026) — teach-better pass (Days 31–60)
- OA canon JSON + live Then→Now crosswalk UI on eligibility questionnaire
- Shared scenario tab engine (keyboard, ARIA, deep links)
- Mobile pass for form facsimile + CUSIP grid
- Playwright smoke tests (`npm test`)

### v1.1 (July 2026)
- Added global SVG gradient/filter system for consistent styling
- Implemented data-driven document card rendering
- Added hero CTAs and improved navigation
- Moved 3 guides from "in development" to live status
- Added premium timeline SVG for eligibility process
- Fixed link behavior (target="_blank" for external pages)
- Updated quiz questions and explanations
- Added new modals (legacy phone swap, collateral bridge history)
- Improved accessibility (focus rings, ARIA labels)

### v1.0 (June 2026)
- Initial release with core teaching guides
- Interactive concept maps and glossary tooltips
- Self-graded quiz system
- Dark/light theme support
