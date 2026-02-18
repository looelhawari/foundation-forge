import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState, useCallback } from "react";
import { Header } from "@/components/layout/Header";
import { MinimalHeader } from "@/components/layout/MinimalHeader";
import { Footer } from "@/components/layout/Footer";
import { MegaCTA } from "@/components/sections/MegaCTA";
import {
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
  Star,
  Upload,
  Loader2,
  Send,
  User,
} from "lucide-react";
import {
  clientsApi,
  testimonialsApi,
  Client,
  Testimonial,
  TestimonialFormData,
  uploadApi,
} from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import heroImage from "@/assets/hero-construction.jpg";
import SEOHead from "@/components/SEOHead";
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

// Map for legacy logo imports (fallback when DB logo is null)
const logoImportMap: Record<string, string> = {
  "Ministry of Education": moelogo,
  "Ministry of Awqaf ": waqifLogo,
  "Qatar Museums": museumLogo,
  "Ministry of Ashghal": ashghaalLogo,
  "FIFA World Cup Qatar 2022": fifaLogo,
  "DHL Qatar": dhlLogo,
  "Al Meera": meeraLogo,
  IMALCO: imalcoLogo,
  "Ariane Real Estate": arianeLogo,
  "FBA Real Estate": fbaLogo,
  QNIE: qnieLogo,
};

// Category configuration for display
type CategoryKey = "government" | "corporate" | "industrial" | "real_estate" | "retail" | "other";

interface CategoryConfig {
  displayName: string;
  icon: typeof Building2;
  color: string;
  order: number;
}

const categoryConfigMap: Record<CategoryKey, CategoryConfig> = {
  government: {
    displayName: "Government Ministries",
    icon: Building2,
    color: "from-blue-500/20 to-cyan-500/20",
    order: 1,
  },
  corporate: {
    displayName: "Major Events & Corporations",
    icon: Award,
    color: "from-amber-500/20 to-orange-500/20",
    order: 2,
  },
  industrial: {
    displayName: "Industrial & Manufacturing",
    icon: Factory,
    color: "from-purple-500/20 to-pink-500/20",
    order: 3,
  },
  real_estate: {
    displayName: "Real Estate & Development",
    icon: Home,
    color: "from-rose-500/20 to-red-500/20",
    order: 4,
  },
  retail: {
    displayName: "Commercial & Retail",
    icon: ShoppingCart,
    color: "from-yellow-500/20 to-amber-500/20",
    order: 5,
  },
  other: {
    displayName: "Other Clients",
    icon: Landmark,
    color: "from-violet-500/20 to-purple-500/20",
    order: 6,
  },
};

// Interface for grouped client categories (used by ClientCategoriesSection)
interface ClientCategory {
  category: string;
  categoryKey: CategoryKey;
  icon: typeof Building2;
  color: string;
  clients: Array<{
    id: number;
    name: string;
    logo: string | null;
    projects: number;
    value: string | null;
  }>;
}

// Helper function to get client logo (DB logo or fallback to imported logo)
const getClientLogo = (client: Client): string | null => {
  if (client.logo) return client.logo;
  return logoImportMap[client.name] || null;
};

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

export default function Clients() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Our Clients | Government & Private Sector Partners | CPC Qatar"
        description="CPC Qatar proudly serves Ministry of Education, FIFA World Cup 2022, Qatar Museums, DHL & 45+ major clients. Government-approved road construction & infrastructure contractor in Doha."
        canonical="/clients"
        arDescription="عملاء شركة كوزمو للمشاريع والإنشاءات — وزارات حكومية وشركات خاصة في قطر"
        keywords="CPC Qatar clients, government contractor Qatar, construction clients Doha, Ministry of Education contractor, عملاء شركة مقاولات قطر"
      />
      <MinimalHeader />
      <main>
        <ClientCategoriesSection />
        <TestimonialsSection />
        <WhyChooseSection />
        <MegaCTA />
      </main>
      <Footer />
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
              className="font-display text-[12vw] sm:text-[10vw] md:text-[8vw] leading-[0.9] tracking-[0.02em]"
            >
              CONSTRUCTING
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
              className="font-display text-[12vw] sm:text-[10vw] md:text-[8vw] leading-[0.9] tracking-[0.02em] text-gradient"
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
  const [clientCategories, setClientCategories] = useState<ClientCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch clients and group by category
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await clientsApi.getAll({ active: "true" });
        if (response.data && response.data.length > 0) {
          // Group clients by category
          const grouped = response.data.reduce((acc, client) => {
            const categoryKey = (client.category || "other") as CategoryKey;
            if (!acc[categoryKey]) {
              acc[categoryKey] = [];
            }
            acc[categoryKey].push({
              id: client.id,
              name: client.name,
              logo: getClientLogo(client),
              projects: client.projects_count || 0,
              value: client.total_value,
            });
            return acc;
          }, {} as Record<CategoryKey, ClientCategory["clients"]>);

          // Convert to array format and sort by order
          const categoriesArray: ClientCategory[] = Object.entries(grouped)
            .map(([key, clients]) => {
              const categoryKey = key as CategoryKey;
              const config = categoryConfigMap[categoryKey] || categoryConfigMap.other;
              return {
                category: config.displayName,
                categoryKey: categoryKey,
                icon: config.icon,
                color: config.color,
                clients: clients.sort((a, b) => b.projects - a.projects), // Sort by projects count
              };
            })
            .sort((a, b) => {
              const orderA = categoryConfigMap[a.categoryKey]?.order || 99;
              const orderB = categoryConfigMap[b.categoryKey]?.order || 99;
              return orderA - orderB;
            });

          setClientCategories(categoriesArray);
        }
      } catch (error) {
        console.error("Error fetching clients:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClients();
  }, []);

  if (isLoading) {
    return (
      <section className="py-32 md:py-48 relative overflow-hidden">
        <div className="container mx-auto px-6 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </section>
    );
  }

  if (clientCategories.length === 0) {
    return (
      <section className="py-32 md:py-48 relative overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground">No clients available at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-24 md:py-32 lg:py-48 relative overflow-hidden">
      <MorphingBlob className="w-[500px] h-[500px] bottom-0 -left-48" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-24"
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
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[0.05em]"
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
                      <div className="h-20 mb-6 flex items-center justify-center bg-white rounded-lg p-3">
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
                        <div className="text-xs text-muted-foreground tracking-wider">
                          PROJECTS
                        </div>
                      </div>
                      {client.value && (
                        <div className="text-right">
                          <div className="font-semibold text-sm">
                            {client.value}
                          </div>
                          <div className="text-xs text-muted-foreground tracking-wider">
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
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-10, 10]);

  // Fetch approved testimonials
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await testimonialsApi.getApproved({ limit: 10 });
        if (response.data && response.data.length > 0) {
          setTestimonials(response.data);
        } else {
          // No testimonials in database - show empty state
          setTestimonials([]);
        }
      } catch {
        // Error fetching - show empty state
        setTestimonials([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const renderStars = (rating: number) => (
    <div className="flex items-center justify-center gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${i < rating
            ? "fill-yellow-500 text-yellow-500"
            : "text-muted-foreground/30"
            }`}
        />
      ))}
    </div>
  );

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
          className="text-center mb-12 md:mb-24"
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
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[0.05em]"
            >
              CLIENT <span className="text-gradient">TESTIMONIALS</span>
            </motion.h2>
          </div>
        </motion.div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : testimonials.length === 0 ? (
          <div className="max-w-2xl mx-auto text-center py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-card border border-border rounded-3xl p-12"
            >
              <div className="text-6xl mb-6">💬</div>
              <h3 className="font-display text-2xl mb-4">
                No Testimonials Yet
              </h3>
              <p className="text-muted-foreground mb-8">
                Be the first to share your experience working with CPC Qatar!
                Your feedback helps us improve and showcases our commitment to
                excellence.
              </p>
              <Button
                onClick={() => setShowSubmitForm(true)}
                size="lg"
                className="px-8"
              >
                <Send className="h-4 w-4 mr-2" />
                Submit Your Testimonial
              </Button>
            </motion.div>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto">
            <div className="relative min-h-[300px] sm:min-h-[400px]">
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
                      <div className="bg-gradient-card border border-border rounded-2xl p-5 sm:p-8 md:p-12 h-full flex flex-col">
                        {/* Rating */}
                        <div className="flex gap-1 mb-8">
                          {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                            <motion.svg
                              key={i}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.1 }}
                              className="w-5 h-5 text-primary fill-primary"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </motion.svg>
                          ))}
                        </div>

                        {/* Quote */}
                        <p className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed flex-1">
                          "{testimonial.content}"
                        </p>

                        {/* Author */}
                        <div className="mt-8 pt-8 border-t border-border flex items-center gap-6">
                          {testimonial.company_logo && (
                            <div className="w-16 h-16 flex items-center justify-center">
                              <img
                                src={testimonial.company_logo}
                                alt={testimonial.company_name || ""}
                                className="w-full h-full object-contain"
                              />
                            </div>
                          )}
                          <div>
                            <div className="font-display text-xl tracking-wide">{testimonial.client_name}</div>
                            <div className="text-sm text-muted-foreground">
                              {testimonial.position}{testimonial.company_name && ` • ${testimonial.company_name}`}
                            </div>
                          </div>
                        </div>
                      </div>
                    </TiltCard>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex justify-center gap-2 sm:gap-4 mt-12">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`relative w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-500`}
                >
                  <span className={`w-3 h-3 rounded-full transition-all duration-500 ${index === activeIndex
                    ? "bg-primary"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    }`} />
                  {index === activeIndex && (
                    <motion.div
                      layoutId="activeTestimonialClient"
                      className="absolute inset-0 rounded-full bg-primary/20"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* Share Your Experience Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 max-w-2xl mx-auto text-center"
        >
          <h3 className="font-display text-2xl md:text-3xl mb-4">
            Share Your Experience
          </h3>
          <p className="text-muted-foreground mb-8">
            Have you worked with CPC Qatar? We'd love to hear about your
            experience! Your testimonial helps us improve and showcases our
            commitment to excellence.
          </p>

          <AnimatePresence mode="wait">
            {!showSubmitForm ? (
              <motion.div
                key="button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Button
                  onClick={() => setShowSubmitForm(true)}
                  size="lg"
                  className="px-8"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Submit Your Testimonial
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <TestimonialSubmitForm
                  onClose={() => setShowSubmitForm(false)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function TestimonialSubmitForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState<TestimonialFormData>({
    client_name: "",
    company_name: "",
    position: "",
    content: "",
    rating: 5,
    email: "",
    phone: "",
  });
  const [companyLogo, setCompanyLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Logo file must be less than 2MB");
        return;
      }
      setCompanyLogo(file);
      const reader = new FileReader();
      reader.onload = () => setLogoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.client_name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!formData.content.trim() || formData.content.trim().length < 20) {
      toast.error("Testimonial must be at least 20 characters");
      return;
    }

    setIsSubmitting(true);

    try {
      let logoUrl: string | undefined;

      // Upload logo if provided
      if (companyLogo) {
        setIsUploading(true);
        try {
          const uploadResponse = await uploadApi.uploadImage(
            companyLogo,
            "testimonial",
          );
          logoUrl = uploadResponse.data.url;
        } catch {
          toast.error("Failed to upload logo. Submitting without logo.");
        }
        setIsUploading(false);
      }

      // Submit testimonial
      await testimonialsApi.submit({
        ...formData,
        company_logo: logoUrl,
      });

      toast.success(
        "Thank you! Your testimonial has been submitted for review.",
      );
      onClose();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to submit testimonial";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="bg-gradient-card border border-border rounded-2xl p-6 md:p-8 text-left"
    >
      <div className="grid gap-4">
        {/* Name and Company */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="client_name">Your Name *</Label>
            <Input
              id="client_name"
              placeholder="John Doe"
              value={formData.client_name}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  client_name: e.target.value,
                }))
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company_name">Company Name</Label>
            <Input
              id="company_name"
              placeholder="Your Company"
              value={formData.company_name}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  company_name: e.target.value,
                }))
              }
            />
          </div>
        </div>

        {/* Position and Email */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="position">Your Position</Label>
            <Input
              id="position"
              placeholder="Project Manager"
              value={formData.position}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, position: e.target.value }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email (Optional)</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>
        </div>

        {/* Company Logo */}
        <div className="space-y-2">
          <Label>Company Logo (Optional)</Label>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 px-4 py-2 border border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors">
              <Upload className="h-4 w-4" />
              <span className="text-sm">Upload Logo</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="hidden"
              />
            </label>
            {logoPreview && (
              <div className="h-12 w-12 rounded border overflow-hidden bg-white">
                <img
                  src={logoPreview}
                  alt="Logo preview"
                  className="h-full w-full object-contain"
                />
              </div>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            Max 2MB. PNG or JPG recommended.
          </p>
        </div>

        {/* Rating */}
        <div className="space-y-2">
          <Label>Rating</Label>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, rating: star }))
                }
                className="p-1 hover:scale-110 transition-transform"
              >
                <Star
                  className={`h-6 w-6 ${star <= formData.rating
                    ? "fill-yellow-500 text-yellow-500"
                    : "text-muted-foreground/30"
                    }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Testimonial Content */}
        <div className="space-y-2">
          <Label htmlFor="content">Your Testimonial *</Label>
          <Textarea
            id="content"
            placeholder="Share your experience working with CPC Qatar... (minimum 20 characters)"
            value={formData.content}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, content: e.target.value }))
            }
            rows={4}
            required
            minLength={20}
          />
          <p className="text-xs text-muted-foreground text-right">
            {formData.content.length}/2000 characters
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting || isUploading}
            className="flex-1"
          >
            {isSubmitting || isUploading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                {isUploading ? "Uploading..." : "Submitting..."}
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Submit Testimonial
              </>
            )}
          </Button>
        </div>

        <p className="text-xs text-center text-muted-foreground pt-2">
          Your testimonial will be reviewed by our team before being published.
          Pending reviews expire after 72 hours.
        </p>
      </div>
    </motion.form>
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
      description: "90+ completed projects  26M+ QR total value  Since 2017",
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
