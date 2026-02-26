"use client";

import { useVideoConfig, useCurrentFrame, AbsoluteFill } from "remotion";
import { useMemo } from "react";

function DataNetwork() {
    const frame = useCurrentFrame();
    const { width, height } = useVideoConfig();

    const numNodes = 70;

    // Create fixed nodes
    const { nodes, connections } = useMemo(() => {
        const nds = [];
        for (let i = 0; i < numNodes; i++) {
            // Pseudo-random deterministic placement
            const x = 50 + (Math.sin(i * 13.5) * 0.5 + 0.5) * (width - 100);
            const y = 50 + (Math.cos(i * 47.3) * 0.5 + 0.5) * (height - 100);
            nds.push({ x, y, id: i });
        }

        const conns = [];
        for (let i = 0; i < numNodes; i++) {
            for (let j = i + 1; j < numNodes; j++) {
                const dx = nds[i].x - nds[j].x;
                const dy = nds[i].y - nds[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 160) {
                    conns.push({ from: nds[i], to: nds[j], dist });
                }
            }
        }

        return { nodes: nds, connections: conns };
    }, [width, height]);

    // Global rotation effect
    const rotation = frame * 0.05;

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {/* Core glow */}
            <div
                className="absolute w-64 h-64 bg-primary/20 rounded-full blur-[80px]"
                style={{ transform: `scale(${1 + Math.sin(frame * 0.05) * 0.1})` }}
            />

            <svg
                width={width}
                height={height}
                className="absolute inset-0"
                style={{
                    transformOrigin: '50% 50%',
                    transform: `rotate(${rotation}deg)`
                }}
            >
                {connections.map((conn, idx) => {
                    const pulse = Math.sin((frame * 0.05) + (conn.from.id * 0.1) + (conn.to.id * 0.1));
                    const opacity = Math.max(0.05, 0.4 * pulse);
                    return (
                        <line
                            key={`conn-${idx}`}
                            x1={conn.from.x}
                            y1={conn.from.y}
                            x2={conn.to.x}
                            y2={conn.to.y}
                            stroke="#a78bfa"
                            strokeWidth={1}
                            opacity={opacity}
                        />
                    );
                })}

                {nodes.map((node, i) => {
                    const pulse = Math.sin((frame * 0.1) + i) * 0.5 + 0.5; // 0 to 1
                    const isHighlight = i % 5 === 0;
                    const r = isHighlight ? 4 + pulse * 2 : 2.5 + pulse;
                    const fill = isHighlight ? "#22c55e" : "#7c3aed";

                    return (
                        <g key={`node-${i}`}>
                            {isHighlight && (
                                <circle
                                    cx={node.x}
                                    cy={node.y}
                                    r={r * 2.5}
                                    fill={fill}
                                    opacity={0.3 * pulse}
                                />
                            )}
                            <circle
                                cx={node.x}
                                cy={node.y}
                                r={r}
                                fill={fill}
                            />
                        </g>
                    );
                })}
            </svg>
        </div>
    );
}

export const MLLab3DLogo = () => {
    return (
        <AbsoluteFill className="bg-transparent text-foreground flex items-center justify-center">
            <DataNetwork />
        </AbsoluteFill>
    );
};
