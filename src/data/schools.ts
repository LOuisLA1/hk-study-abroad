import { SchoolTier } from '../types';

export interface SchoolInfo {
  name: string;
  tier: SchoolTier;
  tierLabel: string;
  province?: string;
  is985?: boolean;
  is211?: boolean;
  isDoubleFirstClass?: boolean;
}

// 常见高校数据库与层级字典
export const SCHOOL_DATABASE: SchoolInfo[] = [
  // C9 / 顶尖 985
  { name: '清华大学', tier: 'c9_985', tierLabel: 'C9 / 顶尖985', province: '北京', is985: true, is211: true, isDoubleFirstClass: true },
  { name: '北京大学', tier: 'c9_985', tierLabel: 'C9 / 顶尖985', province: '北京', is985: true, is211: true, isDoubleFirstClass: true },
  { name: '浙江大学', tier: 'c9_985', tierLabel: 'C9 / 顶尖985', province: '浙江', is985: true, is211: true, isDoubleFirstClass: true },
  { name: '上海交通大学', tier: 'c9_985', tierLabel: 'C9 / 顶尖985', province: '上海', is985: true, is211: true, isDoubleFirstClass: true },
  { name: '复旦大学', tier: 'c9_985', tierLabel: 'C9 / 顶尖985', province: '上海', is985: true, is211: true, isDoubleFirstClass: true },
  { name: '南京大学', tier: 'c9_985', tierLabel: 'C9 / 顶尖985', province: '江苏', is985: true, is211: true, isDoubleFirstClass: true },
  { name: '中国科学技术大学', tier: 'c9_985', tierLabel: 'C9 / 顶尖985', province: '安徽', is985: true, is211: true, isDoubleFirstClass: true },
  { name: '哈尔滨工业大学', tier: 'c9_985', tierLabel: 'C9 / 顶尖985', province: '黑龙江', is985: true, is211: true, isDoubleFirstClass: true },
  { name: '西安交通大学', tier: 'c9_985', tierLabel: 'C9 / 顶尖985', province: '陕西', is985: true, is211: true, isDoubleFirstClass: true },
  { name: '中国人民大学', tier: 'c9_985', tierLabel: '顶尖985 (人文社科强校)', province: '北京', is985: true, is211: true, isDoubleFirstClass: true },

  // 常规 985
  { name: '同济大学', tier: 'regular_985', tierLabel: '主流985', province: '上海', is985: true, is211: true, isDoubleFirstClass: true },
  { name: '武汉大学', tier: 'regular_985', tierLabel: '主流985', province: '湖北', is985: true, is211: true, isDoubleFirstClass: true },
  { name: '华中科技大学', tier: 'regular_985', tierLabel: '主流985', province: '湖北', is985: true, is211: true, isDoubleFirstClass: true },
  { name: '中山大学', tier: 'regular_985', tierLabel: '主流985', province: '广东', is985: true, is211: true, isDoubleFirstClass: true },
  { name: '华南理工大学', tier: 'regular_985', tierLabel: '主流985', province: '广东', is985: true, is211: true, isDoubleFirstClass: true },
  { name: '南开大学', tier: 'regular_985', tierLabel: '主流985', province: '天津', is985: true, is211: true, isDoubleFirstClass: true },
  { name: '天津大学', tier: 'regular_985', tierLabel: '主流985', province: '天津', is985: true, is211: true, isDoubleFirstClass: true },
  { name: '北京航空航天大学', tier: 'regular_985', tierLabel: '主流985', province: '北京', is985: true, is211: true, isDoubleFirstClass: true },
  { name: '北京理工大学', tier: 'regular_985', tierLabel: '主流985', province: '北京', is985: true, is211: true, isDoubleFirstClass: true },
  { name: '东南大学', tier: 'regular_985', tierLabel: '主流985', province: '江苏', is985: true, is211: true, isDoubleFirstClass: true },
  { name: '厦门大学', tier: 'regular_985', tierLabel: '主流985', province: '福建', is985: true, is211: true, isDoubleFirstClass: true },
  { name: '山东大学', tier: 'regular_985', tierLabel: '主流985', province: '山东', is985: true, is211: true, isDoubleFirstClass: true },
  { name: '中南大学', tier: 'regular_985', tierLabel: '主流985', province: '湖南', is985: true, is211: true, isDoubleFirstClass: true },
  { name: '湖南大学', tier: 'regular_985', tierLabel: '主流985', province: '湖南', is985: true, is211: true, isDoubleFirstClass: true },
  { name: '四川大学', tier: 'regular_985', tierLabel: '主流985', province: '四川', is985: true, is211: true, isDoubleFirstClass: true },
  { name: '电子科技大学', tier: 'regular_985', tierLabel: '主流985', province: '四川', is985: true, is211: true, isDoubleFirstClass: true },
  { name: '重庆大学', tier: 'regular_985', tierLabel: '主流985', province: '重庆', is985: true, is211: true, isDoubleFirstClass: true },
  { name: '吉林大学', tier: 'regular_985', tierLabel: '主流985', province: '吉林', is985: true, is211: true, isDoubleFirstClass: true },
  { name: '大连理工大学', tier: 'regular_985', tierLabel: '主流985', province: '辽宁', is985: true, is211: true, isDoubleFirstClass: true },
  { name: '东北大学', tier: 'regular_985', tierLabel: '主流985', province: '辽宁', is985: true, is211: true, isDoubleFirstClass: true },
  { name: '华东师范大学', tier: 'regular_985', tierLabel: '主流985', province: '上海', is985: true, is211: true, isDoubleFirstClass: true },
  { name: '中国农业大学', tier: 'regular_985', tierLabel: '主流985', province: '北京', is985: true, is211: true, isDoubleFirstClass: true },
  { name: '中国海洋大学', tier: 'regular_985', tierLabel: '主流985', province: '山东', is985: true, is211: true, isDoubleFirstClass: true },
  { name: '西北工业大学', tier: 'regular_985', tierLabel: '主流985', province: '陕西', is985: true, is211: true, isDoubleFirstClass: true },
  { name: '兰州大学', tier: 'regular_985', tierLabel: '主流985', province: '甘肃', is985: true, is211: true, isDoubleFirstClass: true },

  // 强 211 / 双一流
  { name: '北京邮电大学', tier: 'top_211', tierLabel: '强211 / 两电一邮', province: '北京', is211: true, isDoubleFirstClass: true },
  { name: '上海财经大学', tier: 'top_211', tierLabel: '强211 / 两财一贸', province: '上海', is211: true, isDoubleFirstClass: true },
  { name: '中央财经大学', tier: 'top_211', tierLabel: '强211 / 两财一贸', province: '北京', is211: true, isDoubleFirstClass: true },
  { name: '对外经济贸易大学', tier: 'top_211', tierLabel: '强211 / 两财一贸', province: '北京', is211: true, isDoubleFirstClass: true },
  { name: '中国政法大学', tier: 'top_211', tierLabel: '强211 / 五院四系', province: '北京', is211: true, isDoubleFirstClass: true },
  { name: '中国传媒大学', tier: 'top_211', tierLabel: '强211 / 传媒顶尖', province: '北京', is211: true, isDoubleFirstClass: true },
  { name: '北京外国语大学', tier: 'top_211', tierLabel: '强211 / 外语顶尖', province: '北京', is211: true, isDoubleFirstClass: true },
  { name: '上海外国语大学', tier: 'top_211', tierLabel: '强211 / 外语顶尖', province: '上海', is211: true, isDoubleFirstClass: true },
  { name: '西安电子科技大学', tier: 'top_211', tierLabel: '强211 / 两电一邮', province: '陕西', is211: true, isDoubleFirstClass: true },
  { name: '南京航空航天大学', tier: 'top_211', tierLabel: '强211 / 国防特色', province: '江苏', is211: true, isDoubleFirstClass: true },
  { name: '南京理工大学', tier: 'top_211', tierLabel: '强211 / 国防特色', province: '江苏', is211: true, isDoubleFirstClass: true },
  { name: '华东理工大学', tier: 'top_211', tierLabel: '强211 / 上海知名', province: '上海', is211: true, isDoubleFirstClass: true },
  { name: '西南财经大学', tier: 'top_211', tierLabel: '强211 / 财经名校', province: '四川', is211: true, isDoubleFirstClass: true },
  { name: '中南财经政法大学', tier: 'top_211', tierLabel: '强211 / 经管法学', province: '湖北', is211: true, isDoubleFirstClass: true },
  { name: '苏州大学', tier: 'top_211', tierLabel: '强211 / 综合重点', province: '江苏', is211: true, isDoubleFirstClass: true },
  { name: '暨南大学', tier: 'top_211', tierLabel: '强211 / 华侨第一学府', province: '广东', is211: true, isDoubleFirstClass: true },

  // 常规 211
  { name: '北京交通大学', tier: 'regular_211', tierLabel: '常规211', province: '北京', is211: true, isDoubleFirstClass: true },
  { name: '北京科技大学', tier: 'regular_211', tierLabel: '常规211', province: '北京', is211: true, isDoubleFirstClass: true },
  { name: '北京化工大学', tier: 'regular_211', tierLabel: '常规211', province: '北京', is211: true, isDoubleFirstClass: true },
  { name: '北京工业大学', tier: 'regular_211', tierLabel: '常规211', province: '北京', is211: true, isDoubleFirstClass: true },
  { name: '华北电力大学', tier: 'regular_211', tierLabel: '常规211', province: '北京', is211: true, isDoubleFirstClass: true },
  { name: '中国地质大学', tier: 'regular_211', tierLabel: '常规211', province: '湖北/北京', is211: true, isDoubleFirstClass: true },
  { name: '中国矿业大学', tier: 'regular_211', tierLabel: '常规211', province: '江苏/北京', is211: true, isDoubleFirstClass: true },
  { name: '中国石油大学', tier: 'regular_211', tierLabel: '常规211', province: '山东/北京', is211: true, isDoubleFirstClass: true },
  { name: '河海大学', tier: 'regular_211', tierLabel: '常规211', province: '江苏', is211: true, isDoubleFirstClass: true },
  { name: '江南大学', tier: 'regular_211', tierLabel: '常规211', province: '江苏', is211: true, isDoubleFirstClass: true },
  { name: '南京农业大学', tier: 'regular_211', tierLabel: '常规211', province: '江苏', is211: true, isDoubleFirstClass: true },
  { name: '南京师范大学', tier: 'regular_211', tierLabel: '常规211', province: '江苏', is211: true, isDoubleFirstClass: true },
  { name: '福州大学', tier: 'regular_211', tierLabel: '常规211', province: '福建', is211: true, isDoubleFirstClass: true },
  { name: '南昌大学', tier: 'regular_211', tierLabel: '常规211', province: '江西', is211: true, isDoubleFirstClass: true },
  { name: '郑州大学', tier: 'regular_211', tierLabel: '常规211', province: '河南', is211: true, isDoubleFirstClass: true },
  { name: '合肥工业大学', tier: 'regular_211', tierLabel: '常规211', province: '安徽', is211: true, isDoubleFirstClass: true },
  { name: '安徽大学', tier: 'regular_211', tierLabel: '常规211', province: '安徽', is211: true, isDoubleFirstClass: true },
  { name: '武汉理工大学', tier: 'regular_211', tierLabel: '常规211', province: '湖北', is211: true, isDoubleFirstClass: true },
  { name: '华中农业大学', tier: 'regular_211', tierLabel: '常规211', province: '湖北', is211: true, isDoubleFirstClass: true },
  { name: '华中师范大学', tier: 'regular_211', tierLabel: '常规211', province: '湖北', is211: true, isDoubleFirstClass: true },
  { name: '华南师范大学', tier: 'regular_211', tierLabel: '常规211', province: '广东', is211: true, isDoubleFirstClass: true },
  { name: '西南交通大学', tier: 'regular_211', tierLabel: '常规211', province: '四川', is211: true, isDoubleFirstClass: true },
  { name: '西南大学', tier: 'regular_211', tierLabel: '常规211', province: '重庆', is211: true, isDoubleFirstClass: true },
  { name: '西北大学', tier: 'regular_211', tierLabel: '常规211', province: '陕西', is211: true, isDoubleFirstClass: true },
  { name: '陕西师范大学', tier: 'regular_211', tierLabel: '常规211', province: '陕西', is211: true, isDoubleFirstClass: true },
  { name: '长安大学', tier: 'regular_211', tierLabel: '常规211', province: '陕西', is211: true, isDoubleFirstClass: true },
  { name: '云南大学', tier: 'regular_211', tierLabel: '常规211', province: '云南', is211: true, isDoubleFirstClass: true },
  { name: '贵州大学', tier: 'regular_211', tierLabel: '常规211', province: '贵州', is211: true, isDoubleFirstClass: true },
  { name: '广西大学', tier: 'regular_211', tierLabel: '常规211', province: '广西', is211: true, isDoubleFirstClass: true },
  { name: '海南大学', tier: 'regular_211', tierLabel: '常规211', province: '海南', is211: true, isDoubleFirstClass: true },
  { name: '河北工业大学', tier: 'regular_211', tierLabel: '常规211', province: '天津/河北', is211: true, isDoubleFirstClass: true },
  { name: '太原理工大学', tier: 'regular_211', tierLabel: '常规211', province: '山西', is211: true, isDoubleFirstClass: true },
  { name: '内蒙古大学', tier: 'regular_211', tierLabel: '常规211', province: '内蒙古', is211: true, isDoubleFirstClass: true },
  { name: '辽宁大学', tier: 'regular_211', tierLabel: '常规211', province: '辽宁', is211: true, isDoubleFirstClass: true },
  { name: '大连海事大学', tier: 'regular_211', tierLabel: '常规211', province: '辽宁', is211: true, isDoubleFirstClass: true },
  { name: '延边大学', tier: 'regular_211', tierLabel: '常规211', province: '吉林', is211: true, isDoubleFirstClass: true },
  { name: '东北师范大学', tier: 'regular_211', tierLabel: '常规211', province: '吉林', is211: true, isDoubleFirstClass: true },
  { name: '东北农业大学', tier: 'regular_211', tierLabel: '常规211', province: '黑龙江', is211: true, isDoubleFirstClass: true },
  { name: '东北林业大学', tier: 'regular_211', tierLabel: '常规211', province: '黑龙江', is211: true, isDoubleFirstClass: true },
  { name: '哈尔滨工程大学', tier: 'regular_211', tierLabel: '常规211', province: '黑龙江', is211: true, isDoubleFirstClass: true },

  // 强双非 / 特色重点高校
  { name: '深圳大学', tier: 'strong_dual', tierLabel: '强双非 / 港校极度认可', province: '广东' },
  { name: '南方科技大学', tier: 'strong_dual', tierLabel: '双一流 / 顶尖新型研究型', province: '广东', isDoubleFirstClass: true },
  { name: '华东政法大学', tier: 'strong_dual', tierLabel: '强双非 / 五院四系法学强校', province: '上海' },
  { name: '西南政法大学', tier: 'strong_dual', tierLabel: '强双非 / 五院四系法学强校', province: '重庆' },
  { name: '南京邮电大学', tier: 'strong_dual', tierLabel: '双一流 / 通信计算机强校', province: '江苏', isDoubleFirstClass: true },
  { name: '杭州电子科技大学', tier: 'strong_dual', tierLabel: '强双非 / IT大厂摇篮', province: '浙江' },
  { name: '广东外语外贸大学', tier: 'strong_dual', tierLabel: '强双非 / 港校高认可度', province: '广东' },
  { name: '首都经济贸易大学', tier: 'strong_dual', tierLabel: '强双非 / 财经名校', province: '北京' },
  { name: '江西财经大学', tier: 'strong_dual', tierLabel: '强双非 / 财经名校', province: '江西' },
  { name: '浙江工商大学', tier: 'strong_dual', tierLabel: '强双非 / 财经名校', province: '浙江' },
  { name: '上海对外经贸大学', tier: 'strong_dual', tierLabel: '强双非 / 经贸名校', province: '上海' },
  { name: '南京审计大学', tier: 'strong_dual', tierLabel: '强双非 / 审计第一校', province: '江苏' },
  { name: '汕头大学', tier: 'strong_dual', tierLabel: '强双非 / 港校友好', province: '广东' },
  { name: '广州大学', tier: 'strong_dual', tierLabel: '强双非 / 省重点', province: '广东' },
  { name: '扬州大学', tier: 'strong_dual', tierLabel: '强双非 / 江苏重点', province: '江苏' },
  { name: '江苏大学', tier: 'strong_dual', tierLabel: '强双非 / 江苏重点', province: '江苏' },
  { name: '浙江工业大学', tier: 'strong_dual', tierLabel: '强双非 / 浙江重点', province: '浙江' },
  { name: '上海大学', tier: 'top_211', tierLabel: '强211 / 上海市属第一校', province: '上海', is211: true, isDoubleFirstClass: true },

  // 中外合作办学
  { name: '香港中文大学（深圳）', tier: 'sino_foreign', tierLabel: '中外/合办 / 港校极高认可', province: '广东' },
  { name: '香港科技大学（广州）', tier: 'sino_foreign', tierLabel: '中外/合办 / 港校极高认可', province: '广东' },
  { name: '上海纽约大学', tier: 'sino_foreign', tierLabel: '中外合办 / 国际化名校', province: '上海' },
  { name: '昆山杜克大学', tier: 'sino_foreign', tierLabel: '中外合办 / 国际化名校', province: '江苏' },
  { name: '西交利物浦大学', tier: 'sino_foreign', tierLabel: '中外合办 / 英国名校体系', province: '江苏' },
  { name: '宁波诺丁汉大学', tier: 'sino_foreign', tierLabel: '中外合办 / 英国名校体系', province: '浙江' },
  { name: '北师港浸大 (UIC)', tier: 'sino_foreign', tierLabel: '合办 / 浸会合作体系', province: '广东' },
  { name: '温州肯恩大学', tier: 'sino_foreign', tierLabel: '中外合办 / 美式体系', province: '浙江' },

  // 国际与海本分类
  { name: '海外本科 (QS前100院校)', tier: 'overseas', tierLabel: '海本 (英美澳加等顶级高校)' },
  { name: '海外本科 (常规国际院校)', tier: 'overseas', tierLabel: '海本 (常规海外大学)' },
];

export const SCHOOL_TIER_META: Record<SchoolTier, { label: string; desc: string; baseScore: number }> = {
  c9_985: { label: 'C9 / 顶尖 985', desc: '清华、北大、复交浙、中科大、哈工、西交、人大等', baseScore: 96 },
  regular_985: { label: '主流 985 高校', desc: '武大、华科、中大、同济、天大、南开、厦大、成电等', baseScore: 90 },
  top_211: { label: '头部/专业强 211', desc: '北邮、央财、上财、贸大、法大、中传、北外、西电等', baseScore: 86 },
  regular_211: { label: '常规 211 / 双一流学科', desc: '郑大、南昌大学、福州大学、安徽大学、西南大学等', baseScore: 82 },
  strong_dual: { label: '强双非 / 特色省重点', desc: '深圳大学、华政、西政、南邮、杭电、广外、江财等', baseScore: 78 },
  regular_dual: { label: '普通公办双非本科', desc: '普通省属公办本科一批/二批高校', baseScore: 72 },
  sino_foreign: { label: '中外合作办学 / 港校分校', desc: '港中深、港科广、上纽大、西浦、宁诺、UIC 等', baseScore: 88 },
  independent: { label: '独立学院 / 民办 / 专升本', desc: '各类独立民办学院或成教/专升本背景', baseScore: 62 },
  overseas: { label: '海外大学本科 (海本)', desc: '英国、美国、澳洲、加拿大、新加坡等海外高校', baseScore: 85 },
};
