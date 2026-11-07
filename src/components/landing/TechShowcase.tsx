"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Eye, Scan, Headphones, MonitorSmartphone, Brain, Crosshair } from "lucide-react";

const channels = [
    { id: "face", icon: Eye, title: "Face Presence", subtitle: "Dual-Model Ensemble", description: "BlazeFace (6ms) + SSD MobileNet (99.4% accuracy) running simultaneously. Face confirmed missing only when BOTH models agree — eliminating single-model false negatives.", tech: "TensorFlow.js + face-api.js", weight: "25%", color: "from-cyan-400 to-cyan-600", bgColor: "bg-cyan-500/10", borderColor: "border-cyan-500/20", textColor: "text-cyan-400" },
    { id: "gaze", icon: Crosshair, title: "Gaze Direction", subtitle: "468-Point FaceMesh", description: "MediaPipe FaceMesh with 468 landmarks computes exact gaze angle in degrees using iris position relative to eye corners. Sub-degree precision — same tech as Apple Face ID pipeline.", tech: "TensorFlow.js FaceMesh", weight: "25%", color: "from-indigo-400 to-indigo-600", bgColor: "bg-indigo-500/10", borderColor: "border-indigo-500/20", textColor: "text-indigo-400" },
    { id: "head", icon: Scan, title: "Head Pose", subtitle: "3-Axis Euler Angles", description: "Yaw, pitch, and roll computed from 6-point solvePnP estimation. Detects head turns >30° with continuous tracking — not just binary left/right.", tech: "Landmark trigonometry", weight: "20%", color: "from-violet-400 to-violet-600", bgColor: "bg-violet-500/10", borderColor: "border-violet-500/20", textColor: "text-violet-400" },
    { id: "audio", icon: Headphones, title: "Audio Intelligence", subtitle: "Spectral Analysis + VAD", description: "FFT spectral analysis distinguishes human speech (300Hz-3kHz formants) from coughing, typing, and ambient noise. Sustained conversation patterns flagged; impulse noises filtered.", tech: "Web Audio API + TF.js", weight: "15%", color: "from-emerald-400 to-emerald-600", bgColor: "bg-emerald-500/10", borderColor: "border-emerald-500/20", textColor: "text-emerald-400" },
    { id: "interaction", icon: MonitorSmartphone, title: "Interaction Patterns", subtitle: "Browser Behavioral Analysis", description: "Tab switches, clipboard access, right-click, idle time, window blur, and keyboard pattern analysis. Detects copy-paste attempts and suspicious navigation without locking the browser.", tech: "Browser APIs", weight: "15%", color: "from-amber-400 to-amber-600", bgColor: "bg-amber-500/10", borderColor: "border-amber-500/20", textColor: "text-amber-400" },
];

export default function TechShowcase() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [activeChannel, setActiveChannel] = useState(0);
    const active = channels[activeChannel];

    return (
        <section id="technology" className="relative px-6 md:px-16 lg:px-24 xl:px-32 py-32 md:py-40">
            <div className="absolute inset-0 bg-gradient-to-b from-surface-0 via-surface-1 to-surface-0" />
            <div ref={ref} className="relative z-10 max-w-6xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
                    <span className="section-label">02 — Technology</span>
                    <h2 className="section-heading mt-4 text-white">Five channels.<span className="gradient-text"> One truth.</span></h2>
                    <p className="text-gray-400 text-lg mt-4 max-w-2xl">ProctorAI fuses 5 independent behavioral signals through a weighted fusion engine with temporal smoothing. No single signal can trigger a flag alone.</p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-16">
                    <div className="lg:col-span-5 flex flex-col gap-3">
                        {channels.map((ch, i) => (
                            <motion.button key={ch.id}
                                className={`w-full text-left p-5 rounded-xl border transition-all duration-300 ${activeChannel === i ? `${ch.bgColor} ${ch.borderColor} shadow-lg` : "border-subtle hover:border-glow bg-surface-1/50"}`}
                                onClick={() => setActiveChannel(i)}
                                initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}>
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${ch.bgColor}`}>
                                        <ch.icon className={`w-5 h-5 ${ch.textColor}`} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-semibold text-white text-sm">{ch.title}</h4>
                                            <span className={`text-xs font-mono ${ch.textColor}`}>{ch.weight}</span>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-0.5">{ch.subtitle}</p>
                                    </div>
                                </div>
                            </motion.button>
                        ))}
                    </div>

                    <div className="lg:col-span-7">
                        <motion.div key={activeChannel} className="glass-card p-8 h-full flex flex-col justify-between"
                            initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${active.color}`}>
                                        <active.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white">{active.title}</h3>
                                        <p className={`text-sm font-mono ${active.textColor}`}>{active.subtitle}</p>
                                    </div>
                                </div>
                                <p className="text-gray-300 leading-relaxed text-base">{active.description}</p>
                                <div className="mt-8 flex items-center gap-4">
                                    <div className="px-4 py-2 rounded-lg bg-surface-2 border border-subtle">
                                        <span className="text-xs text-gray-500 font-mono">TECH</span>
                                        <p className="text-sm text-gray-300 font-medium">{active.tech}</p>
                                    </div>
                                    <div className="px-4 py-2 rounded-lg bg-surface-2 border border-subtle">
                                        <span className="text-xs text-gray-500 font-mono">WEIGHT</span>
                                        <p className={`text-sm font-bold ${active.textColor}`}>{active.weight}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8 pt-6 border-t border-subtle">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-mono text-gray-500">SIGNAL STRENGTH</span>
                                    <span className={`text-xs font-mono ${active.textColor}`}>ACTIVE</span>
                                </div>
                                <div className="h-2 w-full bg-surface-3 rounded-full overflow-hidden">
                                    <motion.div className={`h-full rounded-full bg-gradient-to-r ${active.color}`}
                                        initial={{ width: "0%" }} animate={{ width: "85%" }} transition={{ duration: 1, delay: 0.3 }} />
                                </div>
                                <div className="flex items-center gap-2 mt-4">
                                    <Brain className="w-4 h-4 text-cyber-cyan" />
                                    <span className="text-xs text-gray-500">Signal Normalizer → Weighted Fusion → Bayesian Trust Score</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
