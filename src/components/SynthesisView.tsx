import React, { useState, useEffect } from 'react';
import { ArrowLeft, Beaker, Sparkles, CheckCircle, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { compounds, CompoundQuest } from '../data/compounds';
import { elements, getElementBySymbol } from '../data/elements';
import { ElementCard } from './ElementCard';
import { cn, getCategoryColor } from '../lib/utils';

interface WorkingElement {
  id: string;
  symbol: string;
}

export function SynthesisView({ onBack }: { onBack: () => void }) {
  const [currentQuestIdx, setCurrentQuestIdx] = useState(0);
  const [workbenchInfo, setWorkbenchInfo] = useState<WorkingElement[]>([]);
  const [status, setStatus] = useState<'synthesizing' | 'success'>('synthesizing');

  const currentQuest = compounds[currentQuestIdx];

  const addToWorkbench = (symbol: string) => {
    if (status === 'success') return;
    setWorkbenchInfo(prev => [...prev, { id: Math.random().toString(36).substr(2, 9), symbol }]);
  };

  const removeFromWorkbench = (id: string) => {
    if (status === 'success') return;
    setWorkbenchInfo(prev => prev.filter(e => e.id !== id));
  };
  
  const resetWorkbench = () => {
    if (status === 'success') return;
    setWorkbenchInfo([]);
  }

  // Check if current workbench matches quest
  useEffect(() => {
    if (!currentQuest || workbenchInfo.length === 0) return;

    // Count current elements
    const currentCounts: Record<string, number> = {};
    workbenchInfo.forEach(item => {
      currentCounts[item.symbol] = (currentCounts[item.symbol] || 0) + 1;
    });

    // Check against target
    let isMatch = true;
    let totalTargetElements = 0;
    
    currentQuest.components.forEach(comp => {
      totalTargetElements += comp.count;
      if (currentCounts[comp.symbol] !== comp.count) {
        isMatch = false;
      }
    });
    
    // Check if we have extra elements
    if (workbenchInfo.length !== totalTargetElements) {
       isMatch = false;
    }

    if (isMatch) {
      setStatus('success');
    }

  }, [workbenchInfo, currentQuest]);

  const handleNextQuest = () => {
    if (currentQuestIdx < compounds.length - 1) {
      setCurrentQuestIdx(prev => prev + 1);
      setWorkbenchInfo([]);
      setStatus('synthesizing');
    } else {
      // Finished all
      setCurrentQuestIdx(0);
      setWorkbenchInfo([]);
      setStatus('synthesizing');
    }
  };

  if (!currentQuest) return null;

  // Gather available elements for this quest + some distractors
  const targetSymbols = currentQuest.components.map(c => c.symbol);
  const distractors = elements
    .filter(e => !targetSymbols.includes(e.symbol))
    .sort(() => 0.5 - Math.random())
    .slice(0, 4)
    .map(e => e.symbol);
  
  const availableSymbols = Array.from(new Set([...targetSymbols, ...distractors])).sort();
  
  const progressPercent = ((currentQuestIdx) / compounds.length) * 100;

  return (
    <div className="flex-grow flex p-6 gap-6 overflow-hidden max-w-7xl mx-auto w-full flex-col lg:flex-row">
      {/* Left Sidebar: Mission Panel */}
      <aside className="w-full lg:w-64 flex flex-col gap-4 flex-shrink-0">
        <div className="bg-slate-800 p-5 rounded-3xl border border-slate-700 flex flex-col gap-4 shadow-xl">
          <h2 className="text-sm font-bold text-indigo-300 uppercase tracking-widest">任务目标</h2>
          <div className="space-y-3">
            <p className="text-xs text-slate-400 leading-relaxed">
              合成 1 分子 <span className="text-white font-bold italic underline decoration-blue-500">{currentQuest.name} ({currentQuest.formula})</span> 以稳定反应堆核心。
            </p>
            <div className="bg-slate-900/50 rounded-2xl p-3 border border-slate-700/50">
              <div className="flex justify-between items-end mb-2">
                <span className="text-[10px] font-bold text-slate-500">进度</span>
                <span className="text-xs font-mono text-emerald-400">{currentQuestIdx}/{compounds.length}</span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: `${progressPercent}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 p-5 rounded-3xl border border-slate-700 flex flex-col gap-4 shadow-xl flex-grow relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-10 blur-[1px] pointer-events-none">
             <Beaker className="w-32 h-32 text-emerald-600" />
           </div>
           <h2 className="text-sm font-bold text-amber-400 uppercase tracking-widest relative z-10">目标详情</h2>
           <div className="relative z-10 flex flex-col h-full">
             <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl py-6 px-4 my-4 flex flex-col items-center justify-center">
               <span className="font-sans text-5xl font-black tracking-tight text-white mb-2">
                 {currentQuest.formula.split(/(\d+)/).map((part, i) => (
                   isNaN(Number(part)) ? <span key={i}>{part}</span> : <sub key={i} className="text-2xl opacity-70">{part}</sub>
                 ))}
               </span>
               <span className="text-xs text-slate-400 uppercase tracking-widest font-bold">{currentQuest.name}</span>
             </div>
             <p className="text-xs text-slate-400 leading-relaxed mt-2">
                {currentQuest.description}
             </p>
           </div>
        </div>
      </aside>

      {/* Main Area: Lab & Elements */}
      <section className="flex-grow flex flex-col gap-6 overflow-hidden">
          
        {/* Element Inventory */}
        <div className="bg-slate-800/50 rounded-3xl p-6 border border-slate-700 shadow-inner flex flex-col">
           <div className="mb-6 flex justify-between items-center">
             <h2 className="font-bold text-xl flex items-center gap-3">
               <span className="w-3 h-3 rounded-full bg-amber-500 animate-pulse"></span>
               实验室元素
             </h2>
           </div>
           <div className="flex flex-wrap gap-4 content-start overflow-y-auto pb-2">
               {availableSymbols.map(sym => {
                   const el = getElementBySymbol(sym)!;
                   return (
                       <ElementCard 
                         key={el.symbol} 
                         element={el} 
                         onClick={() => addToWorkbench(el.symbol)}
                         className={status === 'success' ? 'opacity-50 grayscale pointer-events-none' : ''}
                       />
                   );
               })}
           </div>
        </div>

        {/* Compound Buffer/Flask */}
        <div className="mt-auto min-h-[160px] bg-slate-900 rounded-3xl flex flex-col sm:flex-row items-center p-6 gap-6 border border-slate-700 shadow-xl relative overflow-hidden">
          <div className="flex justify-between items-start w-full sm:w-auto sm:flex-col shrink-0 gap-2">
            <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">反应缓冲区</h2>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-500" />
              <span className="text-sm text-indigo-400 font-bold whitespace-nowrap">烧瓶状态</span>
            </div>
            {workbenchInfo.length > 0 && status !== 'success' && (
              <button 
                onClick={resetWorkbench}
                className="mt-2 text-rose-400 hover:text-rose-300 transition flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest"
              >
                 <RotateCcw className="w-3 h-3" /> 清空缓冲区
              </button>
            )}
          </div>
          
          <div className="flex-1 flex flex-wrap gap-4 items-center justify-center min-h-[80px]">
              <AnimatePresence mode="popLayout">
                  {workbenchInfo.length === 0 && (
                      <motion.span 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }}
                        className="text-slate-500 text-xs font-bold uppercase tracking-widest"
                      >
                          添加元素开始合成...
                      </motion.span>
                  )}
                  {workbenchInfo.map((item, idx) => {
                      const el = getElementBySymbol(item.symbol)!;
                      return (
                          <motion.button
                              layout
                              initial={{ scale: 0, rotate: 180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              exit={{ scale: 0, opacity: 0 }}
                              onClick={() => removeFromWorkbench(item.id)}
                              key={item.id}
                              className={cn(
                                  "relative flex flex-col items-center justify-center rounded-2xl border-2 shadow-sm focus:outline-none w-16 h-16 transition-all z-10 shrink-0",
                                  getCategoryColor(el.category),
                                  status === 'success' ? "pointer-events-none" : "hover:border-rose-400 hover:bg-rose-500/20 cursor-pointer"
                              )}
                          >
                              <span className="text-3xl md:text-4xl font-black drop-shadow-[0_0_8px_currentColor] brightness-125">{el.symbol}</span>
                          </motion.button>
                      );
                  })}
              </AnimatePresence>

             {/* Success Overlay */}
              <AnimatePresence>
                  {status === 'success' && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm z-20 flex flex-col sm:flex-row items-center justify-center gap-6"
                      >
                          <motion.div
                              initial={{ scale: 0.5, x: -20 }}
                              animate={{ scale: 1, x: 0 }}
                              transition={{ type: 'spring', bounce: 0.5 }}
                              className="flex items-center gap-4"
                          >
                              <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500 rounded-full flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.5)]">
                                  <CheckCircle className="w-8 h-8" />
                              </div>
                              <div className="text-left">
                                <h3 className="text-xl font-black text-white tracking-tight uppercase">合成完成</h3>
                                <p className="text-emerald-400 text-xs font-bold tracking-widest mt-1">{currentQuest.name} 已稳定</p>
                              </div>
                          </motion.div>

                          <motion.button 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            onClick={handleNextQuest}
                            className="h-14 px-8 bg-indigo-600 rounded-xl font-black text-xs tracking-widest uppercase text-white hover:bg-indigo-500 transition-colors border-b-4 border-indigo-800 flex items-center"
                          >
                            {currentQuestIdx < compounds.length - 1 ? '下一个化合物' : '完成收集'}
                          </motion.button>
                      </motion.div>
                  )}
              </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}
