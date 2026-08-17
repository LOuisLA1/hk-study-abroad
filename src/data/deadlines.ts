import { ApplicationDeadline } from '../types';

export const HK_APPLICATION_DEADLINES: ApplicationDeadline[] = [
  // 香港大学 (HKU)
  {
    id: 'hku-business-r1',
    universityCode: 'HKU',
    universityName: '香港大学',
    faculty: '经管学院 (HKU Business School)',
    majorName: '金融学 / 商业分析 / 金融科技 / 市场营销 (MFin/MSBA/FinTech)',
    roundName: 'Round 1 (早鸟轮 - 席位最多)',
    deadlineDate: '2026-10-16T23:59:59+08:00',
    isOfficialEstimated: false,
    portalUrl: 'https://www.hkubs.hku.hk/programmes/postgraduate/',
    notes: '极力推荐首轮投递，通常需线上面试，首批 Offer 12月中旬发放'
  },
  {
    id: 'hku-business-r2',
    universityCode: 'HKU',
    universityName: '香港大学',
    faculty: '经管学院 (HKU Business School)',
    majorName: '全日制商科硕士项目 (MFin/MSBA/MEcon/MSMkt)',
    roundName: 'Round 2 (常规轮)',
    deadlineDate: '2026-12-04T23:59:59+08:00',
    isOfficialEstimated: false,
    portalUrl: 'https://www.hkubs.hku.hk/programmes/postgraduate/',
    notes: '第二轮竞争白热化，建议均分 87+ / 雅思 7.0+'
  },
  {
    id: 'hku-cs-r1',
    universityCode: 'HKU',
    universityName: '香港大学',
    faculty: '工程学院 (Faculty of Engineering)',
    majorName: '计算机科学 / 数据科学 (MSc CS / MDASC)',
    roundName: 'Main Round (主申请轮)',
    deadlineDate: '2026-12-31T23:59:59+08:00',
    isOfficialEstimated: false,
    portalUrl: 'https://engg.hku.hk/Admissions/MSc',
    notes: 'Rolling 录取，招满即止，计算机背景与编程项目看重'
  },
  {
    id: 'hku-arts-r1',
    universityCode: 'HKU',
    universityName: '香港大学',
    faculty: '文学院与新闻传理 (Faculty of Arts / JMSC)',
    majorName: '新闻学硕士 (MJ) / 应用语言学 (MAAL)',
    roundName: 'Round 1 (首轮截止)',
    deadlineDate: '2026-11-30T23:59:59+08:00',
    isOfficialEstimated: false,
    portalUrl: 'https://jmsc.hku.hk/admissions/',
    notes: '新闻学需提交英文写作 Sample 及笔试面试'
  },

  // 香港科技大学 (HKUST)
  {
    id: 'hkust-business-r1',
    universityCode: 'HKUST',
    universityName: '香港科技大学',
    faculty: '商学院 (HKUST Business School)',
    majorName: '金融学 / 商业分析 / 资讯系统管理 (MSc Finance/BA/ISM)',
    roundName: 'Round 1 (优先早鸟轮)',
    deadlineDate: '2026-10-18T23:59:59+08:00',
    isOfficialEstimated: false,
    portalUrl: 'https://prog-crawford.hkust.edu.hk/',
    notes: '商学院强推 GMAT/GRE 成绩，首轮发放奖学金概率最高'
  },
  {
    id: 'hkust-cs-bdt-r1',
    universityCode: 'HKUST',
    universityName: '香港科技大学',
    faculty: '工学院 (School of Engineering)',
    majorName: '大数据科技 / 人工智能 / 信息技术 (MSc BDT/AI/IT)',
    roundName: 'Round 1 (早鸟轮)',
    deadlineDate: '2026-11-01T23:59:59+08:00',
    isOfficialEstimated: false,
    portalUrl: 'https://seng.hkust.edu.hk/academics/taught-postgraduate',
    notes: '工学院王牌项目，数学与代码背景硬核要求'
  },
  {
    id: 'hkust-business-r2',
    universityCode: 'HKUST',
    universityName: '香港科技大学',
    faculty: '商学院 (HKUST Business School)',
    majorName: '金融学 / 商业分析 / 经济学 (MSc Fin/BA/Econ)',
    roundName: 'Round 2 (常规第二轮)',
    deadlineDate: '2026-12-15T23:59:59+08:00',
    isOfficialEstimated: false,
    portalUrl: 'https://prog-crawford.hkust.edu.hk/',
    notes: '第二轮递交通常次年 1-2 月收到面试'
  },

  // 香港中文大学 (CUHK)
  {
    id: 'cuhk-business-r1',
    universityCode: 'CUHK',
    universityName: '香港中文大学',
    faculty: '商学院 (CUHK Business School)',
    majorName: '金融学 / 商业分析 / 市场营销 (MSc Finance/BA/Mkt)',
    roundName: 'Round 1 (早鸟截止)',
    deadlineDate: '2026-10-14T23:59:59+08:00',
    isOfficialEstimated: false,
    portalUrl: 'https://www.bschool.cuhk.edu.hk/programmes/masters-programmes/',
    notes: '硬性要求本科 B 等级 (均分80+) 及 GMAT/GRE 成绩'
  },
  {
    id: 'cuhk-comm-r1',
    universityCode: 'CUHK',
    universityName: '香港中文大学',
    faculty: '新闻与传播学院 (School of Journalism)',
    majorName: '新媒体理学 / 全球传播文学 (MSc New Media / MA Global Comm)',
    roundName: 'Round 1 (优先轮)',
    deadlineDate: '2026-11-10T23:59:59+08:00',
    isOfficialEstimated: false,
    portalUrl: 'https://www.com.cuhk.edu.hk/',
    notes: '亚洲顶尖新传学院，雅思要求 7.0 (新媒体单项6.0+)'
  },
  {
    id: 'cuhk-eng-r1',
    universityCode: 'CUHK',
    universityName: '香港中文大学',
    faculty: '工程学院 (Faculty of Engineering)',
    majorName: '计算机科学 / 信息工程 / 金融科技 (MSc CS/IE/FinTech)',
    roundName: 'Round 1 (首轮)',
    deadlineDate: '2026-11-15T23:59:59+08:00',
    isOfficialEstimated: false,
    portalUrl: 'https://www.erg.cuhk.edu.hk/erg/pgrad',
    notes: '先到先得，建议理工科背景及高绩点同学首轮递交'
  },
  {
    id: 'cuhk-business-r2',
    universityCode: 'CUHK',
    universityName: '香港中文大学',
    faculty: '商学院 (CUHK Business School)',
    majorName: '商科全系项目 (MSc Business Series)',
    roundName: 'Round 2 (常规轮)',
    deadlineDate: '2026-12-10T23:59:59+08:00',
    isOfficialEstimated: false,
    portalUrl: 'https://www.bschool.cuhk.edu.hk/programmes/masters-programmes/',
    notes: '常规轮名额相对收窄，需突出文书差异化亮点'
  },

  // 香港理工大学 (PolyU)
  {
    id: 'polyu-comp-r1',
    universityCode: 'PolyU',
    universityName: '香港理工大学',
    faculty: '电子计算学系 (Department of Computing)',
    majorName: '信息技术 / 人工智能与大数据计算 (MSc IT / AIBDC)',
    roundName: 'Round 1 (早鸟轮)',
    deadlineDate: '2026-11-30T23:59:59+08:00',
    isOfficialEstimated: false,
    portalUrl: 'https://www.polyu.edu.hk/study/pg/tpg',
    notes: 'PolyU 计算机学科 QS 全球排名前列，就业内推网络广泛'
  },
  {
    id: 'polyu-shtm-r1',
    universityCode: 'PolyU',
    universityName: '香港理工大学',
    faculty: '酒店及旅游业管理学院 (SHTM - 全球第1)',
    majorName: '国际酒店管理理学硕士 (MSc International Hospitality Management)',
    roundName: 'Priority Round (优先轮)',
    deadlineDate: '2026-12-15T23:59:59+08:00',
    isOfficialEstimated: false,
    portalUrl: 'https://www.polyu.edu.hk/shtm/',
    notes: '全球学科第一项目，含唯港荟 (Hotel ICON) 实训与行业名企网络'
  },
  {
    id: 'polyu-fb-r1',
    universityCode: 'PolyU',
    universityName: '香港理工大学',
    faculty: '工商管理学院 (Faculty of Business)',
    majorName: '金融学 (MoF) / 全球供应链管理 (MSc GSCM)',
    roundName: 'Round 1 (首轮)',
    deadlineDate: '2026-11-15T23:59:59+08:00',
    isOfficialEstimated: false,
    portalUrl: 'https://www.polyu.edu.hk/study/pg/tpg',
    notes: '供应链与海事管理全球极具声誉，首轮录取比例大'
  },

  // 香港城市大学 (CityU)
  {
    id: 'cityu-cs-ds-r1',
    universityCode: 'CityU',
    universityName: '香港城市大学',
    faculty: '数据科学学院 / 计算机系 (School of Data Science / CS)',
    majorName: '数据科学理学硕士 (MSDS) / 计算机科学 (MSc CS)',
    roundName: 'Main Round (主要轮次)',
    deadlineDate: '2027-01-15T23:59:59+08:00',
    isOfficialEstimated: false,
    portalUrl: 'https://www.cityu.edu.hk/pg/taught-postgraduate-programmes',
    notes: '认可英语六级 CET-6 (450+)，性价比极高，建议早交早审'
  },
  {
    id: 'cityu-business-r1',
    universityCode: 'CityU',
    universityName: '香港城市大学',
    faculty: '商学院 (College of Business)',
    majorName: '商务资讯系统 (MSc BIS) / 金融学 (MSc Finance)',
    roundName: 'Priority Round (优先轮)',
    deadlineDate: '2026-12-31T23:59:59+08:00',
    isOfficialEstimated: false,
    portalUrl: 'https://www.cb.cityu.edu.hk/',
    notes: 'BIS 分为金融科技流与管理流，六级可申请'
  },

  // 香港浸会大学 (HKBU)
  {
    id: 'hkbu-comm-r1',
    universityCode: 'HKBU',
    universityName: '香港浸会大学',
    faculty: '传理学院 (School of Communication - 亚洲第1)',
    majorName: '传播学文学硕士 (MA Comm) / 影视制片 (MFA) / AI与数码媒体 (AIDM)',
    roundName: 'Main Round (主轮截止)',
    deadlineDate: '2027-01-31T23:59:59+08:00',
    isOfficialEstimated: false,
    portalUrl: 'https://gs.hkbu.edu.hk/programmes',
    notes: '传理学院王牌，认可六级 CET-6 (450+)，需作品集或命题文书'
  },

  // 香港岭南大学 (Lingnan)
  {
    id: 'ln-ide-r1',
    universityCode: 'Lingnan',
    universityName: '香港岭南大学',
    faculty: '经济系与商学院 (Faculty of Business)',
    majorName: '国际与发展经济学 (IDE) / AI与商业分析 (AI&BA)',
    roundName: 'Early Round (早轮)',
    deadlineDate: '2027-01-15T23:59:59+08:00',
    isOfficialEstimated: false,
    portalUrl: 'https://www.ln.edu.hk/taught-postgraduate-programmes',
    notes: '博雅教育特色，六级 450+ 友好，就业提供大湾区实习直通车'
  },

  // 香港教育大学 (EdUHK)
  {
    id: 'eduhk-med-r1',
    universityCode: 'EdUHK',
    universityName: '香港教育大学',
    faculty: '教育及人类发展学院 (Faculty of Education)',
    majorName: '教育学硕士 (MEd) / 英语教学 (MATESOL) / AI教育科技 (AIED)',
    roundName: 'Main Round (主轮)',
    deadlineDate: '2027-02-25T23:59:59+08:00',
    isOfficialEstimated: false,
    portalUrl: 'https://www.eduhk.hk/acadprog/postgrad/',
    notes: 'QS 全球教育学科第21名，六级 430+ 即可申请，双非考公考编首选'
  }
];
