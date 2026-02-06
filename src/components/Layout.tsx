import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { LogOut, Home, User, Trophy, BarChart3, ChevronLeft } from 'lucide-react';
import { useAppState } from '../context/AppState';
import { Button } from './ui/Button';
import { YogaLogo } from './ui/YogaLogo';

export const Layout = ({ children }: { children: React.ReactNode }) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { logout, isLoggedIn } = useAppState();

    const isAuth = pathname === '/' || pathname === '/login' || pathname === '/register';
    const showBack = !isAuth && pathname !== '/yoga-dashboard';

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col items-center">
            {/* Header - Stays fixed/sticky at the top */}
            <header className="w-full px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-center sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
                <div className="w-full max-w-7xl flex items-center justify-between relative">
                    <div className="flex items-center gap-4">
                        {/* Fixed Width Back Button Slot to prevent Logo shift */}
                        <div className="w-10 h-10 mr-2 flex items-center justify-center">
                            <button
                                onClick={() => navigate(-1)}
                                className={`w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl transition-all duration-300 ${showBack ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 pointer-events-none'
                                    }`}
                                aria-label="Go back"
                            >
                                <ChevronLeft className="w-5 h-5 text-slate-400" />
                            </button>
                        </div>
                        <Link to="/yoga-dashboard" className="flex items-center gap-3">
                            <YogaLogo className="w-15 h-15 text-slate-400" />
                            <h1 className="text-lg sm:text-xl font-black italic text-slate-200 tracking-tighter uppercase">
                                IFOA YOGA
                            </h1>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    {isLoggedIn && !isAuth && (
                        <nav className="hidden md:flex items-center gap-8">
                            <Link to="/yoga-dashboard" className={`flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-colors ${pathname === '/yoga-dashboard' ? 'text-slate-200' : 'text-slate-500 hover:text-white'}`}>
                                <Home className="w-4 h-4" /> Home
                            </Link>
                            <Link to="/leaderboard" className={`flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-colors ${pathname === '/leaderboard' ? 'text-slate-200' : 'text-slate-500 hover:text-white'}`}>
                                <Trophy className="w-4 h-4" /> Crew
                            </Link>
                            <Link to="/rewards" className={`flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-colors ${pathname === '/rewards' ? 'text-slate-200' : 'text-slate-500 hover:text-white'}`}>
                                <BarChart3 className="w-4 h-4" /> Stats
                            </Link>
                            <Link to="/profile" className={`flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-colors ${pathname === '/profile' ? 'text-slate-200' : 'text-slate-500 hover:text-white'}`}>
                                <User className="w-4 h-4" /> Profile
                            </Link>
                        </nav>
                    )}

                    <div className="flex items-center gap-3">
                        {isLoggedIn && (
                            <Button variant="ghost" size="sm" onClick={() => { logout(); navigate('/'); }} className="text-slate-500 hover:text-rose-500">
                                <LogOut className="w-5 h-5" />
                                <span className="hidden lg:block ml-2">Sign Out</span>
                            </Button>
                        )}
                        {!isLoggedIn && !isAuth && (
                            <Button size="sm" onClick={() => navigate('/login')}>Login</Button>
                        )}
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="w-full max-w-7xl flex-1 px-4 sm:px-6 lg:px-8 py-8 md:py-12 pb-32 md:pb-12 h-full">
                <div className="w-full">
                    {children}
                </div>
            </main>

            {/* Mobile Bottom Navigation */}
            {isLoggedIn && !isAuth && (
                <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] bg-slate-900/90 backdrop-blur-xl border border-white/10 px-8 py-4 flex justify-between items-center z-50 rounded-2xl shadow-2xl">
                    <Link to="/yoga-dashboard" className={`flex flex-col items-center gap-1 ${pathname === '/yoga-dashboard' ? 'text-slate-200' : 'text-slate-600'}`}>
                        <Home className="w-6 h-6" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Home</span>
                    </Link>
                    <Link to="/leaderboard" className={`flex flex-col items-center gap-1 ${pathname === '/leaderboard' ? 'text-slate-200' : 'text-slate-600'}`}>
                        <Trophy className="w-6 h-6" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Crew</span>
                    </Link>
                    <Link to="/rewards" className={`flex flex-col items-center gap-1 ${pathname === '/rewards' ? 'text-slate-200' : 'text-slate-600'}`}>
                        <BarChart3 className="w-6 h-6" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Stats</span>
                    </Link>
                    <Link to="/profile" className={`flex flex-col items-center gap-1 ${pathname === '/profile' ? 'text-slate-200' : 'text-slate-600'}`}>
                        <User className="w-6 h-6" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Profile</span>
                    </Link>
                </nav>
            )}

            {isAuth && (
                <footer className="w-full px-6 py-8 text-center text-[10px] font-bold text-slate-600 border-t border-white/5 bg-slate-950/50 uppercase tracking-widest mt-auto">
                    &copy; 2026 IFOA Fitness Module for Aviation Pro
                </footer>
            )}
        </div>
    );
};
