"use client";

import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { useRef, ReactNode } from "react";

// Horizontal scroll section
interface HorizontalScrollProps {
  children: ReactNode;
  className?: string;
}

export const HorizontalScroll = ({ children, className = "" }: HorizontalScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);

  return (
    <section ref={containerRef} className={`relative ${className}`}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ x }} className="flex h-full">
          {children}
        </motion.div>
      </div>
    </section>
  );
};

// Zoom on scroll
interface ZoomScrollProps {
  children: ReactNode;
  className?: string;
}

export const ZoomScroll = ({ children, className = "" }: ZoomScrollProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <motion.div ref={ref} style={{ scale, opacity }} className={className}>
      {children}
    </motion.div>
  );
};

// Split text on scroll
interface SplitScrollTextProps {
  leftText: string;
  rightText: string;
  className?: string;
}

export const SplitScrollText = ({ leftText, rightText, className = "" }: SplitScrollTextProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const leftX = useTransform(scrollYProgress, [0, 1], ["-100%", "0%"]);
  const rightX = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div className="flex justify-center gap-4">
        <motion.span style={{ x: leftX }} className="font-display text-5xl md:text-7xl lg:text-9xl">
          {leftText}
        </motion.span>
        <motion.span style={{ x: rightX }} className="font-display text-5xl md:text-7xl lg:text-9xl text-gradient">
          {rightText}
        </motion.span>
      </div>
    </div>
  );
};

// Pinned section with content reveal
interface PinnedSectionProps {
  title: string;
  items: { title: string; description: string }[];
  className?: string;
}

export const PinnedSection = ({ title, items, className = "" }: PinnedSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={containerRef} className={`relative ${className}`} style={{ height: `${items.length * 100}vh` }}>
      <div className="sticky top-0 h-screen flex items-center">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.h2 className="font-display text-6xl md:text-7xl lg:text-8xl tracking-[0.05em]">
              {title}
            </motion.h2>
            <div className="relative h-[300px]">
              {items.map((item, index) => {
                const start = index / items.length;
                const end = (index + 1) / items.length;
                return (
                  <PinnedItem 
                    key={index} 
                    item={item} 
                    scrollProgress={scrollYProgress} 
                    start={start} 
                    end={end}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PinnedItem = ({ 
  item, 
  scrollProgress, 
  start, 
  end 
}: { 
  item: { title: string; description: string }; 
  scrollProgress: MotionValue<number>;
  start: number;
  end: number;
}) => {
  const opacity = useTransform(
    scrollProgress,
    [start, start + 0.1, end - 0.1, end],
    [0, 1, 1, 0]
  );
  const y = useTransform(scrollProgress, [start, start + 0.1], [50, 0]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col justify-center"
    >
      <h3 className="font-display text-3xl md:text-4xl tracking-wide mb-4 text-gradient">
        {item.title}
      </h3>
      <p className="text-xl text-muted-foreground leading-relaxed">
        {item.description}
      </p>
    </motion.div>
  );
};

// Number counter on scroll
interface ScrollCounterProps {
  from: number;
  to: number;
  suffix?: string;
  className?: string;
}

export const ScrollCounter = ({ from, to, suffix = "", className = "" }: ScrollCounterProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const rawValue = useTransform(scrollYProgress, [0, 1], [from, to]);
  const springValue = useSpring(rawValue, { stiffness: 100, damping: 30 });

  return (
    <motion.div ref={ref} className={className}>
      <motion.span>{springValue}</motion.span>{suffix}
    </motion.div>
  );
};

// Reveal sections with sticky header
interface StickyRevealProps {
  sections: { id: string; title: string; content: ReactNode }[];
  className?: string;
}

export const StickyReveal = ({ sections, className = "" }: StickyRevealProps) => {
  return (
    <div className={className}>
      {sections.map((section, index) => (
        <StickyRevealSection key={section.id} section={section} index={index} />
      ))}
    </div>
  );
};

const StickyRevealSection = ({ 
  section, 
  index 
}: { 
  section: { id: string; title: string; content: ReactNode };
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.9]);

  return (
    <motion.section
      ref={ref}
      style={{ opacity, scale }}
      className="min-h-screen flex items-center py-24"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
        >
          <span className="text-primary font-display text-lg tracking-[0.3em] mb-4 block">
            0{index + 1}
          </span>
          <h2 className="font-display text-5xl md:text-6xl tracking-[0.05em] mb-8">
            {section.title}
          </h2>
          {section.content}
        </motion.div>
      </div>
    </motion.section>
  );
};

// Word by word reveal on scroll
interface WordRevealProps {
  text: string;
  className?: string;
}

export const WordReveal = ({ text, className = "" }: WordRevealProps) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const words = text.split(" ");

  return (
    <p ref={ref} className={`flex flex-wrap gap-x-2 gap-y-1 ${className}`}>
      {words.map((word, index) => {
        const start = index / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={index} word={word} scrollProgress={scrollYProgress} start={start} end={end} />
        );
      })}
    </p>
  );
};

const Word = ({ 
  word, 
  scrollProgress, 
  start, 
  end 
}: { 
  word: string; 
  scrollProgress: MotionValue<number>;
  start: number;
  end: number;
}) => {
  const opacity = useTransform(scrollProgress, [start, end], [0.2, 1]);

  return (
    <motion.span style={{ opacity }} className="inline-block">
      {word}
    </motion.span>
  );
};

// Rotating text carousel on scroll
interface RotatingTextProps {
  texts: string[];
  className?: string;
}

export const RotatingText = ({ texts, className = "" }: RotatingTextProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <motion.div ref={ref} style={{ rotate }} className={className}>
      {texts.map((text, index) => (
        <span
          key={index}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-6xl whitespace-nowrap"
          style={{
            transform: `rotate(${(360 / texts.length) * index}deg) translateY(-150px)`,
          }}
        >
          {text}
        </span>
      ))}
    </motion.div>
  );
};
