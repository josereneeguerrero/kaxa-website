# RevenueCat IAP Integration — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Gate the entire Kaxa app behind a real RevenueCat subscription check — no free access, hard paywall.

**Architecture:** `subscriptionStatusProvider` (StreamProvider) watches RC's CustomerInfo listener and emits `bool isPremium` in real-time. `AppScaffold` reads this provider and renders `SuscripcionScreen(allowSkip:false)` when not premium — no Navigator needed, Riverpod handles the transition reactively. `SuscripcionScreen` gains an `allowSkip` flag that hides "Ahora no" and skips manual navigation when in gate mode.

**Tech Stack:** Flutter 3.38.9, `purchases_flutter ^8.0.0` (already in pubspec), Riverpod 2.x, Drift 2.x (DB already v11, no migration needed).

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `lib/core/providers/subscription_provider.dart` | **Create** | `subscriptionStatusProvider` StreamProvider |
| `lib/features/onboarding/suscripcion_screen.dart` | Modify | Add `allowSkip` param; guard `_navigateHome` |
| `lib/shared/widgets/app_scaffold.dart` | Modify | Watch subscription, gate behind paywall |
| `lib/core/services/purchases_service.dart` | Modify | Replace test API key with production key |
| `kaxa/CLAUDE.md` | Modify | Update IAP status to complete |

---

## Task 1: subscriptionStatusProvider

**Files:**
- Create: `lib/core/providers/subscription_provider.dart`

- [ ] **Step 1: Create the provider file**

```dart
// lib/core/providers/subscription_provider.dart
import 'dart:async';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:purchases_flutter/purchases_flutter.dart';
import '../services/purchases_service.dart';

/// Emits true when the user has an active 'Kaxa Premium' entitlement.
/// Reacts in real-time to purchase, restore, and subscription expiry.
final subscriptionStatusProvider = StreamProvider<bool>((ref) {
  final ctrl = StreamController<bool>();

  // Emit current state immediately (cached by RC SDK — no network call).
  Purchases.getCustomerInfo().then((info) {
    if (!ctrl.isClosed) {
      ctrl.add(
        info.entitlements.active.containsKey(PurchasesKeys.entitlement),
      );
    }
  }).catchError((_) {
    // On error (e.g. no network on first launch) default to false.
    if (!ctrl.isClosed) ctrl.add(false);
  });

  // React to all future changes: purchase, restore, background expiry.
  void listener(CustomerInfo info) {
    if (!ctrl.isClosed) {
      ctrl.add(
        info.entitlements.active.containsKey(PurchasesKeys.entitlement),
      );
    }
  }
  Purchases.addCustomerInfoUpdateListener(listener);

  ref.onDispose(() {
    Purchases.removeCustomerInfoUpdateListener(listener);
    ctrl.close();
  });

  return ctrl.stream;
});
```

- [ ] **Step 2: Verify analyze is clean**

```bash
cd kaxa && flutter analyze lib/
```

Expected: 0 errors (existing warnings OK).

- [ ] **Step 3: Commit**

```bash
git add lib/core/providers/subscription_provider.dart
git commit -m "feat(iap): subscriptionStatusProvider — RC stream, real-time gate"
```

---

## Task 2: SuscripcionScreen — `allowSkip` param

**Files:**
- Modify: `lib/features/onboarding/suscripcion_screen.dart`

Context: `SuscripcionScreen` is used in two modes:
- **Onboarding** (`allowSkip: true`, default): user can tap "Ahora no", and `_navigateHome` does `markComplete()` + `Navigator.pushReplacement(AppScaffold)`.
- **Gate** (`allowSkip: false`): "Ahora no" hidden; after purchase, `_navigateHome` only calls `markComplete()` (idempotent) — AppScaffold's reactive Riverpod rebuild handles showing the content.

- [ ] **Step 1: Add `allowSkip` to `SuscripcionScreen`**

Find the class declaration (line ~18) and change it from:

```dart
class SuscripcionScreen extends ConsumerStatefulWidget {
  const SuscripcionScreen({super.key});
```

To:

```dart
class SuscripcionScreen extends ConsumerStatefulWidget {
  /// When false: hides "Ahora no" and skips manual Navigator after purchase.
  /// Used by AppScaffold's subscription gate.
  final bool allowSkip;
  const SuscripcionScreen({super.key, this.allowSkip = true});
```

- [ ] **Step 2: Pass `allowSkip` down to `_CtaSection`**

Find the `_CtaSection(...)` call in `build()` (line ~367) and add the parameter:

```dart
_CtaSection(
  ctaLabel: _ctaLabel,
  microCopy: _microCopy,
  loading: _loading,
  onContinue: _onContinue,
  onRestore: _onRestore,
  onSkip: _onSkip,
  safeBottom: safeBottom,
  allowSkip: widget.allowSkip,   // ADD THIS LINE
),
```

- [ ] **Step 3: Add `allowSkip` to `_CtaSection`**

Find the `_CtaSection` class (line ~912) and add the field + constructor param:

```dart
class _CtaSection extends StatelessWidget {
  final String ctaLabel;
  final String microCopy;
  final bool loading;
  final VoidCallback onContinue;
  final VoidCallback onRestore;
  final VoidCallback onSkip;
  final double safeBottom;
  final bool allowSkip;   // ADD

  const _CtaSection({
    required this.ctaLabel,
    required this.microCopy,
    required this.loading,
    required this.onContinue,
    required this.onRestore,
    required this.onSkip,
    required this.safeBottom,
    this.allowSkip = true,   // ADD
  });
```

- [ ] **Step 4: Conditionally hide "Ahora no" in `_CtaSection.build()`**

Find the "Restore + skip row" section (the `Row` with "Restaurar compras" and "Ahora no", line ~994). Replace the entire row with:

```dart
// ── Restore + optional skip row ──────────────────────────────
Row(
  mainAxisAlignment: MainAxisAlignment.center,
  children: [
    GestureDetector(
      onTap: onRestore,
      child: Text(
        'Restaurar compras',
        style: TextStyle(
          fontSize: 12, fontWeight: FontWeight.w600,
          color: Colors.white.withValues(alpha: 0.38),
          decoration: TextDecoration.underline,
          decorationColor: Colors.white.withValues(alpha: 0.25),
        ),
      ),
    ),
    if (allowSkip) ...[
      Text(
        '  ·  ',
        style: TextStyle(
            fontSize: 12,
            color: Colors.white.withValues(alpha: 0.20)),
      ),
      GestureDetector(
        onTap: onSkip,
        child: Text(
          'Ahora no',
          style: TextStyle(
            fontSize: 12, fontWeight: FontWeight.w600,
            color: Colors.white.withValues(alpha: 0.28),
          ),
        ),
      ),
    ],
  ],
),
```

- [ ] **Step 5: Guard `_navigateHome` — skip Navigator in gate mode**

Find `_navigateHome()` (line ~107). Replace:

```dart
Future<void> _navigateHome() async {
  await ref.read(onboardingCompleteProvider.notifier).markComplete();
  if (!mounted) return;
  Navigator.of(context).pushReplacement(PageRouteBuilder(
    pageBuilder: (_, __, ___) => const AppScaffold(),
    transitionsBuilder: kOnboardingTransition,
    transitionDuration: kOnboardingTransitionDuration,
  ));
}
```

With:

```dart
Future<void> _navigateHome() async {
  await ref.read(onboardingCompleteProvider.notifier).markComplete();
  if (!mounted) return;
  // Gate mode: AppScaffold's subscriptionStatusProvider rebuild handles navigation.
  if (!widget.allowSkip) return;
  Navigator.of(context).pushReplacement(PageRouteBuilder(
    pageBuilder: (_, __, ___) => const AppScaffold(),
    transitionsBuilder: kOnboardingTransition,
    transitionDuration: kOnboardingTransitionDuration,
  ));
}
```

- [ ] **Step 6: Verify analyze**

```bash
flutter analyze lib/
```

Expected: 0 errors.

- [ ] **Step 7: Commit**

```bash
git add lib/features/onboarding/suscripcion_screen.dart
git commit -m "feat(iap): SuscripcionScreen allowSkip param — gate mode hides skip button"
```

---

## Task 3: AppScaffold — Subscription Gate

**Files:**
- Modify: `lib/shared/widgets/app_scaffold.dart`

The gate lives inside `AppScaffold.build()`. When `subscriptionStatusProvider` emits false, the method returns `SuscripcionScreen(allowSkip: false)` directly — no Navigator push. When it emits true, the existing Scaffold content returns. Riverpod handles the transition reactively.

- [ ] **Step 1: Add imports at the top of `app_scaffold.dart`**

After the existing imports, add:

```dart
import '../../core/providers/subscription_provider.dart';
import '../../features/onboarding/suscripcion_screen.dart';
```

- [ ] **Step 2: Add subscription gate at the top of `build()`**

Find the `build(BuildContext context)` method in `_AppScaffoldState` (line ~32). Insert these lines BEFORE the `final bottomInset = ...` line:

```dart
@override
Widget build(BuildContext context) {
  // ── Subscription gate ────────────────────────────────────────────────────
  final subStatus = ref.watch(subscriptionStatusProvider);
  final Widget? gate = subStatus.when(
    loading: () => const Scaffold(
      backgroundColor: Color(0xFF0B1C30),
      body: SizedBox.shrink(),
    ),
    error: (_, __) => const SuscripcionScreen(allowSkip: false),
    data: (isPremium) =>
        isPremium ? null : const SuscripcionScreen(allowSkip: false),
  );
  if (gate != null) return gate;
  // ── End gate ─────────────────────────────────────────────────────────────

  final bottomInset = MediaQuery.viewPaddingOf(context).bottom;
  // ... rest of existing build unchanged
```

The full updated `build` method (paste in its entirety to be safe):

```dart
@override
Widget build(BuildContext context) {
  // ── Subscription gate ────────────────────────────────────────────────────
  final subStatus = ref.watch(subscriptionStatusProvider);
  final Widget? gate = subStatus.when(
    loading: () => const Scaffold(
      backgroundColor: Color(0xFF0B1C30),
      body: SizedBox.shrink(),
    ),
    error: (_, __) => const SuscripcionScreen(allowSkip: false),
    data: (isPremium) =>
        isPremium ? null : const SuscripcionScreen(allowSkip: false),
  );
  if (gate != null) return gate;
  // ── End gate ─────────────────────────────────────────────────────────────

  final bottomInset = MediaQuery.viewPaddingOf(context).bottom;
  final navHeight = 96.0 + bottomInset;

  return Scaffold(
    backgroundColor: KaxaColors.background,
    body: Stack(
      children: [
        IndexedStack(
          index: _currentIndex,
          children: [
            TickerMode(
              enabled: _currentIndex == 0,
              child: HomeScreen(onVerTodo: _goToHistorial),
            ),
            TickerMode(
              enabled: _currentIndex == 1,
              child: const HistorialScreen(),
            ),
            TickerMode(
              enabled: _currentIndex == 2,
              child: const ResumenScreen(),
            ),
          ],
        ),
        Positioned(
          left: 0,
          right: 0,
          bottom: 0,
          height: navHeight + 24,
          child: IgnorePointer(
            child: DecoratedBox(
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                  stops: const [0.0, 0.45, 1.0],
                  colors: [
                    const Color(0xFFF8F9FF).withValues(alpha: 0.0),
                    const Color(0xFFF8F9FF).withValues(alpha: 0.28),
                    const Color(0xFFF8F9FF).withValues(alpha: 0.72),
                  ],
                ),
              ),
            ),
          ),
        ),
        Positioned(
          left: 0,
          right: 0,
          bottom: 0,
          child: RepaintBoundary(
            child: KaxaFloatingNav(
              currentIndex: _currentIndex,
              onTap: (i) => setState(() => _currentIndex = i),
              onAddTap: _openAgregar,
            ),
          ),
        ),
      ],
    ),
  );
}
```

- [ ] **Step 3: Verify analyze + build APK**

```bash
flutter analyze lib/ && flutter build apk --debug
```

Expected: 0 errors, APK builds successfully.

- [ ] **Step 4: Commit**

```bash
git add lib/shared/widgets/app_scaffold.dart
git commit -m "feat(iap): AppScaffold subscription gate — RC StreamProvider reactive"
```

---

## Task 4: Production API Key

**Files:**
- Modify: `lib/core/services/purchases_service.dart`

This step is intentionally manual — the real key comes from the RevenueCat dashboard.

### 4A — Get the real key from RevenueCat

1. Open [app.revenuecat.com](https://app.revenuecat.com)
2. Select your Kaxa project
3. Go to **Project Settings → API Keys**
4. Copy the **Android (Google Play)** public API key — it looks like `goog_xxxxxxxxxxxxxxxxxxxxxxxx`

### 4B — Set up RC Dashboard (if not done)

In RC Dashboard for your Kaxa project:

1. **App:** Add Android app → package `com.reneeguerrero.kaxa`
2. **Service Account:** Connect Play Console service account (RC guide: [rev.cat/google-service-credentials](https://rev.cat/google-service-credentials))
3. **Entitlement:** Create entitlement with identifier exactly `Kaxa Premium`
4. **Products:** Add 3 products:
   - `kaxa_premium_weekly`
   - `kaxa_premium_monthly`
   - `kaxa_premium_yearly`
5. **Offering:** Create offering with identifier `default`, add 3 packages:
   - Weekly package → `kaxa_premium_weekly`
   - Monthly package → `kaxa_premium_monthly`
   - Annual package → `kaxa_premium_yearly`
6. Attach all 3 packages to the `Kaxa Premium` entitlement

### 4C — Set up Play Console subscriptions

1. Open [play.google.com/console](https://play.google.com/console) → Kaxa app
2. **Monetize → Subscriptions → Create subscription** (repeat 3×):

| Product ID | Name | Billing period | Price | Free trial |
|------------|------|----------------|-------|------------|
| `kaxa_premium_weekly` | Kaxa Premium Semanal | Weekly | $1.99 | 3 days |
| `kaxa_premium_monthly` | Kaxa Premium Mensual | Monthly | $4.99 | — |
| `kaxa_premium_yearly` | Kaxa Premium Anual | Yearly | $24.99 | — |

3. Activate each subscription (status: **Active**)

### 4D — Replace API key in code

- [ ] **Step 1: Replace test key**

In `lib/core/services/purchases_service.dart`, change line 7:

```dart
// Before:
static const apiKey = 'test_rfMtbnIpPpCwWXQJzXhnUVDoBSz';

// After (paste your real key from RC Dashboard → API Keys → Android):
static const apiKey = 'goog_REPLACE_WITH_YOUR_KEY';
```

- [ ] **Step 2: Verify analyze**

```bash
flutter analyze lib/
```

Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add lib/core/services/purchases_service.dart
git commit -m "feat(iap): replace test RC key with production Android key"
```

---

## Task 5: Build, Install & Manual Test

- [ ] **Step 1: Clean build + install**

```bash
flutter clean && flutter pub get && flutter build apk --debug
adb -s R5CX70B52DR install -r build/app/outputs/flutter-apk/app-debug.apk
```

- [ ] **Step 2: Test — fresh install (no prior onboarding)**

Flow: Bienvenida → Moneda → Categorías → Feature Tour → Prep → **Paywall**

Expected:
- Paywall shows with 3 plan cards
- "Ahora no" IS visible (onboarding mode, `allowSkip: true`)
- Tapping "Ahora no" → marks onboarding complete → AppScaffold gate → Paywall again WITHOUT "Ahora no"
- "Restaurar compras" still visible in gate mode

- [ ] **Step 3: Test — gate paywall has no skip**

After tapping "Ahora no" in onboarding, confirm:
- Gate version of SuscripcionScreen shows
- **"Ahora no" button is NOT visible**
- Only "Restaurar compras" + CTA button visible

- [ ] **Step 4: Test — restore purchases (if you have a prior sub)**

Tap "Restaurar compras":
- If entitlement exists: access granted instantly (AppScaffold content)
- If no prior sub: snackbar "No se encontraron compras previas."

- [ ] **Step 5: Test — returning user with active subscription**

Simulate by manually granting entitlement in RC Dashboard (Customers → find your test device → grant entitlement for 1 day). Restart app:
- App opens directly to `AppScaffold` content (no paywall)

- [ ] **Step 6: Run analyze one more time**

```bash
flutter analyze lib/
```

Expected: 0 errors.

---

## Task 6: Update CLAUDE.md

**Files:**
- Modify: `kaxa/CLAUDE.md`

- [ ] **Step 1: Update Screen Status table**

Find `_SubscriptionPaywallStep` row and change:

```
| **_SubscriptionPaywallStep** | ⚠️ UI only | `onContinue` calls `markComplete()` — **IAP NOT integrated** |
```

To:

```
| **SuscripcionScreen** | ✅ Complete | RC purchase + restore wired; `allowSkip` gate mode |
```

- [ ] **Step 2: Add subscriptionStatusProvider to Providers table**

```
| `subscriptionStatusProvider` | `subscription_provider.dart` | `StreamProvider<bool>` — RC entitlement live |
```

- [ ] **Step 3: Update Next Priorities**

Change the IAP row from 🔴 Critical to ✅ done, or remove it:

```
| ~~🔴 Critical~~ | ~~**IAP / RevenueCat**~~ | ~~Paywall calls `markComplete()` only — no real billing~~ |
```

And add new critical item if needed:

```
| 🟡 Medium | **Push notif → navigate** | `_onTap` in `notifications_service.dart` is empty |
```

- [ ] **Step 4: Update session context**

```
- **Last commit:** `<hash>` — IAP RevenueCat complete (session 10)
```

- [ ] **Step 5: Commit**

```bash
git add kaxa/CLAUDE.md
git commit -m "docs: CLAUDE.md — IAP RevenueCat complete, session 10"
```

---

## Self-Review

**Spec coverage:**
- [x] `subscriptionStatusProvider` → Task 1
- [x] App-level gate (paywall when not premium) → Task 3 (AppScaffold)
- [x] "Ahora no" hidden in gate mode → Task 2 (allowSkip param)
- [x] Reactive: purchase unlocks app without Navigator → Task 2 `_navigateHome` guard + Task 3 reactive gate
- [x] Restore purchases → existing `_onRestore` in `SuscripcionScreen` (no change needed)
- [x] API key → Task 4
- [x] RC Dashboard + Play Console setup → Task 4B/4C

**No placeholders:** All code blocks complete.

**Type consistency:**
- `subscriptionStatusProvider` defined Task 1 → imported in Task 3 ✅
- `SuscripcionScreen(allowSkip: false)` used in Task 3 → param added in Task 2 ✅
- `PurchasesKeys.entitlement` used in Task 1 → already defined in `purchases_service.dart` ✅
- `_navigateHome` guard uses `widget.allowSkip` → field added Task 2 Step 1 ✅
