# DRIVE MEDIA SAS — Visual Brand Guidelines
# brand_assets/brand_guidelines.md

---

## 1. LOGO & EMBLEM

### Primary Mark
- File: `brand_assets/Drive_Media_Emblem.png`
- Style: 3D chrome liquid-metal abstract symbol — angular, dynamic, reflective
- Communicates: speed, precision, technological superiority

### Usage Rules
- Always on dark backgrounds only (#0A0A0B or equivalent)
- Minimum clear space: 24px on all sides
- Never recolor, distort, add shadows, or apply filters
- Never place on white, light, or warm-toned backgrounds
- Never combine with decorative frames or borders
- Solo emblem = symbol only / Full lockup = emblem + "DRIVE MEDIA" wordmark

### Wordmark Typography Rule
- "DRIVE" — DM Mono Bold (heavier weight)
- "MEDIA" — DM Mono Regular (lighter weight)
- This two-weight contrast IS intentional and defines the brand logotype
- "SAS" — DM Mono Regular, smaller size, placed discretely below or beside
- Never use a single uniform weight for the full wordmark

---

## 2. COLOR SYSTEM

### Primary Palette
| Name                  | HEX      | RGB             | Role                        |
|-----------------------|----------|------------------|-----------------------------|
| Negro Carbón Profundo | #0A0A0B  | 10, 10, 11       | Primary background — always |
| Plata Esterlina       | #C2C2C2  | 194, 194, 194    | Body text, borders, labels  |
| Cian Eléctrico Helado | #89D9F8  | 137, 217, 248    | Hover states, highlights    |
| Verde Ácido Cromático | #CFFD0F  | 207, 253, 15     | Primary CTA, key accents    |
| Blanco Diamante Puro  | #FFFFFF  | 255, 255, 255    | Primary headlines, contrast |

### CSS Variables (copy into every stylesheet)
```css
:root {
  --dm-bg:        #0A0A0B;
  --dm-silver:    #C2C2C2;
  --dm-cyan:      #89D9F8;
  --dm-acid:      #CFFD0F;
  --dm-white:     #FFFFFF;
}
```

### Color Rules
- Max 3 colors per section or component
- `--dm-acid` (#CFFD0F) — CTAs, active states, key data points ONLY. Not decorative.
- `--dm-cyan` (#89D9F8) — hover states, secondary highlights, subtle tech accents
- `--dm-silver` (#C2C2C2) — body text, captions, borders, secondary labels
- `--dm-white` (#FFFFFF) — H1, H2, primary statements
- Background is ALWAYS dark — no white sections, no light panels
- Never use warm tones, orange gradients, or purple
- No gradients between brand colors — flat fills only

---

## 3. TYPOGRAPHY

### Font Family
**Primary (only):** DM Mono — Google Fonts, free
```html
<link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&display=swap" rel="stylesheet">
```

**Backup sans-serif (emergency only):** Space Grotesk
**Never use:** Inter, Roboto, Arial, Helvetica, system-ui, Space Grotesk as primary

### Type Scale
| Role          | Size   | Weight | Color          | Letter-spacing |
|---------------|--------|--------|----------------|----------------|
| H1 / Hero     | 64px   | 500    | #FFFFFF        | -0.02em        |
| H2 / Section  | 40px   | 500    | #FFFFFF        | -0.01em        |
| H3 / Card     | 24px   | 500    | #FFFFFF        | 0              |
| Body          | 16px   | 400    | #C2C2C2        | 0              |
| Caption/Label | 12px   | 400    | #C2C2C2        | 0.15em         |
| Overline      | 11px   | 400    | #89D9F8        | 0.25em         |
| CTA Button    | 14px   | 500    | #0A0A0B        | 0.05em         |

### Typography Rules
- One font family. Always. No mixing.
- Two weights only: 400 Regular + 500 Medium/Bold
- ALL section overlines (small labels above headings) in #89D9F8, uppercase, 0.25em tracking
- Hero titles: tight tracking (-0.02em), never loose
- Body text: #C2C2C2 — never pure white for long-form reading
- Line height: 1.6 for body, 1.2 for headings

---

## 4. SPACING & LAYOUT

### Grid System
- Max content width: 1200px
- Side margins: 80px desktop / 24px mobile
- Column gutter: 32px
- Section vertical padding: 120px desktop / 80px mobile

### Component Spacing
- Card internal padding: 40px
- Button padding: 16px 32px
- Icon-to-text gap: 12px
- Section label to heading gap: 16px
- Heading to body gap: 24px
- Body to CTA gap: 48px

### Spacing Scale (use only these values)
4 / 8 / 12 / 16 / 24 / 32 / 40 / 48 / 64 / 80 / 120

---

## 5. COMPONENTS

### Primary CTA Button
```css
.btn-primary {
  background: #CFFD0F;
  color: #0A0A0B;
  font-family: 'DM Mono', monospace;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.05em;
  padding: 16px 32px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.btn-primary:hover {
  background: #FFFFFF;
  transform: translateY(-2px);
}
```

### Secondary CTA Button (Ghost)
```css
.btn-secondary {
  background: transparent;
  color: #FFFFFF;
  font-family: 'DM Mono', monospace;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.05em;
  padding: 14px 30px;
  border-radius: 4px;
  border: 1px solid rgba(194, 194, 194, 0.3);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.btn-secondary:hover {
  border-color: #89D9F8;
  color: #89D9F8;
}
```

### Service Card
```css
.card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(194, 194, 194, 0.1);
  border-radius: 4px;
  padding: 40px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.card:hover {
  border-color: rgba(137, 217, 248, 0.3);
  background: rgba(137, 217, 248, 0.03);
  transform: translateY(-4px);
}
```

### Section Overline (label above heading)
```css
.overline {
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  font-weight: 400;
  color: #89D9F8;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  margin-bottom: 16px;
}
```

---

## 6. ANIMATION SYSTEM

### Principles
- Slow, precise, deliberate — never bouncy or playful
- Duration range: 0.4s — 1.2s
- Easing: always cubic-bezier, never linear or ease-in-out defaults
- Staggered reveals on page load (delay increases per element)
- Hover states: subtle, instant feedback

### Standard Easings
```css
--ease-out:    cubic-bezier(0.0, 0.0, 0.2, 1);   /* elements entering */
--ease-in:     cubic-bezier(0.4, 0.0, 1.0, 1);   /* elements leaving */
--ease-inout:  cubic-bezier(0.4, 0.0, 0.2, 1);   /* transitions */
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1); /* hover lifts */
```

### Page Load Sequence
```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
/* Apply with staggered delays */
.hero-overline { animation: fadeUp 0.8s var(--ease-out) 0.1s both; }
.hero-title    { animation: fadeUp 0.8s var(--ease-out) 0.25s both; }
.hero-body     { animation: fadeUp 0.8s var(--ease-out) 0.4s both; }
.hero-cta      { animation: fadeUp 0.8s var(--ease-out) 0.55s both; }
```

### Scroll Reveal
```javascript
// Intersection Observer for scroll-triggered animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(el => {
    if (el.isIntersecting) {
      el.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
```
```css
.reveal {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.8s var(--ease-out), transform 0.8s var(--ease-out);
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```

---

## 7. VISUAL ELEMENTS

### Background Textures
- Primary: Pure #0A0A0B — no texture needed for most sections
- Accent sections: subtle dot grid overlay at 3% opacity (#C2C2C2 dots)
- Hero: 3D chrome render (Drive_Media_Emblem.png) positioned large, low opacity (15-20%), blurred slightly as background depth element

### Borders & Dividers
- Standard border: 1px solid rgba(194, 194, 194, 0.1)
- Hover border: 1px solid rgba(137, 217, 248, 0.3)
- Section divider: 1px solid rgba(194, 194, 194, 0.08)
- Accent line: 2px solid #CFFD0F (used sparingly, max once per section)
- Border-radius: 4px standard / 2px minimal / 0px for full-edge elements
- Never use border-radius above 8px (except pill tags: 100px)

### No-Go List (never use in DRIVE MEDIA SAS)
- Drop shadows on text
- Glow effects or neon borders
- Gradients between brand colors
- Stock photos of people
- Flat icon library icons (Heroicons, FontAwesome, etc.)
- White or light-colored backgrounds
- Warm orange tones or purple
- Decorative border frames
- Rounded corners above 8px on structural elements
- Comic or display fonts
- All-caps body text (overlines only)

---

## 8. PHOTOGRAPHY & VISUAL DIRECTION

### Allowed Visual Content
- 3D chrome/liquid metal renders (consistent with emblem style)
- Abstract geometric forms — angular, precise, dark
- Close-up technology: circuit boards, server infrastructure, data cables
- Architectural photography: dark, minimal, brutalist structures
- Cityscape at night: Quito, generic urban industrial
- Code/terminal interfaces (dark theme only)
- Abstract data visualization in brand colors

### Color Treatment for All Images
- Apply dark overlay: rgba(10, 10, 11, 0.6) minimum
- Desaturate slightly — never vibrant/saturated
- Shadows crushed to pure black
- Highlights contained — never blown out
- No warm tones, no golden hour photography

---

## 9. COPY VOICE (for Claude Code reference)

### Tone
- Professional, direct, zero filler language
- Short sentences. Maximum 20 words per sentence.
- No exclamation marks. No hype.
- No "innovative", "cutting-edge", "revolutionary", "synergy"
- Spanish for all institutional content

### Approved Headlines & Copy Blocks

**Hero:**
- Title: DRIVE MEDIA SAS
- Tagline: Donde el futuro toma forma.
- Body: La era digital básica terminó. El éxito hoy se mide en inteligencia aplicada. Diseñamos la infraestructura tecnológica que sostiene a las organizaciones líderes en Ecuador.
- CTA Primary: Conoce nuestras soluciones
- CTA Secondary: Contactar

**Services:**
1. Inteligencia Artificial — Diseñamos soluciones de IA aplicada que automatizan decisiones y optimizan procesos en organizaciones públicas y privadas.
2. Automatización de Procesos — Eliminamos tareas repetitivas mediante tecnología que trabaja de forma autónoma y precisa.
3. Blockchain — Implementamos arquitecturas blockchain para trazabilidad, contratos inteligentes y seguridad de datos institucionales.
4. Consultoría Tecnológica — Analizamos, diseñamos y ejecutamos soluciones alineadas a los objetivos reales de cada organización.

**Philosophy Block:**
La era de la digitalización básica terminó. Hoy, el éxito se mide en la capacidad de procesar, automatizar y decidir con Inteligencia Artificial aplicada. En Drive Media, diseñamos la infraestructura invisible que sostiene a las instituciones líderes en Ecuador. No somos un proveedor. Somos tu ventaja competitiva.

**LinkedIn/Facebook Description (255 chars):**
La era digital básica terminó. El éxito hoy se mide en inteligencia aplicada. En Drive Media diseñamos la infraestructura que sostiene a las organizaciones líderes en Ecuador. No somos un proveedor. Somos tu ventaja competitiva.

---

## 10. SOCIAL MEDIA SPECS

### Banner Dimensions
- LinkedIn: 1584 × 396 px
- Facebook: 820 × 312 px
- Design in LinkedIn size first, center content for Facebook crop

### Profile Photo
- LinkedIn & Facebook: DRIVE MEDIA emblem on #0A0A0B background
- Square: 400 × 400 px minimum
- No wordmark in profile photo — emblem only

### Banner Elements (in order of hierarchy)
1. DRIVE MEDIA + SAS wordmark (DM Mono, two-weight system)
2. Tagline: "Donde el futuro toma forma." (DM Mono Regular, #C2C2C2)
3. Domain: drivemediadj.com (small, bottom right, 60% opacity)
4. Background: 3D chrome render + #0A0A0B overlay at 50% opacity

---

*Last updated: March 2026*
*Version: 1.0*
*Apply these guidelines to every touchpoint — web, social, documents, presentations.*
