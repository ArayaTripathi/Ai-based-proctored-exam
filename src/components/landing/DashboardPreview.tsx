"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Activity, Users, AlertTriangle, Clock, TrendingUp, Eye } from "lucide-react";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    useEffect(() => {
        if (!isInView) return;
        let start = 0;
        const step = target / 120;
        const timer = setInterval(() => { start += step; if (start >= target) { setCount(target); clearInterval(timer); } else setCount(Math.floor(start)); }, 1000 / 60);
        return () => clearInterval(timer);
    }, [isInView, target]);
    return <span ref={ref}>{count}{suffix}</span>;
}

const mockStudents = [
    { name: "Arjun Mehta", trust: 96, status: "Normal", avatar: "AM" },
    { name: "Sarah Chen", trust: 88, status: "Observation", avatar: "SC" },
    { name: "Priya Sharma", trust: 94, status: "Normal", avatar: "PS" },
    { name: "James Wilson", trust: 72, status: "Flagged", avatar: "JW" },
    { name: "Aisha Patel", trust: 91, status: "Normal", avatar: "AP" },
    { name: "Lucas Rivera", trust: 85, status: "Observation", avatar: "LR" },
];

const trustColor = (t: number) => t >= 90 ? "text-emerald-400" : t >= 75 ? "text-amber-400" : "text-rose-400";
const trustBg = (t: number) => t >= 90 ? "bg-emerald-500" : t >= 75 ? "bg-amber-500" : "bg-rose-500";
const statusBadge = (s: string) => s === "Normal" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : s === "Observation" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" : "bg-rose-500/10 text-rose-400 border-rose-500/20";

export default function DashboardPreview() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section className="relative px-6 md:px-16 lg:px-24 xl:px-32 py-32 md:py-40">
            <div className="absolute inset-0 grid-bg-dense opacity-30" />
            <div ref={ref} className="relative z-10 max-w-6xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
                    <span className="section-label">05 — Dashboard</span>
                    <h2 className="section-heading mt-4 text-white">Real-time<span className="gradient-text"> command center.</span></h2>
                    <p className="text-gray-400 text-lg mt-4 max-w-2xl mx-auto">Monitor every student simultaneously. Live trust scores, incident timelines, and one-click evidence review — all updating in real-time via WebSocket.</p>
                </motion.div>

                <motion.div className="glass-card overflow-hidden scan-line"
                    initial={{ opacity: 0, y: 30, scale: 0.98 }} animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}} transition={{ duration: 0.8, delay: 0.3 }}>
                    <div className="flex items-center justify-between px-6 py-4 border-b border-subtle bg-surface-2/50">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2"><div className="status-dot live" /><span className="text-sm font-mono text-gray-400">LIVE SESSION</span></div>
                            <span className="text-xs text-gray-600 font-mono">Mathematics Final — Section A</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-mono text-gray-500"><Clock className="w-3.5 h-3.5" />01:42:17 remaining</div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 border-b border-subtle">
                        {[
                            { icon: Users, label: "Active Students", value: 48, color: "text-cyber-cyan" },
                            { icon: Eye, label: "Being Monitored", value: 48, color: "text-indigo-400" },
                            { icon: AlertTriangle, label: "Flagged", value: 3, color: "text-amber-400" },
                            { icon: TrendingUp, label: "Avg Trust Score", value: 91, suffix: "%", color: "text-emerald-400" },
                        ].map((stat, i) => (
                            <div key={i} className="bg-surface-2/50 rounded-lg p-4 border border-subtle">
                                <div className="flex items-center gap-2 mb-2"><stat.icon className={`w-4 h-4 ${stat.color}`} /><span className="text-xs text-gray-500">{stat.label}</span></div>
                                <p className={`text-2xl font-bold ${stat.color}`}><AnimatedCounter target={stat.value} suffix={stat.suffix || ""} /></p>
                            </div>
                        ))}
                    </div>

                    <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-mono text-gray-400">STUDENT MONITORING GRID</span>
                            <span className="text-xs font-mono text-gray-600">Updated 2s ago</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {mockStudents.map((student, i) => (
                                <motion.div key={i} className="bg-surface-2/70 rounded-lg p-4 border border-subtle hover:border-glow transition-all duration-300 cursor-pointer group"
                                    initial={{ opacity: 0, y: 10 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.3, delay: 0.5 + i * 0.08 }}>
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyber-cyan/20 to-cyber-indigo/20 flex items-center justify-center text-xs font-mono text-gray-300">{student.avatar}</div>
                                            <div>
                                                <p className="text-sm font-medium text-white">{student.name}</p>
                                                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${statusBadge(student.status)}`}>{student.status}</span>
                                            </div>
                                        </div>
                                        <Activity className="w-4 h-4 text-gray-600 group-hover:text-cyber-cyan transition-colors" />
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-xs text-gray-500 font-mono">Trust</span>
                                            <span className={`text-sm font-bold ${trustColor(student.trust)}`}>{student.trust}%</span>
                                        </div>
                                        <div className="h-1.5 bg-surface-3 rounded-full overflow-hidden">
                                            <motion.div className={`h-full rounded-full ${trustBg(student.trust)}`}
                                                initial={{ width: "0%" }} animate={isInView ? { width: `${student.trust}%` } : {}} transition={{ duration: 1, delay: 0.8 + i * 0.1 }} />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
