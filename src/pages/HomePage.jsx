import React, { useState, useEffect } from 'react';

/* ── Countdown Timer ── */
const CountdownTimer = ({ targetDate }) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(targetDate) - +new Date();
        if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60)
        };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearInterval(timer);
    }, [targetDate]);

    const format = (num) => num.toString().padStart(2, '0');

    return (
        <motion.div
            className="hp-timer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
        >
            <div className="hp-timer-box">
                <span className="hp-timer-val">{format(timeLeft.days)}</span>
                <span className="hp-timer-lbl">Days</span>
            </div>
            <span className="hp-timer-sep">:</span>
            <div className="hp-timer-box">
                <span className="hp-timer-val">{format(timeLeft.hours)}</span>
                <span className="hp-timer-lbl">Hours</span>
            </div>
            <span className="hp-timer-sep">:</span>
            <div className="hp-timer-box">
                <span className="hp-timer-val">{format(timeLeft.minutes)}</span>
                <span className="hp-timer-lbl">Mins</span>
            </div>
            <span className="hp-timer-sep">:</span>
            <div className="hp-timer-box">
                <span className="hp-timer-val">{format(timeLeft.seconds)}</span>
                <span className="hp-timer-lbl">Secs</span>
            </div>
        </motion.div>
    );
};
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
// import CircuitBackground from '../components/CircuitBackground'; (Moved to App.jsx)
import Navbar from '../components/Navbar';
import TypewriterText from '../components/TypewriterText';
import '../styles/HomePage.css';

/* ── Animation variants ── */
const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};
const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
};
const cardAnim = {
    hidden: { opacity: 0, y: 30, scale: 0.96 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6 } },
};

/* ── Stat Card ── */
const StatCard = ({ value, label }) => (
    <motion.div className="stat-card" variants={cardAnim}>
        <span className="stat-card-value">{value}</span>
        <span className="stat-card-label">{label}</span>
        <span className="card-corner tl" /><span className="card-corner tr" />
        <span className="card-corner bl" /><span className="card-corner br" />
    </motion.div>
);

/* ── Event Section Card ── */
const EventCard = ({ icon, title, events, onTitleClick, onListItemClick }) => (
    <motion.div className="event-section-card" variants={cardAnim} whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}>
        <div className="event-section-icon">{icon}</div>
        <h3 className="event-section-title" onClick={onTitleClick} style={{ cursor: 'pointer' }}>{title}</h3>
        <ul className="event-section-list">
            {events.map((e, i) => (
                <li key={i} onClick={onListItemClick} className="cursor-pointer hover:text-cyan-400 transition-colors">
                    <span className="ev-arrow">›</span>{e}
                </li>
            ))}
        </ul>
        <button className="event-section-btn" onClick={onTitleClick}>View All</button>
        <span className="card-corner tl" /><span className="card-corner tr" />
        <span className="card-corner bl" /><span className="card-corner br" />
    </motion.div>
);

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="hp-page">
            {/* <CircuitBackground /> (Now global in App.jsx) */}
            <div className="circuit-overlay" />
            <div className="scan-line" />
            <div className="hud-corner tl" /><div className="hud-corner tr" />
            <div className="hud-corner bl" /><div className="hud-corner br" />

            <Navbar />

            {/* ── HERO ── */}
            <motion.section className="sec sec-hero" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
                <motion.div className="hero-college-block" variants={fadeUp}>
                    <TypewriterText text="Suguna College of Engineering" className="hero-college-name" tag="p" stagger={0.04} />
                </motion.div>

                <motion.div className="hero-presents" variants={fadeUp}>
                    <span className="presents-line" />
                    <span className="presents-text">Proudly Presents</span>
                    <span className="presents-line" />
                </motion.div>

                {/* Title */}
                <motion.h1 className="hero-title" variants={fadeUp}>
                    VibECX-2K26
                </motion.h1>

                <motion.p className="hero-tagline" variants={fadeUp}>
                    The Ultimate ECE Symposium — Where Innovation Meets Excellence
                </motion.p>

                <motion.div className="hero-venue" variants={fadeUp}>
                    <span className="venue-icon">📍</span>
                    <div className="venue-info">
                        <span className="venue-label">VENUE &amp; DATE</span>
                        <span className="venue-detail">
                            Suguna College of Engineering, Coimbatore&nbsp;·&nbsp;
                            <strong>March 11, 2026</strong>
                        </span>
                    </div>
                </motion.div>

                <motion.div className="hero-ctas" variants={fadeUp}>
                    <motion.button
                        className="cta-primary"
                        whileHover={{ scale: 1.06 }}
                        whileTap={{ scale: 0.94 }}
                        onClick={() => navigate("/register")}
                    >
                        Register Now
                    </motion.button>
                    <motion.button
                        className="cta-secondary"
                        whileHover={{ scale: 1.06 }}
                        whileTap={{ scale: 0.94 }}
                        onClick={() => {
                            const eventsSection = document.querySelector('.sec-events');
                            eventsSection?.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        Explore Events
                    </motion.button>
                </motion.div>

                <CountdownTimer targetDate="2026-03-11T09:00:00" />

                <div className="hero-glow-box" />
            </motion.section>

            {/* ── EVENTS ── */}
            <motion.section className="sec sec-events" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
                <TypewriterText text="What Awaits You" className="sec-heading" tag="h2" stagger={0.055} />
                <motion.p className="sec-subheading" variants={fadeUp}>
                    Compete, innovate, and showcase your talent across 10+ exciting events
                </motion.p>
                <div className="events-grid">
                    <EventCard
                        icon="⚡"
                        title="Technical Events"
                        events={['Paper Presentation', 'PCB Design Contest', 'Quiz Master', 'Technical CrossCode', 'Tech Talk | Pick & Talk']}
                        onTitleClick={() => navigate('/technical')}
                        onListItemClick={() => navigate('/technical')}
                    />
                    <EventCard
                        icon="🎭"
                        title="Non-Technical Events"
                        events={['AD-MAD', 'JAM', 'E-Sports', 'Talent Show', 'Dumb Charades']}
                        onTitleClick={() => navigate('/non-technical')}
                        onListItemClick={() => navigate('/non-technical')}
                    />
                </div>
            </motion.section>

            
        </div>
    );
};

export default HomePage;