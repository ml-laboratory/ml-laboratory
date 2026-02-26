"use client";

import { motion } from "framer-motion";

export default function EventsSection() {
    return (
        <section id="eventos" className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 py-32">
            <style jsx>{`
                .particle-stream {
                    background-image: radial-gradient(circle, rgba(226, 232, 240, 0.15) 1px, transparent 1px);
                    background-size: 24px 24px;
                }
                .sidebar-divider {
                    width: 1px;
                    background: linear-gradient(to bottom, transparent, rgba(226, 232, 240, 0.2), transparent);
                }
            `}</style>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-20 text-center"
            >
                <h2 className="text-xs uppercase tracking-[0.5em] text-mercury-silver/40 mb-2">Próximos Eventos</h2>
                <h3 className="text-4xl md:text-5xl font-serif italic">Sincronización de Conocimiento</h3>
            </motion.div>

            <div className="relative min-h-[600px] py-10">
                {/* Background particles */}
                <div className="absolute inset-0 particle-stream pointer-events-none opacity-40"></div>

                {/* Vertical connecting line */}
                <div className="absolute left-[25%] top-0 bottom-0 sidebar-divider hidden md:block z-0"></div>

                <div className="relative space-y-24 max-w-5xl mx-auto">
                    {/* Event 1 */}
                    <div className="flex flex-col md:flex-row items-start md:items-center group">
                        <div className="md:w-1/4 md:pr-12 text-left md:text-right mb-4 md:mb-0 relative z-10 w-full">
                            <span className="text-sm font-light text-accent-blue/60 tracking-[0.3em] block mb-2">OCT 24</span>
                            <span className="text-xs uppercase tracking-widest opacity-30">18:00 UTC</span>
                        </div>

                        {/* Timeline Node */}
                        <div className="hidden md:flex relative w-4 h-4 rounded-full border border-mercury-silver/40 items-center justify-center bg-deep-ocean z-10 group-hover:scale-125 transition-transform absolute left-[25%] -translate-x-1/2">
                            <div className="w-1.5 h-1.5 bg-mercury-silver/30 rounded-full"></div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="w-full md:w-3/4 md:pl-12 py-8 group-hover:-translate-y-2 transition-transform duration-500 relative z-10"
                        >
                            <div className="glass-card p-8 md:p-10 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-white/10 transition-colors">
                                <div>
                                    <h4 className="text-2xl font-serif italic mb-3">Hackathon: Redes Neuronales Líquidas</h4>
                                    <div className="flex flex-wrap items-center gap-4 text-[10px] uppercase tracking-widest text-mercury-silver/50">
                                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">location_on</span> Auditorio Central</span>
                                        <span className="px-3 py-1 border border-white/10 rounded-full">Inteligencia Artificial</span>
                                    </div>
                                </div>
                                <button className="shrink-0 px-8 py-3 bg-white text-deep-ocean rounded-full text-[10px] uppercase tracking-widest font-bold hover:bg-mercury-silver transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                                    Inscribirse
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Event 2 */}
                    <div className="flex flex-col md:flex-row items-start md:items-center group">
                        <div className="md:w-1/4 md:pr-12 text-left md:text-right mb-4 md:mb-0 relative z-10 w-full">
                            <span className="text-sm font-light text-accent-blue/60 tracking-[0.3em] block mb-2">NOV 02</span>
                            <span className="text-xs uppercase tracking-widest opacity-30">14:00 UTC</span>
                        </div>

                        {/* Timeline Node */}
                        <div className="hidden md:flex relative w-4 h-4 rounded-full border border-mercury-silver/40 items-center justify-center bg-deep-ocean z-10 group-hover:scale-125 transition-transform absolute left-[25%] -translate-x-1/2">
                            <div className="w-1.5 h-1.5 bg-mercury-silver/30 rounded-full"></div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="w-full md:w-3/4 md:pl-12 py-8 group-hover:-translate-y-2 transition-transform duration-500 relative z-10"
                        >
                            <div className="glass-card p-8 md:p-10 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-white/10 transition-colors opacity-70 hover:opacity-100">
                                <div>
                                    <h4 className="text-2xl font-serif italic mb-3">Data Science Summit UTP</h4>
                                    <div className="flex flex-wrap items-center gap-4 text-[10px] uppercase tracking-widest text-mercury-silver/50">
                                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">videocam</span> Modalidad Virtual</span>
                                        <span className="px-3 py-1 border border-white/10 rounded-full">Data Analytics</span>
                                    </div>
                                </div>
                                <button className="shrink-0 px-8 py-3 glass-card rounded-full text-[10px] uppercase tracking-widest font-light hover:bg-white/5 transition-all">
                                    Saber más
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
