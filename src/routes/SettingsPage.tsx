import { useState } from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { useUserStore } from '../stores/userStore';
import { useSettingsStore } from '../stores/settingsStore';
import { Trash2, Download, Upload, AlertTriangle } from 'lucide-react';

export function SettingsPage() {
  const exportData = useUserStore((s) => s.exportData);
  const importData = useUserStore((s) => s.importData);
  const resetAll = useUserStore((s) => s.resetAll);
  const settings = useSettingsStore((s) => s.settings);
  const updateSettings = useSettingsStore((s) => s.updateSettings);
  const [showReset, setShowReset] = useState(false);
  const [message, setMessage] = useState('');

  const handleExport = () => {
    const json = exportData();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `xingce-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setMessage('数据已导出');
    setTimeout(() => setMessage(''), 2000);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        const success = importData(reader.result as string);
        setMessage(success ? '数据导入成功' : '导入失败，数据格式不正确');
        setTimeout(() => setMessage(''), 2000);
        if (success) window.location.reload();
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const handleReset = () => {
    resetAll();
    setShowReset(false);
    setMessage('数据已重置');
    setTimeout(() => setMessage(''), 2000);
    window.location.reload();
  };

  return (
    <div className="min-h-dvh bg-gray-50">
      <PageHeader title="设置" />
      <div className="px-4 py-4 max-w-lg mx-auto pb-20 space-y-4">
        {/* Message toast */}
        {message && (
          <div className="p-3 bg-green-50 text-green-700 rounded-xl text-sm font-medium text-center border border-green-200">
            {message}
          </div>
        )}

        {/* Settings */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-50">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">偏好设置</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">默认题数</span>
                <select
                  value={settings.defaultQuestionCount}
                  onChange={(e) => updateSettings({ defaultQuestionCount: Number(e.target.value) })}
                  className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm"
                >
                  {[10, 20, 30, 50].map((n) => (
                    <option key={n} value={n}>{n} 题</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">震动反馈</span>
                <button
                  onClick={() => updateSettings({ vibrationEnabled: !settings.vibrationEnabled })}
                  className={`w-11 h-6 rounded-full transition-colors ${
                    settings.vibrationEnabled ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${
                    settings.vibrationEnabled ? 'translate-x-5' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>
            </div>
          </div>

          {/* Data management */}
          <div className="p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">数据管理</h3>
            <div className="space-y-2">
              <button
                onClick={handleExport}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-700 active:bg-gray-50 transition-colors"
              >
                <Download size={18} className="text-blue-500" />
                导出数据 (JSON)
              </button>
              <button
                onClick={handleImport}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-700 active:bg-gray-50 transition-colors"
              >
                <Upload size={18} className="text-green-500" />
                导入数据 (JSON)
              </button>
              <button
                onClick={() => setShowReset(true)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-600 active:bg-red-50 transition-colors"
              >
                <Trash2 size={18} />
                重置所有数据
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-[11px] text-gray-400">
          行测刷题 v1.0 · 数据仅保存在本设备
        </p>
      </div>

      {/* Reset confirm */}
      {showReset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <div className="flex items-center gap-3 mb-3">
              <AlertTriangle size={24} className="text-red-500" />
              <h3 className="text-lg font-bold text-gray-900">确认重置？</h3>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              这将清除所有练习记录、错题本、收藏夹和打卡数据。此操作不可撤销。
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowReset(false)}
                className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700"
              >
                取消
              </button>
              <button
                onClick={handleReset}
                className="flex-1 py-2.5 bg-red-600 text-white rounded-xl text-sm font-semibold"
              >
                确认重置
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
