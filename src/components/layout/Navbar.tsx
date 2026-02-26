"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility for merging tailwind classes safely
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const navLinks = [
    { name: "Proyectos", href: "#proyectos" },
    { name: "Eventos", href: "#eventos" },
    { name: "Investigación", href: "#" },
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
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={cn(
                "fixed top-0 w-full z-50 px-8 md:px-16 h-24 flex items-center justify-between transition-all duration-300",
                isScrolled
                    ? "bg-deep-ocean/50 backdrop-blur-md border-b border-white/5 shadow-lg"
                    : "bg-transparent border-b border-white/0"
            )}
        >
            <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-full border border-mercury-silver/20 flex items-center justify-center bg-white/5 backdrop-blur-md">
                        <span className="material-symbols-outlined text-mercury-silver/70">hub</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-serif italic text-lg tracking-tight leading-none group-hover:text-white transition-colors">ML Laboratory</span>
                        <span className="text-[9px] uppercase tracking-[0.3em] opacity-40">DSC UTP Collective</span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center gap-10 text-[11px] uppercase tracking-[0.4em] font-light">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="hover:text-white transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <a
                        href="#contact"
                        className="px-8 py-2.5 glass-card rounded-full text-[10px] uppercase tracking-[0.2em] hover:bg-white/5 transition-all"
                    >
                        Unirse al Lab
                    </a>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="lg:hidden flex items-center gap-4">
                    <button
                        className="p-2 text-foreground/80 hover:text-primary transition-colors cursor-pointer"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            {isMobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="lg:hidden px-8 pt-4 pb-6 mt-4 bg-deep-ocean/95 backdrop-blur-xl border-b border-white/5"
                >
                    <div className="flex flex-col gap-6 text-[11px] uppercase tracking-[0.4em] font-light">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="hover:text-white transition-colors block"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <a
                            href="#contact"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="inline-block mt-2 px-8 py-3 glass-card rounded-full text-center hover:bg-white/5 transition-all text-mercury-silver"
                        >
                            Unirse al Lab
                        </a>
                    </div>
                </motion.div>
            )}
        </motion.nav>
    );
}
