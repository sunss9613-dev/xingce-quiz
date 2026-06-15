import { Module, SubCategory } from '../models/question';

/** 模块中文名映射 */
export const MODULE_NAMES: Record<Module, string> = {
  [Module.VERBAL]: '言语理解与表达',
  [Module.QUANTITATIVE]: '数量关系',
  [Module.JUDGMENT]: '判断推理',
  [Module.DATA_ANALYSIS]: '资料分析',
  [Module.COMMON_KNOWLEDGE]: '常识判断',
};

/** 模块短名称 */
export const MODULE_SHORT_NAMES: Record<Module, string> = {
  [Module.VERBAL]: '言语',
  [Module.QUANTITATIVE]: '数量',
  [Module.JUDGMENT]: '判断',
  [Module.DATA_ANALYSIS]: '资料',
  [Module.COMMON_KNOWLEDGE]: '常识',
};

/** 模块配色 */
export const MODULE_COLORS: Record<Module, string> = {
  [Module.VERBAL]: '#2563EB',
  [Module.QUANTITATIVE]: '#DC2626',
  [Module.JUDGMENT]: '#7C3AED',
  [Module.DATA_ANALYSIS]: '#059669',
  [Module.COMMON_KNOWLEDGE]: '#D97706',
};

/** 子类别中文名映射 */
export const SUB_CATEGORY_NAMES: Record<SubCategory, string> = {
  [SubCategory.READING_COMPREHENSION]: '阅读理解',
  [SubCategory.LOGICAL_FILL]: '逻辑填空',
  [SubCategory.SENTENCE_EXPRESSION]: '语句表达',
  [SubCategory.MATH_OPERATION]: '数学运算',
  [SubCategory.NUMBER_REASONING]: '数字推理',
  [SubCategory.FIGURE_REASONING]: '图形推理',
  [SubCategory.DEFINITION_JUDGMENT]: '定义判断',
  [SubCategory.ANALOGY_REASONING]: '类比推理',
  [SubCategory.LOGICAL_JUDGMENT]: '逻辑判断',
  [SubCategory.CHART_ANALYSIS]: '图表分析',
  [SubCategory.TEXT_MATERIAL_ANALYSIS]: '文字材料分析',
  [SubCategory.POLITICS]: '政治',
  [SubCategory.ECONOMICS]: '经济',
  [SubCategory.LAW]: '法律',
  [SubCategory.HISTORY]: '历史',
  [SubCategory.CULTURE]: '文化',
  [SubCategory.SCIENCE]: '科技',
  [SubCategory.GEOGRAPHY]: '地理',
};

/** 各模块包含的子类别 */
export const MODULE_SUB_CATEGORIES: Record<Module, SubCategory[]> = {
  [Module.VERBAL]: [
    SubCategory.READING_COMPREHENSION,
    SubCategory.LOGICAL_FILL,
    SubCategory.SENTENCE_EXPRESSION,
  ],
  [Module.QUANTITATIVE]: [
    SubCategory.MATH_OPERATION,
    SubCategory.NUMBER_REASONING,
  ],
  [Module.JUDGMENT]: [
    SubCategory.FIGURE_REASONING,
    SubCategory.DEFINITION_JUDGMENT,
    SubCategory.ANALOGY_REASONING,
    SubCategory.LOGICAL_JUDGMENT,
  ],
  [Module.DATA_ANALYSIS]: [
    SubCategory.CHART_ANALYSIS,
    SubCategory.TEXT_MATERIAL_ANALYSIS,
  ],
  [Module.COMMON_KNOWLEDGE]: [
    SubCategory.POLITICS,
    SubCategory.ECONOMICS,
    SubCategory.LAW,
    SubCategory.HISTORY,
    SubCategory.CULTURE,
    SubCategory.SCIENCE,
    SubCategory.GEOGRAPHY,
  ],
};

/** 难度中文名 */
export const DIFFICULTY_NAMES: Record<number, string> = {
  1: '简单',
  2: '中等',
  3: '困难',
};

/** 模拟考试配置 */
export const MOCK_EXAM_CONFIG = {
  totalQuestions: 135,
  timeLimitMinutes: 120,
  distribution: {
    [Module.VERBAL]: 40,
    [Module.QUANTITATIVE]: 15,
    [Module.JUDGMENT]: 35,
    [Module.DATA_ANALYSIS]: 20,
    [Module.COMMON_KNOWLEDGE]: 25,
  },
};

/** 每日打卡最低题数 */
export const DAILY_CHECKIN_MIN_QUESTIONS = 5;

/** 存储 key */
export const STORAGE_KEYS = {
  USER_PROGRESS: 'xingce_user_progress',
  SETTINGS: 'xingce_settings',
  CURRENT_SESSION: 'xingce_current_session',
} as const;

/** 当前数据版本 */
export const DATA_VERSION = 1;
