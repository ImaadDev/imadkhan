import React, { useState, useEffect } from 'react';
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
  Tag
} from 'lucide-react';

const ModernBlogPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredPost, setHoveredPost] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const blogPosts = [
    {
      id: 1,
      title: 'The Future of Serverless Architecture',
      category: 'backend',
      description: 'An in-depth look into how serverless is changing the landscape of web development.',
      longDescription: 'This post explores the benefits and challenges of serverless computing, its impact on cost efficiency and scalability, and a comparison of major providers like AWS Lambda and Google Cloud Functions.',
      tags: ['Serverless', 'AWS', 'Node.js', 'Cloud'],
      author: 'Jane Doe',
      date: '2023-10-26',
      featured: true,
      readTime: '8 min read'
    },
    {
      id: 2,
      title: 'Mastering React Hooks for State Management',
      category: 'frontend',
      description: 'A comprehensive guide to using `useState`, `useEffect`, and `useContext` effectively.',
      longDescription: 'Learn how to manage complex application state without relying on class components or external libraries. We\'ll cover custom hooks, performance optimizations, and common pitfalls.',
      tags: ['React', 'JavaScript', 'Frontend', 'Hooks'],
      author: 'John Smith',
      date: '2023-10-20',
      featured: true,
      readTime: '12 min read'
    },
    {
      id: 3,
      title: 'Building a RESTful API with Express.js',
      category: 'backend',
      description: 'Step-by-step tutorial on creating a secure and scalable API.',
      longDescription: 'This guide walks you through setting up a Node.js server, defining routes, connecting to a database, and implementing authentication using JSON Web Tokens (JWT).',
      tags: ['Node.js', 'Express.js', 'API', 'REST'],
      author: 'Jane Doe',
      date: '2023-10-15',
      featured: false,
      readTime: '10 min read'
    },
    {
      id: 4,
      title: 'Styling with Tailwind CSS: A Modern Approach',
      category: 'frontend',
      description: 'Discover the power of utility-first CSS for rapid UI development.',
      longDescription: 'We delve into the philosophy behind Tailwind CSS, its advantages over traditional CSS frameworks, and practical examples for building responsive and beautiful interfaces.',
      tags: ['Tailwind', 'CSS', 'UI/UX', 'Frontend'],
      author: 'Emily White',
      date: '2023-10-10',
      featured: false,
      readTime: '7 min read'
    },
    {
      id: 5,
      title: 'Introduction to GraphQL for Beginners',
      category: 'fullstack',
      description: 'Understanding the basics of GraphQL and why it\'s gaining popularity.',
      longDescription: 'This post provides a gentle introduction to GraphQL concepts, including queries, mutations, and schemas, with a simple example showing its benefits over REST.',
      tags: ['GraphQL', 'API', 'Fullstack'],
      author: 'John Smith',
      date: '2023-10-05',
      featured: false,
      readTime: '9 min read'
    },
    {
      id: 6,
      title: 'Securing Your Web Application with Passport.js',
      category: 'backend',
      description: 'Implementing robust user authentication with Node.js and Passport.js.',
      longDescription: 'A practical guide to integrating Passport.js strategies for local, Google, and GitHub authentication, ensuring your application is safe and secure.',
      tags: ['Security', 'Authentication', 'Node.js', 'Backend'],
      author: 'Jane Doe',
      date: '2023-09-28',
      featured: true,
      readTime: '11 min read'
    }
  ];

  const categories = [
    { id: 'all', name: 'ALL POSTS', icon: Layers },
    { id: 'frontend', name: 'FRONTEND', icon: Feather },
    { id: 'backend', name: 'BACKEND', icon: Book },
    { id: 'fullstack', name: 'FULL STACK', icon: Code }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <div className="min-h-screen text-white overflow-hidden relative">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          animation: 'grid-move 25s linear infinite'
        }}></div>
      </div>

      {/* Floating Code Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute text-green-400/20 font-mono text-sm select-none"
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
        
        {/* Floating geometric shapes */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`shape-${i}`}
            className="absolute border border-green-400/10"
            style={{
              width: `${20 + i * 5}px`,
              height: `${20 + i * 5}px`,
              left: `${15 + i * 10}%`,
              top: `${15 + i * 9}%`,
              animation: `float-shape ${5 + i * 0.2}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`
            }}
          />
        ))}
      </div>

      {/* Mouse Follower */}
      <div 
        className="fixed w-6 h-6 border border-green-400/50 pointer-events-none z-50 mix-blend-difference transition-all duration-150"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: `scale(${mousePosition.x > 0 ? 1 : 0}) ${hoveredPost ? 'scale(1.5)' : ''}`
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Header Section */}
        <div className={`transform transition-all duration-1000 delay-200 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12">
            <div>
              <div className="text-green-400/60 text-xs tracking-[0.3em] mb-2 font-mono">
                // BLOG.POSTS()
              </div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter">
                <span className="text-white">MY</span>
                <span className="text-green-400">BLOG</span>
              </h1>
              <div className="text-xl md:text-3xl font-light text-gray-400 tracking-wide">
                THOUGHTS_AND_INSIGHTS.JS
              </div>
            </div>
            
            <div className="mt-6 lg:mt-0 flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Book className="w-5 h-5 text-green-400" />
                <span className="text-green-400 font-mono text-lg">{blogPosts.length}</span>
                <span className="text-gray-400 text-sm">Posts</span>
              </div>
              <div className="w-px h-8 bg-green-400/30"></div>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                <span className="text-yellow-400 font-mono text-lg">{featuredPosts.length}</span>
                <span className="text-gray-400 text-sm">Featured</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter & Search Section */}
        <div className={`transform transition-all duration-1000 delay-400 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12 space-y-6 lg:space-y-0">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 px-4 py-2 border-2 font-mono text-sm transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'border-green-400 bg-green-400/10 text-green-400'
                        : 'border-gray-700 text-gray-400 hover:border-green-400/50 hover:text-green-400'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{category.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search posts or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-900 border-2 border-gray-700 px-10 py-2 text-white placeholder-gray-400 focus:border-green-400 focus:outline-none transition-colors duration-300 w-full lg:w-80"
              />
            </div>
          </div>
        </div>

        {/* Featured Posts Section */}
        {selectedCategory === 'all' && searchTerm === '' && (
          <div className={`transform transition-all duration-1000 delay-600 mb-16 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}>
            <div className="flex items-center space-x-3 mb-8">
              <Sparkles className="w-6 h-6 text-green-400" />
              <h2 className="text-3xl font-bold text-green-400">FEATURED_POSTS</h2>
              <div className="flex-1 h-px bg-green-400/30"></div>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {featuredPosts.slice(0, 2).map((post, index) => (
                <div
                  key={post.id}
                  className="bg-gray-900/50 border-2 border-gray-700 overflow-hidden group cursor-pointer transition-all duration-500 hover:border-green-400/50"
                  onMouseEnter={() => setHoveredPost(post.id)}
                  onMouseLeave={() => setHoveredPost(null)}
                >
                  {/* Post Image Placeholder */}
                  <div className="h-48 bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all duration-300"></div>
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <div className={`px-2 py-1 text-xs border border-yellow-400 text-yellow-400 bg-black/50`}>
                        FEATURED
                      </div>
                    </div>
                    <Book className="w-16 h-16 text-green-400/30 group-hover:text-green-400/60 transition-colors" />
                  </div>

                  {/* Post Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">{post.longDescription}</p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-800 text-green-400 text-xs font-mono border border-gray-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Meta */}
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Tag className="w-4 h-4" />
                          <span>{post.category.toUpperCase()}</span>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">
                        {post.readTime}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Blog Posts Grid */}
        <div className={`transform transition-all duration-1000 delay-800 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}>
          <div className="flex items-center space-x-3 mb-8">
            <Layers className="w-6 h-6 text-green-400" />
            <h2 className="text-3xl font-bold text-white">
              {selectedCategory === 'all' ? 'ALL_POSTS' : `${selectedCategory.toUpperCase()}_POSTS`}
            </h2>
            <div className="flex-1 h-px bg-gray-700"></div>
            <span className="text-green-400 font-mono">{filteredPosts.length} found</span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <div
                key={post.id}
                className="bg-gray-900/30 border-2 border-gray-800 overflow-hidden group cursor-pointer transition-all duration-300 hover:border-green-400/50 hover:bg-gray-900/50"
                style={{ animationDelay: `${index * 0.1}s` }}
                onMouseEnter={() => setHoveredPost(post.id)}
                onMouseLeave={() => setHoveredPost(null)}
              >
                {/* Post Preview */}
                <div className="h-32 bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300"></div>
                  <div className="absolute top-2 right-2 flex space-x-1">
                    {post.featured && (
                      <Sparkles className="w-4 h-4 text-yellow-400 fill-current" />
                    )}
                    <div className={`px-1 py-0.5 text-xs border border-green-400 text-green-400 bg-black/50`}>
                      {post.category.toUpperCase()}
                    </div>
                  </div>
                  <Feather className="w-8 h-8 text-green-400/40 group-hover:text-green-400/70 transition-colors" />
                </div>

                {/* Post Details */}
                <div className="p-4">
                  <h3 className="font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">{post.description}</p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-1.5 py-0.5 bg-gray-800 text-green-400 text-xs font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="px-1.5 py-0.5 bg-gray-800 text-gray-400 text-xs">
                        +{post.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Meta */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 text-xs text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Tag className="w-3 h-3" />
                        <span>{post.category}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-400 mb-2">No posts found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Footer CTA */}
        <div className={`transform transition-all duration-1000 delay-1000 mt-20 text-center ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}>
          <div className="border-2 border-green-400/30 p-8 bg-gray-900/30">
            <h3 className="text-2xl font-bold text-green-400 mb-4">WANT TO SHARE YOUR INSIGHTS?</h3>
            <p className="text-gray-400 mb-6">
              Let's build a community. I'm always looking for guest writers and new perspectives.
            </p>
            <button className="bg-green-400 text-black px-8 py-3 font-bold hover:bg-green-300 transition-colors duration-300 flex items-center space-x-2 mx-auto">
              <span>GET IN TOUCH</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }
        
        @keyframes float-code {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(5deg); }
          50% { transform: translateY(-5px) rotate(-5deg); }
          75% { transform: translateY(-15px) rotate(3deg); }
        }
        
        @keyframes float-shape {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-8px) rotate(120deg); }
          66% { transform: translateY(-4px) rotate(240deg); }
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default ModernBlogPage;