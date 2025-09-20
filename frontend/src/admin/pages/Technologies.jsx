import React, { useState, useEffect, useContext } from 'react';
import { X, Plus, Edit, Trash2, Save, FileText, Image, Terminal, Code, Layers, Server, Search, Loader2, Cpu } from 'lucide-react';
import axios from 'axios'; // Import axios
import AdminAuthContext from '../context/AdminAuthContext';

const TechnologiesPage = () => {
  const {BackendUrl} = useContext(AdminAuthContext)
  const [technologies, setTechnologies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [currentTechnology, setCurrentTechnology] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredTech, setHoveredTech] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [searchTerm, setSearchTerm] = useState('');
  const [terminalText, setTerminalText] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    iconUrl: '',
    category: ''
  });

  const categories = [
    { id: 'all', name: 'ALL TECHNOLOGIES', icon: Layers },
    { id: 'frontend', name: 'FRONTEND', icon: Code },
    { id: 'backend', name: 'BACKEND', icon: Server },
    { id: 'devops', name: 'DEVOPS', icon: Cpu }
  ];

  const filteredTechnologies = technologies.filter(tech => {
    const matchesCategory = selectedCategory === 'all' || tech.category === selectedCategory;
    const matchesSearch = tech.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
    const text = 'admin@techserver:~$ ./tech-manager --status active';
    let i = 0;
    const timer = setInterval(() => {
      setTerminalText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(timer);
    }, 50);
    return () => clearInterval(timer);
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

  // Floating elements effect with mobile optimization
  useEffect(() => {
    const isMobile = window.innerWidth < 640;
    const particleCount = isMobile ? 6 : 12;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * (isMobile ? 8 : 10) + 5;
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

  // Fetch technologies from backend
  useEffect(() => {
    const fetchTechnologies = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${BackendUrl}/api/technologies`);
        setTechnologies(response.data);
      } catch (error) {
        showAlert('[ERROR]', 'Failed to load technologies: ' + (error.response?.data?.message || error.message), 'error');
      } finally {
        setIsLoading(false);
      }
    };
    fetchTechnologies();
  }, []);

  const showAlert = (title, text, icon = 'success') => {
    const alertDiv = document.createElement('div');
    alertDiv.className = `fixed top-4 right-2 sm:right-4 p-3 sm:p-4 bg-gray-950/90 text-green-400 border-2 ${icon === 'success' ? 'border-green-400' : 'border-red-400'} z-50 font-mono animate-slide-in`;
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

  const openModal = (mode, tech = null) => {
    setModalMode(mode);
    setCurrentTechnology(tech);
    if (mode === 'add' || mode === 'edit') {
      setFormData(tech ? {
        name: tech.name,
        iconUrl: tech.iconUrl || '',
        category: tech.category || ''
      } : {
        name: '',
        iconUrl: '',
        category: ''
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentTechnology(null);
    setFormData({ name: '', iconUrl: '', category: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.name) {
      showAlert('[ERROR]', 'Missing required field: Name is required.', 'error');
      return;
    }

    const techData = { ...formData };

    setIsLoading(true);
    try {
      if (modalMode === 'add') {
        const response = await axios.post(`${BackendUrl}/api/technologies`, techData);
        setTechnologies(prev => [...prev, response.data]);
        showAlert('[SUCCESS]', 'Technology created successfully.');
      } else if (modalMode === 'edit') {
        const response = await axios.put(`${BackendUrl}/api/technologies/${currentTechnology._id}`, techData);
        setTechnologies(prev => prev.map(tech => tech._id === currentTechnology._id ? response.data : tech));
        showAlert('[SUCCESS]', 'Technology updated successfully.');
      }
      closeModal();
    } catch (error) {
      showAlert('[ERROR]', `Failed to ${modalMode === 'add' ? 'create' : 'update'} technology: ` + (error.response?.data?.message || error.message), 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (currentTechnology) {
      setIsLoading(true);
      try {
        await axios.delete(`{${BackendUrl}/api/technologies/${currentTechnology._id}`);
        setTechnologies(prev => prev.filter(tech => tech._id !== currentTechnology._id));
        showAlert('[DELETE]', 'Technology removed successfully.', 'error');
        closeModal();
      } catch (error) {
        showAlert('[ERROR]', 'Failed to delete technology: ' + (error.response?.data?.message || error.message), 'error');
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
          99% { transform: translateY(-4px) rotate(240deg); }
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
        @media (max-width: 640px) {
          .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
          .header-text {
            font-size: 1.875rem; /* text-3xl */
          }
          .subheader-text {
            font-size: 1rem; /* text-base */
          }
          .category-button {
            padding: 0.5rem 0.75rem;
            font-size: 0.75rem;
          }
          .modal {
            width: 95vw;
            padding: 0.5rem;
          }
          .modal-content {
            padding: 1rem;
          }
          .modal-button {
            padding: 0.5rem 1rem;
            font-size: 0.75rem;
          }
          .card {
            padding: 0.75rem;
          }
          .card-image {
            height: 8rem;
          }
          .search-input {
            padding-left: 2rem;
          }
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
        {[...Array(window.innerWidth < 640 ? 6 : 12)].map((_, i) => (
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

      {/* Mouse Follower */}
      <div 
        className="fixed w-6 h-6 border-2 border-green-400/50 pointer-events-none z-50 mix-blend-difference transition-all duration-150"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: `scale(${mousePosition.x > 0 ? 1 : 0}) ${hoveredTech ? 'scale(1.5)' : ''}`
        }}
      />

      <div className="relative z-10 max-w-full sm:max-w-screen-md md:max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 container">
        {/* Header Section */}
        <div className={`transform transition-all duration-1000 delay-200 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-8 sm:mb-12">
            <div>
              <div className="text-green-400/60 text-xs tracking-[0.3em] mb-2">
                // ADMIN.TECH_MANAGER()
              </div>
              <h1 className="sm:text-5xl md:text-6xl header-text font-black tracking-tighter">
                <span className="text-white">TECHN</span>
                <span className="text-green-400">OLOGIES</span>
              </h1>
              <div className="text-base sm:text-xl subheader-text font-light text-gray-400 tracking-wide">
                MANAGE_TECHNOLOGIES.JS
              </div>
            </div>
            <div className="mt-4 sm:mt-6 lg:mt-0 flex items-center space-x-4 sm:space-x-6">
              <div className="flex items-center space-x-2">
                <Cpu className="w-4 sm:w-5 h-4 sm:h-5 text-green-400" />
                <span className="text-green-400 font-mono text-base sm:text-lg">{technologies.length}</span>
                <span className="text-gray-400 text-xs sm:text-sm">Technologies</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter & Search Section */}
        <div className={`transform transition-all duration-1000 delay-400 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 sm:mb-12 space-y-4 sm:space-y-6 lg:space-y-0">
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {categories.map(category => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 border-2 font-mono text-xs sm:text-sm category-button transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'border-green-400 bg-green-400/10 text-green-400'
                        : 'border-gray-700 text-gray-400 hover:border-green-400/50 hover:text-green-400'
                    }`}
                  >
                    <Icon className="w-3 sm:w-4 h-3 sm:h-4" />
                    <span>{category.name}</span>
                  </button>
                );
              })}
            </div>
            <div className="relative">
              <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search technologies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-900 border-2 border-gray-700 px-8 sm:px-10 py-1.5 sm:py-2 text-white placeholder-gray-400 focus:border-green-400 focus:outline-none transition-colors duration-300 w-full search-input"
                disabled={isLoading}
              />
            </div>
          </div>
        </div>

        {/* Create New Button */}
        <div className="mb-6 sm:mb-8">
          <button
            onClick={() => openModal('add')}
            className="bg-green-400 hover:bg-green-300 text-black font-bold px-4 sm:px-6 py-1.5 sm:py-2 flex items-center gap-2 transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,153,0.5)]"
            disabled={isLoading}
          >
            <Plus size={14} />
            Create New
          </button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12 sm:py-16">
            <Loader2 className="w-12 sm:w-16 h-12 sm:h-16 text-green-400 mx-auto animate-spin" />
            <p className="text-gray-400 mt-4 text-sm sm:text-base">Loading...</p>
          </div>
        )}

        {/* Technologies Grid */}
        {!isLoading && (
          <div className={`transform transition-all duration-1000 delay-800 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <div className="flex items-center space-x-2 sm:space-x-3 mb-6 sm:mb-8">
              <Layers className="w-5 sm:w-6 h-5 sm:h-6 text-green-400" />
              <h2 className="text-2xl sm:text-3xl font-bold text-white">{selectedCategory === 'all' ? 'ALL_TECHNOLOGIES' : `${selectedCategory.toUpperCase()}_TECHNOLOGIES`}</h2>
              <div className="flex-1 h-px bg-gray-700"></div>
              <span className="text-green-400 font-mono text-sm sm:text-base">{filteredTechnologies.length} found</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {filteredTechnologies.map((tech, index) => (
                <div
                  key={tech._id}
                  className="bg-gray-900/30 border-2 border-gray-800 group cursor-pointer transition-all duration-300 hover:border-green-400/50 hover:bg-gray-900/50 card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onMouseEnter={() => setHoveredTech(tech._id)}
                  onMouseLeave={() => setHoveredTech(null)}
                >
                  <div className="h-24 sm:h-32 card-image bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300"></div>
                    <div className="absolute top-1 sm:top-2 right-1 sm:right-2 flex space-x-1">
                      <div className="px-1 py-0.5 text-xs border-2 border-green-400 text-green-400 bg-black/50">
                        {tech.category ? tech.category.toUpperCase() : 'UNCATEGORIZED'}
                      </div>
                    </div>
                    {tech.iconUrl ? (
                      <img src={tech.iconUrl} alt={tech.name} className="w-12 sm:w-16 h-12 sm:h-16 object-contain group-hover:scale-110 transition-transform duration-300" />
                    ) : (
                      <Cpu className="w-6 sm:w-8 h-6 sm:h-8 text-green-400/40 group-hover:text-green-400/70 transition-colors" />
                    )}
                  </div>
                  <div className="p-3 sm:p-4">
                    <h3 className="font-bold text-white mb-2 text-sm sm:text-base group-hover:text-green-400 transition-colors">{tech.name}</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openModal('edit', tech)}
                        className="flex-1 bg-green-500/10 hover:bg-green-500/20 border-2 border-green-500/30 hover:border-green-500 text-green-400 py-1.5 sm:py-2 flex items-center justify-center gap-1 sm:gap-2 text-xs font-bold transition-all"
                        disabled={isLoading}
                      >
                        <Edit size={12} /> Edit
                      </button>
                      <button
                        onClick={() => openModal('delete', tech)}
                        className="bg-red-500/10 hover:bg-red-500/20 border-2 border-red-500/30 hover:border-red-500 text-red-400 py-1.5 sm:py-2 px-2 sm:px-3 flex items-center gap-1 sm:gap-2 text-xs font-bold transition-all"
                        disabled={isLoading}
                      >
                        <Trash2 size={12} /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {!isLoading && filteredTechnologies.length === 0 && (
          <div className="text-center py-12 sm:py-16">
            <Search className="w-12 sm:w-16 h-12 sm:h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg sm:text-xl font-bold text-gray-400 mb-2">No technologies found</h3>
            <p className="text-gray-500 text-sm sm:text-base">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-2 sm:p-4">
            <div className="bg-gray-950/80 border-2 border-green-400/30 w-full max-w-[95vw] sm:max-w-lg max-h-[90vh] overflow-hidden shadow-[0_0_30px_rgba(0,255,153,0.3)] modal">
              <div className="bg-gray-900/50 p-3 sm:p-4 flex justify-between items-center border-b-2 border-green-400/30">
                <div className="flex items-center gap-3">
                  <Terminal size={16} className="text-green-400" />
                  <span className="font-bold text-sm text-white">
                    {modalMode === 'add' ? 'Create New Technology' : modalMode === 'edit' ? 'Edit Technology' : 'Delete Technology'}
                  </span>
                </div>
                <button onClick={closeModal} className="text-green-400 hover:text-green-300 p-1 hover:bg-gray-800/50 transition-colors" disabled={isLoading}>
                  <X size={16} />
                </button>
              </div>
              <div className="bg-gray-950/50 p-2 sm:p-3 border-b-2 border-green-400/30 text-xs sm:text-sm">
                <span className="text-green-400">
                  admin@techserver:~$ {modalMode === 'add' ? './create-tech' : modalMode === 'edit' ? './edit-tech' : './delete-tech'} --interactive
                </span>
              </div>
              {modalMode === 'delete' ? (
                <div className="p-3 sm:p-6 modal-content">
                  <h3 className="text-lg sm:text-xl font-bold text-red-400 mb-4">[CONFIRMATION REQUIRED]</h3>
                  <p className="text-gray-400 mb-6 text-sm sm:text-base">
                    Are you sure you want to delete the technology: <span className="text-white font-bold">"{currentTechnology?.name}"</span>?
                    <br />
                    This action cannot be undone.
                  </p>
                  <div className="flex justify-end gap-3 sm:gap-4">
                    <button
                      onClick={closeModal}
                      className="bg-gray-700/50 hover:bg-gray-700/70 border-2 border-gray-600 hover:border-gray-500 text-gray-400 font-bold px-4 sm:px-6 py-1.5 sm:py-2 modal-button transition-all"
                      disabled={isLoading}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDelete}
                      className="bg-red-400/20 hover:bg-red-400/30 border-2 border-red-400 hover:border-red-300 text-red-400 font-bold px-4 sm:px-6 py-1.5 sm:py-2 modal-button flex items-center gap-2 transition-all"
                      disabled={isLoading}
                    >
                      {isLoading ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                      Delete
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="p-3 sm:p-6 modal-content max-h-[60vh] overflow-y-auto">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="flex items-center gap-2 text-green-400 text-xs sm:text-sm font-bold mb-2">
                          <FileText size={12} /> Technology Name [Required]
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full bg-gray-950/50 border-2 border-green-400/50 focus:border-green-400 text-white p-2 sm:p-3 outline-none transition-all placeholder-gray-400/30"
                          placeholder="Enter technology name..."
                          required
                          disabled={isLoading}
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-2 text-green-400 text-xs sm:text-sm font-bold mb-2">
                          <Image size={12} /> Icon URL
                        </label>
                        <input
                          type="url"
                          name="iconUrl"
                          value={formData.iconUrl}
                          onChange={handleInputChange}
                          className="w-full bg-gray-950/50 border-2 border-green-400/50 focus:border-green-400 text-white p-2 sm:p-3 outline-none transition-all placeholder-gray-400/30"
                          placeholder="https://example.com/icon.png"
                          disabled={isLoading}
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-2 text-green-400 text-xs sm:text-sm font-bold mb-2">
                          <Layers size={12} /> Category
                        </label>
                        <input
                          type="text"
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          className="w-full bg-gray-950/50 border-2 border-green-400/50 focus:border-green-400 text-white p-2 sm:p-3 outline-none transition-all placeholder-gray-400/30"
                          placeholder="frontend, backend, devops"
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-950/50 border-t-2 border-green-400/30 p-3 sm:p-4 flex justify-end gap-3 sm:gap-4">
                    <button
                      onClick={closeModal}
                      className="bg-red-400/20 hover:bg-red-400/30 border-2 border-red-400/50 hover:border-red-400 text-red-400 font-bold px-4 sm:px-6 py-1.5 sm:py-2 modal-button transition-all"
                      disabled={isLoading}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="bg-green-400 hover:bg-green-300 text-black font-bold px-6 sm:px-8 py-1.5 sm:py-2 modal-button flex items-center gap-2 transition-all hover:shadow-[0_0_15px_rgba(0,255,153,0.5)]"
                      disabled={isLoading}
                    >
                      {isLoading ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                      Submit
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

export default TechnologiesPage;