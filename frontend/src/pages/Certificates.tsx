import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageLoader } from "@/components/layout/PageLoader";
import {
  FileText,
  Download,
  ExternalLink,
  Shield,
  Award,
  CheckCircle,
} from "lucide-react";
import { useState, useEffect } from "react";
import SEOHead from "@/components/SEOHead";
import { PAGE_SEO, generateBreadcrumbSchema, SITE_URL } from "@/lib/seo";

// Import certificate PDFs
import commercialRegistration from "@/cert/Commercial Registration Dec 2029.pdf";
import computerCard from "@/cert/Computer Card 2028.pdf";
import taxCard from "@/cert/CPC TAX CARD.pdf";
import commercialPermit from "@/cert/CR Commercial Permit OCT 2029.pdf";

const certificates = [
  {
    id: 1,
    title: "Commercial Registration",
    description:
      "Official commercial registration certificate valid until December 2029",
    validUntil: "December 2029",
    file: commercialRegistration,
    icon: FileText,
    color: "from-blue-500 to-blue-600",
  },
  {
    id: 2,
    title: "Computer Card",
    description:
      "Company computer card registration certificate valid until 2028",
    validUntil: "2028",
    file: computerCard,
    icon: Award,
    color: "from-emerald-500 to-emerald-600",
  },
  {
    id: 3,
    title: "Tax Card",
    description: "Official tax registration card from Qatar Tax Authority",
    validUntil: "Active",
    file: taxCard,
    icon: Shield,
    color: "from-amber-500 to-amber-600",
  },
  {
    id: 4,
    title: "Commercial Permit",
    description: "Commercial permit certificate valid until October 2029",
    validUntil: "October 2029",
    file: commercialPermit,
    icon: CheckCircle,
    color: "from-purple-500 to-purple-600",
  },
];

const Certificates = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCert, setSelectedCert] = useState<
    (typeof certificates)[0] | null
  >(null);

  // Check if page content is ready
  useEffect(() => {
    if (document.readyState === "complete") {
      setIsLoading(false);
    } else {
      const handleLoad = () => setIsLoading(false);
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        seo={PAGE_SEO.certificates}
        path="/certificates"
        structuredData={[
          generateBreadcrumbSchema([
            { name: "Home", url: SITE_URL },
            { name: "Certificates", url: `${SITE_URL}/certificates` },
          ]),
        ]}
      />
      <AnimatePresence mode="wait">
        {isLoading && (
          <PageLoader title="CERTIFICATES" subtitle="Legal Documents" />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <Header />

        {/* Hero Section */}
        <section className="pt-32 pb-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                Legal Documents
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight text-foreground mb-6">
                Company <span className="text-gradient">Certificates</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Access our official company documents and certifications. All
                documents are verified and up-to-date, demonstrating our
                commitment to transparency and compliance.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Certificates Grid */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {certificates.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative bg-card border border-border rounded-2xl p-6 md:p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5"
                >
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${cert.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <cert.icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-xl md:text-2xl text-foreground mb-3">
                    {cert.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {cert.description}
                  </p>

                  {/* Valid Until Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 text-green-600 text-xs font-medium mb-6">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Valid until: {cert.validUntil}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={cert.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Document
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto"
            >
              <h2 className="font-display text-2xl md:text-3xl text-foreground mb-4">
                Committed to Transparency
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                At CPC Qatar, we believe in complete transparency. All our
                business operations are fully licensed and compliant with
                Qatar's regulatory requirements. These documents verify our
                legitimacy and commitment to operating with integrity.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {[
                { label: "Years in Business", value: "10+" },
                { label: "Projects Completed", value: "100+" },
                { label: "Active Certifications", value: "4" },
                { label: "Compliance Rate", value: "100%" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-6 bg-background rounded-xl border border-border"
                >
                  <div className="font-display text-3xl md:text-4xl text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </motion.div>
    </div>
  );
};

export default Certificates;
