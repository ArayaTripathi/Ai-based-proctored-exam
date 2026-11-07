"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { AlertTriangle, UserX, Ban, TrendingDown } from "lucide-react";

const stats = [
    { icon: AlertTriangle, value: "73%", label: "of students report anxiety from current proctoring", color: "text-amber-400" },
    { icon: UserX, value: "41%", label: "false-positive rate documented in Proctorio audits", color: "text-rose-400" },
    { icon: Ban, value: "Zero", label: "existing tools use multi-signal corroboration", color: "text-red-400" },
    { icon: TrendingDown, value: "84%", label: "of flagged incidents are actually innocent behavior", color: "text-orange-400" },
];

const problems = [
    { title: "Single-Signal Detection", description: "Current tools flag students based on ONE suspicious signal — a glance away, a noise, a face not detected. No context. No correlation.", tag: "Architecture Flaw" },
    { title: "Hard Browser Lockdowns", description: "Locking down the entire browser creates a hostile test environment. Students can't even adjust their window, causing panic and frustration.", tag: "UX Problem" },
    { title: "Cloud-Dependent Processing", description: "Raw video streams sent to remote servers. Privacy violations waiting to happen. Latency issues. Single point of failure.", tag: "Privacy Risk" },
    { title: "Bias in Face Detection", description: "Documented failures with darker skin tones, poor lighting, and non-standard webcam positions. Entire demographics unfairly penalized.", tag: "Fairness Issue" },
];

export default function ProblemSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="problem" className="relative px-6 md:px-16 lg:px-24 xl:px-32 py-32 md:py-40">
            <div className="absolute inset-0 grid-bg opacity-50" />
            <div ref={ref} className="relative z-10 max-w-6xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
                    <span className="section-label">01 — The Problem</span>
                    <h2 className="section-heading mt-4 text-white">
                        Current proctoring is<span className="gradient-text"> broken.</span>
                    </h2>
                    <p className="text-gray-400 text-lg mt-4 max-w-2xl">
                        Existing systems rely on single-signal detection, hard lockdowns, and biased AI — creating a hostile environment that hurts students more than it helps institutions.
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16">
                    {stats.map((stat, i) => (
                        <motion.div key={i} className="glass-card p-6 text-center"
                            initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}>
                            <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                            <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                            <p className="text-xs text-gray-500 mt-2 leading-relaxed">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                    {problems.map((problem, i) => (
                        <motion.div key={i} className="glass-card p-8 relative overflow-hidden group"
                            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.4 + i * 0.15 }}>
                            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="inline-block px-3 py-1 rounded-full text-xs font-mono bg-rose-500/10 text-rose-400 border border-rose-500/20 mb-4">{problem.tag}</div>
                            <h3 className="text-xl font-semibold text-white mb-3">{problem.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{problem.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
