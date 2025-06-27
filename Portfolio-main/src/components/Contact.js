import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser'; // Install with: npm install @emailjs/browser
import { socialLinks, contactInfo } from '../config/socialLinks';

const Contact = () => {
    const form = useRef();
    // Form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    // Form status states
    const [formStatus, setFormStatus] = useState({
        status: 'idle', // idle, validating, submitting, success, error
        message: ''
    });

    // Typing animation state
    const [typingIndex, setTypingIndex] = useState(0);
    const typingText = "Let's build something amazing together";

    // Initialize EmailJS
    useEffect(() => {
        emailjs.init("VqmLO9PXzRgCoE7z1"); // Your public key
    }, []);

    // Email validation function
    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    // Handle form changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Map the EmailJS field names to our form state
        const fieldMap = {
            from_name: 'name',
            from_email: 'email',
            subject: 'subject',
            message: 'message'
        };

        setFormData({
            ...formData,
            [fieldMap[name] || name]: value
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submission started');

        // Validate form
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            setFormStatus({
                status: 'error',
                message: 'Please fill in all fields'
            });
            return;
        }

        if (!validateEmail(formData.email)) {
            setFormStatus({
                status: 'error',
                message: 'Please enter a valid email address'
            });
            return;
        }

        // Submit form
        setFormStatus({
            status: 'submitting',
            message: 'Sending message...'
        });

        try {
            console.log('Preparing to send email...');

            // Prepare email parameters
            const templateParams = {
                to_email: 'yashindibhagya@gmail.com',
                from_name: formData.name,
                reply_to: formData.email,
                subject: formData.subject,
                message: formData.message
            };

            console.log('Sending with params:', templateParams);

            // Send email using EmailJS
            const result = await emailjs.send(
                'service_lx3foyj',
                'template_4qyx2dj',
                templateParams,
                'VqmLO9PXzRgCoE7z1'
            );

            console.log('EmailJS response:', result);

            // Success handling
            setFormStatus({
                status: 'success',
                message: 'Message sent successfully!'
            });

            // Reset form after delay
            setTimeout(() => {
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                });
                setFormStatus({
                    status: 'idle',
                    message: ''
                });
            }, 5000);
        } catch (error) {
            console.error('Detailed error:', error);

            // Error handling
            setFormStatus({
                status: 'error',
                message: error.message || 'Failed to send message. Please try again later.'
            });
        }
    };

    // Typing effect
    useEffect(() => {
        if (typingIndex < typingText.length) {
            const timer = setTimeout(() => {
                setTypingIndex(typingIndex + 1);
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [typingIndex, typingText]);

    // Render contact information card with technical style
    const ContactCard = ({ icon, title, value, accent }) => (
        <div className="flex items-center p-6 rounded-xl bg-white/[0.03] backdrop-blur-sm border border-white/10 transition-all hover:border-white/20 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#8B5CF6]/5 duration-300">
            <div className={`flex items-center justify-center w-12 h-12 rounded-xl mr-4 bg-gradient-to-br ${accent}`}>
                {icon}
            </div>
            <div>
                <div className="text-xs uppercase tracking-wider text-indigo-300 mb-1">{title}</div>
                <div className="text-white font-medium">{value}</div>
            </div>
        </div>
    );

    return (
        <section id="contact" className="py-20 sm:py-28 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none select-none">
                {/* Grid pattern */}
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="max-w-5xl mx-auto">
                    {/* Section header with typing effect */}
                    <div className="text-center mb-16">
                        <div className="inline-block text-sm py-1 px-3 rounded-full bg-gradient-to-r from-purple-500/10 to-indigo-500/10 backdrop-blur-md border border-purple-500/20 text-purple-300 mb-4">
                            <div className="flex items-center">
                                <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse mr-2"></div>
                                <span>Contact.connect()</span>
                            </div>
                        </div>

                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent mb-4">
                            Let's Connect
                        </h2>

                        <div className="text-indigo-300 text-lg">
                            <span>{typingText.substring(0, typingIndex)}</span>
                            <span className="inline-block w-0.5 h-5 bg-indigo-400 ml-0.5 animate-blink"></span>
                        </div>
                    </div>

                    {/* Main content */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        {/* Contact info section */}
                        <div className="lg:col-span-5 space-y-6">
                            <div className="space-y-6">
                                <ContactCard
                                    icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>}
                                    title="Email"
                                    value={contactInfo.email}
                                    accent="from-indigo-500 to-purple-600"
                                />

                                <ContactCard
                                    icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>}
                                    title="Phone"
                                    value={contactInfo.phone}
                                    accent="from-blue-500 to-cyan-500"
                                />

                                <ContactCard
                                    icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>}
                                    title="Location"
                                    value={contactInfo.location}
                                    accent="from-pink-500 to-rose-500"
                                />
                            </div>

                            {/* Social links */}
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

                        {/* Contact form */}
                        <div className="lg:col-span-7">
                            <div className="p-1 rounded-2xl bg-gradient-to-br from-indigo-500/50 via-purple-500/50 to-pink-500/50">
                                <div className="bg-[#0F172A]/95 backdrop-blur-xl p-6 sm:p-8 rounded-xl">
                                    <div className="flex items-center mb-6">
                                        <div className="h-8 flex items-center px-3 rounded-md bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 text-indigo-300 text-sm">
                                            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7 9L12 12.5L17 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M2 17V7C2 5.89543 2.89543 5 4 5H20C21.1046 5 22 5.89543 22 7V17C22 18.1046 21.1046 19 20 19H4C2.89543 19 2 18.1046 2 17Z" stroke="currentColor" strokeWidth="1.5" />
                                            </svg>
                                            <span className="font-mono">new Message();</span>
                                        </div>
                                    </div>

                                    {formStatus.status === 'success' ? (
                                        <div className="flex flex-col items-center justify-center py-10 text-center">
                                            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-500/20 text-green-400 mb-4">
                                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                                </svg>
                                            </div>
                                            <h3 className="text-xl font-semibold text-white mb-2">Message Sent!</h3>
                                            <p className="text-indigo-300 mb-6">Thanks for reaching out. I'll get back to you shortly.</p>
                                            <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-gray-400 text-sm font-mono">
                                                <span className="text-green-400">200 OK</span> · Message delivered successfully
                                            </div>
                                        </div>
                                    ) : (
                                        <form ref={form} onSubmit={handleSubmit} className="space-y-5">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                <div>
                                                    <label className="block text-xs text-indigo-300 mb-2 font-medium">
                                                        <span className="font-mono">NAME</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="from_name"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white 
                                                        placeholder-white/30 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.06] transition-all"
                                                        placeholder="John Doe"
                                                        required
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-xs text-indigo-300 mb-2 font-medium">
                                                        <span className="font-mono">EMAIL</span>
                                                    </label>
                                                    <input
                                                        type="email"
                                                        name="from_email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white 
                                                        placeholder-white/30 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.06] transition-all"
                                                        placeholder="john@example.com"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-xs text-indigo-300 mb-2 font-medium">
                                                    <span className="font-mono">SUBJECT</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="subject"
                                                    value={formData.subject}
                                                    onChange={handleChange}
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white 
                                                    placeholder-white/30 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.06] transition-all"
                                                    placeholder="Project Inquiry"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-xs text-indigo-300 mb-2 font-medium">
                                                    <span className="font-mono">MESSAGE</span>
                                                </label>
                                                <div className="relative">
                                                    <textarea
                                                        name="message"
                                                        value={formData.message}
                                                        onChange={handleChange}
                                                        rows={5}
                                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white 
                                                        placeholder-white/30 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.06] transition-all resize-none"
                                                        placeholder="Your message here..."
                                                        required
                                                    ></textarea>

                                                    <div className="absolute right-3 bottom-3 text-xs text-indigo-400/70 bg-black/20 backdrop-blur-sm px-2 py-0.5 rounded">
                                                        {formData.message.length} chars
                                                    </div>
                                                </div>
                                            </div>

                                            {formStatus.status === 'error' && (
                                                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">
                                                    <div className="flex items-center">
                                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                        </svg>
                                                        <span>{formStatus.message}</span>
                                                    </div>
                                                </div>
                                            )}

                                            <button
                                                type="submit"
                                                disabled={formStatus.status === 'submitting'}
                                                className="w-full py-3.5 px-4 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium 
                                                hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg 
                                                focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 focus:ring-offset-[#0F172A] 
                                                disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                                            >
                                                {formStatus.status === 'submitting' ? (
                                                    <>
                                                        <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        <span>Sending Message...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <span>Send Message</span>
                                                        <div className="ml-2 bg-white/20 rounded-full p-1">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                                            </svg>
                                                        </div>
                                                    </>
                                                )}
                                            </button>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;