import React, { useRef, useState, useEffect } from 'react';
import Blogs from '../components/Blogs';

const BlogsPage = () => {
  const [isVisible, setIsVisible] = useState({});
  const blogsRef = useRef(null);

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

    if (blogsRef.current) observer.observe(blogsRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="pt-20">
      <Blogs isVisible={isVisible} blogsRef={blogsRef} />
    </div>
  );
};

export default BlogsPage;
