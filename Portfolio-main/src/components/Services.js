import React, { useState, useEffect, useMemo } from 'react';

const ServicesSection = () => {
    // State to track which service is currently being hovered
    const [hoveredService, setHoveredService] = useState(null);

    // State to store random positions for tags
    const [tagPositions, setTagPositions] = useState({});

    // State to track visibility of the services section
    const [isVisible, setIsVisible] = useState(false);
    const servicesRef = React.useRef(null);

    // Memoize the services data so it doesn't change on every render
    const services = useMemo(() => [
        {
            id: 1,
            number: '01.',
            title: 'UI/UX DESIGN',
            description: 'Creating intuitive and visually stunning interfaces that enhance user experience and drive engagement.',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                    <line x1="9" y1="9" x2="9.01" y2="9" />
                    <line x1="15" y1="9" x2="15.01" y2="9" />
                </svg>
            ),
            tags: ['Wireframing', 'Prototyping', 'Empathy', 'Interfaces']
        },
        {
            id: 2,
            number: '02.',
            title: 'MOBILE APP DEVELOPMENT',
            description: 'Building responsive and high-performance websites tailored to meet your business goals.',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="4" />
                    <line x1="21.17" y1="8" x2="12" y2="8" />
                    <line x1="3.95" y1="6.06" x2="8.54" y2="14" />
                    <line x1="10.88" y1="21.94" x2="15.46" y2="14" />
                </svg>
            ),
            tags: ['Responsive', 'Frontend', 'Backend', 'Performance']
        },
        {
            id: 3,
            number: '03.',
            title: 'WEB DEVELOPMENT',
            description: 'Helping your business stand out with unique and memorable branding solutions.',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                </svg>
            ),
            tags: ['Responsive', 'Frontend', 'Backend', 'Performance']
        }
    ], []);

    // Generate random positi, 'REACT', 'HTML', 'CSS'ons for tags when a service is hovered
    useEffect(() => {
        if (hoveredService !== null) {
            const service = services.find(s => s.id === hoveredService);
            if (service) {
                const newPositions = {};

                service.tags.forEach((tag, index) => {
                    // Generate semi-random positions within tighter constraints
                    // These values will place tags closer around the service title
                    const positions = [
                        { top: '-40px', left: `${20 + (index * 15) % 60}%` }, // Top row
                        { top: '-40px', right: `${1 + (index * 20) % 40}%` }, // Top row right side
                        { bottom: '-40px', left: `${-20 + (index * 15) % 50}%` }, // Bottom row
                        { bottom: '-40px', right: `${5 + (index * 15) % 20}%` }, // Bottom row right side
                    ];

                    // Assign a position from our set of predefined positions
                    newPositions[tag] = positions[index % positions.length];
                });

                setTagPositions(newPositions);
            }
        }
    }, [hoveredService, services]);

    React.useEffect(() => {
        const observer = new window.IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.2 }
        );
        if (servicesRef.current) observer.observe(servicesRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section id="services" ref={servicesRef} className={`min-h-screen text-white relative overflow-hidden transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ marginTop: -50 }}>
            {/* Background particles/dots */}
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

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Reduced spacing between services: changed from space-y-40 md:space-y-48 to space-y-24 md:space-y-32 */}
                <div className="space-y-24 md:space-y-32">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="relative cursor-pointer group"
                            onMouseEnter={() => setHoveredService(service.id)}
                            onMouseLeave={() => setHoveredService(null)}
                        >
                            <div className="flex flex-col items-center text-center">
                                {/* Service Number */}
                                <div className="text-1xl font-bold text-gray-500 mb-2 group-hover:text-gray-400 transition-colors duration-300">
                                    {service.number}
                                </div>

                                {/* Service Content */}
                                <div className="relative">
                                    {/* Title */}
                                    <h2 className="text-5xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-300 mb-6 transition-all duration-300 group-hover:text-white">
                                        {service.title}
                                    </h2>

                                    {/* Tags that appear on hover with random positions */}
                                    {hoveredService === service.id && service.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="absolute px-3 py-1 p-[2px] rounded-lg bg-gradient-to-r from-[#1a237e] via-[#1976d2] to-[#263238] text-white text-sm rounded-full font-medium flex items-center z-20 transition-all duration-300 animate-fadeIn whitespace-nowrap"
                                            style={{
                                                ...tagPositions[tag],
                                                opacity: 0, // Start with 0 opacity
                                                animation: `fadeInTag 0.3s ease ${index * 0.1}s forwards` // Custom animation with staggered delay
                                            }}
                                        >
                                            {tag === 'Empathy' && (
                                                <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor" />
                                                </svg>
                                            )}
                                            {tag === 'Wireframing' && (
                                                <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                                                    <line x1="9" y1="3" x2="9" y2="21" stroke="currentColor" strokeWidth="2" />
                                                    <line x1="15" y1="3" x2="15" y2="21" stroke="currentColor" strokeWidth="2" />
                                                    <line x1="3" y1="9" x2="21" y2="9" stroke="currentColor" strokeWidth="2" />
                                                    <line x1="3" y1="15" x2="21" y2="15" stroke="currentColor" strokeWidth="2" />
                                                </svg>
                                            )}
                                            {tag === 'Prototyping' && (
                                                <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            )}
                                            {tag === 'Interfaces' && (
                                                <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                                                    <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
                                                    <circle cx="15.5" cy="8.5" r="1.5" fill="currentColor" />
                                                    <path d="M8.5 15.5C10 17 14 17 15.5 15.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                                </svg>
                                            )}
                                            {tag}
                                        </span>
                                    ))}

                                    {/* Description */}
                                    <p className="text-gray-400 max-w-2xl mx-auto transition-colors duration-300 group-hover:text-[#bc50ff]">
                                        {service.description}
                                    </p>
                                </div>

                                {/* Icon */}
                                <div className="w-16 h-16 rounded-full border border-gray-700 flex items-center justify-center text-gray-300 transition-all duration-300 group-hover:border-[#ff58d8] group-hover:text-[#ff58d8] mt-6">
                                    {service.icon}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative h-1 w-full bg-gray-800 rounded-full overflow-hidden my-6 sm:my-8 lg:my-10">
                        <div className="w-full h-full bg-gradient-to-r from-[#1a237e] via-[#1976d2] to-[#263238] p-4 text-white rounded-lg rounded-full relative">
                        </div>
                    </div>
                </div>

            </div>

            {/* Add the animation for tags */}
            <style jsx>{`
                @keyframes fadeInTag {
                    0% {
                        opacity: 0;
                        transform: scale(0.8) translateY(10px);
                    }
                    100% {
                        opacity: 1;
                        transform: scale(1) translateY(0);
                    }
                }
            `}</style>
        </section>
    );
};

export default ServicesSection;