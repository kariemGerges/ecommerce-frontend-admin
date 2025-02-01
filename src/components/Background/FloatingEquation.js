import React from 'react';
import './FloatingEquation.css';

const FloatingEquation = () => {
    return (
        <div className="equation-container">
            {/* Main equation with animation */}
            <svg
                className="floating-equation"
                viewBox="0 0 200 80"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Handwritten 'a' */}
                <path
                    d="M20 50 Q30 30 40 50 Q50 70 60 50"
                    fill="none"
                    stroke="#000"
                    strokeWidth="2"
                />

                {/* Plus sign */}
                <path
                    d="M80 40 L100 40 M90 30 L90 50"
                    stroke="#000"
                    strokeWidth="2"
                />

                {/* Handwritten 'b' */}
                <path
                    d="M120 30 Q130 50 140 30 Q150 10 160 30 L160 70"
                    fill="none"
                    stroke="#000"
                    strokeWidth="2"
                />

                {/* Equal sign */}
                <path
                    d="M170 40 L190 40 M170 50 L190 50"
                    stroke="#000"
                    strokeWidth="2"
                />

                {/* Zero */}
                <circle
                    cx="210"
                    cy="45"
                    r="15"
                    fill="none"
                    stroke="#000"
                    strokeWidth="2"
                />
            </svg>

            {/* Animated background elements */}
            <div className="floating-particles">
                {[...Array(10)].map((_, i) => (
                    <div
                        key={i}
                        className="particle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`,
                            fontSize: `${Math.random() * 10 + 10}px`,
                        }}
                    >
                        +
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FloatingEquation;
