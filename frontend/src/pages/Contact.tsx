import { motion } from "framer-motion";
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { contactApi } from "@/lib/api";
import SEOHead from "@/components/SEOHead";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await contactApi.submit({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        company: formData.company || undefined,
        subject: formData.subject || undefined,
        message: formData.message,
      });

      toast({
        title: "Message Sent!",
        description:
          "Thank you for contacting us. We'll get back to you within 24 hours.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Contact CPC Qatar | Get a Free Quote | Road Construction Doha"
        description="Contact CPC Qatar for road construction & infrastructure projects. Office: Mirqab Mall, Doha. Phone: +974 4432-2743. Email: Info@ctgroups.net. Free consultation & quote."
        canonical="/contact"
        arDescription="تواصل مع شركة كوزمو للمشاريع والإنشاءات للحصول على عرض أسعار مجاني لمشاريع الطرق والبنية التحتية في قطر"
        keywords="contact CPC Qatar, road construction quote Doha, contractor contact Qatar, اتصل بنا شركة مقاولات قطر"
      />
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
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wide mb-6">
                CONTACT <span className="text-gradient">US</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Ready to start your next project? Reach out to our team of
                experts for a consultation and free quote.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
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
                      <label className="text-sm text-muted-foreground mb-2 block">
                        Full Name *
                      </label>
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
                      <label className="text-sm text-muted-foreground mb-2 block">
                        Email *
                      </label>
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
                      <label className="text-sm text-muted-foreground mb-2 block">
                        Phone
                      </label>
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="bg-secondary border-border focus:border-primary"
                        placeholder="+974 XX XXX XXXX"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">
                        Company
                      </label>
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
                    <label className="text-sm text-muted-foreground mb-2 block">
                      Subject
                    </label>
                    <Input
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="bg-secondary border-border focus:border-primary"
                      placeholder="What is this regarding?"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">
                      Message *
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="bg-secondary border-border focus:border-primary min-h-[150px]"
                      placeholder="Tell us about your project..."
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    className="w-full md:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
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
                      <h4 className="font-semibold text-foreground mb-1">
                        Head Office
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        Mirqab Mall, Area No. 39, Street No.840
                        <br />
                        Building No.53, Block D – Office No. 307-308
                        <br />
                        P.O. Box: 15776, Doha, Qatar
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-gradient-card border border-border rounded-lg">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">
                        Phone
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        <a
                          href="tel:+97444322743"
                          className="hover:text-primary transition-colors"
                        >
                          +974 4432-2743
                        </a>
                        <br />
                        <a
                          href="tel:+97440291295"
                          className="hover:text-primary transition-colors"
                        >
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
                      <h4 className="font-semibold text-foreground mb-1">
                        Email
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        <a
                          href="mailto:Info@ctgroups.net"
                          className="hover:text-primary transition-colors"
                        >
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
              <div className="aspect-video sm:aspect-[21/9] rounded-lg overflow-hidden border border-border">
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
    </div>
  );
};

export default Contact;
