import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useAppState } from '../context/AppState';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ShieldCheck, ChevronRight, Info } from 'lucide-react';

const Scale = () => {
    const navigate = useNavigate();
    const { setScale } = useAppState();
    const [value, setValue] = useState(5);

    const handleFinish = () => {
        setScale(value);
        navigate('/yoga-dashboard');
    };

    const getLabel = (v: number) => {
        if (v < 4) return 'Beginner / Gentle';
        if (v < 8) return 'Intermediate / Moderate';
        return 'Advanced / Intense';
    };

    const getDesc = (v: number) => {
        if (v < 4) return 'Low threshold routines focused on decompression and gentle circulation.';
        if (v < 8) return 'Balanced flows targeting core stability and muscular endurance.';
        return 'High intensity conditioning for peak physiological performance.';
    }

    return (
        <div className="space-y-12 max-w-4xl mx-auto py-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
                <div className="space-y-2">
                    <div className="flex items-center gap-3 text-slate-400 font-black uppercase tracking-widest text-[10px]">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-pulse" />
                        Step 03: Intensity Calibration
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-none">Fitness Scale</h2>
                    <p className="text-slate-500 font-medium italic">Define your current physical threshold for session tailoring.</p>
                </div>
                <div className="hidden md:flex items-center gap-2 text-slate-700">
                    <div className="w-8 h-8 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center font-black text-xs text-slate-500">1</div>
                    <div className="w-8 h-0.5 bg-slate-800" />
                    <div className="w-8 h-8 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center font-black text-xs text-slate-500">2</div>
                    <div className="w-8 h-0.5 bg-slate-800" />
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-black text-xs text-slate-950">3</div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
                <Card className="py-16 px-8 text-center space-y-12 bg-slate-900/40 border-white/5 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center" hover={false}>
                    <div className="space-y-4 relative z-10">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={value}
                                initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
                                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                                className="text-9xl font-black italic tracking-tighter text-white"
                            >
                                {value}
                            </motion.div>
                        </AnimatePresence>
                        <div className="space-y-1">
                            <h4 className="text-xl font-black text-slate-100 uppercase tracking-tight">{getLabel(value)}</h4>
                            <p className="text-xs text-slate-500 font-medium italic max-w-[200px] mx-auto opacity-70">Intensity Level Calibration</p>
                        </div>
                    </div>

                    <div className="space-y-8 w-full relative z-10">
                        <div className="relative">
                            <input
                                type="range"
                                min="1"
                                max="10"
                                value={value}
                                onChange={(e) => setValue(parseInt(e.target.value))}
                                className="w-full h-4 bg-slate-950 rounded-full appearance-none cursor-pointer accent-white border border-white/5 shadow-inner"
                            />
                            <div className="flex justify-between text-[10px] font-black text-slate-600 px-1 mt-4 uppercase tracking-[0.2em]">
                                <span>Low</span>
                                <span>Medium</span>
                                <span>Elite</span>
                            </div>
                        </div>
                    </div>
                    {/* Background Decorative Element */}
                    <div className="absolute top-0 right-0 w-64 h-64 blur-[100px] rounded-full -mr-32 -mt-32 bg-slate-800/10" />
                </Card>

                <div className="space-y-8">
                    <div className="space-y-6">
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest border-l-2 border-slate-500 pl-3">Intensity Analysis</h3>
                        <Card className="p-8 bg-slate-900/40 border-white/5 space-y-6" hover={false}>
                            <div className="flex items-center gap-4">
                                <div className="p-4 bg-slate-800 rounded-2xl">
                                    <Activity className="w-8 h-8 text-slate-400" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-black italic uppercase tracking-tighter">{getLabel(value)}</h4>
                                    <p className="text-xs text-slate-500 font-medium">Calibrated for {value >= 8 ? 'peak' : 'standard'} compliance.</p>
                                </div>
                            </div>
                            <p className="text-sm text-slate-400 leading-relaxed font-medium italic border-t border-white/5 pt-6">
                                "{getDesc(value)}"
                            </p>
                            <div className="pt-4 flex items-center gap-3">
                                <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center border border-white/5">
                                    <ShieldCheck className="w-5 h-5 text-slate-400" />
                                </div>
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Safety Limiters Active</span>
                            </div>
                        </Card>
                    </div>

                    <Button size="lg" className="w-full h-20 text-xl font-black uppercase tracking-widest gap-3 shadow-2xl bg-white text-slate-950 hover:bg-slate-100 border-none group" onClick={handleFinish}>
                        Launch Dashboard <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                    </Button>

                    <div className="p-4 bg-slate-900/40 rounded-2xl border border-white/10 flex items-center gap-4">
                        <Info className="w-5 h-5 text-slate-400 shrink-0" />
                        <p className="text-[10px] text-slate-500 font-bold uppercase italic leading-tight">
                            You can recalibrate your fitness scale at any time from the dashboard controller.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Scale;
