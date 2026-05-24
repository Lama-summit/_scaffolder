# Ex-Estudiantes — Spec de diseño

## Qué es

Web estática para **Ex-Estudiantes**, el grupo de veteranos del Club Baloncesto Estudiantes de Madrid. Página informativa y de contacto donde se presenta al grupo, se muestra la plantilla de jugadores, la galería de eventos, el tablón de anuncios y un formulario para que otros equipos les reten a partidos amistosos.

## Público objetivo

- Otros equipos de veteranos que quieran retar a un partido
- Aficionados y ex-compañeros que quieran saber del grupo
- Los propios miembros como referencia

## Stack técnico

- **HTML5 / CSS3 / JavaScript vanilla** — sin frameworks ni dependencias
- **EmailJS** — para el envío del formulario de reto por email (gratuito, sin backend)
- **Ejecución local** — de momento sin despliegue; se abre directamente en el navegador o con un servidor local (Live Server, http-server, etc.)

## Identidad visual

- **Paleta:** Azul Nocturno + Dorado
  - Primario: `#1a3a6b` (azul nocturno)
  - Fondo oscuro: `#0f2444`
  - Fondo profundo: `#0d1b2e`
  - Acento: `#c9a84c` (dorado)
  - Texto claro: `#ffffff`
  - Texto secundario: `#8899b0`
  - Fondo claro (contraste): `#f5f0e6`
- **Espíritu:** Conexión con Estudiantes pero con personalidad propia. Transmite veteranía, prestigio y tradición sin ser corporativo.
- **Logo:** Hay que diseñarlo como variación del logo de Estudiantes. Mientras tanto se usa un placeholder circular con "EX".

## Estructura de la web

Single-page con scroll suave y navegación fija. 6 secciones en este orden:

### 1. Hero / Cabecera
- Logo de Ex-Estudiantes (placeholder inicial)
- Nombre "Ex-Estudiantes"
- Subtítulo: "Veteranos del Club Baloncesto Estudiantes"
- Referencia a Madrid y año de fundación

### 2. Quiénes Somos
- Texto descriptivo del grupo: historia, filosofía, conexión con Estudiantes
- Por qué siguen jugando, cuántos años llevan

### 3. Plantilla
- Grid de tarjetas de jugadores
- Cada tarjeta muestra: foto, nombre, posición, dorsal, estado (activo/inactivo)
- Los activos se distinguen visualmente de los inactivos (borde dorado vs gris, indicador de color)
- Datos leídos desde `data/miembros.json`

### 4. Galería de Eventos
- Grid de fotos de eventos pasados
- Imágenes locales (carpeta `img/galeria/`) y enlaces externos (Instagram, Google Photos)
- Cada evento tiene: título, fecha, conjunto de fotos
- Datos leídos desde `data/galeria.json`

### 5. Tablón de Anuncios
- Lista cronológica de anuncios (los más recientes primero)
- Dos tipos diferenciados visualmente:
  - **Eventos próximos:** borde dorado, icono de calendario, incluyen fecha, hora y lugar
  - **Noticias generales:** borde gris, texto libre
- Datos leídos desde `data/anuncios.json`

### 6. ¡Retanos! (Formulario)
- Formulario de contacto para retar a un partido
- Campos: nombre del equipo, persona de contacto, email, fecha propuesta, mensaje/comentarios
- Envío vía EmailJS al email del responsable del equipo
- Validación básica de campos en el cliente
- Feedback visual de envío (éxito/error)

### Footer
- Nombre y descripción del grupo
- Enlaces a redes sociales (Instagram, email)

## Navegación

- Barra fija en la parte superior
- Logo + nombre a la izquierda
- Links a cada sección a la derecha: Inicio, Quiénes Somos, Plantilla, Galería, Tablón, Retanos
- Scroll suave al hacer clic en cada link
- Link activo resaltado en dorado según la sección visible
- Menú hamburguesa en móvil

## Arquitectura de datos

Tres archivos JSON en `data/`:

### `data/miembros.json`
```json
[
  {
    "nombre": "Nombre Apellido",
    "foto": "img/miembros/nombre.jpg",
    "posicion": "Base",
    "dorsal": 4,
    "activo": true
  }
]
```

### `data/anuncios.json`
```json
[
  {
    "tipo": "evento",
    "titulo": "Partido amistoso vs Veteranos Getafe",
    "descripcion": "Polideportivo Magariños",
    "fecha": "2026-05-15",
    "hora": "20:00",
    "lugar": "Polideportivo Magariños"
  },
  {
    "tipo": "noticia",
    "titulo": "Nuevas equipaciones disponibles",
    "descripcion": "Ya podéis recoger las camisetas de esta temporada...",
    "fecha": "2026-05-02"
  }
]
```

### `data/galeria.json`
```json
[
  {
    "titulo": "Torneo Veteranos 2025",
    "fecha": "2025-12-15",
    "fotos": [
      "img/galeria/torneo-2025-01.jpg",
      "img/galeria/torneo-2025-02.jpg",
      "https://instagram.com/p/ejemplo"
    ]
  }
]
```

## Formulario de contacto (EmailJS)

- Servicio: EmailJS (plan gratuito: 200 emails/mes)
- Configuración: se necesita crear cuenta en EmailJS, configurar un servicio de email y una plantilla
- La clave pública de EmailJS va en `.env.example` como referencia
- El JS inicializa EmailJS y envía el formulario sin backend
- Campos obligatorios: nombre del equipo, persona de contacto, email
- Campos opcionales: fecha propuesta, mensaje

## Estructura de carpetas

```
ex-estudiantes/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── app.js          — inicialización, navegación, scroll suave
│   ├── miembros.js     — fetch y render de la plantilla
│   ├── anuncios.js     — fetch y render del tablón
│   ├── galeria.js      — fetch y render de la galería
│   └── formulario.js   — lógica de EmailJS y validación
├── data/
│   ├── miembros.json
│   ├── anuncios.json
│   └── galeria.json
├── img/
│   ├── logo.svg        — logo placeholder (después el definitivo)
│   ├── miembros/       — fotos de jugadores
│   └── galeria/        — fotos de eventos
└── .env.example        — EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID
```

## Responsive

- Desktop: layout completo con grid de 4 columnas para jugadores, 3 para galería
- Tablet: grid de 2 columnas
- Móvil: 1 columna, menú hamburguesa, tarjetas apiladas

## Qué NO incluye esta versión

- Login o registro de usuarios
- Panel de administración (el contenido se edita directamente en los JSON)
- Base de datos
- Hosting/despliegue (de momento local)
- Logo definitivo (se crea un placeholder y se sustituye después)
- Pasarela de pago
