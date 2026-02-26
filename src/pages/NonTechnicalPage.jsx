import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CircuitBackground from '../components/CircuitBackground';
import Navbar from '../components/Navbar';
import TypewriterText from '../components/TypewriterText';
import '../styles/TechnicalPage.css';

const EVENTS = [
    {
        number: '01', title: 'AD-MAD', icon: '📣', tag: 'Creative',
        description: 'Create a creative and humorous advertisement for a product given on the spot. Teams showcase creativity, teamwork, and presentation skills.',
        highlights: ['On-Spot Product', 'Team Event', 'Creative Skit', 'Audience Judging']
    },
    {
        number: '02', title: 'JAM', icon: '🎙️', tag: 'Speaking',
        description: 'Just A Minute — speak on a topic for exactly one minute without hesitation, repetition, or deviation.',
        highlights: ['1-Minute Format', 'No Repetition', 'No Hesitation', 'Quick Thinking']
    },
    {
        number: '03', title: 'E-Sports', icon: '🎮', tag: 'Gaming',
        description: 'Compete in an exciting gaming tournament featuring popular titles. Demonstrate reflexes, strategy, and gaming prowess.',
        highlights: ['Popular Titles', 'Knockout Rounds', 'Team & Solo', 'Live Streaming']
    },
    {
        number: '04', title: 'Talent Show', icon: '🌟', tag: 'Performance',
        description: 'Showcase your unique talent — singing, dancing, comedy, magic, or any art form. A stage to shine and captivate the audience.',
        highlights: ['Any Talent', 'Live Performance', 'Audience Vote', 'Open Stage']
    },
    {
        number: '05', title: 'Dumb Charades', icon: '🤫', tag: 'Team Fun',
        description: 'Act out movie names, songs, or phrases without speaking while your team guesses!',
        highlights: ['Silent Acting', 'Team Guessing', 'Movies & Songs', 'Time Limit']
    },
];

const fadeUp = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.65 } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const cardVariant = { hidden: { opacity: 0, x: 30, scale: 0.97 }, show: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.6 } } };

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

const NonTechnicalPage = () => (
    <div className="tp-page">
        <CircuitBackground />
        <div className="circuit-overlay" />
        <div className="scan-line" />
        <div className="hud-corner tl" /><div className="hud-corner tr" />
        <div className="hud-corner bl" /><div className="hud-corner br" />

        <Navbar />

        <motion.section className="tp-hero" variants={fadeUp} initial="hidden" animate="show">
            <motion.p className="tp-hero-tag" variants={fadeUp}>VibECX-2K26</motion.p>
            <TypewriterText text="Non-Technical Events" className="tp-hero-title" tag="h1" delay={0.3} stagger={0.055}
                style={{ color: '#ff9d00', textShadow: '0 0 30px rgba(255,157,0,0.6)' }} />
            <motion.p className="tp-hero-sub" variants={fadeUp}>
                Fun, creativity, and talent — beyond the circuit board!
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
            <TypewriterText text="Ready to Have Fun?" className="tp-cta-title" tag="h2" stagger={0.055} />
            <p className="tp-cta-sub">Register now and show your talent at VibECX-2K26</p>
            <motion.button className="cta-primary" whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}>Register for Events</motion.button>
        </motion.section>

        <footer className="tp-footer-strip">
            <span>VibECX-2K26 · Dept of ECE · Suguna College of Engineering · March 11, 2026</span>
        </footer>
    </div>
);

export default NonTechnicalPage;
