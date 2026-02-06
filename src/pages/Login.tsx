import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { useAppState } from '../context/AppState';
import { ShieldCheck, Mail, Lock } from 'lucide-react';
import { YogaLogo } from '../components/ui/YogaLogo';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAppState();
    const [loading, setLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            login();
            navigate('/yoga-dashboard');
        }, 1500);
    };

    return (
        <div className="min-h-[70vh] flex items-center justify-center">
            <div className="w-full max-w-6xl grid lg:grid-cols-2 bg-slate-900/40 rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
                {/* Left Side: Branding/Visual */}
                <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-slate-800 to-slate-950 relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="mb-10">
                            <YogaLogo className="w-20 h-20 text-white" />
                        </div>
                        <h2 className="text-4xl font-black italic text-white uppercase tracking-tighter leading-none mb-4">
                            Welcome Back <br /> captain
                        </h2>
                        <p className="text-slate-400 font-medium italic max-w-sm">
                            Access your personalized aviation wellness dashboard and flight-ready routines.
                        </p>
                    </div>

                    <div className="relative z-10 flex items-center gap-4 bg-black/20 p-4 rounded-2xl border border-white/5">
                        <ShieldCheck className="w-8 h-8 text-slate-400" />
                        <div className="text-xs font-bold text-white uppercase tracking-widest leading-relaxed">
                            Secure Cloud Authentication <br /> Authorized Personnel Only
                        </div>
                    </div>

                    {/* Background Decorative Element */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] rounded-full -mr-32 -mt-32" />
                </div>

                {/* Right Side: Form */}
                <div className="p-8 md:p-12 lg:p-16 space-y-10">
                    <div className="space-y-3">
                        <h3 className="text-3xl font-black italic tracking-tighter uppercase">Sign In</h3>
                        <p className="text-slate-500 text-sm font-medium">Please enter your credentials to authenticate.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-8">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1">Fleet Email</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within:text-slate-300 transition-colors" />
                                    <input
                                        type="email"
                                        defaultValue="pilot@ifoa.com"
                                        className="w-full h-14 bg-slate-950/50 border border-white/10 rounded-2xl pl-12 pr-4 text-white focus:outline-none focus:border-slate-500/50 focus:bg-slate-950 transition-all font-bold tracking-tight"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1">Access Token</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within:text-slate-300 transition-colors" />
                                    <input
                                        type="password"
                                        defaultValue="********"
                                        className="w-full h-14 bg-slate-950/50 border border-white/10 rounded-2xl pl-12 pr-4 text-white focus:outline-none focus:border-slate-500/50 focus:bg-slate-950 transition-all font-bold tracking-tight"
                                        placeholder="Enter your password"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <Button type="submit" size="lg" className="w-full h-16 text-lg font-black uppercase tracking-widest shadow-2xl bg-white text-slate-950 hover:bg-slate-100 border-none" disabled={loading}>
                            {loading ? 'Authenticating...' : 'Establish Connection'}
                        </Button>
                    </form>

                    <div className="text-center">
                        <p className="text-sm text-slate-500 font-medium italic">
                            New crew member?{' '}
                            <button onClick={() => navigate('/register')} className="text-slate-300 font-black uppercase tracking-widest text-xs ml-2 hover:underline">
                                Request Access
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
