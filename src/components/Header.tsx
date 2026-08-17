import React from 'react';
import { GraduationCap, Sparkles, BookOpen, Compass, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  activeTab: 'evaluation' | 'database' | 'strategy';
  setActiveTab: (tab: 'evaluation' | 'database' | 'strategy') => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="bg-gradient-to-r from-slate-900 via-hk-navy to-slate-900 text-white shadow-xl sticky top-0 z-40 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('evaluation')}>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-200 p-0.5 shadow-glow flex items-center justify-center">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-xl sm:text-2xl tracking-tight text-white font-serif">
                  港校升学通
                </span>
                <span className="text-xs bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full font-medium">
                  2025/2026 最新版
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                香港高校硕士/本科智能选校与录取概率评估系统
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center space-x-1 sm:space-x-2">
            <button
              id="tab-evaluation"
              onClick={() => setActiveTab('evaluation')}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'evaluation'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>智能择校</span>
            </button>

            <button
              id="tab-database"
              onClick={() => setActiveTab('database')}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'database'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>港校库</span>
            </button>

            <button
              id="tab-strategy"
              onClick={() => setActiveTab('strategy')}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'strategy'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>申请策略</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
