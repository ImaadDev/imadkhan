import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

const ThreeDLayout = ({ children }) => {
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
    <div className="relative w-full h-full min-h-screen bg-black overflow-hidden">
      {/* 3D Canvas Background */}
      <div
        ref={mountRef}
        className="absolute inset-0 z-0"
        style={{ background: 'linear-gradient(135deg, #000000 0%, #111111 100%)' }}
      />
      
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
      
      {/* Main Content will be rendered here */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default ThreeDLayout;