import React, { useState } from 'react';
import { RecommendationReport, RecommendationTier } from '../types';
import { SCHOOL_TIER_META } from '../data/schools';
import { ProfileRadar } from './ProfileRadar';
import { RecommendationCard } from './RecommendationCard';
import { 
  Sparkles, 
  ArrowLeft, 
  Download, 
  Printer, 
  Share2, 
  TrendingUp, 
  ShieldCheck, 
  Target, 
  Rocket, 
  GraduationCap, 
  Check,
  Zap,
  Info
} from 'lucide-react';

interface ResultProps {
  report: RecommendationReport;
  onReset: () => void;
  onOpenExport: () => void;
}

export const RecommendationResult: React.FC<ResultProps> = ({ report, onReset, onOpenExport }) => {
  const [activeTierFilter, setActiveTierFilter] = useState<'all' | RecommendationTier>('all');
  const [copied, setCopied] = useState<boolean>(false);

  const { profile, overallScore, radarDimensions, reachList, matchList, safetyList, aiBoostTips } = report;
  const schoolMeta = SCHOOL_TIER_META[profile.schoolTier];

  const totalRecommended = reachList.length + matchList.length + safetyList.length;

  const handleCopySummary = () => {
    const text = `【港校升学通 - 智能选校推荐方案】\n` +
      `学生背景：${profile.schoolName} (${schoolMeta?.label}) | GPA: ${profile.gpa}/${profile.gpaScale} (折合${profile.normalizedGPA100}分)\n` +
      `综合竞争力得分：${overallScore}分 / 100\n\n` +
      `🚀 冲刺院校 (${reachList.length}所)：${reachList.map(r => `${r.university.nameZh} (概率${r.admissionChancePercentage}%)`).join('、') || '无'}\n` +
      `🎯 核心匹配 (${matchList.length}所)：${matchList.map(r => `${r.university.nameZh} (概率${r.admissionChancePercentage}%)`).join('、') || '无'}\n` +
      `🛡️ 稳妥保底 (${safetyList.length}所)：${safetyList.map(r => `${r.university.nameZh} (概率${r.admissionChancePercentage}%)`).join('、') || '无'}`;
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      
      {/* 顶部操作条 */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-sm">
        <button
          onClick={onReset}
          className="inline-flex items-center justify-center space-x-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-amber-600 transition-colors py-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>修改背景条件重新评估</span>
        </button>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <button
            onClick={handleCopySummary}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center space-x-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? '已复制' : '复制摘要'}</span>
          </button>

          <button
            onClick={onOpenExport}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center space-x-1.5 px-3.5 sm:px-4 py-2 text-xs font-bold rounded-xl bg-slate-900 hover:bg-slate-800 text-white shadow-md transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>导出报告 (PDF)</span>
          </button>
        </div>
      </div>

      {/* 学生综合竞争力画像看板 */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-slate-900 via-hk-navy to-slate-900 p-4 sm:p-8 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-center">
            
            {/* 左侧：得分与画像 */}
            <div className="lg:col-span-2 space-y-3 sm:space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>评估结果已生成</span>
              </div>

              <h2 className="text-xl sm:text-3xl font-extrabold font-serif">
                {profile.schoolName} · 升学竞争力评估
              </h2>

              {/* 学生基础标签 */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
                <span className="bg-slate-800/90 text-slate-200 px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-medium border border-slate-700">
                  🏫 {schoolMeta?.label}
                </span>
                <span className="bg-slate-800/90 text-amber-300 px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-bold border border-slate-700">
                  📊 GPA: {profile.gpa}/{profile.gpaScale} ({profile.normalizedGPA100}分)
                </span>
                <span className="bg-slate-800/90 text-sky-300 px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-medium border border-slate-700">
                  🗣️ {profile.languageType === 'none' ? '语言备考中' : `${profile.languageType.toUpperCase()}: ${profile.languageScore}`}
                </span>
                <span className="bg-slate-800/90 text-emerald-300 px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-medium border border-slate-700">
                  💼 实习{profile.internshipCount}段 · 科研{profile.researchCount}项
                </span>
              </div>

              {/* 分数条 */}
              <div className="pt-2">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="text-3xl sm:text-5xl font-black text-amber-400 font-serif">
                    {overallScore}
                  </span>
                  <span className="text-slate-400 text-xs sm:text-sm font-semibold">/ 100 综合竞争力指数</span>
                  <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 font-bold">
                    {overallScore >= 88 ? '卓越 (港前三有力冲击者)' : overallScore >= 80 ? '优秀 (港前五核心主力)' : '良好 (港八校稳扎稳打)'}
                  </span>
                </div>
              </div>

            </div>

            {/* 右侧：五维能力雷达图 */}
            <div className="bg-slate-800/50 backdrop-blur-sm p-3 sm:p-4 rounded-2xl border border-slate-700/60 flex flex-col items-center justify-center">
              <span className="text-[11px] sm:text-xs font-bold text-slate-300 mb-1">
                多维背景实力雷达分布
              </span>
              <ProfileRadar dimensions={radarDimensions} />
            </div>

          </div>
        </div>

        {/* 梯度数量统计条 */}
        <div className="bg-slate-50 border-t border-slate-200 px-2 sm:px-6 py-3 sm:py-4 grid grid-cols-3 divide-x divide-slate-200 text-center select-none">
          <div 
            onClick={() => setActiveTierFilter(activeTierFilter === 'reach' ? 'all' : 'reach')}
            className="cursor-pointer hover:bg-slate-100/80 p-1.5 sm:p-2 rounded-xl transition-colors"
          >
            <div className="text-[11px] sm:text-xs text-slate-500 font-semibold flex items-center justify-center space-x-1">
              <Rocket className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-purple-600 flex-shrink-0" />
              <span>冲刺档</span>
            </div>
            <div className="text-lg sm:text-2xl font-black text-purple-700 mt-0.5">
              {reachList.length} <span className="text-[10px] sm:text-xs font-normal text-slate-400">所</span>
            </div>
          </div>

          <div 
            onClick={() => setActiveTierFilter(activeTierFilter === 'match' ? 'all' : 'match')}
            className="cursor-pointer hover:bg-slate-100/80 p-1.5 sm:p-2 rounded-xl transition-colors"
          >
            <div className="text-[11px] sm:text-xs text-slate-500 font-semibold flex items-center justify-center space-x-1">
              <Target className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-600 flex-shrink-0" />
              <span>核心匹配</span>
            </div>
            <div className="text-lg sm:text-2xl font-black text-blue-700 mt-0.5">
              {matchList.length} <span className="text-[10px] sm:text-xs font-normal text-slate-400">所</span>
            </div>
          </div>

          <div 
            onClick={() => setActiveTierFilter(activeTierFilter === 'safety' ? 'all' : 'safety')}
            className="cursor-pointer hover:bg-slate-100/80 p-1.5 sm:p-2 rounded-xl transition-colors"
          >
            <div className="text-[11px] sm:text-xs text-slate-500 font-semibold flex items-center justify-center space-x-1">
              <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600 flex-shrink-0" />
              <span>稳妥保底</span>
            </div>
            <div className="text-lg sm:text-2xl font-black text-emerald-700 mt-0.5">
              {safetyList.length} <span className="text-[10px] sm:text-xs font-normal text-slate-400">所</span>
            </div>
          </div>
        </div>

      </div>

      {/* 梯度选校列表 */}
      <div className="space-y-8">
        
        {/* 1. 冲刺档 */}
        {(activeTierFilter === 'all' || activeTierFilter === 'reach') && reachList.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                🚀
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  冲刺档院校 (Reach) · 建议投递 1-2 所
                </h3>
                <p className="text-xs text-slate-500">
                  录取几率约 20%~45%，建议作为上限冲刺，尽早投递 Round 1 并精修文书
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reachList.map(item => (
                <RecommendationCard key={item.university.id} result={item} />
              ))}
            </div>
          </section>
        )}

        {/* 2. 核心匹配档 */}
        {(activeTierFilter === 'all' || activeTierFilter === 'match') && matchList.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                🎯
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  核心匹配院校 (Match) · 主力申请 2-3 所
                </h3>
                <p className="text-xs text-slate-500">
                  录取几率约 50%~80%，各项指标高度契合，是录取的绝对主力池
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchList.map(item => (
                <RecommendationCard key={item.university.id} result={item} />
              ))}
            </div>
          </section>
        )}

        {/* 3. 稳妥保底档 */}
        {(activeTierFilter === 'all' || activeTierFilter === 'safety') && safetyList.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                🛡️
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  稳妥保底院校 (Safety) · 稳健兜底 1-2 所
                </h3>
                <p className="text-xs text-slate-500">
                  录取几率 &gt; 80%，门槛要求完全达标，确保录取不滑档
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {safetyList.map(item => (
                <RecommendationCard key={item.university.id} result={item} />
              ))}
            </div>
          </section>
        )}

      </div>

      {/* AI 背景提升与提分策略 */}
      <div className="bg-gradient-to-br from-amber-50/70 via-white to-amber-50/40 p-6 sm:p-8 rounded-3xl border border-amber-200/80 shadow-sm space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shadow-md">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 font-serif">
              AI 专家背景提升与提分策略
            </h3>
            <p className="text-xs text-slate-500">
              如果进行以下针对性提升，您的录取梯度将发生质的跃升
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {aiBoostTips.map((tip, idx) => (
            <div 
              key={idx}
              className="bg-white p-5 rounded-2xl border border-amber-200/60 shadow-sm hover:shadow-md transition-shadow space-y-2"
            >
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-bold text-slate-900 text-sm flex items-center space-x-1.5">
                  <TrendingUp className="w-4 h-4 text-amber-600" />
                  <span>{tip.title}</span>
                </h4>
                <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex-shrink-0">
                  {tip.impact}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {tip.description}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
