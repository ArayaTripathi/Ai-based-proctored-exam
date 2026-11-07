"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Save, ArrowLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface QuestionDraft {
    text: string;
    options: string[];
    correctAnswer: number;
    points: number;
}

export default function AdminExamsPage() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState(60);
    const [questions, setQuestions] = useState<QuestionDraft[]>([
        { text: "", options: ["", "", "", ""], correctAnswer: 0, points: 5 },
    ]);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const addQuestion = () => {
        setQuestions([...questions, { text: "", options: ["", "", "", ""], correctAnswer: 0, points: 5 }]);
    };

    const removeQuestion = (idx: number) => {
        if (questions.length <= 1) return;
        setQuestions(questions.filter((_, i) => i !== idx));
    };

    const updateQuestion = (idx: number, field: string, value: unknown) => {
        const updated = [...questions];
        Object.assign(updated[idx], { [field]: value });
        setQuestions(updated);
    };

    const updateOption = (qIdx: number, optIdx: number, value: string) => {
        const updated = [...questions];
        updated[qIdx].options[optIdx] = value;
        setQuestions(updated);
    };

    const handleSubmit = async () => {
        // Validate
        if (!title.trim()) { setError("Exam title is required."); return; }
        if (questions.some((q) => !q.text.trim())) { setError("All questions need text."); return; }
        if (questions.some((q) => q.options.some((o) => !o.trim()))) { setError("All options need text."); return; }

        setSaving(true);
        setError("");
        try {
            const res = await fetch("/api/exams", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    description,
                    duration,
                    questions: questions.map((q, i) => ({
                        id: `q${i + 1}`,
                        text: q.text,
                        options: q.options,
                        correctAnswer: q.correctAnswer,
                        points: q.points,
                    })),
                    settings: {
                        webcamRequired: true,
                        audioRequired: true,
                        tabSwitchLimit: 3,
                        autoSubmitOnCritical: false,
                        calibrationDuration: 30,
                    },
                    createdBy: "admin",
                    isActive: true,
                }),
            });

            if (res.ok) {
                setSuccess(`Exam "${title}" created and saved to database!`);
                setTitle("");
                setDescription("");
                setQuestions([{ text: "", options: ["", "", "", ""], correctAnswer: 0, points: 5 }]);
            } else {
                const data = await res.json();
                setError(data.error || "Failed to save exam.");
            }
        } catch (err) {
            setError("Network error — check your MongoDB connection.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="max-w-3xl space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <button
                        onClick={() => router.push("/dashboard")}
                        className="flex items-center gap-1 text-[10px] font-mono text-gray-600 hover:text-hacker-green mb-2 transition-colors"
                    >
                        <ArrowLeft className="w-3 h-3" /> back to dashboard
                    </button>
                    <h1 className="text-xl font-display font-bold text-white">Create Exam</h1>
                    <p className="text-xs text-gray-500 mt-1">Exam will be saved to MongoDB and visible to students.</p>
                </div>
            </div>

            {/* Success / Error */}
            {success && (
                <div className="px-4 py-3 rounded-lg bg-hacker-green/10 border border-hacker-green/20 text-xs font-mono text-hacker-green">
                    ✓ {success}
                </div>
            )}
            {error && (
                <div className="px-4 py-3 rounded-lg bg-[#ff3366]/10 border border-[#ff3366]/20 text-xs font-mono text-[#ff3366]">
                    ✗ {error}
                </div>
            )}

            {/* Exam Details */}
            <div className="glass-card p-5 space-y-4">
                <div>
                    <label className="font-mono text-[10px] text-gray-600 uppercase tracking-wider block mb-1.5">Exam Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Data Structures & Algorithms"
                        className="w-full bg-surface-0 border border-subtle rounded-lg px-3 py-2 text-sm text-white font-mono placeholder:text-gray-700 focus:border-glow focus:outline-none transition-colors"
                    />
                </div>
                <div>
                    <label className="font-mono text-[10px] text-gray-600 uppercase tracking-wider block mb-1.5">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Brief description of topics covered..."
                        rows={2}
                        className="w-full bg-surface-0 border border-subtle rounded-lg px-3 py-2 text-sm text-white font-mono placeholder:text-gray-700 focus:border-glow focus:outline-none transition-colors resize-none"
                    />
                </div>
                <div>
                    <label className="font-mono text-[10px] text-gray-600 uppercase tracking-wider block mb-1.5">Duration (minutes)</label>
                    <input
                        type="number"
                        value={duration}
                        onChange={(e) => setDuration(Number(e.target.value))}
                        min={5}
                        max={180}
                        className="w-32 bg-surface-0 border border-subtle rounded-lg px-3 py-2 text-sm text-white font-mono focus:border-glow focus:outline-none transition-colors"
                    />
                </div>
            </div>

            {/* Questions */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-gray-400">{questions.length} Questions</span>
                    <button
                        onClick={addQuestion}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-md text-[10px] font-mono text-hacker-green border border-hacker-green/20 hover:border-glow transition-all"
                    >
                        <Plus className="w-3 h-3" /> Add Question
                    </button>
                </div>

                {questions.map((q, qIdx) => (
                    <motion.div
                        key={qIdx}
                        className="glass-card p-5 space-y-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="flex items-center justify-between">
                            <span className="font-mono text-[10px] text-hacker-green">Q{qIdx + 1}</span>
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    value={q.points}
                                    onChange={(e) => updateQuestion(qIdx, "points", Number(e.target.value))}
                                    min={1}
                                    max={100}
                                    className="w-16 bg-surface-0 border border-subtle rounded px-2 py-1 text-[10px] font-mono text-white text-center focus:border-glow focus:outline-none"
                                />
                                <span className="font-mono text-[9px] text-gray-600">pts</span>
                                {questions.length > 1 && (
                                    <button onClick={() => removeQuestion(qIdx)} className="text-gray-700 hover:text-[#ff3366] transition-colors">
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                )}
                            </div>
                        </div>

                        <textarea
                            value={q.text}
                            onChange={(e) => updateQuestion(qIdx, "text", e.target.value)}
                            placeholder="Enter question text..."
                            rows={2}
                            className="w-full bg-surface-0 border border-subtle rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-700 focus:border-glow focus:outline-none transition-colors resize-none"
                        />

                        <div className="grid grid-cols-2 gap-2">
                            {q.options.map((opt, optIdx) => (
                                <div key={optIdx} className="flex items-center gap-2">
                                    <button
                                        onClick={() => updateQuestion(qIdx, "correctAnswer", optIdx)}
                                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                                            q.correctAnswer === optIdx
                                                ? "border-hacker-green bg-hacker-green/20"
                                                : "border-subtle"
                                        }`}
                                    >
                                        {q.correctAnswer === optIdx && <div className="w-2 h-2 rounded-full bg-hacker-green" />}
                                    </button>
                                    <input
                                        type="text"
                                        value={opt}
                                        onChange={(e) => updateOption(qIdx, optIdx, e.target.value)}
                                        placeholder={`Option ${String.fromCharCode(65 + optIdx)}`}
                                        className="flex-1 bg-surface-0 border border-subtle rounded px-2 py-1.5 text-xs text-white font-mono placeholder:text-gray-700 focus:border-glow focus:outline-none transition-colors"
                                    />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Submit */}
            <motion.button
                onClick={handleSubmit}
                disabled={saving}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-mono font-bold text-black bg-hacker-green hover:shadow-glow-green disabled:opacity-50 transition-all"
                whileHover={{ scale: saving ? 1 : 1.01 }}
                whileTap={{ scale: 0.99 }}
            >
                {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving to MongoDB...</> : <><Save className="w-4 h-4" /> Save Exam to Database</>}
            </motion.button>
        </div>
    );
}
