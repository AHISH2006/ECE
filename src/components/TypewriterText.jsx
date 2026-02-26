import React from 'react';
import { motion } from 'framer-motion';

/**
 * TypewriterText
 * Renders text letter-by-letter using framer-motion stagger.
 *
 * Props:
 *  text        – string to animate
 *  className   – CSS class for the wrapper
 *  delay       – stagger delay after mount (default 0)
 *  stagger     – per-letter stagger time (default 0.045)
 *  once        – only animate once in viewport (default true)
 *  tag         – HTML tag for wrapper: 'h1' | 'h2' | 'p' | 'span' (default 'span')
 */
const TypewriterText = ({
    text = '',
    className = '',
    delay = 0,
    stagger: staggerTime = 0.045,
    once = true,
    tag = 'span',
}) => {
    const letters = Array.from(text);

    const container = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: staggerTime,
                delayChildren: delay,
            },
        },
    };

    const letter = {
        hidden: { opacity: 0, y: 16, filter: 'blur(6px)' },
        show: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: { duration: 0.35, ease: 'easeOut' },
        },
    };

    const MotionTag = motion[tag] ?? motion.span;

    return (
        <MotionTag
            className={className}
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once }}
            style={{ display: 'inline-block' }}
        >
            {letters.map((char, i) => (
                <motion.span
                    key={i}
                    variants={letter}
                    style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </motion.span>
            ))}
        </MotionTag>
    );
};

export default TypewriterText;
