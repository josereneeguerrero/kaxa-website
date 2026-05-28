# MVP Design — App de Finanzas para Negociante Informal Honduras

**Fecha:** 2026-05-28  
**Estado:** Aprobado  
**Versión:** 1.0

---

## 1. Problema

Negociante informal hondureño 25-40 años opera de memoria. No registra gastos ni ingresos. Mezcla efectivo, Tigo Money y banco sin separación. Resultado: "se fue el dinero y no sé en qué."

No usa apps de finanzas porque son complejas. Usa WhatsApp, Facebook, TikTok — si no entiende en 10 segundos, borra.

---

## 2. Propuesta de Valor

> "Tu caja en el bolsillo — saber cuánto tienes y en qué se fue, en 3 taps, sin internet."

**No es:** app de presupuestos, app bancaria, app de inversiones.  
**Sí es:** cuaderno de caja digital, rápido, offline, bilingüe HNL/USD.

---

## 3. Usuario Objetivo

- Negociante informal hondureño
- 25-40 años
- Maneja efectivo + Tigo Money + banco (mezcla HNL y USD)
- Android básico a gama media (~$80-300 USD)
- Conectividad intermitente o lenta
- Nivel tech: WhatsApp-only — fricción cero obligatoria

---

## 4. Pantallas MVP

| # | Pantalla | Propósito |
|---|---|---|
| 1 | **Home** | Resumen del día (total HNL / total USD por bolsillo) + botones grandes `+ Gasto` / `+ Ingreso` |
| 2 | **Agregar movimiento** | Monto → moneda → categoría → método de pago → guardar. Máx 4 taps. |
| 3 | **Historial** | Lista cronológica de movimientos. Filtros: hoy / esta semana / este mes. |
| 4 | **Resumen** | Gráfica de dona por categoría. Selector de período. HNL y USD por separado. |
| 5 | **Ajustes** | Moneda default, gestión de categorías propias. Nada más. |

App abre directo al Home. Sin login. Sin onboarding obligatorio.

---

## 5. Modelo de Datos

```
Movimiento
├── id: UUID
├── monto: Decimal
├── tipo: "gasto" | "ingreso"
├── moneda: "HNL" | "USD"
├── categoria_id: FK → Categoria
├── metodo_pago: "efectivo" | "tigo_money" | "banco"
├── nota: String? (opcional, max 100 chars)
└── fecha: DateTime (automática, editable)

Categoria
├── id: UUID
├── nombre: String
├── emoji: String
├── es_default: Boolean
└── orden: Int

```

**Categorías default:**
Comida · Transporte · Mercadería · Local/Alquiler · Servicios · Personal · Remesas · Otro

Usuario puede agregar categorías propias. No puede borrar las default.

---

## 6. Comportamiento Clave

### Offline-first
Todos los datos viven en el dispositivo (SQLite local). No requiere internet para ninguna función del MVP. Sin sync, sin login, sin cuenta.

### Bolsillos de dinero
`metodo_pago` actúa como "bolsillo". Home muestra balance por bolsillo:
- Efectivo: L. 850 / $20
- Tigo Money: L. 200
- Banco: L. 3,400

Balance = suma de ingresos - suma de gastos por bolsillo desde el inicio.

### Multi-moneda
Movimientos en HNL y USD son independientes — no se convierten entre sí en v1.0. Se muestran en columnas separadas. Conversión entra en v1.1.

### Flujo de agregar movimiento
```
Home → tap "+ Gasto"
  → teclado numérico grande → ingresar monto
  → seleccionar moneda (HNL / USD) — default configurable
  → seleccionar categoría (grid de emojis)
  → seleccionar método de pago (3 botones: Efectivo / Tigo / Banco)
  → [nota opcional — campo pequeño, no prominente]
  → botón "Guardar" → regresa a Home con confirmación visual
```

Total: 4 taps para el caso típico (monto + categoría + método + guardar).

---

## 7. Fuera de Scope v1.0

- Voz / IA
- Sync en la nube
- Compartir listas / colaboración
- Presupuestos y alertas
- Transacciones recurrentes
- Export CSV / PDF
- Widgets
- Gráficas avanzadas
- Conversión HNL ↔ USD en tiempo real
- Login / cuentas de usuario

---

## 8. Definición de Done (MVP lanzado)

- [ ] Funciona 100% offline en Android básico
- [ ] Nuevo usuario registra primer gasto en menos de 30 segundos sin instrucciones
- [ ] Datos persisten entre cierres de app
- [ ] Home muestra balance correcto por bolsillo y moneda
- [ ] Historial muestra todos los movimientos filtrados por período
- [ ] Resumen muestra gráfica de gastos por categoría

---

## 9. Tech Stack Propuesto

| Componente | Decisión | Razón |
|---|---|---|
| Framework | Flutter | Un codebase → Android + iOS. Rendimiento nativo. |
| DB local | Drift (SQLite) | SQL tipado, offline-first, queries reactivos |
| Estado | Riverpod | Simple, testeable |
| Pagos (futuro) | RevenueCat | Mismo que MonAi, probado |
| Backend (futuro) | Appwrite | Open source, self-hosteable, gratis tier |

---

## 10. Roadmap Post-MVP

| Versión | Features |
|---|---|
| v1.1 | Conversión HNL↔USD en tiempo real, entrada por voz con IA |
| v1.2 | Sync en la nube (Appwrite), backup automático |
| v1.3 | Presupuestos por categoría, alertas |
| v2.0 | Compartir caja con socios/familia, plan Pro con RevenueCat |

---

## 11. Consideraciones Legales

Modelo de negocio inspirado en MonAi (público, legal). Implementación independiente:
- Código escrito desde cero
- Assets visuales propios
- Copy y textos propios
- Nombre y marca originales
- Categorías y flujos adaptados al mercado hondureño
