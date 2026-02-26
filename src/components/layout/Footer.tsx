"use client";

import { Github, Linkedin, Twitter, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-deep-ocean py-12 border-t border-mercury-silver/10 relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-32 bg-liquid-blue/20 blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-8 md:px-16 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex flex-col items-center md:items-start gap-2">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full border border-mercury-silver/20 flex items-center justify-center bg-white/5 backdrop-blur-md">
                            <span className="material-symbols-outlined text-mercury-silver/70 text-sm">hub</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-serif italic text-base tracking-tight leading-none text-mercury-silver">ML Laboratory</span>
                            <span className="text-[8px] uppercase tracking-[0.3em] opacity-40 text-mercury-silver">DSC UTP Collective</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <a href="#" className="p-2 text-mercury-silver/60 hover:text-white hover:bg-white/10 rounded-full transition-all cursor-pointer" aria-label="GitHub">
                        <Github className="w-4 h-4" />
                    </a>
                    <a href="#" className="p-2 text-mercury-silver/60 hover:text-white hover:bg-white/10 rounded-full transition-all cursor-pointer" aria-label="LinkedIn">
                        <Linkedin className="w-4 h-4" />
                    </a>
                    <a href="#" className="p-2 text-mercury-silver/60 hover:text-white hover:bg-white/10 rounded-full transition-all cursor-pointer" aria-label="Twitter">
                        <Twitter className="w-4 h-4" />
                    </a>
                    <a href="mailto:hello@mllab.dev" className="p-2 text-mercury-silver/60 hover:text-white hover:bg-white/10 rounded-full transition-all cursor-pointer" aria-label="Email">
                        <Mail className="w-4 h-4" />
                    </a>
                </div>
            </div>

            <div className="mt-8 pt-8 border-t border-mercury-silver/10 text-center relative z-10">
                <p className="text-[10px] uppercase tracking-widest text-mercury-silver/40 font-light">
                    © {new Date().getFullYear()} ML Laboratory. Open Source Community.
                </p>
            </div>
        </footer>
    );
}
