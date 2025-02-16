import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthModal } from '../../context/AuthModalContext';
import { useLoginAdmin } from '../../hooks/auth/useLoginAdmin';
import { LogIn, Mail, Lock, Loader } from 'lucide-react';

const AuthModal = () => {
    const navigate = useNavigate();
    const mutation = useLoginAdmin();
    const { isAuthModalOpen, setIsAuthModalOpen } = useAuthModal();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    if (!isAuthModalOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();

        mutation.mutate(formData, {
            onSuccess: () => {
                navigate('/');
                setIsAuthModalOpen(false);
            },
            onError: (error) => {
                const message = error.response?.data?.message || error.message;
                console.error('Login error:', error, message);
            },
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop with blur */}
            <div className="absolute inset-0 bg-emerald-900/20 backdrop-blur-sm"></div>

            {/* Modal Container */}
            <div className="relative w-full max-w-md p-8">
                {/* Decorative elements */}
                <div className="absolute -top-4 -left-4 w-32 h-32 bg-emerald-400 rounded-full filter blur-3xl opacity-20"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-orange-400 rounded-full filter blur-3xl opacity-20"></div>

                {/* Modal Content */}
                <div className="relative bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-emerald-100">
                    <div className="space-y-8">
                        {/* Header */}
                        <div className="text-center space-y-2">
                            <div className="inline-flex p-4 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl shadow-lg">
                                <LogIn className="h-8 w-8 text-white" />
                            </div>
                            <h2 className="text-3xl font-bold">
                                Welcome Back
                            </h2>
                            <p className="text-slate-600">
                                Sign in to access your dashboard
                            </p>
                        </div>

                        {/* Form */}
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                {/* Email Field */}
                                <div className="relative">
                                    <label className="block text-sm font-medium mb-1">
                                        Email address
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-400" />
                                        <input
                                            type="email"
                                            required
                                            className={`w-full pl-10 pr-4 py-3 bg-white/50 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                                                mutation.error
                                                    ? 'border-orange-400 focus:ring-orange-400'
                                                    : 'border-emerald-200 focus:ring-emerald-400'
                                            }`}
                                            value={formData.email}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    email: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>

                                {/* Password Field */}
                                <div className="relative">
                                    <label className="block text-sm font-medium mb-1">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-400" />
                                        <input
                                            type="password"
                                            required
                                            className={`w-full pl-10 pr-4 py-3 bg-white/50 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                                                mutation.error
                                                    ? 'border-orange-400 focus:ring-orange-400'
                                                    : 'border-emerald-200 focus:ring-emerald-400'
                                            }`}
                                            value={formData.password}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    password: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Remember Me */}
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500"
                                />
                                <label
                                    htmlFor="remember-me"
                                    className="ml-2 text-sm text-emerald-600"
                                >
                                    Remember me
                                </label>
                            </div>

                            {/* Error Message */}
                            {mutation.error && (
                                <p className="text-center text-sm text-orange-400">
                                    {mutation.error.response?.data?.message ||
                                        mutation.error.message}
                                </p>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={mutation.isLoading}
                                className="w-full group relative"
                            >
                                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-orange-400 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
                                <div className="relative flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-xl text-white font-semibold hover:scale-[1.02] active:scale-[0.98] transition duration-200">
                                    {mutation.isLoading ? (
                                        <Loader className="h-5 w-5 animate-spin" />
                                    ) : (
                                        <LogIn className="h-5 w-5" />
                                    )}
                                    {mutation.isLoading
                                        ? 'Signing in...'
                                        : 'Sign in'}
                                </div>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
