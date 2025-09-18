import React, { useState, useEffect } from 'react';
import { Code, Database, Server, Monitor, Globe, Layers, Terminal, Cpu, Zap, Box, ArrowRight, GitBranch, Activity } from 'lucide-react';

const ModernAboutPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSkill, setActiveSkill] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const skills = [
    { name: 'MongoDB', icon: Database, level: 95, color: 'from-green-400 to-emerald-500' },
    { name: 'Express.js', icon: Server, level: 92, color: 'from-blue-400 to-cyan-500' },
    { name: 'React.js', icon: Monitor, level: 98, color: 'from-purple-400 to-pink-500' },
    { name: 'Node.js', icon: Code, level: 90, color: 'from-yellow-400 to-orange-500' }
  ];

  const technologies = [
    'TypeScript', 'Next.js', 'GraphQL', 'Docker', 'AWS', 'Redux Toolkit', 
    'Tailwind CSS', 'Socket.io', 'JWT', 'REST APIs', 'Microservices', 'CI/CD'
  ];

  return (
    <div className="min-h-screen text-white overflow-hidden relative">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          animation: 'grid-move 20s linear infinite'
        }}></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-green-400"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + i * 8}%`,
              animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`
            }}
          />
        ))}
      </div>

      {/* Mouse Follower */}
      <div 
        className="fixed w-4 h-4 border border-green-400 pointer-events-none z-50 mix-blend-difference transition-transform duration-100"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
          transform: `scale(${mousePosition.x > 0 ? 1 : 0})`
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Header Section */}
        <div className={`transform transition-all duration-1000 delay-200 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}>
          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="text-green-400/60 text-xs tracking-[0.3em] mb-2 font-mono">
                // SYSTEM.INIT()
              </div>
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter">
                <span className="text-white">FULL</span>
                <span className="text-green-400">STACK</span>
              </h1>
              <div className="text-xl md:text-4xl font-light text-gray-400 tracking-wide">
                ENGINEER.EXE
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-green-400 animate-pulse" />
                <span className="text-green-400 text-sm font-mono">ONLINE</span>
              </div>
              <div className="w-px h-8 bg-green-400/30"></div>
              <div className="text-right">
                <div className="text-green-400 text-2xl font-mono">4+</div>
                <div className="text-gray-400 text-xs uppercase tracking-wider">Years</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-7 space-y-8">
            {/* Introduction */}
            <div className={`transform transition-all duration-1000 delay-400 ${
              isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
            }`}>
              <div className="border-l-4 border-green-400 pl-6 mb-8">
                <h2 className="text-3xl font-bold mb-4">
                  <span className="text-green-400">&gt;</span> SYSTEM.PROFILE
                </h2>
                <p className="text-base md:text-xl text-gray-300 leading-relaxed mb-4">
                  Architecting scalable digital ecosystems from database to deployment. 
                  I specialize in crafting high-performance web applications that push 
                  the boundaries of modern development.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  My expertise lies in the complete MERN stack ecosystem, building 
                  enterprise-grade solutions that deliver exceptional user experiences 
                  and drive measurable business results.
                </p>
              </div>
            </div>

            {/* MERN Stack Visualization */}
            <div className={`transform transition-all duration-1000 delay-600 ${
              isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
            }`}>
              <h3 className="text-2xl font-bold mb-6 text-green-400">
                MERN_STACK.CORE [ ]
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skills.map((skill, index) => {
                  const Icon = skill.icon;
                  return (
                    <div
                      key={skill.name}
                      className="bg-gray-900 border-2 border-gray-800 p-6 cursor-pointer transition-all duration-300 hover:border-green-400/50 hover:bg-gray-800/50 group"
                      onMouseEnter={() => setActiveSkill(index)}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <Icon className="w-6 h-6 text-green-400 group-hover:scale-110 transition-transform" />
                          <span className="font-bold text-white">{skill.name}</span>
                        </div>
                        <span className="text-green-400 font-mono text-sm">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-700 h-2">
                        <div
                          className={`h-full bg-gradient-to-r ${skill.color} transition-all duration-1000`}
                          style={{ width: isLoaded ? `${skill.level}%` : '0%' }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Technologies Grid */}
            <div className={`transform transition-all duration-1000 delay-800 ${
              isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
            }`}>
              <h3 className="text-2xl font-bold mb-6 text-white">
                TECH_ARSENAL.EXPANDED [ ]
              </h3>
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {technologies.map((tech, index) => (
                  <div
                    key={tech}
                    className="bg-gray-900 border border-gray-700 p-3 text-center group cursor-pointer transition-all duration-300 hover:border-green-400 hover:bg-green-400/10"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <span className="text-sm font-mono text-gray-300 group-hover:text-green-400 transition-colors">
                      {tech}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Terminal & Stats */}
          <div className="lg:col-span-5 space-y-6">
            {/* Terminal Window */}
            <div className={`transform transition-all duration-1000 delay-1000 ${
              isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'
            }`}>
              <div className="bg-gray-900 border-2 border-green-400/30 overflow-hidden">
                {/* Terminal Header */}
                <div className="bg-gray-800 px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500"></div>
                    <div className="w-3 h-3 bg-yellow-500"></div>
                    <div className="w-3 h-3 bg-green-500"></div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Terminal className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 text-sm font-mono">zsh</span>
                  </div>
                </div>

                {/* Terminal Content */}
                <div className="p-6 font-mono text-sm space-y-2">
                  <div className="text-green-400">root@dev-machine:~$ whoami</div>
                  <div className="text-white">Full Stack Engineer</div>
                  
                  <div className="text-green-400 mt-4">root@dev-machine:~$ cat profile.json</div>
                  <div className="text-blue-400 ml-2">{`{`}</div>
                  <div className="text-gray-300 ml-4">
                    "name": <span className="text-yellow-400">"Full Stack Developer"</span>,
                  </div>
                  <div className="text-gray-300 ml-4">
                    "experience": <span className="text-yellow-400">"4+ years"</span>,
                  </div>
                  <div className="text-gray-300 ml-4">
                    "stack": <span className="text-yellow-400">["M", "E", "R", "N"]</span>,
                  </div>
                  <div className="text-gray-300 ml-4">
                    "specialty": <span className="text-yellow-400">"Scalable Architecture"</span>,
                  </div>
                  <div className="text-gray-300 ml-4">
                    "passion": <span className="text-yellow-400">"Problem Solving"</span>,
                  </div>
                  <div className="text-gray-300 ml-4">
                    "status": <span className="text-green-400 animate-pulse">"Available"</span>
                  </div>
                  <div className="text-blue-400 ml-2">{`}`}</div>
                  
                  <div className="text-green-400 mt-4">root@dev-machine:~$ </div>
                  <div className="text-green-400 animate-pulse">|</div>
                </div>
              </div>
            </div>

            {/* Stats Dashboard */}
            <div className={`transform transition-all duration-1000 delay-1200 ${
              isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'
            }`}>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-900 border-2 border-gray-700 p-6 text-center group hover:border-green-400/50 transition-colors">
                  <div className="text-3xl font-bold text-green-400 mb-2">50+</div>
                  <div className="text-gray-400 text-sm uppercase tracking-wider">Projects</div>
                  <div className="mt-2">
                    <GitBranch className="w-5 h-5 text-green-400/50 mx-auto" />
                  </div>
                </div>
                <div className="bg-gray-900 border-2 border-gray-700 p-6 text-center group hover:border-green-400/50 transition-colors">
                  <div className="text-3xl font-bold text-green-400 mb-2">4+</div>
                  <div className="text-gray-400 text-sm uppercase tracking-wider">Years</div>
                  <div className="mt-2">
                    <Zap className="w-5 h-5 text-green-400/50 mx-auto" />
                  </div>
                </div>
              </div>
            </div>

            {/* Architecture Flow */}
            <div className={`transform transition-all duration-1000 delay-1400 ${
              isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'
            }`}>
              <div className="bg-gray-900 border-2 border-gray-700 p-6">
                <h4 className="text-green-400 font-bold mb-6 uppercase tracking-wider flex items-center">
                  <Cpu className="w-5 h-5 mr-2" />
                  System Architecture
                </h4>
                
                <div className="space-y-4">
                  {[
                    { layer: 'CLIENT', tech: 'React.js / Next.js', icon: Monitor },
                    { layer: 'SERVER', tech: 'Node.js / Express.js', icon: Server },
                    { layer: 'DATABASE', tech: 'MongoDB / PostgreSQL', icon: Database },
                    { layer: 'DEPLOY', tech: 'AWS / Vercel / Docker', icon: Globe }
                  ].map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.layer} className="flex items-center justify-between group">
                        <div className="flex items-center space-x-3">
                          <Icon className="w-4 h-4 text-green-400" />
                          <span className="text-gray-400 text-sm font-mono">{item.layer}</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-green-400/30 group-hover:text-green-400 transition-colors" />
                        <span className="text-green-400 text-sm font-mono">{item.tech}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-700">
                  <div className="flex items-center justify-center space-x-2">
                    <Box className="w-4 h-4 text-green-400 animate-spin" />
                    <span className="text-green-400 text-sm font-mono">BUILDING THE FUTURE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default ModernAboutPage;