import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Testimonials } from "@/components/sections/Testimonials";
import { ContactCTA } from "@/components/sections/ContactCTA";

const clients = [
  {
    name: "Ministry of Transport",
    description: "Government infrastructure development partner since 2005",
    projects: 25,
  },
  {
    name: "Saudi Aramco",
    description: "Oil & gas facility road infrastructure",
    projects: 18,
  },
  {
    name: "SABIC",
    description: "Industrial zone development projects",
    projects: 12,
  },
  {
    name: "Riyadh Municipality",
    description: "Urban street and public works",
    projects: 35,
  },
  {
    name: "Arriyadh Development Authority",
    description: "Capital city infrastructure expansion",
    projects: 22,
  },
  {
    name: "NEOM",
    description: "Future city infrastructure development",
    projects: 8,
  },
  {
    name: "Royal Commission for Jubail",
    description: "Industrial city infrastructure",
    projects: 15,
  },
  {
    name: "STC",
    description: "Telecommunications infrastructure support",
    projects: 6,
  },
];

const Clients = () => {
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
                Our Clients
              </span>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl tracking-wide mb-6">
                TRUSTED <span className="text-gradient">PARTNERSHIPS</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                We are proud to work with leading government entities and major 
                corporations across Saudi Arabia and the region.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Clients Grid */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {clients.map((client, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className="bg-gradient-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <span className="font-display text-xl text-primary">
                      {client.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="font-display text-lg tracking-wide mb-2 group-hover:text-primary transition-colors">
                    {client.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {client.description}
                  </p>
                  <div className="text-sm">
                    <span className="text-primary font-semibold">{client.projects}</span>
                    <span className="text-muted-foreground"> projects completed</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Testimonials />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Clients;
