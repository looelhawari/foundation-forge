import { createInstance } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next/initReactI18next';
import { getI18nConfig, defaultLocale, Namespace, Locale } from './config';
import { cookies, headers } from 'next/headers';

async function initI18next(lng: string, ns?: Namespace | Namespace[]) {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`../../../public/locales/${language}/${namespace}.json`)
      )
    )
    .init({
      ...getI18nConfig(lng as Locale),
      lng,
      ns,
    });

  return i18nInstance;
}

export async function getServerTranslation(
  lng: string,
  ns?: Namespace | Namespace[],
  options: { keyPrefix?: string } = {}
) {
  const i18nextInstance = await initI18next(lng, ns);
  return {
    t: i18nextInstance.getFixedT(lng, Array.isArray(ns) ? ns[0] : ns, options.keyPrefix),
    i18n: i18nextInstance,
  };
}

export async function getLocaleFromServer(): Promise<Locale> {
  // Try to get from cookie first
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get('NEXT_LOCALE');

  if (localeCookie?.value && ['en', 'ar'].includes(localeCookie.value)) {
    return localeCookie.value as Locale;
  }

  // Fall back to Accept-Language header
  const headersList = await headers();
  const acceptLang = headersList.get('accept-language');

  if (acceptLang?.includes('ar')) {
    return 'ar';
  }

  return defaultLocale;
}
