import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Star, Zap, Coffee, Plane, Heart, RefreshCw, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const Rewards = () => {
    const navigate = useNavigate();

    return (
        <div className="space-y-12 max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-2">
                    <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase leading-none">Crew Rewards</h2>
                    <p className="text-slate-400 font-medium">Earn premium aviation perks as you maintain your wellness streak</p>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-6">
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest border-l-2 border-slate-700 pl-3">Current Status</h3>
                    <Card className="p-1 rounded-[2.5rem] bg-slate-800 shadow-xl border-white/5">
                        <div className="bg-slate-950/95 rounded-[2.3rem] p-8 space-y-10 h-full flex flex-col justify-between overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-8 transform rotate-12">
                                <Award className="w-32 h-32 text-slate-500/5" />
                            </div>

                            <div className="space-y-6 relative z-10">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-slate-100 px-3 py-3 rounded-2xl shadow-xl">
                                            <Star className="w-6 h-6 text-slate-950 fill-slate-950" />
                                        </div>
                                        <div className="text-left">
                                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Aviation Tier</div>
                                            <div className="text-2xl font-black text-white italic">SILVER</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-end justify-between">
                                        <div className="text-4xl font-black text-white italic">2,450<span className="text-sm text-slate-500 ml-1 uppercase not-italic">XP</span></div>
                                        <span className="text-slate-400 font-black text-xs uppercase tracking-widest">Active Streak: 12</span>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                            <span>Lvl 14</span>
                                            <span>75% to Level 15</span>
                                        </div>
                                        <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-white/5 shadow-inner">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: '75%' }}
                                                transition={{ duration: 1.5, ease: 'easeOut' }}
                                                className="h-full bg-slate-100 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white/5 p-4 rounded-3xl border border-white/5 flex items-center gap-4">
                                <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center border border-white/5">
                                    <Zap className="w-5 h-5 text-slate-400" />
                                </div>
                                <p className="text-[10px] font-bold text-slate-400 leading-relaxed italic">
                                    Maintaining your silver tier provides 1.2x XP multipliers on all morning sessions.
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="lg:col-span-2 space-y-6">
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest border-l-2 border-slate-800 pl-3">Redeemable Rewards</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {[
                            { title: 'Lounge Refreshment', desc: 'Valid at all SkyHub terminals', icon: Coffee, unlocked: false, cost: '5,000 XP' },
                            { title: 'Recovery Module', desc: 'Sleep cycle optimization flow', icon: Zap, unlocked: true, cost: 'Claimed' },
                            { title: 'Priority Crew Rest', desc: 'Optimized rest period scheduling', icon: Plane, unlocked: false, cost: '12,000 XP' },
                            { title: 'Health Diagnostic', desc: 'Full physiological profile link', icon: Heart, unlocked: false, cost: '8,500 XP' },
                        ].map((reward, i) => (
                            <Card key={i} className={`p-6 flex flex-col justify-between gap-6 transition-all duration-500 ${reward.unlocked ? 'bg-slate-800/80 border-slate-500/30' : 'bg-slate-900/40 border-white/5 opacity-80'}`} hover={!reward.unlocked}>
                                <div className="flex items-start justify-between">
                                    <div className={`p-4 rounded-2xl ${reward.unlocked ? 'bg-slate-950/50' : 'bg-slate-800'}`}>
                                        <reward.icon className={`w-6 h-6 ${reward.unlocked ? 'text-slate-100' : 'text-slate-500'}`} />
                                    </div>
                                    {!reward.unlocked && <span className="text-[8px] font-black text-slate-600 bg-slate-950 px-2 py-1 rounded-full uppercase tracking-widest">Locked</span>}
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <h4 className={`text-base font-black italic uppercase tracking-tight ${reward.unlocked ? 'text-white' : 'text-slate-400'}`}>{reward.title}</h4>
                                        <p className="text-[10px] text-slate-500 font-medium italic">{reward.desc}</p>
                                    </div>
                                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                        <span className={`text-[10px] font-black uppercase tracking-widest ${reward.unlocked ? 'text-white' : 'text-slate-600'}`}>Cost: {reward.cost}</span>
                                        <Button variant="ghost" size="sm" className={`h-8 px-4 text-[10px] font-black uppercase tracking-widest ${reward.unlocked ? 'text-slate-200 hover:bg-white/5' : 'text-slate-500'}`} disabled={!reward.unlocked}>
                                            {reward.unlocked ? 'Applied' : 'Details'}
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>

                    <div className="pt-6 grid grid-cols-2 gap-4">
                        <Button size="lg" className="w-full h-16 text-xs font-black uppercase tracking-[0.2em] gap-3" onClick={() => navigate('/yoga-dashboard')}>
                            Back to Fleet Dashboard
                        </Button>
                        <Button variant="outline" className="w-full h-16 text-xs font-black uppercase tracking-[0.2em] gap-3 border-white/10 text-slate-500" onClick={() => navigate('/profile')}>
                            <RefreshCw className="w-5 h-5" /> Update Medical Profile
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Rewards;
