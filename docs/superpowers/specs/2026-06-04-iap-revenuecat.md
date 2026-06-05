# IAP / RevenueCat Integration — Kaxa

**Date:** 2026-06-04
**Status:** Approved — implementing

---

## Goal

Gate the entire app behind a real subscription check using RevenueCat. No free access. "Ahora no" during onboarding marks onboarding complete, but the app-level gate immediately blocks entry until a plan is purchased.

---

## Plans

| ID | Price | Trial |
|----|-------|-------|
| `kaxa_premium_weekly` | $1.99/wk | 3 days |
| `kaxa_premium_monthly` | $4.99/mo | — |
| `kaxa_premium_yearly` | $24.99/yr | — |

Entitlement: `Kaxa Premium`
Offering: `default`

---

## Architecture

### 1. `subscriptionStatusProvider` (new file)

`StreamProvider<bool>` in `lib/core/providers/subscription_provider.dart`:
- Emits initial state via `Purchases.getCustomerInfo()`
- Registers `addCustomerInfoUpdateListener` for real-time updates
- Removes listener on dispose
- Emits `true` when `entitlements.active.containsKey('Kaxa Premium')`

### 2. App-level gate (`app.dart`)

```
!onboardingDone          → BienvenidaScreen
onboardingDone + loading → _SplashGate (dark container, no flash)
onboardingDone + isPremium=false → SuscripcionScreen(allowSkip: false)
onboardingDone + isPremium=true  → AppScaffold
```

When user purchases → RC fires listener → stream emits true → Riverpod rebuilds → AppScaffold appears automatically. No manual Navigator.push.

### 3. `SuscripcionScreen` — `allowSkip` param

- Add `final bool allowSkip` (default `true` for onboarding)
- When `false`: "Ahora no" button hidden, `_onSkip` is no-op
- Used as `SuscripcionScreen(allowSkip: false)` in app.dart gate

### 4. API key

Replace `test_rfMtbnIpPpCwWXQJzXhnUVDoBSz` with real RC Android key from dashboard.

---

## File Map

| File | Action |
|------|--------|
| `lib/core/providers/subscription_provider.dart` | Create |
| `lib/app.dart` | Modify — add subscription gate |
| `lib/features/onboarding/suscripcion_screen.dart` | Modify — `allowSkip` param |
| `lib/core/services/purchases_service.dart` | Modify — real API key |
| `kaxa/CLAUDE.md` | Update IAP status |

---

## Out of scope

- iOS (Android only for now)
- Backend webhook validation
- Subscription management screen (handled by Play Store)
