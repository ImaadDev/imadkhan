import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

const Hero3D = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    mountRef.current.appendChild(renderer.domElement);
    sceneRef.current = { scene, camera, renderer };

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x00ff41, 1);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x00ff41, 0.8, 100);
    pointLight.position.set(-10, 10, 10);
    scene.add(pointLight);

    // Create geometric shapes
    const shapes = [];

    // Floating cubes
    for (let i = 0; i < 15; i++) {
      const geometry = new THREE.BoxGeometry(
        Math.random() * 2 + 0.5,
        Math.random() * 2 + 0.5,
        Math.random() * 2 + 0.5
      );
      const material = new THREE.MeshLambertMaterial({
        color: Math.random() > 0.5 ? 0x00ff41 : 0x333333,
        transparent: true,
        opacity: Math.random() * 0.8 + 0.2
      });
      const cube = new THREE.Mesh(geometry, material);
      
      cube.position.x = (Math.random() - 0.5) * 40;
      cube.position.y = (Math.random() - 0.5) * 20;
      cube.position.z = (Math.random() - 0.5) * 30;
      
      cube.rotation.x = Math.random() * Math.PI;
      cube.rotation.y = Math.random() * Math.PI;
      
      scene.add(cube);
      shapes.push({ mesh: cube, speed: Math.random() * 0.02 + 0.005 });
    }

    // Create wireframe spheres
    for (let i = 0; i < 8; i++) {
      const geometry = new THREE.SphereGeometry(Math.random() * 3 + 1, 16, 16);
      const material = new THREE.MeshBasicMaterial({
        color: 0x00ff41,
        wireframe: true,
        transparent: true,
        opacity: 0.3
      });
      const sphere = new THREE.Mesh(geometry, material);
      
      sphere.position.x = (Math.random() - 0.5) * 50;
      sphere.position.y = (Math.random() - 0.5) * 25;
      sphere.position.z = (Math.random() - 0.5) * 35;
      
      scene.add(sphere);
      shapes.push({ mesh: sphere, speed: Math.random() * 0.01 + 0.002 });
    }

    // Create tetrahedrons
    for (let i = 0; i < 10; i++) {
      const geometry = new THREE.TetrahedronGeometry(Math.random() * 2 + 0.8);
      const material = new THREE.MeshLambertMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: Math.random() * 0.6 + 0.2
      });
      const tetra = new THREE.Mesh(geometry, material);
      
      tetra.position.x = (Math.random() - 0.5) * 45;
      tetra.position.y = (Math.random() - 0.5) * 20;
      tetra.position.z = (Math.random() - 0.5) * 32;
      
      scene.add(tetra);
      shapes.push({ mesh: tetra, speed: Math.random() * 0.015 + 0.003 });
    }

    // Position camera
    camera.position.z = 20;
    camera.position.y = 2;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      shapes.forEach(shape => {
        shape.mesh.rotation.x += shape.speed;
        shape.mesh.rotation.y += shape.speed * 0.7;
        shape.mesh.rotation.z += shape.speed * 0.5;
      });

      renderer.render(scene, camera);
    };

    animate();
    setIsLoaded(true);

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* 3D Canvas Background */}
      <div
        ref={mountRef}
        className="absolute inset-0 z-0"
        style={{ background: 'linear-gradient(135deg, #000000 0%, #111111 100%)' }}
      />
      
      {/* Content Overlay */}
      <div className="relative z-10 flex items-center justify-between min-h-screen px-8 lg:px-16">
        {/* Left Content */}
        <div className="flex-1 max-w-3xl">
          <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-5xl lg:text-7xl font-black mb-6 leading-none">
              <span className="block bg-gradient-to-r from-green-400 to-white bg-clip-text text-transparent uppercase tracking-wider">
                FULL STACK
              </span>
              <span className="block text-white uppercase tracking-wider">
                DEVELOPER
              </span>
            </h1>
            
            <h2 className="text-xl lg:text-2xl text-green-400 mb-8 font-light tracking-wide">
              MERN Stack • React.js • Next.js
            </h2>
            
            <p className="text-gray-300 text-lg lg:text-xl leading-relaxed mb-10 max-w-2xl">
              Crafting innovative web applications with cutting-edge technologies. 
              Specializing in scalable solutions that drive business growth and 
              deliver exceptional user experiences.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-green-400 text-black px-8 py-4 font-bold text-lg uppercase tracking-wider hover:bg-green-300 transition-all duration-300 transform hover:scale-105">
                View Projects
              </button>
              <button className="border-2 border-green-400 text-green-400 px-8 py-4 font-bold text-lg uppercase tracking-wider hover:bg-green-400 hover:text-black transition-all duration-300">
                Contact Me
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Profile Image */}
        <div className="hidden lg:block flex-1 max-w-md">
          <div className={`transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            {/* Main Image Container */}
            <div className="relative">
              <div className="bg-gray-900 bg-opacity-50 border-2 border-green-400 p-6 relative overflow-hidden">
                {/* Image Placeholder */}
                <div className="aspect-square bg-gray-800 border border-green-400/30 relative overflow-hidden">
                  <img 
                    src="/api/placeholder/400/400" 
                    alt="Full Stack Developer Profile"
                    className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
                  />
                  {/* Overlay Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-transparent opacity-60"></div>
                  {/* Corner Decorations */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-green-400"></div>
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-green-400"></div>
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-green-400"></div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-green-400"></div>
                </div>
                
                {/* Image Caption */}
                <div className="mt-4 text-center">
                  <div className="text-green-400 text-sm font-mono uppercase tracking-wider">
                    developer.profile
                  </div>
                  <div className="text-white text-xs mt-1 opacity-60">
                    Full Stack Engineer
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-400 opacity-20"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 border-2 border-green-400 opacity-30"></div>
              
              {/* Side Decorative Lines */}
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-8">
                <div className="flex flex-col space-y-2">
                  <div className="w-4 h-px bg-green-400 opacity-40"></div>
                  <div className="w-6 h-px bg-green-400 opacity-60"></div>
                  <div className="w-4 h-px bg-green-400 opacity-40"></div>
                </div>
              </div>
            </div>

          
          </div>
        </div>
      </div>

      {/* Floating Code Elements */}
      <div className="absolute inset-0 pointer-events-none z-5">
        <div className="absolute top-1/4 left-10 text-green-400 opacity-30 font-mono text-sm">
          {'{ React.js }'}
        </div>
        <div className="absolute top-1/3 right-20 text-white opacity-20 font-mono text-xs">
          &lt;/NextJS&gt;
        </div>
        <div className="absolute bottom-1/4 left-1/4 text-green-400 opacity-25 font-mono text-sm">
          MongoDB()
        </div>
        <div className="absolute bottom-1/3 right-1/3 text-white opacity-20 font-mono text-xs">
          Node.js
        </div>
      </div>
    </div>
  );
};

export default Hero3D;