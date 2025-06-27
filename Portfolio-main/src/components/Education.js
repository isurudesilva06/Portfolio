import React, { useEffect } from 'react';

const EducationExperience = () => {
    // Add the flow animation keyframes to the document only once
    useEffect(() => {
        if (!document.getElementById('flow-animation-style')) {
            const style = document.createElement('style');
            style.id = 'flow-animation-style';
            style.innerHTML = `
                @keyframes flow {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-100%);
                    }
                }
                
                .animate-flow {
                    display: inline-flex;
                    width: 200%;
                    animation: flow 20s linear infinite;
                }
                
                /* Prevent horizontal scrolling on the entire page */
                html, body {
                    overflow-x: hidden;
                    width: 100%;
                    position: relative;
                }
            `;
            document.head.appendChild(style);
        }
    }, []);

    return (
        <section className="py-16 sm:py-20 md:py-24 relative">
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(50)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-gray-400 rounded-full"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            opacity: Math.random() * 0.5 + 0.2
                        }}
                    />
                ))}
            </div>

            <div className="flex flex-col items-center">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-[#1a237e] via-[#1976d2] to-[#263238] bg-clip-text text-transparent">
                        Education & Experience
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        My academic journey and professional experience in the field of design and development
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 max-w-6xl">
                    {/* Education Section */}
                    <div className="space-y-8">
                        <h3 className="text-2xl font-bold text-white mb-8">Education</h3>
                        <div className="space-y-12">
                            {/* BSc Degree */}
                            <div className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-gradient-to-b from-[#1a237e] via-[#1976d2] to-[#263238]">
                                <div className="absolute left-0 top-0 w-2 h-2 bg-[#1976d2] rounded-full transform -translate-x-[3px]"></div>
                                <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 p-6 rounded-xl">
                                    <h4 className="text-xl font-semibold text-white mb-2">
                                        BSc (Hons) Computer Science
                                    </h4>
                                    <p className="text-gray-400 mb-2">
                                        National School of Business Management (Undergraduate)
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        2022-2025
                                    </p>
                                    <div className="mt-4">
                                        <ul className="list-disc list-inside text-gray-400 space-y-2">
                                            <li className="text-sm">
                                                Focused on software development, algorithms, and advanced computer science concepts. Specializing in UI/UX design and modern web technologies.
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Advanced Level */}
                            <div className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-gradient-to-b from-[#1a237e] to-[#1976d2]">
                                <div className="absolute left-0 top-0 w-2 h-2 bg-[#1976d2] rounded-full transform -translate-x-[3px]"></div>
                                <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 p-6 rounded-xl">
                                    <h4 className="text-xl font-semibold text-white mb-2">
                                        G.C.E. Advanced Level
                                    </h4>
                                    <p className="text-gray-400 mb-2">
                                        Sujatha Vidalaya, Nugegoda
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        2018-2021
                                    </p>
                                    <div className="mt-4">
                                        <ul className="list-disc list-inside text-gray-400 space-y-2">
                                            <li className="text-sm">
                                                Excelled in Combined Mathematics stream with a strong foundation in analytical thinking and problem-solving skills.
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Experience Section */}
                    <div className="space-y-8">
                        <h3 className="text-2xl font-bold text-white mb-8">Experience</h3>
                        <div className="space-y-12">
                            {/* Amerck */}
                            <div className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-gradient-to-b from-[#1a237e] to-[#1976d2]">
                                <div className="absolute left-0 top-0 w-2 h-2 bg-[#1976d2] rounded-full transform -translate-x-[3px]"></div>
                                <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 p-6 rounded-xl">
                                    <h4 className="text-xl font-semibold text-white mb-2">
                                        UI/UX Designer
                                    </h4>
                                    <p className="text-gray-400 mb-2">
                                        Amerck
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        2025 May - Present
                                    </p>
                                    <div className="mt-4">
                                        <ul className="list-disc list-inside text-gray-400 space-y-2">
                                            <li className="text-sm">
                                                Designed responsive user interfaces for cross-platform web and mobile applications across healthcare.
                                            </li>
                                            <li className="text-sm">
                                                Conducted user research and usability testing to inform design decisions
                                            </li>
                                            <li className="text-sm">
                                                Collaborated with development team to ensure pixel-perfect implementation
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* New Pacific Systems */}
                            <div className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-gradient-to-b from-[#1a237e] to-[#1976d2]">
                                <div className="absolute left-0 top-0 w-2 h-2 bg-[#1976d2] rounded-full transform -translate-x-[3px]"></div>
                                <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 p-6 rounded-xl">
                                    <h4 className="text-xl font-semibold text-white mb-2">
                                        UI/UX Designer
                                    </h4>
                                    <p className="text-gray-400 mb-2">
                                        New Pacific Systems
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        2023 Jan - 2023 Dec
                                    </p>
                                    <div className="mt-4">
                                        <ul className="list-disc list-inside text-gray-400 space-y-2">
                                            <li className="text-sm">
                                                Designed responsive web and mobile interfaces for enterprise clients
                                            </li>
                                            <li className="text-sm">
                                                Created and maintained design system documentation
                                            </li>
                                            <li className="text-sm">
                                                Facilitated design workshops and stakeholder presentations
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Services Bar */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden z-20">
                <div className="relative w-full h-8 sm:h-12 lg:h-16 overflow-hidden">
                    <div className="animate-flow whitespace-nowrap text-transparent font-extrabold tracking-wider flex items-center h-full" style={{ fontSize: '2.7rem', WebkitTextStroke: '0.5px white' }}>
                        <span className="mx-2 sm:mx-4">PIXEL-PERFECT PRECISION</span>
                        <span className="mx-2 sm:mx-4">•</span>
                        <span className="mx-2 sm:mx-4">CREATIVE PROBLEM-SOLVING</span>
                        <span className="mx-2 sm:mx-4">•</span>
                        <span className="mx-2 sm:mx-4">RESPONSIVE DESIGN</span>
                        <span className="mx-2 sm:mx-4">•</span>
                        <span className="mx-2 sm:mx-4">PIXEL-PERFECT PRECISION</span>
                        <span className="mx-2 sm:mx-4">•</span>
                        <span className="mx-2 sm:mx-4">CREATIVE PROBLEM-SOLVING</span>
                        <span className="mx-2 sm:mx-4">•</span>
                        <span className="mx-2 sm:mx-4">RESPONSIVE DESIGN</span>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
                <div className="relative h-1 w-full bg-gray-800 rounded-full overflow-hidden my-6 sm:my-8 lg:my-10">
                    <div className="w-full h-full bg-gradient-to-r from-[#1a237e] via-[#1976d2] to-[#263238] p-4 text-white rounded-lg rounded-full relative">
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EducationExperience;