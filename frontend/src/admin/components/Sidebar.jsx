import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard,Layers, Settings, Code, X, Terminal, FolderOpen, Activity, Award, MessageSquare } from 'lucide-react';

const neonGreen = '#00ff41';
const matrixGreen = '#00ff00';

const Sidebar = ({ open, onDrawerToggle }) => {
  const location = useLocation();

  const menuItems = [
 
    { name: 'Blogs', path: '/admin/blogs', icon: <Code />, file: 'blog.cpp' },
    { name: 'Certifications', path: '/admin/certifications', icon: <Award />, file: 'cert.jsx' },
    { name: 'Projects', path: '/admin/projects', icon: <Layers />, file: 'projects.jsx' },
    { name: 'Technologies', path: '/admin/technologies', icon: <Layers />, file: 'technologies.jsx' },

  ];

  const systemItems = [
    { name: 'Settings', path: '/admin/settings', icon: <FolderOpen />, file: 'explorer.exe' },
    { name: 'Logout', path: '/admin/logout', icon: <Activity />, file: 'monitor.sh' },
  ];

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden" 
          onClick={onDrawerToggle}
        />
      )}
      
      <nav
        // Added flex and flex-col to enable proper flexbox layout
        className={`fixed top-16 h-[calc(100vh-4rem)] left-0 w-64 z-30 transform transition-transform duration-300 ease-in-out text-white border-r border-green-400 md:translate-x-0 flex flex-col ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ 
          background: 'linear-gradient(135deg, #000000 0%, #0d0d0d 50%, #000000 100%)',
          boxShadow: '4px 0 20px rgba(0, 255, 65, 0.1)'
        }}
      >
        {/* Header (fixed at the top) */}
        <div className="border-b border-gray-800 p-6" style={{ 
          background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.9) 0%, rgba(13, 13, 13, 0.9) 100%)' 
        }}>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Terminal className="w-6 h-6 mr-3" style={{ color: neonGreen }} />
              <span className="text-lg font-mono tracking-wider" style={{ 
                color: neonGreen,
                textShadow: `0 0 10px ${neonGreen}40`
              }}>
                SYSTEM_NAV
              </span>
            </div>
            <button 
              onClick={onDrawerToggle} 
              className="text-white focus:outline-none md:hidden hover:bg-gray-900 p-2 border border-transparent hover:border-green-400 transition-all"
            >
              <X className="w-6 h-6" style={{ color: neonGreen }} />
            </button>
          </div>
          
          <div className="mt-4 flex items-center space-x-4 text-xs font-mono">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-400 animate-pulse mr-2"></div>
              <span className="text-green-400">ONLINE</span>
            </div>
            <div className="text-gray-500">|</div>
            <span className="text-gray-400">USER: ADMIN</span>
          </div>
        </div>

        {/* Navigation Section (scrollable content area) */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h3 className="text-xs font-mono text-gray-400 mb-4 tracking-widest border-b border-gray-800 pb-2">
              MAIN_MODULES
            </h3>
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className={`group flex items-center px-4 py-4 transition-all duration-200 font-mono border-l-2 ${
                        isActive 
                          ? 'bg-gray-900 text-green-400 border-green-400' 
                          : 'border-transparent hover:bg-gray-900 hover:border-green-400 text-white hover:text-green-400'
                      }`}
                      style={{
                        backgroundColor: isActive ? 'rgba(0, 255, 65, 0.1)' : 'transparent',
                        boxShadow: isActive ? `inset 0 0 20px rgba(0, 255, 65, 0.1)` : 'none'
                      }}
                      onClick={onDrawerToggle}
                    >
                      <div className="mr-4" style={{ color: isActive ? neonGreen : undefined }}>
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm">{item.name}</div>
                        <div className="text-xs text-gray-500 group-hover:text-gray-400">
                          {item.file}
                        </div>
                      </div>
                      <div className="text-green-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        &gt;
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-xs font-mono text-gray-400 mb-4 tracking-widest border-b border-gray-800 pb-2">
              SYSTEM_TOOLS
            </h3>
            <ul className="space-y-1">
              {systemItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="group flex items-center px-4 py-4 transition-all duration-200 font-mono border-l-2 border-transparent hover:bg-gray-900 hover:border-green-400 text-white hover:text-green-400"
                    onClick={onDrawerToggle}
                  >
                    <div className="mr-4">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm">{item.name}</div>
                      <div className="text-xs text-gray-500 group-hover:text-gray-400">
                        {item.file}
                      </div>
                    </div>
                    <div className="text-green-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      &gt;
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Terminal Output Section (fixed at the bottom) */}
        <div className="border-t border-gray-800 p-6 mt-auto" style={{ 
          background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.95) 0%, rgba(13, 13, 13, 0.95) 100%)' 
        }}>
          <div className="text-xs font-mono text-gray-500 space-y-1">
            <div className="flex items-center">
              <span className="text-green-400 mr-2">$</span>
              <span>system status: operational</span>
            </div>
            <div className="flex items-center">
              <span className="text-green-400 mr-2">$</span>
              <span>last login: 09:42:13</span>
            </div>
            <div className="flex items-center">
              <span className="text-green-400 mr-2">$</span>
              <span className="text-green-400">ready for commands_</span>
              <div className="w-2 h-3 bg-green-400 ml-1 animate-pulse"></div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
