import React, { useState, useEffect, useContext } from 'react';
import { Award, Code, Database, Cloud, Shield, Cpu, Globe, Zap, CheckCircle, ArrowRight, Loader2, Search } from 'lucide-react';
import axios from 'axios';
import AuthContext from '../context/AuthContext.jsx';

const ModernCertifications = () => {
  const { BackendUrl } = useContext(AuthContext);
  const [isVisible, setIsVisible] = useState({
    header: false,
    stats: false,
    certifications: false,
    skills: false,
    timeline: false
  });
  
  const [activeCard, setActiveCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [certifications, setCertifications] = useState([]); // State for fetched certifications
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const timers = [
      setTimeout(() => setIsVisible(prev => ({ ...prev, header: true })), 100),
      setTimeout(() => setIsVisible(prev => ({ ...prev, stats: true })), 300),
      setTimeout(() => setIsVisible(prev => ({ ...prev, certifications: true })), 500),
      setTimeout(() => setIsVisible(prev => ({ ...prev, skills: true })), 700),
      setTimeout(() => setIsVisible(prev => ({ ...prev, timeline: true })), 900),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Fetch certifications from backend
  useEffect(() => {
    const fetchCertifications = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${BackendUrl}/api/certifications`);
        setCertifications(response.data.map(cert => ({
          id: cert._id,
          title: cert.name,
          issuer: cert.issuingOrganization,
          year: new Date(cert.issueDate).getFullYear().toString(),
          level: cert.category, // Using category as level for display
          icon: <Award className="w-8 h-8 text-green-400" />,
          description: `Issued by ${cert.issuingOrganization} in ${new Date(cert.issueDate).getFullYear()}. Category: ${cert.category || 'N/A'}.`,
          skills: [], // Assuming skills are not directly in backend model for frontend display
          credentialURL: cert.credentialURL
        })));
      } catch (err) {
        setError('Failed to load certifications. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchCertifications();
  }, [BackendUrl]);

  // Derive stats and timeline from fetched certifications
  const totalCertifications = certifications.length;
  const uniqueIssuers = new Set(certifications.map(cert => cert.issuer)).size;
  const validatedSkills = certifications.reduce((acc, cert) => acc + (cert.skills ? cert.skills.length : 0), 0);

  const stats = [
    { number: `${totalCertifications}+`, label: "Certifications", icon: <Award className="w-6 h-6" /> },
    { number: `${uniqueIssuers}+`, label: "Issuers", icon: <Cloud className="w-6 h-6" /> },
    { number: `${validatedSkills}+`, label: "Skills Validated", icon: <CheckCircle className="w-6 h-6" /> },
    { number: "100%", label: "Success Rate", icon: <Zap className="w-6 h-6" /> }
  ];

  const timeline = certifications.map(cert => ({
    year: cert.year,
    event: cert.title,
    status: "completed" // Assuming all fetched certs are completed
  }));

  return (
    <div className="min-h-screen mt-10 text-white overflow-hidden relative">
      {/* Animated Background Grid */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-blue-500/10"></div>
        <svg className="w-full h-full">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#10b981" strokeWidth="1" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Floating Cursor Effect */}
      <div 
        className="fixed w-4 h-4 bg-green-400 pointer-events-none z-50 mix-blend-difference transition-all duration-150 ease-out"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
        }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <Loader2 className="w-12 sm:w-16 h-12 sm:h-16 text-green-400 mx-auto animate-spin" />
              <p className="text-gray-400 mt-4 text-sm sm:text-base">
                LOADING CERTIFICATIONS... PLEASE WAIT
              </p>
              <p className="text-green-400/60 text-xs mt-2">
                frontend@certserver:~$ ./fetch-certs --status pending
              </p>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-12 sm:py-16">
            <Search className="w-12 sm:w-16 h-12 sm:h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg sm:text-xl font-bold text-gray-400 mb-2">Error Loading Certifications</h3>
            <p className="text-gray-500 text-sm sm:text-base">{error}</p>
          </div>
        ) : (
          <>
            {/* Header Section */}
            <div className={`text-center mb-20 transform transition-all duration-1000 ${
              isVisible.header ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}>
              <div className="text-green-400/60 text-sm tracking-[0.3em] mb-4 font-mono">
                // PROFESSIONAL_CREDENTIALS.INIT()
              </div>
              <h1 className="text-4xl md:text-8xl font-black text-white mb-8 tracking-tight">
                CERTIFICATIONS
              </h1>
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="h-px bg-gradient-to-r from-transparent via-green-400 to-transparent w-32"></div>
                <Code className="w-8 h-8 text-green-400" />
                <div className="h-px bg-gradient-to-r from-transparent via-green-400 to-transparent w-32"></div>
              </div>
              <p className="text-base md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                A comprehensive collection of industry-recognized certifications demonstrating expertise 
                across cloud computing, security, design, and development technologies.
              </p>
            </div>

            {/* Stats Section */}
            <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 transform transition-all duration-1000 delay-300 ${
              isVisible.stats ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}>
              {stats.map((stat, index) => (
                <div key={index} className="bg-gray-900/50 border border-green-400/20 p-6 backdrop-blur-sm group hover:border-green-400 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-green-400 group-hover:scale-110 transition-transform duration-300">
                      {stat.icon}
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-green-400 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                  <div className="text-lg  md:text-3xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-gray-400 text-xs md:text-lg uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Certifications Grid */}
            <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 transform transition-all duration-1000 delay-500 ${
              isVisible.certifications ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}>
              {certifications.map((cert, index) => (
                <div
                  key={cert.id}
                  className="bg-gray-900/80 border border-green-400/20 p-8 backdrop-blur-sm transform transition-all duration-500 hover:scale-105 hover:border-green-400 group cursor-pointer"
                  onMouseEnter={() => setActiveCard(cert.id)}
                  onMouseLeave={() => setActiveCard(null)}
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  {/* Certificate Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className={`p-3 bg-gradient-to-br from-blue-500 to-green-500 text-white group-hover:scale-110 transition-all duration-300`}>
                      {cert.icon}
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-green-400 font-mono">{cert.year}</div>
                      <div className="text-xs text-gray-400 uppercase tracking-wider">{cert.level}</div>
                    </div>
                  </div>

                  {/* Certificate Content */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors duration-300">
                    {cert.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">{cert.issuer}</p>
                  <p className="text-gray-300 text-sm mb-6 leading-relaxed">{cert.description}</p>

                  {/* Skills Tags (assuming empty for now as not in backend) */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {cert.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1 bg-green-400/10 text-green-400 text-xs font-mono border border-green-400/20 
                                 group-hover:bg-green-400/20 group-hover:border-green-400/40 transition-all duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Credential URL if available */}
                  {cert.credentialURL && (
                    <a
                      href={cert.credentialURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-400 text-sm hover:underline flex items-center gap-1 mb-4"
                    >
                      <ArrowRight className="w-4 h-4" /> View Credential
                    </a>
                  )}

                  {/* Status Indicator */}
                  <div className="flex items-center gap-2 pt-4 border-t border-gray-700/50">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-xs text-gray-400 font-mono">VERIFIED</span>
                    <div className="ml-auto w-2 h-2 bg-green-400 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* No Results */}
            {certifications.length === 0 && !isLoading && !error && (
              <div className="text-center py-12 sm:py-16">
                <Search className="w-12 sm:w-16 h-12 sm:h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg sm:text-xl font-bold text-gray-400 mb-2">No certifications found</h3>
                <p className="text-gray-500 text-sm sm:text-base">Check back soon for more!</p>
              </div>
            )}

            {/* Timeline Section */}
            <div className={`mb-20 transform transition-all duration-1000 delay-700 ${
              isVisible.timeline ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}>
              <div className="text-center mb-12">
                <div className="text-green-400/60 text-sm tracking-widest mb-2 font-mono">
                  // CERTIFICATION_TIMELINE.LOG
                </div>
                <h2 className="text-4xl font-bold text-white mb-4">Learning Journey</h2>
              </div>

              <div className="relative max-w-4xl mx-auto">
                <div className="absolute left-1/2 transform -translate-x-0.5 h-full w-px bg-gradient-to-b from-green-400 via-blue-400 to-purple-400"></div>
                
                {timeline.map((item, index) => (
                  <div key={index} className={`flex items-center mb-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className="w-1/2 pr-8 text-right">
                      <div className={`bg-gray-900/80 border border-green-400/20 p-4 backdrop-blur-sm ${
                        item.status === 'upcoming' ? 'border-yellow-400/20' : 'border-green-400/20'
                      }`}>
                        <div className="text-lg font-bold text-white mb-1">{item.event}</div>
                        <div className="text-sm text-gray-400">{item.year}</div>
                      </div>
                    </div>
                    
                    <div className="relative z-10">
                      <div className={`w-4 h-4 border-4 ${
                        item.status === 'upcoming' ? 'border-yellow-400 bg-yellow-400/20' : 'border-green-400 bg-green-400'
                      } transform rotate-45`}></div>
                    </div>
                    
                    <div className="w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <div className="bg-gradient-to-r from-green-400/10 to-blue-400/10 border border-green-400/20 p-8 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-white mb-4">Ready to Collaborate?</h3>
                <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                  These certifications represent my commitment to continuous learning and staying current 
                  with industry best practices. Let's build something amazing together.
                </p>
                <button className="bg-green-400 text-black px-8 py-3 font-bold uppercase tracking-wider 
                                 hover:bg-white transition-all duration-300 transform hover:scale-105 
                                 shadow-lg hover:shadow-green-400/25">
                  GET IN TOUCH
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Floating Elements */}
      <div className="fixed top-1/4 right-10 text-green-400/30 animate-pulse">
        <Code className="w-16 h-16" />
      </div>
      <div className="fixed bottom-1/4 left-10 text-blue-400/30 animate-bounce">
        <Database className="w-12 h-12" />
      </div>
      <div className="fixed top-1/2 right-1/4 text-purple-400/30 animate-spin" style={{animationDuration: '20s'}}>
        <Globe className="w-8 h-8" />
      </div>
    </div>
  );
};

export default ModernCertifications;