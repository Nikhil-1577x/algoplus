import React from 'react';

const AnimatedBackground = () => {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            {/* Simplified Static Gradient Orbs - No animation for better performance */}
            <div
                className="absolute top-0 -left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[80px] animate-pulse-slow"
            />

            <div
                className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[80px] animate-pulse-slower"
            />

            <div
                className="absolute bottom-0 left-1/3 w-96 h-96 bg-accent/15 rounded-full blur-[60px]"
            />

            {/* Grid Pattern Overlay */}
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
                    backgroundSize: '50px 50px'
                }}
            />
        </div>
    );
};

export default AnimatedBackground;
