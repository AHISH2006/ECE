import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import jarvisSfx from '../assets/jarvis.mpeg?url';
import reactorImg from '../assets/reactor_hud.png';
import '../styles/LoadingPage.css';

const LoadingPage = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const audioRef = useRef(null);

    useEffect(() => {
        // Initialize sound
        audioRef.current = new Audio(jarvisSfx);
        audioRef.current.volume = 0.6;
        audioRef.current.play().catch(e => console.log("Autoplay prevented:", e));

        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(onComplete, 800);
                    return 100;
                }
                const inc = Math.floor(Math.random() * 7) + 2;
                return Math.min(prev + inc, 100);
            });
        }, 60);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <div className="loading-screen">
            <div className="reactor-bg-overlay" />

            <div className="loading-hud">
                <div className="reactor-container">
                    {/* Ring 1 - Deepest, slow rotation */}
                    <motion.div
                        className="reactor-layer layer-1"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                    />

                    {/* Ring 2 - Counter rotation */}
                    <motion.div
                        className="reactor-layer layer-2"
                        animate={{ rotate: -360 }}
                        transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                    />

                    {/* Ring 3 - Rapid rotation */}
                    <motion.div
                        className="reactor-layer layer-3"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                    />

                    {/* Main Reactor Image */}
                    <div className="reactor-core-wrap">
                        <img src={reactorImg} alt="Reactor" className="reactor-img" />
                        <div className="reactor-glow" />
                    </div>

                    {/* Progress Counter */}
                    <div className="progress-counter">
                        <span className="progress-num">{progress}</span>
                        <span className="progress-unit">%</span>
                        <div className="progress-label">INITIALIZING</div>
                    </div>
                </div>


            </div>

            <div className="loading-footer-text">
                {progress < 40 ? "CALIBRATING_ARC_REACTOR..." :
                    progress < 80 ? "SYNCHRONIZING_HUD_ELEMENTS..." : "JARVIS_ONLINE"}
            </div>

            <div className="scanline" />
        </div>
    );
};

export default LoadingPage;
