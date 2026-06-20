# Google Play Console — Kaxa Submission Checklist

## Data Safety Form

Navigate to **Play Console → App content → Data safety**

### Initial Questions

| Question | Answer |
|---|---|
| Does your app collect or share any required user data types? | **Yes** |
| Is all user data encrypted in transit? | **Yes** |
| Do you provide a way for users to request data deletion? | **Yes** (Ajustes → Eliminar todos los datos) |

### Data Types to Declare

| Data Type | Collected | Shared | Optional? | Purpose |
|---|---|---|---|---|
| **Personal Info → Name** | Yes | No | Optional | App functionality |
| **Financial Info → Purchase history** | Yes | No | Required | App functionality (RevenueCat) |
| **Financial Info → Other financial info** | Yes | No | Required | App functionality (expenses, income, budgets) |

**Do NOT declare:** Location, Email, Health, Messages, Photos, Device IDs (RevenueCat anonymous ID is not a device identifier per Google's definition).

---

## IARC Content Rating

Navigate to **Play Console → App content → Content rating → Start**

- Category: **"Utility, Productivity, Communication, or other"**
- Violence: **No** | Sexual content: **No** | Language: **No**
- Drugs/Alcohol: **No** | Gambling: **No**
- User interaction: **No** | UGC: **No** | Location sharing: **No**
- In-app purchases: **Yes**

**Expected rating: PEGI 3 / Everyone (E)**

---

## App Content Declarations

| Declaration | Answer |
|---|---|
| **Target audience** | Ages 18 and over only (DO NOT select under 18) |
| **Ads** | No, my app does not contain ads |
| **Financial features** | My app doesn't provide any financial features |
| **Government app** | No |
| **Health features** | No |
| **App access** | All functionality available without special access (paywall is within the app, not a login gate) |
| **Privacy policy URL** | `https://kaxa.lat/privacidad` |

---

## Store Listing Assets

| Asset | Spec | Status |
|---|---|---|
| App icon | 512×512 px, 32-bit PNG with alpha, max 1 MB | ⬜ Needed |
| Feature graphic | 1024×500 px, JPEG or 24-bit PNG, max 1 MB | ⬜ Needed |
| Phone screenshots | Min 2 (recommended 6-8), 1080×1920 or 1290×2796, JPEG/PNG, max 8 MB each | ⬜ Needed |
| App name | `Kaxa - Control de Gastos y Presupuesto` (40 chars) | ✅ Ready |
| Short description | `Controla gastos, crea presupuestos y ahorra. Finanzas personales simples.` (74 chars) | ✅ Ready |
| Full description | 4000 chars max — see production-launch.md | ✅ Ready |

---

## Subscription Compliance

Must show BEFORE user taps subscribe:
- [x] Exact subscription price and currency
- [x] Billing frequency (weekly/monthly/yearly)
- [x] Auto-renewal statement
- [x] Free trial duration + auto-convert disclosure (weekly plan)
- [x] Cancellation instructions (Google Play → Suscripciones → Kaxa)
- [x] All in user's local language

Kaxa's paywall (`premium_paywall_sheet.dart` + `suscripcion_screen.dart`) already shows:
- Plan prices from RevenueCat (localized)
- Legal text with auto-renewal + cancellation instructions
- Trial disclosure only when weekly plan selected

---

## Pre-Submission Verification

### Code/Build
- [x] targetSdk 36 (Android 16)
- [x] Release-signed AAB (not APK, not debug)
- [x] 0 flutter analyze errors
- [x] Debug code gated with `kDebugMode`
- [x] All permissions justified (biometric, notifications, alarm, boot)
- [ ] Verify 16KB page alignment: `zipalign -c -P 16 -v 4 app-release.aab`

### Legal
- [ ] kaxa.lat/terminos returns 200 (currently 404 — BLOCKER)
- [ ] kaxa.lat/privacidad updated with RevenueCat disclosure
- [ ] Privacy policy matches Data Safety declarations

### Account Deletion
- [x] In-app: Ajustes → Eliminar todos los datos (3-step confirmation)
- [x] Disclaimer clarifies deletion ≠ subscription cancellation

### Testing Gate (Personal Account)
- [ ] 12 testers recruited with Gmail accounts
- [ ] AAB uploaded to closed testing track
- [ ] 14 consecutive days of testing completed
- [ ] "Request production access" clicked

---

## Common Rejection Risks for Kaxa

| Risk | Status | Notes |
|---|---|---|
| Incomplete Data Safety form | ⬜ | Must declare RevenueCat purchase history |
| Privacy policy mismatch | 🔴 | Policy says "no data leaves device" but RevenueCat sends data |
| Broken legal links | 🔴 | kaxa.lat/terminos = 404 |
| Missing subscription disclosures | ✅ | Paywall shows price + trial + auto-renewal + cancellation |
| Permission justification | ✅ | All 7 permissions correspond to visible features |
| Crash on launch | ✅ | Tested on R5CX70B52DR, no crashes |
| Financial features misclass | ⬜ | Must select "no financial features" (tracker, not service) |
| Account deletion | ✅ | 3-step delete flow with disclaimer |

---

## Timeline (Personal Developer Account)

```
Day 1:    Upload AAB to closed testing, recruit 12 testers
Day 1-14: Closed testing period (testers must install + use)
Day 15:   "Request production access" available → click it
Day 15-22: Google production access review (3-7 days)
Day 22-25: Create production release → Google review (1-3 days)
~Day 25:   LIVE on Google Play
```
