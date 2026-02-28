"use client";

import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { motion } from "framer-motion";

const navLinks = [
    { label: "Investigación", href: "#" },
    { label: "Dataset Hub", href: "#" },
    { label: "Laboratorio", href: "#" },
];

const communityLinks = [
    { label: "GitHub", href: "#" },
    { label: "Discord", href: "#" },
    { label: "LinkedIn", href: "#" },
];

export default function Footer() {
    return (
        <footer className="relative z-10 border-t border-white/5 pt-12 md:pt-24 pb-8 md:pb-12 bg-background/80 backdrop-blur-xl">
            {/* Subtle glow */}
            <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-32 bg-liquid-blue/20 blur-[100px] pointer-events-none"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 relative z-10">
                {/* 4-Column Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 mb-12 md:mb-24">
                    {/* Logo + Description */}
                    <div className="col-span-1 sm:col-span-2">
                        <div className="flex items-center gap-2 mb-6 md:mb-8">
                            <span className="material-symbols-outlined text-foreground/60">water_drop</span>
                            <span className="font-serif italic text-xl md:text-2xl tracking-tight">ML Laboratory</span>
                        </div>
                        <p className="text-xs md:text-sm font-light text-foreground/40 leading-relaxed max-w-sm">
                            Investigación avanzada y desarrollo de soluciones de Inteligencia Artificial para la comunidad universitaria y el ecosistema tecnológico global.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h5 className="text-[10px] uppercase tracking-[0.4em] text-foreground/30 mb-4 md:mb-8">Navegación</h5>
                        <ul className="space-y-3 md:space-y-4 text-xs font-light">
                            {navLinks.map((link) => (
                                <li key={link.label}>
                                    <a href={link.href} className="hover:text-white transition-colors text-foreground/60">{link.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Community */}
                    <div>
                        <h5 className="text-[10px] uppercase tracking-[0.4em] text-foreground/30 mb-4 md:mb-8">Comunidad</h5>
                        <ul className="space-y-3 md:space-y-4 text-xs font-light">
                            {communityLinks.map((link) => (
                                <li key={link.label}>
                                    <a href={link.href} className="hover:text-white transition-colors text-foreground/60">{link.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col sm:flex-row justify-between items-center pt-8 md:pt-12 border-t border-white/5 gap-4 md:gap-6">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/20">
                        © {new Date().getFullYear()} ML Laboratory • DSC UTP • Powered by Intelligence
                    </p>

                    <div className="flex items-center gap-4 md:gap-6">
                        {/* Overlapping Avatars */}
                        <div className="flex -space-x-3">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className={`w-7 h-7 md:w-8 md:h-8 rounded-full border-2 border-background bg-slate-${600 + i * 100} flex items-center justify-center`}>
                                    <span className="material-symbols-outlined text-[10px] text-foreground/40">person</span>
                                </div>
                            ))}
                        </div>
                        <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/30">
                            12 Investigadores activos
                        </span>
                    </div>
                </div>

                {/* Social Icons */}
                <div className="flex justify-center gap-3 mt-6 md:mt-8">
                    {[
                        { icon: <Github className="w-3.5 h-3.5" />, label: "GitHub" },
                        { icon: <Linkedin className="w-3.5 h-3.5" />, label: "LinkedIn" },
                        { icon: <Twitter className="w-3.5 h-3.5" />, label: "Twitter" },
                        { icon: <Mail className="w-3.5 h-3.5" />, label: "Email" },
                    ].map((s) => (
                        <a
                            key={s.label}
                            href="#"
                            className="p-2 text-foreground/40 hover:text-white hover:bg-white/10 rounded-full transition-all"
                            aria-label={s.label}
                        >
                            {s.icon}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}
