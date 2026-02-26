import React from 'react';
import '../styles/ArcReactor.css';

const ArcReactor = () => {
    return (
        <div className="arc-reactor-container">
            {/* Outer glow pulse */}
            <div className="arc-glow-outer" />

            {/* Main reactor body */}
            <div className="arc-reactor">
                {/* Outermost ring with notches */}
                <div className="reactor-ring ring-outer">
                    {[...Array(36)].map((_, i) => (
                        <div
                            key={`notch-outer-${i}`}
                            className="ring-notch"
                            style={{ transform: `rotate(${i * 10}deg)` }}
                        />
                    ))}
                </div>

                {/* Second ring - rotating clockwise */}
                <div className="reactor-ring ring-2 rotate-cw">
                    {[...Array(12)].map((_, i) => (
                        <div
                            key={`seg-2-${i}`}
                            className="ring-segment"
                            style={{ transform: `rotate(${i * 30}deg)` }}
                        />
                    ))}
                </div>

                {/* Third ring - rotating counter-clockwise */}
                <div className="reactor-ring ring-3 rotate-ccw">
                    {[...Array(8)].map((_, i) => (
                        <div
                            key={`seg-3-${i}`}
                            className="ring-segment thick"
                            style={{ transform: `rotate(${i * 45}deg)` }}
                        />
                    ))}
                </div>

                {/* Fourth ring - energy lines */}
                <div className="reactor-ring ring-4 rotate-cw-slow">
                    {[...Array(24)].map((_, i) => (
                        <div
                            key={`line-${i}`}
                            className="energy-line"
                            style={{ transform: `rotate(${i * 15}deg)` }}
                        />
                    ))}
                </div>

                {/* Inner ring with pulsing segments */}
                <div className="reactor-ring ring-inner rotate-ccw-slow">
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={`inner-seg-${i}`}
                            className="inner-segment"
                            style={{
                                transform: `rotate(${i * 60}deg)`,
                                animationDelay: `${i * 0.2}s`,
                            }}
                        />
                    ))}
                </div>

                {/* Triangular core design */}
                <div className="reactor-core-triangle rotate-cw-fast">
                    <div className="triangle-arm arm-1" />
                    <div className="triangle-arm arm-2" />
                    <div className="triangle-arm arm-3" />
                </div>

                {/* Center core */}
                <div className="reactor-core">
                    <div className="core-inner" />
                    <div className="core-dot" />
                </div>

                {/* Particle effects */}
                <div className="particles">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={`particle-${i}`}
                            className="particle"
                            style={{
                                '--angle': `${(i * 360) / 20}deg`,
                                '--delay': `${i * 0.15}s`,
                                '--distance': `${100 + Math.random() * 60}px`,
                            }}
                        />
                    ))}
                </div>

                {/* Electric arc effects */}
                <div className="electric-arcs">
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={`arc-${i}`}
                            className="electric-arc"
                            style={{
                                transform: `rotate(${i * 60}deg)`,
                                animationDelay: `${i * 0.5}s`,
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ArcReactor;
