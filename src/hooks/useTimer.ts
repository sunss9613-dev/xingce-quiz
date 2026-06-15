import { useState, useEffect, useRef, useCallback } from 'react';

interface UseTimerOptions {
  countdown?: boolean;
  initialSeconds?: number;
  onTimeUp?: () => void;
  autoStart?: boolean;
}

export function useTimer(options: UseTimerOptions = {}) {
  const { countdown = false, initialSeconds = 0, onTimeUp, autoStart = true } = options;
  const [elapsed, setElapsed] = useState(0);
  const [remaining, setRemaining] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(autoStart);
  const startTimeRef = useRef<number>(0);
  const frameRef = useRef<number>(0);
  const onTimeUpRef = useRef(onTimeUp);
  onTimeUpRef.current = onTimeUp;

  const tick = useCallback(() => {
    const now = performance.now();
    const elapsedMs = now - startTimeRef.current;
    setElapsed(elapsedMs);

    if (countdown) {
      const remainingMs = Math.max(0, initialSeconds * 1000 - elapsedMs);
      setRemaining(Math.ceil(remainingMs / 1000));
      if (remainingMs <= 0) {
        setIsRunning(false);
        onTimeUpRef.current?.();
        return;
      }
    }
    frameRef.current = requestAnimationFrame(tick);
  }, [countdown, initialSeconds]);

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = performance.now() - elapsed;
      frameRef.current = requestAnimationFrame(tick);
    }
    return () => cancelAnimationFrame(frameRef.current);
  }, [isRunning]);

  // Handle page visibility change
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(frameRef.current);
      } else if (isRunning) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [isRunning, tick]);

  const pause = useCallback(() => setIsRunning(false), []);
  const resume = useCallback(() => setIsRunning(true), []);
  const reset = useCallback(() => {
    setIsRunning(false);
    setElapsed(0);
    setRemaining(initialSeconds);
  }, [initialSeconds]);

  const getCurrentTimeMs = useCallback(() => elapsed, [elapsed]);

  return {
    elapsed,
    elapsedDisplay: formatTime(Math.floor(elapsed / 1000)),
    remaining,
    remainingDisplay: formatTime(remaining),
    isRunning,
    pause,
    resume,
    reset,
    getCurrentTimeMs,
  };
}

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}
