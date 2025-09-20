import React, { useContext } from 'react';
import { Code, Database, Server, Monitor, Globe, Layers } from 'lucide-react';


const About = ({ isVisible, aboutRef }) => {
  


  return (
    <section
      id="about"
      ref={aboutRef}
      className="min-h-screen relative z-10 flex items-center"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className={`transform transition-all duration-1000 ${
          isVisible.about ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="text-green-400/60 text-sm tracking-widest mb-2">
              // DEVELOPER_PROFILE.JSON
            </div>
            <h2 className="text-3xl md:text-6xl font-bold text-white mb-6">
              FULLSTACK_ENGINEER
            </h2>
            <div className="w-24 h-1 bg-green-400 mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-xl md:text-2xl font-bold text-green-400 tracking-wide">
                  {'>'} MERN_STACK_DEVELOPER.INIT()
                </h3>
                <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                  I architect scalable web applications from database to user interface. 
                  Specialized in the MERN stack ecosystem, I build robust full-stack solutions 
                  that deliver exceptional performance and user experiences.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  My expertise spans modern JavaScript frameworks, server-side development, 
                  database optimization, and creating responsive interfaces that drive 
                  business growth and user engagement.
                </p>
              </div>

              {/* Skills */}
              <div className="space-y-6">
                <h4 className="text-xl font-bold text-green-400">
                  TECH_STACK [ MERN ]
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Database className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">MongoDB</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Server className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">Express.js</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Monitor className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">React.js</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Code className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">Node.js</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Globe className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">Next.js</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Layers className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">TypeScript</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Technologies */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-white">
                  ADDITIONAL_TECH [ ]
                </h4>
                <div className="flex flex-wrap gap-3">
                  {['Docker', 'AWS', 'GraphQL', 'Redux', 'Tailwind CSS', 'Socket.io', 'JWT', 'REST APIs'].map((tech, index) => (
                    <span 
                      key={tech}
                      className="px-3 py-1 bg-gray-800 border border-green-400/20 text-green-400 text-sm font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Visual Element */}
            <div className="relative mt-12 lg:mt-0">
              <div className="relative">
                {/* Main Container */}
                <div className="bg-gray-900 border-2 border-green-400/20 p-6 sm:p-8 relative overflow-hidden">
                  {/* Terminal-style header */}
                  <div className="flex items-center space-x-2 mb-6">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    <span className="ml-4 text-green-400 text-sm hidden sm:inline">root@portfolio:~$</span>
                  </div>

                  {/* Code-like content */}
                  <div className="space-y-3 text-sm font-mono">
                    <div className="text-green-400">
                      <span className="text-blue-400">const</span> fullStackDev = {'{'}
                    </div>
                    <div className="pl-4 text-gray-300">
                      role: <span className="text-yellow-400">"Full Stack Developer"</span>,
                    </div>
                    <div className="pl-4 text-gray-300">
                      experience: <span className="text-yellow-400">"4+ years"</span>,
                    </div>
                    <div className="pl-4 text-gray-300">
                      stack: <span className="text-yellow-400">["MongoDB", "Express", "React", "Node"]</span>,
                    </div>
                    <div className="pl-4 text-gray-300">
                      frameworks: <span className="text-yellow-400">["Next.js", "React.js"]</span>,
                    </div>
                    <div className="pl-4 text-gray-300">
                      passion: <span className="text-yellow-400">"Building Scalable Solutions"</span>,
                    </div>
                    <div className="pl-4 text-gray-300">
                      currentFocus: <span className="text-yellow-400">"Modern Web Architecture"</span>
                    </div>
                    <div className="text-green-400">{'}'}</div>
                    <div className="mt-4 text-green-400">
                      <span className="text-blue-400">module.exports</span> = fullStackDev;
                    </div>
                  </div>

                  {/* Animated cursor */}
                  <div className="mt-4">
                    <span className="text-green-400 animate-pulse">|</span>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-400 opacity-20 hidden sm:block"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 border-2 border-green-400 opacity-30 hidden sm:block"></div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="text-center p-4 border border-green-400/20 bg-gray-900/50">
                  <div className="text-2xl font-bold text-green-400">30+</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">Projects</div>
                </div>
                <div className="text-center p-4 border border-green-400/20 bg-gray-900/50">
                  <div className="text-2xl font-bold text-green-400">4+</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">Years</div>
                </div>
                <div className="text-center p-4 border border-green-400/20 bg-gray-900/50">
                  <div className="text-2xl font-bold text-green-400">100%</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">Dedication</div>
                </div>
              </div>

              {/* Architecture Visualization */}
              <div className="mt-8 p-6 bg-gray-900/50 border border-green-400/20">
                <h5 className="text-green-400 font-bold mb-4 text-sm uppercase tracking-wider">
                  Full Stack Architecture
                </h5>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Frontend</span>
                    <span className="text-green-400 text-sm font-mono">React.js / Next.js</span>
                  </div>
                  <div className="w-full h-px bg-green-400/20"></div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Backend</span>
                    <span className="text-green-400 text-sm font-mono">Node.js / Express.js</span>
                  </div>
                  <div className="w-full h-px bg-green-400/20"></div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Database</span>
                    <span className="text-green-400 text-sm font-mono">MongoDB</span>
                  </div>
                  <div className="w-full h-px bg-green-400/20"></div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Deployment</span>
                    <span className="text-green-400 text-sm font-mono">AWS / Vercel</span>
                  </div>
                </div>
              </div>
            </div>

          
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
