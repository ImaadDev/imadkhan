import React, { useState, useEffect, useContext } from 'react';
import { 
  ExternalLink, 
  Github, 
  Code, 
  Layers,
  ArrowRight,
  Sparkles,
  Search,
  Book,
  Feather,
  Calendar,
  Tag,
  Loader2,
  Server
} from 'lucide-react';
import AuthContext from '../context/AuthContext.jsx';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ModernBlogPage = () => {
  const { BackendUrl } = useContext(AuthContext);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [blogs, setBlogs] = useState([]);
  const [hoveredPost, setHoveredPost] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Page load and mouse follower
  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Matrix rain effect with mobile optimization
  useEffect(() => {
    const isMobile = window.innerWidth < 640;
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; opacity: 0.03;';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()'.split('');
    const fontSize = isMobile ? 10 : 12;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function draw() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#00ff99';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    }

    const interval = setInterval(draw, 33);
    return () => {
      clearInterval(interval);
      document.body.removeChild(canvas);
    };
  }, []);

  // Fetch blogs from backend
  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${BackendUrl}/api/blogs`);
        setBlogs(response.data.map(blog => ({
          id: blog._id,
          title: blog.title,
          category: blog.category,
          description: blog.description,
          longDescription: blog.longDescription,
          tags: blog.tags,
          author: blog.author,
          date: new Date(blog.createdAt).toISOString().split('T')[0],
          featured: blog.featured,
          readTime: blog.readTime || `${Math.ceil(blog.longDescription.split(' ').length / 200)} min read`,
          imageUrl: blog.imageUrl || 'https://via.placeholder.com/400x200?text=Blog+Image'
        })));
      } catch (err) {
        setError('Failed to load blogs. Please try again.');
        showAlert('[ERROR]', 'Failed to load blogs. Please try again.', 'error');
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogs();
  }, [BackendUrl]);

  // Show alert function
  const showAlert = (title, text, icon = 'success') => {
    const alertDiv = document.createElement('div');
    alertDiv.className = `fixed top-4 right-2 sm:right-4 p-3 sm:p-4 bg-gray-950/90 text-green-400 border-2 ${icon === 'success' ? 'border-green-400' : 'border-red-400'} z-50 font-mono animate-slide-in alert`;
    alertDiv.setAttribute('aria-live', 'assertive');
    alertDiv.innerHTML = `
      <div class="flex items-center gap-2">
        <span class="text-green-400">></span>
        <div class="font-bold">${title}</div>
      </div>
      <div class="text-xs sm:text-sm pl-4">${text}</div>
      <div class="mt-2 text-xs opacity-60">Press any key to continue...</div>
    `;
    document.body.appendChild(alertDiv);
    setTimeout(() => document.body.contains(alertDiv) && document.body.removeChild(alertDiv), 4000);
  };

  const categories = [
    { id: 'all', name: 'ALL POSTS', icon: Layers },
    { id: 'frontend', name: 'FRONTEND', icon: Code },
    { id: 'backend', name: 'BACKEND', icon: Server },
    { id: 'fullstack', name: 'FULL STACK', icon: Layers },
    { id: 'ai', name: 'AI & ML', icon: Sparkles },
    { id: 'devops', name: 'DEVOPS', icon: Github },
    { id: 'cybersecurity', name: 'CYBERSECURITY', icon: ExternalLink },
    { id: 'cloud', name: 'CLOUD', icon: Book },
  ];

  const filteredPosts = blogs.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (Array.isArray(post.tags) && post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogs.filter(post => post.featured);

  return (
    <div className="min-h-screen text-white bg-black overflow-hidden relative font-mono">
      
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-black" style={{
          backgroundImage: `linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          animation: 'grid-move 25s linear infinite'
        }}></div>
      </div>

      {/* Floating Code Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(window.innerWidth < 640 ? 6 : 12)].map((_, i) => (
          <div
            key={`code-${i}`}
            className="absolute text-green-400/20 font-mono text-xs sm:text-sm select-none"
            style={{
              left: `${5 + i * 8}%`,
              top: `${10 + (i * 7) % 80}%`,
              animation: `float-code ${4 + i * 0.3}s ease-in-out infinite`,
              animationDelay: `${i * 0.4}s`
            }}
          >
            {['<p>','<h1>','</>','{}','[]','()','//','&&'][i % 8]}
          </div>
        ))}
        {[...Array(window.innerWidth < 640 ? 4 : 8)].map((_, i) => (
          <div
            key={`shape-${i}`}
            className="float-particle"
            style={{
              width: `${window.innerWidth < 640 ? 15 + i * 3 : 20 + i * 5}px`,
              height: `${window.innerWidth < 640 ? 15 + i * 3 : 20 + i * 5}px`,
              left: `${15 + i * 10}%`,
              top: `${15 + i * 9}%`,
              animationDuration: `${5 + i * 0.2}s`,
              animationDelay: `${i * 0.3}s`
            }}
          />
        ))}
      </div>

      {/* Mouse Follower (hidden on mobile) */}
      <div 
        className="hidden sm:block fixed w-6 h-6 border-2 border-green-400/50 pointer-events-none z-50 mix-blend-difference transition-all duration-150"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: `scale(${mousePosition.x > 0 ? 1 : 0}) ${hoveredPost ? 'scale(1.5)' : ''}`
        }}
      />

      <div className="relative z-10 max-w-[95vw] sm:max-w-7xl mx-auto px-2 sm:px-6 py-6 sm:py-8 container">
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <Loader2 className="w-12 sm:w-16 h-12 sm:h-16 text-green-400 mx-auto animate-spin" />
              <p className="text-gray-400 mt-4 text-sm sm:text-base">
                LOADING BLOGS... PLEASE WAIT
              </p>
              <p className="text-green-400/60 text-xs mt-2">
                admin@blogserver:~$ ./fetch-posts --status pending
              </p>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-12 sm:py-16">
            <Search className="w-12 sm:w-16 h-12 sm:h-16 text-gray-600 mx-auto mb-4 icon" />
            <h3 className="text-lg sm:text-xl post-title font-bold text-gray-400 mb-2">Error Loading Blogs</h3>
            <p className="text-gray-500 text-xs sm:text-sm meta-text">{error}</p>
          </div>
        ) : (
          <>
            {/* Header Section */}
            <div className={`transform transition-all duration-1000 delay-200 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}>
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-8 sm:mb-12">
                <div>
                  <div className="text-green-400/60 text-xs sm:text-sm tracking-[0.3em] mb-2 font-mono">
                    // BLOG.POSTS()
                  </div>
                  <h1 className="text-4xl sm:text-6xl md:text-8xl header-text font-black tracking-tighter">
                    <span className="text-white">MY</span>
                    <span className="text-green-400">BLOG</span>
                  </h1>
                  <div className="text-base sm:text-xl md:text-3xl subheader-text font-light text-gray-400 tracking-wide">
                    THOUGHTS_AND_INSIGHTS.JS
                  </div>
                </div>
                
                <div className="mt-4 sm:mt-6 lg:mt-0 flex items-center space-x-4 sm:space-x-6">
                  <div className="flex items-center space-x-2">
                    <Book className="w-4 sm:w-5 h-4 sm:h-5 text-green-400 icon" />
                    <span className="text-green-400 font-mono text-base sm:text-lg">{blogs.length}</span>
                    <span className="text-gray-400 text-xs sm:text-sm meta-text">Posts</span>
                  </div>
                  <div className="w-px h-6 sm:h-8 bg-green-400/30"></div>
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 sm:w-5 h-4 sm:h-5 text-yellow-400 icon" />
                    <span className="text-yellow-400 font-mono text-base sm:text-lg">{featuredPosts.length}</span>
                    <span className="text-gray-400 text-xs sm:text-sm meta-text">Featured</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Filter & Search Section */}
            <div className={`transform transition-all duration-1000 delay-400 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 sm:mb-12 space-y-4 sm:space-y-6 lg:space-y-0">
                {/* Category Filters */}
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1 sm:py-2 border-2 font-mono text-xs sm:text-sm transition-all duration-300 ${
                          selectedCategory === category.id
                            ? 'border-green-400 bg-green-400/10 text-green-400'
                            : 'border-gray-700 text-gray-400 hover:border-green-400/50 hover:text-green-400'
                        } button`}
                        aria-label={`Filter by ${category.name}`}
                      >
                        <Icon className="w-3.5 sm:w-4 h-3.5 sm:h-4 icon" />
                        <span>{category.name}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 w-3.5 sm:w-5 h-3.5 sm:h-5 text-gray-400 icon" />
                  <input
                    type="text"
                    placeholder="Search posts or tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-gray-900 border-2 border-gray-700 pl-8 sm:pl-10 pr-3 sm:pr-4 py-1 sm:py-2 text-white placeholder-gray-400 focus:border-green-400 focus:outline-none transition-colors duration-300 w-full lg:w-80 input text-xs sm:text-sm"
                    aria-label="Search blog posts or tags"
                  />
                </div>
              </div>
            </div>

            {/* Featured Posts Section */}
            {selectedCategory === 'all' && searchTerm === '' && (
              <div className={`transform transition-all duration-1000 delay-600 mb-12 sm:mb-16 ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
              }`}>
                <div className="flex items-center space-x-2 sm:space-x-3 mb-6 sm:mb-8">
                  <Sparkles className="w-5 sm:w-6 h-5 sm:h-6 text-green-400 icon" />
                  <h2 className="text-2xl sm:text-3xl font-bold text-green-400">FEATURED_POSTS</h2>
                  <div className="flex-1 h-px bg-green-400/30"></div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                  {featuredPosts.slice(0, 2).map((post, index) => (
                    <Link
                      to={`/blogs/${post.id}`}
                      key={post.id}
                      className="bg-gray-950/90 border-2 border-gray-700 overflow-hidden group cursor-pointer transition-all duration-500 hover:border-green-400/50"
                      onMouseEnter={() => setHoveredPost(post.id)}
                      onMouseLeave={() => setHoveredPost(null)}
                    >
                      {/* Post Image */}
                      <div className="h-40 sm:h-48 relative overflow-hidden">
                        <img
                          src={post.imageUrl || 'https://via.placeholder.com/400x200?text=Blog+Image'}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all duration-300"></div>
                        <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex space-x-1 sm:space-x-2">
                          <div className={`px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs border border-yellow-400 text-yellow-400 bg-black/50`}>
                            FEATURED
                          </div>
                          {post.category && (
                            <div className={`px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs border border-green-400 text-green-400 bg-black/50`}>
                              {post.category.toUpperCase()}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Post Info */}
                      <div className="p-4 sm:p-6">
                        <h3 className="text-lg sm:text-xl post-title font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-400 text-xs sm:text-sm meta-text mb-3 sm:mb-4">{post.longDescription}</p>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                          {Array.isArray(post.tags) && post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-1.5 sm:px-2 py-0.5 bg-gray-800 text-green-400 text-xs font-mono border border-gray-600"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Meta */}
                        <div className="flex items-center justify-between text-xs sm:text-sm meta-text text-gray-400">
                          <div className="flex items-center space-x-2 sm:space-x-4">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-3 sm:w-4 h-3 sm:h-4 icon" />
                              <span>{post.date}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Tag className="w-3 sm:w-4 h-3 sm:h-4 icon" />
                              <span>{post.category.toUpperCase()}</span>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500">
                            {post.readTime}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* All Blog Posts Grid */}
            <div className={`transform transition-all duration-1000 delay-800 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}>
              <div className="flex items-center space-x-2 sm:space-x-3 mb-6 sm:mb-8">
                <Layers className="w-5 sm:w-6 h-5 sm:h-6 text-green-400 icon" />
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  {selectedCategory === 'all' ? 'ALL_POSTS' : `${selectedCategory.toUpperCase()}_POSTS`}
                </h2>
                <div className="flex-1 h-px bg-gray-700"></div>
                <span className="text-green-400 font-mono text-xs sm:text-sm">{filteredPosts.length} found</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredPosts.map((post, index) => (
                  <Link
                    to={`/blogs/${post.id}`}
                    key={post.id}
                    className="bg-gray-950/90 border-2 border-gray-800 overflow-hidden group cursor-pointer transition-all duration-300 hover:border-green-400/50 hover:bg-gray-900/50"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onMouseEnter={() => setHoveredPost(post.id)}
                    onMouseLeave={() => setHoveredPost(null)}
                  >
                    {/* Post Preview */}
                    <div className="h-28 sm:h-32 relative overflow-hidden">
                      <img
                        src={post.imageUrl || 'https://via.placeholder.com/400x200?text=Blog+Image'}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300"></div>
                      <div className="absolute top-1 sm:top-2 right-1 sm:right-2 flex space-x-1">
                        {post.featured && (
                          <Sparkles className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-yellow-400 fill-current icon" />
                        )}
                        <div className={`px-1 sm:px-1.5 py-0.5 text-xs border border-green-400 text-green-400 bg-black/50`}>
                          {post.category.toUpperCase()}
                        </div>
                      </div>
                    </div>

                    {/* Post Details */}
                    <div className="p-3 sm:p-4">
                      <h3 className="font-bold text-lg sm:text-xl post-title text-white mb-2 group-hover:text-green-400 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-400 text-xs sm:text-sm meta-text mb-2 sm:mb-3 line-clamp-2">{post.description}</p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-2 sm:mb-3">
                        {Array.isArray(post.tags) && post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-1 sm:px-1.5 py-0.5 bg-gray-800 text-green-400 text-xs font-mono"
                          >
                            {tag}
                          </span>
                        ))}
                        {Array.isArray(post.tags) && post.tags.length > 3 && (
                          <span className="px-1 sm:px-1.5 py-0.5 bg-gray-800 text-gray-400 text-xs">
                            +{post.tags.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Meta */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm meta-text text-gray-400">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 sm:w-4 h-3 sm:h-4 icon" />
                            <span>{post.date}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Tag className="w-3 sm:w-4 h-3 sm:h-4 icon" />
                            <span>{post.category}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* No Results */}
            {filteredPosts.length === 0 && (
              <div className="text-center py-12 sm:py-16">
                <Search className="w-12 sm:w-16 h-12 sm:h-16 text-gray-600 mx-auto mb-4 icon" />
                <h3 className="text-lg sm:text-xl post-title font-bold text-gray-400 mb-2">No posts found</h3>
                <p className="text-gray-500 text-xs sm:text-sm meta-text">Try adjusting your search or filter criteria</p>
              </div>
            )}

            {/* Footer CTA */}
            <div className={`transform transition-all duration-1000 delay-1000 mt-12 sm:mt-20 text-center ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}>
              <div className="border-2 border-green-400/30 p-6 sm:p-8 bg-gray-950/90">
                <h3 className="text-xl sm:text-2xl font-bold text-green-400 mb-3 sm:mb-4">WANT TO SHARE YOUR INSIGHTS?</h3>
                <p className="text-gray-400 text-xs sm:text-sm meta-text mb-4 sm:mb-6">
                  Let's build a community. I'm always looking for guest writers and new perspectives.
                </p>
                <button className="bg-green-400 text-black px-6 sm:px-8 py-2 sm:py-3 font-bold hover:bg-green-300 transition-colors duration-300 flex items-center space-x-2 mx-auto button text-xs sm:text-sm">
                  <span>GET IN TOUCH</span>
                  <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 icon" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ModernBlogPage;