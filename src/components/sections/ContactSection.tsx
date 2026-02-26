"use client";

import { motion } from "framer-motion";

export default function ContactSection() {
    return (
        <section id="contact" className="py-24 relative overflow-hidden z-10">
            <div className="max-w-7xl mx-auto px-8 md:px-16 flex flex-col lg:flex-row gap-16 items-center">

                <div className="flex-1 text-center lg:text-left">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-6xl font-serif italic mb-6">
                            ¿Quieres dar una <br />
                            <span className="text-mercury-silver opacity-90">ponencia?</span>
                        </h2>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-mercury-silver/60 mb-8 max-w-lg mx-auto lg:mx-0 font-light leading-relaxed"
                    >
                        Buscamos constantemente mentes dispuestas a compartir su conocimiento con los chicos. Si tienes un caso de estudio, un research o un proyecto interesante, ¡escríbenos!
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-3 text-mercury-silver font-light bg-white/5 border border-mercury-silver/10 px-8 py-4 rounded-full"
                    >
                        <span className="material-symbols-outlined text-sm">mail</span>
                        hello@mllab.dev
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="flex-1 w-full max-w-md glass-card p-10 rounded-3xl"
                >
                    <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                        <div className="flex flex-col gap-3">
                            <label htmlFor="name" className="text-[10px] uppercase tracking-widest text-mercury-silver/60">Nombre Completo</label>
                            <input type="text" id="name" className="bg-transparent border-b border-mercury-silver/20 py-3 focus:outline-none focus:border-mercury-silver transition-colors text-mercury-silver placeholder:text-mercury-silver/20 font-light" placeholder="Ada Lovelace" />
                        </div>

                        <div className="flex flex-col gap-3">
                            <label htmlFor="email" className="text-[10px] uppercase tracking-widest text-mercury-silver/60">Correo Electrónico</label>
                            <input type="email" id="email" className="bg-transparent border-b border-mercury-silver/20 py-3 focus:outline-none focus:border-mercury-silver transition-colors text-mercury-silver placeholder:text-mercury-silver/20 font-light" placeholder="ada@example.com" />
                        </div>

                        <div className="flex flex-col gap-3 mb-4">
                            <label htmlFor="topic" className="text-[10px] uppercase tracking-widest text-mercury-silver/60">Tema de Ponencia / Interés</label>
                            <textarea id="topic" rows={3} className="bg-transparent border-b border-mercury-silver/20 py-3 focus:outline-none focus:border-mercury-silver transition-colors text-mercury-silver placeholder:text-mercury-silver/20 font-light resize-none" placeholder="Cuéntanos brevemente sobre qué te gustaría hablar..." />
                        </div>

                        <button type="submit" className="mt-2 flex items-center justify-center gap-3 w-full py-5 bg-mercury-silver hover:bg-white text-deep-ocean rounded-full text-xs uppercase tracking-[0.2em] font-bold transition-colors">
                            Enviar Mensaje
                            <span className="material-symbols-outlined text-sm">send</span>
                        </button>
                    </form>
                </motion.div>

            </div>
        </section>
    );
}
