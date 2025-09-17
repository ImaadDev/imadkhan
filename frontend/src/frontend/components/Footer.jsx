import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Twitter, 
  Heart, 
  Coffee, 
  Terminal, 
  Code2, 
  ArrowUp,
  MapPin,
  Calendar,
  Clock,
  Cpu,
  Activity,
  Zap
} from 'lucide-react';

const Footer = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [uptime, setUptime] = useState(0);
  const [terminalLines, setTerminalLines] = useState([]);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [systemStats, setSystemStats] = useState({
    commits: 0,
    projects: 0,
    coffee: 0
  });

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setUptime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Animated system stats
  useEffect(() => {
    const animateStats = () => {
      const targets = { commits: 1247, projects: 42, coffee: 9999 };
      let current = { commits: 0, projects: 0, coffee: 0 };
      
      const timer = setInterval(() => {
        let allComplete = true;
        Object.keys(targets).forEach(key => {
          if (current[key] < targets[key]) {
            current[key] += Math.ceil((targets[key] - current[key]) * 0.1);
            allComplete = false;
          } else {
            current[key] = targets[key];
          }
        });
        
        setSystemStats({ ...current });
        if (allComplete) clearInterval(timer);
      }, 50);
    };
    
    setTimeout(animateStats, 1000);
  }, []);

  // Terminal boot sequence
  useEffect(() => {
    const bootSequence = [
      '> Initializing portfolio systems...',
      '> Loading social connections...',
      '> Establishing secure channels...',
      '> All systems operational ✓',
      '> Ready for contact protocols...'
    ];

    bootSequence.forEach((line, index) => {
      setTimeout(() => {
        setTerminalLines(prev => [...prev, line]);
      }, index * 800);
    });
  }, []);

  // Scroll to top detection
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { 
      name: 'GitHub', 
      icon: Github, 
      url: 'https://github.com', 
      color: '#ffffff',
      command: 'git remote -v'
    },
    { 
      name: 'LinkedIn', 
      icon: Linkedin, 
      url: 'https://linkedin.com', 
      color: '#0077b5',
      command: 'curl -X GET /professional'
    },
    { 
      name: 'Twitter', 
      icon: Twitter, 
      url: 'https://twitter.com', 
      color: '#1da1f2',
      command: 'echo "Hello World" | tweet'
    },
    { 
      name: 'Email', 
      icon: Mail, 
      url: 'mailto:dev@example.com', 
      color: '#ea4335',
      command: 'sendmail --to=dev@example.com'
    }
  ];

  const quickLinks = [
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' }
  ];

  const techStack = [
    'React', 'Node.js', 'Python', 'TypeScript', 'MongoDB', 'AWS'
  ];

  return (
    <>
      <style>{`
        @keyframes matrixRain {
          0% { transform: translateY(-100vh); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 5px rgba(0, 255, 65, 0.3); }
          50% { box-shadow: 0 0 20px rgba(0, 255, 65, 0.8); }
        }
        
        @keyframes typewriter {
          from { width: 0; }
          to { width: 100%; }
        }
        
        .matrix-bg::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 80%, rgba(0, 255, 65, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(0, 255, 65, 0.03) 0%, transparent 50%);
          pointer-events: none;
        }
        
        .social-hover:hover {
          transform: translateY(-2px) scale(1.05);
          filter: drop-shadow(0 5px 15px rgba(0, 255, 65, 0.4));
        }
        
        .terminal-line {
          animation: slideUp 0.5s ease-out;
        }
      `}</style>

      <footer className="relative mt-50 bg-black border-t-2 border-green-400/30 matrix-bg overflow-hidden">
        {/* Matrix Rain Effect */}
        <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-green-400 text-xs font-mono"
              style={{
                left: `${Math.random() * 100}%`,
                animation: `matrixRain ${Math.random() * 3 + 2}s linear infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              {Math.random() > 0.5 ? '1' : '0'}
            </div>
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            
            {/* Terminal Section */}
            <div className="lg:col-span-2">
              <div className="bg-black/80 border border-green-400/30 p-4 h-full">
                {/* Terminal Header */}
                <div className="flex items-center space-x-2 mb-4 pb-2 border-b border-green-400/20">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-green-400 text-sm font-mono ml-2">
                    portfolio@terminal:~$
                  </span>
                </div>
                
                {/* Terminal Content */}
                <div className="space-y-1">
                  {terminalLines.map((line, index) => (
                    <div 
                      key={index} 
                      className="text-green-400 font-mono text-sm terminal-line"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {line}
                    </div>
                  ))}
                  
                  {/* System Status */}
                  <div className="mt-4 space-y-2 pt-4 border-t border-green-400/20">
                    <div className="flex items-center space-x-2 text-green-400 font-mono text-sm">
                      <Activity className="w-4 h-4" />
                      <span>Status: Online</span>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-green-400 font-mono text-sm">
                      <Clock className="w-4 h-4" />
                      <span>Uptime: {Math.floor(uptime / 3600)}h {Math.floor((uptime % 3600) / 60)}m</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-green-400 font-mono text-sm">
                      <MapPin className="w-4 h-4" />
                      <span>Location: {currentTime.toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-green-400 font-mono text-lg mb-4 flex items-center">
                <Terminal className="w-5 h-5 mr-2" />
                // Navigation
              </h3>
              <div className="space-y-2">
                {quickLinks.map((link, index) => (
                  <a
                    key={link.name}
                    href={link.path}
                    className="block text-gray-400 hover:text-green-400 font-mono text-sm transition-all duration-300 hover:translate-x-2"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <span className="text-green-400"></span> {link.name}
                  </a>
                ))}
              </div>

              {/* Tech Stack */}
              <div className="mt-6">
                <h4 className="text-green-400 font-mono text-sm mb-2">// Tech Stack</h4>
                <div className="flex flex-wrap gap-1">
                  {techStack.map((tech, index) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-green-400/10 text-green-400 font-mono text-xs border border-green-400/30 hover:bg-green-400/20 transition-all duration-300"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats & Social */}
            <div>
              <h3 className="text-green-400 font-mono text-lg mb-4 flex items-center">
                <Cpu className="w-5 h-5 mr-2" />
                // System Info
              </h3>
              
              {/* Stats */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 font-mono text-sm">Commits:</span>
                  <span className="text-green-400 font-mono text-sm">{systemStats.commits.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 font-mono text-sm">Projects:</span>
                  <span className="text-green-400 font-mono text-sm">{systemStats.projects}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 font-mono text-sm">Coffee:</span>
                  <span className="text-green-400 font-mono text-sm flex items-center">
                    {systemStats.coffee === 9999 ? '∞' : systemStats.coffee}
                    <Coffee className="w-3 h-3 ml-1" />
                  </span>
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center space-x-3 p-2 border border-green-400/20 hover:border-green-400/50 bg-black/50 hover:bg-green-400/5 transition-all duration-300 social-hover"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <Icon className="w-5 h-5 text-green-400 group-hover:text-green-300" />
                      <div>
                        <div className="text-green-400 font-mono text-sm">{social.name}</div>
                        <div className="text-gray-500 font-mono text-xs group-hover:text-gray-400">
                          {social.command}
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-green-400/20 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-2 text-gray-400 font-mono text-sm">
                <span>© 2025 DEV3D Portfolio</span>
                <span className="text-green-400">|</span>
                <span className="flex items-center">
                  Made with <Heart className="w-4 h-4 text-red-400 mx-1 animate-pulse" /> and 
                  <Coffee className="w-4 h-4 text-yellow-600 ml-1" />
                </span>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-gray-400 font-mono text-sm">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  {currentTime.toLocaleDateString()}
                </div>
                <div className="flex items-center space-x-1 text-green-400 font-mono text-sm">
                  <Zap className="w-4 h-4" />
                  <span>Powered by React</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-3 bg-green-400 text-black hover:bg-green-300 transition-all duration-300 border-2 border-green-400 hover:border-green-300 z-50"
            style={{ animation: 'glow 2s ease-in-out infinite' }}
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}
      </footer>
    </>
  );
};

export default Footer;