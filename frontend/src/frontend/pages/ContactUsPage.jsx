import React, { useRef, useState, useEffect } from 'react';
import Contact from '../components/Contact';

const ContactUsPage = () => {
  const [isVisible, setIsVisible] = useState({});
  const contactRef = useRef(null);

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

    if (contactRef.current) observer.observe(contactRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="pt-20">
      <Contact isVisible={isVisible} contactRef={contactRef} />
    </div>
  );
};

export default ContactUsPage;
