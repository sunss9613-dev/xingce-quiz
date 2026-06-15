import { OptionItem } from './OptionItem';
import type { Option, AnswerKey } from '../../models/question';

interface OptionListProps {
  options: Option[];
  selectedAnswer: AnswerKey | null;
  correctAnswer: AnswerKey | null;
  showResult: boolean;
  disabled: boolean;
  onSelect: (label: AnswerKey) => void;
}

export function OptionList({
  options,
  selectedAnswer,
  correctAnswer,
  showResult,
  disabled,
  onSelect,
}: OptionListProps) {
  return (
    <div className="flex flex-col gap-2.5">
      {options.map((option, index) => (
        <div key={option.label} className="option-enter" style={{ animationDelay: `${index * 50}ms` }}>
          <OptionItem
            option={option}
            selected={selectedAnswer === option.label}
            disabled={disabled}
            showResult={showResult}
            isCorrectAnswer={showResult && correctAnswer === option.label}
            onSelect={onSelect}
          />
        </div>
      ))}
    </div>
  );
}
