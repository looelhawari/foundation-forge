import { motion, useAnimationFrame, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";
import moelogo from "@/assets/MOE-removebg-preview.png";
import fifaLogo from "@/assets/FIFA-removebg-preview.png";
import museumLogo from "@/assets/museum-removebg-preview.png";
import dhlLogo from "@/assets/DHL-removebg-preview.png";
import meeraLogo from "@/assets/meera-removebg-preview.png";
import arianeLogo from "@/assets/Ariane real state.png";
import ashghaalLogo from "@/assets/ashghaal.png";
import fbaLogo from "@/assets/FBA real estate.png";
import imalcoLogo from "@/assets/imalco.png";
import qnieLogo from "@/assets/qnie.png";

const clients = [
    { name: "Ministry of Education", logo: moelogo },
    { name: "FIFA World Cup Qatar 2022", logo: fifaLogo },
    { name: "Qatar Museums", logo: museumLogo },
    { name: "DHL", logo: dhlLogo },
    { name: "Al Meera", logo: meeraLogo },
    { name: "Ariane Real Estate", logo: arianeLogo },
    { name: "Ashghaal", logo: ashghaalLogo },
    { name: "FBA Real Estate", logo: fbaLogo },
    { name: "Imalco", logo: imalcoLogo },
    { name: "QNIE", logo: qnieLogo },
];

const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

// Infinite scroll with magnetic effect
export function ClientLogosShowcase() {
    const baseVelocity = -1.5; // Slightly slower for smoother animation
    const baseX = useMotionValue(0);
    const x = useTransform(baseX, (v) => `${v}%`);

    const directionFactor = useRef(1);

    useAnimationFrame((t, delta) => {
        // Throttle animation updates for better performance
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

        if (baseX.get() <= -50) {
            baseX.set(0);
        }

        baseX.set(baseX.get() + moveBy);
    });

    return (
        <section className="relative py-16 sm:py-24 md:py-32 bg-black overflow-hidden">
            {/* Static grid background - removed animation for performance */}
            <div className="absolute inset-0 opacity-5">
                <div
                    className="h-full w-full"
                    style={{
                        backgroundImage: `
              linear-gradient(rgba(251, 191, 36, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(251, 191, 36, 0.5) 1px, transparent 1px)
            `,
                        backgroundSize: "100px 100px"
                    }}
                />
            </div>

            <div className="container mx-auto px-4 sm:px-6 mb-12 md:mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="text-center"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 px-4">
                        Trusted By <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Industry Leaders</span>
                    </h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        viewport={{ once: true }}
                        className="h-1 w-32 sm:w-48 md:w-64 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-8"
                    />
                    <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto px-4">
                        Partnering with Qatar's most prestigious organizations
                    </p>
                </motion.div>
            </div>

            {/* Infinite scrolling logos */}
            <div className="relative h-32 sm:h-40 md:h-48 flex items-center">
                {/* Light background strip for logo visibility */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-28 sm:h-36 md:h-44 bg-gradient-to-r from-transparent via-gray-100/90 to-transparent" />

                <motion.div
                    className="flex gap-12 sm:gap-16 md:gap-20 absolute"
                    style={{ x }}
                >
                    {[...clients, ...clients, ...clients, ...clients].map((client, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 w-32 sm:w-40 md:w-48 h-32 sm:h-40 md:h-48 flex items-center justify-center p-4 rounded-xl"
                        >
                            <img
                                src={client.logo}
                                alt={client.name}
                                className="w-full h-full object-contain drop-shadow-md"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Trust badges */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                viewport={{ once: true }}
                className="container mx-auto px-4 sm:px-6 mt-12 md:mt-16"
            >
                <div className="flex justify-center gap-8 sm:gap-12 flex-wrap">
                    {[
                        { number: "45+", label: "Major Clients" },
                        { number: "57+", label: "Projects Delivered" },
                        { number: "100%", label: "Satisfaction Rate" }
                    ].map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            className="text-center"
                            initial={{ scale: 0, rotate: -180 }}
                            whileInView={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.7 + index * 0.1, type: "spring", stiffness: 200 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                            <div className="text-3xl sm:text-4xl font-bold text-amber-400 mb-2">{stat.number}</div>
                            <div className="text-sm sm:text-base text-gray-400">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
