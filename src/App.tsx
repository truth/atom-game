import React, { useState } from 'react';
import { HomeView } from './components/HomeView';
import { QuizView } from './components/QuizView';
import { SynthesisView } from './components/SynthesisView';
import { PeriodicTableView } from './components/PeriodicTableView';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'quiz' | 'synthesis' | 'periodic-table'>('home');

  return (
    <div className="h-[100dvh] w-full bg-slate-900 text-slate-100 font-sans flex flex-col overflow-hidden select-none">
      <header className="h-20 border-b border-slate-700 bg-slate-800/50 flex items-center justify-between px-8 flex-shrink-0">
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => setCurrentView('home')}>
          <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center font-bold text-2xl shadow-lg shadow-indigo-500/20">EQ</div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-black tracking-tight uppercase">元素探秘</h1>
            <p className="text-xs text-indigo-400 font-bold tracking-widest">掌握化学</p>
          </div>
        </div>
        
        <div className="flex gap-4 sm:gap-8 items-center">
          <div className="text-center hidden sm:block">
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">当前关卡</p>
            <p className="text-lg font-mono text-emerald-400">
                {currentView === 'home' ? '01: 主菜单' : currentView === 'quiz' ? '02: 测验实验室' : currentView === 'synthesis' ? '03: 合成实验室' : '04: 资料库'}
            </p>
          </div>
          <div className="h-10 w-px bg-slate-700 hidden sm:block"></div>
          {currentView !== 'home' && (
            <button 
              onClick={() => setCurrentView('home')}
              className="bg-rose-500 hover:bg-rose-600 px-4 sm:px-6 py-2 rounded-full font-bold text-sm transition-colors shadow-lg shadow-rose-500/20 uppercase"
            >
              退出实验室
            </button>
          )}
        </div>
      </header>

      <main className="flex-grow flex overflow-hidden">
        {currentView === 'home' && (
          <HomeView 
            onSelectQuiz={() => setCurrentView('quiz')}
            onSelectSynthesis={() => setCurrentView('synthesis')}
            onSelectPeriodicTable={() => setCurrentView('periodic-table')}
          />
        )}
        
        {currentView === 'quiz' && (
          <QuizView onBack={() => setCurrentView('home')} />
        )}
        
        {currentView === 'synthesis' && (
          <SynthesisView onBack={() => setCurrentView('home')} />
        )}
        
        {currentView === 'periodic-table' && (
          <PeriodicTableView onBack={() => setCurrentView('home')} />
        )}
      </main>

      <footer className="h-10 bg-indigo-900/20 px-8 flex items-center justify-between border-t border-slate-800 text-[10px] font-bold text-slate-500 flex-shrink-0">
        <div className="flex gap-4 sm:gap-6 uppercase tracking-widest">
          <span>版本 2.0.4-Beta</span>
          <span className="text-indigo-500 hidden sm:inline">系统：稳定</span>
        </div>
        <div className="flex gap-4">
          <span className="cursor-pointer hover:text-slate-300">教程</span>
          <span className="cursor-pointer hover:text-slate-300">设置</span>
          <span className="text-slate-400 cursor-pointer hover:text-slate-300">帮助？</span>
        </div>
      </footer>
    </div>
  );
}

