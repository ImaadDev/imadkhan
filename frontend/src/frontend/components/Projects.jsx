import React from 'react';
import { FolderGit2, ArrowUpRight } from 'lucide-react';

const Projects = ({ isVisible, projectsRef }) => {
  return (
    <section 
      id="projects" 
      ref={projectsRef}
      className="min-h-screen relative z-10"
    >
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className={`transform transition-all duration-1000 ${
          isVisible.projects ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="text-green-400/60 text-sm tracking-widest mb-2">
              // MY_WORK.SHOWCASE
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              PROJECTS
            </h2>
            <div className="w-24 h-1 bg-green-400 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project Card 1 */}
            <div className="bg-gray-900 border-2 border-green-400/20 p-8 transform transition-all duration-300 hover:scale-105 hover:border-green-400 group">
              <FolderGit2 className="w-10 h-10 text-green-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">3D Portfolio Website</h3>
              <p className="text-gray-400 text-sm">React, Three.js, Tailwind CSS</p>
              <p className="text-gray-300 mt-4">An interactive 3D portfolio showcasing my skills in web development and 3D design.</p>
              <a href="#" className="text-green-400 flex items-center mt-4 group-hover:underline">
                View Project <ArrowUpRight className="w-4 h-4 ml-2" />
              </a>
            </div>

            {/* Project Card 2 */}
            <div className="bg-gray-900 border-2 border-green-400/20 p-8 transform transition-all duration-300 hover:scale-105 hover:border-green-400 group">
              <FolderGit2 className="w-10 h-10 text-green-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">E-commerce Platform</h3>
              <p className="text-gray-400 text-sm">MERN Stack, Stripe API</p>
              <p className="text-gray-300 mt-4">A full-stack e-commerce application with secure payment processing and admin dashboard.</p>
              <a href="#" className="text-green-400 flex items-center mt-4 group-hover:underline">
                View Project <ArrowUpRight className="w-4 h-4 ml-2" />
              </a>
            </div>

            {/* Project Card 3 */}
            <div className="bg-gray-900 border-2 border-green-400/20 p-8 transform transition-all duration-300 hover:scale-105 hover:border-green-400 group">
              <FolderGit2 className="w-10 h-10 text-green-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Mobile Game Development</h3>
              <p className="text-gray-400 text-sm">Unity 3D, C#</p>
              <p className="text-gray-300 mt-4">Developed a casual mobile game with intuitive controls and engaging gameplay mechanics.</p>
              <a href="#" className="text-green-400 flex items-center mt-4 group-hover:underline">
                View Project <ArrowUpRight className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
