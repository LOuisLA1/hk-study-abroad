import React, { useState, useEffect } from 'react';
import { ApplicationDeadline } from '../types';
import { getAllDeadlines, downloadICalendarEvent } from '../services/dataSyncService';
import { 
  Clock, 
  Calendar, 
  Search, 
  AlertCircle, 
  ExternalLink, 
  CheckCircle2, 
  Download, 
  Sparkles,
  Filter,
  Flame
} from 'lucide-react';

export const LiveDeadlineTracker: React.FC = () => {
  const [deadlines] = useState<ApplicationDeadline[]>(getAllDeadlines());
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [selectedUni, setSelectedUni] = useState<string>('all');
  const [selectedUrgency, setSelectedUrgency] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // 每一秒更新一次实时时钟，驱动倒计时毫秒级跳动
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 计算倒计时天、时、分、秒
  const calculateCountdown = (deadlineStr: string) => {
    const target = new Date(deadlineStr).getTime();
    const now = currentTime.getTime();
    const diff = target - now;

    if (diff <= 0) {
      return { isPassed: true, days: 0, hours: 0, minutes: 0, seconds: 0, totalDays: 0 };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { isPassed: false, days, hours, minutes, seconds, totalDays: days };
  };

  const filteredDeadlines = deadlines.filter(d => {
    const matchesUni = selectedUni === 'all' || d.universityCode === selectedUni;
    const matchesSearch = 
      d.majorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.faculty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.universityName.includes(searchTerm);

    const countdown = calculateCountdown(d.deadlineDate);
    let matchesUrgency = true;
    if (selectedUrgency === 'urgent') {
      matchesUrgency = !countdown.isPassed && countdown.totalDays <= 15;
    } else if (selectedUrgency === 'month') {
      matchesUrgency = !countdown.isPassed && countdown.totalDays <= 30;
    } else if (selectedUrgency === 'open') {
      matchesUrgency = !countdown.isPassed;
    } else if (selectedUrgency === 'passed') {
      matchesUrgency = countdown.isPassed;
    }

    return matchesUni && matchesSearch && matchesUrgency;
  });

  return (
    <div className="space-y-8 animate-fadeIn max-w-7xl mx-auto">
      
      {/* 头部 Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-hk-navy to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold mb-2">
              <Clock className="w-3.5 h-3.5" />
              <span>2026/2027 港校网申实时倒计时看板</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif">
              香港高校硕士申请轮次与截止日实时追踪
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              港校采取 Rolling 滚动录取（先到先审，录满即止）。本模块秒级实时倒数首轮 (Round 1) 及常规轮截止节点，支持一键加入 Apple / Google / Outlook 日历提醒。
            </p>
          </div>

          <div className="bg-slate-800/80 backdrop-blur border border-slate-700 p-4 rounded-2xl text-center min-w-[200px]">
            <span className="text-[11px] text-slate-400 block font-medium">当前系统时间 (UTC+8)</span>
            <span className="text-xl sm:text-2xl font-black text-amber-400 font-mono tracking-tight block mt-0.5">
              {currentTime.toLocaleTimeString('zh-CN', { hour12: false })}
            </span>
            <span className="text-xs text-slate-400 mt-0.5 block">
              {currentTime.toLocaleDateString('zh-CN')}
            </span>
          </div>
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
              placeholder="搜索学院、专业、关键字..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          </div>

          {/* 大学筛选 */}
          <div>
            <select
              value={selectedUni}
              onChange={(e) => setSelectedUni(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none"
            >
              <option value="all">全部香港大学</option>
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

          {/* 紧迫度筛选 */}
          <div>
            <select
              value={selectedUrgency}
              onChange={(e) => setSelectedUrgency(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none"
            >
              <option value="all">全部申请节点</option>
              <option value="open">🟢 开放接受申请中</option>
              <option value="urgent">🔥 紧急倒计时 (&le;15天)</option>
              <option value="month">⏳ 1个月内截止 (&le;30天)</option>
              <option value="passed">⚪ 已截止轮次</option>
            </select>
          </div>

          {/* 统计概览 */}
          <div className="flex items-center justify-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-semibold text-slate-600">
            <span>找到 <strong className="text-amber-800 font-extrabold text-sm mx-1">{filteredDeadlines.length}</strong> 个官方轮次节点</span>
          </div>

        </div>
      </div>

      {/* 倒计时卡片网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDeadlines.map((item) => {
          const cd = calculateCountdown(item.deadlineDate);
          const deadlineObj = new Date(item.deadlineDate);

          return (
            <div 
              key={item.id}
              className={`rounded-2xl border transition-all duration-300 p-5 flex flex-col justify-between space-y-4 shadow-sm hover:shadow-lg ${
                cd.isPassed 
                  ? 'bg-slate-50 border-slate-200 opacity-75' 
                  : cd.days <= 15 
                  ? 'bg-white border-amber-300 ring-2 ring-amber-400/20' 
                  : 'bg-white border-slate-200'
              }`}
            >
              <div>
                {/* 头部：大学代码与轮次标签 */}
                <div className="flex items-start justify-between gap-2 mb-2.5">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-slate-900 text-amber-300 font-mono">
                      {item.universityCode}
                    </span>
                    <span className="font-bold text-sm text-slate-900">
                      {item.universityName}
                    </span>
                  </div>

                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                    cd.isPassed 
                      ? 'bg-slate-200 text-slate-600'
                      : cd.days <= 15 
                      ? 'bg-red-100 text-red-700 animate-pulse'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {cd.isPassed ? '已截止' : cd.days <= 15 ? '🔥 即将截止' : '🟢 申请中'}
                  </span>
                </div>

                {/* 学院与专业 */}
                <div className="space-y-1">
                  <span className="text-[11px] text-slate-500 font-medium block">
                    {item.faculty}
                  </span>
                  <h4 className="font-bold text-sm text-slate-900 leading-snug">
                    {item.majorName}
                  </h4>
                </div>

                {/* 轮次名称 */}
                <div className="mt-3 inline-block text-xs font-bold text-amber-900 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200/80">
                  📅 {item.roundName}
                </div>

                {/* 倒计时看板 (数字跳动) */}
                <div className="mt-4 p-3 bg-slate-900 text-white rounded-xl text-center shadow-inner">
                  {cd.isPassed ? (
                    <span className="text-xs text-slate-400 font-medium">该轮次已于 {deadlineObj.toLocaleDateString('zh-CN')} 截止</span>
                  ) : (
                    <div>
                      <span className="text-[10px] text-amber-400/90 font-bold block mb-1">
                        距离申请截止剩余时间
                      </span>
                      <div className="grid grid-cols-4 gap-1 font-mono font-black text-center">
                        <div className="bg-slate-800/80 rounded p-1">
                          <span className="text-lg text-amber-300">{cd.days}</span>
                          <span className="text-[9px] text-slate-400 block">天</span>
                        </div>
                        <div className="bg-slate-800/80 rounded p-1">
                          <span className="text-lg text-amber-300">{cd.hours}</span>
                          <span className="text-[9px] text-slate-400 block">时</span>
                        </div>
                        <div className="bg-slate-800/80 rounded p-1">
                          <span className="text-lg text-amber-300">{cd.minutes}</span>
                          <span className="text-[9px] text-slate-400 block">分</span>
                        </div>
                        <div className="bg-slate-800/80 rounded p-1">
                          <span className="text-lg text-yellow-400">{cd.seconds}</span>
                          <span className="text-[9px] text-slate-400 block">秒</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 截止时间标注与说明 */}
                <div className="mt-3 text-[11px] text-slate-500 space-y-1">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span>截止时间：{deadlineObj.toLocaleDateString('zh-CN')} 23:59:59</span>
                  </div>
                  {item.notes && (
                    <p className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded border border-slate-100">
                      💡 {item.notes}
                    </p>
                  )}
                </div>
              </div>

              {/* 底部操作按钮：加入日历 & 官方网申入口 */}
              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <button
                  onClick={() => downloadICalendarEvent(item)}
                  className="flex-1 inline-flex items-center justify-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors cursor-pointer"
                  title="下载 .ics 日历提醒文件，支持 iPhone / Mac / Google / Outlook"
                >
                  <Download className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />
                  <span>加入日历 (.ics)</span>
                </button>

                {item.portalUrl && (
                  <a
                    href={item.portalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center space-x-1 px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold transition-colors text-center"
                  >
                    <span>官方网申</span>
                    <ExternalLink className="w-3 h-3 text-slate-900 flex-shrink-0" />
                  </a>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
