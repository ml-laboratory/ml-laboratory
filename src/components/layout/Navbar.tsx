"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const navLinks = [
    { name: "Aprender", href: "/#about" },
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
                "fixed top-0 w-full z-50 px-4 sm:px-8 md:px-16 h-20 md:h-24 flex items-center justify-between transition-all duration-500",
                isScrolled
                    ? "bg-background/60 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
                    : "bg-transparent border-b border-white/0"
            )}
        >
            <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-foreground/20 flex items-center justify-center bg-white/5 backdrop-blur-md group-hover:border-foreground/40 transition-all">
                        <span className="material-symbols-outlined text-foreground/70 text-sm md:text-base">science</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-serif italic text-base md:text-lg tracking-tight leading-none group-hover:text-white transition-colors">ML Laboratory</span>
                        <span className="text-[8px] md:text-[9px] uppercase tracking-[0.3em] opacity-40">DSC UTP Collective</span>
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
                                className="text-[11px] uppercase tracking-[0.4em] font-light hover:text-white transition-colors relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent group-hover:w-full transition-all duration-300" />
                            </Link>
                        </motion.div>
                    ))}
                    <motion.a
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7 }}
                        href="/#contact"
                        className="px-6 xl:px-8 py-2.5 glass-card rounded-full text-[10px] uppercase tracking-[0.2em] hover:bg-white/5 transition-all hover:border-white/20"
                    >
                        Acceder
                    </motion.a>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="lg:hidden flex items-center gap-4">
                    <button
                        className="p-2 text-foreground/80 hover:text-white transition-colors cursor-pointer"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
                    className="lg:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-white/5"
                >
                    <div className="flex flex-col gap-1 px-4 sm:px-8 py-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-[11px] uppercase tracking-[0.4em] font-light hover:text-white transition-colors block py-3 px-4 rounded-xl hover:bg-white/5"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <a
                            href="/#contact"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="inline-block mt-2 px-8 py-3 glass-card rounded-full text-center hover:bg-white/5 transition-all text-foreground text-[11px] uppercase tracking-[0.2em]"
                        >
                            Acceder
                        </a>
                    </div>
                </motion.div>
            )}
        </motion.nav>
    );
}
