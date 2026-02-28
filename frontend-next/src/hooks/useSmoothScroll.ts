"use client";

import { useEffect, useRef } from 'react';

export const useSmoothScroll = () => {
    const lenisRef = useRef<any>(null);

    useEffect(() => {
        // Disable smooth scroll on mobile/tablet for better performance
        const isMobile = window.innerWidth < 1024;

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (isMobile || prefersReducedMotion) {
            return;
        }

        // Lazy-load Lenis only on desktop — saves ~15-20KB parse time on mobile
        let rafId: number;
        let lenisInstance: any;

        import('@studio-freight/lenis').then(({ default: Lenis }) => {
            const lenis = new Lenis({
                duration: 0.8,
                easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                orientation: 'vertical',
                gestureOrientation: 'vertical',
                smoothWheel: true,
                wheelMultiplier: 1,
                touchMultiplier: 1.5,
                infinite: false,
            });

            lenisInstance = lenis;
            lenisRef.current = lenis;

            // Use a more efficient animation frame loop
            let lastTime = 0;
            const targetFPS = 60;
            const frameInterval = 1000 / targetFPS;

            function raf(time: number) {
                const deltaTime = time - lastTime;

                // Throttle to target FPS for better performance
                if (deltaTime >= frameInterval) {
                    lenis.raf(time);
                    lastTime = time - (deltaTime % frameInterval);
                }

                rafId = requestAnimationFrame(raf);
            }

            rafId = requestAnimationFrame(raf);
        });

        // Cleanup
        return () => {
            cancelAnimationFrame(rafId);
            lenisInstance?.destroy();
        };
    }, []);

    return lenisRef;
};
