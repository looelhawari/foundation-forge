import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n/config';
import { Tajawal } from 'next/font/google';
import dynamic from 'next/dynamic';

// Arabic font for RTL support
const tajawal = Tajawal({
  subsets: ['arabic', 'latin'],
  display: 'swap',
  weight: ['300', '400', '500', '700'],
  variable: '--font-tajawal',
  preload: true,
});

// Lazy-load ConsentBanner — not needed until after page renders
const ConsentBanner = dynamic(() => import('@/components/ConsentBanner'), { ssr: false });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: LocaleLayoutProps) {
  // Validate locale
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Get messages for the locale
  const messages = await getMessages();

  const isRTL = locale === 'ar';

  return (
    <div 
      lang={locale} 
      dir={isRTL ? 'rtl' : 'ltr'}
      className={isRTL ? tajawal.variable : ''}
    >
      <NextIntlClientProvider messages={messages}>
        {children}
        <ConsentBanner />
      </NextIntlClientProvider>
    </div>
  );
}
