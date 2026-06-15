import { useState, useCallback } from 'react';
import { Lock, Heart } from 'lucide-react';

interface LockScreenProps {
  onUnlock: () => void;
}

// Simple hash of the password for basic protection
// This is not cryptographically secure but sufficient for personal use
const VALID_HASH = '559559';

export function LockScreen({ onUnlock }: LockScreenProps) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleKeyPress = useCallback(
    (digit: string) => {
      if (pin.length >= 6) return;
      const newPin = pin + digit;
      setPin(newPin);

      if (newPin.length === 6) {
        if (newPin === VALID_HASH) {
          // Store auth in sessionStorage so refresh doesn't require re-auth
          sessionStorage.setItem('xingce_auth', 'true');
          onUnlock();
        } else {
          setError(true);
          setShake(true);
          setTimeout(() => {
            setPin('');
            setError(false);
            setShake(false);
          }, 600);
        }
      }
    },
    [pin, onUnlock]
  );

  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    setPin('');
    setError(false);
  };

  const digits = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['', '0', 'delete'],
  ];

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-indigo-50 px-6">
      {/* Header */}
      <div className="flex flex-col items-center mb-10">
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-md mb-4">
          <Lock size={36} className="text-blue-600" />
        </div>
        <h1 className="text-xl font-bold text-gray-900">行测刷题</h1>
        <p className="text-sm text-gray-500 mt-1">输入密码进入</p>
        <div className="flex items-center gap-1 mt-1 text-xs text-pink-400">
          <Heart size={12} fill="#f472b6" />
          <span>专属练习</span>
        </div>
      </div>

      {/* PIN dots */}
      <div className="flex items-center gap-4 mb-8">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
              pin.length > i
                ? error
                  ? 'border-red-500 bg-red-500'
                  : 'border-blue-600 bg-blue-600'
                : 'border-gray-300'
            } ${pin.length === i ? 'scale-110' : ''}`}
          />
        ))}
      </div>

      {/* Error message */}
      {error && (
        <p className="text-sm text-red-500 mb-4 animate-pulse">密码错误，请重试</p>
      )}

      {/* Number pad */}
      <div className={`w-full max-w-[320px] ${shake ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}>
        {digits.map((row, rowIdx) => (
          <div key={rowIdx} className="flex justify-center gap-4 mb-3">
            {row.map((digit, colIdx) => {
              if (digit === '') {
                return <div key="empty" className="w-[70px] h-[56px]" />;
              }

              if (digit === 'delete') {
                return (
                  <button
                    key="delete"
                    onClick={handleDelete}
                    onTouchStart={(e) => e.preventDefault()}
                    className="w-[70px] h-[56px] flex items-center justify-center rounded-2xl text-sm font-medium text-gray-500 active:bg-gray-200 transition-colors"
                  >
                    删除
                  </button>
                );
              }

              return (
                <button
                  key={digit}
                  onClick={() => handleKeyPress(digit)}
                  onTouchStart={(e) => e.preventDefault()}
                  className="w-[70px] h-[56px] flex items-center justify-center rounded-2xl text-2xl font-semibold text-gray-800 bg-white shadow-sm border border-gray-100 active:bg-gray-100 active:scale-95 transition-all"
                >
                  {digit}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Clear button */}
      {pin.length > 0 && !error && (
        <button
          onClick={handleClear}
          className="mt-2 text-sm text-gray-400 active:text-gray-600"
        >
          清除
        </button>
      )}
    </div>
  );
}
