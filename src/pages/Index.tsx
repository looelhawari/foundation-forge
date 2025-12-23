import { MinimalHeader } from "@/components/layout/MinimalHeader";
import { MinimalFooter } from "@/components/layout/MinimalFooter";
import { CinematicHero } from "@/components/sections/CinematicHero";
import { ServicesMarquee } from "@/components/sections/ServicesMarquee";
import { FullscreenVideo } from "@/components/sections/FullscreenVideo";
import { CinematicProjects } from "@/components/sections/CinematicProjects";
import { ParallaxStats } from "@/components/sections/ParallaxStats";
import { ImmersiveTestimonials } from "@/components/sections/ImmersiveTestimonials";
import { MegaCTA } from "@/components/sections/MegaCTA";
import { ScrollProgress } from "@/components/animations/MotionGraphics";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <MinimalHeader />
      <main>
        <CinematicHero />
        <ServicesMarquee />
        <FullscreenVideo />
        <CinematicProjects />
        <ParallaxStats />
        <ImmersiveTestimonials />
        <MegaCTA />
      </main>
      <MinimalFooter />
    </div>
  );
};

export default Index;
