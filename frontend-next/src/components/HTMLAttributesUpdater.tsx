'use client';

import { useEffect } from 'react';
import { Locale } from '@/lib/i18n/config';

interface HTMLAttributesUpdaterProps {
  locale: Locale;
  dir: 'ltr' | 'rtl';
}

export default function HTMLAttributesUpdater({ locale, dir }: HTMLAttributesUpdaterProps) {
  useEffect(() => {
    // Update HTML tag attributes
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
    document.documentElement.setAttribute('data-locale', locale);

    // Update font class based on locale
    const htmlElement = document.documentElement;
    if (locale === 'ar') {
      htmlElement.style.fontFamily = 'var(--font-tajawal), var(--font-inter), sans-serif';
    } else {
      htmlElement.style.fontFamily = 'var(--font-inter), sans-serif';
    }
  }, [locale, dir]);

  return null;
}
