import React from 'react';
import { motion } from 'framer-motion';
import CircuitBackground from '../components/CircuitBackground';
import Navbar from '../components/Navbar';
import TypewriterText from '../components/TypewriterText';
import '../styles/TechnicalPage.css';
import '../styles/RegisterPage.css';

const fadeUp = { hidden: { opacity: 0, y: 36 }, show: { opacity: 1, y: 0, transition: { duration: 0.65 } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.14 } } };
const cardVar = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.55 } } };

const ContactPage = () => (
    <div className="tp-page">
        <CircuitBackground />
        <div className="circuit-overlay" />
        <div className="scan-line" />
        <div className="hud-corner tl" /><div className="hud-corner tr" />
        <div className="hud-corner bl" /><div className="hud-corner br" />

        <Navbar />

        <motion.section className="tp-hero" variants={fadeUp} initial="hidden" animate="show">
            <motion.p className="tp-hero-tag" variants={fadeUp}>VibECX-2K26</motion.p>
            <TypewriterText text="Contact Us" className="tp-hero-title" tag="h1" delay={0.3} stagger={0.07} />
            <motion.p className="tp-hero-sub" variants={fadeUp}>
                Reach out for any queries about events, registration, or the symposium
            </motion.p>
        </motion.section>

        <motion.section className="contact-page-section" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            {/* Faculty card */}
            <motion.div className="contact-page-card" variants={cardVar}>
                <p className="contact-card-role">Faculty Co-ordinator</p>
                <h3 className="contact-card-name">Mr. Idayavan. S M.E</h3>
                <p className="contact-card-post">Assistant Professor — ECE</p>
                <a className="contact-card-phone" href="tel:9488846518">📞 9488846518</a>
                <span className="card-corner tl" /><span className="card-corner tr" />
                <span className="card-corner bl" /><span className="card-corner br" />
            </motion.div>

            {/* Venue + socials */}
            <motion.div className="contact-page-info" variants={cardVar}>
                <h3 className="contact-info-title">📍 Venue</h3>
                <p className="contact-info-line">Suguna College of Engineering</p>
                <p className="contact-info-line">Nehru Nagar (W), Kalapatti Road</p>
                <p className="contact-info-line">Coimbatore — 641014, Tamil Nadu</p>

                <h3 className="contact-info-title" style={{ marginTop: 20 }}>📅 Date</h3>
                <p className="contact-info-line"><strong style={{ color: '#00e5ff' }}>March 11, 2026</strong></p>

                <h3 className="contact-info-title" style={{ marginTop: 20 }}>📸 Instagram</h3>
                <a className="contact-card-phone" href="https://www.instagram.com/vibecx__2k26" target="_blank" rel="noreferrer">
                    @vibecx__2k26
                </a>
                <span className="card-corner tl" /><span className="card-corner tr" />
                <span className="card-corner bl" /><span className="card-corner br" />
            </motion.div>
        </motion.section>

        <footer className="tp-footer-strip">
            <span>VibECX-2K26 · Dept of ECE · Suguna College of Engineering · March 11, 2026</span>
        </footer>
    </div>
);

export default ContactPage;
