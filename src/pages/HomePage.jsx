import React from 'react';
import { motion } from 'framer-motion';
import CircuitBackground from '../components/CircuitBackground';
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
const EventCard = ({ icon, title, events }) => (
    <motion.div className="event-section-card" variants={cardAnim} whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}>
        <div className="event-section-icon">{icon}</div>
        <h3 className="event-section-title">{title}</h3>
        <ul className="event-section-list">
            {events.map((e, i) => (
                <li key={i}><span className="ev-arrow">›</span>{e}</li>
            ))}
        </ul>
        <button className="event-section-btn">View Events</button>
        <span className="card-corner tl" /><span className="card-corner tr" />
        <span className="card-corner bl" /><span className="card-corner br" />
    </motion.div>
);

const HomePage = () => (
    <div className="hp-page">
        <CircuitBackground />
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
                <motion.button className="cta-primary" whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}>
                    Register Now
                </motion.button>
                <motion.button className="cta-secondary" whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}>
                    Explore Events
                </motion.button>
            </motion.div>

            <div className="hero-glow-box" />
        </motion.section>




        {/* ── EVENTS ── */}
        <motion.section className="sec sec-events" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
            <TypewriterText text="What Awaits You" className="sec-heading" tag="h2" stagger={0.055} />
            <motion.p className="sec-subheading" variants={fadeUp}>
                Compete, innovate, and showcase your talent across 10+ exciting events
            </motion.p>
            <div className="events-grid">
                <EventCard icon="⚡" title="Technical Events"
                    events={['Paper Presentation', 'PCB Design Contest', 'Quiz Master', 'Technical CrossCode', 'Tech Talk | Pick & Talk']} />
                <EventCard icon="🎭" title="Non-Technical Events"
                    events={['AD-MAD', 'JAM', 'E-Sports', 'Talent Show', 'Dumb Charades']} />
            </div>
        </motion.section>



        {/* ── FOOTER ── */}
        <footer className="site-footer">
            <div className="footer-brand">
                <span className="footer-title">VibECX-2K26</span>
                <span className="footer-sub">Department of Electronics and Communication</span>
                <span className="footer-college">Suguna College of Engineering</span>
            </div>
            <div className="footer-links">
                <h4 className="footer-links-title">Quick Links</h4>
                <ul>
                    {['Home', 'Technical', 'Non-Technical', 'Register', 'Contact'].map((l) => (
                        <li key={l}><button className="footer-link">{l}</button></li>
                    ))}
                </ul>
            </div>
            <div className="footer-contact">
                <h4 className="footer-links-title">Contact</h4>
                <p className="footer-contact-name">Faculty Co-ordinator</p>
                <p>Mr. Idayavan. S M.E</p>
                <p>Assistant Professor-ECE</p>
                <a href="tel:9488846518" className="footer-phone">📞 9488846518</a>
            </div>
        </footer>
    </div>
);

export default HomePage;