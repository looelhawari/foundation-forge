import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MinimalHeader } from "@/components/layout/MinimalHeader";
import { MinimalFooter } from "@/components/layout/MinimalFooter";
import { MegaCTA } from "@/components/sections/MegaCTA";
import { ScrollProgress, AnimatedCounter, MorphingBlob, ImageReveal, TiltCard } from "@/components/animations/MotionGraphics";
import { Award, Users, Building, Target, Shield, Lightbulb, Star } from "lucide-react";
import engineerImage from "@/assets/engineer-portrait.jpg";
import heroImage from "@/assets/hero-construction.jpg";

const values = [
  {
    icon: Target,
    title: "PRECISION",
    description: "Every project is executed with meticulous attention to detail and engineering accuracy.",
  },
  {
    icon: Shield,
    title: "QUALITY",
    description: "We never compromise on materials or workmanship, ensuring lasting infrastructure.",
  },
  {
    icon: Lightbulb,
    title: "INNOVATION",
    description: "Embracing modern technologies and methods to deliver superior results.",
  },
];

const milestones = [
  { year: "1998", title: "Company Founded", description: "Al-Rashid Construction established in Riyadh" },
  { year: "2005", title: "First Major Highway", description: "Completed 50km highway expansion project" },
  { year: "2012", title: "Regional Expansion", description: "Extended operations across the Kingdom" },
  { year: "2018", title: "100th Project", description: "Milestone achievement in infrastructure" },
  { year: "2023", title: "Industry Leader", description: "Recognized as top civil engineering firm" },
];

const About = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroScale = useTransform(heroScroll, [0, 1], [1, 1.3]);
  const heroOpacity = useTransform(heroScroll, [0, 0.5], [1, 0]);
  const textY = useTransform(heroScroll, [0, 1], [0, 200]);

  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <MinimalHeader />
      <main>
        {/* Cinematic Hero */}
        <section ref={heroRef} className="relative h-[150vh]">
          <div className="sticky top-0 h-screen overflow-hidden">
            <motion.div style={{ scale: heroScale }} className="absolute inset-0">
              <img
                src={heroImage}
                alt="Construction site"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
            </motion.div>

            <motion.div
              style={{ opacity: heroOpacity, y: textY }}
              className="relative z-10 h-full flex flex-col justify-center container mx-auto px-6"
            >
              <motion.span
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="text-primary text-xs font-medium tracking-[0.5em] uppercase block mb-8"
              >
                Our Story
              </motion.span>

              <div className="overflow-hidden mb-4">
                <motion.h1
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                  className="font-display text-[12vw] md:text-[10vw] lg:text-[8vw] leading-[0.9] tracking-[0.02em]"
                >
                  BUILDING
                </motion.h1>
              </div>
              <div className="overflow-hidden mb-4">
                <motion.h1
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
                  className="font-display text-[12vw] md:text-[10vw] lg:text-[8vw] leading-[0.9] tracking-[0.02em] text-gradient"
                >
                  LEGACY
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
                  className="font-display text-[12vw] md:text-[10vw] lg:text-[8vw] leading-[0.9] tracking-[0.02em]"
                >
                  SINCE 1998
                </motion.h1>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Story Section with Parallax */}
        <StorySection />

        {/* Values Section */}
        <ValuesSection values={values} />

        {/* Timeline Section */}
        <TimelineSection milestones={milestones} />

        {/* Stats Section */}
        <StatsSection />

        <MegaCTA />
      </main>
      <MinimalFooter />
    </div>
  );
};

const StorySection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const textY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-5, 5]);

  return (
    <section ref={ref} className="relative py-32 md:py-48 overflow-hidden">
      <MorphingBlob className="w-[500px] h-[500px] -top-48 -right-48" />

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text */}
          <motion.div style={{ y: textY }}>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-primary text-xs font-medium tracking-[0.5em] uppercase block mb-8"
            >
              The Beginning
            </motion.span>

            <div className="overflow-hidden mb-4">
              <motion.h2
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-5xl md:text-6xl lg:text-7xl tracking-[0.05em]"
              >
                SMALL BUT
              </motion.h2>
            </div>
            <div className="overflow-hidden mb-12">
              <motion.h2
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                className="font-display text-5xl md:text-6xl lg:text-7xl tracking-[0.05em] text-gradient"
              >
                MIGHTY
              </motion.h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-6 text-muted-foreground text-lg leading-relaxed"
            >
              <p>
                Al-Rashid Construction was founded in 1998 by Engineer Mohammed Al-Rashid,
                a visionary civil engineer with a dream of building world-class infrastructure
                in the Kingdom of Saudi Arabia.
              </p>
              <p>
                What began as a small team of dedicated engineers has grown into one of the
                region's most respected construction companies, with over 150 successful
                projects spanning highways, urban streets, and complex infrastructure systems.
              </p>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div style={{ y: imageY, rotate }} className="relative">
            <div className="aspect-[4/5] rounded-lg overflow-hidden">
              <ImageReveal src={engineerImage} alt="Engineer Mohammed Al-Rashid" className="w-full h-full" />
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring" }}
              className="absolute -bottom-8 -left-8 bg-gradient-card border border-border rounded-lg p-6 shadow-card"
            >
              <div className="font-display text-4xl text-primary">Eng. Mohammed</div>
              <div className="text-sm text-muted-foreground">Founder & CEO</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ValuesSection = ({ values }: { values: typeof import("lucide-react") extends { Target: infer T } ? { icon: T; title: string; description: string }[] : never }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={ref} className="relative py-32 md:py-48 bg-secondary overflow-hidden">
      <MorphingBlob className="w-[400px] h-[400px] bottom-0 -left-48" />

      {/* Floating geometric shapes */}
      <motion.div
        style={{ y }}
        className="absolute top-20 right-20 w-32 h-32 border border-primary/20 rotate-45"
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <span className="text-primary text-xs font-medium tracking-[0.5em] uppercase block mb-6">
            What Drives Us
          </span>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-5xl md:text-6xl lg:text-7xl tracking-[0.05em]"
            >
              OUR <span className="text-gradient">VALUES</span>
            </motion.h2>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 80, rotateX: 45 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <TiltCard className="h-full">
                <div className="bg-gradient-card border border-border rounded-xl p-8 h-full group hover:border-primary/50 transition-all duration-500">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-8 group-hover:bg-primary/20"
                  >
                    <value.icon className="w-8 h-8 text-primary" />
                  </motion.div>
                  <h3 className="font-display text-2xl tracking-[0.1em] mb-4 group-hover:text-primary transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TimelineSection = ({ milestones }: { milestones: { year: string; title: string; description: string }[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  return (
    <section ref={ref} className="relative py-32 md:py-48 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <span className="text-primary text-xs font-medium tracking-[0.5em] uppercase block mb-6">
            Our Journey
          </span>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-5xl md:text-6xl lg:text-7xl tracking-[0.05em]"
            >
              KEY <span className="text-gradient">MILESTONES</span>
            </motion.h2>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Progress line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border">
            <motion.div
              style={{ scaleY: scrollYProgress }}
              className="absolute inset-0 bg-gradient-gold origin-top"
            />
          </div>

          {milestones.map((milestone, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`relative flex items-center gap-8 mb-16 last:mb-0 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Year circle */}
              <motion.div
                whileHover={{ scale: 1.2 }}
                className="absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-gold flex items-center justify-center z-10 shadow-gold"
              >
                <span className="font-display text-sm text-primary-foreground">{milestone.year}</span>
              </motion.div>

              {/* Content */}
              <div className={`ml-24 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                <motion.div
                  whileHover={{ x: index % 2 === 0 ? -10 : 10 }}
                  className="bg-gradient-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors"
                >
                  <h3 className="font-display text-xl tracking-wide mb-2 text-gradient">{milestone.title}</h3>
                  <p className="text-muted-foreground">{milestone.description}</p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const StatsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

  const stats = [
    { icon: Building, value: 150, suffix: "+", label: "PROJECTS COMPLETED" },
    { icon: Users, value: 50, suffix: "+", label: "EXPERT ENGINEERS" },
    { icon: Award, value: 12, suffix: "", label: "INDUSTRY AWARDS" },
    { icon: Star, value: 100, suffix: "%", label: "CLIENT SATISFACTION" },
  ];

  return (
    <section ref={ref} className="relative py-32 bg-secondary overflow-hidden">
      <MorphingBlob className="w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <motion.div style={{ scale }} className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-center group"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors"
              >
                <stat.icon className="w-8 h-8 text-primary" />
              </motion.div>
              <div className="font-display text-5xl md:text-6xl text-foreground mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs tracking-[0.2em] text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default About;
