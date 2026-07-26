"use client";

import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { motion } from "framer-motion";

const navLinks = [
    { label: "Inicio", href: "/" },
    { label: "Proyectos", href: "/#proyectos" },
    { label: "Blog", href: "/blog" },
];

const communityLinks = [
    { label: "GitHub", href: "https://github.com/Akicoders", external: true },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/nolverwilliamhuamanminga/", external: true },
    { label: "Discord", href: "https://discord.gg/", external: true },
];

export default function Footer() {
    return (
        <footer className="relative z-10 border-t border-primary/15 pt-12 md:pt-24 pb-8 md:pb-12 bg-surface-muted/70 backdrop-blur-xl">
            {/* Subtle glow */}
            <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-32 bg-secondary/25 blur-[100px] pointer-events-none"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 relative z-10">
                {/* 4-Column Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 mb-12 md:mb-24">
                    {/* Logo + Description */}
                    <div className="col-span-1 sm:col-span-2">
                        <div className="flex items-center gap-2 mb-6 md:mb-8">
                            <span className="material-symbols-outlined text-primary-strong">science</span>
                            <span className="font-serif text-xl md:text-2xl tracking-tight">ML Laboratory</span>
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
                                    <a href={link.href} className="hover:text-primary-strong transition-colors duration-200 text-foreground/70">{link.label}</a>
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
                                    <a
                                        href={link.href}
                                        {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                        className="hover:text-primary-strong transition-colors duration-200 text-foreground/70"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col sm:flex-row justify-between items-center pt-8 md:pt-12 border-t border-primary/15 gap-4 md:gap-6">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/55">
                        © {new Date().getFullYear()} ML Laboratory • DSC UTP • Powered by Intelligence
                    </p>

                    <div className="flex items-center gap-4 md:gap-6">
                        {/* Overlapping Avatars */}
                        <div className="flex -space-x-3">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="w-7 h-7 md:w-8 md:h-8 rounded-full border-2 border-background bg-secondary flex items-center justify-center">
                                    <span className="material-symbols-outlined text-[10px] text-primary-strong">person</span>
                                </div>
                            ))}
                        </div>
                        <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/60">
                            12 Investigadores activos
                        </span>
                    </div>
                </div>

                {/* Social Icons */}
                <div className="flex justify-center gap-3 mt-6 md:mt-8">
                    {[
                        { icon: <Github className="w-3.5 h-3.5" />, label: "GitHub de ML Laboratory DSC UTP", href: "https://github.com/Akicoders" },
                        { icon: <Linkedin className="w-3.5 h-3.5" />, label: "LinkedIn de ML Laboratory DSC UTP", href: "https://www.linkedin.com/in/nolverwilliamhuamanminga/" },
                        { icon: <Twitter className="w-3.5 h-3.5" />, label: "Twitter de ML Laboratory DSC UTP", href: "https://twitter.com/" },
                        { icon: <Mail className="w-3.5 h-3.5" />, label: "Contactar a ML Laboratory por Email", href: "mailto:contacto@dsc-utp.site" },
                    ].map((s) => (
                        <a
                            key={s.label}
                            href={s.href}
                            target={s.href.startsWith("http") ? "_blank" : undefined}
                            rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="p-2 text-foreground/60 hover:text-primary-strong hover:bg-white rounded-full transition-[background-color,color] duration-200"
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
