import React, { useState, useEffect } from 'react';
import { StudentProfile, RecommendationReport } from './types';
import { generateRecommendations } from './services/recommendationEngine';
import { getWishlist } from './services/dataSyncService';
import { Header, NavTabType } from './components/Header';
import { EvaluationForm } from './components/EvaluationForm';
import { RecommendationResult } from './components/RecommendationResult';
import { UniversityDatabaseView } from './components/UniversityDatabaseView';
import { LiveDeadlineTracker } from './components/LiveDeadlineTracker';
import { LiveOfferWall } from './components/LiveOfferWall';
import { DataUpdateCenter } from './components/DataUpdateCenter';
import { StrategyGuide } from './components/StrategyGuide';
import { ExportModal } from './components/ExportModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { GraduationCap, ShieldCheck, Heart, Sparkles, Clock, MessageSquare, Globe } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<NavTabType>('evaluation');
  const [report, setReport] = useState<RecommendationReport | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showExportModal, setShowExportModal] = useState<boolean>(false);
  const [showWishlistDrawer, setShowWishlistDrawer] = useState<boolean>(false);
  const [wishlistCount, setWishlistCount] = useState<number>(0);

  const refreshWishlistCount = () => {
    setWishlistCount(getWishlist().length);
  };

  useEffect(() => {
    refreshWishlistCount();
    // 监听本地存储变更，实时更新愿望单角标
    const handleStorage = () => refreshWishlistCount();
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const handleFormSubmit = (profile: StudentProfile) => {
    setIsLoading(true);
    // 模拟算法计算微延迟，增强沉浸式匹配体验
    setTimeout(() => {
      const generatedReport = generateRecommendations(profile);
      setReport(generatedReport);
      setIsLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 450);
  };

  const handleReset = () => {
    setReport(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100/60 font-sans">
      
      {/* 顶部导航 */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        wishlistCount={wishlistCount}
        onOpenWishlist={() => {
          refreshWishlistCount();
          setShowWishlistDrawer(true);
        }}
      />

      {/* 主体容器 */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10">
        
        {/* Tab 1: 智能择校评估 */}
        {activeTab === 'evaluation' && (
          <div>
            {!report ? (
              <div className="space-y-6 sm:space-y-8">
                {/* 页面前导 Slogan */}
                <div className="text-center max-w-3xl mx-auto space-y-3">
                  <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-800 border border-amber-500/20 text-xs font-bold shadow-xs">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>2026/2027 港校录取大数据模型与实时网申直通</span>
                  </div>
                  <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 font-serif tracking-tight">
                    香港留学智能选校推荐系统
                  </h1>
                  <p className="text-slate-600 text-xs sm:text-base leading-relaxed">
                    精准输入您的<strong className="text-slate-900 font-bold">本科背景与 GPA</strong>，算法秒级匹配港前三、港前五及港八校录取概率，为您定制<strong className="text-amber-700 font-bold">冲刺、核心匹配与稳妥保底</strong>三阶选校矩阵。
                  </p>
                </div>

                {/* 评估表单 */}
                <EvaluationForm onSubmit={handleFormSubmit} isLoading={isLoading} />
              </div>
            ) : (
              /* 评估结果呈现 */
              <RecommendationResult 
                report={report} 
                onReset={handleReset} 
                onOpenExport={() => setShowExportModal(true)} 
              />
            )}
          </div>
        )}

        {/* Tab 2: 港校全景数据库 */}
        {activeTab === 'database' && <UniversityDatabaseView />}

        {/* Tab 3: 实时申请倒计时 */}
        {activeTab === 'deadlines' && <LiveDeadlineTracker />}

        {/* Tab 4: 实时录取案例墙 */}
        {activeTab === 'offer_wall' && <LiveOfferWall />}

        {/* Tab 5: 实时数据中心 */}
        {activeTab === 'data_center' && <DataUpdateCenter />}

        {/* Tab 6: 申请策略指南 */}
        {activeTab === 'strategy' && <StrategyGuide />}

      </main>

      {/* 愿望单侧边抽屉 */}
      <WishlistDrawer
        isOpen={showWishlistDrawer}
        onClose={() => {
          setShowWishlistDrawer(false);
          refreshWishlistCount();
        }}
        onNavigateToEvaluator={() => setActiveTab('evaluation')}
      />

      {/* 导出/打印弹窗 */}
      {showExportModal && report && (
        <ExportModal report={report} onClose={() => setShowExportModal(false)} />
      )}

      {/* 页脚 */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-8 border-t border-slate-800 mt-16 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-slate-300">
            <GraduationCap className="w-5 h-5 text-amber-400" />
            <span className="font-bold font-serif text-white">港校升学通 · HK Study Abroad Recommender</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-400 text-[11px] sm:text-xs">
            <span>数据基准：2026/2027 港校官方研究生院录取统计</span>
            <span>·</span>
            <span>外汇数据：全球外汇公开市场实时同步</span>
            <span>·</span>
            <span>隐私保护：所有背景与自建战报安全本地计算</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
