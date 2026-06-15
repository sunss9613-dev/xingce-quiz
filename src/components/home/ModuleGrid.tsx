import { useNavigate } from 'react-router-dom';
import { Module } from '../../models/question';
import { MODULE_NAMES, MODULE_SHORT_NAMES, MODULE_COLORS } from '../../data/constants';
import { BookOpen, Calculator, Puzzle, BarChart3, Lightbulb, type LucideIcon } from 'lucide-react';

const MODULE_ICONS: Record<Module, LucideIcon> = {
  [Module.VERBAL]: BookOpen,
  [Module.QUANTITATIVE]: Calculator,
  [Module.JUDGMENT]: Puzzle,
  [Module.DATA_ANALYSIS]: BarChart3,
  [Module.COMMON_KNOWLEDGE]: Lightbulb,
};

const MODULE_ORDER: Module[] = [
  Module.VERBAL,
  Module.QUANTITATIVE,
  Module.JUDGMENT,
  Module.DATA_ANALYSIS,
  Module.COMMON_KNOWLEDGE,
];

export function ModuleGrid() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 gap-3 px-4">
      {MODULE_ORDER.map((module, index) => {
        const Icon = MODULE_ICONS[module];
        const color = MODULE_COLORS[module];
        const isLarge = index === 0; // First card spans full width on larger screens concept - but grid keeps 2 cols

        return (
          <button
            key={module}
            onClick={() => navigate(`/category/${module}`)}
            className="relative flex flex-col items-start gap-2 p-4 bg-white rounded-xl shadow-sm border border-gray-100 active:scale-[0.97] transition-transform overflow-hidden"
          >
            {/* Color accent bar at top */}
            <div
              className="absolute top-0 left-0 right-0 h-1"
              style={{ backgroundColor: color }}
            />
            <div
              className="flex items-center justify-center w-10 h-10 rounded-xl"
              style={{ backgroundColor: `${color}15` }}
            >
              <Icon size={22} color={color} />
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-gray-900">
                {MODULE_SHORT_NAMES[module]}
              </div>
              <div className="text-[11px] text-gray-500 mt-0.5">
                {MODULE_NAMES[module]}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
