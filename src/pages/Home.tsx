import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Wind, Award, Plane, Zap, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { YogaLogo } from '../components/ui/YogaLogo';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-[80vh] flex flex-col justify-center max-w-6xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Hero Content */}
                <div className="space-y-8 text-center lg:text-left">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="inline-flex items-center gap-2 bg-slate-900/50 px-4 py-2 rounded-full border border-white/5 text-slate-400 text-xs font-black uppercase tracking-widest"
                    >
                        <Plane className="w-4 h-4" /> Professional Aviation Wellness
                    </motion.div>

                    <div className="space-y-4">
                        <h2 className="text-5xl lg:text-7xl font-black tracking-tighter italic leading-tight uppercase text-white">
                            Elevate Your <br />
                            Flight Status
                        </h2>
                        <p className="text-slate-400 text-lg max-w-xl mx-auto lg:mx-0 font-medium italic">
                            The definitive yoga and recovery ecosystem engineered specifically for the physiological demands of aviation professionals.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                        <Button size="lg" className="h-16 px-10 text-lg font-black uppercase tracking-widest shadow-2xl bg-slate-100 text-slate-950 hover:bg-white" onClick={() => navigate('/login')}>
                            Access System
                        </Button>
                        <Button variant="outline" size="lg" className="h-16 px-10 text-lg font-black uppercase tracking-widest border-white/10 hover:border-slate-400 transition-all" onClick={() => navigate('/register')}>
                            Create Identity
                        </Button>
                    </div>

                    <div className="flex items-center justify-center lg:justify-start gap-8 pt-8 opacity-50 grayscale hover:grayscale-0 transition-all">
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="w-5 h-5" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Certified Protocols</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Zap className="w-5 h-5" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Rapid Recovery</span>
                        </div>
                    </div>
                </div>

                {/* Hero Visual Cards */}
                <div className="grid grid-cols-2 gap-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="col-span-2 sm:col-span-1"
                    >
                        <Card className="h-64 flex flex-col justify-end p-8 border-white/5 hover:border-slate-500 bg-slate-950 transition-all group" hover={false}>
                            <YogaLogo className="w-16 h-16 text-slate-400 mb-4 group-hover:scale-110 transition-transform" />
                            <h3 className="text-xl font-bold uppercase italic tracking-tighter">Precision Modules</h3>
                            <p className="text-xs text-slate-500 italic">Targeted decompression for cockpit & cabin crews.</p>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="col-span-2 sm:col-span-1"
                    >
                        <Card className="h-64 flex flex-col justify-end p-8 border-white/5 hover:border-slate-500 bg-slate-950 mt-0 lg:mt-12 transition-all group" hover={false}>
                            <Wind className="w-12 h-12 text-slate-400 mb-4 group-hover:scale-110 transition-transform" />
                            <h3 className="text-xl font-bold uppercase italic tracking-tighter">Jet Lag Reset</h3>
                            <p className="text-xs text-slate-500 italic">Circadian rhythm synchronization algorithm.</p>
                        </Card>
                    </motion.div>

                    <Card className="col-span-2 p-6 flex items-center justify-between border-white/5 bg-slate-900/40 relative overflow-hidden group" hover={false}>
                        <div className="flex items-center gap-6">
                            <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center border border-white/10">
                                <Award className="w-8 h-8 text-slate-400" />
                            </div>
                            <div>
                                <h4 className="text-lg font-bold uppercase italic tracking-tighter">Elite Reward Tier</h4>
                                <p className="text-xs text-slate-500 italic">Earn sky-miles & lounge perks for consistency.</p>
                            </div>
                        </div>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:opacity-100 transition-opacity" />
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Home;
