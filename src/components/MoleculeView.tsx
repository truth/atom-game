import React, { useState, useMemo } from 'react';
import { ArrowLeft, Dna, ChevronUp, ChevronDown, Cuboid, Square } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { molecules, type Molecule } from '../data/molecules';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, Html } from '@react-three/drei';
import * as THREE from 'three';

const colorMap: Record<string, string> = {
  'bg-red-500': '#ef4444',
  'bg-slate-300': '#cbd5e1',
  'bg-slate-700': '#334155',
  'bg-blue-500': '#3b82f6',
  'bg-purple-500': '#a855f7',
  'bg-green-500': '#22c55e',
  'bg-yellow-500': '#eab308'
};

function MoleculeCanvas3D({ molecule }: { molecule: Molecule }) {
  const center = useMemo(() => {
    let cx = 0, cy = 0, cz = 0;
    molecule.structure.atoms.forEach(a => {
      cx += a.x; cy += a.y; cz += (a.z || 0);
    });
    const len = molecule.structure.atoms.length || 1;
    return new THREE.Vector3(cx / len, cy / len, cz / len);
  }, [molecule]);

  return (
    <Canvas camera={{ position: [0, 0, 200], fov: 45 }}>
      <ambientLight intensity={0.6} />
      <pointLight position={[100, 100, 100]} intensity={0.8} />
      <directionalLight position={[-50, -50, 50]} intensity={0.4} />
      <OrbitControls autoRotate autoRotateSpeed={1.5} enablePan={false} />
      
      <group position={[-center.x, -center.y, -center.z]}>
        {/* Bonds */}
        {molecule.structure.bonds.map((bond, idx) => {
          const source = molecule.structure.atoms[bond.source];
          const target = molecule.structure.atoms[bond.target];
          
          const start = new THREE.Vector3(source.x, source.y, source.z || 0);
          const end = new THREE.Vector3(target.x, target.y, target.z || 0);
          const distance = start.distanceTo(end);
          const position = start.clone().lerp(end, 0.5);
          
          const quaternion = new THREE.Quaternion().setFromUnitVectors(
            new THREE.Vector3(0, 1, 0),
            end.clone().sub(start).normalize()
          );

          const drawCylinder = (offset: THREE.Vector3, i: number) => (
            <mesh key={`bond-${idx}-${i}`} position={position.clone().add(offset)} quaternion={quaternion}>
              <cylinderGeometry args={[3, 3, distance, 16]} />
              <meshStandardMaterial color="#94a3b8" roughness={0.4} />
            </mesh>
          );

          if (bond.type === 1) {
            return drawCylinder(new THREE.Vector3(0,0,0), 0);
          } else if (bond.type === 2) {
            const dir = end.clone().sub(start).normalize();
            let up = new THREE.Vector3(0, 1, 0);
            if (Math.abs(dir.dot(up)) > 0.99) up = new THREE.Vector3(1, 0, 0);
            const ortho = new THREE.Vector3().crossVectors(dir, up).normalize().multiplyScalar(5);
            return (
              <group key={`bond-${idx}`}>
                {drawCylinder(ortho, 1)}
                {drawCylinder(ortho.clone().negate(), 2)}
              </group>
            );
          } else {
            const dir = end.clone().sub(start).normalize();
            let up = new THREE.Vector3(0, 1, 0);
            if (Math.abs(dir.dot(up)) > 0.99) up = new THREE.Vector3(1, 0, 0);
            const ortho = new THREE.Vector3().crossVectors(dir, up).normalize().multiplyScalar(7);
            return (
              <group key={`bond-${idx}`}>
                {drawCylinder(new THREE.Vector3(0,0,0), 0)}
                {drawCylinder(ortho, 1)}
                {drawCylinder(ortho.clone().negate(), 2)}
              </group>
            );
          }
        })}

        {/* Atoms */}
        {molecule.structure.atoms.map((atom, idx) => (
          <Sphere key={`atom-${idx}`} args={[atom.size, 32, 32]} position={[atom.x, atom.y, atom.z || 0]}>
            <meshStandardMaterial color={colorMap[atom.color] || '#cbd5e1'} roughness={0.3} metalness={0.1} />
            <Html center zIndexRange={[100, 0]} style={{ pointerEvents: 'none' }}>
              <div 
                className="text-white font-bold drop-shadow-md select-none" 
                style={{ fontSize: `${atom.size * 0.8}px`, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
              >
                {atom.symbol}
              </div>
            </Html>
          </Sphere>
        ))}
      </group>
    </Canvas>
  );
}

function MoleculeCanvas2D({ molecule }: { molecule: Molecule }) {
  const { viewBox } = useMemo(() => {
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    molecule.structure.atoms.forEach(a => {
      minX = Math.min(minX, a.x - a.size);
      maxX = Math.max(maxX, a.x + a.size);
      minY = Math.min(minY, a.y - a.size);
      maxY = Math.max(maxY, a.y + a.size);
    });
    const width = maxX - minX + 80;
    const height = maxY - minY + 80;
    return { viewBox: `${minX - 40} ${minY - 40} ${width} ${height}` };
  }, [molecule]);

  return (
    <svg viewBox={viewBox} className="w-full h-full p-4 drop-shadow-2xl max-w-xl max-h-xl mx-auto">
      {/* Bonds */}
      {molecule.structure.bonds.map((bond, idx) => {
        const source = molecule.structure.atoms[bond.source];
        const target = molecule.structure.atoms[bond.target];
        return (
          <g key={`bond-${idx}`}>
            <line 
              x1={source.x} y1={source.y} 
              x2={target.x} y2={target.y} 
              stroke="rgba(255,255,255,0.4)" 
              strokeWidth={bond.type === 2 ? 12 : bond.type === 3 ? 18 : 6}
              strokeLinecap="round"
            />
            {bond.type === 2 && (
              <line 
                x1={source.x} y1={source.y} 
                x2={target.x} y2={target.y} 
                stroke="#020617" 
                strokeWidth={4}
                strokeLinecap="round"
              />
            )}
            {bond.type === 3 && (
              <>
                <line x1={source.x} y1={source.y} x2={target.x} y2={target.y} stroke="#020617" strokeWidth={4} strokeLinecap="round" />
              </>
            )}
          </g>
        )
      })}
      {/* Atoms */}
      {molecule.structure.atoms.map((atom) => {
        const color = colorMap[atom.color] || '#cbd5e1';
        return (
          <g key={`atom-${atom.id}`}>
            <circle cx={atom.x} cy={atom.y} r={atom.size} fill={color} opacity={1} stroke="#1e293b" strokeWidth={2} />
            <text x={atom.x} y={atom.y} textAnchor="middle" dominantBaseline="central" fill="white" fontSize={atom.size * 0.8} fontWeight="bold">
              {atom.symbol}
            </text>
          </g>
        )
      })}
    </svg>
  );
}

export function MoleculeView({ onBack }: { onBack: () => void }) {
  const [selectedMolecule, setSelectedMolecule] = useState<Molecule>(molecules[0]);
  const [isInfoExpanded, setIsInfoExpanded] = useState(true);
  const [viewMode, setViewMode] = useState<'3D' | '2D'>('3D');

  return (
    <div className="flex flex-col h-full w-full bg-slate-950 text-white relative overflow-hidden">
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 sm:px-8 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 z-10 shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 bg-slate-800 hover:bg-slate-700 rounded-full transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 text-slate-300 group-hover:text-white" />
          </button>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Dna className="w-5 h-5 text-purple-400" />
            分子图鉴
          </h2>
        </div>
        
        <div className="flex bg-slate-800/80 p-1 rounded-xl border border-slate-700">
          <button 
            onClick={() => setViewMode('3D')}
            className={`px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${viewMode === '3D' ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'}`}
          >
            <Cuboid className="w-4 h-4" /> 3D
          </button>
          <button 
            onClick={() => setViewMode('2D')}
            className={`px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${viewMode === '2D' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'}`}
          >
            <Square className="w-4 h-4" /> 2D
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        {/* Sidebar */}
        <div className="w-full md:w-64 lg:w-80 border-r border-slate-800 bg-slate-900/50 flex flex-col h-1/3 md:h-full shrink-0">
          <div className="p-4 border-b border-slate-800">
            <h3 className="font-bold text-slate-300 uppercase tracking-widest text-xs">常见分子</h3>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
            {molecules.map(mol => (
              <button
                key={mol.id}
                onClick={() => setSelectedMolecule(mol)}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center justify-between ${
                  selectedMolecule.id === mol.id 
                    ? 'bg-purple-600/20 border border-purple-500/50 text-white' 
                    : 'text-slate-400 hover:bg-slate-800 border border-transparent'
                }`}
              >
                <div>
                  <div className="font-bold">{mol.name}</div>
                  <div className="text-xs opacity-70 font-mono mt-0.5">{mol.formula}</div>
                </div>
                <div className={`text-[10px] px-2 py-0.5 rounded-full border ${
                  mol.category === '无机物' ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                }`}>
                  {mol.category}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col h-2/3 md:h-full relative overflow-hidden bg-slate-950">
          
          <div className="absolute inset-0 flex items-center justify-center">
            {/* 3D or 2D rendering */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedMolecule.id}-${viewMode}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ type: "spring", damping: 20 }}
                className="relative w-full h-full max-w-2xl max-h-2xl flex items-center justify-center"
              >
                {viewMode === '3D' ? (
                  <MoleculeCanvas3D molecule={selectedMolecule} />
                ) : (
                  <MoleculeCanvas2D molecule={selectedMolecule} />
                )}
              </motion.div>
            </AnimatePresence>
            
            {viewMode === '3D' && (
              <div className="absolute top-6 left-6 text-slate-500 text-xs flex items-center gap-2 animate-pulse pointer-events-none">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span> 拖拽模型旋转 / 缩放
              </div>
            )}
          </div>

          {/* Info Card */}
          <div className="absolute bottom-6 left-6 right-6 md:left-auto md:right-8 md:w-72 md:bottom-8 bg-slate-900/90 backdrop-blur-xl p-4 md:p-5 rounded-3xl border border-slate-700 shadow-2xl z-10 transition-all duration-300">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h2 className="text-xl font-black text-white">{selectedMolecule.name}</h2>
                <span className="font-mono text-sm text-purple-400 font-bold bg-purple-950/50 px-2 py-0.5 rounded-lg mt-1 inline-block">{selectedMolecule.formula}</span>
              </div>
              <button 
                onClick={() => setIsInfoExpanded(!isInfoExpanded)}
                className="p-1.5 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white"
              >
                {isInfoExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
              </button>
            </div>
            
            <AnimatePresence>
              {isInfoExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0, marginTop: 0 }}
                  animate={{ height: 'auto', opacity: 1, marginTop: 12 }}
                  exit={{ height: 0, opacity: 0, marginTop: 0 }}
                  className="overflow-hidden"
                >
                  <div className="h-px w-full bg-gradient-to-r from-purple-500/50 to-transparent mb-3"></div>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    {selectedMolecule.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
        </div>
      </div>
    </div>
  );
}
