import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import TypewriterText from '../components/TypewriterText';
import CircuitBackground from '../components/CircuitBackground';
import '../styles/TechnicalPage.css';

// Poster imports
import posterPaper from '../assets/poster_paper.png';
import posterPcb from '../assets/poster_pcb.png';
import posterCrosscode from '../assets/poster_crosscode.png';
import posterTechtalk from '../assets/poster_techtalk.png';
import posterQuiz from '../assets/poster_quiz.png';

const EVENTS = [
    {
        number: '01',
        title: 'Paper Presentation',
        icon: '📄',
        tag: 'Research',
        accent: '#00c8ff',
        poster: posterPaper,
        description: 'Students present research papers on emerging ECE trends like 5G/6G, VLSI, AI in Signal Processing, and Green Electronics. Demonstrate your depth of knowledge and scientific communication ability.',
        highlights: ['5G / 6G Technologies', 'VLSI Design', 'AI in Signal Processing', 'Green Electronics'],
        rules: ['Team of 1–2 members', 'Paper submitted 2 days prior', '10 min presentation + 5 min Q&A', 'Topic must be ECE related'],
    },
    {
        number: '02',
        title: 'BoardCraft Arena',
        icon: '🔌',
        tag: 'Design',
        accent: '#00ff88',
        poster: posterPcb,
        description: 'Design a Printed Circuit Board (PCB) layout for a given schematic using Eagle, KiCad, or Altium. Showcase your design skills in component placement, trace routing and DRC.',
        highlights: ['Eagle / KiCad / Altium', 'Schematic to Layout', 'DRC & Trace Routing', 'Component Placement'],
        rules: ['Individual / Team of 2', 'Software provided on-site', '2-hour time limit', 'Judged on accuracy & aesthetics'],
    },
    {
        number: '03',
        title: 'Code Circuit Clash',
        icon: '🧩',
        tag: 'Puzzle',
        accent: '#bf00ff',
        poster: posterCrosscode,
        description: 'A challenging crossword puzzle where all clues and answers are drawn from electronics, semiconductors, and physics. Strategy, speed, and domain knowledge are your weapons.',
        highlights: ['Electronics Fundamentals', 'Semiconductor Theory', 'Physics-based Clues', 'Team Strategy'],
        rules: ['Team of 2', '45-minute time limit', 'No digital aids allowed', 'Tiebreaker: fastest completion'],
    },
    {
        number: '04',
        title: 'Core Conversations',
        icon: '🎤',
        tag: 'Presentation',
        accent: '#ff8800',
        poster: posterTechtalk,
        description: 'Pick a technical topic on the spot and deliver a composed 3-minute speech showcasing your technical depth, communication skills, and confidence on stage.',
        highlights: ['Impromptu Speaking', '3-Minute Format', 'Technical Depth', 'Communication Skills'],
        rules: ['Individual event', 'Topic drawn randomly', '1-min prep time allowed', 'Judged on clarity & content'],
    },
    {
        number: '05',
        title: 'ElectroMind Arena',
        icon: '🏆',
        tag: 'Quiz',
        accent: '#ffd700',
        poster: posterQuiz,
        description: 'A fast-paced quiz covering electronics, communication, and physics with multiple buzzer rounds, rapid fire, and audio-visual questions. Last team standing wins!',
        highlights: ['Multiple Rounds', 'Rapid Fire Format', 'Buzzer Rounds', 'Team & Individual'],
        rules: ['Team of 2', 'Prelims: Written round', 'Finals: Buzzer + Rapid fire', 'No negative marking in prelims'],
    },
];

/* ── Cursor-tracking poster tilt ── */
const TiltPoster = ({ src, alt, accent }) => {
    const ref = useRef(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    const handleMove = useCallback((e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const cx = e.clientX - r.left - r.width / 2;
        const cy = e.clientY - r.top - r.height / 2;
        setTilt({ x: (cy / r.height) * 18, y: -(cx / r.width) * 18 });
    }, []);
    const handleLeave = () => setTilt({ x: 0, y: 0 });

    return (
        <div
            ref={ref}
            className="tilt-container"
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            style={{ '--accent': accent }}
        >
            <motion.div
                className="tilt-inner"
                animate={{ rotateX: tilt.x, rotateY: tilt.y }}
                transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                style={{ transformStyle: 'preserve-3d' }}
            >
                <img src={src} alt={alt} className="tilt-img" />
                <div className="tilt-sheen" />
                <div className="tilt-glow" style={{ background: `radial-gradient(circle at 50% 50%, ${accent}33 0%, transparent 70%)` }} />
            </motion.div>
        </div>
    );
};

/* ── Event grid card ── */
const EventCard = ({ event, onClick }) => (
    <motion.div
        className="ev-card"
        style={{ '--accent': event.accent }}
        whileHover={{ y: -8, scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        onClick={onClick}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
    >
        {/* Poster thumbnail */}
        <div className="ev-card-poster">
            <img src={event.poster} alt={event.title} />
            <div className="ev-card-overlay" />
            <span className="ev-card-num">{event.number}</span>
            <span className="ev-card-tag" style={{ background: event.accent + '22', borderColor: event.accent, color: event.accent }}>
                {event.tag}
            </span>
        </div>

        {/* Name row */}
        <div className="ev-card-body">
            <span className="ev-card-icon">{event.icon}</span>
            <h3 className="ev-card-title" style={{ color: event.accent }}>{event.title}</h3>
            <span className="ev-card-cta">Tap to explore →</span>
        </div>

        {/* Accent border bottom */}
        <div className="ev-card-bar" style={{ background: event.accent }} />
    </motion.div>
);

/* ── Detail modal ── */
const EventDetail = ({ event, onClose, onRegister }) => (
    <motion.div
        className="ev-detail-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
    >
        <motion.div
            className="ev-detail-box"
            style={{ '--accent': event.accent }}
            initial={{ scale: 0.88, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.88, opacity: 0, y: 40 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
            {/* Close */}
            <button className="ev-detail-close" onClick={onClose}>✕</button>

            <div className="ev-detail-inner">
                {/* Left: tilt poster */}
                <div className="ev-detail-left">
                    <TiltPoster src={event.poster} alt={event.title} accent={event.accent} />
                </div>

                {/* Right: info */}
                <div className="ev-detail-right">
                    <span className="ev-detail-tag" style={{ color: event.accent, borderColor: event.accent + '55' }}>
                        {event.icon} {event.tag}
                    </span>
                    <h2 className="ev-detail-title" style={{ color: event.accent }}>{event.title}</h2>

                    <p className="ev-detail-desc">{event.description}</p>

                    {/* Highlights */}
                    <div className="ev-detail-section">
                        <h4 className="ev-detail-section-title">✦ Key Topics</h4>
                        <ul className="ev-detail-list">
                            {event.highlights.map((h, i) => (
                                <motion.li key={i} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 + i * 0.07 }}>
                                    <span className="ev-dot" style={{ background: event.accent }} />
                                    {h}
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    {/* Rules */}
                    <div className="ev-detail-section">
                        <h4 className="ev-detail-section-title">📋 Rules</h4>
                        <ul className="ev-detail-list">
                            {event.rules.map((r, i) => (
                                <motion.li key={i} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 + i * 0.07 }}>
                                    <span className="ev-dot" style={{ background: event.accent + 'aa' }} />
                                    {r}
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    <motion.button
                        className="ev-detail-btn"
                        style={{ background: event.accent, boxShadow: `0 0 28px ${event.accent}55` }}
                        whileHover={{ scale: 1.05, boxShadow: `0 0 48px ${event.accent}88` }}
                        whileTap={{ scale: 0.96 }}
                        onClick={onRegister}
                    >
                        Register Now →
                    </motion.button>
                </div>
            </div>
        </motion.div>
    </motion.div>
);

/* ══════════════════ CAROUSEL ══════════════════ */
const EventCarousel = ({ events, onSelect, onRegister }) => {
    const [index, setIndex] = useState(0);
    const [dir, setDir] = useState(1); // 1=forward, -1=backward
    const ev = events[index];

    const goPrev = () => { setDir(-1); setIndex(i => (i - 1 + events.length) % events.length); };
    const goNext = () => { setDir(1); setIndex(i => (i + 1) % events.length); };

    const variants = {
        enter: (d) => ({ opacity: 0, x: d > 0 ? 80 : -80 }),
        center: { opacity: 1, x: 0 },
        exit: (d) => ({ opacity: 0, x: d > 0 ? -80 : 80 }),
    };

    return (
        <div className="ev-carousel">
            {/* Prev arrow */}
            <motion.button className="ev-carousel-arrow ev-arrow-l" onClick={goPrev}
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>‹</motion.button>

            {/* Card area */}
            <div className="ev-carousel-stage">
                <AnimatePresence mode="wait" custom={dir}>
                    <motion.div
                        key={ev.number}
                        className="ev-carousel-card"
                        style={{ '--accent': ev.accent }}
                        custom={dir}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
                    >
                        {/* Poster half */}
                        <div className="ev-carousel-poster">
                            <img src={ev.poster} alt={ev.title} />
                            <div className="ev-carousel-poster-grad" />
                            <span className="ev-carousel-num">{ev.number} / 0{events.length}</span>
                            <span className="ev-carousel-tag" style={{ background: ev.accent + '22', borderColor: ev.accent, color: ev.accent }}>
                                {ev.icon} {ev.tag}
                            </span>
                        </div>

                        {/* Info half */}
                        <div className="ev-carousel-info">
                            <h2 className="ev-carousel-title" style={{ color: ev.accent }}>{ev.title}</h2>
                            <p className="ev-carousel-desc">{ev.description}</p>

                            <div className="ev-carousel-chips">
                                {ev.highlights.map((h, i) => (
                                    <span key={i} className="ev-carousel-chip"
                                        style={{ borderColor: ev.accent + '55', color: ev.accent + 'dd' }}>
                                        {h}
                                    </span>
                                ))}
                            </div>

                            <div className="ev-carousel-actions">
                                <motion.button className="ev-carousel-detail-btn"
                                    style={{ borderColor: ev.accent, color: ev.accent }}
                                    whileHover={{ background: ev.accent + '22', scale: 1.04 }}
                                    whileTap={{ scale: 0.96 }}
                                    onClick={() => onSelect(ev)}>
                                    Full Details →
                                </motion.button>
                                <motion.button className="ev-carousel-reg-btn"
                                    style={{ background: ev.accent, boxShadow: `0 0 20px ${ev.accent}55` }}
                                    whileHover={{ scale: 1.04, boxShadow: `0 0 36px ${ev.accent}88` }}
                                    whileTap={{ scale: 0.96 }}
                                    onClick={onRegister}>
                                    Register Now
                                </motion.button>
                            </div>
                        </div>
                        {/* Accent bar */}
                        <div className="ev-carousel-bar" style={{ background: ev.accent }} />
                    </motion.div>
                </AnimatePresence>

                {/* Dot progress */}
                <div className="ev-carousel-dots">
                    {events.map((_, i) => (
                        <motion.button key={i} className={`ev-dot-btn ${i === index ? 'active' : ''}`}
                            style={{ background: i === index ? ev.accent : 'rgba(255,255,255,0.15)' }}
                            onClick={() => { setDir(i > index ? 1 : -1); setIndex(i); }}
                            whileHover={{ scale: 1.4 }} />
                    ))}
                </div>
            </div>

            {/* Next arrow */}
            <motion.button className="ev-carousel-arrow ev-arrow-r" onClick={goNext}
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>›</motion.button>
        </div>
    );
};

/* ══════════════════ PAGE ══════════════════ */
const TechnicalPage = () => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState(null);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'carousel'

    return (
        <div className="tp-page">
            <CircuitBackground opacity={0.6} />
            <div className="circuit-overlay" />
            <div className="scan-line" />

            <Navbar />

            {/* Hero */}
            <section className="tp-hero">
                <motion.p className="tp-hero-tag" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                    VibECX-2K26
                </motion.p>
                <TypewriterText text="Technical Events" className="tp-hero-title" tag="h1" delay={0.3} stagger={0.06} />
                <motion.p className="tp-hero-sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
                    Tap any event to explore posters, rules, and details
                </motion.p>
                <motion.div className="tp-badge-row" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                    <div className="tp-badge"><span className="tp-badge-val">5</span><span className="tp-badge-lbl">Events</span></div>
                    <div className="tp-badge"><span className="tp-badge-val">Open</span><span className="tp-badge-lbl">For All</span></div>
                </motion.div>
            </section>

            {/* View mode toggle */}
            <div className="ev-section-header">
                <span className="ev-section-label">ALL EVENTS</span>
                <div className="ev-view-toggle">
                    <button className={`ev-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')}>
                        ▦ Grid
                    </button>
                    <button className={`ev-toggle-btn ${viewMode === 'carousel' ? 'active' : ''}`} onClick={() => setViewMode('carousel')}>
                        ▷ Showcase
                    </button>
                </div>
            </div>

            {/* Grid view */}
            {viewMode === 'grid' && (
                <section className="ev-grid">
                    {EVENTS.map(ev => (
                        <EventCard key={ev.number} event={ev} onClick={() => setSelected(ev)} />
                    ))}
                </section>
            )}

            {/* Carousel one-by-one view */}
            {viewMode === 'carousel' && (
                <EventCarousel
                    events={EVENTS}
                    onSelect={setSelected}
                    onRegister={() => navigate('/register')}
                />
            )}

            {/* CTA */}
            <motion.section className="tp-cta" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <TypewriterText text="Ready to Compete?" className="tp-cta-title" tag="h2" stagger={0.055} />
                <p className="tp-cta-sub">Register now and showcase your technical excellence at VibECX-2K26</p>
                <motion.button className="cta-primary" whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }} onClick={() => navigate('/register')}>
                    Register for Events
                </motion.button>
            </motion.section>

            <footer className="tp-footer-strip">
                <span>VibECX-2K26 · Dept of ECE · Suguna College of Engineering · March 11, 2026</span>
            </footer>

            <AnimatePresence>
                {selected && (
                    <EventDetail event={selected} onClose={() => setSelected(null)} onRegister={() => navigate('/register')} />
                )}
            </AnimatePresence>
        </div>
    );
};

export default TechnicalPage;
