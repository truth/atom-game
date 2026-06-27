import React, { useState } from 'react';
import { ArrowLeft, Dna, ChevronUp, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { molecules, type Molecule } from '../data/molecules';

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
                className="relative w-full h-full max-w-lg max-h-lg flex items-center justify-center pointer-events-none"
              >
                <svg viewBox="0 0 300 300" className="w-full h-full p-4 drop-shadow-2xl">
                  {/* Bonds */}
                  {selectedMolecule.structure.bonds.map((bond, idx) => {
                    const source = selectedMolecule.structure.atoms[bond.source];
                    const target = selectedMolecule.structure.atoms[bond.target];
                    return (
                      <g key={`bond-${idx}`}>
                        <line 
                          x1={source.x} y1={source.y} 
                          x2={target.x} y2={target.y} 
                          stroke="rgba(255,255,255,0.2)" 
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
                  {selectedMolecule.structure.atoms.map((atom) => {
                    const colorMap: Record<string, string> = {
                      'bg-red-500': '#ef4444',
                      'bg-slate-300': '#cbd5e1',
                      'bg-slate-700': '#334155',
                      'bg-blue-500': '#3b82f6',
                      'bg-purple-500': '#a855f7',
                      'bg-green-500': '#22c55e',
                    };
                    const color = colorMap[atom.color] || '#cbd5e1';
                    
                    return (
                      <g key={`atom-${atom.id}`}>
                        <circle cx={atom.x} cy={atom.y} r={atom.size} fill={color} opacity={0.9} />
                        {/* Shading for 3D effect */}
                        <circle cx={atom.x - atom.size * 0.3} cy={atom.y - atom.size * 0.3} r={atom.size * 0.4} fill="white" opacity={0.3} />
                        <text x={atom.x} y={atom.y} textAnchor="middle" dominantBaseline="central" fill="white" fontSize={atom.size * 0.8} fontWeight="bold" opacity={0.9}>
                          {atom.symbol}
                        </text>
                      </g>
                    )
                  })}
                </svg>
              </motion.div>
            </AnimatePresence>
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
