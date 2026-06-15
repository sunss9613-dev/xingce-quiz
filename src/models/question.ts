/** 行测五大模块 */
export enum Module {
  VERBAL = 'verbal',
  QUANTITATIVE = 'quantitative',
  JUDGMENT = 'judgment',
  DATA_ANALYSIS = 'data_analysis',
  COMMON_KNOWLEDGE = 'common_knowledge',
}

/** 各模块子类别 */
export enum SubCategory {
  // 言语理解与表达
  READING_COMPREHENSION = 'reading_comprehension',
  LOGICAL_FILL = 'logical_fill',
  SENTENCE_EXPRESSION = 'sentence_expression',
  // 数量关系
  MATH_OPERATION = 'math_operation',
  NUMBER_REASONING = 'number_reasoning',
  // 判断推理
  FIGURE_REASONING = 'figure_reasoning',
  DEFINITION_JUDGMENT = 'definition_judgment',
  ANALOGY_REASONING = 'analogy_reasoning',
  LOGICAL_JUDGMENT = 'logical_judgment',
  // 资料分析
  CHART_ANALYSIS = 'chart_analysis',
  TEXT_MATERIAL_ANALYSIS = 'text_material_analysis',
  // 常识判断
  POLITICS = 'politics',
  ECONOMICS = 'economics',
  LAW = 'law',
  HISTORY = 'history',
  CULTURE = 'culture',
  SCIENCE = 'science',
  GEOGRAPHY = 'geography',
}

export enum Difficulty {
  EASY = 1,
  MEDIUM = 2,
  HARD = 3,
}

export interface SharedMaterial {
  type: 'text' | 'table' | 'chart';
  content: string;
}

export interface Option {
  label: 'A' | 'B' | 'C' | 'D';
  text: string;
}

export type AnswerKey = 'A' | 'B' | 'C' | 'D';

export interface Question {
  id: string;
  module: Module;
  subCategory: SubCategory;
  difficulty: Difficulty;
  stem: string;
  options: Option[];
  answer: AnswerKey;
  explanation: string;
  sharedMaterial?: SharedMaterial;
  tags: string[];
  figureUrl?: string;
  year?: number;
}
