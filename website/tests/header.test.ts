import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, it, expect } from 'vitest';
import Header from '../src/components/Header.astro';

describe('Header', () => {
  it('links to the English homepage from the Spanish homepage', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Header, {
      props: { lang: 'es', currentRoute: 'home' },
    });

    expect(result).toContain('href="/en/"');
    expect(result).toContain('Cómo funciona');
    expect(result).toContain('Precios');
  });

  it('links to the Spanish homepage from the English homepage', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Header, {
      props: { lang: 'en', currentRoute: 'home' },
    });

    expect(result).toContain('href="/"');
    expect(result).toContain('How it works');
    expect(result).toContain('Pricing');
  });
});
