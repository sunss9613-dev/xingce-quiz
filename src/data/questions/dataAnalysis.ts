import { Module, SubCategory, Difficulty } from '../../models/question';
import type { Question } from '../../models/question';

export const dataAnalysisQuestions: Question[] = [
  // ========== 图表分析 (5题) ==========
  {
    id: 'da-chart-001',
    module: Module.DATA_ANALYSIS,
    subCategory: SubCategory.CHART_ANALYSIS,
    difficulty: Difficulty.MEDIUM,
    stem: '2023年第一季度，该企业的营业收入同比增长率约为：',
    sharedMaterial: {
      type: 'table',
      content: `某企业2022-2023年季度营业收入（单位：万元）

| 季度 | 2022年 | 2023年 |
|------|--------|--------|
| Q1   | 1200   | 1380   |
| Q2   | 1350   | 1560   |
| Q3   | 1400   | 1500   |
| Q4   | 1600   | 1820   |`,
    },
    options: [
      { label: 'A', text: '12%' },
      { label: 'B', text: '13.5%' },
      { label: 'C', text: '15%' },
      { label: 'D', text: '18%' },
    ],
    answer: 'C',
    explanation: '2023年Q1同比增长率 = (1380-1200)/1200 × 100% = 180/1200 × 100% = 15%。',
    tags: ['增长率', '图表计算'],
    year: 2024,
  },
  {
    id: 'da-chart-002',
    module: Module.DATA_ANALYSIS,
    subCategory: SubCategory.CHART_ANALYSIS,
    difficulty: Difficulty.EASY,
    stem: '2023年全年该企业的营业总收入比2022年增长了多少万元？',
    sharedMaterial: {
      type: 'table',
      content: `某企业2022-2023年季度营业收入（单位：万元）

| 季度 | 2022年 | 2023年 |
|------|--------|--------|
| Q1   | 1200   | 1380   |
| Q2   | 1350   | 1560   |
| Q3   | 1400   | 1500   |
| Q4   | 1600   | 1820   |`,
    },
    options: [
      { label: 'A', text: '680' },
      { label: 'B', text: '710' },
      { label: 'C', text: '750' },
      { label: 'D', text: '820' },
    ],
    answer: 'B',
    explanation: '2022年全年=1200+1350+1400+1600=5550万元。2023年全年=1380+1560+1500+1820=6260万元。增长=6260-5550=710万元。',
    tags: ['增量计算', '图表计算'],
    year: 2024,
  },
  {
    id: 'da-chart-003',
    module: Module.DATA_ANALYSIS,
    subCategory: SubCategory.CHART_ANALYSIS,
    difficulty: Difficulty.MEDIUM,
    stem: '2023年增长率最高的季度是：',
    sharedMaterial: {
      type: 'table',
      content: `某企业2022-2023年季度营业收入（单位：万元）

| 季度 | 2022年 | 2023年 |
|------|--------|--------|
| Q1   | 1200   | 1380   |
| Q2   | 1350   | 1560   |
| Q3   | 1400   | 1500   |
| Q4   | 1600   | 1820   |`,
    },
    options: [
      { label: 'A', text: 'Q1' },
      { label: 'B', text: 'Q2' },
      { label: 'C', text: 'Q3' },
      { label: 'D', text: 'Q4' },
    ],
    answer: 'B',
    explanation: 'Q1增长率=(1380-1200)/1200=15.00%；Q2=(1560-1350)/1350≈15.56%；Q3=(1500-1400)/1400≈7.14%；Q4=(1820-1600)/1600=13.75%。Q2增长率最高。',
    tags: ['增长率比较', '图表计算'],
    year: 2024,
  },
  {
    id: 'da-chart-004',
    module: Module.DATA_ANALYSIS,
    subCategory: SubCategory.CHART_ANALYSIS,
    difficulty: Difficulty.HARD,
    stem: '若2024年第一季度该企业营业收入环比增长10%，则2024年Q1的营业收入约为多少万元？',
    sharedMaterial: {
      type: 'table',
      content: `某企业2022-2023年季度营业收入（单位：万元）

| 季度 | 2022年 | 2023年 |
|------|--------|--------|
| Q1   | 1200   | 1380   |
| Q2   | 1350   | 1560   |
| Q3   | 1400   | 1500   |
| Q4   | 1600   | 1820   |`,
    },
    options: [
      { label: 'A', text: '1890' },
      { label: 'B', text: '1950' },
      { label: 'C', text: '2002' },
      { label: 'D', text: '2100' },
    ],
    answer: 'C',
    explanation: '环比增长指与上一季度（2023年Q4）比较。2023年Q4=1820万元，2024年Q1=1820×(1+10%)=1820×1.1=2002万元。',
    tags: ['环比增长', '预测计算'],
    year: 2024,
  },
  {
    id: 'da-chart-005',
    module: Module.DATA_ANALYSIS,
    subCategory: SubCategory.CHART_ANALYSIS,
    difficulty: Difficulty.EASY,
    stem: '2023年Q3的营业收入与2022年Q3相比，增长了多少个百分点？',
    sharedMaterial: {
      type: 'table',
      content: `某企业2022-2023年季度营业收入（单位：万元）

| 季度 | 2022年 | 2023年 |
|------|--------|--------|
| Q1   | 1200   | 1380   |
| Q2   | 1350   | 1560   |
| Q3   | 1400   | 1500   |
| Q4   | 1600   | 1820   |`,
    },
    options: [
      { label: 'A', text: '约5.3%' },
      { label: 'B', text: '约7.1%' },
      { label: 'C', text: '约8.2%' },
      { label: 'D', text: '约10%' },
    ],
    answer: 'B',
    explanation: 'Q3增长率 = (1500-1400)/1400 × 100% = 100/1400 × 100% ≈ 7.14%。',
    tags: ['增长率', '基础计算'],
    year: 2023,
  },

  // ========== 文字材料分析 (5题) ==========
  {
    id: 'da-text-001',
    module: Module.DATA_ANALYSIS,
    subCategory: SubCategory.TEXT_MATERIAL_ANALYSIS,
    difficulty: Difficulty.HARD,
    stem: '2023年实物商品网上零售额占社会消费品零售总额的比重约为：',
    sharedMaterial: {
      type: 'text',
      content: `2023年，全国网上零售额154264亿元，比上年增长11.0%。其中，实物商品网上零售额130174亿元，增长8.4%，占社会消费品零售总额的比重为27.6%；在实物商品网上零售额中，吃类、穿类和用类商品分别增长11.2%、10.8%和7.1%。`,
    },
    options: [
      { label: 'A', text: '11.5%' },
      { label: 'B', text: '24.8%' },
      { label: 'C', text: '27.6%' },
      { label: 'D', text: '35.2%' },
    ],
    answer: 'C',
    explanation: '材料中直接给出："实物商品网上零售额……占社会消费品零售总额的比重为27.6%"。本题为直接读数题。',
    tags: ['文字材料', '直接读数'],
    year: 2024,
  },
  {
    id: 'da-text-002',
    module: Module.DATA_ANALYSIS,
    subCategory: SubCategory.TEXT_MATERIAL_ANALYSIS,
    difficulty: Difficulty.MEDIUM,
    stem: '2022年全国网上零售额约为多少亿元？',
    sharedMaterial: {
      type: 'text',
      content: `2023年，全国网上零售额154264亿元，比上年增长11.0%。其中，实物商品网上零售额130174亿元，增长8.4%，占社会消费品零售总额的比重为27.6%；在实物商品网上零售额中，吃类、穿类和用类商品分别增长11.2%、10.8%和7.1%。`,
    },
    options: [
      { label: 'A', text: '135000' },
      { label: 'B', text: '138976' },
      { label: 'C', text: '142000' },
      { label: 'D', text: '150000' },
    ],
    answer: 'B',
    explanation: '2022年网上零售额 = 154264 ÷ (1+11.0%) = 154264 ÷ 1.11 ≈ 138976亿元。',
    tags: ['文字材料', '基期计算'],
    year: 2024,
  },
  {
    id: 'da-text-003',
    module: Module.DATA_ANALYSIS,
    subCategory: SubCategory.TEXT_MATERIAL_ANALYSIS,
    difficulty: Difficulty.MEDIUM,
    stem: '2023年吃类商品网上零售额的增速比穿类商品快多少个百分点？',
    sharedMaterial: {
      type: 'text',
      content: `2023年，全国网上零售额154264亿元，比上年增长11.0%。其中，实物商品网上零售额130174亿元，增长8.4%，占社会消费品零售总额的比重为27.6%；在实物商品网上零售额中，吃类、穿类和用类商品分别增长11.2%、10.8%和7.1%。`,
    },
    options: [
      { label: 'A', text: '0.2' },
      { label: 'B', text: '0.4' },
      { label: 'C', text: '1.0' },
      { label: 'D', text: '3.1' },
    ],
    answer: 'B',
    explanation: '吃类增速11.2%，穿类增速10.8%，相差11.2% - 10.8% = 0.4个百分点。注意：是百分点不是百分比。',
    tags: ['文字材料', '增速比较'],
    year: 2023,
  },
  {
    id: 'da-text-004',
    module: Module.DATA_ANALYSIS,
    subCategory: SubCategory.TEXT_MATERIAL_ANALYSIS,
    difficulty: Difficulty.HARD,
    stem: '2023年全国网上零售额的同比增量约为多少亿元？',
    sharedMaterial: {
      type: 'text',
      content: `2023年，全国网上零售额154264亿元，比上年增长11.0%。其中，实物商品网上零售额130174亿元，增长8.4%，占社会消费品零售总额的比重为27.6%；在实物商品网上零售额中，吃类、穿类和用类商品分别增长11.2%、10.8%和7.1%。`,
    },
    options: [
      { label: 'A', text: '约12800' },
      { label: 'B', text: '约13800' },
      { label: 'C', text: '约15300' },
      { label: 'D', text: '约17000' },
    ],
    answer: 'C',
    explanation: '增量 = 154264 × 11% / (1+11%) ≈ 154264 × 0.0991 ≈ 15288亿元，约15300亿元。用公式：增量=现期量×增长率/(1+增长率)。',
    tags: ['文字材料', '增量计算'],
    year: 2024,
  },
  {
    id: 'da-text-005',
    module: Module.DATA_ANALYSIS,
    subCategory: SubCategory.TEXT_MATERIAL_ANALYSIS,
    difficulty: Difficulty.EASY,
    stem: '以下各类商品网上零售额增速最慢的是：',
    sharedMaterial: {
      type: 'text',
      content: `2023年，全国网上零售额154264亿元，比上年增长11.0%。其中，实物商品网上零售额130174亿元，增长8.4%，占社会消费品零售总额的比重为27.6%；在实物商品网上零售额中，吃类、穿类和用类商品分别增长11.2%、10.8%和7.1%。`,
    },
    options: [
      { label: 'A', text: '吃类商品' },
      { label: 'B', text: '穿类商品' },
      { label: 'C', text: '用类商品' },
      { label: 'D', text: '全部网上零售额' },
    ],
    answer: 'C',
    explanation: '吃类增长11.2%，穿类增长10.8%，用类增长7.1%，全部网上零售额增长11.0%。用类商品增速最慢。',
    tags: ['文字材料', '直接比较'],
    year: 2023,
  },
];
