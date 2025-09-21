import React, { useState, useEffect, useContext } from 'react';
import { X, Plus, Edit, Trash2, Save, Calendar,Zap, User, Tag, Clock, Image, FileText, Terminal, Code, Layers, Book, Feather, Search, Loader2, Server, GitBranch, Award, Smartphone } from 'lucide-react';
import axios from 'axios'; // Import axios
import AdminAuthContext from '../context/AdminAuthContext';

const AdminBlogManagement = () => {
  const {BackendUrl}= useContext(AdminAuthContext);
  const [blogs, setBlogs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [currentBlog, setCurrentBlog] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredPost, setHoveredPost] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [searchTerm, setSearchTerm] = useState('');
  const [terminalText, setTerminalText] = useState('');
  const [selectedFile, setSelectedFile] = useState(null); // New state for selected file
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    longDescription: '',
    category: 'all',
    tags: '',
    author: '',
    date: '',
    featured: false,
    readTime: '',
    imageUrl: ''
  });

  const categories = [
    { id: 'all', name: 'ALL POSTS', icon: Layers },
    { id: 'frontend', name: 'FRONTEND', icon: Code },
    { id: 'backend', name: 'BACKEND', icon: Server },
    { id: 'fullstack', name: 'FULL STACK', icon: Layers },
    { id: 'ai', name: 'AI & ML', icon: Zap },
    { id: 'devops', name: 'DEVOPS', icon: GitBranch },
    { id: 'cybersecurity', name: 'CYBERSECURITY', icon: Award },
    { id: 'cloud', name: 'CLOUD', icon: Smartphone },
  ];

  const filteredBlogs = blogs.filter(blog => {
    const matchesCategory = selectedCategory === 'all' || blog.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredBlogs = blogs.filter(blog => blog.featured);

  // Page load and mouse follower
  useEffect(() => {
    setIsLoaded(true);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Terminal typing effect
  useEffect(() => {
    const text = 'admin@blogserver:~$ ./blog-manager --status active';
    let i = 0;
    const timer = setInterval(() => {
      setTerminalText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(timer);
    }, 50);
    return () => clearInterval(timer);
  }, []);

  // Matrix rain effect
  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; opacity: 0.03;';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()'.split('');
    const fontSize = 12;
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

  // Floating elements effect
  useEffect(() => {
    const particles = [];
    const particleCount = 12;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 10 + 5;
      particle.className = 'float-particle';
      particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation-duration: ${Math.random() * 10 + 5}s;
        animation-delay: ${Math.random() * 5}s;
        transform: rotate(${Math.random() * 360}deg);
      `;
      document.body.appendChild(particle);
      particles.push(particle);
    }

    return () => particles.forEach(particle => document.body.contains(particle) && document.body.removeChild(particle));
  }, []);

  // Fetch blogs from backend
  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${BackendUrl}/api/blogs`);
        setBlogs(response.data);
      } catch (error) {
        showAlert('[ERROR]', 'Failed to load blogs: ' + (error.response?.data?.message || error.message), 'error');
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const showAlert = (title, text, icon = 'success') => {
    const alertDiv = document.createElement('div');
    alertDiv.className = `fixed top-4 right-4 p-4 bg-gray-950/90 text-green-400 border-2 ${icon === 'success' ? 'border-green-400' : 'border-red-400'} z-50 font-mono animate-slide-in`;
    alertDiv.innerHTML = `
      <div class="flex items-center gap-2">
        <span class="text-green-400">></span>
        <div class="font-bold">${title}</div>
      </div>
      <div className="text-sm pl-4">${text}</div>
      <div className="mt-2 text-xs opacity-60">Press any key to continue...</div>
    `;
    document.body.appendChild(alertDiv);
    setTimeout(() => document.body.contains(alertDiv) && document.body.removeChild(alertDiv), 4000);
  };

  const openModal = (mode, blog = null) => {
    setModalMode(mode);
    setCurrentBlog(blog);
    if (mode === 'add' || mode === 'edit') {
      setFormData(blog ? {
        title: blog.title,
        description: blog.description,
        longDescription: blog.longDescription,
        category: blog.category,
        tags: blog.tags.join(', '),
        author: blog.author,
        date: new Date(blog.date).toISOString().split('T')[0],
        featured: blog.featured,
        readTime: blog.readTime,
        imageUrl: blog.imageUrl || ''
      } : {
        title: '', description: '', longDescription: '', category: 'all', tags: '', author: '', date: '', featured: false, readTime: '', imageUrl: ''
      });
    }
    setSelectedFile(null); // Reset selected file on modal open
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentBlog(null);
    setFormData({ title: '', description: '', longDescription: '', category: 'all', tags: '', author: '', date: '', featured: false, readTime: '', imageUrl: '' });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.description || !formData.longDescription || !formData.category || !formData.author || !formData.date || !formData.readTime) {
      showAlert('[ERROR]', 'Missing required fields. Please check your input.', 'error');
      return;
    }

    const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('longDescription', formData.longDescription);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('tags', tagsArray); // Send tags as an array
    formDataToSend.append('author', formData.author);
    formDataToSend.append('date', new Date(formData.date).toISOString());
    formDataToSend.append('featured', formData.featured);
    formDataToSend.append('readTime', formData.readTime);

    if (selectedFile) {
      formDataToSend.append('imageUrl', selectedFile);
    } else if (formData.imageUrl) {
      formDataToSend.append('imageUrl', formData.imageUrl); // Send existing URL if no new file
    }

    setIsLoading(true);
    try {
      if (modalMode === 'add') {
        const response = await axios.post(`${BackendUrl}/api/blogs`, formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setBlogs(prev => [...prev, response.data]);
        showAlert('[SUCCESS]', 'Blog created successfully.');
      } else if (modalMode === 'edit') {
        const response = await axios.put(`${BackendUrl}/api/blogs/${currentBlog._id}`, formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setBlogs(prev => prev.map(blog => blog._id === currentBlog._id ? response.data : blog));
        showAlert('[SUCCESS]', 'Blog updated successfully.');
      }
      closeModal();
    } catch (error) {
      showAlert('[ERROR]', `Failed to ${modalMode === 'add' ? 'create' : 'update'} blog: ` + (error.response?.data?.message || error.message), 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (currentBlog) {
      setIsLoading(true);
      try {
        await axios.delete(`${BackendUrl}/api/blogs/${currentBlog._id}`);
        setBlogs(prev => prev.filter(blog => blog._id !== currentBlog._id));
        showAlert('[DELETE]', 'Blog removed successfully.', 'error');
        closeModal();
      } catch (error) {
        showAlert('[ERROR]', 'Failed to delete blog: ' + (error.response?.data?.message || error.message), 'error');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen text-white overflow-hidden relative font-mono">
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
        @keyframes slide-in {
          0% { transform: translateX(100%); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        .float-particle {
          position: fixed;
          border: 2px solid rgba(34, 197, 94, 0.3);
          z-index: -1;
          animation: float-shape linear infinite;
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

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
            key={`code-${i}`}
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
        {[...Array(8)].map((_, i) => (
          <div
            key={`shape-${i}`}
            className="float-particle"
            style={{
              width: `${20 + i * 5}px`,
              height: `${20 + i * 5}px`,
              left: `${15 + i * 10}%`,
              top: `${15 + i * 9}%`,
              animationDuration: `${5 + i * 0.2}s`,
              animationDelay: `${i * 0.3}s`
            }}
          />
        ))}
      </div>

      {/* Mouse Follower */}
      <div 
        className="fixed w-6 h-6 border-2 border-green-400/50 pointer-events-none z-50 mix-blend-difference transition-all duration-150"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: `scale(${mousePosition.x > 0 ? 1 : 0}) ${hoveredPost ? 'scale(1.5)' : ''}`
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Header Section */}
        <div className={`transform transition-all duration-1000 delay-200 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12">
            <div>
              <div className="text-green-400/60 text-xs tracking-[0.3em] mb-2">
                // ADMIN.BLOG_MANAGER()
              </div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter">
                <span className="text-white">BL</span>
                <span className="text-green-400">OGS</span>
              </h1>
              <div className="text-xl md:text-3xl font-light text-gray-400 tracking-wide">
                MANAGE_POSTS.JS
              </div>
            </div>
            <div className="mt-6 lg:mt-0 flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Book className="w-5 h-5 text-green-400" />
                <span className="text-green-400 font-mono text-lg">{blogs.length}</span>
                <span className="text-gray-400 text-sm">Posts</span>
              </div>
              <div className="w-px h-8 bg-green-400/30"></div>
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                <span className="text-yellow-400 font-mono text-lg">{featuredBlogs.length}</span>
                <span className="text-gray-400 text-sm">Featured</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter & Search Section */}
        <div className={`transform transition-all duration-1000 delay-400 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12 space-y-6 lg:space-y-0">
            <div className="flex flex-wrap gap-3">
              {categories.map(category => {
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

        {/* Create New Button */}
        <div className="mb-8">
          <button
            onClick={() => openModal('add')}
            className="bg-green-400 hover:bg-green-300 text-black font-bold px-6 py-2 flex items-center gap-2 transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,153,0.5)]"
            disabled={isLoading}
          >
            <Plus size={16} />
            Create New
          </button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-16">
            <Loader2 className="w-16 h-16 text-green-400 mx-auto animate-spin" />
            <p className="text-gray-400 mt-4">Loading...</p>
          </div>
        )}

        {/* Featured Blogs Section */}
        {!isLoading && selectedCategory === 'all' && searchTerm === '' && (
          <div className={`transform transition-all duration-1000 delay-600 mb-16 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <div className="flex items-center space-x-3 mb-8">
              <Zap className="w-6 h-6 text-green-400" />
              <h2 className="text-3xl font-bold text-green-400">FEATURED_POSTS</h2>
              <div className="flex-1 h-px bg-green-400/30"></div>
            </div>
            <div className="grid lg:grid-cols-2 gap-8">
              {featuredBlogs.slice(0, 2).map((blog, index) => (
                <div
                  key={blog._id}
                  className="bg-gray-900/50 border-2 border-gray-700 group cursor-pointer transition-all duration-500 hover:border-green-400/50"
                  onMouseEnter={() => setHoveredPost(blog._id)}
                  onMouseLeave={() => setHoveredPost(null)}
                >
                  <div className="h-48 bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all duration-300"></div>
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <div className="px-2 py-1 text-xs border-2 border-yellow-400 text-yellow-400 bg-black/50">
                        FEATURED
                      </div>
                      {blog.category && (
                        <div className="px-2 py-1 text-xs border border-green-400 text-green-400 bg-black/50">
                          {blog.category.toUpperCase()}
                        </div>
                      )}
                    </div>
                    {blog.imageUrl ? (
                      <img src={blog.imageUrl} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <Book className="w-16 h-16 text-green-400/30 group-hover:text-green-400/60 transition-colors" />
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">{blog.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">{blog.longDescription}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {Array.isArray(blog.tags) && blog.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-gray-800 text-green-400 text-xs border-2 border-gray-600">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(blog.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Tag className="w-4 h-4" />
                          <span>{blog.category.toUpperCase()}</span>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">{blog.readTime}</div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openModal('edit', blog)}
                        className="flex-1 bg-green-500/10 hover:bg-green-500/20 border-2 border-green-500/30 hover:border-green-500 text-green-400 py-2 flex items-center justify-center gap-2 text-xs font-bold transition-all"
                        disabled={isLoading}
                      >
                        <Edit size={14} /> Edit
                      </button>
                      <button
                        onClick={() => openModal('delete', blog)}
                        className="bg-red-500/10 hover:bg-red-500/20 border-2 border-red-500/30 hover:border-red-500 text-red-400 py-2 px-3 flex items-center gap-2 text-xs font-bold transition-all"
                        disabled={isLoading}
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Blogs Grid */}
        {!isLoading && (
          <div className={`transform transition-all duration-1000 delay-800 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <div className="flex items-center space-x-3 mb-8">
              <Layers className="w-6 h-6 text-green-400" />
              <h2 className="text-3xl font-bold text-white">{selectedCategory === 'all' ? 'ALL_POSTS' : `${selectedCategory.toUpperCase()}_POSTS`}</h2>
              <div className="flex-1 h-px bg-gray-700"></div>
              <span className="text-green-400 font-mono">{filteredBlogs.length} found</span>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBlogs.map((blog, index) => (
                <div
                  key={blog._id}
                  className="bg-gray-900/30 border-2 border-gray-800 group cursor-pointer transition-all duration-300 hover:border-green-400/50 hover:bg-gray-900/50"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onMouseEnter={() => setHoveredPost(blog._id)}
                  onMouseLeave={() => setHoveredPost(null)}
                >
                  <div className="h-32 bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300"></div>
                    <div className="absolute top-2 right-2 flex space-x-1">
                      {blog.featured && <Zap className="w-4 h-4 text-yellow-400 fill-current" />}
                      <div className="px-1 py-0.5 text-xs border-2 border-green-400 text-green-400 bg-black/50">
                        {blog.category.toUpperCase()}
                      </div>
                    </div>
                    {blog.imageUrl ? (
                      <img src={blog.imageUrl} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <Feather className="w-8 h-8 text-green-400/40 group-hover:text-green-400/70 transition-colors" />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-white mb-2 group-hover:text-green-400 transition-colors">{blog.title}</h3>
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">{blog.description}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {Array.isArray(blog.tags) && blog.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-1.5 py-0.5 bg-gray-800 text-green-400 text-xs font-mono">
                          {tag}
                        </span>
                      ))}
                      {Array.isArray(blog.tags) && blog.tags.length > 3 && (
                        <span className="px-1.5 py-0.5 bg-gray-800 text-gray-400 text-xs">+{blog.tags.length - 3}</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(blog.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Tag className="w-3 h-3" />
                          <span>{blog.category}</span>
                        </div>
                      </div>
                      <div>{blog.readTime}</div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openModal('edit', blog)}
                        className="flex-1 bg-green-500/10 hover:bg-green-500/20 border-2 border-green-500/30 hover:border-green-500 text-green-400 py-2 flex items-center justify-center gap-2 text-xs font-bold transition-all"
                        disabled={isLoading}
                      >
                        <Edit size={14} /> Edit
                      </button>
                      <button
                        onClick={() => openModal('delete', blog)}
                        className="bg-red-500/10 hover:bg-red-500/20 border-2 border-red-500/30 hover:border-red-500 text-red-400 py-2 px-3 flex items-center gap-2 text-xs font-bold transition-all"
                        disabled={isLoading}
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {!isLoading && filteredBlogs.length === 0 && (
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-400 mb-2">No posts found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-950/80 border-2 border-green-400/30 w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-[0_0_30px_rgba(0,255,153,0.3)]">
              <div className="bg-gray-900/50 p-4 flex justify-between items-center border-b-2 border-green-400/30">
                <div className="flex items-center gap-3">
                  <Terminal size={18} className="text-green-400" />
                  <span className="font-bold text-sm text-white">
                    {modalMode === 'add' ? 'Create New Blog' : modalMode === 'edit' ? 'Edit Blog' : 'Delete Blog'}
                  </span>
                </div>
                <button onClick={closeModal} className="text-green-400 hover:text-green-300 p-1 hover:bg-gray-800/50 transition-colors" disabled={isLoading}>
                  <X size={18} />
                </button>
              </div>
              <div className="bg-gray-950/50 p-3 border-b-2 border-green-400/30 text-sm">
                <span className="text-green-400">
                  admin@blogserver:~$ {modalMode === 'add' ? './create-blog' : modalMode === 'edit' ? './edit-blog' : './delete-blog'} --interactive
                </span>
              </div>
              {modalMode === 'delete' ? (
                <div className="p-6">
                  <h3 className="text-xl font-bold text-red-400 mb-4">[CONFIRMATION REQUIRED]</h3>
                  <p className="text-gray-400 mb-6">
                    Are you sure you want to delete the blog post: <span className="text-white font-bold">"{currentBlog?.title}"</span>?
                    <br />
                    This action cannot be undone.
                  </p>
                  <div className="flex justify-end gap-4">
                    <button
                      onClick={closeModal}
                      className="bg-gray-700/50 hover:bg-gray-700/70 border-2 border-gray-600 hover:border-gray-500 text-gray-400 font-bold px-6 py-2 transition-all"
                      disabled={isLoading}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDelete}
                      className="bg-red-400/20 hover:bg-red-400/30 border-2 border-red-400 hover:border-red-300 text-red-400 font-bold px-6 py-2 flex items-center gap-2 transition-all"
                      disabled={isLoading}
                    >
                      {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                      Delete
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="p-6 max-h-[60vh] overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="flex items-center gap-2 text-green-400 text-sm font-bold mb-2">
                          <FileText size={14} /> Title [Required]
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          className="w-full bg-gray-950/50 border-2 border-green-400/50 focus:border-green-400 text-white p-3 outline-none transition-all placeholder-gray-400/30"
                          placeholder="Enter blog title..."
                          required
                          disabled={isLoading}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-green-400 text-sm font-bold mb-2">Short Description [Required]</label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          rows="3"
                          className="w-full bg-gray-950/50 border-2 border-green-400/50 focus:border-green-400 text-white p-3 outline-none transition-all resize-none placeholder-gray-400/30"
                          placeholder="Brief description of the blog..."
                          required
                          disabled={isLoading}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-green-400 text-sm font-bold mb-2">Long Description [Required]</label>
                        <textarea
                          name="longDescription"
                          value={formData.longDescription}
                          onChange={handleInputChange}
                          rows="6"
                          className="w-full bg-gray-950/50 border-2 border-green-400/50 focus:border-green-400 text-white p-3 outline-none transition-all resize-none placeholder-gray-400/30"
                          placeholder="Detailed content of the blog..."
                          required
                          disabled={isLoading}
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-2 text-green-400 text-sm font-bold mb-2"><Tag size={14} /> Category [Required]</label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          className="w-full bg-gray-950/50 border-2 border-green-400/50 focus:border-green-400 text-white p-3 outline-none transition-all placeholder-gray-400/30"
                          required
                          disabled={isLoading}
                        >
                          <option value="" disabled>Select a category</option>
                          {categories.filter(cat => cat.id !== 'all').map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-green-400 text-sm font-bold mb-2">Tags [Comma-separated]</label>
                        <input
                          type="text"
                          name="tags"
                          value={formData.tags}
                          onChange={handleInputChange}
                          className="w-full bg-gray-950/50 border-2 border-green-400/50 focus:border-green-400 text-white p-3 outline-none transition-all placeholder-gray-400/30"
                          placeholder="React, JavaScript, Web Development"
                          disabled={isLoading}
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-2 text-green-400 text-sm font-bold mb-2"><User size={14} /> Author [Required]</label>
                        <input
                          type="text"
                          name="author"
                          value={formData.author}
                          onChange={handleInputChange}
                          className="w-full bg-gray-950/50 border-2 border-green-400/50 focus:border-green-400 text-white p-3 outline-none transition-all placeholder-gray-400/30"
                          placeholder="Author name"
                          required
                          disabled={isLoading}
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-2 text-green-400 text-sm font-bold mb-2"><Calendar size={14} /> Date [Required]</label>
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          className="w-full bg-gray-950/50 border-2 border-green-400/50 focus:border-green-400 text-white p-3 outline-none transition-all"
                          required
                          disabled={isLoading}
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-2 text-green-400 text-sm font-bold mb-2"><Clock size={14} /> Read Time [Required]</label>
                        <input
                          type="text"
                          name="readTime"
                          value={formData.readTime}
                          onChange={handleInputChange}
                          className="w-full bg-gray-950/50 border-2 border-green-400/50 focus:border-green-400 text-white p-3 outline-none transition-all placeholder-gray-400/30"
                          placeholder="5 min read"
                          required
                          disabled={isLoading}
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-2 text-green-400 text-sm font-bold mb-2"><Image size={14} /> Image Upload [Optional]</label>
                        <input
                          type="file"
                          name="imageUrl"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="w-full bg-gray-950/50 border-2 border-green-400/50 focus:border-green-400 text-white p-3 outline-none transition-all placeholder-gray-400/30 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                          disabled={isLoading}
                        />
                        {formData.imageUrl && !selectedFile && (
                          <p className="text-gray-500 text-xs mt-2">Current image: <a href={formData.imageUrl} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">View Image</a></p>
                        )}
                      </div>
                      <div className="md:col-span-2">
                        <div className="bg-green-400/10 border-2 border-green-400/20 p-4">
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="checkbox"
                              name="featured"
                              checked={formData.featured}
                              onChange={handleInputChange}
                              className="w-5 h-5 bg-gray-950 border-2 border-green-400 checked:bg-green-400 accent-green-400"
                              disabled={isLoading}
                            />
                            <span className="text-green-400 font-bold text-sm">Mark as Featured</span>
                          </label>
                          <p className="text-gray-400 text-xs mt-2 ml-8">Featured blogs are highlighted on the main dashboard</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-950/50 border-t-2 border-green-400/30 p-4 flex justify-end gap-4">
                    <button
                      onClick={closeModal}
                      className="bg-red-400/20 hover:bg-red-400/30 border-2 border-red-400/50 hover:border-red-400 text-red-400 font-bold px-6 py-2 transition-all"
                      disabled={isLoading}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="bg-green-400 hover:bg-green-300 text-black font-bold px-8 py-2 flex items-center gap-2 transition-all hover:shadow-[0_0_15px_rgba(0,255,153,0.5)]"
                      disabled={isLoading}
                    >
                      {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                      {modalMode === 'add' ? 'Add' : 'Update'}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBlogManagement;