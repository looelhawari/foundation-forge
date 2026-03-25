import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { locales, Locale } from '@/lib/i18n/config';
import { getDirection } from '@/lib/i18n/locales';
import { generateLocalizedMetadata } from '@/lib/i18n/metadata';
import ClientProviders from '@/components/ClientProviders';
import HTMLAttributesUpdater from '@/components/HTMLAttributesUpdater';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;

  return generateLocalizedMetadata(locale, 'metadata', 'home', {
    path: '/',
  });
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  // Validate locale
  if (!locales.includes(locale)) {
    notFound();
  }

  const dir = getDirection(locale);

  return (
    <>
      <HTMLAttributesUpdater locale={locale} dir={dir} />
      <ClientProviders locale={locale}>
        {children}
      </ClientProviders>
    </>
  );
}
