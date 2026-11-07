"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Github, Shield, Lock, Zap, Globe } from "lucide-react";

export default function CTASection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section className="relative px-6 md:px-16 lg:px-24 xl:px-32 py-32 md:py-40 overflow-hidden">
            <div className="absolute inset-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-cyber-cyan/5 via-cyber-indigo/5 to-transparent blur-3xl" />
            </div>
            <div ref={ref} className="relative z-10 max-w-4xl mx-auto text-center">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
                    <span className="section-label">Ready to Begin?</span>
                    <h2 className="text-4xl md:text-6xl font-bold mt-6 text-white leading-tight">
                        The future of exam integrity<br /><span className="gradient-text">starts here.</span>
                    </h2>
                    <p className="text-lg text-gray-400 mt-6 max-w-xl mx-auto">Privacy-first. Fairness-driven. Open source. ProctorAI redefines what exam proctoring can be.</p>
                </motion.div>

                <motion.div className="flex flex-wrap items-center justify-center gap-4 mt-10"
                    initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.3 }}>
                    <a href="/login" className="gradient-btn px-8 py-4 rounded-xl text-base flex items-center gap-2 relative z-10">
                        <span className="relative z-10 flex items-center gap-2">Launch ProctorAI<ArrowRight className="w-4 h-4" /></span>
                    </a>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                        className="px-8 py-4 rounded-xl text-base border border-subtle text-gray-300 hover:border-glow hover:text-white transition-all duration-300 flex items-center gap-2">
                        <Github className="w-4 h-4" />View on GitHub
                    </a>
                </motion.div>

                <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-2xl mx-auto"
                    initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.6 }}>
                    {[
                        { icon: Shield, label: "Privacy First", detail: "Browser-side AI" },
                        { icon: Lock, label: "GDPR Ready", detail: "Data stays local" },
                        { icon: Zap, label: "Real-time", detail: "<6ms inference" },
                        { icon: Globe, label: "Open Source", detail: "Fully auditable" },
                    ].map((badge, i) => (
                        <div key={i} className="flex flex-col items-center gap-2 py-4">
                            <badge.icon className="w-5 h-5 text-cyber-cyan" />
                            <span className="text-sm font-medium text-gray-300">{badge.label}</span>
                            <span className="text-[10px] text-gray-600 font-mono">{badge.detail}</span>
                        </div>
                    ))}
                </motion.div>

                <motion.div className="mt-24 pt-8 border-t border-subtle"
                    initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.8 }}>
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="w-6 h-6 rounded-md bg-gradient-to-br from-cyber-cyan to-cyber-indigo flex items-center justify-center">
                            <Shield className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-sm font-semibold text-gray-300">ProctorAI</span>
                    </div>
                    <p className="text-xs text-gray-600 font-mono">Built with Next.js • TensorFlow.js • Socket.IO • MongoDB</p>
                    <p className="text-xs text-gray-700 mt-2">© 2026 ProctorAI. Observe. Understand. Protect.</p>
                </motion.div>
            </div>
        </section>
    );
}
