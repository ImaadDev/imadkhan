import React, { useContext, useEffect, useState } from 'react';
import { FolderGit2, ArrowUpRight, Github, ExternalLink, Code, Layers } from 'lucide-react';
import AuthContext from '../context/AuthContext';

const Projects = ({ isVisible, projectsRef }) => {
  const { BackendUrl } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);

  // Fetch projects from the backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${BackendUrl}/api/projects`);
        const data = await response.json();
        setProjects(data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, [BackendUrl]);

  return (
    <section
      id="projects"
      ref={projectsRef}
      className="min-h-screen relative z-10 bg-black"
    >
      <div className="max-w-7xl mx-auto px-6 py-20 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 0, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 0, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px'
          }} />
        </div>

        <div
          className={`transform transition-all duration-1000 ${
            isVisible.projects ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}
        >
          {/* Modern Header */}
          <div className="mb-20">
            {/* Status Bar */}
            <div className="flex justify-center mb-8">
              <div className="bg-gray-900 border-2 border-green-400 px-8 py-4 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400"></div>
                  <span className="text-green-400 font-mono text-sm uppercase tracking-widest">
                    Portfolio.Projects
                  </span>
                </div>
                <div className="w-px h-6 bg-green-400/30"></div>
                <div className="text-green-400 font-mono text-sm">
                  Status: <span className="text-white">Active</span>
                </div>
              </div>
            </div>

            {/* Main Title */}
            <div className="text-center">
              <h2 className="text-6xl md:text-8xl font-black text-white font-mono mb-6 tracking-wider">
                PROJECTS
              </h2>
              <div className="flex justify-center items-center gap-6">
                <div className="h-1 bg-green-400 w-20"></div>
                <Code className="w-8 h-8 text-green-400" />
                <div className="h-1 bg-green-400 w-20"></div>
              </div>
              <p className="text-gray-400 font-mono text-lg mt-6 max-w-2xl mx-auto">
                &gt; Showcasing innovative solutions and technical expertise
              </p>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {projects.length > 0 ? (
              projects.map((project, index) => (
                <div
                  key={project._id}
                  className="group relative bg-gray-900 border-2 border-green-400/30 
                           hover:border-green-400 transition-all duration-500 overflow-hidden
                           hover:shadow-[0_0_30px_rgba(0,255,0,0.2)] hover:bg-gray-800"
                  style={{
                    transitionDelay: `${index * 150}ms`
                  }}
                >
                  {/* Top Status Bar */}
                  <div className="bg-gray-800 border-b-2 border-green-400/20 px-6 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FolderGit2 className="w-5 h-5 text-green-400" />
                      <span className="text-green-400 font-mono text-sm">
                        project_{index + 1}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 animate-pulse"></div>
                      <span className="text-green-400 font-mono text-xs">LIVE</span>
                    </div>
                  </div>

                  {/* Project Image/Icon */}
                  <div className="relative overflow-hidden">
                    {project.imageUrl ? (
                      <div className="relative">
                        <img
                          src={project.imageUrl}
                          alt={project.name}
                          className="w-full h-48 object-cover transition-transform duration-700 
                                   group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-green-400/0 group-hover:bg-green-400/10 
                                      transition-colors duration-500"></div>
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 
                                      transition-opacity duration-300">
                          <div className="bg-black/80 border border-green-400 p-2">
                            <Layers className="w-5 h-5 text-green-400" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="h-48 bg-gray-800 flex items-center justify-center border-b-2 border-green-400/20">
                        <FolderGit2 className="w-16 h-16 text-green-400/50 group-hover:text-green-400 
                                             group-hover:scale-110 transition-all duration-300" />
                      </div>
                    )}
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white font-mono mb-3 leading-tight 
                                 group-hover:text-green-50 transition-colors duration-300">
                      {project.name}
                    </h3>

                    

                    {/* Description */}
                    <p className="text-gray-300 text-sm leading-relaxed mb-6 font-mono">
                      {project.description}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/btn flex items-center gap-2 bg-gray-800 border border-green-400/30 
                                   hover:border-green-400 hover:bg-green-400/10 text-green-400 
                                   px-4 py-2 font-mono text-sm transition-all duration-300 flex-1 justify-center"
                        >
                          <Github className="w-4 h-4" />
                          <span>Code</span>
                          <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 
                                                 transition-transform duration-300" />
                        </a>
                      )}
                      {project.projectUrl && (
                        <a
                          href={project.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/btn flex items-center gap-2 bg-green-400/10 border border-green-400 
                                   hover:bg-green-400 hover:text-black text-green-400 
                                   px-4 py-2 font-mono text-sm transition-all duration-300 flex-1 justify-center"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Demo</span>
                          <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 
                                                 transition-transform duration-300" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Bottom Accent */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent 
                                 via-green-400 to-transparent opacity-0 group-hover:opacity-100 
                                 transition-opacity duration-500"></div>

                  {/* Corner Decorations */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-green-400/30 
                                 group-hover:border-green-400 transition-colors duration-300"></div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-green-400/30 
                                 group-hover:border-green-400 transition-colors duration-300"></div>
                </div>
              ))
            ) : (
              <div className="col-span-full bg-gray-900 border-2 border-green-400/30 p-12 text-center">
                <div className="w-20 h-20 border-2 border-green-400/30 mx-auto mb-6 flex items-center justify-center">
                  <FolderGit2 className="w-10 h-10 text-green-400/50" />
                </div>
                <p className="text-gray-400 font-mono text-lg mb-2">// No projects loaded</p>
                <p className="text-gray-500 font-mono text-sm">Fetching from repository...</p>
              </div>
            )}
          </div>

          {/* View All Button */}
          <div className="text-center">
            <div className="inline-block relative">
              <a
                href="/projects"
                className="group bg-gray-900 border-2 border-green-400 hover:bg-green-400 
                         hover:text-black px-12 py-4 font-mono font-bold text-lg text-green-400
                         transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,255,0,0.3)]
                         inline-flex items-center gap-4"
              >
                <Code className="w-6 h-6" />
                <span>VIEW ALL PROJECTS</span>
                <ArrowUpRight className="w-6 h-6 group-hover:translate-x-2 group-hover:-translate-y-2 
                                       transition-transform duration-300" />
              </a>

              {/* Button Decorations */}
              <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-green-400"></div>
              <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-green-400"></div>
            </div>

         
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;