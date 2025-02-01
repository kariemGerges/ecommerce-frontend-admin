import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
    return (
        <Link
            to="/"
            className="text-2xl font-bold flex-shrink-0 transition-transform hover:scale-105"
            aria-label="FreshMart Home"
        >
            <div className="font-bold text-3xl">
                <span className="text-emerald-600 dark:text-emerald-400">
                    Pickup
                </span>
                <span className="text-orange-400 dark:text-orange-300">
                    Dashboard
                </span>
            </div>
        </Link>
    );
};

export default Logo;
