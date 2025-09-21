import React, { useContext, useEffect, useState } from 'react';
import { Award, ExternalLink, Terminal, Code, ChevronRight, FileText } from 'lucide-react';
import AuthContext from '../context/AuthContext';

const Certifications = ({ isVisible, certificationsRef }) => {
  const { BackendUrl } = useContext(AuthContext);
  const [certifications, setCertifications] = useState([]);

  // Fetch certifications from the backend
  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const response = await fetch(`${BackendUrl}/api/certifications`);
        const data = await response.json();
        setCertifications(data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching certifications:', error);
      }
    };

    fetchCertifications();
  }, [BackendUrl]);

  return (
    <section
      id="certifications"
      ref={certificationsRef}
      className="py-20 relative z-10"
    >
      <div className="max-w-4xl mx-auto px-6">
        {/* Subtle Grid Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 0, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 0, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }} />
        </div>

        <div
          className={`transform transition-all duration-1000 ${
            isVisible.certifications 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-10 opacity-0'
          }`}
        >
          {/* Compact Terminal Header */}
          <div className="mb-12">
            <div className="bg-gray-900 border border-green-400/40 max-w-2xl mx-auto">
              <div className="bg-gray-800 border-b border-green-400/30 px-4 py-2 flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 bg-red-500"></div>
                  <div className="w-2.5 h-2.5 bg-yellow-500"></div>
                  <div className="w-2.5 h-2.5 bg-green-500"></div>
                </div>
                <span className="text-green-400 font-mono text-xs">certifications.json</span>
              </div>

              <div className="p-4 font-mono text-green-400 text-sm">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-white">$</span>
                  <span>cat credentials.json</span>
                </div>
                <div className="text-xs space-y-1 text-gray-300 ml-4">
                  <div>{"{"} <span className="text-yellow-400">"verified"</span>: <span className="text-cyan-400">true</span>, <span className="text-yellow-400">"count"</span>: <span className="text-cyan-400">{certifications.length}</span> {"}"}</div>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <div className="inline-flex items-center gap-2 bg-green-400/10 border border-green-400/30 px-3 py-1 mb-4">
                <Terminal className="w-3 h-3 text-green-400" />
                <span className="text-green-400 font-mono text-xs">CREDENTIALS</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-green-400 font-mono mb-2">
                CERTIFICATIONS
              </h2>
              <div className="w-16 h-0.5 bg-green-400 mx-auto"></div>
            </div>
          </div>

          {/* Compact Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {certifications.length > 0 ? (
              certifications.map((cert, index) => (
                <div
                  key={cert._id}
                  className="group bg-gray-900/90 border border-green-400/30 hover:border-green-400 
                           transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,0,0.2)]
                           hover:bg-gray-800/90"
                  style={{
                    transitionDelay: `${index * 100}ms`
                  }}
                >
                  {/* Mini Header */}
                  <div className="bg-gray-800 border-b border-green-400/20 px-3 py-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="w-3 h-3 text-green-400/70" />
                      <span className="text-green-400 font-mono text-xs">cert_{index + 1}.js</span>
                    </div>
                    <div className="w-2 h-2 bg-green-400 animate-pulse"></div>
                  </div>

                  {/* Compact Content */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <Award className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                      <div className="text-right">
                        <div className="text-xs text-green-400 font-mono">VERIFIED</div>
                      </div>
                    </div>

                    <h3 className="text-white font-mono text-sm font-bold mb-2 leading-tight group-hover:text-green-50">
                      {cert.name}
                    </h3>

                    <div className="space-y-2 mb-4">
                      <div className="font-mono text-xs">
                        <span className="text-gray-500">issuer:</span>{" "}
                        <span className="text-gray-300">"{cert.issuingOrganization}"</span>
                      </div>
                      <div className="font-mono text-xs">
                        <span className="text-gray-500">type:</span>{" "}
                        <span className="text-gray-300">"{cert.category || 'Professional'}"</span>
                      </div>
                    </div>

                    {cert.credentialURL && (
                      <a
                        href={cert.credentialURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 
                                 font-mono text-xs transition-all duration-300 group/link
                                 border border-green-400/20 hover:border-green-400/60 
                                 px-2 py-1 hover:bg-green-500/5"
                      >
                        <span>view()</span>
                        <ExternalLink className="w-3 h-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 
                                               transition-transform duration-300" />
                      </a>
                    )}
                  </div>

                  {/* Bottom accent */}
                  <div className="h-0.5 bg-gradient-to-r from-transparent via-green-400/30 to-transparent 
                                 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))
            ) : (
              <div className="col-span-full bg-gray-900/60 border border-green-400/20 p-6 text-center">
                <Award className="w-8 h-8 text-green-400/50 mx-auto mb-3" />
                <div className="font-mono text-sm text-red-400 mb-1">// No data found</div>
                <div className="font-mono text-xs text-gray-400">Loading credentials...</div>
              </div>
            )}
          </div>

          {/* Compact View All Section */}
          <div className="text-center">
            <button className="group bg-gray-900 border border-green-400/50 hover:border-green-400 
                             hover:bg-green-400/5 transition-all duration-300 px-6 py-3 
                             hover:shadow-[0_0_15px_rgba(0,255,0,0.3)] font-mono">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-green-400" />
                <span className="text-green-400 text-sm">./show --all</span>
                <ChevronRight className="w-4 h-4 text-green-400 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </button>

            <div className="mt-4 font-mono text-green-400/60 text-xs">
              {certifications.length} credentials loaded • all verified
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;