# DTC Documents - Style & Design Audit Report

> **OUTDATED (as of July 2026):** This snapshot describes an earlier design state. The live hub (`index.html`) now uses Cormorant Garamond + DM Sans with a light/dark theme switcher (not a Cinzel/Playfair dark-only system). Guides largely share that stack and `styles/shared.css`. Prefer a fresh codebase scan over this document for planning.

## Overview

This audit analyzes the styling, consistency, accessibility, and user experience across all DTC eligibility documents. The project contains 6 HTML documents with **inconsistent design approaches** that could be unified for better user experience and maintainability.

## Document Analysis

### Current Documents:

1. **index.html** - Main landing page with dark theme, complex animations, multiple font families
2. **guides/dtc-guide.html** - Teaching guide with clean white background, DM Sans font, sidebar navigation
3. **guides/sf28-teaching-guide.html** - SF 28 guide with consistent styling to dtc-guide.html
4. **forms/dtc-eligibility-questionnaire.html** - Questionnaire with interactive elements, consistent styling
5. **docs/treasury-international_bill_of_exchange.html** - Trade finance document, similar styling to guides
6. **docs/dtc-biblical-exegesis.html** - Completely different styling with Source Serif 4, violet theme

## Critical Issues

### 1. **Inconsistent Design Systems** 

**Problem**: Three completely different design approaches across documents:

- **Index**: Dark theme with gold accents, Cinzel/Inter fonts, complex animations
- **Guides/Forms**: Light theme with blue accents, Cormorant/DM Sans fonts, clean professional look
- **Biblical Exegesis**: Dark theme with violet accents, Source Serif 4 font, academic styling

**Impact**: Users experience jarring transitions when moving between documents. No brand consistency.

**Recommendation**: 
- **Adopt the guides/forms design system** as the standard (clean, professional, accessible)
- Update index.html to match this system
- Create a shared CSS file for consistency

### 2. **Font Inconsistency**

**Current Usage**:
- Index: Cinzel, Inter, Playfair Display, Cormorant Garamond (4 fonts!)
- Guides: Cormorant Garamond, DM Sans (2 fonts)
- Biblical: EB Garamond, Source Serif 4, JetBrains Mono (3 fonts)

**Recommendation**:
- Standardize on **Cormorant Garamond (headings) + DM Sans (body)**
- Remove unnecessary font loading
- Consider JetBrains Mono only for code snippets if needed

### 3. **Color Scheme Conflicts**

**Problem**: Three different color palettes:
- Index: Dark backgrounds (#0a0a0f), gold accents (#c9a84c)
- Guides: Light backgrounds (#faf9f6), blue accents (#1a3a5c), gold highlights (#a67c00)
- Biblical: Dark backgrounds (#0a0c14), violet accents (#7c5cbf), gold highlights (#c8902a)

**Recommendation**:
- Adopt **guide color system** as standard (light background, blue/gold accents)
- Use biblical styling only for that specific document (it's a special case)

## Accessibility Issues

### 1. **Missing Alt Text**
- SVG icons throughout lack proper `aria-label` or `alt` attributes
- Decorative elements not marked as such

### 2. **Focus States**
- Some interactive elements lack visible focus indicators
- Keyboard navigation not fully tested

### 3. **Color Contrast**
- Some text-muted colors may not meet WCAG AA standards
- Low-opacity text may be difficult to read

### 4. **Modal Accessibility**
- Modals lack proper ARIA attributes
- Focus trap not implemented
- Escape key to close not always available

## Performance Issues

### 1. **Excessive Font Loading**
- Index loads 4 Google Fonts (heavy)
- Other documents load 2-3 fonts each
- Consider font-display: swap

### 2. **Large CSS Blocks**
- Each document has embedded CSS (1000+ lines each)
- Consider extracting to shared CSS file

### 3. **SVG Inline**
- Many SVGs are inline instead of sprite system
- Increases document size

## Design Improvements

### 1. **Typography**

**Current Issues**:
- Inconsistent font sizes across documents
- Line heights vary (1.7 vs 1.85)
- Font weights not standardized

**Recommendations**:
```css
/* Standardized Typography */
:root {
  --font-heading: 'Cormorant Garamond', serif;
  --font-body: 'DM Sans', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  
  --h1-size: clamp(2rem, 4vw, 3rem);
  --h2-size: clamp(1.5rem, 3vw, 2rem);
  --h3-size: clamp(1.25rem, 2.5vw, 1.5rem);
  --body-size: clamp(1rem, 2vw, 1.125rem);
  
  --line-height: 1.7;
  --letter-spacing-normal: 0.01em;
  --letter-spacing-tight: -0.01em;
}
```

### 2. **Color System Standardization**

**Recommend unified color palette**:
```css
:root {
  /* Neutrals */
  --bg-primary: #faf9f6;
  --bg-secondary: #ffffff;
  --bg-tertiary: #f7f5f0;
  
  /* Text */
  --text-primary: #0f1115;
  --text-secondary: #2d3142;
  --text-tertiary: #5a5d6b;
  --text-muted: #8a8d9a;
  
  /* Accents */
  --accent-blue: #1a3a5c;
  --accent-blue-light: #e8f0f8;
  --accent-gold: #a67c00;
  --accent-gold-light: #fbf6e8;
  
  /* Borders */
  --border-light: #e6e7ec;
  --border-medium: #d0d2da;
  --border-dark: #8a8d9a;
  
  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.04);
  --shadow-md: 0 4px 20px rgba(0,0,0,0.06);
  --shadow-lg: 0 20px 60px rgba(0,0,0,0.12);
}
```

### 3. **Component Consistency**

**Standardize these components**:

#### Navigation/Header
- Consistent height (80px)
- Consistent logo placement
- Consistent TOC toggle positioning

#### Buttons/Interactive Elements
- Standard hover states
- Consistent border-radius (8px)
- Consistent padding (12px 24px)

#### Cards/Containers
- Consistent box-shadows
- Consistent border-radius
- Consistent padding (24px)

#### Modals
- Standardized overlay (rgba(10,12,18,0.65))
- Consistent max-width (600px)
- Consistent padding (32px)

## Mobile Responsiveness

### Current State:
- Documents have `viewport` meta tag ✓
- Some use `clamp()` for responsive typography ✓
- BUT: inconsistent breakpoints and behavior

### Recommendations:
```css
/* Standardized Breakpoints */
:root {
  --mobile: 480px;
  --tablet: 768px;
  --desktop: 1024px;
  --wide: 1200px;
}

/* Mobile-First Approach */
.container {
  padding: 16px;
}

@media (min-width: 768px) {
  .container {
    padding: 24px;
  }
}

@media (min-width: 1024px) {
  .container {
    padding: 32px;
    max-width: 1100px;
    margin: 0 auto;
  }
}
```

## Code Quality Issues

### 1. **CSS Organization**
- Large embedded CSS blocks
- No clear sectioning
- Mixed ordering of properties

### 2. **HTML Structure**
- Some inconsistent heading hierarchies
- Missing semantic HTML5 elements
- Excessive nested divs

### 3. **JavaScript**
- Modal functionality duplicated across files
- No error handling
- No loading states

## Specific Document Recommendations

### index.html
**Priority: HIGH** - Complete redesign needed

1. Simplify color scheme to match other documents
2. Reduce font loading from 4 to 2 fonts
3. Reduce animation complexity for performance
4. Improve mobile responsiveness
5. Add proper alt text and accessibility

### guides/*.html
**Priority: MEDIUM** - Minor improvements needed

1. Extract shared CSS to external file
2. Standardize TOC positioning (already done ✓)
3. Add focus states to all interactive elements
4. Improve modal accessibility
5. Add loading states for modals

### docs/dtc-biblical-exegesis.html
**Priority: LOW** - Keep unique styling but improve accessibility

1. Keep current design (unique academic feel)
2. Improve keyboard navigation
3. Add proper alt text
4. Focus trap for modals
5. Improve mobile responsiveness

## Implementation Plan

### Phase 1: Foundation (Immediate)
1. Create shared CSS file with design tokens
2. Standardize typography system
3. Create component library (buttons, cards, modals)
4. Implement accessibility fixes

### Phase 2: Migration (Week 1)
1. Update index.html to use shared system
2. Refactor guides to use external CSS
3. Update forms to use shared components
4. Test across all documents

### Phase 3: Polish (Week 2)
1. Performance optimization
2. Enhanced mobile responsiveness
3. Accessibility audit and fixes
4. Cross-browser testing

### Phase 4: Maintenance (Ongoing)
1. Create style guide documentation
2. Set up CSS preprocessing if needed
3. Implement design system versioning
4. Regular accessibility audits

## Quick Wins (Can be implemented immediately)

1. **Add missing focus states**:
```css
button:focus-visible {
  outline: 2px solid var(--accent-blue);
  outline-offset: 2px;
}
```

2. **Improve color contrast**:
```css
.text-muted {
  color: #5a5d6b; /* Changed from lighter */
}
```

3. **Add alt text to SVGs**:
```html
<svg aria-label="Menu icon" role="img">...</svg>
```

4. **Standardize TOC positioning**:
```css
.toc-toggle {
  top: 44px; /* Already done ✓ */
}
```

5. **Add loading states**:
```css
.modal-loading {
  opacity: 0.5;
  pointer-events: none;
}
```

## File Structure Recommendations

```
dtc_eligibility/
├── css/
│   ├── design-tokens.css      # Color, typography, spacing
│   ├── components.css         # Buttons, cards, modals
│   ├── layout.css             # Grid, containers, spacing
│   └── utilities.css          # Helper classes
├── js/
│   ├── modal.js               # Shared modal functionality
│   ├── navigation.js          # Shared navigation
│   └── theme.js               # Theme switching
├── index.html                 # Update to use shared CSS
├── guides/
│   ├── dtc-guide.html         # Use shared CSS
│   └── sf28-teaching-guide.html # Use shared CSS
└── forms/
    └── dtc-eligibility-questionnaire.html # Use shared CSS
```

## Accessibility Checklist

- [ ] All images have alt text
- [ ] All interactive elements have focus states
- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] Keyboard navigation works throughout
- [ ] Modals trap focus and can be closed with Escape
- [ ] Form inputs have associated labels
- [ ] Skip navigation link provided
- [ ] ARIA landmarks used appropriately
- [ ] Dynamic content updates announced to screen readers
- [ ] Error messages are accessible

## Performance Targets

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.5s
- **Cumulative Layout Shift**: < 0.1
- **Total CSS size**: < 50KB (after minification)

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile iOS Safari: iOS 14+
- Mobile Chrome: Android 10+

## Conclusion

The documents show good individual design but suffer from inconsistency. Adopting the guides/forms design system as the standard and creating shared CSS would significantly improve user experience, maintainability, and performance. The biblical exegesis document can maintain its unique styling with accessibility improvements.

**Estimated effort**: 2-3 weeks for full implementation
**Priority items**: Consistency, accessibility, performance optimization
**Quick wins**: Focus states, alt text, color contrast improvements