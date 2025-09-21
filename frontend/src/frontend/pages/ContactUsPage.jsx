import React, { useState, useEffect, useContext } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Mail, 
  MessageSquare, 
  User, 
  Send, 
  Phone, 
  MapPin,
  Github,
  Award
} from 'lucide-react';
import axios from 'axios'; // Import axios
import AuthContext from '../context/AuthContext'; // Import AuthContext

const ContactUsPage = () => {
  const { BackendUrl } = useContext(AuthContext);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredElement, setHoveredElement] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResponseMessage({ text: '', type: '' });

    try {
      const response = await axios.post(`${BackendUrl}/api/contact/send-email`, formData);
      setResponseMessage({ text: response.data.message, type: 'success' });
      setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
    } catch (error) {
      setResponseMessage({ text: error.response?.data?.message || 'Failed to send message.', type: 'error' });
      console.error('Error sending message:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'kimad1728@gmail.com' },
    { icon: Phone, label: 'Phone', value: '+966573672733' },
    { icon: MapPin, label: 'Location', value: 'Al Olaya, Riyadh, Saudi Arabia' },
  ];

  return (
    <div className="min-h-screen text-white overflow-hidden relative font-inter">
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

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className={`transform transition-all duration-1000 delay-200 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12">
            <div>
              <div className="text-green-400/60 text-xs tracking-[0.3em] mb-2 font-mono">
                // CONTACT.REACH_OUT()
              </div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter">
                <span className="text-white">GET IN</span>
                <span className="text-green-400">TOUCH</span>
              </h1>
              <div className="text-xl md:text-3xl font-light text-gray-400 tracking-wide">
                LET'S_COLLABORATE.JS
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 transform transition-all duration-1000 delay-400 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}>
          {/* Contact Details */}
          <div className="bg-gray-900/50 border-2 border-gray-700 p-8 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-6 text-green-400">CONTACT_DETAILS</h2>
              <div className="space-y-6">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div 
                      key={index} 
                      className="flex items-center space-x-4 group"
                      onMouseEnter={() => setHoveredElement(`info-${index}`)}
                      onMouseLeave={() => setHoveredElement(null)}
                    >
                      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-green-400/10 text-green-400 border border-green-400/50">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-sm font-light text-gray-400">{item.label}</div>
                        <div className="text-lg font-bold text-white group-hover:text-green-400 transition-colors">
                          {item.value}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-8 flex space-x-4">
                <a href="https://github.com/ImaadDev" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition-colors">
                  <Github className="w-8 h-8" />
                </a>
                <a href="https://www.linkedin.com/in/imad-hussain-khan-76388b305" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-700 text-sm text-gray-500">
              <p>I’m always open to new projects and exciting opportunities. Let's connect!</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-900/50 border-2 border-gray-700 p-8">
            <h2 className="text-2xl font-bold mb-6 text-white">SEND_A_MESSAGE</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {responseMessage.text && (
                <div className={`p-3 rounded text-sm font-mono ${
                  responseMessage.type === 'success' ? 'bg-green-600/20 text-green-300 border border-green-400' : 'bg-red-600/20 text-red-300 border border-red-400'
                }`}>
                  {responseMessage.text}
                </div>
              )}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">FULL NAME</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                  className="w-full px-4 py-2 bg-gray-800 border-2 border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-green-400"
                  disabled={isSubmitting}
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">EMAIL ADDRESS</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                  className="w-full px-4 py-2 bg-gray-800 border-2 border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-green-400"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-2">SUBJECT</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  value={formData.subject} 
                  onChange={handleChange} 
                  required 
                  className="w-full px-4 py-2 bg-gray-800 border-2 border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-green-400"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">MESSAGE</label>
                <textarea 
                  id="message" 
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  rows="5"
                  required 
                  className="w-full px-4 py-2 bg-gray-800 border-2 border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-green-400"
                  disabled={isSubmitting}
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full bg-green-400 text-black px-8 py-3 font-bold hover:bg-green-300 transition-colors duration-300 flex items-center justify-center space-x-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'} <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
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

export default ContactUsPage;
