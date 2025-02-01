import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logoutUser } from '../../services/api/auth';
import { useLoginAuth } from '../../context/AuthLoginContext';

export function useLogoutUser(options = {}) {
    const { setUser } = useLoginAuth();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            // Clear user state and localStorage
            setUser(null);
            localStorage.removeItem('token');

            // Invalidate userProfile query
            queryClient.invalidateQueries(['userProfile']);

            if (options?.onSuccess) {
                options.onSuccess();
            }
        },
        onError: (error) => {
            console.error('Logout error:', error);
            if (options?.onError) {
                options.onError(error);
            }
        },
        ...options,
    });
}
