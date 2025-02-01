import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthModal } from '../../context/AuthModalContext';
import { useLoginAdmin } from '../../hooks/auth/useLoginAdmin';

// import Background from '../Background/FloatingEquation';

const AuthModal = () => {
    const navigate = useNavigate();
    const mutation = useLoginAdmin();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    // remove from here to if statement to have the modal open by default
    //////////////////////////////////////////
    const { isAuthModalOpen, setIsAuthModalOpen } = useAuthModal();

    if (!isAuthModalOpen) return null;

    //////////////////////////////////////////
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
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    mutation.error
                                        ? 'border-red-500'
                                        : 'border-gray-300'
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

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    mutation.error
                                        ? 'border-red-500'
                                        : 'border-gray-300'
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

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label
                                htmlFor="remember-me"
                                className="ml-2 block text-sm text-gray-900"
                            >
                                Remember me
                            </label>
                        </div>
                    </div>
                    {mutation.error && (
                        <p className="text-center mt-1 text-sm text-red-600">
                            {mutation.error.response?.data?.message ||
                                mutation.error.message}
                        </p>
                    )}

                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed"
                        >
                            {mutation.isLoading ? 'Signing in...' : 'Sign in'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AuthModal;
