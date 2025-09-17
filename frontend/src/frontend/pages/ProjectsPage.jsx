import React, { useRef, useState, useEffect } from 'react';
import Projects from '../components/Projects';

const ProjectsPage = () => {
  const [isVisible, setIsVisible] = useState({});
  const projectsRef = useRef(null);

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

    if (projectsRef.current) observer.observe(projectsRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="pt-20">
      <Projects isVisible={isVisible} projectsRef={projectsRef} />
    </div>
  );
};

export default ProjectsPage;
