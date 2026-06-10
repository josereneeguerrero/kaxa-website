# Kaxa — Sitio Web (Landing + Legales)

**Fecha:** 2026-06-10
**Estado:** Aprobado
**Versión:** 1.0

---

## 1. Objetivo

Sitio web profesional para Kaxa (app de finanzas personales para Honduras, ya disponible en Google Play) que:

- Presenta la app y dirige a los usuarios a las tiendas (Google Play / App Store)
- Aloja las páginas legales obligatorias (Privacidad, Términos)
- Sienta una base orientada a SEO (meta tags, sitemap, estructura preparada para blog futuro — fuera de alcance v1)

**Inspiración:** [get-monai.app](https://get-monai.app) en estructura de secciones y claridad de copy, pero con identidad visual propia de Kaxa (blanco/esmeralda/Nunito), sin elementos prestados (sin emojis tipo 🥑, sin "claro como el agua").

---

## 2. Stack técnico

| Capa | Elección |
|---|---|
| Framework | **Astro** (sitio estático, SSG) |
| Estilos | **Tailwind CSS** |
| Tipografía | Nunito vía `@fontsource/nunito` o Google Fonts |
| Hosting | **Vercel** |
| Dominio | `kaxa.lat` |
| i18n | i18n routing nativo de Astro — `es` (default, raíz `/`) y `en` (`/en/`) |

**Por qué Astro:** sitio mayormente estático, envía mínimo JS (carga rápida en redes lentas, relevante en Honduras), i18n nativo, y `content collections` listas para un blog futuro sin reescribir el sitio.

---

## 3. Mapa de páginas

| Ruta ES | Ruta EN | Contenido |
|---|---|---|
| `/` | `/en/` | Landing principal |
| `/privacidad` | `/en/privacy` | Política de privacidad |
| `/terminos` | `/en/terms` | Términos de servicio |
| `/soporte` | `/en/support` | FAQ + contacto |

Selector de idioma ES/EN visible en header y footer.

**Fuera de alcance v1:** blog (`/blog`), pero la estructura de content collections debe poder soportarlo después sin reestructurar rutas existentes.

---

## 4. Estructura de la Homepage

1. **Header**
   - Wordmark Kaxa (usar `kaxa_wordmark_green.png` sobre fondo blanco)
   - Nav: Cómo funciona / Funciones / Precios / Soporte
   - Selector de idioma (ES/EN)
   - CTA "Descargar" (link a Google Play)

2. **Hero**
   - Eyebrow: "App de finanzas · Honduras"
   - Titular (ES): **"El control de tu dinero, en tu bolsillo."**
   - Subcopy: registro de gastos/ingresos, organización en bolsillos, entender a dónde va el dinero, en lempiras
   - Badge "Disponible en Google Play" (link a la ficha real)
   - Mockup de teléfono mostrando un calco de la pantalla de inicio real de Kaxa: saludo, tarjeta "Balance Total", chips de accesos rápidos (Presupuestos/Deudas/Resumen), lista de actividad reciente, nav inferior con FAB verde
     - **v1:** mockup ilustrado/maquetado con HTML+CSS (placeholder)
     - **Futuro inmediato:** reemplazar por captura de pantalla real de la app (`/public/screens/home.png`), sin rehacer el componente

3. **Cómo funciona** — 3 pasos:
   - Registra tus gastos e ingresos
   - Organízalos en bolsillos (Efectivo, Tigo, Banco, etc.)
   - Entiende tus finanzas con presupuestos, deudas y metas

4. **Funciones** — grid de tarjetas (icono/mockup + título + descripción corta):
   - Bolsillos
   - Presupuestos
   - Deudas
   - Metas de ahorro
   - Resumen / reportes

5. **Precios** — 3 planes desde `2026-06-04-iap-revenuecat.md`:
   - Semanal: $1.99/sem, **prueba gratis de 3 días** (destacado)
   - Mensual: $4.99/mes
   - Anual: $24.99/año (marcar como "mejor valor")
   - CTA debajo de cada plan → descarga (la compra real ocurre dentro de la app vía RevenueCat, el sitio no procesa pagos)

6. **FAQ** (también reutilizada en `/soporte`):
   - ¿Mis datos están seguros?
   - ¿Funciona sin conexión a internet?
   - ¿En qué moneda funciona? (Lempiras, HNL)
   - ¿Cómo cancelo mi suscripción?
   - ¿Hay versión gratuita? (no, pero hay prueba de 3 días en el plan semanal)

7. **CTA final** — repetir mensaje + botón de descarga

8. **Footer**
   - Wordmark
   - Links legales: Privacidad, Términos
   - Link a Soporte
   - Redes sociales (placeholders, a definir)
   - Selector de idioma
   - Copyright © 2026 Kaxa

**Sin sección de testimonios en v1** (no hay reviews todavía). Se deja espacio en el diseño para agregarla después sin reestructurar.

---

## 5. Sistema visual

Reutiliza 1:1 los tokens de `2026-05-28-kaxa-visual-identity.md`:

| Token | Valor |
|---|---|
| `background` | `#FFFFFF` |
| `surface` | `#F9FAFB` |
| `surface-border` | `#E5E7EB` |
| `primary` (esmeralda) | `#10B981` |
| `primary-dark` | `#059669` |
| `primary-light` | `#D1FAE5` |
| `text-primary` | `#111827` |
| `text-secondary` | `#6B7280` |
| `gasto` | `#EF4444` |
| `ingreso` | `#10B981` |

- **Tipografía:** Nunito (Bold/ExtraBold para titulares, Regular/Medium para body)
- **Border radius:** 16px cards, 12px botones (igual que la app)
- **Sombra de cards:** `0 1px 3px rgba(0,0,0,0.08)`
- **Logo/wordmark:** `kaxa_wordmark_green.png` (fondos claros) — copiar de `kaxa/assets/images/` al proyecto del sitio

---

## 6. Contenido / copy

- Primer borrador de copy en **español** para todas las secciones (hero, cómo funciona, funciones, precios, FAQ, legales), escrito durante la implementación, a revisar por el usuario.
- Versión **inglés** se traduce del borrador ES ya aprobado.
- **Legales (Privacidad/Términos):** se entrega un borrador estándar cubriendo: app de pago vía RevenueCat/tiendas, manejo de datos financieros, no venta de datos a terceros. **El usuario debe revisarlos con criterio legal antes de publicar** — no son asesoría legal.

---

## 7. SEO básico

- Meta tags (title, description) por página y por idioma
- Open Graph image usando wordmark/logo de Kaxa
- `sitemap.xml` y `robots.txt` (soporte nativo de Astro)
- URLs limpias y semánticas (`/precios`, `/soporte`, etc. si se desglosan en el futuro — v1 usa anchors dentro de `/`)

---

## 8. Asistencia de diseño durante implementación

- **`ui-ux-pro-max`** skill para paletas/tipografía/layout dentro del estilo aprobado
- **`frontend-design`** skill para calidad de implementación (evitar estética genérica)
- **Stitch MCP** si se necesitan nuevos assets/iconos
- Assets de marca existentes: `kaxa/assets/images/kaxa_wordmark_green.png`, `kaxa/assets/images/kaxa_wordmark_white.png`

---

## 9. Fuera de alcance v1

- Blog / contenido educativo (arquitectura debe permitirlo después)
- Testimonios / reseñas
- Versión EN de marketing diferenciada (es traducción directa del ES en v1)
- Procesamiento de pagos en el sitio (las compras ocurren en la app)
- Capturas reales de pantalla (se usan mockups ilustrados en v1, reemplazables después)
