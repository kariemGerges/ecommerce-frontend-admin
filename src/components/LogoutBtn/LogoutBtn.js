import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLogoutUser } from '../../hooks/auth/useLogoutAdmin';

const LogoutButton = () => {
    const navigate = useNavigate();
    // const [error, setError] = useState(null); // To capture any logout error
    const logoutMutation = useLogoutUser();

    const handleLogout = () => {
        logoutMutation.mutate(null, {
            onSuccess: () => {
                // Clear localStorage token
                localStorage.removeItem('token');

                // Clear error state
                // setError(null);

                // Navigate to the home page
                setTimeout(() => navigate('/', { replace: true }), 0);
            },
            onError: (error) => {
                // Set error message if logout fails
                // setError(error?.message || 'Failed to logout.');
            },
        });
    };

    return (
        <section>
            {/* Logout Button */}
            <button
                className="flex items-center gap-2"
                onClick={handleLogout}
                disabled={logoutMutation.isLoading} // Disable button during logout
            >
                <LogOut className="w-4 h-4" />
                {logoutMutation.isLoading ? 'Logging out...' : 'Logout'}
            </button>

            {/* Display Error Message */}
            {/* {error && <p className="text-red-500 mt-2">{error}</p>} */}
        </section>
    );
};

export default LogoutButton;
