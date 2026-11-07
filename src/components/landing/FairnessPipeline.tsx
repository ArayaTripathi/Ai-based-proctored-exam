"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Clock, GitMerge, Users, Gauge, ShieldCheck, SlidersHorizontal } from "lucide-react";

const layers = [
    { icon: Clock, title: "Layer 1 — Intelligent Thresholds", description: "Time-aware filtering prevents momentary events from triggering flags.", color: "text-cyan-400", bgColor: "bg-cyan-500/10",
      scenarios: [
        { event: "Looks away < 2s", result: "Ignored", status: "safe" },
        { event: "Leaves frame < 5s", result: "Observation", status: "observe" },
        { event: "Sneezing / coughing", result: "Filtered", status: "safe" },
        { event: "Leaves frame > 15s", result: "Soft Flag", status: "flag" },
        { event: "Medical discomfort", result: "Human Review", status: "review" },
      ] },
    { icon: GitMerge, title: "Layer 2 — Multi-Signal Correlation", description: "A violation requires ≥2 independent signals to agree. Single-signal anomalies are observations, not flags.", color: "text-indigo-400", bgColor: "bg-indigo-500/10",
      scenarios: [
        { event: "Gaze off + Tab switch", result: "Flag", status: "flag" },
        { event: "Gaze off alone", result: "Observation", status: "safe" },
        { event: "No face + Audio spike", result: "Flag", status: "flag" },
        { event: "No face alone (brief)", result: "Observation", status: "safe" },
        { event: "Head turn + Copy event", result: "Flag", status: "flag" },
      ] },
    { icon: Users, title: "Layer 3 — Human Review Queue", description: "Every flag enters a review queue with a 10-second evidence package. Admins decide — not algorithms.", color: "text-violet-400", bgColor: "bg-violet-500/10",
      scenarios: [
        { event: "Evidence package", result: "10s clip + scores", status: "observe" },
        { event: "Admin: Dismiss", result: "Adjust baseline", status: "safe" },
        { event: "Admin: Confirm", result: "Record violation", status: "flag" },
        { event: "Admin: Warn", result: "Alert student", status: "review" },
        { event: "Feedback loop", result: "Reduces future FP", status: "safe" },
      ] },
];

const statusColors: Record<string, string> = {
    safe: "bg-emerald-500/20 text-emerald-400", observe: "bg-amber-500/20 text-amber-400",
    flag: "bg-rose-500/20 text-rose-400", review: "bg-indigo-500/20 text-indigo-400",
};

export default function FairnessPipeline() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="fairness" className="relative px-6 md:px-16 lg:px-24 xl:px-32 py-32 md:py-40">
            <div className="absolute inset-0 grid-bg opacity-40" />
            <div ref={ref} className="relative z-10 max-w-6xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
                    <span className="section-label">03 — Fairness</span>
                    <h2 className="section-heading mt-4 text-white">Three layers against<span className="gradient-text"> false positives.</span></h2>
                    <p className="text-gray-400 text-lg mt-4 max-w-2xl">Stretching isn&apos;t cheating. Sneezing isn&apos;t suspicious. Our 3-layer defense ensures only genuine, corroborated anomalies reach a human reviewer.</p>
                </motion.div>

                <motion.div className="glass-card p-6 mt-12 flex items-center gap-6 max-w-2xl"
                    initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.3 }}>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyber-cyan to-cyber-indigo flex items-center justify-center shrink-0">
                        <SlidersHorizontal className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h4 className="text-white font-semibold flex items-center gap-2">
                            <Gauge className="w-4 h-4 text-cyber-cyan" />30-Second Adaptive Calibration
                        </h4>
                        <p className="text-sm text-gray-400 mt-1">Before each exam, the system records baseline face position, lighting, and ambient noise — personalizing thresholds so different environments aren&apos;t penalized unfairly.</p>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12">
                    {layers.map((layer, i) => (
                        <motion.div key={i} className="glass-card p-6 flex flex-col"
                            initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.4 + i * 0.15 }}>
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${layer.bgColor}`}>
                                    <layer.icon className={`w-5 h-5 ${layer.color}`} />
                                </div>
                                <h3 className="text-sm font-bold text-white">{layer.title}</h3>
                            </div>
                            <p className="text-sm text-gray-400 mb-6 leading-relaxed">{layer.description}</p>
                            <div className="flex-1 flex flex-col gap-2">
                                {layer.scenarios.map((s, j) => (
                                    <div key={j} className="flex items-center justify-between py-2 px-3 rounded-lg bg-surface-2/50 border border-subtle">
                                        <span className="text-xs text-gray-300">{s.event}</span>
                                        <span className={`text-xs font-mono px-2 py-0.5 rounded-full ${statusColors[s.status]}`}>{s.result}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div className="mt-12 flex items-center justify-center gap-4 flex-wrap text-xs font-mono text-gray-500"
                    initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 1 }}>
                    <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-cyber-cyan" /><span>Raw Signal</span></div>
                    <span className="text-cyber-cyan">→</span><span>Duration Filter</span>
                    <span className="text-cyber-cyan">→</span><span>Correlation Check</span>
                    <span className="text-cyber-cyan">→</span><span>Evidence Package</span>
                    <span className="text-cyber-cyan">→</span><span className="text-cyber-cyan font-semibold">Human Decision</span>
                </motion.div>
            </div>
        </section>
    );
}
