import React, { createContext, useContext, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '../services/api/auth';

// Create AuthContext
const AuthLoginContext = createContext();

// AuthProvider: Wrap the app with this provider
export const AuthLoginProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Store authenticated user
    const [loading, setLoading] = useState(true); // Loading state for profile check

    const { refetch } = useQuery({
        queryKey: ['userProfile'], // Unique query key
        queryFn: async () => {
            const data = await getUserProfile();
            return data;
        },
        onSuccess: (data) => {
            setUser(data); // Set user state when profile is fetched
        },
        onError: () => {
            setUser(null); // Reset user if not authenticated
        },
        retry: false,
        enabled: false, // Disabled initially; manually triggered
    });

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { data } = await refetch(); // Fetch user profile
                setUser(data || null); // Update user state
            } catch (error) {
                console.error('Auth check error:', error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [refetch]);

    return (
        <AuthLoginContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthLoginContext.Provider>
    );
};

// Custom hook to use AuthContext
export const useLoginAuth = () => useContext(AuthLoginContext);
