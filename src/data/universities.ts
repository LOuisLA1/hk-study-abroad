import { University } from '../types';

export const HK_UNIVERSITIES: University[] = [
  {
    id: 'hku',
    code: 'HKU',
    nameZh: '香港大学',
    nameEn: 'The University of Hong Kong',
    motto: '明德格物 (Sapientia Et Virtus)',
    tierGroup: 'tier1',
    qsRank2025: 17,
    timesRank2024: 35,
    location: '香港岛薄扶林道',
    badgeBgColor: 'bg-emerald-800',
    accentColor: '#065f46',
    features: ['香港历史最悠久高等学府', '亚洲常春藤名校', '商学院/医学院/法学院极负盛名', '全英文国际化教学'],
    minGpaRequirement: {
      c9_985: 83,
      regular_985: 85,
      top_211: 87,
      regular_211: 88,
      strong_dual: 90,
      regular_dual: 92,
      independent: 95,
      overseasGpa: 3.5,
    },
    languageAcceptance: {
      acceptsCET6: false,
      ieltsMin: 6.5, // 商科/法学/传媒要求 7.0 (单科不低于 6.0/6.5)
      toeflMin: 80,  // 商科建议 95+
    },
    acceptanceTips: '港大是港校申请天花板，商科与计算机极度偏好985/211高GPA（85+），双非学生建议均分90+且有突出大厂实习/科研。注意不接受考研英语或CET-6。',
    majors: [
      {
        id: 'hku_cs',
        nameZh: '计算机科学理学硕士 (MSc Computer Science)',
        nameEn: 'MSc in Computer Science',
        category: 'cs_tech',
        tuitionHKD: '288,000 港币/年',
        duration: '1 年全日制',
        minLanguageRequirement: '雅思 6.5 (小分 6.0) / 托福 80',
        competitivenessLevel: 'extreme',
        curriculumHighlights: ['人工智能方向 (AI Stream)', '金融科技方向 (FinTech Stream)', '信息安全与网络方向']
      },
      {
        id: 'hku_fin',
        nameZh: '金融学硕士 (Master of Finance)',
        nameEn: 'Master of Finance (MFin)',
        category: 'business',
        tuitionHKD: '462,000 港币/年',
        duration: '1 年全日制',
        minLanguageRequirement: '雅思 7.0 (小分 6.5) / 托福 90 (强制建议 GMAT/GRE)',
        competitivenessLevel: 'extreme',
        curriculumHighlights: ['公司金融与投资银行', '量化与金融工程', '资产管理与对冲基金']
      },
      {
        id: 'hku_ba',
        nameZh: '商业分析硕士 (MSc Business Analytics)',
        nameEn: 'MSc in Business Analytics',
        category: 'business',
        tuitionHKD: '390,000 港币/年',
        duration: '1 年全日制',
        minLanguageRequirement: '雅思 7.0 / 托福 90',
        competitivenessLevel: 'extreme',
        curriculumHighlights: ['大数据驱动商业决策', '机器学习在商业中的应用', '供应链与市场分析']
      },
      {
        id: 'hku_journalism',
        nameZh: '新闻学硕士 (Master of Journalism)',
        nameEn: 'Master of Journalism',
        category: 'humanities',
        tuitionHKD: '240,000 港币/年',
        duration: '1 年全日制',
        minLanguageRequirement: '雅思 7.0 (单科 6.0) / 托福 95',
        competitivenessLevel: 'high',
        curriculumHighlights: ['深度调查报道', '多媒体与数据新闻', '国际新闻报道实务']
      },
      {
        id: 'hku_eee',
        nameZh: '电子与电气工程理学硕士 (MSc in EEE)',
        nameEn: 'MSc in Electrical and Electronic Engineering',
        category: 'engineering',
        tuitionHKD: '240,000 港币/年',
        duration: '1 年全日制',
        minLanguageRequirement: '雅思 6.5 (单科 6.0) / 托福 80',
        competitivenessLevel: 'high',
        curriculumHighlights: ['集成电路与VLSI系统', '新一代通信系统', '电力电子与智能电网']
      }
    ]
  },
  {
    id: 'hkust',
    code: 'HKUST',
    nameZh: '香港科技大学',
    nameEn: 'The Hong Kong University of Science and Technology',
    motto: '求新・求进・创未来',
    tierGroup: 'tier1',
    qsRank2025: 47,
    timesRank2024: 64,
    location: '九龙清水湾半岛',
    badgeBgColor: 'bg-blue-900',
    accentColor: '#1e3a8a',
    features: ['亚洲理工与商科执牛耳者', '极强科研孵化能力 (大疆创新发源地)', '清水湾海景校园', '产学研转化极佳'],
    minGpaRequirement: {
      c9_985: 80,
      regular_985: 83,
      top_211: 85,
      regular_211: 86,
      strong_dual: 88,
      regular_dual: 90,
      independent: 92,
      overseasGpa: 3.4,
    },
    languageAcceptance: {
      acceptsCET6: false,
      ieltsMin: 6.5,
      toeflMin: 80,
    },
    acceptanceTips: '港科大工学院与理学院是其王牌，招录偏好理工科强校背景；商科项目（如金融、BA）竞争极其激烈，面试占较大比重。',
    majors: [
      {
        id: 'hkust_it',
        nameZh: '信息技术理学硕士 (MSc Information Technology)',
        nameEn: 'MSc in Information Technology',
        category: 'cs_tech',
        tuitionHKD: '240,000 港币/年',
        duration: '1 年全日制',
        minLanguageRequirement: '雅思 6.5 (小分 5.5) / 托福 80',
        competitivenessLevel: 'high',
        curriculumHighlights: ['分布式云计算系统', '计算机视觉与图形学', '现代软件工程']
      },
      {
        id: 'hkust_bda',
        nameZh: '大数据科技理学硕士 (MSc in Big Data Technology)',
        nameEn: 'MSc in Big Data Technology',
        category: 'cs_tech',
        tuitionHKD: '250,000 港币/年',
        duration: '1 年全日制',
        minLanguageRequirement: '雅思 6.5 (小分 5.5) / 托福 80',
        competitivenessLevel: 'extreme',
        curriculumHighlights: ['大数据基础架构', '数据挖掘与统计推断', '深度学习与大规模应用']
      },
      {
        id: 'hkust_fin',
        nameZh: '金融学理学硕士 (MSc in Finance)',
        nameEn: 'MSc in Finance',
        category: 'business',
        tuitionHKD: '450,000 港币/年',
        duration: '1 年全日制',
        minLanguageRequirement: '雅思 6.5 (建议 7.0) / 托福 80 (建议 100+)',
        competitivenessLevel: 'extreme',
        curriculumHighlights: ['公司金融与估值建模', '衍生品与投资组合管理', '高频量化交易系统']
      },
      {
        id: 'hkust_mech',
        nameZh: '机械工程理学硕士 (MSc Mechanical Engineering)',
        nameEn: 'MSc in Mechanical Engineering',
        category: 'engineering',
        tuitionHKD: '198,000 港币/年',
        duration: '1 年全日制',
        minLanguageRequirement: '雅思 6.5 (小分 5.5) / 托福 80',
        competitivenessLevel: 'medium',
        curriculumHighlights: ['机器人与自动化控制', '先进材料与纳米技术', '流体力学与热能工程']
      }
    ]
  },
  {
    id: 'cuhk',
    code: 'CUHK',
    nameZh: '香港中文大学',
    nameEn: 'The Chinese University of Hong Kong',
    motto: '博文约礼 (Through Learning and Temperance)',
    tierGroup: 'tier1',
    qsRank2025: 36,
    timesRank2024: 53,
    location: '新界沙田马料水',
    badgeBgColor: 'bg-purple-900',
    accentColor: '#581c87',
    features: ['全港最大书院制大学', '文理商工医全学科领先', '商学院亚太首屈一指', '中文与社科领域殿堂级'],
    minGpaRequirement: {
      c9_985: 80,
      regular_985: 82,
      top_211: 84,
      regular_211: 85,
      strong_dual: 87,
      regular_dual: 89,
      independent: 92,
      overseasGpa: 3.3,
    },
    languageAcceptance: {
      acceptsCET6: false,
      ieltsMin: 6.5,
      toeflMin: 79,
    },
    acceptanceTips: '港中文对985/211院校较为友好，社科和商学院招生体量大。需注意所有申请者必须满足本科绩点不低于“B等级”（通常对应百分制80分或3.0/4.0）。',
    majors: [
      {
        id: 'cuhk_cs',
        nameZh: '计算机科学理学硕士 (MSc in Computer Science)',
        nameEn: 'MSc in Computer Science',
        category: 'cs_tech',
        tuitionHKD: '260,000 港币/年',
        duration: '1 年全日制',
        minLanguageRequirement: '雅思 6.5 / 托福 79',
        competitivenessLevel: 'extreme',
        curriculumHighlights: ['高级算法与计算理论', 'AI与机器学习', '密码学与网络安全']
      },
      {
        id: 'cuhk_mkt',
        nameZh: '市场营销理学硕士 (MSc in Marketing)',
        nameEn: 'MSc in Marketing',
        category: 'business',
        tuitionHKD: '350,000 港币/年',
        duration: '1 年全日制',
        minLanguageRequirement: '雅思 6.5 / 托福 79 (强烈建议 GMAT/GRE)',
        competitivenessLevel: 'high',
        curriculumHighlights: ['大数据营销与消费者洞察', '数字营销与社交媒体', '品牌战略管理']
      },
      {
        id: 'cuhk_comm',
        nameZh: '新媒体理学硕士 (MSc in New Media)',
        nameEn: 'MSc in New Media',
        category: 'humanities',
        tuitionHKD: '190,000 港币/年',
        duration: '1 年全日制',
        minLanguageRequirement: '雅思 6.5 / 托福 79',
        competitivenessLevel: 'high',
        curriculumHighlights: ['新媒体内容制作', '传播学研究方法', '人机交互与UI/UX']
      },
      {
        id: 'cuhk_econ',
        nameZh: '经济学理学硕士 (MSc in Economics)',
        nameEn: 'MSc in Economics',
        category: 'social_sci',
        tuitionHKD: '280,000 港币/年',
        duration: '1 年全日制',
        minLanguageRequirement: '雅思 6.5 / 托福 79',
        competitivenessLevel: 'high',
        curriculumHighlights: ['高级微观与宏观经济学', '计量经济理论与应用', '金融经济与公共政策']
      }
    ]
  },
  {
    id: 'polyu',
    code: 'PolyU',
    nameZh: '香港理工大学',
    nameEn: 'The Hong Kong Polytechnic University',
    motto: '开物成务 励学利民',
    tierGroup: 'tier2',
    qsRank2025: 57,
    timesRank2024: 87,
    location: '九龙红磡',
    badgeBgColor: 'bg-red-800',
    accentColor: '#991b1b',
    features: ['红磡核心地段', '酒店旅游管理世界前列', '设计学/土木工程/计算机业界口碑极高', '就业导向强实操课程'],
    minGpaRequirement: {
      c9_985: 75,
      regular_985: 78,
      top_211: 80,
      regular_211: 82,
      strong_dual: 84,
      regular_dual: 86,
      independent: 88,
      overseasGpa: 3.0,
    },
    languageAcceptance: {
      acceptsCET6: false,
      ieltsMin: 6.0, // 部分专业 6.5
      toeflMin: 80,
    },
    acceptanceTips: '港理近年来QS排名一路飙升，成为仅次于港前三的热门选择。对双非优秀学生相对包容（84+），工科、设计与商学院是重点申请方向。',
    majors: [
      {
        id: 'polyu_it',
        nameZh: '信息技术理学硕士 (MSc Information Technology)',
        nameEn: 'MSc in Information Technology',
        category: 'cs_tech',
        tuitionHKD: '210,000 港币/年',
        duration: '1.5 年全日制',
        minLanguageRequirement: '雅思 6.0 / 托福 80',
        competitivenessLevel: 'high',
        curriculumHighlights: ['软件开发管理', '互联网体系结构', '智能系统与数据挖掘']
      },
      {
        id: 'polyu_htm',
        nameZh: '国际酒店管理理学硕士 (MSc Hospitality)',
        nameEn: 'MSc in International Hospitality Management',
        category: 'business',
        tuitionHKD: '245,000 港币/年',
        duration: '1 年全日制',
        minLanguageRequirement: '雅思 6.5 / 托福 86',
        competitivenessLevel: 'high',
        curriculumHighlights: ['全球酒店战略领导力', '旅游与酒店资产管理', '奢华品牌服务创新']
      },
      {
        id: 'polyu_design',
        nameZh: '设计学硕士 (Master of Design)',
        nameEn: 'Master of Design (MDes)',
        category: 'art_design',
        tuitionHKD: '235,000 港币/年',
        duration: '1 年全日制',
        minLanguageRequirement: '雅思 6.5 (需要作品集 Portfolio)',
        competitivenessLevel: 'high',
        curriculumHighlights: ['智能系统设计 (ISD)', '创新商业设计 (IBD)', '智能服务设计 (SSD)']
      },
      {
        id: 'polyu_finance',
        nameZh: '金融学硕士 (Master of Finance)',
        nameEn: 'Master of Finance',
        category: 'business',
        tuitionHKD: '320,000 港币/年',
        duration: '1 年全日制',
        minLanguageRequirement: '雅思 6.5 / 托福 80',
        competitivenessLevel: 'high',
        curriculumHighlights: ['投资分析与量化建模', '企业财务报表分析', '衍生金融工具风险控制']
      }
    ]
  },
  {
    id: 'cityu',
    code: 'CityU',
    nameZh: '香港城市大学',
    nameEn: 'City University of Hong Kong',
    motto: '敬业乐群 (Officium Et Civitas)',
    tierGroup: 'tier2',
    qsRank2025: 62,
    timesRank2024: 82,
    location: '九龙塘达之路',
    badgeBgColor: 'bg-amber-700',
    accentColor: '#b45309',
    features: ['九龙塘核心枢纽', '商学院获AACSB/EQUIS双重认证', '电子工程与数据科学声誉卓著', '部分专业接受CET-6'],
    minGpaRequirement: {
      c9_985: 75,
      regular_985: 78,
      top_211: 80,
      regular_211: 82,
      strong_dual: 83,
      regular_dual: 85,
      independent: 88,
      overseasGpa: 3.0,
    },
    languageAcceptance: {
      acceptsCET6: true,
      cet6MinScore: 450, // 大多数支持CET6的专业要求450-490分
      ieltsMin: 6.5,
      toeflMin: 79,
    },
    acceptanceTips: '港城大是“港前五”中唯一部分学院（如理学院、工学院、部分社科）仍接受大学英语六级（CET-6 450+）的高校，适合尚未考出雅思的同学。',
    majors: [
      {
        id: 'cityu_ds',
        nameZh: '数据科学理学硕士 (MSc Data Science)',
        nameEn: 'MSc in Data Science',
        category: 'cs_tech',
        tuitionHKD: '248,000 港币/年',
        duration: '1 年全日制',
        minLanguageRequirement: '雅思 6.5 / CET-6 450分 / 托福 79',
        competitivenessLevel: 'high',
        curriculumHighlights: ['统计机器学习', '大数据优化算法', '商业智能与自然语言处理']
      },
      {
        id: 'cityu_bis',
        nameZh: '商务资讯系统理学硕士 (MSc BIS)',
        nameEn: 'MSc in Business Information Systems',
        category: 'business',
        tuitionHKD: '260,000 港币/年',
        duration: '1 年全日制',
        minLanguageRequirement: '雅思 6.5 / CET-6 450分 / 托福 79',
        competitivenessLevel: 'high',
        curriculumHighlights: ['IT战略规划', '企业资源系统与ERP', '电子商务与金融科技创新']
      },
      {
        id: 'cityu_media',
        nameZh: '创意媒体艺术硕士 (MFA Creative Media)',
        nameEn: 'MFA in Creative Media',
        category: 'art_design',
        tuitionHKD: '190,000 港币/年',
        duration: '2 年全日制',
        minLanguageRequirement: '雅思 6.5 / CET-6 500分 / 需作品集',
        competitivenessLevel: 'medium',
        curriculumHighlights: ['交互媒体艺术', '数字动画与视觉特效', '生成式艺术与空间叙事']
      }
    ]
  },
  {
    id: 'hkbu',
    code: 'HKBU',
    nameZh: '香港浸会大学',
    nameEn: 'Hong Kong Baptist University',
    motto: '笃信力行 (Faith and Perseverance)',
    tierGroup: 'tier3',
    qsRank2025: 252,
    timesRank2024: 301,
    location: '九龙塘窝打老道',
    badgeBgColor: 'bg-cyan-800',
    accentColor: '#155e75',
    features: ['传理学院全亚洲第一 (传媒界黄埔军校)', '中医药与全人教育享誉国际', '九龙塘优越地理位置', '双非友好，部分专业认可六级'],
    minGpaRequirement: {
      c9_985: 72,
      regular_985: 74,
      top_211: 76,
      regular_211: 78,
      strong_dual: 80,
      regular_dual: 82,
      independent: 85,
      overseasGpa: 2.8,
    },
    languageAcceptance: {
      acceptsCET6: true,
      cet6MinScore: 450,
      ieltsMin: 6.0, // 传媒专业通常要求 6.5
      toeflMin: 79,
    },
    acceptanceTips: '浸会的传理学院（电影、传播、新媒体）竞争不亚于港前三，传媒学子首选！商科、计算机与理学专业对普通双非同学非常友好（均分80+即可冲刺/匹配）。',
    majors: [
      {
        id: 'hkbu_comm',
        nameZh: '传播学文学硕士 (MA in Communication)',
        nameEn: 'MA in Communication',
        category: 'humanities',
        tuitionHKD: '175,000 港币/年',
        duration: '1 年全日制',
        minLanguageRequirement: '雅思 6.5 (小分 6.0) / CET-6 480分',
        competitivenessLevel: 'extreme',
        curriculumHighlights: ['媒介研究与公关战略', '数字时代的传播理论', '跨文化传播实务']
      },
      {
        id: 'hkbu_film',
        nameZh: '影视与新媒体制片文学硕士 (MFA Producing)',
        nameEn: 'MFA in Producing for Film, TV and New Media',
        category: 'art_design',
        tuitionHKD: '198,000 港币/年',
        duration: '1 年全日制',
        minLanguageRequirement: '雅思 6.5 / 托福 79 / 面试与剧本提案',
        competitivenessLevel: 'high',
        curriculumHighlights: ['电影投资与融资制片', '影视版权运营与发行', '剧本开发与编剧实战']
      },
      {
        id: 'hkbu_ai',
        nameZh: '人工智能与数码媒体理学硕士 (MSc AI & Digital Media)',
        nameEn: 'MSc in AI and Digital Media',
        category: 'cs_tech',
        tuitionHKD: '175,000 港币/年',
        duration: '1 年全日制',
        minLanguageRequirement: '雅思 6.0 / CET-6 450分 / 托福 74',
        competitivenessLevel: 'medium',
        curriculumHighlights: ['AI在媒体内容生成中的应用', '媒体大数据分析', '计算广告与社交网络挖掘']
      },
      {
        id: 'hkbu_finance',
        nameZh: '应用会计与金融理学硕士 (MSc AAF)',
        nameEn: 'MSc in Applied Accounting and Finance',
        category: 'business',
        tuitionHKD: '240,000 港币/年',
        duration: '1 年全日制',
        minLanguageRequirement: '雅思 6.5 / 托福 79',
        competitivenessLevel: 'medium',
        curriculumHighlights: ['高级财务报表分析', '法务会计与公司治理', '金融市场监管与实务']
      }
    ]
  },
  {
    id: 'lingnan',
    code: 'Lingnan',
    nameZh: '香港岭南大学',
    nameEn: 'Lingnan University',
    motto: '作育英才・服务社会 (Education for Service)',
    tierGroup: 'tier3',
    qsRank2025: 640,
    timesRank2024: 401,
    location: '新界屯门青山公路',
    badgeBgColor: 'bg-rose-900',
    accentColor: '#881337',
    features: ['亚洲博雅大学先驱 (Liberal Arts)', '全人小班互动精英教学', '经济学与人文社科卓越', '国际交换机会极其丰富'],
    minGpaRequirement: {
      c9_985: 70,
      regular_985: 72,
      top_211: 75,
      regular_211: 76,
      strong_dual: 78,
      regular_dual: 80,
      independent: 83,
      overseasGpa: 2.7,
    },
    languageAcceptance: {
      acceptsCET6: true,
      cet6MinScore: 450,
      ieltsMin: 6.0,
      toeflMin: 79,
    },
    acceptanceTips: '岭南大学是双非背景同学逆袭港校排名的绝佳选择，商科与人文社科接受CET-6（450+）。师生比优越，推荐作为核心稳妥/保底目标。',
    majors: [
      {
        id: 'ln_ib',
        nameZh: '国际与发展经济学理学硕士 (MSc IDE)',
        nameEn: 'MSc in International and Development Economics',
        category: 'social_sci',
        tuitionHKD: '190,000 港币/年',
        duration: '1 年全日制',
        minLanguageRequirement: '雅思 6.5 / CET-6 450分 / 托福 79',
        competitivenessLevel: 'medium',
        curriculumHighlights: ['一带一路与大湾区经济发展', '国际贸易与跨国直接投资', '发展中国家宏观金融']
      },
      {
        id: 'ln_ai_ba',
        nameZh: '人工智能与商业分析理学硕士 (MSc AI & BA)',
        nameEn: 'MSc in Artificial Intelligence & Business Analytics',
        category: 'business',
        tuitionHKD: '210,000 港币/年',
        duration: '1 年全日制',
        minLanguageRequirement: '雅思 6.5 / CET-6 450分 / 托福 79',
        competitivenessLevel: 'medium',
        curriculumHighlights: ['AI商业决策系统', '商业大数据深度学习', '预测分析与运营管理']
      }
    ]
  },
  {
    id: 'eduhk',
    code: 'EdUHK',
    nameZh: '香港教育大学',
    nameEn: 'The Education University of Hong Kong',
    motto: '育人以德・智德并重',
    tierGroup: 'tier3',
    qsRank2025: 800, // 教育学科 QS 世界第 21 位
    timesRank2024: 401,
    location: '新界大埔露屏路',
    badgeBgColor: 'bg-teal-800',
    accentColor: '#115e59',
    features: ['教育学领域亚洲顶尖 (QS教育学科全球第21)', '香港教师培养摇篮', '心理学/语言学/社科实力强劲', '接受六级申请'],
    minGpaRequirement: {
      c9_985: 70,
      regular_985: 72,
      top_211: 74,
      regular_211: 76,
      strong_dual: 78,
      regular_dual: 80,
      independent: 82,
      overseasGpa: 2.7,
    },
    languageAcceptance: {
      acceptsCET6: true,
      cet6MinScore: 430,
      ieltsMin: 6.0, // 英语教育 MATESOL 要求 7.0
      toeflMin: 80,
    },
    acceptanceTips: '教大的教育学（MATESOL、中文教育、教育领导力等）在行业认可度极高，中小学就业率极佳。绝大多数专业支持大学英语六级（430+）。',
    majors: [
      {
        id: 'eduhk_tesol',
        nameZh: '英语教学文学硕士 (MA in TESOL)',
        nameEn: 'MA in Teaching English to Speakers of Other Languages',
        category: 'humanities',
        tuitionHKD: '145,000 港币/年',
        duration: '1 年全日制',
        minLanguageRequirement: '雅思 7.0 (单科不低于 6.5) / 托福 100',
        competitivenessLevel: 'high',
        curriculumHighlights: ['第二语言习得理论', '英语课程设计与教材评估', '语音学与英语教学法实操']
      },
      {
        id: 'eduhk_med',
        nameZh: '教育学硕士 (Master of Education)',
        nameEn: 'Master of Education (MEd)',
        category: 'social_sci',
        tuitionHKD: '150,000 港币/年',
        duration: '1 年全日制',
        minLanguageRequirement: '雅思 6.0 / CET-6 430分 / 托福 80',
        competitivenessLevel: 'medium',
        curriculumHighlights: ['教育心理学与学习评估', '智能教育技术应用', '学校管理与领导力']
      }
    ]
  },
  {
    id: 'hkmu',
    code: 'HKMU',
    nameZh: '香港都会大学',
    nameEn: 'Hong Kong Metropolitan University',
    motto: '公诚毅逊・明德修业',
    tierGroup: 'tier4',
    qsRank2025: 1000,
    timesRank2024: 601,
    location: '九龙何文田牧爱街',
    badgeBgColor: 'bg-slate-800',
    accentColor: '#334155',
    features: ['香港第九所公立性质大学', '护理学/创意艺术/商科应用性极强', '录取门槛亲民，保底首选', '中文授课专业丰富'],
    minGpaRequirement: {
      c9_985: 65,
      regular_985: 68,
      top_211: 70,
      regular_211: 72,
      strong_dual: 74,
      regular_dual: 75,
      independent: 78,
      overseasGpa: 2.5,
    },
    languageAcceptance: {
      acceptsCET6: true,
      cet6MinScore: 430,
      ieltsMin: 6.0,
      toeflMin: 70,
    },
    acceptanceTips: '都会大学不仅适合均分在75左右的双非/民办同学作为保底，还开设多个中文授课硕士项目（如中国文学、工商管理等），无需语言成绩即可申请。',
    majors: [
      {
        id: 'hkmu_mba',
        nameZh: '工商管理硕士 (MBA 中文/英文)',
        nameEn: 'Master of Business Administration',
        category: 'business',
        tuitionHKD: '198,000 港币/年',
        duration: '1 年全日制',
        minLanguageRequirement: '中文班无语言硬性要求 / 英文班雅思 6.0',
        competitivenessLevel: 'moderate',
        curriculumHighlights: ['战略管理决策', '大湾区企业商业模式', '公司金融与运营实操']
      },
      {
        id: 'hkmu_ca',
        nameZh: '创意写作文学硕士 (MA Creative Writing 中文授课)',
        nameEn: 'MA in Creative Writing',
        category: 'humanities',
        tuitionHKD: '135,000 港币/年',
        duration: '1 年全日制',
        minLanguageRequirement: '中文授课 (提交文学写作作品)',
        competitivenessLevel: 'moderate',
        curriculumHighlights: ['虚构文学创作技巧', '剧本与影视文案构思', '现代出版与文创产业运营']
      }
    ]
  },
  {
    id: 'hsuhk',
    code: 'HSUHK',
    nameZh: '香港恒生大学',
    nameEn: 'The Hang Seng University of Hong Kong',
    motto: '博学笃行 (Liberal Art and Business)',
    tierGroup: 'tier4',
    qsRank2025: 1000,
    timesRank2024: 601,
    location: '新界沙田小沥源',
    badgeBgColor: 'bg-emerald-900',
    accentColor: '#064e3b',
    features: ['恒生银行背景支持', '商科与供应链管理实力出众', '小班博雅教学', '稳妥保底优选'],
    minGpaRequirement: {
      c9_985: 65,
      regular_985: 68,
      top_211: 70,
      regular_211: 72,
      strong_dual: 74,
      regular_dual: 75,
      independent: 77,
      overseasGpa: 2.5,
    },
    languageAcceptance: {
      acceptsCET6: true,
      cet6MinScore: 430,
      ieltsMin: 6.0,
      toeflMin: 70,
    },
    acceptanceTips: '恒生大学在香港商界口碑良好，尤其供应链、金融精算与翻译专业就业率优秀，适合均分75左右的同学稳妥兜底。',
    majors: [
      {
        id: 'hsu_scm',
        nameZh: '全球供应链管理理学硕士 (MSc GSCM)',
        nameEn: 'MSc in Global Supply Chain Management',
        category: 'business',
        tuitionHKD: '185,000 港币/年',
        duration: '1 年全日制',
        minLanguageRequirement: '雅思 6.0 / CET-6 430分 / 托福 70',
        competitivenessLevel: 'moderate',
        curriculumHighlights: ['智能物流与供应链物联网', '海运与航空货运管理', '绿色可持续供应链']
      }
    ]
  }
];
