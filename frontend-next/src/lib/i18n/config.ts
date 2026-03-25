import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const defaultLocale = 'en' as const;
export const locales = ['en', 'ar'] as const;
export type Locale = (typeof locales)[number];

export const namespaces = [
  'common',
  'header',
  'footer',
  'home',
  'about',
  'services',
  'contact',
  'certificates',
  'clients',
  'legal',
  'metadata',
  'forms',
  'structured-data',
] as const;

export type Namespace = (typeof namespaces)[number];

export const defaultNamespace: Namespace = 'common';

export function getI18nConfig(locale: Locale = defaultLocale) {
  return {
    lng: locale,
    fallbackLng: defaultLocale,
    supportedLngs: locales,
    defaultNS: defaultNamespace,
    ns: namespaces,
    interpolation: {
      escapeValue: false, // React already escapes
    },
    react: {
      useSuspense: false,
    },
  };
}

export default i18n;
