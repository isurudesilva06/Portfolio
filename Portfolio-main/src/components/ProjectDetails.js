import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SiFigma, SiAdobephotoshop, SiReact, SiFirebase, SiCloudinary, SiTailwindcss, SiNodedotjs, SiCanva, SiVercel, SiGithub, SiBehance, SiBootstrap, SiJavascript, SiHtml5, SiCss3 } from 'react-icons/si';

// Import data from data file
import { projectsData, mockScreens } from '../data/projectsData';

// Lightbox component for displaying images in fullscreen
const ImageLightbox = ({ image, title, isOpen, onClose }) => {
    // Prevent scrolling when lightbox is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="relative w-full max-w-5xl mx-auto">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Image */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="relative"
                >
                    <img
                        src={image}
                        alt={title || "Image"}
                        className="max-h-[90vh] mx-auto object-contain"
                    />
                    {title && (
                        <div className="absolute bottom-4 left-0 right-0 text-center">
                            <div className="inline-block px-4 py-2 bg-black/60 backdrop-blur-sm text-white text-sm rounded-full">
                                {title}
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </motion.div>
    );
};

const toolIcons = {
    'Figma': { icon: SiFigma, color: '#F24E1E' },
    'Adobe Photoshop': { icon: SiAdobephotoshop, color: '#31A8FF' },
    'React Native': { icon: SiReact, color: '#61DAFB' },
    'React': { icon: SiReact, color: '#61DAFB' },
    'Firebase': { icon: SiFirebase, color: '#FFCA28' },
    'Cloudinary': { icon: SiCloudinary, color: '#3448C5' },
    'Tailwind CSS': { icon: SiTailwindcss, color: '#06B6D4' },
    'Node.js': { icon: SiNodedotjs, color: '#339933' },
    'Canva': { icon: SiCanva, color: '#00C4CC' },
    'Vercel': { icon: SiVercel, color: '#000000' },
    'GitHub': { icon: SiGithub, color: '#181717' },
    'Behance': { icon: SiBehance, color: '#1769FF' },
    'Bootstrap': { icon: SiBootstrap, color: '#7952B3' },
    'JavaScript': { icon: SiJavascript, color: '#F7DF1E' },
    'HTML5': { icon: SiHtml5, color: '#E34F26' },
    'CSS3': { icon: SiCss3, color: '#1572B6' }
};

const ToolIconWithTooltip = ({ tool, toolData }) => {
    const [showTooltip, setShowTooltip] = React.useState(false);
    return (
        <div
            className="w-10 h-10 rounded bg-transparent flex items-center justify-center relative group"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            tabIndex={0}
            aria-label={tool}
        >
            {toolData ? (
                <toolData.icon color={toolData.color} className="w-7 h-7" title={tool} />
            ) : (
                <span className="text-xs text-gray-400">{tool}</span>
            )}
            {showTooltip && (
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-xs rounded shadow-lg z-50 whitespace-nowrap pointer-events-none animate-fade-in">
                    {tool}
                </div>
            )}
        </div>
    );
};

const ProjectDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [hoverStates, setHoverStates] = useState({
        category: false,
        client: false,
        startDate: false,
        softwares: false
    });

    // State for lightbox
    const [lightbox, setLightbox] = useState({
        isOpen: false,
        image: null,
        title: null
    });

    // Make sure we always start at the top of the page when viewing details
    useEffect(() => {
        // This will ensure we're at the top of the page
        window.scrollTo(0, 0);

        // We must use a timeout to ensure the scroll happens after the page renders
        const topScrollTimeout = setTimeout(() => {
            window.scrollTo(0, 0);
        }, 50);

        return () => clearTimeout(topScrollTimeout);
    }, [id]);

    useEffect(() => {
        // Simulate fetching data from an API
        const fetchProject = () => {
            setLoading(true);
            // Find the project with the matching ID
            const foundProject = projectsData.find(p => p.id === parseInt(id));

            // Update the tools array to include specific software names for proper icon rendering
            if (foundProject) {
                // Make sure the tools are properly named for icon rendering
                foundProject.tools = foundProject.tools.map(tool => {
                    if (tool.toLowerCase().includes('figma')) return 'Figma';
                    if (tool.toLowerCase().includes('photoshop')) return 'Adobe Photoshop';
                    return tool;
                });
            }

            // Simulate network delay
            setTimeout(() => {
                setProject(foundProject);
                setLoading(false);
            }, 300);
        };

        fetchProject();
    }, [id]);

    // Function to handle hover states
    const handleHover = (section, isHovered) => {
        setHoverStates(prev => ({
            ...prev,
            [section]: isHovered
        }));
    };

    // Function to open the lightbox
    const openLightbox = (image, title) => {
        setLightbox({
            isOpen: true,
            image,
            title
        });
    };

    // Function to close the lightbox
    const closeLightbox = () => {
        setLightbox({
            ...lightbox,
            isOpen: false
        });
    };

    // Function to handle "Back to Projects" navigation
    const handleBackToProjects = () => {
        // Get the stored position if available
        const projectsSection = sessionStorage.getItem('projectsSectionPosition');

        // Navigate back to main page
        navigate('/');

        // Use setTimeout to ensure navigation completes first
        setTimeout(() => {
            // Try to find the projects section
            const workSection = document.getElementById('work');

            if (workSection && projectsSection) {
                // Scroll to the exact position the user was at in the projects section
                window.scrollTo({
                    top: parseInt(projectsSection),
                    behavior: 'auto' // Use auto for immediate positioning
                });
            } else if (workSection) {
                // If we don't have a saved position, just scroll to the work section
                workSection.scrollIntoView({ behavior: 'auto' });
            }
        }, 150); // Give the page a bit more time to load
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="relative w-20 h-20">
                    <div className="absolute top-0 left-0 w-full h-full border-4 border-t-transparent border-l-transparent border-lime-500 rounded-full animate-spin"></div>
                    <div className="absolute top-2 left-2 w-16 h-16 border-4 border-t-transparent border-l-transparent border-purple-500 rounded-full animate-spin-slow"></div>
                </div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 text-white">
                <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
                <p className="mb-6">The project you're looking for doesn't exist or has been removed.</p>
                <button
                    onClick={handleBackToProjects}
                    className="px-6 py-3 bg-lime-500 text-black rounded-full hover:shadow-lg hover:bg-lime-400 transition-all duration-300"
                >
                    Back to Projects
                </button>
            </div>
        );
    }

    return (
        <div className="text-white overflow-hidden relative">
            {/* Background gradients matching main theme */}
            <div className="fixed inset-0 z-0 overflow-hidden">
                {/* Primary gradients */}
                <div className="absolute -top-[40%] -right-[10%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-purple-500/20 to-fuchsia-500/10 blur-3xl"></div>
                <div className="absolute -bottom-[40%] -left-[10%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-500/20 to-sky-500/10 blur-3xl"></div>
                {/* Additional color spots */}
                <div className="absolute top-[30%] left-[15%] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-pink-500/10 to-rose-500/5 blur-3xl"></div>
                <div className="absolute bottom-[20%] right-[15%] w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-indigo-500/10 to-blue-500/5 blur-3xl"></div>
            </div>

            <AnimatePresence>
                {lightbox.isOpen && (
                    <ImageLightbox
                        image={lightbox.image}
                        title={lightbox.title}
                        isOpen={lightbox.isOpen}
                        onClose={closeLightbox}
                    />
                )}
            </AnimatePresence>

            {/* Back Button */}
            <div className="container mx-auto px-4 relative z-40 mt-24 mb-8">
                <button
                    onClick={handleBackToProjects}
                    className="flex items-center space-x-2 px-4 py-2 backdrop-blur-md text-white border border-white/10 rounded-full hover:bg-gradient-to-r hover:from-[#ff58d8] hover:to-[#4f4cfa] transition-all duration-300 shadow-lg hover:shadow-purple-500/20 group"
                >
                    <svg className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span>Back to Projects</span>
                </button>
            </div>

            {/* Header Section */}
            <div className="relative pt-4 pb-8 px-4 overflow-hidden">
                <div className="container mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-4"
                    >
                        <div className="text-center mb-3">
                            <div className="text-sm uppercase tracking-widest text-gray-400">{project.category}</div>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-[#1a237e] via-[#1976d2] to-[#263238] bg-clip-text text-transparent my-4 tracking-wider">
                            {project.title}
                        </h1>
                        <div className="text-1xl md:text-2xl text-white/80 max-w-3xl mx-auto">
                            {project.description}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Project Info Section */}
            <div className="relative py-8 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="container mx-auto max-w-6xl border-y border-white/10 py-8"
                >
                    <div className="grid grid-cols-3 gap-0">
                        <div
                            className="text-center"
                            onMouseEnter={() => handleHover('category', true)}
                            onMouseLeave={() => handleHover('category', false)}
                        >
                            <div className="uppercase text-gray-400 font-bold mb-3 tracking-wider">CATEGORY</div>
                            <div className={`text-lg font-medium transition-colors duration-300 ${hoverStates.category ? 'text-[#1976d2]' : 'text-white'}`}>
                                UI/UX DESIGN | WEB DESIGN
                            </div>
                        </div>

                        <div
                            className="text-center"
                            onMouseEnter={() => handleHover('startDate', true)}
                            onMouseLeave={() => handleHover('startDate', false)}
                        >
                            <div className="uppercase text-gray-400 font-bold mb-3 tracking-wider">START DATE</div>
                            <div className={`text-lg font-medium transition-colors duration-300 ${hoverStates.startDate ? 'text-[#1a237e]' : 'text-white'}`}>
                                {project.duration}
                            </div>
                        </div>

                        <div
                            className="text-center"
                            onMouseEnter={() => handleHover('softwares', true)}
                            onMouseLeave={() => handleHover('softwares', false)}
                        >
                            <div className="uppercase text-gray-400 font-bold mb-3 tracking-wider">SOFTWARES</div>
                            <div className={`flex justify-center gap-4 transition-all duration-300 ${hoverStates.softwares ? 'scale-110' : ''}`}>
                                {project.tools.map(tool => {
                                    const toolData = toolIcons[tool];
                                    return <ToolIconWithTooltip key={tool} tool={tool} toolData={toolData} />;
                                })}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Project Showcase */}
            <div className="relative py-8 px-4 overflow-hidden">
                <div className="container mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative rounded-xl overflow-hidden max-w-3xl mx-auto"
                    >
                        <img
                            src={project.mockupImage || project.image}
                            alt={project.title}
                            className="w-full h-auto rounded-xl shadow-2xl shadow-purple-500/10 cursor-pointer"
                            onClick={() => openLightbox(project.mockupImage || project.image, project.title)}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                    </motion.div>
                </div>
            </div>

            {/* Brand Overview Section */}
            <div className="relative py-8 px-4 border-t border-white/10">
                <div className="container mx-auto max-w-5xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center text-sm text-[#1976d2] mb-4 hover:text-white transition-colors duration-300">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            VISIT WEBSITE
                        </a>
                        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#1a237e] via-[#1976d2] to-[#263238] bg-clip-text text-transparent mb-4">
                            BRAND OVERVIEW
                        </h2>
                        <p className="text-white/80 text-lg leading-relaxed max-w-4xl mx-auto">
                            {project.brandOverview}
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Challenge & Solution */}
            <div className="relative py-8 px-4 overflow-hidden">
                <div className="container mx-auto max-w-6xl relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                            className="space-y-4"
                        >
                            <h2 className="text-3xl font-bold text-white border-l-4 border-[#1976d2] pl-4">THE CHALLENGE</h2>
                            <p className="text-gray-300 leading-relaxed">{project.challenge}</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                            className="space-y-4"
                        >
                            <h2 className="text-3xl font-bold text-white border-l-4 border-[#1a237e] pl-4">THE SOLUTION</h2>
                            <p className="text-gray-300 leading-relaxed">{project.solution}</p>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="relative py-8 px-4">
                <div className="container mx-auto max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="mb-8"
                    >
                        <h2 className="text-3xl font-bold text-white border-l-4 border-[#263238] pl-4 mb-6">KEY FEATURES</h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {project.features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.15,
                                    ease: [0.25, 0.1, 0.25, 1.0]
                                }}
                                whileHover={{
                                    scale: 1.03,
                                    boxShadow: "0 0 20px rgba(188, 80, 255, 0.2)"
                                }}
                                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-5 hover:border-[#1976d2]/50 transition-all duration-300 card-animate"
                            >
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 mr-4">
                                        <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#1a237e] to-[#263238] flex items-center justify-center text-white font-bold">
                                            {index + 1}
                                        </div>
                                    </div>
                                    <p className="text-gray-300">{feature}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* UI Screens Section */}
            <div className="relative py-8 px-4">
                <div className="container mx-auto max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="mb-8"
                    >
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-[#1a237e] via-[#1976d2] to-[#263238] bg-clip-text text-transparent mb-6 text-center">
                            PAGES
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
                        {project.uiScreens.map((screen, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                    ease: "easeOut"
                                }}
                                className="relative flex flex-col"
                            >
                                <div
                                    className="rounded-xl overflow-hidden border border-white/10 hover:border-[#1976d2]/50 transition-all duration-300 shadow-lg shadow-steel-500/5 hover:shadow-[#1976d2]/15 cursor-pointer bg-black/40 backdrop-blur-sm p-1"
                                    onClick={() => openLightbox(screen.image)}
                                >
                                    <div className="w-full" style={{ aspectRatio: '0.5' }}>
                                        <img
                                            src={screen.image}
                                            alt={screen.title}
                                            className="w-full h-full object-contain"
                                            style={{
                                                filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))'
                                            }}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Conclusion Section */}
            <div className="relative py-8 px-4">
                <div className="container mx-auto max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="text-center"
                    >
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-[#1a237e] via-[#1976d2] to-[#263238] bg-clip-text text-transparent mb-6 inline-block relative">
                            PROJECT CONCLUSION
                            <motion.span
                                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#1a237e] to-[#263238]"
                                initial={{ width: "0%" }}
                                whileInView={{ width: "100%" }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                            ></motion.span>
                        </h2>
                        <p className="text-gray-300 leading-relaxed max-w-4xl mx-auto">
                            {project.conclusion}
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Related Projects Section */}
            <div className="relative py-8 px-4">
                <div className="container mx-auto max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="text-center mb-8"
                    >
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-[#1a237e] via-[#1976d2] to-[#263238] bg-clip-text text-transparent mb-6 inline-block relative">
                            RELATED PROJECTS
                            <motion.span
                                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#1a237e] to-[#263238]"
                                initial={{ width: "0%" }}
                                whileInView={{ width: "100%" }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                            ></motion.span>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">Explore more projects in the same category.</p>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projectsData
                            .filter(p => p.type === project.type && p.id !== project.id)
                            .slice(0, 3)
                            .map(related => (
                                <div
                                    key={related.id}
                                    className="group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 transition-all duration-300 hover:border-white/20 hover:shadow-xl hover:shadow-purple-500/10 cursor-pointer card-animate"
                                    onClick={() => navigate(`/project/${related.id}`)}
                                >
                                    {/* Project Image */}
                                    <div className="relative overflow-hidden">
                                        <img
                                            src={related.image}
                                            alt={related.title}
                                            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>
                                    {/* Project Content */}
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold text-white mb-2">{related.title}</h3>
                                        <p className="text-gray-400 mb-4 line-clamp-2">{related.description}</p>
                                        {/* Technologies */}
                                        <div className="flex flex-wrap gap-2 mb-2">
                                            {related.tools && related.tools.map((tech, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 text-xs rounded-full bg-white/5 text-gray-300 border border-white/10"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>

            {/* Visit Website Banner */}
            <div className="relative mt-8">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <a
                        href={project.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block py-6 bg-gradient-to-r from-[#1a237e] via-[#1976d2] to-[#263238] text-white font-bold text-center text-xl uppercase tracking-widest hover:scale-[1.02] transition-all duration-300 relative overflow-hidden group"
                    >
                        {/* Animated background sweep */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            initial={{ x: "-100%", skewX: -15 }}
                            whileHover={{
                                x: "100%",
                                transition: { duration: 0.6, ease: "easeInOut" }
                            }}
                        />

                        {/* Sparkle effects */}
                        <div className="absolute inset-0 overflow-hidden">
                            <motion.div
                                className="absolute top-2 left-10 w-1 h-1 bg-white rounded-full"
                                animate={{
                                    scale: [0, 1, 0],
                                    opacity: [0, 1, 0]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: 0
                                }}
                            />
                            <motion.div
                                className="absolute top-4 right-20 w-1 h-1 bg-white rounded-full"
                                animate={{
                                    scale: [0, 1, 0],
                                    opacity: [0, 1, 0]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: 0.5
                                }}
                            />
                            <motion.div
                                className="absolute bottom-3 left-1/3 w-1 h-1 bg-white rounded-full"
                                animate={{
                                    scale: [0, 1, 0],
                                    opacity: [0, 1, 0]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: 1
                                }}
                            />
                        </div>

                        {/* Text content */}
                        <div className="relative z-10 flex items-center justify-center">
                            <motion.span
                                className="mx-2"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            >
                                ✧
                            </motion.span>
                            <span>VISIT WEBSITE</span>
                            <motion.span
                                className="mx-2"
                                animate={{ rotate: -360 }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            >
                                ✧
                            </motion.span>
                            <span>VISIT WEBSITE</span>
                            <motion.span
                                className="mx-2"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1 }}
                            >
                                ✧
                            </motion.span>
                            <span>VISIT WEBSITE</span>
                            <motion.span
                                className="mx-2"
                                animate={{ rotate: -360 }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 0.5 }}
                            >
                                ✧
                            </motion.span>
                            <span>VISIT WEBSITE</span>
                            <motion.span
                                className="mx-2"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 2 }}
                            >
                                ✧
                            </motion.span>
                        </div>

                        {/* Pulse effect on hover */}
                        <motion.div
                            className="absolute inset-0 border-2 border-white/50"
                            initial={{ scale: 1, opacity: 0 }}
                            whileHover={{
                                scale: 1.1,
                                opacity: [0, 0.5, 0],
                                transition: { duration: 0.6 }
                            }}
                        />
                    </a>
                </motion.div>
            </div>
        </div>
    );
};

export default ProjectDetails;