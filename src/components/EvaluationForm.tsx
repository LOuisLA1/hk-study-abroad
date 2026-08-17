import React, { useState } from 'react';
import { 
  StudentProfile, 
  SchoolTier, 
  GPAScale, 
  MajorCategory, 
  LanguageType 
} from '../types';
import { SCHOOL_DATABASE, SCHOOL_TIER_META, SchoolInfo } from '../data/schools';
import { 
  Building2, 
  Calculator, 
  Briefcase, 
  Award, 
  FlaskConical, 
  Languages, 
  Search, 
  Sparkles, 
  ChevronRight,
  TrendingUp,
  HelpCircle
} from 'lucide-react';

interface FormProps {
  onSubmit: (profile: StudentProfile) => void;
  isLoading: boolean;
}

export const EvaluationForm: React.FC<FormProps> = ({ onSubmit, isLoading }) => {
  // 状态管理
  const [schoolName, setSchoolName] = useState<string>('武汉大学');
  const [schoolTier, setSchoolTier] = useState<SchoolTier>('regular_985');
  const [gpaScale, setGpaScale] = useState<GPAScale>('100');
  const [gpa, setGpa] = useState<number>(85);
  const [targetMajor, setTargetMajor] = useState<MajorCategory>('cs_tech');
  const [languageType, setLanguageType] = useState<LanguageType>('ielts');
  const [languageScore, setLanguageScore] = useState<number>(7.0);
  const [internshipCount, setInternshipCount] = useState<number>(2);
  const [researchCount, setResearchCount] = useState<number>(1);
  const [awardsCount, setAwardsCount] = useState<number>(1);

  // 院校搜索与联想提示
  const [searchTerm, setSearchTerm] = useState<string>('武汉大学');
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const filteredSchools = searchTerm.trim() 
    ? SCHOOL_DATABASE.filter(s => s.name.includes(searchTerm.trim())).slice(0, 6)
    : [];

  const handleSelectSchool = (school: SchoolInfo) => {
    setSchoolName(school.name);
    setSearchTerm(school.name);
    setSchoolTier(school.tier);
    setShowSuggestions(false);
  };

  const handleGpaScaleChange = (scale: GPAScale) => {
    setGpaScale(scale);
    if (scale === '100') setGpa(85);
    else if (scale === '4.0') setGpa(3.5);
    else if (scale === '4.3') setGpa(3.7);
    else if (scale === '4.5') setGpa(3.8);
  };

  // 快捷预设模板
  const applyPreset = (type: 'top985' | 'mid211' | 'strongDual') => {
    if (type === 'top985') {
      setSchoolName('浙江大学');
      setSearchTerm('浙江大学');
      setSchoolTier('c9_985');
      setGpaScale('100');
      setGpa(88);
      setTargetMajor('cs_tech');
      setLanguageType('ielts');
      setLanguageScore(7.5);
      setInternshipCount(2);
      setResearchCount(2);
      setAwardsCount(2);
    } else if (type === 'mid211') {
      setSchoolName('北京交通大学');
      setSearchTerm('北京交通大学');
      setSchoolTier('regular_211');
      setGpaScale('100');
      setGpa(84);
      setTargetMajor('business');
      setLanguageType('ielts');
      setLanguageScore(6.5);
      setInternshipCount(2);
      setResearchCount(0);
      setAwardsCount(1);
    } else {
      setSchoolName('深圳大学');
      setSearchTerm('深圳大学');
      setSchoolTier('strong_dual');
      setGpaScale('100');
      setGpa(83);
      setTargetMajor('humanities');
      setLanguageType('cet6');
      setLanguageScore(490);
      setInternshipCount(1);
      setResearchCount(0);
      setAwardsCount(0);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      schoolName: schoolName.trim() || '目标高校',
      schoolTier,
      gpa: Number(gpa),
      gpaScale,
      normalizedGPA100: 0,
      targetMajorCategory: targetMajor,
      languageType,
      languageScore: Number(languageScore),
      internshipCount,
      researchCount,
      awardsCount,
    });
  };

  // GPA 范围限制
  const getGpaLimits = () => {
    switch (gpaScale) {
      case '100': return { min: 60, max: 100, step: 0.5 };
      case '4.0': return { min: 2.0, max: 4.0, step: 0.01 };
      case '4.3': return { min: 2.0, max: 4.3, step: 0.01 };
      case '4.5': return { min: 2.0, max: 4.5, step: 0.01 };
    }
  };

  const gpaLimit = getGpaLimits();

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 overflow-hidden">
      
      {/* 表单头部 */}
      <div className="bg-gradient-to-r from-slate-900 to-hk-navy p-6 sm:p-8 text-white relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI 多维精准选校引擎</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif tracking-tight text-white">
              输入您的背景信息
            </h2>
            <p className="text-slate-300 text-sm mt-1">
              只需提供学校和 GPA，算法将结合最新港校招录数据库测算录取几率
            </p>
          </div>

          {/* 快速体验预设 */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400">快速填入示例：</span>
            <button
              type="button"
              onClick={() => applyPreset('top985')}
              className="text-xs bg-slate-800 hover:bg-slate-700 text-amber-300 px-2.5 py-1.5 rounded-lg border border-slate-700 transition-colors"
            >
              985高分 (清北/浙大)
            </button>
            <button
              type="button"
              onClick={() => applyPreset('mid211')}
              className="text-xs bg-slate-800 hover:bg-slate-700 text-sky-300 px-2.5 py-1.5 rounded-lg border border-slate-700 transition-colors"
            >
              211商科 (均分84)
            </button>
            <button
              type="button"
              onClick={() => applyPreset('strongDual')}
              className="text-xs bg-slate-800 hover:bg-slate-700 text-emerald-300 px-2.5 py-1.5 rounded-lg border border-slate-700 transition-colors"
            >
              双非逆袭 (深大/六级)
            </button>
          </div>
        </div>
      </div>

      {/* 表单内容 */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
        
        {/* 第一部分：院校与背景 */}
        <div>
          <div className="flex items-center space-x-2 text-slate-900 font-bold text-lg mb-4 border-b pb-2">
            <Building2 className="w-5 h-5 text-amber-600" />
            <span>1. 本科院校与背景层级</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* 学校名称搜索 */}
            <div className="relative">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                本科毕业/在读学校 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="input-school-name"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setSchoolName(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  placeholder="例如：武汉大学、浙江大学、深圳大学..."
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all font-medium"
                />
                <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
              </div>

              {/* 自动联想下拉框 */}
              {showSuggestions && filteredSchools.length > 0 && (
                <div className="absolute z-20 w-full mt-1.5 bg-white border border-slate-200 rounded-xl shadow-2xl overflow-hidden divide-y divide-slate-100">
                  {filteredSchools.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleSelectSchool(item)}
                      className="p-3 hover:bg-amber-50 cursor-pointer flex items-center justify-between transition-colors"
                    >
                      <div className="font-semibold text-slate-900 text-sm">
                        {item.name}
                        {item.province && <span className="text-xs text-slate-400 font-normal ml-2">({item.province})</span>}
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium">
                        {item.tierLabel}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 院校所属层级 */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-semibold text-slate-700">
                  院校背景归类 <span className="text-red-500">*</span>
                </label>
                <span className="text-xs text-amber-700 font-medium">
                  {SCHOOL_TIER_META[schoolTier]?.label}
                </span>
              </div>
              <select
                id="select-school-tier"
                value={schoolTier}
                onChange={(e) => setSchoolTier(e.target.value as SchoolTier)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all font-medium"
              >
                {Object.entries(SCHOOL_TIER_META).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value.label} — {value.desc}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 第二部分：学分绩点 (GPA) */}
        <div>
          <div className="flex items-center space-x-2 text-slate-900 font-bold text-lg mb-4 border-b pb-2">
            <Calculator className="w-5 h-5 text-amber-600" />
            <span>2. 本科学分绩点 (GPA)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* 分制选择 */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                绩点计算制式
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['100', '4.0', '4.3', '4.5'] as GPAScale[]).map((scale) => (
                  <button
                    key={scale}
                    type="button"
                    onClick={() => handleGpaScaleChange(scale)}
                    className={`py-2.5 px-3 rounded-xl text-sm font-semibold transition-all border ${
                      gpaScale === scale
                        ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {scale === '100' ? '百分制 (100)' : `${scale} 满分制`}
                  </button>
                ))}
              </div>
            </div>

            {/* GPA 数值输入与滑块 */}
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-slate-700">
                  当前累计 GPA / 均分
                </label>
                <div className="flex items-center space-x-1">
                  <input
                    id="input-gpa-number"
                    type="number"
                    step={gpaLimit.step}
                    min={gpaLimit.min}
                    max={gpaLimit.max}
                    value={gpa}
                    onChange={(e) => setGpa(parseFloat(e.target.value) || 0)}
                    className="w-24 px-3 py-1.5 text-center font-bold text-lg text-amber-700 bg-amber-50 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                  <span className="text-sm font-bold text-slate-500">
                    / {gpaScale === '100' ? '100' : gpaScale}
                  </span>
                </div>
              </div>

              {/* 滑块 */}
              <input
                id="range-gpa-slider"
                type="range"
                min={gpaLimit.min}
                max={gpaLimit.max}
                step={gpaLimit.step}
                value={gpa}
                onChange={(e) => setGpa(parseFloat(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />

              <div className="flex justify-between text-xs text-slate-400 font-medium">
                <span>最低 {gpaLimit.min}</span>
                <span className="text-amber-800 font-semibold">
                  {gpaScale === '100'
                    ? gpa >= 88 ? '🔥 极具竞争力均分 (88+)' : gpa >= 83 ? '✨ 良好均分 (83-87)' : '💡 稳健均分'
                    : gpa >= 3.6 ? '🔥 极具竞争力绩点' : '💡 稳健绩点'}
                </span>
                <span>最高 {gpaLimit.max}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 第三部分：申请目标专业方向 */}
        <div>
          <div className="flex items-center space-x-2 text-slate-900 font-bold text-lg mb-4 border-b pb-2">
            <Briefcase className="w-5 h-5 text-amber-600" />
            <span>3. 目标申请专业方向</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: 'cs_tech', name: '计算机 / AI / 数据', badge: '热门高竞争', tagColor: 'text-amber-700 bg-amber-50' },
              { id: 'business', name: '商科 / 金融 / 经管', badge: '最卷天花板', tagColor: 'text-rose-700 bg-rose-50' },
              { id: 'humanities', name: '传媒 / 人文 / 语言', badge: '港校王牌', tagColor: 'text-indigo-700 bg-indigo-50' },
              { id: 'engineering', name: '电子 / 机械 / 工科', badge: '理工优势', tagColor: 'text-blue-700 bg-blue-50' },
              { id: 'social_sci', name: '社科 / 教育 / 公管', badge: '双非友好', tagColor: 'text-teal-700 bg-teal-50' },
              { id: 'art_design', name: '设计 / 建筑 / 艺术', badge: '看重作品集', tagColor: 'text-purple-700 bg-purple-50' },
              { id: 'science', name: '数学 / 物理 / 理学', badge: '学术强项', tagColor: 'text-cyan-700 bg-cyan-50' },
            ].map((major) => (
              <div
                key={major.id}
                onClick={() => setTargetMajor(major.id as MajorCategory)}
                className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                  targetMajor === major.id
                    ? 'border-amber-500 bg-amber-50/50 shadow-md ring-2 ring-amber-500/20'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${major.tagColor}`}>
                    {major.badge}
                  </span>
                </div>
                <div className="font-bold text-sm text-slate-900 mt-1">
                  {major.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 第四部分：语言成绩与软性背景 */}
        <div>
          <div className="flex items-center space-x-2 text-slate-900 font-bold text-lg mb-4 border-b pb-2">
            <Languages className="w-5 h-5 text-amber-600" />
            <span>4. 语言成绩与实践背景 (加分项)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* 语言类别 */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                语言考试类型
              </label>
              <select
                id="select-language-type"
                value={languageType}
                onChange={(e) => {
                  const val = e.target.value as LanguageType;
                  setLanguageType(val);
                  if (val === 'ielts') setLanguageScore(6.5);
                  else if (val === 'toefl') setLanguageScore(90);
                  else if (val === 'cet6') setLanguageScore(480);
                  else setLanguageScore(0);
                }}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="ielts">雅思 (IELTS - 全港认可)</option>
                <option value="toefl">托福 (TOEFL iBT)</option>
                <option value="cet6">大学英语六级 (CET-6)</option>
                <option value="none">暂未考出 (评估中)</option>
              </select>
            </div>

            {/* 语言成绩分值 */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                总分成绩
              </label>
              <input
                id="input-language-score"
                type="number"
                disabled={languageType === 'none'}
                step={languageType === 'ielts' ? 0.5 : 1}
                value={languageScore}
                onChange={(e) => setLanguageScore(parseFloat(e.target.value) || 0)}
                placeholder={languageType === 'ielts' ? '如 6.5 或 7.0' : languageType === 'toefl' ? '如 90' : '如 480'}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-bold outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50"
              />
            </div>

            {/* 实习经历 */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-semibold text-slate-700">
                  专业实习/工作段数
                </label>
                <span className="text-xs font-bold text-amber-700">{internshipCount} 段</span>
              </div>
              <div className="flex items-center space-x-2">
                {[0, 1, 2, 3].map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setInternshipCount(count)}
                    className={`flex-1 py-2 rounded-lg font-semibold text-sm transition-all border ${
                      internshipCount === count
                        ? 'bg-amber-500 text-slate-950 border-amber-600'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {count === 3 ? '3+段' : `${count}段`}
                  </button>
                ))}
              </div>
            </div>

            {/* 科研/竞赛 */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-semibold text-slate-700">
                  科研项目 / 论文
                </label>
                <span className="text-xs font-bold text-amber-700">{researchCount} 项</span>
              </div>
              <div className="flex items-center space-x-2">
                {[0, 1, 2, 3].map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setResearchCount(count)}
                    className={`flex-1 py-2 rounded-lg font-semibold text-sm transition-all border ${
                      researchCount === count
                        ? 'bg-amber-500 text-slate-950 border-amber-600'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {count === 3 ? '3+项' : `${count}项`}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* 提交按钮 */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-xs text-slate-500">
            <HelpCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>算法实时比对 10 所香港高校及 40+ 热门硕士专业往年真实录取数据</span>
          </div>

          <button
            id="btn-submit-evaluation"
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white font-bold text-base rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 disabled:opacity-60 cursor-pointer"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>智能测算匹配中...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-yellow-200" />
                <span>立即生成择校推荐方案</span>
                <ChevronRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
};
