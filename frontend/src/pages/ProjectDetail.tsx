import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { MapPin, Calendar, Clock, Building, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import projectHighway from "@/assets/project-highway.jpg";
import projectStreet from "@/assets/project-street.jpg";
import projectInfrastructure from "@/assets/project-infrastructure.jpg";
import projectInterchange from "@/assets/project-interchange.jpg";

const projectsData = [
  {
    id: 1,
    title: "Desert Highway Expansion",
    location: "Riyadh - Jeddah Corridor",
    year: "2023",
    category: "Highways",
    client: "Ministry of Transport",
    duration: "18 months",
    images: [projectHighway, projectInterchange],
    description: "Major 120km highway expansion connecting two major cities with state-of-the-art infrastructure.",
    details: [
      "120km of 6-lane highway construction",
      "12 interchange overpasses",
      "Advanced drainage systems",
      "LED lighting throughout",
      "Rest areas and service stations",
    ],
    challenge: "The project required working in extreme desert conditions while maintaining strict quality standards and meeting aggressive timelines.",
    solution: "We deployed specialized equipment and implemented night-shift operations to maximize productivity while ensuring worker safety during peak heat hours.",
  },
  {
    id: 2,
    title: "Downtown Street Revival",
    location: "Al Olaya District",
    year: "2023",
    category: "Streets",
    client: "Riyadh Municipality",
    duration: "12 months",
    images: [projectStreet, projectInfrastructure],
    description: "Complete urban street renovation transforming the heart of Riyadh's business district.",
    details: [
      "15km of urban street renovation",
      "Modern pedestrian walkways",
      "Underground utility integration",
      "Smart traffic management system",
      "Landscaping and beautification",
    ],
    challenge: "Executing major construction in a busy commercial district while minimizing disruption to businesses and daily traffic.",
    solution: "Phased construction approach with comprehensive traffic management and stakeholder communication ensured minimal impact on the community.",
  },
  {
    id: 3,
    title: "Industrial Zone Infrastructure",
    location: "Jubail Industrial City",
    year: "2022",
    category: "Infrastructure",
    client: "Royal Commission for Jubail",
    duration: "24 months",
    images: [projectInfrastructure, projectHighway],
    description: "Comprehensive infrastructure development supporting the expansion of Saudi Arabia's largest industrial zone.",
    details: [
      "Heavy-duty industrial roads",
      "Stormwater management system",
      "Underground utilities network",
      "Bridge and overpass construction",
      "Environmental protection measures",
    ],
    challenge: "Designing infrastructure capable of handling heavy industrial traffic while meeting stringent environmental requirements.",
    solution: "Innovative pavement design and comprehensive drainage systems ensure longevity and environmental compliance.",
  },
  {
    id: 4,
    title: "King Fahd Interchange",
    location: "Central Riyadh",
    year: "2022",
    category: "Infrastructure",
    client: "Arriyadh Development Authority",
    duration: "30 months",
    images: [projectInterchange, projectStreet],
    description: "Complex multi-level highway interchange reducing congestion at one of the city's busiest junctions.",
    details: [
      "4-level interchange structure",
      "8 approach ramps",
      "Architectural lighting design",
      "Noise barrier installation",
      "Landscape integration",
    ],
    challenge: "Building a complex multi-level structure in a densely populated urban area with active traffic.",
    solution: "Advanced construction techniques including pre-fabricated elements and temporary traffic diversions enabled safe and efficient execution.",
  },
];

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projectsData.find((p) => p.id === Number(id));

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl mb-4">Project Not Found</h1>
          <Button variant="hero" asChild>
            <Link to="/projects">Back to Projects</Link>
          </Button>
        </div>
      </div>
    );
  }

  const currentIndex = projectsData.findIndex((p) => p.id === project.id);
  const prevProject = projectsData[currentIndex - 1];
  const nextProject = projectsData[currentIndex + 1];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Image */}
        <section className="pt-20 relative h-[60vh] min-h-[500px]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${project.images[0]})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 container mx-auto px-6 pb-12 z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Projects
              </Link>
              <span className="block px-3 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full w-fit mb-4">
                {project.category}
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-wide">
                {project.title}
              </h1>
            </motion.div>
          </div>
        </section>

        {/* Project Details */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <h2 className="font-display text-3xl tracking-wide mb-6">
                    PROJECT <span className="text-gradient">OVERVIEW</span>
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Gallery */}
                  <div className="grid md:grid-cols-2 gap-4 mb-12">
                    {project.images.map((image, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                        className="aspect-video rounded-lg overflow-hidden"
                      >
                        <img
                          src={image}
                          alt={`${project.title} - Image ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </motion.div>
                    ))}
                  </div>

                  {/* Key Features */}
                  <h3 className="font-display text-2xl tracking-wide mb-4">KEY FEATURES</h3>
                  <ul className="space-y-3 mb-12">
                    {project.details.map((detail, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                        <span className="text-muted-foreground">{detail}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Challenge & Solution */}
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-gradient-card border border-border rounded-lg p-6">
                      <h4 className="font-display text-xl tracking-wide text-primary mb-3">THE CHALLENGE</h4>
                      <p className="text-muted-foreground text-sm">{project.challenge}</p>
                    </div>
                    <div className="bg-gradient-card border border-border rounded-lg p-6">
                      <h4 className="font-display text-xl tracking-wide text-primary mb-3">OUR SOLUTION</h4>
                      <p className="text-muted-foreground text-sm">{project.solution}</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="bg-gradient-card border border-border rounded-lg p-6 sticky top-24">
                  <h3 className="font-display text-xl tracking-wide mb-6">PROJECT DETAILS</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-primary" />
                      <div>
                        <div className="text-xs text-muted-foreground">Location</div>
                        <div className="text-sm">{project.location}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-primary" />
                      <div>
                        <div className="text-xs text-muted-foreground">Year</div>
                        <div className="text-sm">{project.year}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-primary" />
                      <div>
                        <div className="text-xs text-muted-foreground">Duration</div>
                        <div className="text-sm">{project.duration}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Building className="w-5 h-5 text-primary" />
                      <div>
                        <div className="text-xs text-muted-foreground">Client</div>
                        <div className="text-sm">{project.client}</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-border">
                    <Button variant="hero" className="w-full" asChild>
                      <Link to="/contact">Start Your Project</Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-16 pt-8 border-t border-border">
              {prevProject ? (
                <Link
                  to={`/projects/${prevProject.id}`}
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{prevProject.title}</span>
                </Link>
              ) : (
                <div />
              )}
              {nextProject && (
                <Link
                  to={`/projects/${nextProject.id}`}
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <span>{nextProject.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>
        </section>

        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetail;
