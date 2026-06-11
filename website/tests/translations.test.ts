import { describe, it, expect } from 'vitest';
import { translations } from '../src/i18n/translations';

describe('translations', () => {
  it('has matching top-level keys for es and en', () => {
    const esKeys = Object.keys(translations.es).sort();
    const enKeys = Object.keys(translations.en).sort();
    expect(enKeys).toEqual(esKeys);
  });

  it('has the same number of pricing plans in both languages', () => {
    expect(translations.en.pricing.plans).toHaveLength(
      translations.es.pricing.plans.length
    );
  });

  it('has the same number of FAQ items in both languages', () => {
    expect(translations.en.faq.items).toHaveLength(
      translations.es.faq.items.length
    );
  });
});
