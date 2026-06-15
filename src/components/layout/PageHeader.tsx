import { ArrowLeft, MoreHorizontal } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: React.ReactNode;
}

export function PageHeader({ title, showBack = true, onBack, rightAction }: PageHeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-100 safe-area-top">
      <div className="flex items-center justify-between h-12 px-4 max-w-lg mx-auto">
        <div className="w-10">
          {showBack && (
            <button
              onClick={onBack || (() => window.history.back())}
              className="flex items-center justify-center w-10 h-10 -ml-2 text-gray-600 active:bg-gray-100 rounded-full transition-colors"
              aria-label="返回"
            >
              <ArrowLeft size={22} />
            </button>
          )}
        </div>
        <h1 className="text-base font-semibold text-gray-900 truncate">{title}</h1>
        <div className="w-10 flex justify-end">
          {rightAction ?? null}
        </div>
      </div>
    </header>
  );
}
