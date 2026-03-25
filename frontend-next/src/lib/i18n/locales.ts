import { Locale } from './config';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ar: 'العربية',
};

export const localeDisplayNames: Record<Locale, { native: string; english: string }> = {
  en: { native: 'English', english: 'English' },
  ar: { native: 'العربية', english: 'Arabic' },
};

export function isRTL(locale: Locale): boolean {
  return locale === 'ar';
}

export function getDirection(locale: Locale): 'ltr' | 'rtl' {
  return isRTL(locale) ? 'rtl' : 'ltr';
}

export function isValidLocale(locale: string): locale is Locale {
  return locale === 'en' || locale === 'ar';
}

export function getLocaleCode(locale: Locale): string {
  const localeCodes: Record<Locale, string> = {
    en: 'en_US',
    ar: 'ar_QA',
  };
  return localeCodes[locale];
}
