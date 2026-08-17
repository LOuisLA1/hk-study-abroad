import React from 'react';
import { GraduationCap, Sparkles, BookOpen, Compass, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  activeTab: 'evaluation' | 'database' | 'strategy';
  setActiveTab: (tab: 'evaluation' | 'database' | 'strategy') => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="bg-gradient-to-r from-slate-900 via-hk-navy to-slate-900 text-white shadow-xl sticky top-0 z-40 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-2 sm:space-x-3 cursor-pointer select-none" onClick={() => setActiveTab('evaluation')}>
            <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-200 p-0.5 shadow-glow flex items-center justify-center flex-shrink-0">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <GraduationCap className="w-5 h-5 sm:w-7 sm:h-7 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                <span className="font-bold text-base sm:text-2xl tracking-tight text-white font-serif">
                  港校升学通
                </span>
                <span className="text-[10px] sm:text-xs bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 sm:px-2 py-0.5 rounded-full font-medium hidden xs:inline-block">
                  2026/27 季
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden md:block">
                香港高校硕士/本科智能选校与录取概率评估系统
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center space-x-1 sm:space-x-2">
            <button
              id="tab-evaluation"
              onClick={() => setActiveTab('evaluation')}
              className={`flex items-center space-x-1 sm:space-x-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'evaluation'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span>智能择校</span>
            </button>

            <button
              id="tab-database"
              onClick={() => setActiveTab('database')}
              className={`flex items-center space-x-1 sm:space-x-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'database'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span>港校库</span>
            </button>

            <button
              id="tab-strategy"
              onClick={() => setActiveTab('strategy')}
              className={`flex items-center space-x-1 sm:space-x-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'strategy'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
              }`}
            >
              <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span>申请策略</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
