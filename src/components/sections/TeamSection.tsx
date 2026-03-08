"use client";

import { motion, useMotionValue, useTransform, useReducedMotion } from "framer-motion";
import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";

import nolverImg from "@/assets/Novel-William-Huaman-Minga.jpeg";
import davidImg from "@/assets/David-Huaqui-Tito.jpeg";
import paulImg from "@/assets/Jose-Paul-Campos-Terrones.jpeg";

interface TeamMember {
    name: string;
    role: string;
    description: string;
    image: StaticImageData;
    github: string;
    linkedin: string;
}

const team: TeamMember[] = [
    {
        name: "Nolver William Huaman Minga",
        role: "Leader",
        description: "Líder principal del laboratorio, impulsor de la visión estratégica y la cultura de innovación en IA.",
        image: nolverImg,
        github: "https://github.com/Nolver1",
        linkedin: "https://www.linkedin.com/in/nolverwilliamhuamanminga/",
    },
    {
        name: "David Maximo Huaqui Tito",
        role: "Co-Leader",
        description: "Co-líder dedicado al desarrollo técnico y la arquitectura de soluciones de machine learning.",
        image: davidImg,
        github: "https://github.com/D4vidXDev02",
        linkedin: "https://www.linkedin.com/in/davidhuaqui/",
    },
    {
        name: "Jose Paul Campos Terrones",
        role: "Co-Leader",
        description: "Co-líder enfocado en el desarrollo de productos y la gestión de proyectos de ciencia de datos.",
        image: paulImg,
        github: "https://github.com/Akicoders",
        linkedin: "https://www.linkedin.com/in/paulct-dev/",
    },
];

function TiltCard({ children, className, disabled }: { children: React.ReactNode; className?: string; disabled?: boolean }) {
    const ref = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [4, -4]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-4, 4]);

    function handleMouseMove(e: React.MouseEvent) {
        if (disabled || !ref.current) return;
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

    if (disabled) {
        return <div className={className}>{children}</div>;
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
    const prefersReducedMotion = useReducedMotion();
    const [isMobile, setIsMobile] = useState(true);

    useEffect(() => {
        const mq = window.matchMedia("(min-width: 768px)");
        const update = () => setIsMobile(!mq.matches);
        update();
        mq.addEventListener("change", update);
        return () => mq.removeEventListener("change", update);
    }, []);

    const disableHeavyEffects = isMobile || !!prefersReducedMotion;

    return (
        <section className="relative z-10 pt-20 md:pt-40 pb-16 md:pb-32 px-4 sm:px-6" id="team">
            {/* About intro */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
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

                {/* Team Grid */}
                <div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 px-2 md:px-4"
                    style={disableHeavyEffects ? undefined : { perspective: "1200px" }}
                >
                    {team.map((member, i) => (
                        <motion.div
                            key={member.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: disableHeavyEffects ? 0 : i * 0.1, duration: 0.5 }}
                        >
                            <TiltCard
                                disabled={disableHeavyEffects}
                                className="group relative glass-card rounded-3xl overflow-hidden hover:border-foreground/20 transition-all duration-500 flex flex-col h-full cursor-default"
                            >
                                {/* Animated orb — desktop only */}
                                {!disableHeavyEffects && (
                                    <div
                                        className="liquid-orb -top-10 -right-10 group-hover:scale-150 transition-transform duration-700"
                                        style={{ animationDelay: `${i * 0.5}s` }}
                                    />
                                )}

                                {/* Photo — fixed square aspect ratio matching 200x200 source */}
                                <div className="relative w-full aspect-square max-h-[200px] md:max-h-[240px] overflow-hidden shrink-0 bg-foreground/5">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        quality={95}
                                        className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                                        placeholder="blur"
                                        priority={i === 0}
                                    />
                                </div>

                                {/* Info */}
                                <div className="p-5 md:p-8 pt-4 flex-grow relative z-10">
                                    <h3 className="text-lg md:text-2xl font-serif italic mb-1">{member.name}</h3>
                                    <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/40 mb-3 md:mb-4 font-medium">{member.role}</p>
                                    <p className="text-xs md:text-sm text-foreground/60 font-light leading-relaxed mb-4 md:mb-6">
                                        {member.description}
                                    </p>
                                </div>

                                {/* Footer with social */}
                                <div className="mt-auto px-5 md:px-6 pb-5 md:pb-6 pt-4 border-t border-white/5 flex items-center gap-3 relative z-10">
                                    <a
                                        href={member.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1.5 text-[10px] tracking-widest text-foreground/30 hover:text-foreground transition-colors"
                                        title="GitHub"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23A11.51 11.51 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/></svg>
                                        GitHub
                                    </a>
                                    <span className="text-foreground/10">·</span>
                                    <a
                                        href={member.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1.5 text-[10px] tracking-widest text-foreground/30 hover:text-foreground transition-colors"
                                        title="LinkedIn"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                                        LinkedIn
                                    </a>
                                </div>
                            </TiltCard>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* CTA Box */}
            <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mt-20 md:mt-32 max-w-5xl mx-auto px-4"
            >
                <div className="glass-card rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-12 lg:p-20 text-center relative overflow-hidden group">
                    {!disableHeavyEffects && (
                        <>
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-t from-accent/5 to-transparent"
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 1 }}
                                transition={{ duration: 0.8 }}
                            />
                            <div
                                className="liquid-orb top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 !w-96 !h-96 opacity-20 group-hover:scale-150 transition-transform duration-1000"
                            />
                        </>
                    )}

                    <div className="relative z-10">
                        <span className="text-[10px] uppercase tracking-[0.4em] text-accent mb-4 block">Convocatoria Abierta</span>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif italic mb-4 md:mb-6">¿Listo para contribuir?</h2>
                        <p className="max-w-lg mx-auto text-foreground/60 font-light leading-relaxed mb-6 md:mb-10 text-sm md:text-base px-2">
                            Buscamos mentes curiosas apasionadas por los datos. Sé parte del DSC: únete a nuestra próxima sesión o presenta tu investigación.
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
