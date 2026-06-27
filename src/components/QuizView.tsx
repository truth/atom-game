import React, { useState, useEffect } from 'react';
import { ArrowLeft, Lightbulb, CheckCircle2, XCircle, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { elements, Element } from '../data/elements';
import { ElementCard } from './ElementCard';
import { cn } from '../lib/utils';

export function QuizView({ onBack }: { onBack: () => void }) {
  const [currentElement, setCurrentElement] = useState<Element | null>(null);
  const [options, setOptions] = useState<Element[]>([]);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [status, setStatus] = useState<'playing' | 'correct' | 'wrong' | 'finished'>('playing');
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [hasRetried, setHasRetried] = useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const maxRounds = 10;

  const startNewRound = () => {
    if (round > maxRounds) {
      setStatus('finished');
      return;
    }
    
    // Pick a random element for the correct answer
    const target = elements[Math.floor(Math.random() * elements.length)];
    
    // Pick 3 other random elements as distractors
    const otherElements = elements.filter(e => e.atomicNumber !== target.atomicNumber);
    const distractors = otherElements.sort(() => 0.5 - Math.random()).slice(0, 3);
    
    const allOptions = [target, ...distractors].sort(() => 0.5 - Math.random());
    
    setCurrentElement(target);
    setOptions(allOptions);
    setStatus('playing');
    setSelectedElement(null);
    setShowHint(false);
    setHasRetried(false);
  };

  useEffect(() => {
    startNewRound();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [round]);

  const handleGuess = (element: Element) => {
    if (status !== 'playing') return;
    
    setSelectedElement(element);
    if (element.atomicNumber === currentElement?.atomicNumber) {
      setStatus('correct');
      setScore(s => s + 10 + (showHint ? 0 : 5)); // Bonus for no hint
      timeoutRef.current = setTimeout(() => {
        setRound(r => r + 1);
      }, 2000);
    } else {
      setStatus('wrong');
      timeoutRef.current = setTimeout(() => {
        setRound(r => r + 1);
      }, 3000);
    }
  };

  const handleRetry = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setStatus('playing');
    setSelectedElement(null);
    setHasRetried(true);
  };

  if (status === 'finished') {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full px-4 overflow-y-auto">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-slate-800 rounded-3xl p-8 border border-slate-700 shadow-xl w-full max-w-lg text-center"
        >
          <Trophy className="w-20 h-20 text-amber-500 mx-auto mb-4 drop-shadow-lg" />
          <h2 className="text-4xl font-black text-white mb-2 uppercase">测验完成！</h2>
          <p className="text-xl text-slate-400 mb-6 font-mono">你的得分：<span className="font-bold text-emerald-400">{score}</span></p>
          
          <div className="flex gap-4 justify-center">
            <button 
              onClick={() => { setScore(0); setRound(1); startNewRound(); }}
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition uppercase tracking-widest text-xs"
            >
              再玩一次
            </button>
            <button 
              onClick={onBack}
              className="px-6 py-3 bg-slate-700 text-white border border-slate-600 rounded-xl font-bold hover:bg-slate-600 transition uppercase tracking-widest text-xs"
            >
              返回主菜单
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex-grow flex p-6 gap-6 overflow-hidden max-w-7xl mx-auto w-full flex-col md:flex-row">
      {/* Left Sidebar */}
      <aside className="w-full md:w-64 flex flex-col gap-4 flex-shrink-0">
        <div className="bg-slate-800 p-5 rounded-3xl border border-slate-700 flex flex-col gap-4 shadow-xl">
          <h2 className="text-sm font-bold text-indigo-300 uppercase tracking-widest">任务目标</h2>
          <div className="space-y-3">
            <p className="text-xs text-slate-400 leading-relaxed">根据提供的线索识别正确的元素，推进反应堆序列。</p>
            <div className="bg-slate-900/50 rounded-2xl p-3 border border-slate-700/50">
              <div className="flex justify-between items-end mb-2">
                <span className="text-[10px] font-bold text-slate-500">进度</span>
                <span className="text-xs font-mono text-emerald-400">{round}/{maxRounds}</span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${(round/maxRounds)*100}%`}}></div>
              </div>
            </div>
            
            <div className="bg-slate-900/50 rounded-2xl p-3 border border-slate-700/50">
              <div className="flex justify-between items-end mb-1">
                <span className="text-[10px] font-bold text-slate-500">得分</span>
                <span className="text-xs font-mono text-indigo-400">{score}</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Area */}
      <section className="flex-grow flex flex-col gap-4 overflow-hidden">
        <div className="bg-slate-800 rounded-3xl shadow-xl border border-slate-700 p-8 w-full relative overflow-hidden text-center flex flex-col items-center justify-center min-h-[250px]">
          <h2 className="font-bold text-xl flex items-center justify-center gap-3 mb-6">
            <span className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></span>
            识别元素
          </h2>
          
          {currentElement && (
            <div className="flex gap-4 justify-center flex-wrap items-center mb-6 z-10 relative">
              <AnimatePresence>
                  {currentElement.clues.map((clue, idx) => {
                    if (idx > 1) return null; // We only show the first two clues, the 3rd one is often useless
                    return (
                      <motion.div 
                        key={`clue-${idx}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="px-4 py-3 rounded-xl border text-sm font-medium shadow-sm max-w-[200px] text-left bg-slate-900/50 text-slate-300 border-slate-700"
                      >
                        {clue}
                      </motion.div>
                    )
                  })}
                  {showHint && (
                    <motion.div 
                      key="hint-clue"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="px-4 py-3 rounded-xl border text-sm font-medium shadow-lg max-w-[200px] text-left bg-amber-500/20 text-amber-200 border-amber-500/50 flex flex-col gap-1"
                    >
                      <span className="text-[10px] uppercase font-bold text-amber-500/80">额外提示</span>
                      <span>位于第 {currentElement.period} 周期</span>
                      {currentElement.group > 0 && <span>第 {currentElement.group} 族</span>}
                    </motion.div>
                  )}
              </AnimatePresence>
            </div>
          )}

          {!showHint && status === 'playing' && (
            <button 
              onClick={() => setShowHint(true)}
              className="text-amber-400 font-bold text-xs uppercase tracking-widest flex items-center gap-2 mx-auto hover:text-amber-300 hover:bg-slate-800 transition z-10 relative mt-auto bg-slate-900/80 px-5 py-3 rounded-xl border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.1)] active:scale-95"
            >
              <Lightbulb className="w-4 h-4" /> 获得提示 (增加一条有用信息)
            </button>
          )}

          {status === 'correct' && (
             <div className="absolute inset-0 bg-emerald-900/90 flex flex-col items-center justify-center text-white backdrop-blur-sm z-20">
              <CheckCircle2 className="w-20 h-20 mb-4 text-emerald-400" />
              <h3 className="text-3xl font-black uppercase">正确！</h3>
              <p className="mt-2 text-emerald-200 font-medium">它是 {currentElement?.name}</p>
            </div>
          )}

          {status === 'wrong' && (
             <div className="absolute inset-0 bg-rose-900/90 flex flex-col items-center justify-center text-white backdrop-blur-sm z-20">
              <XCircle className="w-20 h-20 mb-4 text-rose-400" />
              <h3 className="text-3xl font-black uppercase">不正确！</h3>
              <p className="mt-2 text-rose-200 font-medium mb-6">它是 {currentElement?.name}</p>
              {!hasRetried ? (
                <button 
                  onClick={handleRetry}
                  className="px-6 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-bold transition-all shadow-lg active:scale-95 border border-rose-400"
                >
                  再给我一次机会
                </button>
              ) : (
                <p className="text-rose-300 text-sm mt-2 font-medium">即将进入下一题...</p>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mt-2">
          {options.map((option) => (
            <button
              key={option.atomicNumber}
              onClick={() => handleGuess(option)}
              disabled={status !== 'playing'}
              className={cn(
                "p-4 rounded-3xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex flex-col items-start justify-between min-h-[120px]",
                status === 'playing' ? "hover:border-indigo-500 hover:bg-slate-700 bg-slate-800 border-slate-700 shadow-lg" : "opacity-50 grayscale bg-slate-800 border-slate-700",
                selectedElement?.atomicNumber === option.atomicNumber && status === 'wrong' && "border-rose-500 bg-rose-500/20 animate-shake opacity-100 grayscale-0",
                selectedElement?.atomicNumber === option.atomicNumber && status === 'correct' && "border-emerald-500 bg-emerald-500/20 scale-105 shadow-md shadow-emerald-500/20 opacity-100 grayscale-0"
              )}
            >
              <div className="text-xs font-bold text-slate-500 mb-1">原子序数 {option.atomicNumber}</div>
              <div className="flex gap-2 items-baseline mb-1">
                 <div className="text-5xl font-black text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.6)] brightness-125">{option.symbol}</div>
              </div>
              <div className="text-xs font-bold text-indigo-300 uppercase tracking-widest truncate w-full text-left">{option.name}</div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
