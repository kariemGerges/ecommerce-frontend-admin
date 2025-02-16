import React from 'react';
import { LogIn, Sparkles, Rocket } from 'lucide-react';
import LoggedInDashboard from './LoggedInDashboard';
import { useLoginAuth } from '../../context/AuthLoginContext';
import { useAuthModal } from '../../context/AuthModalContext';

const DashboardHome = () => {
    const { user } = useLoginAuth();
    const { setIsAuthModalOpen } = useAuthModal();

    if (!user) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-orange-50 relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-400 rounded-full filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-400 rounded-full filter blur-3xl opacity-20 translate-x-1/2 translate-y-1/2"></div>

                <div className="relative flex min-h-screen items-center justify-center p-8">
                    <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left side - Branding */}
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-emerald-600 rounded-xl">
                                        <Rocket className="h-8 w-8 text-white" />
                                    </div>
                                    <h1 className="text-6xl font-bold">
                                        <span className="text-emerald-600 font-pacifico">
                                            Pick
                                        </span>
                                        <span className="text-orange-400 font-pacifico">
                                            Me
                                        </span>
                                    </h1>
                                </div>
                                <p className="text-2xl font-medium">
                                    Committed to Your Customers' Satisfaction   
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
                                    <div className="p-3 bg-emerald-100 rounded-xl">
                                        <Sparkles className="h-6 w-6 text-emerald-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-emerald-600">
                                            Efficient Solutions
                                        </h3>
                                        <p className="text-stone-900/85">
                                            Seamless processes for optimal
                                            results
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
                                    <div className="p-3 bg-orange-100 rounded-xl">
                                        <Sparkles className="h-6 w-6 text-orange-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-orange-400">
                                            Reliable Service
                                        </h3>
                                        <p className="text-stone-900/90">
                                            Consistent excellence in delivery
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right side - Login Card */}
                        <div className="relative">
                            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-emerald-100">
                                <div className="space-y-8">
                                    <div className="text-center space-y-2">
                                        <div className="inline-flex p-4 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl shadow-lg">
                                            <LogIn className="h-8 w-8 text-white" />
                                        </div>
                                        <h2 className="text-3xl font-bold text-emerald-600">
                                            Welcome Back
                                        </h2>
                                        <p className="text-lg text-neutral-800">
                                            Sign in to access your personalized
                                            dashboard
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => setIsAuthModalOpen(true)}
                                        className="w-full group relative"
                                    >
                                        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-orange-400 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
                                        <div className="relative flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-xl text-white font-semibold text-lg hover:scale-[1.02] active:scale-[0.98] transition duration-200">
                                            <LogIn className="h-5 w-5" />
                                            Sign In to Get Started
                                        </div>
                                    </button>

                                    <div className="flex items-center gap-4 before:flex-1 before:border-t before:border-emerald-200 after:flex-1 after:border-t after:border-emerald-200">
                                        <span className="text-emerald-600/60 text-sm">
                                            Secure Login
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return <LoggedInDashboard />;
};

export default DashboardHome;
