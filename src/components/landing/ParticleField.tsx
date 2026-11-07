"use client";

import { useEffect, useRef } from "react";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    opacity: number;
    color: string;
}

export default function ParticleField() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationId: number;
        let particles: Particle[] = [];
        const mouse = { x: -1000, y: -1000 };
        const colors = ["rgba(0, 212, 255, ", "rgba(99, 102, 241, ", "rgba(139, 92, 246, "];

        const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };

        const createParticles = () => {
            const count = Math.floor((canvas.width * canvas.height) / 12000);
            particles = [];
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * canvas.width, y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
                    radius: Math.random() * 1.5 + 0.5, opacity: Math.random() * 0.5 + 0.1,
                    color: colors[Math.floor(Math.random() * colors.length)],
                });
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                const dx = p.x - mouse.x, dy = p.y - mouse.y;
                const mouseDist = Math.sqrt(dx * dx + dy * dy);
                if (mouseDist < 120) {
                    const force = (120 - mouseDist) / 120;
                    p.vx += (dx / mouseDist) * force * 0.02;
                    p.vy += (dy / mouseDist) * force * 0.02;
                }
                p.x += p.vx; p.y += p.vy; p.vx *= 0.99; p.vy *= 0.99;
                if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
                ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = p.color + p.opacity + ")"; ctx.fill();
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dist = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
                    if (dist < 150) {
                        const opacity = (1 - dist / 150) * 0.15;
                        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`; ctx.lineWidth = 0.5; ctx.stroke();
                    }
                }
            }
            animationId = requestAnimationFrame(animate);
        };

        const handleMouse = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
        resize(); createParticles(); animate();
        window.addEventListener("resize", () => { resize(); createParticles(); });
        window.addEventListener("mousemove", handleMouse);
        return () => { cancelAnimationFrame(animationId); window.removeEventListener("resize", resize); window.removeEventListener("mousemove", handleMouse); };
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ opacity: 0.6 }} />;
}
