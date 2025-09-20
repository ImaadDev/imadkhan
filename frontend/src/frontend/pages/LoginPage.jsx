import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  XCircle
} from 'lucide-react';
import AuthContext from '../context/AuthContext.jsx';

const LoginPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredElement, setHoveredElement] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isFocused, setIsFocused] = useState({
    email: false,
    password: false
  });
  const { login } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFocus = (field) => {
    setIsFocused(prev => ({
      ...prev,
      [field]: true
    }));
  };

  const handleBlur = (field) => {
    setIsFocused(prev => ({
      ...prev,
      [field]: false
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await login(formData.email, formData.password);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.');
      console.error('Login error in component:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-white overflow-hidden relative flex items-center justify-center p-4">
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
          transform: `scale(${mousePosition.x > 0 ? 1 : 0}) ${hoveredElement ? 'scale(1.5)' : ''}`
        }}
      />

      {/* Login Container */}
      <div className={`relative z-10 w-full max-w-md transform transition-all duration-1000 ${
        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`}>
        <div className="bg-gray-900/70 backdrop-blur-md border-2 border-green-400/30 overflow-hidden shadow-2xl">
          {/* Header Section */}
          <div className="p-8 border-b border-green-400/20">
            <div className="text-center">
              <div className="text-green-400/60 text-xs tracking-[0.3em] mb-2 font-mono">
                // AUTHENTICATION.REQUIRED
              </div>
              <h1 className="text-4xl font-black tracking-tighter mb-2">
                <span className="text-white">IMAD</span>
                <span className="text-green-400">KHAN</span>
              </h1>
              <p className="text-gray-400 text-sm">
                Please enter your credentials to continue
              </p>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="p-8">
            <div className="space-y-6">
              {error && (
                <div className="bg-red-500/20 text-red-400 p-3 flex items-center justify-center space-x-2 text-sm">
                  <XCircle className="w-4 h-4" />
                  <span>{error || 'An unexpected error occurred.'}</span>
                </div>
              )}
              {/* Email Input */}
              <div 
                className="relative"
                onMouseEnter={() => setHoveredElement('email')}
                onMouseLeave={() => setHoveredElement(null)}
              >
                <div className={`absolute inset-0 bg-green-400/10 rounded-lg transform transition-all duration-300 ${
                  isFocused.email ? 'opacity-100' : 'opacity-0'
                }`} />
                <div className="relative flex items-center">
                  <div className="absolute left-3 text-green-400">
                    <User className="w-5 h-5" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('email')}
                    onBlur={() => handleBlur('email')}
                    placeholder="Email address"
                    className="w-full bg-gray-800/50 border-2 border-gray-700 pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:border-green-400 focus:outline-none transition-colors duration-300"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div 
                className="relative"
                onMouseEnter={() => setHoveredElement('password')}
                onMouseLeave={() => setHoveredElement(null)}
              >
                <div className={`absolute inset-0 bg-green-400/10 rounded-lg transform transition-all duration-300 ${
                  isFocused.password ? 'opacity-100' : 'opacity-0'
                }`} />
                <div className="relative flex items-center">
                  <div className="absolute left-3 text-green-400">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('password')}
                    onBlur={() => handleBlur('password')}
                    placeholder="Password"
                    className="w-full bg-gray-800/50 border-2 border-gray-700 pl-12 pr-12 py-3 text-white placeholder-gray-400 focus:border-green-400 focus:outline-none transition-colors duration-300"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-green-400 hover:text-green-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
           
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-green-400 text-black py-3 px-4 font-bold hover:bg-green-300 transition-colors duration-300 flex items-center justify-center space-x-2"
                onMouseEnter={() => setHoveredElement('submit')}
                onMouseLeave={() => setHoveredElement(null)}
                disabled={isLoading}
              >
                <span>{isLoading ? 'SIGNING IN...' : 'SIGN IN'}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
        
            </div>
          </form>
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
      `}</style>
    </div>
  );
};

export default LoginPage;