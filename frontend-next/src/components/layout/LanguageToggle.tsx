'use client';

import { useLocale } from '@/contexts/LocaleContext';
import { Locale } from '@/lib/i18n/config';
import { localeNames } from '@/lib/i18n/locales';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function LanguageToggle() {
  const { locale, setLocale } = useLocale();

  const handleLanguageChange = (newLocale: Locale) => {
    if (newLocale !== locale) {
      setLocale(newLocale);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-xs sm:text-sm font-medium"
          aria-label="Change language"
        >
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{localeNames[locale]}</span>
          <span className="sm:hidden">{locale.toUpperCase()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[120px]">
        <DropdownMenuItem
          onClick={() => handleLanguageChange('en')}
          className={`cursor-pointer ${locale === 'en' ? 'bg-accent' : ''}`}
        >
          <span className="flex items-center justify-between w-full">
            <span>English</span>
            {locale === 'en' && <span className="ml-2 text-primary">✓</span>}
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleLanguageChange('ar')}
          className={`cursor-pointer ${locale === 'ar' ? 'bg-accent' : ''}`}
          dir="rtl"
        >
          <span className="flex items-center justify-between w-full">
            <span>العربية</span>
            {locale === 'ar' && <span className="mr-2 text-primary">✓</span>}
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
