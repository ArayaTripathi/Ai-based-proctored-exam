"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Cpu, Database, Shield, Monitor, Server } from "lucide-react";

const nodes = [
    { icon: Monitor, title: "Student Browser", items: ["Webcam + Mic capture", "TensorFlow.js inference", "face-api.js detection", "Web Audio API analysis"], color: "text-cyan-400", border: "border-cyan-500/20", bg: "bg-cyan-500/5", step: "01" },
    { icon: Cpu, title: "AI Fusion Engine", items: ["5-channel signal fusion", "Temporal sliding window", "Bayesian trust scoring", "Adaptive calibration"], color: "text-indigo-400", border: "border-indigo-500/20", bg: "bg-indigo-500/5", step: "02" },
    { icon: Server, title: "Backend Pipeline", items: ["Socket.IO streaming", "Event batching (100ms)", "MongoDB persistence", "Firebase Auth"], color: "text-violet-400", border: "border-violet-500/20", bg: "bg-violet-500/5", step: "03" },
    { icon: Shield, title: "Admin Dashboard", items: ["Live monitoring grid", "Incident timeline", "Evidence review", "One-click actions"], color: "text-emerald-400", border: "border-emerald-500/20", bg: "bg-emerald-500/5", step: "04" },
];

export default function ArchitectureSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section className="relative px-6 md:px-16 lg:px-24 xl:px-32 py-32 md:py-40">
            <div className="absolute inset-0 bg-gradient-to-b from-surface-0 via-surface-1 to-surface-0" />
            <div ref={ref} className="relative z-10 max-w-6xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
                    <span className="section-label">06 — Architecture</span>
                    <h2 className="section-heading mt-4 text-white">Engineered for<span className="gradient-text"> precision.</span></h2>
                    <p className="text-gray-400 text-lg mt-4 max-w-2xl mx-auto">Privacy-first design with browser-side AI, real-time WebSocket streaming, and cloud-backed analytics.</p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {nodes.map((node, i) => (
                        <motion.div key={i} className={`glass-card p-6 ${node.bg} relative`}
                            initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}>
                            <div className="absolute top-3 right-3 text-xs font-mono text-gray-600">{node.step}</div>
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${node.bg} border ${node.border} mb-4`}>
                                <node.icon className={`w-5 h-5 ${node.color}`} />
                            </div>
                            <h3 className="text-base font-semibold text-white mb-3">{node.title}</h3>
                            <ul className="space-y-2">
                                {node.items.map((item, j) => (
                                    <li key={j} className="flex items-center gap-2 text-sm text-gray-400">
                                        <div className={`w-1 h-1 rounded-full ${node.color.replace("text-", "bg-")}`} />{item}
                                    </li>
                                ))}
                            </ul>
                            {i < 3 && (
                                <div className="hidden lg:block absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 z-10">
                                    <div className="w-6 h-6 rounded-full bg-surface-2 border border-subtle flex items-center justify-center">
                                        <span className="text-cyber-cyan text-xs">→</span>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                <motion.div className="flex flex-wrap items-center justify-center gap-3 mt-12"
                    initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 1 }}>
                    {["Next.js 15", "React 19", "TypeScript", "TensorFlow.js", "face-api.js", "Socket.IO", "MongoDB", "Firebase", "Framer Motion"].map((tech, i) => (
                        <span key={i} className="px-3 py-1.5 rounded-lg text-xs font-mono bg-surface-2 border border-subtle text-gray-400 hover:border-glow hover:text-cyber-cyan transition-all duration-300">{tech}</span>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
