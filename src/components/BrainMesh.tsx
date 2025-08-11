import React, { useRef, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Brain = () => {
  const meshRef = useRef<THREE.Group>(null);
  
  // Create a brain-like geometry using multiple spheres
  const brainGeometry = useMemo(() => {
    const group = new THREE.Group();
    
    // Main brain shape
    const mainGeometry = new THREE.SphereGeometry(1, 16, 12);
    const mainMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x4f46e5, 
      transparent: true, 
      opacity: 0.1,
      wireframe: true 
    });
    const mainMesh = new THREE.Mesh(mainGeometry, mainMaterial);
    group.add(mainMesh);
    
    // Brain hemispheres
    const leftHemisphere = new THREE.SphereGeometry(0.6, 12, 8);
    const rightHemisphere = new THREE.SphereGeometry(0.6, 12, 8);
    
    const hemisphereMateria = new THREE.MeshPhongMaterial({ 
      color: 0x6366f1, 
      transparent: true, 
      opacity: 0.08,
      wireframe: true 
    });
    
    const leftMesh = new THREE.Mesh(leftHemisphere, hemisphereMateria);
    leftMesh.position.set(-0.4, 0.2, 0);
    group.add(leftMesh);
    
    const rightMesh = new THREE.Mesh(rightHemisphere, hemisphereMateria);
    rightMesh.position.set(0.4, 0.2, 0);
    group.add(rightMesh);
    
    return group;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
    }
  });

  return (
    <group ref={meshRef} position={[0, 0, 0]} scale={[2, 2, 2]}>
      <primitive object={brainGeometry} />
    </group>
  );
};

const BrainMesh = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <Brain />
      </Canvas>
    </div>
  );
};

export default BrainMesh;
