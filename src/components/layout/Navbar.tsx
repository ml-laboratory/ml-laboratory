"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const navLinks = [
    { name: "Aprender", href: "/#about" },
    { name: "Departamentos", href: "/#departamentos" },
    { name: "Proyectos", href: "/#proyectos" },
    { name: "Comunidad", href: "/#team" },
    { name: "Blog", href: "/blog" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.2 }}
            className={cn(
                "fixed top-0 w-full z-50 px-4 sm:px-8 md:px-16 h-20 md:h-24 flex items-center justify-between transition-[background-color,border-color,box-shadow] duration-300",
                isScrolled
                    ? "bg-background/90 backdrop-blur-xl border-b border-primary/15 shadow-[0_4px_30px_rgba(76,29,149,0.12)]"
                    : "bg-transparent border-b border-transparent"
            )}
        >
            <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-primary/20 flex items-center justify-center bg-white/75 backdrop-blur-md group-hover:border-primary/60 transition-[background-color,border-color] duration-200">
                        <span className="material-symbols-outlined text-primary-strong text-sm md:text-base">science</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-serif text-base md:text-lg tracking-tight leading-none group-hover:text-primary-strong transition-colors duration-200">ML Laboratory</span>
                        <span className="text-[8px] md:text-[9px] uppercase tracking-[0.3em] text-foreground/60">DSC UTP Collective</span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center gap-8 xl:gap-10">
                    {navLinks.map((link, i) => (
                        <motion.div
                            key={link.name}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + i * 0.1 }}
                        >
                            <Link
                                href={link.href}
                                className="text-[11px] uppercase tracking-[0.4em] font-medium text-foreground/75 hover:text-primary-strong transition-colors duration-200 relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-[width] duration-200" />
                            </Link>
                        </motion.div>
                    ))}
                    <motion.a
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7 }}
                        href="/#contact"
                        className="button-primary px-6 xl:px-8 py-2.5 rounded-full text-[10px] uppercase tracking-[0.2em]"
                    >
                        Acceder
                    </motion.a>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="lg:hidden flex items-center gap-4">
                    <button
                        className="p-2 text-foreground/80 hover:text-primary-strong transition-colors duration-200 cursor-pointer"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label={isMobileMenuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
                    >
                        {isMobileMenuOpen ? <X className="w-5 h-5 md:w-6 md:h-6" /> : <Menu className="w-5 h-5 md:w-6 md:h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            {isMobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="lg:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-primary/15"
                >
                    <div className="flex flex-col gap-1 px-4 sm:px-8 py-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-[11px] uppercase tracking-[0.4em] font-medium text-foreground/75 hover:text-primary-strong transition-[background-color,color] duration-200 block py-3 px-4 rounded-xl hover:bg-surface-muted"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            href="/#contact"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="button-primary inline-block mt-2 px-8 py-3 rounded-full text-center text-[11px] uppercase tracking-[0.2em]"
                        >
                            Acceder
                        </Link>
                    </div>
                </motion.div>
            )}
        </motion.nav>
    );
}
