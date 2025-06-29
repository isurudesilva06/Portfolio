import React, { useState, useEffect } from 'react';
import { socialLinks, contactInfo } from '../config/socialLinks';

const About = () => {
    // Small decorative dots that appear in the background
    const renderDecorationDots = () => {
        return (
            <>
                {/* Responsive dot positioning with smaller sizes on mobile */}
                <div className="absolute top-20 left-10 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white rounded-full opacity-30"></div>
                <div className="absolute bottom-40 right-20 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full opacity-20"></div>
                <div className="absolute top-1/3 right-1/4 w-0.5 h-0.5 sm:w-1 sm:h-1 bg-white rounded-full opacity-40"></div>
                <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full opacity-30"></div>
                <div className="absolute top-2/3 right-10 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white rounded-full opacity-25"></div>
            </>
        );
    };

    // State for the slow animated dots
    const [dots, setDots] = useState(() =>
        Array(60).fill().map(() => ({
            top: Math.random() * 100,
            left: Math.random() * 100,
            opacity: Math.random() * 0.5 + 0.2,
            size: 1 // keep all dots the same size of 1px
        }))
    );

    // Effect for slow animated dots
    useEffect(() => {
        // Function to update random dots
        const updateRandomDots = () => {
            setDots(prevDots => {
                return prevDots.map(dot => {
                    // Randomly decide which dots to update (only 10% chance to make it slower)
                    if (Math.random() < 0.1) {
                        return {
                            ...dot,
                            top: Math.random() * 100,
                            left: Math.random() * 100,
                            opacity: Math.random() * 0.5 + 0.2
                        };
                    }
                    return dot;
                });
            });
        };

        // Set interval to update dots every 5 seconds (slower update interval)
        const intervalId = setInterval(updateRandomDots, 50000);

        // Clean up interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    const [isVisible, setIsVisible] = useState(false);
    const aboutRef = React.useRef(null);

    React.useEffect(() => {
        const observer = new window.IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.2 }
        );
        if (aboutRef.current) observer.observe(aboutRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section id="about" ref={aboutRef} className={`min-h-screen text-white relative py-12 md:py-16 lg:py-20 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {renderDecorationDots()}

            <div className="absolute inset-0 pointer-events-none">
                {dots.map((dot, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-gray-400 rounded-full"
                        style={{
                            top: `${dot.top}%`,
                            left: `${dot.left}%`,
                            opacity: dot.opacity,
                            // Add a very slow transition effect (8 seconds)
                            transition: 'all 1s ease-in-out'
                        }}
                    />
                ))}
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center text-center">
                    {/* Responsive title with adjusted sizing */}
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 animated-gradient-text">
                        Who Am I
                    </h2>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-6xl mx-auto">
                        {/* Text content with responsive padding and sizing */}
                        <div className="max-w-full md:max-w-3xl px-4 sm:px-6 md:px-8">
                            <p className="mb-4 sm:mb-6 text-base sm:text-lg">
                                Hey, I'm <span className="font-bold">Isuru Nipun</span>,A BSc (Hons) Computer Science student at NSBM, passionate about building intuitive digital experiences that blend design and functionality.
                            </p>

                            <p className="mb-4 sm:mb-6 text-gray-300 leading-relaxed text-sm sm:text-base">
                                With over a year of hands-on experience in UI/UX design, I specialize in user research, wireframing, and prototyping using tools like Figma, Adobe Photoshop, and Canva.
                            </p>

                            <p className="text-gray-300 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">
                                Beyond design, I develop mobile applications using React Native and create interactive games with Unity and C#. I enjoy turning ideas into real-world solutions whether it's a learning app, a game, or a user-centric platform.
                            </p>

                            <p className="text-gray-300 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">
                                I'm always eager to learn, collaborate, and take on challenges that push my creative and technical skills forward.
                            </p>

                            {/* Social Icons with responsive spacing */}
                            <div className="flex justify-center space-x-4 sm:space-x-6 mb-6 sm:mb-8">
                                <div className="flex flex-wrap gap-4">
                                    {socialLinks.map((social) => (
                                        <a
                                            key={social.name}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group"
                                        >
                                            <div className={`p-3 rounded-xl bg-white/[0.03] backdrop-blur-sm border border-white/10 transition-all duration-300 
                                            hover:bg-gradient-to-br ${social.gradient} hover:border-white/0 hover:scale-105 hover:shadow-lg`}>
                                                <div className="text-white/70 group-hover:text-white transition-colors">
                                                    {social.icon}
                                                </div>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Progress Bar with responsive width */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative h-1 w-full bg-gray-800 rounded-full overflow-hidden my-6 sm:my-8 lg:my-10">
                        <div className="w-full h-full bg-gradient-to-r from-[#1a237e] via-[#1976d2] to-[#263238] p-4 text-white rounded-lg rounded-full relative">
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;