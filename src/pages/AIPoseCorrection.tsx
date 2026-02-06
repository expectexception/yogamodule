import { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { RefreshCw, CheckCircle2, AlertCircle, Scan, Activity, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AIPoseCorrection = () => {
    const [scanning, setScanning] = useState(true);
    const [feedback, setFeedback] = useState('Analysing alignment...');
    const [accuracy, setAccuracy] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setScanning(false);
            setFeedback('Lower your hips slightly - maintain 90° angle');
            setAccuracy(88);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="space-y-8 max-w-6xl mx-auto min-h-[80vh] flex flex-col">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-2">
                    <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase">AI Pose Correction</h2>
                    <p className="text-slate-400 font-medium">Precision form analysis for crew-specific routines</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="gap-2 text-[10px] font-black uppercase tracking-widest border-white/10">
                        <Maximize2 className="w-3 h-3" /> External Camera
                    </Button>
                </div>
            </div>

            <div className="grid lg:grid-cols-4 gap-8 flex-1">
                {/* Main Camera View */}
                <div className="lg:col-span-3 relative bg-slate-900 rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl min-h-[500px]">
                    {/* Mock Camera View */}
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-40 grayscale" />

                    {/* Scanning Overlay */}
                    <AnimatePresence>
                        {scanning && (
                            <motion.div
                                initial={{ top: '0%' }}
                                animate={{ top: '100%' }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                className="absolute left-0 right-0 h-0.5 bg-slate-100 shadow-[0_0_20px_rgba(255,255,255,0.4)] z-10"
                            />
                        )}
                    </AnimatePresence>

                    {/* Skeletal Mesh Mockup */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <Scan className={`w-[20rem] h-[20rem] ${scanning ? 'text-slate-100/10 scale-110' : 'text-slate-100/40 scale-100'} transition-all duration-700`} strokeWidth={0.5} />
                    </div>

                    {/* Floating Metrics */}
                    <div className="absolute top-8 left-8 space-y-3">
                        <div className="bg-slate-950/90 backdrop-blur-xl px-4 py-2 rounded-2xl border border-white/10 flex items-center gap-3 shadow-2xl">
                            <Activity className="w-5 h-5 text-slate-400" />
                            <div>
                                <span className="text-[10px] font-black text-slate-500 uppercase block tracking-widest">Neural Status</span>
                                <span className="text-xs font-black text-white uppercase tracking-tighter">Live Biometrics</span>
                            </div>
                        </div>
                        <div className="bg-slate-950/90 backdrop-blur-xl px-4 py-2 rounded-2xl border border-white/10 flex items-center gap-3 shadow-2xl">
                            <div className="w-2.5 h-2.5 rounded-full bg-slate-400 animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.2)]" />
                            <div>
                                <span className="text-[10px] font-black text-slate-500 uppercase block tracking-widest">Confidence</span>
                                <span className="text-xs font-black text-white uppercase tracking-tighter">{accuracy}% Alignment</span>
                            </div>
                        </div>
                    </div>

                    {/* Action Feedback Bar */}
                    <div className="absolute bottom-8 left-8 right-8">
                        <Card className={`p-6 bg-slate-950 border-white/10 flex items-center gap-6 shadow-2xl overflow-hidden relative`} hover={false}>
                            {scanning ? (
                                <RefreshCw className="w-8 h-8 text-slate-400 animate-spin" />
                            ) : (
                                <AlertCircle className="w-8 h-8 text-slate-200 animate-bounce" />
                            )}
                            <div className="flex-1">
                                <h4 className={`text-xs font-black uppercase tracking-widest text-slate-500`}>
                                    AI Guidance System
                                </h4>
                                <p className={`text-xl font-black italic tracking-tight text-white`}>
                                    {feedback}
                                </p>
                            </div>
                            {!scanning && (
                                <Button size="sm" className="bg-white hover:bg-slate-200 text-slate-950 font-black uppercase tracking-widest text-[10px] border-none shadow-xl">
                                    Auto-Adjust
                                </Button>
                            )}
                        </Card>
                    </div>
                </div>

                {/* Sidebar Controls */}
                <div className="space-y-6">
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest border-l-2 border-slate-700 pl-3">Session Metrics</h3>
                        <Card className="p-6 space-y-6 bg-slate-900 shadow-xl" hover={false}>
                            <div className="space-y-4">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-slate-500 uppercase">Stability Index</span>
                                    <div className="flex items-center gap-4">
                                        <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-slate-100 w-[92%]" />
                                        </div>
                                        <span className="text-xs font-black text-white italic">92%</span>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-slate-500 uppercase">Flexibility Peak</span>
                                    <div className="flex items-center gap-4">
                                        <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-slate-400 w-[78%]" />
                                        </div>
                                        <span className="text-xs font-black text-white italic">78°</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest border-l-2 border-slate-500 pl-3">Actions</h3>
                        <div className="flex flex-col gap-3">
                            <Button variant="outline" className="w-full gap-3 font-black uppercase tracking-widest py-4 border-white/10 group">
                                <RefreshCw className="w-5 h-5 text-slate-500 group-hover:rotate-180 transition-transform duration-500" />
                                Refine Vision
                            </Button>
                            <Button className="w-full gap-3 font-black uppercase tracking-widest py-4 shadow-xl">
                                <CheckCircle2 className="w-5 h-5" />
                                Sync Result
                            </Button>
                        </div>
                    </div>

                    <div className="p-6 bg-slate-900/40 rounded-3xl border border-white/5 space-y-2">
                        <div className="text-[10px] font-black text-slate-500 uppercase flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-100" />
                            Pro Tip
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed italic">
                            AI Form Assist is optimized for low-light cockpit/hotel environments. Ensure your full torso is within the scan zone.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIPoseCorrection;
