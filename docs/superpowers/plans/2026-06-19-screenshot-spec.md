# Kaxa — Play Store Screenshot Spec (Canva)

> Production spec para 8 screenshots (1080×1920) + Feature Graphic (1024×500).
> Diseñar en Canva. Exportar como PNG.

---

## Dimensiones

| Asset | Resolución | Cantidad |
|-------|-----------|----------|
| Phone screenshots | 1080 × 1920 px | 8 |
| Feature Graphic | 1024 × 500 px | 1 |

En Canva: "Custom size" → 1080×1920 px. Crear las 8 como páginas en un mismo proyecto.

---

## Paleta de colores

| Rol | Color | Hex | Uso |
|-----|-------|-----|-----|
| Background principal | Off-white cálido | `#F8F9FF` | 5 slides |
| Background alterno | Crema suave | `#F0F4F1` | 2 slides |
| Background dark | Navy profundo | `#0B1C30` | 1 slide (slide 5) |
| Texto principal | Near-black | `#0B1C30` | Headlines en slides claros |
| Texto dark mode | Off-white | `#F8F9FF` | Headlines en slide 5 |
| Acento primario | Emerald | `#10B981` | Palabra emphasis en headlines |
| Acento profundo | Green oscuro | `#006C49` | Eyebrows, detalles |
| Muted | Gris verde | `#6C7A71` | Subtítulos |
| Gasto | Rojo suave | `#EF4444` | Chips de gasto |
| Ingreso | Emerald | `#10B981` | Chips de ingreso |

### Rotación de color por slide

```
Slide 1: #F8F9FF (light)
Slide 2: #F0F4F1 (crema)
Slide 3: #F8F9FF (light)
Slide 4: #F4F0FF (lavanda sutil — metas son aspiracionales)
Slide 5: #0B1C30 (DARK — ruptura visual)
Slide 6: #F0FDF4 (green tint sutil)
Slide 7: #FFF7ED (warm cream)
Slide 8: #F8F9FF (light — cierre limpio)
```

Nunca repetir el mismo bg en slides adyacentes.

---

## Tipografía

### Fuentes (disponibles en Canva)

| Rol | Fuente | Weight | Tamaño |
|-----|--------|--------|--------|
| Headlines | **Inter** (o Manrope) | Black (900) | 80-90px |
| Subtítulos | Inter | Regular (400) | 28-32px |
| Eyebrows | Inter | SemiBold (600) | 20-22px |
| Chips/pills | Inter | Bold (700) | 22-26px |

### Reglas tipográficas

- **Max 5 palabras por headline.** Si no cabe en 2 líneas → reescribir.
- **Line-height:** 0.90-0.95 (tight) para headlines.
- **Letter-spacing:** -2% en headlines (tight). +15% en eyebrows (tracked caps).
- **1 palabra de énfasis por slide** en `#10B981` (emerald). El resto en `#0B1C30`.
- **Nunca** usar negro puro `#000000` — siempre `#0B1C30`.
- **Regla del 20%:** El texto NO debe ocupar más del 20% del área de la imagen (regla de Google Play).
- **Test de thumbnail:** Si no se lee el headline a 160px de ancho → la fuente es muy pequeña.

### Headline con emphasis (cómo hacerlo en Canva)

Crear el headline como dos text boxes separados, o usar el mismo text box con color diferente en la palabra clave:

```
Tu [dinero],        ← "dinero" en #10B981
de un vistazo       ← en #0B1C30
```

---

## Layout del canvas (anatomía de un slide)

```
1080 × 1920 px
┌────────────────────────────────────────┐
│          ZONA SEGURA TOP (80px)        │ ← solo decoración
├────────────────────────────────────────┤
│                                        │
│    [Eyebrow]  ← 22px, caps, #006C49   │  y ≈ 100px
│                                        │
│    Headline aquí                       │  y ≈ 130-160px
│    en 2 líneas                         │  80-90px, Inter Black
│                                        │
│    Subtítulo opcional                  │  y ≈ 310px, 28px, #6C7A71
│                                        │
│    ┌──────────────────────────┐        │
│    │                          │        │
│    │                          │        │
│    │     DEVICE MOCKUP        │        │  ~840px ancho (~78% canvas)
│    │     (screenshot)         │        │  border-radius: 36px
│    │                          │        │  drop-shadow suave
│    │                          │        │
│    │                          │        │
│    └──────────────────────────┘        │
│                                        │
│         [Floating chips]               │  1-2 max por slide
│                                        │
├────────────────────────────────────────┤
│          ZONA SEGURA BOTTOM (80px)     │ ← solo decoración
└────────────────────────────────────────┘
```

### Device mockup

- **Ancho:** 840px (~78% del canvas). Nunca menos de 780px.
- **Border-radius:** 36px (esquinas redondeadas consistentes).
- **Sombra:** drop-shadow suave, 60px blur, 15% opacidad. MÁS fuerte en slide dark.
- **Posición:** centrado horizontalmente SIEMPRE.
- **Full-frame vs bleed:**
  - **Full-frame** (default): device completo visible, ~48px de espacio abajo.
  - **Bleed**: device sale del canvas por abajo (corta en línea recta, NUNCA por la curva del border-radius).

### Dos variantes de layout (alternar entre slides)

| Variante | Headline | Device | Mejor para |
|----------|----------|--------|-----------|
| **Headline arriba** | Top 35% | Bottom 65% | Hero, features |
| **Device arriba** | Bottom 20% | Top 80% | Presupuestos, recurrentes |

Nunca repetir la misma variante 2 veces seguidas.

---

## Técnica panorámica / continuidad

### Cómo funciona

Slides adyacentes comparten un fondo continuo. Al deslizar en Play Store, se crea ilusión de una sola imagen.

### Cómo hacerlo en Canva

1. Crear un fondo wide (2160×1920 — doble ancho).
2. Colocarlo en slide 1 y slide 2, cada uno mostrando la mitad.
3. O: hacer que un elemento (wave, gradiente, device) salga del borde derecho del slide 1 y entre por el izquierdo del slide 2.

### Reglas

- **Max 1 panorama** en el deck de 8. Recomendado entre slides 1-2 o slides 3-4.
- **Slide 1 SIEMPRE autosuficiente** — debe comunicar el valor completo sola (90% de usuarios no desliza).
- Alinear verticalmente pixel-perfect (2px de error se nota al deslizar).
- **No cortar** headlines, texto, precios, ni caras a través de la división.

### Técnica recomendada para Kaxa

- **Slides 1-2:** El device del slide 1 sale ~15% por el borde derecho. En slide 2 entra otro device por la izquierda. Fondo gradiente continuo.
- Esto crea curiosidad visual → invita a deslizar.

---

## Floating elements (chips, pills, badges)

### Tipos

| Tipo | Ejemplo | Estilo |
|------|---------|--------|
| **Stat chip** | "↑ 18K L" / "7,760 L" | Pill blanca, sombra suave, bold |
| **Category chip** | "🍔 Comida" | Pill blanca, emoji + texto |
| **Alert badge** | "⚠️ 80%" | Pill emerald/amber, texto blanco |
| **Feature pill** | "📊 8 monedas" | Pill con border, compact |

### Reglas

- **Max 2 chips por slide.** Más → desorden.
- Posicionar en esquinas o flanqueando el device.
- Sombra suave (8px blur, 8% opacidad).
- Border-radius: 20px (pill shape).
- Siempre ENCIMA del device (z-index superior).
- Números redondeados y aspiracionales.

---

## Logo y app icon

- **Slide 1 solamente:** App icon pequeño (56-64px) centrado arriba del headline.
- **No repetir** el icon en cada slide — se ve amateur.
- **Wordmark opcional** en el último slide como cierre.
- **Feature Graphic:** Icon + wordmark + tagline.

---

## Los 8 slides — spec detallado

### Slide 1 — HERO (Hook)
- **Layout:** Headline arriba + device abajo
- **Bg:** `#F8F9FF`
- **Eyebrow:** App icon (56px) centrado
- **Headline:** "Tu **dinero**, de un vistazo" (dinero en `#10B981`)
- **Device:** Home screen, full-frame, centrado
- **Screenshot:** `01-home-hero.png`
- **Extra:** Ninguno — limpio, el device es el héroe
- **Meta:** Comunicar "esta app es bella y útil" en 1 segundo

### Slide 2 — SPEED (Diferenciador)
- **Layout:** Headline arriba + device tilted (-3°)
- **Bg:** `#F0F4F1` (crema)
- **Eyebrow:** "RÁPIDO" en `#006C49`, tracked caps
- **Headline:** "Registra en **2 segundos**" (2 segundos en `#10B981`)
- **Sub:** "Dos toques. Sin formularios."
- **Device:** Agregar gasto, slight tilt
- **Screenshot:** `02-agregar-gasto.png`
- **Chips:** "🍔 Comida" (izq abajo) + "- 85 L" en rojo (der)
- **Meta:** Demostrar velocidad y simplicidad

### Slide 3 — BUDGETS (Feature A)
- **Layout:** Device arriba + headline abajo
- **Bg:** `#F8F9FF`
- **Headline:** "**Presupuestos** que te cuidan" (Presupuestos en `#10B981`)
- **Device:** Presupuestos screen, full-frame, arriba
- **Screenshot:** `03-presupuestos.png`
- **Chips:** Badge "⚠️ 80%" en amber floating sobre el device
- **Meta:** Mostrar la feature de alertas inteligentes

### Slide 4 — GOALS (Aspiracional)
- **Layout:** Headline arriba + device abajo
- **Bg:** `#F4F0FF` (lavanda sutil)
- **Eyebrow:** "METAS" en `#7C3AED`
- **Headline:** "Ahorra con **propósito**" (propósito en `#10B981`)
- **Sub:** "Crea metas y celebra cada avance."
- **Device:** Metas screen, full-frame
- **Screenshot:** `04-metas.png`
- **Meta:** Conexión emocional — la app te ayuda a soñar

### Slide 5 — DEBTS (Pain killer) ← DARK SLIDE
- **Layout:** Headline arriba + device tilted (2°)
- **Bg:** `#0B1C30` (navy dark) con gradiente a `#162A42`
- **Eyebrow:** "CONTROL TOTAL" en `#10B981`
- **Headline:** "**Deudas** bajo control" (Deudas en `#10B981`, resto en `#F8F9FF`)
- **Sub:** "Rastrea pagos y celebra al liquidar." en `rgba(248,249,255,0.6)`
- **Device:** Deudas screen, borde sutil `rgba(255,255,255,0.08)`
- **Screenshot:** `05-deudas.png`
- **Extra:** Glow sutil emerald detrás del device (radial gradient, 12% opacidad)
- **Meta:** Ruptura visual dramática — "este es el pain killer"

### Slide 6 — INSIGHTS (Prueba de inteligencia)
- **Layout:** Headline arriba + device abajo
- **Bg:** `#F0FDF4` (green tint sutil)
- **Eyebrow:** "RESUMEN" en `#006C49`
- **Headline:** "Entiende tus **números**" (números en `#10B981`)
- **Device:** Resumen screen (donut chart)
- **Screenshot:** `06-resumen.png`
- **Chips:** "↓ 13.4K gastos" en rojo (izq) + "↑ 18K ingresos" en verde (der)
- **Meta:** Demostrar inteligencia visual

### Slide 7 — RECURRING (Conveniencia)
- **Layout:** Device arriba + headline abajo
- **Bg:** `#FFF7ED` (warm cream)
- **Headline:** "Pagos que **no se olvidan**" (no se olvidan en `#10B981`)
- **Device:** Recurrentes screen, full-frame, arriba
- **Screenshot:** `07-recurrentes.png`
- **Meta:** Vender la automatización y tranquilidad

### Slide 8 — HISTORY (Cierre + trust)
- **Layout:** Headline arriba + device abajo
- **Bg:** `#F8F9FF`
- **Eyebrow:** "HISTORIAL" en `#006C49`
- **Headline:** "Cada **movimiento**, organizado" (movimiento en `#10B981`)
- **Sub:** "Filtra por día, categoría o bolsillo."
- **Device:** Historial screen
- **Screenshot:** `08-historial.png`
- **Feature pills (bottom):** Fila de 3 pills:
  - "📊 8 monedas"
  - "🔒 Biométrico"
  - "📱 Sin anuncios"
- **Meta:** Cerrar con completitud + features extra

---

## Feature Graphic (1024×500)

- **Bg:** Gradiente sutil `#F8F9FF` → `#E8F5F0`
- **Izquierda:** Icon (64px) + Wordmark "Kaxa" + Tagline "Tu caja en el bolsillo" + Sub "Finanzas personales simples."
- **Derecha:** Phone mockup con home screen, tilted -4°, sombra suave
- **Tipografía:** Headline 40px Inter Black, sub 18px Inter Regular

---

## Checklist pre-export

- [ ] Headlines legibles a 160px de ancho (thumbnail test)
- [ ] Texto < 20% del área de imagen (regla Google Play)
- [ ] Contraste 4.5:1 mínimo entre texto y fondo
- [ ] Ningún slide repite layout ni bg color del adyacente
- [ ] Slide 5 es dark — rompe el ritmo visual
- [ ] Max 2 floating chips por slide
- [ ] Device siempre ≥ 780px ancho (~72% canvas)
- [ ] Border-radius consistente (36px) en todos los devices
- [ ] Icon solo en slide 1
- [ ] Exportar como PNG, 1080×1920 exacto
- [ ] Feature Graphic 1024×500 exacto
- [ ] Sin marcas registradas, nombres de empresas, ni referencias a países

---

## En Canva — pasos rápidos

1. **Nuevo diseño** → Custom size → 1080×1920
2. **Crear 8 páginas** en el mismo proyecto
3. **Subir screenshots** (las 8 raw de `store-screenshots/`)
4. **Aplicar el spec** slide por slide
5. **Device mockup:** Usar frame de Canva ("Phone mockup") o importar un frame PNG transparente
6. **Exportar:** Download → PNG → All pages
7. **Feature Graphic:** Nuevo diseño → 1024×500 → diseñar aparte
