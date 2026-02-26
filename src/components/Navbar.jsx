import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/Navbar.css';

const NAV_ITEMS = [
    { label: 'Home', path: '/home' },
    { label: 'Technical', path: '/technical' },
    { label: 'Non-Technical', path: '/non-technical' },
   { label: 'Contact', path: '/contact' },
    { label: 'Register', path: '/register', highlight: true },
];

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [open, setOpen] = useState(false);

    const go = (path) => { navigate(path); setOpen(false); };

    return (
        <nav className="snav">
            {/* Brand */}
            <button className="snav-brand" onClick={() => go('/home')}>
                <span className="snav-brand-title">VIBECX-2K26</span>
                <span className="snav-brand-sub">ECE · SUGUNA</span>
            </button>

            {/* Desktop links */}
            <ul className="snav-links">
                {NAV_ITEMS.map(({ label, path, highlight }) => {
                    const active = location.pathname === path;
                    return (
                        <li key={path}>
                            <button
                                className={`snav-link ${active ? 'active' : ''} ${highlight ? 'snav-link--register' : ''}`}
                                onClick={() => go(path)}
                            >
                                {label}
                                {active && (
                                    <motion.span
                                        className="snav-link-indicator"
                                        layoutId="nav-indicator"
                                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </button>
                        </li>
                    );
                })}
            </ul>



            {/* Hamburger */}
            <button
                className={`snav-hamburger ${open ? 'open' : ''}`}
                onClick={() => setOpen(!open)}
                aria-label="Toggle menu"
            >
                <span /><span /><span />
            </button>

            {/* Mobile dropdown */}
            <AnimatePresence>
                {open && (
                    <motion.ul
                        className="snav-mobile"
                        initial={{ opacity: 0, y: -8, scaleY: 0.95 }}
                        animate={{ opacity: 1, y: 0, scaleY: 1 }}
                        exit={{ opacity: 0, y: -8, scaleY: 0.95 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        style={{ transformOrigin: 'top' }}
                    >
                        {NAV_ITEMS.map(({ label, path, highlight }, i) => {
                            const active = location.pathname === path;
                            return (
                                <motion.li
                                    key={path}
                                    initial={{ opacity: 0, x: -16 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    <button
                                        className={`snav-mobile-link ${active ? 'active' : ''} ${highlight ? 'snav-mobile-link--register' : ''}`}
                                        onClick={() => go(path)}
                                    >
                                        {label}
                                    </button>
                                </motion.li>
                            );
                        })}

                    </motion.ul>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
