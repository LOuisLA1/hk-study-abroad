import React, { useState } from 'react';
import { UniversityMatchResult } from '../types';
import { 
  Award, 
  MapPin, 
  BookOpen, 
  Clock, 
  DollarSign, 
  Languages, 
  CheckCircle2, 
  AlertCircle, 
  Lightbulb, 
  ChevronDown, 
  ChevronUp,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface CardProps {
  result: UniversityMatchResult;
  onSelectUniversity?: () => void;
}

export const RecommendationCard: React.FC<CardProps> = ({ result, onSelectUniversity }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const { university, tier, admissionChancePercentage, recommendedMajors, pros, risksOrChallenges, strategyAdvice } = result;

  // 根据不同梯队设置色彩与徽章
  const getTierBadge = () => {
    switch (tier) {
      case 'reach':
        return {
          label: '🚀 冲刺院校 (Reach)',
          bg: 'bg-purple-50 text-purple-700 border-purple-200',
          barColor: 'bg-purple-600',
          chanceText: 'text-purple-700',
        };
      case 'match':
        return {
          label: '🎯 核心匹配 (Match)',
          bg: 'bg-blue-50 text-blue-700 border-blue-200',
          barColor: 'bg-blue-600',
          chanceText: 'text-blue-700',
        };
      case 'safety':
        return {
          label: '🛡️ 稳妥保底 (Safety)',
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          barColor: 'bg-emerald-600',
          chanceText: 'text-emerald-700',
        };
    }
  };

  const badge = getTierBadge();

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
      
      {/* 卡片头部 */}
      <div className="p-5 sm:p-6 border-b border-slate-100 flex-1">
        
        {/* 第一行：梯队标签与概率 */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className={`text-xs font-bold px-3 py-1 rounded-full border ${badge.bg}`}>
            {badge.label}
          </span>
          <div className="flex items-center space-x-1.5">
            <span className="text-xs text-slate-500 font-medium">预估录取率:</span>
            <span className={`text-lg font-extrabold ${badge.chanceText}`}>
              {admissionChancePercentage}%
            </span>
          </div>
        </div>

        {/* 概率进度条 */}
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-4">
          <div 
            className={`h-full ${badge.barColor} rounded-full transition-all duration-1000 ease-out`}
            style={{ width: `${admissionChancePercentage}%` }}
          />
        </div>

        {/* 学校名称与排名 */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-xl font-bold text-slate-900 font-serif">
                {university.nameZh}
              </h3>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                {university.code}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {university.nameEn}
            </p>
          </div>

          {/* QS 排名徽章 */}
          <div className="text-right flex-shrink-0">
            <div className="inline-flex flex-col items-center justify-center bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded-xl">
              <span className="text-[10px] text-amber-700 font-bold uppercase tracking-wider">QS 世界排名</span>
              <span className="text-base font-extrabold text-amber-900">
                #{university.qsRank2025}
              </span>
            </div>
          </div>
        </div>

        {/* 校训与地理位置 */}
        <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-500 mb-4">
          <div className="flex items-center space-x-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>{university.location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Award className="w-3.5 h-3.5 text-amber-500" />
            <span className="italic">{university.motto}</span>
          </div>
        </div>

        {/* 优势特色标签 */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {university.features.map((feat, idx) => (
            <span 
              key={idx} 
              className="text-[11px] bg-slate-50 text-slate-600 px-2.5 py-1 rounded-md border border-slate-100 font-medium"
            >
              {feat}
            </span>
          ))}
        </div>

        {/* 核心优劣势对比 */}
        <div className="space-y-2 mb-4 bg-slate-50/70 p-3.5 rounded-xl border border-slate-100">
          {pros.slice(0, 2).map((pro, idx) => (
            <div key={idx} className="flex items-start space-x-2 text-xs text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>{pro}</span>
            </div>
          ))}

          {risksOrChallenges.map((risk, idx) => (
            <div key={idx} className="flex items-start space-x-2 text-xs text-rose-700 font-medium">
              <AlertCircle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
              <span>{risk}</span>
            </div>
          ))}
        </div>

        {/* 策略小贴士 */}
        <div className="flex items-start space-x-2 text-xs text-slate-600 bg-amber-50/50 p-3 rounded-lg border border-amber-100/80">
          <Lightbulb className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <span className="leading-relaxed">{strategyAdvice}</span>
        </div>

      </div>

      {/* 折叠区域：推荐专业详情 */}
      {isExpanded && (
        <div className="bg-slate-50 p-5 sm:p-6 border-t border-slate-200/80 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
              <BookOpen className="w-4 h-4 text-amber-600" />
              <span>本专业匹配推荐项目 ({recommendedMajors.length})</span>
            </h4>
            <span className="text-[11px] text-slate-500">
              语言：{university.languageAcceptance.acceptsCET6 ? `支持CET-6 (450+) / 雅思${university.languageAcceptance.ieltsMin}` : `仅雅思${university.languageAcceptance.ieltsMin}+/托福`}
            </span>
          </div>

          <div className="space-y-3">
            {recommendedMajors.map((major) => (
              <div 
                key={major.id}
                className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-sm space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <h5 className="font-bold text-sm text-slate-900">
                        {major.nameZh}
                      </h5>
                      {major.faculty && (
                        <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium truncate max-w-full">
                          {major.faculty}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 font-medium truncate mt-0.5">
                      {major.nameEn}
                    </p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${
                    major.competitivenessLevel === 'extreme' ? 'bg-red-50 text-red-700 border border-red-200' :
                    major.competitivenessLevel === 'high' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                    'bg-slate-100 text-slate-700'
                  }`}>
                    {major.competitivenessLevel === 'extreme' ? '极卷' : major.competitivenessLevel === 'high' ? '高竞争' : '平稳'}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-slate-600 pt-1">
                  <div className="flex items-center space-x-1">
                    <DollarSign className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                    <span className="truncate">{major.tuitionHKD}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span>{major.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1 col-span-2 sm:col-span-1">
                    <Languages className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                    <span className="truncate">{major.minLanguageRequirement}</span>
                  </div>
                </div>

                {/* 申请轮次 */}
                {major.admissionRounds && (
                  <div className="text-[11px] text-amber-800 bg-amber-50/60 px-2.5 py-1 rounded-md border border-amber-100 flex items-start space-x-1 leading-tight">
                    <span className="font-bold flex-shrink-0">📅 轮次：</span>
                    <span className="leading-normal">{major.admissionRounds}</span>
                  </div>
                )}

                {/* 课程亮点 */}
                <div className="flex flex-wrap gap-1 pt-0.5">
                  {major.curriculumHighlights.map((hl, idx) => (
                    <span key={idx} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                      {hl}
                    </span>
                  ))}
                </div>

                {/* 就业去向 */}
                {major.employmentProspects && (
                  <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-100">
                    <span className="font-bold text-slate-700">💼 就业前景：</span>
                    {major.employmentProspects}
                  </div>
                )}

                {/* 官方项目主页与网申入口 */}
                {major.officialUrl && (
                  <div className="pt-1.5 flex justify-end">
                    <a
                      href={major.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center space-x-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-900 border border-amber-500/30 text-[11px] font-bold transition-colors text-center"
                    >
                      <span>🔗 官方项目主页与网申简章</span>
                      <ExternalLink className="w-3 h-3 text-amber-700 flex-shrink-0" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 录取招录提示 */}
          <div className="text-xs text-slate-500 p-3 bg-white rounded-lg border border-slate-200 leading-relaxed">
            <span className="font-semibold text-slate-700">招录偏好分析：</span>
            {university.acceptanceTips}
          </div>
        </div>
      )}

      {/* 底部展开按钮 */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full py-3 px-4 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold border-t border-slate-100 flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
      >
        <span>{isExpanded ? '收起专业详情与招录分析' : `展开查看推荐专业与学费要求 (${recommendedMajors.length}个)`}</span>
        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

    </div>
  );
};
