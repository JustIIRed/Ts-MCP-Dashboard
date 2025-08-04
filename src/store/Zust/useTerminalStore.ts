import { create } from "zustand";

export const useTerminalStore = create<TerminalState & TerminalActions>(
  (set) => ({
    history: [],
    config: {
      theme: "dark",
      fontSize: 14,
      showLineNumbers: true,
    },
    currentCommand: "",
    isExecuting: false,
    error: null,

    setCurrentCommand: (command) => set({ currentCommand: command }),
    appendHistory: (entry) =>
      set((state) => ({ history: [...state.history, entry] })),
    setConfig: (config) =>
      set((state) => ({ config: { ...state.config, ...config } })),
    setExecuting: (executing) => set({ isExecuting: executing }),
    setError: (error) => set({ error }),
    clearHistory: () => set({ history: [] }),
  })
);
