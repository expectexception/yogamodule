import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Sun, Moon, Zap, Coffee, Clock, ArrowRight, ShieldCheck, MapPin, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const JetLagRecovery = () => {
    const [offset, setOffset] = useState('+5h');

    const timeline = [
        { time: '10:00 AM', label: 'Arrive / Static Stretch', desc: 'Neural decompression post-flight', icon: Clock, completed: true },
        { time: '02:00 PM', label: 'Revive Flow (Light)', desc: 'Boost circulation & sync rhythm', icon: Zap, completed: false },
        { time: '06:00 PM', label: 'Breathwork for Sleep', desc: 'Phase-shift preparation', icon: Moon, completed: false },
        { time: '08:00 AM', label: 'Sun Salutation (Sync)', desc: 'Full circadian alignment', icon: Sun, completed: false },
    ];

    return (
        <div className="space-y-12 max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-2">
                    <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase leading-none">Jet Lag Reset</h2>
                    <p className="text-slate-400 font-medium">Physiological synchronization for long-haul crews</p>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-1 space-y-8">
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest border-l-2 border-indigo-500 pl-3">Duty Profile</h3>
                    <Card className="p-8 bg-indigo-500/10 border-indigo-500/20 space-y-8 shadow-2xl shadow-indigo-500/5" hover={false}>
                        <div className="space-y-2">
                            <h4 className="text-sm font-black text-indigo-200 uppercase tracking-widest">Timezone Offset</h4>
                            <p className="text-[10px] text-indigo-400 font-bold uppercase italic">Detected from flight log</p>
                        </div>

                        <div className="text-6xl font-black text-white italic text-center py-4 bg-slate-950/50 rounded-3xl border border-indigo-500/20">
                            {offset}
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            {['-8h', '-4h', '-12h', '0h', '+4h', '+8h', '+12h', 'Sync'].map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setOffset(t)}
                                    className={`py-3 rounded-xl text-xs font-black border transition-all duration-300 ${offset === t ? 'bg-indigo-500 border-indigo-400 text-white shadow-xl shadow-indigo-500/30 rotate-2 scale-105' : 'bg-slate-800 border-white/5 text-slate-500 hover:border-indigo-500/30'
                                        }`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>

                        <div className="bg-indigo-500 text-slate-950 p-4 rounded-xl flex items-center gap-4 shadow-xl">
                            <Info className="w-5 h-5 shrink-0" />
                            <p className="text-[10px] font-black uppercase tracking-tight leading-tight">
                                Algorithm matching routines for Westbound fatigue.
                            </p>
                        </div>
                    </Card>
                </div>

                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest border-l-2 border-emerald-500 pl-3">Recovery Timeline</h3>
                        <div className="bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                            <span className="text-[10px] font-black text-emerald-400 uppercase">25% Synced</span>
                        </div>
                    </div>

                    <div className="space-y-6 relative ml-6 md:ml-12 border-l-2 border-white/5 pl-10 md:pl-16 py-4">
                        {timeline.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="relative group pb-4"
                            >
                                {/* Connector Node */}
                                <div className={`absolute -left-[53px] md:-left-[77px] top-4 w-10 md:w-14 h-14 rounded-full flex items-center justify-center border-4 border-slate-950 z-20 transition-all duration-500 shadow-2xl ${item.completed ? 'bg-emerald-500 text-slate-950 scale-110 shadow-emerald-500/20' : 'bg-slate-800 text-slate-600 group-hover:bg-slate-700'
                                    }`}>
                                    <item.icon className="w-6 h-6" />
                                </div>

                                <Card className={`p-6 flex items-center justify-between transition-all duration-500 ${item.completed ? 'bg-emerald-500/5 border-emerald-500/20 opacity-60' : 'bg-slate-900/40 border-white/10'}`} hover={!item.completed}>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">{item.time}</span>
                                            {item.completed && <span className="text-[8px] bg-emerald-500 text-slate-950 px-2 rounded-full font-black uppercase italic">Done</span>}
                                        </div>
                                        <div>
                                            <h4 className={`text-lg font-black italic uppercase tracking-tight ${item.completed ? 'text-slate-400' : 'text-slate-100'}`}>
                                                {item.label}
                                            </h4>
                                            <p className="text-xs text-slate-500 font-medium italic">{item.desc}</p>
                                        </div>
                                    </div>
                                    {!item.completed && (
                                        <Button variant="primary" size="sm" className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black h-12 w-12 rounded-2xl p-0 border-none shadow-xl shadow-emerald-500/10">
                                            <ArrowRight className="w-6 h-6" />
                                        </Button>
                                    )}
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <Card className="p-6 bg-slate-900/40 border-white/5 flex gap-6" hover={false}>
                            <div className="p-4 bg-amber-500/10 rounded-2xl shadow-xl">
                                <Coffee className="w-8 h-8 text-amber-500" />
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-sm font-black text-slate-200 uppercase">Physiological Reset</h4>
                                <p className="text-[10px] text-slate-500 leading-relaxed font-medium italic">
                                    Our algorithm tracks cortisol spikes to suggest optimal breathing intervals.
                                </p>
                            </div>
                        </Card>
                        <Card className="p-6 bg-slate-900/40 border-white/5 flex gap-6" hover={false}>
                            <div className="p-4 bg-blue-500/10 rounded-2xl shadow-xl">
                                <ShieldCheck className="w-8 h-8 text-blue-500" />
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-sm font-black text-slate-200 uppercase">Sleep Sync Pro</h4>
                                <p className="text-[10px] text-slate-500 leading-relaxed font-medium italic">
                                    Certified melatonin-free recovery protocols for cockpit readiness.
                                </p>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JetLagRecovery;
