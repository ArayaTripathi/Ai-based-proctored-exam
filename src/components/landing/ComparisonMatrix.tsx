"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, X, Minus } from "lucide-react";

const features = [
    { category: "Detection", items: [
        { name: "Face detection", proctorio: "yes", examsoft: "yes", honorlock: "yes", proctorai: "yes" },
        { name: "Gaze tracking", proctorio: "no", examsoft: "partial", honorlock: "no", proctorai: "yes", highlight: true },
        { name: "Head pose (3-axis)", proctorio: "no", examsoft: "no", honorlock: "no", proctorai: "yes", highlight: true },
        { name: "Audio intelligence", proctorio: "basic", examsoft: "basic", honorlock: "basic", proctorai: "yes" },
        { name: "Interaction monitoring", proctorio: "yes", examsoft: "yes", honorlock: "yes", proctorai: "yes" },
    ]},
    { category: "Architecture", items: [
        { name: "Multimodal fusion", proctorio: "no", examsoft: "no", honorlock: "partial", proctorai: "yes", highlight: true },
        { name: "Temporal smoothing", proctorio: "no", examsoft: "no", honorlock: "no", proctorai: "yes", highlight: true },
        { name: "Multi-signal correlation", proctorio: "no", examsoft: "no", honorlock: "no", proctorai: "yes", highlight: true },
        { name: "Bayesian scoring", proctorio: "no", examsoft: "no", honorlock: "no", proctorai: "yes", highlight: true },
    ]},
    { category: "Fairness & Privacy", items: [
        { name: "Browser-side AI", proctorio: "no", examsoft: "no", honorlock: "no", proctorai: "yes", highlight: true },
        { name: "Adaptive calibration", proctorio: "no", examsoft: "no", honorlock: "no", proctorai: "yes", highlight: true },
        { name: "Human review queue", proctorio: "partial", examsoft: "partial", honorlock: "partial", proctorai: "yes" },
        { name: "Bias mitigation", proctorio: "no", examsoft: "no", honorlock: "no", proctorai: "yes", highlight: true },
        { name: "Soft monitoring", proctorio: "no", examsoft: "no", honorlock: "no", proctorai: "yes", highlight: true },
    ]},
];

const renderIcon = (val: string, isOurs = false) => {
    if (val === "yes") return <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isOurs ? "bg-cyber-cyan/20" : "bg-emerald-500/20"}`}><Check className={`w-3.5 h-3.5 ${isOurs ? "text-cyber-cyan" : "text-emerald-400"}`} /></div>;
    if (val === "no") return <div className="w-6 h-6 rounded-full flex items-center justify-center bg-rose-500/10"><X className="w-3.5 h-3.5 text-rose-400/60" /></div>;
    return <div className="w-6 h-6 rounded-full flex items-center justify-center bg-amber-500/10"><Minus className="w-3.5 h-3.5 text-amber-400/60" /></div>;
};

export default function ComparisonMatrix() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="comparison" className="relative px-6 md:px-16 lg:px-24 xl:px-32 py-32 md:py-40">
            <div className="absolute inset-0 bg-gradient-to-b from-surface-0 via-surface-1 to-surface-0" />
            <div ref={ref} className="relative z-10 max-w-6xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
                    <span className="section-label">04 — Comparison</span>
                    <h2 className="section-heading mt-4 text-white">How we<span className="gradient-text"> stack up.</span></h2>
                    <p className="text-gray-400 text-lg mt-4 max-w-2xl">A feature-by-feature comparison with the three most widely deployed exam proctoring systems in the market.</p>
                </motion.div>

                <motion.div className="mt-16 glass-card overflow-hidden" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 }}>
                    <div className="grid grid-cols-5 gap-4 p-6 border-b border-subtle bg-surface-2/50">
                        <div className="text-sm text-gray-500 font-mono">Feature</div>
                        <div className="text-sm text-gray-400 text-center font-mono">Proctorio</div>
                        <div className="text-sm text-gray-400 text-center font-mono">ExamSoft</div>
                        <div className="text-sm text-gray-400 text-center font-mono">Honorlock</div>
                        <div className="text-sm text-cyber-cyan text-center font-mono font-semibold">ProctorAI</div>
                    </div>
                    {features.map((cat, ci) => (
                        <div key={ci}>
                            <div className="px-6 py-3 bg-surface-2/30 border-b border-subtle">
                                <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">{cat.category}</span>
                            </div>
                            {cat.items.map((item, i) => (
                                <motion.div key={i}
                                    className={`grid grid-cols-5 gap-4 px-6 py-4 border-b border-subtle/50 items-center ${item.highlight ? "bg-cyber-cyan/[0.02]" : ""}`}
                                    initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.3, delay: 0.4 + (ci * 5 + i) * 0.03 }}>
                                    <div className="text-sm text-gray-300">{item.name}</div>
                                    <div className="flex justify-center">{renderIcon(item.proctorio)}</div>
                                    <div className="flex justify-center">{renderIcon(item.examsoft)}</div>
                                    <div className="flex justify-center">{renderIcon(item.honorlock)}</div>
                                    <div className="flex justify-center">{renderIcon(item.proctorai, true)}</div>
                                </motion.div>
                            ))}
                        </div>
                    ))}
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                    {[
                        { label: "Exclusive features", value: "9", detail: "Not in any competitor" },
                        { label: "Detection channels", value: "5", detail: "vs 1-2 in competitors" },
                        { label: "FP reduction", value: "~84%", detail: "Multi-signal corroboration" },
                        { label: "Privacy score", value: "A+", detail: "Zero raw data leaves browser" },
                    ].map((stat, i) => (
                        <motion.div key={i} className="glass-card p-5 text-center"
                            initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}>
                            <p className="text-2xl font-bold gradient-text">{stat.value}</p>
                            <p className="text-xs text-gray-400 mt-1 font-medium">{stat.label}</p>
                            <p className="text-[10px] text-gray-600 mt-1">{stat.detail}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
