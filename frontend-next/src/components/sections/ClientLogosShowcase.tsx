"use client";

import { motion } from "framer-motion";

const moelogo = "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312021/cpc-website/MOE-removebg-preview.png";
const fifaLogo = "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312010/cpc-website/FIFA-removebg-preview.png";
const museumLogo = "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312025/cpc-website/museum-removebg-preview.png";
const dhlLogo = "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312005/cpc-website/DHL-removebg-preview.png";
const meeraLogo = "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312018/cpc-website/meera-removebg-preview.png";
const arianeLogo = "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772311985/cpc-website/Ariane_real_state.png";
const ashghaalLogo = "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772311986/cpc-website/ashghaal.png";
const fbaLogo = "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312009/cpc-website/FBA_real_estate.png";
const imalcoLogo = "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312017/cpc-website/imalco.jpg";
const qnieLogo = "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312041/cpc-website/qnie.jpg";

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

// Pure CSS infinite scroll — zero main-thread cost
export function ClientLogosShowcase() {
    const logoItems = clients.map((client, index) => (
        <div
            key={index}
            className="flex-shrink-0 w-32 sm:w-40 md:w-48 h-32 sm:h-40 md:h-48 flex items-center justify-center p-4 rounded-xl"
        >
            <img
                src={client.logo}
                alt={client.name}
                width={120}
                height={60}
                className="w-full h-full object-contain drop-shadow-md"
                loading="lazy"
            />
        </div>
    ));

    return (
        <section className="relative py-16 sm:py-24 md:py-32 bg-black overflow-hidden">
            {/* Static grid background */}
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
                    <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto px-4">
                        Partnering with Qatar's most prestigious organizations
                    </p>
                </motion.div>
            </div>

            {/* Infinite scrolling logos — CSS animation */}
            <div className="relative h-32 sm:h-40 md:h-48 flex items-center">
                {/* Light background strip for logo visibility */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-28 sm:h-36 md:h-44 bg-gradient-to-r from-transparent via-gray-100/90 to-transparent" />

                <div className="flex absolute overflow-hidden w-full">
                    <div
                        className="flex gap-12 sm:gap-16 md:gap-20 shrink-0 will-change-transform"
                        style={{ animation: 'marquee 35s linear infinite' }}
                    >
                        {logoItems}
                    </div>
                    <div
                        className="flex gap-12 sm:gap-16 md:gap-20 shrink-0 will-change-transform"
                        style={{ animation: 'marquee 35s linear infinite' }}
                    >
                        {logoItems}
                    </div>
                </div>
            </div>

            {/* Trust badges — opacity-only initial to prevent CLS */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                viewport={{ once: true }}
                className="container mx-auto px-4 sm:px-6 mt-12 md:mt-16"
            >
                <div className="flex justify-center gap-8 sm:gap-12 flex-wrap">
                    {[
                        { number: "45+", label: "Major Clients" },
                        { number: "90+", label: "Projects Delivered" },
                        { number: "100%", label: "Satisfaction Rate" }
                    ].map((stat) => (
                        <div
                            key={stat.label}
                            className="text-center"
                        >
                            <div className="text-3xl sm:text-4xl font-bold text-amber-400 mb-2">{stat.number}</div>
                            <div className="text-sm sm:text-base text-gray-400">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
