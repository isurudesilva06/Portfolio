import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import ProjectDetails from './components/ProjectDetails';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Services from './components/Services';
import Education from './components/Education';

// Custom Cursor Component
function CustomCursor() {
  const cursorRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    // Add class to body to hide default cursor
    document.body.classList.add('custom-cursor-enabled');
    return () => {
      document.body.classList.remove('custom-cursor-enabled');
    };
  }, []);

  useEffect(() => {
    const moveCursor = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };
    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);
    const handleMouseOver = (e) => {
      if (e.target.closest('a,button,[role="button"],input,textarea,select,label')) {
        setHovered(true);
      }
    };
    const handleMouseOut = (e) => {
      if (e.target.closest('a,button,[role="button"],input,textarea,select,label')) {
        setHovered(false);
      }
    };
    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor${hovered ? ' cursor-hover' : ''}${clicked ? ' cursor-click' : ''}`}
      aria-hidden="true"
    />
  );
}

function App() {
  // We're only keeping track of active section now, removed darkMode state
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Effect to restore scroll position and active tab if coming from project details
  useEffect(() => {
    // Check if we're returning from project details
    const savedPosition = sessionStorage.getItem('scrollPosition');
    const savedTab = sessionStorage.getItem('activeTab');

    if (savedPosition && window.location.pathname === '/') {
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedPosition));
        if (savedTab) {
          setActiveSection(savedTab);
        }
      }, 100);

      // Clear the saved position after restoring
      sessionStorage.removeItem('scrollPosition');
      sessionStorage.removeItem('activeTab');
    }
  }, []);

  return (
    <BrowserRouter>
      <CustomCursor />
      <div className="min-h-screen bg-black text-white relative">
        {/* Background gradients */}
        <div className="fixed inset-0 z-0 overflow-hidden">
          {/* Primary gradients */}
          <div className="absolute -top-[40%] -right-[10%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-purple-500/20 to-fuchsia-500/10 blur-3xl"></div>
          <div className="absolute -bottom-[40%] -left-[10%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-500/20 to-sky-500/10 blur-3xl"></div>

          {/* Additional color spots for more depth */}
          <div className="absolute top-[30%] left-[15%] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-pink-500/10 to-rose-500/5 blur-3xl"></div>
          <div className="absolute bottom-[20%] right-[15%] w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-indigo-500/10 to-blue-500/5 blur-3xl"></div>

          {/* Small accent gradients */}
          <div className="absolute top-[60%] right-[30%] w-[200px] h-[200px] rounded-full bg-gradient-to-r from-cyan-500/15 to-teal-500/10 blur-2xl"></div>
          <div className="absolute top-[10%] left-[20%] w-[300px] h-[300px] rounded-full bg-gradient-to-l from-violet-500/15 to-purple-500/10 blur-2xl"></div>
        </div>

        {/* Main content wrapper with consistent max-width */}
        <div className="relative z-10">
          <Routes>
            <Route path="/project/:id" element={
              <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <Header
                  activeSection={activeSection}
                  isProjectPage={true}
                />
                <ProjectDetails />
                <Footer />
              </div>
            } />
            <Route path="/" element={
              <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <Header
                  activeSection={activeSection}
                />
                <Hero />
                <About />
                <Services />
                <Education />
                <Projects />
                <Skills />
                <Contact />
                <Footer />
              </div>
            } />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;