"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import type { GithubProject } from "@/lib/github-projects";

function ProjectCard({ project, index }: { project: GithubProject; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"],
    });

    // Parallax on the image
    const imageY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.8 }}
            className="group relative w-full overflow-hidden rounded-sm glass-card flex flex-col lg:flex-row"
        >
            {/* Image with parallax */}
            <div className="relative flex-grow overflow-hidden min-h-[250px] sm:min-h-[300px] lg:min-h-[350px]">
                <motion.div className="absolute inset-0" style={{ y: imageY }}>
                    <Image
                        src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&h=600&auto=format&fit=crop"
                        alt={project.title}
                        fill
                        sizes="(min-width: 1280px) 872px, (min-width: 1024px) calc(100vw - 408px), (min-width: 768px) calc(100vw - 128px), (min-width: 640px) calc(100vw - 64px), calc(100vw - 32px)"
                        className="object-cover grayscale opacity-50 group-hover:scale-105 group-hover:opacity-70 group-hover:grayscale-[0.5] transition-[filter,opacity,transform] duration-700"
                    />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent lg:via-background/60 lg:to-transparent" />

                <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 lg:bottom-12 lg:left-12 max-w-xl z-10">
                    <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-[10px] uppercase tracking-[0.4em] text-accent mb-3 sm:mb-4 block"
                    >
                        {`Archive ${String(index + 1).padStart(3, "0")} / ${project.language}`}
                    </motion.span>
                    <h4 className="text-2xl sm:text-3xl lg:text-5xl font-serif mb-3 sm:mb-4 lg:mb-6 leading-none">{project.title}</h4>
                    <p className="text-xs sm:text-sm font-light text-foreground/60 leading-relaxed max-w-md hidden sm:block">
                        {project.description}
                    </p>
                </div>
            </div>

            {/* Sidebar Stats */}
            <div className="w-full lg:w-[280px] shrink-0 border-t lg:border-t-0 lg:border-l border-primary/15 flex flex-col p-6 sm:p-8 justify-between bg-surface-muted/80 backdrop-blur-md relative z-10">
                <div className="space-y-6 sm:space-y-8">
                    <div>
                        <p className="text-[9px] uppercase tracking-widest text-foreground/60 mb-3 sm:mb-4">GitHub Stats</p>
                        <div className="space-y-3 sm:space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-[11px] font-light">Language</span>
                                <span className="text-[11px] font-medium py-0.5 px-2 bg-white rounded">{project.language}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-[11px] font-light">Stars</span>
                                <div className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-xs text-yellow-500/80">star</span>
                                    <span className="text-[11px] font-medium">{project.stars.toLocaleString()}</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-[11px] font-light">Forks</span>
                                <span className="text-[11px] font-medium uppercase">
                                    {project.forks.toLocaleString()}
                                </span>
                            </div>
                            {project.license && (
                                <div className="flex items-center justify-between">
                                    <span className="text-[11px] font-light">License</span>
                                    <span className="text-[11px] font-medium uppercase">{project.license}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <motion.a
                    href={project.htmlUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 sm:mt-8 lg:mt-0 group/btn flex items-center justify-between w-full p-3 sm:p-4 border border-primary/25 hover:border-primary transition-[border-color,transform] duration-200 rounded-sm"
                    whileHover={{ x: 4 }}
                >
                    <span className="text-[10px] uppercase tracking-[0.2em]">Ver Repositorio</span>
                    <span className="material-symbols-outlined text-sm group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                </motion.a>
            </div>
        </motion.div>
    );
}

export default function ProjectsCarousel({ projects }: { projects: GithubProject[] }) {
    return (
        <section className="mb-24 md:mb-48 max-w-7xl mx-auto px-4 sm:px-8 md:px-16 relative z-10" id="proyectos">
            <div className="mb-10 md:mb-16">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 mb-4 md:mb-6 opacity-60">
                        <div className="w-12 h-[1px] bg-foreground/30" />
                        <span className="font-serif italic text-base md:text-lg">Vanguardia Digital</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-serif mb-6 md:mb-8 tracking-tighter leading-[0.9]">
                        Proyectos <br />
                        <span className="italic font-light liquid-accent opacity-90">&amp; Flujo de Datos</span>
                    </h1>
                </motion.div>
            </div>

            <div className="mb-10 md:mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-xs uppercase tracking-[0.5em] text-foreground/40 mb-2">Cinematic Portfolio</h2>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif italic">Exploraciones Destacadas</h3>
                </motion.div>
            </div>

            <div className="flex flex-col gap-8 md:gap-16">
                {projects.length > 0 ? projects.map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} />
                )) : (
                    <div className="glass-card border border-primary/15 p-8 text-sm text-foreground/60">
                        No hay proyectos publicados todavía. Vuelve pronto para explorar el laboratorio.
                    </div>
                )}
            </div>
        </section>
    );
}
