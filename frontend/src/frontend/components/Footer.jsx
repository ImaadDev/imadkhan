import React from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Twitter, 
  Terminal, 
  Code, 
  ArrowUp,
  ExternalLink,
  Heart,
  Coffee,
  Instagram
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "https://github.com/ImaadDev", label: "GitHub", username: "@ImaadDev" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/imad-hussain-khan-76388b305", label: "LinkedIn", username: "ImadHussainKhan" },
    { icon: Instagram, href: "https://www.instagram.com/imaddeveloper?igsh=bXJ4MXB4bmo2djAy", label: "Instagramm", username: "@imadhussainkhan" },
    { icon: Mail, href: "mailto:kimad1728@gmail.com", label: "Email", username: "kimad1728@gmail.com" }
  ];

  const quickLinks = [
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Certifications", href: "/certifications" },
    { name: "Contact", href: "/contact" },
    { name: "Blogs", href: "/blogs" }

  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black border-t-2 border-green-400 relative">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 0, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 0, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '25px 25px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        {/* Terminal Header */}
        <div className="mb-12">
          <div className="bg-gray-900 border-2 border-green-400 max-w-4xl mx-auto">
            {/* Terminal Top Bar */}
            <div className="bg-gray-800 border-b border-green-400 px-4 py-2 flex items-center gap-3">
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 bg-red-500"></div>
                <div className="w-2.5 h-2.5 bg-yellow-500"></div>
                <div className="w-2.5 h-2.5 bg-green-500"></div>
              </div>
              <span className="text-green-400 font-mono text-sm">~/imad/footer.js</span>
            </div>

            {/* Terminal Content */}
            <div className="p-6 font-mono text-green-400">
              <div className="flex items-center gap-2 mb-3">
                <Terminal className="w-4 h-4" />
                <span className="text-white">user@imad:~$</span>
                <span className="text-green-400">cat contact.json</span>
                <span className="animate-pulse">|</span>
              </div>
              
              <div className="space-y-1 text-sm">
                <div className="text-gray-300">{`{`}</div>
                <div className="ml-4 text-blue-400">"status": "available_for_hire",</div>
                <div className="ml-4 text-yellow-400">"location": "global",</div>
                <div className="ml-4 text-purple-400">"response_time": " 24h",</div>
                <div className="ml-4 text-green-400">"collaboration": true</div>
                <div className="text-gray-300">{`}`}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-400 p-2">
                  <Code className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-2xl font-black text-white font-mono">
                  IMAD.PORTFOLIO
                </h3>
              </div>
              <p className="text-gray-400 font-mono text-sm leading-relaxed max-w-md">
                &gt; Full-stack developer crafting innovative digital solutions. 
                Passionate about clean code, modern technologies, and user experience.
              </p>
            </div>

            {/* Code Stats */}
            <div className="bg-gray-900 border border-green-400/30 p-4">
              <div className="text-green-400 font-mono text-sm mb-3">// Current Stats</div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-mono font-bold text-green-400">30+</div>
                  <div className="text-xs text-gray-400 font-mono">Projects</div>
                </div>
                <div>
                  <div className="text-lg font-mono font-bold text-green-400">5+</div>
                  <div className="text-xs text-gray-400 font-mono">Years</div>
                </div>
                <div>
                  <div className="text-lg font-mono font-bold text-green-400">∞</div>
                  <div className="text-xs text-gray-400 font-mono">Learning</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-green-400 font-mono font-bold mb-6 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 animate-pulse"></div>
              NAVIGATION
            </h4>
            <div className="space-y-3">
              {quickLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="group flex items-center gap-2 text-gray-400 hover:text-green-400 
                           font-mono text-sm transition-colors duration-300"
                >
                  <span className="text-green-400/50 group-hover:text-green-400">{'>'}</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    {link.name}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-green-400 font-mono font-bold mb-6 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 animate-pulse"></div>
              CONNECT
            </h4>
            <div className="space-y-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-gray-400 hover:text-green-400 
                           transition-all duration-300 hover:bg-green-400/5 p-2 border border-transparent 
                           hover:border-green-400/30"
                >
                  <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  <div className="font-mono text-sm">
                    <div className="font-bold">{social.label}</div>
                    <div className="text-xs text-gray-500">{social.username}</div>
                  </div>
                  <ExternalLink className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 
                                         group-hover:translate-x-1 group-hover:-translate-y-1 
                                         transition-all duration-300" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-green-400/30 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="flex items-center gap-2 text-gray-400 font-mono text-sm">
              <span>&copy; {currentYear} Portfolio.</span>
              <span className="text-green-400">All rights reserved.</span>
            </div>

            {/* Made with love */}
            <div className="flex items-center gap-2 text-gray-400 font-mono text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-400 animate-pulse" />
              <span>and</span>
              <Coffee className="w-4 h-4 text-yellow-600" />
              <span className="text-green-400">by Imad Hussain Khan</span>
            </div>

            {/* Scroll to top */}
            <button
              onClick={scrollToTop}
              className="group bg-gray-900 border border-green-400/30 hover:border-green-400 
                       hover:bg-green-400/10 p-3 transition-all duration-300 
                       hover:shadow-[0_0_15px_rgba(0,255,0,0.3)]"
            >
              <ArrowUp className="w-5 h-5 text-green-400 group-hover:scale-110 
                               group-hover:-translate-y-1 transition-all duration-300" />
            </button>
          </div>
        </div>

        {/* Command Line */}
        <div className="mt-8 pt-6 border-t border-green-400/20">
          <div className="font-mono text-green-400/70 text-xs text-center">
            <span className="text-white"></span> Thanks for visiting • portfolio v2.0.1 • 
            <span className="text-green-400"> status: online</span> • 
            last updated: {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Corner Decorations */}
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-green-400/50"></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-green-400/50"></div>
    </footer>
  );
};

export default Footer;