import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { BottomTabBar } from './components/layout/BottomTabBar';
import { LockScreen } from './components/shared/LockScreen';

// Routes that should NOT show the tab bar
const FULLSCREEN_ROUTES = ['/quiz/', '/mock-exam', '/settings'];

export default function App() {
  const location = useLocation();
  const hideTabBar = FULLSCREEN_ROUTES.some((route) => location.pathname.startsWith(route));
  const [isUnlocked, setIsUnlocked] = useState(() => {
    return sessionStorage.getItem('xingce_auth') === 'true';
  });

  if (!isUnlocked) {
    return <LockScreen onUnlock={() => setIsUnlocked(true)} />;
  }

  return (
    <div className="min-h-dvh bg-gray-50 max-w-lg mx-auto relative">
      <main className={hideTabBar ? '' : 'pb-16'}>
        <Outlet />
      </main>
      {!hideTabBar && <BottomTabBar />}
    </div>
  );
}
