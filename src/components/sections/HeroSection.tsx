"use client";

import { motion, useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";
import { NeuralParticles } from "@/remotion/NeuralParticles";
import { useSyncExternalStore } from "react";
import { ArrowRight } from "lucide-react";

const RemotionPlayer = dynamic(() => import("@remotion/player").then((mod) => mod.Player), {
    ssr: false,
});

function subscribeToDesktopMediaQuery(onStoreChange: () => void) {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    mediaQuery.addEventListener("change", onStoreChange);
    return () => mediaQuery.removeEventListener("change", onStoreChange);
}

function getDesktopMediaQuerySnapshot() {
    return window.matchMedia("(min-width: 768px)").matches;
}

function getServerDesktopMediaQuerySnapshot() {
    return false;
}

export default function HeroSection() {
    const isDesktop = useSyncExternalStore(
        subscribeToDesktopMediaQuery,
        getDesktopMediaQuerySnapshot,
        getServerDesktopMediaQuerySnapshot
    );
    const prefersReducedMotion = useReducedMotion();

    const allowMotion = !prefersReducedMotion && isDesktop;
    const preHeaderMotion = allowMotion
        ? ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, ease: "easeOut" as const } } as const)
        : {};
    const titleMotion = allowMotion
        ? ({ initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 1, delay: 0.2, type: "spring" as const, stiffness: 100 } } as const)
        : {};
    const subtitleMotion = allowMotion
        ? ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: 0.4 } } as const)
        : {};
    const bodyMotion = allowMotion
        ? ({ initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 1, delay: 0.6 } } as const)
        : {};
    const ctaMotion = allowMotion
        ? ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: 0.8 } } as const)
        : {};

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 md:pt-32 pb-16 md:pb-24 px-4 sm:px-8 md:px-16" id="inicio">
            <div className="absolute inset-0 z-0 bg-surface-muted pointer-events-none" />
            <div className="absolute inset-0 z-0 bg-mesh opacity-70 pointer-events-none" />

            {/* Remotion Neural Particles Background */}
            {allowMotion && (
                <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-20 md:opacity-30">
                    <RemotionPlayer
                        component={NeuralParticles}
                        durationInFrames={600}
                        fps={30}
                        compositionWidth={1080}
                        compositionHeight={1080}
                        style={{
                            width: '100%',
                            height: '100%',
                            maxWidth: '1200px',
                            maxHeight: '1200px',
                        }}
                        autoPlay
                        loop
                    />
                </div>
            )}

            {/* Radial vignette overlay */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(250,245,255,0.9)_80%)] pointer-events-none" />

            {/* Main Content */}
            <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center">

                {/* Pre-header tag */}
                <motion.div {...preHeaderMotion} className="mb-4 md:mb-6">
                    <span className="font-sans text-xs sm:text-sm uppercase tracking-[0.4em] text-foreground/40">
                        DSC UTP Presenta
                    </span>
                </motion.div>

                {/* Main title */}
                <motion.h1
                    {...titleMotion}
                    className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif leading-tight mb-4 md:mb-6 tracking-tight"
                >
                    Bienvenidos a <br />
                    <span className="italic font-light opacity-90">ML Laboratory</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.h2
                    {...subtitleMotion}
                    className="text-lg sm:text-xl md:text-3xl font-serif italic text-foreground/70 mb-6 md:mb-10"
                >
                    Donde la Inteligencia Colectiva cobra vida
                </motion.h2>

                {/* Description */}
                <motion.p
                    {...bodyMotion}
                    className="max-w-2xl text-sm sm:text-base md:text-xl font-light leading-relaxed text-foreground/60 mb-8 md:mb-12 px-2"
                >
                    No solo teorizamos sobre el futuro de la IA;{" "}
                    <span className="text-foreground font-medium">aquí lo construimos</span>.
                    Únete a la comunidad dedicada a materializar el aprendizaje automático en soluciones reales.
                </motion.p>

                {/* CTAs */}
                <motion.div {...ctaMotion} className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
                    <a
                        href="#contact"
                        className="button-primary btn-shimmer group relative px-8 sm:px-12 py-4 sm:py-6 overflow-hidden rounded-full"
                    >
                        <span className="relative z-10 text-xs sm:text-sm uppercase tracking-[0.2em] font-medium">
                            DA UNA PONENCIA
                        </span>
                    </a>
                    <a
                        href="#proyectos"
                        className="text-xs sm:text-sm uppercase tracking-[0.2em] font-medium text-primary-strong hover:text-foreground transition-colors duration-200 flex items-center gap-2"
                    >
                        EXPLORAR PROYECTOS
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    </a>
                </motion.div>
            </div>

            {/* Floating Glass Cards — Desktop only */}
            {allowMotion && (
                <motion.div
                    initial={{ opacity: 0, x: -60, rotate: -5 }}
                    animate={{ opacity: 1, x: 0, rotate: -2 }}
                    transition={{ duration: 1.2, delay: 1.2, type: "spring", stiffness: 60 }}
                    className="absolute bottom-16 left-8 hidden xl:block z-10"
                >
                    <div
                        className="glass-card p-7 rounded-2xl w-80 transform -rotate-2 hover:rotate-0 transition-transform duration-500 cursor-default"
                        style={{ animation: "float-slow 8s ease-in-out infinite" }}
                    >
                        <div className="flex items-center gap-3 mb-4 opacity-50">
                            <span className="material-symbols-outlined text-lg">psychology</span>
                            <span className="text-[10px] uppercase tracking-widest font-bold">Lo que aprenderás</span>
                        </div>
                        <h3 className="font-serif italic text-xl mb-3">Deep Learning &amp; Redes Neuronales</h3>
                        <p className="text-sm text-foreground/50 leading-relaxed">
                            Domina arquitecturas complejas, desde Transformers hasta CNNs, aplicadas a problemas del mundo real.
                        </p>
                    </div>
                </motion.div>
            )}

            {allowMotion && (
                <motion.div
                    initial={{ opacity: 0, x: 60, rotate: 5 }}
                    animate={{ opacity: 1, x: 0, rotate: 3 }}
                    transition={{ duration: 1.2, delay: 1.4, type: "spring", stiffness: 60 }}
                    className="absolute top-32 right-8 hidden xl:block z-10"
                >
                    <div
                        className="glass-card p-7 rounded-2xl w-80 transform rotate-3 hover:rotate-0 transition-transform duration-500 cursor-default"
                        style={{ animation: "float-slow 10s ease-in-out infinite 2s" }}
                    >
                        <div className="flex items-center gap-3 mb-4 opacity-50">
                            <span className="material-symbols-outlined text-lg">monitoring</span>
                            <span className="text-[10px] uppercase tracking-widest font-bold">Lo que aprenderás</span>
                        </div>
                        <h3 className="font-serif italic text-xl mb-3">Ciencia de Datos Aplicada</h3>
                        <p className="text-sm text-foreground/50 leading-relaxed">
                            Convierte datos crudos en conocimiento accionable mediante ingeniería de variables y modelos predictivos robustos.
                        </p>
                    </div>
                </motion.div>
            )}
        </section>
    );
}
