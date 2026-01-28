import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

export const useSmoothScroll = () => {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        // Disable smooth scroll on mobile/tablet for better performance
        const isMobile = window.innerWidth < 1024;

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (isMobile || prefersReducedMotion) {
            return;
        }

        // Initialize Lenis with optimized settings
        const lenis = new Lenis({
            duration: 0.8,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 1.5,
            infinite: false,
        });

        lenisRef.current = lenis;

        // Use a more efficient animation frame loop
        let rafId: number;
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

        // Cleanup
        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
        };
    }, []);

    return lenisRef;
};
