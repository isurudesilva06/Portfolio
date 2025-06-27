import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ darkMode, toggleDarkMode, activeSection, isProjectPage = false }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const scrollToSection = (sectionId) => {
        if (isProjectPage) {
            navigate('/');
            setTimeout(() => {
                const element = document.getElementById(sectionId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        } else {
            const element = document.getElementById(sectionId);
            if (element) {
                window.scrollTo({
                    top: element.offsetTop - 60,
                    behavior: 'smooth',
                });
                setIsMenuOpen(false);
            }
        }
    };

    // Ensure styles default to dark mode even before state initialization
    const bgColor = darkMode !== false ? 'bg-black' : 'bg-white';
    const textColor = darkMode !== false ? 'text-white' : 'text-gray-800';
    const hoverColor = darkMode !== false ? 'hover:text-gray-300' : 'hover:text-gray-600';

    return (
        <header className={`fixed w-full z-50 ${bgColor} shadow-md mt-3 transition-colors duration-300`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
                            <img src="/assets/img/logo 3.png" alt="Yashindi Bhagya" className="h-12 w-auto" />
                        </div>
                    </div>

                    {/* Navigation and Contact Button Container */}
                    <div className="hidden md:flex items-center space-x-8 flex-1 justify-center">
                        {/* Navigation */}
                        <nav className="flex space-x-8">
                            {[
                                { name: 'Home', section: 'home' },
                                { name: 'About', section: 'about' },
                                { name: 'Projects', section: 'work' },
                            ].map((item) => (
                                <button
                                    key={item.name}
                                    onClick={() => scrollToSection(item.section)}
                                    className={`px-3 py-2 text-sm font-medium transition-colors duration-200 
                                        ${activeSection === item.section && !isProjectPage
                                            ? 'bg-gradient-to-r from-[#1a237e] via-[#1976d2] to-[#263238] bg-clip-text text-transparent'
                                            : darkMode !== false ? 'text-white hover:text-gray-300' : 'text-gray-800 hover:text-gray-600'
                                        }`}
                                >
                                    {item.name}
                                </button>
                            ))}
                        </nav>

                        {/* Contact Button - Now part of the centered container */}
                        <button
                            onClick={() => scrollToSection('contact')}
                            className="px-6 py-2 bg-gradient-to-r from-[#1a237e] via-[#1976d2] to-[#263238] text-white rounded-full hover:opacity-90 transition-opacity duration-200 font-medium whitespace-nowrap"
                        >
                            Contact Me
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className={`inline-flex items-center justify-center p-2 rounded-md ${textColor} ${hoverColor} focus:outline-none`}
                        >
                            <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {isMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu - Default to dark mode styling */}
            {isMenuOpen && (
                <div className={`md:hidden ${darkMode !== false ? 'bg-white border-gray-700' : 'bg-gray-100 border-gray-200'} border-t`}>
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {[
                            { name: 'Home', section: 'home' },
                            { name: 'About', section: 'about' },
                            { name: 'Projects', section: 'work' },
                        ].map((item) => (
                            <button
                                key={item.name}
                                onClick={() => scrollToSection(item.section)}
                                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-center ${activeSection === item.section && !isProjectPage
                                    ? 'bg-gradient-to-r from-[#1a237e] via-[#1976d2] to-[#263238] bg-clip-text text-transparent'
                                    : darkMode !== false ? 'text-black hover:text-gray-300' : 'text-gray-800 hover:text-gray-600'
                                    }`}
                            >
                                {item.name}
                            </button>
                        ))}
                        <button
                            onClick={() => scrollToSection('contact')}
                            className="block w-full text-center mt-3 px-3 py-2 bg-gradient-to-r from-[#1a237e] via-[#1976d2] to-[#263238] text-white rounded-full hover:opacity-90 transition-opacity duration-200 font-medium"
                        >
                            Contact Me
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;