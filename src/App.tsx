import React, { useState } from 'react';
import { HomeView } from './components/HomeView';
import { QuizView } from './components/QuizView';
import { SynthesisView } from './components/SynthesisView';
import { PeriodicTableView } from './components/PeriodicTableView';
import { MoleculeView } from './components/MoleculeView';
import { X, Settings2, HelpCircle, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'quiz' | 'synthesis' | 'periodic-table' | 'molecule'>('home');
  const [activeModal, setActiveModal] = useState<'tutorial' | 'settings' | 'help' | null>(null);

  const [settings, setSettings] = useState({
    sound: true,
    animations: true,
  });

  return (
    <div className="h-[100dvh] w-full bg-slate-900 text-slate-100 font-sans flex flex-col overflow-hidden select-none relative">
      <header className="h-20 border-b border-slate-700 bg-slate-800/50 flex items-center justify-between px-8 flex-shrink-0">
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => setCurrentView('home')}>
          <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center font-bold text-2xl shadow-lg shadow-indigo-500/20">EQ</div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-black tracking-tight uppercase">元素探秘</h1>
            <p className="text-xs text-indigo-400 font-bold tracking-widest">掌握化学</p>
          </div>
        </div>
        
        <div className="flex gap-4 sm:gap-8 items-center">
          <div className="text-center text-left sm:text-center">
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">当前模式</p>
            <p className="text-sm sm:text-lg font-mono text-emerald-400 truncate max-w-[150px] sm:max-w-none">
                {currentView === 'home' ? '主菜单' : currentView === 'quiz' ? '测验模式' : currentView === 'synthesis' ? '合成模式' : currentView === 'molecule' ? '分子图鉴' : '周期表模式'}
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
            onSelectMolecule={() => setCurrentView('molecule')}
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

        {currentView === 'molecule' && (
          <MoleculeView onBack={() => setCurrentView('home')} />
        )}
      </main>

      <footer className="h-10 bg-indigo-900/20 px-8 flex items-center justify-between border-t border-slate-800 text-[10px] font-bold text-slate-500 flex-shrink-0">
        <div className="flex gap-4 sm:gap-6 uppercase tracking-widest">
          <span>版本 2.0.4-Beta</span>
          <span className="text-indigo-500 hidden sm:inline">系统：稳定</span>
        </div>
        <div className="flex gap-4">
          <span className="cursor-pointer hover:text-slate-300 flex items-center gap-1" onClick={() => setActiveModal('tutorial')}><BookOpen className="w-3 h-3"/>教程</span>
          <span className="cursor-pointer hover:text-slate-300 flex items-center gap-1" onClick={() => setActiveModal('settings')}><Settings2 className="w-3 h-3"/>设置</span>
          <span className="text-slate-400 cursor-pointer hover:text-slate-300 flex items-center gap-1" onClick={() => setActiveModal('help')}><HelpCircle className="w-3 h-3"/>帮助？</span>
        </div>
      </footer>

      <AnimatePresence>
        {activeModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border border-slate-700 rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl relative"
            >
              <button 
                onClick={() => setActiveModal(null)}
                className="absolute top-6 right-6 p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {activeModal === 'tutorial' && (
                <div>
                  <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
                    <div className="p-3 bg-blue-500/20 text-blue-400 rounded-xl">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">使用教程</h2>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
                      <h3 className="font-bold text-emerald-400 mb-2 flex items-center gap-2"><span>1.</span> 探索周期表</h3>
                      <p className="text-sm text-slate-300 leading-relaxed">点击主菜单中的“元素周期表”。你可以点击任意元素查看其详细信息、核外电子排布，甚至可以通过“查看速记歌”使用谐音记忆法来背诵元素。</p>
                    </div>
                    <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
                      <h3 className="font-bold text-indigo-400 mb-2 flex items-center gap-2"><span>2.</span> 元素测试</h3>
                      <p className="text-sm text-slate-300 leading-relaxed">选择“测验模式”进行练习。系统会给出元素的符号或名称，你需要选出正确答案，帮助你巩固记忆。</p>
                    </div>
                    <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
                      <h3 className="font-bold text-rose-400 mb-2 flex items-center gap-2"><span>3.</span> 化合物合成</h3>
                      <p className="text-sm text-slate-300 leading-relaxed">在“合成模式”中，尝试将不同的元素拖放到合成反应堆中。如果它们可以发生反应，你会解锁并记录下新的化合物！</p>
                    </div>
                  </div>
                </div>
              )}

              {activeModal === 'settings' && (
                <div>
                  <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
                    <div className="p-3 bg-purple-500/20 text-purple-400 rounded-xl">
                      <Settings2 className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">系统设置</h2>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
                      <div>
                        <h3 className="font-bold text-slate-200">音效提示</h3>
                        <p className="text-xs text-slate-400 mt-1">合成成功或答题时播放声音</p>
                      </div>
                      <button 
                        onClick={() => setSettings(s => ({ ...s, sound: !s.sound }))}
                        className={`w-12 h-6 rounded-full transition-colors relative ${settings.sound ? 'bg-emerald-500' : 'bg-slate-700'}`}
                      >
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${settings.sound ? 'left-7' : 'left-1'}`} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
                      <div>
                        <h3 className="font-bold text-slate-200">动画效果</h3>
                        <p className="text-xs text-slate-400 mt-1">开启流畅的界面过渡和浮动元素</p>
                      </div>
                      <button 
                        onClick={() => setSettings(s => ({ ...s, animations: !s.animations }))}
                        className={`w-12 h-6 rounded-full transition-colors relative ${settings.animations ? 'bg-emerald-500' : 'bg-slate-700'}`}
                      >
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${settings.animations ? 'left-7' : 'left-1'}`} />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeModal === 'help' && (
                <div>
                  <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
                    <div className="p-3 bg-amber-500/20 text-amber-400 rounded-xl">
                      <HelpCircle className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">帮助中心</h2>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
                      <h3 className="font-bold text-slate-200 mb-1">找不到想合成的化合物？</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">请确保你选择的元素配比是正确的。合成系统目前支持常见的一些基础无机化合物，例如 H2O, NaCl, CO2 等。我们会在后续更新中添加更多配方。</p>
                    </div>
                    <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
                      <h3 className="font-bold text-slate-200 mb-1">生僻字的拼音不对？</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">有些元素是多音字或字形容易混淆。我们在周期表详细信息中提供了辅助记忆，如果发现错误，欢迎提交反馈。</p>
                    </div>
                    <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
                      <h3 className="font-bold text-slate-200 mb-1">联系与反馈</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        如果你有任何建议或发现了 Bug，请通过开发者社区进行反馈。感谢你使用《元素探秘》！
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

