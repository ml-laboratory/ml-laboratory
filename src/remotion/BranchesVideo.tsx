import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { BrainCircuit, Network, BarChart3, Binary, Cpu } from "lucide-react";

const branches = [
    { id: "ai", title: "Artificial Intelligence", icon: BrainCircuit, color: "#38bdf8", description: "Sintetizando inteligencia y modelos generativos" },
    { id: "ml", title: "Machine Learning", icon: Network, color: "#E2E8F0", description: "Modelado Predictivo y Arquitecturas de MLOps" },
    { id: "data", title: "Data Analytics", icon: BarChart3, color: "#7c3aed", description: "Extracción crítica y análisis profundo de datos" },
];

export const BranchesVideo: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // 100 frames per branch
    const durationPerBranch = 100;
    const activeIndex = Math.floor((frame / durationPerBranch) % branches.length);
    const branch = branches[activeIndex];

    const branchFrame = frame % durationPerBranch;

    const entrance = spring({
        frame: branchFrame,
        fps,
        config: { damping: 14, stiffness: 90 },
    });

    // Exit spring (spins out and shrinks in the last 20 frames)
    const exitProgress = Math.max(0, branchFrame - (durationPerBranch - 20));
    const exitSpring = spring({
        frame: exitProgress,
        fps,
        config: { damping: 20, stiffness: 120 },
    });

    const scale = interpolate(entrance, [0, 1], [0.5, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) *
        interpolate(exitSpring, [0, 1], [1, 0.5], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    const opacity = interpolate(entrance, [0, 1], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) *
        interpolate(exitSpring, [0, 1], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    const rotateY = interpolate(entrance, [0, 1], [-90, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) +
        interpolate(exitSpring, [0, 1], [0, 90], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    const blur = interpolate(exitSpring, [0, 1], [0, 10], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    const Icon = branch.icon;

    return (
        <AbsoluteFill style={{ fontFamily: "sans-serif" }}>

            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{
                    transform: `rotateY(${rotateY}deg) scale(${scale})`,
                    opacity,
                    filter: `blur(${blur}px)`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "20px",
                    color: "white",
                    width: 800,
                    height: 500,
                    textAlign: "center"
                }}>
                    {/* Floating effect on the icon */}
                    <div style={{
                        transform: `translateY(${Math.sin(frame / 10) * 10}px)`,
                        display: "flex"
                    }}>
                        <Icon size={160} color={branch.color} style={{ marginBottom: 40 }} />
                    </div>
                    <h1 style={{ fontSize: 64, fontFamily: "serif", margin: 0, fontWeight: 400, letterSpacing: "-1px" }}>{branch.title}</h1>
                    <p style={{ fontSize: 24, color: "#E2E8F0", opacity: 0.6, marginTop: 20, fontWeight: 300, letterSpacing: "2px", textTransform: "uppercase" }}>
                        {branch.description}
                    </p>
                </div>
            </div>
        </AbsoluteFill>
    );
}
