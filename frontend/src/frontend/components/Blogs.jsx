import React, { useContext, useEffect, useState } from 'react';
import { Book, ChevronRight, Terminal } from 'lucide-react';
import AuthContext from '../context/AuthContext';

const Blog = ({ isVisible, blogsRef }) => {
  const { BackendUrl } = useContext(AuthContext);
  const [blogs, setBlogs] = useState([]);

  // Fetch blogs from the backend
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${BackendUrl}/api/blogs`);
        const data = await response.json();
        setBlogs(data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section
      id="blogs"
      ref={blogsRef}
      className="min-h-screen relative z-10 flex items-center py-20"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div
          className={`transform transition-all duration-1000 ${
            isVisible.blogs ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="text-green-400/60 text-sm tracking-widest mb-2">
              // RECENT_PUBLICATIONS.VIEW
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              BLOGS.QUERY()
            </h2>
            <div className="w-24 h-1 bg-green-400 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <a
                  href={blog.link}
                  key={blog._id}
                  className="block group bg-gray-900 border-2 border-green-400/20 p-6 relative overflow-hidden transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg hover:border-green-400/50"
                >
                  {/* File-like header */}
                  <div className="flex items-center space-x-2 mb-4 text-green-400/70 text-sm font-mono">
                    <Book className="w-4 h-4" />
                    <span>blog/{blog.date}.md</span>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-white group-hover:text-green-400 transition-colors duration-300">
                    {blog.title}
                  </h3>
                  <p className="mt-4 text-gray-400 text-sm leading-relaxed">
                    {blog.excerpt}
                  </p>

                  {/* Read More link */}
                  <div className="mt-6 flex items-center text-green-400 group-hover:translate-x-1 transition-transform duration-300">
                    <span className="text-sm font-mono tracking-wider">READ_POST()</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </a>
              ))
            ) : (
              <div className="bg-gray-900 border-2 border-green-400/20 p-6 col-span-full">
                <p className="text-gray-400 text-center">No blogs available right now.</p>
              </div>
            )}
          </div>

          {/* "See all blogs" button */}
          <div className="text-center mt-16">
            <a
              href="/blogs"
              className="group px-8 py-3 bg-green-400 text-black hover:bg-green-300 transition-all duration-300 transform hover:scale-105 tracking-wider font-semibold flex items-center justify-center mx-auto max-w-xs"
            >
              <Terminal className="w-4 h-4 mr-2" />
              SEE ALL BLOGS
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;