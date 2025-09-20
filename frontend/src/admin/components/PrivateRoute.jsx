import React, { useContext, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import AdminAuthContext from '../context/AdminAuthContext';

const PrivateRoute = () => {
  const { isLoggedIn, isLoading } = useContext(AdminAuthContext);

  // Matrix rain effect with mobile optimization
  useEffect(() => {
    const isMobile = window.innerWidth < 640;
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; opacity: 0.03;';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()'.split('');
    const fontSize = isMobile ? 10 : 12;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function draw() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#00ff99';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    }

    const interval = setInterval(draw, 33);
    return () => {
      clearInterval(interval);
      document.body.removeChild(canvas);
    };
  }, []);

  // Floating elements effect with mobile optimization
  useEffect(() => {
    const isMobile = window.innerWidth < 640;
    const particleCount = isMobile ? 6 : 12;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * (isMobile ? 8 : 10) + 5;
      particle.className = 'float-particle';
      particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation-duration: ${Math.random() * 10 + 5}s;
        animation-delay: ${Math.random() * 5}s;
        transform: rotate(${Math.random() * 360}deg);
      `;
      document.body.appendChild(particle);
      particles.push(particle);
    }

    return () => particles.forEach(particle => document.body.contains(particle) && document.body.removeChild(particle));
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen text-white bg-black overflow-hidden relative font-mono">
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
            99% { transform: translateY(-4px) rotate(240deg); }
          }
          .float-particle {
            position: fixed;
            border: 2px solid rgba(34, 197, 94, 0.3);
            z-index: -1;
            animation: float-shape linear infinite;
          }
          @media (max-width: 640px) {
            .container {
              padding-left: 1rem;
              padding-right: 1rem;
            }
            .loading-text {
              font-size: 0.875rem; /* text-sm */
            }
            .spinner {
              width: 3rem; /* w-12 */
              height: 3rem; /* h-12 */
            }
          }
        `}</style>

        {/* Animated Background Grid */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-black" style={{
            backgroundImage: `linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
            animation: 'grid-move 25s linear infinite'
          }}></div>
        </div>

        {/* Floating Code Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(window.innerWidth < 640 ? 6 : 12)].map((_, i) => (
            <div
              key={`code-${i}`}
              className="absolute text-green-400/20 font-mono text-xs sm:text-sm select-none"
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
          {[...Array(window.innerWidth < 640 ? 4 : 8)].map((_, i) => (
            <div
              key={`shape-${i}`}
              className="float-particle"
              style={{
                width: `${window.innerWidth < 640 ? 15 + i * 3 : 20 + i * 5}px`,
                height: `${window.innerWidth < 640 ? 15 + i * 3 : 20 + i * 5}px`,
                left: `${15 + i * 10}%`,
                top: `${15 + i * 9}%`,
                animationDuration: `${5 + i * 0.2}s`,
                animationDelay: `${i * 0.3}s`
              }}
            />
          ))}
        </div>

        {/* Loading State */}
        <div className="relative z-10 max-w-full sm:max-w-screen-md md:max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 container flex items-center justify-center min-h-screen bg-black">
          <div className="text-center">
            <Loader2 className="w-12 sm:w-16 h-12 sm:h-16 text-green-400 mx-auto animate-spin spinner" />
            <p className="text-gray-400 mt-4 text-sm sm:text-base loading-text">
              AUTHENTICATING... PLEASE WAIT
            </p>
            <p className="text-green-400/60 text-xs mt-2 font-mono">
              admin@authserver:~$ ./verify-session --status pending
            </p>
          </div>
        </div>
      </div>
    );
  }

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
