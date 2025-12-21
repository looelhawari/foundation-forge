import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { Award, Users, Building, Target, Shield, Lightbulb } from "lucide-react";
import engineerImage from "@/assets/engineer-portrait.jpg";

const values = [
  {
    icon: Target,
    title: "Precision",
    description: "Every project is executed with meticulous attention to detail and engineering accuracy.",
  },
  {
    icon: Shield,
    title: "Quality",
    description: "We never compromise on materials or workmanship, ensuring lasting infrastructure.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
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
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-dark">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
                About Us
              </span>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl tracking-wide mb-6">
                BUILDING <span className="text-gradient">LEGACY</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                For over 25 years, Al-Rashid Construction has been at the forefront of 
                civil engineering, delivering world-class infrastructure across the region.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="font-display text-4xl md:text-5xl tracking-wide mb-6">
                  OUR <span className="text-gradient">STORY</span>
                </h2>
                <div className="space-y-6 text-muted-foreground">
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
                  <p>
                    Our commitment to excellence, precision engineering, and timely delivery has 
                    earned us the trust of government entities, major corporations, and 
                    international organizations.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="aspect-[4/5] rounded-lg overflow-hidden">
                  <img
                    src={engineerImage}
                    alt="Engineer Mohammed Al-Rashid"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-gradient-card border border-border rounded-lg p-6">
                  <div className="font-display text-3xl text-primary">Eng. Mohammed Al-Rashid</div>
                  <div className="text-sm text-muted-foreground">Founder & CEO</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 bg-secondary">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
                What Drives Us
              </span>
              <h2 className="font-display text-4xl md:text-5xl tracking-wide">
                OUR <span className="text-gradient">VALUES</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gradient-card border border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors"
                >
                  <value.icon className="w-12 h-12 text-primary mx-auto mb-6" />
                  <h3 className="font-display text-2xl tracking-wide mb-4">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
                Our Journey
              </span>
              <h2 className="font-display text-4xl md:text-5xl tracking-wide">
                KEY <span className="text-gradient">MILESTONES</span>
              </h2>
            </motion.div>

            <div className="max-w-3xl mx-auto">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex gap-8 mb-8 last:mb-0"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-gold flex items-center justify-center shrink-0">
                      <span className="font-display text-lg text-primary-foreground">{milestone.year}</span>
                    </div>
                    {index < milestones.length - 1 && (
                      <div className="w-px h-full bg-border mt-4" />
                    )}
                  </div>
                  <div className="pb-8">
                    <h3 className="font-display text-xl tracking-wide mb-2">{milestone.title}</h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 bg-gradient-dark">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: Building, value: "150+", label: "Projects Completed" },
                { icon: Users, value: "50+", label: "Expert Engineers" },
                { icon: Award, value: "12", label: "Industry Awards" },
                { icon: Target, value: "100%", label: "Client Satisfaction" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <stat.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                  <div className="font-display text-4xl md:text-5xl text-foreground mb-2">{stat.value}</div>
                  <div className="text-muted-foreground text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
};

export default About;
