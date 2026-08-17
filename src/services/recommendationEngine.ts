import { 
  StudentProfile, 
  GPAScale, 
  RecommendationReport, 
  UniversityMatchResult, 
  RecommendationTier,
  MajorCategory,
  SchoolTier 
} from '../types';
import { HK_UNIVERSITIES } from '../data/universities';
import { SCHOOL_TIER_META } from '../data/schools';

// 1. GPA 归一化换算器 (转换为 0 - 100 分制)
export function normalizeGPATo100(gpa: number, scale: GPAScale): number {
  if (scale === '100') {
    return Math.min(100, Math.max(0, gpa));
  }
  
  if (scale === '4.0') {
    // 4.0 标准算法：
    // 3.8 - 4.0 -> 90 - 100
    // 3.5 - 3.79 -> 85 - 89.9
    // 3.0 - 3.49 -> 80 - 84.9
    // 2.5 - 2.99 -> 75 - 79.9
    // < 2.5 -> gpa / 4.0 * 100 (或 60-74)
    if (gpa >= 3.8) return 90 + ((gpa - 3.8) / 0.2) * 10;
    if (gpa >= 3.5) return 85 + ((gpa - 3.5) / 0.3) * 5;
    if (gpa >= 3.0) return 80 + ((gpa - 3.0) / 0.5) * 5;
    if (gpa >= 2.5) return 75 + ((gpa - 2.5) / 0.5) * 5;
    return Math.max(60, (gpa / 4.0) * 80);
  }

  if (scale === '4.3') {
    const ratio = gpa / 4.3;
    return Math.min(100, Math.max(60, 60 + ratio * 40));
  }

  if (scale === '4.5') {
    const ratio = gpa / 4.5;
    return Math.min(100, Math.max(60, 60 + ratio * 40));
  }

  return gpa;
}

// 2. 专业竞争度难度加权
const MAJOR_DIFFICULTY_MODIFIERS: Record<MajorCategory, number> = {
  business: -6.0,     // 商科最卷，门槛大幅提高 (相当于扣除6分竞争力)
  cs_tech: -4.5,      // 计算机/AI次之
  art_design: -2.0,   // 设计类看重作品集
  humanities: -1.0,   // 传媒/社科略卷
  social_sci: 0.0,    // 常规社科
  engineering: +2.0,  // 传统工科门槛相对平缓
  science: +3.0,      // 基础理学
};

// 3. 计算语言加分
function calculateLanguageScore(profile: StudentProfile): number {
  if (profile.languageType === 'ielts') {
    if (profile.languageScore >= 7.5) return 98;
    if (profile.languageScore >= 7.0) return 90;
    if (profile.languageScore >= 6.5) return 80;
    if (profile.languageScore >= 6.0) return 70;
    return 55;
  }
  if (profile.languageType === 'toefl') {
    if (profile.languageScore >= 105) return 98;
    if (profile.languageScore >= 100) return 92;
    if (profile.languageScore >= 90) return 82;
    if (profile.languageScore >= 80) return 72;
    return 55;
  }
  if (profile.languageType === 'cet6') {
    if (profile.languageScore >= 550) return 85;
    if (profile.languageScore >= 500) return 78;
    if (profile.languageScore >= 450) return 70;
    if (profile.languageScore >= 425) return 60;
    return 50;
  }
  return 60; // 尚未考出语言，默认基准
}

// 4. 计算软背景加分
function calculateExperienceScore(profile: StudentProfile): number {
  let score = 65; // 基准分
  // 实习加分 (每段优质实习 +5，封顶 15)
  score += Math.min(15, profile.internshipCount * 5);
  // 科研加分 (每段科研/论文 +6，封顶 18)
  score += Math.min(18, profile.researchCount * 6);
  // 竞赛奖项 (0-3 等级)
  score += profile.awardsCount * 4;
  return Math.min(100, score);
}

// 5. 核心评估与选校推荐引擎
export function generateRecommendations(profile: StudentProfile): RecommendationReport {
  const normGpa = normalizeGPATo100(profile.gpa, profile.gpaScale);
  const schoolMeta = SCHOOL_TIER_META[profile.schoolTier] || SCHOOL_TIER_META.regular_dual;
  const schoolScore = schoolMeta.baseScore;
  const languageScore = calculateLanguageScore(profile);
  const experienceScore = calculateExperienceScore(profile);
  
  // 综合学生背景实力分 (0 - 100)
  // 权重：GPA 40%, 本科背景 35%, 语言 15%, 软实力 10%
  const studentOverallStrength = 
    (normGpa * 0.40) + 
    (schoolScore * 0.35) + 
    (languageScore * 0.15) + 
    (experienceScore * 0.10);

  // 六维雷达图维度
  const radarDimensions = {
    academic: Math.round(normGpa),
    background: Math.round(schoolScore),
    language: Math.round(languageScore),
    experience: Math.round(experienceScore),
    alignment: Math.min(100, Math.round(studentOverallStrength + (MAJOR_DIFFICULTY_MODIFIERS[profile.targetMajorCategory] || 0))),
  };

  const results: UniversityMatchResult[] = [];

  for (const uni of HK_UNIVERSITIES) {
    // 获取该大学对应学生本科档位的最低 GPA 门槛
    let requiredGpa = 80;
    const req = uni.minGpaRequirement;
    switch (profile.schoolTier) {
      case 'c9_985': requiredGpa = req.c9_985; break;
      case 'regular_985': requiredGpa = req.regular_985; break;
      case 'top_211': requiredGpa = req.top_211; break;
      case 'regular_211': requiredGpa = req.regular_211; break;
      case 'strong_dual': requiredGpa = req.strong_dual; break;
      case 'regular_dual': requiredGpa = req.regular_dual; break;
      case 'sino_foreign': requiredGpa = req.top_211; break;
      case 'independent': requiredGpa = req.independent; break;
      case 'overseas': requiredGpa = req.regular_985; break;
    }

    // 计算 GPA 差距与专业竞争修正
    const gpaDelta = normGpa - requiredGpa;
    const majorMod = MAJOR_DIFFICULTY_MODIFIERS[profile.targetMajorCategory] || 0;
    const softBonus = (experienceScore - 65) * 0.15; // 软实力加分 (-0 to +5.25)
    
    // 检查语言门槛匹配情况
    let languagePenalty = 0;
    if (profile.languageType === 'cet6' && !uni.languageAcceptance.acceptsCET6) {
      // 该学校不接受六级，若学生只有六级，给予警示扣分
      languagePenalty = -8;
    }

    // 综合相对分数 = 50 (基准) + gpaDelta * 3.5 + majorMod + softBonus + 语言修正
    let rawScore = 55 + (gpaDelta * 3.6) + majorMod + softBonus + languagePenalty;

    // 针对不同梯队大学的固有声誉门槛调整
    if (uni.tierGroup === 'tier1') {
      if (['independent', 'regular_dual'].includes(profile.schoolTier)) {
        rawScore -= 8; // 双非冲港前三需要更高均分与软背景
      }
    }

    const matchScore = Math.min(99, Math.max(15, Math.round(rawScore)));

    // 概率估算 (sigmoid 逻辑映射到百分比)
    let admissionChancePercentage: number;
    if (matchScore >= 80) {
      admissionChancePercentage = Math.min(95, Math.round(75 + (matchScore - 80) * 1.0));
    } else if (matchScore >= 55) {
      admissionChancePercentage = Math.round(48 + ((matchScore - 55) / 25) * 27);
    } else {
      admissionChancePercentage = Math.max(15, Math.round(15 + ((matchScore - 15) / 40) * 33));
    }

    // 分档
    let tier: RecommendationTier;
    if (admissionChancePercentage >= 78) {
      tier = 'safety';
    } else if (admissionChancePercentage >= 46) {
      tier = 'match';
    } else {
      tier = 'reach';
    }

    // 筛选最契合学生专业的该校项目
    const relevantMajors = uni.majors.filter(
      m => m.category === profile.targetMajorCategory
    );
    const recommendedMajors = relevantMajors.length > 0 
      ? relevantMajors 
      : uni.majors.slice(0, 2);

    // 提炼优劣势与申请策略
    const pros: string[] = [];
    const risksOrChallenges: string[] = [];

    if (gpaDelta >= 2) {
      pros.push(`您的 GPA（折合 ${normGpa.toFixed(1)} 分）高于该校基准线（${requiredGpa} 分）`);
    } else if (gpaDelta >= -1) {
      pros.push(`您的 GPA 处于该校录取核心竞争区间（约 ${requiredGpa} 分）`);
    } else {
      risksOrChallenges.push(`当前 GPA（折合 ${normGpa.toFixed(1)} 分）略低于该校偏好门槛（${requiredGpa} 分）`);
    }

    if (['c9_985', 'regular_985', 'top_211'].includes(profile.schoolTier)) {
      pros.push(`本科院校背景（${schoolMeta.label}）高度符合该校招录偏好`);
    }

    if (profile.languageType === 'cet6' && !uni.languageAcceptance.acceptsCET6) {
      risksOrChallenges.push('该校官方不接受大学英语六级 (CET-6)，需尽快备考雅思 (6.5+) 或托福');
    }

    if (profile.internshipCount >= 2 || profile.researchCount >= 2) {
      pros.push('拥有丰富的科研/实习经历，可在文书与面试中形成差异化优势');
    }

    let strategyAdvice = '';
    if (tier === 'reach') {
      strategyAdvice = '【冲刺建议】建议尽早递交第一轮申请（Round 1），精心打磨文书并在简历中重点突出大厂实习/专业科研产出。';
    } else if (tier === 'match') {
      strategyAdvice = '【核心匹配】此校为您的主力目标，建议主申该校 1-2 个匹配专业，备齐合格雅思成绩即可稳健投递。';
    } else {
      strategyAdvice = '【稳妥保底】各项指标完全达标，录取概率极大，建议作为保底防滑落选择。';
    }

    results.push({
      university: uni,
      matchScore,
      tier,
      admissionChancePercentage,
      recommendedMajors,
      pros,
      risksOrChallenges,
      strategyAdvice
    });
  }

  // 排序与分组
  const reachList = results
    .filter(r => r.tier === 'reach')
    .sort((a, b) => b.admissionChancePercentage - a.admissionChancePercentage);

  const matchList = results
    .filter(r => r.tier === 'match')
    .sort((a, b) => b.admissionChancePercentage - a.admissionChancePercentage);

  const safetyList = results
    .filter(r => r.tier === 'safety')
    .sort((a, b) => b.admissionChancePercentage - a.admissionChancePercentage);

  // 生成 AI 背景提升建议
  const aiBoostTips = generateAIBoostTips(profile, normGpa, studentOverallStrength);

  return {
    timestamp: new Date().toISOString(),
    profile: { ...profile, normalizedGPA100: Math.round(normGpa * 10) / 10 },
    overallScore: Math.round(studentOverallStrength),
    radarDimensions,
    reachList,
    matchList,
    safetyList,
    aiBoostTips,
  };
}

// 6. 生成个性化提分提效锦囊
function generateAIBoostTips(
  profile: StudentProfile, 
  normGpa: number, 
  overallScore: number
): RecommendationReport['aiBoostTips'] {
  const tips: RecommendationReport['aiBoostTips'] = [];

  // GPA 提升建议
  if (normGpa < 88) {
    tips.push({
      type: 'gpa',
      title: '提升学分绩点 (GPA 杠杆)',
      impact: '+12% 港前三录取率',
      description: `若均分从当前的 ${normGpa.toFixed(1)} 分提升至 ${(normGpa + 2.5).toFixed(1)} 分（或在后续学期选修高学分专业课刷高绩点），将直接解锁港前三（港大/港科/港中）更多热门专业的初筛门槛。`
    });
  }

  // 语言考试升级
  if (profile.languageType === 'cet6' || profile.languageScore < 6.5) {
    tips.push({
      type: 'language',
      title: '斩获雅思 7.0+ (单科 6.5+)',
      impact: '打破六级限制，全港校通用',
      description: '港大、港科、港中文大部分热门专业不认可大学英语六级。考出雅思 7.0 (或托福 100+) 将消除所有语言短板，并极大提高商科/传媒面试邀请率。'
    });
  }

  // 软背景/科研
  if (profile.internshipCount < 2 && profile.researchCount < 1) {
    tips.push({
      type: 'soft_background',
      title: '补充 1 段大厂/头部行业实习或高质量科研',
      impact: '+15% 综合背景竞争力',
      description: '针对商科与计算机等强实践专业，拥有头部机构（如券商、投行、互联网大厂、国家重点实验室）的深度经历能有效弥补 1-2 分的 GPA 劣势。'
    });
  }

  // 交叉跨申与轮次策略
  tips.push({
    type: 'major_strategy',
    title: '把握早鸟黄金申请轮次 (Round 1 投递)',
    impact: '抢占 60% 以上的名额席位',
    description: '香港高校采取 Rolling（先到先审，录满即止）机制。在每年 9-10 月第一轮开放时抢先投递，录取概率显著高于后续轮次。'
  });

  return tips;
}
