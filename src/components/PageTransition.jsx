import React from 'react';
import { motion } from 'framer-motion';

const PageTransition = ({ children, skip = false }) => {
    const nbShutters = 6;

    const shutterVariants = {
        initial: {
            scaleY: 1,
            y: 0
        },
        animate: {
            scaleY: 0,
            transition: {
                duration: 0.8,
                ease: [0.65, 0, 0.35, 1],
                delay: 0.2
            }
        },
        exit: {
            scaleY: 1,
            transition: {
                duration: 0.6,
                ease: [0.65, 0, 0.35, 1]
            }
        }
    };

    return (
        <div className="page-transition-wrapper">
            {!skip && (
                <div className="shutter-container">
                    {/* Scanning Lines */}
                    <motion.div
                        className="scan-line-v down"
                        initial={{ y: "-10vh", opacity: 0 }}
                        animate={{ y: "110vh", opacity: [0, 1, 1, 0] }}
                        exit={{ y: "-10vh", opacity: 0 }}
                        transition={{ duration: 1.2, ease: "linear", delay: 0.1 }}
                    />
                    <motion.div
                        className="scan-line-v up"
                        initial={{ y: "110vh", opacity: 0 }}
                        animate={{ y: "-10vh", opacity: [0, 1, 1, 0] }}
                        exit={{ y: "110vh", opacity: 0 }}
                        transition={{ duration: 1.2, ease: "linear", delay: 0.1 }}
                    />
                </div>
            )}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: skip ? 0 : 0.4 }}
            >
                {children}
            </motion.div>
        </div>
    );
};

export default PageTransition;
