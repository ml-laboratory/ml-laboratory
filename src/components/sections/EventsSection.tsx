"use client";

import { motion } from "framer-motion";
import type { SanityEvent } from "@/lib/sanity.types";
import { formatEventDate } from "@/lib/format";

type EventsSectionProps = {
    events: SanityEvent[];
};

export default function EventsSection({ events }: EventsSectionProps) {
    return (
        <section id="eventos" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 md:px-16 py-16 md:py-32">
            {/* Background particles */}
            <div className="absolute inset-0 particle-stream pointer-events-none opacity-30" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mb-12 md:mb-20"
            >
                <h2 className="text-xs uppercase tracking-[0.5em] text-foreground/40 mb-2">Próximos Eventos</h2>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif italic">Sincronización de Conocimiento</h3>
            </motion.div>

            <div className="relative min-h-[400px] md:min-h-[600px] py-6 md:py-10">
                {/* Vertical connecting line — desktop only */}
                <div className="absolute left-[25%] top-0 bottom-0 sidebar-divider hidden md:block z-0" />

                <div className="relative space-y-8 md:space-y-20 max-w-5xl mx-auto">
                    {events.length === 0 && (
                        <div className="glass-card rounded-3xl p-8 md:p-12 text-center text-foreground/60 font-light">
                            Aun no hay eventos publicados. Vuelve pronto para nuevas convocatorias.
                        </div>
                    )}
                    {events.map((event, i) => (
                        <motion.div
                            key={event._id}
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15, duration: 0.7 }}
                            className="flex flex-col md:flex-row items-start md:items-center group"
                        >
                            {/* Date - Side */}
                            <div className="md:w-1/4 md:pr-12 text-left md:text-right mb-3 md:mb-0 relative z-10 w-full">
                                <span className="text-sm font-light text-accent/60 tracking-[0.3em] block mb-1 md:mb-2">
                                    {formatEventDate(event.date)}
                                </span>
                                <span className="text-xs uppercase tracking-widest opacity-30">
                                    {event.timeLabel || "Hora por confirmar"}
                                </span>
                            </div>

                            {/* Timeline Node — desktop only */}
                            <div className="hidden md:flex relative w-4 h-4 rounded-full border border-foreground/40 items-center justify-center bg-background z-10 group-hover:scale-125 transition-transform">
                                <motion.div
                                    className="w-1.5 h-1.5 rounded-full"
                                    style={{
                                        backgroundColor: event.isPrimary ? "#38bdf8" : "rgba(226, 232, 240, 0.3)",
                                    }}
                                    animate={event.isPrimary ? { scale: [1, 1.5, 1], opacity: [0.8, 1, 0.8] } : {}}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                            </div>

                            {/* Event Card */}
                            <motion.div
                                className="flex-grow md:pl-12 relative z-10 w-full"
                                whileHover={{ y: -4 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className={`glass-card p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 hover:border-white/15 transition-all duration-500 ${!event.isPrimary ? 'opacity-70 hover:opacity-100' : ''}`}
                                    style={{ animation: event.isPrimary ? "glow-breathe 5s ease-in-out infinite" : undefined }}
                                >
                                    <div className="flex-grow">
                                        <h4 className="text-xl sm:text-2xl font-serif mb-2 md:mb-3 tracking-wide">{event.title}</h4>
                                        <p className="text-xs sm:text-sm font-light text-foreground/40 leading-relaxed mb-3 sm:hidden">{event.description}</p>
                                        <div className="flex flex-wrap items-center gap-3 md:gap-4 text-[10px] uppercase tracking-widest text-foreground/50">
                                            <span className="flex items-center gap-1">
                                                <span className="material-symbols-outlined text-sm">location_on</span>
                                                {event.location || ""}
                                            </span>
                                            <span className="px-3 py-1 border border-white/10 rounded-full">{event.tag || ""}</span>
                                        </div>
                                    </div>
                                    {event.ctaUrl ? (
                                        <a
                                            href={event.ctaUrl}
                                            className={`shrink-0 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-[10px] uppercase tracking-[0.2em] transition-all w-full sm:w-auto text-center ${event.isPrimary
                                                ? 'bg-white text-background font-bold hover:bg-foreground shadow-[0_0_20px_rgba(255,255,255,0.15)]'
                                                : 'glass-card font-light hover:bg-white/5'
                                                }`}
                                        >
                                            {event.ctaLabel || (event.isPrimary ? "Inscribirse" : "Saber más")}
                                        </a>
                                    ) : (
                                        <button
                                            className={`shrink-0 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-[10px] uppercase tracking-[0.2em] transition-all w-full sm:w-auto text-center ${event.isPrimary
                                                ? 'bg-white text-background font-bold hover:bg-foreground shadow-[0_0_20px_rgba(255,255,255,0.15)]'
                                                : 'glass-card font-light hover:bg-white/5'
                                                }`}
                                        >
                                            {event.ctaLabel || (event.isPrimary ? "Inscribirse" : "Saber más")}
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
