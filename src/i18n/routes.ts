export type Lang = 'es' | 'en';

export const routes = {
  home: { es: '/', en: '/en/' },
  privacy: { es: '/privacidad/', en: '/en/privacy/' },
  terms: { es: '/terminos/', en: '/en/terms/' },
  support: { es: '/soporte/', en: '/en/support/' },
} as const;

export type RouteKey = keyof typeof routes;

export function otherLang(lang: Lang): Lang {
  return lang === 'es' ? 'en' : 'es';
}
