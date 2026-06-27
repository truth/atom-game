import React, { useState } from 'react';
import { Beaker, FlaskConical, Atom, Dna, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HomeViewProps {
  onSelectQuiz: () => void;
  onSelectSynthesis: () => void;
  onSelectPeriodicTable: () => void;
  onSelectMolecule: () => void;
}

export function HomeView({ onSelectQuiz, onSelectSynthesis, onSelectPeriodicTable, onSelectMolecule }: HomeViewProps) {
  const [showCards, setShowCards] = useState(true);

  // Generate random floating elements for background
  const bgElements = [
    'H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne', 
    'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar', 'K', 'Ca', 
    'Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn',
    'Ga', 'Ge', 'As', 'Se', 'Br', 'Kr', 'Rb', 'Sr', 'Y', 'Zr',
    'Ag', 'Au', 'Pt', 'U', 'Pu'
  ];
  
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto px-4 h-full relative">
      
      {/* Toggle Cards Button */}
      <div className="absolute top-4 right-4 z-50">
        <button 
          onClick={() => setShowCards(!showCards)}
          className="flex items-center gap-2 px-3 py-2 bg-slate-800/80 hover:bg-slate-700 text-slate-300 rounded-full backdrop-blur-md border border-slate-700 shadow-lg transition-colors text-xs font-bold"
        >
          {showCards ? (
            <><EyeOff className="w-4 h-4" /> 隐藏卡片</>
          ) : (
            <><Eye className="w-4 h-4" /> 显示卡片</>
          )}
        </button>
      </div>

      {/* Outer Space Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-slate-950">
        {/* Deep space radial gradient over the whole background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black opacity-80"></div>
        
        {/* Nebula Glows */}
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-indigo-900/10 rounded-full blur-[120px] mix-blend-screen mix-blend-lighten"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-emerald-900/10 rounded-full blur-[100px] mix-blend-screen mix-blend-lighten"></div>
        <div className="absolute top-2/3 left-1/3 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[100px] mix-blend-screen mix-blend-lighten"></div>

        {/* Stars */}
        {Array.from({ length: 50 }).map((_, i) => (
          <div 
            key={`star-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              opacity: Math.random() * 0.8 + 0.2,
              animation: `twinkle ${Math.random() * 4 + 2}s infinite alternate`
            }}
          />
        ))}

        {/* Solar System (Sun + 9 Planets) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 flex items-center justify-center opacity-80 mix-blend-screen">
          {/* Sun */}
          <div className="absolute w-[120px] h-[120px] rounded-full z-0 bg-[radial-gradient(circle_at_center,_#ffffff_0%,_#fef08a_30%,_#f59e0b_70%,_#ea580c_100%)] shadow-[0_0_60px_20px_rgba(253,224,71,0.8),0_0_120px_40px_rgba(245,158,11,0.6),0_0_250px_80px_rgba(234,88,12,0.4)]" />
          
          {[
            { name: 'Mercury', color: 'bg-stone-400', size: 8, distance: 80, speed: 15 },
            { name: 'Venus', color: 'bg-orange-200', size: 14, distance: 130, speed: 25 },
            { name: 'Earth', color: 'bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)]', size: 16, distance: 190, speed: 35 },
            { name: 'Mars', color: 'bg-red-500', size: 12, distance: 250, speed: 45 },
            { name: 'Jupiter', color: 'bg-orange-300', size: 36, distance: 360, speed: 70 },
            { name: 'Saturn', color: 'bg-yellow-200 ring-[6px] ring-yellow-600/30', size: 28, distance: 480, speed: 95 },
            { name: 'Uranus', color: 'bg-cyan-300', size: 20, distance: 580, speed: 130 },
            { name: 'Neptune', color: 'bg-blue-600', size: 18, distance: 680, speed: 170 },
            { name: 'Pluto', color: 'bg-slate-400', size: 6, distance: 760, speed: 220 },
          ].map((planet, i) => (
            <motion.div
              key={planet.name}
              className="absolute rounded-full border border-slate-700/40"
              style={{
                width: planet.distance * 2,
                height: planet.distance * 2,
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration: planet.speed,
                repeat: Infinity,
                ease: "linear",
                delay: -Math.random() * planet.speed // Random starting position
              }}
            >
              <div 
                className={`absolute rounded-full ${planet.color}`}
                style={{
                  width: planet.size,
                  height: planet.size,
                  top: -planet.size / 2,
                  left: '50%',
                  transform: 'translateX(-50%)'
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Decorative Floating Elements */}
        {bgElements.map((el, i) => {

          const size = Math.random() * 40 + 20;
          return (
            <motion.div
              key={i}
              initial={{ 
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), 
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                opacity: 0,
                scale: 0.5,
              }}
              animate={{ 
                y: [null, Math.random() * -200 - 100],
                opacity: [0, 0.8, 0],
                scale: [0.5, 1, 0.5],
                rotate: Math.random() * 360
              }}
              transition={{ 
                duration: Math.random() * 10 + 10, 
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 10
              }}
              className="absolute text-white font-black font-mono border border-slate-400/50 rounded-xl flex items-center justify-center bg-slate-600/40 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] brightness-125"
              style={{ width: size, height: size, fontSize: size * 0.4 }}
            >
              {el}
            </motion.div>
          )
        })}
      </div>

      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-16 relative z-10"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Atom className="w-16 h-16 text-indigo-500 animate-[spin_10s_linear_infinite]" />
        </div>
        <h1 className="text-5xl font-black tracking-tight text-white mb-2 uppercase">元素探秘</h1>
        <p className="text-xs text-indigo-400 font-bold tracking-widest uppercase">
          掌握化学 &bullet; 实验教学
        </p>
      </motion.div>

      <AnimatePresence>
        {showCards && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl"
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={onSelectQuiz}
              className="bg-slate-800 border border-slate-700 p-5 rounded-3xl text-left hover:border-indigo-500 hover:bg-slate-800/90 transition-all group flex flex-col focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-xl hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] z-10"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="bg-indigo-600 p-3 rounded-2xl w-fit text-white group-hover:scale-110 transition-transform shadow-lg shadow-indigo-500/20">
                  <Atom className="w-6 h-6" />
                </div>
                <span className="bg-indigo-900/50 text-indigo-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-indigo-500/30">测验模式</span>
              </div>
              <h2 className="text-xl font-bold text-white mb-2">元素测验</h2>
              <p className="text-slate-400 mb-4 font-medium flex-1 text-sm leading-relaxed">
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
              className="bg-slate-800 border border-slate-700 p-5 rounded-3xl text-left hover:border-emerald-500 hover:bg-slate-800/90 transition-all group flex flex-col focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xl hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] z-10"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="bg-emerald-600 p-3 rounded-2xl w-fit text-white group-hover:scale-110 transition-transform shadow-lg shadow-emerald-500/20">
                  <Beaker className="w-6 h-6" />
                </div>
                <span className="bg-emerald-900/50 text-emerald-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-emerald-500/30">合成模式</span>
              </div>
              <h2 className="text-xl font-bold text-white mb-2">化合物合成</h2>
              <p className="text-slate-400 mb-4 font-medium flex-1 text-sm leading-relaxed">
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
              className="bg-slate-800 border border-slate-700 p-5 rounded-3xl text-left hover:border-blue-500 hover:bg-slate-800/90 transition-all group flex flex-col focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xl hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] z-10"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="bg-blue-600 p-3 rounded-2xl w-fit text-white group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/20">
                  <FlaskConical className="w-6 h-6" />
                </div>
                <span className="bg-blue-900/50 text-blue-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-blue-500/30">查阅模式</span>
              </div>
              <h2 className="text-xl font-bold text-white mb-2">元素周期表</h2>
              <p className="text-slate-400 mb-4 font-medium flex-1 text-sm leading-relaxed">
                查看完整的交互式元素周期表，具有3D模型和详细属性。
              </p>
              <div className="text-blue-400 font-bold text-xs tracking-widest uppercase flex items-center gap-2 group-hover:text-blue-300">
                查阅资料 <span className="text-lg">&rarr;</span>
              </div>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={onSelectMolecule}
              className="bg-slate-800 border border-slate-700 p-5 rounded-3xl text-left hover:border-purple-500 hover:bg-slate-800/90 transition-all group flex flex-col focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-xl hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] z-10"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="bg-purple-600 p-3 rounded-2xl w-fit text-white group-hover:scale-110 transition-transform shadow-lg shadow-purple-500/20">
                  <Dna className="w-6 h-6" />
                </div>
                <span className="bg-purple-900/50 text-purple-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-purple-500/30">图鉴模式</span>
              </div>
              <h2 className="text-xl font-bold text-white mb-2">分子图鉴</h2>
              <p className="text-slate-400 mb-4 font-medium flex-1 text-sm leading-relaxed">
                查看常见化学分子结构式，了解微观世界的构成。
              </p>
              <div className="text-purple-400 font-bold text-xs tracking-widest uppercase flex items-center gap-2 group-hover:text-purple-300">
                查看结构 <span className="text-lg">&rarr;</span>
              </div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
