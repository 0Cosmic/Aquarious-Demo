
import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export const Ring: React.FC = () => {
  const count = 5000;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { mouse, viewport } = useThree();
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 3 + Math.random() * 1.5;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = (Math.random() - 0.5) * 0.1;
      const speed = 0.5 + Math.random() * 0.5;
      temp.push({ x, y, z, angle, radius, speed });
    }
    return temp;
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();
    const mouseX = (mouse.x * viewport.width) / 2;
    const mouseY = (mouse.y * viewport.height) / 2;

    particles.forEach((p, i) => {
      // Orbit motion
      p.angle += 0.002 * p.speed;
      let targetX = Math.cos(p.angle) * p.radius;
      let targetZ = Math.sin(p.angle) * p.radius;
      let targetY = p.y;

      // Mouse repulsion logic
      const dist = Math.sqrt(Math.pow(p.x - mouseX, 2) + Math.pow(p.y - mouseY, 2));
      if (dist < 2) {
        const factor = (2 - dist) / 2;
        targetX += (p.x - mouseX) * factor * 0.5;
        targetY += (p.y - mouseY) * factor * 0.5;
      }

      p.x = THREE.MathUtils.lerp(p.x, targetX, 0.1);
      p.z = THREE.MathUtils.lerp(p.z, targetZ, 0.1);
      p.y = THREE.MathUtils.lerp(p.y, targetY, 0.1);

      dummy.position.set(p.x, p.y, p.z);
      const scale = 0.01 + Math.sin(time * p.speed + i) * 0.005;
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={5} transparent opacity={0.6} />
    </instancedMesh>
  );
};
