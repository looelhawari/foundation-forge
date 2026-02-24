"use client";

/**
 * ClientProviders — Client-side provider wrapper.
 * Wraps children with all context providers that require browser APIs.
 * This is the equivalent of the old App.tsx provider shell.
 */

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/hooks/useAuth";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import ScrollToTop from "@/components/ScrollToTop";
import ConsentBanner from "@/components/ConsentBanner";
import ErrorBoundary from "@/components/ErrorBoundary";

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
}: {
    children: React.ReactNode;
}) {
    return (
        <ErrorBoundary>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <TooltipProvider>
                        <Toaster />
                        <Sonner />
                        <ScrollToTop />
                        {children}
                        <ConsentBanner />
                    </TooltipProvider>
                </AuthProvider>
            </QueryClientProvider>
        </ErrorBoundary>
    );
}
