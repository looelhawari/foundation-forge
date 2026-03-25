import { NextRequest, NextResponse } from 'next/server';
import { defaultLocale, locales, Locale } from './lib/i18n/config';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip middleware for:
  // - API routes
  // - Static files (_next/static)
  // - Image optimization (_next/image)
  // - Public files (favicon, robots, sitemap, etc.)
  // - Admin routes
  const shouldSkip =
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/admin') ||
    pathname.includes('/favicon') ||
    pathname.includes('/robots') ||
    pathname.includes('/sitemap') ||
    pathname.includes('/manifest') ||
    /\.(.*)$/.test(pathname); // Has file extension

  if (shouldSkip) {
    return NextResponse.next();
  }

  // Check if pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    // Already has locale, proceed
    return NextResponse.next();
  }

  // Determine locale from cookie, Accept-Language, or default
  let locale: Locale = defaultLocale;

  // 1. Check cookie
  const localeCookie = request.cookies.get('NEXT_LOCALE');
  if (localeCookie?.value && locales.includes(localeCookie.value as Locale)) {
    locale = localeCookie.value as Locale;
  } else {
    // 2. Check Accept-Language header
    const acceptLanguage = request.headers.get('accept-language');
    if (acceptLanguage?.includes('ar')) {
      locale = 'ar';
    }
  }

  // For default locale (en), don't rewrite - serve pages from root
  if (locale === defaultLocale) {
    const response = NextResponse.next();
    response.cookies.set('NEXT_LOCALE', locale, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });
    return response;
  }

  // For non-default locales (ar), rewrite to /{locale}/pathname
  const rewriteUrl = new URL(`/${locale}${pathname}${request.nextUrl.search}`, request.url);
  const response = NextResponse.rewrite(rewriteUrl);

  // Set locale cookie
  response.cookies.set('NEXT_LOCALE', locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365, // 1 year
  });

  return response;
}

export const config = {
  matcher: [
    // Match all pathnames except:
    // - API routes
    // - _next (internal Next.js routes)
    // - Static files
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};
