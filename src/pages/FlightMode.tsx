import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Plane, Clock, MapPin, Wind, ArrowRight, CheckCircle2, ShieldCheck as ShieldInfo } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FlightMode = () => {
    const navigate = useNavigate();
    const [selectedType, setSelectedType] = useState('Pre-Flight');
    const [duration, setDuration] = useState('2');

    const flightTypes = [
        { type: 'Pre-Flight', icon: Wind, desc: 'Activation and readiness protocols', intensity: 'Dynamic', meta: 'Active Module' },
        { type: 'Cruise Flight', icon: Plane, desc: 'Maintenance and mid-duty boost', intensity: 'Gentle', meta: 'Booster Module' },
        { type: 'Post-Flight', icon: Clock, desc: 'Restoration and physiological recovery', intensity: 'Low', meta: 'Refresher Module' },
    ];

    return (
        <div className="space-y-12 max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-2">
                    <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase">Flight Mode</h2>
                    <p className="text-slate-400 font-medium">Personalize routines based on your duty profile and flight duration</p>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
                <div className="space-y-6">
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest border-l-2 border-slate-700 pl-3">Select Duty Profile</h3>
                    <div className="space-y-4">
                        {flightTypes.map((item) => (
                            <Card
                                key={item.type}
                                onClick={() => setSelectedType(item.type)}
                                className={`p-6 flex items-center justify-between cursor-pointer border-2 transition-all duration-300 ${selectedType === item.type
                                    ? 'border-slate-500 bg-slate-800 shadow-xl scale-[1.02]'
                                    : 'border-white/5 bg-slate-900/40 opacity-70 hover:opacity-100 hover:border-white/10'
                                    }`}
                                hover={selectedType !== item.type}
                            >
                                <div className="flex items-center gap-6">
                                    <div className={`p-4 rounded-2xl transition-all duration-500 ${selectedType === item.type ? 'bg-slate-100 text-slate-950 rotate-6' : 'bg-slate-800 text-slate-500'}`}>
                                        <item.icon className="w-8 h-8" />
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-3">
                                            <h4 className="text-lg font-black text-slate-100 uppercase tracking-tight">{item.type}</h4>
                                            <span className={`text-[8px] font-black px-1.5 py-0.5 rounded-full border ${selectedType === item.type ? 'border-slate-500/30 text-slate-300' : 'border-slate-600 text-slate-400'} uppercase`}>
                                                {item.meta}
                                            </span>
                                        </div>
                                        <p className="text-xs text-slate-500 font-medium italic">{item.desc}</p>
                                    </div>
                                </div>
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${selectedType === item.type ? 'border-slate-100 bg-slate-100' : 'border-white/10'}`}>
                                    {selectedType === item.type && <CheckCircle2 className="w-4 h-4 text-slate-950" />}
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="space-y-6">
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest border-l-2 border-slate-800 pl-3">Adjust Active Duty Time</h3>
                        <Card className="p-8 space-y-10 bg-gradient-to-br from-slate-900 to-slate-950 shadow-2xl" hover={false}>
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Target Hours</span>
                                    <span className="text-4xl font-black text-white italic">{duration}<span className="text-base text-slate-400 ml-1 italic font-bold">HRS</span></span>
                                </div>
                                <div className="relative pt-4">
                                    <div className="flex justify-between absolute -top-2 left-0 right-0 px-1 text-[8px] font-black text-slate-700 uppercase tracking-widest">
                                        <span>Min</span>
                                        <span>Max Duty</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="1"
                                        max="16"
                                        value={duration}
                                        onChange={(e) => setDuration(e.target.value)}
                                        className="w-full h-3 bg-slate-800 rounded-full appearance-none cursor-pointer accent-slate-100 shadow-inner"
                                    />
                                    <div className="flex justify-between mt-2 px-1 text-[10px] font-bold text-slate-500">
                                        <span>1h</span>
                                        <span>4h</span>
                                        <span>8h</span>
                                        <span>12h</span>
                                        <span>16h+</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-800/50 p-4 rounded-2xl border border-white/5 flex gap-4">
                                <MapPin className="w-6 h-6 text-slate-400 shrink-0" />
                                <p className="text-xs text-slate-400 leading-relaxed italic">
                                    Systems optimized for {selectedType} crew. We've matched 12 specific routines against your {duration}h duty profile.
                                </p>
                            </div>

                            <Button size="lg" className="w-full h-16 text-lg font-black uppercase tracking-widest gap-3 bg-slate-100 text-slate-950 hover:bg-white shadow-2xl border-none group" onClick={() => navigate('/yoga-dashboard')}>
                                Generate Flight Plan <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                            </Button>
                        </Card>
                    </div>

                    <div className="p-6 bg-slate-950/50 rounded-3xl border border-dashed border-white/10 flex items-start gap-4">
                        <ShieldInfo className="w-5 h-5 text-slate-600 shrink-0 mt-1" />
                        <div className="space-y-1">
                            <h5 className="text-[10px] font-black text-slate-500 uppercase">Compliance Standard</h5>
                            <p className="text-xs text-slate-600 leading-relaxed italic">
                                Routines adhere to International Aviation Wellness (IAW) guidelines for in-flight and layover physical maintenance.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlightMode;
