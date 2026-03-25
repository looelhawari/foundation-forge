'use client';

import i18next from 'i18next';
import { initReactI18next, useTranslation as useTranslationOrg } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { getI18nConfig, locales, defaultLocale, Namespace } from './config';

// Initialize i18next for client-side
const languageDetector = new LanguageDetector();
languageDetector.init({
  order: ['cookie', 'localStorage', 'navigator'],
  caches: ['cookie', 'localStorage'],
  cookieName: 'NEXT_LOCALE',
});

i18next
  .use(initReactI18next)
  .use(languageDetector)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`../../../public/locales/${language}/${namespace}.json`)
    )
  )
  .init({
    ...getI18nConfig(),
  });

export function useTranslation(ns: Namespace = 'common', options: any = {}) {
  return useTranslationOrg(ns, options);
}

export function changeLanguage(lng: string) {
  if (locales.includes(lng as any)) {
    return i18next.changeLanguage(lng);
  }
  return i18next.changeLanguage(defaultLocale);
}

export { i18next as i18n };
