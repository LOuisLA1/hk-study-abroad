import React from 'react';
import { 
  Calendar, 
  Clock, 
  DollarSign, 
  Briefcase, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  FileText,
  Compass
} from 'lucide-react';

export const StrategyGuide: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      
      {/* 头部 Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-hk-navy to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold mb-3">
          <Compass className="w-3.5 h-3.5" />
          <span>2025/2026 香港留学官方申请全景通关指南</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold font-serif">
          香港授课型硕士 (Taught Master) 申请策略与时间线
        </h2>
        <p className="text-slate-300 text-sm mt-2 max-w-3xl leading-relaxed">
          香港高校采用英美联审机制与 Rolling（滚动录取，先到先审）制，名额有限，录满即止。掌握科学的投递节奏与文书定位是收获梦校 Offer 的关键。
        </p>
      </div>

      {/* 核心时间线 (Timeline) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center space-x-3">
          <Calendar className="w-6 h-6 text-amber-600" />
          <h3 className="text-xl font-bold font-serif text-slate-900">
            香港硕士标准申请时间规划表 (Timeline)
          </h3>
        </div>

        <div className="relative border-l-2 border-amber-400 ml-4 pl-6 space-y-8">
          
          {/* 阶段 1 */}
          <div className="relative">
            <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-amber-500 border-4 border-white shadow-md" />
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                当年 3 月 - 8 月 · 背景筑基期
              </span>
              <h4 className="text-base font-bold text-slate-900 mt-2">
                GPA 冲刺、语言考分与文书初稿准备
              </h4>
              <ul className="mt-2 space-y-1 text-xs text-slate-600">
                <li>• 刷高大三下学期核心专业课 GPA，确定成绩单与在读证明中英文原件。</li>
                <li>• 备考并锁定雅思（建议 6.5~7.0）或托福成绩，商科同学可适度考取 GMAT/GRE。</li>
                <li>• 寻找 2 位学术推荐人（导师/教授），规划暑期高含金量大厂实习或科研产出。</li>
              </ul>
            </div>
          </div>

          {/* 阶段 2 */}
          <div className="relative">
            <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-amber-600 border-4 border-white shadow-md" />
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                当年 9 月 - 11 月 · 黄金早鸟申请期 (Round 1)
              </span>
              <h4 className="text-base font-bold text-slate-900 mt-2">
                港校申请系统集中开放，第一轮火速递交
              </h4>
              <ul className="mt-2 space-y-1 text-xs text-slate-600">
                <li>• 港大、港科、港中文、港理、港城大等网申系统陆续开放。</li>
                <li>• <strong className="text-amber-700">【重点】</strong>第一轮 (R1) 席位最多、录取概率最高，务必在 10 月底前完成材料上传并缴纳申请费。</li>
                <li>• 部分商科和传媒专业会在 11 月开始发放第一批面试邀请 (Interview)。</li>
              </ul>
            </div>
          </div>

          {/* 阶段 3 */}
          <div className="relative">
            <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-amber-500 border-4 border-white shadow-md" />
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                当年 12 月 - 次年 3 月 · 常规录取与第二轮投递
              </span>
              <h4 className="text-base font-bold text-slate-900 mt-2">
                首批 Offer 雨降临，缴纳留位费 (Deposit)
              </h4>
              <ul className="mt-2 space-y-1 text-xs text-slate-600">
                <li>• 第一轮申请者收到带条件录取 (Conditional Offer)，需在 2-3 周内确认并电汇留位费。</li>
                <li>• 未及早递交的同学抓紧在第二轮 (Round 2) 补投。</li>
              </ul>
            </div>
          </div>

          {/* 阶段 4 */}
          <div className="relative">
            <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-emerald-500 border-4 border-white shadow-md" />
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                次年 4 月 - 8 月 · 签证办理与行前准备
              </span>
              <h4 className="text-base font-bold text-slate-900 mt-2">
                办理学生签证 (Student Visa)、租房与行前体检
              </h4>
              <ul className="mt-2 space-y-1 text-xs text-slate-600">
                <li>• 向香港入境事务处申请进入许可（学生签），办理内地《往来港澳通行证》逗留签 (D签)。</li>
                <li>• 组队预订香港公寓或校外合租房源（如大围、红磡、沙田、坚尼地城等热门留学生区）。</li>
              </ul>
            </div>
          </div>

        </div>
      </div>

      {/* 留学费用与政策福利 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* 留学预算明细 */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 text-slate-900 font-bold text-lg">
            <DollarSign className="w-5 h-5 text-amber-600" />
            <span>香港读硕一年整体预算一览</span>
          </div>

          <div className="space-y-3 text-xs text-slate-600">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
              <div>
                <span className="font-bold text-slate-800 block">商科类学费 (Finance / BA / MBA)</span>
                <span className="text-slate-400">港大/港科商学院相对较高</span>
              </div>
              <span className="font-extrabold text-amber-700 text-sm">30万 - 48万 港币</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
              <div>
                <span className="font-bold text-slate-800 block">理工科 / 计算机 / 数据科学学费</span>
                <span className="text-slate-400">性价比高，多为 1 年制</span>
              </div>
              <span className="font-extrabold text-amber-700 text-sm">20万 - 28万 港币</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
              <div>
                <span className="font-bold text-slate-800 block">人文社科 / 教育 / 理学学费</span>
                <span className="text-slate-400">学费亲民，双非友好</span>
              </div>
              <span className="font-extrabold text-amber-700 text-sm">14万 - 20万 港币</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
              <div>
                <span className="font-bold text-slate-800 block">一年生活费 (租房 + 餐饮 + 日常)</span>
                <span className="text-slate-400">单人房租约 6k-9k/月，合租约 4k-6k/月</span>
              </div>
              <span className="font-extrabold text-slate-800 text-sm">约 10万 - 14万 港币</span>
            </div>
          </div>
        </div>

        {/* IANG 签证与香港身份红利 */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 text-slate-900 font-bold text-lg">
            <Briefcase className="w-5 h-5 text-amber-600" />
            <span>IANG 签证与留港就业 / 身份红利</span>
          </div>

          <div className="space-y-3 text-xs text-slate-600">
            <div className="p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-100 space-y-1">
              <span className="font-bold text-emerald-900 block text-sm">
                🎓 毕业即享 2 年无条件 IANG 留港工作签证
              </span>
              <p className="text-emerald-800 leading-relaxed">
                自香港特区政府最新人才政策实施以来，所有在港修读全日制学位课程的非本地毕业生，毕业后均可直接获得 <strong>2 年无条件居留（IANG 签证）</strong>，无需事先获得雇主聘用。
              </p>
            </div>

            <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-100 space-y-1">
              <span className="font-bold text-blue-900 block text-sm">
                🌟 满 7 年直接申请香港特区永久居民身份
              </span>
              <p className="text-blue-800 leading-relaxed">
                在港就读的 1 年硕士学制计入 7 年连续通常居住时间。毕业后在港工作满 6 年即可申请<strong>香港永久居民身份证 (HKPR)</strong> 及香港特区护照（免签 170+ 国家）。
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <span className="font-bold text-slate-800 block">
                🌏 大湾区与北上广深留学生海归落户福利
              </span>
              <p className="text-slate-500 leading-relaxed">
                香港高校学位受中国教育部留学服务中心 (CSCSE) 100% 官方认证，回国可享受北上广深免租住房补贴、免税购车与直接落户等高规格海归待遇。
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
