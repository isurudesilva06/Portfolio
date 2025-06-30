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
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        } else {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                setIsMenuOpen(false);
            }
        }
    };

    const bgColor = darkMode !== false ? 'bg-black' : 'bg-white';
    const textColor = darkMode !== false ? 'text-white' : 'text-gray-800';
    const hoverColor = darkMode !== false ? 'hover:text-gray-300' : 'hover:text-gray-600';

    return (
        <header className={`fixed left-0 z-50 navbar-neon bg-black/60 backdrop-blur-md border-b border-gradient-to-r from-[#bc50ff55] via-[#1976d2aa] to-[#26323855] shadow-2xl mt-3 transition-colors duration-300 navbar-glass w-full`} style={{ boxShadow: '0 8px 32px 0 rgba(30,40,90,0.18)' }}>
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex items-center h-16">
                    {/* Logo on the left */}
                    <div className="flex-shrink-0">
                        <div className="flex items-center cursor-pointer logo-animate" onClick={() => navigate('/')}>
                            <img src="/assets/img/logo 3.png" alt="Yashindi Bhagya" className="h-12 w-auto" />
                        </div>
                    </div>

                    {/* Right-aligned Navigation and Contact Button */}
                    <div className="hidden md:flex items-center space-x-8 ml-auto">
                        <nav className="flex space-x-8">
                            {[
                                { name: 'Home', section: 'home' },
                                { name: 'About', section: 'about' },
                                { name: 'Projects', section: 'work' },
                            ].map((item) => {
                                const isActive = activeSection === item.section && !isProjectPage;
                                return (
                                    <button
                                        key={item.name}
                                        onClick={() => scrollToSection(item.section)}
                                        style={{ color: '#ffffff !important' }}
                                        className={`px-3 py-2 text-sm font-medium transition-colors duration-200 button-animate !text-white drop-shadow-[0_1px_8px_rgba(25,118,210,0.7)] ${
                                            isActive
                                                ? 'bg-gradient-to-r from-[#22305a] via-[#1976d2] to-[#1a237e] font-bold shadow-[0_2px_16px_0_rgba(25,118,210,0.25)] rounded-lg'
                                                : 'hover:!text-gray-300'
                                        }`}
                                    >
                                        <span style={{ color: '#ffffff' }}>{item.name}</span>
                                    </button>
                                );
                            })}
                        </nav>
                        <button
                            onClick={() => scrollToSection('contact')}
                            style={{ color: '#ffffff' }}
                            className="px-6 py-2 bg-gradient-to-r from-[#1a237e] via-[#1976d2] to-[#263238] !text-white drop-shadow-[0_1px_8px_rgba(25,118,210,0.7)] font-bold rounded-full hover:opacity-90 transition-opacity duration-200 whitespace-nowrap button-animate"
                        >
                            Contact Me
                        </button>
                    </div>

                    {/* Mobile menu button on the right */}
                    <div className="md:hidden ml-auto">
                        <button
                            onClick={toggleMenu}
                            style={{ color: '#ffffff' }}
                            className="inline-flex items-center justify-center p-2 rounded-md !text-white hover:!text-gray-300 focus:outline-none button-animate"
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

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-black/90 backdrop-blur-md border-t border-gray-700">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {[
                            { name: 'Home', section: 'home' },
                            { name: 'About', section: 'about' },
                            { name: 'Projects', section: 'work' },
                        ].map((item) => {
                            const isActive = activeSection === item.section && !isProjectPage;
                            return (
                                <button
                                    key={item.name}
                                    onClick={() => scrollToSection(item.section)}
                                    style={{ color: '#ffffff' }}
                                    className={`block px-3 py-2 rounded-md text-base font-medium w-full text-center button-animate !text-white ${
                                        isActive
                                            ? 'bg-gradient-to-r from-[#22305a] via-[#1976d2] to-[#1a237e] font-bold shadow-[0_2px_16px_0_rgba(25,118,210,0.25)] rounded-lg'
                                            : 'hover:!text-gray-300'
                                    }`}
                                >
                                    <span style={{ color: '#ffffff' }}>{item.name}</span>
                                </button>
                            );
                        })}
                        <button
                            onClick={() => scrollToSection('contact')}
                            style={{ color: '#ffffff' }}
                            className="block w-full text-center mt-3 px-3 py-2 bg-gradient-to-r from-[#1a237e] via-[#1976d2] to-[#263238] !text-white rounded-full hover:opacity-90 transition-opacity duration-200 font-medium button-animate"
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