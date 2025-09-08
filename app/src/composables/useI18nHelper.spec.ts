import { describe, it, expect } from 'vitest';
import { useI18nHelper } from './useI18nHelper';

describe('useI18nHelper', () => {
  it('enables locales', async () => {
    const helper = useI18nHelper();
    await helper.enableLocales(['en', 'pt-br']);
    expect(helper.enabledLocales.find((l) => l.code === 'en')).toBeTruthy();
    expect(helper.enabledLocales.find((l) => l.code === 'pt-br')).toBeTruthy();
  });
});
