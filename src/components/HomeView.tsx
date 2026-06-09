import React from 'react';
import { Beaker, FlaskConical, Atom } from 'lucide-react';
import { motion } from 'motion/react';

interface HomeViewProps {
  onSelectQuiz: () => void;
  onSelectSynthesis: () => void;
  onSelectPeriodicTable: () => void;
}

export function HomeView({ onSelectQuiz, onSelectSynthesis, onSelectPeriodicTable }: HomeViewProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto px-4 h-full">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-16"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Atom className="w-16 h-16 text-indigo-500 animate-[spin_10s_linear_infinite]" />
        </div>
        <h1 className="text-5xl font-black tracking-tight text-white mb-2 uppercase">元素探秘</h1>
        <p className="text-xs text-indigo-400 font-bold tracking-widest uppercase">
          掌握化学 &bullet; 实验教学
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={onSelectQuiz}
          className="bg-slate-800 border border-slate-700 p-8 rounded-3xl text-left hover:border-indigo-500 hover:bg-slate-800/80 transition-all group flex flex-col focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-xl"
        >
          <div className="bg-indigo-600 p-4 rounded-2xl w-fit mb-6 text-white group-hover:scale-110 transition-transform shadow-lg shadow-indigo-500/20">
            <Atom className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">元素测验</h2>
          <p className="text-slate-400 mb-6 font-medium flex-1 text-sm leading-relaxed">
            在隔离舱中，通过原子线索和属性测试你对元素的了解。
          </p>
          <div className="text-indigo-400 font-bold text-xs tracking-widest uppercase flex items-center gap-2 group-hover:text-indigo-300">
            开始学习 <span className="text-lg">&rarr;</span>
          </div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={onSelectSynthesis}
          className="bg-slate-800 border border-slate-700 p-8 rounded-3xl text-left hover:border-emerald-500 hover:bg-slate-800/80 transition-all group flex flex-col focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xl"
        >
          <div className="bg-emerald-600 p-4 rounded-2xl w-fit mb-6 text-white group-hover:scale-110 transition-transform shadow-lg shadow-emerald-500/20">
            <Beaker className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">化合物合成</h2>
          <p className="text-slate-400 mb-6 font-medium flex-1 text-sm leading-relaxed">
            在反应堆中组合元素，合成水、盐和复杂分子。
          </p>
          <div className="text-emerald-400 font-bold text-xs tracking-widest uppercase flex items-center gap-2 group-hover:text-emerald-300">
            开始合成 <span className="text-lg">&rarr;</span>
          </div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={onSelectPeriodicTable}
          className="bg-slate-800 border border-slate-700 p-8 rounded-3xl text-left hover:border-blue-500 hover:bg-slate-800/80 transition-all group flex flex-col focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xl"
        >
          <div className="bg-blue-600 p-4 rounded-2xl w-fit mb-6 text-white group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/20">
            <FlaskConical className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">元素周期表</h2>
          <p className="text-slate-400 mb-6 font-medium flex-1 text-sm leading-relaxed">
            查看完整的交互式元素周期表，具有3D模型和详细属性。
          </p>
          <div className="text-blue-400 font-bold text-xs tracking-widest uppercase flex items-center gap-2 group-hover:text-blue-300">
            查看表格 <span className="text-lg">&rarr;</span>
          </div>
        </motion.button>
      </div>
    </div>
  );
}
