import React, { useState, useContext } from 'react';
import { Send, Terminal, Link } from 'lucide-react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const Contact = ({ isVisible, contactRef }) => {
  const { BackendUrl } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '', // Subject field is now part of the state
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState({ text: '', type: '' });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
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

  return (
    <section
      id="contact"
      ref={contactRef}
      className="min-h-screen relative z-10 flex items-center"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div
          className={`transform transition-all duration-1000 ${
            isVisible.contact ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="text-green-400/60 text-sm tracking-widest mb-2">
              // TERMINAL.EXEC
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              CONTACT_ME.CONNECT()
            </h2>
            <div className="w-24 h-1 bg-green-400 mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Contact Details in Code Block */}
            <div className="relative mt-12 lg:mt-0">
              <div className="bg-gray-900 border-2 border-green-400/20 p-6 sm:p-8 relative overflow-hidden">
                {/* Terminal-style header */}
                <div className="flex items-center space-x-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <span className="ml-4 text-green-400 text-sm hidden sm:inline">root@portfolio:~$</span>
                </div>

                {/* Code-like content for contact info */}
                <div className="space-y-3 font-mono text-sm sm:text-base">
                  <div className="text-green-400">
                    <span className="text-blue-400">const</span> contactDetails = {'{'}
                  </div>
                  <div className="pl-4 text-gray-300">
                    <span className="text-yellow-400">email</span>: "<span className="text-white">kimad1728@gmail.com</span>",
                  </div>
                  <div className="pl-4 text-gray-300">
                    <span className="text-yellow-400">phone</span>: "<span className="text-white">+966 57 367 2733</span>",
                  </div>
                  <div className="pl-4 text-gray-300">
                    <span className="text-yellow-400">location</span>: "<span className="text-white">Al Olaya, Riyadh, Saudi Arabia</span>",
                  </div>
                  <div className="pl-4 text-gray-300">
                    <span className="text-yellow-400">socials</span>: {'{'}
                  </div>
                  <div className="pl-8 text-gray-300">
                    <span className="text-yellow-400">linkedin</span>: <a
                      href="https://www.linkedin.com/in/imad-hussain-khan-76388b305"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-green-400 transition-colors duration-300"
                    >
                      "linkedin.com/in/imad-hussain-khan"
                    </a>,
                  </div>
                  <div className="pl-8 text-gray-300">
                    <span className="text-yellow-400">github</span>: <a
                      href="https://github.com/ImaadDev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-green-400 transition-colors duration-300"
                    >
                      "github.com/ImaadDev"
                    </a>,
                  </div>
                  <div className="pl-4 text-gray-300">{'}'},</div>
                  <div className="text-green-400">{'}'};</div>
                  <div className="mt-4 text-green-400">
                    <span className="text-blue-400">console</span>.log(<span className="text-green-400">contactDetails</span>);
                  </div>

                  {/* Additional message with animation */}
                  <div className="mt-4 text-gray-400 animate-pulse">
                    // Ready to connect!
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form as Terminal Input */}
            <div className="relative">
              <div className="bg-gray-900 border-2 border-green-400/20 p-8 relative overflow-hidden">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h4 className="text-green-400 font-mono mb-4 text-lg">
                    {'>'} <span className="text-white">send_message.exec()</span>
                  </h4>

                  {/* Response Message */}
                  {responseMessage.text && (
                    <div className={`p-3 rounded text-sm font-mono ${
                      responseMessage.type === 'success' ? 'bg-green-600/20 text-green-300 border border-green-400' : 'bg-red-600/20 text-red-300 border border-red-400'
                    }`}>
                      {responseMessage.text}
                    </div>
                  )}

                  {/* Name Input */}
                  <div className="flex items-center font-mono">
                    <span className="text-green-400 mr-2">name:</span>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-2 bg-transparent text-gray-300 border-b border-green-400/50 focus:border-green-400 focus:outline-none"
                      placeholder="Enter your name..."
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Email Input */}
                  <div className="flex items-center font-mono">
                    <span className="text-green-400 mr-2">email:</span>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-2 bg-transparent text-gray-300 border-b border-green-400/50 focus:border-green-400 focus:outline-none"
                      placeholder="Enter your email..."
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Subject Input */}
                  <div className="flex items-center font-mono">
                    <span className="text-green-400 mr-2">subject:</span>
                    <input
                      type="text"
                      id="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full p-2 bg-transparent text-gray-300 border-b border-green-400/50 focus:border-green-400 focus:outline-none"
                      placeholder="Enter the subject..."
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Message Input */}
                  <div className="font-mono">
                    <span className="block text-green-400 mb-2">message:</span>
                    <textarea
                      id="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full p-2 bg-gray-800 text-gray-300 border border-green-400/30 focus:border-green-400 focus:outline-none"
                      placeholder="Type your message here..."
                      required
                      disabled={isSubmitting}
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="group px-6 py-2 bg-green-400 text-black hover:bg-green-300 transition-all duration-300 transform hover:scale-105 tracking-wider font-semibold flex items-center justify-center text-sm"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'SENDING...' : 'SEND'} <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
