// Live Demo
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Projects = () => {
    const [activeTab, setActiveTab] = useState('all');
    const navigate = useNavigate();

    // Project data with unique IDs and updated for portfolio style
    const projects = [
        {
            id: 1,
            title: "NIKE",
            subtitle: "Future-Forward Software Beyond Limits",
            category: "UI/UX Design",
            type: "uiux",
            image: "/assets/img/nike.png",
            description: "A software company website with modern design and interactive elements.",
            technologies: ["Figma", "Adobe Photoshop"],
            liveLink: "#",
            githubLink: "#"

        },
        {
            id: 2,
            title: "BURGER HOUSE",
            subtitle: "Traditional Dhotis",
            category: "E-Commerce",
            type: "uiux",
            image: "/assets/img/burger.png",
            description: "E-commerce platform for traditional clothing with a contemporary interface.",
            technologies: ["Figma", "Adobe Photoshop"],
            liveLink: "#",
            githubLink: "#"
        },
        {
            id: 3,
            title: "DOCNET",
            subtitle: "Curate Your Fashion Styles",
            category: "Mobile App",
            type: "uiux",
            image: "/assets/img/doctor.png",
            description: "Fashion curation mobile application with personalized recommendations.",
            technologies: ["Figma", "Adobe Photoshop"],
            liveLink: "#",
            githubLink: "#"
        },
        {
            id: 4,
            title: "THE BAKERY SHOP",
            subtitle: "Online Shopping Platform",
            category: "E-Commerce",
            type: "uiux",
            image: "/assets/img/bakery.png",
            description: "Full-featured e-commerce platform with advanced filtering and search.",
            technologies: ["Figma", "Adobe Photoshop"],
            liveLink: "#",
            githubLink: "#"
        },
        {
            id: 5,
            title: "FLORONA",
            subtitle: "Designs by Edwinn",
            category: "Portfolio",
            type: "uiux",
            image: "/assets/img/plant.png",
            description: "Designer portfolio website showcasing creative work and services.",
            technologies: ["Figma", "Adobe Photoshop"],
            liveLink: "#",
            githubLink: "#"
        },
        {
            id: 6,
            title: "E-LEARNING",
            subtitle: "Home Enterprises",
            category: "E-Commerce",
            type: "mobile",
            image: "/assets/img/e-learning.png",
            description: "Home appliances e-commerce store with modern user interface.",
            technologies: ["React Native", "Firebase"],
            liveLink: "#",
            githubLink: "#"
        },
        {
            id: 7,
            title: "INSURANCE",
            subtitle: "Home Enterprises",
            category: "E-Commerce",
            type: "mobile",
            image: "/assets/img/task.png",
            description: "Home appliances e-commerce store with modern user interface.",
            technologies: ["React Native"],
            liveLink: "#",
            githubLink: "#"
        },
        {
            id: 8,
            title: "GESTURECONNECT",
            subtitle: "Home Enterprises",
            category: "E-Commerce",
            type: "mobile",
            image: "/assets/img/gesture.png",
            description: "Home appliances e-commerce store with modern user interface.",
            technologies: ["React Native", "Firebase", "Cloudinary"],
            liveLink: "#",
            githubLink: "#"
        },
        {
            id: 9,
            title: "NATURE WONDERS",
            subtitle: "Home Enterprises",
            category: "E-Commerce",
            type: "uiux",
            image: "/assets/img/nature.png",
            description: "Home appliances e-commerce store with modern user interface.",
            technologies: ["Figma", "Adobe Photoshop"],
            liveLink: "#",
            githubLink: "#"
        },
        {
            id: 10,
            title: "EVENT EDGE",
            subtitle: "Home Enterprises",
            category: "E-Commerce",
            type: "uiux",
            image: "/assets/img/dashboard.png",
            description: "Home appliances e-commerce store with modern user interface.",
            technologies: ["Figma", "Adobe Photoshop"],
            liveLink: "#",
            githubLink: "#"
        },
        {
            id: 11,
            title: "EPICUREAN DELIGHT",
            subtitle: "Home Enterprises",
            category: "E-Commerce",
            type: "uiux",
            image: "/assets/img/hotel.png",
            description: "Home appliances e-commerce store with modern user interface.",
            technologies: ["Figma", "Adobe Photoshop"],
            liveLink: "#",
            githubLink: "#"
        },
        {
            id: 12,
            title: "TROPICAL WATER",
            subtitle: "Home Enterprises",
            category: "E-Commerce",
            type: "uiux",
            image: "/assets/img/water.png",
            description: "Home appliances e-commerce store with modern user interface.",
            technologies: ["Figma", "Adobe Photoshop"],
            liveLink: "#",
            githubLink: "#"
        },
        {
            id: 13,
            title: "FOREST HAVEN",
            subtitle: "Home Enterprises",
            category: "E-Commerce",
            type: "uiux",
            image: "/assets/img/forest.png",
            description: "Home appliances e-commerce store with modern user interface.",
            technologies: ["Figma", "Adobe Photoshop"],
            liveLink: "#",
            githubLink: "#"
        },

    ];

    const filteredProjects = activeTab === 'all'
        ? projects
        : projects.filter(project => project.type === activeTab);

    const handleProjectClick = (projectId) => {
        // Save current scroll position before navigating
        sessionStorage.setItem('scrollPosition', window.pageYOffset.toString());
        // Save active tab to restore it when coming back
        sessionStorage.setItem('activeTab', activeTab);

        // Navigate to project details
        navigate(`/project/${projectId}`);
    };

    // Function to handle image errors
    const handleImageError = (e) => {
        console.log("Image failed to load");
        e.target.src = "/assets/img/placeholder.png"; // Fallback image
    };

    return (
        <section id="work" className="py-12 sm:py-16 md:py-20 transition-colors duration-300">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Responsive Title Section */}
                <div className="mb-12 sm:mb-16 md:mb-20 text-center">
                    <h2 className="text-2xl sm:text-3xl md:text-6xl font-bold mb-4 bg-gradient-to-l from-[#1a237e] via-[#1976d2] to-[#263238] bg-clip-text text-transparent">
                        Projects
                    </h2>
                    <p className="mt-2 sm:mt-4 max-w-3xl mx-auto text-sm sm:text-base text-white opacity-80">
                        Showcasing my latest designs and development projects with a focus on user experience,
                        visual aesthetics, and functional excellence.
                    </p>
                </div>

                {/* Responsive Tab Navigation */}
                <div className="flex justify-center mb-12 sm:mb-16">
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
                        <button
                            onClick={() => setActiveTab('all')}
                            className={`px-6 sm:px-8 py-2 text-sm sm:text-base font-medium rounded-full transition-all duration-300 ${activeTab === 'all'
                                ? 'text-white bg-gradient-to-r from-[#1a237e] via-[#1976d2] to-[#263238]'
                                : 'text-gray-300 hover:text-white border border-gray-700 hover:border-gray-500'
                                }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setActiveTab('uiux')}
                            className={`px-6 sm:px-8 py-2 text-sm sm:text-base font-medium rounded-full transition-all duration-300 ${activeTab === 'uiux'
                                ? 'text-white bg-gradient-to-r from-[#1a237e] via-[#1976d2] to-[#263238]'
                                : 'text-gray-300 hover:text-white border border-gray-700 hover:border-gray-500'
                                }`}
                        >
                            UI/UX Designs
                        </button>
                        <button
                            onClick={() => setActiveTab('mobile')}
                            className={`px-6 sm:px-8 py-2 text-sm sm:text-base font-medium rounded-full transition-all duration-300 ${activeTab === 'mobile'
                                ? 'text-white bg-gradient-to-r from-[#1a237e] via-[#1976d2] to-[#263238]'
                                : 'text-gray-300 hover:text-white border border-gray-700 hover:border-gray-500'
                                }`}
                        >
                            Mobile Apps
                        </button>
                    </div>
                </div>

                {/* Check if there are projects to display */}
                {filteredProjects.length > 0 ? (
                    /* Updated Projects Grid with New Style */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map(project => (
                            <div
                                key={project.id}
                                className="group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 transition-all duration-300 hover:border-white/20 hover:shadow-xl hover:shadow-purple-500/10 cursor-pointer"
                                onClick={() => handleProjectClick(project.id)}
                            >
                                {/* Project Image */}
                                <div className="relative overflow-hidden">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                                        onError={handleImageError}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>

                                {/* Project Content */}
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                                    <p className="text-gray-400 mb-4">{project.description}</p>

                                    {/* Technologies */}
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.technologies.map((tech, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 text-xs rounded-full bg-white/5 text-gray-300 border border-white/10"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Action Buttons 
                                    <div className="flex gap-4">
                                        <a
                                            href={project.githubLink}
                                            className="flex-1 text-center px-4 py-2 rounded-full bg-gradient-to-r from-[#ff58d8] to-[#4f4cfa] text-white text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 hover:-translate-y-1"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            Live Demo
                                        </a>
                                    </div> */}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* No Projects Yet Message */
                    <div className="max-w-4xl mx-auto text-center py-20 px-4">
                        <h3 className="text-1xl sm:text-2xl font-bold text-white mb-4">No Projects Yet</h3>
                        <p className="text-gray-400 max-w-lg mx-auto text-0xl sm:text-1xl">
                            There are no projects available in this category at the moment. Check back soon as new projects are being added regularly.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Projects;