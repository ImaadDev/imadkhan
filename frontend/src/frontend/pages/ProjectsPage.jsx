import React, { useState, useEffect, useContext } from 'react';
import { 
  ExternalLink, 
  Github, 
  Code, 
  Database, 
  Server, 
  Monitor, 
  Globe, 
  Layers,
  ArrowRight,
  Star,
  GitBranch,
  Users,
  Calendar,
  Zap,
  Filter,
  Search,
  Play,
  Eye,
  Award,
  Loader2
} from 'lucide-react';
import axios from 'axios';
import AuthContext from '../context/AuthContext.jsx';

const ModernProjectsPage = () => {
  const { BackendUrl } = useContext(AuthContext);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [projects, setProjects] = useState([]); // State for fetched projects
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [hoveredProject, setHoveredProject] = useState(null);
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

  // Fetch projects from backend
  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${BackendUrl}/api/projects`);
        setProjects(response.data.map(project => ({
          id: project._id,
          title: project.title,
          category: project.category,
          description: project.description,
          longDescription: project.description, // Assuming longDescription is same as description for now
          tech: project.tags, // Assuming tags are tech stack
          image: project.imageUrl || '/api/placeholder/600/400',
          github: project.githubUrl,
          live: project.projectUrl,
          status: "completed", // Assuming all projects are completed for now
          featured: false, // Need a field in backend for this if desired
          stats: { stars: 0, forks: 0, commits: 0 } // No stats in backend currently
        })));
      } catch (err) {
        setError('Failed to load projects. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, [BackendUrl]);

  const categories = [
    { id: 'all', name: 'ALL PROJECTS', icon: Layers },
    { id: 'fullstack', name: 'FULL STACK', icon: Code },
    { id: 'frontend', name: 'FRONTEND', icon: Monitor },
    { id: 'backend', name: 'BACKEND', icon: Server }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.tech.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredProjects = projects.filter(project => project.featured);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-400 border-green-400';
      case 'in-progress': return 'text-yellow-400 border-yellow-400';
      case 'planning': return 'text-blue-400 border-blue-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

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
            {['</>','{}','[]','()','//','&&','||','==='][i % 8]}
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
          transform: `scale(${mousePosition.x > 0 ? 1 : 0}) ${hoveredProject ? 'scale(1.5)' : ''}`
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <Loader2 className="w-12 sm:w-16 h-12 sm:h-16 text-green-400 mx-auto animate-spin" />
              <p className="text-gray-400 mt-4 text-sm sm:text-base">
                LOADING PROJECTS... PLEASE WAIT
              </p>
              <p className="text-green-400/60 text-xs mt-2">
                frontend@projectserver:~$ ./fetch-projects --status pending
              </p>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-12 sm:py-16">
            <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-400 mb-2">Error Loading Projects</h3>
            <p className="text-gray-500">{error}</p>
          </div>
        ) : (
          <>
            {/* Header Section */}
            <div className={`transform transition-all duration-1000 delay-200 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}>
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12">
                <div>
                  <div className="text-green-400/60 text-xs tracking-[0.3em] mb-2 font-mono">
                    // PORTFOLIO.PROJECTS()
                  </div>
                  <h1 className="text-6xl md:text-8xl font-black tracking-tighter">
                    <span className="text-white">MY</span>
                    <span className="text-green-400">WORK</span>
                  </h1>
                  <div className="text-xl md:text-3xl font-light text-gray-400 tracking-wide">
                    SHOWCASING_INNOVATION.JS
                  </div>
                </div>
                
                <div className="mt-6 lg:mt-0 flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-green-400" />
                    <span className="text-green-400 font-mono text-lg">{projects.length}</span>
                    <span className="text-gray-400 text-sm">Projects</span>
                  </div>
                  <div className="w-px h-8 bg-green-400/30"></div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <span className="text-yellow-400 font-mono text-lg">{featuredProjects.length}</span>
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
                    placeholder="Search projects or technologies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-gray-900 border-2 border-gray-700 px-10 py-2 text-white placeholder-gray-400 focus:border-green-400 focus:outline-none transition-colors duration-300 w-full lg:w-80"
                  />
                </div>
              </div>
            </div>

            {/* Featured Projects Section */}
            {selectedCategory === 'all' && searchTerm === '' && (
              <div className={`transform transition-all duration-1000 delay-600 mb-16 ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
              }`}>
                <div className="flex items-center space-x-3 mb-8">
                  <Star className="w-6 h-6 text-green-400" />
                  <h2 className="text-3xl font-bold text-green-400">FEATURED_PROJECTS</h2>
                  <div className="flex-1 h-px bg-green-400/30"></div>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-8">
                  {featuredProjects.slice(0, 2).map((project, index) => (
                    <div
                      key={project.id}
                      className="bg-gray-900/50 border-2 border-gray-700 overflow-hidden group cursor-pointer transition-all duration-500 hover:border-green-400/50"
                      onMouseEnter={() => setHoveredProject(project.id)}
                      onMouseLeave={() => setHoveredProject(null)}
                    >
                      {/* Project Image */}
                      <div className="h-48 bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
                        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all duration-300"></div>
                        <div className="absolute top-4 right-4 flex space-x-2">
                          <div className={`px-2 py-1 text-xs border ${getStatusColor(project.status)} bg-black/50`}>
                            {project.status.toUpperCase()}
                          </div>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Play className="w-16 h-16 text-green-400/30 group-hover:text-green-400/60 transition-colors" />
                        </div>
                      </div>

                      {/* Project Info */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-gray-400 text-sm mb-4">{project.longDescription}</p>
                        
                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tech.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 bg-gray-800 text-green-400 text-xs font-mono border border-gray-600"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Stats */}
                        <div className="flex items-center justify-between text-sm text-gray-400">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4" />
                              <span>{project.stats.stars}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <GitBranch className="w-4 h-4" />
                              <span>{project.stats.forks}</span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            {project.github && (
                              <Github className="w-5 h-5 hover:text-green-400 transition-colors cursor-pointer" />
                            )}
                            {project.live && (
                              <ExternalLink className="w-5 h-5 hover:text-green-400 transition-colors cursor-pointer" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* All Projects Grid */}
            <div className={`transform transition-all duration-1000 delay-800 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}>
              <div className="flex items-center space-x-3 mb-8">
                <Layers className="w-6 h-6 text-green-400" />
                <h2 className="text-3xl font-bold text-white">
                  {selectedCategory === 'all' ? 'ALL_PROJECTS' : `${selectedCategory.toUpperCase()}_PROJECTS`}
                </h2>
                <div className="flex-1 h-px bg-gray-700"></div>
                <span className="text-green-400 font-mono">{filteredProjects.length} found</span>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project, index) => (
                  <div
                    key={project.id}
                    className="bg-gray-900/30 border-2 border-gray-800 overflow-hidden group cursor-pointer transition-all duration-300 hover:border-green-400/50 hover:bg-gray-900/50"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onMouseEnter={() => setHoveredProject(project.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                  >
                    {/* Project Preview */}
                    <div className="h-32 bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300"></div>
                      <div className="absolute top-2 right-2 flex space-x-1">
                        {project.featured && (
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        )}
                        <div className={`px-1 py-0.5 text-xs border ${getStatusColor(project.status)} bg-black/50`}>
                          {project.status === 'completed' ? 'LIVE' : project.status.toUpperCase()}
                        </div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Eye className="w-8 h-8 text-green-400/40 group-hover:text-green-400/70 transition-colors" />
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="p-4">
                      <h3 className="font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-3 line-clamp-2">{project.description}</p>
                      
                      {/* Tech Tags */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {project.tech.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-1.5 py-0.5 bg-gray-800 text-green-400 text-xs font-mono"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.tech.length > 3 && (
                          <span className="px-1.5 py-0.5 bg-gray-800 text-gray-400 text-xs">
                            +{project.tech.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 text-xs text-gray-400">
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3" />
                            <span>{project.stats.stars}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <GitBranch className="w-3 h-3" />
                            <span>{project.stats.forks}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          {project.github && (
                            <Github className="w-4 h-4 hover:text-green-400 transition-colors" />
                          )}
                          {project.live && (
                            <ExternalLink className="w-4 h-4 hover:text-green-400 transition-colors" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* No Results */}
            {filteredProjects.length === 0 && !isLoading && !error && (
              <div className="text-center py-16">
                <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-400 mb-2">No projects found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            )}

            {/* Footer CTA */}
            <div className={`transform transition-all duration-1000 delay-1000 mt-20 text-center ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}>
              <div className="border-2 border-green-400/30 p-8 bg-gray-900/30">
                <h3 className="text-2xl font-bold text-white mb-4">INTERESTED IN COLLABORATION?</h3>
                <p className="text-gray-400 mb-6">
                  Let's build something amazing together. I'm always open to discussing new opportunities.
                </p>
                <button className="bg-green-400 text-black px-8 py-3 font-bold hover:bg-green-300 transition-colors duration-300 flex items-center space-x-2 mx-auto">
                  <span>GET IN TOUCH</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        )}
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

export default ModernProjectsPage;