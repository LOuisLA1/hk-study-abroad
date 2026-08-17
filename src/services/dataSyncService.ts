import { ExchangeRateData, OfferCase, ApplicationDeadline, WishlistItem, University } from '../types';
import { INITIAL_OFFER_CASES } from '../data/offerCases';
import { HK_APPLICATION_DEADLINES } from '../data/deadlines';
import { HK_UNIVERSITIES } from '../data/universities';

const STORAGE_KEYS = {
  OFFER_CASES: 'hk_study_offer_cases_v1',
  WISHLIST: 'hk_study_wishlist_v1',
  EXCHANGE_RATES: 'hk_study_exchange_rates_v1',
  CUSTOM_UNIVERSITIES: 'hk_study_custom_unis_v1',
  LAST_SYNC: 'hk_study_last_sync_timestamp'
};

// 默认基准备用汇率 (当网络不可用时自动兜底)
const FALLBACK_EXCHANGE_RATES: ExchangeRateData = {
  base: 'HKD',
  rates: {
    CNY: 0.9258,
    USD: 0.1281,
    EUR: 0.1182,
    GBP: 0.1012,
    AUD: 0.1945,
    CAD: 0.1755,
    SGD: 0.1732
  },
  lastUpdated: new Date().toISOString(),
  isRealTime: false
};

/**
 * 获取实时外汇汇率 (基于 open.er-api.com 公共外汇实时接口)
 */
export async function fetchLiveExchangeRates(): Promise<ExchangeRateData> {
  // 检查本地缓存 (若 1 小时内已获取则复用，减少多余请求)
  const cached = localStorage.getItem(STORAGE_KEYS.EXCHANGE_RATES);
  if (cached) {
    try {
      const parsed: ExchangeRateData = JSON.parse(cached);
      const diffMinutes = (Date.now() - new Date(parsed.lastUpdated).getTime()) / (1000 * 60);
      if (diffMinutes < 60) {
        return parsed;
      }
    } catch {
      // 忽略解析错误，继续请求新数据
    }
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);
    const response = await fetch('https://open.er-api.com/v6/latest/HKD', {
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (data && data.rates) {
        const result: ExchangeRateData = {
          base: 'HKD',
          rates: {
            CNY: Number(data.rates.CNY) || 0.9258,
            USD: Number(data.rates.USD) || 0.1281,
            EUR: Number(data.rates.EUR) || 0.1182,
            GBP: Number(data.rates.GBP) || 0.1012,
            AUD: Number(data.rates.AUD) || 0.1945,
            CAD: Number(data.rates.CAD) || 0.1755,
            SGD: Number(data.rates.SGD) || 0.1732
          },
          lastUpdated: new Date().toISOString(),
          isRealTime: true
        };
        localStorage.setItem(STORAGE_KEYS.EXCHANGE_RATES, JSON.stringify(result));
        return result;
      }
    }
  } catch (err) {
    console.warn('获取实时汇率失败，启用稳健基准汇率', err);
  }

  return FALLBACK_EXCHANGE_RATES;
}

/**
 * 格式化将港币金额实时换算为目标币种
 */
export function convertHKDToCurrency(
  hkdString: string, 
  targetCurrency: 'HKD' | 'CNY' | 'USD' | 'EUR' | 'GBP', 
  ratesData: ExchangeRateData
): { formatted: string; rawNumber: number } {
  // 从字符串中提取纯数字 (如 "约 280,000 港币" -> 280000, "18.5万" -> 185000)
  let hkdAmount = 0;
  if (hkdString.includes('万')) {
    const match = hkdString.match(/([\d.]+)\s*万/);
    if (match) {
      hkdAmount = parseFloat(match[1]) * 10000;
    }
  } else {
    const match = hkdString.replace(/,/g, '').match(/\d+/);
    if (match) {
      hkdAmount = parseInt(match[0], 10);
    }
  }

  if (!hkdAmount || isNaN(hkdAmount)) {
    return { formatted: hkdString, rawNumber: 0 };
  }

  if (targetCurrency === 'HKD') {
    return { 
      formatted: `HK$ ${hkdAmount.toLocaleString()}`, 
      rawNumber: hkdAmount 
    };
  }

  const rate = ratesData.rates[targetCurrency] || 1;
  const converted = Math.round(hkdAmount * rate);

  const symbolMap: Record<string, string> = {
    CNY: '¥',
    USD: '$',
    EUR: '€',
    GBP: '£'
  };

  const symbol = symbolMap[targetCurrency] || '';
  return {
    formatted: `约 ${symbol} ${converted.toLocaleString()} ${targetCurrency}`,
    rawNumber: converted
  };
}

// -------------------------------------------------------------
// 实时真实录取案例 (Offer Cases) 存储与同步
// -------------------------------------------------------------

export function getStoredOfferCases(): OfferCase[] {
  const local = localStorage.getItem(STORAGE_KEYS.OFFER_CASES);
  if (!local) {
    return INITIAL_OFFER_CASES;
  }
  try {
    const parsed: OfferCase[] = JSON.parse(local);
    // 合并内置案例与用户提交案例
    const ids = new Set(parsed.map(c => c.id));
    const merged = [...parsed];
    for (const baseCase of INITIAL_OFFER_CASES) {
      if (!ids.has(baseCase.id)) {
        merged.push(baseCase);
      }
    }
    return merged;
  } catch {
    return INITIAL_OFFER_CASES;
  }
}

export function saveUserOfferCase(newCaseData: Omit<OfferCase, 'id' | 'likesCount' | 'isUserSubmitted'>): OfferCase {
  const cases = getStoredOfferCases();
  const createdCase: OfferCase = {
    ...newCaseData,
    id: `user-case-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    likesCount: 1,
    isUserSubmitted: true
  };
  
  const updated = [createdCase, ...cases];
  localStorage.setItem(STORAGE_KEYS.OFFER_CASES, JSON.stringify(updated));
  return createdCase;
}

export function toggleCaseLike(caseId: string): number {
  const cases = getStoredOfferCases();
  let updatedCount = 0;
  const updated = cases.map(c => {
    if (c.id === caseId) {
      updatedCount = c.likesCount + 1;
      return { ...c, likesCount: updatedCount };
    }
    return c;
  });
  localStorage.setItem(STORAGE_KEYS.OFFER_CASES, JSON.stringify(updated));
  return updatedCount;
}

// -------------------------------------------------------------
// 我的愿望单 (Wishlist) 与申请状态管理
// -------------------------------------------------------------

export function getWishlist(): WishlistItem[] {
  const data = localStorage.getItem(STORAGE_KEYS.WISHLIST);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function addToWishlist(item: Omit<WishlistItem, 'id' | 'addedAt'>): WishlistItem {
  const list = getWishlist();
  // 避免重复加入
  const existing = list.find(w => w.universityId === item.universityId && w.majorId === item.majorId);
  if (existing) {
    return existing;
  }

  const newItem: WishlistItem = {
    ...item,
    id: `wish-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
    addedAt: new Date().toISOString()
  };

  const updated = [newItem, ...list];
  localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(updated));
  return newItem;
}

export function removeFromWishlist(id: string): void {
  const list = getWishlist();
  const updated = list.filter(w => w.id !== id);
  localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(updated));
}

export function updateWishlistItemStatus(id: string, status: WishlistItem['status'], userNotes?: string): void {
  const list = getWishlist();
  const updated = list.map(w => {
    if (w.id === id) {
      return { 
        ...w, 
        status, 
        userNotes: userNotes !== undefined ? userNotes : w.userNotes 
      };
    }
    return w;
  });
  localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(updated));
}

// -------------------------------------------------------------
// 倒计时与日历 (.ics) 提醒生成
// -------------------------------------------------------------

export function getAllDeadlines(): ApplicationDeadline[] {
  return HK_APPLICATION_DEADLINES;
}

/**
 * 生成 iCalendar (.ics) 日历事件文件并触发浏览器下载
 */
export function downloadICalendarEvent(deadline: ApplicationDeadline): void {
  const dateObj = new Date(deadline.deadlineDate);
  const formatDateToICS = (d: Date) => {
    return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const startDateStr = formatDateToICS(new Date(dateObj.getTime() - 2 * 60 * 60 * 1000)); // 提前 2 小时提醒
  const endDateStr = formatDateToICS(dateObj);

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//HK Study Abroad Recommender//Admissions Deadlines//CN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${deadline.id}-${Date.now()}@hk-study-abroad.com`,
    `DTSTAMP:${formatDateToICS(new Date())}`,
    `DTSTART:${startDateStr}`,
    `DTEND:${endDateStr}`,
    `SUMMARY:【港校申请截止】${deadline.universityName} - ${deadline.roundName}`,
    `DESCRIPTION:${deadline.majorName}\\n所属学院: ${deadline.faculty}\\n网申入口: ${deadline.portalUrl || ''}\\n提示: ${deadline.notes || ''}`,
    `LOCATION:${deadline.universityName}`,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'DESCRIPTION:港校网申截止倒计时 24 小时提醒',
    'ACTION:DISPLAY',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', `港校申请截止_${deadline.universityCode}_${deadline.roundName.replace(/\s+/g, '_')}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// -------------------------------------------------------------
// 数据中心与备份/恢复导出
// -------------------------------------------------------------

export function exportBackupJSON(): string {
  const data = {
    version: '2026.1.0',
    exportTime: new Date().toISOString(),
    offerCases: getStoredOfferCases().filter(c => c.isUserSubmitted),
    wishlist: getWishlist(),
    exchangeRates: localStorage.getItem(STORAGE_KEYS.EXCHANGE_RATES)
  };
  return JSON.stringify(data, null, 2);
}

export function importBackupJSON(jsonStr: string): boolean {
  try {
    const data = JSON.parse(jsonStr);
    if (data.wishlist && Array.isArray(data.wishlist)) {
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(data.wishlist));
    }
    if (data.offerCases && Array.isArray(data.offerCases)) {
      const existing = getStoredOfferCases();
      const userCases = data.offerCases;
      localStorage.setItem(STORAGE_KEYS.OFFER_CASES, JSON.stringify([...userCases, ...existing.filter(e => !e.isUserSubmitted)]));
    }
    return true;
  } catch (err) {
    console.error('导入数据失败', err);
    return false;
  }
}
