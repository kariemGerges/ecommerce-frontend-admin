import { LogIn } from 'lucide-react';
import LoggedInDashboard from './LoggedInDashboard';
import { useLoginAuth } from '../../context/AuthLoginContext';
import { useAuthModal } from '../../context/AuthModalContext';

const DashboardHome = () => {
    const { user } = useLoginAuth();
    const { setIsAuthModalOpen } = useAuthModal();


    if (!user)
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
                <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full text-center">
                    <LogIn className="mx-auto mb-6 text-blue-500" size={64} />
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">
                        Please Sign In
                    </h2>
                    <p className="text-gray-600 mb-6">
                        You need to be logged in to access this content. Please
                        sign in to continue using our service.
                    </p>
                    <button
                        onClick={() => setIsAuthModalOpen(true)}
                        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300 flex items-center justify-center"
                    >
                        <LogIn className="mr-2" size={20} />
                        Sign In
                    </button>
                </div>
            </div>
        );


    return <LoggedInDashboard />;
};

export default DashboardHome;
