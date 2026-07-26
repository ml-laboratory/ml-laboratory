"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const floatingNodes = [
    { icon: "adjust", top: "15%", left: "15%", scale: 1.25, delay: 0, size: "text-4xl" },
    { icon: "memory", top: "25%", left: "75%", scale: 1.5, delay: 1, size: "text-5xl" },
    { icon: "analytics", top: "70%", left: "20%", scale: 1.1, delay: 2, size: "text-3xl" },
    { icon: "account_tree", top: "65%", left: "80%", scale: 1.25, delay: 3, size: "text-6xl" },
    { icon: "bubble_chart", top: "10%", left: "50%", scale: 1.25, delay: 0.5, size: "text-4xl" },
    { icon: "schema", top: "85%", left: "45%", scale: 1.5, delay: 1.5, size: "text-5xl" },
];

const connectionLines = [
    { width: "600px", top: "20%", left: "15%", rotate: "45deg", delay: 0 },
    { width: "800px", top: "45%", left: "30%", rotate: "-12deg", delay: 1.5 },
    { width: "500px", top: "75%", left: "25%", rotate: "110deg", delay: 0.5 },
    { width: "700px", top: "15%", left: "45%", rotate: "3deg", delay: 2 },
    { width: "400px", top: "60%", left: "70%", rotate: "160deg", delay: 1 },
];

export default function AnimatedBackground() {
    const prefersReducedMotion = useReducedMotion();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 767px)");
        const update = () => setIsMobile(mediaQuery.matches);
        update();
        mediaQuery.addEventListener("change", update);
        return () => mediaQuery.removeEventListener("change", update);
    }, []);

    const allowMotion = !prefersReducedMotion && !isMobile;

    return (
        <>
            {/* Mesh gradient background */}
            <div className="fixed inset-0 z-0 bg-mesh opacity-60 pointer-events-none" />

            {/* Neural network dot grid */}
            <div className="fixed inset-0 z-0 neural-network-bg opacity-40 pointer-events-none" />

            {/* Floating nodes with icons */}
            {allowMotion && (
                <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden hidden md:block">
                    {floatingNodes.map((node, i) => (
                        <motion.div
                            key={i}
                            className="node-glow absolute"
                            style={{
                                top: node.top,
                                left: node.left,
                                transform: `scale(${node.scale})`,
                            }}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: [0.2, 0.5, 0.2], scale: [node.scale * 0.9, node.scale, node.scale * 0.9] }}
                            transition={{
                                duration: 6 + i * 0.8,
                                repeat: Infinity,
                                delay: node.delay,
                                ease: "easeInOut",
                            }}
                        >
                            <span className={`material-symbols-outlined ${node.size} text-foreground/40`}>
                                {node.icon}
                            </span>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Connection lines */}
            {allowMotion && (
                <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden hidden lg:block">
                    {connectionLines.map((line, i) => (
                        <motion.div
                            key={i}
                            className="connection-line"
                            style={{
                                width: line.width,
                                top: line.top,
                                left: line.left,
                                transform: `rotate(${line.rotate})`,
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0.15, 0.4, 0.15] }}
                            transition={{
                                duration: 5 + i * 0.5,
                                repeat: Infinity,
                                delay: line.delay,
                                ease: "easeInOut",
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Central ambient glow */}
            {allowMotion ? (
                <motion.div
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] md:w-[1200px] md:h-[1200px] bg-secondary/15 blur-[200px] rounded-full z-0 pointer-events-none"
                    animate={{ scale: [1, 1.05, 1], opacity: [0.6, 0.8, 0.6] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
            ) : (
                <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] md:w-[1200px] md:h-[1200px] bg-secondary/15 blur-[200px] rounded-full z-0 pointer-events-none" />
            )}
        </>
    );
}
