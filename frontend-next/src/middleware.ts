import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/config';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed', // Only add prefix for non-default locale
});

export const config = {
  // Match all pathnames except:
  // - API routes
  // - _next (internal Next.js routes)  
  // - Static files
  // - Admin routes (keep admin in English only)
  matcher: ['/((?!api|_next|admin|.*\\..*).*)'],
};
