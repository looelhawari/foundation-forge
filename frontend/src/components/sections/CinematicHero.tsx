import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, memo, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import heroImage from "@/assets/hero-construction.jpg";
import flyoverVideo from "@/assets/cpc.mp4";

const ease = [0.16, 1, 0.3, 1] as const;

/* ── Word-by-word reveal ─────────────────────────────────────── */
const SplitReveal = ({ text, delay = 0 }: { text: string; delay?: number }) => (
  <span className="inline-flex flex-wrap">
    {text.split(" ").map((word, i) => (
      <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
        <motion.span
          className="inline-block"
          initial={{ y: "110%", skewY: 7 }}
          animate={{ y: "0%", skewY: 0 }}
          transition={{ duration: 0.9, delay: delay + i * 0.08, ease }}
        >
          {word}
        </motion.span>
      </span>
    ))}
  </span>
);

/* ── Counter ─────────────────────────────────────────────────── */
const AnimNum = ({ to, suffix = "" }: { to: number; suffix?: string }) => {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf: number;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / 2200, 1);
      setN(Math.round((1 - Math.pow(1 - p, 4)) * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return <>{n}{suffix}</>;
};

/* ════════════════════════════════════════════════════════════════
   MAIN COMPONENT — 2 scenes: hero image → flyover video
   ════════════════════════════════════════════════════════════════ */
export const CinematicHero = memo(() => {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
    requestAnimationFrame(() => setReady(true));
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Scene 1 (hero image): visible 0 → 0.15, fades out by 0.2
  const s1Opacity = useTransform(scrollYProgress, [0, 0.12, 0.2], [1, 1, 0]);
  const s1Scale = useTransform(scrollYProgress, [0, 0.2], [1, 1.08]);
  const s1TextY = useTransform(scrollYProgress, [0, 0.2], ["0%", "-20%"]);

  // Scene 2 (video): fades in 0.12 → 0.2, stays until end
  const s2Opacity = useTransform(scrollYProgress, [0.12, 0.2], [0, 1]);

  // Play video when scene 2 becomes visible
  useEffect(() => {
    if (isMobile) return; // mobile uses autoPlay attribute instead
    const unsubscribe = s2Opacity.on("change", (v) => {
      if (videoRef.current && v > 0.1) {
        videoRef.current.play().catch(() => { });
      }
    });
    return unsubscribe;
  }, [s2Opacity, isMobile]);

  return (
    <section ref={ref} className={`relative ${isMobile ? 'h-[250vh]' : 'h-[300vh]'}`}>
      <div className="sticky top-0 h-screen overflow-hidden bg-black" style={{ willChange: 'transform' }}>

        {/* ─── OPENING CURTAIN ─── */}
        {ready && (
          <>
            <motion.div className="absolute inset-x-0 top-0 bg-black z-50 pointer-events-none origin-top"
              initial={{ scaleY: 1 }} animate={{ scaleY: 0 }}
              transition={{ duration: 1.4, delay: 0.1, ease }} />
            <motion.div className="absolute inset-x-0 bottom-0 bg-black z-50 pointer-events-none origin-bottom"
              initial={{ scaleY: 1 }} animate={{ scaleY: 0 }}
              transition={{ duration: 1.4, delay: 0.1, ease }} />
          </>
        )}

        {/* ═══════════ SCENE 1: HERO IMAGE ═══════════ */}
        <motion.div style={{ opacity: s1Opacity }} className="absolute inset-0 z-10">
          <motion.div className="absolute inset-0" style={{ scale: isMobile ? undefined : s1Scale, willChange: 'transform' }}>
            <motion.img
              src={heroImage}
              alt="CPC highway construction"
              className="w-full h-full object-cover"
              loading="eager"
              initial={{ scale: isMobile ? 1 : 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2.5, ease }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black" />
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 40%, transparent 30%, rgba(0,0,0,.55) 100%)" }} />
          </motion.div>

          <motion.div className="relative z-10 h-full flex items-center" style={{ y: isMobile ? 0 : s1TextY }}>
            <div className="container mx-auto px-6 lg:px-16">
              {/* Gold accent line */}
              <motion.div className="w-16 h-[2px] bg-primary mb-8 origin-left"
                initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.6, ease }} />

              {/* Tagline */}
              <motion.p className="text-primary/80 text-xs md:text-sm tracking-[0.6em] uppercase mb-6"
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.7, ease }}>
                SINCE 2017 — DOHA, QATAR
              </motion.p>

              {/* Headline */}
              <h1 className="font-display text-[clamp(2.5rem,10vw,7rem)] leading-[0.88] tracking-tight">
                {ready && (
                  <>
                    <SplitReveal text={t("hero.line1", "CONSTRUCTING THE")} delay={0.5} />
                    <br />
                    <span className="text-gradient">
                      <SplitReveal text={t("hero.line2", "ROADS")} delay={0.75} />
                    </span>
                    {" "}
                    <SplitReveal text={t("hero.line3", "OF TOMORROW")} delay={0.85} />
                  </>
                )}
              </h1>

              {/* Stats row */}
              <motion.div className="mt-10 sm:mt-14 flex flex-wrap gap-6 sm:gap-10 md:gap-16"
                initial={{ opacity: 0, y: 30 }} animate={ready ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.5, ease }}>
                {[
                  { n: 90, s: "+", l: t("hero.stat1", "Projects Delivered") },
                  { n: 10, s: "+", l: t("hero.stat2", "Years of Excellence") },
                  { n: 57, s: "+", l: t("hero.stat3", "Major Clients") },
                ].map((d, i) => (
                  <motion.div key={d.l}
                    initial={{ opacity: 0, y: 20 }}
                    animate={ready ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 1.7 + i * 0.1, ease }}>
                    <div className="font-display text-3xl md:text-5xl text-primary tabular-nums">
                      {ready && <AnimNum to={d.n} suffix={d.s} />}
                    </div>
                    <div className="text-xs text-white/40 tracking-[0.2em] uppercase mt-1">{d.l}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Scroll prompt */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}>
            <span className="text-[9px] tracking-[0.5em] text-white/30 uppercase">{t("hero.scroll", "Scroll")}</span>
            <div className="w-5 h-9 rounded-full border border-white/15 flex justify-center pt-2">
              <motion.div className="w-0.5 h-1.5 rounded-full bg-primary"
                animate={{ y: [0, 10, 0], opacity: [0.8, 0.2, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
            </div>
          </motion.div>
        </motion.div>

        {/* ═══════════ SCENE 2: FLYOVER VIDEO ═══════════ */}
        <motion.div style={{ opacity: s2Opacity }} className="absolute inset-0 z-[5]">
          <video
            ref={videoRef}
            src={flyoverVideo}
            className="w-full h-full object-cover"
            muted
            playsInline
            preload={isMobile ? "auto" : "metadata"}
            autoPlay={isMobile}
            loop={isMobile}
          />
          {/* Subtle vignette on video */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,.4) 100%)" }} />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
        </motion.div>

        {/* ── Subtle top/bottom bars ── */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/30 to-transparent z-30 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent z-30 pointer-events-none" />
      </div>
    </section>
  );
});

CinematicHero.displayName = 'CinematicHero';
