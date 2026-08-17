import React from 'react';
import { 
  GraduationCap, 
  Sparkles, 
  BookOpen, 
  Compass, 
  Clock, 
  MessageSquare, 
  Globe, 
  Bookmark 
} from 'lucide-react';

export type NavTabType = 'evaluation' | 'database' | 'deadlines' | 'offer_wall' | 'data_center' | 'strategy';

interface HeaderProps {
  activeTab: NavTabType;
  setActiveTab: (tab: NavTabType) => void;
  wishlistCount: number;
  onOpenWishlist: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  activeTab, 
  setActiveTab, 
  wishlistCount, 
  onOpenWishlist 
}) => {
  return (
    <header className="bg-gradient-to-r from-slate-900 via-hk-navy to-slate-900 text-white shadow-xl sticky top-0 z-40 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* 第一行：品牌 Logo 与 愿望单/快捷入口 */}
        <div className="flex items-center justify-between h-16 border-b border-slate-800/60">
          
          {/* Logo & Brand */}
          <div 
            className="flex items-center space-x-2 sm:space-x-3 cursor-pointer select-none" 
            onClick={() => setActiveTab('evaluation')}
          >
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-200 p-0.5 shadow-glow flex items-center justify-center flex-shrink-0">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                <span className="font-bold text-base sm:text-xl tracking-tight text-white font-serif">
                  港校升学通
                </span>
                <span className="text-[10px] sm:text-xs bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.5 rounded-full font-medium">
                  2026/27 实时招生版
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden md:block">
                香港高校硕士/本科智能选校推荐与实时网申数据追踪系统
              </p>
            </div>
          </div>

          {/* 右侧：愿望单入口 & 实时数据徽章 */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onOpenWishlist}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-xs font-bold transition-colors cursor-pointer"
              title="查看我的选校愿望单"
            >
              <Bookmark className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>愿望单</span>
              {wishlistCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black flex items-center justify-center ml-0.5">
                  {wishlistCount}
                </span>
              )}
            </button>
          </div>

        </div>

        {/* 第二行：滚动式导航栏 (全景覆盖 6 大核心模块) */}
        <nav className="flex items-center space-x-1 sm:space-x-2 py-2 overflow-x-auto no-scrollbar text-xs sm:text-sm font-semibold">
          
          <button
            id="tab-evaluation"
            onClick={() => setActiveTab('evaluation')}
            className={`flex items-center space-x-1 sm:space-x-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
              activeTab === 'evaluation'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
            <span>智能择校</span>
          </button>

          <button
            id="tab-database"
            onClick={() => setActiveTab('database')}
            className={`flex items-center space-x-1 sm:space-x-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
              activeTab === 'database'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 flex-shrink-0" />
            <span>港校全景库</span>
          </button>

          <button
            id="tab-deadlines"
            onClick={() => setActiveTab('deadlines')}
            className={`flex items-center space-x-1 sm:space-x-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
              activeTab === 'deadlines'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
            }`}
          >
            <Clock className="w-3.5 h-3.5 flex-shrink-0" />
            <span>实时倒计时</span>
          </button>

          <button
            id="tab-offer-wall"
            onClick={() => setActiveTab('offer_wall')}
            className={`flex items-center space-x-1 sm:space-x-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
              activeTab === 'offer_wall'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 flex-shrink-0" />
            <span>录取案例墙</span>
          </button>

          <button
            id="tab-data-center"
            onClick={() => setActiveTab('data_center')}
            className={`flex items-center space-x-1 sm:space-x-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
              activeTab === 'data_center'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
            }`}
          >
            <Globe className="w-3.5 h-3.5 flex-shrink-0" />
            <span>实时数据中心</span>
          </button>

          <button
            id="tab-strategy"
            onClick={() => setActiveTab('strategy')}
            className={`flex items-center space-x-1 sm:space-x-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
              activeTab === 'strategy'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
            }`}
          >
            <Compass className="w-3.5 h-3.5 flex-shrink-0" />
            <span>申请策略指南</span>
          </button>

        </nav>

      </div>
    </header>
  );
};
