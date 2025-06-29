import React, { useState, useEffect, useRef, useMemo } from 'react';

const Hero = () => {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const [isVisible, setIsVisible] = useState(false);
    const heroRef = useRef(null);
    const typedTextRef = useRef(null);

    // Move texts array inside useMemo to fix the hooks dependency warning
    const texts = useMemo(() => [
        "UI/UX Designer",
        "Mobile App Developer",
        "Front-End Developer"
    ], []);

    // Handle scroll to sections
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 60,
                behavior: 'smooth',
            });
        }
    };

    // Track window resize for better responsiveness
    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Fade-in on scroll using Intersection Observer
    useEffect(() => {
        const observer = new window.IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.2 }
        );
        if (heroRef.current) observer.observe(heroRef.current);
        return () => observer.disconnect();
    }, []);

    // Typing effect
    useEffect(() => {
        let timeout;
        let currentTextIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        const typingSpeed = 100;
        const delayAfterWord = 2000;

        const type = () => {
            const currentText = texts[currentTextIndex];

            if (isDeleting) {
                if (currentCharIndex > 0) {
                    if (typedTextRef.current) {
                        typedTextRef.current.textContent = currentText.substring(0, currentCharIndex - 1);
                        currentCharIndex--;
                        timeout = setTimeout(type, typingSpeed / 2);
                    }
                } else {
                    isDeleting = false;
                    currentTextIndex = (currentTextIndex + 1) % texts.length;
                    timeout = setTimeout(type, typingSpeed);
                }
            } else {
                if (currentCharIndex < currentText.length) {
                    if (typedTextRef.current) {
                        typedTextRef.current.textContent = currentText.substring(0, currentCharIndex + 1);
                        currentCharIndex++;
                        timeout = setTimeout(type, typingSpeed);
                    }
                } else {
                    timeout = setTimeout(() => {
                        isDeleting = true;
                        type();
                    }, delayAfterWord);
                }
            }
        };

        type();

        // Cleanup function to clear any pending timeouts
        return () => {
            if (timeout) {
                clearTimeout(timeout);
            }
            if (typedTextRef.current) {
                typedTextRef.current.textContent = '';
            }
        };
    }, [texts]);

    // Determine if device is in portrait orientation
    const isPortrait = windowSize.height > windowSize.width;

    return (
        <section
            id="home"
            ref={heroRef}
            className={`min-h-screen flex flex-col justify-center relative overflow-hidden py-6 sm:py-8 md:py-12 lg:py-16 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
            {/* Full screen particles background */}
            <div className="fixed inset-0 w-screen h-screen overflow-hidden pointer-events-none z-0">
                <div className="absolute w-full h-full opacity-20">
                    {Array(50).fill().map((_, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full animate-float"
                            style={{
                                width: `${Math.random() * 15 + 8}px`,
                                height: `${Math.random() * 15 + 8}px`,
                                background: `rgba(${Math.random() * 155 + 100}, ${Math.random() * 155 + 100}, 255, ${Math.random() * 0.4 + 0.3})`,
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 8}s`,
                                animationDuration: `${Math.random() * 15 + 15}s`
                            }}
                        />
                    ))}
                </div>
            </div>

            <div className="hero-container container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex-grow flex flex-col justify-center">
                <div className="hero-content flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 md:gap-12">
                    {/* Left Content */}
                    <div
                        className={`w-full lg:w-1/2 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                        style={{ transitionDelay: '0.2s' }}
                    >
                        {/* Status pill */}
                        <div className="inline-flex items-center px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white/10 backdrop-blur-md mb-3 sm:mb-4 md:mb-6 transition-all duration-300 hover:bg-white/15">
                            <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-green-400 mr-1.5 sm:mr-2 animate-pulse"></span>
                            <span className="text-gray-200 text-xs sm:text-sm">Available for new projects</span>
                        </div>

                        {/* Heading with modern typography */}
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-3 md:mb-4 leading-tight">
                            <span className="text-white">I'm </span>
                            <span className="animated-gradient-text">Isuru Nipun</span>
                        </h1>

                        {/* Typewriter Effect for roles */}
                        <div className="text-xl sm:text-2xl md:text-2xl text-gray-400 mb-4 sm:mb-6 md:mb-8 h-[1.5em]">
                            <span ref={typedTextRef}></span>
                            <span className="cursor inline-block w-[2px] h-[1em] bg-gray-400 ml-[2px] animate-[blink_1s_infinite]"></span>
                        </div>

                        {/* Description with gradient text highlights */}
                        <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 md:mb-10 max-w-2xl leading-relaxed">
                            Transforming ideas into <span className="animated-gradient-text">exceptional digital experiences</span> through creative design and innovative development.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={() => scrollToSection('contact')}
                                className="px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-gradient-to-r from-[#1a237e] via-[#1976d2] to-[#263238] text-white font-semibold text-sm sm:text-base hover:shadow-lg hover:shadow-steel-500/25 transition-all duration-300 hover:-translate-y-1 button-animate"
                            >
                                Let's Talk
                            </button>
                            <button
                                onClick={() => scrollToSection('work')}
                                className="px-6 sm:px-8 py-3 sm:py-4 rounded-full border-2 border-white/10 hover:border-white/20 text-white font-semibold text-sm sm:text-base backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 button-animate"
                            >
                                View Projects
                            </button>
                        </div>
                    </div>

                    {/* Right Content - Image */}
                    <div
                        className={`w-full lg:w-1/2 flex justify-center ${isPortrait ? 'mt-6 lg:mt-0' : ''} transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                        style={{ transitionDelay: '0.4s' }}
                    >
                        <div className="hero-image-container relative">
                            {/* Professional frame for image */}
                            <div className="relative overflow-hidden">
                                {/* Main image with elegant dark border */}
                                <div>
                                    {/* Image with overlay */}
                                    <div className="absolute inset-0"></div>
                                    <img
                                        src="/assets/img/pic.png"
                                        alt="Yashindi Bhagya"
                                        className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl object-cover"
                                        style={{
                                            height: 'auto',
                                            maxHeight: isPortrait ? '50vh' : '70vh'
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Floating skill badges with glassmorphism */}
                            <div className="hero-badge left absolute -bottom-4 -left-4 px-4 py-2 rounded-full bg-[#0c0c20]/80 backdrop-blur-md border border-white/10 text-white text-sm shadow-lg shadow-purple-500/10">
                                Developer
                            </div>
                            <div className="hero-badge right absolute -top-4 -right-4 px-4 py-2 rounded-full bg-[#0c0c20]/80 backdrop-blur-md border border-white/10 text-white text-sm shadow-lg shadow-purple-500/10">
                                UI/UX Designer
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modern Marquee with dual animations for seamless looping */}
            <div
                className={`w-full absolute bottom-0 left-0 overflow-hidden transition-all duration-1000 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{ transitionDelay: '0.6s' }}
            >
                <div className="relative py-2 sm:py-3 md:py-4 bg-gradient-to-r from-[#1a237e] via-[#1976d2] to-[#263238] backdrop-blur-sm border-t border-white/10">
                    <div className="flex whitespace-nowrap overflow-hidden">
                        {/* First line of text */}
                        <div className="animate-marquee whitespace-nowrap flex items-center">
                            {Array(10).fill().map((_, i) => (
                                <span key={i} className="inline-flex items-center mx-4">
                                    <span className="text-white text-xs sm:text-sm font-medium">PIXEL-PERFECT PRECISION</span>
                                    <span className="mx-2 sm:mx-4 text-white/70">•</span>
                                    <span className="text-white text-xs sm:text-sm font-medium">CREATIVE PROBLEM-SOLVING</span>
                                    <span className="mx-2 sm:mx-4 text-white/70">•</span>
                                    <span className="text-white text-xs sm:text-sm font-medium">RESPONSIVE DESIGN</span>
                                    <span className="mx-2 sm:mx-4 text-white/70">•</span>
                                </span>
                            ))}
                        </div>
                        {/* Duplicate for seamless loop */}
                        <div className="animate-marquee whitespace-nowrap flex items-center">
                            {Array(10).fill().map((_, i) => (
                                <span key={`dup-${i}`} className="inline-flex items-center mx-4">
                                    <span className="text-white text-xs sm:text-sm font-medium">PIXEL-PERFECT PRECISION</span>
                                    <span className="mx-2 sm:mx-4 text-white/70">•</span>
                                    <span className="text-white text-xs sm:text-sm font-medium">CREATIVE PROBLEM-SOLVING</span>
                                    <span className="mx-2 sm:mx-4 text-white/70">•</span>
                                    <span className="text-white text-xs sm:text-sm font-medium">RESPONSIVE DESIGN</span>
                                    <span className="mx-2 sm:mx-4 text-white/70">•</span>
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;

<style>
{`
@keyframes gradient-move {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}
.animate-gradient-move {
  background-size: 200% 200%;
  animation: gradient-move 3s linear infinite alternate;
}
`}
</style>