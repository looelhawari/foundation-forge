import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

export const useSmoothScroll = () => {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        // Disable smooth scroll on mobile for better performance
        const isMobile = window.innerWidth < 768;
        if (isMobile) {
            return;
        }

        // Initialize Lenis
        const lenis = new Lenis({
            duration: 1,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 0.8,
            touchMultiplier: 2,
            infinite: false,
        });

        lenisRef.current = lenis;

        // Animation frame loop
        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Cleanup
        return () => {
            lenis.destroy();
        };
    }, []);

    return lenisRef;
};
