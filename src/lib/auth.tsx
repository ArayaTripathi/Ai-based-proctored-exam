"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
    onAuthStateChanged,
    signInWithPopup,
    signOut as firebaseSignOut,
    User as FirebaseUser,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import type { UserRole } from "@/types";

interface AuthUser {
    uid: string;
    name: string;
    email: string;
    avatar: string;
    role: UserRole;
}

interface AuthContextType {
    user: AuthUser | null;
    loading: boolean;
    signInWithGoogle: () => Promise<void>;
    signInAsDemo: (role?: UserRole, name?: string) => Promise<AuthUser>;
    signOut: () => Promise<void>;
    setUserRole: (role: UserRole) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    signInWithGoogle: async () => {},
    signInAsDemo: async () => ({ uid: "", name: "", email: "", avatar: "", role: "student" }),
    signOut: async () => {},
    setUserRole: async () => {},
});

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);

    // Sync Firebase user with MongoDB
    const syncUserWithDB = async (firebaseUser: FirebaseUser): Promise<AuthUser | null> => {
        try {
            const res = await fetch("/api/auth/setup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firebaseUID: firebaseUser.uid,
                    name: firebaseUser.displayName || "User",
                    email: firebaseUser.email || "",
                    avatar: firebaseUser.photoURL || "",
                }),
            });

            if (res.ok) {
                const data = await res.json();
                return {
                    uid: firebaseUser.uid,
                    name: data.user.name,
                    email: data.user.email,
                    avatar: data.user.avatar || firebaseUser.photoURL || "",
                    role: data.user.role,
                };
            }
        } catch (error) {
            console.error("Failed to sync user with DB:", error);
        }

        // Fallback if API fails
        return {
            uid: firebaseUser.uid,
            name: firebaseUser.displayName || "User",
            email: firebaseUser.email || "",
            avatar: firebaseUser.photoURL || "",
            role: "student",
        };
    };

    useEffect(() => {
        let mounted = true;
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("proctor_demo_user");
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    if (parsed && parsed.uid) {
                        setUser(parsed);
                        setLoading(false);
                    }
                } catch {}
            }
        }

        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                const authUser = await syncUserWithDB(firebaseUser);
                if (mounted) setUser(authUser);
            } else {
                if (typeof window !== "undefined" && !localStorage.getItem("proctor_demo_user")) {
                    if (mounted) setUser(null);
                }
            }
            if (mounted) setLoading(false);
        });

        return () => {
            mounted = false;
            unsubscribe();
        };
    }, []);

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error("Google sign-in error:", error);
            throw error;
        }
    };

    const signInAsDemo = async (role: UserRole = "student", name?: string): Promise<AuthUser> => {
        const demoUser: AuthUser = {
            uid: `demo-${role}-${Date.now().toString().slice(-4)}`,
            name: name || (role === "admin" ? "Demo Admin" : "Demo Student"),
            email: role === "admin" ? "admin@proctorai.demo" : "student@proctorai.demo",
            avatar: "",
            role,
        };

        try {
            await fetch("/api/auth/setup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firebaseUID: demoUser.uid,
                    name: demoUser.name,
                    email: demoUser.email,
                    avatar: demoUser.avatar,
                    role: demoUser.role,
                }),
            });
        } catch {
            // MongoDB setup optional in demo
        }

        if (typeof window !== "undefined") {
            localStorage.setItem("proctor_demo_user", JSON.stringify(demoUser));
        }
        setUser(demoUser);
        return demoUser;
    };

    const signOut = async () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("proctor_demo_user");
        }
        try {
            await firebaseSignOut(auth);
        } catch {}
        setUser(null);
    };

    const setUserRole = async (role: UserRole) => {
        if (!user) return;
        const updated = { ...user, role };
        try {
            await fetch("/api/auth/setup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firebaseUID: user.uid,
                    name: user.name,
                    email: user.email,
                    avatar: user.avatar,
                    role,
                }),
            });
        } catch (error) {
            console.error("Failed to update role:", error);
        }
        if (typeof window !== "undefined" && localStorage.getItem("proctor_demo_user")) {
            localStorage.setItem("proctor_demo_user", JSON.stringify(updated));
        }
        setUser(updated);
    };

    return (
        <AuthContext.Provider value={{ user, loading, signInWithGoogle, signInAsDemo, signOut, setUserRole }}>
            {children}
        </AuthContext.Provider>
    );
}
