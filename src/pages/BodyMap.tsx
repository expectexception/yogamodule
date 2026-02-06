import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Activity, Zap, Play, MousePointer2, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { BODY_MAP_DATA, type BodyPart } from '../constants/BodyMapProtocols';

const BodyMap = () => {
    const navigate = useNavigate();
    const [selectedPart, setSelectedPart] = useState<BodyPart | null>(null);

    // Map visual zones to data IDs
    // Map visual zones to data IDs (Mapped to premium SVG 200x400 coordinate space)
    const visualZones = [
        { id: 'c_spine', top: '15%', left: '50%', label: 'Neck' },
        { id: 'shoulders', top: '23%', left: '25%', label: 'R. Shoulder' },
        { id: 'shoulders', top: '23%', left: '75%', label: 'L. Shoulder' },
        { id: 'l_spine', top: '40%', left: '50%', label: 'Lumbar' },
        { id: 'hips', top: '55%', left: '50%', label: 'Pelvis' },
        { id: 'ankles', top: '92%', left: '42%', label: 'R. Ankle' },
        { id: 'ankles', top: '92%', left: '58%', label: 'L. Ankle' },
    ];

    const handleZoneClick = (id: string) => {
        const part = BODY_MAP_DATA.find(p => p.id === id);
        if (part) setSelectedPart(part);
    };

    return (
        <div className="space-y-8 max-w-6xl mx-auto min-h-[80vh] pt-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-2">
                    <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase">Bio-Metric Map</h2>
                    <p className="text-slate-400 font-medium">Interactive recovery for flight-stress zones</p>
                </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
                {/* Visual Body Map (Left Column) */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                    <Card className="relative h-[640px] bg-slate-900/40 p-0 overflow-hidden border-white/5 flex flex-col shadow-2xl group" hover={false}>
                        {/* Background Grid/Scanner Effect */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50" />

                        {/* 3D Body Silhouette SVG (Premium) */}
                        <div className="flex-1 relative flex items-center justify-center py-12">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1 }}
                                className="relative h-full w-full flex items-center justify-center"
                            >
                                <svg viewBox="0 0 200 400" className="h-[95%] w-auto drop-shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                                    <defs>
                                        <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#334155" stopOpacity="0.8" />
                                            <stop offset="50%" stopColor="#1e293b" stopOpacity="0.9" />
                                            <stop offset="100%" stopColor="#334155" stopOpacity="0.8" />
                                        </linearGradient>
                                        <filter id="glow">
                                            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                                            <feMerge>
                                                <feMergeNode in="coloredBlur" />
                                                <feMergeNode in="SourceGraphic" />
                                            </feMerge>
                                        </filter>
                                    </defs>

                                    {/* Human Figure */}
                                    <path
                                        d="M100,20 C115,20 125,30 125,45 C125,60 115,70 100,70 C85,70 75,60 75,45 C75,30 85,20 100,20 Z"
                                        fill="url(#bodyGradient)" stroke="rgba(255,255,255,0.1)" strokeWidth="1"
                                    />
                                    <path
                                        d="M65,80 L135,80 L125,180 L75,180 Z"
                                        fill="url(#bodyGradient)" stroke="rgba(255,255,255,0.1)" strokeWidth="1"
                                    />
                                    <path
                                        d="M75,185 L125,185 L115,260 L85,260 Z"
                                        fill="url(#bodyGradient)" stroke="rgba(255,255,255,0.1)" strokeWidth="1"
                                    />
                                    <path
                                        d="M85,265 L115,265 L130,380 L110,385 L100,290 L90,385 L70,380 Z"
                                        fill="url(#bodyGradient)" stroke="rgba(255,255,255,0.1)" strokeWidth="1"
                                    />
                                    <path
                                        d="M60,85 L30,160 L45,170 L70,95 Z"
                                        fill="url(#bodyGradient)" stroke="rgba(255,255,255,0.1)" strokeWidth="1"
                                    />
                                    <path
                                        d="M140,85 L170,160 L155,170 L130,95 Z"
                                        fill="url(#bodyGradient)" stroke="rgba(255,255,255,0.1)" strokeWidth="1"
                                    />

                                    {/* Tech Lines */}
                                    <path d="M100,20 L100,385" stroke="rgba(16,185,129,0.2)" strokeWidth="1" strokeDasharray="4,4" />
                                    <circle cx="100" cy="180" r="120" stroke="rgba(255,255,255,0.05)" strokeWidth="1" fill="none" />
                                    <circle cx="100" cy="180" r="160" stroke="rgba(255,255,255,0.03)" strokeWidth="1" fill="none" />
                                </svg>

                                {/* Interactive Hotspots */}
                                {visualZones.map((zone, idx) => {
                                    const isSelected = selectedPart?.id === zone.id;
                                    return (
                                        <button
                                            key={`${zone.id}-${idx}`}
                                            onClick={() => handleZoneClick(zone.id)}
                                            className="absolute transform -translate-x-1/2 -translate-y-1/2 outline-none focus:outline-none group/hotspot"
                                            style={{ top: zone.top, left: zone.left }}
                                        >
                                            <div className="relative">
                                                {/* Pulse Effect */}
                                                <motion.div
                                                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                                                    transition={{ repeat: Infinity, duration: 2 }}
                                                    className={`absolute inset-0 rounded-full ${isSelected ? 'bg-emerald-500' : 'bg-slate-500'}`}
                                                />
                                                {/* Core Point */}
                                                <motion.div
                                                    whileHover={{ scale: 1.2 }}
                                                    className={`relative w-4 h-4 rounded-full border-2 transition-all duration-300 shadow-lg ${isSelected
                                                        ? 'bg-emerald-500 border-white shadow-[0_0_15px_rgba(16,185,129,0.8)]'
                                                        : 'bg-slate-900 border-slate-500 group-hover/hotspot:border-emerald-400 group-hover/hotspot:bg-emerald-500/50'
                                                        }`}
                                                />
                                            </div>

                                            {/* Floating Label */}
                                            <div className={`absolute left-8 top-1/2 -translate-y-1/2 whitespace-nowrap bg-slate-900/90 text-[10px] font-black uppercase tracking-widest py-2 px-4 rounded-lg border border-white/10 shadow-xl backdrop-blur-md transition-all duration-300 pointer-events-none z-30 ${isSelected ? 'opacity-100 translate-x-0 border-emerald-500/50' : 'opacity-0 -translate-x-2'
                                                }`}>
                                                {zone.label}
                                            </div>
                                        </button>
                                    );
                                })}
                            </motion.div>
                        </div>
                    </Card>

                    {/* Fixed Instructional Panel */}
                    <div className="p-4 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-white/5 flex items-center gap-4 shadow-lg">
                        <div className="p-2 bg-slate-800 rounded-lg">
                            <MousePointer2 className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div className="space-y-0.5">
                            <h4 className="text-[10px] font-black text-white uppercase tracking-widest">Interactive Biometrics</h4>
                            <p className="text-[10px] text-slate-400 font-medium tracking-wide">
                                Tap highlighted zones on the model to reveal crew-specific recovery protocols.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Protocols Display (Right Column) */}
                <div className="lg:col-span-7 space-y-6">
                    <div className="flex items-center justify-between border-b border-white/5 pb-6">
                        <h3 className="text-sm font-black text-slate-500 uppercase tracking-[0.2em] pl-3 border-l-2 border-emerald-500">
                            Protocol Console
                        </h3>
                        {selectedPart ? (
                            <span className="px-3 py-1 bg-emerald-500/10 rounded-lg border border-emerald-500/20 text-xs font-black text-emerald-500 uppercase tracking-widest animate-pulse">
                                {selectedPart.label} Active
                            </span>
                        ) : (
                            <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">
                                Awaiting Selection
                            </span>
                        )}
                    </div>

                    <div className="min-h-[400px]">
                        {selectedPart ? (
                            <motion.div
                                key={selectedPart.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-6"
                            >
                                {/* Insight Card */}
                                <Card className="bg-emerald-500/5 border-emerald-500/20 p-6 flex gap-4" hover={false}>
                                    <div className="p-3 bg-emerald-500/20 rounded-xl">
                                        <Activity className="w-6 h-6 text-emerald-500" />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-sm font-black text-emerald-400 uppercase tracking-wider">Physiological Analysis</h4>
                                        <p className="text-sm text-slate-300 italic leading-relaxed">
                                            "{selectedPart.description}"
                                        </p>
                                    </div>
                                </Card>

                                <div className="space-y-4">
                                    {selectedPart.protocols.map((protocol) => (
                                        <motion.div key={protocol.id} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                                            <Card className="p-0 overflow-hidden bg-slate-900 border-white/5 group hover:border-emerald-500/40 transition-all duration-300" hover={false}>
                                                <div className="flex">
                                                    <div className="w-1.5 bg-slate-800 group-hover:bg-emerald-500 transition-colors" />
                                                    <div className="p-6 flex-1 space-y-4">
                                                        <div className="flex justify-between items-start">
                                                            <div className="space-y-1">
                                                                <div className="flex items-center gap-2 mb-2">
                                                                    <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-white/5 text-slate-400">
                                                                        {protocol.level}
                                                                    </span>
                                                                    <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                                                                        {protocol.focus}
                                                                    </span>
                                                                </div>
                                                                <h4 className="text-lg font-black text-white italic uppercase tracking-tighter">
                                                                    {protocol.title}
                                                                </h4>
                                                            </div>
                                                            <div className="text-right">
                                                                <span className="block text-[9px] font-black text-slate-600 uppercase tracking-widest">Time</span>
                                                                <span className="text-lg font-black text-white italic">{protocol.duration}</span>
                                                            </div>
                                                        </div>

                                                        <p className="text-xs text-slate-400 leading-relaxed border-t border-white/5 pt-4">
                                                            {protocol.description}
                                                        </p>

                                                        <Button
                                                            onClick={() => navigate('/scoring')}
                                                            className="w-full mt-2 h-10 bg-white text-slate-950 hover:bg-emerald-500 hover:text-white font-black uppercase tracking-widest text-[10px] shadow-lg group-hover:shadow-emerald-500/20"
                                                        >
                                                            <Play className="w-3 h-3 mr-2 fill-current" />
                                                            Launch Protocol
                                                        </Button>
                                                    </div>
                                                </div>
                                            </Card>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-[400px] border-2 border-dashed border-slate-800 rounded-3xl bg-slate-900/20">
                                <Target className="w-16 h-16 text-slate-800 mb-6" />
                                <h3 className="text-lg font-black text-slate-700 uppercase tracking-widest mb-2">System Idling</h3>
                                <p className="text-slate-600 font-medium max-w-xs text-center text-sm">
                                    Select a highlighted zone on the Bio-Metric Map to decrypt wellness protocols.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BodyMap;
