"use client";

import { useEffect, useState, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Link } from "@/lib/router-compat";
import { FileText } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingContactButtons } from "@/components/layout/FloatingContactButtons";
import { CinematicHero } from "@/components/sections/CinematicHero";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import SEOHead from "@/components/SEOHead";

// Lazy-load below-fold sections for faster initial load
const ServicesImageGrid = lazy(() => import("@/components/sections/ServicesImageGrid").then(m => ({ default: m.ServicesImageGrid })));
const ServicesMarquee = lazy(() => import("@/components/sections/ServicesMarquee").then(m => ({ default: m.ServicesMarquee })));
const FullscreenVideo = lazy(() => import("@/components/sections/FullscreenVideo").then(m => ({ default: m.FullscreenVideo })));
const ClientLogosShowcase = lazy(() => import("@/components/sections/ClientLogosShowcase").then(m => ({ default: m.ClientLogosShowcase })));
const WhyChooseUs = lazy(() => import("@/components/sections/WhyChooseUs").then(m => ({ default: m.WhyChooseUs })));
const ProcessTimeline = lazy(() => import("@/components/sections/ProcessTimeline").then(m => ({ default: m.ProcessTimeline })));
const QualityAndCertifications = lazy(() => import("@/components/sections/QualityAndCertifications").then(m => ({ default: m.QualityAndCertifications })));
const FeaturedShowcase = lazy(() => import("@/components/sections/FeaturedShowcase").then(m => ({ default: m.FeaturedShowcase })));
const ParallaxStats = lazy(() => import("@/components/sections/ParallaxStats").then(m => ({ default: m.ParallaxStats })));
const ImmersiveTestimonials = lazy(() => import("@/components/sections/ImmersiveTestimonials").then(m => ({ default: m.ImmersiveTestimonials })));
const MegaCTA = lazy(() => import("@/components/sections/MegaCTA").then(m => ({ default: m.MegaCTA })));

const Index = () => {
    const [isMobile, setIsMobile] = useState(false);

    // Initialize smooth scroll
    useSmoothScroll();

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
        document.body.style.overflowX = 'hidden';

        if (window.innerWidth < 768) {
            document.documentElement.style.setProperty('--animation-duration', '0.3s');
        }

        return () => {
            document.body.style.overflowX = 'auto';
        };
    }, []);

    return (
        <div className="min-h-screen bg-background">
            <SEOHead
                title="CPC Qatar | Road Construction & Infrastructure Company in Doha, Qatar"
                description="CPC Qatar (Cosmo Projects & Construction) — Leading road construction & infrastructure company in Doha. Asphalt paving, road marking, earthworks, interlock & subbase works. 90+ projects delivered since 2017."
                canonical="/"
                arDescription="كوزمو للمشاريع والإنشاءات — شركة رائدة في بناء الطرق والبنية التحتية في الدوحة، قطر"
                keywords="CPC Qatar, road construction Qatar, infrastructure company Doha, asphalt paving Qatar, civil contractor Qatar, شركة مقاولات قطر, بناء طرق قطر, بنية تحتية قطر"
            />
            <Header />
            <FloatingContactButtons />
            <main>
                <CinematicHero />

                <Suspense fallback={null}>
                    <ServicesMarquee />
                    <ServicesImageGrid />
                    <FullscreenVideo />
                    <ClientLogosShowcase />
                    <WhyChooseUs />
                    <ProcessTimeline />
                    <QualityAndCertifications />
                    <FeaturedShowcase />
                    <ParallaxStats />
                    <ImmersiveTestimonials />
                    <MegaCTA />
                </Suspense>
            </main>

            {/* Floating Legal Documents Button */}
            <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2, duration: 0.5 }}
                className="fixed bottom-6 right-6 z-50"
            >
                <Link
                    to="/certificates"
                    className="group flex items-center gap-2 bg-primary/90 hover:bg-primary text-primary-foreground px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                    <FileText className="w-5 h-5" />
                    <span className="text-sm font-medium hidden sm:inline-block group-hover:inline-block transition-all">
                        Legal Docs
                    </span>
                </Link>
            </motion.div>

            <Footer />
        </div>
    );
};

export default Index;

