"use client";

/**
 * ClientProviders — Client-side provider wrapper.
 * Wraps children with all context providers that require browser APIs.
 * This is the equivalent of the old App.tsx provider shell.
 */

import dynamic from "next/dynamic";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/hooks/useAuth";
import { SiteSettingsProvider } from "@/hooks/useSiteSettings";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import ScrollToTop from "@/components/ScrollToTop";
import ErrorBoundary from "@/components/ErrorBoundary";
import { I18nextProvider } from "react-i18next";
import { LocaleProvider } from "@/contexts/LocaleContext";
import { i18n } from "@/lib/i18n/client";
import { Locale, defaultLocale } from "@/lib/i18n/config";

// Lazy-load ConsentBanner — not needed until after page renders
const ConsentBanner = dynamic(() => import("@/components/ConsentBanner"), { ssr: false });

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            gcTime: 1000 * 60 * 10, // 10 minutes
            refetchOnWindowFocus: false,
            retry: 1,
        },
    },
});

export default function ClientProviders({
    children,
    locale = defaultLocale,
}: {
    children: React.ReactNode;
    locale?: Locale;
}) {
    return (
        <ErrorBoundary>
            <I18nextProvider i18n={i18n}>
                <LocaleProvider initialLocale={locale}>
                    <QueryClientProvider client={queryClient}>
                        <AuthProvider>
                            <SiteSettingsProvider>
                                <TooltipProvider>
                                    <Toaster />
                                    <Sonner />
                                    <ScrollToTop />
                                    {children}
                                    <ConsentBanner />
                                </TooltipProvider>
                            </SiteSettingsProvider>
                        </AuthProvider>
                    </QueryClientProvider>
                </LocaleProvider>
            </I18nextProvider>
        </ErrorBoundary>
    );
}
