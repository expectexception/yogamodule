import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Trophy, CheckCircle2, TrendingUp, ArrowRight, Clock, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const Scoring = () => {
    const navigate = useNavigate();
    const [score, setScore] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => setScore(850), 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="space-y-12 max-w-5xl mx-auto">
            <div className="text-center space-y-4">
                <div className="flex justify-center mb-6">
                    <div className="bg-slate-900/50 px-4 py-2 rounded-full border border-white/5 flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-slate-400 animate-pulse" />
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest italic">Mission Complete</span>
                    </div>
                </div>
                <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-none">Session Summary</h2>
                <p className="text-slate-400 text-lg font-medium italic">Outstanding performance, Capt. Sarah Miller!</p>
            </div>

            <div className="grid lg:grid-cols-5 gap-8 bg-slate-900/40 p-1 md:p-8 rounded-[3rem] border border-white/5">
                <Card className="lg:col-span-3 relative overflow-hidden py-16 text-center space-y-8 flex flex-col items-center bg-slate-900 shadow-2xl" hover={false}>
                    <div className="absolute top-0 right-0 p-8">
                        <Trophy className="w-24 h-24 text-white/5 rotate-12" />
                    </div>

                    <div className="relative">
                        <svg className="w-64 h-64 md:w-80 md:h-80">
                            <circle className="text-slate-800" strokeWidth="12" stroke="currentColor" fill="transparent" r="120" cx="160" cy="160" />
                            <motion.circle
                                initial={{ strokeDashoffset: 754 }}
                                animate={{ strokeDashoffset: 754 - (754 * (score / 1000)) }}
                                className="text-slate-100"
                                strokeWidth="12"
                                strokeDasharray="754"
                                strokeLinecap="round"
                                stroke="currentColor"
                                fill="transparent"
                                r="120"
                                cx="160"
                                cy="160"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <motion.span
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="text-7xl md:text-9xl font-black text-white italic tracking-tighter"
                            >
                                {score}
                            </motion.span>
                            <span className="text-sm md:text-xl font-black text-slate-500 uppercase tracking-[0.3em]">Health Points</span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-center gap-3 text-slate-100 font-black text-xl italic uppercase tracking-widest">
                            <CheckCircle2 className="w-8 h-8 text-slate-400" />
                            <span>Elite Alignment</span>
                        </div>
                        <p className="text-sm text-slate-500 font-medium italic italic">You earned +150 bonus XP for sustaining 90%+ pose accuracy</p>
                    </div>
                </Card>

                <div className="lg:col-span-2 flex flex-col gap-6">
                    {[
                        { label: 'Accuracy', value: '92%', icon: Activity, color: 'text-slate-100', bg: 'bg-slate-900', border: 'border-white/5' },
                        { label: 'Duration', value: '25 min', icon: Clock, color: 'text-slate-100', bg: 'bg-slate-900', border: 'border-white/5' },
                        { label: 'Intensity', value: 'Moderate', icon: TrendingUp, color: 'text-slate-100', bg: 'bg-slate-900', border: 'border-white/5' },
                    ].map((stat, i) => (
                        <Card key={i} className={`p-8 border ${stat.border} ${stat.bg} flex-1 flex items-center justify-between group overflow-hidden relative`} hover>
                            <div className="space-y-1 z-10">
                                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</div>
                                <div className={`text-4xl font-black italic ${stat.color}`}>{stat.value}</div>
                            </div>
                            <stat.icon className={`w-12 h-12 ${stat.color} opacity-20 group-hover:scale-110 transition-transform z-10`} />
                            <div className={`absolute -right-4 -top-4 w-24 h-24 ${stat.bg} blur-3xl rounded-full`} />
                        </Card>
                    ))}

                    <Button size="lg" className="w-full h-20 text-xl font-black uppercase tracking-[0.2em] gap-3 bg-slate-100 text-slate-950 hover:bg-white shadow-2xl border-none group" onClick={() => navigate('/rewards')}>
                        Proceed to Rewards <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Scoring;
