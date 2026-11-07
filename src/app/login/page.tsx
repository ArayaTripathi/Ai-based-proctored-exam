"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import type { UserRole } from "@/types";

export default function LoginPage() {
    const { user, loading, signInWithGoogle, signInAsDemo, setUserRole, signOut } = useAuth();
    const router = useRouter();
    const [showRoleSelect, setShowRoleSelect] = useState(false);
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
    const [authError, setAuthError] = useState<string | null>(null);

    // Redirect if logged in with role
    useEffect(() => {
        if (!loading && user && user.role && !showRoleSelect) {
            router.push(user.role === "admin" ? "/dashboard" : "/exam");
        }
    }, [user, loading, router, showRoleSelect]);

    const handleGoogleSignIn = async () => {
        setIsSigningIn(true);
        setAuthError(null);
        try {
            await signInWithGoogle();
            setShowRoleSelect(true);
        } catch (err: unknown) {
            console.error("Sign-in failed:", err);
            const msg = (err as { message?: string })?.message || "";
            if (msg.includes("api-key-not-valid") || msg.includes("invalid-api-key")) {
                setAuthError("Firebase API key is not yet configured in .env.local. You can test immediately using Demo Mode below!");
            } else {
                setAuthError("Google Sign-In failed. Please use Demo Mode below or check your credentials.");
            }
        } finally {
            setIsSigningIn(false);
        }
    };

    const handleDemoSignIn = async (role: UserRole) => {
        setIsSigningIn(true);
        setAuthError(null);
        try {
            await signInAsDemo(role);
            router.push(role === "admin" ? "/dashboard" : "/exam");
        } catch (err) {
            console.error("Demo sign-in failed:", err);
        } finally {
            setIsSigningIn(false);
        }
    };

    const handleRoleSelect = async (role: UserRole) => {
        setSelectedRole(role);
        await setUserRole(role);
        router.push(role === "admin" ? "/dashboard" : "/exam");
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-surface-0 flex items-center justify-center font-mono text-xs text-gray-600">
                <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    loading...
                </motion.span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-surface-0 flex items-center justify-center relative overflow-hidden">
            {/* Dot grid bg */}
            <div className="fixed inset-0 dot-grid z-0" />

            {/* Subtle glow */}
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-hacker-green/[0.02] blur-3xl z-0" />

            {/* Scan line */}
            <div className="fixed inset-0 z-0 scan-line opacity-30" />

            {/* Content */}
            <div className="relative z-10 w-full max-w-md px-6">
                <AnimatePresence mode="wait">
                    {!showRoleSelect ? (
                        <motion.div
                            key="login"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {/* Terminal header */}
                            <div className="font-mono text-[10px] text-gray-600 mb-6 space-y-1">
                                <p><span className="text-hacker-green/50">$</span> auth --provider google</p>
                                <p><span className="text-hacker-green/50">$</span> awaiting credentials...</p>
                            </div>

                            {/* Logo */}
                            <div className="flex items-center gap-2.5 mb-8">
                                <div className="w-8 h-8 rounded-md bg-hacker-green/10 border border-hacker-green/20 flex items-center justify-center">
                                    <span className="text-hacker-green font-mono text-sm font-bold">P</span>
                                </div>
                                <span className="font-mono text-base font-semibold text-white">
                                    proctor<span className="text-hacker-green">AI</span>
                                </span>
                            </div>

                            {/* Card */}
                            <div className="glass-card p-6 space-y-6">
                                <div>
                                    <h1 className="text-xl font-display font-bold text-white mb-1">Sign in</h1>
                                    <p className="text-xs text-gray-500">
                                        Authenticate to access the proctoring system.
                                    </p>
                                </div>

                                {authError && (
                                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-xs text-red-300 font-mono leading-relaxed">
                                        <p className="font-semibold mb-1">⚠️ Auth Notice:</p>
                                        <p>{authError}</p>
                                    </div>
                                )}

                                {/* Google Button */}
                                <motion.button
                                    onClick={handleGoogleSignIn}
                                    disabled={isSigningIn}
                                    className="w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-lg bg-white/[0.04] border border-subtle hover:border-glow hover:bg-white/[0.06] transition-all duration-300 disabled:opacity-40"
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                >
                                    {isSigningIn ? (
                                        <span className="font-mono text-xs text-gray-400">authenticating...</span>
                                    ) : (
                                        <>
                                            <svg className="w-4 h-4" viewBox="0 0 24 24">
                                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                            </svg>
                                            <span className="text-sm text-gray-300">Continue with Google</span>
                                        </>
                                    )}
                                </motion.button>

                                {/* Quick Demo Mode Divider */}
                                <div className="relative flex items-center justify-center my-4">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-subtle" />
                                    </div>
                                    <span className="relative px-3 bg-surface-1 font-mono text-[10px] text-gray-500 uppercase tracking-widest">
                                        Instant Demo Access
                                    </span>
                                </div>

                                {/* Demo Buttons */}
                                <div className="grid grid-cols-2 gap-3">
                                    <motion.button
                                        onClick={() => handleDemoSignIn("student")}
                                        disabled={isSigningIn}
                                        className="flex flex-col items-center justify-center p-3 rounded-lg bg-hacker-green/[0.04] border border-hacker-green/20 hover:bg-hacker-green/[0.08] hover:border-hacker-green/40 transition-all duration-200"
                                        whileHover={{ y: -1 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <span className="font-mono text-xs font-semibold text-hacker-green">Student Demo</span>
                                        <span className="text-[10px] text-gray-500 mt-0.5">Take an exam</span>
                                    </motion.button>

                                    <motion.button
                                        onClick={() => handleDemoSignIn("admin")}
                                        disabled={isSigningIn}
                                        className="flex flex-col items-center justify-center p-3 rounded-lg bg-[#8b5cf6]/[0.04] border border-[#8b5cf6]/20 hover:bg-[#8b5cf6]/[0.08] hover:border-[#8b5cf6]/40 transition-all duration-200"
                                        whileHover={{ y: -1 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <span className="font-mono text-xs font-semibold text-[#8b5cf6]">Admin Demo</span>
                                        <span className="text-[10px] text-gray-500 mt-0.5">Proctor dashboard</span>
                                    </motion.button>
                                </div>

                                {/* Divider */}
                                <div className="divider-glow" />

                                {/* Privacy note */}
                                <p className="text-[10px] text-gray-600 font-mono text-center leading-relaxed">
                                    AI runs in-browser. No video uploaded.<br />
                                    Your webcam data never leaves your machine.
                                </p>
                            </div>

                            <a href="/" className="block mt-6 text-center font-mono text-[10px] text-gray-600 hover:text-hacker-green transition-colors">
                                ← back to home
                            </a>
                        </motion.div>
                    ) : (
                        /* ── Role Selection ── */
                        <motion.div
                            key="role"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div className="font-mono text-[10px] text-gray-600 mb-6 space-y-1">
                                <p><span className="text-hacker-green">✓</span> authenticated as {user?.email}</p>
                                <p><span className="text-hacker-green/50">$</span> select role...</p>
                                <button onClick={async () => { await signOut(); setShowRoleSelect(false); router.push("/"); }} className="text-[#ff3366] hover:underline mt-2">cancel & logout</button>
                            </div>

                            <h2 className="text-xl font-display font-bold text-white mb-2">Select your role</h2>
                            <p className="text-xs text-gray-500 mb-6">Welcome, {user?.name}.</p>

                            <div className="space-y-3">
                                {[
                                    {
                                        role: "admin" as UserRole,
                                        label: "ADMIN",
                                        desc: "Monitor exams, review incidents, manage students.",
                                        key: "ctrl+a",
                                    },
                                    {
                                        role: "student" as UserRole,
                                        label: "STUDENT",
                                        desc: "Take proctored exams with AI monitoring.",
                                        key: "ctrl+s",
                                    },
                                ].map((item, i) => (
                                    <motion.button
                                        key={item.role}
                                        onClick={() => handleRoleSelect(item.role)}
                                        disabled={selectedRole !== null}
                                        className="w-full glass-card p-5 text-left group disabled:opacity-40"
                                        initial={{ opacity: 0, x: -15 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 + i * 0.1 }}
                                        whileHover={{ x: 4 }}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-mono text-sm font-bold text-hacker-green mb-1">{item.label}</p>
                                                <p className="text-xs text-gray-500">{item.desc}</p>
                                            </div>
                                            <span className="font-mono text-[9px] text-gray-700 px-2 py-0.5 rounded border border-subtle opacity-0 group-hover:opacity-100 transition-opacity">
                                                {item.key}
                                            </span>
                                        </div>
                                        {selectedRole === item.role && (
                                            <motion.p
                                                className="font-mono text-[10px] text-hacker-green mt-2"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                            >
                                                → redirecting...
                                            </motion.p>
                                        )}
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
