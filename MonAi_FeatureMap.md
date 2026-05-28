# MonAi — Feature Map para Replicar en Honduras

> Análisis del APK v1.8.1 | 28 mayo 2026  
> Objetivo: identificar qué es copiable (modelo/UX) vs. qué es propietario (código).

---

## 1. Stack Tecnológico (referencia, no copiar código)

| Componente | MonAi usa | Alternativa para tu app |
|---|---|---|
| iOS UI | SwiftUI | SwiftUI / React Native |
| Android UI | Jetpack Compose | Jetpack Compose / Flutter |
| Base de datos local | CoreData (iOS) + Room (Android) | Room / SQLite / Drift |
| Backend sync | Appwrite (cloud.appwrite.io) | Appwrite ✅ (código abierto, gratis) |
| Pagos | RevenueCat | RevenueCat ✅ (mismo servicio) |
| IA / Voz | No identificado en APK (llamada externa) | OpenAI Whisper + GPT-4o |

---

## 2. Modelo de Datos (estructura pública, no código)

```
TransactionList (wallet / libro)
  └── Transaction
        ├── amount: Double
        ├── purpose: String (descripción)
        ├── transactionType: expense | income
        ├── date + timezone
        ├── prompt: String (texto original del usuario)
        ├── currency: String
        ├── category → Category
        └── tags → [Tag]

Category
  ├── name, emoji, color
  ├── alternativeEmoji (sugerencias alternativas)
  ├── usageCount + lastUsed (para smart suggestions)
  └── list → TransactionList

Recurrence (transacciones recurrentes)
  ├── type: daily | weekly | monthly | yearly
  ├── creation, lastUpdate
  └── transaction → Transaction

Budget (presupuesto por categoría)
  ├── threshold: Double
  └── category → Category

Tag
  ├── name
  └── list → TransactionList

Membership (para listas compartidas)
  ├── userId, name
  └── role: owner | member
```

---

## 3. Features por Tier

### GRATIS (sin login)
| Feature | Descripción |
|---|---|
| Entrada por voz | Hablas y la IA divide y categoriza gastos automáticamente |
| Entrada manual | Escribes descripción + monto |
| Drag-to-categorize | Arrastras una categoría al campo de entrada para pre-seleccionarla |
| Auto-categorización IA | La IA aprende de tus correcciones (modelo `CategoryImprovement`) |
| Múltiples listas | Puedes tener varias "wallets" o libros de gastos |
| Gastos + ingresos | `transactionType: expense | income` |
| Multi-moneda | Campo `currency` por transacción |
| Storage local | Sin login, datos en dispositivo |
| Charts básicos | Gráficas de gastos por categoría |

### PRO — Suscripción mensual / anual (7 días trial gratis)
| Feature | Descripción |
|---|---|
| Sync en la nube | Delta sync con Appwrite, offline-first |
| Compartir listas | Invitas personas a una lista con roles owner/member |
| Más gráficas de tendencias | "Access more trend charts" |
| Presupuestos por categoría | Límite de gasto + recomendaciones IA |
| Alertas y notificaciones | Notificaciones cuando te acercas al límite del budget |
| Transacciones recurrentes | Automatiza gastos fijos (sueldo, arriendo, etc.) |
| Ícono premium | Gamificación visual de tener Pro |
| Widgets | Widget en la pantalla de inicio |
| Siri / atajos | (iOS) integración con Siri Shortcuts |
| Customer Center | Gestión de suscripción desde la app |

### LIFETIME (opción única, observada en código)
| Feature | Descripción |
|---|---|
| Acceso Pro de por vida | Pago único sin renovación |

---

## 4. Flujos UX Clave (para diseñar tu app)

### Flujo de entrada principal (el corazón de la app)
```
[Pantalla principal]
      │
      ├── Toca micrófono → graba voz
      │         └── IA parsea → muestra transacciones divididas → confirmar
      │
      ├── Escribe texto → IA categoriza → confirmar
      │
      └── Arrastra categoría al campo → establece categoría → ingresa monto
```

### Flujo AI de aprendizaje
```
Usuario cambia categoría sugerida por IA
      └── Se guarda un CategoryImprovement { prompt, transactionId }
            └── Se envía al backend para mejorar el modelo
```

### Flujo de sharing (Pro)
```
Owner genera código de invitación (10 chars alfanumérico)
      └── Genera URL monai://deeplink/share-list?id=X&code=Y
            └── Invitado abre link → joinTeam() → sincroniza la lista compartida
```

### Flujo de sync (Pro)
```
App abre / vuelve a primer plano
      └── fetch() → pull cambios desde Appwrite (delta por updatedAt)
      └── push() → sube cambios locales no sincronizados
            ├── <10 documentos → ejecución síncrona
            └── >10 documentos → ejecución asíncrona con polling
```

---

## 5. Modelo de Monetización

| Aspecto | Detalle |
|---|---|
| Plataforma de pagos | RevenueCat |
| Trial gratuito | 7 días |
| Planes | Mensual + Anual + Lifetime |
| Restricción free | Funciones Pro bloqueadas, no eliminación de funciones básicas |
| Paywalls | RevenueCat Paywalls (UI configurable desde dashboard) |
| Renovación | Auto-renovable, cancelable 24h antes |

---

## 6. Lo que MonAi NO tiene (oportunidades para Honduras)

| Gap | Oportunidad Local |
|---|---|
| Sin soporte para gastos en efectivo diferenciados | Honduras es economía de efectivo — trackear billetes vs. Tigo Money |
| Sin integración bancaria | Conectar con bancos hondureños via scraping o Open Finance |
| Sin modo familiar | Presupuesto familiar / para parejas |
| Sin metas de ahorro | "Quiero ahorrar X para Y fecha" |
| Sin soporte offline-first prominente | Marketing explícito para usuarios con mala conectividad |
| Sin localización de categorías | Categorías relevantes: "remesas", "canasta básica", "transporte colectivo" |
| Sin conversión USD/HNL | Honduras usa ambas monedas activamente |

---

## 7. Recomendaciones para tu App

### MVP (v1.0)
1. Entrada manual + voz con IA (OpenAI Whisper + GPT-4o-mini)
2. Auto-categorización con categorías locales hondureñas
3. Local-first sin login
4. Gráfica simple de gastos por categoría

### v1.1 — Pro
5. Sync en la nube (Appwrite self-hosted o cloud)
6. Presupuestos por categoría
7. Transacciones recurrentes
8. Compartir listas

### Diferenciadores Honduras
9. Conversión HNL ↔ USD en tiempo real
10. Categorías: remesas recibidas, canasta básica, transporte
11. Modo offline prominente (funciona sin internet)
12. Widget de gasto diario disponible

---

## 8. Lo que NO debes copiar

- El código Kotlin/Swift (copyright del autor)
- Los assets visuales (iconos, ilustraciones)
- El texto/copy exacto de la UI
- Los algoritmos de IA propietarios

Todo lo anterior es el **modelo de negocio público** — perfectamente legal de replicar con tu propia implementación.
