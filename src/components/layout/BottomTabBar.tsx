import { useLocation, useNavigate } from 'react-router-dom';
import { Home, BookOpen, CalendarCheck, BookX, User } from 'lucide-react';

const TABS = [
  { path: '/', label: '首页', Icon: Home },
  { path: '/category/verbal', label: '练习', Icon: BookOpen },
  { path: '/daily-check-in', label: '打卡', Icon: CalendarCheck },
  { path: '/wrong-book', label: '错题', Icon: BookX },
  { path: '/stats', label: '我的', Icon: User },
];

export function BottomTabBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-t border-gray-100 safe-area-bottom">
      <div className="flex items-center justify-around max-w-lg mx-auto h-14">
        {TABS.map(({ path, label, Icon }) => {
          const active = isActive(path);
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex flex-col items-center justify-center flex-1 h-full py-1 transition-colors active:scale-95 ${
                active ? 'text-blue-600' : 'text-gray-400'
              }`}
            >
              <Icon size={22} strokeWidth={active ? 2.5 : 2} />
              <span className={`text-[10px] mt-0.5 ${active ? 'font-semibold' : ''}`}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
