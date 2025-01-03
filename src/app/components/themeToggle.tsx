import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle: React.FC = () => {
    const { toggleTheme, isDarkMode } = useTheme(); // Get toggleTheme and isDarkMode from context

    return (
        <label className="flex items-center cursor-pointer">
            <div className="relative">
                <input
                    type="checkbox"
                    className="hidden"
                    checked={isDarkMode}
                    onChange={toggleTheme}
                />
                <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                <div
                    className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 ease-in-out ${
                        isDarkMode ? 'transform translate-x-full bg-gray-300' : ''
                    }`}
                ></div>
            </div>
            <span className="ml-3 text-gray-700 dark:text-gray-300">
                {isDarkMode ? 'Dark Mode' : 'Light Mode'}
            </span>
        </label>
    );
};

export default ThemeToggle;