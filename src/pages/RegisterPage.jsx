import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CircuitBackground from '../components/CircuitBackground';
import Navbar from '../components/Navbar';
import TypewriterText from '../components/TypewriterText';
import '../styles/TechnicalPage.css';
import '../styles/RegisterPage.css';

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

const ALL_EVENTS = [
    'Paper Presentation', 'PCB Design Layout', 'Technical Crosscode', 'Tech Talk / Pic & Talk', 'Quiz Master',
    'AD-MAD', 'JAM', 'E-Sports', 'Talent Show', 'Dumb Charades',
];

const RegisterPage = () => {
    return (
        <div className="tp-page">
            <CircuitBackground />
            <div className="circuit-overlay" />
            <div className="scan-line" />
            <div className="hud-corner tl" /><div className="hud-corner tr" />
            <div className="hud-corner bl" /><div className="hud-corner br" />

            <Navbar />

            <motion.section className="tp-hero" variants={fadeUp} initial="hidden" animate="show">
                <motion.p className="tp-hero-tag" variants={fadeUp}>VibECX-2K26</motion.p>
                <TypewriterText text="Register" className="tp-hero-title" tag="h1" delay={0.3} stagger={0.08} />
                <motion.p className="tp-hero-sub" variants={fadeUp}>
                    Secure your spot at the Ultimate ECE Symposium
                </motion.p>
            </motion.section>

            <motion.section className="reg-section" variants={stagger} initial="hidden" animate="show">
                <div className="reg-container">
                    {/* ARC PASS CARD */}
                    <motion.div className="reg-card arc-pass" variants={fadeUp} whileHover={{ y: -10, transition: { duration: 0.3 } }}>
                        <div className="reg-card-glow" />
                        <div className="reg-card-content">
                            <div className="reg-card-tag">BEST VALUE</div>
                            <h2 className="reg-card-title">ARC PASS</h2>
                            <div className="reg-card-price">₹149</div>
                            <p className="reg-card-quote">“Double Power Access”</p>
                            <ul className="reg-card-list">
                                <li><span className="reg-tick">🎫</span> 1 Technical Event</li>
                                <li><span className="reg-tick">🎫</span> 1 Non-Technical Event</li>
                                <li><span className="reg-tick">📜</span> Participation Certificate</li>
                            </ul>
                        </div>
                        <span className="card-corner tl" /><span className="card-corner tr" />
                        <span className="card-corner bl" /><span className="card-corner br" />
                    </motion.div>

                    {/* ADD-ON CARD */}
                    <motion.div className="reg-card power-addon" variants={fadeUp} whileHover={{ y: -10, transition: { duration: 0.3 } }}>
                        <div className="reg-card-glow" />
                        <div className="reg-card-content">
                            <div className="reg-card-tag addon-tag">UPGRADE</div>
                            <h2 className="reg-card-title">Power Add-On</h2>
                            <div className="reg-card-price addon-price">₹25</div>
                            <p className="reg-card-quote">“Upgrade Your Energy”</p>
                            <p className="reg-card-desc">Add any extra event for just ₹25 each.</p>
                        </div>
                        <span className="card-corner tl" /><span className="card-corner tr" />
                        <span className="card-corner bl" /><span className="card-corner br" />
                    </motion.div>
                </div>

                {/* GRAND ANIMATED REGISTRATION BUTTON */}
                <motion.div className="reg-button-wrap" variants={fadeUp}>
                    <motion.button
                        className="grand-reg-btn"
                        whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(0, 229, 255, 0.6)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSdfGGkLxjKZsAMF3co_ZXOoach8IeaoGD0jrVYDCR0hBOzibg/viewform?usp=dialog', '_blank')}
                    >
                        <span className="btn-glow-ring" />
                        <span className="btn-text">INITIALIZE REGISTRATION</span>
                        <div className="btn-particles">
                            {[...Array(6)].map((_, i) => (
                                <motion.span
                                    key={i}
                                    className="btn-particle"
                                    animate={{
                                        y: [-20, -100],
                                        x: [0, (i - 2.5) * 30],
                                        opacity: [0, 1, 0],
                                        scale: [0, 1, 0]
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        delay: i * 0.2,
                                        ease: "easeOut"
                                    }}
                                />
                            ))}
                        </div>
                    </motion.button>
                    <p className="reg-hint">Click to proceed to the registration portal</p>
                </motion.div>
            </motion.section>

            <footer className="tp-footer-strip">
                <span>VibECX-2K26 · Dept of ECE · Suguna College of Engineering · March 11, 2026</span>
            </footer>
        </div>
    );
};

export default RegisterPage;
