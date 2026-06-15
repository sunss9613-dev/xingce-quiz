import type { ReactNode } from 'react';

export function SafeArea({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`safe-area-top safe-area-bottom ${className}`}>
      {children}
    </div>
  );
}
