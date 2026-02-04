import { motion } from "framer-motion";
import companyLogo from "@/assets/cpc_logo-removebg-preview.png";

interface PageLoaderProps {
    title?: string;
    subtitle?: string;
}

/**
 * A minimal, fast page loader that shows only while content is loading.
 * It disappears immediately when loading is complete.
 */
export function PageLoader({ title = "CPC QATAR", subtitle }: PageLoaderProps) {
    return (
        <motion.div
            className="fixed inset-0 z-[9999] bg-background flex items-center justify-center overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
        >
            {/* Simple gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />

            {/* Main content */}
            <div className="relative z-10 flex flex-col items-center px-6">
                {/* Logo with subtle pulse */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="mb-6"
                >
                    <motion.img
                        src={companyLogo}
                        alt="CPC Logo"
                        className="w-24 h-24 md:w-32 md:h-32 object-contain"
                        animate={{
                            opacity: [0.7, 1, 0.7]
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </motion.div>

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                    className="font-display text-2xl md:text-3xl tracking-[0.15em] text-gradient text-center mb-2"
                >
                    {title}
                </motion.h1>

                {/* Subtitle */}
                {subtitle && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2, delay: 0.15 }}
                        className="text-sm text-muted-foreground text-center mb-6"
                    >
                        {subtitle}
                    </motion.p>
                )}

                {/* Simple loading spinner */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: 0.2 }}
                    className="flex items-center gap-2"
                >
                    <motion.div
                        className="w-2 h-2 rounded-full bg-primary"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div
                        className="w-2 h-2 rounded-full bg-primary"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div
                        className="w-2 h-2 rounded-full bg-primary"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
                    />
                </motion.div>
            </div>
        </motion.div>
    );
}
