import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { MousePointer2, Thermometer, ShieldAlert, Target, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const BodyMap = () => {
    const navigate = useNavigate();
    const [selectedArea, setSelectedArea] = useState<string | null>(null);

    const areas = [
        { id: 'neck', top: '15%', left: '50%', label: 'Neck / Shoulders' },
        { id: 'back', top: '35%', left: '50%', label: 'Lower Back' },
        { id: 'hips', top: '50%', left: '50%', label: 'Hips / Glutes' },
        { id: 'legs', top: '75%', left: '50%', label: 'Hamstrings' },
    ];

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-2">
                    <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase">Body Map</h2>
                    <p className="text-slate-400 font-medium">Identify specific tension areas from flight duty</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-start">
                <Card className="relative h-[500px] bg-slate-900/40 p-0 overflow-hidden border-white/5 flex items-center justify-center" hover={false}>
                    {/* Mock 3D Human Body Illustration */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-30">
                        <svg viewBox="0 0 100 200" className="h-[90%] w-auto fill-slate-700">
                            <path d="M50,10 C55,10 60,15 60,25 C60,35 55,40 50,40 C45,40 40,35 40,25 C40,15 45,10 50,10 Z" />
                            <path d="M40,45 L60,45 L65,80 L35,80 Z" />
                            <path d="M40,85 L60,85 L58,180 L42,180 Z" />
                            <path d="M35,45 L25,80 L30,85 L38,50 Z" />
                            <path d="M65,45 L75,80 L70,85 L62,50 Z" />
                        </svg>
                    </div>

                    {/* Interactive Hotspots */}
                    {areas.map((area) => (
                        <button
                            key={area.id}
                            onClick={() => setSelectedArea(area.label)}
                            className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-20"
                            style={{ top: area.top, left: area.left }}
                            aria-label={`Select ${area.label}`}
                        >
                            <motion.div
                                animate={{ scale: selectedArea === area.label ? [1, 1.4, 1.2] : 1 }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className={`w-8 h-8 rounded-full border-2 border-white/20 backdrop-blur-md flex items-center justify-center shadow-2xl transition-all ${selectedArea === area.label ? 'bg-emerald-500 border-white/40 shadow-emerald-500/50' : 'bg-slate-800'
                                    }`}
                            >
                                <div className={`w-3 h-3 rounded-full ${selectedArea === area.label ? 'bg-white' : 'bg-emerald-500 animate-pulse'}`} />
                            </motion.div>
                            <div className={`absolute top-10 left-1/2 -translate-x-1/2 bg-slate-950/90 text-[10px] font-black uppercase tracking-widest py-1.5 px-3 rounded-lg border border-white/10 transition-all ${selectedArea === area.label ? 'opacity-100' : 'opacity-0'}`}>
                                {area.label}
                            </div>
                        </button>
                    ))}
                </Card>

                <div className="space-y-6">
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest border-l-2 border-emerald-500 pl-3">Selected Focus</h3>
                        {selectedArea ? (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                <Card className="bg-emerald-500/10 border-emerald-500/20 p-6 space-y-4" hover={false}>
                                    <div className="flex items-center gap-4">
                                        <div className="bg-emerald-500 px-3 py-3 rounded-xl shadow-lg shadow-emerald-500/20">
                                            <Target className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-black text-white italic uppercase tracking-tight">{selectedArea} Relief</h4>
                                            <p className="text-xs text-emerald-500/70 font-bold uppercase">Clinical Reset Module</p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-slate-400 leading-relaxed italic border-t border-emerald-500/10 pt-4">
                                        "Recommended for flight deck crew members experiencing static posture strain during long-haul cruise phases."
                                    </p>
                                    <Button size="lg" className="w-full gap-2 shadow-xl shadow-emerald-500/10" onClick={() => navigate('/yoga-dashboard')}>
                                        Start Focused Routine <ArrowRight className="w-5 h-5" />
                                    </Button>
                                </Card>
                            </motion.div>
                        ) : (
                            <Card className="py-12 text-center text-slate-500 flex flex-col items-center gap-4 border-dashed border-2 border-white/5 opacity-50" hover={false}>
                                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center">
                                    <MousePointer2 className="w-8 h-8" />
                                </div>
                                <div className="space-y-1">
                                    <p className="font-bold text-sm uppercase tracking-widest">Awaiting Input</p>
                                    <p className="text-[10px] max-w-[200px] mx-auto italic">Select an area on the 3D model to generate your recovery program.</p>
                                </div>
                            </Card>
                        )}
                    </div>

                    <div className="p-4 bg-slate-900/40 rounded-xl border border-white/5">
                        <h5 className="text-[10px] font-bold text-slate-500 uppercase mb-2">Physiological Tip</h5>
                        <p className="text-xs text-slate-400 italic">Static muscular loading in the cockpit leads to isometric fatigue. Focus on dynamic stretching for the {selectedArea || 'selected area'}.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BodyMap;
