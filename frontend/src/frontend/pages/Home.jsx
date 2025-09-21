import React, { useState, useEffect, useRef } from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Certifications from '../components/Certifications';
import Projects from '../components/Projects';
import Blogs from '../components/Blogs';
import Contact from '../components/Contact';
import Reviews from '../components/Reviews';
import Technologies from '../components/Technologies';

const Home = () => {
  const [isVisible, setIsVisible] = useState({});
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const certificationsRef = useRef(null);
  const projectsRef = useRef(null);
  const blogsRef = useRef(null);
  const contactRef = useRef(null);
  const reviewsRef = useRef(null);
  const technologiesRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) observer.observe(heroRef.current);
    if (aboutRef.current) observer.observe(aboutRef.current);
    if (certificationsRef.current) observer.observe(certificationsRef.current);
    if (projectsRef.current) observer.observe(projectsRef.current);
    if (blogsRef.current) observer.observe(blogsRef.current);
    if (contactRef.current) observer.observe(contactRef.current);
    if (reviewsRef.current) observer.observe(reviewsRef.current);
    if (technologiesRef.current) observer.observe(technologiesRef.current);

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <div className="relative z-10 min-h-screen text-green-400 font-mono">
      

      {/* Hero section is a separate component */}
      <Hero />

      {/* About section is a separate component */}
      <About 
        isVisible={isVisible} 
        aboutRef={aboutRef} 
      />

      {/* New sections */}
      <Certifications
        isVisible={isVisible}
        certificationsRef={certificationsRef}
      />
      <Projects
        isVisible={isVisible}
        projectsRef={projectsRef}
      />
      <Blogs
        isVisible={isVisible}
        blogsRef={blogsRef}
      />
      <Technologies
        isVisible={isVisible}
        technologiesRef={technologiesRef}
      />
      <Reviews
        isVisible={isVisible}
        reviewsRef={reviewsRef}
      />
      <Contact
        isVisible={isVisible}
        contactRef={contactRef}
      />

    </div>
  );
};

export default Home;