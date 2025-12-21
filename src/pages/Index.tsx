import { MinimalHeader } from "@/components/layout/MinimalHeader";
import { MinimalFooter } from "@/components/layout/MinimalFooter";
import { CinematicHero } from "@/components/sections/CinematicHero";
import { HorizontalGallery } from "@/components/sections/HorizontalGallery";
import { StorySection } from "@/components/sections/StorySection";
import { ServicesMarquee } from "@/components/sections/ServicesMarquee";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CinematicCTA } from "@/components/sections/CinematicCTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <MinimalHeader />
      <main>
        <CinematicHero />
        <ServicesMarquee />
        <HorizontalGallery />
        <StorySection />
        <TestimonialsSection />
        <CinematicCTA />
      </main>
      <MinimalFooter />
    </div>
  );
};

export default Index;
