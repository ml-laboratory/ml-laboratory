import React, { useMemo } from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

interface Node {
    x: number;
    y: number;
    id: number;
    size: number;
}

interface Connection {
    from: Node;
    to: Node;
    dist: number;
}

export const NeuralParticles: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();

    const numNodes = 50;

    const { nodes, connections } = useMemo(() => {
        const nds: Node[] = [];
        for (let i = 0; i < numNodes; i++) {
            const x = 60 + (Math.sin(i * 17.3 + 5) * 0.5 + 0.5) * (width - 120);
            const y = 60 + (Math.cos(i * 31.7 + 3) * 0.5 + 0.5) * (height - 120);
            const size = 2 + (i % 5 === 0 ? 2 : 0);
            nds.push({ x, y, id: i, size });
        }

        const conns: Connection[] = [];
        for (let i = 0; i < numNodes; i++) {
            for (let j = i + 1; j < numNodes; j++) {
                const dx = nds[i].x - nds[j].x;
                const dy = nds[i].y - nds[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 180) {
                    conns.push({ from: nds[i], to: nds[j], dist });
                }
            }
        }

        return { nodes: nds, connections: conns };
    }, [width, height]);

    // Global entrance
    const entrance = spring({
        frame,
        fps,
        config: { damping: 200 },
    });

    // Slow rotation
    const rotation = frame * 0.02;

    return (
        <AbsoluteFill style={{ backgroundColor: "transparent" }}>
            {/* Core ambient glow */}
            <div
                style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: `translate(-50%, -50%) scale(${1 + Math.sin(frame * 0.03) * 0.15})`,
                    width: 400,
                    height: 400,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(56, 189, 248, 0.08) 0%, transparent 70%)",
                    filter: "blur(60px)",
                    opacity: entrance,
                }}
            />

            <svg
                width={width}
                height={height}
                style={{
                    position: "absolute",
                    inset: 0,
                    transformOrigin: "50% 50%",
                    transform: `rotate(${rotation}deg)`,
                    opacity: entrance,
                }}
            >
                {/* Connections */}
                {connections.map((conn, idx) => {
                    const pulse = Math.sin(frame * 0.04 + conn.from.id * 0.2 + conn.to.id * 0.15);
                    const lineOpacity = Math.max(0.03, 0.25 * pulse);

                    // Traveling particle along connection
                    const travelProgress = ((frame * 0.5 + idx * 20) % 100) / 100;
                    const particleX = conn.from.x + (conn.to.x - conn.from.x) * travelProgress;
                    const particleY = conn.from.y + (conn.to.y - conn.from.y) * travelProgress;

                    return (
                        <g key={`conn-${idx}`}>
                            <line
                                x1={conn.from.x}
                                y1={conn.from.y}
                                x2={conn.to.x}
                                y2={conn.to.y}
                                stroke="#94a3b8"
                                strokeWidth={0.8}
                                opacity={lineOpacity}
                            />
                            {idx % 3 === 0 && (
                                <circle
                                    cx={particleX}
                                    cy={particleY}
                                    r={1.5}
                                    fill="#38bdf8"
                                    opacity={0.6 * pulse}
                                />
                            )}
                        </g>
                    );
                })}

                {/* Nodes */}
                {nodes.map((node) => {
                    const pulse = Math.sin(frame * 0.08 + node.id * 0.5) * 0.5 + 0.5;
                    const isHighlight = node.id % 7 === 0;
                    const r = node.size + pulse * 1.5;
                    const fill = isHighlight ? "#38bdf8" : "#E2E8F0";
                    const nodeOpacity = isHighlight ? 0.7 : 0.3 + pulse * 0.3;

                    return (
                        <g key={`node-${node.id}`}>
                            {isHighlight && (
                                <circle
                                    cx={node.x}
                                    cy={node.y}
                                    r={r * 3}
                                    fill={fill}
                                    opacity={0.08 * pulse}
                                />
                            )}
                            <circle
                                cx={node.x}
                                cy={node.y}
                                r={r}
                                fill={fill}
                                opacity={nodeOpacity}
                            />
                        </g>
                    );
                })}
            </svg>
        </AbsoluteFill>
    );
};
