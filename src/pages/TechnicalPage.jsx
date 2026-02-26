import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CircuitBackground from '../components/CircuitBackground';
import Navbar from '../components/Navbar';
import TypewriterText from '../components/TypewriterText';
import '../styles/TechnicalPage.css';

const EVENTS = [
    {
        number: '01', title: 'Paper Presentation', icon: '📄', tag: 'Research',
        description: 'Students present research papers on emerging ECE trends like 5G/6G, VLSI, AI in Signal Processing, and Green Electronics.',
        highlights: ['5G / 6G Technologies', 'VLSI Design', 'AI in Signal Processing', 'Green Electronics']
    },
    {
        number: '02', title: 'PCB Design Layout', icon: '🔌', tag: 'Design',
        description: 'Design a Printed Circuit Board (PCB) layout for a given schematic using software like Eagle, KiCad, or Altium.',
        highlights: ['Eagle / KiCad / Altium', 'Schematic to Layout', 'DRC & Trace Routing', 'Component Placement']
    },
    {
        number: '03', title: 'Technical Crosscode', icon: '🧩', tag: 'Puzzle',
        description: 'A fun puzzle where all clues and answers are related to electronics, semiconductors, and physics.',
        highlights: ['Electronics Fundamentals', 'Semiconductor Theory', 'Physics-based Clues', 'Team Strategy']
    },
    {
        number: '04', title: 'Tech Talk / Pic & Talk', icon: '🎤', tag: 'Presentation',
        description: 'Participants pick a technical topic on the spot and must deliver a 3-minute speech on it.',
        highlights: ['Impromptu Speaking', '3-Minute Format', 'Technical Depth', 'Communication Skills']
    },
    {
        number: '05', title: 'Quiz Master', icon: '🏆', tag: 'Quiz',
        description: 'A fast-paced quiz covering electronics, communication, and physics with buzzer rounds, rapid fire, and more.',
        highlights: ['Multiple Rounds', 'Rapid Fire Format', 'Buzzer Rounds', 'Team & Individual']
    },
];

const fadeUp = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.65 } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const cardVariant = { hidden: { opacity: 0, x: -30, scale: 0.97 }, show: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.6 } } };

const EventCard = ({ event }) => {
    const [hovered, setHovered] = useState(false);
    return (
        <motion.div className={`tech-card ${hovered ? 'hovered' : ''}`} variants={cardVariant}
            onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
            whileHover={{ y: -6 }} transition={{ duration: 0.25 }}>
            <span className="tech-card-num">{event.number}</span>
            <div className="tech-card-header">
                <span className="tech-card-icon">{event.icon}</span>
                <div>
                    <span className="tech-card-tag">{event.tag}</span>
                    <h3 className="tech-card-title">{event.title}</h3>
                </div>
            </div>
            <div className="tech-card-divider">
                <motion.span className="tech-card-divider-fill" initial={{ scaleX: 0 }} animate={{ scaleX: hovered ? 1 : 0 }} transition={{ duration: 0.4 }} />
            </div>
            <p className="tech-card-desc">{event.description}</p>
            <ul className="tech-card-highlights">
                {event.highlights.map((h, i) => <li key={i}><span className="highlight-dot" />{h}</li>)}
            </ul>
            <motion.button className="tech-card-btn" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Register Now</motion.button>
            <span className="card-corner tl" /><span className="card-corner tr" />
            <span className="card-corner bl" /><span className="card-corner br" />
        </motion.div>
    );
};

const TechnicalPage = () => (
    <div className="tp-page">
        <CircuitBackground />
        <div className="circuit-overlay" />
        <div className="scan-line" />
        <div className="hud-corner tl" /><div className="hud-corner tr" />
        <div className="hud-corner bl" /><div className="hud-corner br" />

        <Navbar />

        <motion.section className="tp-hero" variants={fadeUp} initial="hidden" animate="show">
            <motion.p className="tp-hero-tag" variants={fadeUp}>VibECX-2K26</motion.p>
            <TypewriterText text="Technical Events" className="tp-hero-title" tag="h1" delay={0.3} stagger={0.06} />
            <motion.p className="tp-hero-sub" variants={fadeUp}>
                Showcase your technical prowess in these cutting-edge competitions
            </motion.p>
            <motion.div className="tp-badge-row" variants={fadeUp}>
                <div className="tp-badge"><span className="tp-badge-val">5</span><span className="tp-badge-lbl">Events</span></div>
                <div className="tp-badge"><span className="tp-badge-val">Open</span><span className="tp-badge-lbl">For All</span></div>
            </motion.div>
        </motion.section>

        <motion.section className="tp-events" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
            {EVENTS.map((event) => <EventCard key={event.number} event={event} />)}
        </motion.section>

        <motion.section className="tp-cta" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <TypewriterText text="Ready to Compete?" className="tp-cta-title" tag="h2" stagger={0.055} />
            <p className="tp-cta-sub">Register now and showcase your technical excellence at VibECX-2K26</p>
            <motion.button className="cta-primary" whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}>Register for Events</motion.button>
        </motion.section>

        <footer className="tp-footer-strip">
            <span>VibECX-2K26 · Dept of ECE · Suguna College of Engineering · March 11, 2026</span>
        </footer>
    </div>
);

export default TechnicalPage;
