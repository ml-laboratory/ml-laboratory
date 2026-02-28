"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const timelineEvents = [
    {
        year: "Fase 1",
        title: "Ingesta de Datos",
        description: "Construimos arquitecturas escalables y robustas. Desde Data Lakes hasta sistemas de streaming en tiempo real, establecemos las bases estructurales.",
        icon: "database",
        orbPos: "-top-10 -right-10",
    },
    {
        year: "Fase 2",
        title: "Procesamiento y ETL",
        description: "Limpieza, transformación y estructuración. Damos sentido al ruido mediante pipelines eficientes y orquestación distribuida e inteligente.",
        icon: "account_tree",
        orbPos: "-bottom-10 -left-10",
    },
    {
        year: "Fase 3",
        title: "Modelado Predictivo",
        description: "Entrenamiento de modelos de Machine Learning. Regresión, clasificación y clustering en entornos de alta disponibilidad y performance.",
        icon: "psychology",
        orbPos: "-top-10 left-10",
    },
    {
        year: "Fase 4",
        title: "Inteligencia Artificial",
        description: "LLMs, Computer Vision y GenAI. Llevamos el procesamiento al siguiente nivel, sintetizando el futuro con modelos de vanguardia.",
        icon: "memory",
        orbPos: "-bottom-10 right-10",
    },
    {
        year: "Impacto",
        title: "Soluciones en Producción",
        description: "Despliegue, monitoreo y MLOps. Aseguramos que los modelos sobrevivan al mundo real entregando valor tangible a escala.",
        icon: "rocket_launch",
        orbPos: "-top-10 -right-10",
    }
];

export default function EvolutionTimeline() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section ref={containerRef} className="relative py-20 md:py-32 z-10" id="about">
            <div className="max-w-4xl mx-auto px-4 sm:px-8 md:px-16 relative z-10">

                <div className="text-center mb-16 md:mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-xs uppercase tracking-[0.5em] text-foreground/40 mb-4">Metodología</h2>
                        <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif italic mb-6">Nuestra Filosofía</h3>
                        <p className="text-foreground/60 max-w-2xl mx-auto text-base md:text-lg font-light leading-relaxed px-2">
                            Acompañanos en el ciclo de vida de los datos, desde la captura cruda hasta la síntesis de inteligencia avanzada.
                        </p>
                    </motion.div>
                </div>

                <div className="relative">
                    {/* Background Line */}
                    <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-[1px] bg-foreground/10 -translate-x-1/2" />

                    {/* Animated Glowing Line */}
                    <motion.div
                        className="absolute left-[28px] md:left-1/2 top-0 w-[2px] -translate-x-1/2 origin-top"
                        style={{
                            height: lineHeight,
                            background: "linear-gradient(to bottom, rgba(56, 189, 248, 0.4), rgba(226, 232, 240, 0.6))",
                            boxShadow: "0 0 12px rgba(56, 189, 248, 0.3), 0 0 30px rgba(56, 189, 248, 0.1)",
                        }}
                    />

                    <div className="flex flex-col gap-8 md:gap-24">
                        {timelineEvents.map((event, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <TimelineItem
                                    key={index}
                                    event={event}
                                    index={index}
                                    isEven={isEven}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}

function TimelineItem({ event, index, isEven }: { event: typeof timelineEvents[0], index: number, isEven: boolean }) {
    const itemRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: itemRef,
        offset: ["start end", "center center"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [0.3, 1, 1]);
    const scale = useTransform(scrollYProgress, [0, 0.8, 1], [0.8, 1, 1]);
    const xOffset = isEven ? 30 : -30;
    const x = useTransform(scrollYProgress, [0, 1], [xOffset, 0]);

    return (
        <div ref={itemRef} className={`relative flex items-center justify-start md:justify-between w-full group ${isEven ? 'md:flex-row-reverse' : ''}`}>

            {/* Node with animated glow */}
            <div className="absolute left-[28px] md:left-1/2 -translate-x-1/2 flex items-center justify-center z-20">
                <motion.div
                    style={{ scale, opacity }}
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-foreground/20 bg-background flex items-center justify-center transition-all duration-300 group-hover:border-accent/60 group-hover:shadow-[0_0_20px_rgba(56,189,248,0.2)]"
                >
                    <motion.span
                        className="material-symbols-outlined text-foreground/70 font-thin"
                        whileHover={{ rotate: 180 }}
                        transition={{ duration: 0.6 }}
                    >
                        {event.icon}
                    </motion.span>
                </motion.div>
            </div>

            {/* Spacer for desktop */}
            <div className="hidden md:block w-1/2 relative px-8" />

            {/* Content Card */}
            <motion.div
                style={{ opacity, x }}
                className="w-full pl-16 md:pl-0 md:w-1/2 md:px-12"
            >
                <motion.div
                    className="glass-card rounded-2xl md:rounded-3xl p-6 md:p-8 relative overflow-hidden group-hover:border-foreground/20 transition-all duration-500"
                    whileHover={{ y: -4, transition: { duration: 0.3 } }}
                    style={{ animation: "glow-breathe 4s ease-in-out infinite" }}
                >
                    <div className={`liquid-orb ${event.orbPos} opacity-0 group-hover:opacity-40 transition-opacity duration-1000 scale-150`} />

                    <span className="inline-block px-3 md:px-4 py-1 md:py-1.5 rounded-full border border-foreground/10 text-[10px] uppercase tracking-widest text-foreground/60 mb-4 md:mb-6">
                        {event.year}
                    </span>
                    <h3 className="text-xl md:text-2xl font-serif mb-3 md:mb-4">
                        {event.title}
                    </h3>
                    <p className="text-foreground/60 font-light leading-relaxed text-xs md:text-sm">
                        {event.description}
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
}
