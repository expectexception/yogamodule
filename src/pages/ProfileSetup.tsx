import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { useAppState } from '../context/AppState';
import { Card } from '../components/ui/Card';
import { UserCircle2, ClipboardList, Ruler, Weight, Calendar, Briefcase, ChevronRight } from 'lucide-react';

const ProfileSetup = () => {
    const navigate = useNavigate();
    const { updateProfile } = useAppState();
    const [formData, setFormData] = useState({
        jobTitle: '',
        dob: '',
        gender: 'Male',
        height: '',
        weight: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const bmi = (Number(formData.weight) / ((Number(formData.height) / 100) ** 2)).toFixed(1);
        updateProfile({ ...formData, bmi, medicalConditions: [] });
        navigate('/medical-history');
    };

    return (
        <div className="space-y-12 max-w-4xl mx-auto py-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
                <div className="space-y-2">
                    <div className="flex items-center gap-3 text-slate-400 font-black uppercase tracking-widest text-[10px]">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-pulse" />
                        Step 01: Profile Initialization
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-none">Profile Details</h2>
                    <p className="text-slate-500 font-medium italic">Configure your physical parameters for protocol tailoring.</p>
                </div>
                <div className="hidden md:flex items-center gap-2 text-slate-700">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-black text-xs text-slate-950">1</div>
                    <div className="w-8 h-0.5 bg-slate-800" />
                    <div className="w-8 h-8 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center font-black text-xs text-slate-700">2</div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid md:grid-cols-5 gap-12">
                <div className="md:col-span-3 space-y-8">
                    <Card className="p-8 space-y-8 bg-slate-900/40 border-white/5 shadow-2xl" hover={false}>
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <label className="flex items-center gap-3 text-xs font-black text-slate-500 uppercase tracking-widest pl-1">
                                    <Briefcase className="w-4 h-4 text-slate-400" /> Professional Designation
                                </label>
                                <input
                                    className="w-full h-14 bg-slate-950/50 border border-white/10 rounded-2xl px-6 text-white text-lg font-bold italic tracking-tight focus:outline-none focus:border-slate-500/30 transition-all"
                                    placeholder="e.g. Commercial Pilot / Cabin Lead"
                                    value={formData.jobTitle}
                                    onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <label className="flex items-center gap-3 text-xs font-black text-slate-500 uppercase tracking-widest pl-1">
                                        <Calendar className="w-4 h-4 text-slate-400" /> Date of Birth
                                    </label>
                                    <input
                                        type="date"
                                        className="w-full h-14 bg-slate-950/50 border border-white/10 rounded-2xl px-6 text-white text-lg font-bold italic tracking-tight focus:outline-none focus:border-slate-500/30 transition-all appearance-none"
                                        value={formData.dob}
                                        onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-4">
                                    <label className="flex items-center gap-3 text-xs font-black text-slate-500 uppercase tracking-widest pl-1">
                                        <UserCircle2 className="w-4 h-4 text-slate-500" /> Gender Entity
                                    </label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {['Male', 'Female', 'Other'].map((g) => (
                                            <button
                                                key={g}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, gender: g })}
                                                className={`h-14 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${formData.gender === g
                                                    ? 'bg-slate-800 border-slate-500 text-slate-100 shadow-xl'
                                                    : 'bg-slate-950/50 border-white/5 text-slate-600 hover:border-white/10'
                                                    }`}
                                            >
                                                {g}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-6 pt-4 border-t border-white/5">
                                <div className="space-y-4">
                                    <label className="flex items-center gap-3 text-xs font-black text-slate-500 uppercase tracking-widest pl-1">
                                        <Ruler className="w-4 h-4 text-slate-400" /> Height (cm)
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            className="w-full h-14 bg-slate-950/50 border border-white/10 rounded-2xl px-6 text-white text-2xl font-black italic tracking-tighter focus:outline-none focus:border-slate-500/30 transition-all px-12"
                                            placeholder="175"
                                            value={formData.height}
                                            onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                                            required
                                        />
                                        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-700 font-black italic">CM</span>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <label className="flex items-center gap-3 text-xs font-black text-slate-500 uppercase tracking-widest pl-1">
                                        <Weight className="w-4 h-4 text-slate-400" /> Weight (kg)
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            className="w-full h-14 bg-slate-950/50 border border-white/10 rounded-2xl px-6 text-white text-2xl font-black italic tracking-tighter focus:outline-none focus:border-slate-500/30 transition-all px-12"
                                            placeholder="70"
                                            value={formData.weight}
                                            onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                                            required
                                        />
                                        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-700 font-black italic">KG</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Button type="submit" size="lg" className="w-full h-20 text-xl font-black uppercase tracking-widest shadow-2xl bg-slate-100 text-slate-950 hover:bg-white border-none group">
                        Initialize Core Metrics <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform ml-2" />
                    </Button>
                </div>

                <div className="md:col-span-2 space-y-6">
                    <Card className="p-8 bg-slate-900 border-white/5 space-y-6" hover={false}>
                        <div className="w-16 h-16 bg-slate-800 rounded-3xl flex items-center justify-center border border-white/5">
                            <ClipboardList className="w-8 h-8 text-slate-400" />
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-xl font-black italic uppercase tracking-tighter text-white">Why this data?</h4>
                            <p className="text-xs text-slate-500 leading-relaxed font-medium italic">
                                Aviation yoga isn't generic. Your BMI and job nature help our AI determine vertebral compression risk and circulation requirements for your specific duty patterns.
                            </p>
                            <div className="pt-4 space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Automatic BMI Calc</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">G-Force Tolerance Estimate</span>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <div className="p-6 bg-slate-900/40 rounded-[2rem] border border-dashed border-white/10">
                        <p className="text-[10px] text-slate-600 font-bold uppercase italic leading-relaxed text-center">
                            By continuing, you agree to secure data processing under IFOA Aviation Health guidelines.
                        </p>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ProfileSetup;
