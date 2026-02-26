"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const team = [
    {
        name: "Carlos Rivera",
        role: "Lead Researcher",
        description: "Especialista en modelos generativos y procesamiento de lenguaje natural.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=500&auto=format&fit=crop",
        orbPos: "-top-10 -right-10",
        orbScale: "group-hover:scale-150",
        handle: "@crivera_ml"
    },
    {
        name: "Elena Méndez",
        role: "Data Scientist",
        description: "Enfocada en el análisis de datos masivos y sistemas de recomendación éticos.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=500&auto=format&fit=crop",
        orbPos: "-bottom-10 -left-10",
        orbScale: "group-hover:scale-150",
        handle: "@elena.data"
    },
    {
        name: "Mateo Silva",
        role: "ML Engineer",
        description: "Arquitecto de despliegue y optimización de redes neuronales en tiempo real.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&h=500&auto=format&fit=crop",
        orbPos: "-top-20 left-10",
        orbScale: "group-hover:scale-125",
        handle: "@msilva_dev"
    },
    {
        name: "Sofía Vega",
        role: "Community Lead",
        description: "Gestora de la colectividad y enlace con el ecosistema global de DSC.",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&h=500&auto=format&fit=crop",
        orbPos: "-bottom-20 right-10",
        orbScale: "group-hover:scale-125",
        handle: "@sofia_vga"
    },
];

export default function TeamSection() {
    return (
        <section className="relative z-10 pt-40 pb-32 px-6" id="team">
            <style jsx>{`
                .photo-gradient-mask {
                    mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
                    -webkit-mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
                }
            `}</style>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto text-center mb-40"
            >
                <div className="inline-block mb-6">
                    <span className="font-serif italic text-lg text-mercury-silver/50 tracking-wide">— Nuestra Esencia</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-serif mb-10 leading-[1.1]">
                    Sintetizando el futuro de la <br />
                    <span className="italic font-light opacity-80">Inteligencia Colectiva</span>
                </h1>
                <p className="text-lg md:text-xl font-light text-mercury-silver/60 max-w-2xl mx-auto leading-relaxed">
                    Conoce a la mesa directiva y líderes de investigación detrás de los desarrollos más innovadores del laboratorio.
                </p>
            </motion.div>

            <div className="max-w-[1400px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
                    {team.map((member, i) => (
                        <motion.div
                            key={member.name}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15, duration: 0.8 }}
                            className="group relative glass-card rounded-3xl overflow-hidden hover:border-mercury-silver/20 transition-all duration-500 flex flex-col h-full"
                        >
                            <div className={`liquid-orb ${member.orbPos} ${member.orbScale} transition-transform duration-700`}></div>
                            <div className="relative h-64 w-full overflow-hidden shrink-0">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 photo-gradient-mask"
                                />
                            </div>

                            <h3 className="text-xl font-serif italic mb-1 mt-6 px-6 relative z-10">{member.name}</h3>
                            <p className="text-[11px] uppercase tracking-[0.2em] text-mercury-silver/40 px-6 mb-4 relative z-10">{member.role}</p>
                            <p className="text-sm text-mercury-silver/60 font-light leading-relaxed mb-8 px-6 relative z-10">
                                {member.description}
                            </p>

                            <div className="mt-auto px-6 pb-6 pt-4 border-t border-white/5 flex items-center justify-between relative z-10">
                                <a href="#" className="flex items-center gap-2 text-[10px] tracking-widest text-mercury-silver/30 hover:text-mercury-silver transition-colors">
                                    LinkedIn <span className="material-symbols-outlined text-[10px]">arrow_outward</span>
                                </a>
                                <a href="#" className="flex items-center gap-2 text-[10px] tracking-widest text-accent-blue/80 hover:text-accent-blue transition-colors">
                                    <span className="material-symbols-outlined text-sm">alternate_email</span>
                                    {member.handle}
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="mt-32 max-w-5xl mx-auto px-4"
            >
                <div className="glass-card rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-t from-accent-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                    <div className="liquid-orb top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-20 group-hover:scale-150 transition-transform duration-1000"></div>

                    <div className="relative z-10">
                        <span className="text-[10px] uppercase tracking-[0.4em] text-accent-blue mb-4 block">Convocatoria Abierta</span>
                        <h2 className="text-4xl md:text-5xl font-serif italic mb-6">Únete al Colectivo</h2>
                        <p className="max-w-xl mx-auto text-mercury-silver/60 font-light leading-relaxed mb-10">
                            Buscamos constantemente mentes curiosas para resolver desafíos conjuntos de datos. Si eres de la UTP, tu lugar está aquí.
                        </p>
                        <button className="px-10 py-5 glass-card rounded-full text-sm uppercase tracking-widest font-light hover:bg-white/10 transition-all">
                            Saber más
                        </button>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
