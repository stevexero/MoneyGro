import { create } from "zustand";

interface SettingsState {
    settingsName: string;
    setSettingsName: (settingsName: string) => void;
}

const useSettingsStore = create<SettingsState>((set) => ({
    settingsName: '',
    setSettingsName: (settingsName) => set({ settingsName }),
}));

export default useSettingsStore;