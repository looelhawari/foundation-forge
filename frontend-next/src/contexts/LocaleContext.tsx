'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Locale, defaultLocale } from '@/lib/i18n/config';
import { changeLanguage } from '@/lib/i18n/client';

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

interface LocaleProviderProps {
  children: ReactNode;
  initialLocale?: Locale;
}

export function LocaleProvider({ children, initialLocale = defaultLocale }: LocaleProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const router = useRouter();
  const pathname = usePathname();

  // Update i18next when locale changes
  useEffect(() => {
    changeLanguage(locale);
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
    if (newLocale === locale) return;

    // Update state
    setLocaleState(newLocale);

    // Update cookie
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`; // 1 year

    // Update localStorage
    localStorage.setItem('i18nextLng', newLocale);

    // Update HTML attributes
    document.documentElement.lang = newLocale;
    document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr';

    // Navigate to new locale path
    const currentPath = pathname || '/';

    // Remove existing locale prefix if present
    const pathWithoutLocale = currentPath.replace(/^\/(en|ar)/, '') || '/';

    // Navigate to new path
    if (newLocale === defaultLocale) {
      router.push(pathWithoutLocale);
    } else {
      router.push(`/${newLocale}${pathWithoutLocale}`);
    }
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}
