import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Dna, ChevronUp, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { molecules, type Molecule } from '../data/molecules';

function Molecule3D({ molecule }: { molecule: Molecule }) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const rotationStart = useRef({ x: 0, y: 0 });
  const requestRef = useRef<number>();
  const timeRef = useRef<number>(0);

  const animate = (time: number) => {
    if (!isDragging) {
      timeRef.current += 16; // approximate 60fps
      setRotation(prev => ({
        x: prev.x + 0.005,
        y: prev.y + 0.01
      }));
    }
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!);
  }, [isDragging]);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    rotationStart.current = { ...rotation };
    (e.target as Element).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    setRotation({
      x: rotationStart.current.x + dy * 0.01,
      y: rotationStart.current.y + dx * 0.01
    });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    (e.target as Element).releasePointerCapture(e.pointerId);
  };

  const cosX = Math.cos(rotation.x);
  const sinX = Math.sin(rotation.x);
  const cosY = Math.cos(rotation.y);
  const sinY = Math.sin(rotation.y);

  const projectedAtoms = molecule.structure.atoms.map(atom => {
    const z0 = atom.z || 0;
    const x1 = atom.x * cosY - z0 * sinY;
    const z1 = atom.x * sinY + z0 * cosY;
    const y2 = atom.y * cosX - z1 * sinX;
    const z2 = atom.y * sinX + z1 * cosX;
    
    // Slightly weaker perspective for molecules
    const perspective = 500 / (500 + z2);
    
    return {
      ...atom,
      px: x1 * perspective + 150,
      py: y2 * perspective + 150,
      pz: z2,
      psize: Math.max(atom.size * perspective, 1),
    };
  });

  const projectedBonds = molecule.structure.bonds.map(bond => {
    const source = projectedAtoms[bond.source];
    const target = projectedAtoms[bond.target];
    const avgZ = (source.pz + target.pz) / 2;
    return { ...bond, source, target, pz: avgZ };
  });

  const drawItems = [
    ...projectedAtoms.map(a => ({ type: 'atom', item: a, z: a.pz })),
    ...projectedBonds.map(b => ({ type: 'bond', item: b, z: b.pz }))
  ].sort((a, b) => b.z - a.z);

  const colorMap: Record<string, string> = {
    'bg-red-500': '#ef4444',
    'bg-slate-300': '#cbd5e1',
    'bg-slate-700': '#334155',
    'bg-blue-500': '#3b82f6',
    'bg-purple-500': '#a855f7',
    'bg-green-500': '#22c55e',
    'bg-yellow-500': '#eab308'
  };

  return (
    <svg 
      viewBox="0 0 300 300" 
      className="w-full h-full p-4 drop-shadow-2xl overflow-visible touch-none cursor-grab active:cursor-grabbing"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {drawItems.map((drawItem, idx) => {
        if (drawItem.type === 'bond') {
          const bond = drawItem.item as any;
          return (
            <g key={`bond-${idx}`}>
              <line 
                x1={bond.source.px} y1={bond.source.py} 
                x2={bond.target.px} y2={bond.target.py} 
                stroke="rgba(255,255,255,0.4)" 
                strokeWidth={(bond.type === 2 ? 12 : bond.type === 3 ? 18 : 6) * ((bond.source.psize + bond.target.psize) / (bond.source.size + bond.target.size))}
                strokeLinecap="round"
              />
              {bond.type === 2 && (
                <line 
                  x1={bond.source.px} y1={bond.source.py} 
                  x2={bond.target.px} y2={bond.target.py} 
                  stroke="#020617" 
                  strokeWidth={4 * ((bond.source.psize + bond.target.psize) / (bond.source.size + bond.target.size))}
                  strokeLinecap="round"
                />
              )}
            </g>
          );
        } else {
          const atom = drawItem.item as any;
          const color = colorMap[atom.color] || '#cbd5e1';
          return (
            <g key={`atom-${idx}`}>
              <circle cx={atom.px} cy={atom.py} r={atom.psize} fill={color} opacity={1} />
              <circle cx={atom.px - atom.psize * 0.3} cy={atom.py - atom.psize * 0.3} r={atom.psize * 0.4} fill="white" opacity={0.3} />
              <text x={atom.px} y={atom.py} textAnchor="middle" dominantBaseline="central" fill="white" fontSize={atom.psize * 0.8} fontWeight="bold" opacity={0.9}>
                {atom.symbol}
              </text>
            </g>
          );
        }
      })}
    </svg>
  );
}

export function MoleculeView({ onBack }: { onBack: () => void }) {
  const [selectedMolecule, setSelectedMolecule] = useState<Molecule>(molecules[0]);
  const [isInfoExpanded, setIsInfoExpanded] = useState(true);

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
            {/* 3D-ish rendering using SVG */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedMolecule.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ type: "spring", damping: 20 }}
                className="relative w-full h-full max-w-lg max-h-lg flex items-center justify-center"
              >
                <Molecule3D molecule={selectedMolecule} />
              </motion.div>
            </AnimatePresence>
            
            <div className="absolute top-6 left-6 text-slate-500 text-xs flex items-center gap-2 animate-pulse pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-purple-500"></span> 拖拽模型旋转
            </div>
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
