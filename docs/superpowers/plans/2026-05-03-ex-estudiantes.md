# Ex-Estudiantes Web — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static single-page website for Ex-Estudiantes, the veteran basketball group from Club Baloncesto Estudiantes de Madrid.

**Architecture:** Single HTML page with CSS custom properties for theming, vanilla JS modules that fetch JSON data files and render content dynamically. EmailJS handles the contact form with no backend. All content managed via JSON files in `data/`.

**Tech Stack:** HTML5, CSS3 (custom properties, grid, flexbox), JavaScript (ES modules, fetch API), EmailJS (form submission)

---

## File Structure

```
ex-estudiantes/
├── index.html              — Single page with all 6 sections, nav, and footer
├── css/
│   └── styles.css          — All styles: variables, reset, layout, components, responsive
├── js/
│   ├── app.js              — Nav scroll behavior, mobile menu, section observer
│   ├── miembros.js         — Fetch miembros.json, render player cards
│   ├── anuncios.js         — Fetch anuncios.json, render announcements
│   ├── galeria.js          — Fetch galeria.json, render photo grid
│   └── formulario.js       — EmailJS init, form validation, submission
├── data/
│   ├── miembros.json       — Player roster data
│   ├── anuncios.json       — Announcements and events data
│   └── galeria.json        — Photo gallery data
├── img/
│   ├── logo-placeholder.svg — Circular "EX" logo placeholder
│   ├── miembros/           — Player photos directory
│   └── galeria/            — Event photos directory
└── .env.example            — EmailJS config reference
```

---

### Task 1: Project scaffolding and base HTML

**Files:**
- Create: `ex-estudiantes/index.html`
- Create: `ex-estudiantes/.env.example`
- Create: `ex-estudiantes/img/logo-placeholder.svg`

- [ ] **Step 1: Create project directory structure**

```bash
mkdir -p ../ex-estudiantes/{css,js,data,img/miembros,img/galeria}
```

- [ ] **Step 2: Create the SVG logo placeholder**

Create `ex-estudiantes/img/logo-placeholder.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="48" fill="#c9a84c" stroke="#0f2444" stroke-width="2"/>
  <text x="50" y="56" text-anchor="middle" font-family="Arial, sans-serif" font-size="32" font-weight="700" fill="#0f2444">EX</text>
</svg>
```

- [ ] **Step 3: Create the .env.example**

Create `ex-estudiantes/.env.example`:

```
# EmailJS — https://www.emailjs.com/
# 1. Crea cuenta gratuita en EmailJS
# 2. Añade un servicio de email (Gmail, Outlook, etc.)
# 3. Crea una plantilla con variables: {{equipo}}, {{contacto}}, {{email}}, {{fecha}}, {{mensaje}}
# 4. Copia los IDs aquí

EMAILJS_PUBLIC_KEY=tu_public_key_aqui
EMAILJS_SERVICE_ID=tu_service_id_aqui
EMAILJS_TEMPLATE_ID=tu_template_id_aqui
```

- [ ] **Step 4: Create the base index.html**

Create `ex-estudiantes/index.html`:

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ex-Estudiantes — Veteranos del Club Baloncesto Estudiantes</title>
  <meta name="description" content="Página oficial de Ex-Estudiantes, el grupo de veteranos del Club Baloncesto Estudiantes de Madrid.">
  <link rel="icon" href="img/logo-placeholder.svg" type="image/svg+xml">
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>

  <!-- NAV -->
  <nav class="nav" id="nav">
    <div class="nav__inner">
      <a href="#inicio" class="nav__brand">
        <img src="img/logo-placeholder.svg" alt="Ex-Estudiantes logo" class="nav__logo">
        <span class="nav__name">Ex-Estudiantes</span>
      </a>
      <button class="nav__toggle" id="nav-toggle" aria-label="Abrir menú" aria-expanded="false">
        <span class="nav__toggle-bar"></span>
        <span class="nav__toggle-bar"></span>
        <span class="nav__toggle-bar"></span>
      </button>
      <ul class="nav__links" id="nav-links">
        <li><a href="#inicio" class="nav__link nav__link--active">Inicio</a></li>
        <li><a href="#quienes-somos" class="nav__link">Quiénes Somos</a></li>
        <li><a href="#plantilla" class="nav__link">Plantilla</a></li>
        <li><a href="#galeria" class="nav__link">Galería</a></li>
        <li><a href="#tablon" class="nav__link">Tablón</a></li>
        <li><a href="#retanos" class="nav__link">Retanos</a></li>
      </ul>
    </div>
  </nav>

  <!-- HERO -->
  <section class="hero" id="inicio">
    <img src="img/logo-placeholder.svg" alt="Ex-Estudiantes" class="hero__logo">
    <h1 class="hero__title">Ex-Estudiantes</h1>
    <p class="hero__subtitle">Veteranos del Club Baloncesto Estudiantes</p>
    <p class="hero__meta">Madrid</p>
  </section>

  <!-- QUIÉNES SOMOS -->
  <section class="section quienes-somos" id="quienes-somos">
    <div class="section__inner">
      <h2 class="section__title">Quiénes Somos</h2>
      <div class="quienes-somos__text">
        <p>Somos Ex-Estudiantes, un grupo de veteranos unidos por nuestra pasión por el baloncesto y nuestra historia en el Club Baloncesto Estudiantes de Madrid.</p>
        <p>Después de años defendiendo los colores del club, seguimos en la cancha. Porque el baloncesto no se deja, solo cambia de ritmo.</p>
      </div>
    </div>
  </section>

  <!-- PLANTILLA -->
  <section class="section plantilla" id="plantilla">
    <div class="section__inner">
      <h2 class="section__title">Plantilla</h2>
      <div class="plantilla__grid" id="plantilla-grid">
        <!-- Rendered by miembros.js -->
      </div>
    </div>
  </section>

  <!-- GALERÍA -->
  <section class="section galeria" id="galeria">
    <div class="section__inner">
      <h2 class="section__title">Galería</h2>
      <div class="galeria__grid" id="galeria-grid">
        <!-- Rendered by galeria.js -->
      </div>
    </div>
  </section>

  <!-- TABLÓN -->
  <section class="section tablon" id="tablon">
    <div class="section__inner">
      <h2 class="section__title">Tablón de Anuncios</h2>
      <div class="tablon__list" id="tablon-list">
        <!-- Rendered by anuncios.js -->
      </div>
    </div>
  </section>

  <!-- RETANOS -->
  <section class="section retanos" id="retanos">
    <div class="section__inner">
      <h2 class="section__title">¡Retanos!</h2>
      <p class="retanos__intro">¿Tenéis un equipo de veteranos y queréis echar un partido? Rellenad el formulario y os contactamos.</p>
      <form class="retanos__form" id="retanos-form">
        <div class="form__group">
          <label for="equipo" class="form__label">Nombre del equipo *</label>
          <input type="text" id="equipo" name="equipo" class="form__input" required>
        </div>
        <div class="form__group">
          <label for="contacto" class="form__label">Persona de contacto *</label>
          <input type="text" id="contacto" name="contacto" class="form__input" required>
        </div>
        <div class="form__group">
          <label for="email" class="form__label">Email *</label>
          <input type="email" id="email" name="email" class="form__input" required>
        </div>
        <div class="form__group">
          <label for="fecha" class="form__label">Fecha propuesta</label>
          <input type="date" id="fecha" name="fecha" class="form__input">
        </div>
        <div class="form__group">
          <label for="mensaje" class="form__label">Mensaje</label>
          <textarea id="mensaje" name="mensaje" class="form__input form__textarea" rows="4"></textarea>
        </div>
        <button type="submit" class="form__submit" id="form-submit">Enviar Reto</button>
        <div class="form__feedback" id="form-feedback"></div>
      </form>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="footer">
    <div class="footer__inner">
      <div class="footer__brand">Ex-Estudiantes</div>
      <p class="footer__text">Veteranos del Club Baloncesto Estudiantes · Madrid</p>
      <div class="footer__links">
        <a href="mailto:contacto@exestudiantes.es" class="footer__link">Email</a>
        <a href="#" class="footer__link" target="_blank" rel="noopener">Instagram</a>
      </div>
    </div>
  </footer>

  <script type="module" src="js/app.js"></script>
</body>
</html>
```

- [ ] **Step 5: Verify the HTML loads in a browser**

```bash
cd ../ex-estudiantes && python3 -m http.server 8080
```

Open `http://localhost:8080` — should see unstyled but structured content with all sections. Stop the server after checking.

- [ ] **Step 6: Commit**

```bash
git init
git add index.html .env.example img/logo-placeholder.svg
git commit -m "feat: project scaffolding with base HTML structure"
```

---

### Task 2: CSS — Variables, reset, and layout

**Files:**
- Create: `ex-estudiantes/css/styles.css`

- [ ] **Step 1: Create styles.css with custom properties and reset**

Create `ex-estudiantes/css/styles.css`:

```css
:root {
  --color-primary: #1a3a6b;
  --color-bg-dark: #0f2444;
  --color-bg-deep: #0d1b2e;
  --color-accent: #c9a84c;
  --color-text: #ffffff;
  --color-text-secondary: #8899b0;
  --color-bg-light: #f5f0e6;
  --color-surface: rgba(255, 255, 255, 0.04);
  --color-surface-hover: rgba(255, 255, 255, 0.08);
  --color-border: rgba(255, 255, 255, 0.05);
  --color-active: #44aa88;
  --color-inactive: #888888;

  --nav-height: 64px;
  --section-padding: 80px 24px;
  --max-width: 1100px;
  --radius: 8px;
  --radius-sm: 6px;

  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: var(--nav-height);
}

body {
  font-family: var(--font-family);
  background: var(--color-bg-deep);
  color: var(--color-text);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

img {
  max-width: 100%;
  display: block;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

button {
  cursor: pointer;
  border: none;
  background: none;
  font: inherit;
  color: inherit;
}

input,
textarea {
  font: inherit;
  color: inherit;
}
```

- [ ] **Step 2: Add nav styles**

Append to `ex-estudiantes/css/styles.css`:

```css
/* ── Nav ── */

.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: var(--color-primary);
  border-bottom: 2px solid var(--color-accent);
  height: var(--nav-height);
}

.nav__inner {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 24px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav__brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.nav__logo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.nav__name {
  font-weight: 700;
  font-size: 1.1rem;
}

.nav__links {
  display: flex;
  gap: 24px;
}

.nav__link {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  transition: color 0.2s;
}

.nav__link:hover,
.nav__link--active {
  color: var(--color-accent);
}

.nav__toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: 4px;
}

.nav__toggle-bar {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--color-text);
  border-radius: 2px;
  transition: transform 0.3s, opacity 0.3s;
}
```

- [ ] **Step 3: Add hero styles**

Append to `ex-estudiantes/css/styles.css`:

```css
/* ── Hero ── */

.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 70vh;
  padding: 120px 24px 80px;
  background: linear-gradient(135deg, var(--color-bg-dark) 0%, var(--color-primary) 100%);
  border-bottom: 1px solid rgba(201, 168, 76, 0.2);
}

.hero__logo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 24px;
}

.hero__title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.hero__subtitle {
  color: var(--color-accent);
  font-size: 1rem;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.hero__meta {
  color: var(--color-text-secondary);
  font-size: 0.85rem;
  margin-top: 12px;
}
```

- [ ] **Step 4: Add section base styles**

Append to `ex-estudiantes/css/styles.css`:

```css
/* ── Sections ── */

.section {
  padding: var(--section-padding);
  border-bottom: 1px solid var(--color-border);
}

.section__inner {
  max-width: var(--max-width);
  margin: 0 auto;
}

.section__title {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 32px;
  position: relative;
  padding-bottom: 12px;
}

.section__title::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60px;
  height: 3px;
  background: var(--color-accent);
  border-radius: 2px;
}
```

- [ ] **Step 5: Add Quiénes Somos styles**

Append to `ex-estudiantes/css/styles.css`:

```css
/* ── Quiénes Somos ── */

.quienes-somos__text {
  max-width: 720px;
  color: var(--color-text-secondary);
  font-size: 1.05rem;
  line-height: 1.8;
}

.quienes-somos__text p + p {
  margin-top: 16px;
}
```

- [ ] **Step 6: Add Plantilla (roster) styles**

Append to `ex-estudiantes/css/styles.css`:

```css
/* ── Plantilla ── */

.plantilla__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.jugador {
  background: var(--color-surface);
  border-radius: var(--radius);
  padding: 24px 16px;
  text-align: center;
  transition: background 0.2s;
}

.jugador:hover {
  background: var(--color-surface-hover);
}

.jugador__foto {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 0 auto 12px;
  object-fit: cover;
  border: 3px solid var(--color-accent);
  background: var(--color-primary);
}

.jugador--inactivo .jugador__foto {
  border-color: var(--color-inactive);
  opacity: 0.7;
}

.jugador__nombre {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 4px;
}

.jugador__info {
  color: var(--color-accent);
  font-size: 0.8rem;
}

.jugador--inactivo .jugador__info {
  color: var(--color-text-secondary);
}

.jugador__estado {
  font-size: 0.75rem;
  margin-top: 8px;
}

.jugador__estado--activo {
  color: var(--color-active);
}

.jugador__estado--inactivo {
  color: var(--color-inactive);
}
```

- [ ] **Step 7: Add Galería styles**

Append to `ex-estudiantes/css/styles.css`:

```css
/* ── Galería ── */

.galeria__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.galeria__item {
  border-radius: var(--radius-sm);
  overflow: hidden;
  aspect-ratio: 4 / 3;
  background: var(--color-primary);
  position: relative;
  cursor: pointer;
}

.galeria__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.galeria__item:hover .galeria__img {
  transform: scale(1.05);
}

.galeria__caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 12px;
  background: linear-gradient(transparent, rgba(15, 36, 68, 0.9));
  font-size: 0.8rem;
}

.galeria__caption-title {
  font-weight: 600;
}

.galeria__caption-date {
  color: var(--color-text-secondary);
  font-size: 0.7rem;
}

.galeria__placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-secondary);
  font-size: 0.85rem;
}
```

- [ ] **Step 8: Add Tablón styles**

Append to `ex-estudiantes/css/styles.css`:

```css
/* ── Tablón ── */

.tablon__list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 720px;
}

.anuncio {
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  padding: 16px 20px;
  border-left: 3px solid var(--color-text-secondary);
  background: var(--color-surface);
}

.anuncio--evento {
  border-left-color: var(--color-accent);
  background: rgba(201, 168, 76, 0.08);
}

.anuncio__tipo {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--color-text-secondary);
  margin-bottom: 4px;
}

.anuncio--evento .anuncio__tipo {
  color: var(--color-accent);
}

.anuncio__titulo {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 4px;
}

.anuncio__detalle {
  color: var(--color-text-secondary);
  font-size: 0.85rem;
}
```

- [ ] **Step 9: Add Retanos form styles**

Append to `ex-estudiantes/css/styles.css`:

```css
/* ── Retanos ── */

.retanos__intro {
  color: var(--color-text-secondary);
  margin-bottom: 32px;
  max-width: 600px;
}

.retanos__form {
  max-width: 560px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form__group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form__label {
  font-size: 0.85rem;
  color: var(--color-text-secondary);
}

.form__input {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: 12px 16px;
  color: var(--color-text);
  transition: border-color 0.2s;
}

.form__input:focus {
  outline: none;
  border-color: var(--color-accent);
}

.form__textarea {
  resize: vertical;
  min-height: 100px;
}

.form__submit {
  background: var(--color-accent);
  color: var(--color-bg-dark);
  font-weight: 700;
  padding: 14px;
  border-radius: var(--radius-sm);
  font-size: 1rem;
  transition: opacity 0.2s;
}

.form__submit:hover {
  opacity: 0.9;
}

.form__submit:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.form__feedback {
  font-size: 0.9rem;
  min-height: 1.4em;
}

.form__feedback--success {
  color: var(--color-active);
}

.form__feedback--error {
  color: #e05555;
}
```

- [ ] **Step 10: Add footer styles**

Append to `ex-estudiantes/css/styles.css`:

```css
/* ── Footer ── */

.footer {
  padding: 40px 24px;
  background: #0a1628;
  border-top: 1px solid rgba(201, 168, 76, 0.15);
  text-align: center;
}

.footer__inner {
  max-width: var(--max-width);
  margin: 0 auto;
}

.footer__brand {
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--color-accent);
}

.footer__text {
  color: var(--color-text-secondary);
  font-size: 0.85rem;
  margin-top: 4px;
}

.footer__links {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 16px;
}

.footer__link {
  color: var(--color-text-secondary);
  font-size: 0.85rem;
  transition: color 0.2s;
}

.footer__link:hover {
  color: var(--color-accent);
}
```

- [ ] **Step 11: Add responsive styles**

Append to `ex-estudiantes/css/styles.css`:

```css
/* ── Responsive ── */

@media (max-width: 768px) {
  .nav__toggle {
    display: flex;
  }

  .nav__links {
    display: none;
    position: absolute;
    top: var(--nav-height);
    left: 0;
    right: 0;
    background: var(--color-primary);
    flex-direction: column;
    padding: 16px 24px;
    gap: 16px;
    border-bottom: 2px solid var(--color-accent);
  }

  .nav__links--open {
    display: flex;
  }

  .hero__title {
    font-size: 1.8rem;
  }

  .hero__logo {
    width: 72px;
    height: 72px;
  }

  .plantilla__grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  .galeria__grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }
}

@media (max-width: 480px) {
  :root {
    --section-padding: 56px 16px;
  }

  .plantilla__grid {
    grid-template-columns: 1fr;
  }

  .galeria__grid {
    grid-template-columns: 1fr;
  }

  .section__title {
    font-size: 1.4rem;
  }
}
```

- [ ] **Step 12: Verify styled page in browser**

```bash
cd ../ex-estudiantes && python3 -m http.server 8080
```

Open `http://localhost:8080` — should see the full styled page with dark blue/gold theme, nav, hero, all sections, and footer. Responsive at different widths.

- [ ] **Step 13: Commit**

```bash
git add css/styles.css
git commit -m "feat: complete CSS with theme, layout, components, and responsive"
```

---

### Task 3: JSON data files with sample content

**Files:**
- Create: `ex-estudiantes/data/miembros.json`
- Create: `ex-estudiantes/data/anuncios.json`
- Create: `ex-estudiantes/data/galeria.json`

- [ ] **Step 1: Create miembros.json**

Create `ex-estudiantes/data/miembros.json`:

```json
[
  {
    "nombre": "Carlos García",
    "foto": "img/miembros/carlos-garcia.jpg",
    "posicion": "Base",
    "dorsal": 4,
    "activo": true
  },
  {
    "nombre": "Miguel Fernández",
    "foto": "img/miembros/miguel-fernandez.jpg",
    "posicion": "Escolta",
    "dorsal": 7,
    "activo": true
  },
  {
    "nombre": "Javier López",
    "foto": "img/miembros/javier-lopez.jpg",
    "posicion": "Alero",
    "dorsal": 11,
    "activo": true
  },
  {
    "nombre": "David Martín",
    "foto": "img/miembros/david-martin.jpg",
    "posicion": "Ala-Pívot",
    "dorsal": 14,
    "activo": false
  },
  {
    "nombre": "Roberto Sánchez",
    "foto": "img/miembros/roberto-sanchez.jpg",
    "posicion": "Pívot",
    "dorsal": 15,
    "activo": true
  },
  {
    "nombre": "Andrés Ruiz",
    "foto": "img/miembros/andres-ruiz.jpg",
    "posicion": "Base",
    "dorsal": 23,
    "activo": true
  },
  {
    "nombre": "Pablo Torres",
    "foto": "img/miembros/pablo-torres.jpg",
    "posicion": "Escolta",
    "dorsal": 8,
    "activo": false
  },
  {
    "nombre": "Luis Navarro",
    "foto": "img/miembros/luis-navarro.jpg",
    "posicion": "Alero",
    "dorsal": 9,
    "activo": true
  }
]
```

- [ ] **Step 2: Create anuncios.json**

Create `ex-estudiantes/data/anuncios.json`:

```json
[
  {
    "tipo": "evento",
    "titulo": "Partido amistoso vs Veteranos Getafe",
    "descripcion": "Nos enfrentamos a los veteranos del Getafe Basket en un partido amistoso.",
    "fecha": "2026-05-15",
    "hora": "20:00",
    "lugar": "Polideportivo Magariños"
  },
  {
    "tipo": "noticia",
    "titulo": "Nuevas equipaciones disponibles",
    "descripcion": "Ya podéis recoger las camisetas de esta temporada. Contactad con Carlos para más info.",
    "fecha": "2026-05-02"
  },
  {
    "tipo": "evento",
    "titulo": "Torneo de Veteranos de Madrid",
    "descripcion": "Participamos en el torneo anual de equipos veteranos de la Comunidad de Madrid.",
    "fecha": "2026-06-10",
    "hora": "10:00",
    "lugar": "Pabellón Municipal de Alcobendas"
  },
  {
    "tipo": "noticia",
    "titulo": "Bienvenidos a la nueva web",
    "descripcion": "Estrenamos página web para que podáis seguir toda la actualidad de Ex-Estudiantes.",
    "fecha": "2026-04-28"
  }
]
```

- [ ] **Step 3: Create galeria.json**

Create `ex-estudiantes/data/galeria.json`:

```json
[
  {
    "titulo": "Torneo Veteranos 2025",
    "fecha": "2025-12-15",
    "fotos": [
      "img/galeria/torneo-2025-01.jpg",
      "img/galeria/torneo-2025-02.jpg",
      "img/galeria/torneo-2025-03.jpg"
    ]
  },
  {
    "titulo": "Cena de Navidad 2025",
    "fecha": "2025-12-20",
    "fotos": [
      "img/galeria/cena-navidad-2025-01.jpg",
      "img/galeria/cena-navidad-2025-02.jpg"
    ]
  },
  {
    "titulo": "Partido vs Antiguos Alumnos",
    "fecha": "2025-10-05",
    "fotos": [
      "img/galeria/partido-alumni-01.jpg",
      "img/galeria/partido-alumni-02.jpg",
      "img/galeria/partido-alumni-03.jpg"
    ]
  }
]
```

- [ ] **Step 4: Commit**

```bash
git add data/
git commit -m "feat: add sample JSON data for miembros, anuncios, and galeria"
```

---

### Task 4: JavaScript — Navigation and scroll behavior (app.js)

**Files:**
- Create: `ex-estudiantes/js/app.js`

- [ ] **Step 1: Create app.js with mobile menu and scroll observer**

Create `ex-estudiantes/js/app.js`:

```javascript
import { renderMiembros } from "./miembros.js";
import { renderAnuncios } from "./anuncios.js";
import { renderGaleria } from "./galeria.js";
import { initFormulario } from "./formulario.js";

function initNav() {
  const toggle = document.getElementById("nav-toggle");
  const links = document.getElementById("nav-links");

  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("nav__links--open");
    toggle.setAttribute("aria-expanded", open);
  });

  links.addEventListener("click", (e) => {
    if (e.target.classList.contains("nav__link")) {
      links.classList.remove("nav__links--open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

function initScrollObserver() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav__link");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach((link) => {
            link.classList.toggle(
              "nav__link--active",
              link.getAttribute("href") === `#${id}`
            );
          });
        }
      });
    },
    { rootMargin: "-40% 0px -60% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
}

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initScrollObserver();
  renderMiembros();
  renderAnuncios();
  renderGaleria();
  initFormulario();
});
```

- [ ] **Step 2: Verify nav toggles on mobile and scroll highlights active link**

```bash
cd ../ex-estudiantes && python3 -m http.server 8080
```

Open `http://localhost:8080` — resize browser to mobile width, verify hamburger menu opens/closes. Scroll through sections, verify active link changes in nav. Console will show errors for missing JS modules — that's expected, they're in the next tasks.

- [ ] **Step 3: Commit**

```bash
git add js/app.js
git commit -m "feat: add app.js with nav toggle and scroll observer"
```

---

### Task 5: JavaScript — Miembros renderer (miembros.js)

**Files:**
- Create: `ex-estudiantes/js/miembros.js`

- [ ] **Step 1: Create miembros.js**

Create `ex-estudiantes/js/miembros.js`:

```javascript
export async function renderMiembros() {
  const grid = document.getElementById("plantilla-grid");
  if (!grid) return;

  try {
    const res = await fetch("data/miembros.json");
    const miembros = await res.json();

    grid.innerHTML = miembros
      .map(
        (m) => `
      <div class="jugador ${m.activo ? "" : "jugador--inactivo"}">
        <img
          src="${m.foto}"
          alt="${m.nombre}"
          class="jugador__foto"
          onerror="this.style.display='none'"
        >
        <div class="jugador__nombre">${m.nombre}</div>
        <div class="jugador__info">${m.posicion} · #${m.dorsal}</div>
        <div class="jugador__estado ${m.activo ? "jugador__estado--activo" : "jugador__estado--inactivo"}">
          ${m.activo ? "● Activo" : "○ Inactivo"}
        </div>
      </div>
    `
      )
      .join("");
  } catch (e) {
    grid.innerHTML =
      '<p style="color:var(--color-text-secondary)">No se pudo cargar la plantilla.</p>';
  }
}
```

- [ ] **Step 2: Verify player cards render**

```bash
cd ../ex-estudiantes && python3 -m http.server 8080
```

Open `http://localhost:8080` — scroll to Plantilla section. Should see 8 player cards in a grid (4 columns on desktop). Photos won't load (no image files yet) but names, positions, dorsals, and active/inactive states should render correctly.

- [ ] **Step 3: Commit**

```bash
git add js/miembros.js
git commit -m "feat: add miembros.js to render player roster from JSON"
```

---

### Task 6: JavaScript — Anuncios renderer (anuncios.js)

**Files:**
- Create: `ex-estudiantes/js/anuncios.js`

- [ ] **Step 1: Create anuncios.js**

Create `ex-estudiantes/js/anuncios.js`:

```javascript
function formatDate(dateStr) {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export async function renderAnuncios() {
  const list = document.getElementById("tablon-list");
  if (!list) return;

  try {
    const res = await fetch("data/anuncios.json");
    const anuncios = await res.json();

    const sorted = anuncios.sort(
      (a, b) => new Date(b.fecha) - new Date(a.fecha)
    );

    list.innerHTML = sorted
      .map((a) => {
        const isEvento = a.tipo === "evento";
        const tipoLabel = isEvento
          ? `Próximo evento · ${formatDate(a.fecha)}`
          : `Noticia · ${formatDate(a.fecha)}`;
        const detalle = isEvento
          ? `${a.lugar} · ${a.hora}h`
          : a.descripcion;

        return `
        <div class="anuncio ${isEvento ? "anuncio--evento" : ""}">
          <div class="anuncio__tipo">${tipoLabel}</div>
          <div class="anuncio__titulo">${a.titulo}</div>
          <div class="anuncio__detalle">${detalle}</div>
        </div>
      `;
      })
      .join("");
  } catch (e) {
    list.innerHTML =
      '<p style="color:var(--color-text-secondary)">No se pudieron cargar los anuncios.</p>';
  }
}
```

- [ ] **Step 2: Verify announcements render**

```bash
cd ../ex-estudiantes && python3 -m http.server 8080
```

Open `http://localhost:8080` — scroll to Tablón section. Should see 4 announcements sorted by date (newest first). Events have gold left border and show location/time. News have grey border and show description.

- [ ] **Step 3: Commit**

```bash
git add js/anuncios.js
git commit -m "feat: add anuncios.js to render announcements from JSON"
```

---

### Task 7: JavaScript — Galería renderer (galeria.js)

**Files:**
- Create: `ex-estudiantes/js/galeria.js`

- [ ] **Step 1: Create galeria.js**

Create `ex-estudiantes/js/galeria.js`:

```javascript
function isExternal(url) {
  return url.startsWith("http://") || url.startsWith("https://");
}

export async function renderGaleria() {
  const grid = document.getElementById("galeria-grid");
  if (!grid) return;

  try {
    const res = await fetch("data/galeria.json");
    const eventos = await res.json();

    const sorted = eventos.sort(
      (a, b) => new Date(b.fecha) - new Date(a.fecha)
    );

    grid.innerHTML = sorted
      .flatMap((evento) =>
        evento.fotos.map(
          (foto, i) => `
        <div class="galeria__item" ${isExternal(foto) ? `data-external="${foto}"` : ""}>
          ${
            isExternal(foto)
              ? `<div class="galeria__placeholder">📷 Ver en enlace externo</div>`
              : `<img src="${foto}" alt="${evento.titulo}" class="galeria__img" onerror="this.parentElement.innerHTML='<div class=galeria__placeholder>📷</div>'">`
          }
          <div class="galeria__caption">
            <div class="galeria__caption-title">${evento.titulo}${evento.fotos.length > 1 ? ` (${i + 1}/${evento.fotos.length})` : ""}</div>
            <div class="galeria__caption-date">${new Date(evento.fecha + "T00:00:00").toLocaleDateString("es-ES", { month: "long", year: "numeric" })}</div>
          </div>
        </div>
      `
        )
      )
      .join("");

    grid.addEventListener("click", (e) => {
      const item = e.target.closest("[data-external]");
      if (item) window.open(item.dataset.external, "_blank", "noopener");
    });
  } catch (e) {
    grid.innerHTML =
      '<p style="color:var(--color-text-secondary)">No se pudo cargar la galería.</p>';
  }
}
```

- [ ] **Step 2: Verify gallery renders**

```bash
cd ../ex-estudiantes && python3 -m http.server 8080
```

Open `http://localhost:8080` — scroll to Galería section. Should see a grid of 8 items (photos won't load but placeholders and captions with event titles and dates should display).

- [ ] **Step 3: Commit**

```bash
git add js/galeria.js
git commit -m "feat: add galeria.js to render photo gallery from JSON"
```

---

### Task 8: JavaScript — Formulario with EmailJS (formulario.js)

**Files:**
- Create: `ex-estudiantes/js/formulario.js`

- [ ] **Step 1: Create formulario.js**

Create `ex-estudiantes/js/formulario.js`:

```javascript
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";

function loadEmailJS() {
  return new Promise((resolve, reject) => {
    if (window.emailjs) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
    script.onload = () => {
      window.emailjs.init(EMAILJS_PUBLIC_KEY);
      resolve();
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

function showFeedback(el, message, isError) {
  el.textContent = message;
  el.className = `form__feedback ${isError ? "form__feedback--error" : "form__feedback--success"}`;
}

export function initFormulario() {
  const form = document.getElementById("retanos-form");
  const feedback = document.getElementById("form-feedback");
  const submitBtn = document.getElementById("form-submit");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    feedback.textContent = "";
    submitBtn.disabled = true;
    submitBtn.textContent = "Enviando...";

    try {
      await loadEmailJS();
      await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        equipo: form.equipo.value,
        contacto: form.contacto.value,
        email: form.email.value,
        fecha: form.fecha.value || "No especificada",
        mensaje: form.mensaje.value || "Sin mensaje adicional",
      });

      showFeedback(feedback, "¡Reto enviado! Os contactaremos pronto.", false);
      form.reset();
    } catch (err) {
      showFeedback(
        feedback,
        "Error al enviar. Intentadlo de nuevo o escribidnos directamente por email.",
        true
      );
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Enviar Reto";
    }
  });
}
```

- [ ] **Step 2: Verify form validation works**

```bash
cd ../ex-estudiantes && python3 -m http.server 8080
```

Open `http://localhost:8080` — scroll to Retanos section. Try submitting empty form — browser validation should block it. Fill required fields and submit — will show error (EmailJS not configured yet), which is expected. Button should show "Enviando..." then return to normal.

- [ ] **Step 3: Commit**

```bash
git add js/formulario.js
git commit -m "feat: add formulario.js with EmailJS integration and validation"
```

---

### Task 9: Final integration and verification

**Files:**
- Verify: all files in `ex-estudiantes/`

- [ ] **Step 1: Verify complete file structure exists**

```bash
cd ../ex-estudiantes && find . -type f | sort
```

Expected output:
```
./.env.example
./css/styles.css
./data/anuncios.json
./data/galeria.json
./data/miembros.json
./img/logo-placeholder.svg
./index.html
./js/anuncios.js
./js/app.js
./js/formulario.js
./js/galeria.js
./js/miembros.js
```

- [ ] **Step 2: Full browser test**

```bash
cd ../ex-estudiantes && python3 -m http.server 8080
```

Verify all of the following at `http://localhost:8080`:

1. **Nav:** Fixed at top, all links scroll to correct sections, active link highlights on scroll
2. **Mobile nav:** Resize to mobile — hamburger appears, opens/closes menu, links close menu on click
3. **Hero:** Logo, title, subtitle, meta text centered
4. **Quiénes Somos:** Text paragraphs display correctly
5. **Plantilla:** 8 player cards in grid (4 cols desktop, 2 tablet, 1 mobile). Active/inactive states visible
6. **Galería:** Grid of photo items with captions. External links open in new tab
7. **Tablón:** 4 announcements sorted by date. Events have gold border, news have grey
8. **Retanos:** Form validates required fields. Submit shows loading state
9. **Footer:** Brand, description, links display
10. **Responsive:** Check at 1200px, 768px, and 480px widths

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "feat: Ex-Estudiantes website — complete initial version"
```
