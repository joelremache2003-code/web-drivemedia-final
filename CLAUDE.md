# DRIVE MEDIA SAS — Agent Instructions

You're building the official corporate website for **DRIVE MEDIA SAS**, a technology and AI company based in Quito, Ecuador. Every decision — visual, structural, typographic — must reflect a high-end, luxury tech aesthetic. Think European design studio meets institutional credibility.

Always invoke the **frontend-design skill** before writing any frontend code. No exceptions.

---

## The WAT Architecture

**Layer 1: Workflows (The Instructions)**
- Markdown SOPs stored in `workflows/`
- Each workflow defines the objective, required inputs, which tools to use, expected outputs, and how to handle edge cases
- Written in plain language, the same way you'd brief someone on your team

**Layer 2: Agents (The Decision-Maker)**
- This is your role. Read the relevant workflow, run tools in the correct sequence, handle failures gracefully
- You connect intent to execution without trying to do everything yourself
- If you need to pull data from a website, read `workflows/scrape_website.md`, figure out the required inputs, then execute `tools/scrape_single_site.py`

**Layer 3: Tools (The Execution)**
- Python scripts in `tools/` that do the actual work
- Credentials and API keys stored in `.env`
- These scripts are consistent, testable, and fast

---

## Brand Identity — NEVER DEVIATE FROM THIS

### Logo
- The DRIVE MEDIA emblem is a 3D chrome/liquid metal abstract symbol
- Dynamic, angular, reflective — suggests speed, precision, and technology
- Always placed on dark backgrounds only
- Never distort, recolor, or add effects to the emblem
- File: `brand_assets/Drive_Media_Emblem.png`

### Color Palette
```
--color-bg:        #0A0A0B   /* Negro Carbón Profundo — primary background */
--color-silver:    #C2C2C2   /* Plata Esterlina — secondary text, borders */
--color-cyan:      #89D9F8   /* Cian Eléctrico Helado — hover states, highlights */
--color-acid:      #CFFD0F   /* Verde Ácido Cromático — primary accent, CTAs */
--color-white:     #FFFFFF   /* Blanco Diamante Puro — primary text */
```

**Rules:**
- Maximum 3 colors per section
- `#CFFD0F` is the primary accent — use it for CTAs, active states, and key highlights only
- `#89D9F8` is for hover states and secondary highlights
- Never use warm tones, orange gradients, or purple
- Backgrounds are always dark — never white or light sections

### Typography
- **Display / Hero:** DM Mono (Google Fonts) — Bold for titles
- **Body:** DM Mono Regular — for all body copy
- **Accent labels:** DM Mono, uppercase, letter-spacing: 0.2em
- One font family across the entire site — no mixing
- Never use: Inter, Roboto, Arial, Space Grotesk, or system fonts

### Visual Language
- 3D chrome renders, liquid metal textures, abstract geometric forms
- Dramatic lighting — specular highlights, deep shadows pushed to black
- Atmospheric depth — not flat design
- Generous negative space — luxury through emptiness
- Micro-animations: subtle, precise, never playful or bouncy
- Grid-breaking layouts where intentional — asymmetry is allowed
- No stock photos of people. No generic corporate imagery. No icons from flat icon libraries.

---

## Site Architecture

### Pages to Build

**1. Home (`index.html`)**
- Hero section — full viewport, emblem + name + tagline + CTA
- Services — 4 cards: IA Aplicada, Automatización, Blockchain, Consultoría Tecnológica
- Philosophy — the "La era digital básica terminó" block
- Contact CTA — minimal, direct

**2. Services (`servicios.html`)**
- Full page, one section per service
- Each: name, 3-line description, abstract visual in brand palette

**3. Nosotros (`nosotros.html`)**
- Company vision and philosophy only — NO personal photos, NO founder bio
- 2–3 short paragraphs. Institutional tone.

**4. Contacto (`contacto.html`)**
- Email form: Name, Email, Message — 3 fields maximum
- Links: LinkedIn, Facebook
- No phone number

---

## Copy — Use Exactly As Written

**Hero Title:** DRIVE MEDIA SAS

**Hero Tagline:** Donde el futuro toma forma.

**Hero Description:**
> La era digital básica terminó. El éxito hoy se mide en inteligencia aplicada. Diseñamos la infraestructura tecnológica que sostiene a las organizaciones líderes en Ecuador.

**Primary CTA:** Conoce nuestras soluciones
**Secondary CTA:** Contactar

**Services:**
1. Inteligencia Artificial — Diseñamos soluciones de IA aplicada que automatizan decisiones y optimizan procesos en organizaciones públicas y privadas.
2. Automatización de Procesos — Eliminamos tareas repetitivas mediante tecnología que trabaja de forma autónoma y precisa.
3. Blockchain — Implementamos arquitecturas blockchain para trazabilidad, contratos inteligentes y seguridad de datos institucionales.
4. Consultoría Tecnológica — Analizamos, diseñamos y ejecutamos soluciones alineadas a los objetivos reales de cada organización.

**Philosophy block:**
> La era de la digitalización básica terminó. Hoy, el éxito se mide en la capacidad de procesar, automatizar y decidir con Inteligencia Artificial aplicada. En Drive Media, diseñamos la infraestructura invisible que sostiene a las instituciones líderes en Ecuador. No somos un proveedor. Somos tu ventaja competitiva.

---

## Design Rules — Non-Negotiable

1. Dark backgrounds always. Every section. No exceptions.
2. The acid green `#CFFD0F` is reserved for CTAs and key accents only — not decorative use.
3. All animations: slow, precise, deliberate. Duration 0.6s–1.2s. Easing: cubic-bezier.
4. No drop shadows on text. No border-radius above 4px except on buttons (8px max).
5. Logo emblem always on its own — never inside a colored container.
6. Mobile responsive from the start — not as an afterthought.
7. Screenshot the result after each major section. Review and refine before moving on.
8. Performance: no unnecessary libraries. Vanilla JS preferred unless complexity requires otherwise.

---

## Screenshot Workflow

After building each page or major section:
1. Take a screenshot using Puppeteer
2. Review: does it look high-end? Is the typography correct? Are the colors exact?
3. If anything looks off — fix before continuing
4. Save screenshots to `tmp/screenshots/`

---

## File Structure

```
/
├── index.html
├── servicios.html
├── nosotros.html
├── contacto.html
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── main.js
│   └── img/
│       ├── emblem.png
│       └── renders/
├── brand_assets/
│   ├── Drive_Media_Emblem.png
│   └── brand_guidelines.md
├── workflows/
├── tools/
├── tmp/
│   └── screenshots/
└── .env
```

---

## How to Operate

1. Read this file first — every session, no exceptions
2. Invoke the frontend-design skill before any frontend code
3. Look for existing tools before building new ones
4. When things fail: read the full error, fix, retest, document
5. Keep workflows updated as you learn
6. Final outputs go to the project folder — nothing is disposable until the client approves

---

## Bottom Line

You are building the digital face of a technology company competing for institutional contracts in Ecuador. The site must look more serious, more refined, and more credible than any competitor. Every pixel counts. Build it like a senior agency developer would — with intention, precision, and zero tolerance for generic.
