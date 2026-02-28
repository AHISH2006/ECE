import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import '../styles/GlowingEventCard.css';

const GlowingEventCard = ({ event, onClick }) => {
    const wrapperRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!wrapperRef.current) return;
        const rect = wrapperRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        wrapperRef.current.style.setProperty('--x', `${x}px`);
        wrapperRef.current.style.setProperty('--y', `${y}px`);
    };

    return (
        <motion.div
            ref={wrapperRef}
            className="glow-wrapper cursor-target"
            style={{
                '--accent': event.accent,
                '--accent-transparent': `color-mix(in srgb, ${event.accent} 20%, transparent)`
            }}
            onMouseMove={handleMouseMove}
            onClick={onClick}
            whileHover={{ y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
        >
            <div className="glow-card">
                <div className="glow-card-content">
                    {/* Poster thumbnail */}
                    <div className="ev-card-poster">
                        <img src={event.poster} alt={event.title} />
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
                </div>
            </div>
        </motion.div>
    );
};

export default GlowingEventCard;
