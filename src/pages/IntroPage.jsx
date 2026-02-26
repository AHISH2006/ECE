import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import arcReactorImg from '../assets/image.png';
import Background from "../assets/background.png";
import jarvisSfx from '../assets/jarvis.mpeg?url';

/* ── Spark particle component ── */
const Spark = ({ delay, x, y, size, duration, angle }) => (
    <motion.div
        className="absolute rounded-full"
        style={{
            width: size,
            height: size,
            left: `${x}%`,
            top: `${y}%`,
            background: 'radial-gradient(circle, rgba(80,200,255,1) 0%, rgba(30,144,255,0.8) 40%, transparent 70%)',
            boxShadow: `0 0 ${size * 2}px rgba(30,144,255,0.6)`,
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
            opacity: [0, 1, 1, 0],
            scale: [0, 1, 0.5, 0],
            x: [0, Math.cos(angle) * 120, Math.cos(angle) * 200],
            y: [0, Math.sin(angle) * 120, Math.sin(angle)* 200],
        }}
        transition={{
            duration: duration,
            delay: delay,
            repeat: Infinity,
            repeatDelay: Math.random() * 3 + 1,
            ease: 'easeOut',
        }}
    />
);

/* ── Floating ember particle ── */
const Ember = ({ delay, startX, startY }) => (
    <motion.div
        className="absolute w-1 h-1 rounded-full bg-reactor-cyan"
        style={{
            left: `${startX}%`,
            top: `${startY}%`,
            boxShadow: '0 0 6px rgba(30,144,255,0.8), 0 0 12px rgba(80,200,255,0.4)',
        }}
        animate={{
            y: [0, -200, -400],
            x: [0, Math.random() * 60 - 30, Math.random() * 100 - 50],
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
        }}
        transition={{
            duration: 4 + Math.random() * 3,
            delay: delay,
            repeat: Infinity,
            ease: 'easeOut',
        }}
    />
);

/* ── Generate spark data ── */
const sparks = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    delay: Math.random() * 4,
    x: 40 + Math.random() * 20,
    y: 35 + Math.random() * 20,
    size: 2 + Math.random() * 4,
    duration: 1.5 + Math.random() * 2,
    angle: (Math.random() * Math.PI * 2),
}));

const embers = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    delay: Math.random() * 6,
    startX: 10 + Math.random() * 80,
    startY: 60 + Math.random() * 40,
}));

const IntroPage = () => {
    const navigate = useNavigate();
    const [phase, setPhase] = useState('intro'); // 'intro' | 'zooming' | 'flash'
    const [showContent, setShowContent] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        // Pre-load the audio so it plays instantly on click
        audioRef.current = new Audio(jarvisSfx);
        audioRef.current.volume = 0.85;
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        const showTimer = setTimeout(() => setShowContent(true), 400);
        return () => clearTimeout(showTimer);
    }, []);

    const handleEnter = useCallback(() => {
        if (phase !== 'intro') return;
        // Play JARVIS sound immediately on activate
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(() => { });
        }
        setPhase('zooming');
        // After zoom completes, flash and navigate
        setTimeout(() => setPhase('flash'), 1400);
        setTimeout(() => navigate('/home'), 1900);
    }, [phase, navigate]);

    return (
        <div className="fixed inset-0 z-50 overflow-hidden" style={{ background: '#020a18' }}>
            <AnimatePresence mode="wait">
                {/* ═══ MAIN INTRO SCREEN ═══ */}
                {phase === 'intro' && (
                    <motion.div
                        key="intro"
                        className="absolute inset-0 flex flex-col items-center justify-center"
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* ── Background: attractive, NO overlay ── */}
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage: `url(${Background})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                filter: 'brightness(0.6) saturate(1.5) contrast(1.1)',
                            }}
                        />
                        {/* Very subtle top/bottom edge fade for text readability only */}
                        <div
                            className="absolute inset-0"
                            style={{
                                background: 'linear-gradient(180deg, rgba(2,10,24,0.3) 0%, transparent 15%, transparent 80%, rgba(2,10,24,0.35) 100%)',
                            }}
                        />


                        {/* ── Spark effects ── */}
                        <div className="absolute inset-0 pointer-events-none">
                            {sparks.map((s) => (
                                <Spark key={s.id} {...s} />
                            ))}
                        </div>

                        {/* ── Floating embers ── */}
                        <div className="absolute inset-0 pointer-events-none">
                            {embers.map((e) => (
                                <Ember key={e.id} {...e} />
                            ))}
                        </div>

                        {/* ── Scanning line ── */}
                        <motion.div
                            className="absolute w-full h-px pointer-events-none"
                            style={{
                                background: 'linear-gradient(90deg, transparent 5%, rgba(80,200,255,0.4) 30%, rgba(80,200,255,0.6) 50%, rgba(80,200,255,0.4) 70%, transparent 95%)',
                                boxShadow: '0 0 20px rgba(30,144,255,0.3)',
                            }}
                            animate={{ y: [-400, 500] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'linear', repeatDelay: 1.5 }}
                        />

                        {/* ── HUD circles ── */}
                        <motion.div
                            className="absolute w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full border border-reactor-blue/10"
                            animate={{ scale: [1, 1.06, 1], opacity: [0.06, 0.18, 0.06] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        />


                        {/* ── Activate Button — pinned to bottom center ── */}
                        <div className="absolute bottom-10 left-0 right-0 flex justify-center z-10">
                            <motion.button
                                onClick={handleEnter}
                                className="group relative px-20 py-6 rounded-full border-4 border-reactor-blue/50 bg-reactor-blue/8 backdrop-blur-sm font-orbitron text-xl tracking-[0.5em] text-reactor-light/90 uppercase cursor-pointer overflow-hidden transition-all duration-500 hover:border-reactor-cyan/80 hover:bg-reactor-blue/15 hover:text-reactor-glow hover:shadow-[0_0_60px_rgba(30,144,255,0.55),0_0_120px_rgba(30,144,255,0.2)]"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                whileHover={{ scale: 1.06 }}
                                whileTap={{ scale: 0.94 }}
                            >
                                <span className="relative z-10">ACTIVATE</span>
                                <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </motion.button>
                        </div>

                        {/* ── Corner HUD ── */}
                        <div className="absolute top-5 left-5 w-10 h-10 border-t-2 border-l-2 border-reactor-blue/25" />
                        <div className="absolute top-5 right-5 w-10 h-10 border-t-2 border-r-2 border-reactor-blue/25" />
                        <div className="absolute bottom-5 left-5 w-10 h-10 border-b-2 border-l-2 border-reactor-blue/25" />
                        <div className="absolute bottom-5 right-5 w-10 h-10 border-b-2 border-r-2 border-reactor-blue/25" />

                        {/* HUD labels */}
                        <motion.span
                            className="absolute top-8 left-14 font-rajdhani text-[9px] tracking-[0.2em] text-reactor-blue/20 uppercase z-10"
                            initial={{ opacity: 0 }}
                            animate={showContent ? { opacity: 1 } : {}}
                            transition={{ delay: 3.2 }}
                        >
                            SYS:ONLINE
                        </motion.span>
                        <motion.span
                            className="absolute bottom-8 right-14 font-rajdhani text-[9px] tracking-[0.2em] text-reactor-blue/20 uppercase z-10"
                            initial={{ opacity: 0 }}
                            animate={showContent ? { opacity: 1 } : {}}
                            transition={{ delay: 3.4 }}
                        >
                            ECE.DEPT//V2026
                        </motion.span>

                        {/* Bottom text */}
                        <motion.p
                            className="absolute bottom-8 font-rajdhani text-[10px] tracking-[0.3em] text-reactor-blue/20 uppercase z-10"
                            initial={{ opacity: 0 }}
                            animate={showContent ? { opacity: 1 } : {}}
                            transition={{ duration: 1, delay: 3.5 }}
                        >
                            Powered by ECE Department
                        </motion.p>
                    </motion.div>
                )}

                {/* ═══ ZOOM TRANSITION ═══ */}
                {phase === 'zooming' && (
                    <motion.div
                        key="zooming"
                        className="absolute inset-0 flex items-center justify-center"
                        style={{ background: '#020a18' }}
                        initial={{ opacity: 1 }}
                    >
                        {/* Background stays */}
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage: `url(${arcReactorImg})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                filter: 'blur(3px) brightness(0.2)',
                            }}
                        />

                        {/* Reactor zooms toward viewer */}
                        <motion.img
                            src={arcReactorImg}
                            alt=""
                            className="rounded-full object-cover select-none"
                            style={{
                                width: '320px',
                                height: '320px',
                            }}
                            initial={{
                                scale: 1,
                                opacity: 1,
                                filter: 'drop-shadow(0 0 40px rgba(30,144,255,0.8)) drop-shadow(0 0 80px rgba(30,144,255,0.4))',
                            }}
                            animate={{
                                scale: 12,
                                opacity: [1, 1, 0.8, 0],
                                filter: [
                                    'drop-shadow(0 0 40px rgba(30,144,255,0.8)) drop-shadow(0 0 80px rgba(30,144,255,0.4))',
                                    'drop-shadow(0 0 80px rgba(30,144,255,1)) drop-shadow(0 0 150px rgba(80,200,255,0.8))',
                                    'drop-shadow(0 0 120px rgba(200,230,255,1)) drop-shadow(0 0 200px rgba(80,200,255,1))',
                                    'drop-shadow(0 0 0px transparent)',
                                ],
                                rotate: [0, 180],
                            }}
                            transition={{
                                duration: 1.4,
                                ease: [0.2, 0.8, 0.3, 1],
                            }}
                            draggable={false}
                        />

                        {/* Radial spark burst during zoom */}
                        {Array.from({ length: 16 }).map((_, i) => (
                            <motion.div
                                key={`burst-${i}`}
                                className="absolute w-1.5 h-8 rounded-full"
                                style={{
                                    background: 'linear-gradient(to bottom, rgba(80,200,255,0.9), transparent)',
                                    transformOrigin: 'center 200px',
                                    transform: `rotate(${i * 22.5}deg)`,
                                }}
                                initial={{ opacity: 0, scaleY: 0 }}
                                animate={{
                                    opacity: [0, 1, 0],
                                    scaleY: [0, 3, 6],
                                }}
                                transition={{
                                    duration: 1,
                                    delay: 0.3 + i * 0.02,
                                    ease: 'easeOut',
                                }}
                            />
                        ))}
                    </motion.div>
                )}

                {/* ═══ WHITE FLASH ═══ */}
                {phase === 'flash' && (
                    <motion.div
                        key="flash"
                        className="absolute inset-0"
                        style={{ background: 'white' }}
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default IntroPage;
