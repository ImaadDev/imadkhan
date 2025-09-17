import React, { useState, useEffect } from 'react';
import {
  SiNextdotjs,
  SiReact,
  SiMongodb,
  SiExpress,
  SiNodedotjs,
  SiTailwindcss,
  SiBootstrap,
  SiJavascript,
} from 'react-icons/si';

// Enhanced keyframes for 3D floating effect
const floatingKeyframes = `
  @keyframes float3d {
    0% { transform: translateY(0) translateZ(0) rotateX(0deg) rotateY(0deg); }
    25% { transform: translateY(-8px) translateZ(10px) rotateX(2deg) rotateY(1deg); }
    50% { transform: translateY(-15px) translateZ(20px) rotateX(0deg) rotateY(-1deg); }
    75% { transform: translateY(-8px) translateZ(10px) rotateX(-2deg) rotateY(0deg); }
    100% { transform: translateY(0) translateZ(0) rotateX(0deg) rotateY(0deg); }
  }
  
  @keyframes glitch {
    0%, 100% { transform: translateX(0); }
    10% { transform: translateX(-2px); }
    20% { transform: translateX(2px); }
    30% { transform: translateX(-2px); }
    40% { transform: translateX(2px); }
    50% { transform: translateX(0); }
  }
  
  @keyframes typewriter {
    from { width: 0; }
    to { width: 100%; }
  }
  
  @keyframes blink {
    0%, 50% { border-right-color: transparent; }
    51%, 100% { border-right-color: #00ff41; }
  }
  
  @keyframes matrix {
    0% { background-position: 0% 0%; }
    100% { background-position: 100% 100%; }
  }
  
  @keyframes pulse3d {
    0%, 100% { 
      transform: scale3d(1, 1, 1); 
      box-shadow: 0 0 20px rgba(0, 255, 65, 0.3), inset 0 0 20px rgba(0, 255, 65, 0.1);
    }
    50% { 
      transform: scale3d(1.1, 1.1, 1.1); 
      box-shadow: 0 0 40px rgba(0, 255, 65, 0.6), inset 0 0 30px rgba(0, 255, 65, 0.2);
    }
  }
  
  @keyframes codeScroll {
    0% { transform: translateY(100%); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { transform: translateY(-100%); opacity: 0; }
  }
`;

const technologies = [
  { 
    name: 'Next.js', 
    icon: SiNextdotjs, 
    color: '#FFFFFF', 
    bgGrad: 'from-black via-gray-900 to-black',
    code: 'const app = NextJS.create()',
    type: 'Framework'
  },
  { 
    name: 'React', 
    icon: SiReact, 
    color: '#61DAFB', 
    bgGrad: 'from-blue-900 via-cyan-900 to-blue-900',
    code: 'useState() => [state, setState]',
    type: 'Library'
  },
  { 
    name: 'MongoDB', 
    icon: SiMongodb, 
    color: '#47A248', 
    bgGrad: 'from-green-900 via-emerald-900 to-green-900',
    code: 'db.collection.find({})',
    type: 'Database'
  },
  { 
    name: 'Express', 
    icon: SiExpress, 
    color: '#FFFFFF', 
    bgGrad: 'from-gray-900 via-slate-800 to-gray-900',
    code: 'app.get("/", handler)',
    type: 'Backend'
  },
  { 
    name: 'Node.js', 
    icon: SiNodedotjs, 
    color: '#339933', 
    bgGrad: 'from-green-800 via-lime-900 to-green-800',
    code: 'require("module")',
    type: 'Runtime'
  },
  { 
    name: 'JavaScript', 
    icon: SiJavascript, 
    color: '#F7DF1E', 
    bgGrad: 'from-yellow-800 via-amber-900 to-yellow-800',
    code: '() => { return magic; }',
    type: 'Language'
  },
  { 
    name: 'Tailwind', 
    icon: SiTailwindcss, 
    color: '#06B6D4', 
    bgGrad: 'from-cyan-900 via-teal-900 to-cyan-900',
    code: 'className="flex-1 p-4"',
    type: 'CSS Framework'
  },
  { 
    name: 'Bootstrap', 
    icon: SiBootstrap, 
    color: '#7952B3', 
    bgGrad: 'from-purple-900 via-indigo-900 to-purple-900',
    code: '<div class="container">',
    type: 'UI Kit'
  },
];

const MatrixRain = () => {
  const [drops, setDrops] = useState([]);
  
  useEffect(() => {
    const chars = '01アイウエオカキクケコサシスセソタチツテト'.split('');
    const newDrops = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      char: chars[Math.floor(Math.random() * chars.length)],
      delay: Math.random() * 5,
    }));
    setDrops(newDrops);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
      {drops.map((drop) => (
        <div
          key={drop.id}
          className="absolute text-green-400 text-xs font-mono"
          style={{
            left: `${drop.x}%`,
            animation: `codeScroll ${3 + Math.random() * 4}s linear infinite`,
            animationDelay: `${drop.delay}s`,
          }}
        >
          {drop.char}
        </div>
      ))}
    </div>
  );
};

const Technologies = () => {
  const [hoveredTech, setHoveredTech] = useState(null);
  const [terminalText, setTerminalText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const text = 'Initializing tech stack...';
    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setTerminalText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => {
      clearInterval(timer);
      clearInterval(cursorTimer);
    };
  }, []);

  return (
    <div 
      className="relative overflow-hidden bg-black min-h-screen"
      style={{
        background: `
          linear-gradient(45deg, #000000 0%, #001100 25%, #000000 50%, #001100 75%, #000000 100%),
          radial-gradient(circle at 20% 50%, rgba(0, 255, 65, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 50%, rgba(0, 255, 65, 0.05) 0%, transparent 50%)
        `,
        perspective: '1000px',
      }}
    >
      <style>{floatingKeyframes}</style>
      <MatrixRain />
      
      {/* Terminal Header */}
      <div className="relative z-10 border-b border-green-400 bg-black/80 backdrop-blur-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 border border-red-300"></div>
              <div className="w-3 h-3 bg-yellow-500 border border-yellow-300"></div>
              <div className="w-3 h-3 bg-green-500 border border-green-300"></div>
            </div>
            <span className="text-green-400 font-mono text-sm">
              root@dev-machine:~/portfolio/technologies$
            </span>
          </div>
          <div className="text-green-400 font-mono text-xs">
            [{new Date().toLocaleTimeString()}]
          </div>
        </div>
        
        <div className="px-4 pb-4">
          <div className="text-green-400 font-mono text-sm">
            <span 
              className="inline-block border-r-2 border-green-400"
              style={{ animation: 'blink 1s infinite' }}
            >
              {terminalText}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {technologies.map((tech, index) => {
            const Icon = tech.icon;
            const isHovered = hoveredTech === index;
            
            return (
              <div
                key={tech.name}
                className={`
                  relative group cursor-pointer transform-gpu transition-all duration-500
                  bg-gradient-to-br ${tech.bgGrad}
                  border-2 border-green-400/30 hover:border-green-400
                  before:absolute before:inset-0 before:bg-gradient-to-br before:from-transparent before:to-black/50
                  ${isHovered ? 'scale-105 z-20' : ''}
                `}
                style={{
                  animation: `float3d ${3 + index * 0.5}s ease-in-out infinite`,
                  animationDelay: `${index * 0.2}s`,
                  transformStyle: 'preserve-3d',
                }}
                onMouseEnter={() => setHoveredTech(index)}
                onMouseLeave={() => setHoveredTech(null)}
              >
                {/* Background Grid Pattern */}
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(0,255,65,0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(0,255,65,0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '20px 20px',
                  }}
                />
                
                {/* Content Container */}
                <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                  {/* Type Label */}
                  <div className="text-green-400 font-mono text-xs mb-2">
                    // {tech.type}
                  </div>
                  
                  {/* Icon Section */}
                  <div 
                    className="flex-1 flex items-center justify-center mb-4"
                    style={{
                      animation: isHovered ? 'pulse3d 2s ease-in-out infinite' : 'none',
                    }}
                  >
                    <div className="relative">
                      <Icon 
                        size={64} 
                        color={tech.color}
                        className="drop-shadow-2xl"
                      />
                      {isHovered && (
                        <div 
                          className="absolute inset-0"
                          style={{
                            background: `radial-gradient(circle, ${tech.color}40 0%, transparent 70%)`,
                            filter: 'blur(10px)',
                          }}
                        />
                      )}
                    </div>
                  </div>
                  
                  {/* Code Sample */}
                  <div className="bg-black/60 border border-green-400/30 p-3 mb-3 font-mono text-xs">
                    <div className="text-gray-400 mb-1">{'>'} execute</div>
                    <div 
                      className="text-green-400 whitespace-nowrap overflow-hidden"
                      style={{
                        animation: isHovered ? `typewriter 2s steps(${tech.code.length}) infinite` : 'none',
                      }}
                    >
                      {tech.code}
                    </div>
                  </div>
                  
                  {/* Tech Name */}
                  <div className="text-center">
                    <div className="text-white font-mono">
                      <span className="text-purple-400">const</span>{' '}
                      <span 
                        className="text-yellow-400"
                        style={{
                          animation: isHovered ? 'glitch 0.3s ease-in-out infinite' : 'none',
                        }}
                      >
                        {tech.name.replace(/[.\s]/g, '_')}
                      </span>{' '}
                      <span className="text-green-400">=</span>{' '}
                      <span className="text-cyan-400">"loaded"</span>
                    </div>
                  </div>
                </div>
                
                {/* Hover Effect Overlay */}
                {isHovered && (
                  <div className="absolute inset-0 border-2 border-green-400 animate-pulse pointer-events-none" />
                )}
              </div>
            );
          })}
        </div>
        
        {/* Status Bar */}
        <div className="mt-8 bg-black/80 border border-green-400/30 p-4">
          <div className="flex justify-between items-center text-green-400 font-mono text-sm">
            <div>Status: All systems operational</div>
            <div className="flex space-x-4">
              <span>Technologies: {technologies.length}</span>
              <span>Memory: 2.1GB</span>
              <span>CPU: 45%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Technologies;