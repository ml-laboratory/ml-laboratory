"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const team = [
    {
        name: "Carlos Rivera",
        role: "Lead Researcher",
        description: "Especialista en modelos generativos y procesamiento de lenguaje natural.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=500&auto=format&fit=crop",
        handle: "@crivera_ml"
    },
    {
        name: "Elena Méndez",
        role: "Data Scientist",
        description: "Enfocada en el análisis de datos masivos y sistemas de recomendación éticos.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=500&auto=format&fit=crop",
        handle: "@elena.data"
    },
    {
        name: "Mateo Silva",
        role: "ML Engineer",
        description: "Arquitecto de despliegue y optimización de redes neuronales en tiempo real.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&h=500&auto=format&fit=crop",
        handle: "@msilva_dev"
    },
    {
        name: "Sofía Vega",
        role: "Community Lead",
        description: "Gestora de la colectividad y enlace con el ecosistema global de DSC.",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&h=500&auto=format&fit=crop",
        handle: "@sofia_vga"
    },
];

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [6, -6]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-6, 6]);

    function handleMouseMove(e: React.MouseEvent) {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    }

    function handleMouseLeave() {
        mouseX.set(0);
        mouseY.set(0);
    }

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export default function TeamSection() {
    return (
        <section className="relative z-10 pt-20 md:pt-40 pb-16 md:pb-32 px-4 sm:px-6" id="team">
            {/* About intro */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto text-center mb-20 md:mb-40"
            >
                <div className="inline-block mb-4 md:mb-6">
                    <span className="font-serif italic text-base md:text-lg text-foreground/50 tracking-wide">— Nuestra Esencia</span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif mb-6 md:mb-10 leading-[1.1]">
                    Sintetizando el futuro de la <br />
                    <span className="italic font-light opacity-80">Inteligencia Colectiva</span>
                </h1>
                <p className="text-base md:text-xl font-light text-foreground/60 max-w-2xl mx-auto leading-relaxed px-2">
                    Somos una colectividad de IA y Ciencia de Datos en DSC UTP. Nuestra misión es democratizar el conocimiento avanzado.
                </p>
            </motion.div>

            {/* Team Header */}
            <div className="max-w-[1400px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 md:mb-20 gap-4 md:gap-8 px-2 md:px-4"
                >
                    <div className="max-w-xl">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif italic mb-3 md:mb-4 font-semibold tracking-tight text-white">El Equipo</h2>
                        <p className="text-foreground/50 font-light text-base md:text-lg">Mentes dedicadas a explorar las fronteras de los algoritmos y la arquitectura de datos.</p>
                    </div>
                    <div className="text-[11px] uppercase tracking-[0.2em] opacity-40 pb-2">
                        40+ Colaboradores Activos
                    </div>
                </motion.div>

                {/* Team Grid with 3D Tilt Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 px-2 md:px-4" style={{ perspective: "1200px" }}>
                    {team.map((member, i) => (
                        <motion.div
                            key={member.name}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.12, duration: 0.7 }}
                        >
                            <TiltCard className="group relative glass-card rounded-3xl overflow-hidden hover:border-foreground/20 transition-all duration-500 flex flex-col h-full cursor-default">
                                {/* Animated orb */}
                                <div
                                    className="liquid-orb -top-10 -right-10 group-hover:scale-150 transition-transform duration-700"
                                    style={{ animationDelay: `${i * 0.5}s` }}
                                />

                                {/* Photo */}
                                <div className="relative h-48 sm:h-56 md:h-64 w-full overflow-hidden shrink-0">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 photo-gradient-mask group-hover:scale-105"
                                    />
                                </div>

                                {/* Info */}
                                <div className="p-5 md:p-8 pt-2 flex-grow relative z-10">
                                    <h3 className="text-lg md:text-2xl font-serif italic mb-1">{member.name}</h3>
                                    <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/40 mb-3 md:mb-4 font-medium">{member.role}</p>
                                    <p className="text-xs md:text-sm text-foreground/60 font-light leading-relaxed mb-6 md:mb-8">
                                        {member.description}
                                    </p>
                                </div>

                                {/* Footer with social */}
                                <div className="mt-auto px-5 md:px-6 pb-5 md:pb-6 pt-4 border-t border-white/5 flex items-center gap-4 relative z-10">
                                    <motion.a
                                        href="#"
                                        className="flex items-center gap-2 text-[10px] tracking-widest text-foreground/30 hover:text-foreground transition-colors"
                                        whileHover={{ x: 4 }}
                                    >
                                        <span className="material-symbols-outlined text-sm">alternate_email</span>
                                        {member.handle}
                                    </motion.a>
                                </div>
                            </TiltCard>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* CTA Box */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mt-20 md:mt-32 max-w-5xl mx-auto px-4"
            >
                <div className="glass-card rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-12 lg:p-20 text-center relative overflow-hidden group">
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-accent/5 to-transparent"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    />
                    <div
                        className="liquid-orb top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 !w-96 !h-96 opacity-20 group-hover:scale-150 transition-transform duration-1000"
                    />

                    <div className="relative z-10">
                        <span className="text-[10px] uppercase tracking-[0.4em] text-accent mb-4 block">Convocatoria Abierta</span>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif italic mb-4 md:mb-6">¿Listo para contribuir?</h2>
                        <p className="max-w-lg mx-auto text-foreground/60 font-light leading-relaxed mb-6 md:mb-10 text-sm md:text-base px-2">
                            Buscamos mentes curiosas apasionadas por los datos. Únete a nuestra próxima sesión o presenta tu investigación.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
                            <button className="btn-shimmer px-8 md:px-10 py-4 md:py-5 bg-white text-background rounded-full text-xs md:text-sm uppercase tracking-widest font-medium hover:bg-foreground transition-colors">
                                Sé ponente
                            </button>
                            <button className="px-8 md:px-10 py-4 md:py-5 glass-card rounded-full text-xs md:text-sm uppercase tracking-widest font-light hover:bg-white/10 transition-all">
                                Saber más
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
