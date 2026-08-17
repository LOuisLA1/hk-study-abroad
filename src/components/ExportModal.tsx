import React from 'react';
import { RecommendationReport } from '../types';
import { SCHOOL_TIER_META } from '../data/schools';
import { X, Printer, Copy, Check, GraduationCap, Sparkles } from 'lucide-react';

interface ExportModalProps {
  report: RecommendationReport;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ report, onClose }) => {
  const [copied, setCopied] = React.useState<boolean>(false);
  const { profile, overallScore, reachList, matchList, safetyList, aiBoostTips } = report;
  const schoolMeta = SCHOOL_TIER_META[profile.schoolTier];

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const lines = [
      `================================================`,
      `香港留学智能选校推荐报告 (Hong Kong Study Abroad)`,
      `生成时间：${new Date(report.timestamp).toLocaleString()}`,
      `================================================`,
      ``,
      `【学生背景画像】`,
      `• 本科院校：${profile.schoolName} (${schoolMeta?.label})`,
      `• 学分绩点：${profile.gpa} / ${profile.gpaScale} (折合百分制 ${profile.normalizedGPA100} 分)`,
      `• 语言成绩：${profile.languageType === 'none' ? '备考中' : `${profile.languageType.toUpperCase()}: ${profile.languageScore}`}`,
      `• 实践背景：${profile.internshipCount} 段专业实习 / ${profile.researchCount} 项科研项目`,
      `• 综合竞争力指数：${overallScore} / 100 分`,
      ``,
      `================================================`,
      `【🚀 冲刺档院校 (Reach - 建议投递 1-2 所)】`,
      ...reachList.map(r => `• ${r.university.nameZh} (${r.university.code}) - 录取概率约 ${r.admissionChancePercentage}% (QS #${r.university.qsRank2025})\n  推荐专业：${r.recommendedMajors.map(m => m.nameZh).join('、')}\n  建议：${r.strategyAdvice}`),
      ``,
      `【🎯 核心匹配院校 (Match - 建议投递 2-3 所)】`,
      ...matchList.map(r => `• ${r.university.nameZh} (${r.university.code}) - 录取概率约 ${r.admissionChancePercentage}% (QS #${r.university.qsRank2025})\n  推荐专业：${r.recommendedMajors.map(m => m.nameZh).join('、')}\n  建议：${r.strategyAdvice}`),
      ``,
      `【🛡️ 稳妥保底院校 (Safety - 建议投递 1-2 所)】`,
      ...safetyList.map(r => `• ${r.university.nameZh} (${r.university.code}) - 录取概率约 ${r.admissionChancePercentage}% (QS #${r.university.qsRank2025})\n  推荐专业：${r.recommendedMajors.map(m => m.nameZh).join('、')}\n  建议：${r.strategyAdvice}`),
      ``,
      `================================================`,
      `【AI 提分与背景强化锦囊】`,
      ...aiBoostTips.map(t => `• 【${t.title}】(${t.impact}): ${t.description}`),
      `================================================`,
    ];

    navigator.clipboard.writeText(lines.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl sm:rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden border border-slate-200 my-4 sm:my-8">
        
        {/* 弹窗头部操作栏 */}
        <div className="p-3 sm:p-6 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
            <h3 className="font-bold text-base sm:text-lg font-serif">
              选校推荐方案报告预览
            </h3>
          </div>

          <div className="flex items-center space-x-1.5 sm:space-x-2">
            <button
              onClick={handleCopyText}
              className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] sm:text-xs font-semibold text-slate-200 flex items-center space-x-1 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? '已复制' : '复制全文'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3 sm:px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-[11px] sm:text-xs font-bold text-slate-950 flex items-center space-x-1 shadow transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>打印 / 存PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 报告正文预览 (打印区域) */}
        <div className="p-4 sm:p-8 space-y-5 sm:space-y-6 max-h-[75vh] overflow-y-auto print:max-h-none print:overflow-visible">
          
          {/* 报告大标题 */}
          <div className="border-b pb-3 sm:pb-4 text-center">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-serif">
              香港高校硕士申请 · 个性化智能选校推荐方案
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              生成日期：{new Date().toLocaleDateString('zh-CN')} · 港校升学通 AI 择校引擎
            </p>
          </div>

          {/* 学员画像信息表 */}
          <div className="bg-slate-50 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              学生基本画像
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 text-xs">
              <div>
                <span className="text-slate-400 block">本科学校</span>
                <span className="font-bold text-slate-900 truncate block">{profile.schoolName}</span>
              </div>
              <div>
                <span className="text-slate-400 block">院校层级</span>
                <span className="font-bold text-slate-900">{schoolMeta?.label}</span>
              </div>
              <div>
                <span className="text-slate-400 block">GPA 绩点</span>
                <span className="font-bold text-amber-700">{profile.gpa}/{profile.gpaScale} ({profile.normalizedGPA100}分)</span>
              </div>
              <div>
                <span className="text-slate-400 block">综合实力得分</span>
                <span className="font-bold text-emerald-700">{overallScore} / 100 分</span>
              </div>
            </div>
          </div>

          {/* 梯度推荐 */}
          <div className="space-y-4">
            {/* 冲刺 */}
            {reachList.length > 0 && (
              <div>
                <div className="text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-lg border border-purple-200 mb-2">
                  🚀 冲刺院校 (Reach - 建议申请 1-2 所)
                </div>
                <div className="space-y-2">
                  {reachList.map(r => (
                    <div key={r.university.id} className="p-3 bg-white border border-slate-200 rounded-xl text-xs">
                      <div className="flex flex-col sm:flex-row sm:justify-between font-bold text-slate-900 gap-1">
                        <span>{r.university.nameZh} ({r.university.nameEn})</span>
                        <span className="text-purple-700">预估概率 {r.admissionChancePercentage}% (QS #{r.university.qsRank2025})</span>
                      </div>
                      <div className="text-slate-500 mt-1">
                        推荐专业：{r.recommendedMajors.map(m => m.nameZh).join('、')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 核心匹配 */}
            {matchList.length > 0 && (
              <div>
                <div className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-lg border border-blue-200 mb-2">
                  🎯 核心匹配院校 (Match - 建议申请 2-3 所)
                </div>
                <div className="space-y-2">
                  {matchList.map(r => (
                    <div key={r.university.id} className="p-3 bg-white border border-slate-200 rounded-xl text-xs">
                      <div className="flex justify-between font-bold text-slate-900">
                        <span>{r.university.nameZh} ({r.university.nameEn})</span>
                        <span className="text-blue-700">预估概率 {r.admissionChancePercentage}% (QS #{r.university.qsRank2025})</span>
                      </div>
                      <div className="text-slate-500 mt-1">
                        推荐专业：{r.recommendedMajors.map(m => m.nameZh).join('、')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 稳妥保底 */}
            {safetyList.length > 0 && (
              <div>
                <div className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200 mb-2">
                  🛡️ 稳妥保底院校 (Safety - 建议申请 1-2 所)
                </div>
                <div className="space-y-2">
                  {safetyList.map(r => (
                    <div key={r.university.id} className="p-3 bg-white border border-slate-200 rounded-xl text-xs">
                      <div className="flex justify-between font-bold text-slate-900">
                        <span>{r.university.nameZh} ({r.university.nameEn})</span>
                        <span className="text-emerald-700">预估概率 {r.admissionChancePercentage}% (QS #{r.university.qsRank2025})</span>
                      </div>
                      <div className="text-slate-500 mt-1">
                        推荐专业：{r.recommendedMajors.map(m => m.nameZh).join('、')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 提分建议 */}
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs space-y-2">
            <span className="font-bold text-amber-900 block">💡 专家提分与背景强化建议：</span>
            {aiBoostTips.map((tip, idx) => (
              <div key={idx} className="text-slate-700">
                • <strong className="text-amber-800">{tip.title}</strong>：{tip.description}
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};
