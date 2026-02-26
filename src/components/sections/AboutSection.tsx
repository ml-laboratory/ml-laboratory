"use client";

import { motion } from "framer-motion";
import { Network, Terminal, BrainCircuit } from "lucide-react";

const features = [
    {
        icon: <DatabaseIcon />,
        title: "Data Engineering",
        description: "Arquitecturas escalables, pipelines y optimización de bases de datos modernas.",
    },
    {
        icon: <BrainCircuit className="w-8 h-8 text-accent" />,
        title: "Machine Learning",
        description: "Desarrollo y deployment de modelos, fine-tuning y MLOps.",
    },
    {
        icon: <Terminal className="w-8 h-8 text-secondary" />,
        title: "Comunidad Open Source",
        description: "Colaboración en proyectos, creación de herramientas y compartición de conocimiento.",
    },
];

function DatabaseIcon() {
    return <Network className="w-8 h-8 text-primary" />;
}

export default function AboutSection() {
    return (
        <section id="about" className="py-24 relative">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
                    >
                        ¿Quiénes Somos?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ delay: 0.1 }}
                        className="text-foreground/70 max-w-2xl mx-auto text-lg"
                    >
                        ML Laboratory es el espacio de encuentro para mentes curiosas y creadores del ecosistema de datos. No solo hablamos de IA, la construimos.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                            whileHover={{ y: -5 }}
                            className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-primary/50 transition-colors group cursor-pointer"
                        >
                            <div className="mb-6 p-4 rounded-2xl bg-black/50 inline-block group-hover:scale-110 transition-transform">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-foreground/60 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
