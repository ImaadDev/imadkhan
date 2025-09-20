import React, { useState, useContext } from 'react';
import { Menu, Search, Bell, User, MoreVertical, X, Terminal, Code, LogOut } from 'lucide-react';
import AdminAuthContext from '../context/AdminAuthContext.jsx';

const neonGreen = '#00ff41';
const matrixGreen = '#00ff00';

const Navbar = ({ onDrawerToggle }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { logout, user } = useContext(AdminAuthContext);

  const handleProfileMenuOpen = () => {
    setIsMenuOpen(true);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const handleMobileMenuOpen = () => {
    setIsMobileMenuOpen(true);
  };

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    handleMenuClose();
    handleMobileMenuClose();
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-20 bg-black text-white border-b border-green-400" style={{ 
        background: 'linear-gradient(135deg, #000000 0%, #0d0d0d 100%)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 20px rgba(0, 255, 65, 0.1)'
      }}>
        <div className="flex items-center justify-between px-6 py-4">
          {/* Mobile Menu Button */}
          <button 
            onClick={onDrawerToggle} 
            className="md:hidden p-2 text-white hover:bg-gray-900 transition-all duration-200 border border-transparent hover:border-green-400"
          >
            <Menu className="w-6 h-6" style={{ color: neonGreen }} />
          </button>

          {/* Title */}
          <div className="flex items-center ml-4">
            <Terminal className="w-8 h-8 mr-3" style={{ color: neonGreen }} />
            <h1 className="text-xl md:text-2xl font-mono text-white tracking-widest" style={{ 
              textShadow: `0 0 10px ${neonGreen}, 0 0 20px ${neonGreen}40` 
            }}>
              <span className="text-white">IMAD</span>
              <span style={{ color: neonGreen }}>_TERMINAL</span>
            </h1>
          </div>

          {/* Spacer */}
          <div className="flex-grow"></div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <button className="p-3 text-white hover:bg-gray-900 transition-all duration-200 border border-transparent hover:border-green-400">
              <Search className="w-6 h-6" style={{ color: neonGreen }} />
            </button>
            <button className="p-3 text-white hover:bg-gray-900 transition-all duration-200 border border-transparent hover:border-green-400">
              <Bell className="w-6 h-6" style={{ color: neonGreen }} />
            </button>
            <button 
              onClick={handleProfileMenuOpen} 
              className="flex items-center p-3 text-white hover:bg-gray-900 transition-all duration-200 border border-transparent hover:border-green-400"
            >
              <User className="w-6 h-6 mr-2" style={{ color: neonGreen }} />
              <span className="font-mono text-sm">{user ? user.name : 'Admin'}</span>
            </button>
          </div>

          {/* Mobile Icons */}
          <div className="md:hidden">
            <button className="p-3 text-white hover:bg-gray-900 transition-all duration-200 border border-transparent hover:border-green-400" onClick={handleMobileMenuOpen}>
              <MoreVertical className="w-6 h-6" style={{ color: neonGreen }} />
            </button>
          </div>
        </div>

        {/* Status Bar */}
        <div className="border-t border-green-400 bg-black px-6 py-2" style={{ 
          background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.95) 0%, rgba(13, 13, 13, 0.95) 100%)' 
        }}>
          <div className="flex items-center justify-between text-xs font-mono">
            <div className="flex items-center space-x-4">
              <span className="text-green-400">STATUS:</span>
              <span className="text-white">ONLINE</span>
              <div className="w-2 h-2 bg-green-400 animate-pulse"></div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-green-400">UPTIME: 24:07:15</span>
              <span className="text-green-400">CPU: 23%</span>
              <span className="text-green-400">MEM: 67%</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Profile Menu (for desktop) */}
      {isMenuOpen && (
        <div className="absolute top-24 right-6 mt-2 py-2 w-64 bg-black z-30 border border-green-400" style={{ 
          background: 'linear-gradient(135deg, #000000 0%, #0d0d0d 100%)',
          boxShadow: `0 8px 30px rgba(0, 255, 65, 0.2)`
        }}>
          <div className="px-4 py-2 border-b border-gray-800">
            <div className="flex items-center space-x-2">
              <Code className="w-4 h-4" style={{ color: neonGreen }} />
              <span className="font-mono text-xs" style={{ color: neonGreen }}>USER_MENU</span>
            </div>
          </div>
          <a href="#" className="flex items-center px-4 py-3 text-sm font-mono text-white hover:bg-gray-900 hover:text-green-400 transition-colors border-l-2 border-transparent hover:border-green-400" onClick={handleMenuClose}>
            <span className="mr-2" style={{ color: neonGreen }}>&gt;</span>
            profile.exe
          </a>
          <a href="#" className="flex items-center px-4 py-3 text-sm font-mono text-white hover:bg-gray-900 hover:text-green-400 transition-colors border-l-2 border-transparent hover:border-green-400" onClick={handleMenuClose}>
            <span className="mr-2" style={{ color: neonGreen }}>&gt;</span>
            account.cfg
          </a>
          <button 
            onClick={handleLogout}
            className="flex items-center px-4 py-3 text-sm font-mono text-white hover:bg-gray-900 hover:text-red-400 transition-colors border-l-2 border-transparent hover:border-red-400 w-full text-left"
          >
            <LogOut className="w-4 h-4 mr-2" style={{ color: neonGreen }} />
            logout.sh
          </button>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed top-0 right-0 h-full w-80 z-30 bg-black border-l border-green-400" style={{ 
          background: 'linear-gradient(135deg, #000000 0%, #0d0d0d 100%)',
          boxShadow: `-10px 0 30px rgba(0, 255, 65, 0.1)`
        }}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <Terminal className="w-6 h-6 mr-2" style={{ color: neonGreen }} />
                <span className="font-mono text-sm" style={{ color: neonGreen }}>MOBILE_TERMINAL</span>
              </div>
              <button onClick={handleMobileMenuClose} className="p-2 text-white hover:bg-gray-900 border border-transparent hover:border-green-400 transition-all">
                <X className="w-6 h-6" style={{ color: neonGreen }} />
              </button>
            </div>
            
            <div className="space-y-2">
              <a href="#" className="flex items-center py-4 px-4 text-white hover:bg-gray-900 hover:text-green-400 transition-colors border border-transparent hover:border-green-400 font-mono" onClick={handleMobileMenuClose}>
                <Bell className="w-5 h-5 mr-4" style={{ color: neonGreen }} />
                <span className="mr-2" style={{ color: neonGreen }}>&gt;</span>
                notifications.log
              </a>
              <a href="#" className="flex items-center py-4 px-4 text-white hover:bg-gray-900 hover:text-green-400 transition-colors border border-transparent hover:border-green-400 font-mono" onClick={handleMobileMenuClose}>
                <User className="w-5 h-5 mr-4" style={{ color: neonGreen }} />
                <span className="mr-2" style={{ color: neonGreen }}>&gt;</span>
                user_profile.dat
              </a>
              <button 
                onClick={handleLogout}
                className="flex items-center py-4 px-4 text-white hover:bg-gray-900 hover:text-red-400 transition-colors border border-transparent hover:border-red-400 font-mono w-full text-left"
              >
                <LogOut className="w-5 h-5 mr-4" style={{ color: neonGreen }} />
                <span className="mr-2" style={{ color: neonGreen }}>&gt;</span>
                logout.sh
              </button>
            </div>

            <div className="absolute bottom-6 left-6 right-6">
              <div className="border-t border-gray-800 pt-4">
                <div className="text-xs font-mono text-gray-500 space-y-1">
                  <div>SYSTEM_INFO:</div>
                  <div className="text-green-400">VERSION: v2.1.4</div>
                  <div className="text-green-400">BUILD: 20240918</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;