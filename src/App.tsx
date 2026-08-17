import React, { useState } from 'react';
import { StudentProfile, RecommendationReport } from './types';
import { generateRecommendations } from './services/recommendationEngine';
import { Header } from './components/Header';
import { EvaluationForm } from './components/EvaluationForm';
import { RecommendationResult } from './components/RecommendationResult';
import { UniversityDatabaseView } from './components/UniversityDatabaseView';
import { StrategyGuide } from './components/StrategyGuide';
import { ExportModal } from './components/ExportModal';
import { GraduationCap, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<'evaluation' | 'database' | 'strategy'>('evaluation');
  const [report, setReport] = useState<RecommendationReport | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showExportModal, setShowExportModal] = useState<boolean>(false);

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
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 主体容器 */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        
        {/* Tab 1: 智能择校评估 */}
        {activeTab === 'evaluation' && (
          <div>
            {!report ? (
              <div className="space-y-8">
                {/* 页面前导 Slogan */}
                <div className="text-center max-w-3xl mx-auto space-y-3">
                  <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-800 border border-amber-500/20 text-xs font-bold shadow-xs">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>港校硕士/本科录取大数据模型驱动</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 font-serif tracking-tight">
                    香港留学智能选校推荐系统
                  </h1>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    精准输入您的<strong className="text-slate-900 font-bold">本科院校背景与 GPA</strong>，系统将秒级匹配港前三、港前五及港八校录取概率，为您量身定制<strong className="text-amber-700 font-bold">冲刺、核心匹配与稳妥保底</strong>三阶选校矩阵。
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

        {/* Tab 3: 申请策略指南 */}
        {activeTab === 'strategy' && <StrategyGuide />}

      </main>

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
          <div className="flex items-center space-x-4 text-slate-400">
            <span>数据基准：2025/2026 QS / 港校官方录取统计</span>
            <span>·</span>
            <span>隐私保护：所有数据均在本地安全计算</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
