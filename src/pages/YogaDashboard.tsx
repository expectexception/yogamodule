import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Play, Clock, Star, Plane, Scan, MousePointer2, Trophy, Sun, User } from 'lucide-react';
import { useAppState } from '../context/AppState';

const modules = [
    { id: 1, title: 'Cockpit Stress Management', duration: '15 min', level: 'Intermediate', category: 'Stress Relief' },
    { id: 2, title: 'Long-Haul Back Recovery', duration: '20 min', level: 'Beginner', category: 'Flexibility' },
    { id: 3, title: 'Circulation Booster', duration: '10 min', level: 'Beginner', category: 'Active Flow' },
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

    return (
        <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-2">
                    <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase">Pilot Dashboard</h2>
                    <p className="text-xs md:text-sm text-slate-500 font-bold uppercase tracking-widest flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-slate-500 animate-pulse" />
                        Active Crew ID: IFOA-2026-X99
                    </p>
                </div>
                <div className="bg-slate-900/50 px-4 py-2 rounded-xl border border-white/5 flex items-center gap-4">
                    <div className="text-right">
                        <div className="text-[10px] font-bold text-slate-500 uppercase">Personal Scale</div>
                        <div className="text-xl font-black text-slate-200 leading-none">{currentScale || 5}/10</div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => navigate('/scale')} className="text-slate-400">Edit</Button>
                </div>
            </div>

            <div className="space-y-6">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest border-l-2 border-slate-700 pl-3">Aviation Wellness Tools</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {features.map((f, i) => (
                        <Card
                            key={i}
                            className="p-6 flex flex-col items-center text-center gap-4 group cursor-pointer border-white/5 active:scale-95 transition-all hover:bg-slate-900"
                            onClick={() => navigate(f.path)}
                        >
                            <div className={`w-14 h-14 ${f.color}/10 rounded-2xl flex items-center justify-center border ${f.color}/20 group-hover:${f.color}/40 group-hover:scale-110 transition-all duration-300`}>
                                <f.icon className={`w-7 h-7 text-white/80 group-hover:text-white transition-colors`} strokeWidth={2.5} />
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-sm font-bold text-slate-200">{f.title}</h4>
                                <p className="text-[10px] text-slate-500 font-medium italic opacity-0 group-hover:opacity-100 transition-opacity">{f.desc}</p>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest border-l-2 border-slate-700 pl-3">Ready-to-Flight Routines</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {modules.map((m) => (
                            <Card key={m.id} className="p-5 flex flex-col gap-4 group cursor-pointer overflow-hidden relative" hover>
                                <div className="flex justify-between items-start">
                                    <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center border border-white/5 group-hover:border-slate-500 transition-colors z-10">
                                        <Play className="w-5 h-5 text-slate-400 fill-slate-400/20" />
                                    </div>
                                    <div className="flex items-center gap-1 text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full font-bold">
                                        <Star className="w-3 h-3 fill-slate-400" />
                                        <span>4.9</span>
                                    </div>
                                </div>
                                <div className="space-y-1 z-10">
                                    <h4 className="font-bold text-slate-100 group-hover:text-slate-300 transition-colors">{m.title}</h4>
                                    <div className="flex gap-4">
                                        <div className="flex items-center gap-1 text-[10px] text-slate-500 font-bold uppercase">
                                            <Clock className="w-3 h-3" />
                                            <span>{m.duration}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-[10px] text-slate-600 font-bold uppercase tracking-tighter">
                                            <span>{m.level}</span>
                                        </div>
                                    </div>
                                </div>
                                <Button
                                    variant="primary"
                                    size="sm"
                                    className="w-full mt-2 text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all z-10"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate('/scoring');
                                    }}
                                >
                                    Start Routine
                                </Button>
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full -mr-16 -mt-16" />
                            </Card>
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest border-l-2 border-slate-800 pl-3">Your Progress</h3>
                    <Card className="p-6 bg-gradient-to-br from-slate-900 to-slate-950 border-white/5">
                        <div className="space-y-6">
                            <div className="flex items-end justify-between">
                                <div>
                                    <div className="text-[10px] font-bold text-slate-500 uppercase">Current Month</div>
                                    <div className="text-4xl font-black text-white italic">2,450<span className="text-base text-slate-400 ml-1 italic">XP</span></div>
                                </div>
                                <div className="text-right">
                                    <div className="text-[10px] font-bold text-slate-500 uppercase">Tier</div>
                                    <div className="text-xl font-black text-slate-200 italic">SILVER</div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                    <span>900 XP to Gold</span>
                                    <span>72%</span>
                                </div>
                                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-slate-100 w-[72%] shadow-[0_0_10px_rgba(255,255,255,0.2)]" />
                                </div>
                            </div>
                            <Button variant="outline" className="w-full text-xs font-bold py-2 h-10 border-white/5" onClick={() => navigate('/rewards')}>
                                View Rewards
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default YogaDashboard;
