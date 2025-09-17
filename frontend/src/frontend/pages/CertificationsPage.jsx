import React, { useRef, useState, useEffect } from 'react';
import Certifications from '../components/Certifications';

const CertificationsPage = () => {
  const [isVisible, setIsVisible] = useState({});
  const certificationsRef = useRef(null);

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

    if (certificationsRef.current) observer.observe(certificationsRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="pt-20">
      <Certifications isVisible={isVisible} certificationsRef={certificationsRef} />
    </div>
  );
};

export default CertificationsPage;
