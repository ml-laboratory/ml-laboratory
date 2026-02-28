"use client";

import { motion } from "framer-motion";
import { useState, FormEvent } from "react";

const contactInfo = [
    { icon: "alternate_email", title: "Email", value: "mllab@utp.edu.co" },
    { icon: "location_on", title: "Ubicación", value: "DSC UTP, Edificio 15" },
    { icon: "share", title: "Redes", value: "@mllab_dscutp" },
];

export default function ContactSection() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus('loading');

        const formData = new FormData(e.currentTarget);
        const data = {
            nombre: formData.get('nombre'),
            email: formData.get('email'),
            interes: formData.get('interes'),
            mensaje: formData.get('mensaje'),
        };

        try {
            const res = await fetch('/api/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error('Error');
            setStatus('success');
            (e.target as HTMLFormElement).reset();
        } catch {
            setStatus('error');
        }
    }
    return (
        <section id="contact" className="py-16 md:py-24 relative overflow-hidden z-10">
            {/* Ambient glows */}
            <div className="absolute -top-20 -left-20 w-64 md:w-96 h-64 md:h-96 bg-blue-900/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-80 md:w-[500px] h-80 md:h-[500px] bg-slate-800/10 blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-16 w-full">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10 md:mb-16"
                >
                    <span className="font-serif italic text-base md:text-xl text-foreground/60 block mb-3 md:mb-4">Colabora con el Colectivo</span>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif mb-4 md:mb-6 tracking-tight">
                        Contacto y <br />
                        <span className="italic font-light opacity-80">Colaboración</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-sm md:text-lg font-light leading-relaxed text-foreground/60 px-2">
                        Buscamos mentes apasionadas. Ya sea para dar una ponencia, presentar una investigación o proponer un proyecto conjunto, las puertas de ML Lab están abiertas.
                    </p>
                </motion.div>

                {/* Form Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="glass-card p-6 sm:p-8 md:p-12 rounded-[1.5rem] md:rounded-[2rem] relative overflow-hidden"
                >
                    <div className="absolute inset-0 liquid-glow pointer-events-none" />

                    <form className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="nombre" className="text-[10px] uppercase tracking-[0.2em] font-medium opacity-50 ml-2">Nombre Completo</label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                required
                                className="glass-input rounded-xl px-4 py-3"
                                placeholder="Isaac Newton"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-[10px] uppercase tracking-[0.2em] font-medium opacity-50 ml-2">Email Académico / Profesional</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                className="glass-input rounded-xl px-4 py-3"
                                placeholder="investigador@utp.edu.co"
                            />
                        </div>

                        <div className="flex flex-col gap-2 md:col-span-2">
                            <label htmlFor="interes" className="text-[10px] uppercase tracking-[0.2em] font-medium opacity-50 ml-2">Área de Interés</label>
                            <select
                                id="interes"
                                name="interes"
                                className="glass-input rounded-xl px-4 py-3 appearance-none bg-transparent"
                            >
                                <option className="bg-background" value="ponencia">Dar una ponencia</option>
                                <option className="bg-background" value="colaboracion">Colaboración en Investigación</option>
                                <option className="bg-background" value="visita">Visita Técnica</option>
                                <option className="bg-background" value="otro">Otros</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-2 md:col-span-2">
                            <label htmlFor="mensaje" className="text-[10px] uppercase tracking-[0.2em] font-medium opacity-50 ml-2">Propuesta o Mensaje</label>
                            <textarea
                                id="mensaje"
                                name="mensaje"
                                required
                                className="glass-input rounded-xl px-4 py-3 min-h-[120px] md:min-h-[150px] resize-none"
                                placeholder="Cuéntanos sobre tu investigación o el tema que te gustaría compartir..."
                            />
                        </div>

                        <div className="md:col-span-2 flex justify-center mt-2 md:mt-4">
                            <button
                                type="submit"
                                disabled={status === 'loading' || status === 'success'}
                                className="btn-shimmer group relative px-10 md:px-12 py-4 overflow-hidden rounded-full border border-foreground/20 bg-white/5 transition-all hover:border-foreground/50 w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span className="relative z-10 text-xs md:text-sm uppercase tracking-[0.2em] font-medium">
                                    {status === 'loading' ? 'Enviando...' : status === 'success' ? 'Enviado!' : status === 'error' ? 'Error - Intentar de nuevo' : 'Enviar Propuesta'}
                                </span>
                            </button>
                            {status === 'success' && (
                                <p className="absolute -bottom-8 text-green-400 text-sm">¡Mensaje enviado correctamente!</p>
                            )}
                            {status === 'error' && (
                                <p className="absolute -bottom-8 text-red-400 text-sm">Error al enviar. Intenta de nuevo.</p>
                            )}
                        </div>
                    </form>
                </motion.div>

                {/* Contact Info Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-12">
                    {contactInfo.map((info, i) => (
                        <motion.div
                            key={info.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            whileHover={{ y: -4, transition: { duration: 0.3 } }}
                            className="glass-card p-5 md:p-6 rounded-2xl flex flex-col items-center text-center cursor-default"
                        >
                            <span className="material-symbols-outlined mb-2 md:mb-3 opacity-40">{info.icon}</span>
                            <h3 className="text-xs uppercase tracking-widest mb-1">{info.title}</h3>
                            <p className="text-sm font-light opacity-70 italic">{info.value}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
