import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal, Code2, User, Award, FolderOpen, FileText, Mail, Github, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('/');
  const [terminalText, setTerminalText] = useState('');

  const navigationItems = [
    { name: 'HOME', path: '/', icon: Terminal, code: 'cd ~/' },
    { name: 'ABOUT', path: '/about', icon: User, code: 'cat about.md' },
    { name: 'CERTIFICATIONS', path: '/certifications', icon: Award, code: 'ls certificates/' },
    { name: 'PROJECTS', path: '/projects', icon: FolderOpen, code: 'git status' },
    { name: 'BLOGS', path: '/blogs', icon: FileText, code: 'vim posts.js' },
    { name: 'CONTACT', path: '/contact', icon: Mail, code: 'ping contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const text = 'IMAD.exe --initialized';
    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setTerminalText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 150);
    return () => clearInterval(timer);
  }, []);

  const handleLinkClick = (path) => {
    setActiveLink(path);
    setIsOpen(false);
  };

  return (
    <>
      <style>{`
        @keyframes glitch {
          0%, 100% { transform: translateX(0); }
          10% { transform: translateX(-1px); }
          20% { transform: translateX(1px); }
          30% { transform: translateX(-1px); }
        }
        
        @keyframes scanline {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100vw); }
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        @keyframes slideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes fadeInUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .terminal-cursor::after {
          content: '█';
          animation: blink 1s infinite;
          color: #00ff41;
        }

        .scanline {
          position: absolute;
          top: 0;
          left: -100%;
          width: 2px;
          height: 100%;
          background: linear-gradient(90deg, transparent, #00ff41, transparent);
          animation: scanline 3s ease-in-out infinite;
        }

        .nav-link-hover {
          position: relative;
          overflow: hidden;
        }

        .nav-link-hover::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(0, 255, 65, 0.1), transparent);
          transition: left 0.5s;
        }

        .nav-link-hover:hover::before {
          left: 100%;
        }
      `}</style>

      <nav className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-500
        ${isScrolled 
          ? 'bg-black/95 backdrop-blur-md border-b-2 border-green-400/50 shadow-lg shadow-green-400/20' 
          : 'bg-black/80 backdrop-blur-sm border-b border-green-400/20'
        }
      `}>
        {/* Animated scanline */}
        <div className="scanline"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            
            {/* Logo Section */}
            <div className="flex items-center space-x-4">
              <Link 
                href="/" 
                className="group flex items-center space-x-2"
                onClick={() => handleLinkClick('/')}
              >
                <div className="relative">
                  <Code2 className="w-8 h-8 text-green-400 group-hover:animate-spin transition-all duration-300" />
                  <div className="absolute inset-0 bg-green-400/20 blur-xl group-hover:bg-green-400/40 transition-all duration-300"></div>
                </div>
                
                <div className="hidden sm:block">
                  <div className="text-xl font-bold text-green-400 tracking-wider group-hover:animate-pulse">
                    {'<'} IMAD {' />'}
                  </div>
                  <div className="text-xs text-gray-400 font-mono terminal-cursor">
                    {terminalText}
                  </div>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = activeLink === item.path;
                
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`
                      group relative px-4 py-2 nav-link-hover
                      transition-all duration-300 font-mono text-sm
                      border border-transparent hover:border-green-400/30
                      ${isActive 
                        ? 'text-black bg-green-400 border-green-400' 
                        : 'text-green-400 hover:text-green-300 hover:bg-green-400/5'
                      }
                    `}
                    onClick={() => handleLinkClick(item.path)}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center space-x-2 relative z-10">
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </div>
                    
                    {/* Hover effect background */}
                    <div className={`
                      absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                      bg-gradient-to-r from-green-400/10 via-green-400/20 to-green-400/10
                    `} />
                    
                    {/* Command tooltip */}
                    <div className={`
                      absolute -bottom-8 left-1/2 transform -translate-x-1/2
                      bg-black border border-green-400/50 px-2 py-1 text-xs
                      text-green-400 font-mono whitespace-nowrap
                      opacity-0 group-hover:opacity-100 transition-all duration-300
                      pointer-events-none
                    `}>
                      {item.code}
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Social Links - Desktop */}
            <div className="hidden lg:flex items-center space-x-3">
              <a
                href="https://github.com/ImaadDev"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-green-400 hover:text-green-300 hover:bg-green-400/10 border border-transparent hover:border-green-400/30 transition-all duration-300"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/imad-hussain-khan-76388b305"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-green-400 hover:text-green-300 hover:bg-green-400/10 border border-transparent hover:border-green-400/30 transition-all duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`
                  p-2 text-green-400 hover:text-green-300 transition-all duration-300
                  border border-green-400/30 hover:border-green-400 hover:bg-green-400/10
                  ${isOpen ? 'bg-green-400/20 border-green-400' : ''}
                `}
              >
                {isOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div 
            className="lg:hidden border-t border-green-400/20 bg-black/95 backdrop-blur-md"
            style={{ animation: 'slideDown 0.3s ease-out' }}
          >
            <div className="px-4 py-6 space-y-4">
              {/* Terminal Header */}
              <div className="text-green-400 font-mono text-sm mb-4 pb-2 border-b border-green-400/20">
                <div className="flex items-center space-x-2">
                  <Terminal className="w-4 h-4" />
                  <span>mobile@dev3d:~$</span>
                </div>
              </div>

              {/* Navigation Links */}
              {navigationItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = activeLink === item.path;
                
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`
                      flex items-center space-x-3 px-4 py-3 font-mono text-sm
                      transition-all duration-300 border-l-4
                      ${isActive
                        ? 'border-green-400 bg-green-400/10 text-green-400'
                        : 'border-transparent text-green-400/80 hover:text-green-400 hover:bg-green-400/5 hover:border-green-400/50'
                      }
                    `}
                    onClick={() => handleLinkClick(item.path)}
                    style={{ 
                      animation: `fadeInUp 0.3s ease-out ${index * 0.05}s both`
                    }}
                  >
                    <Icon className="w-5 h-5" />
                    <div className="flex-1">
                      <div>{item.name}</div>
                      <div className="text-xs text-gray-500 font-mono">{item.code}</div>
                    </div>
                  </Link>
                );
              })}

              {/* Mobile Social Links */}
              <div className="pt-4 mt-4 border-t border-green-400/20">
                <div className="text-green-400 font-mono text-sm mb-3">// Connect</div>
                <div className="flex space-x-4">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-3 py-2 text-green-400 hover:text-green-300 border border-green-400/30 hover:border-green-400 hover:bg-green-400/10 transition-all duration-300"
                  >
                    <Github className="w-4 h-4" />
                    <span className="text-sm font-mono">GitHub</span>
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-3 py-2 text-green-400 hover:text-green-300 border border-green-400/30 hover:border-green-400 hover:bg-green-400/10 transition-all duration-300"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span className="text-sm font-mono">LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;