"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollText, Shield, FileText, Scale, AlertCircle } from "lucide-react";
import { Link } from "@/lib/router-compat";
import SEOHead from "@/components/SEOHead";

const Terms = () => {
    return (
        <div className="min-h-screen bg-background">
            <SEOHead
                title="Terms of Use | CPC Qatar"
                description="Terms and conditions for using the CPC Qatar website. Cosmo Projects & Construction and Trading W.L.L."
                canonical="/terms"
                noindex={true}
            />
            <Header />
            <main>
                {/* Hero Section */}
                <section className="pt-32 pb-16 bg-gradient-dark">
                    <div className="container mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-center max-w-4xl mx-auto"
                        >
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
                                <Scale className="w-8 h-8 text-primary" />
                                <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wide text-center">
                                    TERMS <span className="text-gradient">OF USE</span>
                                </h1>
                            </div>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                Please read these terms and conditions carefully before using our website
                            </p>
                            <p className="text-muted-foreground text-sm mt-4">
                                Last Updated: December 24, 2025
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Terms Content */}
                <section className="py-20">
                    <div className="container mx-auto px-6 max-w-5xl">
                        {/* Section 1 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-12"
                        >
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                                    <FileText className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h2 className="font-display text-2xl tracking-wide mb-4">
                                        1. ABOUT THIS WEBSITE
                                    </h2>
                                    <div className="text-muted-foreground leading-relaxed space-y-3">
                                        <p>
                                            This is a presentation website showcasing COSMO PROJECTS & CONSTRUCTION AND TRADING
                                            ("CPC Qatar"). The website displays our completed construction projects, services,
                                            and company information. By using this website, you agree to these simple terms.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Section 2 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-12"
                        >
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                                    <ScrollText className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h2 className="font-display text-2xl tracking-wide mb-4">
                                        2. COMPANY INFORMATION
                                    </h2>
                                    <div className="text-muted-foreground leading-relaxed space-y-3">
                                        <p>
                                            CPC Qatar is a registered company in the State of Qatar established on December 11, 2017,
                                            with Commercial Registration No. 108122, valid until December 8, 2029. We specialize in
                                            road construction, earthworks, asphalt paving, and infrastructure development services.
                                        </p>
                                        <p className="font-medium text-foreground">Company Details:</p>
                                        <ul className="list-disc list-inside space-y-2 ml-4">
                                            <li>Legal Name: Cosmo Projects & Construction and Trading</li>
                                            <li>Commercial Registration: 108122</li>
                                            <li>Location: Mirqab Mall, Area No. 39, Street No.840, Building No.53, Block D – Office No. 307-308</li>
                                            <li>P.O. Box: 15776, Doha, Qatar</li>
                                            <li>Telephone: (+974) 4432-2743</li>
                                            <li>Fax: (+974) 4029-1295</li>
                                            <li>Email: Info@ctgroups.net</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Section 3 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-12"
                        >
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                                    <Shield className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h2 className="font-display text-2xl tracking-wide mb-4">
                                        3. WEBSITE CONTENT
                                    </h2>
                                    <div className="text-muted-foreground leading-relaxed space-y-3">
                                        <p>
                                            All content on this website - including project photos, company logo, and text -
                                            belongs to CPC Qatar. The information is provided for showcase purposes.
                                        </p>
                                        <p>
                                            Please don't copy or misuse our project photos or company information. If you're
                                            interested in our work, contact us directly.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Section 4 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-12"
                        >
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                                    <FileText className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h2 className="font-display text-2xl tracking-wide mb-4">
                                        4. PROJECT INFORMATION
                                    </h2>
                                    <div className="text-muted-foreground leading-relaxed space-y-3">
                                        <p>
                                            The projects and information shown on this website are examples of our work.
                                            Actual project details, pricing, and timelines vary based on specific requirements.
                                        </p>
                                        <p>
                                            If you're interested in our construction services, please contact us for a proper
                                            quote based on your specific project needs.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Section 5 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-12"
                        >
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                                    <AlertCircle className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h2 className="font-display text-2xl tracking-wide mb-4">
                                        5. PROJECT QUOTES
                                    </h2>
                                    <div className="text-muted-foreground leading-relaxed space-y-3">
                                        <p>
                                            The project examples and information on this website are for showcase purposes. Every construction
                                            project is unique and requires proper assessment. Contact us for an accurate quote based on your
                                            specific needs, site conditions, and requirements.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Section 6 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-12"
                        >
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                                    <FileText className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h2 className="font-display text-2xl tracking-wide mb-4">
                                        6. YOUR PRIVACY
                                    </h2>
                                    <div className="text-muted-foreground leading-relaxed space-y-3">
                                        <p>
                                            When you contact us through the website, we only collect the information you provide (name, email, message).
                                            Please read our <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link> to learn how we handle your information.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Section 7 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-12"
                        >
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                                    <AlertCircle className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h2 className="font-display text-2xl tracking-wide mb-4">
                                        7. UPDATES TO TERMS
                                    </h2>
                                    <div className="text-muted-foreground leading-relaxed space-y-3">
                                        <p>
                                            We may update these terms occasionally to reflect changes to our website or services.
                                            When we do, we'll update the date at the top of this page.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Section 8 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-12"
                        >
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                                    <FileText className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h2 className="font-display text-2xl tracking-wide mb-4">
                                        8. CONTACT US
                                    </h2>
                                    <div className="text-muted-foreground leading-relaxed space-y-3">
                                        <p>
                                            If you have any questions about these Terms of Use, please contact us:
                                        </p>
                                        <div className="bg-gradient-card border border-border rounded-lg p-6 mt-4">
                                            <p className="font-semibold text-foreground mb-3">COSMO PROJECTS & CONSTRUCTION AND TRADING</p>
                                            <ul className="space-y-2 text-sm">
                                                <li><span className="text-primary font-medium">Address:</span> Mirqab Mall, Area No. 39, Street No.840, Building No.53, Block D – Office No. 307-308, P.O. Box: 15776, Doha, Qatar</li>
                                                <li><span className="text-primary font-medium">Telephone:</span> (+974) 4432-2743</li>
                                                <li><span className="text-primary font-medium">Fax:</span> (+974) 4029-1295</li>
                                                <li><span className="text-primary font-medium">Email:</span> Info@ctgroups.net</li>
                                                <li><span className="text-primary font-medium">Commercial Registration:</span> 108122</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Simple Notice */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mt-16 p-8 bg-primary/5 border-l-4 border-primary rounded-r-lg"
                        >
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                By using this website, you agree to these terms. If you have any questions, feel free to contact us.
                            </p>
                        </motion.div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Terms;
