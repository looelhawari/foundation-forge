import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, MessageSquare } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

// Company contact data - centralized for easy updates
const CONTACT_INFO = {
    phone: {
        display: "+974 4432-2743",
        href: "tel:+97444322743"
    },
    email: {
        display: "Info@ctgroups.net",
        href: "mailto:Info@ctgroups.net"
    },
    address: {
        display: "Mirqab Mall, Doha, Qatar",
        href: "https://www.google.com/maps/place/Cosmo+Projects+%26+Construction+and+Trading/@25.2734836,51.5014973,17z"
    }
};

export const FloatingContactButtons = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const contactButtons = [
        {
            icon: MessageSquare,
            label: "Contact Us",
            href: "/contact",
            isInternal: true,
            ariaLabel: "Go to contact page"
        },
        {
            icon: Mail,
            label: CONTACT_INFO.email.display,
            href: CONTACT_INFO.email.href,
            ariaLabel: "Send us an email"
        },
        {
            icon: MapPin,
            label: CONTACT_INFO.address.display,
            href: CONTACT_INFO.address.href,
            external: true,
            ariaLabel: "View our location on Google Maps"
        },
        {
            icon: Phone,
            label: CONTACT_INFO.phone.display,
            href: CONTACT_INFO.phone.href,
            ariaLabel: "Call us"
        }
    ];

    return (
        <>
            {/* Mobile floating action button */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5, duration: 0.4 }}
                className="fixed bottom-6 right-6 z-40 lg:hidden"
            >
                <Link
                    to="/contact"
                    aria-label="Contact us"
                    className="flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-shadow"
                >
                    <MessageSquare size={22} strokeWidth={2} />
                </Link>
            </motion.div>

            {/* Desktop sidebar buttons */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-2"
            >
                {contactButtons.map((button, index) => {
                    const Icon = button.icon;
                    const isHovered = hoveredIndex === index;

                    const ButtonContent = (
                        <motion.div
                            className="relative flex items-center"
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            {/* Extending Strip with Label - Appears on Hover */}
                            <AnimatePresence>
                                {isHovered && (
                                    <motion.div
                                        initial={{ width: 0, opacity: 0, x: 20 }}
                                        animate={{ width: "auto", opacity: 1, x: 0 }}
                                        exit={{ width: 0, opacity: 0, x: 20 }}
                                        transition={{
                                            duration: 0.3,
                                            ease: [0.4, 0, 0.2, 1]
                                        }}
                                        className="absolute right-full h-full bg-gradient-to-r from-primary via-primary to-primary/95 flex items-center overflow-hidden rounded-l-lg shadow-lg"
                                    >
                                        <motion.span
                                            initial={{ opacity: 0, x: 10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 10 }}
                                            transition={{ delay: 0.1, duration: 0.2 }}
                                            className="px-5 py-3 text-primary-foreground font-medium text-sm whitespace-nowrap"
                                        >
                                            {button.label}
                                        </motion.span>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Icon Button */}
                            <motion.div
                                animate={{
                                    scale: isHovered ? 1.05 : 1,
                                    backgroundColor: isHovered ? "hsl(var(--primary))" : "hsl(var(--primary) / 0.9)"
                                }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                className="relative flex items-center justify-center w-14 h-14 bg-primary/90 text-primary-foreground rounded-l-xl shadow-lg backdrop-blur-sm border-l border-t border-b border-primary/20"
                            >
                                <Icon size={22} strokeWidth={2} />

                                {/* Subtle glow effect on hover */}
                                <motion.div
                                    animate={{ opacity: isHovered ? 1 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute inset-0 rounded-l-xl bg-gradient-to-r from-white/10 to-transparent pointer-events-none"
                                />
                            </motion.div>
                        </motion.div>
                    );

                    return (
                        <motion.div
                            key={button.label}
                            initial={{ opacity: 0, x: 60 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                                delay: index * 0.1 + 1,
                                duration: 0.4,
                                ease: [0.4, 0, 0.2, 1]
                            }}
                        >
                            {button.isInternal ? (
                                <Link
                                    to={button.href}
                                    aria-label={button.ariaLabel}
                                    className="block"
                                >
                                    {ButtonContent}
                                </Link>
                            ) : (
                                <a
                                    href={button.href}
                                    target={button.external ? "_blank" : undefined}
                                    rel={button.external ? "noopener noreferrer" : undefined}
                                    aria-label={button.ariaLabel}
                                    className="block"
                                >
                                    {ButtonContent}
                                </a>
                            )}
                        </motion.div>
                    );
                })}
            </motion.div>
        </>
    );
};
