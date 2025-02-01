import React, { createContext, useContext, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '../services/api/auth';

// Create AuthContext
const AuthLoginContext = createContext();

// AuthProvider: Wrap the app with this provider
export const AuthLoginProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Store authenticated user
    const [loading, setLoading] = useState(true); // Loading state for profile check

    // Fetch the user profile on app load
    // that what it looks like before
    // const { data, isError, isLoading, refetch } = useQuery({
    const { refetch } = useQuery({
        queryKey: ['userProfile'], // unique query key
        queryFn: getUserProfile, // function to fetch user profile
        onSuccess: (data) => {
            setUser(data); // Set user state when profile is fetched
        },
        onError: () => {
            setUser(null); // Reset user if not authenticated
        },
        retry: false, // Prevent endless retries on failure
        enabled: false, // Disabled initially; manually triggered
    });

    useEffect(() => {
        // Check user profile on initial load
        const checkAuth = async () => {
            try {
                await refetch(); // Fetch user profile
            } catch (error) {
                console.error('Auth check error:', error);
            } finally {
                setLoading(false); // Stop loading once check completes
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
