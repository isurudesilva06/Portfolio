import React from 'react';
import { socialLinks } from '../config/socialLinks';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const navigate = useNavigate();

    // Quick links
    const links = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Projects', href: '#work' },
        { name: 'Skills', href: '#skills' },
        { name: 'Contact', href: '#contact' }
    ];

    return (
        <footer className="relative text-white overflow-hidden">
            {/* Enhanced gradient background shapes */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-purple-900/20 via-fuchsia-900/10 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
            <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-blue-900/20 via-indigo-900/10 to-transparent rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
            <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] bg-gradient-to-tr from-pink-900/20 via-rose-900/10 to-transparent rounded-full blur-3xl animate-pulse"></div>

            {/* Modern top border */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

            {/* Content wrapper with max width and margins */}
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
                {/* Main footer content */}
                <div className="py-16 grid grid-cols-1 md:grid-cols-12 gap-12">
                    {/* Brand section - Spans 5 columns */}
                    <div className="md:col-span-5 space-y-8">
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <img src="/assets/img/Remove.png" alt="Yashindi Bhagya" className="h-12 w-auto" />
                            </div>
                            <p className="text-gray-400 text-lg leading-relaxed max-w-lg">
                                Crafting intuitive digital experiences through innovative UI/UX design and mobile app development.
                            </p>
                        </div>

                        {/* Social links with enhanced styling */}
                        <div className="flex gap-4">
                            {socialLinks.map(social => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#1a237e] via-[#1976d2] to-[#263238] rounded-lg blur-lg opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                                    <div className="relative w-10 h-10 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:border-white/30 group-hover:transform group-hover:scale-110">
                                        <span className="text-gray-400 group-hover:text-white transition-colors duration-300">
                                            {social.icon}
                                        </span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Spacer column */}
                    <div className="hidden md:block md:col-span-3"></div>

                    {/* Quick Links section - Spans 4 columns */}
                    <div className="md:col-span-4">
                        <h3 className="text-xl font-semibold mb-8 pb-2 border-b border-white/10 relative">
                            Quick Links
                            <div className="absolute bottom-0 left-0 w-1/4 h-0.5 bg-gradient-to-r from-[#1a237e] to-[#263238]"></div>
                        </h3>
                        <div className="grid grid-cols-2 gap-6">
                            {links.map(link => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="group flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#1a237e] to-[#263238] transform transition-transform group-hover:scale-150"></span>
                                    <span className="font-medium">{link.name}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom bar with enhanced styling */}
                <div className="relative py-8 border-t border-white/10">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <p className="text-gray-400 text-sm">
                            &copy; {currentYear} <span className="text-white font-medium">Yashindi</span>. All rights reserved.
                        </p>

                        <div className="flex items-center px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
                            <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                            <span className="text-white/80 text-sm font-medium">Available for Work</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Enhanced bottom gradient line */}
            <div className="relative h-1 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#1a237e] via-[#1976d2] to-[#263238]"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
            </div>
        </footer>
    );
};

export default Footer;