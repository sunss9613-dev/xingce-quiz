import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import App from './App';
import './index.css';

// Lazy load all pages
const HomePage = lazy(() => import('./routes/HomePage').then((m) => ({ default: m.HomePage })));
const QuizPage = lazy(() => import('./routes/QuizPage').then((m) => ({ default: m.QuizPage })));
const QuizResultPage = lazy(() => import('./routes/QuizResultPage').then((m) => ({ default: m.QuizResultPage })));
const MockExamPage = lazy(() => import('./routes/MockExamPage').then((m) => ({ default: m.MockExamPage })));
const MockExamResultPage = lazy(() => import('./routes/MockExamResultPage').then((m) => ({ default: m.MockExamResultPage })));
const CategoryPage = lazy(() => import('./routes/CategoryPage').then((m) => ({ default: m.CategoryPage })));
const WrongBookPage = lazy(() => import('./routes/WrongBookPage').then((m) => ({ default: m.WrongBookPage })));
const FavoritesPage = lazy(() => import('./routes/FavoritesPage').then((m) => ({ default: m.FavoritesPage })));
const HistoryPage = lazy(() => import('./routes/HistoryPage').then((m) => ({ default: m.HistoryPage })));
const DailyCheckInPage = lazy(() => import('./routes/DailyCheckInPage').then((m) => ({ default: m.DailyCheckInPage })));
const StatsPage = lazy(() => import('./routes/StatsPage').then((m) => ({ default: m.StatsPage })));
const SettingsPage = lazy(() => import('./routes/SettingsPage').then((m) => ({ default: m.SettingsPage })));

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-dvh">
      <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="category/:module" element={<CategoryPage />} />
            <Route path="category/:module/:sub" element={<CategoryPage />} />
            <Route path="quiz/:mode" element={<QuizPage />} />
            <Route path="quiz/:mode/result" element={<QuizResultPage />} />
            <Route path="mock-exam" element={<MockExamPage />} />
            <Route path="mock-exam/result" element={<MockExamResultPage />} />
            <Route path="wrong-book" element={<WrongBookPage />} />
            <Route path="favorites" element={<FavoritesPage />} />
            <Route path="history" element={<HistoryPage />} />
            <Route path="daily-check-in" element={<DailyCheckInPage />} />
            <Route path="stats" element={<StatsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>
);
