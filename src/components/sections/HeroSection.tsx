"use client";

import { motion } from "framer-motion";
import { Player } from "@remotion/player";
import { BranchesVideo } from "@/remotion/BranchesVideo";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-24 px-8 md:px-16" id="inicio">
            {/* Spline 3D Particles Background */}
            <div className="absolute inset-0 z-0 bg-deep-ocean pointer-events-none" />
            <div className="absolute inset-0 z-0 bg-mesh opacity-40 pointer-events-none" />

            {/* Embedded Decorative Remotion Player */}
            {isMounted && (
                <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-40 mix-blend-screen scale-150 md:scale-100 blur-[2px]">
                    <Player
                        component={BranchesVideo}
                        durationInFrames={300}
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

            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_80%)] pointer-events-none" />

            <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center text-center">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-8"
                >
                    <div className="inline-flex items-center gap-4 opacity-60">
                        <div className="w-12 h-[1px] bg-mercury-silver/40"></div>
                        <span className="font-serif italic text-lg tracking-wide">Inteligencia Colectiva</span>
                        <div className="w-12 h-[1px] bg-mercury-silver/40"></div>
                    </div>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2, type: "spring", stiffness: 100 }}
                    className="text-6xl md:text-8xl lg:text-9xl font-serif mb-8 tracking-tighter leading-[0.9]"
                >
                    Exploración <br />
                    <span className="italic font-light liquid-accent opacity-90">Orgánica</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="max-w-2xl text-lg md:text-xl font-light leading-relaxed text-mercury-silver/60 mb-12"
                >
                    Donde los datos cobran vida. Desarrollamos soluciones de IA que imitan la fluidez de la naturaleza para resolver problemas complejos.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="flex flex-col sm:flex-row items-center gap-6"
                >
                    <a
                        href="#proyectos"
                        className="px-10 py-4 glass-card rounded-full text-xs uppercase tracking-[0.2em] font-light hover:bg-white/10 hover:border-white/20 transition-all flex items-center gap-3 group"
                    >
                        Ver Proyectos
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform opacity-60" />
                    </a>
                </motion.div>

            </div>
        </section>
    );
}
