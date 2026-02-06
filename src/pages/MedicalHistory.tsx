import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { ShieldCheck, HeartPulse, Fingerprint, Lock, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppState } from '../context/AppState';
import { AVIATION_SAFETY_CONDITIONS } from '../constants/AviationSafety';

const MedicalHistory = () => {
    const navigate = useNavigate();
    const { userProfile, updateProfile } = useAppState();
    const [step, setStep] = useState(1); // 1: UID, 2: Medical History
    const [selectedConditions, setSelectedConditions] = useState<string[]>([]);

    const toggleCondition = (id: string) => {
        setSelectedConditions(prev =>
            prev.includes(id)
                ? prev.filter(c => c !== id)
                : [...prev, id]
        );
    };

    const handleComplete = () => {
        if (userProfile) {
            updateProfile({ ...userProfile, medicalConditions: selectedConditions });
        }
        navigate('/scale');
    };

    return (
        <div className="space-y-12 max-w-5xl mx-auto py-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
                <div className="space-y-2">
                    <div className="flex items-center gap-3 text-slate-400 font-black uppercase tracking-widest text-[10px]">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-pulse" />
                        Step 02: Verification & Compliance
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black italic tracking-tighter uppercase leading-none">
                        {step === 1 ? 'Digital Identity' : 'Medical Integrity'}
                    </h2>
                    <p className="text-slate-500 font-medium italic">
                        {step === 1 ? 'Generating your unique fleet wellness identifier.' : 'Declare clinical status for duty-aligned safety protocols.'}
                    </p>
                </div>
                <div className="hidden md:flex items-center gap-2 text-slate-700">
                    <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-500/30 flex items-center justify-center font-black text-xs text-slate-300">1</div>
                    <div className="w-8 h-0.5 bg-slate-800" />
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-black text-xs text-slate-950">2</div>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {step === 1 ? (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="grid md:grid-cols-2 gap-12"
                    >
                        <Card className="text-center py-16 px-8 bg-slate-900/40 border-white/5 shadow-2xl space-y-8 flex flex-col items-center justify-center min-h-[400px]" hover={false}>
                            <div className="w-24 h-24 bg-slate-800 rounded-[2rem] flex items-center justify-center border border-white/10 relative">
                                <Fingerprint className="w-12 h-12 text-slate-400" />
                                <div className="absolute -top-2 -right-2 bg-slate-100 p-1.5 rounded-lg shadow-lg">
                                    <Lock className="w-4 h-4 text-slate-950" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em]">Fleet Identity Token</p>
                                <h3 className="text-2xl md:text-4xl font-mono font-black text-white tracking-widest">IFOA-2026-X99</h3>
                            </div>
                            <p className="text-xs text-slate-500 max-w-[320px] font-medium italic leading-relaxed">
                                This encrypted UID synchronizes your medical history with your duty roster across all SkyHub terminals.
                            </p>
                        </Card>

                        <div className="space-y-8 flex flex-col justify-center">
                            <div className="p-8 bg-slate-900/40 rounded-[2.5rem] border border-white/5 space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center border border-white/5">
                                        <ShieldCheck className="w-6 h-6 text-slate-400" />
                                    </div>
                                    <h4 className="text-lg font-black italic uppercase tracking-tighter">Identity Verified</h4>
                                </div>
                                <p className="text-sm text-slate-500 leading-relaxed font-medium italic">
                                    Your profile is now registered within the aviation wellness authority. Your identity token is required for all premium modules.
                                </p>
                            </div>
                            <Button size="lg" className="w-full h-20 text-lg font-black uppercase tracking-widest gap-3 shadow-2xl bg-slate-100 text-slate-950 hover:bg-white group" onClick={() => setStep(2)}>
                                Proceed to Declaration <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                            </Button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="grid md:grid-cols-5 gap-12"
                    >
                        <div className="md:col-span-3 space-y-6">
                            <div className="grid gap-4">
                                {AVIATION_SAFETY_CONDITIONS.map((condition) => (
                                    <Card
                                        key={condition.id}
                                        className={`flex flex-col p-6 bg-slate-900/40 border-white/5 transition-all group cursor-pointer ${selectedConditions.includes(condition.id) ? 'border-slate-500' : ''}`}
                                        hover={false}
                                        onClick={() => toggleCondition(condition.id)}
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-4 text-left">
                                                <div className={`w-2 h-2 rounded-full transition-colors ${selectedConditions.includes(condition.id) ? 'bg-slate-400' : 'bg-slate-800'}`} />
                                                <span className="font-bold text-slate-100 uppercase tracking-tight text-sm">{condition.label}</span>
                                            </div>
                                            <div className={`w-6 h-6 rounded-lg border-2 transition-all flex items-center justify-center ${selectedConditions.includes(condition.id) ? 'bg-slate-100 border-slate-100' : 'border-white/10'}`}>
                                                {selectedConditions.includes(condition.id) && <ShieldCheck className="w-4 h-4 text-slate-950" />}
                                            </div>
                                        </div>
                                        <div className="pl-6 space-y-1">
                                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none">
                                                {condition.category} Analysis
                                            </p>
                                            <p className="text-xs text-slate-400 font-medium italic group-hover:text-slate-200 transition-colors">
                                                {condition.description}
                                            </p>
                                            {selectedConditions.includes(condition.id) && (
                                                <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2 text-rose-400/80">
                                                    <HeartPulse className="w-3 h-3" />
                                                    <span className="text-[10px] font-black uppercase tracking-widest">Protocol: {condition.impact}</span>
                                                </div>
                                            )}
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        <div className="md:col-span-2 space-y-8">
                            <Card className="p-6 md:p-8 bg-slate-900 border-white/5 space-y-6 md:sticky md:top-24" hover={false}>
                                <div className="w-16 h-16 bg-slate-800 rounded-3xl flex items-center justify-center border border-white/5">
                                    <HeartPulse className="w-8 h-8 text-slate-100" />
                                </div>
                                <div className="space-y-4">
                                    <h4 className="text-xl font-black italic uppercase tracking-tighter text-white">Safety Clearance</h4>
                                    <p className="text-xs text-slate-500 leading-relaxed font-medium italic">
                                        Clinical declarations allow the IFOA AI to filter out contra-indicated maneuvers that might aggravate flight-duty strain or exacerbate pre-existing conditions.
                                    </p>
                                    <div className="pt-4 flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/5">
                                        <ShieldCheck className="w-6 h-6 text-slate-400 shrink-0" />
                                        <p className="text-[10px] text-slate-300 font-black uppercase tracking-widest leading-tight">
                                            IAW Protocol Compliant Clinical Handling
                                        </p>
                                    </div>
                                </div>
                            </Card>

                            <Button size="lg" className="w-full h-14 md:sticky md:top-120 md:h-20 text-base md:text-lg font-black uppercase tracking-widest shadow-2xl bg-white text-slate-950 hover:bg-slate-100 group" onClick={handleComplete}>
                                Complete Declaration <ChevronRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform ml-2" />
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MedicalHistory;
