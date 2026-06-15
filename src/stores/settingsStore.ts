import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { STORAGE_KEYS } from '../data/constants';

interface Settings {
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  darkMode: 'system' | 'light' | 'dark';
  defaultQuestionCount: number;
}

interface SettingsStore {
  settings: Settings;
  updateSettings: (partial: Partial<Settings>) => void;
}

const defaultSettings: Settings = {
  soundEnabled: false,
  vibrationEnabled: true,
  darkMode: 'system',
  defaultQuestionCount: 20,
};

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      settings: defaultSettings,
      updateSettings: (partial) =>
        set((state) => ({
          settings: { ...state.settings, ...partial },
        })),
    }),
    {
      name: STORAGE_KEYS.SETTINGS,
    }
  )
);
