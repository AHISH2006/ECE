import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Background from "../assets/background.png";

/* ══════════════════════════════════════════
   PARTICLE COMPONENTS
══════════════════════════════════════════ */
const Spark = ({ delay, x, y, size, duration, angle }) => (
    <motion.div
        className="absolute rounded-full"
        style={{
            width: size, height: size,
            left: `${x}%`, top: `${y}%`,
            background: 'radial-gradient(circle, rgba(80,200,255,1) 0%, rgba(30,144,255,0.8) 40%, transparent 70%)',
            boxShadow: `0 0 ${size * 2}px rgba(30,144,255,0.6)`,
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
            opacity: [0, 1, 1, 0], scale: [0, 1, 0.5, 0],
            x: [0, Math.cos(angle) * 120, Math.cos(angle) * 200],
            y: [0, Math.sin(angle) * 120, Math.sin(angle) * 200],
        }}
        transition={{ duration, delay, repeat: Infinity, repeatDelay: Math.random() * 3 + 1, ease: 'easeOut' }}
    />
);

const Ember = ({ delay, startX, startY }) => (
    <motion.div
        className="absolute w-1 h-1 rounded-full"
        style={{
            left: `${startX}%`, top: `${startY}%`,
            background: '#00f2ff',
            boxShadow: '0 0 6px rgba(0,242,255,0.8)',
        }}
        animate={{ y: [0, -300, -600], x: [0, Math.random() * 60 - 30, Math.random() * 100 - 50], opacity: [0, 0.9, 0], scale: [0, 1, 0] }}
        transition={{ duration: 4 + Math.random() * 3, delay, repeat: Infinity, ease: 'easeOut' }}
    />
);

/* Vertical data stream line */
const DataStream = ({ x, delay, speed, chars }) => (
    <motion.div
        className="absolute top-0 pointer-events-none select-none"
        style={{ left: `${x}%`, display: 'flex', flexDirection: 'column', gap: '4px' }}
        initial={{ y: -200, opacity: 0 }}
        animate={{ y: ['0%', '110%'], opacity: [0, 0.4, 0.4, 0] }}
        transition={{ duration: speed, delay, repeat: Infinity, ease: 'linear' }}
    >
        {chars.map((c, i) => (
            <span key={i} style={{ fontFamily: 'monospace', fontSize: '10px', color: 'rgba(0,242,255,0.6)', lineHeight: 1.4 }}>
                {c}
            </span>
        ))}
    </motion.div>
);

/* Radar sweep SVG */
const RadarSweep = () => (
    <svg
        className="absolute pointer-events-none"
        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 700, height: 700, maxWidth: '90vw', maxHeight: '90vw' }}
        viewBox="0 0 700 700"
    >
        {/* Background circles */}
        {[280, 210, 140, 70].map((r, i) => (
            <circle key={i} cx="350" cy="350" r={r}
                fill="none" stroke="rgba(0,200,255,0.07)" strokeWidth="1" strokeDasharray="4 6" />
        ))}
        {/* Cross hairs */}
        <line x1="350" y1="80" x2="350" y2="620" stroke="rgba(0,200,255,0.05)" strokeWidth="1" />
        <line x1="80" y1="350" x2="620" y2="350" stroke="rgba(0,200,255,0.05)" strokeWidth="1" />

        {/* Blip dots */}
        {[[240, 290], [420, 200], [180, 410], [480, 430]].map(([cx, cy], i) => (
            <motion.circle key={i} cx={cx} cy={cy} r="3"
                fill="rgba(0,242,255,0.9)"
                animate={{ opacity: [0, 1, 0], r: [2, 4, 2] }}
                transition={{ duration: 1.5, delay: i * 0.8, repeat: Infinity }}
            />
        ))}
    </svg>
);

/* ── Typewriter text hook ── */
function useTypewriter(text, speed = 60, startDelay = 800) {
    const [displayed, setDisplayed] = useState('');
    useEffect(() => {
        let i = 0;
        const t = setTimeout(() => {
            const iv = setInterval(() => {
                setDisplayed(text.slice(0, ++i));
                if (i >= text.length) clearInterval(iv);
            }, speed);
            return () => clearInterval(iv);
        }, startDelay);
        return () => clearTimeout(t);
    }, [text, speed, startDelay]);
    return displayed;
}

/* ═══════════════════════════════════════════
   STATIC DATA
═══════════════════════════════════════════ */
const sparks = Array.from({ length: 20 }, (_, i) => ({
    id: i, delay: Math.random() * 4,
    x: 40 + Math.random() * 20, y: 35 + Math.random() * 20,
    size: 2 + Math.random() * 4, duration: 1.5 + Math.random() * 2,
    angle: Math.random() * Math.PI * 2,
}));

const embers = Array.from({ length: 20 }, (_, i) => ({
    id: i, delay: Math.random() * 6,
    startX: 5 + Math.random() * 90, startY: 60 + Math.random() * 40,
}));

const streamCols = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: 5 + i * 13,
    delay: Math.random() * 4,
    speed: 5 + Math.random() * 4,
    chars: Array.from({ length: 14 }, () =>
        String.fromCharCode(Math.random() > 0.5 ? 48 + Math.floor(Math.random() * 10) : 65 + Math.floor(Math.random() * 26))
    ),
}));

const hudReadouts = [
    { label: 'REACTOR CORE', value: '✓ ONLINE', color: '#00f2ff' },
    { label: 'PWR OUTPUT', value: '3.0 GW', color: '#7cffb2' },
    { label: 'SHIELD STATUS', value: 'ACTIVE', color: '#00f2ff' },
    { label: 'AI SUBSYS', value: 'JARVIS', color: '#ffcc00' },
];

/* ── Sound Dialog ── */
const SoundDialog = ({ onYes, onNo }) => (
    <motion.div className="sound-dialog-overlay"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
    >
        <motion.div className="sound-dialog-box"
            initial={{ scale: 0.85, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 30 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="sound-dialog-icon">🔊</div>
            <h3 className="sound-dialog-title">INITIALIZE SOUND SYSTEM?</h3>
            <p className="sound-dialog-sub">Enable audio effects for the full experience</p>
            <div className="sound-dialog-buttons">
                <motion.button className="sound-btn sound-btn-yes" onClick={onYes}
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>YES — ENABLE</motion.button>
                <motion.button className="sound-btn sound-btn-no" onClick={onNo}
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>NO — SKIP</motion.button>
            </div>
        </motion.div>
    </motion.div>
);

/* ══════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════ */
const IntroPage = () => {
    const navigate = useNavigate();
    const [showDialog, setShowDialog] = useState(false);
    const [showContent, setShowContent] = useState(false);
    

    useEffect(() => {
        if (sessionStorage.getItem('hasSeenIntro')) { navigate('/home'); return; }
        const t = setTimeout(() => setShowContent(true), 400);
        return () => clearTimeout(t);
    }, [navigate]);

    const handleActivate = useCallback(() => setShowDialog(true), []);
    const goToLoading = useCallback((withSound) => {
        sessionStorage.setItem('hasSeenIntro', 'true');
        navigate('/loading', { state: { withSound } });
    }, [navigate]);

    return (
        <div className="fixed inset-0 z-50 overflow-hidden" style={{ background: '#020a18' }}>

            {/* ── Background ── */}
            <div className="absolute inset-0" style={{
                backgroundImage: `url(${Background})`,
                backgroundSize: 'cover', backgroundPosition: 'center',
                filter: 'brightness(0.55) saturate(1.4) contrast(1.1)',
            }} />
            <div className="absolute inset-0" style={{
                background: 'linear-gradient(180deg, rgba(2,10,24,0.45) 0%, rgba(2,10,24,0.1) 30%, rgba(2,10,24,0.1) 70%, rgba(2,10,24,0.7) 100%)',
            }} />

            {/* ── Data streams ── */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {streamCols.map(s => <DataStream key={s.id} {...s} />)}
            </div>

            {/* ── Radar / Arc reactor rings ── */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <RadarSweep />
            </div>

            {/* ── Concentric pulse rings ── */}
            {[360, 260, 180].map((size, i) => (
                <motion.div key={i}
                    className="absolute rounded-full border pointer-events-none"
                    style={{
                        width: size, height: size,
                        top: '50%', left: '50%',
                        transform: 'translate(-50%,-50%)',
                        borderColor: `rgba(0,200,255,${0.06 + i * 0.04})`,
                    }}
                    animate={{ scale: [1, 1.07 + i * 0.02, 1], opacity: [0.4, 0.9, 0.4] }}
                    transition={{ duration: 3 + i * 0.8, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
                />
            ))}

            {/* ── Sparks ── */}
            <div className="absolute inset-0 pointer-events-none">
                {sparks.map(s => <Spark key={s.id} {...s} />)}
            </div>

            {/* ── Embers ── */}
            <div className="absolute inset-0 pointer-events-none">
                {embers.map(e => <Ember key={e.id} {...e} />)}
            </div>

            {/* ── Scanning line (horizontal sweep) ── */}
            <motion.div className="absolute w-full h-px pointer-events-none"
                style={{
                    background: 'linear-gradient(90deg, transparent 5%, rgba(0,220,255,0.35) 30%, rgba(0,242,255,0.6) 50%, rgba(0,220,255,0.35) 70%, transparent 95%)',
                    boxShadow: '0 0 18px rgba(0,200,255,0.3)',
                }}
                animate={{ y: [-200, 800] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
            />

            {/* ── Top typewriter title ── */}
            <motion.div
                className="absolute top-0 left-0 right-0 flex justify-center pt-7 z-10 pointer-events-none"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            >
                <span style={{
                    fontFamily: 'Orbitron, sans-serif',
                    fontSize: 'clamp(0.55rem, 1.4vw, 0.85rem)',
                    letterSpacing: '0.35em',
                    color: 'rgba(0,200,255,0.7)',
                    textShadow: '0 0 12px rgba(0,200,255,0.4)',
                }}>
                    
                    <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.6, repeat: Infinity }}>_</motion.span>
                </span>
            </motion.div>

            {/* ── HUD readouts (left side) ── */}
            <motion.div
                className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 pointer-events-none z-10 hidden md:flex"
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
            >
                {hudReadouts.map((r, i) => (
                    <motion.div key={i}
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        transition={{ delay: 1.4 + i * 0.3 }}
                        style={{ fontFamily: 'monospace' }}
                    >
                        <div style={{ fontSize: '8px', color: 'rgba(0,200,255,0.4)', letterSpacing: '0.2em' }}>{r.label}</div>
                        <div style={{ fontSize: '11px', color: r.color, textShadow: `0 0 8px ${r.color}`, letterSpacing: '0.1em' }}>{r.value}</div>
                    </motion.div>
                ))}
            </motion.div>

            {/* ── RIGHT: angle/coordinate readout ── */}
            <motion.div
                className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 pointer-events-none z-10 hidden md:flex items-end"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5, duration: 0.6 }}
            >
                {['26.9124° N', '80.9422° E', 'ALT: 320m', 'TEMP: 28°C'].map((val, i) => (
                    <motion.div key={i}
                        style={{ fontFamily: 'monospace', fontSize: '10px', color: 'rgba(0,200,255,0.45)', letterSpacing: '0.15em' }}
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        transition={{ delay: 1.6 + i * 0.25 }}
                    >
                        {val}
                    </motion.div>
                ))}
            </motion.div>

            {/* ── ACTIVATE BUTTON ── */}
            <div className="absolute bottom-10 left-0 right-0 flex justify-center z-10 px-4">
                <motion.button
                    onClick={handleActivate}
                    className="activate-btn"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                >
                    <span className="activate-btn-text">BOOT THE ARC SYSTEM</span>
                    <span className="activate-btn-glow" />
                </motion.button>
            </div>

            {/* ── Corner HUD brackets (animated) ── */}
            {[
                'top-5 left-5 border-t-2 border-l-2',
                'top-5 right-5 border-t-2 border-r-2',
                'bottom-5 left-5 border-b-2 border-l-2',
                'bottom-5 right-5 border-b-2 border-r-2',
            ].map((cls, i) => (
                <motion.div key={i}
                    className={`absolute w-12 h-12 border-reactor-blue/30 ${cls}`}
                    animate={{ opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
                />
            ))}

            {/* ── SYS:ONLINE label ── */}
            {showContent && (
                <motion.span
                    className="absolute top-8 left-16 z-10 pointer-events-none"
                    style={{ fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.25em', color: 'rgba(0,200,255,0.3)', textTransform: 'uppercase' }}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                >
                    SYS:ONLINE
                </motion.span>
            )}

            {/* ── Sound Dialog ── */}
            <AnimatePresence>
                {showDialog && (
                    <SoundDialog onYes={() => goToLoading(true)} onNo={() => goToLoading(false)} />
                )}
            </AnimatePresence>
        </div>
    );
};

export default IntroPage;
