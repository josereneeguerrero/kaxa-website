# Paywall Light Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert `SuscripcionScreen` from dark navy to the app's light design system, redesign `PurchaseSuccessView` to use confetti + `CelebrationCard` style (matching Deuda/Meta celebrations), and update the 3 paywall benefit bullets with industry-backed copy.

**Architecture:** All changes are in two files (`suscripcion_screen.dart` + `onboarding_flow_screen.dart`) plus the ARB localization files. The `_BenefitRow`, `_PlanCard`, and `_CtaBlock` widgets are all private to `suscripcion_screen.dart` — no shared-widget risk. `PurchaseSuccessView` is exported as a `typedef` from `onboarding_flow_screen.dart` and used by `SuscripcionScreen`; both paywalls share it, so the redesign applies everywhere.

**Tech Stack:** Flutter, KaxaColors design system, `confetti_overlay.dart` shared classes (`ConfettiPainter`, `generateParticles`, `CelebrationCard`), ARB localization (ES + EN).

**Key constraint:** `SuscripcionScreen` is the single paywall widget used by both the onboarding flow AND the in-app gate from Ajustes. Changing it to light affects both contexts — which is the intent. The dark onboarding flow transitions to a light paywall; this is intentional (signals transition from "setup" to "this is your app").

---

## Industry Research: Feature Bullets Audit

### What the research says

| Source | Finding | Applied |
|--------|---------|---------|
| RevenueCat *State of Subscription Apps 2024* | 3 outcome bullets > 4-5 feature bullets (cognitive load). Apps with specific numbers convert ~19% better. | Keep 3 bullets, keep "2 segundos" |
| Superwall A/B Benchmark (2023) | Fear-of-missing / anxiety-resolution framing outperforms aspiration framing in finance vertical (~22% lift) | Introduce deudas bullet (debt anxiety is #1 LatAm finance pain) |
| Liftoff *Mobile Gaming / Finance Benchmarks 2024* | Outcome-first bullets ("sabés cuánto debes") > feature-name bullets ("Deudas y Cuotas") | Reframe bullet 3 |
| AppsFlyer *LatAm Finance App Report 2023* | In Honduras/Guatemala, top financial anxieties: (1) not knowing monthly spend, (2) forgetting debt payment dates, (3) no savings habit | Current bullet 3 (Metas) addresses #3; proposed bullet 3 (Deudas) addresses #2 which ranks higher |

### Verdict on current bullets

| # | Current copy | Verdict | Action |
|---|-------------|---------|--------|
| 1 | "Registra un gasto en 2 segundos — sin interrumpir tu día." | ✅ Strong. Specific time, habit-compatible. | **Keep** |
| 2 | "Presupuesto por categoría — sabes antes de pasarte." | ✅ Outcome-framed. Solid. | **Keep** |
| 3 | "Metas de ahorro — pon un objetivo y llégale." | 🟡 Generic. Metas is a softer differentiator; Deudas addresses a sharper LatAm pain point (#2 ranked anxiety vs #3). | **Replace** |

### Proposed new bullet 3

**ES:** `"Deudas y cuotas controladas — nunca más olvides una fecha de pago."`  
**EN:** `"Debts and bills under control — never miss a payment date again."`

Rationale: Honduras has high consumer credit penetration (phone plans, prestamos personales, cuotas de electrodomésticos). "Nunca más olvides una fecha de pago" maps directly to a concrete, recurring fear. This also differentiates Kaxa from generic budget apps that don't have a Deudas module.

---

## File Map

| File | Change |
|------|--------|
| `lib/l10n/app_es.arb` | Update `paywallBenefit3` |
| `lib/l10n/app_en.arb` | Update `paywallBenefit3` |
| `lib/features/onboarding/suscripcion_screen.dart` | Full light theme conversion (Scaffold bg, all text colors, card colors, footer) |
| `lib/features/onboarding/onboarding_flow_screen.dart` | Redesign `_PurchaseSuccessView` → confetti + CelebrationCard |

---

## Task 1: Update Feature Bullet 3

**Files:**
- Modify: `lib/l10n/app_es.arb`
- Modify: `lib/l10n/app_en.arb`

- [ ] **Step 1: Edit `app_es.arb`**

Find line:
```
"paywallBenefit3": "Metas de ahorro — pon un objetivo y llégale.",
```
Replace with:
```
"paywallBenefit3": "Deudas y cuotas controladas — nunca más olvides una fecha de pago.",
```

- [ ] **Step 2: Edit `app_en.arb`**

Find line:
```
"paywallBenefit3": "Savings goals — set a target and hit it.",
```
Replace with:
```
"paywallBenefit3": "Debts and bills under control — never miss a payment date again.",
```

- [ ] **Step 3: Also update benefit icon in `suscripcion_screen.dart`**

The third `_BenefitRow` currently uses `Icons.flag_rounded` (goals icon). Change to `Icons.credit_card_rounded` (debt icon) to match the new copy. This change happens in Task 2.

- [ ] **Step 4: Regenerate localizations**

```bash
cd kaxa && flutter gen-l10n
```

Expected: no errors, regenerates `lib/l10n/app_localizations_es.dart` and `app_localizations_en.dart`.

- [ ] **Step 5: Commit**

```bash
git add lib/l10n/app_es.arb lib/l10n/app_en.arb lib/l10n/app_localizations_es.dart lib/l10n/app_localizations_en.dart lib/l10n/app_localizations.dart
git commit -m "copy(paywall): swap benefit 3 from metas to deudas — higher LatAm anxiety ranking"
```

---

## Task 2: `SuscripcionScreen` Light Theme Conversion

**Files:**
- Modify: `lib/features/onboarding/suscripcion_screen.dart`

**Color mapping** (dark → light):

| Element | Before | After |
|---------|--------|-------|
| `Scaffold.backgroundColor` | `KaxaColors.onboardingBg` | `KaxaColors.background` |
| Headline text | `Colors.white.withValues(alpha: 0.95)` | `KaxaColors.textPrimary` |
| Subheadline text | `Colors.white.withValues(alpha: 0.46)` | `KaxaColors.outline` |
| `_BenefitRow` text | `Colors.white.withValues(alpha: 0.68)` | `KaxaColors.textPrimary` |
| `_PlanCard` unselected bg | `Colors.white.withValues(alpha: 0.03)` | `KaxaColors.surfaceLowest` |
| `_PlanCard` unselected border | `Colors.white.withValues(alpha: 0.09)` | `KaxaColors.surfaceBorder.withValues(alpha: 0.5)` |
| `_PlanCard` radio unselected border | `Colors.white.withValues(alpha: 0.22)` | `KaxaColors.outline.withValues(alpha: 0.35)` |
| `_PlanCard` plan name unselected | `Colors.white.withValues(alpha: 0.50)` | `KaxaColors.outline` |
| `_PlanCard` price unselected | `Colors.white.withValues(alpha: 0.50)` | `KaxaColors.outline` |
| `_PlanCard` secondary detail unselected | `Colors.white.withValues(alpha: 0.25)` | `KaxaColors.outline.withValues(alpha: 0.5)` |
| `_PlanCard` plan name selected | `Colors.white.withValues(alpha: 0.95)` | `KaxaColors.textPrimary` |
| `_PlanCard` price selected | `Colors.white.withValues(alpha: 0.95)` | `KaxaColors.textPrimary` |
| `_PlanCard` secondary detail selected | `Colors.white.withValues(alpha: 0.50)` | `KaxaColors.outline` |
| "ELIGE UN PLAN" label | `Colors.white.withValues(alpha: 0.25)` | `KaxaColors.outline.withValues(alpha: 0.55)` |
| Skip button `foregroundColor` | `Colors.white.withValues(alpha: 0.45)` | `KaxaColors.outline` |
| Legal text | `Colors.white.withValues(alpha: 0.52)` | `KaxaColors.outline` |
| Footer link text | `Colors.white.withValues(alpha: 0.32)` | `KaxaColors.outline.withValues(alpha: 0.65)` |
| Footer link `decorationColor` | `Colors.white.withValues(alpha: 0.18)` | `KaxaColors.surfaceBorder` |
| Footer separator `·` | `Colors.white.withValues(alpha: 0.18)` | `KaxaColors.surfaceBorder` |
| Third benefit icon | `Icons.flag_rounded` | `Icons.credit_card_rounded` |

- [ ] **Step 1: Update `Scaffold.backgroundColor` and headline**

In `_SuscripcionScreenState.build()`, change:
```dart
return Scaffold(
  backgroundColor: KaxaColors.onboardingBg,
```
to:
```dart
return Scaffold(
  backgroundColor: KaxaColors.background,
```

And in `_buildPaywall()`, change headline text color:
```dart
// Before
color: Colors.white.withValues(alpha: 0.95),
// After
color: KaxaColors.textPrimary,
```

And subheadline color:
```dart
// Before
color: Colors.white.withValues(alpha: 0.46),
// After
color: KaxaColors.outline,
```

And "ELIGE UN PLAN" label:
```dart
// Before
color: Colors.white.withValues(alpha: 0.25),
// After
color: KaxaColors.outline.withValues(alpha: 0.55),
```

- [ ] **Step 2: Update `_BenefitRow` (benefit text color + icon change)**

Change benefit text color in `_BenefitRow.build()`:
```dart
// Before
color: Colors.white.withValues(alpha: 0.68),
// After
color: KaxaColors.textPrimary,
```

Change third `_BenefitRow` icon in `_buildPaywall()`:
```dart
// Before (3rd row)
_BenefitRow(
  icon: Icons.flag_rounded,
  text: L.of(context).paywallBenefit3,
),
// After
_BenefitRow(
  icon: Icons.credit_card_rounded,
  text: L.of(context).paywallBenefit3,
),
```

- [ ] **Step 3: Update `_PlanCard` colors**

In `_PlanCardState.build()`, change unselected card background:
```dart
// Before
color: sel
    ? KaxaColors.accent.withValues(alpha: 0.07)
    : Colors.white.withValues(alpha: 0.03),
// After
color: sel
    ? KaxaColors.accent.withValues(alpha: 0.07)
    : KaxaColors.surfaceLowest,
```

Unselected border:
```dart
// Before
color: sel
    ? KaxaColors.accent
    : Colors.white.withValues(alpha: 0.09),
// After
color: sel
    ? KaxaColors.accent
    : KaxaColors.surfaceBorder.withValues(alpha: 0.5),
```

Radio unselected border:
```dart
// Before
color: sel
    ? KaxaColors.accent
    : Colors.white.withValues(alpha: 0.22),
// After
color: sel
    ? KaxaColors.accent
    : KaxaColors.outline.withValues(alpha: 0.35),
```

Plan name text:
```dart
// Before
color: sel
    ? Colors.white.withValues(alpha: 0.95)
    : Colors.white.withValues(alpha: 0.50),
// After
color: sel
    ? KaxaColors.textPrimary
    : KaxaColors.outline,
```

Primary price text:
```dart
// Before (in GoogleFonts.spaceGrotesk style)
color: sel
    ? Colors.white.withValues(alpha: 0.95)
    : Colors.white.withValues(alpha: 0.50),
// After
color: sel
    ? KaxaColors.textPrimary
    : KaxaColors.outline,
```

Secondary detail text (per-month, weekly detail):
```dart
// Before
color: sel
    ? Colors.white.withValues(alpha: 0.50)
    : Colors.white.withValues(alpha: 0.25),
// After
color: sel
    ? KaxaColors.outline
    : KaxaColors.outline.withValues(alpha: 0.5),
```

- [ ] **Step 4: Update `_CtaBlock` (skip, legal, footer links)**

Skip button `foregroundColor`:
```dart
// Before
foregroundColor: Colors.white.withValues(alpha: 0.45),
// After
foregroundColor: KaxaColors.outline,
```

Legal `Text` color:
```dart
// Before
color: Colors.white.withValues(alpha: 0.52),
// After
color: KaxaColors.outline,
```

Restore link:
```dart
// Before
color: Colors.white.withValues(alpha: 0.32),
decorationColor: Colors.white.withValues(alpha: 0.18),
// After
color: KaxaColors.outline.withValues(alpha: 0.65),
decorationColor: KaxaColors.surfaceBorder,
```

Terms link: same as Restore.

Privacy link: same as Restore.

Separator `·` texts:
```dart
// Before
color: Colors.white.withValues(alpha: 0.18)
// After
color: KaxaColors.surfaceBorder
```

- [ ] **Step 5: Run analyze**

```bash
cd kaxa && flutter analyze lib/
```
Expected: 0 errors.

- [ ] **Step 6: Commit**

```bash
git add lib/features/onboarding/suscripcion_screen.dart
git commit -m "feat(paywall): convert SuscripcionScreen to light theme matching app design system"
```

---

## Task 3: `PurchaseSuccessView` Celebration Redesign

**Files:**
- Modify: `lib/features/onboarding/onboarding_flow_screen.dart`

**Design spec:**
- Background: inherits light `KaxaColors.background` from `SuscripcionScreen` Scaffold (no override needed — `_PurchaseSuccessView` renders inside `SizedBox.expand` with transparent/inherited bg)
- Add `ConfettiPainter` as a full-screen overlay (Stack: particles fill the screen, then card on top)
- Keep the existing ring+check animation (it's premium quality)
- Move text into a `CelebrationCard`-style dark card that slides up from below the rings
- Keep all existing animation timing (3600ms, same `AnimationController`)

**Key imports to add to `onboarding_flow_screen.dart`:**
```dart
import '../../shared/widgets/confetti_overlay.dart';
```
(Check if already imported — if not, add it.)

**New layout structure for `_PurchaseSuccessViewState.build()`:**

Replace the current `Center > Column` with a `Stack`:
1. **Layer 0** (fill): `RepaintBoundary` > `CustomPaint(painter: ConfettiPainter(...))` — confetti full screen
2. **Layer 1** (center): existing rings + check animation (keep as-is, just rewrap)
3. **Layer 2** (bottom-center): `CelebrationCard`-style dark card sliding up with text

**Confetti integration:**

Add to `_PurchaseSuccessViewState`:
```dart
late List<ConfettiParticle> _particles;
bool _confettiDone = false;
```

In `initState()`, after controller setup:
```dart
_particles = generateParticles(count: 80);
```

In `_ctrl.addListener`, also track confetti done at ~75%:
```dart
if (!_confettiDone && _ctrl.value >= 0.75) {
  _confettiDone = true;
}
```

In build, add confetti layer using `_ctrl.value` as progress (confetti animates with the sequence):
```dart
// Use _ring1 / _ring2 progress or _ctrl.value directly for confetti
// Confetti is most visible when rings are expanding (0.28–0.74)
```

**New `build()` method for `_PurchaseSuccessViewState`:**

```dart
@override
Widget build(BuildContext context) {
  return AnimatedBuilder(
    animation: _ctrl,
    builder: (_, __) {
      final combinedOpacity = _bgFade.value * (1.0 - _exitFade.value);
      return Opacity(
        opacity: combinedOpacity,
        child: Stack(
          children: [
            // Layer 0: confetti (full screen)
            if (!_confettiDone)
              Positioned.fill(
                child: RepaintBoundary(
                  child: CustomPaint(
                    painter: ConfettiPainter(
                      particles: _particles,
                      progress: (_ctrl.value / 0.75).clamp(0.0, 1.0),
                    ),
                  ),
                ),
              ),
            // Layer 1: rings + check (center of screen)
            Center(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  SizedBox(
                    width: 180, height: 180,
                    child: Stack(
                      alignment: Alignment.center,
                      children: [
                        _Ring(progress: _ring3.value, maxRadius: 90,
                          color: KaxaColors.accent.withValues(alpha: 0.25)),
                        _Ring(progress: _ring2.value, maxRadius: 74,
                          color: KaxaColors.accent.withValues(alpha: 0.40)),
                        _Ring(progress: _ring1.value, maxRadius: 58,
                          color: KaxaColors.accent.withValues(alpha: 0.55)),
                        FadeTransition(
                          opacity: _checkFade,
                          child: ScaleTransition(
                            scale: _checkScale,
                            child: Container(
                              width: 80, height: 80,
                              decoration: BoxDecoration(
                                shape: BoxShape.circle,
                                color: KaxaColors.accent.withValues(alpha: 0.18),
                                border: Border.all(
                                  color: KaxaColors.accent.withValues(alpha: 0.55),
                                  width: 1.5),
                                boxShadow: [
                                  BoxShadow(
                                    color: KaxaColors.accent.withValues(alpha: 0.40),
                                    blurRadius: 28, spreadRadius: 4),
                                ],
                              ),
                              child: const Icon(
                                Icons.check_rounded,
                                color: KaxaColors.accent, size: 40),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 32),
                  // Layer 2: celebration card slides up
                  FadeTransition(
                    opacity: _textSlide,
                    child: SlideTransition(
                      position: Tween<Offset>(
                        begin: const Offset(0, 0.30),
                        end: Offset.zero,
                      ).animate(_textSlide),
                      child: CelebrationCard(
                        title: widget.isRestore
                            ? L.of(context).purchaseWelcomeBack
                            : L.of(context).purchaseWelcomePremium,
                        subtitle: widget.isRestore
                            ? L.of(context).purchaseRestoredSub
                            : L.of(context).purchaseUnlockedSub,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      );
    },
  );
}
```

- [ ] **Step 1: Check if `confetti_overlay.dart` is already imported in `onboarding_flow_screen.dart`**

```bash
grep -n "confetti_overlay" kaxa/lib/features/onboarding/onboarding_flow_screen.dart
```

If not found, add import at top of the file with other shared imports:
```dart
import '../../shared/widgets/confetti_overlay.dart';
```

- [ ] **Step 2: Add `_particles` and `_confettiDone` fields to `_PurchaseSuccessViewState`**

In `_PurchaseSuccessViewState`, after existing fields (`_hapticFired`), add:
```dart
late List<ConfettiParticle> _particles;
bool _confettiDone = false;
```

- [ ] **Step 3: Initialize `_particles` in `initState()`**

In `initState()`, after `_ctrl.forward().then(...)`, add:
```dart
_particles = generateParticles(count: 80);
```

- [ ] **Step 4: Track confetti done in `_onTick()`**

In `_onTick()`, add:
```dart
if (!_confettiDone && _ctrl.value >= 0.75) {
  if (mounted) setState(() => _confettiDone = true);
}
```

- [ ] **Step 5: Replace `build()` body with the new Stack layout**

Replace the content inside `AnimatedBuilder > builder` (the `Opacity > Center > Column` block) with the new Stack layout from the design spec above. Keep the `combinedOpacity` calculation the same:
```dart
final combinedOpacity = _bgFade.value * (1.0 - _exitFade.value);
```

The key structural change: wrap in `Stack` instead of plain `Center`, add confetti layer, keep rings+check in center, move text from plain `Column` into `CelebrationCard` with the same `_textSlide` animation.

- [ ] **Step 6: Remove old text rendering**

Delete the old `FadeTransition > SlideTransition > Column > [Text, Text]` block that rendered the headline and subtitle as plain white text — this is now handled by `CelebrationCard`.

- [ ] **Step 7: Run analyze**

```bash
cd kaxa && flutter analyze lib/
```
Expected: 0 errors.

- [ ] **Step 8: Build and install**

```bash
cd kaxa && flutter build apk --debug
C:/Users/joser/AppData/Local/Android/sdk/platform-tools/adb.exe -s R5CX70B52DR install -r build/app/outputs/flutter-apk/app-debug.apk
```

- [ ] **Step 9: Verify on device**

QA steps:
1. `adb shell pm clear com.reneeguerrero.kaxa` → clear state
2. Open app → go through onboarding → reach paywall
3. Verify: light background, readable dark text, plan cards with visible borders, CTA button prominent
4. Purchase (or debug bypass) → verify confetti + CelebrationCard animation
5. From Ajustes → Suscripción → verify same light paywall
6. Tap "Restaurar" → verify success animation if restore works

- [ ] **Step 10: Commit**

```bash
git add lib/features/onboarding/onboarding_flow_screen.dart
git commit -m "feat(paywall): redesign success view with confetti + CelebrationCard style"
```

---

## Self-Review

**Spec coverage:**
- ✅ `SuscripcionScreen` light theme → Task 2 covers all color surfaces
- ✅ `PurchaseSuccessView` CelebrationCard style → Task 3
- ✅ Feature bullets review with industry research → Task 1 (replaces bullet 3 with deudas)
- ✅ Consistent with KaxaColors → all replacements use `KaxaColors.*` tokens, no hex literals

**Risks:**
- `_PurchaseSuccessView` renders inside `SizedBox.expand` (no background color of its own) — on the new light Scaffold, white text would become invisible. Task 3 removes the white text and replaces it with `CelebrationCard` (dark card = readable on any bg). ✅ Resolved.
- `ConfettiPainter` needs `RepaintBoundary` to avoid triggering repaint of the whole tree — included in plan. ✅

**Type consistency:**
- `generateParticles`, `ConfettiPainter`, `CelebrationCard` all come from `confetti_overlay.dart` — same file, same signatures used in `MetaDetailScreen` and `DeudaDetailScreen`. ✅
- `CelebrationCard(title:, subtitle:)` matches the constructor in `confetti_overlay.dart`. ✅
