import React, { useRef, useState, useEffect } from 'react';
import About from '../components/About';

const AboutMePage = () => {
  const [isVisible, setIsVisible] = useState({});
  const aboutRef = useRef(null);

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

    if (aboutRef.current) observer.observe(aboutRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="pt-20">
      <About isVisible={isVisible} aboutRef={aboutRef} />
    </div>
  );
};

export default AboutMePage;
