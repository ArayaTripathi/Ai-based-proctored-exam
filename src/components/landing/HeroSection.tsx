"use client";

import { motion } from "framer-motion";
import { Shield, ArrowDown } from "lucide-react";

export default function HeroSection() {
    return (
        <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 xl:px-32 pt-24 pb-16 overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-cyber-cyan/5 via-cyber-indigo/5 to-transparent blur-3xl" />
                <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-cyber-violet/5 blur-3xl animate-breathe" />
            </div>

            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 glass">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyber-cyan to-cyber-indigo flex items-center justify-center">
                        <Shield className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-semibold tracking-tight text-white">ProctorAI</span>
                </div>
                <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
                    <a href="#problem" className="hover:text-cyber-cyan transition-colors duration-300">Problem</a>
                    <a href="#technology" className="hover:text-cyber-cyan transition-colors duration-300">Technology</a>
                    <a href="#fairness" className="hover:text-cyber-cyan transition-colors duration-300">Fairness</a>
                    <a href="#comparison" className="hover:text-cyber-cyan transition-colors duration-300">Compare</a>
                </div>
                <a href="/login" className="gradient-btn px-5 py-2 rounded-lg text-sm relative z-10">
                    <span className="relative z-10">Launch App</span>
                </a>
            </nav>

            {/* Hero Content */}
            <div className="relative z-10 max-w-5xl">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="status-dot live" />
                        <span className="section-label">AI-Powered Exam Surveillance</span>
                    </div>
                </motion.div>

                <motion.h1
                    className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-8"
                    initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <span className="text-white">Observe.</span><br />
                    <span className="gradient-text">Understand.</span><br />
                    <span className="text-white">Protect.</span>
                </motion.h1>

                <motion.p
                    className="text-lg md:text-xl text-gray-400 max-w-xl leading-relaxed mt-8"
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
                >
                    A silent intelligence layer that watches, interprets, and safeguards
                    the integrity of every examination — powered by 5-channel multimodal
                    behavioral analysis running entirely in your browser.
                </motion.p>

                <motion.div
                    className="flex flex-wrap items-center gap-4 mt-10"
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }}
                >
                    <a href="/login" className="gradient-btn px-8 py-3.5 rounded-xl text-base relative z-10">
                        <span className="relative z-10">Get Started</span>
                    </a>
                    <a href="#technology" className="px-8 py-3.5 rounded-xl text-base border border-subtle text-gray-300 hover:border-glow hover:text-white transition-all duration-300">
                        See How It Works
                    </a>
                </motion.div>

                <motion.div
                    className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-subtle max-w-lg"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1 }}
                >
                    <div>
                        <p className="text-2xl md:text-3xl font-bold gradient-text">99.7%</p>
                        <p className="text-xs text-gray-500 mt-1 font-mono">Detection Accuracy</p>
                    </div>
                    <div>
                        <p className="text-2xl md:text-3xl font-bold gradient-text">&lt;6ms</p>
                        <p className="text-xs text-gray-500 mt-1 font-mono">Inference Latency</p>
                    </div>
                    <div>
                        <p className="text-2xl md:text-3xl font-bold gradient-text">5</p>
                        <p className="text-xs text-gray-500 mt-1 font-mono">Signal Channels</p>
                    </div>
                </motion.div>
            </div>

            {/* Floating Orb */}
            <motion.div
                className="absolute right-[10%] top-1/2 -translate-y-1/2 hidden lg:block"
                animate={{ y: [0, -20, 10, 0], rotate: [0, 2, -2, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
                <div className="relative w-72 h-72">
                    <div className="absolute inset-0 rounded-full border border-cyber-cyan/20 animate-spin-slow" />
                    <div className="absolute inset-4 rounded-full border border-cyber-indigo/15" style={{ animationDirection: "reverse", animationDuration: "12s" }} />
                    <div className="absolute inset-8 rounded-full border border-cyber-violet/10 animate-spin-slow" />
                    <div className="absolute inset-16 rounded-full bg-gradient-to-br from-cyber-cyan/20 via-cyber-indigo/30 to-cyber-violet/20 backdrop-blur-xl shadow-glow-lg" />
                    <div className="absolute inset-20 rounded-full bg-gradient-to-br from-cyber-cyan/10 to-cyber-indigo/10 animate-pulse-glow" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-6 h-6 rounded-full bg-cyber-cyan/60 shadow-glow-cyan animate-breathe" />
                    </div>
                    {[0, 1, 2, 3, 4].map((i) => (
                        <div key={i} className="absolute inset-0 flex items-center justify-center"
                            style={{ animation: `orbit ${15 + i * 3}s linear infinite`, animationDelay: `${i * -3}s` }}>
                            <div className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: i % 2 === 0 ? "rgba(0, 212, 255, 0.6)" : "rgba(99, 102, 241, 0.6)",
                                    boxShadow: `0 0 10px ${i % 2 === 0 ? "rgba(0, 212, 255, 0.3)" : "rgba(99, 102, 241, 0.3)"}` }} />
                        </div>
                    ))}
                </div>
            </motion.div>

            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500"
                animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
            >
                <span className="text-xs font-mono">Scroll to explore</span>
                <ArrowDown className="w-4 h-4" />
            </motion.div>
        </section>
    );
}
