# 🎓 港校升学通 (HK Study Abroad Recommender)

> **2025/2026 香港高校硕士/本科智能选校与录取概率多维评估系统**  
> 基于真实招录大数据，精准输入本科院校背景与 GPA，秒级测算录取几率并生成 **🚀 冲刺、🎯 核心匹配、🛡️ 稳妥保底** 三阶个性化推荐方案。

[![Live Demo](https://img.shields.io/badge/Online%20Demo-Live%20Now-emerald?style=for-the-badge&logo=githubpages&logoColor=white)](https://louisla1.github.io/hk-study-abroad/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.2-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-amber.svg?style=flat-square)](LICENSE)

---

## 🌐 在线体验 (Live Access)

无需安装任何环境，全设备（手机/平板/电脑）随时随地在线访问：

👉 **[https://louisla1.github.io/hk-study-abroad/](https://louisla1.github.io/hk-study-abroad/)**

---

## ✨ 核心功能亮点 (Key Features)

### 1. 🏫 智能院校联想与层级识别
- **国内大学名单智能联想**：输入高校校名（如“武汉大学”、“深圳大学”）自动识别院校层级（C9/顶尖985、主流985、强211、常规211、强双非、中外合办、独立民办、海外本科等）。
- **多制式 GPA 自动归一化**：支持 **百分制 (0-100)**、**4.0 制**、**4.3 制**、**4.5 制** 自由切换，支持精准数值与直观滑动条微调。

### 2. 🎯 三梯度科学选校矩阵
- **🚀 冲刺院校 (Reach - 录取几率 20%~45%)**：适合放手一搏的高上限院校，附早鸟 Round 1 申请策略。
- **🎯 核心匹配院校 (Match - 录取几率 50%~80%)**：各项背景高度契合的主力投递池。
- **🛡️ 稳妥保底院校 (Safety - 录取几率 > 80%)**：门槛完全达标，确保录取不滑档。

### 3. 📊 多维背景雷达分布与 AI 提分锦囊
- **五维能力雷达图**：直观量化展示「学术均分」、「院校背景平台」、「语言水平」、「实践科研」及「专业竞争优势」。
- **动态 AI 强化建议**：精准指出学员短板，提供具体的提分收益预测（如 *“均分若达到 88 分可直接解锁港前三”*、*“考取雅思 7.0 破除六级限制”*）。

### 4. 📚 香港高校全景数据库
- 涵盖 **港前三 (HKU, HKUST, CUHK)**、**港前五 (CityU, PolyU)**、**港八校 (HKBU, Lingnan, EdUHK)** 及优质私立高校 (都会 HKMU、恒生 HSUHK、树仁 HKSYU)。
- 支持按 QS 梯队、专业方向、是否认可**大学英语六级 (CET-6)** 进行实时复合筛选。
- 完整包含各专业学费、学制时长、语言门槛及最新招录偏好分析。

### 5. 🧭 2025/2026 官方申请策略指南
- **Rolling 滚动录取时间线**：3-8月背景筑基 ➔ 9-11月早鸟 R1 投递 ➔ 12-3月 Offer 缴费 ➔ 4-8月签证行前。
- **一年制硕士学费与生活成本测算**。
- **毕业 2 年无条件 IANG 留港工作签证与 7 年转香港永久居民身份 (HKPR) 政策全解析**。

### 6. 📄 报告一键导出与打印
- 支持一键调起浏览器打印为 PDF 选校报告。
- 支持一键复制格式化的纯文本选校方案到剪贴板，便于微信/邮件即时分享。

---

## 🧮 算法评估机制 (Algorithm Architecture)

综合学生竞争力评分体系结合多维度加权计算：

```math
\text{Score} = (w_{\text{gpa}} \times \text{NormGPA}) + (w_{\text{school}} \times \text{SchoolTierScore}) + (w_{\text{lang}} \times \text{LanguageScore}) + (w_{\text{exp}} \times \text{ExperienceScore}) - \Delta_{\text{MajorDifficulty}}
```

| 评估维度 | 权重比例 | 说明 |
| :--- | :--- | :--- |
| **学术均分 (GPA)** | 40% | 归一化换算至百分制 (0-100) |
| **本科院校背景** | 35% | 根据 C9 / 985 / 211 / 双非 / 海本层级基准赋分 |
| **语言成绩水平** | 15% | 雅思 / 托福 / 六级及各校认可度动态调整 |
| **实践与软性背景** | 10% | 专业实习段数、科研论文项目、竞赛奖项累加 |
| **专业竞争难度修正** | 浮动调节 | 商科金融、计算机/AI 门槛上浮；传统工科、理学社科适度平缓 |

---

## 💻 本地运行与开发 (Local Development)

### 前置要求
- [Node.js](https://nodejs.org/) (>= 18.0.0)
- npm 或 pnpm / yarn

### 安装与启动步骤

```bash
# 1. 克隆代码仓库
git clone https://github.com/LOuisLA1/hk-study-abroad.git
cd hk-study-abroad

# 2. 安装依赖
npm install

# 3. 启动本地开发服务器
npm run dev
```

在浏览器中打开 `http://localhost:3000/` 即可开始本地预览与调试。

### 构建生产包

```bash
npm run build
```

---

## 🛠️ 技术栈 (Tech Stack)

- **前端框架**：[React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **构建工具**：[Vite 5](https://vitejs.dev/)
- **样式方案**：[Tailwind CSS 3](https://tailwindcss.com/)
- **图标系统**：[Lucide React](https://lucide.dev/)
- **自动化部署**：[GitHub Actions](https://github.com/features/actions) ➔ [GitHub Pages](https://pages.github.com/)

---

## 📄 开源许可证 (License)

本项目采用 [MIT License](LICENSE) 授权开源。

---

> 💡 *声明：本系统内推荐算法模型与往年录取均分均基于公开招生简章及历史大数据样本测算，仅供择校参考定位。实际录取请以各香港高校官网当年公布的最终招生要求为准。*
