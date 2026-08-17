import React, { useState, useEffect } from 'react';
import { WishlistItem, ExchangeRateData } from '../types';
import { 
  getWishlist, 
  removeFromWishlist, 
  updateWishlistItemStatus,
  fetchLiveExchangeRates,
  convertHKDToCurrency
} from '../services/dataSyncService';
import { 
  Bookmark, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  ExternalLink, 
  X, 
  Sparkles,
  ArrowRight,
  TrendingUp,
  FileEdit,
  GraduationCap
} from 'lucide-react';

interface WishlistProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToEvaluator?: () => void;
}

export const WishlistDrawer: React.FC<WishlistProps> = ({ isOpen, onClose, onNavigateToEvaluator }) => {
  const [items, setItems] = useState<WishlistItem[]>(getWishlist());
  const [ratesData, setRatesData] = useState<ExchangeRateData | null>(null);

  useEffect(() => {
    if (isOpen) {
      setItems(getWishlist());
      fetchLiveExchangeRates().then(setRatesData);
    }
  }, [isOpen]);

  const handleRemove = (id: string) => {
    removeFromWishlist(id);
    setItems(getWishlist());
  };

  const handleStatusChange = (id: string, status: WishlistItem['status']) => {
    updateWishlistItemStatus(id, status);
    setItems(getWishlist());
  };

  const getStatusBadge = (status: WishlistItem['status']) => {
    switch (status) {
      case 'planning':
        return { label: '📝 意向选校中', bg: 'bg-slate-100 text-slate-700 border-slate-200' };
      case 'preparing_docs':
        return { label: '✍️ 文书/材料准备', bg: 'bg-amber-50 text-amber-800 border-amber-200' };
      case 'submitted':
        return { label: '🚀 已递交网申', bg: 'bg-blue-50 text-blue-700 border-blue-200' };
      case 'interview':
        return { label: '📨 收到笔面通知', bg: 'bg-purple-50 text-purple-700 border-purple-200' };
      case 'offer':
        return { label: '🎉 斩获录取 Offer', bg: 'bg-emerald-50 text-emerald-800 border-emerald-200' };
      case 'rejected':
        return { label: '❌ 遗憾未录取', bg: 'bg-rose-50 text-rose-700 border-rose-200' };
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex justify-end animate-fadeIn">
      <div className="bg-white w-full max-w-lg h-full shadow-2xl flex flex-col justify-between overflow-hidden">
        
        {/* 抽屉头部 */}
        <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bookmark className="w-5 h-5 text-amber-400 fill-amber-400" />
            <div>
              <h3 className="font-bold text-base sm:text-lg font-serif">
                我的选校愿望单与申请看板
              </h3>
              <span className="text-[11px] text-slate-400">已加入 {items.length} 个心仪硕士项目</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 愿望单项目列表 */}
        <div className="p-4 sm:p-6 flex-1 overflow-y-auto space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
                <Bookmark className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-base">愿望单还是空的</h4>
                <p className="text-slate-400 text-xs mt-1 max-w-xs mx-auto">
                  在「智能择校」或「港校库」中浏览专业时，点击 ❤️ 收藏即可将项目加入此清单并实时跟踪申请进度。
                </p>
              </div>
              {onNavigateToEvaluator && (
                <button
                  onClick={() => {
                    onClose();
                    onNavigateToEvaluator();
                  }}
                  className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  去测算推荐选校
                </button>
              )}
            </div>
          ) : (
            items.map((item) => {
              const badge = getStatusBadge(item.status);
              const cnyRate = ratesData 
                ? convertHKDToCurrency(item.tuitionHKD, 'CNY', ratesData).formatted 
                : '';

              return (
                <div 
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-all space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-900 text-amber-300 font-mono">
                          {item.universityCode}
                        </span>
                        <span className="font-bold text-sm text-slate-900">
                          {item.universityNameZh}
                        </span>
                      </div>
                      <h5 className="font-bold text-sm text-slate-800 mt-1">
                        {item.majorNameZh}
                      </h5>
                      <span className="text-[11px] text-slate-400 font-medium block">
                        {item.majorNameEn}
                      </span>
                    </div>

                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-slate-300 hover:text-rose-500 p-1 transition-colors cursor-pointer"
                      title="从愿望单移除"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* 学费与折算 */}
                  <div className="flex items-center justify-between text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-slate-600 font-semibold">{item.tuitionHKD}</span>
                    {cnyRate && (
                      <span className="text-amber-800 font-bold text-[11px]">
                        折合 {cnyRate}
                      </span>
                    )}
                  </div>

                  {/* 申请进度选择器 */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-500 font-semibold">当前申请进度：</span>
                      <span className={`px-2 py-0.5 rounded-full font-bold border text-[10px] ${badge.bg}`}>
                        {badge.label}
                      </span>
                    </div>

                    <select
                      value={item.status}
                      onChange={(e) => handleStatusChange(item.id, e.target.value as any)}
                      className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="planning">📝 意向选校中</option>
                      <option value="preparing_docs">✍️ 文书/材料准备中</option>
                      <option value="submitted">🚀 已递交网申</option>
                      <option value="interview">📨 收到笔试/面试通知</option>
                      <option value="offer">🎉 斩获录取 Offer</option>
                      <option value="rejected">❌ 遗憾未录取</option>
                    </select>
                  </div>

                </div>
              );
            })
          )}
        </div>

        {/* 底部统计 */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
          <span>所有申请进度保存在本地，安全私密</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-colors cursor-pointer"
          >
            完成
          </button>
        </div>

      </div>
    </div>
  );
};
