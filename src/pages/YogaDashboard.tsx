import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Clock, Star, Plane, Scan, MousePointer2, Trophy, Sun, User, ChevronRight, Activity, ShieldCheck, Zap } from 'lucide-react';
import { useAppState } from '../context/AppState';
import { motion } from 'framer-motion';
import { AmbientBackground } from '../components/ui/AmbientBackground';

const modules = [
    {
        id: 1,
        title: 'Cockpit Stress Management',
        duration: '15 min',
        level: 'Intermediate',
        category: 'Stress Relief',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=400'
    },
    {
        id: 2,
        title: 'Long-Haul Back Recovery',
        duration: '20 min',
        level: 'Beginner',
        category: 'Flexibility',
        image: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?auto=format&fit=crop&q=80&w=400'
    },
    {
        id: 3,
        title: 'Circulation Booster',
        duration: '10 min',
        level: 'Beginner',
        category: 'Active Flow',
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=400'
    },
];

const YogaDashboard = () => {
    const navigate = useNavigate();
    const { currentScale } = useAppState();

    const features = [
        { title: 'Flight Mode', desc: 'Duty routines', icon: Plane, path: '/flight-mode', color: 'bg-slate-700' },
        { title: 'AI Pose', desc: 'Form correction', icon: Scan, path: '/ai-pose', color: 'bg-slate-800' },
        { title: 'Body Map', desc: 'Target tension', icon: MousePointer2, path: '/body-map', color: 'bg-slate-700' },
        { title: 'Jet Lag', desc: 'Circadian reset', icon: Sun, path: '/jet-lag', color: 'bg-slate-800' },
        { title: 'Leaderboard', desc: 'Crew ranking', icon: Trophy, path: '/leaderboard', color: 'bg-slate-700' },
        { title: 'Profile', desc: 'Your details', icon: User, path: '/profile', color: 'bg-slate-800' },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
        <div className="relative min-h-screen">
            <AmbientBackground />

            <motion.div
                className="space-y-12 pb-20"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                {/* Header / Console Section */}
                <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-white/5">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-950 shadow-2xl">
                                <Activity className="w-6 h-6" />
                            </div>
                            <div className="space-y-0.5">
                                <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase leading-none">Console Alpha</h2>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em] flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    Crew Authenticated: IFOA-2026-X99
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <Card className="px-6 py-4 bg-white/5 backdrop-blur-xl border-white/10 flex items-center gap-6" hover={false}>
                            <div className="space-y-1">
                                <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest leading-none">Global Wellness Scale</div>
                                <div className="text-2xl font-black text-white italic leading-none">{currentScale || 7}/10</div>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => navigate('/scale')} className="h-8 px-4 text-[10px] font-black uppercase tracking-widest border border-white/5 bg-white/5 hover:bg-white/10">
                                Recalibrate
                            </Button>
                        </Card>
                    </div>
                </motion.div>

                {/* Quick Access Grid */}
                <motion.div variants={itemVariants} className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] border-l-2 border-slate-700 pl-3">Aviation Modules</h3>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {features.map((f, i) => (
                            <motion.div key={i} whileHover={{ y: -5 }} whileTap={{ scale: 0.98 }}>
                                <Card
                                    className="p-6 h-full flex flex-col items-center text-center gap-6 group cursor-pointer bg-white/5 backdrop-blur-xl border-white/5 hover:border-white/20 transition-all"
                                    onClick={() => navigate(f.path)}
                                    hover={false}
                                >
                                    <div className={`w-14 h-14 ${f.color}/20 rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-all duration-500 relative`}>
                                        <f.icon className="w-7 h-7 text-white/70 group-hover:text-white transition-colors z-10" />
                                        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 blur-xl transition-opacity rounded-full" />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-xs font-black text-slate-100 uppercase tracking-tight">{f.title}</h4>
                                        <p className="text-[9px] text-slate-500 font-bold italic tracking-wide uppercase opacity-0 group-hover:opacity-100 transition-all duration-300">
                                            {f.desc}
                                        </p>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Routine Center */}
                    <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] border-l-2 border-slate-700 pl-3">Duty Readiness</h3>
                            <Button variant="ghost" className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-white transition-colors">
                                Browse All <ChevronRight className="w-3 h-3 ml-1" />
                            </Button>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            {modules.map((m) => (
                                <motion.div key={m.id} whileHover={{ scale: 1.02 }} className="group">
                                    <Card className="p-0 overflow-hidden bg-white/5 backdrop-blur-2xl border-white/5 aspect-[4/3] relative flex flex-col cursor-pointer" hover={false} onClick={() => navigate('/scoring')}>
                                        <div className="absolute inset-0 z-0">
                                            <img src={m.image} alt={m.title} className="w-full h-full object-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-40 transition-all duration-700" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
                                        </div>

                                        <div className="relative z-10 mt-auto p-6 space-y-4">
                                            <div className="flex justify-between items-center">
                                                <div className="px-2 py-1 bg-white/10 backdrop-blur-md rounded border border-white/10 text-[8px] font-black text-white uppercase tracking-[0.2em]">
                                                    {m.category}
                                                </div>
                                                <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-950/80 rounded-lg border border-white/5">
                                                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                                                    <span className="text-[10px] font-black text-white">4.9</span>
                                                </div>
                                            </div>

                                            <div className="space-y-1">
                                                <h4 className="text-lg font-black text-white uppercase italic tracking-tighter leading-snug">{m.title}</h4>
                                                <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                    <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {m.duration}</span>
                                                    <span className="text-slate-600">/</span>
                                                    <span>{m.level}</span>
                                                </div>
                                            </div>

                                            <Button className="w-full h-12 bg-white text-slate-950 hover:bg-slate-200 font-black uppercase tracking-[0.2em] text-[10px] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                                                Initialize Protocol
                                            </Button>
                                        </div>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Duty Progress */}
                    <motion.div variants={itemVariants} className="space-y-8">
                        <div className="space-y-6">
                            <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] border-l-2 border-slate-700 pl-3">Performance Analytics</h3>
                            <Card className="p-8 bg-white/5 backdrop-blur-2xl border-white/10 relative overflow-hidden" hover={false}>
                                <div className="absolute top-0 right-0 p-4">
                                    <Zap className="w-8 h-8 text-white/5" />
                                </div>
                                <div className="space-y-8 relative z-10">
                                    <div className="flex items-end justify-between">
                                        <div>
                                            <div className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Total Accumulated XP</div>
                                            <div className="text-5xl font-black text-white italic tracking-tighter">4,820</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Flight Tier</div>
                                            <div className="text-2xl font-black text-slate-200 italic tracking-tighter">SILVER</div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex justify-between text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                            <span>Tier Progression</span>
                                            <span>85% Completed</span>
                                        </div>
                                        <div className="h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: "85%" }}
                                                transition={{ duration: 1.5, ease: "easeOut" }}
                                                className="h-full bg-gradient-to-r from-slate-200 to-white shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                                            />
                                        </div>
                                    </div>

                                    <Button variant="outline" className="w-full h-12 rounded-xl border-white/10 hover:bg-white/5 text-[10px] font-black uppercase tracking-[0.2em]" onClick={() => navigate('/rewards')}>
                                        Redeem Rewards Hub
                                    </Button>
                                </div>
                            </Card>
                        </div>

                        {/* Medical Compliance Reminder */}
                        <Card className="p-6 bg-rose-500/5 border-rose-500/10 flex items-center gap-4 group cursor-pointer" onClick={() => navigate('/profile')}>
                            <div className="w-10 h-10 bg-rose-500/10 rounded-xl flex items-center justify-center border border-rose-500/20 group-hover:bg-rose-500/20 transition-all">
                                <ShieldCheck className="w-5 h-5 text-rose-400" />
                            </div>
                            <div className="flex-1">
                                <h5 className="text-[10px] font-black text-rose-400 uppercase tracking-widest">Medical Compliance</h5>
                                <p className="text-[9px] text-slate-500 font-bold italic">2 Protocols requiring review</p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-700 group-hover:text-slate-200 transition-colors" />
                        </Card>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default YogaDashboard;
