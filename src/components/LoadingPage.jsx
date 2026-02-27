import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import jarvisSfx from '../assets/sounds/jarvis-loading.mp3?url';
import '../styles/LoadingPage.css';

// ─── PCB BACKGROUND LOGIC ───
function buildDensePCB(W, H) {
    const isMobile = W < 768;
    const GRID = isMobile ? 15 : 20;
    const traces = [];
    const nodes = [];
    const chips = [];

    const cpuSize = isMobile ? 120 : 180;
    chips.push({ x: W / 2 - cpuSize / 2, y: H / 2 - cpuSize / 2, w: cpuSize, h: cpuSize, type: 'cpu' });

    function addPCBTrace(sx, sy, steps) {
        let x = Math.round(sx / GRID) * GRID;
        let y = Math.round(sy / GRID) * GRID;
        const path = [{ x, y }];
        let lastDir = Math.random() > 0.5 ? 'H' : 'V';

        for (let i = 0; i < steps; i++) {
            const dist = (1 + Math.floor(Math.random() * 4)) * GRID;
            if (lastDir === 'H') {
                x += (Math.random() > 0.5 ? 1 : -1) * dist;
                lastDir = 'V';
            } else {
                y += (Math.random() > 0.5 ? 1 : -1) * dist;
                lastDir = 'H';
            }
            x = Math.max(0, Math.min(W, x));
            y = Math.max(0, Math.min(H, y));
            path.push({ x, y });
            if (Math.random() > 0.6) nodes.push({ x, y, r: 1.5 + Math.random() * 2 });
        }
        traces.push({ path, opacity: 0.1 + Math.random() * 0.4 });
    }

    const count = isMobile ? 80 : 200;
    for (let i = 0; i < count; i++) {
        addPCBTrace(Math.random() * W, Math.random() * H, 3 + Math.floor(Math.random() * 5));
    }

    return { traces, nodes, chips };
}

const LoadingPage = ({ onComplete }) => {
    const navigate = useNavigate();
    const location = useLocation();

    // Read sound preference passed from IntroPage
    const withSound = location.state?.withSound ?? true;

    const [progress, setProgress] = useState(0);
    const audioRef = useRef(null);
    const canvasRef = useRef(null);
    const circuitRef = useRef(null);

    useEffect(() => {
        // Play audio only if the user chose YES
        if (withSound) {
            audioRef.current = new Audio(jarvisSfx);
            audioRef.current.volume = 0.65;
            audioRef.current.loop = true;
            audioRef.current.play().catch(e => console.warn('Audio blocked:', e));
        }

        const interval = setInterval(() => {
            setProgress(p => {
                if (p >= 100) {
                    clearInterval(interval);
                    if (audioRef.current) {
                        audioRef.current.loop = false;
                        audioRef.current.pause();
                        audioRef.current.currentTime = 0;
                    }
                    // Navigate to home after loading completes
                    const done = onComplete || (() => navigate('/home'));
                    setTimeout(done, 1000);
                    return 100;
                }
                return Math.min(p + (Math.floor(Math.random() * 4) + 1), 100);
            });
        }, 55);

        // Canvas Setup
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            circuitRef.current = buildDensePCB(canvas.width, canvas.height);
        };
        resize();
        window.addEventListener('resize', resize);

        let frame = 0;
        const draw = () => {
            if (!circuitRef.current) return;
            const { traces, nodes, chips } = circuitRef.current;
            ctx.fillStyle = '#000810';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            traces.forEach(t => {
                ctx.beginPath();
                ctx.moveTo(t.path[0].x, t.path[0].y);
                for (let i = 1; i < t.path.length; i++) ctx.lineTo(t.path[i].x, t.path[i].y);
                ctx.strokeStyle = `rgba(0, 180, 255, ${t.opacity})`;
                ctx.lineWidth = 1.2;
                ctx.stroke();
            });

            nodes.forEach(n => {
                const pulse = 0.5 + 0.5 * Math.sin(frame * 0.05 + n.x);
                ctx.beginPath();
                ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 242, 255, ${0.3 + 0.4 * pulse})`;
                ctx.fill();
            });

            chips.forEach(c => {
                ctx.fillStyle = '#0a1428';
                ctx.strokeStyle = '#00f2ff';
                ctx.lineWidth = 2;
                ctx.fillRect(c.x, c.y, c.w, c.h);
                ctx.strokeRect(c.x, c.y, c.w, c.h);
            });

            frame++;
            requestAnimationFrame(draw);
        };
        draw();

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', resize);
            if (audioRef.current) audioRef.current.pause();
        };
    }, []);

    return (
        <div className="loading-screen circuit-hud">
            <canvas ref={canvasRef} className="pcb-background-canvas" />
            <div className="hud-grid-overlay" />

            <div className="hud-content-wrapper">
                <div className="hud-center-target">
                    <svg viewBox="0 0 500 500" className="target-svg">
                        <motion.circle
                            cx="250" cy="250" r="220" className="hud-ring dash-thick"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.circle
                            cx="250" cy="250" r="180" className="hud-ring segment-ring"
                            strokeDasharray="90 30"
                            animate={{ rotate: -360 }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        />
                        <rect x="230" y="230" width="40" height="40" className="center-bracket" />
                    </svg>

                    <div className="progress-display">
                        <div className="progress-value">
                            <span className="num">{progress}</span>
                            <span className="unit">%</span>
                        </div>
                        <div className="loading-tag">INITIALIZING_CORE</div>
                    </div>
                </div>
            </div>

            <div className="scan-line-horizontal" />
        </div>
    );
};

export default LoadingPage;
