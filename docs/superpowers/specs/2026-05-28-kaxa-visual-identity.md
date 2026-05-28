# Kaxa — Visual Identity Design Spec

**Fecha:** 2026-05-28  
**Estado:** Aprobado  
**Versión:** 1.0

---

## 1. Nombre de Marca

**Kaxa**

Derivado de "caja" (cash box), reescrito con K+X para darle identidad tech moderna. Corto, geométrico, memorable. Funciona igual en Honduras que en cualquier mercado hispanohablante.

---

## 2. Filosofía de Diseño

> "El usuario ve sus números, no la app."

Blanco dominante con un solo acento de color. Sin ruido visual. Inspirado en Apple Wallet y N26 en cuanto a limpieza, y en MonAi en cuanto a cercanía con el usuario informal.

**Principios:**
- Minimalismo radical — cada elemento tiene razón de existir
- Jerarquía de números — los montos son los protagonistas
- Un acento, usado con criterio — el esmeralda aparece en acciones y énfasis, no en decoración
- Familiar desde el primer tap — curvas Nunito = amigable, no corporativo

---

## 3. Paleta de Colores

| Token | Valor | Uso |
|---|---|---|
| `background` | `#FFFFFF` | Fondo de todas las pantallas |
| `surface` | `#F9FAFB` | Cards, modales, bottom sheets |
| `surface-border` | `#E5E7EB` | Bordes de cards y divisores |
| `primary` | `#10B981` | Acento principal (Emerald 500) |
| `primary-dark` | `#059669` | Estados pressed/hover del acento |
| `primary-light` | `#D1FAE5` | Fondos de chips y badges verdes |
| `text-primary` | `#111827` | Texto principal, montos grandes |
| `text-secondary` | `#6B7280` | Labels, subtítulos, metadatos |
| `text-disabled` | `#D1D5DB` | Estados deshabilitados |
| `gasto` | `#EF4444` | Color de gastos (rojo) |
| `gasto-light` | `#FEE2E2` | Fondo de chips de gasto |
| `ingreso` | `#10B981` | Color de ingresos (esmeralda) |
| `ingreso-light` | `#D1FAE5` | Fondo de chips de ingreso |
| `white` | `#FFFFFF` | Texto sobre fondos de color |

**Material 3 seed color:** `#10B981`  
**Brightness:** Light mode únicamente en v1.0

---

## 4. Tipografía

**Fuente:** Nunito (Google Fonts) — misma que MonAi

| Rol | Weight | Size | Uso |
|---|---|---|---|
| Display | ExtraBold 800 | 32sp | Montos principales en Home |
| Title Large | Bold 700 | 22sp | Títulos de pantalla |
| Title Medium | Bold 700 | 16sp | Títulos de cards y secciones |
| Body Large | Medium 500 | 16sp | Texto de lista, movimientos |
| Body Medium | Regular 400 | 14sp | Descripciones, notas |
| Label | Medium 500 | 12sp | Chips, badges, labels |
| Caption | Regular 400 | 11sp | Metadatos, fechas |

---

## 5. Logo e Ícono

### Concepto
Caja geométrica minimalista que contiene una **K implícita** formada por el espacio negativo. Doble significado: caja de dinero (el producto) + letra K (la marca).

### Especificaciones
- **Forma base:** Cuadrado con bordes redondeados (radius = 22% del ancho)
- **Fondo:** `#10B981` (esmeralda)
- **Símbolo:** Blanco puro `#FFFFFF`
- **La K implícita:** Formada por tres elementos geométricos internos que evocan una K sin ser literal
- **Proporciones:** Símbolo ocupa 60% del área del ícono

### Variantes
| Variante | Uso |
|---|---|
| Ícono app (1024×1024) | App Store / Play Store |
| Ícono app (192×192) | Launcher Android |
| Logo horizontal | Kaxa wordmark + ícono, para splash screen |
| Wordmark solo | "Kaxa" en Nunito ExtraBold, color `#10B981` |
| Ícono monocromático | Notificaciones, fondos blancos |

### Herramienta de generación
Stitch MCP con tendencias actuales de diseño de íconos (Material You, iOS 18 style).

---

## 6. Componentes UI Clave

### Home Screen
- AppBar: blanco, sin elevación, título "Kaxa" en Nunito Bold
- Balance total: número grande Nunito ExtraBold `#111827`, moneda en `#6B7280`
- Bolsillos (Efectivo/Tigo/Banco): cards en `#F9FAFB` con borde `#E5E7EB`
- FAB `+ Gasto`: fondo `#EF4444`, texto blanco
- FAB `+ Ingreso`: fondo `#10B981`, texto blanco

### Movimiento Tile
- Emoji categoría en círculo `#F9FAFB`
- Nombre categoría en `#111827` Body Large
- Fecha en `#6B7280` Caption
- Monto: rojo `#EF4444` para gastos, verde `#10B981` para ingresos
- Signo `-` / `+` delante del monto

### Bottom Navigation
- Fondo blanco
- Íconos inactivos: `#6B7280`
- Ícono activo: `#10B981` con label
- Línea superior sutil: `#E5E7EB`

### Botones
- Filled primary: fondo `#10B981`, texto blanco, Nunito SemiBold 16sp
- Filled danger: fondo `#EF4444`, texto blanco
- Outlined: borde `#E5E7EB`, texto `#111827`
- Border radius: 12dp (no el estándar Material de 20dp — más cuadrado, más "caja")

---

## 7. Spacing y Elevación

- **Grid base:** 4dp
- **Padding de pantalla:** 16dp horizontal
- **Gap entre secciones:** 24dp
- **Elevación de cards:** sombra sutil (`0 1px 3px rgba(0,0,0,0.08)`) — no Material elevation
- **Border radius cards:** 16dp
- **Border radius botones:** 12dp

---

## 8. Aplicación a Archivos Existentes

| Archivo | Cambio |
|---|---|
| `lib/shared/theme.dart` | Nuevo seed `#10B981`, Nunito font, custom component themes |
| `pubspec.yaml` | Añadir `google_fonts: ^6.2.1` para Nunito |
| `lib/shared/widgets/app_scaffold.dart` | Bottom nav colores actualizados |
| Todos los screens | Ajustar colores de text/background a nueva paleta |
| App icon | Generar con Stitch, reemplazar en `android/app/src/main/res/` |

---

## 9. Herramientas de Implementación

| Rol | Herramienta |
|---|---|
| Mockups y assets | **Stitch MCP** |
| Implementación UI | **ui-ux-pro-max skill** |
| Lógica y plan | **superpowers (writing-plans + subagent-driven-development)** |
| Fuente Nunito | `google_fonts` package |

---

## 10. Fuera de Scope v1.0

- Dark mode (v1.1)
- Animaciones de transición personalizadas
- Ilustraciones onboarding
- Brand guidelines completo (PDF)
