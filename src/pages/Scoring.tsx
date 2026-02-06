import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Trophy, ArrowRight, Clock, Activity, Zap, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { AmbientBackground } from '../components/ui/AmbientBackground';

const Scoring = () => {
    const navigate = useNavigate();
    const [score, setScore] = useState(0);
    const targetScore = 880;

    useEffect(() => {
        const timer = setTimeout(() => setScore(targetScore), 1000);
        return () => clearTimeout(timer);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 }
        }
    };

    return (
        <div className="relative min-h-screen pb-20">
            <AmbientBackground />

            <motion.div
                className="space-y-16 max-w-6xl mx-auto pt-8 px-4"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                {/* Header Section */}
                <motion.div variants={itemVariants} className="text-center space-y-6">
                    <div className="flex justify-center">
                        <div className="bg-white/5 backdrop-blur-md px-5 py-2 rounded-full border border-white/10 flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] italic">Mission Debrief: Complete</span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-3xl md:text-6xl lg:text-7xl font-black italic tracking-tighter uppercase leading-none text-white">Execution Summary</h2>
                        <p className="text-slate-500 text-sm md:text-lg font-bold italic tracking-wide">Superior alignment detected. Protocol compliance: Optimal.</p>
                    </div>
                </motion.div>

                <div className="grid lg:grid-cols-12 gap-12 items-start">
                    {/* HUD Gauge Section */}
                    <motion.div variants={itemVariants} className="lg:col-span-7 space-y-8">
                        <Card className="relative overflow-hidden py-16 px-8 bg-white/5 backdrop-blur-3xl border-white/10 shadow-2xl flex flex-col items-center justify-center min-h-[500px]" hover={false}>
                            {/* Decorative Background Elements */}
                            <div className="absolute top-0 right-0 p-12 opacity-5">
                                <Trophy className="w-64 h-64 text-white rotate-12" />
                            </div>

                            {/* HUD Gauge */}
                            <div className="relative flex items-center justify-center">
                                <svg className="w-72 h-72 md:w-96 md:h-96 -rotate-90">
                                    {/* Track */}
                                    <circle className="text-white/5 md:hidden" strokeWidth="4" stroke="currentColor" fill="transparent" r="140" cx="144" cy="144" />
                                    <circle className="text-white/5 hidden md:block" strokeWidth="4" stroke="currentColor" fill="transparent" r="180" cx="192" cy="192" />

                                    {/* Main Progress */}
                                    <motion.circle
                                        initial={{ strokeDashoffset: 1131 }}
                                        animate={{ strokeDashoffset: 1131 - (1131 * (score / 1000)) }}
                                        transition={{ duration: 2, ease: "easeOut" }}
                                        // className="text-white"
                                        strokeWidth="8"
                                        strokeDasharray="1131"
                                        strokeLinecap="round"
                                        stroke="currentColor"
                                        fill="transparent"
                                        r="180"
                                        cx="192"
                                        cy="192"
                                        className="hidden md:block shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                                    />

                                    {/* Orbital Data Pips */}
                                    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                                        <circle
                                            key={angle}
                                            cx={192 + 180 * Math.cos((angle * Math.PI) / 180)}
                                            cy={192 + 180 * Math.sin((angle * Math.PI) / 180)}
                                            r="2.5"
                                            className="fill-white/20 hidden md:block"
                                        />
                                    ))}
                                </svg>

                                <div className="absolute inset-0 flex flex-col items-center justify-center mt-4">
                                    <div className="space-y-0 text-center">
                                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-2">Wellness Index</div>
                                        <div className="flex items-baseline justify-center">
                                            <motion.span
                                                className="text-6xl md:text-8xl font-black text-white italic tracking-tighter leading-none"
                                            >
                                                {score}
                                            </motion.span>
                                            <span className="text-xl md:text-3xl font-black text-slate-600 italic ml-2">XP</span>
                                        </div>
                                        <div className="pt-4 flex items-center justify-center gap-4 border-t border-white/5 mt-4">
                                            <div className="flex flex-col items-center">
                                                <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest leading-none">Status</span>
                                                <span className="text-xs font-black text-emerald-400 uppercase italic">Authenticated</span>
                                            </div>
                                            <div className="w-px h-6 bg-white/5" />
                                            <div className="flex flex-col items-center">
                                                <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest leading-none">Tier</span>
                                                <span className="text-xs font-black text-slate-200 uppercase italic">Gold Class</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </motion.div>

                    {/* Analytics Sidebar */}
                    <div className="lg:col-span-5 flex flex-col gap-6">
                        <motion.div variants={itemVariants} className="space-y-4">
                            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] border-l-2 border-slate-700 pl-4 mb-6">Flight Metrics</h3>
                            {[
                                { label: 'Pose Accuracy', value: '94%', icon: Activity, desc: 'High-Precision Form' },
                                { label: 'Focus Intensity', value: 'Elite', icon: Zap, desc: '98th Percentile' },
                                { label: 'Duty Duration', value: '25 min', icon: Clock, desc: 'Protocol Standard' },
                            ].map((stat, i) => (
                                <Card key={i} className="p-6 bg-white/5 backdrop-blur-xl border-white/10 flex items-center justify-between group overflow-hidden" hover>
                                    <div className="flex items-center gap-5">
                                        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-all duration-500">
                                            <stat.icon className="w-6 h-6 text-white/50 group-hover:text-white transition-colors" />
                                        </div>
                                        <div className="space-y-0.5">
                                            <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</div>
                                            <div className="text-2xl font-black text-white italic tracking-tighter uppercase">{stat.value}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[9px] text-slate-500 font-bold italic group-hover:text-slate-300 transition-colors uppercase">{stat.desc}</p>
                                    </div>
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full -mr-16 -mt-16" />
                                </Card>
                            ))}
                        </motion.div>

                        <motion.div variants={itemVariants} className="pt-4 space-y-6">
                            <Card className="p-6 bg-emerald-500/5 border-emerald-500/10 flex items-center gap-4" hover={false}>
                                <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/10">
                                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                                </div>
                                <div className="flex-1">
                                    <h5 className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Medical Validation</h5>
                                    <p className="text-[9px] text-slate-500 font-bold italic">L-Spine stress profile reduced by 15%</p>
                                </div>
                            </Card>

                            <Button
                                size="lg"
                                className="w-full h-14 md:h-20 text-base md:text-lg font-black uppercase tracking-[0.3em] gap-3 bg-white text-slate-950 hover:bg-slate-200 shadow-[0_0_50px_rgba(255,255,255,0.1)] border-none group transition-all duration-500"
                                onClick={() => navigate('/rewards')}
                            >
                                Secure Mission Credits <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform" />
                            </Button>

                            <Button
                                variant="ghost"
                                className="w-full h-12 text-[9px] md:text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] hover:text-white transition-colors"
                                onClick={() => navigate('/yoga-dashboard')}
                            >
                                Re-enter Console
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Scoring;
