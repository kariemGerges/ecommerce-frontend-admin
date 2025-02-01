import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginAdmin } from '../../services/api/auth';
import { useLoginAuth } from '../../context/AuthLoginContext';

export function useLoginAdmin(options = {}) {
    const { setUser } = useLoginAuth(); // Access setUser from AuthContext
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: loginAdmin,
        onSuccess: (data) => {
            // Save token in localStorage
            localStorage.setItem('token', data.token);

            // Update user state in AuthContext
            setUser(data);

            // Optionally invalidate the profile query
            queryClient.invalidateQueries(['userProfile']);

            if (options?.onSuccess) {
                options.onSuccess(data);
            }
        },
        onError: (error) => {
            console.error('Login error:', error);
            if (options?.onError) {
                options.onError(error);
            }
        },
        ...options,
    });
}
