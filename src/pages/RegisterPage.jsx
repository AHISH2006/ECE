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
    const [form, setForm] = useState({ name: '', college: '', email: '', phone: '', event: '', team: '' });
    const [submitted, setSubmitted] = useState(false);
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };

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

            <motion.section className="reg-section" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
                {submitted ? (
                    <motion.div className="reg-success" variants={fadeUp}>
                        <div className="reg-success-icon">✅</div>
                        <TypewriterText text="Registration Received!" className="reg-success-title" tag="h2" stagger={0.055} />
                        <p className="reg-success-sub">
                            Thank you for registering for VibECX-2K26.<br />We'll reach out to you shortly.
                        </p>
                        <span className="card-corner tl" /><span className="card-corner tr" />
                        <span className="card-corner bl" /><span className="card-corner br" />
                    </motion.div>
                ) : (
                    <motion.form className="reg-form" onSubmit={handleSubmit} variants={fadeUp}>
                        <h2 className="reg-form-title">Participant Details</h2>
                        <div className="reg-grid">
                            <div className="reg-field">
                                <label className="reg-label">Full Name *</label>
                                <input className="reg-input" name="name" value={form.name} onChange={handleChange} placeholder="Enter your name" required />
                            </div>
                            <div className="reg-field">
                                <label className="reg-label">College Name *</label>
                                <input className="reg-input" name="college" value={form.college} onChange={handleChange} placeholder="Your college" required />
                            </div>
                            <div className="reg-field">
                                <label className="reg-label">Email Address *</label>
                                <input className="reg-input" type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@email.com" required />
                            </div>
                            <div className="reg-field">
                                <label className="reg-label">Phone Number *</label>
                                <input className="reg-input" type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="10-digit mobile" required />
                            </div>
                            <div className="reg-field">
                                <label className="reg-label">Event *</label>
                                <select className="reg-input" name="event" value={form.event} onChange={handleChange} required>
                                    <option value="">Select an event</option>
                                    <optgroup label="Technical Events">
                                        {ALL_EVENTS.slice(0, 5).map(e => <option key={e} value={e}>{e}</option>)}
                                    </optgroup>
                                    <optgroup label="Non-Technical Events">
                                        {ALL_EVENTS.slice(5).map(e => <option key={e} value={e}>{e}</option>)}
                                    </optgroup>
                                </select>
                            </div>
                            <div className="reg-field">
                                <label className="reg-label">Team Name (if applicable)</label>
                                <input className="reg-input" name="team" value={form.team} onChange={handleChange} placeholder="Leave blank for solo" />
                            </div>
                        </div>
                        <motion.button className="reg-submit cta-primary" type="submit" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                            Submit Registration
                        </motion.button>
                        <span className="card-corner tl" /><span className="card-corner tr" />
                        <span className="card-corner bl" /><span className="card-corner br" />
                    </motion.form>
                )}
            </motion.section>

            <footer className="tp-footer-strip">
                <span>VibECX-2K26 · Dept of ECE · Suguna College of Engineering · March 11, 2026</span>
            </footer>
        </div>
    );
};

export default RegisterPage;
