import { Metadata } from 'next';
import { getServerTranslation } from './server';
import { Locale, Namespace } from './config';
import { getLocaleCode } from './locales';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://cpc-qa.com';

export async function generateLocalizedMetadata(
  locale: Locale,
  namespace: Namespace,
  pageKey: string,
  options: {
    path?: string;
    includeAlternates?: boolean;
  } = {}
): Promise<Metadata> {
  const { path = '', includeAlternates = true } = options;
  const { t } = await getServerTranslation(locale, namespace);

  const title = t(`${pageKey}.title`);
  const description = t(`${pageKey}.description`);

  // Handle keywords - check if it exists and is an array
  let keywords: string[] | undefined;
  try {
    const keywordsValue = t(`${pageKey}.keywords`, { returnObjects: true });
    if (Array.isArray(keywordsValue)) {
      keywords = keywordsValue as string[];
    }
  } catch {
    // Keywords not available for this page
    keywords = undefined;
  }

  const localeCode = getLocaleCode(locale);
  const alternateLocale = locale === 'en' ? 'ar_QA' : 'en_US';

  const metadata: Metadata = {
    title,
    description,
    ...(keywords && keywords.length > 0 ? { keywords } : {}),
    openGraph: {
      title,
      description,
      locale: localeCode,
      alternateLocale: [alternateLocale],
      siteName: 'CPC Qatar',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };

  if (includeAlternates) {
    const canonicalPath = locale === 'ar' ? `/ar${path}` : path;

    metadata.alternates = {
      canonical: `${SITE_URL}${canonicalPath}`,
      languages: {
        'en': `${SITE_URL}${path}`,
        'ar': `${SITE_URL}/ar${path}`,
        'x-default': `${SITE_URL}${path}`,
      },
    };
  }

  return metadata;
}
