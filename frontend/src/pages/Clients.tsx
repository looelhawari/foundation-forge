import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { MinimalHeader } from "@/components/layout/MinimalHeader";
import { Footer } from "@/components/layout/Footer";
import { MegaCTA } from "@/components/sections/MegaCTA";
import {
  ScrollProgress,
  MorphingBlob,
  TiltCard,
  AnimatedCounter,
} from "@/components/animations/MotionGraphics";
import {
  Building2,
  GraduationCap,
  Factory,
  Home,
  ShoppingCart,
  Warehouse,
  Landmark,
  Award,
  CheckCircle2,
} from "lucide-react";
import heroImage from "@/assets/hero-construction.jpg";
import moelogo from "@/assets/MOE-removebg-preview.png";
import fifaLogo from "@/assets/FIFA-removebg-preview.png";
import museumLogo from "@/assets/museum-removebg-preview.png";
import dhlLogo from "@/assets/DHL-removebg-preview.png";
import meeraLogo from "@/assets/meera-removebg-preview.png";
import waqifLogo from "@/assets/waqif-removebg-preview.png";
import arianeLogo from "@/assets/Ariane real state.png";
import ashghaalLogo from "@/assets/ashghaal.png";
import fbaLogo from "@/assets/FBA real estate.png";
import imalcoLogo from "@/assets/imalco.png";
import qnieLogo from "@/assets/qnie.png";
import companyLogo from "@/assets/cpc_logo-removebg-preview.png";

const clientCategories = [
  {
    category: "Government Ministries",
    icon: Building2,
    color: "from-blue-500/20 to-cyan-500/20",
    clients: [
      {
        name: "Ministry of Education",
        logo: moelogo,
        projects: 5,
        value: "4.7M QR",
      },
      {
        name: "Ministry of Waqif",
        logo: waqifLogo,
        projects: 4,
        value: "574K QR",
      },
      {
        name: "Qatar Museums",
        logo: museumLogo,
        projects: 4,
        value: "1.2M QR",
      },
      {
        name: "Ministry of Ashghal",
        logo: ashghaalLogo,
        projects: 3,
        value: "800K QR",
      },
      { name: "Ministry of Health", projects: 1, value: "154K QR" },
    ],
  },
  {
    category: "Major Events & Corporations",
    icon: Award,
    color: "from-amber-500/20 to-orange-500/20",
    clients: [
      {
        name: "FIFA World Cup Qatar 2022",
        logo: fifaLogo,
        projects: 1,
        value: "736K QR",
      },
      { name: "DHL Qatar", logo: dhlLogo, projects: 1, value: "600K QR" },
      { name: "Al Meera", logo: meeraLogo, projects: 1, value: "780K QR" },
    ],
  },
  {
    category: "Industrial & Manufacturing",
    icon: Factory,
    color: "from-purple-500/20 to-pink-500/20",
    clients: [
      { name: "IMALCO", logo: imalcoLogo, projects: 1, value: "160K QR" },
      { name: "Galva Steel Factory", projects: 1, value: "530K QR" },
      { name: "Al Arabia Steel", projects: 1, value: "420K QR" },
      { name: "National Foam Factory", projects: 1, value: "252K QR" },
      { name: "Technical Bolts Factory", projects: 1, value: "260K QR" },
      { name: "Al-Mana Precision Industries", projects: 1, value: "750K QR" },
    ],
  },
  {
    category: "Educational Institutions",
    icon: GraduationCap,
    color: "from-green-500/20 to-emerald-500/20",
    clients: [
      { name: "ETQAIN International School", projects: 1, value: "434K QR" },
      { name: "AI NOKHBA International School", projects: 1, value: "184K QR" },
      { name: "Vancouver Offshore Schools", projects: 1, value: "434K QR" },
    ],
  },
  {
    category: "Real Estate & Development",
    icon: Home,
    color: "from-rose-500/20 to-red-500/20",
    clients: [
      { name: "Ariane Real Estate", logo: arianeLogo, projects: 1 },
      { name: "FBA Real Estate", logo: fbaLogo, projects: 1, value: "483K QR" },
      { name: "Hampton International", projects: 2, value: "536K QR" },
      { name: "Brik Stone", projects: 1, value: "406K QR" },
    ],
  },
  {
    category: "Commercial & Retail",
    icon: ShoppingCart,
    color: "from-yellow-500/20 to-amber-500/20",
    clients: [
      { name: "Cosmo Trade", projects: 4, value: "2.7M QR" },
      { name: "Tafaual Pharmacy", projects: 1, value: "700K QR" },
      { name: "QNIE", logo: qnieLogo, projects: 1 },
      { name: "Arab Qatari Dairy Production", projects: 1, value: "1.5M QR" },
    ],
  },
  {
    category: "Logistics & Warehousing",
    icon: Warehouse,
    color: "from-indigo-500/20 to-blue-500/20",
    clients: [
      { name: "Prime Power", projects: 1, value: "483K QR" },
      { name: "Save Storage W.L.L", projects: 1, value: "241K QR" },
      { name: "Lefco", projects: 1, value: "240K QR" },
      { name: "Qatar National Import Export", projects: 1, value: "850K QR" },
    ],
  },
  {
    category: "Royal & Private Clients",
    icon: Landmark,
    color: "from-violet-500/20 to-purple-500/20",
    clients: [
      {
        name: "Sheikh Khaled Bin Hammad Al Thani",
        projects: 1,
        value: "235K QR",
      },
      {
        name: "Sheika Hamad Fahed Ali Abdullah Al Thani",
        projects: 1,
        value: "872K QR",
      },
      {
        name: "Sheikh Hamad Bin Abdullah Al Thani",
        projects: 1,
        value: "135K QR",
      },
      { name: "Sheikh Abdulla Jasim Al-Thani", projects: 1, value: "179K QR" },
    ],
  },
];

const testimonials = [
  {
    id: 1,
    quote:
      "CPC Qatar delivered exceptional quality on our school parking infrastructure project. Their attention to detail and commitment to timely completion made them an invaluable partner for our educational facilities development.",
    author: "Project Management Team",
    position: "Infrastructure Division",
    company: "Ministry of Education",
    logo: moelogo,
  },
  {
    id: 2,
    quote:
      "Working with Cosmo Projects has been outstanding. Their expertise in road construction and asphalt works is unmatched. They successfully completed our museum access roads project with excellent workmanship and professionalism.",
    author: "Development Department",
    position: "Project Coordinators",
    company: "Qatar Museums",
    logo: museumLogo,
  },
  {
    id: 3,
    quote:
      "The professionalism and quality of work from CPC Qatar is remarkable. They completed our FIFA World Cup parking infrastructure ahead of schedule, demonstrating their capability to handle large-scale projects.",
    author: "Infrastructure Team",
    position: "Operations Division",
    company: "FIFA World Cup Qatar 2022",
    logo: fifaLogo,
  },
];

const getGradientColors = (colorClass: string): string => {
  const colorMap: Record<string, string> = {
    "from-blue-500/20 to-cyan-500/20":
      "rgba(59, 130, 246, 0.2), rgba(6, 182, 212, 0.2)",
    "from-amber-500/20 to-orange-500/20":
      "rgba(245, 158, 11, 0.2), rgba(249, 115, 22, 0.2)",
    "from-purple-500/20 to-pink-500/20":
      "rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.2)",
    "from-green-500/20 to-emerald-500/20":
      "rgba(34, 197, 94, 0.2), rgba(16, 185, 129, 0.2)",
    "from-rose-500/20 to-red-500/20":
      "rgba(244, 63, 94, 0.2), rgba(239, 68, 68, 0.2)",
    "from-yellow-500/20 to-amber-500/20":
      "rgba(234, 179, 8, 0.2), rgba(245, 158, 11, 0.2)",
    "from-indigo-500/20 to-blue-500/20":
      "rgba(99, 102, 241, 0.2), rgba(59, 130, 246, 0.2)",
    "from-violet-500/20 to-purple-500/20":
      "rgba(139, 92, 246, 0.2), rgba(168, 85, 247, 0.2)",
  };
  return (
    colorMap[colorClass] || "rgba(59, 130, 246, 0.2), rgba(6, 182, 212, 0.2)"
  );
};

// ============================================
// LOADING SCREEN - Epic Intro Animation
// ============================================
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 40);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-background flex items-center justify-center overflow-hidden"
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, -200],
              x: [0, Math.random() * 50 - 25],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* Orbiting rings */}
      <div className="absolute">
        {[200, 280, 360].map((size, i) => (
          <motion.div
            key={size}
            className="absolute rounded-full border border-primary/20"
            style={{
              width: size,
              height: size,
              left: -size / 2,
              top: -size / 2,
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 8 + i * 4,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <motion.div
              className="absolute w-3 h-3 rounded-full bg-primary"
              style={{ top: -6, left: "50%", marginLeft: -6 }}
              animate={{
                boxShadow: [
                  "0 0 20px rgba(var(--primary-rgb), 0.5)",
                  "0 0 40px rgba(var(--primary-rgb), 0.8)",
                  "0 0 20px rgba(var(--primary-rgb), 0.5)",
                ],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        ))}
      </div>

      {/* Central glow effect */}
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-primary/20 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Logo container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo with reveal animation */}
        <motion.div
          className="relative mb-8"
          initial={{ scale: 0, rotateY: -180 }}
          animate={{ scale: 1, rotateY: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
            delay: 0.2,
          }}
        >
          {/* Logo glow */}
          <motion.div
            className="absolute inset-0 blur-2xl"
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <img
              src={companyLogo}
              alt="Loading"
              className="w-32 h-32 object-contain opacity-50"
            />
          </motion.div>

          {/* Main logo */}
          <motion.img
            src={companyLogo}
            alt="CPC Logo"
            className="w-32 h-32 object-contain relative z-10"
            animate={{
              filter: [
                "drop-shadow(0 0 20px rgba(var(--primary-rgb), 0.5))",
                "drop-shadow(0 0 40px rgba(var(--primary-rgb), 0.8))",
                "drop-shadow(0 0 20px rgba(var(--primary-rgb), 0.5))",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* Company name reveal */}
        <motion.div
          className="overflow-hidden mb-8"
          initial={{ width: 0 }}
          animate={{ width: "auto" }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.h1
            className="font-display text-3xl md:text-4xl tracking-[0.3em] text-gradient whitespace-nowrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            CLIENTS PORTFOLIO
          </motion.h1>
        </motion.div>

        {/* Progress bar */}
        <div className="w-64 h-1 bg-muted-foreground/20 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary via-accent to-primary rounded-full"
            style={{ width: `${progress}%` }}
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Loading text */}
        <motion.div
          className="mt-4 flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span className="text-muted-foreground text-sm tracking-widest">
            LOADING
          </span>
          <motion.span
            className="text-primary font-medium"
            key={progress}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            {progress}%
          </motion.span>
        </motion.div>

        {/* Animated dots */}
        <div className="flex gap-1 mt-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-primary"
              animate={{
                y: [0, -8, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.15,
              }}
            />
          ))}
        </div>
      </div>

      {/* Corner decorations */}
      {[
        { top: 0, left: 0, rotate: 0 },
        { top: 0, right: 0, rotate: 90 },
        { bottom: 0, right: 0, rotate: 180 },
        { bottom: 0, left: 0, rotate: 270 },
      ].map((pos, i) => (
        <motion.div
          key={i}
          className="absolute w-32 h-32"
          style={pos}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 * i, type: "spring" }}
        >
          <motion.div
            className="w-full h-0.5 bg-gradient-to-r from-primary to-transparent"
            animate={{ scaleX: [0, 1] }}
            transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
          />
          <motion.div
            className="h-full w-0.5 bg-gradient-to-b from-primary to-transparent"
            animate={{ scaleY: [0, 1] }}
            transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

export default function Clients() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <ScrollProgress />
        <MinimalHeader />
        <main>
          <HeroSection />
          <StatsBanner />
          <ClientCategoriesSection />
          <TestimonialsSection />
          <WhyChooseSection />
          <MegaCTA />
        </main>
        <Footer />
      </motion.div>
    </div>
  );
}

function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroScale = useTransform(heroScroll, [0, 1], [1, 1.2]);
  const heroOpacity = useTransform(heroScroll, [0, 0.5], [1, 0]);
  const textY = useTransform(heroScroll, [0, 1], [0, 200]);

  return (
    <section ref={heroRef} className="relative h-[120vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ scale: heroScale }} className="absolute inset-0">
          <img
            src={heroImage}
            alt="CPC Qatar Clients"
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
            Trusted Partnerships
          </motion.span>

          <div className="overflow-hidden mb-4">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.4,
              }}
              className="font-display text-[10vw] md:text-[8vw] leading-[0.9] tracking-[0.02em]"
            >
              BUILDING
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.5,
              }}
              className="font-display text-[10vw] md:text-[8vw] leading-[0.9] tracking-[0.02em] text-gradient"
            >
              QATAR'S FUTURE
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12 text-xl text-muted-foreground max-w-2xl"
          >
            Trusted by Qatar's leading government ministries, international
            corporations, and royal families since 2017. Over 57 completed
            projects demonstrating excellence in infrastructure development.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

function StatsBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <motion.section
      ref={ref}
      style={{ scale, opacity }}
      className="py-24 md:py-32 bg-secondary relative overflow-hidden"
    >
      <MorphingBlob className="w-[600px] h-[600px] -top-48 -right-48" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {[
            {
              value: 45,
              suffix: "+",
              label: "MAJOR CLIENTS",
              description: "Government & Private",
            },
            {
              value: 57,
              suffix: "+",
              label: "COMPLETED PROJECTS",
              description: "Since 2017",
            },
            {
              value: 26,
              suffix: "M+",
              label: "TOTAL VALUE (QR)",
              description: "Project Portfolio",
            },
            {
              value: 100,
              suffix: "%",
              label: "SATISFACTION",
              description: "Client Trust",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="text-center"
            >
              <motion.div
                className="font-display text-5xl md:text-6xl lg:text-7xl text-foreground mb-2"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </motion.div>
              <div className="text-xs tracking-[0.3em] text-primary font-semibold mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-muted-foreground">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function ClientCategoriesSection() {
  const [selectedCategory, setSelectedCategory] = useState(0);

  return (
    <section className="py-32 md:py-48 relative overflow-hidden">
      <MorphingBlob className="w-[500px] h-[500px] bottom-0 -left-48" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <span className="text-primary text-xs font-medium tracking-[0.5em] uppercase block mb-6">
            Diverse Portfolio
          </span>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-5xl md:text-6xl lg:text-7xl tracking-[0.05em]"
            >
              OUR <span className="text-gradient">CLIENTS</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-lg text-muted-foreground max-w-3xl mx-auto"
          >
            From government ministries to royal families, from international
            corporations to local businesseswe deliver excellence across all
            sectors.
          </motion.p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {clientCategories.map((category, index) => {
            const Icon = category.icon;
            const isActive = selectedCategory === index;
            const btnClass = isActive
              ? "px-6 py-3 rounded-full border transition-all duration-500 flex items-center gap-3 bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/50"
              : "px-6 py-3 rounded-full border transition-all duration-500 flex items-center gap-3 bg-background border-border hover:border-primary/50";

            return (
              <motion.button
                key={index}
                onClick={() => setSelectedCategory(index)}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className={btnClass}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium tracking-wide">
                  {category.category}
                </span>
              </motion.button>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {clientCategories[selectedCategory].clients.map((client, index) => {
            const gradientColors = getGradientColors(
              clientCategories[selectedCategory].color,
            );
            const gradientStyle = {
              background:
                "linear-gradient(to bottom right, " + gradientColors + ")",
            };

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <TiltCard className="h-full">
                  <motion.div
                    whileHover={{ y: -10 }}
                    className="backdrop-blur-sm border border-border rounded-2xl p-6 h-full group hover:border-primary/50 transition-all duration-500 hover:shadow-2xl"
                    style={gradientStyle}
                  >
                    {client.logo ? (
                      <div className="h-20 mb-6 flex items-center justify-center">
                        <img
                          src={client.logo}
                          alt={client.name}
                          className="max-h-full w-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                      </div>
                    ) : (
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/30 transition-colors"
                      >
                        <span className="font-display text-2xl text-primary">
                          {client.name.charAt(0)}
                        </span>
                      </motion.div>
                    )}

                    <h3 className="font-display text-lg tracking-wide mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {client.name}
                    </h3>

                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                      <div>
                        <div className="font-display text-2xl text-primary">
                          {client.projects}
                        </div>
                        <div className="text-[10px] text-muted-foreground tracking-wider">
                          PROJECTS
                        </div>
                      </div>
                      {client.value && (
                        <div className="text-right">
                          <div className="font-semibold text-sm">
                            {client.value}
                          </div>
                          <div className="text-[10px] text-muted-foreground tracking-wider">
                            VALUE
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-10, 10]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={ref}
      className="py-32 md:py-48 bg-secondary relative overflow-hidden"
    >
      <motion.div
        style={{ y, rotate }}
        className="absolute top-20 left-10 font-display text-[40vw] text-foreground/5 leading-none select-none pointer-events-none z-0"
      >
        "
      </motion.div>

      <MorphingBlob className="w-[600px] h-[600px] top-1/2 right-0 -translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <span className="text-primary text-xs font-medium tracking-[0.5em] uppercase block mb-6">
            What They Say
          </span>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-5xl md:text-6xl lg:text-7xl tracking-[0.05em]"
            >
              CLIENT <span className="text-gradient">TESTIMONIALS</span>
            </motion.h2>
          </div>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="relative min-h-[400px]">
            {testimonials.map((testimonial, index) => {
              const testimonialClassName =
                index === activeIndex
                  ? "absolute inset-0 pointer-events-auto"
                  : "absolute inset-0 pointer-events-none";

              return (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{
                    opacity: index === activeIndex ? 1 : 0,
                    scale: index === activeIndex ? 1 : 0.9,
                    y: index === activeIndex ? 0 : 30,
                  }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className={testimonialClassName}
                >
                  <TiltCard className="h-full">
                    <div className="bg-gradient-card border border-border rounded-3xl p-8 md:p-12 h-full flex flex-col">
                      <div className="flex justify-center mb-8">
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.2, type: "spring" }}
                          className="h-16 w-32 flex items-center justify-center"
                        >
                          {testimonial.logo && (
                            <img
                              src={testimonial.logo}
                              alt={testimonial.company}
                              className="max-h-full w-auto object-contain"
                            />
                          )}
                        </motion.div>
                      </div>

                      <p className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed text-center flex-1 mb-8">
                        "{testimonial.quote}"
                      </p>

                      <div className="text-center pt-8 border-t border-border">
                        <div className="font-display text-xl tracking-wide mb-1">
                          {testimonial.author}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {testimonial.position}
                        </div>
                        <div className="text-sm text-primary mt-1">
                          {testimonial.company}
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>

          <div className="flex justify-center gap-4 mt-12">
            {testimonials.map((_, index) => {
              const buttonClassName =
                index === activeIndex
                  ? "w-3 h-3 rounded-full transition-all duration-500 bg-primary w-12"
                  : "w-3 h-3 rounded-full transition-all duration-500 bg-muted-foreground/30 hover:bg-muted-foreground/50";

              return (
                <motion.button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                  className={buttonClassName}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyChooseSection() {
  const features = [
    {
      title: "Government Approved",
      description:
        "C.R. 108122  Licensed by Qatar authorities  Full compliance",
      icon: CheckCircle2,
    },
    {
      title: "Proven Track Record",
      description: "57+ completed projects  26M+ QR total value  Since 2017",
      icon: CheckCircle2,
    },
    {
      title: "Quality Assurance",
      description: "ISO standards  Safety first  Timely completion",
      icon: CheckCircle2,
    },
    {
      title: "Diverse Expertise",
      description: "8+ sectors  Government to private  Royal clients",
      icon: CheckCircle2,
    },
  ];

  return (
    <section className="py-32 md:py-48 relative overflow-hidden">
      <MorphingBlob className="w-[500px] h-[500px] top-1/2 -translate-y-1/2 -right-48" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <span className="text-primary text-xs font-medium tracking-[0.5em] uppercase block mb-6">
            Why Choose Us
          </span>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-5xl md:text-6xl lg:text-7xl tracking-[0.05em]"
            >
              TRUSTED <span className="text-gradient">EXCELLENCE</span>
            </motion.h2>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
              >
                <TiltCard>
                  <motion.div
                    whileHover={{ scale: 1.03, y: -5 }}
                    className="bg-gradient-card border border-border rounded-2xl p-8 h-full hover:border-primary/50 transition-all duration-500"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                      className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mb-6"
                    >
                      <Icon className="w-7 h-7 text-primary" />
                    </motion.div>
                    <h3 className="font-display text-2xl tracking-wide mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
