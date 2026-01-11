
import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, Environment, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { Planet } from './Planet';
import { Ring } from './Ring';

interface ExperienceProps {
  progress: number;
}

const SceneContent: React.FC<ExperienceProps> = ({ progress }) => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!cameraRef.current) return;

    // Camera dive effect based on progress
    // 0 -> start, 1 -> deep dive
    const zPos = 8 - progress * 10;
    const yPos = 0 - progress * 2;
    const fov = 45 + progress * 80;

    cameraRef.current.position.z = THREE.MathUtils.lerp(cameraRef.current.position.z, zPos, 0.1);
    cameraRef.current.position.y = THREE.MathUtils.lerp(cameraRef.current.position.y, yPos, 0.1);
    cameraRef.current.fov = THREE.MathUtils.lerp(cameraRef.current.fov, fov, 0.1);
    cameraRef.current.updateProjectionMatrix();

    // Subtle rotation of the whole world
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 8]} fov={45} />
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#00e5ff" />
      <pointLight position={[-10, -5, -10]} intensity={1} color="#001a1a" />
      <spotLight position={[0, 5, 0]} angle={0.3} penumbra={1} intensity={5} color="#00e5ff" />

      <group ref={groupRef}>
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
          <Planet progress={progress} />
          <Ring />
        </Float>
      </group>

      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Environment preset="night" />
    </>
  );
};

export const Experience: React.FC<ExperienceProps> = ({ progress }) => {
  return (
    <div className="w-full h-full">
      <Canvas dpr={[1, 2]} gl={{ antialias: true }}>
        <Suspense fallback={null}>
          <SceneContent progress={progress} />
        </Suspense>
      </Canvas>
    </div>
  );
};
