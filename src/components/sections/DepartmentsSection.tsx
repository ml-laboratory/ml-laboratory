"use client";

import { motion } from "framer-motion";
import { Database, BrainCircuit, Workflow } from "lucide-react";

const departments = [
    {
        icon: <Database className="w-8 h-8 text-primary" />,
        title: "Ciencia de Datos",
        description: "Análisis, visualización y modelado de datos para resolver problemas reales con evidencia.",
    },
    {
        icon: <BrainCircuit className="w-8 h-8 text-accent" />,
        title: "IA",
        description: "Agentes inteligentes, automatización cognitiva y soluciones basadas en modelos de lenguaje.",
    },
    {
        icon: <Workflow className="w-8 h-8 text-secondary" />,
        title: "Automatización",
        description: "Optimización de procesos y flujos de trabajo mediante herramientas y sistemas automatizados.",
    },
];

export default function DepartmentsSection() {
    return (
        <section id="departamentos" className="py-24 relative">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
                    >
                        Nuestros Departamentos
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ delay: 0.1 }}
                        className="text-foreground/70 max-w-2xl mx-auto text-lg"
                    >
                        Tres squads, un mismo propósito: construir soluciones que generan impacto real.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {departments.map((dept, index) => (
                        <motion.div
                            key={dept.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                            whileHover={{ y: -5 }}
                            className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-primary/50 transition-colors group cursor-pointer"
                        >
                            <div className="mb-6 p-4 rounded-2xl bg-black/50 inline-block group-hover:scale-110 transition-transform">
                                {dept.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3">{dept.title}</h3>
                            <p className="text-foreground/60 leading-relaxed">
                                {dept.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
