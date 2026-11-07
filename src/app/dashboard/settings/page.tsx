"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Save, ArrowLeft, Loader2, Shield, Eye, Mic, Monitor, User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminSettingsPage() {
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState("");

    // Mock settings state
    const [settings, setSettings] = useState({
        strictnessLevel: 80,
        faceMatchThreshold: 0.85,
        audioSensitivity: 50,
        maxTabSwitches: 3,
        autoTerminate: true,
        notifyStudent: true,
        recordVideo: true,
        recordAudio: true,
    });

    const handleSave = () => {
        setSaving(true);
        setSuccess("");
        // Mock save delay
        setTimeout(() => {
            setSaving(false);
            setSuccess("Configuration successfully updated!");
            setTimeout(() => setSuccess(""), 4000);
        }, 1200);
    };

    const updateSetting = (key: keyof typeof settings, value: unknown) => {
        setSettings((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <div className="max-w-4xl space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <button
                        onClick={() => router.push("/dashboard")}
                        className="flex items-center gap-1 text-[10px] font-mono text-gray-600 hover:text-hacker-green mb-2 transition-colors"
                    >
                        <ArrowLeft className="w-3 h-3" /> back to overview
                    </button>
                    <h1 className="text-xl font-display font-bold text-white">System Settings</h1>
                    <p className="text-xs text-gray-500 mt-1">Configure global AI proctoring thresholds and system defaults.</p>
                </div>
                <motion.button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-mono font-bold text-black bg-hacker-green hover:shadow-glow-green disabled:opacity-50 transition-all"
                    whileHover={{ scale: saving ? 1 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    {saving ? "Saving..." : "Save Configuration"}
                </motion.button>
            </div>

            {success && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="px-4 py-3 rounded-lg bg-hacker-green/10 border border-hacker-green/20 text-xs font-mono text-hacker-green flex items-center gap-2"
                >
                    <Shield className="w-4 h-4" /> {success}
                </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* AI Proctoring Limits */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 space-y-6">
                    <div className="flex items-center gap-2 border-b border-subtle pb-3 mb-4">
                        <Eye className="w-4 h-4 text-hacker-green" />
                        <h2 className="text-sm font-mono font-bold text-white uppercase tracking-wider">AI Analysis Limits</h2>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between mb-1.5">
                                <label className="font-mono text-[10px] text-gray-400 uppercase tracking-wider">Global Strictness Level</label>
                                <span className="font-mono text-[10px] text-hacker-green">{settings.strictnessLevel}%</span>
                            </div>
                            <input
                                type="range"
                                min="0" max="100"
                                value={settings.strictnessLevel}
                                onChange={(e) => updateSetting("strictnessLevel", Number(e.target.value))}
                                className="w-full accent-hacker-green"
                            />
                            <p className="text-[9px] font-mono text-gray-600 mt-1">Determines how quickly trust score degrades upon violations.</p>
                        </div>

                        <div>
                            <div className="flex justify-between mb-1.5">
                                <label className="font-mono text-[10px] text-gray-400 uppercase tracking-wider">Face Match Threshold</label>
                                <span className="font-mono text-[10px] text-hacker-green">{settings.faceMatchThreshold}</span>
                            </div>
                            <input
                                type="range"
                                min="0.5" max="1.0" step="0.01"
                                value={settings.faceMatchThreshold}
                                onChange={(e) => updateSetting("faceMatchThreshold", Number(e.target.value))}
                                className="w-full accent-hacker-green"
                            />
                        </div>

                        <div>
                            <div className="flex justify-between mb-1.5">
                                <label className="font-mono text-[10px] text-gray-400 uppercase tracking-wider">Audio Sensitivity</label>
                                <span className="font-mono text-[10px] text-hacker-green">{settings.audioSensitivity}%</span>
                            </div>
                            <input
                                type="range"
                                min="0" max="100"
                                value={settings.audioSensitivity}
                                onChange={(e) => updateSetting("audioSensitivity", Number(e.target.value))}
                                className="w-full accent-hacker-green"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* System & Policy */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6 space-y-6">
                    <div className="flex items-center gap-2 border-b border-subtle pb-3 mb-4">
                        <Monitor className="w-4 h-4 text-[#ffb000]" />
                        <h2 className="text-sm font-mono font-bold text-white uppercase tracking-wider">System & Policy</h2>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="font-mono text-[10px] text-gray-400 uppercase tracking-wider block mb-1.5">Max Tab Switches</label>
                            <input
                                type="number"
                                value={settings.maxTabSwitches}
                                onChange={(e) => updateSetting("maxTabSwitches", Number(e.target.value))}
                                className="w-full bg-surface-0 border border-subtle rounded-lg px-3 py-2 text-sm text-white font-mono focus:border-glow focus:outline-none transition-colors"
                            />
                        </div>

                        <div className="space-y-3 pt-2">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className={`w-10 h-5 rounded-full transition-colors relative ${settings.autoTerminate ? 'bg-[#ff3366]' : 'bg-surface-0 border border-subtle'}`}>
                                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${settings.autoTerminate ? 'left-5' : 'left-0.5'}`} />
                                </div>
                                <input type="checkbox" className="hidden" checked={settings.autoTerminate} onChange={(e) => updateSetting("autoTerminate", e.target.checked)} />
                                <span className="font-mono text-xs text-gray-400 group-hover:text-white transition-colors">Auto-terminate on critical violation</span>
                            </label>

                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className={`w-10 h-5 rounded-full transition-colors relative ${settings.notifyStudent ? 'bg-hacker-green' : 'bg-surface-0 border border-subtle'}`}>
                                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${settings.notifyStudent ? 'left-5' : 'left-0.5'}`} />
                                </div>
                                <input type="checkbox" className="hidden" checked={settings.notifyStudent} onChange={(e) => updateSetting("notifyStudent", e.target.checked)} />
                                <span className="font-mono text-xs text-gray-400 group-hover:text-white transition-colors">Notify student on warning</span>
                            </label>
                        </div>
                    </div>
                </motion.div>
                
                {/* Media Recording */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6 space-y-6 md:col-span-2">
                    <div className="flex items-center gap-2 border-b border-subtle pb-3 mb-4">
                        <Mic className="w-4 h-4 text-[#00f0ff]" />
                        <h2 className="text-sm font-mono font-bold text-white uppercase tracking-wider">Media Recording Options</h2>
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-8">
                         <label className="flex items-center gap-3 cursor-pointer group">
                            <div className={`w-10 h-5 rounded-full transition-colors relative ${settings.recordVideo ? 'bg-[#00f0ff]' : 'bg-surface-0 border border-subtle'}`}>
                                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${settings.recordVideo ? 'left-5' : 'left-0.5'}`} />
                            </div>
                            <input type="checkbox" className="hidden" checked={settings.recordVideo} onChange={(e) => updateSetting("recordVideo", e.target.checked)} />
                            <span className="font-mono text-xs text-gray-400 group-hover:text-white transition-colors">Enforce Video Recording globally</span>
                        </label>

                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div className={`w-10 h-5 rounded-full transition-colors relative ${settings.recordAudio ? 'bg-[#00f0ff]' : 'bg-surface-0 border border-subtle'}`}>
                                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${settings.recordAudio ? 'left-5' : 'left-0.5'}`} />
                            </div>
                            <input type="checkbox" className="hidden" checked={settings.recordAudio} onChange={(e) => updateSetting("recordAudio", e.target.checked)} />
                            <span className="font-mono text-xs text-gray-400 group-hover:text-white transition-colors">Enforce Audio Recording globally</span>
                        </label>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
