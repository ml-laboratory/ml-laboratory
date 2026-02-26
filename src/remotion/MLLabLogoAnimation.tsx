"use client";

import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, spring, Sequence } from "remotion";

export const MLLabLogoAnimation = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Basic animations
    const scale = spring({
        frame,
        fps,
        config: { damping: 10, mass: 0.5 },
    });

    const rotate = interpolate(frame, [0, 60], [0, 360]);

    // Gradient animation
    const bgOpacity = interpolate(frame, [0, 30], [0, 1], {
        extrapolateRight: "clamp",
    });

    return (
        <AbsoluteFill className="items-center justify-center bg-transparent">
            <Sequence from={0}>
                <div style={{ opacity: bgOpacity }} className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full mix-blend-screen" />
            </Sequence>

            <Sequence from={10}>
                <div
                    style={{
                        transform: `scale(${scale}) rotate(${rotate}deg)`,
                    }}
                    className="relative w-32 h-32 flex items-center justify-center bg-black/50 border border-primary/50 rounded-3xl overflow-hidden backdrop-blur-md"
                >
                    {/* Inner elements rotating independently */}
                    <div
                        style={{ transform: `rotate(-${rotate * 2}deg)` }}
                        className="absolute inset-0 bg-gradient-to-tr from-accent/40 to-transparent opacity-50"
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-white z-10"
                        style={{ transform: `rotate(-${rotate}deg)` }}
                    >
                        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                        <path d="M7 11v4" />
                        <path d="M11 9v6" />
                        <path d="M15 13v2" />
                    </svg>
                </div>
            </Sequence>

            <Sequence from={20}>
                <div
                    style={{
                        transform: `scale(${spring({ frame: frame - 20, fps, config: { damping: 12 } })})`,
                        marginTop: '160px',
                        opacity: interpolate(frame, [20, 30], [0, 1]),
                    }}
                    className="text-2xl font-mono text-primary font-bold tracking-widest"
                >
                    ML_LAB
                </div>
            </Sequence>
        </AbsoluteFill>
    );
};
