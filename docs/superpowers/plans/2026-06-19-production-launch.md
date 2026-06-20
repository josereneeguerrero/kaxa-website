# Kaxa Production Launch Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship Kaxa to Google Play production track within 4 weeks.

**Architecture:** Five parallel workstreams: code cleanup, legal/website, Play Store listing, tester recruitment, and marketing assets. Code is 96% ready — the only blocker is the missing legal pages on kaxa.lat.

**Tech Stack:** Flutter 3.38, RevenueCat, Google Play Console, Astro (kaxa.lat), Vercel

---

## Current State (June 19, 2026)

### Technical Audit Summary

| Category | Status |
|----------|--------|
| Version & Build (v1.1.8+36, API 24-36) | ✅ CLEAN |
| Signing (key.properties, gitignored) | ✅ CLEAN |
| Permissions (7 declared, all aligned) | ✅ CLEAN |
| Legal links code (centralized, locale-aware) | ✅ CLEAN |
| Code quality (0 errors, 26 warnings) | ✅ CLEAN |
| Dead code (cleaned in prior sessions) | ✅ CLEAN |
| Debug gates (kDebugMode wrapped) | ✅ CLEAN |
| L10n (ES/EN complete, all active screens) | ✅ CLEAN |
| RevenueCat (production API key, 3 plans) | ✅ CLEAN |
| Initialization order (main.dart) | ✅ CLEAN |
| DB schema (v14 stable) | ✅ CLEAN |
| Motion system (KaxaMotion + KaxaPressable) | ✅ CLEAN |
| **kaxa.lat/terminos** | 🔴 **BLOCKER — 404** |
| **Privacy policy (RevenueCat disclosure)** | 🟡 WARNING |
| **Deprecated Switch.activeColor (4 locs)** | 🟡 WARNING |
| **Unused imports (10+)** | 🟡 WARNING |

### Market Intelligence Summary

| Insight | Detail |
|---------|--------|
| **Honduras competition** | Zero. No Honduran personal finance app exists. |
| **LATAM competition** | Mobills ($24.99/yr), Monefy ($19.56/yr), Wallet |
| **Kaxa pricing** | Weekly $1.99 (trial), Monthly $4.99, Annual $24.99 — matches Mobills exactly |
| **Affordability** | Annual = 0.37% of min wage (cheaper than Spotify) |
| **Tester requirement** | 12 testers, 14 consecutive days (reduced from 20 in Dec 2024) |
| **Review timeline** | 7-14 days for first-time submissions |
| **ASO keywords** | "control de gastos", "finanzas personales", "presupuesto" |

---

## Timeline Overview

```
Week 1 (Jun 19-25): Code cleanup + legal pages + store assets
Week 2 (Jun 26-Jul 2): Upload to closed testing + recruit 12 testers
Week 3 (Jul 3-9):  Closed testing (testers active)
Week 4 (Jul 10-16): Closed testing completes → apply for production
Week 5 (Jul 17-23): Google review (7-14 days)
~Jul 23-30: LIVE on Google Play
```

---

## Workstream 1: Code Cleanup (Day 1 — 30 min)

### Task 1: Fix deprecated Switch.activeColor

**Files:**
- Modify: `lib/features/ajustes/ajustes_screen.dart` (3 locations)
- Modify: `lib/features/onboarding/onboarding_flow_screen.dart` (1 location)

- [ ] **Step 1: Find and replace**

```bash
grep -rn "activeColor:" lib/features/ajustes/ajustes_screen.dart lib/features/onboarding/onboarding_flow_screen.dart
```

Replace each `activeColor:` → `activeTrackColor:` on Switch widgets.

- [ ] **Step 2: Verify**

```bash
flutter analyze lib/
```

Expected: 0 errors, fewer warnings.

- [ ] **Step 3: Commit**

```bash
git add lib/features/ajustes/ajustes_screen.dart lib/features/onboarding/onboarding_flow_screen.dart
git commit -m "fix: replace deprecated Switch.activeColor with activeTrackColor"
```

### Task 2: Remove unused imports

- [ ] **Step 1: List unused imports**

```bash
flutter analyze lib/ 2>&1 | grep "unused_import"
```

- [ ] **Step 2: Remove each unused import line**

- [ ] **Step 3: Remove dead widget classes**

Remove `_SettingsCard` and `_RowDivider` from `ajustes_screen.dart` (no longer used after card redesign).

- [ ] **Step 4: Verify and commit**

```bash
flutter analyze lib/
git add -A lib/
git commit -m "chore: remove unused imports and dead widget classes"
```

### Task 3: Bump version for release

- [ ] **Step 1: Update pubspec.yaml**

```yaml
version: 1.2.0+37
```

- [ ] **Step 2: Build release AAB**

```bash
flutter build appbundle
```

- [ ] **Step 3: Commit**

```bash
git add pubspec.yaml
git commit -m "chore: bump version to 1.2.0+37 for production release"
```

---

## Workstream 2: Legal Pages (Day 1-3 — BLOCKER)

> This work lives in the kaxa-website repo (Astro + Tailwind on Vercel).
> See `docs/superpowers/plans/2026-06-10-kaxa-website.md` for site architecture.

### Task 4: Create /terminos page

**Files:**
- Create: `kaxa-website/src/pages/terminos.astro`
- Create: `kaxa-website/src/pages/en/terms.astro`

- [ ] **Step 1: Write Términos de Uso content**

Must include (Google Play compliance):
- Subscription terms: prices ($1.99/week, $4.99/month, $24.99/year)
- Auto-renewal disclosure
- Cancellation instructions (Google Play → Subscriptions → Kaxa)
- Free trial terms (3 days, weekly plan only)
- Refund policy (handled by Google Play)
- Data deletion rights (Ajustes → Eliminar todos los datos)
- Minimum age requirement
- Governing law (Honduras)

- [ ] **Step 2: Deploy and verify**

```bash
curl -I https://kaxa.lat/terminos  # Should return 200
curl -I https://kaxa.lat/en/terms  # Should return 200
```

- [ ] **Step 3: Verify from app**

Open Kaxa → Ajustes → Términos de uso → should open in browser without 404.

### Task 5: Update /privacidad with RevenueCat disclosure

**Files:**
- Modify: `kaxa-website/src/pages/privacidad.astro`
- Modify: `kaxa-website/src/pages/en/privacy.astro`

- [ ] **Step 1: Add third-party data section**

Add to privacy policy:
```
Terceros que reciben datos:

RevenueCat, Inc. — Procesamiento de suscripciones
- Datos compartidos: Identificador de usuario anónimo, eventos de compra,
  información del dispositivo (modelo, OS, idioma)
- Propósito: Gestión de suscripciones, prevención de fraude
- Política de privacidad de RevenueCat: https://www.revenuecat.com/privacy
```

Remove or update the claim "ningún dato sale de tu dispositivo."

- [ ] **Step 2: Deploy and verify**

---

## Workstream 3: Google Play Store Listing (Day 2-5)

### Task 6: Complete Play Console configuration

- [ ] **Step 1: IARC Content Rating questionnaire**

Go to Play Console → App content → Content rating → Start questionnaire.
Answer: No violence, no sexual content, no gambling, no user-generated content.
Expected rating: **PEGI 3 / Everyone**

- [ ] **Step 2: Data Safety Form**

Go to Play Console → App content → Data safety.

Declare:
| Data type | Collected | Shared | Purpose |
|-----------|-----------|--------|---------|
| Purchase history | Yes | Yes (RevenueCat) | App functionality, fraud prevention |
| App interactions | No | No | — |
| Device ID | Yes | Yes (RevenueCat) | Fraud prevention |
| Financial info (user-entered) | Yes | No | App functionality |
| Name (optional) | Yes | No | App personalization |

Link to privacy policy: `https://kaxa.lat/privacidad`

- [ ] **Step 3: Target audience**

Select: 18+ (finance app, handles money data)

- [ ] **Step 4: Set up regional pricing**

Go to Play Console → Monetization → Products → Subscriptions.
Consider setting Honduras/Guatemala/El Salvador prices 20-30% lower than US:
- Weekly: $1.49 (HN/GT/SV) vs $1.99 (US)
- Monthly: $3.49 vs $4.99
- Annual: $17.99 vs $24.99

### Task 7: Write store listing copy

- [ ] **Step 1: App name (50 chars max)**

```
ES: Kaxa - Control de Gastos y Presupuesto
EN: Kaxa - Budget & Expense Tracker
```

- [ ] **Step 2: Short description (80 chars max)**

```
ES: Controla gastos, crea presupuestos y ahorra. Finanzas personales simples.
EN: Track expenses, set budgets, and save. Simple personal finance.
```

- [ ] **Step 3: Full description (4000 chars max)**

```
ES:
Kaxa es tu caja en el bolsillo. La app de finanzas personales diseñada
para Honduras y Latinoamérica.

REGISTRA EN 2 SEGUNDOS
Agrega un gasto o ingreso con dos toques. Sin formularios largos,
sin interrumpir tu día.

PRESUPUESTOS POR CATEGORÍA
Establece límites mensuales para cada categoría. Kaxa te avisa
cuando estás cerca del límite y cuando lo superas.

METAS DE AHORRO
¿Viaje a Roatán? ¿Fondo de emergencia? Crea metas, registra aportes
y celebra cuando las cumplas.

DEUDAS Y CUOTAS
Controla préstamos, tarjetas y cuotas. Registra pagos y ve tu
progreso hasta liquidar cada deuda.

PAGOS RECURRENTES
Programa renta, suscripciones, salario y más. Kaxa registra
automáticamente y te recuerda cuando toca pagar.

MULTI-MONEDA
Lempiras, dólares, quetzales, euros y más. Ideal para negocios
con clientes en diferentes monedas.

RESUMEN INTELIGENTE
Entiende tus números con gráficas claras, tendencias semanales
y un puntaje de salud financiera.

SEGURIDAD
Bloqueo biométrico opcional. Tus datos nunca salen de tu dispositivo.

Kaxa Premium incluye todas las funciones por un precio justo.
Prueba 3 días gratis con el plan semanal.

Hecho en Honduras 🇭🇳
```

### Task 8: Create screenshots (6-8 images, 1290x2796 px)

- [ ] **Step 1: Capture clean screenshots from device**

```bash
adb shell pm clear com.reneeguerrero.kaxa
adb shell am start -n com.reneeguerrero.kaxa/.MainActivity
```

Navigate through onboarding, add sample data, capture each screen:

1. **Home** — Balance card with sample data, spending pills, activity
2. **Agregar** — Gasto entry with numpad, category selected
3. **Presupuestos** — Budget pills with progress bars
4. **Metas** — Savings goals with progress
5. **Deudas** — Debt list with payment progress
6. **Resumen** — Charts and statistics
7. **Recurrentes** — Recurring payments list
8. **Ajustes** — Clean settings with PRO badge

- [ ] **Step 2: Add text overlays to screenshots**

Each screenshot needs a headline overlay in Spanish:
1. "Tu dinero, de un vistazo"
2. "Registra en 2 segundos"
3. "Presupuestos que te cuidan"
4. "Ahorra con propósito"
5. "Deudas bajo control"
6. "Entiende tus números"
7. "Pagos que no se olvidan"
8. "Tu app, tu estilo"

- [ ] **Step 3: Upload to Play Console**

Phone screenshots → Main store listing → Screenshots section.

### Task 9: Feature graphic (1024x500 px)

- [ ] **Step 1: Design feature graphic**

Simple composition:
- Background: `KaxaColors.background` (#F8F9FF)
- Kaxa wordmark centered
- Tagline: "Tu caja en el bolsillo"
- Phone mockup showing home screen (optional)

---

## Workstream 4: Tester Recruitment (Day 3-7)

### Task 10: Recruit 12 testers

- [ ] **Step 1: Create tester list**

Priority sources:
1. Family/friends with Android phones (aim for 8)
2. University contacts — UNAH, UNITEC, UTH CS students (aim for 4)
3. Backup: Honduran tech Facebook groups (Developers Honduras)

Each tester needs:
- A Google account (Gmail)
- An Android phone
- To accept the testing invitation link
- To open the app at least once during 14 days

- [ ] **Step 2: Set up closed testing track in Play Console**

Go to Play Console → Testing → Closed testing → Create track.
Add tester emails. Generate opt-in link.

- [ ] **Step 3: Upload AAB to closed testing**

```bash
flutter build appbundle
```

Upload `build/app/outputs/bundle/release/app-release.aab` to closed testing track.

- [ ] **Step 4: Send invitation links**

Draft message (WhatsApp/email):
```
¡Hola! Estoy lanzando Kaxa, una app de finanzas personales hecha en Honduras.
Necesito tu ayuda para probarla antes del lanzamiento oficial.

Solo necesitas:
1. Abrir este link desde tu celular Android
2. Aceptar ser tester
3. Instalar la app
4. Usarla al menos una vez en las próximas 2 semanas

Link: [URL del Play Console]

¡Gracias! 🇭🇳
```

- [ ] **Step 5: Monitor tester engagement**

Play Console → Testing → Closed testing → Testers tab.
Verify 12+ testers have opted in and installed within first 3 days.
Follow up individually with anyone who hasn't installed.

---

## Workstream 5: Pre-Launch Marketing (Week 2-3)

### Task 11: Social media presence

- [ ] **Step 1: Create Instagram @kaaborrar (or similar)**

Post 3-5 preview posts:
- App screenshots with feature highlights
- "Hecho en Honduras" narrative
- "Próximamente en Google Play" teaser
- Behind-the-scenes of development

- [ ] **Step 2: Prepare launch day post**

Carousel post: 4-5 slides with screenshots + feature copy.
Caption with download link.

### Task 12: Landing page update

- [ ] **Step 1: Add "Descargar en Google Play" button to kaxa.lat**

Use official Google Play badge asset.
Link to Play Store listing once live.

- [ ] **Step 2: Add app screenshots to landing page**

Same screenshots used for Play Store listing.

---

## Launch Day Checklist

- [ ] Legal pages live and verified (kaxa.lat/terminos + /privacidad updated)
- [ ] Data Safety form submitted and approved
- [ ] IARC content rating completed
- [ ] 12+ testers active for 14+ days
- [ ] Store listing complete (name, descriptions, screenshots, feature graphic)
- [ ] Release AAB uploaded to production track
- [ ] Regional pricing configured
- [ ] App name: "Kaxa - Control de Gastos y Presupuesto"
- [ ] Google review submitted
- [ ] Social media launch post scheduled
- [ ] kaxa.lat updated with Play Store download button

---

## Pricing Recommendation

| Plan | Current | Recommendation |
|------|---------|----------------|
| Weekly (3-day trial) | $1.99 | ✅ Keep — low-commitment entry |
| Monthly | $4.99 | ✅ Keep — matches Mobills |
| Annual | $24.99 | ✅ Keep — best value, push as default |
| Regional (HN/GT/SV) | Same as US | 🟡 Consider 20-30% lower |

**Annual plan is the money maker.** At $2.08/mo effective, it's cheaper than Spotify in Honduras. The paywall should always preselect Annual.

---

## Post-Launch Priorities

| Priority | Task |
|----------|------|
| Week 1 | Monitor crash reports, reviews, tester feedback |
| Week 2 | Respond to every review (boosts ranking) |
| Month 1 | Consolidate duplicate paywall code |
| Month 2 | Cloud backup/sync (Google Sign-in + Firebase) |
| Quarter 2 | Dark mode |
| Quarter 3 | iOS version assessment |

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Google rejects first submission | Medium | 1 week delay | Pre-fill Data Safety + content rating before submission |
| Not enough testers | Low | 2 week delay | Have 15+ lined up, follow up individually |
| Legal page incomplete | Low | Blocks launch | Prioritize /terminos in Week 1 |
| Pricing too high for Honduras | Low | Low conversions | Monitor, enable regional pricing |
| Competition launches | Very Low | Market share | First-mover advantage, "Hecho en Honduras" brand |
