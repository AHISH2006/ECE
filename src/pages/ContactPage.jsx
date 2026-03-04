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

const STAFF_COORDINATORS = [
    { role: 'Convenor', name: 'PROF. Anandakumar. K - M.E', post: 'HEAD OF THE DEPARTMENT ELECTRONICS COMMUNICATION AND ENGINEERING' },
    { role: 'Faculty Co-ordinator', name: 'PROF. Idayavan. S - M.E', post: 'Assistant Professor-ECE', phone: '9488846518' },
];

const STUDENT_COORDINATORS = [
    { role: 'Student Co-ordinator', name: 'Sakthikrishnan. S', phone: '8838204730' },
    { role: 'Student Co-ordinator', name: 'Manosri. S.V', phone: '9449143918' },
    { role: 'Student Co-ordinator', name: 'Ayyanar', phone: '7397057124' },
];

const ContactPage = () => (
    <div className="tp-page">
        <CircuitBackground />
        <div className="circuit-overlay" />
        <div className="scan-line" />
        <div className="hud-corner tl" /><div className="hud-corner tr" />
        <div className="hud-corner bl" /><div className="hud-corner br" />

        <Navbar />

        {/* Hero */}
        <motion.section className="tp-hero" variants={fadeUp} initial="hidden" animate="show">
            <motion.p className="tp-hero-tag" variants={fadeUp}>Suguna College of Engineering</motion.p>
            <TypewriterText text="Contact Us" className="tp-hero-title" tag="h1" delay={0.3} stagger={0.07} />
            <motion.p className="tp-hero-sub" variants={fadeUp}>
                Department of Electronics and Communication Engineering<br />
                Coimbatore, Tamil Nadu, India
            </motion.p>
        </motion.section>

        {/* Staff Coordinators */}
        <motion.section className="contact-page-section" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.h2 className="contact-section-title" variants={fadeUp}>— Staff Co-ordinators —</motion.h2>
            <div className="contact-grid-wrap">
                {STAFF_COORDINATORS.map((c, i) => (
                    <motion.div key={i} className="contact-page-card" variants={cardVar}>
                        <p className="contact-card-role">{c.role}</p>
                        <h3 className="contact-card-name">{c.name}</h3>
                        <p className="contact-card-post">{c.post}</p>
                        {c.phone && <a className="contact-card-phone" href={`tel:${c.phone}`}>📞 {c.phone}</a>}
                        <span className="card-corner tl" /><span className="card-corner tr" />
                        <span className="card-corner bl" /><span className="card-corner br" />
                    </motion.div>
                ))}
            </div>
        </motion.section>

        {/* Student Coordinators */}
        <motion.section className="contact-page-section" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.h2 className="contact-section-title" variants={fadeUp}>— Student Co-ordinators —</motion.h2>
            <div className="contact-grid-wrap">
                {STUDENT_COORDINATORS.map((c, i) => (
                    <motion.div key={i} className="contact-page-card" variants={cardVar}>
                        <p className="contact-card-role">{c.role}</p>
                        <h3 className="contact-card-name">{c.name}</h3>
                        <a className="contact-card-phone" href={`tel:${c.phone}`}>📞 {c.phone}</a>
                        <span className="card-corner tl" /><span className="card-corner tr" />
                        <span className="card-corner bl" /><span className="card-corner br" />
                    </motion.div>
                ))}
            </div>
        </motion.section>

        {/* General Enquiries & info */}
        <motion.section className="contact-page-section" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <div className="contact-grid-wrap">
                <motion.div className="contact-page-info" variants={cardVar}>
                    <h3 className="contact-info-title">General Enquiries</h3>
                    <p className="contact-info-line">For general event information and registration queries</p>
                    <p className="contact-info-line" style={{ marginTop: 10 }}>
                        Contact the Faculty Co-ordinator:<br/> <a className="contact-card-phone" href="tel:9488846518 " style={{ color: '#00e5ff', textDecoration: 'none' }}>📞 9488846518</a>
                         <a className="contact-card-phone" href="tel:8838204730 " style={{ color: '#00e5ff', textDecoration: 'none' }}>📞 8838204730</a>
                    </p>
                    <span className="card-corner tl" /><span className="card-corner tr" />
                    <span className="card-corner bl" /><span className="card-corner br" />
                </motion.div>

                <motion.div className="contact-page-info" variants={cardVar}>
                    <h3 className="contact-info-title">📍 Venue & Socials</h3>
                    <p className="contact-info-line">Suguna College of Engineering</p>
                    <p className="contact-info-line">Nehru Nagar (W), Kalapatti Road</p>
                    <p className="contact-info-line">Coimbatore — 641014</p>
                    <div style={{ marginTop: 20 }}>
                        <h3 className="contact-info-title">📸 Instagram</h3>
                        <a className="contact-card-phone" href="https://www.instagram.com/vibecx__2k26" target="_blank" rel="noreferrer">@vibecx__2k26</a>
                    </div>
                    <span className="card-corner tl" /><span className="card-corner tr" />
                    <span className="card-corner bl" /><span className="card-corner br" />
                </motion.div>
            </div>
        </motion.section>
        <footer className="tp-footer-strip">
            <span>VibECX-2K26 · Dept of ECE · Suguna College of Engineering · March 11, 2026</span>
        </footer>
    </div>
);

export default ContactPage;
