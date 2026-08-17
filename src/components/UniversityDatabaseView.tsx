import React, { useState } from 'react';
import { HK_UNIVERSITIES } from '../data/universities';
import { MajorCategory, University } from '../types';
import { 
  Building2, 
  MapPin, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  Languages, 
  Search, 
  DollarSign, 
  Clock,
  Filter,
  ExternalLink
} from 'lucide-react';

export const UniversityDatabaseView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedTier, setSelectedTier] = useState<string>('all');
  const [selectedMajorCategory, setSelectedMajorCategory] = useState<string>('all');
  const [onlyAcceptsCET6, setOnlyAcceptsCET6] = useState<boolean>(false);

  const filteredUnis = HK_UNIVERSITIES.filter((uni) => {
    // 搜索词过滤
    const matchesSearch = 
      uni.nameZh.includes(searchTerm) || 
      uni.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      uni.code.toLowerCase().includes(searchTerm.toLowerCase());

    // 梯队过滤
    const matchesTier = selectedTier === 'all' || uni.tierGroup === selectedTier;

    // 六级认可过滤
    const matchesCET6 = !onlyAcceptsCET6 || uni.languageAcceptance.acceptsCET6;

    // 专业分类过滤
    const matchesMajor = selectedMajorCategory === 'all' || 
      uni.majors.some(m => m.category === selectedMajorCategory);

    return matchesSearch && matchesTier && matchesCET6 && matchesMajor;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* 头部介绍 */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 mb-2">
          香港高校全景数据库 (Hong Kong Universities Index)
        </h2>
        <p className="text-slate-500 text-sm max-w-3xl">
          收录香港全部主流公立大学与优质私立高校的最新 QS 排名、强势学科、招录均分基准、学费区间与英语六级/雅思接受政策。
        </p>

        {/* 筛选控制器 */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
          
          {/* 搜索框 */}
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="搜索大学名称 / 代码..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          </div>

          {/* 梯队分类 */}
          <div>
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none"
            >
              <option value="all">全部梯队高校</option>
              <option value="tier1">港前三 (HKU / HKUST / CUHK)</option>
              <option value="tier2">港前五 (CityU / PolyU)</option>
              <option value="tier3">港八校 (HKBU / 岭南 / 教大)</option>
              <option value="tier4">优质私立 (都会 / 恒生 / 树仁)</option>
            </select>
          </div>

          {/* 专业分类筛选 */}
          <div>
            <select
              value={selectedMajorCategory}
              onChange={(e) => setSelectedMajorCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none"
            >
              <option value="all">全部专业方向</option>
              <option value="cs_tech">计算机 / AI / 数据科学</option>
              <option value="business">商科 / 金融 / 管理</option>
              <option value="humanities">传媒 / 人文 / 语言</option>
              <option value="engineering">工科 / 机械 / 电子</option>
              <option value="social_sci">社科 / 经济 / 教育</option>
              <option value="art_design">艺术 / 设计 / 建筑</option>
            </select>
          </div>

          {/* 六级筛选 Toggle */}
          <div className="flex items-center">
            <label className="flex items-center space-x-2 cursor-pointer text-sm font-semibold text-slate-700 select-none">
              <input
                type="checkbox"
                checked={onlyAcceptsCET6}
                onChange={(e) => setOnlyAcceptsCET6(e.target.checked)}
                className="w-4 h-4 text-amber-600 rounded border-slate-300 focus:ring-amber-500 cursor-pointer"
              />
              <span>仅看认可英语六级 (CET-6) 高校</span>
            </label>
          </div>

        </div>
      </div>

      {/* 高校卡片瀑布流 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredUnis.map((uni) => (
          <div 
            key={uni.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all space-y-4"
          >
            {/* 头部：校名与徽章 */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-xl font-bold font-serif text-slate-900">
                    {uni.nameZh}
                  </h3>
                  <span className="text-xs font-bold px-2 py-0.5 bg-slate-100 rounded text-slate-700">
                    {uni.code}
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-medium mt-0.5">{uni.nameEn}</p>
                <div className="flex items-center space-x-1 text-xs text-slate-500 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{uni.location}</span>
                </div>
              </div>

              <div className="text-right flex-shrink-0">
                <div className="bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-xl text-center">
                  <span className="text-[10px] text-amber-700 font-bold block">QS 2025</span>
                  <span className="text-lg font-black text-amber-900">#{uni.qsRank2025}</span>
                </div>
              </div>
            </div>

            {/* 校训 */}
            <div className="text-xs italic text-amber-800 bg-amber-50/60 px-3 py-1.5 rounded-lg border border-amber-100/60">
              校训：{uni.motto}
            </div>

            {/* 标签特色 */}
            <div className="flex flex-wrap gap-1.5">
              {uni.features.map((f, i) => (
                <span key={i} className="text-[11px] bg-slate-50 text-slate-600 px-2 py-0.5 rounded border border-slate-100">
                  {f}
                </span>
              ))}
            </div>

            {/* 语言与 GPA 门槛速查 */}
            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <div>
                <span className="font-bold text-slate-700 block mb-1">语言要求门槛：</span>
                <span className="text-slate-600">
                  雅思 {uni.languageAcceptance.ieltsMin}+ / 托福 {uni.languageAcceptance.toeflMin}+
                </span>
                <div className="mt-1">
                  {uni.languageAcceptance.acceptsCET6 ? (
                    <span className="text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded text-[10px] border border-emerald-200">
                      ✓ 支持六级 ({uni.languageAcceptance.cet6MinScore}+)
                    </span>
                  ) : (
                    <span className="text-slate-400 text-[10px]">
                      ✗ 不接受大学英语六级
                    </span>
                  )}
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-700 block mb-1">建议均分线 (参考)：</span>
                <div className="text-slate-600 space-y-0.5 text-[11px]">
                  <div>985/211: <span className="font-bold text-slate-800">{uni.minGpaRequirement.regular_985}分+</span></div>
                  <div>双非本科: <span className="font-bold text-slate-800">{uni.minGpaRequirement.regular_dual}分+</span></div>
                </div>
              </div>
            </div>

            {/* 热门开设项目 */}
            <div>
              <span className="text-xs font-bold text-slate-900 block mb-2">
                核心代表专业 ({uni.majors.length})：
              </span>
              <div className="space-y-2.5">
                {uni.majors.map(m => (
                  <div key={m.id} className="p-3 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-slate-50 transition-colors shadow-2xs space-y-1.5 text-xs">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center space-x-1.5">
                          <span className="font-bold text-slate-900">{m.nameZh}</span>
                          {m.faculty && (
                            <span className="text-[10px] bg-slate-200/70 text-slate-700 px-1.5 py-0.5 rounded font-medium">
                              {m.faculty}
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-400 block">{m.nameEn}</span>
                      </div>
                      <span className="text-[10px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded font-bold border border-amber-200/60 flex-shrink-0">
                        {m.tuitionHKD}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{m.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Languages className="w-3 h-3 text-blue-500" />
                        <span>{m.minLanguageRequirement}</span>
                      </div>
                    </div>

                    {m.admissionRounds && (
                      <div className="text-[10px] text-slate-600 bg-white p-1.5 rounded border border-slate-200/70">
                        <strong className="text-amber-800">申请轮次：</strong>{m.admissionRounds}
                      </div>
                    )}

                    {m.officialUrl && (
                      <div className="pt-1 flex justify-end">
                        <a
                          href={m.officialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full sm:w-auto inline-flex items-center justify-center space-x-1 text-[11px] font-bold text-amber-800 hover:text-amber-950 bg-white hover:bg-amber-50 px-2.5 py-1 rounded border border-slate-200 shadow-2xs transition-colors text-center"
                        >
                          <span>🔗 官方项目主页与网申简章</span>
                          <ExternalLink className="w-3 h-3 text-amber-600 flex-shrink-0" />
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 招录贴士 */}
            <div className="text-xs text-slate-500 pt-2 border-t border-slate-100 leading-relaxed">
              <span className="font-semibold text-slate-700">招录建议：</span>
              {uni.acceptanceTips}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
