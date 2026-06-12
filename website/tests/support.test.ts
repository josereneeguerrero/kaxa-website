import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, it, expect } from 'vitest';
import Support from '../src/pages/soporte/index.astro';
import SupportEn from '../src/pages/en/support/index.astro';
import { translations } from '../src/i18n/translations';

describe('Support page', () => {
  it('renders the Spanish support page with FAQ and contact info', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Support);

    expect(result).toContain(translations.es.support.title);
    expect(result).toContain(translations.es.support.contactButton);
    expect(result).toContain(translations.es.faq.items[0].question);
    expect(result).toContain('soporte@kaxa.lat');
  });

  it('renders the English support page with FAQ and contact info', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(SupportEn);

    expect(result).toContain(translations.en.support.title);
    expect(result).toContain(translations.en.support.contactButton);
    expect(result).toContain(translations.en.faq.items[0].question);
    expect(result).toContain('soporte@kaxa.lat');
  });
});
