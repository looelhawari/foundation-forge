import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import companyLogo from "@/assets/cpc_logo-removebg-preview.png";

// Loading Screen Component
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 300);
          return 100;
        }
        return prev + 3.5;
      });
    }, 30);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-background flex items-center justify-center overflow-hidden"
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6 }}
    >
      {/* Ripple effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border-2 border-primary/20"
            initial={{ width: 0, height: 0, opacity: 0 }}
            animate={{
              width: 200 + i * 100,
              height: 200 + i * 100,
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Central content */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 150, damping: 20 }}
          className="relative mb-8"
        >
          <motion.div
            className="absolute inset-0 blur-2xl"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <img src={companyLogo} alt="Logo" className="w-32 h-32" />
          </motion.div>
          <img src={companyLogo} alt="CPC Logo" className="w-32 h-32 relative z-10" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-display text-4xl md:text-5xl tracking-[0.3em] text-gradient mb-4"
        >
          CONTACT US
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-muted-foreground text-sm tracking-wider mb-8"
        >
          Let's Build Together
        </motion.p>

        <div className="w-64">
          <div className="h-1 bg-muted-foreground/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-accent"
              style={{ width: `${progress}%` }}
            />
          </div>
          <motion.div className="mt-2 text-center text-sm text-primary font-medium">
            {Math.floor(progress)}%
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

const Contact = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", phone: "", company: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
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
                  Get In Touch
                </span>
                <h1 className="font-display text-5xl md:text-6xl lg:text-7xl tracking-wide mb-6">
                  CONTACT <span className="text-gradient">US</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl">
                  Ready to start your next project? Reach out to our team of experts
                  for a consultation and free quote.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Contact Content */}
          <section className="py-24">
            <div className="container mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-16">
                {/* Contact Form */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="font-display text-3xl tracking-wide mb-8">
                    SEND US A <span className="text-gradient">MESSAGE</span>
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-muted-foreground mb-2 block">Full Name *</label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="bg-secondary border-border focus:border-primary"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground mb-2 block">Email *</label>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="bg-secondary border-border focus:border-primary"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-muted-foreground mb-2 block">Phone</label>
                        <Input
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="bg-secondary border-border focus:border-primary"
                          placeholder="+966 XX XXX XXXX"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground mb-2 block">Company</label>
                        <Input
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="bg-secondary border-border focus:border-primary"
                          placeholder="Your company name"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">Message *</label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="bg-secondary border-border focus:border-primary min-h-[150px]"
                        placeholder="Tell us about your project..."
                      />
                    </div>
                    <Button type="submit" variant="hero" size="lg" className="w-full md:w-auto">
                      <Send className="w-4 h-4" />
                      Send Message
                    </Button>
                  </form>
                </motion.div>

                {/* Contact Info */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="font-display text-3xl tracking-wide mb-8">
                    CONTACT <span className="text-gradient">INFORMATION</span>
                  </h2>

                  <div className="space-y-6 mb-12">
                    <div className="flex items-start gap-4 p-4 bg-gradient-card border border-border rounded-lg">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <MapPin className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">Head Office</h4>
                        <p className="text-muted-foreground text-sm">
                          Mirqab Mall, Area No. 39, Street No.840<br />
                          Building No.53, Block D – Office No. 307-308<br />
                          P.O. Box: 15776, Doha, Qatar
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-gradient-card border border-border rounded-lg">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Phone className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">Phone</h4>
                        <p className="text-muted-foreground text-sm">
                          <a href="tel:+97444322743" className="hover:text-primary transition-colors">
                            +974 4432-2743
                          </a>
                          <br />
                          <a href="tel:+97440291295" className="hover:text-primary transition-colors">
                            +974 4029-1295 (Fax)
                          </a>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-gradient-card border border-border rounded-lg">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Mail className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">Email</h4>
                        <p className="text-muted-foreground text-sm">
                          <a href="mailto:Info@ctgroups.net" className="hover:text-primary transition-colors">
                            Info@ctgroups.net
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Map */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mt-24"
              >
                <div className="aspect-[21/9] rounded-lg overflow-hidden border border-border">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3607.6047!2d51.5014973!3d25.2734836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45dbcfbfe07107%3A0xaf990e0741438251!2sCosmo%20Projects%20%26%20Construction%20and%20Trading!5e0!3m2!1sen!2s!4v1735053847123!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="COSMO PROJECTS & CONSTRUCTION Location - Doha, Qatar"
                  />
                </div>
              </motion.div>
            </div>
          </section>
        </main>
        <Footer />
      </motion.div>
    </div>
  );
};

export default Contact;
