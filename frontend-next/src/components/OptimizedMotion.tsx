"use client";

import { motion, MotionProps, useReducedMotion } from 'framer-motion';
import { ComponentPropsWithoutRef, forwardRef } from 'react';

// Wrapper that disables complex animations on mobile or when user prefers reduced motion
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

interface OptimizedMotionDivProps extends MotionProps {
    className?: string;
    id?: string;
    style?: React.CSSProperties;
}

export const OptimizedMotionDiv = forwardRef<HTMLDivElement, OptimizedMotionDivProps>((props, ref) => {
    const shouldReduceMotion = useReducedMotion();

    if (isMobile || shouldReduceMotion) {
        // On mobile or reduced motion preference, render as regular div with minimal transitions
        const { animate, initial, whileInView, whileHover, whileTap, whileFocus, whileDrag, whileInViewport, viewport, transition, variants, style, onAnimationStart, onAnimationComplete, onUpdate, onDragStart, onDrag, onDragEnd, exit, layout, layoutId, layoutDependency, layoutScroll, ...divProps } = props as any;
        const { children, className, id, ...safeProps } = divProps;
        return <div ref={ref} className={className} id={id} style={{ ...(style as React.CSSProperties), willChange: 'auto' }}>{children}</div>;
    }

    // On desktop with motion enabled, use full motion.div with optimizations
    return <motion.div ref={ref} {...props} style={{ ...props.style, willChange: 'transform, opacity' }} />;
});

OptimizedMotionDiv.displayName = 'OptimizedMotionDiv';
