import React from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Trophy, Medal, Star, Users, ArrowUp, UserCircle, Globe, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const Leaderboard = () => {
    const leaderData = [
        { rank: 1, name: 'Capt. Sarah Miller', score: '4,850', tier: 'Gold', current: false, trend: 1, hub: 'LHR' },
        { rank: 2, name: 'Eng. David Chen', score: '4,620', tier: 'Gold', current: false, trend: -1, hub: 'HKG' },
        { rank: 3, name: 'Capt. Alex Hunt', score: '4,200', tier: 'Silver', current: true, trend: 0, hub: 'DXB' },
        { rank: 4, name: 'Crew Elena R.', score: '3,950', tier: 'Silver', current: false, trend: 1, hub: 'SIN' },
        { rank: 5, name: 'FO Michael Song', score: '3,800', tier: 'Silver', current: false, trend: -1, hub: 'JFK' },
    ];

    return (
        <div className="space-y-12 max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-2">
                    <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase leading-none">Crew Rankings</h2>
                    <p className="text-slate-400 font-medium">Monthly aviation wellness leaderboard across international hubs</p>
                </div>
                <div className="flex gap-4">
                    <div className="bg-slate-900 border border-white/5 px-4 py-2 rounded-xl flex items-center gap-3">
                        <Globe className="w-5 h-5 text-blue-500" />
                        <div className="text-right">
                            <div className="text-[8px] font-black text-slate-500 uppercase">Active Hub</div>
                            <div className="text-xs font-black text-white">DXB International</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-4 gap-8">
                <div className="lg:col-span-1 space-y-6">
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest border-l-2 border-emerald-500 pl-3">Top Contributors</h3>
                    <div className="flex flex-col gap-6 pt-4">
                        {[
                            { rank: 1, name: 'Sarah Miller', score: '4,850', color: 'text-amber-500', bg: 'from-amber-500 to-yellow-300' },
                            { rank: 2, name: 'David Chen', score: '4,620', color: 'text-slate-400', bg: 'from-slate-400 to-slate-200' },
                            { rank: 3, name: 'Alex Hunt', score: '4,200', color: 'text-amber-700', bg: 'from-amber-700 to-amber-900' },
                        ].map((p, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Card className="p-4 flex flex-col items-center text-center gap-3 relative overflow-hidden group transition-all duration-500 hover:rotate-2 hover:scale-[1.05]" hover={false}>
                                    <div className={`w-20 h-20 rounded-full p-1 bg-gradient-to-tr ${p.bg} shadow-2xl`}>
                                        <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
                                            <UserCircle className="w-12 h-12 text-slate-500" />
                                        </div>
                                    </div>
                                    <div className={`font-black text-3xl italic ${p.color}`}>#{p.rank}</div>
                                    <div className="space-y-1">
                                        <div className="text-sm font-black text-white uppercase tracking-tight">{p.name}</div>
                                        <div className="text-xs font-black text-slate-500">{p.score} XP</div>
                                    </div>
                                    <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${p.bg} opacity-10 blur-xl group-hover:opacity-30 transition-opacity`} />
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-3 space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest border-l-2 border-blue-500 pl-3">Full Leaderboard</h3>
                        <div className="flex gap-2">
                            <Button variant="ghost" size="sm" className="text-[10px] uppercase font-black tracking-widest text-emerald-500">Global</Button>
                            <Button variant="ghost" size="sm" className="text-[10px] uppercase font-black tracking-widest text-slate-500">Hub</Button>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {leaderData.map((user, i) => (
                            <motion.div
                                key={user.rank}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Card
                                    className={`px-8 py-5 flex items-center justify-between gap-6 transition-all duration-300 ${user.current ? 'bg-emerald-500/10 border-emerald-500/40 shadow-2xl shadow-emerald-500/5' : 'bg-slate-900/40 border-white/5 opacity-80 hover:opacity-100 hover:bg-slate-900'
                                        }`}
                                    hover={!user.current}
                                >
                                    <div className="flex items-center gap-8 flex-1">
                                        <div className={`text-2xl font-black italic w-8 text-center ${user.rank <= 3 ? 'text-amber-500' : 'text-slate-600'}`}>
                                            {user.rank}
                                        </div>
                                        <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center shrink-0 border border-white/5 relative group-hover:scale-110 transition-transform">
                                            <UserCircle className="w-7 h-7 text-slate-500" />
                                            {user.rank <= 3 && <Medal className="w-4 h-4 absolute -top-1 -right-1 text-amber-400 fill-amber-400" />}
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-3">
                                                <h4 className={`text-base font-black italic uppercase tracking-tight ${user.current ? 'text-emerald-400' : 'text-slate-100'}`}>
                                                    {user.name}
                                                </h4>
                                                {user.current && (
                                                    <span className="text-[10px] bg-emerald-500 text-slate-950 px-2 py-0.5 rounded-full font-black uppercase tracking-widest">You</span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                                <span>Hub: {user.hub}</span>
                                                <span className="w-1 h-1 rounded-full bg-slate-700" />
                                                <span>Tier: {user.tier}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-right space-y-1">
                                        <div className="flex items-center justify-end gap-2">
                                            <Zap className="w-4 h-4 text-emerald-500" />
                                            <div className="text-xl font-black text-white italic">{user.score}<span className="text-[8px] text-slate-500 ml-1 uppercase">XP</span></div>
                                        </div>
                                        {user.trend !== 0 && (
                                            <div className={`text-[10px] font-black ${user.trend > 0 ? 'text-emerald-500' : 'text-rose-500'} flex items-center justify-end gap-1 uppercase`}>
                                                <ArrowUp className={`w-3 h-3 ${user.trend < 0 ? 'rotate-180' : ''}`} />
                                                {user.trend > 0 ? 'Rising' : 'Falling'}
                                            </div>
                                        )}
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4">
                        <Button variant="outline" className="h-16 gap-3 border-white/5 bg-slate-900/40 text-slate-400 hover:bg-slate-900 font-black uppercase tracking-[0.2em]">
                            <Globe className="w-5 h-5" /> View Fleet Avg
                        </Button>
                        <Button className="h-16 gap-3 bg-emerald-600 hover:bg-emerald-700 shadow-2xl shadow-emerald-600/20 text-white font-black uppercase tracking-[0.2em] border-none">
                            <Users className="w-5 h-5" /> Hub Challenges
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;
