import { useState, useEffect } from 'react';
import { UserCircle, Menu, X, ListChecks } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import LogoutButton from '../LogoutBtn/LogoutBtn';
import { useLoginAuth } from '../../context/AuthLoginContext';


const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useLoginAuth();

    // Close drawer when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            const drawer = document.getElementById('side-drawer');
            const menuButton = document.getElementById('menu-button');
            if (
                drawer &&
                !drawer.contains(event.target) &&
                !menuButton.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    // Prevent body scroll when drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <nav className="bg-white shadow-md">
            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 transition-opacity z-40"
                    aria-hidden="true"
                />
            )}

            {/* Side Drawer */}
            <div
                id="side-drawer"
                className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="p-4">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold">Menu</h2>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 hover:bg-gray-100 rounded-full"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    {user && (
                        <div className="space-y-6">
                            <div className="flex items-center space-x-2 px-2">
                                <UserCircle className="h-8 w-8 text-gray-500" />
                                <span className="text-sm font-medium">
                                    {user.name}
                                </span>
                            </div>
                            <div className="flex flex-col space-y-2">
                                <Link
                                    to="#"
                                    className="flex items-center gap-2"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <ListChecks className="h-5 w-5" />
                                    Inventory
                                </Link>
                                <div
                                    className="px-2 py-2"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <LogoutButton />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Header Content */}
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between h-16">
                    {/* Left section - Menu button and Logo */}
                    <div className="flex items-center space-x-4">
                        {user && (
                            <button
                                id="menu-button"
                                onClick={() => setIsOpen(!isOpen)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                aria-label="Open menu"
                            >
                                <Menu className="h-6 w-6" />
                            </button>
                        )}
                        <div className="flex-shrink-0 flex items-center">
                            <Logo />
                        </div>
                    </div>

                    {/* Right section - can be used for additional elements */}
                    <div className="flex items-center space-x-4">
                        {/* Add any additional right-side elements here */}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
