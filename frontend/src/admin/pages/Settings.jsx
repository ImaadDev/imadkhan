import React, { useState, useEffect, useContext } from 'react';
import { 
  Lock, 
  User, 
  Image as ImageIcon, 
  ArrowRight, 
  Loader2, 
  X, 
  Settings 
} from 'lucide-react';
import AuthContext from '../context/AdminAuthContext';
import axios from 'axios';

const SettingsPage = () => {
  const { BackendUrl, user } = useContext(AuthContext);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(null); // 'password', 'profile', 'homepage', or null
  const [selectedFile, setSelectedFile] = useState(null); // New state for selected file
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    username: user?.username || '',
    email: user?.email || '',
    bio: user?.bio || '',
    aboutImageUrl: user?.imageUrl || '',
    featured: false, // Adding a default for featured, though it might not be used here directly
  });

  // Page load and mouse follower
  useEffect(() => {
    setIsLoaded(true);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Matrix rain effect
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

  // Show alert function
  const showAlert = (title, text, icon = 'success') => {
    const alertDiv = document.createElement('div');
    alertDiv.className = `fixed top-4 right-2 sm:right-4 p-3 sm:p-4 bg-gray-950/90 text-green-400 border-2 ${icon === 'success' ? 'border-green-400' : 'border-red-400'} z-50 font-mono animate-slide-in alert`;
    alertDiv.setAttribute('aria-live', 'assertive');
    alertDiv.innerHTML = `
      <div class="flex items-center gap-2">
        <span class="text-green-400">></span>
        <div class="font-bold">${title}</div>
      </div>
      <div class="text-xs sm:text-sm pl-4">${text}</div>
      <div class="mt-2 text-xs opacity-60">Press any key to continue...</div>
    `;
    document.body.appendChild(alertDiv);
    setTimeout(() => document.body.contains(alertDiv) && document.body.removeChild(alertDiv), 4000);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Handle password change
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      showAlert('[ERROR]', 'New password and confirmation do not match.', 'error');
      return;
    }
    if (formData.newPassword.length < 8) {
      showAlert('[ERROR]', 'New password must be at least 8 characters.', 'error');
      return;
    }
    setIsLoading(true);
    try {
      await axios.post(`${BackendUrl}/api/user/password`, {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      }, { withCredentials: true });
      showAlert('[SUCCESS]', 'Password updated successfully.');
      setModal(null);
      setFormData({ ...formData, currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      showAlert('[ERROR]', err.response?.data?.message || 'Failed to update password.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle profile update
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    if (!formData.username.trim()) {
      showAlert('[ERROR]', 'Username cannot be empty.', 'error');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      showAlert('[ERROR]', 'Invalid email format.', 'error');
      return;
    }
    setIsLoading(true);
    try {
      await axios.put(`${BackendUrl}/api/user/profile`, {
        username: formData.username,
        email: formData.email,
        bio: formData.bio
      }, { withCredentials: true });
      showAlert('[SUCCESS]', 'Profile updated successfully.');
      setModal(null);
    } catch (err) {
      showAlert('[ERROR]', err.response?.data?.message || 'Failed to update profile.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle homepage customization
  const handleHomepageUpdate = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    if (selectedFile) {
      formDataToSend.append('imageUrl', selectedFile);
    } else if (formData.aboutImageUrl === '') {
        // If existing image is explicitly cleared
        formDataToSend.append('imageUrl', '');
    } else {
      // If no new file, and not explicitly cleared, send existing URL (might be empty)
      formDataToSend.append('imageUrl', formData.aboutImageUrl);
    }
    
    setIsLoading(true);
    try {
      await axios.put(`${BackendUrl}/api/users/profileimage`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true
      });
      showAlert('[SUCCESS]', 'Homepage image updated successfully.');
      setModal(null);
      setSelectedFile(null); // Clear selected file after successful upload
    } catch (err) {
      showAlert('[ERROR]', err.response?.data?.message || 'Failed to update homepage image.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Modal content
  const renderModal = () => {
    if (!modal) return null;
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
        <div className="bg-gray-950/90 border-2 border-gray-800 w-[90vw] sm:w-[600px] p-4 sm:p-6">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-green-400">
              {modal === 'password' ? '// CHANGE_PASSWORD' : 
               modal === 'profile' ? '// UPDATE_PROFILE' : 
               '// CUSTOMIZE_HOMEPAGE'}
            </h3>
            <button onClick={() => setModal(null)} className="text-gray-400 hover:text-green-400">
              <X className="w-5 sm:w-6 h-5 sm:h-6 icon" />
            </button>
          </div>

          {modal === 'password' && (
            <form onSubmit={handlePasswordChange}>
              <div className="mb-4">
                <label className="text-xs sm:text-sm meta-text text-gray-400 mb-1 block">
                  Current Password
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  className="w-full bg-gray-900 border-2 border-gray-700 px-3 sm:px-4 py-1 sm:py-2 text-white text-xs sm:text-sm input"
                  aria-label="Current password"
                />
              </div>
              <div className="mb-4">
                <label className="text-xs sm:text-sm meta-text text-gray-400 mb-1 block">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className="w-full bg-gray-900 border-2 border-gray-700 px-3 sm:px-4 py-1 sm:py-2 text-white text-xs sm:text-sm input"
                  aria-label="New password"
                />
              </div>
              <div className="mb-4">
                <label className="text-xs sm:text-sm meta-text text-gray-400 mb-1 block">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full bg-gray-900 border-2 border-gray-700 px-3 sm:px-4 py-1 sm:py-2 text-white text-xs sm:text-sm input"
                  aria-label="Confirm new password"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-green-400 text-black px-6 sm:px-8 py-1 sm:py-2 font-bold hover:bg-green-300 transition-colors duration-300 flex items-center space-x-2 mx-auto button text-xs sm:text-sm"
              >
                {isLoading ? (
                  <Loader2 className="w-4 sm:w-5 h-4 sm:h-5 animate-spin icon" />
                ) : (
                  <>
                    <span>SUBMIT</span>
                    <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 icon" />
                  </>
                )}
              </button>
            </form>
          )}

          {modal === 'profile' && (
            <form onSubmit={handleProfileUpdate}>
              <div className="mb-4">
                <label className="text-xs sm:text-sm meta-text text-gray-400 mb-1 block">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full bg-gray-900 border-2 border-gray-700 px-3 sm:px-4 py-1 sm:py-2 text-white text-xs sm:text-sm input"
                  aria-label="Username"
                />
              </div>
              <div className="mb-4">
                <label className="text-xs sm:text-sm meta-text text-gray-400 mb-1 block">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-gray-900 border-2 border-gray-700 px-3 sm:px-4 py-1 sm:py-2 text-white text-xs sm:text-sm input"
                  aria-label="Email"
                />
              </div>
              <div className="mb-4">
                <label className="text-xs sm:text-sm meta-text text-gray-400 mb-1 block">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="w-full bg-gray-900 border-2 border-gray-700 px-3 sm:px-4 py-1 sm:py-2 text-white text-xs sm:text-sm input resize-none"
                  rows="4"
                  aria-label="Bio"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-green-400 text-black px-6 sm:px-8 py-1 sm:py-2 font-bold hover:bg-green-300 transition-colors duration-300 flex items-center space-x-2 mx-auto button text-xs sm:text-sm"
              >
                {isLoading ? (
                  <Loader2 className="w-4 sm:w-5 h-4 sm:h-5 animate-spin icon" />
                ) : (
                  <>
                    <span>SUBMIT</span>
                    <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 icon" />
                  </>
                )}
              </button>
            </form>
          )}

          {modal === 'homepage' && (
            <form onSubmit={handleHomepageUpdate}>
              <div className="mb-4">
                <label className="text-xs sm:text-sm meta-text text-gray-400 mb-1 block">
                  About Image Upload
                </label>
                <input
                  type="file"
                  name="imageUrl"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full bg-gray-900 border-2 border-gray-700 px-3 sm:px-4 py-1 sm:py-2 text-white text-xs sm:text-sm input file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                  aria-label="About image upload"
                />
                {formData.aboutImageUrl && !selectedFile && (
                  <p className="text-gray-500 text-xs mt-2">Current image: <a href={formData.aboutImageUrl} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">View Image</a></p>
                )}
              </div>
              <div className="mb-4">
                <label className="flex items-center gap-2 text-green-400 text-xs sm:text-sm font-bold mb-2">
                  Featured Review (if applicable)
                </label>
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-green-400 focus:ring-green-400 border-gray-700 rounded"
                  disabled={isLoading}
                />
                <span className="text-gray-400 text-xs ml-2">Show a featured review on the homepage.</span>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-green-400 text-black px-6 sm:px-8 py-1 sm:py-2 font-bold hover:bg-green-300 transition-colors duration-300 flex items-center space-x-2 mx-auto button text-xs sm:text-sm"
              >
                {isLoading ? (
                  <Loader2 className="w-4 sm:w-5 h-4 sm:h-5 animate-spin icon" />
                ) : (
                  <>
                    <span>SUBMIT</span>
                    <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 icon" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    );
  };

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
        }
        @keyframes slide-in {
          0% { transform: translateX(100%); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        .float-particle {
          position: fixed;
          border: 2px solid rgba(34, 197, 94, 0.3);
          z-index: -1;
          animation: float-shape linear infinite;
        }
        @media (max-width: 640px) {
          .container {
            padding-left: 0.5rem;
            padding-right: 0.5rem;
          }
          .header-text {
            font-size: 2.25rem; /* text-4xl */
          }
          .subheader-text {
            font-size: 1rem; /* text-base */
          }
          .card-title {
            font-size: 1.125rem; /* text-lg */
          }
          .meta-text {
            font-size: 0.75rem; /* text-xs */
          }
          .input, .button {
            padding: 0.25rem 0.5rem;
            font-size: 0.75rem; /* text-xs */
          }
          .icon {
            width: 0.875rem; /* w-3.5 */
            height: 0.875rem; /* h-3.5 */
          }
          .alert {
            padding: 0.5rem;
            font-size: 0.75rem;
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

      {/* Mouse Follower (hidden on mobile) */}
      <div 
        className="hidden sm:block fixed w-6 h-6 border-2 border-green-400/50 pointer-events-none z-50 mix-blend-difference transition-all duration-150"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: `scale(${mousePosition.x > 0 ? 1 : 0})`
        }}
      />

      <div className="relative z-10 max-w-[95vw] sm:max-w-7xl mx-auto px-2 sm:px-6 py-6 sm:py-8 container">
        {/* Header Section */}
        <div className={`transform transition-all duration-1000 delay-200 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-8 sm:mb-12">
            <div>
              <div className="text-green-400/60 text-xs sm:text-sm tracking-[0.3em] mb-2 font-mono">
                // SETTINGS.CONFIGURE()
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-8xl header-text font-black tracking-tighter">
                <span className="text-white">USER</span>
                <span className="text-green-400">SETTINGS</span>
              </h1>
              <div className="text-base sm:text-xl md:text-3xl subheader-text font-light text-gray-400 tracking-wide">
                CONFIGURE_YOUR_PROFILE.JS
              </div>
            </div>
          </div>
        </div>

        {/* Settings Options */}
        <div className={`transform transition-all duration-1000 delay-400 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Change Password Card */}
            <div
              className="bg-gray-950/90 border-2 border-gray-800 p-4 sm:p-6 cursor-pointer transition-all duration-300 hover:border-green-400/50 hover:bg-gray-900/50"
              onClick={() => setModal('password')}
            >
              <Lock className="w-8 sm:w-10 h-8 sm:h-10 text-green-400 mb-3 sm:mb-4 icon" />
              <h3 className="text-lg sm:text-xl card-title font-bold text-white mb-2">Change Password</h3>
              <p className="text-gray-400 text-xs sm:text-sm meta-text">Update your account password securely.</p>
            </div>

            {/* Update Profile Card */}
            <div
              className="bg-gray-950/90 border-2 border-gray-800 p-4 sm:p-6 cursor-pointer transition-all duration-300 hover:border-green-400/50 hover:bg-gray-900/50"
              onClick={() => setModal('profile')}
            >
              <User className="w-8 sm:w-10 h-8 sm:h-10 text-green-400 mb-3 sm:mb-4 icon" />
              <h3 className="text-lg sm:text-xl card-title font-bold text-white mb-2">Update Profile</h3>
              <p className="text-gray-400 text-xs sm:text-sm meta-text">Edit your username, email, and bio.</p>
            </div>

            {/* Customize Homepage Card */}
            <div
              className="bg-gray-950/90 border-2 border-gray-800 p-4 sm:p-6 cursor-pointer transition-all duration-300 hover:border-green-400/50 hover:bg-gray-900/50"
              onClick={() => setModal('homepage')}
            >
              <ImageIcon className="w-8 sm:w-10 h-8 sm:h-10 text-green-400 mb-3 sm:mb-4 icon" />
              <h3 className="text-lg sm:text-xl card-title font-bold text-white mb-2">Customize Homepage</h3>
              <p className="text-gray-400 text-xs sm:text-sm meta-text">Change your homepage about image.</p>
            </div>
          </div>
        </div>

        

        {/* Modal */}
        {renderModal()}
      </div>
    </div>
  );
};

export default SettingsPage;