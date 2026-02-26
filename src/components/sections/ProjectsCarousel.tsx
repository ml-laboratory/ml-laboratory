"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const projects = [
    {
        id: 1,
        title: "Procesamiento de Lenguaje Natural",
        category: "Archive 001 / Research",
        description: "Arquitecturas transformadoras aplicadas a la decodificación semántica de flujos de datos no estructurados en tiempo real.",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&h=600&auto=format&fit=crop",
        language: "Python",
        stars: "1.2k",
        forks_or_license: "234 Forks",
        link: "#",
    },
    {
        id: 2,
        title: "Modelado Predictivo",
        category: "Archive 002 / Modeling",
        description: "Sistemas de inferencia probabilística diseñados para la anticipación de anomalías en infraestructuras de datos de alta velocidad.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&h=600&auto=format&fit=crop",
        language: "Julia",
        stars: "856",
        forks_or_license: "MIT License",
        link: "#",
    },
];

export default function ProjectsCarousel() {
    return (
        <section className="mb-48 max-w-7xl mx-auto px-8 md:px-16 relative z-10" id="proyectos">
            <div className="mb-16">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-xs uppercase tracking-[0.5em] text-mercury-silver/40 mb-2">Cinematic Portfolio</h2>
                    <h3 className="text-4xl font-serif italic">Exploraciones Destacadas</h3>
                </motion.div>
            </div>

            <div className="flex flex-col gap-16">
                {projects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 }}
                        className="group relative w-full aspect-[21/9] min-h-[400px] overflow-hidden rounded-sm glass-card flex flex-col md:flex-row"
                    >
                        <div className="relative flex-grow overflow-hidden min-h-[300px] md:min-h-0">
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover grayscale opacity-40 group-hover:scale-105 group-hover:opacity-60 transition-all duration-1000"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-deep-ocean via-deep-ocean/80 to-transparent md:to-transparent"></div>

                            <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 max-w-xl z-10">
                                <span className="text-[10px] uppercase tracking-[0.4em] text-accent-blue mb-4 block">{project.category}</span>
                                <h4 className="text-3xl md:text-5xl font-serif mb-4 md:mb-6 leading-none">{project.title}</h4>
                                <p className="text-xs md:text-sm font-light text-mercury-silver/60 leading-relaxed max-w-md">
                                    {project.description}
                                </p>
                            </div>
                        </div>

                        <div className="w-full md:w-[280px] shrink-0 border-t md:border-t-0 md:border-l border-white/10 flex flex-col p-8 justify-between bg-black/20 backdrop-blur-md relative z-10">
                            <div className="space-y-8">
                                <div>
                                    <p className="text-[9px] uppercase tracking-widest text-white/30 mb-4">GitHub Stats</p>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[11px] font-light">Language</span>
                                            <span className="text-[11px] font-medium py-0.5 px-2 bg-white/5 rounded">{project.language}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-[11px] font-light">Stars</span>
                                            <div className="flex items-center gap-1">
                                                <span className="material-symbols-outlined text-xs text-yellow-500/80">star</span>
                                                <span className="text-[11px] font-medium">{project.stars}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-[11px] font-light">{index === 0 ? 'Forks' : 'License'}</span>
                                            <span className="text-[11px] font-medium uppercase">{index === 0 ? project.forks_or_license.replace(' Forks', '') : project.forks_or_license.replace(' License', '')}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <a href={project.link} className="mt-8 md:mt-0 group/btn flex items-center justify-between w-full p-4 border border-white/10 hover:border-white/30 transition-all rounded-sm">
                                <span className="text-[10px] uppercase tracking-[0.2em]">Ver Repositorio</span>
                                <span className="material-symbols-outlined text-sm group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                            </a>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
