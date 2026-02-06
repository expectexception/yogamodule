import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { User, Calendar, Ruler, Weight, UserCircle, Briefcase, ChevronRight, Settings, Shield, Bell, Award, History, Heart, LogOut, ShieldCheck, HeartPulse } from 'lucide-react';
import { useAppState } from '../context/AppState';
import { motion } from 'framer-motion';
import { AVIATION_SAFETY_CONDITIONS } from '../constants/AviationSafety';

const Profile = () => {
    const { userProfile, logout } = useAppState();

    const profile = userProfile || {
        jobTitle: 'Commercial Pilot',
        dob: '1990-05-15',
        gender: 'Male',
        height: '182',
        weight: '78',
        bmi: '23.5',
        medicalConditions: ['L_SPINE_COMP', 'DVT_RISK']
    };

    const selectedSafetyConditions = AVIATION_SAFETY_CONDITIONS.filter(c =>
        profile.medicalConditions.includes(c.id)
    );

    const settingsItems = [
        { icon: Settings, label: 'Account Preferences', desc: 'Manage your security and regional settings', value: 'Global / Metric' },
        { icon: Bell, label: 'Notification Hub', desc: 'Sync with duty roster and rest periods', value: 'Smart Alerts' },
        { icon: Shield, label: 'Privacy & Data Control', desc: 'Aviation health data encryption', value: 'Secure' },
    ];

    const stats = [
        { icon: Award, label: 'Sessions', value: '42' },
        { icon: History, label: 'Streak', value: '12 Days' },
        { icon: Heart, label: 'Avg Heart', value: '62 bpm' },
    ];

    return (
        <div className="space-y-12 max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 pb-8 border-b border-white/5">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative group"
                >
                    <div className="w-32 h-32 md:w-48 md:h-48 bg-slate-800 rounded-[2.5rem] p-1 shadow-2xl border border-white/5 group-hover:rotate-3 transition-transform duration-500">
                        <div className="w-full h-full bg-slate-900 rounded-[2.3rem] flex items-center justify-center overflow-hidden">
                            <UserCircle className="w-20 h-20 md:w-32 md:h-32 text-slate-700" />
                        </div>
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-slate-100 text-slate-950 p-2 rounded-xl shadow-xl">
                        <Award className="w-6 h-6" />
                    </div>
                </motion.div>

                <div className="text-center md:text-left space-y-4">
                    <div className="space-y-1">
                        <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
                            <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-none">{profile.jobTitle}</h2>
                            <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-[10px] font-black text-emerald-400 uppercase tracking-widest">
                                <ShieldCheck className="w-3 h-3" /> Fit for Duty
                            </div>
                        </div>
                        <p className="text-sm font-bold text-slate-500 uppercase tracking-[0.3em]">Fleet Member · ID: IFOA-2026-X99</p>
                    </div>
                    <div className="flex flex-wrap justify-center md:justify-start gap-4">
                        <div className="bg-slate-800/50 px-4 py-1.5 rounded-full border border-white/10 text-xs font-black text-slate-300 uppercase tracking-widest italic flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                            In-Service Profile
                        </div>
                        <div className="bg-slate-800/50 px-4 py-1.5 rounded-full border border-white/10 text-xs font-black text-slate-400 uppercase tracking-widest italic">
                            Silver Status
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.map((stat, i) => (
                    <Card key={i} className="p-6 flex items-center justify-between group hover:bg-slate-900" hover>
                        <div className="space-y-1">
                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</div>
                            <div className="text-3xl font-black text-white italic">{stat.value}</div>
                        </div>
                        <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center border border-white/5 group-hover:border-slate-500 transition-colors">
                            <stat.icon className="w-6 h-6 text-slate-400" />
                        </div>
                    </Card>
                ))}
            </div>

            <div className="grid lg:grid-cols-5 gap-12">
                <div className="lg:col-span-2 space-y-6">
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest border-l-2 border-slate-700 pl-3">Clinical Metrics</h3>
                    <Card className="p-0 overflow-hidden bg-slate-900/40 border-white/5" hover={false}>
                        <div className="divide-y divide-white/5">
                            {[
                                { icon: Ruler, label: 'Height', value: `${profile.height} cm` },
                                { icon: Weight, label: 'Weight', value: `${profile.weight} kg` },
                                { icon: Briefcase, label: 'BMI Index', value: profile.bmi },
                                { icon: User, label: 'Gender', value: profile.gender },
                                { icon: Calendar, label: 'Born', value: profile.dob },
                            ].map((row, i) => (
                                <div key={i} className="px-6 py-5 flex items-center justify-between group hover:bg-white/5 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <row.icon className="w-5 h-5 text-slate-500 group-hover:text-slate-200 transition-colors" />
                                        <span className="text-sm font-bold text-slate-400 uppercase tracking-tight">{row.label}</span>
                                    </div>
                                    <span className="text-sm text-white font-black italic">{row.value}</span>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                <div className="lg:col-span-3 space-y-12">
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest border-l-2 border-slate-700 pl-3">Medical Integrity Dashboard</h3>
                            <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest flex items-center gap-2">
                                <ShieldCheck className="w-3 h-3" /> Clinical Integrity Sync: Active
                            </span>
                        </div>
                        <Card className="p-8 bg-slate-900 border-white/5 space-y-8" hover={false}>
                            <div className="grid gap-4">
                                {selectedSafetyConditions.length > 0 ? (
                                    selectedSafetyConditions.map((condition, i) => (
                                        <div key={i} className="group p-5 bg-slate-950/50 rounded-2xl border border-white/5 hover:border-slate-500/30 transition-all">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                                                    <span className="text-sm font-black text-slate-100 uppercase tracking-tight">{condition.label}</span>
                                                </div>
                                                <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest px-2 py-0.5 bg-slate-900 rounded border border-white/5">
                                                    {condition.category}
                                                </span>
                                            </div>
                                            <div className="pl-6 space-y-3">
                                                <p className="text-xs text-slate-500 font-medium italic leading-relaxed">
                                                    {condition.description}
                                                </p>
                                                <div className="flex items-center gap-3 py-2 px-3 bg-rose-500/5 border border-rose-500/10 rounded-xl">
                                                    <HeartPulse className="w-3.5 h-3.5 text-rose-500/60" />
                                                    <div className="flex flex-col">
                                                        <span className="text-[8px] font-black text-rose-500/40 uppercase tracking-[0.2em] leading-none mb-1">Impact Protocol</span>
                                                        <span className="text-[10px] font-bold text-rose-400 italic leading-none">{condition.impact}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-12 text-center space-y-4">
                                        <div className="w-16 h-16 bg-emerald-500/5 border border-emerald-500/10 rounded-3xl mx-auto flex items-center justify-center">
                                            <ShieldCheck className="w-8 h-8 text-emerald-500/40" />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-lg font-black text-slate-200 uppercase tracking-tighter italic">High-Performance Profile</p>
                                            <p className="text-xs text-slate-500 font-medium italic">No safety restrictions declared. All protocols available.</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest border-l-2 border-slate-800 pl-3">App Configuration</h3>
                        <div className="space-y-4">
                            {settingsItems.map((item, i) => (
                                <Card key={i} className="p-6 flex items-center justify-between group cursor-pointer transition-all duration-300" hover>
                                    <div className="flex items-center gap-6">
                                        <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center border border-white/5 group-hover:border-slate-500/40 group-hover:scale-105 transition-all">
                                            <item.icon className="w-6 h-6 text-slate-400 group-hover:text-white" />
                                        </div>
                                        <div>
                                            <div className="text-base font-black text-slate-100 uppercase tracking-tight">{item.label}</div>
                                            <div className="text-xs text-slate-500 font-medium italic">{item.desc}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="hidden sm:block text-right">
                                            <div className="text-[10px] font-black text-slate-400 uppercase mb-0.5">Current</div>
                                            <div className="text-xs font-bold text-slate-300">{item.value}</div>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-slate-700 group-hover:text-white transition-colors" />
                                    </div>
                                </Card>
                            ))}
                        </div>

                        <div className="pt-4">
                            <Button variant="outline" className="w-full h-14 text-slate-500 border-white/5 hover:border-rose-500 hover:text-rose-500 text-sm font-black uppercase tracking-[0.2em] shadow-xl group" onClick={logout}>
                                <LogOut className="w-5 h-5 mr-3 group-hover:translate-x-1 transition-transform" />
                                Terminate Active Session
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
