export type SchoolTier = 
  | 'c9_985'       // C9 / 顶尖985 (清北复交浙等)
  | 'regular_985'  // 其它985高校
  | 'top_211'      // 头部/强211高校
  | 'regular_211'  // 普通211 / 双一流一流学科
  | 'strong_dual'  // 强双非 / 省重点院校 (深大、华政、南邮、杭电等)
  | 'regular_dual' // 普通双非本科 (公办本一/本二)
  | 'sino_foreign' // 中外合作办学 (港中文深、西交利物浦、昆山杜克等)
  | 'independent'  // 独立学院 / 民办本科 / 专升本
  | 'overseas';    // 海本 (US/UK/AU/CA等海外高校)

export type GPAScale = '4.0' | '4.3' | '4.5' | '100';

export type MajorCategory = 
  | 'business'     // 商科 / 金融 / 会计 / 商业分析 (最高竞争)
  | 'cs_tech'      // 计算机 / 人工智能 / 数据科学 (高竞争)
  | 'engineering'  // 电子 / 机械 / 土木 / 工业工程
  | 'humanities'   // 人文 / 传媒 / 语言 / 历史 / 哲学
  | 'social_sci'   // 经济学 / 公共管理 / 法学 / 教育学
  | 'science'      // 数学 / 物理 / 化学 / 生物
  | 'art_design';  // 建筑 / 设计 / 音乐 / 艺术管理

export type LanguageType = 'ielts' | 'toefl' | 'cet6' | 'none';

export interface StudentProfile {
  schoolName: string;
  schoolTier: SchoolTier;
  gpa: number;
  gpaScale: GPAScale;
  normalizedGPA100: number; // 统一换算成百分制 (0-100)
  targetMajorCategory: MajorCategory;
  languageType: LanguageType;
  languageScore: number;
  internshipCount: number; // 实习/工作段数
  researchCount: number;   // 科研/论文/项目数
  awardsCount: number;     // 竞赛/奖学金等级 (0: 无, 1: 校级, 2: 省部级, 3: 国家/国际级)
}

export interface UniversityMajor {
  id: string;
  nameZh: string;
  nameEn: string;
  category: MajorCategory;
  tuitionHKD: string;
  duration: string; // 如 "1 年全日制"
  minLanguageRequirement: string; // 如 "雅思 6.5 (单科不低于 6.0)"
  competitivenessLevel: 'extreme' | 'high' | 'medium' | 'moderate'; // 竞争烈度
  curriculumHighlights: string[];
}

export interface University {
  id: string;
  code: string; // 如 "HKU", "HKUST"
  nameZh: string;
  nameEn: string;
  motto: string;
  tierGroup: 'tier1' | 'tier2' | 'tier3' | 'tier4'; // 港前三 / 港前五 / 港八校 / 优质大学
  qsRank2025: number;
  timesRank2024: number;
  location: string;
  badgeBgColor: string;
  accentColor: string;
  features: string[];
  majors: UniversityMajor[];
  minGpaRequirement: {
    c9_985: number;      // 换算后百分制
    regular_985: number;
    top_211: number;
    regular_211: number;
    strong_dual: number;
    regular_dual: number;
    independent: number;
    overseasGpa: number;
  };
  languageAcceptance: {
    acceptsCET6: boolean;
    cet6MinScore?: number;
    ieltsMin: number;
    toeflMin: number;
  };
  acceptanceTips: string;
}

export type RecommendationTier = 'reach' | 'match' | 'safety';

export interface UniversityMatchResult {
  university: University;
  matchScore: number; // 0-100
  tier: RecommendationTier; // 冲刺 / 匹配 / 保底
  admissionChancePercentage: number; // 预测录取概率 0-100%
  recommendedMajors: UniversityMajor[];
  pros: string[];
  risksOrChallenges: string[];
  strategyAdvice: string;
}

export interface RecommendationReport {
  timestamp: string;
  profile: StudentProfile;
  overallScore: number; // 综合竞争力评分 (0-100)
  radarDimensions: {
    academic: number;    // 学术均分表现
    background: number;  // 本科院校平台
    language: number;    // 语言能力
    experience: number;  // 实践与软实力
    alignment: number;   // 专业契合与竞争力
  };
  reachList: UniversityMatchResult[];   // 🚀 冲刺院校 (20-40% 概率)
  matchList: UniversityMatchResult[];   // 🎯 核心匹配院校 (60-80% 概率)
  safetyList: UniversityMatchResult[];  // 🛡️ 稳妥保底院校 (> 85% 概率)
  aiBoostTips: {
    type: 'gpa' | 'language' | 'soft_background' | 'major_strategy';
    title: string;
    impact: string;
    description: string;
  }[];
}
