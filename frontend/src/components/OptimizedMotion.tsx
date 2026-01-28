import { motion, MotionProps, useReducedMotion } from 'framer-motion';
import { ComponentPropsWithoutRef, forwardRef } from 'react';

// Wrapper that disables complex animations on mobile or when user prefers reduced motion
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

interface OptimizedMotionDivProps extends MotionProps, ComponentPropsWithoutRef<'div'> { }

export const OptimizedMotionDiv = forwardRef<HTMLDivElement, OptimizedMotionDivProps>((props, ref) => {
    const shouldReduceMotion = useReducedMotion();

    if (isMobile || shouldReduceMotion) {
        // On mobile or reduced motion preference, render as regular div with minimal transitions
        const { animate, initial, whileInView, viewport, transition, variants, style, ...restProps } = props;
        return <div ref={ref} {...restProps} style={{ ...style, willChange: 'auto' }} />;
    }

    // On desktop with motion enabled, use full motion.div with optimizations
    return <motion.div ref={ref} {...props} style={{ ...props.style, willChange: 'transform, opacity' }} />;
});

OptimizedMotionDiv.displayName = 'OptimizedMotionDiv';
