"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-6">
                <div className="text-center">
                    <h1 className="mb-4 text-6xl sm:text-7xl md:text-8xl font-bold font-display text-primary">404</h1>
                    <p className="mb-6 text-lg sm:text-xl text-muted-foreground">Oops! Page not found</p>
                    <a href="/" className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium tracking-wider uppercase text-sm">
                        Return to Home
                    </a>
                </div>
            </div>
            <Footer />
        </div>
    );
}
