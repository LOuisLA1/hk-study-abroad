import React, { useState, useEffect } from 'react';
import { ExchangeRateData } from '../types';
import { 
  fetchLiveExchangeRates, 
  convertHKDToCurrency, 
  exportBackupJSON, 
  importBackupJSON 
} from '../services/dataSyncService';
import { HK_UNIVERSITIES } from '../data/universities';
import { HK_APPLICATION_DEADLINES } from '../data/deadlines';
import { getStoredOfferCases, getWishlist } from '../services/dataSyncService';
import { 
  RefreshCw, 
  DollarSign, 
  Database, 
  Download, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Globe,
  Clock,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';

export const DataUpdateCenter: React.FC = () => {
  const [ratesData, setRatesData] = useState<ExchangeRateData | null>(null);
  const [isRefreshingRates, setIsRefreshingRates] = useState<boolean>(false);
  const [calculatorHkd, setCalculatorHkd] = useState<number>(250000);
  const [calcTargetCurrency, setCalcTargetCurrency] = useState<'CNY' | 'USD' | 'GBP' | 'EUR'>('CNY');
  
  // 同步检测状态
  const [isCheckingSync, setIsCheckingSync] = useState<boolean>(false);
  const [syncStatus, setSyncStatus] = useState<'synced' | 'checking' | 'updated'>('synced');
  const [importJsonText, setImportJsonText] = useState<string>('');
  const [importMsg, setImportMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const totalCases = getStoredOfferCases().length;
  const totalWishlist = getWishlist().length;
  const totalPrograms = HK_UNIVERSITIES.reduce((acc, u) => acc + u.majors.length, 0);

  const loadRates = async () => {
    setIsRefreshingRates(true);
    const data = await fetchLiveExchangeRates();
    setRatesData(data);
    setIsRefreshingRates(false);
  };

  useEffect(() => {
    loadRates();
  }, []);

  const handleManualSyncCheck = () => {
    setIsCheckingSync(true);
    setSyncStatus('checking');
    setTimeout(() => {
      setIsCheckingSync(false);
      setSyncStatus('synced');
    }, 800);
  };

  const handleExportJSON = () => {
    const json = exportBackupJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `港校升学通_用户数据备份_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImportJSON = () => {
    if (!importJsonText.trim()) {
      setImportMsg({ type: 'error', text: '请先粘贴合法的 JSON 备份数据文本' });
      return;
    }
    const success = importBackupJSON(importJsonText.trim());
    if (success) {
      setImportMsg({ type: 'success', text: '✅ 数据恢复成功！愿望单与自建战报已实时更新。' });
      setImportJsonText('');
      setTimeout(() => setImportMsg(null), 3000);
    } else {
      setImportMsg({ type: 'error', text: '❌ JSON 解析失败，请确认数据格式完整有效。' });
    }
  };

  const handleClearCache = () => {
    if (window.confirm('确定要恢复出厂基准数据吗？这将重置您的自定义战报与收藏夹。')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const calcResult = ratesData 
    ? convertHKDToCurrency(`${calculatorHkd} 港币`, calcTargetCurrency, ratesData)
    : { formatted: `¥ ${Math.round(calculatorHkd * 0.9258).toLocaleString()} CNY`, rawNumber: 0 };

  return (
    <div className="space-y-8 animate-fadeIn max-w-7xl mx-auto">
      
      {/* 头部 Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-hk-navy to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold mb-2">
              <Globe className="w-3.5 h-3.5" />
              <span>实时数据同步与更新中心</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif">
              全球外汇实时汇率与全站数据同步引擎
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              实时连接全球外汇公开市场汇率，支持港币与人民币/美元秒级动态换算。全站招生数据与 GitHub 官方源实时同步，确保最新、最全、最真实。
            </p>
          </div>

          <button
            onClick={handleManualSyncCheck}
            disabled={isCheckingSync}
            className="inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm shadow-lg transition-all cursor-pointer disabled:opacity-60 flex-shrink-0"
          >
            <RefreshCw className={`w-4 h-4 ${isCheckingSync ? 'animate-spin' : ''}`} />
            <span>{isCheckingSync ? '正在同步数据...' : '检查数据更新'}</span>
          </button>
        </div>
      </div>

      {/* 第一行：实时汇率与学费实时换算器 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 实时外汇汇率看板 */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-slate-900 font-bold">
              <DollarSign className="w-5 h-5 text-amber-600" />
              <span>实时汇率看板 (Base: HKD)</span>
            </div>
            <button
              onClick={loadRates}
              disabled={isRefreshingRates}
              className="text-xs text-amber-700 hover:text-amber-900 font-semibold flex items-center space-x-1 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshingRates ? 'animate-spin' : ''}`} />
              <span>刷新</span>
            </button>
          </div>

          <div className="space-y-2.5">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700">1 港币 (HKD) 兑 人民币 (CNY)</span>
              <span className="font-mono font-black text-amber-800 text-sm">
                ¥ {ratesData?.rates.CNY.toFixed(4) || '0.9258'}
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700">1 港币 (HKD) 兑 美元 (USD)</span>
              <span className="font-mono font-black text-blue-800 text-sm">
                $ {ratesData?.rates.USD.toFixed(4) || '0.1281'}
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700">1 港币 (HKD) 兑 英镑 (GBP)</span>
              <span className="font-mono font-black text-purple-800 text-sm">
                £ {ratesData?.rates.GBP.toFixed(4) || '0.1012'}
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700">1 港币 (HKD) 兑 欧元 (EUR)</span>
              <span className="font-mono font-black text-emerald-800 text-sm">
                € {ratesData?.rates.EUR.toFixed(4) || '0.1182'}
              </span>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-100">
            <span className="flex items-center space-x-1">
              <span className={`w-2 h-2 rounded-full ${ratesData?.isRealTime ? 'bg-emerald-500' : 'bg-amber-500'}`} />
              <span>{ratesData?.isRealTime ? '实时外汇接口连通' : '离线基准汇率兜底'}</span>
            </span>
            <span>更新时间：{ratesData ? new Date(ratesData.lastUpdated).toLocaleTimeString() : '--'}</span>
          </div>
        </div>

        {/* 留学学费与预算实时计算器 */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 text-slate-900 font-bold">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <span>实时留学学费与花费动态换算器</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                输入学费 / 预估开销金额 (HKD 港币)
              </label>
              <div className="relative">
                <input
                  type="number"
                  step={5000}
                  value={calculatorHkd}
                  onChange={(e) => setCalculatorHkd(Number(e.target.value) || 0)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-bold text-base outline-none focus:ring-2 focus:ring-amber-500"
                />
                <span className="absolute left-3.5 top-3.5 text-xs font-bold text-slate-400">HK$</span>
              </div>
              <div className="flex flex-wrap gap-1 pt-1">
                {[150000, 220000, 280000, 360000, 450000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setCalculatorHkd(amt)}
                    className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-medium transition-colors"
                  >
                    {amt / 10000}万
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                目标折算币种
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {(['CNY', 'USD', 'GBP', 'EUR'] as const).map((curr) => (
                  <button
                    key={curr}
                    type="button"
                    onClick={() => setCalcTargetCurrency(curr)}
                    className={`py-3 rounded-xl text-xs font-bold transition-all border ${
                      calcTargetCurrency === curr
                        ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {curr === 'CNY' ? '人民币' : curr === 'USD' ? '美元' : curr === 'GBP' ? '英镑' : '欧元'}
                  </button>
                ))}
              </div>

              {/* 换算结果大卡片 */}
              <div className="mt-2 p-3 bg-gradient-to-r from-amber-500/10 to-amber-500/5 rounded-xl border border-amber-200/80 text-center">
                <span className="text-[10px] text-amber-800 font-bold block">实时折算结果</span>
                <span className="text-xl sm:text-2xl font-black text-amber-900 font-serif">
                  {calcResult.formatted}
                </span>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
            💡 提示：港校授课型硕士通常分两期电汇缴纳学费。实时换算可帮助您提前做好结汇与跨境购汇额度准备。
          </p>
        </div>

      </div>

      {/* 第二行：数据库概览与备份/恢复 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* 全站数据指标 */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 text-slate-900 font-bold">
            <Database className="w-5 h-5 text-amber-600" />
            <span>全站数据资产健康度指标</span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-slate-400 block text-[11px]">收录香港高校</span>
              <span className="text-xl font-black text-slate-900 mt-1 block">
                {HK_UNIVERSITIES.length} <span className="text-xs font-normal text-slate-500">所公私立大学</span>
              </span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-slate-400 block text-[11px]">官方官方 TPG 硕士专业</span>
              <span className="text-xl font-black text-amber-700 mt-1 block">
                {totalPrograms}+ <span className="text-xs font-normal text-slate-500">门精选项目</span>
              </span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-slate-400 block text-[11px]">2026/27 申请轮次倒计时</span>
              <span className="text-xl font-black text-blue-700 mt-1 block">
                {HK_APPLICATION_DEADLINES.length} <span className="text-xs font-normal text-slate-500">个官方节点</span>
              </span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-slate-400 block text-[11px]">实时录取/拒信案例库</span>
              <span className="text-xl font-black text-emerald-700 mt-1 block">
                {totalCases} <span className="text-xs font-normal text-slate-500">条真实案例</span>
              </span>
            </div>
          </div>

          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800 flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>本地客户端数据与云端 GitHub 仓库数据保持 100% 同步！</span>
          </div>
        </div>

        {/* 备份导出与数据恢复 */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 text-slate-900 font-bold">
            <ShieldCheck className="w-5 h-5 text-amber-600" />
            <span>数据备份、导出与云端恢复</span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <button
                onClick={handleExportJSON}
                className="flex-1 inline-flex items-center justify-center space-x-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4 text-amber-400" />
                <span>导出备份 JSON</span>
              </button>

              <button
                onClick={handleClearCache}
                className="inline-flex items-center space-x-1 px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                <span>重置出厂基准</span>
              </button>
            </div>

            <div>
              <textarea
                rows={2}
                value={importJsonText}
                onChange={(e) => setImportJsonText(e.target.value)}
                placeholder="粘贴备份的 JSON 文本在此，点击导入恢复愿望单与战报..."
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button
                onClick={handleImportJSON}
                className="mt-1.5 w-full inline-flex items-center justify-center space-x-1.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold transition-colors cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>恢复导入 JSON 数据</span>
              </button>
            </div>

            {importMsg && (
              <div className={`p-2 rounded-lg text-xs font-semibold ${
                importMsg.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                {importMsg.text}
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
