import React from 'react';

const Skills = () => {
    // Frontend skills with icon references
    const frontendSkills = [
        {
            name: 'HTML',
            iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
            proficiency: 95
        },
        {
            name: 'CSS',
            iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
            proficiency: 90
        },
        {
            name: 'JavaScript',
            iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
            proficiency: 92
        },
        {
            name: 'React Native',
            iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
            proficiency: 88
        },
        {
            name: 'Tailwind CSS',
            iconUrl: 'https://www.svgrepo.com/svg/333609/tailwind-css.svg',
            proficiency: 60
        }
    ];

    // Backend skills (just Node.js)
    const backendSkills = [
        {
            name: 'Node.js',
            iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
            proficiency: 75
        }
    ];

    // Database skills (Supabase, Firebase, Cloudinary)
    const databaseSkills = [
        {
            name: 'Supabase',
            iconUrl: 'https://www.vectorlogo.zone/logos/supabase/supabase-icon.svg',
            proficiency: 85
        },
        {
            name: 'Firebase',
            iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
            proficiency: 88
        },
        {
            name: 'Cloudinary',
            iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b2/Cloudinary_logo.svg',
            proficiency: 90
        }
    ];

    // Design & Developer tools
    const designTools = [
        {
            name: 'Figma',
            iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
            proficiency: 95
        },
        {
            name: 'Canva',
            iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg',
            proficiency: 95
        },
        {
            name: 'Adobe Photoshop',
            iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg',
            proficiency: 90
        },
        {
            name: 'Wix Studio',
            iconUrl: 'https://www.svgrepo.com/svg/374118/file-type-svg.svg',
            proficiency: 90
        },
        {
            name: 'VS Code',
            iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
            proficiency: 95
        }
    ];

    // Function to determine the color based on proficiency level
    const getProficiencyColor = (proficiency) => {
        if (proficiency >= 90) return 'from-emerald-400 to-teal-500';
        if (proficiency >= 80) return 'from-blue-400 to-indigo-500';
        if (proficiency >= 70) return 'from-violet-400 to-purple-500';
        return 'from-rose-400 to-pink-500';
    };

    // Skill item component to avoid repetition
    const SkillItem = ({ skill }) => (
        <div className="group/skill">
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                    <div className="w-8 h-8 bg-white/10 rounded-md flex items-center justify-center mr-3 overflow-hidden">
                        <img
                            src={skill.iconUrl}
                            alt={`${skill.name} icon`}
                            className="w-5 h-5 object-contain group-hover/skill:scale-110 transition-transform"
                        />
                    </div>
                    <span className="text-gray-300 text-sm font-medium group-hover/skill:text-white transition-colors">
                        {skill.name}
                    </span>
                </div>
                <span className="text-xs font-semibold text-gray-400 group-hover/skill:text-white transition-colors">
                    {skill.proficiency}%
                </span>
            </div>

            {/* Progress bar with gradient */}
            <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                <div
                    className={`h-full bg-gradient-to-r ${getProficiencyColor(skill.proficiency)} rounded-full transition-all duration-500 ease-out group-hover/skill:scale-x-100`}
                    style={{
                        width: `${skill.proficiency}%`,
                        transform: 'scaleX(0.9)',
                        transformOrigin: 'left'
                    }}
                ></div>
            </div>
        </div>
    );

    return (
        <section id="skills" className="py-16 sm:py-20 md:py-24 relative overflow-hidden">


            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Heading with animated underline */}
                <div className="relative text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#1a237e] via-[#1976d2] to-[#263238] bg-clip-text text-transparent inline-block">
                        Technical Skills
                    </h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-[#1a237e] to-[#263238] rounded-full mx-auto mt-4 animate-pulse"></div>
                    <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-sm sm:text-base">
                        My toolkit of technologies and programming languages that I've mastered through years of practice and real-world application.
                    </p>
                </div>

                {/* Three sections in one row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Section 1: Frontend */}
                    <div className="group h-full">
                        <div className="h-full backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:bg-white/10 hover:shadow-lg hover:shadow-purple-500/5">
                            <div className="flex items-center mb-6">
                                <span className="text-3xl mr-3">💻</span>
                                <h3 className="text-xl font-bold text-white">Frontend</h3>
                            </div>

                            <p className="text-gray-400 mb-8 text-sm">
                                Creating responsive, user-friendly interfaces with modern web technologies.
                            </p>

                            <div className="space-y-5">
                                {frontendSkills.map(skill => (
                                    <SkillItem key={skill.name} skill={skill} />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Combined Backend & Database */}
                    <div className="group h-full">
                        <div className="h-full backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:bg-white/10 hover:shadow-lg hover:shadow-purple-500/5">
                            <div className="flex items-center mb-6">
                                <span className="text-3xl mr-3">⚙️</span>
                                <h3 className="text-xl font-bold text-white">Backend & Database</h3>
                            </div>

                            <p className="text-gray-400 mb-8 text-sm">
                                Server-side development and data management solutions.
                            </p>

                            <div className="space-y-4">
                                {/* Backend section */}
                                <div className="mb-8">
                                    <h4 className="text-base font-semibold text-white mb-4 pb-2 border-b border-white/10">Backend</h4>
                                    <div className="space-y-5">
                                        {backendSkills.map(skill => (
                                            <SkillItem key={skill.name} skill={skill} />
                                        ))}
                                    </div>
                                </div>

                                {/* Database section */}
                                <div>
                                    <h4 className="text-base font-semibold text-white mb-4 pb-2 border-b border-white/10">Database & Storage</h4>
                                    <div className="space-y-5">
                                        {databaseSkills.map(skill => (
                                            <SkillItem key={skill.name} skill={skill} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Design & Development Tools */}
                    <div className="group h-full">
                        <div className="h-full backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:bg-white/10 hover:shadow-lg hover:shadow-purple-500/5">
                            <div className="flex items-center mb-6">
                                <span className="text-3xl mr-3">🎨</span>
                                <h3 className="text-xl font-bold text-white">Design & Dev Tools</h3>
                            </div>

                            <p className="text-gray-400 mb-8 text-sm">
                                Software and platforms I use for design and development workflows.
                            </p>

                            <div className="space-y-5">
                                {designTools.map(skill => (
                                    <SkillItem key={skill.name} skill={skill} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;