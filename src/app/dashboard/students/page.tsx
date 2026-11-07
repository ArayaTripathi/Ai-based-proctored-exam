"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Search, ShieldAlert, CheckCircle, Clock, ArrowLeft, Loader2, AlertTriangle, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import type { ISession, IExam } from "@/types";

interface SessionWithExam extends ISession {
    examTitle: string;
}

export default function AdminStudentsPage() {
    const router = useRouter();
    const [sessions, setSessions] = useState<SessionWithExam[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const fetchInitialData = useCallback(async () => {
        setLoading(true);
        try {
            const [sessionsRes, examsRes] = await Promise.all([
                fetch("/api/sessions").then((r) => r.json()).catch(() => ({ sessions: [] })),
                fetch("/api/exams").then((r) => r.json()).catch(() => ({ exams: [] })),
            ]);

            const examsDict: Record<string, string> = {};
            (examsRes.exams || []).forEach((e: IExam) => {
                if (e._id) examsDict[e._id] = e.title;
            });

            const enrichedSessions: SessionWithExam[] = (sessionsRes.sessions || []).map((s: ISession) => ({
                ...s,
                examTitle: examsDict[s.examId] || "Unknown Exam",
            }));

            setSessions(enrichedSessions);
        } catch (err) {
            console.error("Fetch error:", err);
            setError("Failed to load student data.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchInitialData();
    }, [fetchInitialData]);

    const filteredSessions = sessions.filter(
        (s) =>
            s.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.userEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.examTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-6xl space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <button
                        onClick={() => router.push("/dashboard")}
                        className="flex items-center gap-1 text-[10px] font-mono text-gray-600 hover:text-hacker-green mb-2 transition-colors"
                    >
                        <ArrowLeft className="w-3 h-3" /> back to overview
                    </button>
                    <h1 className="text-xl font-display font-bold text-white">Student Sessions</h1>
                    <p className="text-xs text-gray-500 mt-1">Review active and completed exam sessions.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="w-4 h-4 text-gray-600 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search students or exams..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-surface-0 border border-subtle rounded-lg pl-9 pr-4 py-2 text-xs font-mono text-white placeholder:text-gray-700 focus:border-glow focus:outline-none transition-all w-64"
                        />
                    </div>
                </div>
            </div>

            {error && (
                <div className="px-4 py-3 rounded-lg bg-[#ff3366]/10 border border-[#ff3366]/20 text-xs font-mono text-[#ff3366]">
                    ✗ {error}
                </div>
            )}

            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-6 h-6 text-hacker-green animate-spin" />
                </div>
            ) : (
                <div className="glass-card overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left font-mono text-xs">
                            <thead className="bg-surface-0 border-b border-subtle">
                                <tr>
                                    <th className="px-6 py-4 text-gray-500 font-normal">Student</th>
                                    <th className="px-6 py-4 text-gray-500 font-normal">Exam</th>
                                    <th className="px-6 py-4 text-gray-500 font-normal">Status</th>
                                    <th className="px-6 py-4 text-gray-500 font-normal">Trust Score</th>
                                    <th className="px-6 py-4 text-gray-500 font-normal">Violations</th>
                                    <th className="px-6 py-4 text-gray-500 font-normal text-right">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-subtle">
                                {filteredSessions.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-8 text-center text-gray-600">
                                            No sessions found.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredSessions.map((session, i) => (
                                        <motion.tr
                                            key={session._id || i}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            className="hover:bg-white/[0.02] transition-colors"
                                        >
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="text-white font-semibold">{session.userName || "Unknown Student"}</p>
                                                    <p className="text-[10px] text-gray-600">{session.userEmail || "No email"}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-300">
                                                {session.examTitle}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-1.5">
                                                    {session.status === "active" ? (
                                                        <Clock className="w-3.5 h-3.5 text-[#00f0ff]" />
                                                    ) : session.status === "completed" ? (
                                                        <CheckCircle className="w-3.5 h-3.5 text-hacker-green" />
                                                    ) : session.status === "terminated" ? (
                                                        <ShieldAlert className="w-3.5 h-3.5 text-[#ff3366]" />
                                                    ) : (
                                                        <AlertCircle className="w-3.5 h-3.5 text-[#ffb000]" />
                                                    )}
                                                    <span className={`capitalize ${
                                                        session.status === "active" ? "text-[#00f0ff]" :
                                                            session.status === "completed" ? "text-hacker-green" :
                                                                session.status === "terminated" ? "text-[#ff3366]" : "text-[#ffb000]"
                                                    }`}>
                                                        {session.status}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-16 h-1.5 bg-surface-0 rounded-full overflow-hidden">
                                                        <div
                                                            className={`h-full rounded-full transition-all ${
                                                                session.trustScore > 80 ? 'bg-hacker-green shadow-glow-green' :
                                                                    session.trustScore > 50 ? 'bg-[#ffb000] shadow-glow-yellow' : 'bg-[#ff3366] shadow-glow-red'
                                                            }`}
                                                            style={{ width: `${session.trustScore}%` }}
                                                        />
                                                    </div>
                                                    <span className={`font-bold ${
                                                        session.trustScore > 80 ? 'text-hacker-green' :
                                                            session.trustScore > 50 ? 'text-[#ffb000]' : 'text-[#ff3366]'
                                                    }`}>
                                                        {Math.round(session.trustScore)}%
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-1.5 text-gray-300">
                                                    <AlertTriangle className={`w-3.5 h-3.5 ${session.totalViolations > 0 ? "text-[#ffb000]" : "text-gray-600"}`} />
                                                    {session.totalViolations}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right text-gray-500 text-[10px]">
                                                {session.createdAt ? new Date(session.createdAt).toLocaleDateString() : "Just now"}
                                            </td>
                                        </motion.tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
