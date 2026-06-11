# Kaxa Website

Marketing website for [Kaxa](https://kaxa.lat) — landing page, legal pages (Privacy/Terms), and
support/FAQ, in Spanish (default) and English.

## Stack

- [Astro](https://astro.build) (static site)
- [Tailwind CSS v4](https://tailwindcss.com)
- [@fontsource/nunito](https://fontsource.org/fonts/nunito)
- [Vitest](https://vitest.dev) + Astro Container API for component tests

## Development

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:4321`.

## Testing

```bash
npx vitest run
```

## Build

```bash
npm run build
npm run preview
```

`npm run build` outputs the static site to `dist/`.

## Pages

| Route (ES) | Route (EN) |
|---|---|
| `/` | `/en/` |
| `/privacidad/` | `/en/privacy/` |
| `/terminos/` | `/en/terms/` |
| `/soporte/` | `/en/support/` |

## Deployment (Vercel)

1. Import this repository into Vercel.
2. Set the **Root Directory** to `website`.
3. Framework preset: **Astro** (Vercel auto-detects `astro.config.mjs`).
4. Build command: `npm run build` (default). Output directory: `dist` (default).
5. Add the custom domain `kaxa.lat` in the Vercel project's Domains settings and follow Vercel's
   DNS instructions to point the domain at Vercel.

No environment variables are required — the site is fully static and does not call any APIs.

## Updating content

All copy lives in `src/i18n/translations.ts` (`es` and `en` objects, mirrored structure). Update
both languages together — `tests/translations.test.ts` checks that the top-level keys, pricing
plan count, and FAQ item count stay in sync between languages.
