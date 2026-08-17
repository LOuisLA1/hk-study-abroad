import React, { useState } from 'react';
import { OfferCase, SchoolTier } from '../types';
import { getStoredOfferCases, saveUserOfferCase, toggleCaseLike } from '../services/dataSyncService';
import { SCHOOL_TIER_META } from '../data/schools';
import { 
  Award, 
  Heart, 
  MessageSquarePlus, 
  Search, 
  Filter, 
  Sparkles, 
  Building2, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Share2, 
  X,
  TrendingUp,
  UserCheck
} from 'lucide-react';

export const LiveOfferWall: React.FC = () => {
  const [cases, setCases] = useState<OfferCase[]>(getStoredOfferCases());
  const [selectedUni, setSelectedUni] = useState<string>('all');
  const [selectedTier, setSelectedTier] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);

  // 提交战报表单状态
  const [formNickname, setFormNickname] = useState<string>('');
  const [formSchool, setFormSchool] = useState<string>('');
  const [formSchoolTier, setFormSchoolTier] = useState<SchoolTier>('regular_985');
  const [formMajor, setFormMajor] = useState<string>('');
  const [formGpa, setFormGpa] = useState<string>('');
  const [formLanguage, setFormLanguage] = useState<string>('');
  const [formGreGmat, setFormGreGmat] = useState<string>('');
  const [formExperience, setFormExperience] = useState<string>('');
  const [formTargetUniCode, setFormTargetUniCode] = useState<string>('HKU');
  const [formTargetMajor, setFormTargetMajor] = useState<string>('');
  const [formRound, setFormRound] = useState<string>('Round 1 (早鸟轮)');
  const [formStatus, setFormStatus] = useState<'offer' | 'interview' | 'waiting' | 'rejection'>('offer');
  const [formNotes, setFormNotes] = useState<string>('');

  const uniNameMap: Record<string, string> = {
    HKU: '香港大学',
    HKUST: '香港科技大学',
    CUHK: '香港中文大学',
    PolyU: '香港理工大学',
    CityU: '香港城市大学',
    HKBU: '香港浸会大学',
    Lingnan: '香港岭南大学',
    EdUHK: '香港教育大学',
    HKMU: '香港都会大学',
    HSUHK: '香港恒生大学'
  };

  const handleLike = (id: string) => {
    toggleCaseLike(id);
    setCases(getStoredOfferCases());
  };

  const handleSubmitCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formSchool || !formMajor || !formTargetMajor) {
      alert('请填写完整的本科院校、专业和目标申请项目信息');
      return;
    }

    const newCase = saveUserOfferCase({
      applicantNickname: formNickname.trim() || '港校申请研友',
      undergradSchool: formSchool.trim(),
      schoolTier: formSchoolTier,
      undergradMajor: formMajor.trim(),
      gpa: formGpa.trim() || '均分 85/100',
      languageScore: formLanguage.trim() || '雅思 6.5',
      greGmat: formGreGmat.trim() || undefined,
      internshipResearch: formExperience.trim() || '实习与项目背景良好',
      targetUniversityCode: formTargetUniCode,
      targetUniversityName: uniNameMap[formTargetUniCode] || formTargetUniCode,
      targetMajor: formTargetMajor.trim(),
      applicationRound: formRound,
      status: formStatus,
      submissionDate: new Date().toISOString().split('T')[0],
      decisionDate: new Date().toISOString().split('T')[0],
      notes: formNotes.trim() || '愿所有港校申请者都能圆梦心仪 Offer！'
    });

    setCases([newCase, ...cases]);
    setShowSubmitModal(false);

    // 重置表单
    setFormNickname('');
    setFormSchool('');
    setFormMajor('');
    setFormGpa('');
    setFormLanguage('');
    setFormGreGmat('');
    setFormExperience('');
    setFormTargetMajor('');
    setFormNotes('');
  };

  const filteredCases = cases.filter(c => {
    const matchesUni = selectedUni === 'all' || c.targetUniversityCode === selectedUni;
    const matchesTier = selectedTier === 'all' || c.schoolTier === selectedTier;
    const matchesStatus = selectedStatus === 'all' || c.status === selectedStatus;
    const matchesSearch = 
      c.undergradSchool.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.undergradMajor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.targetMajor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.applicantNickname.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesUni && matchesTier && matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-fadeIn max-w-7xl mx-auto">
      
      {/* 头部 Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-hk-navy to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>实时港校真实申请战报与录取案例库</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif">
              香港高校录取与拒信真实案例墙
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              汇集 985 / 211 / 双非公办 / 中外合作办学同学的真实 GPA、语言成绩、申请轮次与录取结果，支持申请者实时分享战报与复盘经验。
            </p>
          </div>

          <button
            onClick={() => setShowSubmitModal(true)}
            className="inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-sm shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer flex-shrink-0"
          >
            <MessageSquarePlus className="w-4 h-4 text-slate-950" />
            <span>分享我的申请战报</span>
          </button>
        </div>
      </div>

      {/* 控制器与筛选 */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
          {/* 搜索框 */}
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="搜索本科学校、专业、申请项目..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          </div>

          {/* 目标港校筛选 */}
          <div>
            <select
              value={selectedUni}
              onChange={(e) => setSelectedUni(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none"
            >
              <option value="all">全部申请目标港校</option>
              <option value="HKU">香港大学 (HKU)</option>
              <option value="HKUST">香港科技大学 (HKUST)</option>
              <option value="CUHK">香港中文大学 (CUHK)</option>
              <option value="PolyU">香港理工大学 (PolyU)</option>
              <option value="CityU">香港城市大学 (CityU)</option>
              <option value="HKBU">香港浸会大学 (HKBU)</option>
              <option value="Lingnan">香港岭南大学 (Lingnan)</option>
              <option value="EdUHK">香港教育大学 (EdUHK)</option>
            </select>
          </div>

          {/* 本科背景分类 */}
          <div>
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none"
            >
              <option value="all">全部本科背景层级</option>
              <option value="c9_985">C9 / 顶尖985</option>
              <option value="regular_985">常规 985 高校</option>
              <option value="top_211">211 / 双一流高校</option>
              <option value="strong_dual">强双非 / 省重点 (深大/南邮等)</option>
              <option value="regular_dual">普通双非公办本一/本二</option>
              <option value="sino_foreign">中外合作办学 (西浦/宁诺等)</option>
            </select>
          </div>

          {/* 录取状态筛选 */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none"
            >
              <option value="all">全部结果状态</option>
              <option value="offer">🎉 成功斩获 Offer</option>
              <option value="interview">📨 收到笔试/面试通知</option>
              <option value="rejection">⚠️ 拒信复盘分析</option>
            </select>
          </div>

        </div>
      </div>

      {/* 案例卡片瀑布流 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCases.map((item) => {
          const isOffer = item.status === 'offer';
          const isRejection = item.status === 'rejection';
          const isInterview = item.status === 'interview';

          return (
            <div 
              key={item.id}
              className={`bg-white rounded-2xl border p-5 sm:p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4 ${
                isOffer 
                  ? 'border-emerald-200/90' 
                  : isRejection 
                  ? 'border-rose-200/90 bg-rose-50/10' 
                  : 'border-blue-200/90'
              }`}
            >
              <div className="space-y-3">
                {/* 头部：昵称与状态徽章 */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <span className="font-bold text-sm text-slate-900">
                        {item.applicantNickname}
                      </span>
                      {item.isUserSubmitted && (
                        <span className="text-[10px] bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded font-bold">
                          实时新增
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-400 font-medium">
                      {item.undergradSchool} · {item.undergradMajor}
                    </span>
                  </div>

                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                    isOffer 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                      : isRejection 
                      ? 'bg-rose-50 text-rose-700 border-rose-200' 
                      : 'bg-blue-50 text-blue-700 border-blue-200'
                  }`}>
                    {isOffer ? '🎉 录取 Offer' : isRejection ? '❌ 遗憾拒信' : '📨 面试在审'}
                  </span>
                </div>

                {/* 目标申请院校与项目 */}
                <div className="p-3 bg-slate-900 text-white rounded-xl space-y-1">
                  <div className="flex items-center justify-between text-xs text-amber-300 font-bold font-mono">
                    <span>{item.targetUniversityName} ({item.targetUniversityCode})</span>
                    <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">
                      {item.applicationRound}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-white">
                    {item.targetMajor}
                  </h4>
                </div>

                {/* 硬核三维条件 */}
                <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div>
                    <span className="text-slate-400 text-[10px] block">学分绩点 (GPA)</span>
                    <span className="font-bold text-amber-800">{item.gpa}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">语言成绩</span>
                    <span className="font-bold text-blue-800">{item.languageScore}</span>
                  </div>
                  {item.greGmat && (
                    <div className="col-span-2">
                      <span className="text-slate-400 text-[10px] block">GMAT / GRE</span>
                      <span className="font-bold text-purple-800">{item.greGmat}</span>
                    </div>
                  )}
                  <div className="col-span-2">
                    <span className="text-slate-400 text-[10px] block">实习与科研产出</span>
                    <span className="text-slate-700 font-medium">{item.internshipResearch}</span>
                  </div>
                </div>

                {/* 经验贴士或拒信复盘 */}
                {item.notes && (
                  <p className="text-xs text-slate-600 bg-amber-50/50 p-3 rounded-lg border border-amber-100/70 leading-relaxed">
                    💡 <strong className="text-amber-900">录取复盘：</strong>{item.notes}
                  </p>
                )}
              </div>

              {/* 底部互动：点赞与时间 */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span className="text-[11px]">递交：{item.submissionDate}</span>
                <button
                  onClick={() => handleLike(item.id)}
                  className="flex items-center space-x-1 px-2.5 py-1 rounded-lg hover:bg-rose-50 text-slate-500 hover:text-rose-600 transition-colors cursor-pointer"
                >
                  <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                  <span className="font-bold text-slate-700">{item.likesCount}</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* 提交战报弹窗 */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl overflow-hidden border border-slate-200 my-6">
            
            {/* 弹窗头部 */}
            <div className="p-5 sm:p-6 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MessageSquarePlus className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-lg font-serif">
                  分享您的港校申请战报与录取经历
                </h3>
              </div>
              <button
                onClick={() => setShowSubmitModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 提交表单 */}
            <form onSubmit={handleSubmitCase} className="p-5 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">您的称呼 / 昵称</label>
                  <input
                    type="text"
                    value={formNickname}
                    onChange={(e) => setFormNickname(e.target.value)}
                    placeholder="例如：浙大金融学弟、深大计算机"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">本科院校背景 <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    required
                    value={formSchool}
                    onChange={(e) => setFormSchool(e.target.value)}
                    placeholder="例如：中山大学、深圳大学"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">本科院校层级</label>
                  <select
                    value={formSchoolTier}
                    onChange={(e) => setFormSchoolTier(e.target.value as SchoolTier)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="c9_985">C9 / 顶尖985</option>
                    <option value="regular_985">常规 985 高校</option>
                    <option value="top_211">头部 211 / 双一流</option>
                    <option value="strong_dual">强双非 / 省重点院校</option>
                    <option value="regular_dual">普通双非公办本科</option>
                    <option value="sino_foreign">中外合作办学高校</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">本科就读专业 <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    required
                    value={formMajor}
                    onChange={(e) => setFormMajor(e.target.value)}
                    placeholder="例如：软件工程、财务管理"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">学分绩点 (GPA)</label>
                  <input
                    type="text"
                    value={formGpa}
                    onChange={(e) => setFormGpa(e.target.value)}
                    placeholder="例如：86.5/100 或 3.65/4.0"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">语言考试成绩</label>
                  <input
                    type="text"
                    value={formLanguage}
                    onChange={(e) => setFormLanguage(e.target.value)}
                    placeholder="例如：雅思 7.0 (小分6.0) 或 六级 520"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">目标申请香港高校</label>
                  <select
                    value={formTargetUniCode}
                    onChange={(e) => setFormTargetUniCode(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="HKU">香港大学 (HKU)</option>
                    <option value="HKUST">香港科技大学 (HKUST)</option>
                    <option value="CUHK">香港中文大学 (CUHK)</option>
                    <option value="PolyU">香港理工大学 (PolyU)</option>
                    <option value="CityU">香港城市大学 (CityU)</option>
                    <option value="HKBU">香港浸会大学 (HKBU)</option>
                    <option value="Lingnan">香港岭南大学 (Lingnan)</option>
                    <option value="EdUHK">香港教育大学 (EdUHK)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">申请专业项目 <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    required
                    value={formTargetMajor}
                    onChange={(e) => setFormTargetMajor(e.target.value)}
                    placeholder="例如：金融学 MFin、计算机科学 MSc CS"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">申请轮次</label>
                  <input
                    type="text"
                    value={formRound}
                    onChange={(e) => setFormRound(e.target.value)}
                    placeholder="例如：Round 1 (早鸟轮)"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">最终结果状态</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="offer">🎉 斩获带条件 / 正式 Offer</option>
                    <option value="interview">📨 收到面试 / 笔试通知</option>
                    <option value="waiting">⏳ 正在审理中 (Under Review)</option>
                    <option value="rejection">❌ 收到拒信 (Unsuccessful)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">实习 / 科研 / 竞赛经历补充</label>
                <input
                  type="text"
                  value={formExperience}
                  onChange={(e) => setFormExperience(e.target.value)}
                  placeholder="例如：2段券商实习 + 1篇SCI三作 + 美赛一等奖"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">经验复盘与给研友的建议</label>
                <textarea
                  rows={3}
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  placeholder="分享您的面试真题、文书写作思路或时间规划心得..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                >
                  取消
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold transition-colors shadow cursor-pointer"
                >
                  立即发布战报
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
