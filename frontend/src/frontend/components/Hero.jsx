import React, { useState, useEffect, useContext } from 'react';
import { Code, Terminal, Zap, Activity, ArrowRight, Download, Mail, Github, Linkedin, ChevronDown } from 'lucide-react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const ModernHeroSection = () => {
  const {BackendUrl} = useContext(AuthContext);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState('');
  const [aboutImageUrl, setAboutImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fullText = "Full Stack Developer";

  useEffect(() => {
    const fetchAboutImage = async () => {
        try {
            const response = await axios.get(`${BackendUrl}/api/users/aboutimage`);
            setAboutImageUrl(response.data.imageUrl);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load about image.');
            console.error('Error fetching about image:', err);
        } finally {
            setIsLoading(false);
        }
    };

    fetchAboutImage();
  }, [BackendUrl]);
  
  useEffect(() => {
    setIsLoaded(true);
    
    // Typing animation
    let currentIndex = 0;
    const typeInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
      }
    }, 100);

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      clearInterval(typeInterval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen text-white overflow-hidden relative">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(34, 197, 94, 0.2) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(34, 197, 94, 0.2) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          animation: 'grid-move 20s linear infinite'
        }}></div>
      </div>

      {/* Floating Code Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {['{', '}', '<', '>', '/', '*', '=', ';'].map((symbol, i) => (
          <div
            key={i}
            className="absolute text-green-400/20 font-mono text-2xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${4 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          >
            {symbol}
          </div>
        ))}
      </div>

      {/* Mouse Follower */}
      <div 
        className="fixed w-6 h-6 border-2 border-green-400 pointer-events-none z-50 mix-blend-difference transition-all duration-200 opacity-50"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: `scale(${mousePosition.x > 0 ? 1 : 0})`
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <div className="min-h-screen flex items-center">
          <div className="grid lg:grid-cols-2 gap-12 w-full items-center">
            
            {/* Left Content */}
            <div className="space-y-8">
              {/* Status Badge */}
              <div className={`transform transition-all duration-1000 ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}>
                <div className="inline-flex items-center space-x-2 bg-green-400/10 border border-green-400/30 px-4 py-2">
                  <Activity className="w-4 h-4 text-green-400 animate-pulse" />
                  <span className="text-green-400 text-sm font-mono">Available for projects</span>
                </div>
              </div>

              {/* Main Heading */}
              <div className={`transform transition-all duration-1000 delay-200 ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}>
                <div className="space-y-4">
                  <div className="text-green-400/70 text-sm font-mono tracking-wider">
                    // Hello World, I'm
                  </div>
                  
                  <h1 className="text-5xl md:text-7xl font-black font-bold tracking-tight leading-tight">
                    <span className="text-white">IMAD KHAN</span>
                    <br />
                    <span className="text-green-400 font-mono">
                      {typedText}
                      <span className="animate-pulse">|</span>
                    </span>
                  </h1>
                  
                  <div className="text-xl text-gray-400 font-light">
                    Building exceptional digital experiences with modern technology
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className={`transform transition-all duration-1000 delay-400 ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}>
                <div className="border-l-4 border-green-400/50 pl-6">
                  <p className="text-lg text-gray-300 leading-relaxed">
                    Specialized in crafting scalable web applications using the MERN stack. 
                    I transform complex problems into elegant, user-centric solutions that 
                    drive real business value.
                  </p>
                </div>
              </div>

              {/* Tech Stack Pills */}
              <div className={`transform transition-all duration-1000 delay-500 ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}>
                <div className="flex flex-wrap gap-3">
                  {['React', 'Node.js', 'MongoDB', 'Express', 'NextJs', 'React Native'].map((tech, index) => (
                    <div
                      key={tech}
                      className="bg-gray-900 border border-gray-700 px-4 py-2 text-sm font-mono hover:border-green-400/50 hover:bg-green-400/5 transition-all duration-300 cursor-pointer"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {tech}
                    </div>
                  ))}
                </div>
              </div>

            {/* CTA Buttons */}
<div className={`transform transition-all duration-1000 delay-700 ${
  isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
}`}>
  <div className="flex flex-col sm:flex-row gap-4">
    {/* View My Work Button */}
    <a
      href="/projects" // Link to your portfolio or work page
      className="group bg-green-400 text-black px-8 py-4 font-bold hover:bg-green-300 transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-105"
    >
      <span>View My Work</span>
      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
    </a>

    {/* Download CV Button */}
    <a
      href="/https://drive.google.com/file/d/1S6UJ78o841HlqPXEnTkHxAm3UU1FVAV0/view?usp=drive_link" // Path to your CV file in public folder
      download // Ensures file is downloaded
      className="group border-2 border-green-400 text-green-400 px-8 py-4 font-bold hover:bg-green-400 hover:text-black transition-all duration-300 flex items-center justify-center space-x-2"
    >
      <Download className="w-5 h-5" />
      <span>Download CV</span>
    </a>
  </div>
</div>

              {/* Social Links */}
              <div className={`transform transition-all duration-1000 delay-900 ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}>
                <div className="flex items-center space-x-6">
                  <span className="text-gray-500 text-sm font-mono">Connect:</span>
                  <div className="flex space-x-4">
                    {[
                      { icon: Github, href: 'https://github.com/ImaadDev' },
                      { icon: Linkedin, href: 'https://www.linkedin.com/in/imad-hussain-khan-76388b305' },
                      { icon: Mail, href: 'kimad1728@gmail.com' }
                    ].map((social, index) => {
                      const Icon = social.icon;
                      return (
                        <a
                          key={index}
                          href={social.href}
                          className="w-10 h-10 border border-gray-700 flex items-center justify-center hover:border-green-400 hover:bg-green-400/10 transition-all duration-300 group"
                        >
                          <Icon className="w-5 h-5 text-gray-400 group-hover:text-green-400 transition-colors" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Image Only */}
            <div className={`transform transition-all duration-1000 delay-600 ${
              isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'
            }`}>
              <div className="relative">
                {/* Glow Effect */}
                <div className="absolute -inset-6 bg-gradient-to-br from-green-400/20 via-blue-500/15 to-purple-500/20 blur-3xl opacity-40"></div>
                
                {/* Main Image Container */}
                <div className="relative bg-gray-900 border-2 border-gray-700 overflow-hidden">
                  {/* Developer Image */}
                  <div className="relative">
                    {isLoading ? (
                      <div className="w-full h-[500px] md:h-[600px] bg-gray-800 flex items-center justify-center">
                        <div className="animate-spin w-12 h-12 border-2 border-green-400 border-t-transparent rounded-full"></div>
                      </div>
                    ) : error ? (
                      <div className="w-full h-[500px] md:h-[600px] bg-gray-800 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-red-400 text-lg mb-2">Failed to load image</div>
                          <div className="text-gray-400 text-sm">{error}</div>
                        </div>
                      </div>
                    ) : (
                      <img 
                        src={aboutImageUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=700&fit=crop&crop=face"} 
                        alt="Developer" 
                        className="w-full h-[500px] md:h-[600px] object-cover grayscale hover:grayscale-0 transition-all duration-700"
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=700&fit=crop&crop=face";
                        }}
                      />
                    )}
                    
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                    
                    {/* Code Overlay Elements */}
                    <div className="absolute top-6 left-6 right-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-red-500"></div>
                          <div className="w-3 h-3 bg-yellow-500"></div>
                          <div className="w-3 h-3 bg-green-500"></div>
                        </div>
                        <div className="flex items-center space-x-2 bg-black/50 px-3 py-1 backdrop-blur-sm">
                          <Terminal className="w-4 h-4 text-green-400" />
                          <span className="text-green-400 text-xs font-mono">ACTIVE</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Info */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="space-y-4">
                        {/* Personal Info */}
                        <div>
                          <div className="text-white font-bold text-2xl mb-1">Imad Hussain Khan</div>
                          <div className="text-green-400 text-lg font-mono mb-3">Full Stack Engineer</div>
                          <div className="text-gray-300 text-sm leading-relaxed">
                            Passionate about creating innovative digital solutions and turning ideas into reality.
                          </div>
                        </div>

                        {/* Stats Row */}
                        <div className="grid grid-cols-3 gap-4">
                          <div className="bg-black/50 backdrop-blur-sm border border-gray-700 p-3 text-center">
                            <div className="text-green-400 text-xl font-bold">5+</div>
                            <div className="text-gray-400 text-xs uppercase tracking-wider">Years</div>
                          </div>
                          <div className="bg-black/50 backdrop-blur-sm border border-gray-700 p-3 text-center">
                            <div className="text-green-400 text-xl font-bold">30+</div>
                            <div className="text-gray-400 text-xs uppercase tracking-wider">Projects</div>
                          </div>
                          <div className="bg-black/50 backdrop-blur-sm border border-gray-700 p-3 text-center">
                            <div className="text-green-400 text-xl font-bold">99%</div>
                            <div className="text-gray-400 text-xs uppercase tracking-wider">Success</div>
                          </div>
                        </div>

                        {/* Status Indicator */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Activity className="w-4 h-4 text-green-400 animate-pulse" />
                          </div>
                          <div className="bg-green-400/20 border border-green-400/50 px-3 py-1">
                            <span className="text-green-400 text-xs font-mono">AVAILABLE</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Floating Tech Icons */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute top-20 right-8 bg-black/60 backdrop-blur-sm border border-green-400/30 p-2">
                        <Code className="w-5 h-5 text-green-400" />
                      </div>
                      <div className="absolute top-32 right-16 bg-black/60 backdrop-blur-sm border border-blue-400/30 p-2">
                        <Terminal className="w-5 h-5 text-blue-400" />
                      </div>
                      <div className="absolute top-44 right-6 bg-black/60 backdrop-blur-sm border border-purple-400/30 p-2">
                        <Zap className="w-5 h-5 text-purple-400" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Side Accent Lines */}
                <div className="absolute -left-2 top-12 bottom-12 w-1 bg-gradient-to-b from-transparent via-green-400 to-transparent opacity-60"></div>
                <div className="absolute -right-2 top-20 bottom-20 w-1 bg-gradient-to-b from-transparent via-blue-400 to-transparent opacity-60"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1000 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="flex flex-col items-center space-y-2 animate-bounce">
            <span className="text-gray-500 text-sm font-mono">Scroll to explore</span>
            <ChevronDown className="w-5 h-5 text-green-400" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(34, 197, 94, 0.3); }
          50% { box-shadow: 0 0 40px rgba(34, 197, 94, 0.6); }
        }
      `}</style>
    </div>
  );
};

export default ModernHeroSection;