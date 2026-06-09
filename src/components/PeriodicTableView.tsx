import React, { useState } from 'react';
import { ArrowLeft, X } from 'lucide-react';
import { elements, type Element } from '../data/elements';
import { ElementCard } from './ElementCard';
import { Atom3D } from './Atom3D';
import { getCategoryColor } from '../lib/utils';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';

const categoryTranslations: Record<string, string> = {
  'nonmetal': '非金属',
  'noble-gas': '稀有气体',
  'alkali-metal': '碱金属',
  'alkaline-earth-metal': '碱土金属',
  'metalloid': '类金属',
  'halogen': '卤素',
  'post-transition-metal': '主族金属',
  'transition-metal': '过渡金属',
  'lanthanide': '镧系元素',
  'actinide': '锕系元素'
};

export const getNeutrons = (atomicNumber: number) => {
  const standardMasses: Record<number, number> = {
    1: 1, 2: 4, 3: 7, 4: 9, 5: 11, 6: 12, 7: 14, 8: 16, 9: 19, 10: 20,
    11: 23, 12: 24, 13: 27, 14: 28, 15: 31, 16: 32, 17: 35, 18: 40,
    19: 39, 20: 40, 21: 45, 22: 48, 23: 51, 24: 52, 25: 55, 26: 56, 27: 59, 28: 59, 29: 64, 30: 65,
    31: 70, 32: 73, 33: 75, 34: 79, 35: 80, 36: 84, 37: 85, 38: 88, 39: 89, 40: 91,
    41: 93, 42: 96, 43: 98, 44: 101, 45: 103, 46: 106, 47: 108, 48: 112, 49: 115, 50: 119,
    51: 122, 52: 128, 53: 127, 54: 131, 55: 133, 56: 137, 57: 139, 58: 140, 59: 141, 60: 144,
    61: 145, 62: 150, 63: 152, 64: 157, 65: 159, 66: 163, 67: 165, 68: 167, 69: 169, 70: 173,
    71: 175, 72: 178, 73: 181, 74: 184, 75: 186, 76: 190, 77: 192, 78: 195, 79: 197, 80: 201,
    81: 204, 82: 207, 83: 209, 84: 209, 85: 210, 86: 222, 87: 223, 88: 226, 89: 227, 90: 232,
    91: 231, 92: 238, 93: 237, 94: 244, 95: 243, 96: 247, 97: 247, 98: 251, 99: 252, 100: 257,
    101: 258, 102: 259, 103: 262, 104: 267, 105: 268, 106: 269, 107: 270, 108: 270, 109: 278, 110: 281,
    111: 282, 112: 285, 113: 286, 114: 289, 115: 290, 116: 293, 117: 294, 118: 294
  };
  const mass = standardMasses[atomicNumber] || Math.round(atomicNumber * 2.5);
  return mass - atomicNumber;
};

export function PeriodicTableView({ onBack }: { onBack: () => void }) {
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const dragControls = useDragControls();

  return (
    <div className="flex-grow flex gap-6 w-full h-full overflow-hidden max-w-[1600px] mx-auto p-4 md:p-6">
      <div className="flex-grow flex flex-col bg-slate-800/50 rounded-3xl border border-slate-700 p-6 shadow-inner w-full h-full overflow-hidden">
        <div className="mb-6 flex justify-between items-center sm:flex-row flex-col gap-4 border-b border-slate-700/50 pb-4 shrink-0">
          <h2 className="font-bold text-xl flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></span>
            交互式元素周期表
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            <span className="px-3 py-1 bg-slate-700 rounded-full text-[10px] font-bold text-slate-300">活泼金属</span>
            <span className="px-3 py-1 bg-indigo-600 rounded-full text-[10px] font-bold">稀有气体</span>
            <span className="px-3 py-1 bg-slate-700 rounded-full text-[10px] font-bold text-slate-300">卤素</span>
          </div>
        </div>

        <div className="flex-grow overflow-auto custom-scrollbar pr-2 pb-2">
          <div 
            className="grid gap-1 min-w-[800px] md:min-w-[1000px] mx-auto" 
            style={{ 
              gridTemplateColumns: 'repeat(18, minmax(0, 1fr))',
              gridTemplateRows: 'repeat(10, minmax(0, 1fr))'
            }}
          >
            {elements.map(el => (
              <ElementCard 
                key={el.symbol} 
                element={el} 
                className={`w-full h-full min-h-[4.5rem] md:min-h-[5.5rem] !p-1 md:!p-2 ${el.period >= 8 ? 'mt-4' : ''}`}
                style={{ 
                  gridColumnStart: el.group,
                  gridRowStart: el.period
                }}
                onClick={() => setSelectedElement(el)}
                selected={selectedElement?.symbol === el.symbol}
              />
            ))}
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-slate-700/50 shrink-0">
           <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">元素分类</h2>
           <div className="flex flex-wrap gap-3 text-xs font-bold uppercase tracking-widest">
               <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-red-500/20 border border-red-500"></div> 碱金属</div>
               <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-amber-500/20 border border-amber-500"></div> 碱土金属</div>
               <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-pink-500/20 border border-pink-500"></div> 过渡金属</div>
               <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-blue-400/20 border border-blue-400"></div> 主族金属</div>
               <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-emerald-500/20 border border-emerald-500"></div> 类金属</div>
               <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-sky-500/20 border border-sky-500"></div> 非金属</div>
               <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-indigo-400/20 border border-indigo-400"></div> 卤素</div>
               <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-purple-500/20 border border-purple-500"></div> 稀有气体</div>
               <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-teal-500/20 border border-teal-500"></div> 镧系元素</div>
               <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-fuchsia-500/20 border border-fuchsia-500"></div> 锕系元素</div>
           </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedElement && (
          <motion.div 
            drag
            dragControls={dragControls}
            dragListener={false}
            dragMomentum={false}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", bounce: 0.2 }}
            className="fixed z-50 bg-slate-800/90 backdrop-blur-2xl rounded-3xl border border-slate-600 shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col resize overflow-hidden"
            style={{ 
              top: 'max(5vh, calc(50vh - 35vh))',
              left: 'max(5vw, calc(50vw - 40vw))',
              width: 'min(1000px, 90vw)',
              height: 'min(700px, 90vh)',
              minWidth: '320px',
              minHeight: '400px'
            }}
          >
             <div 
               className="p-4 border-b border-slate-700 flex justify-between items-center bg-slate-900/80 cursor-move shrink-0"
               onPointerDown={(e) => dragControls.start(e)}
             >
               <div className="flex items-center gap-3 pointer-events-none">
                 <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${getCategoryColor(selectedElement.category)}`}>
                   {selectedElement.symbol}
                 </div>
                 <h3 className="font-bold text-slate-200">{selectedElement.name} <span className="text-slate-500 text-xs ml-2 font-normal hidden sm:inline">(拖拽此处移动)</span></h3>
               </div>
               <button 
                 onClick={() => setSelectedElement(null)}
                 className="p-2 hover:bg-slate-700 rounded-full transition-colors text-slate-400 hover:text-white"
               >
                 <X className="w-5 h-5" />
               </button>
             </div>
             
             <div className="flex flex-col md:flex-row flex-grow overflow-hidden bg-slate-900/40 relative">
               <div className="flex-grow relative h-[40vh] md:h-auto min-h-[300px] shrink-0 md:shrink bg-slate-950">
                 <Atom3D atomicNumber={selectedElement.atomicNumber} neutrons={getNeutrons(selectedElement.atomicNumber)} />
                 <div className="absolute bottom-4 left-4 right-4 bg-slate-900/80 backdrop-blur border border-slate-700 rounded-xl p-3 flex justify-evenly items-center text-[10px] font-bold uppercase tracking-widest text-slate-300 pointer-events-none select-none">
                   <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div> 质子: {selectedElement.atomicNumber}</div>
                   <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div> 中子: {getNeutrons(selectedElement.atomicNumber)}</div>
                   <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div> 电子: {selectedElement.atomicNumber}</div>
                 </div>
               </div>
   
               <div className="w-full md:w-[350px] lg:w-[400px] p-6 overflow-y-auto border-t md:border-t-0 md:border-l border-slate-700/50 flex flex-col gap-6 bg-slate-900/80 shrink-0">
                  <div>
                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 border-b border-slate-700/50 pb-2">元素分类</h4>
                    <p className="text-slate-300 font-medium">{categoryTranslations[selectedElement.category] || selectedElement.category}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 border-b border-slate-700/50 pb-2">特性与线索</h4>
                    <ul className="space-y-3">
                      {selectedElement.clues.map((clue, idx) => (
                        <li key={idx} className="flex gap-3 text-sm text-slate-300">
                          <span className="text-indigo-500 font-bold">•</span>
                          {clue}
                        </li>
                      ))}
                    </ul>
                  </div>
   
                  <div className="mt-auto grid grid-cols-2 gap-3 pt-6 border-t border-slate-700/50">
                     <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-700">
                       <span className="block text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">族 (Group)</span>
                       <span className="text-lg font-mono text-emerald-400 font-bold">{selectedElement.group}</span>
                     </div>
                     <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-700">
                       <span className="block text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">周期 (Period)</span>
                       <span className="text-lg font-mono text-blue-400 font-bold">{selectedElement.period}</span>
                     </div>
                  </div>
               </div>
             </div>
             
             {/* Resize Handle Hint */}
             <div className="absolute bottom-1 right-1 w-4 h-4 pointer-events-none opacity-50 flex items-end justify-end p-0.5">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 1L1 9M9 5L5 9M9 9H8.99" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
