import type { Question } from '../../models/question';
import { verbalQuestions } from './verbal';
import { quantitativeQuestions } from './quantitative';
import { judgmentQuestions } from './judgment';
import { dataAnalysisQuestions } from './dataAnalysis';
import { commonKnowledgeQuestions } from './commonKnowledge';

export const allQuestions: Question[] = [
  ...verbalQuestions,
  ...quantitativeQuestions,
  ...judgmentQuestions,
  ...dataAnalysisQuestions,
  ...commonKnowledgeQuestions,
];

export { verbalQuestions, quantitativeQuestions, judgmentQuestions, dataAnalysisQuestions, commonKnowledgeQuestions };
