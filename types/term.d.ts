interface TerminalHistory {
  id: string;
  command: string;
  output: string;
  timestamp: Date;
}

interface TerminalConfig {
  theme: string;
  fontSize: number;
  showLineNumbers: boolean;
}

interface TerminalState {
  history: TerminalHistory[];
  config: TerminalConfig;
  currentCommand: string;
  isExecuting: boolean;
  error: string | null;
}

interface TerminalActions {
  setCurrentCommand: (command: string) => void;
  appendHistory: (entry: TerminalHistory) => void;
  setConfig: (config: Partial<TerminalConfig>) => void;
  setExecuting: (executing: boolean) => void;
  setError: (error: string | null) => void;
  clearHistory: () => void;
}
