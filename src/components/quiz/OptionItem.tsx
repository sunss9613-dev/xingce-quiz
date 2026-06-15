import { Check, X } from 'lucide-react';
import type { Option, AnswerKey } from '../../models/question';

interface OptionItemProps {
  option: Option;
  selected: boolean;
  disabled: boolean;
  showResult: boolean;
  isCorrectAnswer: boolean;
  onSelect: (label: AnswerKey) => void;
}

export function OptionItem({
  option,
  selected,
  disabled,
  showResult,
  isCorrectAnswer,
  onSelect,
}: OptionItemProps) {
  let borderColor = 'border-gray-200';
  let bgColor = 'bg-white';
  let textColor = 'text-gray-900';
  let icon = null;

  if (showResult) {
    if (isCorrectAnswer) {
      borderColor = 'border-green-500';
      bgColor = 'bg-green-50';
      textColor = 'text-green-800';
      icon = <Check size={20} className="text-green-600 shrink-0" />;
    } else if (selected) {
      borderColor = 'border-red-400';
      bgColor = 'bg-red-50';
      textColor = 'text-red-800';
      icon = <X size={20} className="text-red-500 shrink-0" />;
    }
  } else if (selected) {
    borderColor = 'border-blue-500';
    bgColor = 'bg-blue-50';
    textColor = 'text-blue-800';
  }

  return (
    <button
      onClick={() => !disabled && onSelect(option.label)}
      disabled={disabled}
      className={`w-full flex items-center gap-3 p-3.5 rounded-xl border-2 ${borderColor} ${bgColor} transition-all duration-150 min-h-[48px] active:scale-[0.98] ${
        disabled ? 'cursor-default' : 'cursor-pointer active:bg-gray-50'
      }`}
    >
      {/* Label circle */}
      <div
        className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold shrink-0 ${
          showResult && isCorrectAnswer
            ? 'bg-green-500 text-white'
            : selected && !showResult
            ? 'bg-blue-600 text-white'
            : selected && showResult && !isCorrectAnswer
            ? 'bg-red-500 text-white'
            : 'bg-gray-100 text-gray-500'
        }`}
      >
        {option.label}
      </div>

      {/* Option text */}
      <span className={`flex-1 text-left text-[15px] leading-relaxed ${textColor}`}>
        {option.text}
      </span>

      {/* Result icon */}
      {icon}
    </button>
  );
}
