import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Trail, Stars } from '@react-three/drei';
import * as THREE from 'three';

const Nucleus = ({ protons, neutrons }: { protons: number, neutrons: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  const particles = useMemo(() => {
    const temp = [];
    
    // Calculate display ratio properly, cap at 60 total particles for performance
    const totalActual = protons + neutrons;
    const maxParticles = 60;
    
    let pCount, nCount;
    
    if (totalActual === 0) {
      pCount = 0; nCount = 0;
    } else if (totalActual <= maxParticles) {
      pCount = protons;
      nCount = neutrons;
    } else {
      const ratio = maxParticles / totalActual;
      // Ensure at least 1 proton if protons > 0
      pCount = Math.max(1, Math.round(protons * ratio));
      // Add the rest as neutrons
      nCount = maxParticles - pCount;
    }
    
    // Generate particle positions
    for (let i = 0; i < pCount; i++) {
        temp.push({ 
           id: `p-${i}`, 
           isProton: true 
        });
    }
    for (let i = 0; i < nCount; i++) {
        temp.push({ 
           id: `n-${i}`, 
           isProton: false 
        });
    }
    
    // Assign 3D positions with random spread
    // For Hydrogen (1 proton, 0 neutrons), just place it at center
    if (temp.length === 1) {
        temp[0].x = 0;
        temp[0].y = 0;
        temp[0].z = 0;
    } else {
        temp.sort(() => Math.random() - 0.5); // shuffle randomly
        temp.forEach((particle) => {
          // calculate radius based on total particle count to maintain density
          const volume = temp.length * 0.05;
          const outerRadius = Math.pow(volume * 3 / (4 * Math.PI), 1/3) * 2;
          
          const r = Math.random() * outerRadius;
          const theta = Math.random() * 2 * Math.PI;
          const phi = Math.acos(2 * Math.random() - 1);
          
          particle.x = r * Math.sin(phi) * Math.cos(theta);
          particle.y = r * Math.sin(phi) * Math.sin(theta);
          particle.z = r * Math.cos(phi);
        });
    }
    return temp;
  }, [protons, neutrons]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {particles.map((pos, i) => (
        <Sphere key={i} args={[0.2, 16, 16]} position={[pos.x, pos.y, pos.z]}>
          <meshStandardMaterial 
            color={pos.isProton ? "#ef4444" : "#3b82f6"} 
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>
      ))}
      <pointLight color="#a855f7" intensity={2} distance={10} />
    </group>
  );
};

const ElectronRing = ({ radius, count, speed, tiltX, tiltY }: { radius: number, count: number, speed: number, tiltX: number, tiltY: number }) => {
  const ringRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * speed;
    }
  });

  const electrons = Array.from({ length: count }).map((_, i) => {
    const angle = (i / count) * Math.PI * 2;
    return (
      <group key={i} position={[Math.cos(angle) * radius, Math.sin(angle) * radius, 0]}>
        <Sphere args={[0.15, 16, 16]}>
          <meshBasicMaterial color="#10b981" />
        </Sphere>
        <pointLight color="#10b981" intensity={0.5} distance={2} />
      </group>
    );
  });

  return (
    <group rotation={[tiltX, tiltY, 0]}>
      {/* Orbit path */}
      <mesh>
        <torusGeometry args={[radius, 0.02, 16, 100]} />
        <meshBasicMaterial color="#cbd5e1" transparent opacity={0.2} />
      </mesh>
      {/* Electrons */}
      <group ref={ringRef}>
        {electrons}
      </group>
    </group>
  );
};

function getElectronShells(atomicNumber: number): number[] {
  const shells = [];
  let electrons = atomicNumber;
  const maxShells = [2, 8, 18, 32, 32, 18, 8];
  
  // For visual appeal on high atomic numbers, we cap it so it doesn't get completely chaotic
  const visualMax = Math.min(atomicNumber, 118);
  let e = visualMax;
  
  for (let i = 0; i < maxShells.length; i++) {
    if (e <= 0) break;
    // For simple orbital visualization we don't need exact quantum mechanics
    const inThisShell = Math.min(e, maxShells[i]);
    shells.push(inThisShell);
    e -= inThisShell;
  }
  return shells;
}

export function Atom3D({ atomicNumber, neutrons }: { atomicNumber: number, neutrons: number }) {
  const shells = useMemo(() => getElectronShells(atomicNumber), [atomicNumber]);

  return (
    <Canvas camera={{ position: [0, 0, Math.max(8, shells.length * 2.5)], fov: 45 }}>
      <color attach="background" args={['#0f172a']} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      
      <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
      
      <Nucleus protons={atomicNumber} neutrons={neutrons} />
      
      {shells.map((count, index) => {
        const radius = 2 + index * 1.5;
        const speed = (shells.length - index) * 0.5 + 0.5;
        // give each shell a random tilt
        const tiltX = Math.random() * Math.PI;
        const tiltY = Math.random() * Math.PI;
        
        return (
          <ElectronRing 
            key={index} 
            radius={radius} 
            count={count} 
            speed={index % 2 === 0 ? speed : -speed} 
            tiltX={tiltX}
            tiltY={tiltY}
          />
        );
      })}
      
      <OrbitControls enablePan={false} maxDistance={20} minDistance={3} />
    </Canvas>
  );
}
