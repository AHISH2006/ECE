import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import TypewriterText from '../components/TypewriterText';
import CircuitBackground from '../components/CircuitBackground';
import GlowingEventCard from '../components/GlowingEventCard';
import CardFlowSlider from '../components/CardFlowSlider';
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
        description: 'Participants can choose topics related to ECE or any other innovative topic. Topics include: 5G and Future Communication Technology, Internet of Things (IoT) in Smart Homes, Artificial Intelligence in Electronics, Wireless Power Transfer, Robotics in Modern Engineering, Embedded Systems in Daily Life, Smart Cities using IoT, Satellite Communication Systems, Autonomous Vehicles Technology, Green Energy and Smart Grids, 6G Communication, Blockchain Technology, Cybersecurity, Augmented Reality (AR), Virtual Reality (VR), Edge Computing in IoT, Applications of Sensors, Role of Electronics in Healthcare, Smart Traffic Management System, Wearable Technology, Drone Technology, Climate Change, AI in Education, Space Exploration, Women Empowerment, Cyber Safety, Entrepreneurship, Social Media Impact, Sustainable Development, and Mental Health Awareness.',
        highlights: [],
        rules: [
            'Team Size: Each team can have 2 to 4 members only.',
            'Presentation Time: The maximum time allowed is 4 minutes for each team.',
            'Submission: The presentation slides (PPT) must be sent to the given Gmail ID before the event.',
            'Topic: ECE related or any other innovative topics.',
            'Slides Limit: The presentation should contain a maximum of 7 slides.',
            'Time Management: Participants must strictly follow the given time limit.',
            'Judging Criteria: Content Quality, Creativity, Technical Knowledge, and Presentation Skills',
            'Decision: The judges\' decision will be final.'
        ],
    },
    {
        number: '02',
        title: 'Tech Talk',
        icon: '🎤',
        tag: 'Presentation',
        accent: '#ff8800',
        poster: posterTechtalk,
        description: 'An on-time speech related to Electronics/Engineering. Must include Introduction, Topic Definition, Explanation, Great Achievements, Conclusion, and a Quote.',
        highlights: ['Semiconductor Growth', 'IC Manufacturing', 'Tech in Agriculture', 'Quantum Computing'],
        rules: ['Individual performance', '5 mins prep (mobile allowed)', '3 minutes performance time'],

    },
    {
        number: '03',
        title: 'PCB Design Contest',
        icon: '🔌',
        tag: 'Design',
        accent: '#00ff88',
        poster: posterPcb,
        description: 'A two-level design challenge: Level 1 (Schematic Drafting) involves recreating a provided circuit diagram, and Level 2 (PCB Layout & 3D Visualization) involves component identification and 3D rendering.',
        highlights: [
            'Round 1: Schematic Drafting (25 Mins)',
            'Round 2: PCB Layout & 3D Rendering (15 Mins)',
            'Level 1: Schematic Design',
            'Level 2: Layout & 3D Visualization'
        ],
        rules: [
            'Accuracy: Strictly follow the provided circuit diagram',
            'Equipment: Participants must bring their own laptops',
            'Prohibitions: Use of mobile phones is strictly prohibited',
            'Deadlines: Submissions must be within the allotted time',
            'Finality: Judges\' decision is final and binding'
        ],
    },
    {
        number: '04',
        title: 'Quiz Master',
        icon: '🏆',
        tag: 'Quiz',
        accent: '#ffd700',
        poster: posterQuiz,
        description: 'A challenge covering Engineering and Electronics, including electronics symbols, semiconductor developments, motor types, IC types, and identification.',
        highlights: ['Electronics Symbols', 'Semiconductor Updates', 'Motor & IC Types', 'Picture Identification'],
        rules: ['Individual or Team of 2-3', '30 minutes total time', 'No mobile phones allowed', 'Time limit per question'],

    },
    {
        number: '05',
        title: 'Tech Cross Code',
        icon: '💻',
        tag: 'Coding',
        accent: '#bf00ff',
        poster: posterCrosscode,
        description: 'A two-round coding challenge: Round 1 (The Debugging Sprint) focuses on identifying and fixing errors in Embedded C, and Round 2 (The Creative Completion) involves completing a half-finished snippet with your own unique logic.',
        highlights: [
            'Round 1: Debugging Sprint (15 Mins)',
            'Round 2: Creative Completion (15 Mins)',
            'Embedded C Focus',
            'Logical & Syntax Errors',
            'Functional Efficiency'
        ],
        rules: [
            'Team Size: Maximum of 2 members (Individual allowed)',
            'Requirement: Bring your own laptops & preferred IDE',
            'Connectivity: WiFi will be provided at the venue',
            'Progression: Must complete Round 1 to qualify for Round 2',
            'Judging: Based on accuracy, functionality, and speed',
            'Strictly no mobile phones or AI assistants allowed'
        ],
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

/* ── Event grid card (Moved to GlowingEventCard.jsx) ── */

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
                    {event.highlights && event.highlights.length > 0 && (
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
                    )}

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

                            {ev.highlights && ev.highlights.length > 0 && (
                                <div className="ev-carousel-chips">
                                    {ev.highlights.map((h, i) => (
                                        <span key={i} className="ev-carousel-chip"
                                            style={{ borderColor: ev.accent + '55', color: ev.accent + 'dd' }}>
                                            {h}
                                        </span>
                                    ))}
                                </div>
                            )}

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

const TechnicalPage = () => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState(null);

    return (
        <div className="tp-page">
            <CircuitBackground opacity={0.6} />
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

            <div style={{ marginTop: '-10px', marginBottom: '10px' }}>
                <CardFlowSlider events={EVENTS} onSelect={setSelected} />
            </div>

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
