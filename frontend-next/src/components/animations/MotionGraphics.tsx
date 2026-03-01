"use client";

import { motion, useScroll, useTransform, useInView, useSpring, useReducedMotion, useMotionValue } from "framer-motion";
import { useRef, useEffect, useState, useMemo, memo } from "react";

// SSR-safe mobile check — defaults to true (mobile-first) when window is unavailable
const isMobile = typeof window === 'undefined' || window.innerWidth < 768;
const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Floating particles effect - optimized with fewer particles
export const FloatingParticles = memo(() => {
  const shouldReduceMotion = useReducedMotion();

  // Reduce particles on mobile or reduced motion
  const particleCount = shouldReduceMotion || isMobile ? 5 : 10;
  const particles = useMemo(() => Array.from({ length: particleCount }), [particleCount]);

  if (shouldReduceMotion) {
    return null;
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary/30 rounded-full"
          style={{
            left: `${(i * 10) + 5}%`,
            top: `${(i * 12) % 100}%`,
            willChange: 'transform, opacity',
          }}
          animate={{
            y: [0, -300],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 8 + (i % 4) * 2,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
});

FloatingParticles.displayName = 'FloatingParticles';

// Animated counter with spring physics
interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export const AnimatedCounter = ({ value, suffix = "", prefix = "", className = "" }: AnimatedCounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const startTime = Date.now();
      const startValue = 0;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        setDisplayValue(Math.floor(startValue + (value - startValue) * eased));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className={className}>
      {prefix}{displayValue}{suffix}
    </span>
  );
};

// Magnetic button effect
interface MagneticProps {
  children: React.ReactNode;
  className?: string;
}

export const Magnetic = ({ children, className = "" }: MagneticProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouse = (e: React.MouseEvent) => {
    const { width, height, left, top } = ref.current!.getBoundingClientRect();
    x.set((e.clientX - (left + width / 2)) * 0.3);
    y.set((e.clientY - (top + height / 2)) * 0.3);
  };

  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Text reveal with mask
interface MaskTextProps {
  children: string;
  className?: string;
  delay?: number;
}

export const MaskText = ({ children, className = "", delay = 0 }: MaskTextProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        initial={{ y: "100%", rotate: 5 }}
        animate={isInView ? { y: 0, rotate: 0 } : { y: "100%", rotate: 5 }}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
};

// Stagger reveal container
interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

export const StaggerContainer = ({ children, className = "", staggerDelay = 0.1 }: StaggerContainerProps) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 50, scale: 0.9 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

// Parallax wrapper
interface ParallaxProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export const Parallax = ({ children, speed = 0.5, className = "" }: ParallaxProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
};

// 3D Card tilt effect
interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

export const TiltCard = ({ children, className = "" }: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 400, damping: 30 });
  const springY = useSpring(rotateY, { stiffness: 400, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    rotateX.set((y - 0.5) * -20);
    rotateY.set((x - 0.5) * 20);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Scroll-triggered line drawing
interface DrawLineProps {
  className?: string;
}

export const DrawLine = ({ className = "" }: DrawLineProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div ref={ref} className={`h-px bg-border relative overflow-hidden ${className}`}>
      <motion.div
        style={{ scaleX }}
        className="absolute inset-0 bg-gradient-gold origin-left"
      />
    </div>
  );
};

// Rotating text around a circle
export const CircularText = ({ text, className = "" }: { text: string; className?: string }) => {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className={`relative ${className}`}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <path
            id="circle"
            d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
          />
        </defs>
        <text className="fill-current text-[8px] font-display tracking-[0.3em]">
          <textPath href="#circle">{text}</textPath>
        </text>
      </svg>
    </motion.div>
  );
};

// Glitch text effect
export const GlitchText = ({ children, className = "" }: { children: string; className?: string }) => {
  return (
    <div className={`relative ${className}`}>
      <span className="relative z-10">{children}</span>
      <motion.span
        className="absolute top-0 left-0 text-primary/50 z-0"
        animate={{
          x: [0, 2, -2, 0],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 3 }}
      >
        {children}
      </motion.span>
      <motion.span
        className="absolute top-0 left-0 text-destructive/30 z-0"
        animate={{
          x: [0, -2, 2, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 3, delay: 0.1 }}
      >
        {children}
      </motion.span>
    </div>
  );
};

// Morphing blob - optimized with CSS animations for better performance
export const MorphingBlob = memo(({ className = "" }: { className?: string }) => {
  const shouldReduceMotion = useReducedMotion();

  // Use simpler animation on mobile or reduced motion preference
  if (shouldReduceMotion || isMobile) {
    return (
      <div
        className={`absolute bg-primary/10 rounded-full blur-3xl ${className}`}
        style={{ willChange: 'auto' }}
      />
    );
  }

  return (
    <motion.div
      className={`absolute bg-primary/10 rounded-full blur-3xl ${className}`}
      style={{ willChange: 'transform' }}
      animate={{
        scale: [1, 1.15, 1],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
});

MorphingBlob.displayName = 'MorphingBlob';

// Scroll progress indicator - optimized
export const ScrollProgress = memo(() => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });

  return (
    <motion.div
      style={{ scaleX, willChange: 'transform' }}
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-gold origin-left z-[100]"
    />
  );
});

ScrollProgress.displayName = 'ScrollProgress';

// Image reveal on scroll
interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
}

export const ImageReveal = ({ src, alt, className = "" }: ImageRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial={{ scaleY: 1 }}
        animate={isInView ? { scaleY: 0 } : { scaleY: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 bg-primary origin-bottom z-10"
      />
      <motion.img
        src={src}
        alt={alt}
        initial={{ scale: 1.4 }}
        animate={isInView ? { scale: 1 } : { scale: 1.4 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="w-full h-full object-cover"
      />
    </div>
  );
};
