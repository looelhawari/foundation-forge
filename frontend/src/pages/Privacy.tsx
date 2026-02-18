import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Shield, Lock, Eye, Database, UserCheck, FileText, AlertTriangle, CheckCircle } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const Privacy = () => {
    return (
        <div className="min-h-screen bg-background">
            <SEOHead
                title="Privacy Policy | CPC Qatar"
                description="Privacy policy for CPC Qatar (Cosmo Projects & Construction). How we collect, use, and protect your personal information."
                canonical="/privacy"
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
                                <Shield className="w-8 h-8 text-primary" />
                                <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wide text-center">
                                    PRIVACY <span className="text-gradient">POLICY</span>
                                </h1>
                            </div>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                COSMO PROJECTS & CONSTRUCTION is committed to protecting your privacy and personal information
                            </p>
                            <p className="text-muted-foreground text-sm mt-4">
                                Last Updated: December 24, 2025
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Privacy Content */}
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
                                            This is a presentation website for COSMO PROJECTS & CONSTRUCTION AND TRADING ("CPC Qatar").
                                            The website showcases our completed projects, services, and company information. We collect
                                            minimal personal information, only when you choose to contact us.
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
                                    <Database className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h2 className="font-display text-2xl tracking-wide mb-4">
                                        2. WHAT INFORMATION WE COLLECT
                                    </h2>
                                    <div className="text-muted-foreground leading-relaxed space-y-3">
                                        <p>
                                            We only collect information when you voluntarily submit the contact form on our website:
                                        </p>
                                        <ul className="list-disc list-inside space-y-2 ml-4">
                                            <li>Your name</li>
                                            <li>Email address</li>
                                            <li>Phone number (optional)</li>
                                            <li>Company name (optional)</li>
                                            <li>Your message or inquiry</li>
                                        </ul>
                                        <p className="mt-3">
                                            We do not use cookies, tracking tools, or collect any browsing data. This is a simple
                                            presentation website to showcase our construction work.
                                        </p>
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
                                    <Eye className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h2 className="font-display text-2xl tracking-wide mb-4">
                                        3. HOW WE USE YOUR INFORMATION
                                    </h2>
                                    <div className="text-muted-foreground leading-relaxed space-y-3">
                                        <p>We use your contact information only to:</p>
                                        <ul className="list-disc list-inside space-y-2 ml-4">
                                            <li>Respond to your inquiry or message</li>
                                            <li>Provide information about our construction services</li>
                                            <li>Prepare project quotes if requested</li>
                                        </ul>
                                        <p className="mt-3">
                                            <strong>That's it.</strong> We do not sell, share, or use your information for any other purpose.
                                            We do not send marketing emails unless you specifically request updates about our services.
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
                                    <Lock className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h2 className="font-display text-2xl tracking-wide mb-4">
                                        4. HOW WE PROTECT YOUR INFORMATION
                                    </h2>
                                    <div className="text-muted-foreground leading-relaxed space-y-3">
                                        <p>
                                            Your contact information is stored securely and is only accessible to authorized personnel
                                            who need it to respond to your inquiry. We do not share your information with third parties.
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
                                    <UserCheck className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h2 className="font-display text-2xl tracking-wide mb-4">
                                        5. YOUR RIGHTS
                                    </h2>
                                    <div className="text-muted-foreground leading-relaxed space-y-3">
                                        <p>You can request to:</p>
                                        <ul className="list-disc list-inside space-y-2 ml-4">
                                            <li>See what information we have about you</li>
                                            <li>Correct any information</li>
                                            <li>Delete your information</li>
                                        </ul>
                                        <p>
                                            Contact us at Info@ctgroups.net or call +974 4432-2743 for any requests.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Section 6 - Health & Safety Policy */}
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
                                        6. HEALTH & SAFETY POLICY
                                    </h2>
                                    <div className="text-muted-foreground leading-relaxed space-y-4">
                                        <p>
                                            CPC strives to attain and maintain the highest possible level of safety practices on all
                                            CPC projects. CPC aims to achieve this through the implementation of the following:
                                        </p>

                                        <div className="bg-gradient-card border border-border rounded-lg p-6 space-y-4">
                                            <div>
                                                <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                                                    <CheckCircle className="w-5 h-5 text-primary" />
                                                    1) OPERATIONAL SAFETY
                                                </h4>
                                                <p className="text-sm ml-7">
                                                    The Company and its employees are dedicated towards making sure that all operations
                                                    are monitored for safety and are conducted and executed in the safest manner possible.
                                                </p>
                                            </div>

                                            <div>
                                                <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                                                    <CheckCircle className="w-5 h-5 text-primary" />
                                                    2) COMPLIANCE
                                                </h4>
                                                <p className="text-sm ml-7">
                                                    CPC will at all times comply with all Government Laws, Regulations and Company policies
                                                    and procedures that have been established.
                                                </p>
                                            </div>

                                            <div>
                                                <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                                                    <CheckCircle className="w-5 h-5 text-primary" />
                                                    3) SAFETY MEASURES
                                                </h4>
                                                <p className="text-sm ml-7">
                                                    Assess potential risks and hazards and develop safety measures to counteract these problems.
                                                </p>
                                            </div>

                                            <div>
                                                <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                                                    <CheckCircle className="w-5 h-5 text-primary" />
                                                    4) RESPONSE TO EMERGENCIES
                                                </h4>
                                                <p className="text-sm ml-7">
                                                    Safety awareness programs, safety drills and exercises must be conducted.
                                                </p>
                                            </div>

                                            <div>
                                                <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                                                    <CheckCircle className="w-5 h-5 text-primary" />
                                                    5) COMMUNITY AWARENESS & OUTREACH
                                                </h4>
                                                <p className="text-sm ml-7">
                                                    Encourage open communication and understanding between CPC and the community, this
                                                    includes recognizing and responding as appropriate to community concerns about safety issues.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="p-4 bg-primary/5 border-l-4 border-primary rounded-r-lg mt-4">
                                            <p className="text-sm">
                                                This policy needs the commitment and support of each employee and sub-contractors.
                                                Management and supervisors at every level are requested to demonstrate dedication to
                                                the safety policy by means of informing and creating awareness of the policy to all
                                                employees and giving them the responsibility and resources to address safety issues
                                                that may be encountered.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Section 7 - Quality Policy */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-12"
                        >
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                                    <AlertTriangle className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h2 className="font-display text-2xl tracking-wide mb-4">
                                        7. QUALITY POLICY
                                    </h2>
                                    <div className="text-muted-foreground leading-relaxed space-y-4">
                                        <p>
                                            CPC Co. is committed to supplying construction services of consistent quality that conform
                                            fully with company and statutory requirements and in meeting our client's documented and
                                            implied expectations in terms of technical, budget and time compliance.
                                        </p>
                                        <p>
                                            Dedicated to the continual review, development and improvement of all aspects of its business,
                                            in particular:
                                        </p>

                                        <div className="bg-gradient-card border border-border rounded-lg p-6 space-y-3">
                                            <div className="flex items-start gap-3">
                                                <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                                <p className="text-sm">
                                                    The development and improvement of the Company's construction services in line with
                                                    client's needs and expectations.
                                                </p>
                                            </div>

                                            <div className="flex items-start gap-3">
                                                <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                                <p className="text-sm">
                                                    The development of an efficient and effective Quality System and generally accepted
                                                    best practices in the management of Construction Projects, a system which not only
                                                    ensures that the construction quality is consistent, but also helps to ensure minimal
                                                    wastage in all our construction phases.
                                                </p>
                                            </div>

                                            <div className="flex items-start gap-3">
                                                <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                                <p className="text-sm">
                                                    The evaluation, training and development of our employees in order to meet the company's objectives.
                                                </p>
                                            </div>

                                            <div className="flex items-start gap-3">
                                                <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                                <p className="text-sm">
                                                    The ongoing development of the corporate culture that incorporates constant problem
                                                    solving and continuous improvement, encouraging all employees to take total pride in,
                                                    and responsibility for, their work and the development of better working practices.
                                                </p>
                                            </div>

                                            <div className="flex items-start gap-3">
                                                <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                                <p className="text-sm">
                                                    Establishing and reviewing quality objectives for all levels that are realistic,
                                                    achievable and measurable taking into cognizance preventive action for outside
                                                    influences that could prevent the achievement of the objectives.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="p-4 bg-primary/5 border-l-4 border-primary rounded-r-lg mt-4">
                                            <p className="text-sm">
                                                Management will communicate this policy to all employees and staff in such a way that
                                                it is properly understood and followed.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div >

                        {/* Section 8 - Contact */}
                        < motion.div
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
                                            Questions about this policy? Contact us:
                                        </p>
                                        <div className="bg-gradient-card border border-border rounded-lg p-6 mt-4">
                                            <p className="font-semibold text-foreground mb-3">COSMO PROJECTS & CONSTRUCTION AND TRADING</p>
                                            <ul className="space-y-2 text-sm">
                                                <li><span className="text-primary font-medium">Address:</span> Mirqab Mall, Area No. 39, Street No.840, Building No.53, Block D – Office No. 307-308, P.O. Box: 15776, Doha, Qatar</li>
                                                <li><span className="text-primary font-medium">Phone:</span> (+974) 4432-2743</li>
                                                <li><span className="text-primary font-medium">Email:</span> Info@ctgroups.net</li>
                                                <li><span className="text-primary font-medium">CR:</span> 108122</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div >

                        {/* Acknowledgment Notice */}
                        < motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mt-16 p-8 bg-primary/5 border-l-4 border-primary rounded-r-lg"
                        >
                            <p className="text-foreground font-medium mb-2">
                                CONSENT
                            </p>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                This is a simple presentation website. We only collect what you voluntarily submit through
                                our contact form, and we use it solely to respond to your inquiry.
                            </p>
                        </motion.div >
                    </div >
                </section >
            </main >
            <Footer />
        </div >
    );
};

export default Privacy;
