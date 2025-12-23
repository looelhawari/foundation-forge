import { motion } from "framer-motion";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { Truck, Hammer, Wrench, HardHat, Gauge, Shield } from "lucide-react";

const equipment = [
    {
        icon: Truck,
        title: "Heavy Machinery",
        items: ["Asphalt Pavers", "Road Rollers", "Compactors", "Graders"],
        image: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=600&h=400&fit=crop",
        color: "from-amber-500 to-orange-600"
    },
    {
        icon: Wrench,
        title: "Specialized Tools",
        items: ["Road Marking Equipment", "Cutting Machines", "Drilling Tools", "Testing Equipment"],
        image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&h=400&fit=crop",
        color: "from-orange-500 to-amber-600"
    },
    {
        icon: HardHat,
        title: "Safety Equipment",
        items: ["Safety Gear", "Protective Clothing", "Warning Systems", "Site Safety Tools"],
        image: "https://images.unsplash.com/photo-1615671524827-c1fe3973b648?w=600&h=400&fit=crop",
        color: "from-amber-400 to-orange-500"
    },
    {
        icon: Gauge,
        title: "Quality Control",
        items: ["Testing Devices", "Measurement Tools", "Inspection Equipment", "Lab Equipment"],
        image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=400&fit=crop",
        color: "from-gray-500 to-gray-600"
    }
];

export const EquipmentShowcase = () => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
    const [activeIndex, setActiveIndex] = useState(0);

    const activeItem = equipment[activeIndex];

    return (
        <section ref={ref} className="relative py-32 bg-gradient-to-b from-background to-muted/30 overflow-hidden">
            {/* Animated Grid Background */}
            <div className="absolute inset-0 opacity-5">
                <motion.div
                    animate={{
                        backgroundPosition: ['0% 0%', '100% 100%']
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                    className="absolute inset-0"
                    style={{
                        backgroundImage: 'linear-gradient(45deg, currentColor 25%, transparent 25%), linear-gradient(-45deg, currentColor 25%, transparent 25%), linear-gradient(45deg, transparent 75%, currentColor 75%), linear-gradient(-45deg, transparent 75%, currentColor 75%)',
                        backgroundSize: '60px 60px',
                        backgroundPosition: '0 0, 0 30px, 30px -30px, -30px 0px'
                    }}
                />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        className="inline-block text-primary font-display text-sm tracking-[0.3em] mb-4"
                    >
                        OUR CAPABILITIES
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl mb-6 px-4"
                    >
                        Equipment & <span className="text-gradient">Resources</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-3xl mx-auto px-4"
                    >
                        State-of-the-art machinery and tools for every construction need
                    </motion.p>
                </motion.div>

                {/* Split Layout: Images Left, Content Right */}
                <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center mb-12 md:mb-20">
                    {/* Left Half - Circular Images */}
                    <div className="relative h-[400px] sm:h-[500px] md:h-[600px]">
                        <div className="absolute inset-0 flex items-center justify-center">
                            {equipment.map((item, index) => {
                                const isActive = index === activeIndex;
                                const angle = (index - activeIndex) * 90;

                                return (
                                    <motion.div
                                        key={item.title}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{
                                            opacity: isActive ? 1 : 0.3,
                                            scale: isActive ? 1 : 0.6,
                                            x: Math.sin((angle * Math.PI) / 180) * 200,
                                            y: Math.cos((angle * Math.PI) / 180) * 200,
                                            rotate: isActive ? 0 : angle,
                                            zIndex: isActive ? 10 : 0
                                        }}
                                        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                                        onClick={() => setActiveIndex(index)}
                                        className="absolute cursor-pointer"
                                    >
                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            className="relative"
                                        >
                                            {/* Circular image container */}
                                            <div className={`w-32 h-32 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden border-2 sm:border-4 ${isActive ? 'border-primary shadow-2xl shadow-primary/30' : 'border-border'} transition-all`}>
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} ${isActive ? 'opacity-20' : 'opacity-40'} transition-opacity`} />
                                            </div>

                                            {/* Icon badge */}
                                            <motion.div
                                                animate={isActive ? {
                                                    scale: [1, 1.2, 1],
                                                    rotate: [0, 360]
                                                } : {}}
                                                transition={{ duration: 2, repeat: Infinity }}
                                                className={`absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-xl`}
                                            >
                                                <item.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
                                            </motion.div>
                                        </motion.div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Half - Content & Bullets */}
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-8"
                    >
                        {/* Title with icon */}
                        <div className="flex items-center gap-4">
                            <motion.div
                                initial={{ rotate: -180, scale: 0 }}
                                animate={{ rotate: 0, scale: 1 }}
                                transition={{ type: "spring", stiffness: 200 }}
                                className={`p-4 rounded-2xl bg-gradient-to-br ${activeItem.color} text-white shadow-lg`}
                            >
                                <activeItem.icon className="w-10 h-10" />
                            </motion.div>
                            <motion.h3
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="font-display text-4xl md:text-5xl"
                            >
                                {activeItem.title}
                            </motion.h3>
                        </div>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-muted-foreground text-lg leading-relaxed"
                        >
                            Advanced equipment designed for precision and efficiency in every aspect of construction work.
                        </motion.p>

                        {/* Bullet points */}
                        <div className="space-y-4">
                            {activeItem.items.map((item, idx) => (
                                <motion.div
                                    key={item}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 + idx * 0.1 }}
                                    className="flex items-center gap-4 group"
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.5, rotate: 180 }}
                                        className={`w-3 h-3 rounded-full bg-gradient-to-r ${activeItem.color} shadow-lg`}
                                    />
                                    <span className="text-lg group-hover:text-primary transition-colors">
                                        {item}
                                    </span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Navigation dots */}
                        <div className="flex gap-3 pt-4">
                            {equipment.map((_, index) => (
                                <motion.button
                                    key={index}
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setActiveIndex(index)}
                                    className={`h-2 rounded-full transition-all ${index === activeIndex
                                        ? `w-12 bg-gradient-to-r ${activeItem.color}`
                                        : 'w-2 bg-border hover:bg-primary/50'
                                        }`}
                                />
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Stats Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto"
                >
                    {[
                        { label: "Heavy Machines", value: "50+", icon: Truck },
                        { label: "Specialized Tools", value: "200+", icon: Hammer },
                        { label: "Safety Standards", value: "100%", icon: Shield },
                        { label: "Maintenance Team", value: "24/7", icon: Wrench }
                    ].map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={inView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: 0.8 + index * 0.1 }}
                            whileHover={{ y: -5, scale: 1.05 }}
                            className="bg-card border border-border rounded-xl p-6 text-center hover:border-primary/50 transition-all group"
                        >
                            <motion.div
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.6 }}
                                className="inline-flex p-3 rounded-full bg-primary/10 text-primary mb-4"
                            >
                                <stat.icon className="w-6 h-6" />
                            </motion.div>
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={inView ? { scale: 1 } : {}}
                                transition={{ delay: 1 + index * 0.1, type: "spring" }}
                                className="font-display text-3xl md:text-4xl mb-2 text-gradient"
                            >
                                {stat.value}
                            </motion.div>
                            <div className="text-sm text-muted-foreground">{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Floating Particles */}
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    animate={{
                        y: [0, -30, 0],
                        x: [0, Math.random() * 20 - 10, 0],
                        opacity: [0.1, 0.3, 0.1]
                    }}
                    transition={{
                        duration: 4 + i,
                        repeat: Infinity,
                        delay: i * 0.5
                    }}
                    className="absolute w-2 h-2 bg-primary rounded-full"
                    style={{
                        top: `${20 + i * 15}%`,
                        left: `${10 + i * 20}%`
                    }}
                />
            ))}
        </section>
    );
};
