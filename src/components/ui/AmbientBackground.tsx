import React from 'react';
import { motion } from 'framer-motion';

export const AmbientBackground: React.FC = () => {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden bg-slate-950">
            {/* Soft Ambient Gradients */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{
                    opacity: [0.3, 0.5, 0.3],
                    scale: [1, 1.2, 1],
                    x: [0, 50, 0],
                    y: [0, 30, 0]
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-slate-900/40 rounded-full blur-[120px]"
            />

            <motion.div
                initial={{ opacity: 0 }}
                animate={{
                    opacity: [0.2, 0.4, 0.2],
                    scale: [1.2, 1, 1.2],
                    x: [0, -40, 0],
                    y: [0, -60, 0]
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute bottom-[-15%] right-[-5%] w-[60%] h-[60%] bg-slate-800/20 rounded-full blur-[100px]"
            />

            {/* Subtle Grid Overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />

            {/* Horizontal Scanline Effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent bg-[length:100%_4px] pointer-events-none" />
        </div>
    );
};
