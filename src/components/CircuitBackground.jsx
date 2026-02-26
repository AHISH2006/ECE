import React, { useEffect, useRef } from 'react';


const TRACE_COLOR = 'rgba(0, 180, 255, 0.55)';
const GLOW_COLOR = 'rgba(0, 220, 255, 0.18)';
const NODE_COLOR = 'rgba(0, 229, 255, 0.9)';
const PULSE_COLOR = '#00e5ff';
const CHIP_FILL = 'rgba(10, 20, 50, 0.85)';
const CHIP_BORDER = 'rgba(0, 180, 255, 0.6)';
const BG_COLOR = '#020a18';

// Generate a grid of random circuit paths
function buildCircuit(W, H) {
    const GRID = 40; // cell size
    const cols = Math.ceil(W / GRID);
    const rows = Math.ceil(H / GRID);

    const traces = [];
    const nodes = [];
    const chips = [];

    // Random seed of paths
    const visited = new Set();
    const rng = (n) => Math.floor(Math.random() * n);

    function key(x, y) { return `${x},${y}`; }

    // Build horizontal + vertical traces with L-bends
    for (let i = 0; i < 80; i++) {
        let x = rng(cols) * GRID;
        let y = rng(rows) * GRID;

        const path = [{ x, y }];
        const steps = 4 + rng(8);

        for (let s = 0; s < steps; s++) {
            const horizontal = Math.random() > 0.5;
            const dist = (2 + rng(5)) * GRID;
            const dir = Math.random() > 0.5 ? 1 : -1;

            if (horizontal) {
                const nx = Math.max(0, Math.min(cols * GRID, x + dist * dir));
                path.push({ x: nx, y });
                x = nx;
            } else {
                const ny = Math.max(0, Math.min(rows * GRID, y + dist * dir));
                path.push({ x, y: ny });
                y = ny;
            }

            // Occasionally place a node at corners
            if (Math.random() > 0.6 && !visited.has(key(x, y))) {
                nodes.push({ x, y, r: 2 + Math.random() * 3, phase: Math.random() * Math.PI * 2 });
                visited.add(key(x, y));
            }
        }

        traces.push({ path, pulses: [] });
    }

    // Place a few "chips" (IC rectangles)
    for (let i = 0; i < 8; i++) {
        const cw = (4 + rng(5)) * GRID;
        const ch = (3 + rng(4)) * GRID;
        const cx = rng(cols - 6) * GRID;
        const cy = rng(rows - 5) * GRID;
        chips.push({ x: cx, y: cy, w: cw, h: ch });
    }

    // Seed initial pulses on each trace
    traces.forEach((t) => {
        const numPulses = 1 + Math.floor(Math.random() * 2);
        for (let p = 0; p < numPulses; p++) {
            t.pulses.push({
                progress: Math.random(), // 0–1 along path
                speed: 0.0008 + Math.random() * 0.0014,
                size: 3 + Math.random() * 5,
            });
        }
    });

    return { traces, nodes, chips };
}

// Get point along a multi-segment path at progress 0–1
function getPointOnPath(path, progress) {
    if (path.length < 2) return path[0];

    // Compute total length
    let totalLen = 0;
    const segs = [];
    for (let i = 1; i < path.length; i++) {
        const dx = path[i].x - path[i - 1].x;
        const dy = path[i].y - path[i - 1].y;
        const len = Math.sqrt(dx * dx + dy * dy);
        segs.push(len);
        totalLen += len;
    }

    if (totalLen === 0) return path[0];

    let target = progress * totalLen;
    for (let i = 0; i < segs.length; i++) {
        if (target <= segs[i]) {
            const t = segs[i] > 0 ? target / segs[i] : 0;
            return {
                x: path[i].x + (path[i + 1].x - path[i].x) * t,
                y: path[i].y + (path[i + 1].y - path[i].y) * t,
            };
        }
        target -= segs[i];
    }
    return path[path.length - 1];
}

const CircuitBackground = ({ opacity = 0.9 }) => {
    const canvasRef = useRef(null);
    const circuitRef = useRef(null);
    const rafRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            circuitRef.current = buildCircuit(canvas.width, canvas.height);
        };

        resize();
        window.addEventListener('resize', resize);

        let frame = 0;

        const draw = () => {
            const { traces, nodes, chips } = circuitRef.current;
            const W = canvas.width;
            const H = canvas.height;

            // Background
            ctx.fillStyle = BG_COLOR;
            ctx.fillRect(0, 0, W, H);

            // ── Draw chips ──
            chips.forEach(({ x, y, w, h }) => {
                ctx.fillStyle = CHIP_FILL;
                ctx.strokeStyle = CHIP_BORDER;
                ctx.lineWidth = 1.5;
                ctx.fillRect(x, y, w, h);
                ctx.strokeRect(x, y, w, h);

                // Inner die
                const pad = 10;
                ctx.fillStyle = 'rgba(20, 40, 80, 0.9)';
                ctx.fillRect(x + pad, y + pad, w - pad * 2, h - pad * 2);

                // Pin marks along edges
                ctx.strokeStyle = 'rgba(0, 180, 255, 0.35)';
                ctx.lineWidth = 1;
                const pinStep = 12;
                for (let px = x + 16; px < x + w - 8; px += pinStep) {
                    ctx.beginPath(); ctx.moveTo(px, y); ctx.lineTo(px, y - 5); ctx.stroke();
                    ctx.beginPath(); ctx.moveTo(px, y + h); ctx.lineTo(px, y + h + 5); ctx.stroke();
                }
                for (let py = y + 16; py < y + h - 8; py += pinStep) {
                    ctx.beginPath(); ctx.moveTo(x, py); ctx.lineTo(x - 5, py); ctx.stroke();
                    ctx.beginPath(); ctx.moveTo(x + w, py); ctx.lineTo(x + w + 5, py); ctx.stroke();
                }
            });

            // ── Draw traces ──
            traces.forEach(({ path }) => {
                if (path.length < 2) return;

                // Glow (wide, transparent)
                ctx.beginPath();
                ctx.moveTo(path[0].x, path[0].y);
                for (let i = 1; i < path.length; i++) ctx.lineTo(path[i].x, path[i].y);
                ctx.strokeStyle = GLOW_COLOR;
                ctx.lineWidth = 6;
                ctx.shadowBlur = 0;
                ctx.stroke();

                // Core trace
                ctx.beginPath();
                ctx.moveTo(path[0].x, path[0].y);
                for (let i = 1; i < path.length; i++) ctx.lineTo(path[i].x, path[i].y);
                ctx.strokeStyle = TRACE_COLOR;
                ctx.lineWidth = 1.2;
                ctx.stroke();
            });

            // ── Draw nodes ──
            nodes.forEach(({ x, y, r, phase }) => {
                const pulse = 0.5 + 0.5 * Math.sin(frame * 0.03 + phase);
                const alpha = 0.3 + 0.7 * pulse;
                const radius = r + pulse * 2;

                // Outer ring
                ctx.beginPath();
                ctx.arc(x, y, radius + 3, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(0, 229, 255, ${alpha * 0.3})`;
                ctx.lineWidth = 1;
                ctx.stroke();

                // Core dot
                ctx.beginPath();
                ctx.arc(x, y, radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 229, 255, ${alpha})`;
                ctx.shadowBlur = 12;
                ctx.shadowColor = PULSE_COLOR;
                ctx.fill();
                ctx.shadowBlur = 0;
            });

            // ── Draw + animate pulses ──
            traces.forEach((t) => {
                t.pulses.forEach((pulse) => {
                    pulse.progress += pulse.speed;
                    if (pulse.progress > 1) pulse.progress = 0;

                    const pt = getPointOnPath(t.path, pulse.progress);

                    // Trail
                    const trailLen = 0.04;
                    const trailStart = Math.max(0, pulse.progress - trailLen);
                    const ptTrail = getPointOnPath(t.path, trailStart);

                    const grad = ctx.createLinearGradient(ptTrail.x, ptTrail.y, pt.x, pt.y);
                    grad.addColorStop(0, 'rgba(0,229,255,0)');
                    grad.addColorStop(1, 'rgba(0,229,255,0.8)');

                    ctx.beginPath();
                    ctx.moveTo(ptTrail.x, ptTrail.y);
                    ctx.lineTo(pt.x, pt.y);
                    ctx.strokeStyle = grad;
                    ctx.lineWidth = pulse.size * 0.8;
                    ctx.shadowBlur = 12;
                    ctx.shadowColor = PULSE_COLOR;
                    ctx.stroke();
                    ctx.shadowBlur = 0;

                    // Head dot
                    ctx.beginPath();
                    ctx.arc(pt.x, pt.y, pulse.size * 0.7, 0, Math.PI * 2);
                    ctx.fillStyle = '#ffffff';
                    ctx.shadowBlur = 18;
                    ctx.shadowColor = PULSE_COLOR;
                    ctx.fill();
                    ctx.shadowBlur = 0;
                });
            });

            frame++;
            rafRef.current = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                inset: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 0,
                opacity,
            }}
        />
    );
};

export default CircuitBackground;
