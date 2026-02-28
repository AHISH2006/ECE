import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlowingEventCard from './GlowingEventCard';
import '../styles/CardFlowSlider.css';

const CardFlowSlider = ({ events, onSelect }) => {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(1);

    const ev = events[index];

    const nextCard = () => {
        setDirection(1);
        setIndex((prev) => (prev + 1) % events.length);
    };

    const prevCard = () => {
        setDirection(-1);
        setIndex((prev) => (prev - 1 + events.length) % events.length);
    };

    const variants = {
        enter: (dir) => ({
            rotateY: dir > 0 ? 90 : -90,
            opacity: 0,
            scale: 0.8,
        }),
        center: {
            rotateY: 0,
            opacity: 1,
            scale: 1,
        },
        exit: (dir) => ({
            rotateY: dir > 0 ? -90 : 90,
            opacity: 0,
            scale: 0.8,
        })
    };

    return (
        <div className="cflow-container">
            <div className="cflow-stage">
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={index}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.6, type: 'spring', stiffness: 120, damping: 20 }}
                        className="cflow-card-wrapper"
                    >
                        <GlowingEventCard event={ev} onClick={() => onSelect(ev)} />
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="cflow-controls">
                <button className="cflow-btn" onClick={prevCard}>
                    <svg viewBox="0 0 100 100" className="arc-icon" style={{ '--accent': ev.accent }}>
                        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray="60 40" />
                        <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="30 20" />
                        <path d="M 60 50 L 45 40 L 45 60 Z" fill="currentColor" transform="rotate(180 50 50)" />
                    </svg>
                </button>

                <div className="cflow-indicators">
                    {events.map((_, i) => (
                        <div
                            key={i}
                            className={`cflow-dot ${i === index ? 'active' : ''}`}
                            style={{ background: i === index ? ev.accent : 'rgba(255,255,255,0.2)' }}
                            onClick={() => {
                                setDirection(i > index ? 1 : -1);
                                setIndex(i);
                            }}
                        />
                    ))}
                </div>

                <button className="cflow-btn" onClick={nextCard}>
                    <svg viewBox="0 0 100 100" className="arc-icon" style={{ '--accent': ev.accent }}>
                        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray="60 40" />
                        <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="30 20" />
                        <path d="M 60 50 L 45 40 L 45 60 Z" fill="currentColor" />
                    </svg>
                </button>
            </div>

            <motion.div
                className="cflow-hint"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
            >
                <motion.span
                    animate={{ x: [-5, 5, -5] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="cflow-hint-arrow"
                    style={{ color: ev.accent }}
                >
                    ᐊ
                </motion.span>
                <span className="cflow-hint-text">Use Arc Rings to Rotate</span>
                <motion.span
                    animate={{ x: [5, -5, 5] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="cflow-hint-arrow"
                    style={{ color: ev.accent }}
                >
                    ᐅ
                </motion.span>
            </motion.div>
        </div>
    );
};

export default CardFlowSlider;
