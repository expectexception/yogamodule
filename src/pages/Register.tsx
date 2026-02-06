import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { User, Mail, Lock, ShieldCheck } from 'lucide-react';
import { YogaLogo } from '../components/ui/YogaLogo';
import { useAppState } from '../context/AppState';

const Register = () => {
    const navigate = useNavigate();
    const { login } = useAppState();
    const [loading, setLoading] = useState(false);

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            login(); // Set authenticated state
            navigate('/profile-setup');
        }, 1500);
    };

    return (
        <div className="min-h-[70vh] flex items-center justify-center">
            <div className="w-full max-w-6xl grid lg:grid-cols-2 bg-slate-900/40 rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
                {/* Left Side: Branding/Visual */}
                <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-slate-900 to-slate-950 relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="mb-10">
                            <YogaLogo className="w-20 h-20 text-white" />
                        </div>
                        <h2 className="text-4xl font-black italic text-white uppercase tracking-tighter leading-none mb-4">
                            Join the <br /> elite fleet
                        </h2>
                        <p className="text-slate-400 font-medium italic max-w-sm">
                            Initialize your profile to gain access to tailored physiological maintenance protocols.
                        </p>
                    </div>

                    <div className="relative z-10 space-y-4">
                        <div className="flex items-center gap-4 bg-black/20 p-4 rounded-2xl border border-white/5">
                            <ShieldCheck className="w-8 h-8 text-slate-400" />
                            <div className="text-xs font-bold text-white uppercase tracking-widest leading-relaxed">
                                Biometric Data Encrypted <br /> Multi-factor Security
                            </div>
                        </div>
                    </div>

                    {/* Background Decorative Element */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 blur-[100px] rounded-full -mr-32 -mt-32" />
                </div>

                {/* Right Side: Form */}
                <div className="p-8 md:p-12 lg:p-16 space-y-8">
                    <div className="space-y-3">
                        <h3 className="text-3xl font-black italic tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">Request Access</h3>
                        <p className="text-slate-500 text-sm font-medium">Create your digital aviation health identity.</p>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-6">
                        <div className="space-y-4">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Full Name</label>
                                    <div className="relative group">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-slate-300 transition-colors" />
                                        <input
                                            type="text"
                                            className="w-full h-14 bg-slate-950/50 border border-white/10 rounded-2xl pl-12 pr-4 text-white focus:outline-none focus:border-slate-500/30"
                                            placeholder="Capt. J. Doe"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Fleet Email</label>
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-slate-300 transition-colors" />
                                        <input
                                            type="email"
                                            className="w-full h-14 bg-slate-950/50 border border-white/10 rounded-2xl pl-12 pr-4 text-white focus:outline-none focus:border-slate-500/30"
                                            placeholder="email@aviation.com"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Create Access Token</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-slate-300 transition-colors" />
                                    <input
                                        type="password"
                                        className="w-full h-14 bg-slate-950/50 border border-white/10 rounded-2xl pl-12 pr-4 text-white focus:outline-none focus:border-slate-500/30"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <Button type="submit" size="lg" className="w-full h-16 text-lg font-black uppercase tracking-widest shadow-2xl bg-white text-slate-950 hover:bg-slate-100 border-none mt-4" disabled={loading}>
                            {loading ? 'Processing...' : 'Initialize Profile'}
                        </Button>
                    </form>

                    <div className="text-center pt-4">
                        <p className="text-sm text-slate-500 font-medium italic">
                            Already registered?{' '}
                            <button onClick={() => navigate('/login')} className="text-slate-300 font-black uppercase tracking-widest text-xs ml-2 hover:underline transition-all">
                                Login Here
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
