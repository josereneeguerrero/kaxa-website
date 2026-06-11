import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, it, expect } from 'vitest';
import Pricing from '../src/components/Pricing.astro';

describe('Pricing', () => {
  it('renders all three plan prices in Spanish', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Pricing, { props: { lang: 'es' } });

    expect(result).toContain('$1.99');
    expect(result).toContain('$4.99');
    expect(result).toContain('$24.99');
    expect(result).toContain('Prueba gratis 3 días');
    expect(result).toContain('Mejor valor');
  });

  it('renders all three plan prices in English', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Pricing, { props: { lang: 'en' } });

    expect(result).toContain('$1.99');
    expect(result).toContain('$4.99');
    expect(result).toContain('$24.99');
    expect(result).toContain('3-day free trial');
    expect(result).toContain('Best value');
  });
});
